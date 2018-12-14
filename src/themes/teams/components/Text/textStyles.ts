import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { TextVariables } from '../../../base/components/Text/textVariables'
import { TextProps } from '../../../../components/Text/Text'

export default {
  root: ({
    props: { atMention, disabled, error, important, success, timestamp, temporary },
    variables: v,
  }: ComponentStyleFunctionParam<TextProps, TextVariables>): ICSSInJSStyle => {
    return {
      display: 'inline-block',
      ...(atMention === true && {
        color: v.atMentionOtherColor,
      }),
      ...(atMention === 'me' && {
        color: v.atMentionMeColor,
        fontWeight: v.atMentionMeFontWeight,
      }),
      ...(disabled && { color: v.disabledColor }),
      ...(error && { color: v.errorColor }),
      ...(success && { color: v.successColor }),
      ...(temporary && { fontStyle: 'italic' }),
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
    }
  },
}
