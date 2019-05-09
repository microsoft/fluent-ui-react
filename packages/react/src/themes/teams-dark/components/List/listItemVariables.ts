import { ListItemVariables } from 'src/themes/teams/components/List/listItemVariables'

export default (siteVars: any): Partial<ListItemVariables> => ({
  selectedFocusOutlineColor: siteVars.colors.brand[600],
  selectableFocusHoverBackgroundColor: siteVars.colors.grey[500],
  selectedBackgroundColor: siteVars.colors.grey[500],
})
