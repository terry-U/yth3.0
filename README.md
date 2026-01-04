# 유태형 3.0 - 개인 소개 & 회사 소개 홈페이지

> **"인류를 더 지혜롭게"** - 이것이 나의 WHY입니다.

## 🎯 프로젝트 개요

유태형 3.0은 미러보드 창업자 유태형의 개인 소개 및 회사 소개 홈페이지입니다.
2019년에 만들어진 "유태형 2.0"의 진화 버전으로, 삶의 방향성을 찾은 후 철학과 미션 중심으로 재구성되었습니다.

## 🌐 라이브 환경

- **개발 서버**: 로컬에서 `index.html` 직접 열기 또는 Live Server 사용
- **스테이징**: (배포 후 추가)
- **프로덕션**: (배포 후 추가)

## 🛠 기술 스택

- **HTML5** - 시맨틱 마크업
- **CSS3** - CSS Variables, Flexbox, Grid, 애니메이션
- **Vanilla JavaScript** - 인터랙션, Intersection Observer API
- **Fonts**: Cormorant Garamond (영문 세리프) + Noto Sans KR (한글) + JetBrains Mono (코드)

### 외부 의존성 없음
- 빌드 도구 없이 바로 실행 가능
- 프레임워크 없이 순수 HTML/CSS/JS로 구성
- 폰트만 Google Fonts CDN 사용

## 📁 프로젝트 구조

```
yth3.0/
├── index.html          # 메인 HTML
├── styles.css          # 스타일시트
├── script.js           # 인터랙션 스크립트
├── README.md           # 프로젝트 문서
├── docs/
│   └── PROJECT_CONCEPT.md  # 컨셉 정의 문서
├── ~2020               # 2012-2020 경력 내용 (참고 자료)
├── givv                # GIVV 프로젝트 참고 자료
├── meltingpot          # Melting Pot AI 참고 자료
└── mirrorboard         # 미러보드 참고 자료
```

## 🎨 디자인 시스템

### 색상
- **배경**: 딥 네이비/블랙 계열 (#0a0a0f ~ #1a1a24)
- **텍스트**: 화이트 계열 (#f5f5f7, #a0a0a8)
- **악센트**: 골드/앰버 (#d4a853) - 지혜와 깊이를 상징

### 타이포그래피
- **세리프 (영문)**: Cormorant Garamond - 클래식하고 철학적인 느낌
- **산세리프 (한글)**: Noto Sans KR - 가독성과 현대성
- **모노스페이스**: JetBrains Mono - 기술적 요소

### 핵심 인터랙션
- 커서 따라다니는 글로우 효과
- 스크롤 기반 요소 등장 애니메이션
- 타임라인 스크롤 인터랙션
- 히어로 텍스트 3D 기울기 효과

## 📄 섹션 구성

1. **Hero** - 핵심 메시지 "인류를 더 지혜롭게"
2. **WHY** - 정체성과 철학 (기본학교, AI 올인, AI고용학회)
3. **JOURNEY** - 2012년부터 현재까지의 여정
4. **NOW** - 현재 진행 중인 프로젝트들 (CELI, Mirrorboard, Melting Pot AI, findmywhy.co)
5. **CONNECT** - 연락처 및 협업 안내

## 🚀 실행 방법

### 로컬 실행
```bash
# 방법 1: 브라우저에서 직접 열기
open index.html

# 방법 2: Python 간이 서버
python3 -m http.server 8080

# 방법 3: Node.js http-server
npx http-server
```

### VS Code Live Server
1. Live Server 익스텐션 설치
2. index.html 우클릭 → "Open with Live Server"

## 📝 주요 수정 이력

### 2026-01-03
- 초기 버전 생성
- HTML/CSS/JS 핵심 구조 구현
- 컨셉 문서 작성
- 반응형 디자인 적용

## 📌 향후 개선 사항

- [ ] 이미지/비주얼 자산 추가
- [ ] SEO 메타 태그 보강
- [ ] Open Graph 태그 추가
- [ ] 애널리틱스 연동
- [ ] 다국어 지원 (영문 버전)
- [ ] 성능 최적화 (이미지 lazy loading 등)
- [ ] 배포 환경 구축

## 👤 제작자

**유태형 (Taehyung Yoo)**
- Email: contact@mirrorboard.com
- 미러보드: https://catalyst-fe33d0.webflow.io/
- findmywhy.co: https://www.findmywhy.co
- Melting Pot AI: https://meltingpot.cc

---

© 2026 Taehyung Yoo. Making Humanity Wiser.

