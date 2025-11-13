import { Suspense } from 'react';

import ContactSection from '@/app/_components/ContactSection';
import ProfileSection from '@/app/_components/ProfileSection';
import SortSelect from '@/app/_components/SortSelect';
import TagSection from '@/app/_components/TagSection';
import type { SortOrder } from '@/types/blog';
import { DEFAULT_SORT_ORDER } from '@/types/blog';

import PostList from './_components/PostList';

const mockTags = [
  { id: '1', name: '전체', count: 20 },
  { id: '2', name: 'HTML', count: 10 },
  { id: '3', name: 'CSS', count: 5 },
  { id: '4', name: 'JavaScript', count: 3 },
  { id: '5', name: 'React', count: 3 },
  { id: '6', name: 'Next.js', count: 3 },
];

interface HomeProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const sort = (params.sort as SortOrder) || DEFAULT_SORT_ORDER;

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside>
          {/* 태그 섹션 */}
          <TagSection tags={mockTags} />
        </aside>

        <div className="space-y-8">
          {/* 섹션 제목 */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>
            <SortSelect />
          </div>

          {/* 블로그 카드 그리드 */}
          <Suspense fallback={<div>Loading...</div>}>
            <PostList sort={sort} />
          </Suspense>
        </div>

        {/* 우측 사이드바 */}
        <aside className="flex flex-col gap-6">
          {/* 프로필 섹션 */}
          <ProfileSection />
          {/* 문의 섹션 */}
          <ContactSection />
        </aside>
      </div>
    </div>
  );
}
