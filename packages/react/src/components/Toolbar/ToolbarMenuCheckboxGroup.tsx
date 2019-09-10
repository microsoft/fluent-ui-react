import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as React from 'react'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ShorthandFactory,
  AutoControlledComponent,
} from '../../lib'
import { ShorthandCollection } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import ToolbarMenuItem, { ToolbarMenuItemProps } from './ToolbarMenuItem'
import * as PropTypes from 'prop-types'
import { mergeComponentVariables } from '../../lib/mergeThemes'

export interface ToolbarMenuCheckboxGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Indexes of the currently active items. */
  activeIndex?: number[]

  /** Initial activeIndex value. */
  defaultActiveIndex?: number[]

  items?: ShorthandCollection<ToolbarMenuItemProps>

  onIndexChange: Function
}

export interface ToolbarMenuCheckboxGroupState {
  activeIndex: ToolbarMenuCheckboxGroupProps['activeIndex']
}

class ToolbarMenuCheckboxGroup extends AutoControlledComponent<
  ToolbarMenuCheckboxGroupProps,
  ToolbarMenuCheckboxGroupState
> {
  static displayName = 'ToolbarMenuCheckboxGroup'

  static create: ShorthandFactory<ToolbarMenuCheckboxGroupProps>

  static className = 'ui-toolbar__menucheckboxgroup'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    activeIndex: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    defaultActiveIndex: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
    ]),
    items: customPropTypes.collectionShorthand,
    onIndexChange: PropTypes.func,
  }

  static autoControlledProps = ['activeIndex']

  getInitialAutoControlledState(): ToolbarMenuCheckboxGroupState {
    return { activeIndex: [] }
  }

  handleItemOverrides = variables => (
    predefinedProps: ToolbarMenuItemProps,
  ): ToolbarMenuItemProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps
      const { activeIndex } = this.state

      const newActiveIndex = _.includes(activeIndex, index)
        ? _.without(activeIndex, index)
        : [...activeIndex, index]

      _.invoke(predefinedProps, 'onClick', e, itemProps)
      _.invoke(predefinedProps, 'onIndexChange', e, { ...this.props, activeIndex: newActiveIndex })

      this.setState({ activeIndex: newActiveIndex })
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderComponent({ classes, unhandledProps, accessibility }) {
    const { items, variables } = this.props
    const { activeIndex } = this.state

    return (
      <>
        {_.map(items, (item, index) =>
          ToolbarMenuItem.create(item, {
            defaultProps: {
              checked: activeIndex.indexOf(index) !== -1,
              index,
            },
            overrideProps: this.handleItemOverrides(variables),
          }),
        )}
      </>
    )
  }
}

ToolbarMenuCheckboxGroup.create = createShorthandFactory({
  Component: ToolbarMenuCheckboxGroup,
})

/**
 * TODO.
 */
export default ToolbarMenuCheckboxGroup
