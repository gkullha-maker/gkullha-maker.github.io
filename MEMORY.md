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

- Current state: `VERIFYING` for the full implementation loop
- Completed loops: documentation setup, first static-site shell loop, current full implementation loop
- Next loop: browser-level layout and interaction validation, then deployment approval request
- Current Retry count: `2`
- Current error fingerprint: `none`
- Blocker: `browser automation tool not available in this environment; manual browser verification is [사람 확인 필요]`
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
