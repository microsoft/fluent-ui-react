import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'

export interface CreateCommonConfig {
  accessibility?: boolean
  animated?: boolean
  children?: boolean | 'node' | 'element'
  as?: boolean
  className?: boolean
  color?: boolean
  content?: boolean | 'node' | 'shorthand'
  styled?: boolean
}

export const createCommon = (config: CreateCommonConfig = {}) => {
  const {
    accessibility = true,
    animated = true,
    as = true,
    children = 'node',
    className = true,
    color = false,
    content = 'node',
    styled = true,
  } = config
  return {
    ...(accessibility && {
      accessibility: customPropTypes.accessibility,
    }),
    ...(animated && {
      animation: customPropTypes.animation,
    }),
    ...(as && {
      as: customPropTypes.as,
    }),
    ...(children && {
      children: children === 'element' ? PropTypes.element : PropTypes.node,
    }),
    ...(className && {
      className: PropTypes.string,
    }),
    ...(color && {
      color: PropTypes.string,
    }),
    ...(content && {
      content:
        content === 'shorthand' ? customPropTypes.itemShorthand : customPropTypes.nodeContent,
    }),
    ...(styled && {
      styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    }),
  }
}
