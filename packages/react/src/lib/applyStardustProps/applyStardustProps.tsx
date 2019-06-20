import * as React from 'react'
import { mergeStyles } from '../mergeThemes'
import { ComponentSlotStyle } from '../../themes/types'

import StardustToDomProps from './StardustToDomProps'
import mergePropsEventHandlers from './mergePropsEventHandlers'

export const IS_STARDUST_PROP_NAME = '__isStardust'

/**
 * OUTPUT type:
 * domProps
 * stardustProps
 * styles
 * classes
 */

const applyStardustProps = (
  element: React.ReactElement,
  styles: ComponentSlotStyle,
  props?: any,
  accessibility?: any,
) => {
  if (!element) {
    return element
  }

  const mergedEventHandlers = mergePropsEventHandlers(element.props, props)
  const mergedProps = { ...props, ...mergedEventHandlers }

  if (element.type && element.type[IS_STARDUST_PROP_NAME]) {
    return React.cloneElement(element, {
      ...props,
      styles: mergeStyles(element.props.styles, styles),
      ...(accessibility && { accessibility }),
      ...mergedEventHandlers,
    })
  }

  if (!styles && !accessibility) {
    return React.cloneElement(element, mergedProps)
  }

  return (
    <StardustToDomProps accessibility={accessibility} styles={styles} restProps={mergedProps}>
      {element}
    </StardustToDomProps>
  )
}

export default applyStardustProps
