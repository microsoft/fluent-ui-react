import { pxToRem } from '../../utils'
import { InputVariables } from '../../../base/components/Input/inputVariables'
import { Partial } from '../../../../../types/utils'

export interface TeamsInputVariables extends InputVariables {
  boxShadow: string
  inputFocusBorderBottomColor: string
}

export default (siteVars): Partial<TeamsInputVariables> => ({
  backgroundColor: siteVars.gray10,
  boxShadow: `0 ${pxToRem(1)} 0 ${siteVars.brand}`,
  inputFocusBorderBottomColor: siteVars.brand,
})
