import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { ButtonProps } from '../../../../components/Button/Button'
import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

const buttonStyles: ComponentSlotStylesPrepared<ButtonProps, ButtonVariables> = {
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
    }
  },
}

export default buttonStyles
