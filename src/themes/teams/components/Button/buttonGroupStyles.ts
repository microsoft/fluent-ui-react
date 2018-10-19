import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { ButtonGroupProps } from '../../../../components/Button/ButtonGroup'

const commonButtonsStyles = (circular: boolean) => ({
  ...(!circular && {
    margin: '0px',
    borderRadius: '0px',
  }),
})

const buttonGroupStyles: ComponentSlotStylesInput<ButtonGroupProps, any> = {
  root: (): ICSSInJSStyle => ({}),
  middleButton: ({ props: p }) => ({
    ...commonButtonsStyles(p.circular),
  }),
  firstButton: ({ props: p, variables: v }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopLeftRadius: v.borderRadius,
      borderBottomLeftRadius: v.borderRadius,
    }),
  }),
  lastButton: ({ props: p, variables: v }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopRightRadius: v.borderRadius,
      borderBottomRightRadius: v.borderRadius,
    }),
  }),
}

export default buttonGroupStyles
