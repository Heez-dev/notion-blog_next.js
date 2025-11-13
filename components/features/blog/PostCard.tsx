'use client';

import Image from 'next/image';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Post } from '@/types/blog';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group bg-card/50 border-border/40 hover:border-primary/20 overflow-hidden border pt-0 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      {post.coverImage && (
        <div className="relative aspect-2/1 overflow-hidden">
          <div className="from-background/20 absolute inset-0 z-10 bg-linear-to-t to-transparent" />
          <Image
            src={post.coverImage}
            alt={post.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h2 className="group-hover:text-primary mb-2 text-xl font-bold tracking-tight transition-colors">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        )}
        <div className="text-muted-foreground mt-6 flex items-center gap-x-4 text-sm">
          {post.modifiedDate ? (
            <div className="flex items-center gap-1.5">
              <span>수정일</span>
              <time>{format(new Date(post.modifiedDate), 'PPP', { locale: ko })}</time>
            </div>
          ) : post.date ? (
            <div className="flex items-center gap-1.5">
              <span>등록일</span>
              <time>{format(new Date(post.date), 'PPP', { locale: ko })}</time>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
