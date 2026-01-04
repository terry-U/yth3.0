# 유태형 3.0 디자인 시스템

## 📅 최종 업데이트: 2026-01-03

---

## 🎨 디자인 컨셉

**"Vibrant Future"** - 젊고 역동적인 테크 포트폴리오

- 다크 네이비 배경 + 네온 그라데이션 악센트
- 글래스모피즘(Glassmorphism) 카드 컴포넌트
- 모던 산세리프 타이포그래피
- GSAP 기반 스크롤 애니메이션

---

## 🎨 색상 팔레트

### 배경 색상
```css
--color-bg-primary: #0c0c1d;    /* 메인 배경 */
--color-bg-secondary: #0f0f24;  /* 보조 배경 */
--color-bg-tertiary: #161633;   /* 카드/패널 배경 */
```

### 텍스트 색상
```css
--color-text-primary: #f8f8fc;    /* 메인 텍스트 */
--color-text-secondary: #b8b8d0;  /* 보조 텍스트 */
--color-text-muted: #6a6a8e;      /* 약한 텍스트 */
```

### 악센트 색상
| 이름 | 색상 코드 | 용도 |
|------|----------|------|
| Cyan | `#00d4ff` | 링크, HOW |
| Violet | `#7c3aed` | 프라이머리, WHY |
| Pink | `#f472b6` | WHAT |
| Orange | `#f97316` | VERSION 1.0 |
| Emerald | `#10b981` | VERSION 2.0 |

### 그라데이션
```css
--gradient-primary: linear-gradient(135deg, #00d4ff, #7c3aed);
--gradient-warm: linear-gradient(135deg, #f472b6, #fb923c);
--gradient-cool: linear-gradient(135deg, #7c3aed, #00d4ff);
```

---

## 🔮 글래스모피즘 토큰

### 배경 투명도
```css
--glass-bg-subtle: rgba(255, 255, 255, 0.03);
--glass-bg-light: rgba(255, 255, 255, 0.06);
--glass-bg-medium: rgba(255, 255, 255, 0.1);
--glass-bg-strong: rgba(255, 255, 255, 0.15);
```

### 테두리
```css
--glass-border-subtle: rgba(255, 255, 255, 0.06);
--glass-border-light: rgba(255, 255, 255, 0.1);
--glass-border-medium: rgba(255, 255, 255, 0.18);
--glass-border-strong: rgba(255, 255, 255, 0.25);
```

### 블러 값
```css
--blur-xs: 4px;
--blur-sm: 8px;
--blur-md: 16px;
--blur-lg: 24px;
--blur-xl: 40px;
```

### 글래스 그림자
```css
--glass-shadow-sm: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.08);
--glass-shadow-md: 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
--glass-shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12);
--glass-shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.25), inset 0 2px 0 rgba(255, 255, 255, 0.15);
```

### 글로우 효과
```css
--glass-glow-violet: 0 0 40px rgba(139, 92, 246, 0.25);
--glass-glow-cyan: 0 0 40px rgba(0, 212, 255, 0.25);
--glass-glow-pink: 0 0 40px rgba(244, 114, 182, 0.25);
--glass-glow-orange: 0 0 40px rgba(249, 115, 22, 0.25);
--glass-glow-green: 0 0 40px rgba(16, 185, 129, 0.25);
```

---

## ✏️ 타이포그래피

### 폰트 패밀리
```css
--font-display: 'Syne', sans-serif;           /* 헤드라인, 숫자 */
--font-body: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;  /* 본문 */
--font-mono: 'JetBrains Mono', monospace;     /* 레이블, 태그, 코드 */
```

### 폰트 크기
```css
--fs-display: clamp(4rem, 18vw, 14rem);   /* 히어로 숫자 */
--fs-hero: clamp(3rem, 12vw, 8rem);       /* 히어로 타이틀 */
--fs-h1: clamp(2.5rem, 7vw, 5rem);        /* 섹션 타이틀 */
--fs-h2: clamp(2rem, 5vw, 3.5rem);        /* 서브 타이틀 */
--fs-h3: clamp(1.25rem, 2.5vw, 1.875rem); /* 카드 타이틀 */
--fs-body: clamp(1rem, 1.2vw, 1.125rem);  /* 본문 */
--fs-small: clamp(0.875rem, 1vw, 1rem);   /* 작은 텍스트 */
--fs-caption: clamp(0.75rem, 0.9vw, 0.875rem); /* 캡션 */
```

---

## 📐 간격 시스템

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2.5rem;   /* 40px */
--space-xl: 4rem;     /* 64px */
--space-2xl: 6rem;    /* 96px */
--space-3xl: 10rem;   /* 160px */
```

---

## 🔘 컴포넌트

### 글래스 카드 (`.glass-card`)
기본 카드 컴포넌트. 호버 시 상승 + 글로우 효과.

```css
.glass-card {
    background: linear-gradient(145deg, var(--glass-bg-light), var(--glass-bg-subtle));
    backdrop-filter: blur(var(--blur-md));
    border: 1px solid var(--glass-border-light);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--glass-shadow-md);
}
```

### 색상 변형
- `.glass-card--violet` - 바이올렛 테두리/글로우
- `.glass-card--cyan` - 시안 테두리/글로우
- `.glass-card--orange` - 오렌지 테두리/글로우 (1.0용)
- `.glass-card--green` - 그린 테두리/글로우 (2.0용)

### 글래스 패널 (`.glass-panel`)
넓은 영역용 패널. 골든 서클 설명 패널 등에 사용.

### 글래스 버튼 (`.glass-button`)
인셋 섀도우로 입체감 있는 버튼.

---

## 📱 반응형 브레이크포인트

```css
@media (max-width: 1024px) { /* 태블릿 */ }
@media (max-width: 768px)  { /* 모바일 */ }
@media (max-width: 480px)  { /* 소형 모바일 */ }
```

### 모바일 최적화
- `backdrop-filter` 블러 값 감소 (성능)
- 카드 1열 레이아웃
- 골든 서클 세로 배치

---

## ⚡ 애니메이션

### 트랜지션
```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slower: 0.8s cubic-bezier(0.4, 0, 0.2, 1);
```

### 주요 애니메이션
- `slide-up` - 아래에서 위로 등장
- `fade-in-up` - 페이드인 + 상승
- `glow-pulse` - 글로우 펄스 (3.0 버전 뱃지)
- `pulse-glow` - 아이콘 펄스 (CELI 카드)

---

## 🛠 폴백 처리

`backdrop-filter` 미지원 브라우저용:

```css
@supports not (backdrop-filter: blur(10px)) {
    .glass-card, .glass-panel, .glass-button {
        background: rgba(22, 22, 51, 0.95);
    }
}
```

---

## 📁 파일 구조

```
styles.css
├── CSS Variables (Design Tokens)
├── Reset & Base
├── Layout
├── Navigation
├── Hero Section
├── Version Sections (1.0, 2.0, 3.0)
├── Golden Circle
├── About Section
├── Connect Section
├── Footer
├── Scroll Animations
├── Responsive
├── Print Styles
├── Utility Classes
└── Glassmorphism Components
```

---

## ✅ 체크리스트

- [x] 글래스모피즘 토큰 정의
- [x] 카드 컴포넌트 글래스 스타일 적용
- [x] 버튼 글래스 스타일 적용
- [x] 색상별 변형 클래스
- [x] 반응형 최적화
- [x] 폴백 처리
- [x] 콘텐츠 친절하게 작성

---

## 🔗 참고 자료

- [Glassmorphism CSS Guide](https://blog.openreplay.com/create-glassmorphic-ui-css/)
- [GSAP ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- Google Fonts: Syne, Plus Jakarta Sans, JetBrains Mono, Noto Sans KR

