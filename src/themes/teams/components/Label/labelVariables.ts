import { pxToRem } from '../../utils'

export default () => {
  const color = 'rgba(0, 0, 0, 0.6)'

  return {
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    color,
    backgroundColor: 'rgb(232, 232, 232)',
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),

    // variables for 'icon' part
    icon: {
      color,
    },
  }
}
