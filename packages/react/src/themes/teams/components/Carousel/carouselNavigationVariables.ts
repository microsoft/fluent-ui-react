export interface CarouselNavigationVariables {
  color: string
  backgroundColor: string
}

export default (siteVars: any): CarouselNavigationVariables => {
  return {
    color: siteVars.colors.grey[500],
    backgroundColor: undefined,
  }
}
