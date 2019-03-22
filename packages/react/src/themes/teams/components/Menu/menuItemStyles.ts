import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
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
  props: { primary, underlined, iconOnly, color },
  variables: v,
  colorScheme,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  colorScheme: any
}): ICSSInJSStyle =>
  underlined || iconOnly
    ? {
        color: v.color,
      }
    : primary || color
    ? {
        color: colorScheme.foregroundActive,
        background: v.backgroundColorActive || colorScheme.backgroundActive,
      }
    : {
        color: v.color,
        background: v.backgroundColorActive || colorScheme.backgroundActive,
      }

const getFocusedStyles = ({
  props,
  variables: v,
  colorScheme,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  colorScheme: any
}): ICSSInJSStyle => {
  const { primary, color, underlined, isFromKeyboard, active, vertical, pointing } = props
  if (active && !underlined && !vertical) return {}
  return {
    color: primary || color ? colorScheme.foregroundFocus : v.colorActive,
    background: v.backgroundColorFocus || colorScheme.backgroundFocus,
    ...(vertical && isFromKeyboard && !pointing && !primary
      ? {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: v.borderColorFocus,
          outlineWidth: 1,
          outlineStyle: 'solid',
          outlineColor: v.outlineFocus,
          margin: pxToRem(1),
          background: v.backgroundColorFocus || colorScheme.backgroundFocus,
        }
      : {}),
  }
}

const getHoverStyles = ({
  props,
  variables: v,
  colorScheme,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  colorScheme: any
}): ICSSInJSStyle => {
  const { primary, underlined, active, vertical, color } = props
  if (active && !underlined && !vertical) return {}
  return {
    ...(underlined
      ? {
          color: v.colorActive,
        }
      : primary || color
      ? {
          color: colorScheme.foregroundHover,
          background: v.backgroundColorHover || colorScheme.backgroundHover,
        }
      : {
          color: v.colorActive,
          background: v.backgroundColorHover || colorScheme.backgroundHover,
        }),
  }
}

const itemSeparator = ({ props, variables: v, theme, colorScheme }): ICSSInJSStyle => {
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
        ...(primary
          ? { background: v.primaryBorderColor /* TODO: check this again */ }
          : { background: v.borderColor || colorScheme.borderDefault }),
      },
    }
  )
}

const pointingBeak = ({ props, variables: v, colorScheme }): ICSSInJSStyle => {
  const { pointing } = props

  let top: string
  let borders: ICSSInJSStyle

  const backgroundColor = v.backgroundColorActive || colorScheme.backgroundActive
  const borderColor = v.borderColor

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
      disabled,
      iconOnly,
      isFromKeyboard,
      pills,
      pointing,
      secondary,
      underlined,
      vertical,
      color,
      primary,
    } = props

    const colorScheme = v.colorScheme[color ? color : primary ? 'primary' : 'default']

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
        border: `solid ${v.verticalItemBorderWidth} ${v.verticalItemBorderColor}`,
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

      ...itemSeparator({ props, variables: v, theme, colorScheme }),

      // active styles
      ...(active && {
        ...getActionStyles({ props, variables: v, colorScheme }),

        ...(pointing &&
          (vertical
            ? pointing === 'end'
              ? {
                  borderRight: `${pxToRem(3)} solid ${v.verticalPointingBorderColor ||
                    colorScheme.borderActive}`,
                }
              : {
                  borderLeft: `${pxToRem(3)} solid ${v.verticalPointingBorderColor ||
                    colorScheme.borderActive}`,
                }
            : pointingBeak({ props, variables: v, colorScheme }))),
      }),

      ...(iconOnly && {
        display: 'flex',

        // focus styles
        ...(isFromKeyboard && {
          color: v.iconOnlyColorActive,
        }),

        // hover styles
        ':hover': {
          color: v.iconOnlyColorActive,
        },
      }),

      ...(!iconOnly && {
        // focus styles
        ...(isFromKeyboard && getFocusedStyles({ props, variables: v, colorScheme })),

        // hover styles
        ':hover': getHoverStyles({ props, variables: v, colorScheme }),
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
        color: v.colorDisabled,
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
      color,
    } = p

    const colorScheme = v.colorScheme[color ? color : primary ? 'primary' : 'grey']

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
        (primary || color
          ? {
              ...(iconOnly && { color: 'inherit' }),

              ...(underlined && {
                color: colorScheme.borderActive,
                ...underlinedItem(v.borderColorActive || colorScheme.borderActive),
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

        ...(primary || color
          ? {
              ...(iconOnly && {
                color: 'inherit',
                borderColor: v.borderColorActive || colorScheme.borderActive,
              }),

              ...(underlined && { color: 'inherit' }),

              ...(underlined && active && underlinedItem(colorScheme.foregroundActive)),
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
              ...(!active &&
                underlined &&
                underlinedItem(v.underlinedBorderColor || colorScheme.backgroundActive)),
            }
          : !active &&
            underlined &&
            underlinedItem(v.backgroundColorActive || colorScheme.backgroundActive)),
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
