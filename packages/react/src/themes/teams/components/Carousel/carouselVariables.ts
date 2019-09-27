export interface CarouselVariables {
  width: number
  height: number
  buttonPreviousSize: number
  buttonNextSize: number
}

export default (siteVars): CarouselVariables => ({
  width: 300,
  height: 300,
  buttonPreviousSize: 32,
  buttonNextSize: 32,
})
