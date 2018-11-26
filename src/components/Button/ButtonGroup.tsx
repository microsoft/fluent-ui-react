import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import { Extendable, ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'
import Button from './Button'
import { buttonGroupBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import {
  UIComponentProps,
  ChildrenComponentProps,
  SimpleContentComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  simpleContentComponentPropsTypes,
} from '../../lib/commonPropTypes'

export interface ButtonGroupProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    SimpleContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default buttonGroupBehavior
   */
  accessibility?: Accessibility

  /** The buttons contained inside the ButtonGroup. */
  buttons?: ShorthandValue[]

  /** The buttons inside group can appear circular. */
  circular?: boolean

  /**
   * A custom render iterator for rendering each of the Button.Group buttons.
   * The default component, props, and children are available for each button.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderButton?: ShorthandRenderFunction
}

/**
 * A button group presents multiple related actions.
 */
class ButtonGroup extends UIComponent<Extendable<ButtonGroupProps>, any> {
  public static displayName = 'ButtonGroup'

  public static className = 'ui-buttons'

  public static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...simpleContentComponentPropsTypes,
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    buttons: customPropTypes.collectionShorthand,
    circular: PropTypes.bool,
    renderButton: PropTypes.func,
  }

  public static defaultProps = {
    as: 'div',
    accessibility: buttonGroupBehavior as Accessibility,
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    rest,
  }): React.ReactNode {
    const { children, content, buttons, circular, renderButton } = this.props
    if (_.isNil(buttons)) {
      return (
        <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
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
            render: renderButton,
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
