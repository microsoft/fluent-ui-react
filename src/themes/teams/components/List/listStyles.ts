import { debugRoot } from '../../../../styles/debugStyles'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IListProps } from '../../../../components/List/List'

const listStyles: IComponentPartStylesInput<IListProps> = {
  root: ({ props }): ICSSInJSStyle => {
    const { as, debug } = props
    return {
      ...(debug && debugRoot()),
      ...((as === 'ul' || as === 'ol') && {
        listStyle: 'none',
        display: 'block',
        padding: 0,
        margin: 0,
      }),
    }
  },
}

export default listStyles
