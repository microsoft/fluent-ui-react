import { NavLink } from 'react-router-dom'
import { Button, Divider } from '@stardust-ui/react'

export const meta = {
  title: 'Quick Start',
}

## Install

Stardust UI should be installed as a `dependency` of your app.

```sh
yarn add @stardust-ui/react
```

## Setup

Stardust components are styled using CSS in JS. This technique requires a style renderer to
render JavaScript objects to CSS. [React Context](https://reactjs.org/docs/context.html) is used to provide the style
renderer and theme to components.

Place a `<Provider />` at the root of your app and pass theme as props.

```jsx label=index.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, themes } from '@stardust-ui/react'

import App from './App'

ReactDOM.render(
  <Provider theme={themes.teams}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```

## Usage

That's it. You can now use Stardust UI components in your app.

```jsx label=App.jsx
import React from 'react'
import { Button } from '@stardust-ui/react'

export default () => <Button content="Theming" icon="arrow right" iconPosition="after" primary />
```

<Divider />
<br />

<Button
  as={NavLink}
  content="Accessibility"
  icon="arrow right"
  iconPosition="after"
  primary
  to="accessibility"
/>
