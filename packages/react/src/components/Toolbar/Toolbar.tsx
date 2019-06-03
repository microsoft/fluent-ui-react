import * as React from 'react'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ColorComponentProps,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ShorthandCollection, WithAsProp, withSafeTypeForAs } from '../../types'

import ToolbarItem from './ToolbarItem'
import ToolbarDivider from './ToolbarDivider'
import ToolbarRadioGroup from './ToolbarRadioGroup'

export type ToolbarItemShorthandKinds = 'divider' | 'item' | 'group'

export interface ToolbarProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** Shorthand array of props for Toolbar. */
  items?: ShorthandCollection<ToolbarItemShorthandKinds>
}

class Toolbar extends UIComponent<WithAsProp<ToolbarProps>, any> {
  static create: Function

  static className = 'ui-toolbar'

  static displayName = 'Toolbar'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item', 'group']),
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  static Item = ToolbarItem
  static Divider = ToolbarDivider
  static RadioGroup = ToolbarRadioGroup

  handleItemOverrides = variables => predefinedProps => ({
    variables: {
      ...variables,
      ...predefinedProps.variables,
    },
  })

  private renderItems(items, variables) {
    const itemOverridesFn = this.handleItemOverrides(variables)
    return _.map(items, (item, index) => {
      const kind = _.get(item, 'kind', 'item')

      switch (kind) {
        case 'divider':
          return ToolbarDivider.create(item, { overrideProps: itemOverridesFn })
        case 'group':
          return ToolbarRadioGroup.create(item, { overrideProps: itemOverridesFn })
        default:
          return ToolbarItem.create(item, { overrideProps: itemOverridesFn })
      }
    })
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    variables,
    unhandledProps,
  }): React.ReactNode {
    const { children, items } = this.props

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {childrenExist(children) ? children : this.renderItems(items, variables)}
      </ElementType>
    )
  }
}

Toolbar.create = createShorthandFactory({ Component: Toolbar, mappedProp: 'content' })

/**
 * A Toolbar component displays grouped actions.
 */
export default withSafeTypeForAs<typeof Toolbar, ToolbarProps>(Toolbar)
