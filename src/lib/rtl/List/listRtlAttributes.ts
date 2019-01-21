import { RtlFunc } from '../types'
import childrenDependentRtlAttributes from '../childrenDependentRtlAttributes'

const listRtlAttributes: RtlFunc = (props: any) => {
  return childrenDependentRtlAttributes(props)
}

export default listRtlAttributes
