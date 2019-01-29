import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownProps, DropdownState } from '../../../../components/Dropdown/Dropdown'
import { DropdownVariables } from './dropdownVariables'
import { pxToRem } from '../../../../lib'

const dropdownStyles: ComponentSlotStylesInput<DropdownProps & DropdownState, DropdownVariables> = {
  root: (): ICSSInJSStyle => ({}),

  container: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    outline: 0,
    border: 0,
    backgroundColor: v.backgroundColor,
    borderBottom: v.borderBottom,
    borderRadius: v.borderRadius,
    color: v.color,
    width: p.fluid ? '100%' : v.width,
    position: 'relative',
    ...(p.focused && { borderColor: v.borderColorFocus }),
    ...(!!p.toggleIndicator && { paddingRight: v.toggleIndicatorSize }),
  }),

  button: ({ variables: v }): ICSSInJSStyle => {
    const transparentColorStyle = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    }
    return {
      boxShadow: 'none',
      margin: '0',
      justifyContent: 'left',
      padding: v.comboboxPaddingButton,
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

  list: ({ props: p, variables: v }): ICSSInJSStyle => ({
    outline: 0,
    position: 'absolute',
    borderRadius: v.listBorderRadius,
    zIndex: 1000,
    maxHeight: v.listMaxHeight,
    overflowY: 'auto',
    width: p.fluid ? '100%' : v.width,
    top: 'calc(100% + 2px)', // leave room for container + its border
    background: v.listBackgroundColor,
    ...(p.isOpen && {
      boxShadow: v.listBoxShadow,
      padding: v.listPadding,
    }),
  }),

  loadingMessage: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.listItemBackgroundColor,
  }),

  noResultsMessage: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.listItemBackgroundColor,
    fontWeight: 'bold',
  }),

  toggleIndicator: ({ variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    height: v.toggleIndicatorSize,
    width: v.toggleIndicatorSize,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    right: 0,
  }),
}

export default dropdownStyles
