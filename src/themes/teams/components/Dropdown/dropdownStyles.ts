import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownProps } from '../../../../components/Dropdown/Dropdown'
import { DropdownVariables } from './dropdownVariables'

const dropdownStyles: ComponentSlotStylesInput<DropdownProps, DropdownVariables> = {
  root: ({
    props: { focused, toggleButton, fluid },
    variables: {
      backgroundColor,
      borderBottom,
      borderRadius,
      borderColor,
      borderColorFocus,
      borderRadiusFocus,
      color,
      toggleButtonSize,
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
    ...(toggleButton && {
      paddingRight: toggleButtonSize,
    }),
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

  label: (): ICSSInJSStyle => ({
    margin: '.4rem 0 0 .4rem',
  }),

  list: ({ variables: { listMaxHeight, width }, props: { fluid } }): ICSSInJSStyle => ({
    position: 'absolute',
    zIndex: 1000,
    maxHeight: listMaxHeight,
    overflowY: 'auto',
    width: fluid ? '100%' : width,
    top: 'calc(100% + 2px)', // leave room for container + its border
  }),

  emptyListItem: ({ variables: { listItemBackgroundColor } }) => ({
    backgroundColor: listItemBackgroundColor,
  }),

  toggleButton: ({ variables: { toggleButtonSize, width }, props: { fluid } }): ICSSInJSStyle => ({
    position: 'absolute',
    height: toggleButtonSize,
    width: toggleButtonSize,
    border: 0,
    backgroundColor: 'transparent',
    margin: 0,
    ...(fluid ? { right: 0 } : { left: `calc(${width} - ${toggleButtonSize})` }),
  }),
}

export default dropdownStyles
