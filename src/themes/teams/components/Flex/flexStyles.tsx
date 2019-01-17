import * as React from 'react'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { FlexProps } from '../../../../components/Flex/Flex'
import FlexBody from 'src/components/Flex/FlexBody'

const alignmentStyles = props => {
  const isGrid = Boolean(props.gap)

  return props.vertical && !isGrid
    ? {
        alignItems: props.right
          ? 'baseline'
          : props.between
          ? 'space-between'
          : props.center
          ? 'center'
          : 'inherit',
        justifyContent: props.bottom ? 'baseline' : props.center ? 'center' : 'flex-start',
      }
    : {
        justifyContent: props.right
          ? 'flex-end'
          : props.between
          ? 'space-between'
          : props.center
          ? 'center'
          : 'flex-start',
        alignItems: props.bottom
          ? 'baseline'
          : props.center
          ? 'center'
          : props.top
          ? 'flex-start'
          : 'inherit',
      }
}

const gridTemplateString = props => {
  const templateString = React.Children.map(props.children, child =>
    (child.type as any).displayName === FlexBody.displayName ? '1fr' : 'auto',
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
      flex: 1,
      ...(props.vertical && !props.gap && { flexDirection: 'column' }),
      ...(props.wrap && { flexWrap: 'wrap' }),
      ...(props.flexSize && { flexBasis: props.flexSize }),
      ...alignmentStyles(props),
      ...flexAndGridStyles,
    }
  },
}

export default flexStyles
