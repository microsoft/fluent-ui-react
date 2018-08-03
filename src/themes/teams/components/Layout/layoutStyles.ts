import { debugRoot, debugArea, debugGap } from '../../../../styles/debugStyles'
import { IComponentStyles, ICSSInJSStyle } from '../../../../../types/theme'

const truncateRule = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const layoutStyles: IComponentStyles = {
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

  start: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugArea()),
    ...(props.truncateStart && truncateRule),
    ...props.startCSS,
  }),

  main: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugArea()),
    ...(props.truncateMain && truncateRule),
    ...props.mainCSS,
  }),

  end: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugArea()),
    ...(props.truncateEnd && truncateRule),
    ...props.endCSS,
  }),
}

export default layoutStyles
