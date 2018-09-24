import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes, UIComponent } from '../../lib'
import SwatchcpBase from './SwatchcpBase'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'
import { MenuBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'

export interface ISwatchcpProps {
  accessibility?: Accessibility
  as?: any
  activeIndex?: number | string
  cellShape?: string
  className?: string
  children?: ReactChildren
  colors?: ItemShorthand[]
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class Swatchcp extends AutoControlledComponent<Extendable<ISwatchcpProps>, any> {
  static className = 'ui-swatchcp'

  static displayName = 'Swatchcp'

  static propTypes = {
    as: customPropTypes.as,

    /** Index of the currently active item. */
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Additional classes. */
    cellShape: PropTypes.string,

    /** Additional classes. */
    className: PropTypes.string,

    children: PropTypes.node,

    /** Shorthand array of colors. */
    colors: PropTypes.arrayOf(PropTypes.any),

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static autoControlledProps = ['activeIndex']

  static handledProps = [
    'accessibility',
    'as',
    'activeIndex',
    'cellShape',
    'children',
    'className',
    'colors',
    'styles',
    'variables',
  ]

  static defaultProps = {
    as: 'div',
    cellShape: 'circle',
    accessibility: MenuBehavior as Accessibility,
  }

  static Color = SwatchcpBase

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      this.trySetState({ activeIndex: index })

      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
  })

  renderComponent({ ElementType, classes, rest, accessibility }) {
    const { children, colors, cellShape } = this.props
    const { activeIndex } = this.state

    return (
      <ElementType {...rest} className={classes.root} {...accessibility.attributes.root}>
        {childrenExist(children)
          ? children
          : _.map(colors, (color, index) =>
              SwatchcpBase.create(color, {
                defaultProps: {
                  name: cellShape,
                  index,
                  active: parseInt(activeIndex, 10) === index,
                },
                overrideProps: this.handleItemOverrides,
              }),
            )}
      </ElementType>
    )
  }
}

export default Swatchcp
