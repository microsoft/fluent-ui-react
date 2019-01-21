import { RtlFunc } from './types'
import { childrenExist } from '../index'

const childrenDependentRtlAttributes: RtlFunc = (props: any) => {
  const { children } = props
  const rootRtlAttributes =
    childrenExist(children) && typeof children === 'string' ? { dir: 'auto' } : {}
  return {
    root: rootRtlAttributes,
  }
}

export default childrenDependentRtlAttributes
