import Image from 'next/image';
import Link from 'next/link';

import { Github, Instagram, Linkedin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/%EC%B1%84%ED%9D%AC-%EB%B0%95-302952381/',
    label: 'LinkedIn',
  },
  {
    icon: Github,
    href: 'https://github.com/Heez-dev',
    label: 'GitHub',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/heez.dev/',
    label: 'Instagram',
  },
];

function ProfileSection() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <Image src="/images/profile.png" alt="profile" width={160} height={160} />
        <CardTitle>Heez</CardTitle>
        <CardDescription>Frontend Developer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full justify-center gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-fit cursor-pointer justify-start gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{link.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileSection;
