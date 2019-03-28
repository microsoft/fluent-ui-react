import { ListItemVariables } from 'src/themes/teams/components/List/listItemVariables'

export default (siteVars: any): Partial<ListItemVariables> => ({
  selectableFocusHoverBackgroundColor: siteVars.gray08,
  selectedBackgroundColor: siteVars.gray08,
})
