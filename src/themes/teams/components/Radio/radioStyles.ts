import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IRadioProps } from '../../../../components/Radio/Radio'

const radioStyles: IComponentPartStylesInput = {
  root: (): ICSSInJSStyle => ({
    outline: 0,
    display: 'inline-block',
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
      border: '.2rem solid red', // TODO: style
    }),
  }),
}

export default radioStyles
