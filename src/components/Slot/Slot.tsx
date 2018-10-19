import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  customPropTypes,
  UIComponent,
  childrenExist,
  RenderResultConfig,
  createShorthand,
} from '../../lib'
import { Extendable, MapValueToProps, Props } from '../../../types/utils'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'

export interface SlotProps {
  as?: any
  className?: string
  content?: any
  styles?: ComponentSlotStyle<SlotProps, any>
  variables?: ComponentVariablesInput
}

type HTMLTag = 'div' | 'iframe' | 'img' | 'input' | 'label' | 'p'
type ShorthandProp = 'children' | 'src' | 'type' | 'content'

const htmlFactoryMapping: Map<HTMLTag, ShorthandProp> = new Map([
  ['div', 'children'],
  ['iframe', 'src'],
  ['img', 'src'],
  ['input', 'type'],
  ['label', 'children'],
  ['p', 'children'],
] as [HTMLTag, ShorthandProp][])

const getMapValueFn = (propType: HTMLTag) => {
  const mappedProp = htmlFactoryMapping.get(propType) || 'content'
  return (value: string) => ({ [mappedProp]: value })
}

export const createSlotFactory = (
  asProp: React.ReactType | HTMLTag,
  mapValueToProps?: MapValueToProps,
) => (val, options: Props = {}) => {
  options.defaultProps = { as: asProp, ...options.defaultProps }
  return createShorthand(Slot, mapValueToProps || getMapValueFn(asProp as HTMLTag), val, options)
}

/**
 * A Slot is a basic component (no default styles)
 */
class Slot extends UIComponent<Extendable<SlotProps>, any> {
  static className = 'ui-slot'

  static displayName = 'Slot'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
  }

  static create = createSlotFactory(Slot.defaultProps.as, content => ({ content }))

  renderComponent({ ElementType, classes, rest }: RenderResultConfig<SlotProps>) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Slot
