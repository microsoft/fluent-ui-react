import * as React from 'react'
import { UIComponent, UIComponentProps, ChildrenComponentProps } from '../../lib'
import { Extendable } from '../../../types/utils'

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

  renderComponent({ ElementType, classes, variables: v, rest }) {
    return (
      <ElementType {...rest} className={classes.root}>
        {this.props.children}
      </ElementType>
    )
  }
}

const flexFluid = { flex: 1 }

/* Flex body: injects flex:1 into only child, wraps children otherwise */
export const FlexBody = props => {
  const { children } = props
  return children.length !== undefined ? (
    <div style={flexFluid}>{children}</div>
  ) : (
    React.cloneElement(children, {
      ...children.props,
      ...{ style: { ...children.props.style, ...flexFluid } },
    })
  )
}

export default Flex
