import { teamsPxToRem } from '../../utils'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { LabelProps } from '../../../../components/Label/Label'

const labelStyles: ComponentSlotStylesInput<LabelProps, any> = {
  root: ({ props: { image, imagePosition, circular }, variables }): ICSSInJSStyle => ({
    padding: variables.padding,
    ...(image &&
      imagePosition === 'start' && {
        paddingLeft: variables.startPaddingLeft,
      }),
    ...(image &&
      imagePosition === 'end' && {
        paddingRight: variables.endPaddingRight,
      }),
    display: 'inline-flex',
    alignItems: 'center',
    height: variables.height,
    fontSize: teamsPxToRem(14),
    lineHeight: variables.height,
    backgroundColor: variables.backgroundColor,
    color: variables.color,
    borderRadius: teamsPxToRem(3),
    ...(circular && {
      borderRadius: variables.circularRadius,
    }),
    overflow: 'hidden',
  }),
  image: ({ variables }): ICSSInJSStyle => ({
    height: variables.height,
    width: variables.height,
  }),
  icon: ({ props }): ICSSInJSStyle => ({
    ...(props.icon &&
      typeof props.icon === 'object' &&
      (props.icon as any).onClick && {
        cursor: 'pointer',
      }),
  }),
}

export default labelStyles
