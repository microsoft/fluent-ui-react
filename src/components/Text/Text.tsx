import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import { Extendable } from '../../../types/utils'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'

export interface TextProps {
  as?: any
  atMention?: boolean | 'me'
  className?: string
  content?: any
  disabled?: boolean
  error?: boolean
  important?: boolean
  size?: 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest'
  weight?: 'light' | 'semilight' | 'regular' | 'semibold' | 'bold'
  success?: boolean
  temporary?: boolean
  timestamp?: boolean
  truncated?: boolean
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
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
    /** Change the default element type of the Text component */
    as: customPropTypes.as,

    /** At mentions can be formatted to draw users' attention. Mentions for "me" can be formatted to appear differently. */
    atMention: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['me'])]),

    /** Additional CSS class name(s) to apply.  */
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
    size: PropTypes.oneOf(['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']),

    /** The weight for the Text component */
    weight: PropTypes.oneOf(['light', 'semilight', 'regular', 'semibold', 'bold']),

    /** Set as success Text component */
    success: PropTypes.bool,

    /** The text can signify a temporary state */
    temporary: PropTypes.bool,

    /** Set as timestamp Text component */
    timestamp: PropTypes.bool,

    /** Truncates text as needed */
    truncated: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
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

Text.create = createShorthandFactory(Text, 'content')

export default Text
