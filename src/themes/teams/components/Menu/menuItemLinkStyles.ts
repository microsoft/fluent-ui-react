import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IMenuItemLinkProps } from '../../../../components/Menu/MenuItemLink'
import { IMenuVariables } from './menuVariables'

const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const menuItemLinkStyles: IComponentPartStylesInput<IMenuItemLinkProps, IMenuVariables> = {
  root: ({ props, variables: v }): ICSSInJSStyle => {
    const { active, iconOnly, isFromKeyboard, pointing, type, underlined, vertical } = props

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',

      ...(underlined
        ? { padding: `${pxToRem(4)} 0` }
        : pointing && vertical
          ? { padding: `${pxToRem(8)} ${pxToRem(18)}` }
          : { padding: `${pxToRem(14)} ${pxToRem(18)}` }),

      ...(iconOnly && {
        width: v.iconsMenuItemSize,
        height: v.iconsMenuItemSize || '100%',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      // active styles
      ...(active &&
        (type === 'primary'
          ? {
              ...(iconOnly && { color: v.typePrimaryActiveBorderColor }),

              ...(underlined && {
                color: v.typePrimaryActiveBorderColor,
                ...underlinedItem(v.typePrimaryActiveBorderColor),
              }),
            }
          : underlined && {
              fontWeight: 700,
              ...underlinedItem(v.defaultActiveColor),
            })),

      // focus styles
      ...(isFromKeyboard && {
        ...(type === 'primary'
          ? {
              ...(iconOnly && {
                color: v.typePrimaryActiveBorderColor,
                border: `1px solid ${v.typePrimaryActiveBorderColor}`,
                borderRadius: v.circularRadius,
              }),

              ...(underlined && { color: v.typePrimaryActiveColor }),

              ...(underlined && active && underlinedItem(v.typePrimaryActiveColor)),
            }
          : {
              ...(iconOnly && {
                border: `1px solid ${v.defaultActiveColor}`,
                borderRadius: v.circularRadius,
              }),

              ...(underlined && { fontWeight: 700 }),

              ...(underlined && active && underlinedItem(v.defaultActiveColor)),
            }),
      }),

      ':focus': {
        outline: 0,
      },

      // hover styles
      ':hover': {
        color: 'inherit',

        ...(type === 'primary'
          ? {
              ...(iconOnly && { color: v.typePrimaryActiveBorderColor }),
              ...(!active && underlined && underlinedItem(v.typePrimaryHoverBorderColor)),
            }
          : !active && underlined && underlinedItem(v.defaultActiveBackgroundColor)),
      },
    }
  },
}

export default menuItemLinkStyles
