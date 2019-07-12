import * as React from 'react'
import { Text } from '@stardust-ui/react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  <Text>
    Choose desired accessibility behavior depending on the use case. (Check the{' '}
    <Text as="a" href="/behaviors/menu" color="brand">
      Behaviors
    </Text>{' '}
    section).
  </Text>,
  'Provide label to the Menu component using `aria-label` or `aria-labelledby` prop.',
  'Use Shorthand API with items prop instead of using Children API (`<MenuItem>` component directly).',
  <Text>
    For render tree customization, use{' '}
    <Text as="a" href="/shorthand-props#render-callback-argument" color="brand">
      render callback argument
    </Text>
    .
  </Text>,
]

const dontList = ['Do not render focusable or clickable elements inside of the menu item.']

const MenuBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />
}

export default MenuBestPractices
