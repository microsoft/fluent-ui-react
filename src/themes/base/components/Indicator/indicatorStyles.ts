import * as _ from 'lodash'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { IndicatorVariables } from './indicatorVariables'
import { IndicatorProps } from '@stardust-ui/react'

export default {
  root: ({
    props: { color },
    variables: v,
  }: ComponentStyleFunctionParam<IndicatorProps, IndicatorVariables>): ICSSInJSStyle => {
    return {
      ...(color && { color: _.get(v.colors, color) }),
    }
  },
}
