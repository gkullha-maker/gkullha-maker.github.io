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

---

# CHANGE REQUEST

## Change Request ID

- `CR-20260714-02`

## User Request Original

"""

#게임
1. 게임 화면이 단조로워서 좀 더 화려 했으면 좋겠음. 뱀 모양도 단순한 네모 보단 뱀 처럼 보이도록. 배경도 풀숲 처럼 보일 수 있도록


#사이트
1. 소개 문구를 좀 덜 기계적이게 바꿔줘.

2. 사이트 전체 디자인을 7-80년대 레트로 풍으로 변경 해줘

3. 비어 있거나 확인 필요한 항목들은 페이지에 표시 안되게 커멘트 처리해줘

4. score board 게임 시작 멈춤 재시작, 방향키 조작 버튼 등이 게임 화면 안에 표시 되도록 해줘
"""

## Baseline

- Last known good commit: `0abd5f5`
- Last known good URL: `https://gkullha-maker.github.io`

## Reference Material

- Current project source files
- `AORR.md`
- `MEMORY.md`
- `CHANGE_REQUEST_REVIEW.md`
- User request above
- Additional reference material: not found in the current project tree

## Current State

- Baseline is deployed and reachable
- Request is analyzed but not yet implemented
- Any unclear content facts remain `[사람 확인 필요]`

## Change Items

### CR-001

- Change Item ID: `CR-001`
- User request original: `게임 화면이 단조로워서 좀 더 화려 했으면 좋겠음. 뱀 모양도 단순한 네모 보단 뱀 처럼 보이도록. 배경도 풀숲 처럼 보일 수 있도록`
- Request summary: Make the game more vivid, make the snake look more snake-like, and make the background feel like grass
- Request classification: `GAME_EFFECT`, `GAME_ENTITY`, `UI_UX`, `NEW_FEATURE`
- Current behavior: The game visuals are relatively simple
- Expected behavior: The game should look more vibrant, the snake should feel less boxy, and the background should resemble grass
- Reproduction method: Load the game area and inspect the current visuals
- Evidence: User request text
- Target feature: Game rendering, snake representation, background styling
- Expected files: `game.js`, `styles.css`
- Allowed scope: Rendering style, shape treatment, background pattern, visual layers
- Forbidden scope: Changing core game rules or introducing a new framework
- Prerequisites: None
- Follow-up work: Mobile and performance regression tests
- Dependency: Partially related to `CR-004`
- Completion criteria: The game looks richer and the snake/background are clearly less plain
- Verification: Visual inspection on desktop and mobile
- Regression tests: game start, score, obstacles, keyboard/touch controls
- Risk: `MEDIUM`
- Deployment required: Yes
- Human confirmation needed: grass style, visual intensity, color direction

### CR-002

- Change Item ID: `CR-002`
- User request original: `소개 문구를 좀 덜 기계적이게 바꿔줘.`
- Request summary: Make the intro copy sound less mechanical
- Request classification: `CONTENT`, `UI_UX`
- Current behavior: Intro copy sounds somewhat mechanical
- Expected behavior: Intro copy should feel more natural and less stiff
- Reproduction method: Read the hero/introduction copy on page load
- Evidence: User request text
- Target feature: Hero and intro copy
- Expected files: `index.html`
- Allowed scope: Tone and wording refinement
- Forbidden scope: Inventing facts
- Prerequisites: Verified facts or HITL labels
- Follow-up work: Content tone consistency across sections
- Dependency: None
- Completion criteria: The intro reads more naturally
- Verification: Copy review
- Regression tests: home layout, mobile display
- Risk: `LOW`
- Deployment required: Yes
- Human confirmation needed: writing tone preference

### CR-003

- Change Item ID: `CR-003`
- User request original: `사이트 전체 디자인을 7-80년대 레트로 풍으로 변경 해줘`
- Request summary: Restyle the entire site with a 1970s/1980s retro aesthetic
- Request classification: `UI_UX`, `RESPONSIVE`, `SPEC_CHANGE`
- Current behavior: The design is contemporary and clean
- Expected behavior: The site should have a 70s/80s retro mood
- Reproduction method: Inspect the full page design
- Evidence: User request text
- Target feature: Global visual design system
- Expected files: `styles.css`, possibly `index.html`
- Allowed scope: Color palette, typography, backgrounds, accents, layout styling
- Forbidden scope: Framework changes or feature removal
- Prerequisites: Design direction decision
- Follow-up work: Responsive regression testing
- Dependency: Interacts with `CR-001` and `CR-005`
- Completion criteria: The whole UI reads consistently retro across the page
- Verification: Desktop/mobile visual inspection
- Regression tests: navigation, game readability, mobile layout
- Risk: `HIGH`
- Deployment required: Yes
- Human confirmation needed: exact retro reference, colors, level of exaggeration

### CR-004

- Change Item ID: `CR-004`
- User request original: `비어 있거나 확인 필요한 항목들은 페이지에 표시 안되게 커멘트 처리해줘`
- Request summary: Hide empty or uncertain items from the visible page and keep them in comments
- Request classification: `CONTENT`, `INFORMATION_ARCHITECTURE`, `ACCESSIBILITY`
- Current behavior: Some uncertain items are visible as placeholders
- Expected behavior: Uncertain content should not be visible on the page
- Reproduction method: Inspect the visible content areas
- Evidence: User request text
- Target feature: Content rendering and visibility handling
- Expected files: `index.html`
- Allowed scope: Hide visible placeholders, comment them in source, or otherwise keep them out of the page
- Forbidden scope: Fabricating missing facts
- Prerequisites: Decide whether to hide fully or keep source comments
- Follow-up work: Content/structure consistency review
- Dependency: Related to `CR-002`
- Completion criteria: Empty/uncertain items are not visibly rendered
- Verification: DOM and page inspection
- Regression tests: layout, navigation, mobile display
- Risk: `MEDIUM`
- Deployment required: Yes
- Human confirmation needed: exact comment-handling preference

### CR-005

- Change Item ID: `CR-005`
- User request original: `score board 게임 시작 멈춤 재시작, 방향키 조작 버튼 등이 게임 화면 안에 표시 되도록 해줘`
- Request summary: Move the scoreboard and game controls into the game screen
- Request classification: `UI_UX`, `GAME_CONTROL`, `RESPONSIVE`, `INFORMATION_ARCHITECTURE`
- Current behavior: Game controls are separated from the game screen
- Expected behavior: Scoreboard and control buttons should appear inside the game area
- Reproduction method: Open the game section and inspect the current control placement
- Evidence: User request text
- Target feature: Game layout, score panel, control placement, touch controls
- Expected files: `index.html`, `styles.css`, `game.js`
- Allowed scope: In-canvas overlays, integrated control layout, responsive positioning
- Forbidden scope: Shrinking controls so much that they become unusable
- Prerequisites: Layout strategy for the game screen
- Follow-up work: Responsive and accessibility validation
- Dependency: Strongly related to `CR-001` and `CR-003`
- Completion criteria: Scoreboard and controls are visibly within the game screen layout
- Verification: Desktop and mobile visual checks at 375px/768px/1440px
- Regression tests: start/pause/restart, keyboard, touch, score, game over
- Risk: `HIGH`
- Deployment required: Yes
- Human confirmation needed: how far inside the game screen controls should be placed

## Request Classification Summary

- `CR-001`: `GAME_EFFECT`, `GAME_ENTITY`, `UI_UX`, `NEW_FEATURE`
- `CR-002`: `CONTENT`, `UI_UX`
- `CR-003`: `UI_UX`, `RESPONSIVE`, `SPEC_CHANGE`
- `CR-004`: `CONTENT`, `INFORMATION_ARCHITECTURE`, `ACCESSIBILITY`
- `CR-005`: `UI_UX`, `GAME_CONTROL`, `RESPONSIVE`, `INFORMATION_ARCHITECTURE`

## Change Request Loop Plan

### Loop-CR-005

- Target: Move the scoreboard and controls into the game screen
- State: `CHANGE_PLANNED`
- Inputs: current game layout, game control placement
- Act: integrate scoreboard/control UI into the game area with responsive handling
- Observe: placement on desktop and mobile
- Reason: `UI_UX`, `GAME_CONTROL`, `RESPONSIVE`, `INFORMATION_ARCHITECTURE`
- Verifier: layout inspection at target viewport sizes
- Completion criteria: controls are inside the game screen and still usable
- Retry policy: one cause at a time, max 3 retries
- Stop conditions: repeated fingerprint, retry limit, or blocker
- HITL conditions: placement preference if ambiguity remains
- Expected files: `index.html`, `styles.css`, `game.js`
- Predecessor: none
- Next: `Loop-CR-001`

### Loop-CR-001

- Target: Make the game more vivid and snake-like with a grass-like background
- State: `CHANGE_PLANNED`
- Inputs: current snake rendering and background styling
- Act: improve game visuals with richer rendering and background treatment
- Observe: snake shape, background feel, visual richness
- Reason: `GAME_EFFECT`, `GAME_ENTITY`, `UI_UX`, `NEW_FEATURE`
- Verifier: visual review on desktop/mobile
- Completion criteria: the game reads as more lively and less boxy
- Retry policy: one cause at a time, max 3 retries
- Stop conditions: repeated fingerprint, retry limit, or blocker
- HITL conditions: style preferences for grass/vividness
- Expected files: `game.js`, `styles.css`
- Predecessor: `Loop-CR-005`
- Next: `Loop-CR-003`

### Loop-CR-003

- Target: Apply a 70s/80s retro design across the site
- State: `CHANGE_PLANNED`
- Inputs: current global design system
- Act: restyle typography, colors, backgrounds, and cards
- Observe: global visual tone on desktop and mobile
- Reason: `UI_UX`, `RESPONSIVE`, `SPEC_CHANGE`
- Verifier: page-wide visual inspection
- Completion criteria: the site consistently feels retro
- Retry policy: one cause at a time, max 3 retries
- Stop conditions: repeated fingerprint, retry limit, or blocker
- HITL conditions: exact retro style choice
- Expected files: `styles.css`, possibly `index.html`
- Predecessor: `Loop-CR-001`
- Next: `Loop-CR-002`

### Loop-CR-002

- Target: Make the intro copy sound less mechanical
- State: `CHANGE_PLANNED`
- Inputs: current intro/here copy
- Act: rewrite the intro text to sound more natural
- Observe: tone and readability
- Reason: `CONTENT`, `UI_UX`
- Verifier: copy review
- Completion criteria: the intro no longer sounds mechanical
- Retry policy: one cause at a time, max 3 retries
- Stop conditions: repeated fingerprint, retry limit, or blocker
- HITL conditions: if the user wants a specific tone
- Expected files: `index.html`
- Predecessor: `Loop-CR-003`
- Next: `Loop-CR-004`

### Loop-CR-004

- Target: Hide empty or uncertain content items from the visible page
- State: `CHANGE_PLANNED`
- Inputs: current placeholder/uncertain content
- Act: remove the visible placeholders and leave them commented or otherwise non-visible in source
- Observe: visible page content and source comments
- Reason: `CONTENT`, `INFORMATION_ARCHITECTURE`, `ACCESSIBILITY`
- Verifier: DOM/page inspection
- Completion criteria: uncertain items are not visible
- Retry policy: one cause at a time, max 3 retries
- Stop conditions: repeated fingerprint, retry limit, or blocker
- HITL conditions: whether to hide fully or keep comments
- Expected files: `index.html`
- Predecessor: `Loop-CR-002`
- Next: none until clarification if needed

## Execution Order

1. `Loop-CR-005`
2. `Loop-CR-001`
3. `Loop-CR-003`
4. `Loop-CR-002`
5. `Loop-CR-004`

## Risk Summary

- Highest risk: `CR-005`, `CR-003`
- Medium risk: `CR-001`, `CR-004`
- Lower risk: `CR-002`

## Human Confirmation Needed

- exact placement preference for in-game controls
- grass/background style for the game
- snake body styling preference
- retro reference or mood board
- wording tone for the intro copy
- whether uncertain content should be hidden entirely or kept as comments in source

## Files Expected to Change

- `index.html`
- `styles.css`
- `game.js`
- possibly `MEMORY.md`
- possibly `AORR.md`

## Deployment Need

- All Change Items are expected to require redeployment after implementation.

## Current Execution Status

- `CR-001`: `PASSED`
- `CR-002`: `PASSED`
- `CR-003`: `PASSED`
- `CR-004`: `PASSED`
- `CR-005`: `PASSED`

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
- `CR-005`: `0` retries in this execution pass

## Completion / Stop Notes

- All items in the new change request were implemented in the local workspace and exercised with the available Codex verifier.
- Browser-level visual confirmation remains `[사람 확인 필요]` until a live browser review is performed.
