const inputRules = {
  root: ({ props, variables }) => {
    return {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-end',
      border: variables.defaultBorder,
      borderRadius: variables.borderRadius,
      outline: 0,
      padding: variables.defaultPadding,
      backgroundColor: variables.backgroundColor,
      ':focus-within': {
        borderColor: 'transparent',
        borderBottom: variables.focusBorderBottom,
      },
    }
  },

  input: ({ props, variables }) => {
    return {
      outline: 0,
      border: 0,
      color: variables.fontColor,
      backgroundColor: variables.backgroundColor,
      height: variables.height,
      padding: variables.inputPadding,
    }
  },
}

export default inputRules
