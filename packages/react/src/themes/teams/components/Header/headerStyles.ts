import * as _ from 'lodash'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { HeaderProps } from '../../../../components/Header/Header'
import { HeaderVariables } from './headerVariables'
import translateTextAlignProp from '../../../../styles/translateTextAlignProp'

const headerStyles: ComponentSlotStylesInput<HeaderProps, HeaderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = v.colorScheme[p.color]
    return {
      display: 'block',
      color: _.get(colors, 'foreground', v.color),
      textAlign: translateTextAlignProp(p.textAlign),
      ...(p.description && { marginBottom: 0 }),
    }
  },
}

export default headerStyles
