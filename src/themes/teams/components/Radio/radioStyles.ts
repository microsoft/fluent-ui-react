import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IRadioProps } from '../../../../components/Radio/Radio'

const radioStyles: IComponentPartStylesInput = {
  root: (): ICSSInJSStyle => {
    return {
      outline: 0,
      display: 'inline-block',
    }
  },

  radio: ({ variables }: { props: IRadioProps; variables: any }): ICSSInJSStyle => {
    return {
      marginRight: variables.radioMargin,
    }
  },

  label: ({ variables }: { props: IRadioProps; variables: any }): ICSSInJSStyle => {
    return {
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'baseline',
      fontWeight: variables.fontWeight,
      minHeight: '2.5rem',
      backgroundColor: 'transparent',
    }
  },
}

export default radioStyles
