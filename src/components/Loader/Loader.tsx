import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
  customPropTypes,
} from '../../lib'
import { loaderBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactProps, ShorthandValue } from '../../../types/utils'
import Box from '../Box/Box'

export type LoaderPosition = 'above' | 'below' | 'start' | 'end'
export type LoaderSize =
  | 'smallest'
  | 'smaller'
  | 'small'
  | 'medium'
  | 'large'
  | 'larger'
  | 'largest'

export interface LoaderProps extends UIComponentProps, ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** A loader can contain an indicator. */
  indicator?: ShorthandValue

  /** A loader can contain a label. */
  label?: ShorthandValue

  /** A label in the loader can have different positions. */
  labelPosition?: LoaderPosition

  /** A size of the loader. */
  size?: LoaderSize
}

/**
 * A Loader indicates a possible user action.
 */
class Loader extends UIComponent<ReactProps<LoaderProps>> {
  static create: Function
  static displayName = 'Loader'
  static className = 'ui-loader'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
      color: true,
    }),
    accessibility: PropTypes.func,
    indicator: customPropTypes.itemShorthand,
    label: customPropTypes.itemShorthand,
    labelPosition: PropTypes.oneOf(['above', 'below', 'start', 'end']),
    size: PropTypes.oneOf(['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']),
  }

  static defaultProps = {
    accessibility: loaderBehavior,
    indicator: '',
    labelPosition: 'below',
    size: 'medium',
  }

  renderComponent({ ElementType, classes, accessibility, variables, styles, unhandledProps }) {
    const { indicator, label } = this.props

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {Box.create(indicator, { defaultProps: { styles: styles.indicator } })}
        {Box.create(label, { defaultProps: { styles: styles.label } })}
      </ElementType>
    )
  }
}

Loader.create = createShorthandFactory(Loader, 'content')

export default Loader
