import { IAccessibilityDefinition, FocusZoneMode } from '../../interfaces'
import { FocusZoneDirection } from '../../FocusZone'

const VerticalMenuBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'menu',
    },
  },

  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      onActiveElementChanged: (element, ev) => {
        console.warn(
          'VERTICAL MENU BEHAVIOR',
          'on active element changed',
          'element',
          element,
          'ev',
          ev,
        )
      },
      direction: FocusZoneDirection.vertical,
      isCircularNavigation: true,
    },
  },
}

export default VerticalMenuBehavior
