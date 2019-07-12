import { DialogProps } from '../../../../components/Dialog/Dialog'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { DialogVariables } from './dialogVariables'

type DialogStyleParams = ComponentStyleFunctionParam<DialogProps, DialogVariables>

export default {
  root: ({ props: p, variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    boxShadow: v.boxShadow,
    color: v.foregroundColor,
  }),

  header: ({ variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    fontSize: v.headerFontSize,
    fontWeight: v.headerFontWeight,
  }),

  headerAction: ({ variables: v }: DialogStyleParams) => ({
    color: v.foregroundColor,
    margin: v.headerActionMargin,
  }),
}
