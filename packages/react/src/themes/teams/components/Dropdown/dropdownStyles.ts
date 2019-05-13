import { ComponentSlotStyle, ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import {
  default as Dropdown,
  DropdownProps,
  DropdownState,
} from '../../../../components/Dropdown/Dropdown'
import { DropdownVariables } from './dropdownVariables'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'

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

const getContainerBorderRadius = (p, v) => {
  return p.open ? v.openBorderRadius : v.borderRadius
}

const dropdownStyles: ComponentSlotStylesInput<DropdownPropsAndState, DropdownVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.inline && {
      display: 'inline-flex',
    }),
  }),

  clearIndicator: getIndicatorStyles,

  container: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: v.borderColor,
    outline: 0,
    width: getWidth(p, v),
    borderWidth: p.search ? `0 0 ${v.searchBorderBottomWidth} 0` : v.borderWidth,
    borderRadius: getContainerBorderRadius(p, v),
    color: v.color,
    backgroundColor: v.backgroundColor,
    ':hover': {
      backgroundColor: v.backgroundColorHover,
      [`& .${Dropdown.slotClassNames.triggerButton}`]: {
        // reset all styles
      },
    },
    ...(p.focused && {
      ...(p.search && { borderBottomColor: v.borderColorFocus }),
      ...(!p.search &&
        !p.open &&
        getBorderFocusStyles({
          siteVariables,
          isFromKeyboard: p.isFromKeyboard,
        })[':focus']),
    }),
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
        color: v.color,
        ...transparentColorStyle,
        ':after': {
          borderColor: 'transparent',
        },
        ':before': {
          borderColor: 'transparent',
        },
        ':active': transparentColorStyle,
      },
      ':hover': {
        ...transparentColorStyle,
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
    borderStyle: 'solid',
    borderWidth: p.open ? v.listBorderWidth : '0px',
    borderColor: v.listBorderColor,
    zIndex: 1000,
    maxHeight: v.listMaxHeight,
    overflowY: 'auto',
    width: getWidth(p, v),
    left: p.search ? '0px' : `-${v.borderWidth}`,
    top: `calc(100% + ${p.search ? v.searchBorderBottomWidth : '0px'})`, // leave room for container + its border
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
