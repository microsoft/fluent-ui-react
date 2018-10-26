import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import {
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'
import Button from './Button'
import { buttonGroupBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

export interface ButtonGroupProps {
  as?: any
  buttons?: ShorthandValue[]
  children?: ReactChildren
  circular?: boolean
  className?: string
  content?: React.ReactNode
  renderButton?: ShorthandRenderFunction
  css?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

/**
 * A button group.
 */
class ButtonGroup extends UIComponent<Extendable<ButtonGroupProps>, any> {
  public static displayName = 'ButtonGroup'

  public static className = 'ui-buttons'

  public static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** The buttons contained inside the ButtonGroup. */
    buttons: customPropTypes.collectionShorthand,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The buttons inside group can appear circular. */
    circular: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /**
     * A custom render iterator for rendering each of the Button.Group buttons.
     * The default component, props, and children are available for each button.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderButton: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    css: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static defaultProps = {
    as: 'div',
    accessibility: buttonGroupBehavior as Accessibility,
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    css,
    rest,
  }): React.ReactNode {
    const { children, content, buttons, circular, renderButton } = this.props
    if (_.isNil(buttons)) {
      return (
        <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
          {childrenExist(children) ? children : content}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {_.map(buttons, (button, idx) =>
          Button.create(button, {
            defaultProps: {
              circular,
              css: this.getStyleForButtonIndex(css, idx === 0, idx === buttons.length - 1),
            },
            render: renderButton,
          }),
        )}
      </ElementType>
    )
  }

  getStyleForButtonIndex = (css, isFirst, isLast) => {
    let resultStyles = {}
    if (isFirst) {
      resultStyles = css.firstButton
    }
    if (isLast) {
      resultStyles = { ...resultStyles, ...css.lastButton }
    }
    if (!isFirst && !isLast) {
      resultStyles = css.middleButton
    }
    return resultStyles
  }
}

export default ButtonGroup
