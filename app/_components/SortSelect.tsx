'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SortOrder } from '@/types/blog';
import { DEFAULT_SORT_ORDER, SORT_ORDER } from '@/types/blog';

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = (searchParams.get('sort') as SortOrder) || DEFAULT_SORT_ORDER;

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="정렬 방식 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={SORT_ORDER.LATEST}>최신순</SelectItem>
        <SelectItem value={SORT_ORDER.OLDEST}>오래된순</SelectItem>
      </SelectContent>
    </Select>
  );
}
