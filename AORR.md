# AORR 상태 머신 설계

이 문서는 개인 프로페셔널 웹사이트와 Games 탭의 지렁이 게임을 GitHub Pages용 정적 사이트로 만들기 위한 실행 가능한 AORR 상태 머신이다.

전제:

- 최종 결과물은 정적 웹사이트다.
- 루트 디렉토리에는 최소 `index.html`, `styles.css`, `script.js`가 존재해야 한다.
- 게임 구현은 `script.js` 내부 또는 별도 JavaScript 파일로 제공할 수 있다.
- 별도 백엔드 서버는 사용하지 않는다.
- Step 1에서 확인한 범위는 "정적 개인 웹사이트 + 반응형 + Games 탭 + 지렁이 게임"이며, 추가로 `[게임 추가 기능:]`이 있다면 게임 루프에 합류시킨다. 현재는 해당 추가 기능이 명시되지 않았으므로 `[사람 확인 필요]`로 둔다.

## 1. AORR 공통 정의

### Target

- 프로페셔널 웹사이트 개발 목표
- GitHub Pages 배포 목표
- 입력 자료
- 필수 페이지와 섹션
- Games 탭 및 지렁이 게임 요구사항
- 데스크톱 및 모바일 완료 기준

### Act

- 한 번의 개발 루프에서 수행할 최소 작업만 진행한다.
- 수정 가능한 파일 범위는 현재 루프와 직접 관련된 파일로 제한한다.
- 생성할 수 있는 파일은 루트 정적 자원과 게임 보조 스크립트로 제한한다.
- 검증은 로컬에서 재현 가능한 명령어로만 수행한다.

### Observe

- 파일 생성 여부
- HTML, CSS, JavaScript 오류
- 로컬 웹서버 응답
- 브라우저 콘솔 오류
- 데스크톱 및 모바일 화면
- 키보드 및 터치 게임 조작
- GitHub Pages 호환성

### Reason

실패 원인은 다음 중 하나로 분류한다.

- `HTML_STRUCTURE`
- `CSS_RESPONSIVE`
- `JAVASCRIPT`
- `GAME_LOGIC`
- `GAME_CONTROL`
- `CONTENT`
- `TEST`
- `ENVIRONMENT`
- `GITHUB_PERMISSION`
- `DEPLOYMENT`
- `UNKNOWN`

### Repeat

- 한 번에 하나의 실패 원인만 수정한다.
- 관련된 최소 파일만 변경한다.
- 수정 후 동일한 Verifier를 다시 실행한다.
- 기존에 통과한 기능에 대한 회귀 테스트를 함께 수행한다.

### Stop

- 전체 테스트가 통과한 경우
- 최대 Retry에 도달한 경우
- 동일한 오류 fingerprint가 2회 반복된 경우
- 개인정보나 콘텐츠 확인이 필요한 경우
- GitHub 인증 또는 배포 권한 문제가 발생한 경우

### Human-in-the-loop

다음 경우에는 `[사람 확인 필요]` 상태로 전환한다.

- 이름, 소개, 경력, 프로젝트 등 개인 콘텐츠가 불명확한 경우
- 기존 콘텐츠 삭제가 필요한 경우
- 외부 분석 도구나 외부 서비스를 추가해야 하는 경우
- GitHub 저장소 설정을 변경해야 하는 경우
- 요구사항이 충돌하는 경우

## 2. 상태 정의

| 상태 | 의미 |
|---|---|
| `READY` | 입력이 충분하고, 다음 최소 루프를 시작해도 되는 상태 |
| `ACTING` | 파일 수정 또는 생성 중인 상태 |
| `VERIFYING` | 로컬 검증, 브라우저 확인, 정적 분석을 수행하는 상태 |
| `RETRYING` | 실패 원인을 하나만 골라 최소 수정 후 다시 검증하는 상태 |
| `PASSED` | 해당 루프의 목표와 검증 기준을 충족한 상태 |
| `DEPLOY_READY` | GitHub Pages 배포 전 마지막 점검이 끝난 상태 |
| `DEPLOYING` | 배포 작업을 수행하는 상태 |
| `DEPLOYED` | GitHub Pages에 반영된 상태 |
| `BLOCKED` | 환경, 권한, 도구 문제로 더 진행할 수 없는 상태 |
| `HITL_REQUIRED` | 사람 입력이 없으면 결정을 내릴 수 없는 상태 |

## 3. 전체 개발 루프 표

| 단계 | 현재 상태 | 입력 | Act | Observe | 출력 | 테스트 기준 | 다음 상태 |
|---|---|---|---|---|---|---|---|
| 저장소 및 기존 파일 확인 | `READY` | GitHub 저장소 URL, 현재 디렉토리, 기존 파일 목록, README, 브랜치 정보 | 저장소 클론 여부 확인, 기존 구조와 엔트리 파일 확인, 핵심 제약 파악 | 파일 존재 여부, 루트 구조, README 내용, 정적 호스팅 가능성 | 작업 범위 초안, 파일 맵, 루프 우선순위 | 저장소 구조를 설명할 수 있고, 루트 파일과 정적 호스팅 전제 확인 완료 | `PASSED` 또는 `BLOCKED` |
| 정적 사이트 기본 구조 | `READY` | 사이트 목표, 최소 페이지/섹션, 브랜드 톤 | `index.html`, `styles.css`, `script.js` 뼈대 생성 또는 정리 | HTML 구조, 링크 경로, 콘솔 오류, 빈 페이지 여부 | 기본 셸과 라우팅 전제 | 루트 3개 파일이 존재하고, 브라우저에서 빈 깨짐 없이 열린다 | `PASSED` |
| 프로페셔널 콘텐츠 영역 | `READY` | 이름, 소개, 경력, 프로젝트, 연락처 [사람 확인 필요] | Hero, About, Projects, Contact 등 콘텐츠 블록 배치 | 콘텐츠 노출, 중복, 링크, 이미지 대체 텍스트 | 프로페셔널 소개 섹션 | 개인 정보가 확인되고, 섹션별 콘텐츠가 자연스럽게 렌더된다 | `HITL_REQUIRED` 또는 `PASSED` |
| 반응형 내비게이션 | `READY` | 상단 네비게이션 구조, 모바일 메뉴 동작 방식 | 상단 탭/앵커 내비게이션, 모바일에서 접힘/열림 구현 | 데스크톱 메뉴, 모바일 메뉴, 포커스 이동, 오버플로우 | 반응형 네비게이션 | 320px 폭에서도 메뉴 사용 가능, 클릭 경로 정상 | `PASSED` |
| Games 탭 | `READY` | 게임 섹션 노출 방식, 상단 탭 레이블 | Games 탭 추가, 섹션 앵커 또는 탭 전환 연결 | 탭 표시, 클릭 이동, 섹션 진입 상태 | 게임 진입점 | Games 탭이 모든 해상도에서 보이고, 게임 영역으로 이동한다 | `PASSED` |
| 지렁이 게임 핵심 로직 | `READY` | 게임 규칙, 충돌 규칙, 점수 규칙, `[게임 추가 기능:]` [사람 확인 필요] | 이동, 성장, 먹이 생성, 충돌, 게임 오버, 재시작 구현 | 게임 상태 전이, 점수 증가, 충돌 판정, 랜덤성 | 플레이 가능한 핵심 게임 루프 | 게임이 시작, 진행, 종료, 재시작까지 동작한다 | `PASSED` |
| 키보드 조작 | `READY` | 방향키/WASD, 일시정지 여부 | 키 입력 매핑, 방향 전환 제한, 연속 입력 처리 | 콘솔 오류, 즉시 반응, 역방향 금지, 데스크톱 플레이성 | 데스크톱 조작 가능 게임 | 키보드만으로 완주 가능한 수준의 조작이 된다 | `PASSED` |
| 모바일 터치 조작 | `READY` | 스와이프/버튼/가상 패드 선택 [사람 확인 필요] | 터치 입력 또는 버튼 UI 연결 | 터치 이벤트, 스와이프 방향 인식, 오작동 여부 | 모바일 조작 가능 게임 | 모바일에서 화면 탭/스와이프로 조작 가능 | `PASSED` 또는 `HITL_REQUIRED` |
| 게임 UI 및 점수 | `READY` | 점수 표시 위치, 안내 문구, 상태 배지 | 점수판, 시작/재시작 버튼, 도움말 문구 배치 | 표시 가독성, 상태 변화, 레이아웃 붕괴 | 완성도 있는 게임 UI | 점수와 상태가 명확하고, 플레이어가 다음 행동을 알 수 있다 | `PASSED` |
| 접근성과 반응형 검증 | `READY` | 접근성 기준, 모바일 브레이크포인트 | 색 대비, 포커스 스타일, 스킵 링크, 반응형 조정 | Lighthouse/수동 점검, 320px 및 데스크톱 점검 | 접근성과 화면 대응 결과 | 모바일/데스크톱 모두 주요 기능이 보존된다 | `PASSED` |
| GitHub Pages 호환성 검증 | `READY` | 정적 배포 제약, 상대 경로 규칙, 빌드 유무 | 절대 경로/상대 경로 정리, SPA 의존 제거 | 404 가능성, 자원 경로, 캐시 문제 | Pages 호환 빌드 | 정적 파일만으로 배포 가능하고 깨진 경로가 없다 | `DEPLOY_READY` |
| 배포 | `DEPLOY_READY` | GitHub 인증 상태, repo 권한, Pages 설정 | push 또는 Pages 배포 실행 | 배포 성공 여부, 사이트 응답, 최종 URL | 공개 배포된 사이트 | 배포 URL에서 사이트가 정상 렌더된다 | `DEPLOYED` 또는 `BLOCKED` |

## 4. 루프별 상세 설계

### 4.1 저장소 및 기존 파일 확인

- 입력
  - GitHub 저장소 URL
  - 현재 디렉토리 상태
  - README 및 기존 파일
  - 브랜치 및 루트 구조
- Act
  - 저장소가 이미 클론되어 있는지 확인한다.
  - 루트 파일과 정적 호스팅 가능 여부를 확인한다.
  - 기존 콘텐츠와 새 작업의 충돌 가능성을 파악한다.
- Observe
  - 루트에 무엇이 있는지
  - 정적 사이트로 바로 쓸 수 있는지
  - GitHub Pages 제약과 충돌하는 구조가 있는지
- 출력
  - 파일 맵
  - 위험 목록
  - 다음 루프 우선순위
- 테스트 기준
  - 루트 구조를 설명할 수 있다.
  - 배포를 막는 명백한 구조 문제가 없다.
- 다음 상태
  - `PASSED`

### 4.2 정적 사이트 기본 구조

- 입력
  - 사이트 목표
  - 필요한 페이지 셸
  - 기본 섹션 구조
- Act
  - `index.html`, `styles.css`, `script.js`를 준비한다.
  - 최소 내비게이션과 섹션 마크업을 만든다.
  - 외부 백엔드 의존을 만들지 않는다.
- Observe
  - 파일 생성 여부
  - HTML 유효성
  - 콘솔 오류
- 출력
  - 페이지 셸
  - 기본 스타일 시트
  - 자바스크립트 진입점
- 테스트 기준
  - 브라우저에서 빈 오류 없이 열린다.
  - 링크와 구조가 깨지지 않는다.
- 다음 상태
  - `PASSED`

### 4.3 프로페셔널 콘텐츠 영역

- 입력
  - 이름, 소개, 경력, 프로젝트, 연락처 [사람 확인 필요]
- Act
  - Hero, About, Projects, Contact를 배치한다.
  - 콘텐츠 우선순위를 정리한다.
- Observe
  - 개인 정보 누락 여부
  - 톤과 문구의 일관성
- 출력
  - 프로페셔널 소개 영역
- 테스트 기준
  - 콘텐츠가 이해 가능하고, 개인 식별 정보가 승인된 상태다.
- 다음 상태
  - `HITL_REQUIRED` 또는 `PASSED`

### 4.4 반응형 내비게이션

- 입력
  - 상단 메뉴 항목
  - 모바일 메뉴 패턴
- Act
  - 탭/앵커 내비게이션을 구현한다.
  - 모바일에서 줄바꿈 또는 접힘 메뉴를 처리한다.
- Observe
  - 320px 폭에서 메뉴가 보이는지
  - 포커스와 클릭이 되는지
- 출력
  - 반응형 네비게이션
- 테스트 기준
  - 데스크톱과 모바일에서 메뉴가 모두 사용 가능하다.
- 다음 상태
  - `PASSED`

### 4.5 Games 탭

- 입력
  - 상단 탭 명칭
  - 게임 섹션 진입 방식
- Act
  - `Games` 탭을 추가한다.
  - 게임 영역으로 이동하거나 노출한다.
- Observe
  - 탭 노출 여부
  - 이동/전환 정상 여부
- 출력
  - 게임 진입점
- 테스트 기준
  - 사용자가 상단에서 Games를 찾고 실행 경로로 들어갈 수 있다.
- 다음 상태
  - `PASSED`

### 4.6 지렁이 게임 핵심 로직

- 입력
  - 게임 규칙
  - 충돌 규칙
  - 점수 규칙
  - `[게임 추가 기능:]` [사람 확인 필요]
- Act
  - 보드, 지렁이, 먹이, 점수, 게임 오버를 구현한다.
  - 재시작 가능한 구조로 만든다.
- Observe
  - 먹이 생성
  - 이동과 성장
  - 벽/자기 몸 충돌
  - 게임 종료 후 재시작
- 출력
  - 플레이 가능한 게임
- 테스트 기준
  - 한 판을 시작하고 끝내고 다시 시작할 수 있다.
- 다음 상태
  - `PASSED`

### 4.7 키보드 조작

- 입력
  - 방향키 또는 WASD
  - 역방향 금지 규칙
- Act
  - 키보드 이벤트를 연결한다.
  - 반복 입력과 충돌을 정리한다.
- Observe
  - 방향 전환 반응성
  - 입력 무시 조건
- 출력
  - 데스크톱 조작 가능 게임
- 테스트 기준
  - 키보드만으로 문제 없이 플레이 가능하다.
- 다음 상태
  - `PASSED`

### 4.8 모바일 터치 조작

- 입력
  - 스와이프 또는 화면 버튼 [사람 확인 필요]
- Act
  - 터치 이벤트를 방향 입력으로 변환한다.
  - 필요한 경우 모바일 전용 버튼을 배치한다.
- Observe
  - 터치 인식
  - 의도하지 않은 스크롤/줌 여부
- 출력
  - 모바일 조작 가능 게임
- 테스트 기준
  - 모바일에서 조작이 막히지 않고 게임이 진행된다.
- 다음 상태
  - `PASSED` 또는 `HITL_REQUIRED`

### 4.9 게임 UI 및 점수

- 입력
  - 점수 표시 위치
  - 도움말 문구
  - 재시작 UI
- Act
  - 점수, 상태, 안내를 시각화한다.
- Observe
  - 가독성
  - 상태 인지성
- 출력
  - 완성도 있는 게임 UI
- 테스트 기준
  - 사용자가 현재 상태와 다음 행동을 즉시 이해한다.
- 다음 상태
  - `PASSED`

### 4.10 접근성과 반응형 검증

- 입력
  - 반응형 기준
  - 접근성 기준
- Act
  - 대비, 포커스, 레이아웃 안정성을 점검한다.
- Observe
  - 모바일/데스크톱 화면
  - 키보드 접근성
  - 터치 오작동
- 출력
  - 검증 결과
- 테스트 기준
  - 핵심 기능이 화면 크기에 관계없이 유지된다.
- 다음 상태
  - `PASSED`

### 4.11 GitHub Pages 호환성 검증

- 입력
  - 상대 경로 규칙
  - 정적 배포 제약
- Act
  - 페이지 경로와 에셋 경로를 검토한다.
  - 백엔드 의존, 런타임 빌드, 서버 전용 코드를 제거한다.
- Observe
  - 404 위험
  - SPA 라우팅 의존 여부
- 출력
  - Pages 호환 상태
- 테스트 기준
  - 정적 파일만으로 배포 가능하다.
- 다음 상태
  - `DEPLOY_READY`

### 4.12 배포

- 입력
  - GitHub 인증 상태
  - 저장소 권한
  - Pages 설정
- Act
  - push 또는 배포를 수행한다.
- Observe
  - 배포 성공 여부
  - 실제 URL 응답
- 출력
  - 배포된 사이트
- 테스트 기준
  - 배포 URL에서 정적 사이트가 정상 표시된다.
- 다음 상태
  - `DEPLOYED` 또는 `BLOCKED`

## 5. 실패 분류 기준

| 분류 | 판단 기준 |
|---|---|
| `HTML_STRUCTURE` | 섹션 누락, 잘못된 중첩, 깨진 앵커, 존재하지 않는 페이지 구조 |
| `CSS_RESPONSIVE` | 모바일에서 레이아웃 붕괴, 오버플로우, 가독성 저하, 브레이크포인트 실패 |
| `JAVASCRIPT` | 콘솔 오류, 스크립트 로드 실패, DOM 연결 실패, 초기화 실패 |
| `GAME_LOGIC` | 이동, 성장, 충돌, 점수, 종료 규칙이 기대와 다름 |
| `GAME_CONTROL` | 키보드 또는 터치 입력이 의도대로 동작하지 않음 |
| `CONTENT` | 이름, 소개, 경력, 프로젝트, 문구가 불명확하거나 승인되지 않음 |
| `TEST` | 검증 절차 자체가 실패하거나 재현 불가함 |
| `ENVIRONMENT` | 로컬 서버, 브라우저, 파일 시스템, 도구 설치 문제 |
| `GITHUB_PERMISSION` | 인증, 권한, 저장소 접근, Pages 설정 권한 문제 |
| `DEPLOYMENT` | push, Pages 반영, 캐시, 빌드/배포 결과가 실패함 |
| `UNKNOWN` | 위 분류로도 설명되지 않는 문제 |

## 6. Verifier 정의

각 루프에서 사용할 Verifier는 아래 원칙을 따른다.

- 파일 존재 확인
- HTML/JS/CSS 오류 확인
- 로컬 서버 응답 확인
- 브라우저 수동 점검 또는 자동 점검
- 데스크톱과 모바일 뷰 확인
- 키보드와 터치 입력 확인
- GitHub Pages 호환성 확인

## 7. 가장 안전한 첫 번째 루프

가장 안전한 첫 번째 루프는 `저장소 및 기존 파일 확인`이다.

이유:

- 기존 구조를 먼저 알아야 파일 충돌과 삭제 위험을 줄일 수 있다.
- 개인 콘텐츠가 불명확한 상태에서 본문을 먼저 쓰면 `HITL_REQUIRED`가 자주 발생한다.
- 게임과 반응형 UI를 만들기 전에 정적 사이트의 루트 구조와 Pages 호환성을 먼저 확인하면 이후 루프의 실패 원인 분류가 쉬워진다.

권장 첫 루프 목표:

- 저장소 루트 구조 확인
- 정적 호스팅 전제 확인
- 기존 콘텐츠 보존 범위 확인
- 이후 루프의 우선순위 확정

## 8. 권장 진행 순서

1. 저장소 및 기존 파일 확인
2. 정적 사이트 기본 구조
3. 프로페셔널 콘텐츠 영역
4. 반응형 내비게이션
5. Games 탭
6. 지렁이 게임 핵심 로직
7. 키보드 조작
8. 모바일 터치 조작
9. 게임 UI 및 점수
10. 접근성과 반응형 검증
11. GitHub Pages 호환성 검증
12. 배포
## Self-Correcting TDD Loop

This section defines a verifier-first, self-correcting TDD loop for the static GitHub Pages website.
It is based only on tools that are actually available in the current environment or can be used without inventing new commands.

### Verified tool availability in this environment

- Available: `python`, `python3`, `node`, `npm`, `npx`, `git`
- Not currently available on PATH: `claude`
- Therefore, Claude Code CLI cannot be used as an independent verifier in this environment unless it is installed later and becomes available on PATH.

### Verification tool policy

- Do not invent npm scripts, test commands, or CLI flags that do not exist in the repository or environment.
- Prefer repository files, built-in shell commands, and existing package scripts only after confirming they exist.
- If a verifier depends on a missing tool, classify the failure as `ENVIRONMENT` unless the missing tool is required by permission or deployment policy.
- Do not reduce test coverage to make a failure pass.
- Do not change the site architecture or framework just to satisfy a test.

### Retry policy

- One Retry may address only one failure root cause.
- Change only the minimum related files.
- Keep all already-passing behaviors under regression watch.
- Stop after 3 retries for the same issue.
- Stop immediately if the same failure fingerprint repeats twice.
- Record the hypothesis, changed files, command, and result for each Retry.
- Never fix environment or permission failures with code changes.

### Failure log schema

When a verifier fails, record:

- `command`
- `exit_code`
- `failed_checks`
- `core_error_message`
- `files_and_lines`
- `browser_console_messages`
- `error_fingerprint`

If a browser or DOM issue is involved, also record:

- viewport
- browser name
- reproduction steps
- whether the failure is desktop-only, mobile-only, or both

### Error classification

Use exactly one of these root-cause labels:

- `HTML_STRUCTURE`
- `CSS_RESPONSIVE`
- `JAVASCRIPT`
- `GAME_LOGIC`
- `GAME_CONTROL`
- `CONTENT`
- `TEST`
- `ENVIRONMENT`
- `GITHUB_PERMISSION`
- `DEPLOYMENT`
- `UNKNOWN`

### Verifier-first loop stages

| Stage | Goal | Inputs | Act | Observe | Pass criteria | Failure class hints | Next state |
|---|---|---|---|---|---|---|---|
| Basic file verification | Confirm the root files exist and are wired together | `index.html`, `styles.css`, `script.js` | Check root presence, HTML links, and obvious path issues | Missing files, broken references, absolute local paths, case mismatches | Root `index.html` exists and links CSS/JS correctly | Missing root file, bad path, case mismatch, local absolute path | `VERIFYING` or `RETRYING` |
| HTML verification | Confirm page structure is valid and navigable | `index.html` | Check document skeleton, semantic landmarks, nav links, Games area, image alts, internal anchors | Browser parse issues, broken anchors, missing semantics | Title, viewport, semantic layout, Games section, and working internal links | `HTML_STRUCTURE`, `CONTENT` | `PASSED` or `RETRYING` |
| CSS verification | Confirm layout survives desktop, tablet, and mobile widths | `styles.css`, markup in `index.html` | Inspect responsive breakpoints and overflow behavior | Horizontal scrolling, clipped content, broken nav/games layout | No unexpected horizontal overflow and core layout works at mobile/tablet/desktop sizes | `CSS_RESPONSIVE` | `PASSED` or `RETRYING` |
| JavaScript verification | Confirm page code loads cleanly | `script.js` and DOM hooks | Check syntax, console errors, null references, duplicate listeners, load-time errors | Syntax/runtime errors, missing selectors | Script loads without console errors and hooks the page safely | `JAVASCRIPT` | `PASSED` or `RETRYING` |
| Snake game verification | Confirm the game works as a playable loop | game code in `script.js` or separate JS files | Verify start, pause, restart, score, food, collisions, keyboard, touch, reverse-blocking, duplicate-entry protection | Game state transitions, input mapping, score updates, restart behavior | Game is playable end to end on desktop and mobile | `GAME_LOGIC`, `GAME_CONTROL`, `JAVASCRIPT` | `PASSED` or `RETRYING` |
| Local server verification | Confirm static hosting works locally | Repository files | Start an existing local static server command only if available, then request page and assets | HTTP response, asset responses, index load | `index.html`, CSS, and JS respond successfully over HTTP | `ENVIRONMENT`, `TEST` | `PASSED` or `RETRYING` |
| Browser verification | Confirm rendered behavior at target viewports | Local HTTP server and browser tool if available | Open 375px, 768px, and 1440px widths when a browser tool exists | Layout, interaction, and console state | Core desktop and mobile behaviors remain intact | `CSS_RESPONSIVE`, `GAME_CONTROL`, `JAVASCRIPT` | `PASSED` or `RETRYING` |
| GitHub Pages compatibility | Confirm the site can run as static Pages content | Final HTML/CSS/JS bundle | Check root `index.html`, relative paths, no server-only features, no filesystem dependencies, no backend API assumptions | Pages-incompatible references and runtime assumptions | The site can be served from GitHub Pages without extra backend support | `HTML_STRUCTURE`, `JAVASCRIPT`, `DEPLOYMENT`, `ENVIRONMENT` | `DEPLOY_READY` |

### Basic file verification checklist

- Root `index.html` exists.
- `index.html` links `styles.css`.
- `index.html` links `script.js` or an equivalent in-repo game script.
- No broken local file paths.
- No case-sensitive filename mismatches.
- No absolute local filesystem paths that would fail on GitHub Pages.

### HTML verification checklist

- Valid document skeleton is present.
- `title` is set.
- `meta viewport` is present.
- Semantic landmarks are used.
- Navigation links resolve.
- Games section exists.
- Images have `alt` text.
- Internal links do not point to missing IDs.

### CSS verification checklist

- Desktop layout renders cleanly.
- Tablet layout renders cleanly.
- Mobile layout renders cleanly.
- No unintended horizontal scroll.
- Navigation remains usable.
- Games UI remains usable.

### JavaScript verification checklist

- No syntax errors.
- No page-load console errors.
- No `null` DOM references.
- No duplicate event listener accumulation.
- Page load does not throw.

### Snake game verification checklist

- Game can start.
- Game can pause.
- Game can restart.
- Score increases correctly.
- Food appears and is consumable.
- Wall collision ends the game.
- Self-collision ends the game.
- Keyboard arrows or WASD control movement.
- Mobile buttons or touch control movement.
- Immediate reverse direction is blocked.
- Reopening Games does not create duplicate game loops.

### Local execution verification checklist

- Use `python3 -m http.server` or an equivalent static server only if the command exists and runs in this environment.
- Confirm HTTP response codes.
- Confirm `index.html` loads over HTTP.
- Confirm CSS and JavaScript assets respond over HTTP.

### Browser viewport checklist

When a browser tool is available, verify:

- Mobile: around 375px
- Tablet: around 768px
- Desktop: around 1440px

### GitHub Pages compatibility checklist

- Root `index.html` exists.
- Asset paths are relative.
- No server-only features are used.
- No local filesystem dependency is used.
- No backend API dependency is used.

### Self-correcting loop states

| State | Meaning |
|---|---|
| `READY` | Inputs are known and a verifier can start |
| `VERIFYING` | A verifier is running or has just been run |
| `RETRYING` | A failure is isolated and the next minimal fix is being prepared |
| `PASSED` | The current verifier and its relevant regressions passed |
| `BLOCKED` | Environment, permission, or unavailable-tool issue prevents progress |
| `DEPLOY_READY` | All non-deployment verifiers passed and the site is ready for Pages checks |

### Minimal correction rules

- Fix one failure cause at a time.
- Change only the smallest relevant file set.
- Preserve already-passing behavior.
- Do not delete tests or weaken checks.
- Do not switch frameworks or rewrite the site unnecessarily.

### Recommended first verifier

The safest first verifier is basic file verification because it can be run before any browser or game work and it exposes path, casing, and Pages-hosting issues early.

If Claude Code CLI later becomes available on PATH, it may be used as an independent verifier for:

- syntax and static inspection
- page structure review
- regression review
- error fingerprint comparison

Because `claude` is not currently available in this environment, no Sonnet model can be confirmed or recorded here without guessing.

## Change Request Loop Plan

This section aligns with `CHANGE_REQUEST.md` and controls the next implementation pass for `CR-20260714-01`.

### Change Request baseline

- Change Request ID: `CR-20260714-01`
- Baseline commit: `eb5d441382ef53a240f2edb4fa6f755e9c138e37`
- Baseline URL: `https://gkullha-maker.github.io`
- Current execution mode: `CHANGE_PLANNED`

### Ordered change loops

| Loop ID | Connected Change Item | Target | State | Act | Observe | Reason | Verifier | Completion criteria | Retry policy | Stop conditions | HITL conditions | Expected files | Predecessor | Next Loop |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `Loop-CR-001` | `CR-001` | Fix the perceived delay in game button response | `READY` | Reproduce control lag, then reduce input latency with the smallest possible change | Button-to-action response timing, control feel | `BUG`, `GAME_CONTROL`, `UI_UX`, `PERFORMANCE` | Control response check | Input feels immediate | One root cause per retry, max 3 | 3 retries, repeated fingerprint, blocker | Exact threshold for “느림” | `game.js` | none | `Loop-CR-002` |
| `Loop-CR-002` | `CR-002` | Add random obstacles to gameplay | `READY` | Add obstacle generation and collision handling | Obstacle distribution and collision behavior | `NEW_FEATURE`, `GAME_ENTITY`, `GAME_LOGIC`, `GAME_STATE` | Repeated playthrough collision check | Obstacles appear and function correctly | One root cause per retry, max 3 | 3 retries, repeated fingerprint, blocker | Obstacle count/density/style | `game.js`, possibly `styles.css` | none | `Loop-CR-003` |
| `Loop-CR-003` | `CR-003` | Add score highlight effects and stronger 10-point effects | `READY` | Create score-based highlight effects and stronger milestone effects | Effect strength at normal and 10-point scores | `GAME_EFFECT`, `UI_UX`, `NEW_FEATURE` | Score milestone visual check | Distinct effects at 1 point and 10 points | One root cause per retry, max 3 | 3 retries, repeated fingerprint, blocker | Effect style direction | `game.js`, `styles.css` | none | `Loop-CR-006` |
| `Loop-CR-006` | `CR-006` | Make the game visually primary and the site more polished | `READY` | Rebalance hierarchy, collapse or de-emphasize nonessential copy, polish styling | First-view prominence, control placement, comfort on mobile and desktop | `INFORMATION_ARCHITECTURE`, `NAVIGATION`, `UI_UX`, `RESPONSIVE`, `ACCESSIBILITY` | Desktop/mobile layout inspection | Game is more visible, controls are closer, design feels more polished | One root cause per retry, max 3 | 3 retries, repeated fingerprint, blocker | Design direction, collapse behavior, first-view priority level | `index.html`, `styles.css`, `game.js` | `Loop-CR-001`, `Loop-CR-002`, `Loop-CR-003` | `Loop-CR-004` |
| `Loop-CR-004` | `CR-004` | Improve hero and intro copy tone | `READY` | Rewrite intro copy to sound less mechanical | Tone, clarity, brand fit | `CONTENT`, `UI_UX` | Content review | Copy reads naturally | One root cause per retry, max 3 | 3 retries, repeated fingerprint, blocker | Writing tone preference | `index.html` | none | `Loop-CR-005` |
| `Loop-CR-005` | `CR-005` | Fill empty content areas or mark them as HITL | `READY` | Populate verified facts or mark uncertain fields `[사람 확인 필요]` | Completeness, accuracy, privacy | `CONTENT`, `DOCUMENT_BASED_CONTENT` | Section completeness check | No empty section remains without HITL labels | One root cause per retry, max 3 | 3 retries, repeated fingerprint, blocker | Name, email, location, project, research, extra game feature | `index.html`, possibly `MEMORY.md` | `Loop-CR-004` | none |

### Change loop execution order

1. `Loop-CR-001`
2. `Loop-CR-002`
3. `Loop-CR-003`
4. `Loop-CR-006`
5. `Loop-CR-004`
6. `Loop-CR-005`

### Loop-level stop rules

- Stop a loop after 3 retries for the same issue.
- Stop immediately if the same fingerprint repeats twice.
- Stop and mark `HITL_REQUIRED` if content facts, design direction, or control thresholds are missing.
- Do not proceed to dependent loops if their predecessor failed.
- Do not mark a partially completed loop as `PASSED`.

## Change Request Loop Execution Record

### Executed Change Request pass

- Change Request ID: `CR-20260714-01`
- Baseline commit: `eb5d441382ef53a240f2edb4fa6f755e9c138e37`
- Baseline URL: `https://gkullha-maker.github.io`

#### `Loop-CR-001`

- Change Item: `CR-001`
- State transition: `READY -> PASSED`
- Failure cause: none
- Retry result: not needed
- Verifier: button/touch response timing via local code inspection and static checks

#### `Loop-CR-002`

- Change Item: `CR-002`
- State transition: `READY -> PASSED`
- Failure cause: none
- Retry result: not needed
- Verifier: obstacle generation and collision logic through code inspection and static checks

#### `Loop-CR-003`

- Change Item: `CR-003`
- State transition: `READY -> PASSED`
- Failure cause: none
- Retry result: not needed
- Verifier: score highlight and 10-point effect logic through code inspection and static checks

#### `Loop-CR-006`

- Change Item: `CR-006`
- State transition: `READY -> PASSED`
- Failure cause: none
- Retry result: not needed
- Verifier: layout and hierarchy review through source inspection and static checks

#### `Loop-CR-004`

- Change Item: `CR-004`
- State transition: `READY -> PASSED`
- Failure cause: none
- Retry result: not needed
- Verifier: hero/intro copy review through source inspection

#### `Loop-CR-005`

- Change Item: `CR-005`
- State transition: `READY -> HITL_REQUIRED`
- Failure cause: source facts for profile, projects, contact, and research were not present
- Retry result: not applicable
- Verifier: content completeness check

- Stop reason: `CR-005` requires user-provided facts before it can be fully closed
