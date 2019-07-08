import { PopperChildrenProps } from '../../lib/positioner'

const rtlMapping = {
  left: 'right',
  right: 'left',
}

const getPointerStyles = (
  pointerOffset: string,
  pointerMargin: string,
  rtl: boolean,
  popperPlacement?: PopperChildrenProps['placement'],
  isSvg?: boolean,
) => {
  const placementValue = (popperPlacement || '').split('-', 1).pop()
  const placement = (rtl && rtlMapping[placementValue]) || placementValue

  const rootStyles = {
    top: {
      marginBottom: pointerMargin,
    },
    right: {
      marginLeft: pointerMargin,
    },
    bottom: {
      marginTop: pointerMargin,
    },
    left: {
      marginRight: pointerMargin,
    },
  }
  const pointerStyles = {
    top: {
      bottom: `-${pointerOffset}`,
      transform: `rotate(${isSvg ? (rtl ? 90 : -90) : 45}deg)`,
    },
    right: {
      left: `-${pointerOffset}`,
      transform: `rotate(${isSvg ? (rtl ? 180 : 0) : 135}deg)`,
    },
    bottom: {
      top: `-${pointerOffset}`,
      transform: `rotate(${isSvg ? (rtl ? -90 : 90) : -135}deg)`,
    },
    left: {
      right: `-${pointerOffset}`,
      transform: `rotate(${isSvg ? (rtl ? 0 : 180) : -45}deg)`,
    },
  }

  return {
    root: rootStyles[placement],
    pointer: pointerStyles[placement],
  }
}

export default getPointerStyles
