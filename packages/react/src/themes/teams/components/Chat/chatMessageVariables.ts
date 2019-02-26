import { pxToRem } from '../../../../lib'

export interface ChatMessageVariables {
  actionMenuBoxShadow: string
  actionMenuPositionRight: string
  actionMenuPositionTop: string
  backgroundColor: string
  backgroundColorMine: string
  borderRadius: string
  color: string
  offset: string
  padding: string
  authorMarginRight: string
  authorFontWeight: number
  headerMarginBottom: string
  contentFocusOutlineColor: string
  border: string
  badgeShadow: string
  isImportant: boolean
  hasMention: boolean
  hasMentionColor: string
  isImportantColor: string
  badgeTextColor: string
  reactionsMarginLeft: string
}

export default (siteVars): ChatMessageVariables => ({
  actionMenuBoxShadow: siteVars.shadowLevel1,
  actionMenuPositionRight: pxToRem(5),
  actionMenuPositionTop: pxToRem(-30),
  backgroundColor: siteVars.colors.white,
  backgroundColorMine: '#E5E5F1',
  borderRadius: pxToRem(3),
  color: 'rgb(64, 64, 64)',
  offset: pxToRem(100),
  padding: pxToRem(16),
  authorMarginRight: pxToRem(12),
  authorFontWeight: siteVars.fontWeightBold,
  headerMarginBottom: pxToRem(2),
  contentFocusOutlineColor: siteVars.colors.primary[500],
  border: 'none',
  badgeShadow: siteVars.shadowLevel1Darker,
  isImportant: false,
  hasMention: false,
  hasMentionColor: siteVars.naturalColors.darkOrange[400],
  isImportantColor: siteVars.colors.red[900],
  badgeTextColor: siteVars.colors.white,
  reactionsMarginLeft: pxToRem(12),
})
