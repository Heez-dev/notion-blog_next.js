import Link from 'next/link';

import { PostCard } from '@/components/features/blog/PostCard';
import { getPublishedPosts } from '@/lib/notion';
import type { SortOrder } from '@/types/blog';
import { DEFAULT_SORT_ORDER } from '@/types/blog';

interface PostListProps {
  sort?: SortOrder;
}

export default async function PostList({ sort = DEFAULT_SORT_ORDER }: PostListProps) {
  const publishedPosts = await getPublishedPosts(sort);
  return (
    <div className="grid gap-4">
      {publishedPosts.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id}>
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
}
