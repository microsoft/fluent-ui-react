import {
  IconVariables,
  iconColorComponentAreas,
} from '../../../teams/components/Icon/iconVariables'
import { pickValuesFromColorScheme } from '../../../colorUtils'

export default (siteVars): Partial<IconVariables> => ({
  colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, iconColorComponentAreas),
  disabledColor: siteVars.colors.grey[450],
})
