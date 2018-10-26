import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import { customPropTypes, UIComponent } from '../../lib'
import { Extendable } from '../../../types/utils'
import { ComponentVariablesInput, ComponentSlotStyle, ICSSInJSStyle } from '../../themes/types'

export interface LayoutProps {
  as?: any
  className?: string
  debug?: boolean
  renderStartArea?: (params: object) => React.ReactNode
  renderMainArea?: (params: object) => React.ReactNode
  renderEndArea?: (params: object) => React.ReactNode
  renderGap?: (params: object) => React.ReactNode
  rootCSS?: ICSSInJSStyle
  start?: any
  startCSS?: ICSSInJSStyle
  startSize?: string
  main?: any
  mainCSS?: ICSSInJSStyle
  mainSize?: string
  end?: any
  endCSS?: ICSSInJSStyle
  endSize?: string
  justifyItems?: React.CSSProperties['justifyItems']
  alignItems?: React.CSSProperties['alignItems']
  gap?: string
  reducing?: boolean
  disappearing?: boolean
  truncateStart?: boolean
  truncateMain?: boolean
  truncateEnd?: boolean
  vertical?: boolean
  css?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

class Layout extends UIComponent<Extendable<LayoutProps>, any> {
  static className = 'ui-layout'

  static displayName = 'Layout'

  static propTypes = {
    as: customPropTypes.as,
    className: PropTypes.string,
    debug: PropTypes.bool,

    renderStartArea: PropTypes.func,
    renderMainArea: PropTypes.func,
    renderEndArea: PropTypes.func,
    renderGap: PropTypes.func,

    /** Styled applied to the root element of the rendered component. */
    rootCSS: PropTypes.object,

    start: PropTypes.any,
    startCSS: PropTypes.object,
    startSize: PropTypes.string,

    main: PropTypes.any,
    mainCSS: PropTypes.object,
    mainSize: PropTypes.string,

    end: PropTypes.any,
    endCSS: PropTypes.object,
    endSize: PropTypes.string,

    /** How to align items on-axis within the layout (i.e. vertical or not). */
    justifyItems: PropTypes.any,

    /** How to align cross-axis items within the layout (i.e. vertical or not). */
    alignItems: PropTypes.any,

    /** A layout can have gaps of whitespace between areas. */
    gap: PropTypes.string,

    /** A layout can reduce to the minimum required areas. */
    reducing: PropTypes.bool,

    /** A layout can render its content directly if only one piece of content exists. */
    disappearing: PropTypes.bool,

    truncateStart: PropTypes.bool,
    truncateMain: PropTypes.bool,
    truncateEnd: PropTypes.bool,

    vertical: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    css: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    startSize: 'auto',
    mainSize: '1fr',
    endSize: 'auto',

    // TODO: when an area is another Layout, do not wrap them in an extra div
    // TODO: option 1) higher value layouts could use start={Layout.create(start)} to ensure Areas are layout root
    renderStartArea({ start, classes }) {
      return start && <div className={cx('ui-layout__start', classes.start)}>{start}</div>
    },

    renderMainArea({ main, classes }) {
      return main && <div className={cx('ui-layout__main', classes.main)}>{main}</div>
    },

    renderEndArea({ end, classes }) {
      return end && <div className={cx('ui-layout__end', classes.end)}>{end}</div>
    },

    // Heads up!
    // IE11 Doesn't support grid-gap, insert virtual columns instead
    renderGap({ gap, classes }) {
      return gap && <span className={cx('ui-layout__gap', classes.gap)} />
    },
  }

  renderComponent({ ElementType, classes, rest }) {
    const {
      reducing,
      disappearing,
      start,
      main,
      end,
      renderStartArea,
      renderMainArea,
      renderEndArea,
      renderGap,
    } = this.props as LayoutPropsWithDefaults

    const startArea = renderStartArea({ ...this.props, classes })
    const mainArea = renderMainArea({ ...this.props, classes })
    const endArea = renderEndArea({ ...this.props, classes })

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
      const composedClasses = cx(
        classes.root,
        startArea && 'ui-layout--reduced__start',
        mainArea && 'ui-layout--reduced__main',
        endArea && 'ui-layout--reduced__end',
      )
      return (
        <ElementType {...rest} className={composedClasses}>
          {start || main || end}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {startArea}
        {startArea && mainArea && renderGap({ ...this.props, classes })}
        {mainArea}
        {(startArea || mainArea) && endArea && renderGap({ ...this.props, classes })}
        {endArea}
      </ElementType>
    )
  }
}

export default Layout
export type LayoutPropsWithDefaults = LayoutProps & typeof Layout.defaultProps
