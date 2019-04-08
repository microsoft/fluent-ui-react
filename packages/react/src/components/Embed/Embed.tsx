import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  createShorthandFactory,
  UIComponentProps,
  applyAccessibilityKeyHandlers,
  commonPropTypes,
  AutoControlledComponent,
} from '../../lib'
import { embedBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import Icon, { IconProps } from '../Icon/Icon'
import Image, { ImageProps } from '../Image/Image'
import Video, { VideoProps } from '../Video/Video'
import Box from '../Box/Box'

import { ReactProps, ShorthandValue } from '../../types'

export interface EmbedSlotClassNames {
  control: string
}

export interface EmbedProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default embedBehavior
   * */
  accessibility?: Accessibility

  /** Whether the embedded object should be active. */
  active?: boolean

  /** Whether the embedded object should start active. */
  defaultActive?: boolean

  /** Shorthand for an control. */
  control?: ShorthandValue<IconProps>

  /** Shorthand for an embedded iframe. */
  iframe?: ShorthandValue

  /** Image source URL for when video isn't playing. */
  placeholder?: ShorthandValue<ImageProps>

  /** Shorthand for an embedded video. */
  video?: ShorthandValue<VideoProps>
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
    active: PropTypes.bool,
    defaultActive: PropTypes.bool,
    control: customPropTypes.itemShorthand,
    iframe: customPropTypes.itemShorthand,
    placeholder: PropTypes.string,
    video: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'span',
    accessibility: embedBehavior as Accessibility,
    control: {},
  }

  static autoControlledProps = ['active']

  static slotClassNames: EmbedSlotClassNames = {
    control: `${Embed.className}__control`,
  }

  actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
  }

  getInitialAutoControlledState(): EmbedState {
    return { active: false }
  }

  handleClick = e => {
    e.stopPropagation()
    e.preventDefault()

    this.trySetState({ active: !this.state.active })
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { control, iframe, placeholder, video } = this.props
    const { active } = this.state

    return (
      <ElementType
        {...unhandledProps}
        className={classes.root}
        {...accessibility.attributes.root}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        onClick={this.handleClick}
      >
        {active ? (
          <>
            {Video.create(video, {
              defaultProps: {
                autoPlay: true,
                controls: false,
                loop: true,
                muted: true,
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

        {Icon.create(control, {
          defaultProps: {
            className: Embed.slotClassNames.control,
            circular: true,
            name: active ? 'stardust-pause' : 'stardust-play',
            size: 'largest',
            styles: styles.control,
          },
        })}
      </ElementType>
    )
  }
}

Embed.create = createShorthandFactory({ Component: Embed })

export default Embed
