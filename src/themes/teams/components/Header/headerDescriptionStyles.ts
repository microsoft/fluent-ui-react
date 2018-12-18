import * as _ from 'lodash'

import { pxToRem } from '../../utils'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { HeaderDescriptionProps } from '../../../../components/Header/HeaderDescription'
import { HeaderDescriptionVariables } from './headerDescriptionVariables'

const headerStyles: ComponentSlotStylesInput<HeaderDescriptionProps, HeaderDescriptionVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    color: _.get(v.colors, p.color, v.color),
    fontSize: pxToRem(22),
    fontWeight: 400,
  }),
}

export default headerStyles
