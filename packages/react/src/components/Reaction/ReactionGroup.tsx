import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as _ from 'lodash'

import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'
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

import Reaction from './Reaction'

export interface ReactionGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** The reactions contained inside the reaction group. */
  items?: ShorthandValue[]
}

class ReactionGroup extends UIComponent<WithAsProp<ReactionGroupProps>> {
  static create: Function

  static displayName = 'ReactionGroup'

  static className = 'ui-reactions'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthand,
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    styles,
    unhandledProps,
  }): React.ReactNode {
    const { children, items, content } = this.props
    if (_.isNil(items)) {
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
        {_.map(items, reaction =>
          Reaction.create(reaction, {
            defaultProps: {
              styles: styles.reaction,
            },
          }),
        )}
      </ElementType>
    )
  }
}

ReactionGroup.create = createShorthandFactory({
  Component: ReactionGroup,
  mappedProp: 'content',
  mappedArrayProp: 'items',
})

/**
 * A reaction group presents multiple reactions as a group.
 */
export default withSafeTypeForAs<typeof ReactionGroup, ReactionGroupProps>(ReactionGroup)
