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
        fontWeight: v.atMentionMeFontWeight,
      }),
      ...(timestamp && {
        ':hover': {
          color: v.timestampHoverColor,
        },
      }),
      ...(important && {
        fontWeight: v.importantWeight,
      }),
    }
  },
}
