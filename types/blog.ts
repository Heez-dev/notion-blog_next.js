export interface TagFilterItem {
  id: string;
  name: string;
  count: number;
}

export interface Post {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  date?: string;
  modifiedDate?: string;
  slug: string;
}

/**
 * 포스트 정렬 방식
 */
export type SortOrder = 'latest' | 'oldest';

/**
 * 포스트 정렬 방식 상수
 */
export const SORT_ORDER = {
  LATEST: 'latest' as const,
  OLDEST: 'oldest' as const,
} as const;

/**
 * 기본 정렬 방식
 */
export const DEFAULT_SORT_ORDER: SortOrder = SORT_ORDER.LATEST;
