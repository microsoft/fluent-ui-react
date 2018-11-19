import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { Extendable, ShorthandValue } from '../../../types/utils'
import {
  UIComponent,
  childrenExist,
  customPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  forwardRefFactory,
} from '../../lib'
import Button from './Button'
import { buttonGroupBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

export interface ButtonGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default buttonGroupBehavior
   */
  accessibility?: Accessibility

  /** The buttons contained inside the ButtonGroup. */
  buttons?: ShorthandValue[]

  /** The buttons inside group can appear circular. */
  circular?: boolean
}

/**
 * A button group presents multiple related actions.
 */
class ButtonGroup extends UIComponent<Extendable<ButtonGroupProps>, any> {
  public static displayName = 'ButtonGroup'

  public static className = 'ui-buttons'

  public static propTypes = {
    ...commonPropTypes.createCommon(),
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    buttons: customPropTypes.collectionShorthand,
    circular: PropTypes.bool,
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
    const { children, content, buttons, circular } = this.props
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

export default forwardRefFactory(ButtonGroup)
