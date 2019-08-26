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
      as: PropTypes.elementType,
    }),
    design: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        // position properties
        display: PropTypes.string,
        position: PropTypes.string,

        top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

        flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        flexBasis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        flexDirection: PropTypes.string,
        flexFlow: PropTypes.string,
        flexGrow: PropTypes.string,
        flexShrink: PropTypes.string,
        flexWrap: PropTypes.string,

        // space properties
        margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        gridGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        gridColumnGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        gridRowGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

        // size properties
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ]),
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
