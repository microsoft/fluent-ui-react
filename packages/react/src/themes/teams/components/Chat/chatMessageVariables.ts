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
  authorColor: string
  authorFontWeight: number
  headerMarginBottom: string
  contentColor: string
  contentFocusOutlineColor: string
  border: string
  badgeShadow: string
  isImportant: boolean
  hasMention: boolean
  hasMentionColor: string
  hasMentionNubbinColor: string
  isImportantColor: string
  badgeTextColor: string
  reactionGroupMarginLeft: string
  timestampColorMine: string
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
  authorColor: siteVars.gray02, // will be gray[500] with new palette
  authorFontWeight: siteVars.fontWeightRegular,
  headerMarginBottom: pxToRem(2),
  contentColor: '#252423', // will be gray[750] with new palette
  contentFocusOutlineColor: siteVars.colors.primary[500],
  border: 'none',
  badgeShadow: siteVars.shadowLevel1Darker,
  isImportant: false,
  hasMention: false,
  hasMentionColor: siteVars.naturalColors.orange[900], // orange[300] when the new palette pr is checked in
  hasMentionNubbinColor: siteVars.naturalColors.darkOrange[400], // orange[400] when the new palette pr is checked in
  isImportantColor: siteVars.colors.red[900], // red[400] when the new palette pr is checked in
  badgeTextColor: siteVars.colors.white,
  reactionGroupMarginLeft: pxToRem(12),
  timestampColorMine: siteVars.gray02,
})
