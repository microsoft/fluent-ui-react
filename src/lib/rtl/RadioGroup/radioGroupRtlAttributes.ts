import { RtlFunc } from '../types'
import childrenDependentRtlAttributes from '../childrenDependentRtlAttributes'

const radioGroupRtlAttributes: RtlFunc = (props: any) => {
  return childrenDependentRtlAttributes(props)
}

export default radioGroupRtlAttributes
