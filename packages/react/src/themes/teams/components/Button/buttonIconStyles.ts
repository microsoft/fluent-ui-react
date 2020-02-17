import { ComponentSlotStylesPrepared } from '@fluentui/styles'
import { ButtonIconProps } from '../../../../components/Button/ButtonIcon'

const buttonIconStyles: ComponentSlotStylesPrepared<ButtonIconProps, never> = {
  root: ({ props: p }) => ({
    // when loading, hide the icon
    ...(p.loading && {
      margin: 0,
      opacity: 0,
      width: 0,
    }),
  }),
}

export default buttonIconStyles
