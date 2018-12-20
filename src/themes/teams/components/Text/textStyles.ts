import * as _ from 'lodash'

import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { TeamsTextVariables } from './textVariables'
import { TextProps } from '../../../../components/Text/Text'

export default {
  root: ({
    props: { atMention, color, important, timestamp },
    variables: v,
  }: ComponentStyleFunctionParam<TextProps, TeamsTextVariables>): ICSSInJSStyle => {
    return {
      ...(atMention === 'me' && {
        color: v.atMentionMeColor,
        fontWeight: v.atMentionMeFontWeight,
      }),
      ...(timestamp && {
        color: v.timestampColor,
        ':hover': {
          color: v.timestampHoverColor,
        },
      }),
      ...(important && {
        fontWeight: v.importantWeight,
        color: v.importantColor,
      }),
      ...(color && { color: _.get(v.colors, color) }),
    }
  },
}
