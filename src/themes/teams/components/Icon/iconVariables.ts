export interface IconVariables {
  [key: string]: string | number | undefined

  color?: string
  backgroundColor?: string
  borderColor?: string
  horizontalSpace: number
  secondaryColor: string
}

export default (): IconVariables => ({
  color: undefined,
  // TODO move initial variable discovery to JSON files
  // similar to how components have an info.json file
  backgroundColor: undefined,
  borderColor: undefined,
  horizontalSpace: 15,
  secondaryColor: 'white',
})
