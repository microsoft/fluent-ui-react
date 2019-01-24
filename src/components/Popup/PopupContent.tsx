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
import { ReactProps, ComponentEventHandler } from '../../../types/utils'

export interface PopupContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
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

  private handleMouseEnter = e => {
    _.invoke(this.props, 'onMouseEnter', e, this.props)
  }

  private handleMouseLeave = e => {
    _.invoke(this.props, 'onMouseLeave', e, this.props)
  }

  public renderComponent({
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<PopupContentProps>): React.ReactNode {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...unhandledProps}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

PopupContent.create = createShorthandFactory(PopupContent, 'content')

export default PopupContent
