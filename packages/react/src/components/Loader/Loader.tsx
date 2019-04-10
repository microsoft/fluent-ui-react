import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
  SizeValue,
} from '../../lib'
import { loaderBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactProps, ShorthandValue } from '../../types'
import Box from '../Box/Box'

export type LoaderPosition = 'above' | 'below' | 'start' | 'end'

export interface LoaderSlotClassNames {
  indicator: string
  label: string
  svg: string
}

export interface LoaderProps extends UIComponentProps, ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default loaderBehavior
   */
  accessibility?: Accessibility

  /** Time in milliseconds after component mount before spinner is visible. */
  delay?: number

  /** A loader can contain an indicator. */
  indicator?: ShorthandValue

  /** Loaders can appear inline with content. */
  inline?: boolean

  /** A loader can contain a label. */
  label?: ShorthandValue

  /** A label in the loader can have different positions. */
  labelPosition?: LoaderPosition

  /** A size of the loader. */
  size?: SizeValue

  /** A loader can contain a custom svg element. */
  svg?: ShorthandValue
}

export interface LoaderState {
  visible: boolean
}

/**
 * A Loader indicates a possible user action.
 */
class Loader extends UIComponent<ReactProps<LoaderProps>, LoaderState> {
  static create: Function
  static displayName = 'Loader'
  static className = 'ui-loader'
  static slotClassNames: LoaderSlotClassNames = {
    indicator: `${Loader.className}__indicator`,
    label: `${Loader.className}__label`,
    svg: `${Loader.className}__svg`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
      color: true,
    }),
    delay: PropTypes.number,
    indicator: customPropTypes.itemShorthand,
    inline: PropTypes.bool,
    label: customPropTypes.itemShorthand,
    labelPosition: PropTypes.oneOf(['above', 'below', 'start', 'end']),
    size: customPropTypes.size,
    svg: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    accessibility: loaderBehavior,
    delay: 0,
    indicator: {},
    labelPosition: 'below',
    svg: '',
    size: 'medium',
  }

  delayTimer: number

  constructor(props, context) {
    super(props, context)

    this.state = {
      visible: this.props.delay === 0,
    }
  }

  componentDidMount() {
    const { delay } = this.props

    if (delay > 0) {
      this.delayTimer = window.setTimeout(() => {
        this.setState({ visible: true })
      }, delay)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimer)
  }

  renderComponent({ ElementType, classes, accessibility, variables, styles, unhandledProps }) {
    const { indicator, label, svg } = this.props
    const { visible } = this.state

    const svgElement = Box.create(svg, {
      defaultProps: { className: Loader.slotClassNames.svg, styles: styles.svg },
    })

    return (
      visible && (
        <ElementType
          className={classes.root}
          {...accessibility.attributes.root}
          {...unhandledProps}
        >
          {Box.create(indicator, {
            defaultProps: {
              children: svgElement,
              className: Loader.slotClassNames.indicator,
              styles: styles.indicator,
            },
          })}
          {Box.create(label, {
            defaultProps: { className: Loader.slotClassNames.label, styles: styles.label },
          })}
        </ElementType>
      )
    )
  }
}

Loader.create = createShorthandFactory({ Component: Loader })

export default Loader
