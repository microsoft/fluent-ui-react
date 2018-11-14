export interface PopupVariables {
  [key: string]: string | number

  zIndex: number
}

export default (siteVars: any): PopupVariables => ({ zIndex: 1000 })
