import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { FlexProps } from '../../../../components/Flex/Flex'

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
          : 'flex-start',
        justifyContent: props.bottom ? 'baseline' : props.center ? 'center' : 'flex-start',
      }
    : {
        justifyContent: props.right
          ? 'baseline'
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

const flexStyles: ComponentSlotStylesInput<FlexProps, {}> = {
  root: ({ props }): ICSSInJSStyle => {
    const flexAndGridStyles = {
      ...(props.debug && { border: '1px dashed cornflowerblue' }),
    }

    if (props.gap) {
      return {
        display: 'grid',
        ...(props.vertical
          ? { gridAutoFlow: 'row', gridRowGap: props.gap, gridTemplateColumns: '1fr' }
          : { gridAutoFlow: 'column', gridColumnGap: props.gap, gridTemplateRows: '1fr' }),
        ...alignmentStyles(props),
        ...flexAndGridStyles,
      }
    }

    return {
      display: 'flex',
      flex: 1,
      ...(props.vertical && !props.gap && { flexDirection: 'column' }),
      ...(props.fluid && { flex: 1 }),
      ...(props.wrap && { flexWrap: 'wrap' }),
      ...(props.flexSize && { flexBasis: props.flexSize }),
      ...alignmentStyles(props),
      ...flexAndGridStyles,
    }
  },
}

export default flexStyles
