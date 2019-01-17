import { TeamsTextVariables } from '../../../teams/components/Text/textVariables'
import { Partial } from 'types/utils'

export default (siteVariables): Partial<TeamsTextVariables> => ({
  atMentionMeColor: siteVariables.accessibleYellow,
  atMentionOtherColor: siteVariables.accessibleYellow,
  disabledColor: siteVariables.accessibleGreen,
  errorColor: siteVariables.red,
  importantColor: siteVariables.red,
  successColor: siteVariables.green04,
  timestampColor: siteVariables.white,
  timestampHoverColor: siteVariables.white,
})
