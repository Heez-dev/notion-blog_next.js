# Notion Blog - Next.js

Notion을 CMS로 활용하는 현대적인 블로그 프로젝트입니다. Next.js App Router와 TypeScript를 기반으로 구축되었으며, 반응형 디자인과 최적화된 성능을 제공합니다.

## 📋 목차

- [기능](#-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [개발 가이드](#-개발-가이드)
- [배포](#-배포)
- [문서](#-문서)
- [라이선스](#-라이선스)

## ✨ 기능

### 현재 구현된 기능 (Phase 1)

- ✅ Next.js App Router 기반 프로젝트 구조
- ✅ TypeScript 엄격 모드 설정
- ✅ Tailwind CSS v4 스타일링 시스템
- ✅ ShadcnUI 컴포넌트 통합
- ✅ ESLint + Prettier 코드 품질 관리
- ✅ 기본 레이아웃 및 홈페이지
- ✅ 다크모드 지원 (CSS 변수 기반)

### 계획된 기능

- 🔲 Notion API를 통한 CMS 연동
- 🔲 블로그 포스트 목록 및 상세 페이지
- 🔲 카테고리 및 태그 시스템
- 🔲 검색 기능
- 🔲 댓글 시스템 (Giscus)
- 🔲 SEO 최적화
- 🔲 성능 최적화

자세한 개발 계획은 [로드맵 문서](./Doc_ROADMAP.md)를 참고하세요.

## 🛠 기술 스택

### 핵심 프레임워크

- **[Next.js](https://nextjs.org/)** `16.0.1` - React 프레임워크 (App Router)
- **[React](https://react.dev/)** `19.2.0` - UI 라이브러리
- **[TypeScript](https://www.typescriptlang.org/)** `^5` - 타입 안정성

### 스타일링

- **[Tailwind CSS](https://tailwindcss.com/)** `^4.1.16` - 유틸리티 CSS 프레임워크
- **[ShadcnUI](https://ui.shadcn.com/)** - 재사용 가능한 UI 컴포넌트
- **[Lucide React](https://lucide.dev/)** - 아이콘 라이브러리

### 개발 도구

- **[ESLint](https://eslint.org/)** `^9` - 코드 린팅
- **[Prettier](https://prettier.io/)** `^3.6.2` - 코드 포매팅
- **[pnpm](https://pnpm.io/)** - 패키지 매니저

### 예정된 통합

- **Notion API** - CMS 데이터 소스
- **Giscus** - 댓글 시스템
- **Framer Motion** - 애니메이션

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.17 이상
- pnpm 8 이상

### 설치

1. 저장소 클론:

```bash
git clone <repository-url>
cd notion-blog_next.js
```

2. 의존성 설치:

```bash
pnpm install
```

3. 환경 변수 설정 (향후 Notion API 연동 시 필요):

```bash
cp .env.example .env.local
```

`.env.local` 파일을 생성하고 필요한 환경 변수를 설정하세요.

4. 개발 서버 실행:

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

프로덕션 빌드:

```bash
pnpm build
```

로컬에서 프로덕션 서버 실행:

```bash
pnpm start
```

## 📁 프로젝트 구조

```
notion-blog_next.js/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지
│   └── globals.css         # 글로벌 스타일
├── components/             # React 컴포넌트
│   └── ui/                 # ShadcnUI 컴포넌트
│       └── card.tsx        # Card 컴포넌트
├── lib/                    # 유틸리티 함수
│   └── utils.ts            # 공통 유틸리티
├── public/                 # 정적 파일
├── Doc_README.md           # 프로젝트 README (이 파일)
├── Doc_SRS.md             # 요구사항 명세서
├── Doc_ROADMAP.md         # 개발 로드맵
├── eslint.config.mjs       # ESLint 설정
├── next.config.ts          # Next.js 설정
├── package.json            # 프로젝트 의존성
├── postcss.config.mjs      # PostCSS 설정
└── tsconfig.json           # TypeScript 설정
```

### 디렉토리 구조 규칙

프로젝트는 다음과 같은 구조를 따릅니다:

- `app/` - Next.js App Router 페이지 및 레이아웃
- `components/` - 재사용 가능한 React 컴포넌트
  - `ui/` - ShadcnUI 기반 기본 UI 컴포넌트
  - `layouts/` - 레이아웃 컴포넌트 (예정)
  - `common/` - 공통 컴포넌트 (예정)
  - `features/` - 기능별 컴포넌트 (예정)
- `lib/` - 유틸리티 함수 및 헬퍼
- `hooks/` - 커스텀 React 훅 (예정)
- `types/` - TypeScript 타입 정의 (예정)

## 💻 개발 가이드

### 코드 스타일

프로젝트는 일관된 코드 스타일을 유지합니다:

- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포매팅

코드 포매팅:

```bash
pnpm format
```

린트 검사:

```bash
pnpm lint
```

린트 자동 수정:

```bash
pnpm lint:fix
```

### 컴포넌트 작성 규칙

컴포넌트는 다음 규칙을 따릅니다:

- PascalCase 파일 명명 (예: `Button.tsx`)
- 명시적인 Props 인터페이스 정의
- ShadcnUI 컴포넌트 우선 사용
- 단일 책임 원칙 준수

자세한 컴포넌트 작성 가이드는 프로젝트 내 `.cursor/rules/` 디렉토리의 규칙 파일을 참고하세요.

### 타입 정의

TypeScript strict 모드가 활성화되어 있습니다:

- `any` 타입 사용 금지
- 명시적인 타입 정의 권장
- 인터페이스와 타입 별칭 적절히 활용

### Git 커밋

- 의미 있는 커밋 메시지 작성
- 작은 단위로 자주 커밋
- 기능별 브랜치 사용 권장

## 🚢 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 프로젝트 연결
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포 완료

### 수동 배포

```bash
pnpm build
```

빌드된 파일은 `.next` 디렉토리에 생성됩니다.

## 📚 문서

- [요구사항 명세서](./Doc_SRS.md) - 프로젝트 기능 및 비기능 요구사항
- [개발 로드맵](./Doc_ROADMAP.md) - 단계별 개발 계획 및 체크리스트

## 🤝 기여

프로젝트 개선을 위한 기여를 환영합니다. 다음 단계를 따르세요:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - 훌륭한 React 프레임워크
- [ShadcnUI](https://ui.shadcn.com/) - 아름다운 UI 컴포넌트
- [Tailwind CSS](https://tailwindcss.com/) - 강력한 CSS 프레임워크
- [Notion](https://www.notion.so/) - 유연한 CMS 플랫폼

---

**마지막 업데이트**: 2024년 12월  
**프로젝트 버전**: 0.1.0  
**개발 단계**: Phase 1 (초기 설정 완료)
