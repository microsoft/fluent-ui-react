import * as PropTypes from 'prop-types'
import { customPropTypes } from './index'

export interface CreateCommonConfig {
  animated?: boolean
  children?: boolean | 'node' | 'element'
  as?: boolean
  className?: boolean
  content?: boolean | 'node' | 'shorthand'
  styled?: boolean
}

export const createCommon = (config: CreateCommonConfig = {}) => {
  const {
    animated = true,
    as = true,
    children = 'node',
    className = true,
    content = 'node',
    styled = true,
  } = config
  return {
    ...(animated && {
      animation: customPropTypes.animation,
    }),
    ...(as && {
      as: customPropTypes.as,
    }),
    ...(children && {
      children: children === true || children === 'node' ? PropTypes.node : PropTypes.element,
    }),
    ...(className && {
      className: PropTypes.string,
    }),
    ...(content && {
      content:
        content === true || content === 'node'
          ? customPropTypes.nodeContent
          : customPropTypes.itemShorthand,
    }),
    ...(styled && {
      styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    }),
  }
}
