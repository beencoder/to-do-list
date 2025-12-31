# ✅ To-Do List & Weather Project
> **React의 기초부터 실무적인 트러블슈팅까지 고민하며 데이터 영속성과 비동기 처리를 구현한 기록입니다.**

## 🔗 Link
- **Live Demo:** [https://beencoder.github.io/to-do-list](https://beencoder.github.io/to-do-list)

## 🛠 Tech Stack
- **Core:** React 18, Sass (SCSS)
- **Library:** Axios, Moment.js
- **API:** OpenWeatherMap, Geolocation API

## 🔥 핵심 구현 사항
- **State CRUD:** React Hook을 활용한 할 일 추가/수정/삭제 및 완료 상태 관리
- **Data Persistence:** `LocalStorage` 연동을 통한 브라우저 종료 후 데이터 영속성 유지
- **Async Data Binding:** Geolocation API와 OpenWeatherMap을 결합한 실시간 위치 기반 날씨 데이터 바인딩
- **UX Detail:** `setInterval`을 활용한 실시간 시계 구현 및 반응형 텍스트 처리

## 📋 핵심 트러블슈팅 (Refactoring)

### 1. 중복 ID로 인한 Label 바인딩 오류 해결
- **문제:** 리스트 렌더링 시 고정 ID 사용으로 인해 특정 `label` 클릭 시 다른 아이템이 체크되는 버그 발생.
- **해결:** `Date.now()`를 활용해 각 아이템에 고유 ID를 부여하고, `htmlFor`와 1:1 매칭하여 웹 표준 준수 및 클릭 인터랙션 해결.

### 2. 비동기 통신 순서 제어 (Race Condition 방지)
- **문제:** 위치 좌표를 수신하기 전 날씨 API가 호출되어 데이터가 누락되거나 런타임 에러가 발생하는 이슈.
- **해결:** `useEffect` 내 로직을 비동기 함수로 감싸고 `await`를 통해 좌표 확보 후 API 호출이 순차적으로 이루어지도록 실행 순서 동기화.

### 3. 영문 텍스트 레이아웃 붕괴 방지
- **문제:** 띄어쓰기 없는 긴 영문이나 URL 입력 시 텍스트가 박스 영역을 이탈하여 디자인이 무너지는 결함 발견.
- **해결:** CSS의 `overflow-wrap` 및 `word-break` 속성을 적용하여 다양한 텍스트 입력 환경에서도 UI 레이아웃 안정성 확보.

## 📂 Project Structure
```text
src/
├── components/      # 기능별 공통 컴포넌트 (ToDoList, ListItem, Weather, Date)
├── styles/          # SCSS 기반 스타일링
├── App.js           # 전체 레이아웃 및 비동기 로직 관리
└── index.js         # 앱 엔트리 포인트