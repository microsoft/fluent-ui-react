import { pxToRem } from '../../../../lib'

export interface ChatMessageVariables {
  message: {
    width: string
    backgroundColor: string
    backgroundColorMine: string
    borderRadius: string
    color: string
    padding: string
  }
  content: { focusOutlineColor: string }
}

export default (siteVars): ChatMessageVariables => ({
  message: {
    width: '80%',
    backgroundColor: siteVars.white,
    backgroundColorMine: '#E0E0ED',
    borderRadius: '0.3rem',
    color: 'rgb(64, 64, 64)',
    padding: pxToRem(14),
  },
  content: { focusOutlineColor: siteVars.brand },
})
