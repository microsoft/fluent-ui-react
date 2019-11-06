import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { ButtonProps } from '../../../../components/Button/Button'
import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'
import { ButtonHighContrastVariables } from './buttonVariables'

const buttonStyles: ComponentSlotStylesPrepared<
  ButtonProps,
  ButtonVariables & ButtonHighContrastVariables
> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      // rectangular button defaults
      ...(!p.text && {
        ':focus-visible': {
          backgroundColor: v.backgroundColorFocus,
          color: v.colorHover,
          borderColor: 'transparent',

          '&:hover': {
            color: v.colorHover,
            backgroundColor: v.backgroundColorHover,
            borderColor: 'transparent',
          },
        },
      }),

      // Overrides for "primary" buttons
      ...(p.primary &&
        !p.text && {
          ':focus-visible': {
            backgroundColor: v.primaryBackgroundColorFocus,

            '&:hover': {
              color: v.primaryColorHover,
              backgroundColor: v.primaryBackgroundColorHover,
            },
          },
        }),

      ...(p.secondaryAlt && {
        ':active': {
          color: v.secondaryAltColorHover,
        },

        ':hover': {
          color: v.secondaryAltColorHover,
          borderColor: v.secondaryAltBorderColorHover,
        },

        ':focus-visible': {
          backgroundColorFocus: siteVariables.accessibleCyan,
          color: v.secondaryAltColorFocusVisible,
        },
      }),
    }
  },
}

export default buttonStyles
