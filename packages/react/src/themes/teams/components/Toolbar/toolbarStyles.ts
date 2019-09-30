import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'

const toolbarStyles: ComponentSlotStylesPrepared = {
  root: ({ props: { overflow } }): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
    ...(overflow && {
      overflowY: 'hidden',
      flexWrap: 'wrap',
    }),
  }),

  wrapper: (): ICSSInJSStyle => ({
    position: 'relative',
  }),

  measurement: (): ICSSInJSStyle => ({
    position: 'fixed',
    visibility: 'hidden',
  }),
}

export default toolbarStyles
