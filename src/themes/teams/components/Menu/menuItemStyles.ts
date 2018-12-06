import { pxToRem } from '../../../../lib'
import { ComponentSlotStyleFunction, ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const getActionStyles = ({
  props: { primary, underlined, iconOnly, isFromKeyboard },
  variables: v,
  color,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  color: string
}): ICSSInJSStyle =>
  (underlined && !isFromKeyboard) || iconOnly
    ? {
        color,
        background: v.defaultBackgroundColor,
      }
    : primary
      ? {
          color: v.primaryActiveColor,
          background: v.primaryActiveBackgroundColor,
        }
      : {
          color,
          background: v.defaultActiveBackgroundColor,
        }

const itemSeparator: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
}): ICSSInJSStyle => {
  const { iconOnly, pointing, pills, primary, underlined, vertical } = props

  return (
    !pills &&
    !underlined &&
    !(pointing && vertical) &&
    !iconOnly && {
      '::before': {
        position: 'absolute',
        content: '""',
        top: 0,
        right: 0,
        ...(vertical ? { width: '100%', height: '1px' } : { width: '1px', height: '100%' }),
        ...(primary ? { background: v.primaryBorderColor } : { background: v.defaultBorderColor }),
      },

      ...(vertical && {
        ':first-child': {
          '::before': {
            display: 'none',
          },
        },
      }),
    }
  )
}

const pointingBeak: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
}): ICSSInJSStyle => {
  const { pointing, primary } = props

  let backgroundColor: string
  let borderColor: string
  let top: string
  let borders: ICSSInJSStyle

  if (primary) {
    backgroundColor = v.primaryActiveBackgroundColor
    borderColor = v.primaryBorderColor
  } else {
    backgroundColor = v.defaultActiveBackgroundColor
    borderColor = v.defaultBorderColor
  }

  if (pointing === 'start') {
    borders = {
      borderTop: `1px solid ${borderColor}`,
      borderLeft: `1px solid ${borderColor}`,
    }
    top = '-1px' // 1px for the border
  } else {
    borders = {
      borderBottom: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`,
    }
    top = '100%'
  }

  return {
    '::after': {
      visibility: 'visible',
      background: backgroundColor,
      position: 'absolute',
      content: '""',
      top,
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
      margin: '.5px 0 0',
      width: pxToRem(10),
      height: pxToRem(10),
      border: 'none',
      ...borders,
      zIndex: 2,
      transition: 'background .1s ease',
    },
  }
}

const menuItemStyles: ComponentSlotStylesInput<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props, variables: v, theme }): ICSSInJSStyle => {
    const {
      active,
      iconOnly,
      isFromKeyboard,
      pills,
      pointing,
      secondary,
      underlined,
      vertical,
    } = props

    return {
      color: v.defaultColor,
      background: v.defaultBackgroundColor,
      lineHeight: 1,
      position: 'relative',
      verticalAlign: 'middle',
      display: 'block',

      ...(secondary && {
        background: 'salmon',
      }),

      ...(pills && {
        ...(vertical ? { margin: `0 0 ${pxToRem(5)} 0` } : { margin: `0 ${pxToRem(8)} 0 0` }),
        borderRadius: pxToRem(5),
      }),

      ...(underlined && {
        display: 'flex',
        alignItems: 'center',
        height: pxToRem(29),
        lineHeight: v.lineHeightBase,
        padding: `0 ${pxToRem(4)}`,
        margin: `0 ${pxToRem(4)} 0 0`,
        ':nth-child(n+2)': {
          marginLeft: `${pxToRem(4)}`,
        },
        boxShadow: 'none',
      }),

      ...(pointing &&
        vertical && {
          borderTopLeftRadius: `${pxToRem(3)}`,
          borderTopRightRadius: `${pxToRem(3)}`,
          ...(pointing === 'end'
            ? { borderRight: `${pxToRem(3)} solid transparent` }
            : { borderLeft: `${pxToRem(3)} solid transparent` }),
          marginBottom: `${pxToRem(12)}`,
        }),

      ...(iconOnly && {
        display: 'flex',
      }),

      ...itemSeparator({ props, variables: v, theme }),

      // active styles
      ...(active && {
        ...getActionStyles({ props, variables: v, color: v.defaultColor }),

        ...(pointing &&
          (vertical
            ? pointing === 'end'
              ? { borderRight: `${pxToRem(3)} solid ${v.primaryActiveBorderColor}` }
              : { borderLeft: `${pxToRem(3)} solid ${v.primaryActiveBorderColor}` }
            : pointingBeak({ props, variables: v, theme }))),
      }),

      // focus styles
      ...(isFromKeyboard && getActionStyles({ props, variables: v, color: v.defaultActiveColor })),

      // hover styles
      ':hover': getActionStyles({ props, variables: v, color: v.defaultActiveColor }),
    }
  },

  root: ({ props, variables: v }): ICSSInJSStyle => {
    const { active, iconOnly, isFromKeyboard, pointing, primary, underlined, vertical } = props

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',

      ...(((pointing && vertical) || iconOnly) && { border: '1px solid transparent' }),

      ...(underlined
        ? { padding: `${pxToRem(4)} 0` }
        : pointing && vertical
          ? { padding: `${pxToRem(8)} ${pxToRem(18)}` }
          : { padding: `${pxToRem(14)} ${pxToRem(18)}` }),

      ...(iconOnly && {
        padding: pxToRem(8),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      // active styles
      ...(active &&
        (primary
          ? {
              ...(iconOnly && { color: v.primaryActiveBorderColor }),

              ...(underlined && {
                color: v.primaryActiveBorderColor,
                ...underlinedItem(v.primaryActiveBorderColor),
              }),
            }
          : underlined && {
              fontWeight: 700,
              ...underlinedItem(v.defaultActiveColor),
            })),

      // focus styles
      ...(isFromKeyboard && {
        ...(primary
          ? {
              ...(iconOnly && {
                color: v.primaryActiveBorderColor,
                border: `1px solid ${v.primaryActiveBorderColor}`,
                borderRadius: v.circularRadius,
              }),

              ...(underlined && { color: v.primaryActiveColor }),

              ...(underlined && active && underlinedItem(v.primaryActiveColor)),
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

        ...(primary
          ? {
              ...(iconOnly && { color: v.primaryActiveBorderColor }),
              ...(!active && underlined && underlinedItem(v.primaryHoverBorderColor as string)),
            }
          : !active && underlined && underlinedItem(v.defaultActiveBackgroundColor)),
      },
    }
  },
}

export default menuItemStyles
