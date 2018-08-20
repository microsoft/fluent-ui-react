import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const radioStyles: IComponentPartStylesInput = {
  root: ({ props, variables }): ICSSInJSStyle => {
    return {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-end',
      outline: 0,
      minHeight: '2.5rem',
    }
  },

  radio: ({ props, variables }): ICSSInJSStyle => {
    return {
      display: 'inline-block',
    }
  },

  label: ({ props, variables }): ICSSInJSStyle => {
    return {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'inline-block',
      fontSize: variables.fontSize,
      fontWeight: variables.fontWeight,
      padding: 0,
      margin: variables.labelMargin,
      backgroundColor: 'transparent',
      border: 0,
    }
  },
}

export default radioStyles
