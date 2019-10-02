`@stardust-ui/state`
===

A set of utils to create framework agnostic and reusable state managers.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Usage](#usage)
- [Usage with React](#usage-with-react)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

**NPM**
```bash
npm install --save @stardust-ui/state
```

**Yarn**
```bash
yarn add @stardust-ui/state
```

# Usage

```tsx
import { createManager, ManagerFactory } from "@stardust-ui/state";

type InputState = { value: string };
type InputActions = { change: (value: string) => void };

const createInputManager: ManagerFactory<InputState, InputActions> = config =>
  createManager<InputState, InputActions>({
    ...config,
    actions: {
      change: (value: string) => () => ({ value })
    },
    state: { value: "", ...config.state }
  });
const manager = createInputManager({ state: { value: "Hello world!" } });
```

# Usage with React

We provide React bindings under [`@stardust-ui/react-bindings`](https://github.com/stardust-ui/react/tree/master/packages/react-bindings).
