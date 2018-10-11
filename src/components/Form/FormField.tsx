import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, customPropTypes, childrenExist } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  Extendable,
  ReactChildren,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../../types/utils'
import Text from '../Text'

export interface IFormFieldProps {
  as?: any
  children?: ReactChildren
  className?: string
  label?: ShorthandValue
  renderLabel?: ShorthandRenderFunction
  control?: React.ReactType<any>
  inline?: boolean
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A field is a form element containing a label and an input.
 */
class FormField extends UIComponent<Extendable<IFormFieldProps>, any> {
  public static displayName = 'FormField'

  public static className = 'ui-form__field'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Button content for childrenApi
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /**
     * A form control component (i.e. Input) or HTML tagName (i.e. 'input').
     * Extra FormField props are passed to the control component.
     * Mutually exclusive with children.
     */
    control: customPropTypes.some([
      PropTypes.func,
      PropTypes.oneOf(['button', 'input', 'select', 'textarea']),
    ]),

    /** A label for the form field. */
    label: customPropTypes.itemShorthand,

    /**
     * A custom render function the label slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderLabel: PropTypes.func,

    /** A field can have its label next to instead of above it. */
    inline: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static defaultProps = {
    as: 'div',
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    rest,
  }): React.ReactNode {
    const { children, control, label, content, id, type, renderLabel } = this.props

    const labelElement = Text.create(label, {
      defaultProps: {
        as: 'label',
        htmlFor: id,
        styles: styles.label,
      },
      render: renderLabel,
    })

    const controlElement = control && React.createElement(control, rest)

    // ----------------------------------------
    // No Control
    // ----------------------------------------

    if (_.isNil(control)) {
      if (_.isNil(label)) {
        return (
          <ElementType {...rest} className={classes.root}>
            {!childrenExist(children) ? content : children}
          </ElementType>
        )
      }

      return (
        <ElementType {...rest} className={classes.root}>
          {labelElement}
        </ElementType>
      )
    }

    // --------------------------------------------------------
    // Check box or radio (label should appear after the input)
    // --------------------------------------------------------

    if (control && (type === 'checkbox' || type === 'radio')) {
      return (
        <ElementType className={classes.root}>
          {controlElement}
          {labelElement}
        </ElementType>
      )
    }

    return (
      <ElementType className={classes.root}>
        {labelElement}
        {controlElement}
      </ElementType>
    )
  }
}

export default FormField
