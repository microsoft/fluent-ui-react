import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ColorComponentProps,
} from '../../lib'

import { ReactProps } from '../../../types/utils'

export interface TextProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps,
    ColorComponentProps {
  /** At mentions can be formatted to draw users' attention. Mentions for "me" can be formatted to appear differently. */
  atMention?: boolean | 'me'

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
 *
 * To ensure that RTL mode will be properly handled for provided 'content' value, ensure that either:
 * - 'content' is provided as plain string (then dir="auto" attribute will be applied automatically)
 * - for other 'content' value types (i.e. that use elements inside) ensure that dir="auto" attribute is applied for all places in content where necessary
 */
class Text extends UIComponent<ReactProps<TextProps>, any> {
  static create: Function

  static className = 'ui-text'

  static displayName = 'Text'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
    atMention: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['me'])]),
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    important: PropTypes.bool,
    size: PropTypes.oneOf(['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']),
    weight: PropTypes.oneOf(['light', 'semilight', 'regular', 'semibold', 'bold']),
    success: PropTypes.bool,
    temporary: PropTypes.bool,
    timestamp: PropTypes.bool,
    truncated: PropTypes.bool,
  }

  static defaultProps = {
    as: 'span',
  }

  renderComponent({ ElementType, classes, rest }): React.ReactNode {
    const { children, content } = this.props

    const hasChildren = childrenExist(children)

    const maybeDirAuto = !hasChildren && typeof content === 'string' ? { dir: 'auto' } : null

    return (
      <ElementType className={classes.root} {...maybeDirAuto} {...rest}>
        {hasChildren ? children : content}
      </ElementType>
    )
  }
}

Text.create = createShorthandFactory(Text, 'content')

export default Text
