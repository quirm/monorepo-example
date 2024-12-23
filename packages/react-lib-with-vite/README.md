# @repo/react-lib-with-vite

Build a react library with [vite](https://vite.dev/guide/build.html#library-mode) library mode.

## Traits

* Build configuration is not simple. Problem with correct source maps.
* Allows tsconfig `paths` for absolute imports.
* Allows a watcher for live updates by a consumer.
* All dev/dependencies are automatically internalized. To exclude them, `rollupOptions.external: ['pkg']` in vite config.
* Can be deployed as a proper package to npm.
* As it is using vite, it can have a local integration with a dev server to conveniently test the implementation without a need to wait for longer rebuilds and test it in a consumer package.
* Vite with its plugins can provide richer handler for all kinds of different needs.
  
## Troubleshooting

### dts configuration

`vite-plugin-dts` used in `vite.config.ts` has a TypeScript version mismatch. It did not understand `noUncheckedSideEffectImports` from a newer TypeScript version as there is some `typescript` package mismatch.

### sourcemaps

Source maps are not correctly showing source code in devtools.

### re-build

When running in `dev`, a consumer package will error out as build output is missing. It can be fixed by not clearing out the build directory on a new build.