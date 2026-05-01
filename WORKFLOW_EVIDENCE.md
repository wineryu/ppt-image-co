# Workflow Evidence

This file records the real development path for `PPT Image First`. It is intended to make the project easier to review without relying on screenshots alone.

## Problem

AI-generated slide decks often start from a text outline. The result is usually readable as a document, but weak as a presentation: too much text, unclear visual hierarchy, and inconsistent image direction.

## Current Prototype

The current static prototype supports:

- topic, audience, page count, and visual style inputs
- generated storyboard cards
- page-level visual anchors
- concise slide copy
- image prompt generation
- Markdown export
- JSON export
- lightweight Agent review metrics for prompt length, tag coverage, page count, and text density

## Agent-Assisted Development Steps

1. Defined the application angle for a token-plan application: a visual-first PPT workflow instead of another generic slide generator.
2. Built a static front-end prototype with `index.html`, `styles.css`, and `app.js`.
3. Added export formats so the storyboard can become an intermediate artifact for later model calls or PPTX generation.
4. Added application drafts in `APPLY_DRAFT.md` and `HIGH_TIER_APPLICATION.md`.
5. Added quality review metrics so each generated deck can be checked before further iteration.
6. Prepared the repository for GitHub with a README and `.gitignore`.

## Why This Needs Long Context

The intended workflow requires the Agent to keep several things in context at the same time:

- presentation topic and audience
- visual style constraints
- page-by-page storyboard state
- image prompts
- exported Markdown and JSON
- UI code
- screenshot feedback
- future API and PPTX export requirements

This makes the project a practical fit for high-token iterative work rather than a single-turn demo.

## Next Engineering Steps

- Connect MiMo API for dynamic storyboard generation.
- Add a prompt-template library by presentation type.
- Add PPTX export.
- Add screenshot-based readability checks.
- Deploy a public GitHub Pages demo.
