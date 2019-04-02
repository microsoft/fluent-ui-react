import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  childrenExist,
  createShorthandFactory,
  pxToRem,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
  isFromKeyboard,
  applyAccessibilityKeyHandlers,
} from '../../lib'

import Icon from '../Icon/Icon'
import Image from '../Image/Image'
import Layout from '../Layout/Layout'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { labelBehavior } from '../../lib/accessibility'
import { ReactProps, ShorthandValue } from '../../types'
import {
  ComplexColorPropType,
  ColorValuesWithPrimitiveColors,
} from '../../lib/commonPropInterfaces'

export interface LabelProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps<ComplexColorPropType<ColorValuesWithPrimitiveColors>> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default labelBehavior
   */
  accessibility?: Accessibility

  /** A Label can be circular. */
  circular?: boolean

  /** A Label can take up the width of its container. */
  fluid?: boolean

  /** A Label can have an icon. */
  icon?: ShorthandValue

  /** A Label can position its Icon at the start or end of the layout. */
  iconPosition?: 'start' | 'end'

  /** A Label can contain an image. */
  image?: ShorthandValue

  /** A Label can position its image at the start or end of the layout. */
  imagePosition?: 'start' | 'end'
}

export interface AttachmentState {
  isFromKeyboard: boolean
  isVisible: boolean
}

/**
 * A Label is used to classify content.
 */
class Label extends UIComponent<ReactProps<LabelProps>, any> {
  static displayName = 'Label'

  static create: Function

  static className = 'ui-label'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: 'complex' }),
    circular: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    iconPosition: PropTypes.oneOf(['start', 'end']),
    image: customPropTypes.itemShorthand,
    imagePosition: PropTypes.oneOf(['start', 'end']),
    fluid: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: labelBehavior as Accessibility,
    as: 'span',
    imagePosition: 'start',
    iconPosition: 'end',
  }

  handleIconOverrides = iconProps => {
    return {
      ...(!iconProps.xSpacing && {
        xSpacing: 'none',
      }),
    }
  }

  public state = {
    isFromKeyboard: false,
    isVisible: true,
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps, variables, styles }) {
    const { children, content, icon, iconPosition, image, imagePosition } = this.props

    if (childrenExist(children)) {
      return (
        <ElementType
          {...rtlTextContainer.getAttributes({ forElements: [children] })}
          {...accessibility.attributes.root}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
          className={classes.root}
        >
          {children}
        </ElementType>
      )
    }

    const imageElement = Image.create(image, {
      defaultProps: {
        styles: styles.image,
        variables: variables.image,
      },
    })
    const iconElement = Icon.create(icon, {
      defaultProps: {
        styles: styles.icon,
        variables: variables.icon,
      },
      overrideProps: this.handleIconOverrides,
    })

    const startImage = imagePosition === 'start' && imageElement
    const startIcon = iconPosition === 'start' && iconElement
    const endIcon = iconPosition === 'end' && iconElement
    const endImage = imagePosition === 'end' && imageElement

    const hasStartElement = startImage || startIcon
    const hasEndElement = endIcon || endImage

    return (
      this.state.isVisible && (
        <ElementType
          {...accessibility.attributes.root}
          {...unhandledProps}
          className={classes.root}
          onFocus={this.handleFocus}
          onClick={this.handleClick}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          <Layout
            start={
              hasStartElement && (
                <>
                  {startImage}
                  {startIcon}
                </>
              )
            }
            main={content}
            end={
              hasEndElement && (
                <>
                  {endIcon}
                  {endImage}
                </>
              )
            }
            gap={pxToRem(8)}
          />
        </ElementType>
      )
    )
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    performRemove: event => this.performRemove(event),
    performClick: event => this.performClick(event),
  }

  private performRemove = e => {
    e.stopPropagation()
    this.handleRemove()
  }

  private handleRemove = () => {
    console.warn('delete')
    this.setState({ isVisible: false })
  }

  private performClick = e => {
    e.stopPropagation()
    this.handleClick(e)
  }

  private handleClick = (e: React.SyntheticEvent) => {
    console.warn('click')
    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    console.warn('focus')
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }
}

Label.create = createShorthandFactory({ Component: Label, mappedProp: 'content' })

export default Label
