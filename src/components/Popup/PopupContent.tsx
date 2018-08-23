import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import Ref from '../Ref'
import { customPropTypes, UIComponent, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable } from '../../../types/utils'

export interface IPopupContentProps {
  as?: any
  basic?: boolean
  className?: string
  styles?: IComponentPartStylesInput
  triggerRef?: (node: HTMLElement) => void
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

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /**
     * Called with a ref to the trigger node.
     *
     * @param {JSX.Element} node - Referred node.
     */
    triggerRef: PropTypes.func,

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static handledProps = [
    'as',
    'basic',
    'children',
    'className',
    'styles',
    'triggerRef',
    'variables',
  ]

  public renderComponent({
    ElementType,
    classes,
    rest,
  }: IRenderResultConfig<IPopupContentProps>): React.ReactNode {
    return (
      <Ref innerRef={this.handleTriggerRef}>
        <ElementType className={classes.root} {...rest}>
          {this.props.children}
        </ElementType>
      </Ref>
    )
  }

  private handleTriggerRef = (triggerNode: HTMLElement) => {
    _.invoke(this.props, 'triggerRef', triggerNode)
  }
}
