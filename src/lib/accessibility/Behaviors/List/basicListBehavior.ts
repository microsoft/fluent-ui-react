import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @description
 * The 'list' role is used to identify an element that creates a list.
 *
 * @specification
 * Adds role='list'.
 */

const basicListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'list',
    },
  },

  // keyActions: {
  //   root: {
  //     nextItem: {
  //       keyCombinations: [{ keyCode: keyboardKey.ArrowDown }, { keyCode: keyboardKey.ArrowRight }],
  //     },
  //     prevItem: {
  //       keyCombinations: [{ keyCode: keyboardKey.ArrowUp }, { keyCode: keyboardKey.ArrowLeft }],
  //     },
  //   },
  // },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
      preventDefaultWhenHandled: true,
      shouldFocusFirstElementWhenReceivedFocus: true,
    },
  },
})

export default basicListBehavior
