# Ericoolen

This site is generated from source files with the Astro backend in
[`gocire`](https://github.com/Eric-Song-Nop/gocire).

## Setup

```bash
pnpm install
```

The generator is expected at `../gocire` by default. Override it with
`GOCIRE_DIR=/path/to/gocire` when needed.

## Generate

```bash
pnpm run generate
```

Generated Astro files are written to `.gocire/site`.

## Build

```bash
pnpm run build
```

The static site is emitted to `.gocire/site/dist`.

## Local Development

```bash
pnpm run dev
```

## Requirements

- Go and the local `../gocire` checkout
- `gopls`
- `rust-analyzer`
- Node.js and pnpm, which install `typescript-language-server`
