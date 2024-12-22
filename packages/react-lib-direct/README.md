# @repo/react-lib-direct

A react library as the direct source code.

## Traits

* Absolute paths defined in tsconfig `paths` work fine in `dev` but not in `build` even when using new `${configDir}` tsconfig feature.
* No need to build anything as a consumer package is taking care of it.
* Code is watched by a consumer as it takes files directly. This allows the fastest possible HMR as it does not have to wait for a package re-build.
* Local dependencies are included when local package is installed in a consumer package. There can be some confusion "where" should be installed "what".
* Requires to expose everything via `exports` and then use file extensions in import paths. An alternative would be to include exact paths in exports, e.g. `"./Sample": "./src/Sample.tsx"` which is ok for a few exposed components.
* Clicking on go-to-definition jumps to the exact implementation.
* It's not a deployable package to npm.