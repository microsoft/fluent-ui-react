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
      width,
    },
  }): ICSSInJSStyle => {
    return {
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
      transform: 'rotateZ(0)',
      ...(toggleButton && {
        paddingRight: '2rem',
      }),
      ...(focused && {
        borderColor: containerDivFocusBorderColor,
        borderRadius: containerDivFocusBorderRadius,
      }),
    }
  },

  editTextInput: ({ variables: { backgroundColor } }): ICSSInJSStyle => ({
    width: '100%',
    backgroundColor,
  }),

  editTextDiv: ({ variables: { editTextFlexBasis } }): ICSSInJSStyle => ({
    flexBasis: editTextFlexBasis,
    flexGrow: 1,
  }),

  list: ({ variables: { listMaxHeight, width }, props: { fluid } }): ICSSInJSStyle => ({
    position: 'absolute',
    zIndex: 1000,
    maxHeight: listMaxHeight,
    overflowY: 'hidden',
    width: fluid ? '100%' : width,
    top: 'calc(100% + 2px)', // leave room for container + its border
  }),

  listItemRoot: ({ variables: { listItemBackgroundColor } }): ICSSInJSStyle => ({
    backgroundColor: listItemBackgroundColor,
  }),

  activeListLabel: (): ICSSInJSStyle => ({
    margin: '.4rem 0 0 .4rem',
  }),

  toggleButton: ({ variables: { toggleButtonSize } }): ICSSInJSStyle => ({
    position: 'absolute',
    right: 0,
    top: 0,
    height: toggleButtonSize,
    width: toggleButtonSize,
    border: 0,
    backgroundColor: 'transparent',
    margin: 0,
  }),
}

export default dropdownStyles
