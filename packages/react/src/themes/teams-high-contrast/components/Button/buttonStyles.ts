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

      // icon only text buttons need the yellow background, black text color on hover
      ...(p.iconOnly && {
        ':hover': {
          color: v.textColorIconOnly,
          backgroundColor: v.backgroundColorIconOnlyHover,
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
