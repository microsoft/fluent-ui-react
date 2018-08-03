import { IComponentStyles, ICSSInJSStyle } from '../../../../../types/theme'

const accordionStyles: IComponentStyles = {
  root: (): ICSSInJSStyle => ({
    verticalAlign: 'middle',
    display: 'flex',
    flexDirection: 'column',
  }),
}

export default accordionStyles
