import { DialogProps } from '../../../../components/Dialog/Dialog'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { DialogVariables } from './dialogVariables'

type DialogStyleParams = ComponentStyleFunctionParam<DialogProps, DialogVariables>

export default {
  root: ({ props: p, variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    background: v.rootBackground,
    borderRadius: v.rootBorderRadius,
    outline: 'none',
    position: 'absolute',
    padding: v.rootPadding,
    width: v.rootWidth,
    // CSS Grid is polifilled only with latest inline-style-prefixer
    // @ts-ignore is supported by fallback values plugin
    display: ['grid', '-ms-grid'],
    gridTemplateColumns: '1fr auto',
    '-ms-grid-columns': `1fr auto`,

    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    zIndex: v.zIndex,
  }),
  actions: (): ICSSInJSStyle => ({
    gridRow: 3,
    '-ms-grid-row': 3,
    '-ms-grid-column': 1,
    '-ms-grid-column-span': 2,
    gridColumn: '1 / span 2',
    '-ms-grid-column-align': 'end',
    justifySelf: 'right',
  }),
  content: ({ variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    margin: v.contentMargin,
    gridRow: 2,
    '-ms-grid-column': 1,
    '-ms-grid-column-span': 2,
    justifySelf: 'left',
  }),
  header: ({ variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    margin: v.headerMargin,
    gridRow: 1,
    gridColumn: 1,
    justifySelf: 'left',
  }),
  headerAction: (): ICSSInJSStyle => ({
    gridRow: 1,
    gridColumn: 2,
  }),
  overlay: ({ props: p, variables: v }: DialogStyleParams): ICSSInJSStyle => ({
    bottom: 0,
    display: 'flex',
    left: 0,
    overflow: 'auto',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: v.overlayZIndex,

    ...(p.backdrop && {
      background: v.overlayBackground,
    }),
  }),
}
