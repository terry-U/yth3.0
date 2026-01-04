# Apple Liquid Glass 구현 가이드

> 2025 WWDC에서 공개된 애플의 리퀴드 글래스 디자인을 CSS + SVG 필터로 구현하는 방법

## 📅 작성일: 2026-01-03

---

## 🔍 리퀴드 글래스란?

리퀴드 글래스는 기존 글래스모피즘(블러 효과)과 다르게 **실제 유리처럼 배경이 굴절되어 비치는** 효과입니다.

### 기존 글래스모피즘 vs 리퀴드 글래스

| 특성 | 글래스모피즘 | 리퀴드 글래스 |
|------|-------------|---------------|
| 배경 처리 | 블러 (흐릿하게) | 굴절 (왜곡되어 비침) |
| 투명도 | 중간 투명도 | 매우 높은 투명도 |
| 표면 느낌 | 서리 유리 | 볼록 렌즈 |
| 하이라이트 | 전체 영역 | 가장자리(베젤)만 |

---

## 🎯 구현 핵심 4가지

### 1. 볼록 표면 (Convex)
- 가운데가 살짝 확대되는 렌즈 효과
- 상단에 강한 하이라이트 그라데이션
- `radial-gradient`로 중앙 밝음 표현

### 2. 베젤 하이라이트 (14px)
- 테두리에서 14px 영역만 곡면/빛 반사
- `linear-gradient`로 상단/좌측 가장자리 빛

### 3. 은은한 굴절 (Refraction)
- SVG `feDisplacementMap` 필터 사용
- 배경이 살짝 왜곡되어 보임
- `feTurbulence`로 유기적인 노이즈 생성

### 4. 테두리 하이라이트
- 얇은 1-2px 빛 반사 라인
- `inset box-shadow`로 입체감

---

## 💻 CSS 구현 코드

### 기본 리퀴드 글래스 클래스

```css
.liquid-glass {
    position: relative;
    
    /* 투명 + 볼록 렌즈 하이라이트 */
    background: 
        /* 상단 볼록 하이라이트 */
        radial-gradient(
            ellipse 120% 30% at 50% 0%,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.15) 30%,
            transparent 70%
        ),
        /* 중앙 밝음 (볼록 렌즈) */
        radial-gradient(
            ellipse 80% 80% at 50% 50%,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 100%
        ),
        /* 베이스 */
        rgba(255, 255, 255, 0.04);
    
    /* 색상 채도/밝기만 조절 (블러 없음) */
    backdrop-filter: saturate(120%) brightness(105%);
    -webkit-backdrop-filter: saturate(120%) brightness(105%);
    
    /* 볼록 베젤 */
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    
    /* 입체 그림자 */
    box-shadow: 
        /* 외부 - 떠있는 느낌 */
        0 8px 32px rgba(0, 0, 0, 0.12),
        /* 내부 상단 - 볼록 렌즈 */
        inset 0 1px 0 rgba(255, 255, 255, 0.6),
        inset 0 2px 4px rgba(255, 255, 255, 0.15),
        /* 내부 하단 - 두께감 */
        inset 0 -1px 0 rgba(0, 0, 0, 0.05);
    
    overflow: hidden;
}

/* 14px 베젤 하이라이트 */
.liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: 
        linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, transparent 14px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, transparent 14px);
    pointer-events: none;
}

/* 대각선 광택 줄무늬 */
.liquid-glass::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
        135deg,
        transparent 0%,
        transparent 40%,
        rgba(255, 255, 255, 0.1) 41%,
        rgba(255, 255, 255, 0.1) 43%,
        transparent 44%,
        transparent 100%
    );
    pointer-events: none;
}
```

---

## 🎨 SVG 필터 (굴절 효과)

### HTML에 추가할 SVG 필터

```html
<svg class="liquid-glass-filters" aria-hidden="true">
    <defs>
        <!-- 기본 굴절 필터 -->
        <filter id="liquid-glass-refract" x="-20%" y="-20%" width="140%" height="140%">
            <!-- 유기적 노이즈 생성 -->
            <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.015" 
                numOctaves="2" 
                seed="5"
                result="noise"
            />
            <!-- 노이즈 기반 왜곡 -->
            <feDisplacementMap 
                in="SourceGraphic" 
                in2="noise" 
                scale="8" 
                xChannelSelector="R" 
                yChannelSelector="G"
                result="displaced"
            />
            <!-- 부드럽게 -->
            <feGaussianBlur in="displaced" stdDeviation="0.5"/>
        </filter>
        
        <!-- 강한 굴절 (호버용) -->
        <filter id="liquid-glass-refract-strong">
            <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.012" 
                numOctaves="3"
                result="noise"
            />
            <feDisplacementMap 
                in="SourceGraphic" 
                in2="noise" 
                scale="12" 
                xChannelSelector="R" 
                yChannelSelector="G"
            />
        </filter>
    </defs>
</svg>
```

### CSS에서 필터 적용

```css
/* SVG 숨기기 */
.liquid-glass-filters {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
}

/* 굴절 필터 적용 */
.liquid-glass-refract {
    filter: url(#liquid-glass-refract);
}

.liquid-glass-refract:hover {
    filter: url(#liquid-glass-refract-strong);
}
```

---

## 🎨 컬러 변형

### 따뜻한 톤 (Warm)

```css
.liquid-glass--warm {
    background: 
        radial-gradient(
            ellipse 120% 30% at 50% 0%,
            rgba(255, 248, 240, 0.5) 0%,
            transparent 70%
        ),
        radial-gradient(
            ellipse 80% 80% at 50% 50%,
            rgba(255, 240, 220, 0.08) 0%,
            transparent 100%
        ),
        rgba(255, 250, 245, 0.04);
}
```

### 차가운 톤 (Cool)

```css
.liquid-glass--cool {
    background: 
        radial-gradient(
            ellipse 120% 30% at 50% 0%,
            rgba(240, 248, 255, 0.5) 0%,
            transparent 70%
        ),
        radial-gradient(
            ellipse 80% 80% at 50% 50%,
            rgba(220, 240, 255, 0.08) 0%,
            transparent 100%
        ),
        rgba(245, 250, 255, 0.04);
}
```

### 바이올렛 톤

```css
.liquid-glass--violet {
    background: 
        radial-gradient(
            ellipse 120% 30% at 50% 0%,
            rgba(248, 240, 255, 0.5) 0%,
            transparent 70%
        ),
        radial-gradient(
            ellipse 80% 80% at 50% 50%,
            rgba(139, 92, 246, 0.06) 0%,
            transparent 100%
        ),
        rgba(250, 245, 255, 0.04);
    
    box-shadow: 
        0 8px 32px rgba(139, 92, 246, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
}
```

---

## 📐 핵심 값 정리

| 속성 | 권장 값 | 설명 |
|------|---------|------|
| 배경 투명도 | 0.03 ~ 0.08 | 매우 투명해야 뒤가 비침 |
| 상단 하이라이트 | 0.5 ~ 0.7 | 볼록 렌즈 느낌 |
| 베젤 영역 | 12px ~ 16px | 가장자리 곡면 |
| 테두리 투명도 | 0.35 ~ 0.5 | 너무 강하면 부자연스러움 |
| inset shadow 밝기 | 0.6 ~ 0.8 | 상단 두께감 |
| SVG scale | 6 ~ 12 | 굴절 강도 |
| feTurbulence freq | 0.012 ~ 0.02 | 노이즈 세밀함 |

---

## ⚠️ 주의사항

### 1. 성능
- SVG 필터는 성능에 영향을 줄 수 있음
- 모바일에서는 `filter` 속성 제거 고려
- 많은 요소에 적용 시 주의

### 2. 브라우저 호환성
- `backdrop-filter`: Chrome, Safari, Firefox 최신 버전 지원
- SVG 필터: 대부분 브라우저 지원
- `-webkit-` 접두사 필수

### 3. 배경 필요
- 리퀴드 글래스는 **뒤에 무언가가 비쳐야** 의미 있음
- 단색 배경에서는 효과가 약함
- 그라데이션이나 이미지 배경 권장

---

## 📁 프로젝트 적용 현황

### 적용된 컴포넌트
- `.story-card` - 따뜻한 톤 (v1.0)
- `.experience-card` - 그린 톤 (v2.0)
- `.showcase-card` - 바이올렛 톤 (v3.0)
- `.about-card` - 뉴트럴
- `.btn-primary` - 버튼
- `.circle-info-panel` - Golden Circle 패널
- `.connect-link-item` - 링크 카드
- `.nav.scrolled` - 스크롤 네비게이션

### SVG 필터 위치
- `index.html` `<body>` 시작 부분에 정의됨
- `.liquid-glass-refract` 클래스로 적용 가능

---

## 🔗 참고 자료

- [Apple Human Interface Guidelines 2025](https://developer.apple.com/design/)
- [MDN - SVG Filter Effects](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter)
- [CSS Tricks - Glass Effect](https://css-tricks.com/glassmorphism-css/)

---

**작성자**: AI Assistant  
**최종 수정**: 2026-01-03


