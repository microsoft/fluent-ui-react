import { PxToRemFunc } from '../../../types'

export interface ChatItemVariables {
  margin: string
  gutterMargin: string
  messageMargin: string
}

export default (siteVariables, pxToRem: PxToRemFunc): ChatItemVariables => ({
  margin: pxToRem(8),
  gutterMargin: pxToRem(10),
  messageMargin: pxToRem(40),
})
