import { Accessibility, FocusZoneMode } from '../../interfaces'

const PopupBehavior: Accessibility = {
  attributes: {
    root: {
      //   role: 'menu'
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: true,
    },
  },
}

export default PopupBehavior
