export interface VideoVariables {
  width: number
  height: number
}

export default (): VideoVariables => ({
  width: undefined,
  height: undefined,
})
