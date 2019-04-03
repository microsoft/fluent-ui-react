import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'

import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
  ContentComponentProps,
  isFromKeyboard,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps, ShorthandValue, ComponentEventHandler } from '../../types'
import Icon from '../Icon/Icon'
import Box from '../Box/Box'
import ReactionGroup from './ReactionGroup'

export interface ReactionSlotClassNames {
  icon: string
  content: string
}

export interface ReactionProps
  extends UIComponentProps<ReactionProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** A reaction can have icon for the indicator of the reaction. */
  icon?: ShorthandValue

  /** A reaction can have content shown next to the icon. */
  content?: ShorthandValue

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ReactionProps>
}

export interface ReactionState {
  isFromKeyboard: boolean
}
/**
 * A reaction is used to indicate user's reaction.
 */
class Reaction extends UIComponent<ReactProps<ReactionProps>, ReactionState> {
  static create: Function

  static className = 'ui-reaction'

  static slotClassNames: ReactionSlotClassNames

  static displayName = 'Reaction'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
    icon: customPropTypes.itemShorthand,
    onFocus: PropTypes.func,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
    as: 'span',
  }

  static Group = ReactionGroup

  public state = {
    isFromKeyboard: false,
  }

  renderComponent({ accessibility, ElementType, classes, styles, unhandledProps }) {
    const { children, icon, content } = this.props

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
        onFocus={this.handleFocus}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {Icon.create(icon, {
              defaultProps: {
                className: Reaction.slotClassNames.icon,
                styles: styles.icon,
              },
            })}
            {Box.create(content, {
              defaultProps: {
                className: Reaction.slotClassNames.content,
                styles: styles.content,
              },
            })}
          </>
        )}
      </ElementType>
    )
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })
    _.invoke(this.props, 'onFocus', e, this.props)
  }
}

Reaction.create = createShorthandFactory({ Component: Reaction, mappedProp: 'content' })
Reaction.slotClassNames = {
  icon: `${Reaction.className}__icon`,
  content: `${Reaction.className}__content`,
}

export default Reaction
