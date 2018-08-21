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
import Icon from '../Icon'

/**
 * An Input
 * @accessibility
 * For good screen reader experience set aria-label or aria-labelledby attribute for input.
 *
 *
 * Other considerations:
 *  - if input is search, then user "role='search'"
 *
 */
class Input extends UIComponent<any, any> {
  static className = 'ui-input'

  static displayName = 'Input'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A button can take the width of its container. */
    fluid: PropTypes.bool,

    /** Optional Icon to display inside the Input. */
    icon: customPropTypes.itemShorthand,

    /** Shorthand for creating the HTML Input. */
    input: customPropTypes.itemShorthand,

    /** The HTML input type. */
    type: PropTypes.string,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'children',
    'className',
    'fluid',
    'icon',
    'input',
    'styles',
    'type',
    'variables',
  ]

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
      onClick: e => {
        this.inputRef.focus()
        _.invoke(predefinedProps, 'onClick', e, this.props)
      },
      tabIndex: this.computeTabIndex,
    }
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { children, input, type } = this.props
    const [htmlInputProps, restProps] = this.partitionProps()

    const inputClasses = classes.input

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
            defaultProps: { styles: { root: styles.icon } },
            overrideProps: this.handleIconOverrides,
          })}
      </ElementType>
    )
  }
}

export default Input
