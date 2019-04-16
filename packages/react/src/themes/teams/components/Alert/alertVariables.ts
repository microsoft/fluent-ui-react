import { FontWeightProperty } from 'csstype'

import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared } from '../../../types'

export interface AlertVariables {
  borderStyle: string
  borderWidth: string
  borderRadius: string
  backgroundColor: string
  borderColor: string
  color: string
  fontWeight: FontWeightProperty
  minHeight: string
  padding: string

  actionSize: string
  actionColor: string

  focusInnerBorderColor: string
  focusOuterBorderColor: string

  dangerColor: string
  dangerBackgroundColor: string
  dangerBorderColor: string

  oof: boolean
  oofColor: string
  oofBackgroundColor: string
  oofBorderColor: string

  infoColor: string
  infoBackgroundColor: string
  infoBorderColor: string

  urgent: boolean
  urgentColor: string
  urgentBackgroundColor: string
  urgentBorderColor: string
}

export default (siteVars: SiteVariablesPrepared): AlertVariables => {
  const minHeight = pxToRem(28)

  return {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: pxToRem(3),
    backgroundColor: siteVars.colors.grey[50],
    borderColor: siteVars.gray06,
    color: siteVars.gray02,
    fontWeight: siteVars.fontWeightRegular,
    minHeight,
    padding: `0 0 0 ${pxToRem(16)}`,

    actionSize: minHeight,
    actionColor: undefined,

    focusInnerBorderColor: siteVars.colors.white,
    focusOuterBorderColor: siteVars.colors.black,

    dangerColor: siteVars.red,
    dangerBackgroundColor: siteVars.red10,
    dangerBorderColor: siteVars.red08,

    oof: false,
    oofColor: siteVars.orchid, // pink[600] when new color palette PR goes in
    oofBackgroundColor: '#fcf2fa', // pink[50] when new color palette PR goes in
    oofBorderColor: '#f1dfee', // pink[100] when new color palette PR goes in

    infoColor: siteVars.gray02,
    infoBackgroundColor: siteVars.gray09,
    infoBorderColor: siteVars.gray08,

    urgent: false,
    urgentColor: siteVars.colors.white,
    urgentBackgroundColor: siteVars.red,
    urgentBorderColor: siteVars.red,
  }
}
