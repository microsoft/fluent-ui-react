import { pxToRem } from '../../../../lib'

export interface ChatItemGutterVariables {
  margin: string
}

export default (): ChatItemGutterVariables => ({
  margin: pxToRem(10),
})
