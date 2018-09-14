import * as React from 'react'
import * as PropTypes from 'prop-types'

import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { Extendable } from '../../../types/utils'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'

export interface ILayoutGapProps {
  as?: any
  debug?: boolean
  size?: string
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A Layout Gap adds whitespace between Areas of a Layout.
 */
class LayoutGap extends UIComponent<Extendable<ILayoutGapProps>, any> {
  static create: Function

  static className = 'ui-layout__gap'

  static displayName = 'LayoutGap'

  static propTypes = {
    /** An element type to render as. */
    as: customPropTypes.as,

    debug: PropTypes.bool,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = ['as', 'content', 'debug', 'vertical', 'size', 'styles', 'variables']

  renderComponent({ ElementType, classes, rest }) {
    return <ElementType {...rest} className={classes.root} />
  }
}

LayoutGap.create = createShorthandFactory(LayoutGap, val => null)

export default LayoutGap
