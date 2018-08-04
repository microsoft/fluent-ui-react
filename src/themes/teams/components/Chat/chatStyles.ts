import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const chatStyles: IComponentPartStylesInput = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }),
}

export default chatStyles
