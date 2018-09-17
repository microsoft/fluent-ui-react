import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IRadioProps } from '../../../../components/Radio/Radio'
import { pxToRem } from '../../../../lib'

const radioStyles: IComponentPartStylesInput = {
  root: ({ variables, props }: { props: IRadioProps; variables: any }): ICSSInJSStyle => ({
    outline: 0,
    ...(!props.vertical && {
      display: 'inline-block',
    }),
  }),

  label: ({ variables, props }: { props: IRadioProps; variables: any }): ICSSInJSStyle => ({
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'baseline',
    fontWeight: variables.fontWeight,
    minHeight: '2.5rem',
    backgroundColor: 'transparent',
    ...(props.disabled && {
      color: variables.disabledColor,
    }),
  }),

  icon: ({ props, variables }: { props: IRadioProps; variables: any }): ICSSInJSStyle => ({
    ...(props.isFromKeyboard && {
      // this creates both inset and outset box shadow that some readers (NVDA) show when radio is not checked but it is focused
      boxShadow:
        `0 0 0 ${pxToRem(1)} ${variables.icon.outlineColor},` +
        `0 0 0 ${pxToRem(2)} ${variables.icon.outlineColor} inset`,
    }),
  }),
}

export default radioStyles
