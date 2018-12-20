import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
} from '../../lib'
import { ReactProps } from '../../../types/utils'

export interface PopupContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {}

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
  }

  public renderComponent({
    ElementType,
    classes,
    rest,
  }: RenderResultConfig<PopupContentProps>): React.ReactNode {
    const { children, content } = this.props

    return (
      <ElementType className={classes.root} {...rest}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

PopupContent.create = createShorthandFactory(PopupContent, 'content')

export default PopupContent
