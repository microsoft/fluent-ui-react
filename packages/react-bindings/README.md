`@stardust-ui/react-bindings`
===

A set of reusable components and hooks to build component libraries and UI kits.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Hooks](#hooks)
  - [`useStateManager()`](#usestatemanager)
    - [Usage](#usage)
    - [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

**NPM**
```bash
npm install --save @stardust-ui/react-bindings
```

**Yarn**
```bash
yarn add @stardust-ui/react-bindings
```

# Hooks

## `useStateManager()`

A React hook that provides bindings for state managers. 

### Usage 

The examples below assume a component called `<Input>` will be used this way:

```tsx
type InputProps = {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
};
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

const Input: React.FC<InputProps> = props => {
  const [state, actions] = useStateManager(createInputManager, {
    mapPropsToInitialState: () => ({ value: props.defaultValue }),
    mapPropsToState: () => ({ value: props.value })
  });

  return (
    <input
      onChange={e => {
        actions.change(e.target.value);
        if (props.onChange) props.onChange(e.target.value);
      }}
      value={state.value}
    />
  );
};
```

### Reference

```tsx
const [state, actions] = useStateManager(createInputManager)
const [state, actions] = useStateManager(
  managerFactory: ManagerFactory<State, Actions>, 
  options: UseStateManagerOptions<Props>,
)
```

- `managerFactory` - a factory that implements state manager API
- `options.mapPropsToInitialState` - optional, maps component's props to the initial state
- `options.mapPropsToState` - optional, maps component's props to the state, should be used if your component implements [controlled mode](https://reactjs.org/docs/uncontrolled-components.html).
