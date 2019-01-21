import { RtlFunc } from '../types'
import childrenDependentRtlAttributes from '../childrenDependentRtlAttributes'

const menuRtlAttributes: RtlFunc = (props: any) => {
  return childrenDependentRtlAttributes(props)
}

export default menuRtlAttributes
