import { RtlAttributesProvider } from './types'
import { childrenExist } from '../index'

const defaultRtlAttributes: RtlAttributesProvider = (props: any) => {
  const { children, content } = props
  const contentElement = childrenExist(children) ? children : content
  const rootRtlAttributes = typeof contentElement === 'string' ? { dir: 'auto' } : {}
  return {
    root: rootRtlAttributes,
  }
}

export default defaultRtlAttributes
