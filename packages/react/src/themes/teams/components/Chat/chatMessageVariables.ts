import { pxToRem } from '../../../../lib'

export interface ChatMessageVariables {
  actionsBoxShadow: string
  actionsPositionRight: string
  actionsPositionTop: string
  width: string
  backgroundColor: string
  backgroundColorMine: string
  borderRadius: string
  color: string
  padding: string
  authorMarginRight: string
  headerMarginBottom: string
  contentFocusOutlineColor: string
  border: string
}

export default (siteVars): ChatMessageVariables => ({
  actionsBoxShadow: siteVars.shadowLevel1,
  actionsPositionRight: pxToRem(5),
  actionsPositionTop: pxToRem(-30),
  width: '100%',
  backgroundColor: siteVars.white,
  backgroundColorMine: '#E5E5F1',
  borderRadius: pxToRem(3),
  color: 'rgb(64, 64, 64)',
  padding: pxToRem(16),
  authorMarginRight: pxToRem(12),
  headerMarginBottom: pxToRem(2),
  contentFocusOutlineColor: siteVars.brand,
  border: 'none',
})
