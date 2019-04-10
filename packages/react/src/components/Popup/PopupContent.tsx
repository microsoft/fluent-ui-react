import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps, ComponentEventHandler } from '../../types'

export interface PopupContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /**
   * Called after user's mouse enter.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseEnter?: ComponentEventHandler<PopupContentProps>

  /**
   * Called after user's mouse leave.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseLeave?: ComponentEventHandler<PopupContentProps>
}

/**
 * A PopupContent displays the content of a Popup component
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class PopupContent extends UIComponent<ReactProps<PopupContentProps>, any> {
  public static create: Function

  public static displayName = 'PopupContent'
  public static className = 'ui-popup__content'

  public static propTypes = {
    ...commonPropTypes.createCommon(),
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  private handleMouseEnter = e => {
    _.invoke(this.props, 'onMouseEnter', e, this.props)
  }

  private handleMouseLeave = e => {
    _.invoke(this.props, 'onMouseLeave', e, this.props)
  }

  public renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<PopupContentProps>): React.ReactNode {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

PopupContent.create = createShorthandFactory({ Component: PopupContent, mappedProp: 'content' })

export default PopupContent
