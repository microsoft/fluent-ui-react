import { teamsPxToRem } from '../../utils'

export default () => {
  const color = 'rgba(0, 0, 0, 0.6)'

  return {
    circularRadius: teamsPxToRem(9999),
    padding: `0 ${teamsPxToRem(4)} 0 ${teamsPxToRem(4)}`,
    color,
    backgroundColor: 'rgb(232, 232, 232)',
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: teamsPxToRem(20),

    // variables for 'icon' part
    icon: {
      color,
    },
  }
}
