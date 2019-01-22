import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'

import { UIComponent, UIComponentProps, commonPropTypes, rtlTextContainer } from '../../lib'
import { ReactProps } from '../../../types/utils'
import { ICSSInJSStyle } from '../../themes/types'

export interface LayoutProps extends UIComponentProps {
  debug?: boolean
  renderStartArea?: (params: object) => React.ReactNode
  renderMainArea?: (params: object) => React.ReactNode
  renderEndArea?: (params: object) => React.ReactNode
  renderGap?: (params: object) => React.ReactNode
  /** Styled applied to the root element of the rendered component. */
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
  /** How to align items on-axis within the layout (i.e. vertical or not). */
  justifyItems?: React.CSSProperties['justifyItems']
  /** How to align cross-axis items within the layout (i.e. vertical or not). */
  alignItems?: React.CSSProperties['alignItems']
  /** A layout can have gaps of whitespace between areas. */
  gap?: string
  /** A layout can reduce to the minimum required areas. */
  reducing?: boolean
  /** A layout can render its content directly if only one piece of content exists. */
  disappearing?: boolean
  truncateStart?: boolean
  truncateMain?: boolean
  truncateEnd?: boolean
  vertical?: boolean
}

/**
 * A layout is a utility for arranging the content of a component.
 */
class Layout extends UIComponent<ReactProps<LayoutProps>, any> {
  static className = 'ui-layout'

  static displayName = 'Layout'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    debug: PropTypes.bool,

    renderStartArea: PropTypes.func,
    renderMainArea: PropTypes.func,
    renderEndArea: PropTypes.func,
    renderGap: PropTypes.func,

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

    justifyItems: PropTypes.any,

    alignItems: PropTypes.any,

    gap: PropTypes.string,
    reducing: PropTypes.bool,
    disappearing: PropTypes.bool,

    truncateStart: PropTypes.bool,
    truncateMain: PropTypes.bool,
    truncateEnd: PropTypes.bool,

    vertical: PropTypes.bool,
  }

  static defaultProps = {
    startSize: 'auto',
    mainSize: '1fr',
    endSize: 'auto',

    // TODO: when an area is another Layout, do not wrap them in an extra div
    // TODO: option 1) higher value layouts could use start={Layout.create(start)} to ensure Areas are layout root
    renderStartArea({ start, classes }) {
      return (
        start && (
          <div
            className={cx('ui-layout__start', classes.start)}
            {...rtlTextContainer.getAttributes({ forElements: [start] })}
          >
            {start}
          </div>
        )
      )
    },

    renderMainArea({ main, classes }) {
      return (
        main && (
          <div
            className={cx('ui-layout__main', classes.main)}
            {...rtlTextContainer.getAttributes({ forElements: [main] })}
          >
            {main}
          </div>
        )
      )
    },

    renderEndArea({ end, classes }) {
      return (
        end && (
          <div
            className={cx('ui-layout__end', classes.end)}
            {...rtlTextContainer.getAttributes({ forElements: [end] })}
          >
            {end}
          </div>
        )
      )
    },

    // Heads up!
    // IE11 Doesn't support grid-gap, insert virtual columns instead
    renderGap({ gap, classes }) {
      return gap && <span className={cx('ui-layout__gap', classes.gap)} />
    },
  }

  renderComponent({ ElementType, classes, unhandledProps }) {
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
      return <ElementType {...unhandledProps} className={classes.root} />
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
        <ElementType {...unhandledProps} className={composedClasses}>
          {start || main || end}
        </ElementType>
      )
    }

    return (
      <ElementType {...unhandledProps} className={classes.root}>
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
