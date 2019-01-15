import * as React from 'react'
import { Menu, Popup, ItemLayout, Status } from '@stardust-ui/react'

const PopupItemLayout = props => {
  return <Popup on={['hover']} trigger={<ItemLayout {...props} />} content="Hello from popup!" />
}

const items = [
  {
    as: PopupItemLayout,
    key: 'IrvingKuhic',
    media: <Status color="red" icon="minus" title="Busy" />,
    header: 'Irving Kuhic,',
  },
  {
    as: PopupItemLayout,
    key: 'SkylerParks',
    media: <Status color="green" icon="check" title="Available" />,
    header: 'Skyler Parks,',
  },
  {
    as: PopupItemLayout,
    key: 'DanteSchneider',
    header: 'Dante Schneider',
    media: <Status color="green" icon="check" title="Available" />,
  },
]

class MenuExampleShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        variables={{ borderColor: 'transparent', horizontalPadding: '3px 3px' }}
      />
    )
  }
}

export default MenuExampleShorthand

// variables: {horizontalPadding:  '0 0' }   horizontalPadding: '3px 3px'
