import { pxToRem } from '../../../../lib'

export interface ChatMessageVariables {
  actionMenuBoxShadow: string
  actionMenuPositionRight: string
  actionMenuPositionTop: string
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
  badgeShadow: string
  isImportant: boolean
  hasMention: boolean
  hasMentionColor: string
  isImportantColor: string
  badgeTextColor: string
}

export default (siteVars): ChatMessageVariables => ({
  actionMenuBoxShadow: siteVars.shadowLevel1,
  actionMenuPositionRight: pxToRem(5),
  actionMenuPositionTop: pxToRem(-30),
  width: '100%',
  backgroundColor: siteVars.colors.white,
  backgroundColorMine: '#E5E5F1',
  borderRadius: pxToRem(3),
  color: 'rgb(64, 64, 64)',
  padding: pxToRem(16),
  authorMarginRight: pxToRem(12),
  headerMarginBottom: pxToRem(2),
  contentFocusOutlineColor: siteVars.colors.primary[500],
  border: 'none',
  badgeShadow: siteVars.shadowLevel1Darker,
  isImportant: false,
  hasMention: false,
  hasMentionColor: siteVars.naturalColors.darkOrange[400],
  isImportantColor: siteVars.colors.red[900],
  badgeTextColor: siteVars.colors.white,
})
