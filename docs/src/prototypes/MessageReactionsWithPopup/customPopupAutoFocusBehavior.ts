import { Accessibility } from 'src/lib/accessibility/types'
import { Menu, popupAutoFocusBehavior } from 'src/index'

const customPopupAutoFocusBehavior: Accessibility = (props: any) => ({
  ...popupAutoFocusBehavior(props),
  autoFocus: { firstFocusableSelector: `${Menu.Item.className}:first-child` },
})

export default customPopupAutoFocusBehavior
