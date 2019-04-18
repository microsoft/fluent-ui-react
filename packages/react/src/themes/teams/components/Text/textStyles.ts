import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { TeamsTextVariables } from './textVariables'
import { TextProps } from '../../../../components/Text/Text'
import { getColorScheme } from '../../colors'

export default {
  root: ({
    props: { atMention, color, important, timestamp },
    variables: v,
  }: ComponentStyleFunctionParam<TextProps, TeamsTextVariables>): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, color)
    return {
      ...(color && {
        color: colors.foregroundDefault,
      }),
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
