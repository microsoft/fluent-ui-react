import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
} from '../../lib'
import { ReactProps } from '../../../types/utils'
import rtlMapUnicodeCharacters from './rtlMapUnicodeCharacters'

export interface UnicodeCharacterProps extends UIComponentProps, ColorComponentProps {
  /** Hex representation of the unicode character. */
  hex: string
}

/**
 * A unicode character that is rtl aware when displaying the characters.
 */
class UnicodeCharacter extends UIComponent<ReactProps<UnicodeCharacterProps>, any> {
  static displayName = 'UnicodeCharacter'

  static create: Function

  static className = 'ui-unicode-character'

  static propTypes = {
    ...commonPropTypes.createCommon({ children: false, content: false }),
    hex: PropTypes.string.isRequired,
  }

  static defaultProps = {}

  renderComponent({ ElementType, classes, unhandledProps, rtl }) {
    const { hex } = this.props
    const hexUnicode = rtl ? rtlMapUnicodeCharacters[hex] || hex : hex
    return (
      <ElementType
        {...unhandledProps}
        className={classes.root}
        dangerouslySetInnerHTML={{ __html: this.isHex(hexUnicode) ? `&#x${hexUnicode};` : '' }}
      />
    )
  }

  private isHex(h) {
    return (
      parseInt(h, 16)
        .toString(16)
        .toUpperCase() === h.toUpperCase()
    )
  }
}

UnicodeCharacter.create = createShorthandFactory(UnicodeCharacter, 'hex')

export default UnicodeCharacter
