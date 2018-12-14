import { TextVariables } from '../../../base/components/Text/textVariables'
import { Partial } from 'types/utils'

export default (siteVariables): Partial<TextVariables> => ({
  atMentionMeColor: siteVariables.orange04,
  atMentionOtherColor: siteVariables.brand06,
  disabledColor: siteVariables.gray06,
  errorColor: siteVariables.red,
  importantColor: siteVariables.red,
  successColor: siteVariables.green04,
  timestampColor: siteVariables.gray04,
  timestampHoverColor: siteVariables.gray02,
})
