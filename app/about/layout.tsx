'use client';

import { useState } from 'react';

import {
  Briefcase,
  Code,
  FileText,
  FolderKanban,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  User,
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'About Me',
    href: '#about',
    icon: User,
  },
  {
    label: 'Skills',
    href: '#skills',
    icon: Code,
  },
  {
    label: 'Experience',
    href: '#experience',
    icon: Briefcase,
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: FolderKanban,
  },
  {
    label: 'Education',
    href: '#education',
    icon: GraduationCap,
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: Mail,
  },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: FileText,
  },
];

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState<string>('about');

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container py-8 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* 좌측 사이드바 */}
        <aside className="shrink-0 lg:sticky lg:top-24 lg:h-fit lg:w-64">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* 소셜 링크 */}
          <div className="mt-8 border-t pt-8">
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'flex items-center justify-center rounded-lg p-2',
                      'text-muted-foreground transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none'
                    )}
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        {/* 우측 메인 콘텐츠 영역 */}
        <main className="min-w-0 flex-1">
          <div className="max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
