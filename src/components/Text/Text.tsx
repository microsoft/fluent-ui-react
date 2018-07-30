import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { childrenExist, customPropTypes, UIComponent, IRenderResultConfig } from '../../lib'
import textRules from './textRules'
import textVariables from './textVariables'

export type ITextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2x' | '3x' | '4x'

export interface ITextProps {
  as?: string
  atMention?: boolean
  className?: string
  content?: ReactNode
  disabled?: boolean
  error?: boolean
  size?: ITextSize
  important?: boolean
  success?: boolean
  timestamp?: boolean
  truncated?: boolean
}

/**
 * A component containing text
 */
class Text extends UIComponent<ITextProps, {}> {
  static className = 'ui-text'

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

    /** Set as success Text component */
    success: PropTypes.bool,

    /** Set as timestamp Text component */
    timestamp: PropTypes.bool,

    /** Truncates text as needed */
    truncated: PropTypes.bool,
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
    'size',
    'important',
    'success',
    'timestamp',
    'truncated',
  ]

  static rules = textRules

  static variables = textVariables

  renderComponent({ ElementType, classes, rest }: IRenderResultConfig<ITextProps>): ReactNode {
    const { children, content } = this.props
    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Text
