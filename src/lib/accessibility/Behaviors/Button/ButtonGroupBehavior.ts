import { Accessibility, FocusZoneMode } from '../../interfaces'

const ButtonGroupBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'presentation',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: false,
    },
  },
}

export default ButtonGroupBehavior
