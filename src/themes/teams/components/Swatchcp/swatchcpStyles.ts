import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const swatchcpStyles: IComponentPartStylesInput = {
  root: (): ICSSInJSStyle => {
    return {
      outline: 0,
      display: 'inline-block',
    }
  },
}

export default swatchcpStyles
