import { pxToRem } from '../../../../lib'
import { CarouselNavigationItemProps } from '../../../../components/Carousel/CarouselNavigationItem'
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

type CarouselNavigationItemPropsAndState = CarouselNavigationItemProps

const carouselNavigationItemStyles: ComponentSlotStylesPrepared<
  CarouselNavigationItemPropsAndState,
  CarouselNavigationVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { active, iconOnly, primary, vertical } = p

    const colors = getColorScheme(v.colorScheme, null, primary)

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',
      whiteSpace: 'nowrap',

      ...(iconOnly && {
        border: `${pxToRem(2)} solid transparent`,
      }),

      ...(vertical
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
        iconOnly && {
          color: v.iconOnlyColorActive,
          ...getIconFillOrOutlineStyles({ outline: false }),
        }),

      // focus styles
      ':focus-visible': {
        ...(iconOnly && {
          borderRadius: '50%',
          borderColor: v.iconOnlyColorActive,
          ...getIconFillOrOutlineStyles({ outline: false }),
        }),
      },

      ...(iconOnly &&
        primary && {
          color: 'inherit',
          borderColor: v.borderColorActive || colors.borderActive,
        }),

      ':focus': {
        outline: 0,
      },

      // hover styles
      ':hover': {
        color: 'inherit',

        ...(iconOnly && getIconFillOrOutlineStyles({ outline: false })),

        ...(primary && iconOnly && { color: 'inherit' }),
      },
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
