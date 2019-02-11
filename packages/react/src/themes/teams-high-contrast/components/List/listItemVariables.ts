import { ListItemVariables } from '../../../teams/components/List/listItemVariables'

export default (siteVariables: any): Partial<ListItemVariables> => {
  return {
    // Selectable
    selectableFocusHoverColor: siteVariables.black,
    selectableFocusHoverBackgroundColor: siteVariables.brand02,
    selectedColor: siteVariables.white,
    selectedBackgroundColor: siteVariables.gray02,
  }
}
