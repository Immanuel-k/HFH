---
name: 21st-dev
description: >-
  Search, fetch, generate, and review React and Tailwind CSS UI components, themes, and design context using 21st.dev (Magic Chat). Use this skill when asked to search or install components from 21st.dev, generate UI components, or manage 21st design context.
---

# 21st.dev (Magic Chat) Skill

`21st.dev` (formerly Magic Chat / Magic MCP) is an AI-powered UI component registry and generation toolkit for React, Tailwind CSS, and modern web frameworks.

## Key Capabilities

1. **Component & Theme Discovery**: Search 12,000+ community and official components, themes, and SVG brand logos.
2. **Component Installation**: Retrieve and add component code directly into the workspace repository.
3. **AI UI Generation**: Sketch project-aware component variants tailored to your stack and design context.
4. **Design Context & UI Review**: Maintain project design constraints (`.21st/design.json`) and run local UI code reviews.

---

## Core Workflows & Commands

### 1. Search Components, Themes, and Logos
Search for components, themes, or templates:
```bash
npx @21st-dev/cli search "<query>"
```

Search brand & UI SVG logos:
```bash
npx @21st-dev/cli logo "<query>"
```

### 2. Retrieve & Install Components
Inspect a component's code and demo details:
```bash
npx @21st-dev/cli get <id>
```

Install a published component into your project:
```bash
npx @21st-dev/cli add <author>/<slug>
```

### 3. Generate UI Components with 21st AI
Generate project-aware UI variants based on prompt and context:
```bash
npx @21st-dev/cli generate "<prompt>"
```

### 4. Manage Design Context & Review Code
Create or update local design context (`.21st/design.json` and `.21st/DESIGN.md`):
```bash
npx @21st-dev/cli init --design-context
```

Review UI source code with local rules:
```bash
npx @21st-dev/cli review <path...>
```
