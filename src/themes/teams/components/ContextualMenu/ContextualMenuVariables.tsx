export interface IContextualMenuVariables {
  height: string
  maxWidth: string
  padding?: string
  border?: string
}

export default (): IContextualMenuVariables => ({
  height: '100%',
  maxWidth: '220px',
  padding: '0',
  border: '1px solid #eeeeee',
})
