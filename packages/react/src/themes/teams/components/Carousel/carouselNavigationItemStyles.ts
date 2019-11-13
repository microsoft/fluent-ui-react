import { pxToRem } from '../../../../lib'
import {
  CarouselNavigationItemProps,
  CarouselNavigationItemState,
} from '../../../../components/Carousel/CarouselNavigationItem'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { CarouselNavigationVariables } from './carouselNavigationVariables'
import { getColorScheme } from '../../colors'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

export const verticalPillsBottomMargin = pxToRem(5)
export const horizontalPillsRightMargin = pxToRem(8)
export const verticalPointingBottomMargin = pxToRem(12)

export const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

type CarouselNavigationItemPropsAndState = CarouselNavigationItemProps & CarouselNavigationItemState

const carouselNavigationItemStyles: ComponentSlotStylesPrepared<
  CarouselNavigationItemPropsAndState,
  CarouselNavigationVariables
> = {
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

    const colors = getColorScheme(v.colorScheme, null, primary)

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',
      whiteSpace: 'nowrap',

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
      ...(active && {
        ...(iconOnly && {
          color: v.iconOnlyColorActive,
          ...getIconFillOrOutlineStyles({ outline: false }),
        }),

        ...(primary
          ? {
              ...(underlined && {
                color: colors.borderActive,
                ...underlinedItem(v.borderColorActive || colors.borderActive),
              }),
            }
          : underlined && {
              fontWeight: 700,
              ...underlinedItem(v.colorActive),
            }),
      }),

      // focus styles
      ...(isFromKeyboard && {
        ...(iconOnly && {
          borderRadius: '50%',
          borderColor: v.iconOnlyColorActive,
          ...getIconFillOrOutlineStyles({ outline: false }),
        }),

        ...(primary
          ? {
              ...(iconOnly && {
                color: 'inherit',
                borderColor: v.borderColorActive || colors.borderActive,
              }),

              ...(underlined && { color: 'inherit' }),

              ...(underlined && active && underlinedItem(colors.foregroundActive)),
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

        ...(iconOnly && getIconFillOrOutlineStyles({ outline: false })),

        ...(primary
          ? {
              ...(iconOnly && { color: 'inherit' }),
              ...(!active &&
                underlined &&
                underlinedItem(v.underlinedBorderColor || colors.backgroundActive)),
            }
          : !active &&
            underlined &&
            underlinedItem(v.backgroundColorActive || colors.backgroundActive)),
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

  content: ({ props: p }): ICSSInJSStyle => {
    const widthAdjust = (p.icon ? 26 : 0) + (p.menu ? 16 : 0)
    return {
      whiteSpace: 'normal',
      lineHeight: 1.5,
      marginTop: pxToRem(-4),
      marginBottom: pxToRem(-4),
      display: 'inline-block',
      ...((p.inSubmenu || p.vertical) && {
        width: 'max-content',
        minWidth: pxToRem(46 - widthAdjust),
        maxWidth: pxToRem(262 - widthAdjust),
        marginRight: pxToRem(16),
      }),
    }
  },

  icon: ({ props: p }): ICSSInJSStyle => ({
    ...(!p.iconOnly && {
      // reduce margins so text has the dominant influence on the vertical height
      marginTop: 0,
      marginBottom: pxToRem(-8),
      verticalAlign: 'top',
    }),
  }),
}

export default carouselNavigationItemStyles
