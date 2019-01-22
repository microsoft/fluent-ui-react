import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownProps } from '../../../../components/Dropdown/Dropdown'
import { DropdownVariables } from './dropdownVariables'
import { pxToRem } from '../../../../lib'

const dropdownStyles: ComponentSlotStylesInput<DropdownProps, DropdownVariables> = {
  root: (): ICSSInJSStyle => ({}),

  container: ({
    props: { focused, fluid },
    variables: {
      backgroundColor,
      borderBottom,
      borderRadius,
      borderColor,
      borderColorFocus,
      borderRadiusFocus,
      color,
      width,
    },
  }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    outline: 0,
    border: 0,
    backgroundColor,
    borderBottom,
    borderColor,
    borderRadius,
    color,
    width: fluid ? '100%' : width,
    position: 'relative',
    ...(focused && {
      borderColor: borderColorFocus,
      borderRadius: borderRadiusFocus,
    }),
  }),

  button: ({ variables: { comboboxPaddingButton } }): ICSSInJSStyle => {
    const transparentColorStyle = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    }
    return {
      boxShadow: 'none',
      margin: '0',
      justifyContent: 'left',
      padding: comboboxPaddingButton,
      ...transparentColorStyle,
      height: pxToRem(30),
      ':hover': transparentColorStyle,
      ':focus': {
        ...transparentColorStyle,
        ':after': {
          borderColor: 'transparent',
        },
        ':active': transparentColorStyle,
      },
      ':active': transparentColorStyle,
    }
  },

  list: ({
    variables: { listMaxHeight, width, listBackgroundColor },
    props: { fluid },
  }): ICSSInJSStyle => ({
    position: 'absolute',
    zIndex: 1000,
    maxHeight: listMaxHeight,
    overflowY: 'auto',
    width: fluid ? '100%' : width,
    top: 'calc(100% + 2px)', // leave room for container + its border
    background: listBackgroundColor,
  }),

  emptyListItem: ({ variables: { listItemBackgroundColor } }) => ({
    backgroundColor: listItemBackgroundColor,
  }),

  toggleButton: ({ variables: { toggleButtonSize, width }, props: { fluid } }): ICSSInJSStyle => ({
    position: 'absolute',
    height: toggleButtonSize,
    width: toggleButtonSize,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    ...(fluid ? { right: 0 } : { left: `calc(${width} - ${toggleButtonSize})` }),
  }),
}

export default dropdownStyles
