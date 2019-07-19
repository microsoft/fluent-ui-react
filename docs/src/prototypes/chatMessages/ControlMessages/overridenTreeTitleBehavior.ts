import {
  Accessibility,
  FocusZoneMode,
  FocusZoneTabbableElements,
  FocusZoneDirection,
} from '@stardust-ui/react'

const overridenTreeTitleBehavior: Accessibility<any> = props => {
  return {
    attributes: {
      root: {
        tabIndex: -1,
        'data-is-focusable': true,
        role: 'treeitem',
      },
    },
    focusZone: {
      mode: FocusZoneMode.Embed,
      props: {
        handleTabKey: FocusZoneTabbableElements.all,
        isCircularNavigation: true,
        direction: FocusZoneDirection.vertical,
      },
    },
  }
}

export default overridenTreeTitleBehavior
