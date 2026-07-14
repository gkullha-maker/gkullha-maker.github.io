# CHANGE REQUEST

## Change Request ID

- `CR-20260714-01`

## User Request Original

"""

#게임
1. 버튼 반응이 느림

2. 무작위 장애물 추가 하고 싶음

3. 점수를 딸 때마다 강조 이펙트 추가해주고 10점마다 더 화려한 이펙트를 보여줘.


#사이트
1. 웹사이트 소개 "정적인 개인 웹사이트와 모바일 대응 게임을 한 곳에 담습니다."가 기계적임, 그 아래 소개도 단조로움

2. 프로필 소개 비어 있음, 대표 영역  projects, experience, research 비어 있음, 연락 방법 email, location 비어 있음, rules 게임추가 기능 항목 비어 있음. 비어 있는 내용은 

3. 소개 글은 중요하지 않은데 강조되어 있고 게임 메인 화면이 아래에 있어 접근이 불편함

4. 게임 화면이 바로 눈에 띄고 다른 소개 글은 덜 강조되거나 접혀 있었으면 좋겠음

5. score board 게임 시작 멈춤 재시작, 방향키 조작 버튼 등이 게임 화면 밖에 있어서 불편함

6. 사이트 모양이 전체적으로 과제 결과물 같이 단조로움. 세련된 디자인으로 바꾸고 싶음
"""

## Baseline

- Last known good commit: `eb5d441382ef53a240f2edb4fa6f755e9c138e37`
- Last known good URL: `https://gkullha-maker.github.io`

## Reference Material

- Current project source files
- `AORR.md`
- `MEMORY.md`
- User request above
- Additional reference material: not found in the current project tree

## Current State

- Baseline is deployed and reachable
- Change request is analyzed but not yet implemented
- No code changes are included in this document
- Any unclear profile content remains `[사람 확인 필요]`

## Change Items

### CR-001

- Change Item ID: `CR-001`
- User request original: `버튼 반응이 느림`
- Request summary: Improve perceived responsiveness of game input buttons
- Request classification: `BUG`, `GAME_CONTROL`, `UI_UX`, `PERFORMANCE`
- Current behavior: Button reaction feels delayed to the user
- Expected behavior: Button input should feel immediate or near-immediate
- Reproduction method: Press mobile/game control buttons repeatedly during gameplay
- Evidence: User request text
- Target feature: Game control button input handling
- Expected files: `game.js`, possibly `styles.css`, possibly `script.js`
- Allowed scope: Input handling, event binding, latency reduction
- Forbidden scope: Full game rewrite, framework migration
- Prerequisites: None
- Follow-up work: Regression tests for all controls
- Dependency: Independent of `CR-002` and `CR-003`
- Completion criteria: Button input visibly affects direction/state without noticeable lag
- Verification: Manual and scripted control-response check
- Regression tests: start, pause, restart, keyboard, mobile controls
- Risk: `MEDIUM`
- Deployment required: Yes
- Human confirmation needed: Exact threshold for “느림” is `[사람 확인 필요]`

### CR-002

- Change Item ID: `CR-002`
- User request original: `무작위 장애물 추가 하고 싶음`
- Request summary: Add random obstacles to the snake game
- Request classification: `NEW_FEATURE`, `GAME_ENTITY`, `GAME_LOGIC`, `GAME_STATE`
- Current behavior: No obstacles exist
- Expected behavior: Obstacles appear randomly and affect gameplay rules
- Reproduction method: Start the game and inspect the board over multiple runs
- Evidence: User request text
- Target feature: Game entities, collision rules, rendering
- Expected files: `game.js`, possibly `styles.css`
- Allowed scope: Obstacle generation, placement, collision handling
- Forbidden scope: Removing core game rules, large map redesign
- Prerequisites: Stable game state/rendering structure
- Follow-up work: Balance and collision regression tests
- Dependency: Independent of `CR-003`
- Completion criteria: Random obstacles appear during play and collisions work
- Verification: Multiple game runs with obstacle presence and collision checks
- Regression tests: food generation, growth, wall/body collisions
- Risk: `HIGH`
- Deployment required: Yes
- Human confirmation needed: Obstacle count, density, size, visual style

### CR-003

- Change Item ID: `CR-003`
- User request original: `점수를 딸 때마다 강조 이펙트 추가해주고 10점마다 더 화려한 이펙트를 보여줘.`
- Request summary: Add score-based highlight effects and stronger effects every 10 points
- Request classification: `GAME_EFFECT`, `UI_UX`, `NEW_FEATURE`
- Current behavior: Score changes without enhanced visual feedback
- Expected behavior: Each score gain shows a highlight effect, with more dramatic effects at 10-point milestones
- Reproduction method: Score points during gameplay and observe feedback
- Evidence: User request text
- Target feature: Score display and effect layer
- Expected files: `game.js`, `styles.css`
- Allowed scope: Visual feedback, animation, score highlight states
- Forbidden scope: Changing game rules or reducing readability
- Prerequisites: Score state management in place
- Follow-up work: Visual regression and performance checks
- Dependency: Independent of `CR-002`
- Completion criteria: 1-point and 10-point milestones trigger distinct visual effects
- Verification: Manual check at 1 point and 10 points
- Regression tests: score, best score, game over, mobile UI
- Risk: `MEDIUM`
- Deployment required: Yes
- Human confirmation needed: Effect style direction

### CR-004

- Change Item ID: `CR-004`
- User request original: `웹사이트 소개 "정적인 개인 웹사이트와 모바일 대응 게임을 한 곳에 담습니다."가 기계적임, 그 아래 소개도 단조로움`
- Request summary: Improve the tone of the hero and intro copy
- Request classification: `CONTENT`, `UI_UX`, `SPEC_CHANGE`
- Current behavior: Intro copy feels mechanical and plain
- Expected behavior: Intro copy feels more natural and less mechanical
- Reproduction method: Read the hero section on page load
- Evidence: User request text
- Target feature: Hero copy and supporting intro text
- Expected files: `index.html`
- Allowed scope: Copy refinement, sentence rewording
- Forbidden scope: Inventing facts about experience or projects
- Prerequisites: Basic profile facts or HITL labels
- Follow-up work: Tone alignment across content sections
- Dependency: May interact with `CR-005`
- Completion criteria: The new copy reads less mechanical and more natural
- Verification: User review and content consistency check
- Regression tests: Home layout, mobile display
- Risk: `LOW`
- Deployment required: Yes
- Human confirmation needed: Preferred writing tone

### CR-005

- Change Item ID: `CR-005`
- User request original: `프로필 소개 비어 있음, 대표 영역  projects, experience, research 비어 있음, 연락 방법 email, location 비어 있음, rules 게임추가 기능 항목 비어 있음. 비어 있는 내용은`
- Request summary: Fill or mark empty profile/content areas without inventing facts
- Request classification: `CONTENT`, `DOCUMENT_BASED_CONTENT`, `UI_UX`
- Current behavior: Several sections are placeholders or empty
- Expected behavior: Empty areas are replaced with real verified content or `[사람 확인 필요]`
- Reproduction method: Inspect About / Projects / Experience / Research / Contact / Rules sections
- Evidence: User request text
- Target feature: Content sections
- Expected files: `index.html`, possibly `MEMORY.md`
- Allowed scope: Writing only verifiable public facts, marking uncertain items as HITL
- Forbidden scope: Inventing career/project/contact information
- Prerequisites: [사람 확인 필요] actual profile or project material
- Follow-up work: Structure and information hierarchy cleanup
- Dependency: Related to `CR-004`
- Completion criteria: Every empty item is either filled with verified content or marked HITL
- Verification: Section-by-section completeness check
- Regression tests: layout, navigation, mobile display
- Risk: `MEDIUM`
- Deployment required: Yes
- Human confirmation needed: name, email, location, project, research, extra game feature

### CR-006

- Change Item ID: `CR-006`
- User request original: `소개 글은 중요하지 않은데 강조되어 있고 게임 메인 화면이 아래에 있어 접근이 불편함 / 게임 화면이 바로 눈에 띄고 다른 소개 글은 덜 강조되거나 접혀 있었으면 좋겠음 / score board 게임 시작 멈춤 재시작, 방향키 조작 버튼 등이 게임 화면 밖에 있어서 불편함 / 사이트 모양이 전체적으로 과제 결과물 같이 단조로움. 세련된 디자인으로 바꾸고 싶음`
- Request summary: Rebalance information hierarchy, make the game more prominent, and polish the design
- Request classification: `INFORMATION_ARCHITECTURE`, `NAVIGATION`, `UI_UX`, `RESPONSIVE`, `ACCESSIBILITY`
- Current behavior: Introduction dominates, the game is lower on the page, and controls are spread outside the game view
- Expected behavior: The game is more immediately visible, supporting copy is deemphasized or collapsible, and controls are closer to the game
- Reproduction method: Load the page and inspect the first-view hierarchy and control placement
- Evidence: User request text
- Target feature: Home layout, game layout, design system, navigation
- Expected files: `index.html`, `styles.css`, `game.js`
- Allowed scope: Section priority, collapsible/summary UI, game placement, visual redesign
- Forbidden scope: Deleting content arbitrarily, introducing a new framework
- Prerequisites: Content confirmation and game UI layout plan
- Follow-up work: Responsive revalidation, mobile/desktop regression
- Dependency: Partially related to `CR-003`
- Completion criteria: The game is more visible on first view, controls are not awkwardly separated, and the design feels more polished
- Verification: Desktop/mobile inspection of initial view and control reachability
- Regression tests: full site, Games tab, mobile menu, game controls
- Risk: `HIGH`
- Deployment required: Yes
- Human confirmation needed: design direction, collapse behavior, game-first priority level

## Request Classification Summary

- `CR-001`: `BUG`, `GAME_CONTROL`, `UI_UX`, `PERFORMANCE`
- `CR-002`: `NEW_FEATURE`, `GAME_ENTITY`, `GAME_LOGIC`, `GAME_STATE`
- `CR-003`: `GAME_EFFECT`, `UI_UX`, `NEW_FEATURE`
- `CR-004`: `CONTENT`, `UI_UX`, `SPEC_CHANGE`
- `CR-005`: `CONTENT`, `DOCUMENT_BASED_CONTENT`, `UI_UX`
- `CR-006`: `INFORMATION_ARCHITECTURE`, `NAVIGATION`, `UI_UX`, `RESPONSIVE`, `ACCESSIBILITY`

## Change Request Loop Plan

### Loop-CR-001

- Target: Fix the perceived delay in game button response
- Input: current game controls, user report of lag
- Act: adjust input handling with the smallest possible change
- Observe: button-to-action response timing, control feel
- Reason: `BUG`
- Verifier: mobile and in-game control response check
- Completion criteria: input feels immediate
- Retry policy: one root cause at a time, max 3 retries
- Stop conditions: 3 retries, repeated fingerprint, or blocker
- HITL conditions: if the response threshold needs user definition
- Expected files: `game.js`
- Predecessor: none
- Next: `Loop-CR-002` or `Loop-CR-003`
- State: `CHANGE_PLANNED`

### Loop-CR-002

- Target: Add random obstacles to gameplay
- Input: existing game board and collision logic
- Act: introduce obstacle generation and collision handling
- Observe: obstacle distribution and interaction with snake/food
- Reason: `NEW_FEATURE`
- Verifier: repeated playthroughs and collision checks
- Completion criteria: obstacles appear and function correctly
- Retry policy: one root cause at a time, max 3 retries
- Stop conditions: 3 retries, repeated fingerprint, or blocker
- HITL conditions: obstacle density/style choices
- Expected files: `game.js`, possibly `styles.css`
- Predecessor: none
- Next: `Loop-CR-003` or `Loop-CR-006`
- State: `CHANGE_PLANNED`

### Loop-CR-003

- Target: Add score highlight effects and stronger 10-point effects
- Input: score state and rendering layer
- Act: create score-based visual feedback
- Observe: effect strength at normal scores and 10-point milestones
- Reason: `GAME_EFFECT`
- Verifier: score milestone checks
- Completion criteria: clear effect progression at score and 10-point intervals
- Retry policy: one root cause at a time, max 3 retries
- Stop conditions: 3 retries, repeated fingerprint, or blocker
- HITL conditions: effect style selection
- Expected files: `game.js`, `styles.css`
- Predecessor: none
- Next: `Loop-CR-006`
- State: `CHANGE_PLANNED`

### Loop-CR-006

- Target: Make the game visually primary and the site more polished
- Input: current homepage structure and game layout
- Act: rebalance hierarchy, collapse/de-emphasize nonessential copy, polish styling
- Observe: first-view prominence, control placement, mobile/desktop comfort
- Reason: `INFORMATION_ARCHITECTURE`, `UI_UX`, `RESPONSIVE`, `ACCESSIBILITY`
- Verifier: desktop/mobile layout inspection
- Completion criteria: the game is more visible, controls are closer, and the site looks more polished
- Retry policy: one root cause at a time, max 3 retries
- Stop conditions: 3 retries, repeated fingerprint, or blocker
- HITL conditions: design direction and collapse behavior
- Expected files: `index.html`, `styles.css`, `game.js`
- Predecessor: `Loop-CR-001`, `Loop-CR-002`, `Loop-CR-003`
- Next: `Loop-CR-004` and `Loop-CR-005`
- State: `CHANGE_PLANNED`

### Loop-CR-004

- Target: Improve hero and intro copy tone
- Input: current hero text and intro copy
- Act: rewrite copy to sound less mechanical
- Observe: tone, clarity, and fit with professional brand
- Reason: `CONTENT`, `UI_UX`
- Verifier: content review
- Completion criteria: copy reads naturally and fits the brand
- Retry policy: one root cause at a time, max 3 retries
- Stop conditions: 3 retries, repeated fingerprint, or blocker
- HITL conditions: writing tone preference
- Expected files: `index.html`
- Predecessor: none
- Next: `Loop-CR-005`
- State: `CHANGE_PLANNED`

### Loop-CR-005

- Target: Fill empty content areas or mark them as HITL
- Input: profile, project, contact, and rules content
- Act: populate verified facts or mark uncertain fields `[사람 확인 필요]`
- Observe: completeness, factual accuracy, and privacy
- Reason: `CONTENT`, `DOCUMENT_BASED_CONTENT`
- Verifier: section completeness check
- Completion criteria: no empty sections remain without HITL labels
- Retry policy: one root cause at a time, max 3 retries
- Stop conditions: 3 retries, repeated fingerprint, or blocker
- HITL conditions: missing source facts
- Expected files: `index.html`, possibly `MEMORY.md`
- Predecessor: `Loop-CR-004`
- Next: deployment-related follow-up after content work
- State: `CHANGE_PLANNED`

## Execution Order

1. `CR-001`
2. `CR-002`
3. `CR-003`
4. `CR-006`
5. `CR-004`
6. `CR-005`

## Test Plan Summary

- Before-change reproduction: verify the reported problem in the current deployed site
- After-change test: run the same interaction or visual check again
- Regression tests: home page, navigation, responsive layout, Games tab, game start/pause/restart, keyboard, mobile controls, score, console, broken links, relative paths

## Risk Summary

- Highest risk: `CR-002`, `CR-006`
- Medium risk: `CR-001`, `CR-003`, `CR-005`
- Lower risk: `CR-004`

## Human Confirmation Needed

- Exact meaning of “버튼 반응이 느림”
- Obstacle density, style, and gameplay impact
- Score effect style and 10-point presentation
- Writing tone preference for the hero copy
- Actual facts for profile/projects/contact/research
- Design direction for the polished layout
- Whether the game should be first-view priority or simply more prominent

## Files Expected to Change

- `index.html`
- `styles.css`
- `script.js`
- `game.js`
- `MEMORY.md`
- possibly `AORR.md`

## Deployment Need

- All six Change Items are expected to require redeployment after implementation.

## Current Execution Status

- `CR-001`: `PASSED`
- `CR-002`: `PASSED`
- `CR-003`: `PASSED`
- `CR-004`: `PASSED`
- `CR-005`: `HITL_REQUIRED`
- `CR-006`: `PASSED`

## Actual Modified Files

- `index.html`
- `styles.css`
- `game.js`

## Verification Summary

- `node --check game.js`: passed
- `node --check script.js`: passed
- local static server HTTP checks for `/`, `/styles.css`, and `/game.js`: HTTP 200
- browser automation / visual validation: `[사람 확인 필요]`

## Retry Summary

- `CR-001`: `0` retries in this execution pass
- `CR-002`: `0` retries in this execution pass
- `CR-003`: `0` retries in this execution pass
- `CR-004`: `0` retries in this execution pass
- `CR-005`: not fully resolvable without user profile facts
- `CR-006`: `0` retries in this execution pass

## Completion / Stop Notes

- `CR-005` remains `HITL_REQUIRED` because the project does not contain factual source material for the empty profile fields and the user did not provide it in this step.
- All other executed items were implemented and locally verified with the available Codex verifier.
