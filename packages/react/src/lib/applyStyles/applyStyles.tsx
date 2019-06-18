import * as React from 'react'
import { mergeStyles } from '../mergeThemes'
import { ComponentSlotStyle } from '../../themes/types'

import StylesToClasses from './StylesToClasses'

export const IS_STARDUST_PROP_NAME = '__isStardust'

const applyStyles = (element: React.ReactElement, styles: ComponentSlotStyle) => {
  if (!element || !styles) {
    return element
  }

  if (element.type && element.type[IS_STARDUST_PROP_NAME]) {
    return React.cloneElement(element, {
      styles: mergeStyles(element.props.styles, styles),
    })
  }

  return <StylesToClasses styles={styles}>{element}</StylesToClasses>
}

export default applyStyles
