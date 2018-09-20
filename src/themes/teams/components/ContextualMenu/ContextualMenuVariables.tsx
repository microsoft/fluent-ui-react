export interface IContextualMenuVariables {
  height: string
  width: string
  defaultColumnCount: number
  contextualMenuGap?: string
  padding?: string
}

export default (): IContextualMenuVariables => ({
  height: '100%',
  width: '100%',
  defaultColumnCount: 5,
  contextualMenuGap: undefined,
  padding: undefined,
})
