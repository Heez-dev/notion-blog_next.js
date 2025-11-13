import { Client } from '@notionhq/client';

import type { Post, SortOrder } from '@/types/blog';
import { DEFAULT_SORT_ORDER } from '@/types/blog';

import type {
  DatabaseObjectResponse,
  DataSourceObjectResponse,
  PageObjectResponse,
  PartialDataSourceObjectResponse,
  PartialPageObjectResponse,
  QueryDataSourceResponse,
} from '@notionhq/client/build/src/api-endpoints';

/**
 * 환경 변수에서 Notion API 토큰을 가져옵니다.
 * @throws {Error} 토큰이 없을 경우 에러를 던집니다.
 */
const getNotionToken = (): string => {
  const token =
    process.env.NOTION_TOKEN ||
    process.env.NOTION_API_TOKEN ||
    process.env.NOTION_API_KEY ||
    process.env.NOTION_SECRET;

  if (!token) {
    throw new Error(
      'Notion API token is missing. Please set NOTION_TOKEN, NOTION_API_TOKEN, NOTION_API_KEY, or NOTION_SECRET in your environment variables.'
    );
  }

  return token;
};

/**
 * 환경 변수에서 Notion Database ID를 가져옵니다.
 * @throws {Error} Database ID가 없을 경우 에러를 던집니다.
 */
const getNotionDatabaseId = (): string => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error(
      'Notion Database ID is missing. Please set NOTION_DATABASE_ID in your environment variables.'
    );
  }

  return databaseId;
};

/**
 * Notion API 클라이언트 인스턴스를 가져옵니다 (지연 초기화).
 * @returns Notion API 클라이언트 인스턴스
 */
const getNotionClient = (): Client => {
  return new Client({
    auth: getNotionToken(),
  });
};

/**
 * 응답이 완전한 DatabaseObjectResponse인지 확인합니다.
 */
const isFullDatabaseResponse = (database: unknown): database is DatabaseObjectResponse => {
  return (
    typeof database === 'object' &&
    database !== null &&
    'object' in database &&
    database.object === 'database' &&
    'data_sources' in database
  );
};

/**
 * 응답이 완전한 PageObjectResponse인지 확인합니다.
 */
const isPageObjectResponse = (
  result:
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDataSourceObjectResponse
    | DataSourceObjectResponse
): result is PageObjectResponse => {
  return (
    typeof result === 'object' &&
    result !== null &&
    'object' in result &&
    result.object === 'page' &&
    'properties' in result &&
    typeof result.properties === 'object' &&
    result.properties !== null
  );
};

/**
 * Notion 데이터베이스에서 데이터 소스 ID를 가져옵니다.
 * @param databaseId - Notion 데이터베이스 ID
 * @returns 데이터 소스 ID
 * @throws {Error} 데이터 소스를 찾을 수 없을 경우 에러를 던집니다.
 */
const getDataSourceId = async (databaseId: string): Promise<string> => {
  try {
    const notion = getNotionClient();
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    if (!isFullDatabaseResponse(database)) {
      throw new Error('Database response is incomplete');
    }

    if (!database.data_sources || database.data_sources.length === 0) {
      throw new Error('No data sources found in the database');
    }

    return database.data_sources[0].id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve database: ${error.message}`);
    }
    throw new Error('Failed to retrieve database: Unknown error');
  }
};

/**
 * Notion 데이터 소스에서 발행된 포스트를 조회합니다.
 * @param dataSourceId - 데이터 소스 ID
 * @returns Notion API 응답 객체
 * @throws {Error} 쿼리 실패 시 에러를 던집니다.
 */
const queryPublishedPosts = async (dataSourceId: string) => {
  try {
    const notion = getNotionClient();

    return await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      // 정렬은 클라이언트 측에서 수행 (Modified Date가 있으면 Modified Date, 없으면 Date 사용)
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to query data source: ${error.message}`);
    }
    throw new Error('Failed to query data source: Unknown error');
  }
};

/**
 * Title 프로퍼티에서 텍스트를 추출합니다.
 */
const extractTitle = (property: PageObjectResponse['properties'][string] | undefined): string => {
  if (
    property &&
    'title' in property &&
    Array.isArray(property.title) &&
    property.title.length > 0
  ) {
    return property.title[0].plain_text;
  }
  return '';
};

/**
 * Rich Text 프로퍼티에서 텍스트를 추출합니다.
 */
const extractRichText = (
  property: PageObjectResponse['properties'][string] | undefined
): string | undefined => {
  if (
    property &&
    'rich_text' in property &&
    Array.isArray(property.rich_text) &&
    property.rich_text.length > 0
  ) {
    return property.rich_text[0].plain_text;
  }
  return undefined;
};

/**
 * Multi-select 프로퍼티에서 태그 이름 배열을 추출합니다.
 */
const extractTags = (
  property: PageObjectResponse['properties'][string] | undefined
): string[] | undefined => {
  if (property && 'multi_select' in property && Array.isArray(property.multi_select)) {
    return property.multi_select.map((tag) => tag.name);
  }
  return undefined;
};

/**
 * Date 프로퍼티에서 날짜 문자열을 추출합니다.
 */
const extractDate = (
  property: PageObjectResponse['properties'][string] | undefined
): string | undefined => {
  if (property && 'date' in property && property.date?.start) {
    return property.date.start;
  }
  return undefined;
};

/**
 * Notion API 응답을 Post 타입으로 변환합니다.
 * @param notionResponse - Notion API 응답 객체
 * @returns Post 배열
 */
const transformToPosts = (notionResponse: QueryDataSourceResponse): Post[] => {
  if (!notionResponse || typeof notionResponse !== 'object' || !('results' in notionResponse)) {
    return [];
  }

  return notionResponse.results.filter(isPageObjectResponse).map((result) => {
    const properties = result.properties;
    const titleProperty = 'Title' in properties ? properties.Title : undefined;
    const descriptionProperty = 'Description' in properties ? properties.Description : undefined;
    const tagsProperty = 'Tags' in properties ? properties.Tags : undefined;
    const authorProperty = 'Author' in properties ? properties.Author : undefined;
    const dateProperty = 'Date' in properties ? properties.Date : undefined;
    const modifiedDateProperty =
      'Modified Date' in properties ? properties['Modified Date'] : undefined;
    const slugProperty = 'Slug' in properties ? properties.Slug : undefined;

    return {
      id: result.id,
      title: extractTitle(titleProperty),
      description: extractRichText(descriptionProperty),
      coverImage:
        result.cover && result.cover.type === 'external'
          ? result.cover.external.url
          : result.cover && result.cover.type === 'file'
            ? result.cover.file.url
            : undefined,
      tags: extractTags(tagsProperty),
      author: extractRichText(authorProperty),
      date: extractDate(dateProperty),
      modifiedDate: extractDate(modifiedDateProperty),
      slug: extractRichText(slugProperty) ?? result.id,
    };
  });
};

/**
 * 포스트를 정렬합니다.
 * Modified Date가 있으면 Modified Date를 사용하고, 없으면 Date를 사용합니다.
 * @param posts - 정렬할 Post 배열
 * @param sort - 정렬 방식
 * @returns 정렬된 Post 배열
 */
const sortPosts = (posts: Post[], sort: SortOrder): Post[] => {
  const sortedPosts = [...posts].sort((a, b) => {
    // Modified Date가 있으면 Modified Date 사용, 없으면 Date 사용
    const dateA = a.modifiedDate || a.date || '';
    const dateB = b.modifiedDate || b.date || '';

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    const comparison = dateA.localeCompare(dateB);
    return sort === DEFAULT_SORT_ORDER ? -comparison : comparison;
  });

  return sortedPosts;
};

/**
 * 발행된 포스트 목록을 가져옵니다.
 * @param sort - 정렬 방식, 기본값 'latest'
 * @returns 발행된 Post 배열
 * @throws {Error} 포스트 조회 실패 시 에러를 던집니다.
 */
export const getPublishedPosts = async (sort: SortOrder = DEFAULT_SORT_ORDER): Promise<Post[]> => {
  try {
    const databaseId = getNotionDatabaseId();
    const dataSourceId = await getDataSourceId(databaseId);
    const response = await queryPublishedPosts(dataSourceId);
    const posts = transformToPosts(response);
    return sortPosts(posts, sort);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to fetch published posts: ${errorMessage}`);
  }
};
