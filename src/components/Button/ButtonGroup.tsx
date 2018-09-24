import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import Button from './Button'

export interface IButtonGroupProps {
  as?: any
  children?: ReactChildren
  circular?: boolean
  className?: string
  content?: React.ReactNode
  buttons?: ItemShorthand[]
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A button group.
 */
class ButtonGroup extends UIComponent<Extendable<IButtonGroupProps>, any> {
  public static displayName = 'ButtonGroup'

  public static className = 'ui-buttons'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** The buttons contained inside the ButtonGroup. */
    buttons: customPropTypes.collectionShorthand,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional css class name or space separated class names to apply **/
    className: PropTypes.string,

    /** The buttons inside group can appear circular. */
    circular: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Styles to apply to this component instance **/
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'buttons',
    'children',
    'circular',
    'className',
    'content',
    'styles',
    'variables',
  ]

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
    const { children, content, buttons, circular } = this.props
    if (_.isNil(buttons)) {
      return (
        <ElementType {...rest} className={classes.root}>
          {childrenExist(children) ? children : content}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {_.map(buttons, (button, idx) =>
          Button.create(button, {
            defaultProps: {
              circular,
              styles: this.getStyleForButtonIndex(styles, idx === 0, idx === buttons.length - 1),
            },
          }),
        )}
      </ElementType>
    )
  }

  getStyleForButtonIndex = (styles, isFirst, isLast) => {
    let resultStyles = {}
    if (isFirst) {
      resultStyles = styles.firstButton
    }
    if (isLast) {
      resultStyles = { ...resultStyles, ...styles.lastButton }
    }
    if (!isFirst && !isLast) {
      resultStyles = styles.middleButton
    }
    return resultStyles
  }
}

export default ButtonGroup
