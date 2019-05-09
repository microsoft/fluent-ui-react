import { ComponentSlotStyle, ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
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

const getIndicatorStyles: ComponentSlotStyle<DropdownPropsAndState, DropdownVariables> = ({
  variables: v,
}): ICSSInJSStyle => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',

  backgroundColor: 'transparent',
  cursor: 'pointer',
  userSelect: 'none',

  margin: 0,
  position: 'absolute',
  right: pxToRem(5),
  height: v.toggleIndicatorSize,
  width: v.toggleIndicatorSize,
})

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

  clearIndicator: getIndicatorStyles,

  container: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: 'transparent',
    outline: 0,
    width: getWidth(p, v),
    borderWidth: v.borderWidth,
    borderRadius: v.borderRadius,
    color: v.color,
    backgroundColor: v.backgroundColor,
    ...(p.focused && { borderBottomColor: v.borderColorFocus }),
    ...(p.inline && {
      ...transparentColorStyleObj,
      alignItems: 'center',
    }),
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
    background: v.listBackgroundColor,
    ...(p.open && {
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

  toggleIndicator: getIndicatorStyles,
}

export default dropdownStyles
