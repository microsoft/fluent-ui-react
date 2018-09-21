export interface IContextualMenuVariables {
  height: string
  maxWidth: string
  defaultColumnCount: number
  contextualMenuGap?: string
  padding?: string
}

export default (): IContextualMenuVariables => ({
  height: '100%',
  maxWidth: '200px',
  defaultColumnCount: 5,
  contextualMenuGap: undefined,
  padding: undefined,
})
