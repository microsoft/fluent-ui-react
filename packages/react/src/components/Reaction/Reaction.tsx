import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps, ShorthandValue } from '../../types'
import { customPropTypes } from 'src/lib'
import Icon from 'src/components/Icon/Icon'
import Text from '../Text/Text'
import { createShorthandFactory } from 'src/lib/factories'

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
class Reaction extends UIComponent<ReactProps<ReactionProps>, any> {
  static create: Function

  static className = 'ui-reaction'

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
              defaultProps: { styles: styles.icon },
            })}
            {Text.create(count, {
              defaultProps: { styles: styles.icon },
            })}
          </>
        )}
      </ElementType>
    )
  }
}

Reaction.create = createShorthandFactory(Reaction, 'count')

export default Reaction
