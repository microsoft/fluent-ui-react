import * as _ from 'lodash'

import { pxToRem } from '../../utils'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { HeaderProps } from '../../../../components/Header/Header'
import { HeaderVariables } from './headerVariables'

const headerStyles: ComponentSlotStylesInput<HeaderProps, HeaderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    color: _.get(v.colors, p.color, v.color),
    fontSize: pxToRem(22),
    fontWeight: 400,
  }),
}

export default headerStyles
