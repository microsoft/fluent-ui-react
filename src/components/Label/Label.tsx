import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createHTMLSpan,
  createShorthandFactory,
  customPropTypes,
  UIComponent,
} from '../../lib'

import { Icon, Image } from '../..'
import { Accessibility } from '../../lib/accessibility/interfaces'

import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'

export interface ILabelProps {
  accessibility?: Accessibility
  as?: any
  children?: ReactChildren
  circular?: boolean
  className?: string
  content?: React.ReactNode
  fluid?: boolean
  icon?: ShorthandValue
  iconPosition?: 'start' | 'end'
  image?: ShorthandValue
  imagePosition?: 'start' | 'end'
  renderIcon?: ShorthandRenderFunction
  renderImage?: ShorthandRenderFunction
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
  template?: string | string[]
}

/**
 * A label displays content classification
 */
class Label extends UIComponent<Extendable<ILabelProps>, any> {
  static displayName = 'Label'

  static create: Function

  static className = 'ui-label'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** A label can be circular. */
    circular: PropTypes.bool,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Label can have an icon. */
    icon: customPropTypes.itemShorthand,

    /** An icon label can format an Icon to appear before or after the text in the label */
    iconPosition: PropTypes.oneOf(['start', 'end']),

    /** Label can have an icon. */
    image: customPropTypes.itemShorthand,

    /** An icon label can format an Icon to appear before or after the text in the label */
    imagePosition: PropTypes.oneOf(['start', 'end']),

    /**
     * A custom render function the icon slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderIcon: PropTypes.func,

    /**
     * A custom render function the image slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderImage: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    template: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  }

  static defaultProps = {
    as: 'span',
    imagePosition: 'start',
    iconPosition: 'end',
    template: 'image content icon',
  }

  handleIconOverrides = iconProps => {
    return {
      ...(iconProps.onClick && { tabIndex: '0' }),
      ...(!iconProps.xSpacing && {
        xSpacing: 'none',
      }),
    }
  }

  renderComponent({ ElementType, classes, rest, variables, styles }) {
    const {
      children,
      content,
      icon,
      iconPosition,
      image,
      imagePosition,
      renderIcon,
      renderImage,
      template,
    } = this.props

    const enabledAreas = {
      icon: false,
      image: false,
      content: false,
    }

    const gridTemplateAreas = []
      .concat(template)
      .filter(Boolean)
      .reduce((acc, next) => {
        // remove areas for which there is no prop
        return (
          acc +
          ' "' +
          next
            .replace(/['"]/g, '')
            .split(' ')
            .filter(area => {
              enabledAreas[area] = true
              const exists = Boolean(this.props[area])
              console.log(area, exists)
              return exists
            })
            .join(' ') +
          '"'
        )
      }, '')

    console.log(gridTemplateAreas)

    const imageElement = Image.create(image, {
      defaultProps: {
        styles: styles.image,
        variables: variables.image,
      },
      render: renderImage,
    })

    const iconElement = Icon.create(icon, {
      defaultProps: {
        styles: styles.icon,
        variables: variables.icon,
      },
      overrideProps: this.handleIconOverrides,
      render: renderIcon,
    })

    const contentElement = createHTMLSpan(content, {
      defaultProps: { className: classes.content },
    })

    return (
      <ElementType {...rest} className={classes.root} style={{ gridTemplateAreas }}>
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {enabledAreas.icon && iconPosition === 'start' && iconElement}
            {enabledAreas.image && imagePosition === 'start' && imageElement}
            {enabledAreas.content && contentElement}
            {enabledAreas.image && imagePosition === 'end' && imageElement}
            {enabledAreas.icon && iconPosition === 'end' && iconElement}
          </>
        )}
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory(Label, content => ({ content }))

export default Label
