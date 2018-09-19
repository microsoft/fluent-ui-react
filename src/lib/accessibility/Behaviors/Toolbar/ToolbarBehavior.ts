import { Accessibility, FocusZoneMode } from '../../interfaces'

const ToolbarBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'toolbar',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: false,
    },
  },
}

export default ToolbarBehavior
