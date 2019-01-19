import * as React from 'react'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { FlexProps } from '../../../../components/Flex/Flex'
import FlexBody from 'src/components/Flex/FlexBody'

/**
 * Maps alignment properties into styles
 * @param props
 */
const alignmentStyles = props => {
  const isGrid = Boolean(props.gap)

  return props.vertical && !isGrid
    ? {
        alignItems: props.right
          ? 'flex-end'
          : props.between
          ? 'space-between'
          : props.evenly
          ? 'space-evenly'
          : props.around
          ? 'space-around'
          : props.center
          ? 'center'
          : 'unset',
        justifyContent: props.bottom
          ? 'flex-end'
          : props.top
          ? 'flex-start'
          : props.baseline
          ? 'baseline'
          : props.center
          ? 'center'
          : 'flex-start',
      }
    : {
        justifyContent: props.right
          ? 'flex-end'
          : props.left
          ? 'flex-start'
          : props.between
          ? 'space-between'
          : props.evenly
          ? 'space-evenly'
          : props.around
          ? 'space-around'
          : props.center
          ? 'center'
          : 'flex-start',
        alignItems: props.bottom
          ? 'flex-end'
          : props.top
          ? 'flex-start'
          : props.baseline
          ? 'baseline'
          : props.center
          ? 'center'
          : props.top
          ? 'flex-start'
          : 'inherit',
        alignContent: 'flex-start',
      }
}

/**
 * Computes grid template string to emulate flex:1 logic in grid layout
 * @param props
 */
const gridTemplateString = props => {
  const templateString = React.Children.map(props.children, child =>
    child.props.fluid || (child.type as any).displayName === FlexBody.displayName ? '1fr' : 'auto',
  ).join(' ')
  return {
    [props.vertical ? 'gridTemplateRows' : 'gridTemplateColumns']: templateString,
  }
}

const flexStyles: ComponentSlotStylesInput<FlexProps, {}> = {
  root: ({ props }): ICSSInJSStyle => {
    const flexAndGridStyles = {
      ...(props.debug && { border: '1px dashed cornflowerblue' }),
      ...(props.fluid && { flex: 1 }),
    }

    if (props.gap) {
      return {
        display: 'grid',
        ...(props.vertical
          ? { gridAutoFlow: 'row', gridRowGap: props.gap, gridTemplateColumns: '1fr' }
          : { gridAutoFlow: 'column', gridColumnGap: props.gap, gridTemplateRows: '1fr' }),
        ...alignmentStyles(props),
        ...flexAndGridStyles,
        ...gridTemplateString(props),
      }
    }

    return {
      display: 'flex',
      ...(props.vertical && !props.gap && { flexDirection: 'column' }),
      ...(props.wrap && { flexWrap: 'wrap' }),
      ...(props.flexSize && { flexBasis: props.flexSize }),
      ...alignmentStyles(props),
      ...flexAndGridStyles,
    }
  },
}

export default flexStyles
