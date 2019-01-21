import { RtlFunc } from '../types'
import childrenDependentRtlAttributes from '../childrenDependentRtlAttributes'

const labelRtlAttributes: RtlFunc = (props: any) => {
  return childrenDependentRtlAttributes(props)
}

export default labelRtlAttributes
