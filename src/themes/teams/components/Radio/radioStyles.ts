import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IRadioProps } from '../../../../components/Radio/Radio'

const radioStyles: IComponentPartStylesInput = {
  root: (): ICSSInJSStyle => ({
    outline: 0,
    display: 'inline-block',
  }),

  radio: ({ variables }: { props: IRadioProps; variables: any }): ICSSInJSStyle => ({
    marginRight: variables.radioMargin,
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
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

  icon: ({ variables }: { props: IRadioProps; variables: any }): ICSSInJSStyle => ({
    margin: variables.iconMargin,
  }),
}

export default radioStyles
