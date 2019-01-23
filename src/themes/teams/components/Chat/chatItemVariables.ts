import { pxToRem } from '../../../../lib'

export interface ChatItemVariables {
  margin: string
  gutterMargin: string
  messageMargin: string
}

export default (): ChatItemVariables => ({
  margin: pxToRem(8),
  gutterMargin: pxToRem(10),
  messageMargin: pxToRem(40),
})
