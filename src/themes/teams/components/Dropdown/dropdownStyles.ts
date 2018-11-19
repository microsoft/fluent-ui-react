import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownProps } from '../../../../components/Dropdown/Dropdown'
import { DropdownVariables } from './dropdownVariables'

const dropdownStyles: ComponentSlotStylesInput<DropdownProps, DropdownVariables> = {
  containerDiv: ({ variables: v, props: p }): ICSSInJSStyle => {
    const { focused, toggleButton, fluid } = p

    return {
      display: 'flex',
      flexWrap: 'wrap',
      outline: 0,
      border: 0,
      color: v.fontColor,
      borderRadius: v.containerDivBorderRadius,
      borderBottom: v.containerDivBorderBottom,
      backgroundColor: v.containerDivBackgroundColor,
      borderColor: v.containerDivBorderColor,
      width: fluid ? '100%' : v.width,
      transform: 'rotateZ(0)',
      ...(toggleButton && {
        paddingRight: '2rem',
      }),
      ...(focused && {
        borderColor: v.containerDivFocusBorderColor,
        borderRadius: v.containerDivFocusBorderRadius,
      }),
    }
  },

  editTextInput: (): ICSSInJSStyle => ({
    width: '100%',
  }),

  editTextDiv: (): ICSSInJSStyle => ({
    flexBasis: '100px',
    flexGrow: 1,
  }),

  list: ({ variables: v, props: { fluid } }): ICSSInJSStyle => ({
    position: 'absolute',
    zIndex: 1000,
    maxHeight: '20rem',
    overflowY: 'hidden',
    width: fluid ? '100%' : v.width,
    top: 'calc(100% + 2px)', // leave room for container + its border
  }),

  listItemRoot: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.listItemBackgroundColor,
  }),

  activeListLabel: (): ICSSInJSStyle => ({
    margin: '.4rem 0 0 .4rem',
  }),

  toggleButton: ({ variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    right: 0,
    top: 0,
    height: v.toggleButtonSize,
    width: v.toggleButtonSize,
    border: 0,
    backgroundColor: 'transparent',
    margin: 0,
  }),
}

export default dropdownStyles
