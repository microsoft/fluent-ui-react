import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { FlexProps } from '../../../../components/Flex/Flex'

const alignmentStyles = props =>
  props.vertical && !props.gap
    ? {
        alignItems: props.right ? 'flex-end' : props.center ? 'center' : 'flex-start',
        justifyContent: props.bottom ? 'flex-end' : props.center ? 'center' : 'flex-start',
      }
    : {
        justifyContent: props.right ? 'flex-end' : props.center ? 'center' : 'flex-start',
        alignItems: props.bottom
          ? 'flex-end'
          : props.center
          ? 'center'
          : props.top
          ? 'flex-start'
          : 'inherit',
      }

const flexStyles: ComponentSlotStylesInput<FlexProps, {}> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(p.gap
      ? {
          display: 'grid',
          ...(p.vertical
            ? { gridAutoFlow: 'row', gridRowGap: p.gap }
            : { gridAutoFlow: 'column', gridColumnGap: p.gap }),
        }
      : { display: 'flex' }),
    flex: '1 1 auto',
    ...(p.debug && { border: '1px dashed cornflowerblue' }),
    ...(p.vertical && !p.gap && { flexDirection: 'column' }),
    ...(p.fluid && { flex: 1 }),
    ...(p.wrap && { flexWrap: 'wrap' }),
    ...(p.flexSize && { flexBasis: p.flexSize }),
    ...alignmentStyles(p),
  }),
}

export default flexStyles
