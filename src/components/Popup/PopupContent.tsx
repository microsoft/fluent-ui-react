import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { customPropTypes, UIComponent, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ReactChildren } from '../../../types/utils'

export interface IPopupContentProps {
  as?: any
  basic?: boolean
  children?: ReactChildren
  className?: string
  innerRef?: (node: HTMLElement) => void
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A PopupContent displays the content of a Popup component
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default class PopupContent extends UIComponent<Extendable<IPopupContentProps>, any> {
  public static displayName = 'PopupContent'
  public static className = 'ui-popup__content'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Basic CSS styling for the popup contents */
    basic: PropTypes.bool,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional css class name or space separated class names to apply **/
    className: PropTypes.string,

    /**
     * Called with a ref to the trigger node.
     *
     * @param {HTMLElement} node - Referred node.
     */
    innerRef: PropTypes.func,

    /** Styles to apply to this component instance **/
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static handledProps = [
    'as',
    'basic',
    'children',
    'className',
    'innerRef',
    'styles',
    'variables',
  ]

  public renderComponent({
    ElementType,
    classes,
    rest,
  }: IRenderResultConfig<IPopupContentProps>): React.ReactNode {
    return (
      <ElementType className={classes.root} {...rest} ref={this.handleInnerRef}>
        {this.props.children}
      </ElementType>
    )
  }

  private handleInnerRef = (triggerNode: HTMLElement) => {
    _.invoke(this.props, 'innerRef', triggerNode)
  }
}
