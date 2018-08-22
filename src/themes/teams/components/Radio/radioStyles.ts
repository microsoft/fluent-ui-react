import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const radioStyles: IComponentPartStylesInput = {
  root: ({ props, variables }): ICSSInJSStyle => {
    return {
      outline: 0,
      display: 'inline-block',
    }
  },

  radio: ({ props, variables }): ICSSInJSStyle => {
    return {
      marginRight: variables.radioMargin,
    }
  },

  label: ({ props, variables }): ICSSInJSStyle => {
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
