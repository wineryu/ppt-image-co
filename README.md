# PPT Image First

PPT Image First is a small static web app for building presentation storyboards around visual anchors first, instead of starting from a dense text outline.

The app turns a topic into:

- page goals
- visual anchors
- slide copy
- image generation prompts
- Markdown and JSON exports

## Why This Exists

Many AI-generated slide decks start with a text outline and only add images at the end. That often creates crowded pages and inconsistent visual direction.

This project explores a different workflow:

1. define the presentation topic
2. generate visual anchors for each page
3. write concise copy around the visual intent
4. export the storyboard for further Agent-assisted iteration

## How To Run

Open `index.html` in a browser.

No build step and no backend are required.

## Agent Workflow

This project is designed to show how an AI coding agent can participate in a complete small-product loop:

- clarify the project goal
- create the product structure
- implement the static UI
- generate reusable storyboard content
- provide export formats for later automation
- prepare application materials and evidence

## Roadmap

- Add real model API calls for storyboard generation.
- Add screenshot-based review for slide readability.
- Add PPTX export.
- Add a prompt-template library for different presentation types.
- Add GitHub Pages deployment.

## Application Summary

I use Codex to build a visual-first PPT storyboard tool. The project solves the problem that AI-generated presentations often become text-heavy and visually inconsistent. Codex helps with requirement breakdown, UI implementation, prompt design, export structure, and documentation. More token budget would allow longer multi-file context, more visual iteration, richer template libraries, and continuous Agent-assisted product improvement.
