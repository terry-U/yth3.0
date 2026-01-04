# Liquid Glass Mirror - 구현 컨셉 문서

## 📅 작성일: 2026-01-03

---

## 🎯 컨셉 개요

**"화면 중앙의 거울을 통해 세상을 보다"**

화면 가운데에 고정된 대형 리퀴드 글래스 렌즈(거울)가 있고,
그 뒤로 콘텐츠들이 흘러가면서 렌즈를 통과할 때 확대되어 보이는 돋보기 효과를 구현합니다.

### 핵심 메타포
- 거울은 "나를 비추는 도구"이자 "세상을 확대해 보는 렌즈"
- 유태형의 인생 여정이 거울 뒤로 흘러가며, 관찰자는 렌즈를 통해 각 순간을 자세히 들여다봄
- 콘텐츠가 "재생"되듯 자연스럽게 흘러가는 경험

---

## 🔬 기술 구현 원리

### 1. SVG Displacement Map (핵심)

Shu Ding의 Liquid Glass 코드를 기반으로 합니다:

```
Displacement Map 원리:
- 빨간 채널(R): X축 왜곡 정도
- 초록 채널(G): Y축 왜곡 정도
- 128(중간값) = 왜곡 없음
- 0~127 = 음수 방향 이동
- 129~255 = 양수 방향 이동
```

### 2. Signed Distance Function (SDF)

둥근 사각형의 거리 함수로 부드러운 가장자리 효과:

```javascript
function roundedRectSDF(x, y, width, height, radius) {
    const qx = Math.abs(x) - width + radius;
    const qy = Math.abs(y) - height + radius;
    return Math.min(Math.max(qx, qy), 0) + 
           length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
}
```

### 3. 렌즈 효과 (볼록 렌즈)

중앙으로 갈수록 확대, 가장자리는 자연스럽게 감소:

```javascript
// distanceToEdge: 가장자리까지의 거리 (SDF)
// displacement: smoothStep으로 부드럽게 0~1
// scaled: 최종 UV 스케일 - 중앙 확대, 가장자리 원본
const scaled = smoothStep(0, 1, displacement);
return texture(ix * scaled + 0.5, iy * scaled + 0.5);
```

### 4. Backdrop Filter 조합

```css
backdrop-filter: 
    url(#liquid-glass-filter)  /* SVG 굴절 */
    blur(0.25px)               /* 미세한 블러 */
    contrast(1.2)              /* 대비 증가 */
    brightness(1.05)           /* 밝기 증가 */
    saturate(1.1);             /* 채도 증가 */
```

---

## 🎨 레이아웃 구조

```
┌─────────────────────────────────────────────────────┐
│                      (빈 공간)                       │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │                                         │     │
│    │         콘텐츠가 위에서 아래로            │     │
│    │         자동으로 스크롤됨                 │     │
│    │                ↓                        │     │
│    │    ╔═══════════════════════════════╗    │     │
│    │    ║                               ║    │     │
│    │    ║    리퀴드 글래스 렌즈 (고정)     ║    │     │
│    │    ║    - 돋보기 확대 효과           ║    │     │
│    │    ║    - 굴절 디스토션              ║    │     │
│    │    ║    - 드래그로 위치 이동 가능     ║    │     │
│    │    ║                               ║    │     │
│    │    ╚═══════════════════════════════╝    │     │
│    │                ↓                        │     │
│    │         콘텐츠가 계속 흘러감             │     │
│    │                                         │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│                      (빈 공간)                       │
└─────────────────────────────────────────────────────┘
```

---

## 📝 콘텐츠 구성

### 흘러가는 콘텐츠 (수직 스크롤)

1. **VERSION 1.0** (2012-2017)
   - 솔로대첩 - 실시간 검색어 2위
   - 유태형 팝니다 - 세바시, JTBC
   - #Itwasoursky - 미세먼지 캠페인

2. **VERSION 2.0** (2016-2021)
   - 집꾸미기, 미드레이트, 러쉬
   - 인큐 - 가장 행복했던 한 해
   - 저서 "가지고 싶은걸 가져요"

3. **전환점**
   - "인류를 더 지혜롭게"

4. **VERSION 3.0** (2022~)
   - CELI - 개인 AI 에이전트
   - Mirrorboard - AI 스타트업
   - Melting Pot AI, Snapby AI

5. **About & Connect**
   - 철학 공부, 학회 활동
   - 연락처 정보

---

## 🛠 구현 세부사항

### 파일 구조

```
yth3.0/
├── index.html      # 새로운 미러 레이아웃
├── styles.css      # 리퀴드 글래스 스타일
├── script.js       # 렌즈 효과 + 스크롤 로직
└── docs/
    └── LIQUID_GLASS_MIRROR_CONCEPT.md (이 문서)
```

### 렌즈 설정값

```javascript
const MIRROR_CONFIG = {
    width: 500,              // 렌즈 너비 (px)
    height: 700,             // 렌즈 높이 (px)
    borderRadius: 60,        // 모서리 둥글기
    magnification: 1.3,      // 확대 배율 (1.3 = 30% 확대)
    edgeSoftness: 0.15,      // 가장자리 부드러움
    draggable: true,         // 드래그 가능 여부
    viewportPadding: 20      // 화면 경계 여백
};
```

### 콘텐츠 스크롤 설정

```javascript
const SCROLL_CONFIG = {
    autoScroll: true,        // 자동 스크롤 여부
    scrollSpeed: 0.5,        // 스크롤 속도 (px/frame)
    pauseOnHover: true,      // 호버 시 일시정지
    wheelMultiplier: 2,      // 마우스휠 감도
    snapToContent: true      // 콘텐츠에 스냅
};
```

---

## 🎭 인터랙션

### 1. 렌즈 드래그
- 마우스로 렌즈를 잡아서 이동 가능
- 화면 경계를 벗어나지 않음
- 그랩 커서로 피드백

### 2. 콘텐츠 스크롤
- 자동으로 천천히 흘러감
- 마우스 휠로 수동 조작 가능
- 렌즈 위에서 호버하면 일시정지

### 3. 콘텐츠 클릭
- 렌즈를 통해 보이는 콘텐츠 클릭 시 해당 섹션으로 스냅
- 또는 모달/상세보기 표시

---

## 🔧 성능 최적화

1. **Canvas 최적화**
   - DPI 스케일링 적용
   - 필요시에만 다시 그리기

2. **SVG 필터 캐싱**
   - feImage에 data URI 사용
   - 렌즈 이동 시에만 업데이트

3. **모바일 대응**
   - 작은 화면: 렌즈 크기 축소
   - 터치 제스처 지원
   - 성능이 낮으면 효과 단순화

---

## 📚 참고 자료

- **Shu Ding의 Liquid Glass**: https://github.com/shuding/liquid-glass
- **SVG Displacement Map**: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap
- **Signed Distance Functions**: https://iquilezles.org/articles/distfunctions2d/

---

## ✅ 체크리스트

- [ ] 기본 렌즈 효과 구현
- [ ] 콘텐츠 수직 스크롤 구현
- [ ] 렌즈 드래그 기능
- [ ] 자동 스크롤 + 수동 조작
- [ ] 모바일 반응형
- [ ] 성능 최적화
- [ ] 접근성 고려

---

**작성자**: AI Assistant  
**다음 작업자 참고**: 이 문서를 기반으로 실제 구현을 진행합니다.

