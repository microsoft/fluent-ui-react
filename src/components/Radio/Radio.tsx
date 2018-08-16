import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  createHTMLInput,
  customPropTypes,
  getUnhandledProps,
  partitionHTMLProps,
  UIComponent,
} from '../../lib'
import Label from '../Label'

/**
 * @accessibility
 * This is shown at the top.
 */
class Radio extends UIComponent<any, any> {
  static displayName = 'Radio'

  static className = 'ui-radio'

  static propTypes = {
    as: customPropTypes.as,

    /** Child content * */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** The label of the radio input. */
    label: PropTypes.string,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The HTML input type. */
    type: PropTypes.string,
  }

  static handledProps = ['as', 'children', 'className', 'label', 'styles', 'variables', 'type']

  static defaultProps = {
    as: 'div',
    type: 'radio',
  }

  partitionProps = () => {
    const { type } = this.props

    const unhandled = getUnhandledProps(Radio, this.props)
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled)

    return [
      {
        ...htmlInputProps,
        type,
      },
      rest,
    ]
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { input, type, label } = this.props
    const [htmlInputProps, restProps] = this.partitionProps()

    return (
      <ElementType {...rest} className={classes.root} {...htmlInputProps}>
        {createHTMLInput(input || type, {
          overrideProps: {
            className: classes.radio,
          },
        })}
        {Label.create(label, {
          defaultProps: { styles: { root: styles.label } },
        })}
      </ElementType>
    )
  }
}

export default Radio
