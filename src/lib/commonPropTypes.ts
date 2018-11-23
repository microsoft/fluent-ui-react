import * as PropTypes from 'prop-types'
import { customPropTypes } from './index'

export const styledComponentPropTypes = {
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
}

export const animatedComponentPropTypes = {
  animation: customPropTypes.animation,
}

export const commonUIComponentPropTypes = {
  ...styledComponentPropTypes,
  ...animatedComponentPropTypes,
  as: customPropTypes.as,
  className: PropTypes.string,
}

export const contentComponentPropsTypes = {
  content: customPropTypes.itemShorthand,
}

export const childrenComponentPropTypes = {
  children: PropTypes.node,
}
