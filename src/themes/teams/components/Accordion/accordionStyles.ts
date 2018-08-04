import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const accordionStyles: IComponentPartStylesInput = {
  root: (): ICSSInJSStyle => ({
    verticalAlign: 'middle',
    display: 'flex',
    flexDirection: 'column',
  }),
}

export default accordionStyles
