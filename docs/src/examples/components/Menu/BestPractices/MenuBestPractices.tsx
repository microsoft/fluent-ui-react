import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content: 'Choose desired accessibility behavior depending on the use case.',
  },
  {
    key: 'two',
    content: 'Provide label to the Menu component using `aria-label` or `aria-labelledby` prop.',
  },
]

const dontList = [
  {
    key: 'one',
    content:
      'Do not use Children API (`<MenuItem>` component directly), use Shorthand API with items prop instead.',
  },
  {
    key: 'two',
    content: 'Do not render focusable or clickable elements inside of the menu item.',
  },
]

const MenuBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />
}

export default MenuBestPractices
