# 개발 로드맵

> Next.js + Notion CMS 기반 블로그 단계별 개발 계획

## 📋 목차

- [Phase 1: 프로젝트 초기 설정 및 기본 구조](#phase-1-프로젝트-초기-설정-및-기본-구조)
- [Phase 2: Notion CMS 연동 및 블로그 핵심 기능](#phase-2-notion-cms-연동-및-블로그-핵심-기능)
- [Phase 3: 사용자 경험 개선 및 고급 기능](#phase-3-사용자-경험-개선-및-고급-기능)
- [Phase 4: 성능 최적화 및 품질 향상](#phase-4-성능-최적화-및-품질-향상)

---

## Phase 1: 프로젝트 초기 설정 및 기본 구조

**목표**: Next.js 프로젝트 생성 및 기본 인프라 구축  
**예상 기간**: 2-3일  
**배포 목표**: MVP (최소 기능) 버전 배포

### 1.1 프로젝트 초기화

- [ ] Next.js 프로젝트 생성 (TypeScript + App Router)
- [ ] Git 저장소 초기화 및 첫 커밋
- [ ] `.gitignore` 확인 및 보완
- [ ] 프로젝트 디렉토리 구조 생성
  ```
  app/
  components/
    ui/
    layouts/
    common/
  lib/
    api/
    utils/
    config/
  hooks/
  types/
  public/
  ```

### 1.2 개발 환경 설정

- [ ] ESLint 설정 및 규칙 커스터마이징
- [ ] Prettier 설정 (`.prettierrc`, `.prettierignore`)
- [ ] TypeScript `tsconfig.json` strict 모드 설정
- [ ] VS Code 설정 (`.vscode/settings.json`)
- [ ] Husky + lint-staged 설정 (Git hooks)

### 1.3 기본 UI 라이브러리 설치

- [ ] ShadcnUI 초기화
  ```bash
  npx shadcn@latest init
  ```
- [ ] 필수 컴포넌트 설치
  - Button, Card, Input, Badge, Avatar
- [ ] TailwindCSS 커스터마이징
  - `tailwind.config.ts` 테마 설정
  - CSS 변수 정의 (`globals.css`)

### 1.4 기본 레이아웃 구현

- [ ] 루트 레이아웃 (`app/layout.tsx`)
  - 메타데이터 설정
  - 폰트 최적화 (`next/font`)
  - 글로벌 스타일
- [ ] 네비게이션 컴포넌트
  - Header 컴포넌트
  - Footer 컴포넌트
  - 반응형 모바일 메뉴
- [ ] 홈 페이지 (`app/page.tsx`)
  - 기본 랜딩 페이지 구조

### 1.5 타입 시스템 구축

- [ ] 공통 타입 정의 (`types/index.ts`)
- [ ] 컴포넌트 Props 타입 정의
- [ ] 유틸리티 타입 정의

### 1.6 환경 변수 설정

- [ ] `.env.example` 파일 생성
- [ ] 환경 변수 타입 정의
- [ ] 기본 설정값 추가

### 1.7 첫 배포 준비

- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 설정 (Vercel Dashboard)
- [ ] `vercel.json` 설정 (필요시)
- [ ] 배포 테스트 및 검증

### ✅ Phase 1 완료 체크리스트

- [ ] 프로젝트가 정상적으로 빌드됨
- [ ] 기본 레이아웃이 브라우저에서 표시됨
- [ ] TypeScript 에러 없음
- [ ] ESLint 경고 없음
- [ ] Vercel에 성공적으로 배포됨
- [ ] Lighthouse 기본 점수 확인

---

## Phase 2: Notion CMS 연동 및 블로그 핵심 기능

**목표**: Notion 데이터베이스 연동 및 블로그 기본 기능 구현  
**예상 기간**: 4-5일  
**배포 목표**: 실제 콘텐츠가 표시되는 블로그 배포

### 2.1 Notion API 설정

- [ ] Notion Integration 생성 및 권한 설정
- [ ] Notion 데이터베이스 생성 및 속성 정의
  - 제목 (Title)
  - 슬러그 (Rich Text)
  - 카테고리 (Select)
  - 태그 (Multi-select)
  - 발행일 (Date)
  - 발행 여부 (Checkbox)
- [ ] Notion API 클라이언트 설정
  - `@notionhq/client` 설치
  - API 클라이언트 유틸리티 함수 (`lib/api/notion.ts`)

### 2.2 Notion 데이터 페칭 구현

- [ ] Notion 페이지 목록 조회 함수
- [ ] 단일 페이지 조회 함수
- [ ] 페이지 메타데이터 파싱
- [ ] 블록 컨텐츠 파싱
- [ ] 에러 핸들링 구현

### 2.3 블로그 포스트 타입 정의

- [ ] `Post` 타입 정의
- [ ] `PostMeta` 타입 정의
- [ ] `Category` 타입 정의
- [ ] `Tag` 타입 정의

### 2.4 블로그 목록 페이지 구현

- [ ] 블로그 목록 페이지 (`app/blog/page.tsx`)
  - Server Component로 데이터 페칭
  - 포스트 카드 컴포넌트
  - 반응형 그리드 레이아웃
- [ ] 포스트 카드 컴포넌트 (`components/common/PostCard.tsx`)
  - 썸네일 이미지
  - 제목, 설명, 날짜
  - 카테고리 및 태그 표시
- [ ] 로딩 상태 처리 (`app/blog/loading.tsx`)
- [ ] 에러 상태 처리 (`app/blog/error.tsx`)

### 2.5 블로그 상세 페이지 구현

- [ ] 동적 라우트 설정 (`app/blog/[slug]/page.tsx`)
- [ ] Notion 블록 렌더링 컴포넌트
  - 제목 (Heading 1-3)
  - 문단 (Paragraph)
  - 목록 (Bullet, Numbered)
  - 인용구 (Quote)
  - 코드 블록 (Code)
  - 이미지 (Image)
  - 링크 (Link)
- [ ] 마크다운 스타일링
- [ ] 코드 하이라이팅 설정 (`react-syntax-highlighter` 또는 `shiki`)
- [ ] 메타데이터 설정 (`generateMetadata`)

### 2.6 카테고리 및 태그 기능

- [ ] 카테고리 페이지 (`app/category/[category]/page.tsx`)
- [ ] 태그 페이지 (`app/tag/[tag]/page.tsx`)
- [ ] 카테고리/태그 필터링 로직
- [ ] 사이드바 카테고리 목록 컴포넌트
- [ ] 태그 클라우드 컴포넌트 (선택사항)

### 2.7 이미지 최적화

- [ ] Notion 이미지 URL 처리
- [ ] `next/image` 컴포넌트 적용
- [ ] 이미지 도메인 설정 (`next.config.js`)
- [ ] 이미지 플레이스홀더 처리

### 2.8 ISR (Incremental Static Regeneration) 설정

- [ ] 정적 생성 전략 수립
- [ ] `revalidate` 설정
- [ ] On-demand Revalidation API 라우트 (선택사항)
  - `app/api/revalidate/route.ts`

### 2.9 검색 기능 구현

- [ ] 클라이언트 사이드 검색 컴포넌트
- [ ] 검색 API 라우트 (`app/api/search/route.ts`)
- [ ] 검색 결과 페이지
- [ ] 검색어 하이라이팅

### 2.10 두 번째 배포 준비

- [ ] Notion API 키 환경 변수 설정
- [ ] 빌드 테스트 및 최적화 확인
- [ ] 프로덕션 환경에서 Notion 데이터 로드 확인
- [ ] 이미지 최적화 검증

### ✅ Phase 2 완료 체크리스트

- [ ] Notion에서 포스트 목록이 정상적으로 표시됨
- [ ] 포스트 상세 페이지가 정상적으로 렌더링됨
- [ ] 카테고리 및 태그 필터링 작동
- [ ] 검색 기능 정상 작동
- [ ] 이미지가 최적화되어 로드됨
- [ ] 메타데이터가 올바르게 설정됨
- [ ] ISR이 정상 작동함

---

## Phase 3: 사용자 경험 개선 및 고급 기능

**목표**: 다크모드, 댓글 시스템 등 UX 개선 기능 구현  
**예상 기간**: 3-4일  
**배포 목표**: 완성도 높은 블로그 배포

### 3.1 다크모드 구현

- [ ] 테마 프로바이더 컴포넌트 생성
  - `components/providers/ThemeProvider.tsx`
- [ ] 다크모드 전환 버튼 컴포넌트
- [ ] 시스템 테마 감지
- [ ] 로컬 스토리지 테마 저장
- [ ] 테마별 색상 팔레트 정의
- [ ] Flash of Unstyled Content (FOUC) 방지

### 3.2 페이지 전환 애니메이션

- [ ] Framer Motion 설치 및 설정
- [ ] 페이지 전환 애니메이션 적용
- [ ] 레이아웃 애니메이션
- [ ] 스크롤 애니메이션 (선택사항)

### 3.3 댓글 시스템 통합

- [ ] Giscus 설정
  - GitHub 리포지토리 연결
  - Giscus 설정 완료
- [ ] 댓글 컴포넌트 생성
  - `components/common/Comments.tsx`
- [ ] 포스트 상세 페이지에 댓글 영역 추가
- [ ] 다크모드 연동 확인

### 3.4 반응형 디자인 개선

- [ ] 모바일 레이아웃 최적화
- [ ] 태블릿 레이아웃 최적화
- [ ] 데스크톱 레이아웃 최적화
- [ ] 터치 인터랙션 개선
- [ ] 반응형 타이포그래피

### 3.5 추가 UI 컴포넌트

- [ ] Breadcrumb 컴포넌트
- [ ] Table of Contents 컴포넌트 (목차)
- [ ] Related Posts 컴포넌트 (관련 포스트)
- [ ] Share 버튼 컴포넌트
- [ ] Scroll to Top 버튼

### 3.6 SEO 최적화

- [ ] 동적 메타데이터 생성 (`generateMetadata`)
- [ ] OG 이미지 생성 및 설정
- [ ] 사이트맵 생성 (`app/sitemap.ts`)
- [ ] robots.txt 생성 (`app/robots.ts`)
- [ ] 구조화된 데이터 (JSON-LD) 추가
  - BlogPosting 스키마
  - Organization 스키마
- [ ] Open Graph 태그 설정
- [ ] Twitter Card 설정

### 3.7 성능 모니터링

- [ ] Web Vitals 측정
- [ ] Lighthouse 점수 확인
- [ ] 성능 병목 지점 파악
- [ ] 번들 크기 분석

### 3.8 세 번째 배포 준비

- [ ] 모든 기능 통합 테스트
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 디바이스 테스트
- [ ] SEO 검증 (Google Search Console)
- [ ] 성능 점수 확인

### ✅ Phase 3 완료 체크리스트

- [ ] 다크모드가 정상 작동함
- [ ] 페이지 전환이 부드럽게 동작함
- [ ] 댓글 시스템이 정상 작동함
- [ ] 모든 화면 크기에서 레이아웃이 적절함
- [ ] SEO 메타데이터가 올바르게 설정됨
- [ ] 사이트맵 및 robots.txt 정상 작동
- [ ] Lighthouse 성능 점수 90점 이상

---

## Phase 4: 성능 최적화 및 품질 향상

**목표**: 최종 최적화 및 코드 품질 향상  
**예상 기간**: 3-4일  
**배포 목표**: 프로덕션 레디 최종 배포

### 4.1 성능 최적화

- [ ] 이미지 최적화 검증 및 개선
  - 적절한 이미지 포맷 사용
  - 이미지 사이즈 최적화
  - Lazy loading 적용
- [ ] 폰트 최적화
  - 폰트 preload 설정
  - 폰트 표시 전략 (font-display)
- [ ] 코드 스플리팅 최적화
  - 동적 import 적용
  - 불필요한 번들 제거
- [ ] 캐싱 전략 최적화
  - Next.js 캐싱 전략 조정
  - CDN 캐싱 설정

### 4.2 Lighthouse 점수 개선

- [ ] 성능 점수 95점 이상 목표
  - First Contentful Paint 최적화
  - Largest Contentful Paint 최적화
  - Cumulative Layout Shift 최소화
  - Time to Interactive 개선
- [ ] 접근성 점수 100점 목표
  - ARIA 속성 추가
  - 키보드 네비게이션 개선
  - 색상 대비 검증
- [ ] Best Practices 점수 100점 목표
  - HTTPS 사용 확인
  - 콘솔 에러 제거
  - 이미지 alt 속성 확인

### 4.3 보안 강화

- [ ] Content Security Policy 설정
  - `next.config.js`에 헤더 추가
- [ ] 환경 변수 보안 점검
  - API 키 노출 확인
  - `.env` 파일 검증
- [ ] API 라우트 보안
  - Rate limiting (선택사항)
  - CORS 설정
  - 입력 검증

### 4.4 에러 처리 개선

- [ ] 전역 에러 바운더리
  - `app/error.tsx` 개선
- [ ] 404 페이지 커스터마이징
  - `app/not-found.tsx`
- [ ] 에러 로깅 시스템 (선택사항)
  - Sentry 통합 또는 간단한 로깅

### 4.5 테스트 작성

- [ ] 단위 테스트 설정 (Jest + React Testing Library)
- [ ] 컴포넌트 테스트 작성
  - 핵심 컴포넌트 테스트
- [ ] 유틸리티 함수 테스트
- [ ] E2E 테스트 설정 (Playwright 또는 Cypress)
  - 핵심 사용자 플로우 테스트

### 4.6 문서화

- [ ] README.md 작성
  - 프로젝트 소개
  - 설치 방법
  - 환경 변수 설정
  - 배포 방법
  - 기술 스택
- [ ] API 문서화
  - Notion API 연동 가이드
- [ ] 컴포넌트 문서화 (선택사항)
  - Storybook 설정 또는 간단한 문서

### 4.7 코드 품질 검증

- [ ] TypeScript strict 모드 검증
- [ ] ESLint 규칙 준수 확인
- [ ] 코드 리뷰 및 리팩토링
- [ ] 중복 코드 제거
- [ ] 불필요한 의존성 제거

### 4.8 최종 배포 준비

- [ ] 프로덕션 빌드 테스트
- [ ] 모든 환경 변수 확인
- [ ] 배포 스크립트 검증
- [ ] 롤백 계획 수립
- [ ] 모니터링 설정 확인

### 4.9 배포 후 검증

- [ ] 프로덕션 사이트 기능 검증
- [ ] 성능 메트릭 확인
- [ ] SEO 검증 (Google Search Console)
- [ ] 크로스 브라우저 최종 테스트
- [ ] 모바일 최종 테스트

### ✅ Phase 4 완료 체크리스트

- [ ] Lighthouse 성능 점수 95점 이상
- [ ] Lighthouse 접근성 점수 100점
- [ ] 모든 테스트 통과
- [ ] 문서화 완료
- [ ] 보안 검증 완료
- [ ] 프로덕션 환경 정상 작동
- [ ] 배포 자동화 설정 완료

---

## 🚀 배포 체크리스트 (각 Phase마다)

### 배포 전 확인사항

- [ ] 빌드가 에러 없이 완료됨 (`npm run build`)
- [ ] 모든 환경 변수가 설정됨
- [ ] 테스트가 통과함 (있는 경우)
- [ ] 코드 리뷰 완료 (필요시)

### 배포 후 확인사항

- [ ] 사이트가 정상적으로 로드됨
- [ ] 모든 주요 기능이 작동함
- [ ] 성능 메트릭 확인
- [ ] 에러 로그 확인
- [ ] 모바일 반응형 확인

---

## 📝 개발 일정 요약

| Phase    | 기간        | 주요 작업           | 배포 목표          |
| -------- | ----------- | ------------------- | ------------------ |
| Phase 1  | 2-3일       | 프로젝트 초기 설정  | MVP 배포           |
| Phase 2  | 4-5일       | Notion CMS 연동     | 기능 완성 배포     |
| Phase 3  | 3-4일       | UX 개선             | 완성도 높은 배포   |
| Phase 4  | 3-4일       | 최적화 및 품질 향상 | 프로덕션 레디 배포 |
| **총계** | **12-16일** |                     | **4회 배포**       |

---

## 🛠 기술 스택

- **프레임워크**: Next.js 14+ (App Router)
- **언어**: TypeScript (strict mode)
- **스타일링**: TailwindCSS
- **UI 컴포넌트**: ShadcnUI
- **CMS**: Notion API
- **애니메이션**: Framer Motion
- **댓글**: Giscus
- **배포**: Vercel
- **테스트**: Jest, React Testing Library, Playwright

---

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Notion API 문서](https://developers.notion.com/)
- [ShadcnUI 문서](https://ui.shadcn.com/)
- [Vercel 배포 가이드](https://vercel.com/docs)

---

## 📌 주의사항

1. **환경 변수 보안**: API 키는 절대 커밋하지 마세요
2. **점진적 개발**: 각 Phase를 완료한 후 배포하여 안정성 확보
3. **성능 모니터링**: 각 배포 후 성능 메트릭을 확인하고 개선
4. **사용자 피드백**: 배포 후 사용자 피드백을 수집하여 다음 Phase에 반영

---

**마지막 업데이트**: 2024년
**문서 버전**: 1.0
