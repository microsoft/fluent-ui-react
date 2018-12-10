import { pxToRem } from '../../utils'

export interface ChatItemVariables {
  margin: string
  content: { margin: string }
  gutter: { margin: string }
}

export default (): ChatItemVariables => ({
  margin: pxToRem(8),
  gutter: { margin: pxToRem(10) },
  content: { margin: pxToRem(40) },
})
