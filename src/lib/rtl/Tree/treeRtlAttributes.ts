import { RtlFunc } from '../types'

const treeRtlAttributes: RtlFunc = (props: any) => {
  const { children } = props
  const rootRtlAttributes = typeof children === 'string' ? { dir: 'auto' } : {}
  return {
    root: rootRtlAttributes,
  }
}

export default treeRtlAttributes
