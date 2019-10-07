import { FocusZoneMode } from '@stardust-ui/accessibility'
import * as React from 'react'

import { ReactAccessibilityBehavior } from '../accessibility/types'
import FocusZone from './FocusZone'
import { FocusZoneProps } from './FocusZone.types'
import { FOCUSZONE_WRAP_ATTRIBUTE } from './focusUtilities'

const wrapInFocusZone = (
  element: React.ReactElement,
  accessibility: ReactAccessibilityBehavior,
  rtl: boolean,
) => {
  if (accessibility.focusZone && accessibility.focusZone.mode === FocusZoneMode.Wrap) {
    return React.createElement(
      FocusZone,
      {
        [FOCUSZONE_WRAP_ATTRIBUTE]: true,
        ...accessibility.focusZone.props,
        isRtl: rtl,
      } as FocusZoneProps & { [FOCUSZONE_WRAP_ATTRIBUTE]: boolean },
      element,
    )
  }

  if (accessibility.focusZone && accessibility.focusZone.mode === FocusZoneMode.Embed) {
    return React.createElement(FocusZone, {
      ...element.props,
      ...accessibility.focusZone.props,
      as: element.type,
      forwardedAs: element.props.as,
      isRtl: rtl,
    })
  }

  return element
}

export default wrapInFocusZone
