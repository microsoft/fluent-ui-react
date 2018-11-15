import * as PropTypes from 'prop-types'
import { customPropTypes } from './index'

export const styledComponentPropTypes = {
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
}

export const commonUIComponentPropTypes = {
  ...styledComponentPropTypes,
  as: customPropTypes.as,
  className: PropTypes.string,
}

export const contentComponentPropsTypes = {
  content: customPropTypes.contentShorthand,
}

export const childrenComponentPropTypes = {
  children: PropTypes.node,
}
