import * as PropTypes from 'prop-types'
import { customPropTypes } from './index'

export interface CreateCommonConfig {
  animated?: boolean
  children?: boolean | 'element'
  as?: boolean
  className?: boolean
  content?: boolean | 'shorthand'
  styled?: boolean
}

export const createCommon = (config: CreateCommonConfig = {}) => {
  const {
    animated = true,
    as = true,
    children = true,
    className = true,
    content = true,
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
      children: children === true ? PropTypes.node : PropTypes.element,
    }),
    ...(className && {
      className: PropTypes.string,
    }),
    ...(content && {
      content: content === true ? customPropTypes.contentShorthand : customPropTypes.itemShorthand,
    }),
    ...(styled && {
      styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    }),
  }
}
