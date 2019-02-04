import { ListItemVariables } from '../../../teams/components/List/listItemVariables'
import { Partial } from 'types/utils'

export default (siteVariables: any): Partial<ListItemVariables> => {
  return {
    // Selectable
    selectableFocusHoverColor: siteVariables.black,
    selectableFocusHoverBackgroundColor: siteVariables.brand02,
    selectedColor: siteVariables.white,
    selectedBackgroundColor: siteVariables.gray02,
  }
}
