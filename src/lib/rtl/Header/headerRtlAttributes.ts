import { RtlFunc } from '../types'
import { childrenExist } from '../../index'

const headerRtlAttributes: RtlFunc = (props: any) => {
  const { children, content, description } = props
  const contentElement = childrenExist(children) ? children : content
  const rootRtlAttributes =
    !description && typeof contentElement === 'string' ? { dir: 'auto' } : {}
  return {
    root: rootRtlAttributes,
  }
}

export default headerRtlAttributes
