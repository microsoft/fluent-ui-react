import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { TeamsTextVariables } from './textVariables'
import { TextProps } from '../../../../components/Text/Text'
import { getColorSchemeKey } from '../../colors'

export default {
  root: ({
    props: { atMention, color, important, timestamp },
    variables: v,
  }: ComponentStyleFunctionParam<TextProps, TeamsTextVariables>): ICSSInJSStyle => {
    const colors = v.colorScheme[getColorSchemeKey(color)]
    return {
      ...(color && { color: colors.foreground }),
      ...(atMention === 'me' && { fontWeight: v.atMentionMeFontWeight }),
      ...(timestamp && { ':hover': { color: v.timestampHoverColor } }),
      ...(important && { fontWeight: v.importantWeight }),
    }
  },
}
