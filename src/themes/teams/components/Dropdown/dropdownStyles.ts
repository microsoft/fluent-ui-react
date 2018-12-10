import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownProps } from '../../../../components/Dropdown/Dropdown'
import { DropdownVariables } from './dropdownVariables'

const dropdownStyles: ComponentSlotStylesInput<DropdownProps, DropdownVariables> = {
  containerDiv: ({
    props: { focused, toggleButton, fluid },
    variables: {
      backgroundColor,
      containerDivBorderBottom,
      containerDivBorderRadius,
      containerDivBorderColor,
      containerDivFocusBorderColor,
      containerDivFocusBorderRadius,
      containerDivColor,
      toggleButtonSize,
      width,
    },
  }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    outline: 0,
    border: 0,
    backgroundColor,
    borderRadius: containerDivBorderRadius,
    borderBottom: containerDivBorderBottom,
    borderColor: containerDivBorderColor,
    color: containerDivColor,
    width: fluid ? '100%' : width,
    position: 'relative',
    ...(toggleButton && {
      paddingRight: toggleButtonSize,
    }),
    ...(focused && {
      borderColor: containerDivFocusBorderColor,
      borderRadius: containerDivFocusBorderRadius,
    }),
  }),

  button: (): ICSSInJSStyle => {
    const transparentColorStyle = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    }
    return {
      boxShadow: '0 0 0 0',
      margin: '0',
      justifyContent: 'left',
      ...transparentColorStyle,
      ':hover': transparentColorStyle,
      ':focus': transparentColorStyle,
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
