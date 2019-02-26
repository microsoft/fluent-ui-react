import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  customPropTypes,
  createShorthandFactory,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps, ShorthandValue } from '../../types'
import Icon from '../Icon/Icon'
import Text from '../Text/Text'

export interface ReactionSlotClassNames {
  icon: string
  count: string
}

export interface ReactionProps extends UIComponentProps<ReactionProps>, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** A reaction can have icon for the indicator of the reaction. */
  icon?: ShorthandValue

  /** A reaction can have count for the number of reaction. */
  count?: number | string
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
      content: false,
    }),
    icon: customPropTypes.itemShorthand,
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    accessibility: defaultBehavior,
    as: 'span',
  }

  renderComponent({ accessibility, ElementType, classes, styles, unhandledProps }) {
    const { children, icon, count } = this.props

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
            {Text.create(count, {
              defaultProps: {
                className: Reaction.slotClassNames.count,
                styles: styles.count,
              },
            })}
          </>
        )}
      </ElementType>
    )
  }
}

Reaction.create = createShorthandFactory(Reaction, 'count')
Reaction.slotClassNames = {
  icon: `${Reaction.className}__icon`,
  count: `${Reaction.className}__count`,
}

export default Reaction
