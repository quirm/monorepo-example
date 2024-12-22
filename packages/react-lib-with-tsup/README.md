# @repo/react-lib-with-tsup

Build a react library with [tsup](https://tsup.egoist.dev/).

Local package installation via pnpm has some convenient steps that automatically install missing packages, e.g. luxon in this package is treated as external and runtime of a consumer package should fail but it will not in this monorepo. To properly test that this package includes all necessary dependencies, it's better to install it in a different project as other users would do.

## Traits

* Simple build configuration (provides source, dts, sourcemaps).
* Allows tsconfig `paths` for absolute imports.
* Allows a watcher for live updates by a consumer.
* All dev/dependencies are automatically externalized. To include some, use `noExternal: ['pkg']` in tsup config.
* Clicking on go-to-definition jumps to d.ts over the source code. `declarationMap` or `sourceMap` in `tsconfig` is no help. Unclear if it's posible.
* Can be deployed as a proper package to npm.

## Troubleshooting

When `composite` is set in `tsconfig.json`, it will fail to include any other non-entry files. It's important for a monorepo though. A workaround is to handle dts differently in `tsup.config.js` as suggested at https://github.com/egoist/tsup/issues/571.