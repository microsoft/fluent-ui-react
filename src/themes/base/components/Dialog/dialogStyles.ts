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
  }),
  actions: (): ICSSInJSStyle => ({
    textAlign: 'right',
  }),
  content: ({ variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    margin: v.contentMargin,
  }),
  header: ({ variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    margin: v.headerMargin,
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
