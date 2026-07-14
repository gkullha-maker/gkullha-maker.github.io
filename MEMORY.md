# MEMORY

This file tracks the working state and guardrails for the professional static website project.

## Goal

- Complete a GitHub Pages-ready professional website.
- Support responsive desktop and mobile layouts.
- Implement a `Games` tab.
- Implement a snake game controllable by keyboard and mobile touch.
- Perform the first GitHub Pages deployment.
- Reflect any Step 1 `[game add-on feature:]` requirement if one is later confirmed by the user. Current status: `[사람 확인 필요]`.

## Required Deliverables

- `index.html` in the project root
- `styles.css`
- `script.js`
- `game.js` if a separate game file is needed
- any required images and static assets
- `AORR.md`
- `MEMORY.md`

## Current Scope

- Static HTML, CSS, and JavaScript only
- Professional website content
- Responsive layout
- `Games` tab
- Snake game
- GitHub Pages deployment

## Out of Scope

- Backend server
- Database
- Login and signup
- Payments
- User personal data collection
- External APIs without explicit approval
- Framework switching without explicit approval

## Current State

- Current state: `BLOCKED` on GitHub push authentication during deployment
- Completed loops: documentation setup, first static-site shell loop, full implementation loop, deployment attempt
- Next loop: [사람 확인 필요] GitHub authentication or repository permission recovery
- Current Retry count: `2`
- Current error fingerprint: `GitHub push returned 401 Unauthorized`
- Blocker: `GitHub rejected the token or repository access during push`
- Last normal state: `local static server responded with HTTP 200 for index, CSS, script, and game assets`

## Guardrails

- Do not delete existing personal content without confirmation.
- Do not invent unverified career or project details.
- Do not delete or weaken tests.
- Do not print tokens.
- Do not store tokens in HTML, CSS, or JavaScript.
- Do not commit tokens to Git.
- Do not commit `github_token.txt`.
- Do not commit `env_settings.txt`.
- Do not add backend functionality.
- Do not perform large-scale refactors.
- Do not remove features just to make tests pass.

## Acceptance Criteria

- Root `index.html` exists.
- Site loads correctly from a local static server.
- CSS and JavaScript load correctly.
- No console errors.
- Layout is correct on mobile and desktop.
- `Games` tab navigates correctly.
- Snake game runs correctly.
- Keyboard controls work.
- Mobile touch controls work.
- Score and restart work.
- GitHub Pages returns HTTP 200.
- Deployed site behaves the same as local verified behavior.

## Retry Policy

- Maximum 3 retries per single error.
- Stop if the same error fingerprint repeats twice.
- Each Retry must address only one cause.
- Each Retry must rerun the same verifier.

## HITL Conditions

- Personal profile content is unclear.
- Existing content needs deletion.
- Requirements conflict.
- GitHub repository permissions are insufficient.
- GitHub Pages settings must be changed.
- External services must be added.
- Retry limit is reached.

## Tool Policy

- Codex controls task execution, file updates, and test runs.
- Use Claude Code CLI as an independent verifier only if it is actually available in the environment.
- Record the actual Claude model name only if Claude is used successfully.
- Never allow token values to appear in execution logs.

## Execution Log Template

Use one block per loop:

- Loop ID
- Start time
- Goal
- Start state
- Hypothesis
- Act
- Changed files
- Verifier
- Test result
- Exit code
- Error fingerprint
- Retry count
- End state
- Next action
- Human confirmation needed

## Operating Notes

- `AORR.md` is the loop design reference.
- `MEMORY.md` is the live state and guardrail reference.
- Keep the two files aligned when the workflow changes.

## Loop Log

### Loop 1

- Loop ID: `loop-1`
- Start time: `2026-07-14`
- Goal: create the safest basic static website structure for GitHub Pages
- Start state: `READY`
- Hypothesis: the repo only needs a minimal responsive shell before game work begins
- Act: created `index.html`, `styles.css`, and `script.js` in `samsung-agent-education`
- Changed files: `samsung-agent-education/index.html`, `samsung-agent-education/styles.css`, `samsung-agent-education/script.js`
- Verifier: root file existence check, HTML link check, `node --check script.js`, local static server check
- Test result: partial pass; file and script structure created, local server launch failed
- Exit code: `[사람 확인 필요]` because the server launch command failed before a usable HTTP response was produced
- Error fingerprint: `Start-Process python alias inaccessible for local HTTP server`
- Retry count: `1`
- End state: `RETRYING`
- Next action: use a working local server command or a different verifier path in the next loop
- Human confirmation needed: `None for the current shell/server issue; personal content remains [사람 확인 필요]`

### Loop 2

- Loop ID: `loop-2`
- Start time: `2026-07-14`
- Goal: complete the full static professional website and snake game implementation
- Start state: `READY`
- Hypothesis: the existing shell can be extended into the final GitHub Pages site without replacing the repo structure
- Act: implemented `index.html`, `styles.css`, `script.js`, and `game.js` in `gkullha-maker.github.io`
- Changed files: `gkullha-maker.github.io/index.html`, `gkullha-maker.github.io/styles.css`, `gkullha-maker.github.io/script.js`, `gkullha-maker.github.io/game.js`
- Verifier: `node --check script.js`, `node --check game.js`, local static server HTTP checks for `/`, `/styles.css`, `/script.js`, `/game.js`
- Test result: syntax checks passed; static server returned HTTP 200 for all requested assets
- Exit code: `0` for syntax and HTTP verification commands
- Error fingerprint: `none`
- Retry count: `0`
- End state: `VERIFYING`
- Next action: browser-level layout and interaction validation, then deployment approval request
- Human confirmation needed: `browser automation and visual verification are [사람 확인 필요] in this environment`

### Codex verifier

- Tool: Codex verifier via local shell and Node
- Checked files: `index.html`, `styles.css`, `script.js`, `game.js`
- Verified items:
  - root files exist
  - HTML links to CSS and both scripts
  - viewport meta present
  - `Games` anchor present
  - syntax checks passed for `script.js` and `game.js`
  - local static server returned HTTP 200 for `/`, `/styles.css`, `/script.js`, and `/game.js`
- Browser automation / visual validation: `[사람 확인 필요]`

### Deployment attempt

- Loop ID: `deploy-attempt-1`
- Start time: `2026-07-14`
- Goal: push the committed static site to the GitHub Pages repository
- Start state: `VERIFYING`
- Hypothesis: the repository could be pushed using the token file in the workspace
- Act: created local commit `eb5d441` and attempted `git push origin main`
- Changed files: none beyond the committed website files
- Verifier: `git push origin main`
- Test result: failed
- Exit code: `128`
- Error fingerprint: `GitHub push returned 401 Unauthorized`
- Retry count: `1`
- End state: `BLOCKED`
- Next action: [사람 확인 필요] provide a valid GitHub token or repository access
- Human confirmation needed: `GitHub authentication failed; token or repo permission must be fixed before deployment`

### Deployment retry

- Loop ID: `deploy-attempt-2`
- Start time: `2026-07-14`
- Goal: push the committed static site to the GitHub Pages repository after token refresh
- Start state: `BLOCKED`
- Hypothesis: the updated token would resolve the previous 401 authentication failure
- Act: retried `git push origin main` using the refreshed token from `github_token.txt`
- Changed files: none beyond the committed website files
- Verifier: `git push origin main`, then HTTP check of `https://gkullha-maker.github.io`
- Test result: push succeeded and GitHub Pages responded with HTTP 200
- Exit code: `0`
- Error fingerprint: `none`
- Retry count: `2`
- End state: `DEPLOYED`
- Next action: none
- Human confirmation needed: `none`

## Final Deployment Record

- Commit hash: `eb5d441382ef53a240f2edb4fa6f755e9c138e37`
- Push result: `main -> main` succeeded
- GitHub Pages URL: `https://gkullha-maker.github.io`
- HTTP response: `200`
- Final state: `DEPLOYED`

## Change Request Baseline

- New Change Request ID: `CR-20260714-01`
- Baseline commit: `eb5d441382ef53a240f2edb4fa6f755e9c138e37`
- Baseline URL: `https://gkullha-maker.github.io`
- Loop execution order: `Loop-CR-001`, `Loop-CR-002`, `Loop-CR-003`, `Loop-CR-006`, `Loop-CR-004`, `Loop-CR-005`
- Next Step 9 loop: `Loop-CR-001`
- Rollback 기준: keep the baseline commit and URL; do not rewrite history; use normal commits only if rollback is needed
- Human confirmation needed: control latency threshold, obstacle styling, score effect style, design direction, actual profile facts

## Change Request Loop Log

### Loop-CR-001

- Change Item ID: `CR-001`
- Start state: `READY`
- Goal: reduce perceived delay in game button response
- Hypothesis: switching game and control buttons to immediate pointer activation plus touch-action support will reduce perceived lag without changing gameplay rules
- Act: updated `game.js` to bind start/pause/restart and directional pads with pointerdown-based activation and keyboard-click fallback; updated `styles.css` to set `touch-action: manipulation` on buttons
- Changed files: `gkullha-maker.github.io/game.js`, `gkullha-maker.github.io/styles.css`
- Verifier: `node --check game.js`, `node --check script.js`, local static server HTTP checks for `/`, `/styles.css`, `/game.js`
- Result: syntax checks passed; HTTP checks returned 200 for tested assets
- Exit code: `0`
- Error fingerprint: `none`
- Retry count: `0`
- End state: `PASSED`
- Next loop: `Loop-CR-002`
- Human confirmation needed: exact perceptual threshold for “느림” remains `[사람 확인 필요]`

### Loop-CR-002

- Change Item ID: `CR-002`
- Start state: `READY`
- Goal: add random obstacles to the snake game
- Hypothesis: generating obstacles per round and checking collisions against them will satisfy the request without changing core rules
- Act: added obstacle generation, obstacle rendering, and obstacle collision handling in `game.js`
- Changed files: `gkullha-maker.github.io/game.js`
- Verifier: `node --check game.js`, local static server HTTP checks
- Result: syntax checks passed; HTTP checks returned 200 for tested assets
- Exit code: `0`
- Error fingerprint: `none`
- Retry count: `0`
- End state: `PASSED`
- Next loop: `Loop-CR-003`
- Human confirmation needed: obstacle count/density/style remain `[사람 확인 필요]`

### Loop-CR-003

- Change Item ID: `CR-003`
- Start state: `READY`
- Goal: add score highlight effects and stronger 10-point effects
- Hypothesis: score-board and board flash effects can provide clear feedback without changing gameplay
- Act: added score flash and mega flash feedback for 10-point milestones in `game.js` and `styles.css`
- Changed files: `gkullha-maker.github.io/game.js`, `gkullha-maker.github.io/styles.css`
- Verifier: `node --check game.js`, local static server HTTP checks
- Result: syntax checks passed; HTTP checks returned 200 for tested assets
- Exit code: `0`
- Error fingerprint: `none`
- Retry count: `0`
- End state: `PASSED`
- Next loop: `Loop-CR-006`
- Human confirmation needed: effect style direction remains `[사람 확인 필요]`

### Loop-CR-006

- Change Item ID: `CR-006`
- Start state: `READY`
- Goal: make the game more prominent and polish the site design
- Hypothesis: moving the game to the top, collapsing the intro, and refreshing the design will improve hierarchy and access
- Act: rewrote `index.html` and `styles.css` to make the game first, collapse the intro into details, and introduce a more polished visual system
- Changed files: `gkullha-maker.github.io/index.html`, `gkullha-maker.github.io/styles.css`
- Verifier: `node --check game.js`, `node --check script.js`, local static server HTTP checks
- Result: syntax checks passed; HTTP checks returned 200 for tested assets
- Exit code: `0`
- Error fingerprint: `none`
- Retry count: `0`
- End state: `PASSED`
- Next loop: `Loop-CR-004`
- Human confirmation needed: design direction and collapse behavior remain `[사람 확인 필요]`

### Loop-CR-004

- Change Item ID: `CR-004`
- Start state: `READY`
- Goal: improve hero and intro copy tone
- Hypothesis: rewriting the intro as a softer summary will reduce the mechanical feel
- Act: rewrote the hero and intro copy in `index.html`
- Changed files: `gkullha-maker.github.io/index.html`
- Verifier: source inspection and static checks
- Result: copy updated successfully
- Exit code: `0`
- Error fingerprint: `none`
- Retry count: `0`
- End state: `PASSED`
- Next loop: `Loop-CR-005`
- Human confirmation needed: preferred writing tone remains `[사람 확인 필요]`

### Loop-CR-005

- Change Item ID: `CR-005`
- Start state: `READY`
- Goal: fill empty content areas or mark them as HITL
- Hypothesis: factual placeholders are safer than inventing profile details
- Act: kept uncertain profile/project/contact/research items marked as `[사람 확인 필요]`
- Changed files: `gkullha-maker.github.io/index.html`
- Verifier: content completeness inspection
- Result: factual data not present in the repo, so the empty content areas remain HITL
- Exit code: `0`
- Error fingerprint: `none`
- Retry count: `0`
- End state: `HITL_REQUIRED`
- Next loop: none until user provides source facts
- Human confirmation needed: name, email, location, project, research, extra game feature

## Current Change Item Status

- `CR-001`: `PASSED`
- `CR-002`: `PASSED`
- `CR-003`: `PASSED`
- `CR-004`: `PASSED`
- `CR-005`: `HITL_REQUIRED`
- `CR-006`: `PASSED`

## Change Request Execution Summary

- Last executed loop: `Loop-CR-005`
- Current normal candidate: `eb5d441382ef53a240f2edb4fa6f755e9c138e37`
- Rollback 기준: preserve the deployed baseline; revert only with normal commits, never history rewrite
- Remaining human confirmation needed: `CR-005` source facts for profile, contact, projects, research, and any extra game feature
