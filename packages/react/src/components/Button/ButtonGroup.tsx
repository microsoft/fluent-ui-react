import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { ReactProps, ShorthandValue } from '../../types'
import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import Button from './Button'

export interface ButtonGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
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
class ButtonGroup extends UIComponent<ReactProps<ButtonGroupProps>, any> {
  public static create: Function

  public static displayName = 'ButtonGroup'

  public static className = 'ui-buttons'

  public static propTypes = {
    ...commonPropTypes.createCommon(),
    buttons: customPropTypes.collectionShorthand,
    circular: PropTypes.bool,
  }

  public static defaultProps = {
    accessibility: defaultBehavior,
    as: 'div',
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    styles,
    unhandledProps,
  }): React.ReactNode {
    const { children, buttons, circular, content } = this.props
    if (_.isNil(buttons)) {
      return (
        <ElementType
          {...accessibility.attributes.root}
          {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
          {...unhandledProps}
          className={classes.root}
        >
          {childrenExist(children) ? children : content}
        </ElementType>
      )
    }

    return (
      <ElementType {...unhandledProps} className={classes.root}>
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

ButtonGroup.create = createShorthandFactory({
  Component: ButtonGroup,
  mappedProp: 'content',
  mappedArrayProp: 'buttons',
})

export default ButtonGroup
