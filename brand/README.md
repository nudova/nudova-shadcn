# `@nudova/brand`

Single source of truth for Nudova Brand Guidelines v1.1 tokens and logo artwork.

Buyer-facing surfaces (marketing site, docs, admin sandbox chrome) **import** this package. Do not fork `tokens.css` into another repo.

## Install

From a sibling checkout of this monorepo workspace:

```bash
pnpm add @nudova/brand@file:../nudova-shadcn/brand
```

Or pin a git URL in CI once the package is published from this tree.

## Usage

```css
@import "@nudova/brand/tokens.css";
```

```ts
import lockupLight from "@nudova/brand/logo/lockup-light.svg";
import lockupDark from "@nudova/brand/logo/lockup-dark.svg";
```

## Rules

1. Magenta at most once per screen (single most important action).
2. Text on a brand colour is always light. Labelled magenta surfaces use `#DB05A1`.
3. Never `#310DFA` as text in dark mode — use `#9886FC`.
4. Page background is never pure white — use `#FBFAF8`.
5. The wordmark is SVG artwork (`lockup-light.svg` / `lockup-dark.svg`), never set in a typeface.
