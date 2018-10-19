import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  UIComponent,
  RenderResultConfig,
} from '../../lib'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import { Extendable, ReactChildren } from '../../../types/utils'

export interface PopupContentProps {
  as?: any
  children?: ReactChildren
  content?: any
  className?: string
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

/**
 * A PopupContent displays the content of a Popup component
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class PopupContent extends UIComponent<Extendable<PopupContentProps>, any> {
  public static create: Function

  public static displayName = 'PopupContent'
  public static className = 'ui-popup__content'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /**
     * Wraped content.
     */
    content: PropTypes.any,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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

PopupContent.create = createShorthandFactory(PopupContent, content => ({ content }))

export default PopupContent
