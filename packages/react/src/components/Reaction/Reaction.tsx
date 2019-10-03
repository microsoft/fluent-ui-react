import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'

import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
  ContentComponentProps,
  ShorthandFactory,
} from '../../lib'
import { Accessibility } from '@stardust-ui/accessibility'

import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'
import Icon, { IconProps } from '../Icon/Icon'
import Box, { BoxProps } from '../Box/Box'
import ReactionGroup from './ReactionGroup'

export interface ReactionSlotClassNames {
  icon: string
  content: string
}

export interface ReactionProps
  extends UIComponentProps<ReactionProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** A reaction can have icon for the indicator of the reaction. */
  icon?: ShorthandValue<IconProps>
}

class Reaction extends UIComponent<WithAsProp<ReactionProps>> {
  static create: ShorthandFactory<ReactionProps>

  static className = 'ui-reaction'

  static slotClassNames: ReactionSlotClassNames

  static displayName = 'Reaction'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
    icon: customPropTypes.itemShorthandWithoutJSX,
  }

  static defaultProps = {
    as: 'span',
  }

  static Group = ReactionGroup

  renderComponent({ accessibility, ElementType, classes, styles, unhandledProps }) {
    const { children, icon, content } = this.props

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
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
}

Reaction.create = createShorthandFactory({ Component: Reaction, mappedProp: 'content' })
Reaction.slotClassNames = {
  icon: `${Reaction.className}__icon`,
  content: `${Reaction.className}__content`,
}

/**
 * A Reaction indicates user's emotion or perception.
 * Used to display user's reaction for entity in Chat (e.g. message).
 */
export default withSafeTypeForAs<typeof Reaction, ReactionProps, 'span'>(Reaction)
