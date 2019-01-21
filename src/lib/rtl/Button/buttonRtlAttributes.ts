import { RtlFunc } from '../types'
import childrenDependentRtlAttributes from '../childrenDependentRtlAttributes'

const buttonRtlAttributes: RtlFunc = (props: any) => {
  return childrenDependentRtlAttributes(props)
}

export default buttonRtlAttributes
