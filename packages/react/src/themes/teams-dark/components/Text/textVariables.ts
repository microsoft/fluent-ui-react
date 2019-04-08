import { TeamsTextVariables } from '../../../teams/components/Text/textVariables'

export default (siteVariables): Partial<TeamsTextVariables> => ({
  atMentionMeColor: siteVariables.orange04,
  atMentionOtherColor: siteVariables.brand06,
  disabledColor: siteVariables.colors.grey[450],
  errorColor: siteVariables.red,
  importantColor: siteVariables.red,
  successColor: siteVariables.green04,
  timestampColor: siteVariables.colors.grey[400],
  timestampHoverColor: siteVariables.colors.grey[250],
})
