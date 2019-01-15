import * as _ from 'lodash'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { UnicodeCharacterVariables } from './unicodeCharacterVariables'
import { UnicodeCharacterProps } from '@stardust-ui/react'

export default {
  root: ({
    props: { color },
    variables: v,
  }: ComponentStyleFunctionParam<
    UnicodeCharacterProps,
    UnicodeCharacterVariables
  >): ICSSInJSStyle => {
    return {
      ...(color && { color: _.get(v.colors, color) }),
    }
  },
}
