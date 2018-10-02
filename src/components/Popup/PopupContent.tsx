import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { customPropTypes, UIComponent, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ReactChildren } from '../../../types/utils'

export interface IPopupContentProps {
  as?: any
  children?: ReactChildren
  className?: string
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

    /** Primary content. */
    children: PropTypes.node,

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
  }: IRenderResultConfig<IPopupContentProps>): React.ReactNode {
    return (
      <ElementType className={classes.root} {...rest}>
        {this.props.children}
      </ElementType>
    )
  }
}
