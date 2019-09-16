import { pxToRem } from '../../../../lib'

export interface ChatGutterVariables {
  margin: string
}

export default (): ChatGutterVariables => ({
  margin: pxToRem(10),
})
