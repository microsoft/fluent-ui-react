import * as _ from 'lodash'
import { TextAlignProperty } from 'csstype'

import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { HeaderProps } from '../../../../components/Header/Header'
import { HeaderVariables } from './headerVariables'

const headerStyles: ComponentSlotStylesInput<HeaderProps, HeaderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    color: _.get(v.colors, p.color, v.color),
    textAlign: p.textAlign as TextAlignProperty,
    ...(p.description && { marginBottom: 0 }),
  }),
}

export default headerStyles
