import * as React from 'react'
import {
  Menu,
  Popup,
  Status,
  Box,
  navigableListBehavior,
  navigableListItemBehavior,
} from '@stardust-ui/react'

// when Flex component will be released then Box should be replaced
const PopupItemLayout = props => {
  return <Popup trigger={<Box {...props} />} content="Hello from popup!" />
}

const items = [
  {
    as: PopupItemLayout,
    key: 'IrvingKuhic',
    content: (
      <>
        <Status color="red" icon="minus" title="Busy" /> <span> Irving Kuhic,</span>
      </>
    ),
    role: 'button',
    accessibility: navigableListItemBehavior,
  },
  {
    as: PopupItemLayout,
    key: 'SkylerParks',
    content: (
      <>
        {' '}
        <Status color="green" icon="check" title="Available" /> <span> Skyler Parks,</span>
      </>
    ),
    role: 'button',
    accessibility: navigableListItemBehavior,
  },
  {
    as: PopupItemLayout,
    key: 'DanteSchneider',
    content: (
      <>
        {' '}
        <Status color="green" icon="check" title="Available" /> <span>Dante Schneider </span>
      </>
    ),
    role: 'button',
    accessibility: navigableListItemBehavior,
  },
]

class MenuExampleShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        accessibility={navigableListBehavior}
        variables={{
          activeBackgroundColor: 'transparent',
          borderColor: 'transparent',
          paddingRight: '3px',
          paddingLeft: '3px',
        }}
      />
    )
  }
}

export default MenuExampleShorthand
