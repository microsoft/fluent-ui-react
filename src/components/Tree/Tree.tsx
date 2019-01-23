import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import TreeItem from './TreeItem'
import {
  UIComponent,
  childrenExist,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
} from '../../lib'
import { ShorthandValue, ShorthandRenderFunction, ReactProps } from '../../../types/utils'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import * as customPropTypes from '../../lib/customPropTypes'

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** Shorthand array of props for Tree. */
  items: ShorthandValue[]

  /**
   * A custom render function for the title slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItemTitle?: ShorthandRenderFunction
}

/**
 * Allows users to display data organised in tree-hierarchy.
 */
class Tree extends UIComponent<ReactProps<TreeProps>> {
  static create: Function

  static className = 'ui-tree'

  static displayName = 'Tree'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    accessibility: PropTypes.func,
    items: customPropTypes.collectionShorthand,
    renderItemTitle: PropTypes.func,
    rtlAttributes: PropTypes.func,
  }

  public static defaultProps = {
    as: 'ul',
    accessibility: defaultBehavior,
  }

  renderContent() {
    const { items, renderItemTitle } = this.props

    return _.map(items, item =>
      TreeItem.create(item, {
        defaultProps: {
          renderItemTitle,
        },
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

export default Tree
