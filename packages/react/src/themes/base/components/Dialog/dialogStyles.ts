import { DialogProps } from '../../../../components/Dialog/Dialog'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { DialogVariables } from './dialogVariables'

type DialogStyleParams = ComponentStyleFunctionParam<DialogProps, DialogVariables>

export default {
  root: ({ props: p, variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    background: v.rootBackground,
    borderRadius: v.rootBorderRadius,
    outline: 'none',
    padding: v.rootPadding,
    position: 'relative',
    width: v.rootWidth,
    display: 'flex',
    flexWrap: 'wrap',
  }),
  actions: ({ rtl }: DialogStyleParams): ICSSInJSStyle => ({
    ...(!rtl && {
      textAlign: 'right',
    }),
    flexBasis: '100%',
    marginLeft: 'auto',
  }),
  content: ({ variables: v, rtl }: DialogStyleParams): ICSSInJSStyle => ({
    ...(rtl && {
      textAlign: 'left',
    }),
    margin: v.contentMargin,
    flexBasis: '100%',
  }),
  header: ({ variables: v, rtl }: DialogStyleParams): ICSSInJSStyle => ({
    ...(rtl && {
      textAlign: 'left',
    }),
    margin: v.headerMargin,
    flexGrow: 1,
  }),
  overlay: ({ props: p, variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    alignItems: 'center',
    background: v.overlayBackground,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    left: 0,
    overflow: 'auto',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: v.overlayZIndex,
  }),
}
