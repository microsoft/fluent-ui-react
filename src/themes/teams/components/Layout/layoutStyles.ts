import { debugRoot } from '../../../../styles/debugStyles'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'

const layoutStyles: IComponentPartStylesInput = {
  root: ({ props }): ICSSInJSStyle => {
    const { debug, vertical } = props

    return {
      ...(debug && debugRoot()),
      display: 'flex',
      ...(vertical && {
        flexDirection: 'column',
      }),
    }
  },
}

export default layoutStyles
