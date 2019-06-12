import * as React from 'react'
import { Menu, Popup } from '@stardust-ui/react'

export const selectors = {
  menuId: 'menu',
  menuItemId: index => `menu-item-${index}`,
  popupContentClass: Popup.slotClassNames.content,
  popupContentId: index => `popup-content-${index}`,
}

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const PopupInMenuExample = () => (
  <Menu
    id={selectors.menuId}
    defaultActiveIndex={0}
    items={items.map((item, index) => render =>
      render(item, (MenuItem, props) => renderItem(MenuItem, props, index)),
    )}
  />
)

const renderItem = (MenuItem, props, index) => {
  return (
    <Popup
      key={index}
      trigger={<MenuItem id={selectors.menuItemId(index)} {...props} />}
      content={{ content: 'Test Content', id: selectors.popupContentId(index) }}
    />
  )
}

export default PopupInMenuExample
