import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const radioStyles: IComponentPartStylesInput = {
  root: ({ props, variables }): ICSSInJSStyle => {
    return {
      outline: 0,
    }
  },

  radio: ({ props, variables }): ICSSInJSStyle => {
    return {
      display: 'inline-block',
      marginRight: variables.radioMargin,
    }
  },

  label: ({ props, variables }): ICSSInJSStyle => {
    return {
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: variables.fontWeight,
      minHeight: '2.5rem',
      backgroundColor: 'transparent',
    }
  },
}

export default radioStyles
