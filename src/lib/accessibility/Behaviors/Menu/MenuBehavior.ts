import { Accessibility, FocusZoneMode } from '../../interfaces'

const MenuBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: true,
    },
  },
}

export default MenuBehavior
