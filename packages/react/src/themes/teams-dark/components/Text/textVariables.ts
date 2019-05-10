import { TeamsTextVariables } from '../../../teams/components/Text/textVariables'

export default (siteVariables): Partial<TeamsTextVariables> => ({
  atMentionMeColor: siteVariables.colors.orange[300],
  atMentionOtherColor: siteVariables.colors.brand[400],
  disabledColor: siteVariables.colors.grey[450],
  errorColor: siteVariables.colors.red[300],
  importantColor: siteVariables.colors.red[300],
  successColor: siteVariables.colors.green[200],
  timestampColor: siteVariables.colors.grey[400],
  timestampHoverColor: siteVariables.colors.grey[250],
})
