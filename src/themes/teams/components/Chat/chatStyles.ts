import { IComponentStyles, ICSSInJSStyle } from '../../../../../types/theme'

const chatStyles: IComponentStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }),
}

export default chatStyles
