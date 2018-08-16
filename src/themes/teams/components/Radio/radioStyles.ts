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
      // margin: '4px 0 0',
    }
  },

  label: ({ props, variables }): ICSSInJSStyle => {
    return {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'inline-block',
      fontSize: '1.2rem',
      fontWeight: 400,
      padding: 0,
      margin: '0 5px',
      backgroundColor: 'transparent',
      border: 0,
    }
  },
}

export default radioStyles
