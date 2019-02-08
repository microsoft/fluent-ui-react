import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownProps, DropdownState } from '../../../../components/Dropdown/Dropdown'
import { DropdownVariables } from './dropdownVariables'
import { pxToRem } from '../../../../lib'

type DropdownPropsAndState = DropdownProps & DropdownState

const transparentColorStyle: ICSSInJSStyle = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderBottomColor: 'transparent',
}

const transparentColorStyleObj: ICSSInJSStyle = {
  ...transparentColorStyle,
  ':hover': transparentColorStyle,
  ':active': transparentColorStyle,
  ':focus': {
    ...transparentColorStyle,
    ':active': transparentColorStyle,
  },
}

const getWidth = (p: DropdownPropsAndState, v: DropdownVariables): string => {
  if (p.fluid) {
    return '100%'
  }

  if (p.inline) {
    return 'initial'
  }

  return v.width
}

const dropdownStyles: ComponentSlotStylesInput<DropdownPropsAndState, DropdownVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.inline && {
      display: 'inline-flex',
    }),
  }),

  container: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderColor: 'transparent',
    outline: 0,
    width: getWidth(p, v),
    borderWidth: v.borderWidth,
    borderRadius: v.borderRadius,
    color: v.color,
    backgroundColor: v.backgroundColor,
    ...(p.focused && { borderBottomColor: v.borderColorFocus }),
    ...(p.inline && transparentColorStyleObj),
  }),

  selectedItems: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    maxHeight: v.selectedItemsMaxHeight,
    width: '100%',
    ...(p.toggleIndicator && { paddingRight: v.toggleIndicatorSize }),
  }),

  triggerButton: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      boxShadow: 'none',
      margin: '0',
      justifyContent: 'left',
      padding: v.comboboxPaddingButton,
      height: pxToRem(30),
      ...(p.multiple && { minWidth: 0, flex: 1 }),
      ...transparentColorStyleObj,
      ':focus': {
        ...transparentColorStyle,
        ':after': {
          top: '0',
          bottom: '0',
          borderColor: 'transparent',
        },
        ':active': transparentColorStyle,
      },
      ...(p.inline && {
        paddingLeft: 0,
        paddingRight: 0,
        width: 'initial',
      }),
    }
  },

  list: ({ props: p, variables: v }): ICSSInJSStyle => ({
    outline: 0,
    position: 'absolute',
    borderRadius: v.listBorderRadius,
    zIndex: 1000,
    maxHeight: v.listMaxHeight,
    overflowY: 'auto',
    width: getWidth(p, v),
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

  toggleIndicator: ({ props: p, variables: v }): ICSSInJSStyle => ({
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
