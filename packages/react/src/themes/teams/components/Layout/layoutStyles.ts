import { debugRoot, debugArea, debugGap } from '../../../../styles/debugStyles'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const layoutStyles: ComponentSlotStylesInput = {
  root: ({ props }): ICSSInJSStyle => {
    const {
      alignItems,
      debug,
      gap,
      justifyItems,
      main,
      mainSize,
      end,
      endSize,
      rootCSS,
      start,
      startSize,
      vertical,
    } = props

    return {
      ...(debug && debugRoot()),
      justifyItems,
      alignItems,
      display: 'grid',
      [vertical ? 'gridTemplateRows' : 'gridTemplateColumns']: [
        // Heads up!
        // IE11 Doesn't support grid-gap, insert virtual columns instead
        start && startSize,
        gap && start && main && gap,
        main && mainSize,
        gap && (start || main) && end && gap,
        end && endSize,
      ]
        .filter(Boolean)
        .join(' '),
      ...(vertical && {
        gridAutoFlow: 'row',
      }),
      ...rootCSS,
    }
  },

  gap: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugGap({ vertical: props.vertical })),
  }),

  start: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: 'inline-flex',
    ...p.startCSS,
  }),

  main: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: 'grid',
    ...p.mainCSS,
  }),

  end: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: 'inline-flex',
    ...p.endCSS,
  }),
}

export default layoutStyles
