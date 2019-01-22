import { RtlAttributesProvider } from './types'
import { childrenExist } from '../index'

const childrenDependentRtlAttributes: RtlAttributesProvider = (props: any) => {
  const { children } = props
  const rootRtlAttributes =
    childrenExist(children) && typeof children === 'string' ? { dir: 'auto' } : {}
  return {
    root: rootRtlAttributes,
  }
}

export default childrenDependentRtlAttributes
