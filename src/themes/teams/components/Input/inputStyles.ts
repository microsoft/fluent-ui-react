import { IComponentStyles, ICSSInJSStyle } from '../../../../../types/theme'

const inputStyles: IComponentStyles = {
  root: ({ props, variables }): ICSSInJSStyle => {
    return {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-end',
      border: variables.defaultBorder,
      borderRadius: variables.borderRadius,
      outline: 0,
      padding: variables.defaultPadding,
    }
  },

  input: ({ props, variables }): ICSSInJSStyle => {
    return {
      outline: 0,
      border: 0,
    }
  },
}

export default inputStyles
