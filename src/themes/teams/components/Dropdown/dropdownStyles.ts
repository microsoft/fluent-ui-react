import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownProps } from '../../../../components/Dropdown/Dropdown'
import { DropdownVariables } from './dropdownVariables'

const dropdownStyles: ComponentSlotStylesInput<DropdownProps, DropdownVariables> = {
  containerDiv: ({ variables: v, props: p }): ICSSInJSStyle => {
    const { focused } = p

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
      maxWidth: v.maxWidth,
      minWidth: v.minWidth,
      ...(focused && {
        borderColor: v.containerDivFocusBorderColor,
        borderRadius: v.containerDivFocusBorderRadius,
      }),
    }
  },

  ariaLiveSpan: (): ICSSInJSStyle => ({
    border: '0px',
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0px',
    width: '1px',
    position: 'absolute',
  }),

  editTextInput: (): ICSSInJSStyle => ({
    width: '100%',
  }),

  editTextDiv: (): ICSSInJSStyle => ({
    flexBasis: '100px',
    flexGrow: 1,
    borderColor: 'transparent',
  }),

  list: ({ variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    zIndex: 1000,
    maxHeight: '20rem',
    overflowY: 'hidden',
    maxWidth: v.maxWidth,
    minWidth: v.minWidth,
    width: v.width,
  }),

  listItemRoot: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.listItemBackgroundColor,
  }),

  activeListLabel: (): ICSSInJSStyle => ({
    margin: '.4rem 0 0 .4rem',
  }),
}

export default dropdownStyles
