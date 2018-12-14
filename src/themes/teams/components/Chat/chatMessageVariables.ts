import { pxToRem } from '../../utils'

export interface ChatMessageVariables {
  width: string
  backgroundColor: string
  backgroundColorMine: string
  borderRadius: string
  color: string
  padding: string
  authorMargin: string
  contentFocusOutlineColor: string
  border: string
}

export default (siteVars): ChatMessageVariables => ({
  width: '80%',
  backgroundColor: siteVars.white,
  backgroundColorMine: '#E0E0ED',
  borderRadius: '0.3rem',
  color: 'rgb(64, 64, 64)',
  padding: pxToRem(14),
  authorMargin: pxToRem(10),
  contentFocusOutlineColor: siteVars.brand,
  border: 'none',
})
