import { AccessibilityDefinition, FocusZoneMode } from '@stardust-ui/accessibility'
import * as React from 'react'

import FocusZone from './FocusZone'
import { FocusZoneProps } from './FocusZone.types'
import { FOCUSZONE_WRAP_ATTRIBUTE } from './focusUtilities'

const wrapInFocusZone = (
  element: React.ReactElement,
  accessibility: AccessibilityDefinition,
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
      isRtl: rtl,
    })
  }

  return element
}

export default wrapInFocusZone
