import * as React from 'react'
import { Text } from '@stardust-ui/react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'
import { link } from '../../../../utils/helpers'

const doList = [
  <Text>
    {link('render callback argument', '/shorthand-props#render-callback-argument')}
    Choose desired accessibility behavior depending on the use case. (Check the{' '}
    {link('Behaviors', '/behaviors/menu')} section).
  </Text>,
  'Provide label to the Menu component using `aria-label` or `aria-labelledby` prop.',
  'Use Shorthand API with items prop instead of using Children API (`<MenuItem>` component directly).',
  <Text>
    For render tree customization, use{' '}
    {link('render callback argument', '/shorthand-props#render-callback-argument')}.
  </Text>,
]

const dontList = ['Do not render focusable or clickable elements inside of the menu item.']

const MenuBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />
}

export default MenuBestPractices
