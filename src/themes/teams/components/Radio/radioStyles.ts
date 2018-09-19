import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IRadioProps } from '../../../../components/Radio/Radio'

const radioStyles: IComponentPartStylesInput<IRadioProps, any> = {
  root: (): ICSSInJSStyle => ({
    outline: 0,
    display: 'inline-block',
  }),

  radio: ({ variables }): ICSSInJSStyle => ({
    marginRight: variables.radioMargin,
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
  }),

  label: ({ variables, props }): ICSSInJSStyle => ({
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
}

export default radioStyles
