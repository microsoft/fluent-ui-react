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
    backgroundColor: siteVars.colors.grey[50], // $app-white
    borderColor: siteVars.colors.grey[250],
    color: siteVars.colors.grey[500],
    fontWeight: siteVars.fontWeightRegular,
    minHeight,
    padding: `0 0 0 ${pxToRem(16)}`,

    actionSize: minHeight,
    actionColor: undefined,

    focusInnerBorderColor: siteVars.colors.white,
    focusOuterBorderColor: siteVars.colors.black,

    dangerColor: siteVars.colors.red[400],
    dangerBackgroundColor: siteVars.colors.red[50],
    dangerBorderColor: siteVars.colors.red[100],

    oof: false,
    oofColor: siteVars.colors.pink[600],
    oofBackgroundColor: siteVars.colors.pink[50],
    oofBorderColor: siteVars.colors.pink[100],

    infoColor: siteVars.colors.grey[500],
    infoBackgroundColor: siteVars.colors.grey[150],
    infoBorderColor: siteVars.colors.grey[200],

    urgent: false,
    urgentColor: siteVars.colors.white,
    urgentBackgroundColor: siteVars.colors.red[400],
    urgentBorderColor: siteVars.colors.red[400],
  }
}
