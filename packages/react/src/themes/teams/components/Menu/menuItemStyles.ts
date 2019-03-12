import { pxToRem } from '../../../../lib'
import { ComponentSlotStyleFunction, ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'
import { teamsIconClassNames } from '../Icon/svg'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

export const verticalPillsBottomMargin = pxToRem(5)
export const horizontalPillsRightMargin = pxToRem(8)
export const verticalPointingBottomMargin = pxToRem(12)

const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const getActionStyles = ({
  props: { primary, underlined, iconOnly },
  variables: v,
  color,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  color: string
}): ICSSInJSStyle =>
  underlined || iconOnly
    ? {
        color,
      }
    : primary
    ? {
        color: 'inherit',
        background: v.backgroundColorActive,
      }
    : {
        color,
        background: v.backgroundColorActive,
      }

const getFocusedStyles = ({
  props,
  variables: v,
  color,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  color: string
}): ICSSInJSStyle => {
  const { primary, underlined, isFromKeyboard, active, vertical, pointing } = props
  if (active && !underlined && !vertical) return {}
  return {
    ...(underlined && !isFromKeyboard
      ? {
          color,
        }
      : primary
      ? {
          color: 'inherit',
          background: v.backgroundColorFocus,
        }
      : {
          color,
          background: v.backgroundColorHover,
        }),

    ...(vertical && isFromKeyboard && !pointing && !primary
      ? {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: v.borderColorFocus,
          outlineWidth: 1,
          outlineStyle: 'solid',
          outlineColor: v.outlineFocus,
          margin: pxToRem(1),
          background: v.backgroundColorFocus,
        }
      : {}),
  }
}

const itemSeparator: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
}): ICSSInJSStyle => {
  const { iconOnly, pills, primary, underlined, vertical } = props

  return (
    !vertical &&
    !pills &&
    !underlined &&
    !iconOnly && {
      '::before': {
        position: 'absolute',
        content: '""',
        top: 0,
        right: 0,
        width: pxToRem(1),
        height: '100%',
        ...(primary ? { background: v.borderColor } : { background: v.borderColor }),
      },
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
    backgroundColor = v.backgroundColorActive
    borderColor = v.borderColor
  } else {
    backgroundColor = v.backgroundColorActive
    borderColor = v.borderColor
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
  wrapper: ({ props, variables: v, theme, colors }): ICSSInJSStyle => {
    const {
      active,
      disabled,
      iconOnly,
      isFromKeyboard,
      pills,
      pointing,
      secondary,
      underlined,
      vertical,
    } = props

    return {
      color: 'inherit',
      lineHeight: 1,
      position: 'relative',
      verticalAlign: 'middle',
      display: 'block',

      ...(secondary && {
        background: 'salmon',
      }),

      ...(vertical && {
        border: v.verticalItemBorder,
      }),

      ...(pills && {
        ...(vertical
          ? { margin: `0 0 ${verticalPillsBottomMargin} 0` }
          : { margin: `0 ${horizontalPillsRightMargin} 0 0` }),
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
          marginBottom: verticalPointingBottomMargin,
        }),

      ...itemSeparator({ props, variables: v, theme, colors }),

      // active styles
      ...(active && {
        ...getActionStyles({ props, variables: v, color: 'inherit' }),

        ...(pointing &&
          (vertical
            ? pointing === 'end'
              ? { borderRight: `${pxToRem(3)} solid ${v.borderColorActive}` }
              : { borderLeft: `${pxToRem(3)} solid ${v.borderColorActive}` }
            : pointingBeak({ props, variables: v, theme, colors }))),
      }),

      ...(iconOnly && {
        display: 'flex',

        // focus styles
        ...(isFromKeyboard && {
          color: 'inherit',
        }),

        // hover styles
        ':hover': {
          color: 'inherit',
        },
      }),

      ...(!iconOnly && {
        // focus styles
        ...(isFromKeyboard && getFocusedStyles({ props, variables: v, color: 'inherit' })),

        // hover styles
        ':hover': getFocusedStyles({ props, variables: v, color: 'inherit' }),
      }),

      ':first-child': {
        ...(!pills &&
          !iconOnly &&
          !(pointing && vertical) &&
          !underlined && {
            ...(vertical && {
              '::before': {
                display: 'none',
              },
            }),
            ...(!vertical && {
              borderBottomLeftRadius: pxToRem(3),
              borderTopLeftRadius: pxToRem(3),
            }),
          }),
      },

      ...(disabled && {
        color: 'inherit',
        ':hover': {
          // empty - overwrite all existing hover styles
        },
      }),
    }
  },

  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const {
      active,
      iconOnly,
      isFromKeyboard,
      pointing,
      primary,
      underlined,
      vertical,
      disabled,
    } = p

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',

      ...(pointing &&
        vertical && {
          border: '1px solid transparent',
        }),

      ...(iconOnly && {
        border: `${pxToRem(2)} solid transparent`,
      }),

      ...(underlined
        ? { padding: `${pxToRem(4)} 0` }
        : pointing && vertical
        ? { padding: `${pxToRem(8)} ${pxToRem(18)}` }
        : vertical
        ? { padding: v.verticalItemPadding }
        : {
            padding: v.horizontalPadding,
          }),

      ...(iconOnly && {
        margin: pxToRem(1),
        padding: pxToRem(5), // padding works this way to get the border to only be 30x30px on focus which is the current design
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      // active styles
      ...(active &&
        (primary
          ? {
              ...(iconOnly && { color: 'inherit' }),

              ...(underlined && {
                color: 'inherit',
                ...underlinedItem(v.borderColorActive),
              }),
            }
          : underlined && {
              fontWeight: 700,
              ...underlinedItem(v.colorActive),
            })),

      // focus styles
      ...(isFromKeyboard && {
        ...(iconOnly && {
          borderRadius: '50%',
          borderColor: v.iconOnlyColorActive,

          [`& .${teamsIconClassNames.filled}`]: {
            display: 'block',
          },

          [`& .${teamsIconClassNames.outline}`]: {
            display: 'none',
          },
        }),

        ...(primary
          ? {
              ...(iconOnly && {
                color: 'inherit',
                borderColor: v.borderColorActive,
              }),

              ...(underlined && { color: 'inherit' }),

              ...(underlined && active && underlinedItem(v.colorActive)),
            }
          : {
              ...(underlined && { fontWeight: 700 }),

              ...(underlined && active && underlinedItem(v.colorActive)),
            }),
      }),

      ':focus': {
        outline: 0,
      },

      // hover styles
      ':hover': {
        color: 'inherit',

        ...(iconOnly && {
          [`& .${teamsIconClassNames.filled}`]: {
            display: 'block',
          },

          [`& .${teamsIconClassNames.outline}`]: {
            display: 'none',
          },
        }),

        ...(primary
          ? {
              ...(iconOnly && { color: 'inherit' }),
              ...(!active && underlined && underlinedItem(v.borderColorHover as string)),
            }
          : !active && underlined && underlinedItem(v.backgroundColorActive)),
      },

      ...(disabled && {
        cursor: 'default',
        ':hover': {
          // reset all existing hover styles
          color: 'inherit',
        },
      }),
    }
  },

  menu: ({ props: p }) => ({
    zIndex: '1000',
    position: 'absolute',
    top: p.vertical ? '0' : '100%',
    left: p.vertical ? '100%' : '0',
  }),

  indicator: () => ({
    position: 'relative',
    float: 'right',
    left: pxToRem(10),
    userSelect: 'none',
  }),
}

export default menuItemStyles
