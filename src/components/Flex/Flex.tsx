import * as React from 'react'
import * as PropTypes from 'prop-types'

import { UIComponent, UIComponentProps, ChildrenComponentProps } from '../../lib'
import { Extendable } from '../../../types/utils'
import FlexBody from './FlexBody'

export interface FlexProps extends ChildrenComponentProps, UIComponentProps {
  // Content direction
  vertical?: boolean

  // Flex
  flexSize?: string // { flexBasis: [value] } + 'auto grow shrink'
  fluid?: boolean // { flex: 1}
  wrap?: boolean // { flexWrap: 'wrap'}

  // Content alignment
  center?: boolean // { justifyContent:'center', alignItems: center}
  right?: boolean // { justifyContent:'flex-end' } or {alignItems: 'flex-end'}
  top?: boolean // { alignItems: 'flex-start'} or { justifyContent:'flex-start' }
  bottom?: boolean // { alignItems: 'flex-end'} or { justifyContent:'flex-end' }
  around?: boolean // { justifyContent:'space-around' }
  between?: boolean // { justifyContent:'space-between' }
  evenly?: boolean // { justifyContent:'space-evenly' }

  gap?: string // gap="1rem 0.2rem" --> gap="[in flex direction] [in opposite direction]"
}

/**
 * A flex component for arranging the content.
 */
class Flex extends UIComponent<Extendable<FlexProps>, {}> {
  static displayName = 'Flex'

  static Body = FlexBody
  static Area: React.FunctionComponent<{ fluid?: boolean; style?: React.CSSProperties }> = p => (
    <div
      {...p}
      style={{
        ...p.style,
        flex: p.fluid ? 1 : '0 0 auto',
      }}
    />
  )

  static propTypes = {
    vertical: PropTypes.bool,
    flexSize: PropTypes.string,
    fluid: PropTypes.bool,
    wrap: PropTypes.bool,
    center: PropTypes.bool,
    right: PropTypes.bool,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    around: PropTypes.bool,
    between: PropTypes.bool,
    evenly: PropTypes.bool,
    gap: PropTypes.string,
  }

  renderComponent({ ElementType, classes, variables: v, rest }) {
    return (
      <ElementType {...rest} className={classes.root}>
        {this.props.children}
      </ElementType>
    )
  }
}

export default Flex
