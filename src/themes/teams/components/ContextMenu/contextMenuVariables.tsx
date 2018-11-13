export interface IContextMenuVariables {
  height?: string
  width?: string
  padding?: string
  border?: string
}

export default (): IContextMenuVariables => ({
  height: '100%',
  width: '100%',
  padding: '0',
  // border: '1px solid #eeeeee',
})
