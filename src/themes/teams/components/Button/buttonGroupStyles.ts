import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IButtonGroupProps } from '../../../../components/Button/ButtonGroup'

const commonButtonsStyles = (circular: boolean) => ({
  ...(!circular && {
    margin: '0px',
    borderRadius: '0px',
  }),
})

const buttonGroupStyles: IComponentPartStylesInput = {
  root: (): ICSSInJSStyle => ({}),
  middleButton: ({ props: p }: { props: IButtonGroupProps; variables: any }) => ({
    ...commonButtonsStyles(p.circular),
  }),
  firstButton: ({ props: p, variables: v }: { props: IButtonGroupProps; variables: any }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopLeftRadius: v.defaultBorderRadius,
      borderBottomLeftRadius: v.defaultBorderRadius,
    }),
  }),
  lastButton: ({ props: p, variables: v }: { props: IButtonGroupProps; variables: any }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopRightRadius: v.defaultBorderRadius,
      borderBottomRightRadius: v.defaultBorderRadius,
    }),
  }),
}

export default buttonGroupStyles
