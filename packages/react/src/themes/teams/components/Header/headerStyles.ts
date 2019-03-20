import * as _ from 'lodash'
import { TextAlignProperty } from 'csstype'

import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { HeaderProps } from '../../../../components/Header/Header'
import { HeaderVariables } from './headerVariables'

const headerStyles: ComponentSlotStylesInput<HeaderProps, HeaderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = v.colorScheme[p.color]
    return {
      display: 'block',
      color: _.get(colors, 'borderDefault', v.color),
      textAlign: p.textAlign as TextAlignProperty,
      ...(p.description && { marginBottom: 0 }),
    }
  },
}

export default headerStyles
