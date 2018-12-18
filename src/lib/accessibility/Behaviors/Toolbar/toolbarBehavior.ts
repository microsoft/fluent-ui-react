import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @specification
 * Adds role 'toolbar' to 'root' component's part.
 * Embeds FocusZone into component allowing arrow key navigation through the children of the component.
 */
const toolbarBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'toolbar',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: false,
      preventDefaultWhenHandled: true,
      shouldFocusFirstElementWhenReceivedFocus: true,
      defaultTabbableElement: getLastTabbableElement,
    },
  },
})

const getLastTabbableElement = (root: HTMLElement): HTMLElement => {
  return root.querySelector('[aria-label="thumbs up"]')
}

export default toolbarBehavior
