import { pxToRem } from '../../../../lib'

export interface ChatItemVariables {
  margin: string
}

export default (): ChatItemVariables => ({
  margin: pxToRem(8),
})
