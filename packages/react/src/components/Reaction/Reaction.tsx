import * as React from 'react'

import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  customPropTypes,
  createShorthandFactory,
  ContentComponentProps,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps, ShorthandValue } from '../../types'
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
}

/**
 * A segment is used to create a grouping of related content.
 */
class Reaction extends UIComponent<ReactProps<ReactionProps>> {
  static create: Function

  static className = 'ui-reaction'

  static slotClassNames: ReactionSlotClassNames

  static displayName = 'Reaction'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
    icon: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
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

Reaction.create = createShorthandFactory(Reaction, 'content')
Reaction.slotClassNames = {
  icon: `${Reaction.className}__icon`,
  content: `${Reaction.className}__content`,
}

export default Reaction
