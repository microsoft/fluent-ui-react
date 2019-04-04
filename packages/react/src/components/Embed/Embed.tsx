import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'

import {
  createShorthandFactory,
  UIComponentProps,
  applyAccessibilityKeyHandlers,
  commonPropTypes,
  AutoControlledComponent,
} from '../../lib'
import { embedBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import Image from '../Image/Image'
import Video from '../Video/Video'
import Box from '../Box/Box'

import { ReactProps, ShorthandValue } from '../../types'

export interface EmbedProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default embedBehavior
   * */
  accessibility?: Accessibility

  /** Image source URL for when video isn't playing */
  placeholder?: string

  /** Whether the embedded object should be active. */
  active?: boolean

  /** Whether the embedded object should start active */
  defaultActive?: boolean

  /** Shorthand for an embedded iframe. */
  iframe?: ShorthandValue

  /** Shorthand for an embedded video. */
  video?: ShorthandValue
}

export interface EmbedState {
  active: boolean
}

/**
 * A GIF is a muted segment of a video
 * @accessibility
 * If GIF should be visible to screen readers, textual representation needs to be provided in 'alt' or 'title' property.
 *
 * Other considerations:
 *  - when alt and title property are empty, then Narrator in scan mode navigates to the gif and narrates it as empty paragraph
 */
class Embed extends AutoControlledComponent<ReactProps<EmbedProps>, EmbedState> {
  static create: Function

  static className = 'ui-embed'

  static displayName = 'Embed'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    iframe: customPropTypes.itemShorthand,
    defaultActive: PropTypes.bool,
    active: PropTypes.bool,
    poster: PropTypes.string,
    src: PropTypes.string,
    video: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'span',
    accessibility: embedBehavior as Accessibility,
  }

  static autoControlledProps = ['active']

  actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
  }

  handleClick = e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ active: !this.state.active })
  }

  getInitialAutoControlledState(): EmbedState {
    return { active: false }
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { placeholder, video, iframe } = this.props

    return (
      <ElementType
        {...unhandledProps}
        className={classes.root}
        {...accessibility.attributes.root}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        onClick={this.handleClick}
      >
        {this.state.active ? (
          <>
            {Video.create(video, {
              defaultProps: {
                placeholder,
                autoPlay: true,
                muted: true,
                controls: false,
                loop: true,
                styles: styles.video,
                variables: {
                  width: variables.width,
                  height: variables.height,
                },
              },
            })}
            {Box.create(iframe, { defaultProps: { as: 'iframe' } })}
          </>
        ) : (
          Image.create(placeholder, {
            defaultProps: {
              styles: styles.image,
              variables: {
                width: variables.width,
                height: variables.height,
              },
            },
          })
        )}
      </ElementType>
    )
  }
}

Embed.create = createShorthandFactory({ Component: Embed })

export default Embed
