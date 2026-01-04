# liquidGL 옵션 가이드

> **최근 수정**: 2026-01-03  
> **참조**: https://github.com/naughtyduk/liquidGL

---

## 개요

`liquidGL`은 Apple의 "Liquid Glass" 미학을 브라우저에서 구현하는 초경량 WebGL 라이브러리입니다. DOM 요소를 굴절되는 유리 패널로 변환합니다.

### 주요 특징

| 기능 | 지원 | 기능 | 지원 |
|------|------|------|------|
| 실시간 굴절 (정적 콘텐츠) | ✅ | 확대/축소 제어 | ✅ |
| 실시간 굴절 (비디오) | ✅ | 동적 요소 지원 | ✅ |
| 실시간 굴절 (텍스트 애니메이션) | ✅ | GSAP 애니메이션 호환 | ✅ |
| 실시간 굴절 (CSS 애니메이션) | ❌ | 경량 & 고성능 | ✅ |
| 베젤 조절 | ✅ | 스크롤 동기화 | ✅ |
| 프로스트 효과 | ✅ | 자동 리사이즈 | ✅ |
| 동적 그림자 | ✅ | 비디오 자동 굴절 | ✅ |
| 스페큘러 하이라이트 | ✅ | 렌즈 애니메이션 | ✅ |
| 마우스 틸트 효과 | ✅ | on.init 콜백 | ✅ |

---

## 설치

```html
<!-- html2canvas (필수 의존성) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" defer></script>

<!-- liquidGL -->
<script src="https://cdn.jsdelivr.net/gh/naughtyduk/liquidGL@main/scripts/liquidGL.js" defer></script>
```

---

## 기본 사용법

### HTML 구조

```html
<body>
  <!-- 글래스 효과 적용 대상 -->
  <div class="liquidGL">
    <!-- 내부 콘텐츠 (유리 위에 표시) -->
    <div class="content">
      <p>이 텍스트는 유리 위에 표시됩니다.</p>
    </div>
  </div>
</body>
```

### JavaScript 초기화

```javascript
document.addEventListener('DOMContentLoaded', () => {
  liquidGL({
    target: '.liquidGL',  // 필수
    // ... 기타 옵션
  });
});
```

---

## 전체 옵션 목록

### 기본 옵션

| 옵션 | 타입 | 기본값 | 범위 | 설명 |
|------|------|--------|------|------|
| `snapshot` | string | `'body'` | CSS 선택자 | 굴절에 사용할 스냅샷 영역 |
| `target` | string | **필수** | CSS 선택자 | 글래스 효과 적용 대상 |
| `resolution` | number | `2.0` | 1.0 ~ 3.0 | 스냅샷 해상도 (높을수록 선명, 메모리 증가) |

### 효과 옵션

| 옵션 | 타입 | 기본값 | 범위 | 설명 |
|------|------|--------|------|------|
| `refraction` | number | `0.01` | 0 ~ 0.1 | 굴절 강도 (렌즈 왜곡) |
| `bevelDepth` | number | `0.052` | 0 ~ 0.2 | 베젤 깊이 (두께감) |
| `bevelWidth` | number | `0.211` | 0 ~ 0.3 | 베젤 너비 (가장자리 영역) |
| `frost` | number | `2` | 0 ~ 3 | 프로스트(서리) 효과 |
| `magnification` | number | `1.0` | 0.9 ~ 1.1 | 확대/축소 효과 |

### 시각 효과 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `shadow` | boolean | `true` | 그림자 효과 (z-index - 2에 레이어 생성) |
| `specular` | boolean | `true` | 스페큘러(반사광) 하이라이트 |
| `tilt` | boolean | `false` | 마우스 틸트 효과 (z-index - 1에 레이어 생성) |

### 콜백 옵션

```javascript
liquidGL({
  target: '.glass',
  on: {
    init: (lens) => {
      console.log('liquidGL 초기화 완료', lens);
    }
  }
});
```

---

## 프리셋

### Default (기본)
균형 잡힌 기본 설정

```javascript
{
  refraction: 0,
  bevelDepth: 0.052,
  bevelWidth: 0.211,
  frost: 2,
  shadow: true,
  specular: true
}
```

### Alien (에일리언)
SF/사이버펑크 느낌 - 강한 굴절 + 깊은 베젤

```javascript
{
  refraction: 0.073,
  bevelDepth: 0.2,
  bevelWidth: 0.156,
  frost: 2,
  shadow: true,
  specular: false
}
```

### Pulse (펄스)
플랫 + 넓은 베젤 - UI 펄스 효과에 적합

```javascript
{
  refraction: 0.03,
  bevelDepth: 0,
  bevelWidth: 0.273,
  frost: 0,
  shadow: false,
  specular: false
}
```

### Frost (프로스트)
부드러운 프라이버시 글래스

```javascript
{
  refraction: 0,
  bevelDepth: 0.035,
  bevelWidth: 0.119,
  frost: 0.9,
  shadow: true,
  specular: true
}
```

### Edge (엣지)
얇은 베젤 + 밝은 림 하이라이트

```javascript
{
  refraction: 0.047,
  bevelDepth: 0.136,
  bevelWidth: 0.076,
  frost: 2,
  shadow: true,
  specular: false
}
```

### YTH (유태형 3.0 커스텀)
미니멀 + 미묘한 굴절

```javascript
{
  refraction: 0.025,
  bevelDepth: 0.04,
  bevelWidth: 0.12,
  frost: 0.3,
  shadow: false,
  specular: true
}
```

---

## 중요 사항

### z-index 규칙
- **모든 target 요소는 동일한 z-index 필수** (공유 캔버스 최적화)
- `shadow` 사용 시: z-index - 2에 레이어 생성
- `tilt` 사용 시: z-index - 1에 레이어 생성
- 충분한 z-index 여유 확보 권장 (예: z-index: 100 사용 시, 97 이상 비워두기)

### Fixed 요소 제한
- **liquidGL은 `position: fixed` 요소를 무시**
- 이유: html2canvas와 모바일 브라우저 간 버그 방지
- 해결책: `position: sticky` 사용

### 성능 최적화
```javascript
// 큰 페이지에서 특정 영역만 스냅샷
liquidGL({
  snapshot: '.my-background',  // body 대신 특정 컨테이너
  target: '.glass',
  resolution: 1.5  // 해상도 낮춤
});
```

### 동적 콘텐츠 등록
```javascript
// 비디오, 애니메이션 등 동적 요소 등록
liquidGL.registerDynamic('.video-container');
```

### 요소 제외
```html
<!-- 스냅샷에서 제외할 요소 -->
<div data-liquid-ignore>
  프리로더, 모달 등
</div>
```

---

## 브라우저 지원

| 브라우저 | 지원 |
|----------|------|
| Chrome | ✅ |
| Safari | ✅ (뷰포트 50% 초과 시 불안정할 수 있음) |
| Firefox | ✅ |
| Edge | ✅ |

---

## 트러블슈팅

### 효과가 나타나지 않음
1. html2canvas 로드 확인
2. target 선택자 확인
3. z-index 설정 확인
4. 콘솔 에러 확인

### CORS 에러
- 이미지에 `Access-Control-Allow-Origin` 헤더 필요
- 로컬 개발 시 서버 사용 필수 (`file://` 불가)

### 성능 저하
- `resolution` 낮추기 (1.5 권장)
- `shadow`, `tilt` 비활성화
- 스냅샷 영역 축소

---

## 현재 프로젝트 적용

### 파일 구조
```
yth3.0/
├── index.html         # liquid-frame 프레임 정의
├── styles.css         # 프레임 스타일 (z-index 통일)
├── script.js          # liquidGL 초기화 + 프리셋
└── docs/
    └── LIQUIDGL_OPTIONS.md  # 이 문서
```

### 프레임 구조
```html
<div class="liquid-frame-wrapper">
  <div class="liquid-frame liquid-top"></div>
  <div class="liquid-frame liquid-bottom"></div>
  <div class="liquid-frame liquid-left"></div>
  <div class="liquid-frame liquid-right"></div>
</div>
```

### 프리셋 변경
`script.js`에서 `CURRENT_PRESET` 변수 수정:

```javascript
// 사용 가능: 'default', 'alien', 'pulse', 'frost', 'edge', 'yth'
const CURRENT_PRESET = 'yth';
```

---

## 참조

- [liquidGL GitHub](https://github.com/naughtyduk/liquidGL)
- [데모 1](https://liquidgl.naughtyduk.com/)
- [html2canvas](https://html2canvas.hertzen.com/)

