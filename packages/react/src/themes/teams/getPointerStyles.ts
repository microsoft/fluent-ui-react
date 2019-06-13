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
      transform: 'rotate(45deg)',
    },
    right: {
      left: `-${pointerOffset}`,
      transform: 'rotate(135deg)',
    },
    bottom: {
      top: `-${pointerOffset}`,
      transform: 'rotate(-135deg)',
    },
    left: {
      right: `-${pointerOffset}`,
      transform: 'rotate(-45deg)',
    },
  }

  return {
    root: rootStyles[placement],
    pointer: pointerStyles[placement],
  }
}

export default getPointerStyles
