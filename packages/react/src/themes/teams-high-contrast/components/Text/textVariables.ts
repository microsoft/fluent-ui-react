import { TeamsTextVariables } from '../../../teams/components/Text/textVariables'
import { colors } from 'src/themes/teams/siteVariables'

export default (siteVariables): Partial<TeamsTextVariables> => ({
  atMentionMeColor: siteVariables.accessibleYellow,
  atMentionOtherColor: siteVariables.accessibleYellow,
  disabledColor: siteVariables.accessibleGreen,
  errorColor: siteVariables.red,
  importantColor: siteVariables.red,
  successColor: siteVariables.colors.green[200],
  timestampColor: siteVariables.white,
  timestampHoverColor: siteVariables.white,
})
