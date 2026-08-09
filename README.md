# nudova-shadcn

Custom [shadcn registry](https://ui.shadcn.com/docs/registry) for the Nudova workspace. It is the single source of truth for the UI components shared by `nudova-web` (storefront) and `nudova-admin` (staff admin).

All components are shadcn v4 **radix-vega** style (Radix base), extracted from the two apps and carrying the workspace's strict-tsconfig patches (`exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`).

## Layout

```
registry.json        # registry manifest (23 items)
components/ui/       # component sources
lib/utils.ts         # cn() helper (local type-check only, not a registry item)
public/r/            # built registry JSON (output of `pnpm build`, committed)
```

## Items

- 22 stock radix-vega components shared byte-identical by both apps:
  `alert-dialog`, `autocomplete`, `badge`, `button`, `card`, `checkbox`, `combobox`, `command`, `dialog`, `dropdown-menu`, `field`, `form`, `input-group`, `input`, `label`, `native-select`, `popover`, `select`, `separator`, `sonner`, `table`, `textarea`
- **`button-belltex`** — the BellTex design-system button fork used by the storefront (variants `primary`/`secondary`/`ghost`/`boys`, sizes sm/md/lg = 36/44/52, `loading` prop, back-compat legacy variants). It installs **as `components/ui/button.tsx`** via a `target` override.

> **Warning:** `button` (stock) and `button-belltex` write to the same file in a consumer. nudova-web must only ever install `button-belltex`; nudova-admin uses the stock `button`. Never run `add --overwrite` in nudova-web with anything that transitively depends on `@nudova/button` (`alert-dialog`, `combobox`, `dialog`, `input-group`, …) — without `--overwrite` existing files are left untouched, which is the safe default.

## Development

```bash
pnpm install
pnpm build        # shadcn build → public/r/*.json
pnpm serve        # serve public/ at http://localhost:3333
pnpm type-check
pnpm validate     # type-check + build
```

## Consuming from nudova-web / nudova-admin

Add the namespace to the app's `components.json`:

```jsonc
"registries": {
  "@nudova": "http://localhost:3333/r/{name}.json"
  // or, once pushed to GitHub (public/r is committed):
  // "@nudova": "https://raw.githubusercontent.com/nudova/nudova-shadcn/main/public/r/{name}.json"
}
```

Then:

```bash
pnpm dlx shadcn@latest add @nudova/combobox        # deps (button, input-group, …) resolve from this registry
pnpm dlx shadcn@latest add @nudova/button-belltex  # storefront only
```

## Updating components

1. Edit the source under `components/ui/` here (or re-vendor from `https://ui.shadcn.com/r/styles/radix-vega/{name}.json` and re-apply the strict-tsconfig patches: calendar modifiers bracket-access, dropdown-menu `checked ?? false`, sonner `NonNullable<ToasterProps["theme"]>` cast).
2. `pnpm validate` and commit (including `public/r/`).
3. In each consumer app: `pnpm dlx shadcn@latest add @nudova/<name> --overwrite` (never overwrite `button` in nudova-web), then `pnpm validate`.

Note: `shadcn diff` does **not** content-compare against a registry — it reports "No updates found" even when stale. Audit drift by diffing files directly against this repo.
