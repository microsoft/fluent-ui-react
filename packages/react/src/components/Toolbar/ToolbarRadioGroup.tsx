import * as React from 'react'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  childrenExist,
  commonPropTypes,
} from '../../lib'
import { ShorthandCollection, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

import ToolbarDivider from 'src/components/Toolbar/ToolbarDivider'
import ToolbarItem from 'src/components/Toolbar/ToolbarItem'

export type ToolbarRadioGroupItemShorthandKinds = 'divider' | 'item'

export interface ToolbarRadioGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  items?: ShorthandCollection<ToolbarRadioGroupItemShorthandKinds>
}

class ToolbarRadioGroup extends UIComponent<WithAsProp<ToolbarRadioGroupProps>> {
  static displayName = 'ToolbarRadioGroup'

  static className = 'ui-toolbars' // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
  }

  static defaultProps = {
    accessibility: defaultBehavior as Accessibility,
  }

  private renderItems(items) {
    return _.map(items, (item, index) => {
      const kind = _.get(item, 'kind', 'item')

      if (kind === 'divider') {
        return ToolbarDivider.create(item)
      }
      return ToolbarItem.create(item)
    })
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, items } = this.props
    return (
      <ElementType
        style={{ outline: '1px solid blue' }}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(items)}
      </ElementType>
    )
  }
}

ToolbarRadioGroup.create = createShorthandFactory({
  Component: ToolbarRadioGroup,
  mappedProp: 'content',
})

/**
 * Toolbar radiogroup.
 * TODO: add meaningful description
 */
export default withSafeTypeForAs<typeof ToolbarRadioGroup, ToolbarRadioGroupProps>(
  ToolbarRadioGroup,
)
