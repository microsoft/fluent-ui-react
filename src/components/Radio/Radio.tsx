import * as React from 'react'
import * as PropTypes from 'prop-types'

import { createHTMLInput, customPropTypes, UIComponent } from '../../lib'
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

    /** The HTML input type. */
    type: PropTypes.string,

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = ['as', 'children', 'className', 'label', 'styles', 'type', 'variables']

  static defaultProps = {
    as: 'div',
    type: 'radio',
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { type, label } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        <Label styles={{ root: styles.label }}>
          {createHTMLInput(type, {
            overrideProps: {
              className: classes.radio,
            },
          })}
          {label}
        </Label>
      </ElementType>
    )
  }
}

export default Radio
