import { ListItemVariables } from 'src/themes/teams/components/List/listItemVariables'

export default (siteVars: any): Partial<ListItemVariables> => ({
  selectedColor: siteVars.colors.black,
  selectedBackgroundColor: siteVars.accessibleCyan,

  selectableFocusHoverBackgroundColor: siteVars.accessibleYellow,
  selectableFocusHoverColor: siteVars.colors.black,
})
