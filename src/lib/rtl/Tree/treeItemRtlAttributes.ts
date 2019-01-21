import { RtlFunc } from '../types'

const treeItemRtlAttributes: RtlFunc = (props: any) => {
  const { children } = props
  const rootRtlAttributes = typeof children === 'string' ? { dir: 'auto' } : {}
  return {
    root: rootRtlAttributes,
  }
}

export default treeItemRtlAttributes
