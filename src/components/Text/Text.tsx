import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'

import { Extendable } from '../../../types/utils'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'

export interface ITextProps {
  as: any
  atMention: boolean
  className: string
  content: any
  disabled: boolean
  error: boolean
  important: boolean
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2x' | '3x' | '4x'
  weight: 'light' | 'semilight' | 'regular' | 'semibold' | 'bold'
  success: boolean
  timestamp: boolean
  truncated: boolean
  styles: IComponentPartStylesInput
  variables: ComponentVariablesInput
}

/**
 * A component containing text
 */
class Text extends UIComponent<Extendable<ITextProps>, any> {
  static className = 'ui-text'

  static displayName = 'Text'

  static propTypes = {
    /** Change the default element type of the Text component */
    as: customPropTypes.as,

    /** Set as @mention Text component */
    atMention: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Set as disabled Text component */
    disabled: PropTypes.bool,

    /** Set as error Text component */
    error: PropTypes.bool,

    /** The text can appear more important and draw user's attention */
    important: PropTypes.bool,

    /** The size for the Text component */
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2x', '3x', '4x']),

    /** The weight for the Text component */
    weight: PropTypes.oneOf(['light', 'semilight', 'regular', 'semibold', 'bold']),

    /** Set as success Text component */
    success: PropTypes.bool,

    /** Set as timestamp Text component */
    timestamp: PropTypes.bool,

    /** Truncates text as needed */
    truncated: PropTypes.bool,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'span',
  }

  static handledProps = [
    'as',
    'atMention',
    'className',
    'content',
    'disabled',
    'error',
    'important',
    'size',
    'styles',
    'success',
    'timestamp',
    'truncated',
    'variables',
    'weight',
  ]

  renderComponent({ ElementType, classes, rest }): React.ReactNode {
    const { children, content } = this.props
    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Text
