# Monorepo Example

A simplified example for a monorepo with pnpm. Almost everything can work with pnpm (yarn, or npm) workspaces only but turborepo adds an extra "task" orchestration, pkg dependency management and caching.

For example, if you need to build `packages/react-lib-with-tsup` and then `apps/web` should use its build output, you would need to build them manually in the right order. Turborepo (nx, lerna, and possibly archaic things like gulp) helps with that and you can do a single `turbo build` respecting `build` dependency configured in `turbo.json`.

## What's in this repo?

There are two workspace directories, `apps` that holds the end product that is supposed to be deployed and `packages` often holding local only source code, configs, or npm deployable packages. Each package can have completely different build system, linting, TS or JS, etc. It's not a good practice but it's possible. Turborepo does not support package nesting like [nx](https://nx.dev/) which can be a good or a bad thing depending on dev's preference.

This repo contains the following:

- `apps/web` - a demo webapp bundled by Vite.
- `apps/server` - a demo Cloudflare Worker as a server.
- `packages/react-lib-*` - showcase of different methods how to expose a package as a local dependency while preserving all bells & whistles.
- `packages/eslint` - reusable ESLint configs. New flat ESLint config can be at the root only but workspace packages get better modularity when configs are scoped per-package, hence reusable config.
- `packages/tsconfig` - reusable TypeScript configs.

## Development

Run the following command in the root of the repo:

```shell
# install once as usual
pnpm install

# run cross-workspace dev script alias
pnpm dev
```

Explanation what happens:

* `dev` script alias from the root `package.json` runs `turbo run dev --no-daemon`. 
* `dev` configuration in `turbo.json` is used and all workspace packages with identical script alias run.
* `apps/server` runs Cloudflare Worker via wrangler (mocked Cloudflare infra for local development).
* `apps/web` runs webapp handled by Vite with its `"dev": "vite dev"`.
* `packages/react-lib-with-tsup` runs as a dev build with a watcher.
* `packages/react-lib-with-vite` runs as a dev build with a watcher.
* `packages/react-lib-direct` is plain code and imported directly by `apps/web`.
* Any change in either of these packages will cause HMR on an opened `apps/web` page.

## Build

To test how a production build looks like, do the following:

```shell
# install once as usual
pnpm install

# run cross-workspace dev script alias
pnpm dev
```

This will build all local package dependencies first and then the end packages such as `apps/web` and `apps/web-js`. To see a production output for one of them, you can run `pnpm --filter @repo/web run preview`.

## Cheat Sheet

pnpm (or any other manager) can feel more cryptic as it needs a filter to target where packages are installed when handling the repo from the root.

```shell
# add a local dev package dependency to apps/web package
pnpm --filter web --workspace -D add @repo/typescript

# add a remote package dependency to apps/web package
pnpm --filter web -D add zod

# remove a package dependency
pnpm --filter web remove zod

# run a watched build for the specific package without turbo (`--watch` is part of tsup not pnpm)
pnpm --filter react-lib-with-tsup build --watch
```

In rare cases, things can get messed up when renaming packages, manually changing dependency versions, or upgrading pnpm. Sometimes, `pnpm install` is enough to help. And other times when pnpm or turbo cache pretends that everyting is ok, and pnpm forced reinstall is no help (as it almost never helps), a clean reinstall is needed, e.g.:


```shell
# use git clean command to remove all non-versioned files
pnpm run clean 

# install everything again
pnpm install
```

Other managers have different pitfalls.

## Useful Links

Bunch of links for tools or services related to this repo.

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [ESLint](https://eslint.org/docs/latest/use/getting-started) - the latest ESLint with flat config.
- [Hono](https://hono.dev/docs/getting-started/basic) - a go-to server as a replacement for express or fastify leveraging browser API over node.js. Can run in various environments out of the box, e.g. node.js, Deno, Bun, AWS lambda, Cloudflare Worker, etc.
- [Package entry points](https://nodejs.org/api/packages.html#package-entry-points) - details how `"exports"` in `package.json` works.
- [pnpm workspaces](https://pnpm.io/workspaces)
- [tsconfig cheat sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet)
- [tsconfig docs](https://www.typescriptlang.org/tsconfig/)
- [tsup](https://tsup.egoist.dev/) - a simple tool to build a library via esbuild as an alternative to Vite [library mode](https://vite.dev/guide/build.html#library-mode) that was added recently.
- [tsx](https://github.com/privatenumber/tsx) - a simple way to directly run a TypeScript file without any extra configuration.
- [turbopack](https://turbo.build/pack/docs)
- [Vite](https://vite.dev/config/)