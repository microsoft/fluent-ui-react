import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  childrenExist,
  createHTMLInput,
  customPropTypes,
  getUnhandledProps,
  partitionHTMLProps,
  UIComponent,
} from '../../lib'
import inputRules from './inputRules'
import inputVariables from './inputVariables'
import Icon from '../Icon'
import callable from '../../lib/callable'

/**
 * An Input
 * @accessibility This is example usage of the accessibility tag.
 */
class Input extends UIComponent<any, any> {
  static className = 'ui-input'

  static displayName = 'Input'

  static rules = inputRules
  static variables = inputVariables

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Optional Icon to display inside the Input. */
    icon: customPropTypes.itemShorthand,

    /** Shorthand for creating the HTML Input. */
    input: customPropTypes.itemShorthand,

    /** The HTML input type. */
    type: PropTypes.string,
  }

  static handledProps = ['as', 'children', 'className', 'icon', 'input', 'type']

  static defaultProps = {
    as: 'div',
    type: 'text',
  }

  inputRef: any

  computeTabIndex = props => {
    if (!_.isNil(props.tabIndex)) return props.tabIndex
    if (props.onClick) return 0
  }

  handleChildOverrides = (child, defaultProps) => ({
    ...defaultProps,
    ...child.props,
  })

  handleInputRef = c => (this.inputRef = c)

  partitionProps = () => {
    const { type } = this.props

    const unhandled = getUnhandledProps(Input, this.props)
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled)

    return [
      {
        ...htmlInputProps,
        type,
        onClick: () => this.inputRef.focus(),
      },
      rest,
    ]
  }

  computeIcon = () => {
    const { icon } = this.props

    if (!_.isNil(icon)) return icon
    return null
  }

  handleIconOverrides = predefinedProps => {
    return {
      tabIndex: this.computeTabIndex,
    }
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, className, icon, input, type } = this.props
    const [htmlInputProps, restProps] = this.partitionProps()

    const inputClasses = classes.input
    const iconClasses = classes.icon

    // Render with children
    // ----------------------------------------
    if (childrenExist(children)) {
      // add htmlInputProps to the `<input />` child
      const childElements = _.map(React.Children.toArray(children), child => {
        if (child.type !== 'input') return child
        return React.cloneElement(child, this.handleChildOverrides(child, htmlInputProps))
      })

      return (
        <ElementType {...rest} className={classes.root}>
          {childElements}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root} {...htmlInputProps}>
        {createHTMLInput(input || type, {
          defaultProps: htmlInputProps,
          overrideProps: {
            className: inputClasses,
            ref: this.handleInputRef,
          },
        })}
        {this.computeIcon() &&
          Icon.create(this.computeIcon(), {
            defaultProps: { className: iconClasses },
            overrideProps: predefinedProps => this.handleIconOverrides,
          })}
      </ElementType>
    )
  }
}

export default Input
