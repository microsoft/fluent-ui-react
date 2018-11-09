import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import { Extendable } from '../../../types/utils'
import { UIComponentProps } from '../../lib/UIComponent'

export interface TextProps extends UIComponentProps<any, any> {
  /** At mentions can be formatted to draw users' attention. Mentions for "me" can be formatted to appear differently. */
  atMention?: boolean | 'me'

  /** Shorthand for primary content. */
  content?: any

  /** Set as disabled Text component */
  disabled?: boolean

  /** Set as error Text component */
  error?: boolean

  /** The text can appear more important and draw user's attention */
  important?: boolean

  /** The size for the Text component */
  size?: 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest'

  /** The weight for the Text component */
  weight?: 'light' | 'semilight' | 'regular' | 'semibold' | 'bold'

  /** Set as success Text component */
  success?: boolean

  /** The text can signify a temporary state */
  temporary?: boolean

  /** Set as timestamp Text component */
  timestamp?: boolean

  /** Truncates text as needed */
  truncated?: boolean
}

/**
 * A Text component formats occurrences of text consistently.
 * @accessibility
 * Text is how people read the content on your website.
 * Ensure that a contrast ratio of at least 4.5:1 exists between text and the background behind the text.
 */
class Text extends UIComponent<Extendable<TextProps>, any> {
  static create: Function

  static className = 'ui-text'

  static displayName = 'Text'

  static propTypes = {
    as: customPropTypes.as,
    atMention: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['me'])]),
    className: PropTypes.string,
    content: customPropTypes.contentShorthand,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    important: PropTypes.bool,
    size: PropTypes.oneOf(['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']),
    weight: PropTypes.oneOf(['light', 'semilight', 'regular', 'semibold', 'bold']),
    success: PropTypes.bool,
    temporary: PropTypes.bool,
    timestamp: PropTypes.bool,
    truncated: PropTypes.bool,
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'span',
  }

  renderComponent({ ElementType, classes, rest }): React.ReactNode {
    const { children, content } = this.props
    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

Text.create = createShorthandFactory(Text, content => ({ content }))

export default Text
