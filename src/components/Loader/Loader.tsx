import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
} from '../../lib'
import { defaultBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactProps } from '../../../types/utils'
import Slot from '../Slot/Slot'

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
  labelPosition?: LoaderPosition
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
    labelPosition: PropTypes.oneOf(['above', 'below', 'start', 'end']),
    size: PropTypes.oneOf(['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']),
  }

  static defaultProps = {
    accessibility: defaultBehavior,
    labelPosition: 'below',
    size: 'medium',
  }

  renderComponent({ ElementType, classes, accessibility, variables, styles, rest }) {
    const { label } = this.props

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...rest}>
        {Slot.create('', { defaultProps: { styles: styles.indicator } })}
        {Slot.create(label, { defaultProps: { styles: styles.label } })}
      </ElementType>
    )
  }
}

Loader.create = createShorthandFactory(Loader, 'content')

export default Loader
