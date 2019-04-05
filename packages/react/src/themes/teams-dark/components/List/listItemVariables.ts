import { ListItemVariables } from 'src/themes/teams/components/List/listItemVariables'

export default (siteVars: any): Partial<ListItemVariables> => ({
  selectableFocusHoverBackgroundColor: siteVars.colors.grey.dark08,
  selectedBackgroundColor: siteVars.colors.grey.dark08,
})
