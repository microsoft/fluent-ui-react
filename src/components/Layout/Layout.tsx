import * as React from 'react'
import * as PropTypes from 'prop-types'

import { customPropTypes, UIComponent } from '../../lib'
import { Extendable, ShorthandValue } from '../../../types/utils'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'

import LayoutArea from './LayoutArea'
import LayoutGap from './LayoutGap'

export interface LayoutProps {
  as?: any
  className?: string
  debug?: boolean
  start?: ShorthandValue
  main?: ShorthandValue
  end?: ShorthandValue
  gap?: string
  reducing?: boolean
  disappearing?: boolean
  truncateStart?: boolean
  truncateMain?: boolean
  truncateEnd?: boolean
  vertical?: boolean
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

export type LayoutPropsWithDefaults = LayoutProps & typeof Layout.defaultProps

/**
 * A Layout is for arranging content areas in common ways.
 */
class Layout extends UIComponent<Extendable<LayoutProps>, any> {
  static className = 'ui-layout'

  static displayName = 'Layout'

  static propTypes = {
    as: customPropTypes.as,
    className: PropTypes.string,
    debug: PropTypes.bool,

    /** Shorthand for the Layout.Area placed at the start of the Layout. */
    start: PropTypes.any,

    /** Shorthand for the primary Layout.Area within the Layout. */
    main: PropTypes.any,

    /** Shorthand for the Layout.Area placed at the end of the Layout. */
    end: PropTypes.any,

    /** A Layout can have gaps of whitespace between areas. */
    gap: PropTypes.string,

    /** A Layout can reduce to the minimum required areas. */
    reducing: PropTypes.bool,

    /** A Layout can render its content directly if only one piece of content exists. */
    disappearing: PropTypes.bool,

    vertical: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static Area = LayoutArea
  static Gap = LayoutGap

  renderComponent({ ElementType, classes, rest }) {
    const { reducing, debug, disappearing, start, main, end, gap } = this
      .props as LayoutPropsWithDefaults

    const startArea = LayoutArea.create(start, {
      defaultProps: { debug, size: 'auto' },
      generateKey: false,
    })

    const mainArea = LayoutArea.create(main, {
      defaultProps: { debug },
      generateKey: false,
    })

    const endArea = LayoutArea.create(end, {
      defaultProps: { debug, size: 'auto' },
      generateKey: false,
    })

    const gapArea = LayoutGap.create(gap, {
      defaultProps: { debug, size: gap },
      generateKey: false,
    })

    if (!startArea && !mainArea && !endArea) {
      return <ElementType {...rest} className={classes.root} />
    }

    const activeAreas = [startArea, mainArea, endArea].filter(Boolean)
    const isSingleArea = activeAreas.length === 1

    // disappear: render the content directly without wrapping layout or area elements
    if (disappearing && isSingleArea) {
      return start || main || end
    }

    if (reducing && isSingleArea) {
      const composedClasses = classes.root
      return (
        <ElementType {...rest} className={composedClasses}>
          {start || main || end}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {startArea}
        {start && main && gapArea}
        {mainArea}
        {(start || main) && end && gapArea}
        {endArea}
      </ElementType>
    )
  }
}

export default Layout
