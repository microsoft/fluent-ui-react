import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const labelStyles: IComponentPartStylesInput = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    padding: variables.padding,
    fontWeight: 500,
    backgroundColor: 'rgb(232, 232, 232)',
    color: 'rgba(0, 0, 0, 0.6)',
    borderRadius: pxToRem(3),
    ...(props.circular && {
      borderRadius: variables.circularRadius,
    }),
  }),
}

export default labelStyles
