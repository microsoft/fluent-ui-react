import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'

const toolbarStyles: ComponentSlotStylesPrepared = {
  root: ({ props: { overflow }, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    ...(overflow && {
      // overflowY: 'hidden', // FIXME: commented out for debug purposes
      height: v.itemHeight,
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
