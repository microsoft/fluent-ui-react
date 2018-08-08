const inputStyles = {
  root: ({ props, variables }) => {
    return {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-end',
      outline: 0,
    }
  },

  input: ({ props, variables }) => {
    return {
      outline: 0,
      border: 0,
      borderRadius: variables.borderRadius,
      borderBottom: variables.borderBottom,
      color: variables.fontColor,
      backgroundColor: variables.backgroundColor,
      height: variables.height,
      padding: variables.inputPadding,

      ':focus': {
        borderColor: variables.inputFocusBorderColor,
        borderRadius: variables.inputFocusBorderRadius,
      },
    }
  },

  icon: ({ props, variables }) => {
    return {
      position: variables.iconPosition,
      right: variables.iconRight,
      outline: 0,
    }
  },
}

export default inputStyles
