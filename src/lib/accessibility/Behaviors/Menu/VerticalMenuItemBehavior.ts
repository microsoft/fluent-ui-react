import { Accessibility } from '../../interfaces'

const VerticalMenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'menuitem',
      'data-is-focusable': true,
      'aria-expanded': props['submenuOpened'],
    },
  },
})

export default VerticalMenuItemBehavior

// this.handleKey(keyboardKey.Enter, (key, event, component, props, state) => {
//   event.preventDefault()
//   event.stopPropagation()
//   component.executeAction(ClickAction.execute({ event }))
// })

// this.handleKey(keyboardKey.Escape, (key, event, component, props, state) => {
//   component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: true }))
// })

// this.handleKey(keyboardKey.ArrowUp, (key, event, component, props, state) => {
//   component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
// })

// this.handleKey(keyboardKey.ArrowDown, (key, event, component, props, state) => {
//   component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
// })
// }
