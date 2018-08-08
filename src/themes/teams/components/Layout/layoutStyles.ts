import { debugRoot, debugArea, debugGap } from '../../../../styles/debugStyles'

const truncateStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const layoutStyles = {
  root: ({ props }) => {
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

  gap: ({ props }) => ({
    ...(props.debug && debugGap({ vertical: props.vertical })),
  }),

  start: ({ props }) => ({
    ...(props.debug && debugArea()),
    ...(props.truncateStart && truncateStyle),
    ...props.startCSS,
  }),

  main: ({ props }) => ({
    ...(props.debug && debugArea()),
    ...(props.truncateMain && truncateStyle),
    ...props.mainCSS,
  }),

  end: ({ props }) => ({
    ...(props.debug && debugArea()),
    ...(props.truncateEnd && truncateStyle),
    ...props.endCSS,
  }),
}

export default layoutStyles
