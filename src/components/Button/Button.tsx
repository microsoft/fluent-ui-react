import PropTypes from 'prop-types'
import React, { ReactNode, CSSProperties, SyntheticEvent } from 'react'

import {
  AutoControlledComponent,
  UIComponent,
  childrenExist,
  customPropTypes,
  IRenderResultConfig,
} from '../../lib'
import buttonRules from './buttonRules'
import buttonVariables from './buttonVariables'
import { AccBehaviorType, AccBehaviorFactory } from '../../lib/accessibility/AccBehaviorFactory'
import Icon from '../Icon'
import Text from '../Text'

export type IconPosition = 'before' | 'after'
export type ButtonType = 'primary' | 'secondary'

export interface IButtonState {
  active?: boolean
}

export interface IButtonProps {
  as?: string
  children?: ReactNode
  circular?: boolean
  className?: string
  content?: ReactNode
  disabled?: boolean
  fluid?: boolean
  icon?: boolean | string
  iconPosition?: IconPosition
  onClick?: (e: SyntheticEvent, props: IButtonProps, state: IButtonState) => void
  onKeyDown?: (e: KeyboardEvent) => void
  style?: CSSProperties
  type?: ButtonType
  accBehavior?: string
  active?: boolean
  defaultActive?: boolean
}

/**
 * A button.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Button extends AutoControlledComponent<IButtonProps, IButtonState> {
  public static displayName = 'Button'

  public static className = 'ui-button'

  public static rules = buttonRules

  public static variables = buttonVariables

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** A button can appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** A button can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A button can take the width of its container. */
    fluid: PropTypes.bool,

    /** Button can have an icon. */
    icon: customPropTypes.some([PropTypes.bool, PropTypes.string]),

    /** An icon button can format an Icon to appear before or after the button */
    iconPosition: PropTypes.oneOf(['before', 'after']),

    /**
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A button can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),

    accBehavior: PropTypes.string,

    active: PropTypes.bool,

    defaultActive: PropTypes.bool,

    onKeyDown: PropTypes.func,
  }

  public static handledProps = [
    'as',
    'children',
    'circular',
    'className',
    'content',
    'disabled',
    'fluid',
    'icon',
    'iconPosition',
    'onClick',
    'type',
    'accBehavior',
    'active',
    'onKeyDown',
  ]

  public static defaultProps = {
    as: 'button',
  }

  static autoControlledProps = ['active']

  getInitialAutoControlledState() {
    return { active: false }
  }

  elementRef: HTMLElement
  setElementRef = ref => (this.elementRef = ref)

  constructor(props, state) {
    super(props, state)
    const accBehavior: string = props.accBehavior
    this.accBehavior = AccBehaviorFactory.getBehavior(
      AccBehaviorType[accBehavior] || AccBehaviorType.button,
    )
  }

  public renderComponent({
    ElementType,
    classes,
    rest,
  }: IRenderResultConfig<IButtonProps>): ReactNode {
    const { children, content, disabled, icon, iconPosition, type } = this.props
    const primary = type === 'primary'

    const getContent = (): ReactNode => {
      if (childrenExist(children)) {
        return children
      }

      const iconIsAfterButton = iconPosition === 'after'
      const renderedContent = [
        content && <Text key="btn-content" truncated content={content} />,
        icon &&
          typeof icon === 'string' && (
            <Icon
              key="btn-icon"
              name={icon}
              xSpacing={!content ? 'none' : iconIsAfterButton ? 'before' : 'after'}
              color={primary ? 'white' : 'black'}
            />
          ),
      ].filter(Boolean)

      return iconIsAfterButton ? renderedContent : renderedContent.reverse()
    }

    return (
      <ElementType
        className={classes.root}
        ref={this.setElementRef}
        disabled={disabled}
        onClick={this.handleClick}
        onKeyDown={this.accBehavior.onKeyDown(this, this.props, this.state)}
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...rest}
      >
        {getContent()}
      </ElementType>
    )
  }

  private handleClick = (e: SyntheticEvent) => {
    const { onClick, disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (onClick) {
      onClick(e, this.props, this.state)
    }
  }
}

export default Button
