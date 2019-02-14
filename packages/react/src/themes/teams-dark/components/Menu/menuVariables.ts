export interface MenuVariables {
  color: string

  verticalMenuBackgroundColor: string
  verticalMenuBoxShadow: string,
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.white,

    verticalMenuBackgroundColor: 'red',
    verticalMenuBoxShadow: siteVars.shadowLevel3,
  }
}
