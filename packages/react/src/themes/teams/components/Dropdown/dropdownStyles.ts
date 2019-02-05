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
    backgroundColor: v.backgroundColor,
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderWidth: v.borderWidth,
    borderRadius: v.borderRadius,
    color: v.color,
    width: p.fluid ? '100%' : v.width,
    position: 'relative',
    ...(p.focused && { borderBottomColor: v.borderColorFocus }),
  }),

  selectedItems: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    maxHeight: v.selectedItemsMaxHeight,
    width: '100%',
    ...(p.toggleIndicator && { paddingRight: v.toggleIndicatorSize }),
  }),

  button: ({ props: p, variables: v }): ICSSInJSStyle => {
    const transparentColorStyle = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    }
    return {
      boxShadow: 'none',
      margin: '0',
      justifyContent: 'left',
      padding: v.comboboxPaddingButton,
      height: pxToRem(30),
      ...transparentColorStyle,
      ...(p.multiple && { minWidth: 0, flex: 1 }),
      ':hover': transparentColorStyle,
      ':focus': {
        ...transparentColorStyle,
        ':after': {
          top: '0',
          bottom: '0',
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
    right: pxToRem(5),
  }),
}

export default dropdownStyles
