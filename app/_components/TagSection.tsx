import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TagFilterItem } from '@/types/blog';

interface TagSectionProps {
  tags: TagFilterItem[];
}

function TagSection({ tags }: TagSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {tags.map((tag) => (
            <Link href={`/tags/${tag.name}`} key={tag.name} className="w-full">
              <Button variant="outline" className="w-full cursor-pointer justify-between">
                <span>{tag.name}</span>
                <span>{tag.count}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default TagSection;
