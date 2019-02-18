# @stardust-ui/internal-tooling/pika-plugin-bundle-types

> A [@pika/pack](https://github.com/pikapkg/pack) build plugin.
> Generates definitions with TypeScript and then creates a bundle from your TypeScript type definitions, using [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts).


## Install

```sh
# npm:
npm install @stardust-ui/internal-tooling --save-dev
# yarn:
yarn add @stardust-ui/internal-tooling --dev
```


## Usage

```json
{
  "name": "example-package-json",
  "version": "1.0.0",
  "@pika/pack": {
    "pipeline": [
      ["@pika/plugin-standard-pkg"],
      ["@stardust-ui/internal-tooling/pika-plugin-bundle-types"]
    ]
  }
}
```

For more information about @pika/pack & help getting started, [check out the main project repo](https://github.com/pikapkg/pack).


## Result

1. Generates a single file with TypeScript definitions for your package build: `dist-types/`
1. Adds a "types" entrypoint to your built `package.json` manifest.
