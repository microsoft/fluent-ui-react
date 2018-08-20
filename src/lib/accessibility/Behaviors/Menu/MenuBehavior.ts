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
      onActiveElementChanged: (element, ev) => {
        console.error('MENU BEHAVIOR', 'on active element changed', 'element', element, 'ev', ev)
      },
    },
  },
}

export default MenuBehavior
