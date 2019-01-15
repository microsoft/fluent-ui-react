import { Accessibility } from '../types'
import childrenExist from '../../childrenExist'

const defaultBehavior: Accessibility = (props: any) => {
  const { children, content } = props
  const contentElement = childrenExist(children) ? children : content
  const rtlProps = typeof contentElement === 'string' ? { dir: 'auto' } : null
  return {
    attributes: {
      root: {
        ...rtlProps,
      },
    },
  }
}

export default defaultBehavior
