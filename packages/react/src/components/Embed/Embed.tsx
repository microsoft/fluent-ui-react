import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  createShorthandFactory,
  UIComponentProps,
  applyAccessibilityKeyHandlers,
  commonPropTypes,
  AutoControlledComponent,
  isFromKeyboard,
} from '../../lib'
import { embedBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import Icon, { IconProps } from '../Icon/Icon'
import Image, { ImageProps } from '../Image/Image'
import Video, { VideoProps } from '../Video/Video'
import Box, { BoxProps } from '../Box/Box'
import { ComponentEventHandler, WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'

export interface EmbedSlotClassNames {
  control: string
}

export interface EmbedProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Whether the embedded object should be active. */
  active?: boolean

  /** Whether the embedded object should start active. */
  defaultActive?: boolean

  /** Shorthand for an control. */
  control?: ShorthandValue<IconProps>

  /** Shorthand for an embedded iframe. */
  iframe?: ShorthandValue<BoxProps>

  /**
   * Event for request to change 'active' value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onActiveChanged?: ComponentEventHandler<EmbedProps>

  /**
   * Called when is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onClick?: ComponentEventHandler<EmbedProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<EmbedProps>

  /** Image source URL for when video isn't playing. */
  placeholder?: ShorthandValue<ImageProps>

  /** Shorthand for an embedded video. */
  video?: ShorthandValue<VideoProps>
}

export interface EmbedState {
  active: boolean
  isFromKeyboard: boolean
}

class Embed extends AutoControlledComponent<WithAsProp<EmbedProps>, EmbedState> {
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
    onActiveChanged: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
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

  actionHandlers = {
    performClick: event => this.handleClick(event),
  }

  getInitialAutoControlledState(): EmbedState {
    return { active: false, isFromKeyboard: false }
  }

  handleClick = e => {
    e.stopPropagation()
    e.preventDefault()

    this.trySetState({ active: !this.state.active })

    _.invoke(this.props, 'onActiveChanged', e, { ...this.props, active: !this.state.active })
    _.invoke(this.props, 'onClick', e, { ...this.props, active: !this.state.active })
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { control, iframe, placeholder, video } = this.props
    const { active } = this.state

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        {...accessibility.attributes.root}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        {...unhandledProps}
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
          </>
        ) : (
          <>
            {video &&
              Image.create(placeholder, {
                defaultProps: {
                  styles: styles.image,
                  variables: {
                    width: variables.width,
                    height: variables.height,
                  },
                },
              })}
          </>
        )}

        {Box.create(iframe, { defaultProps: { as: 'iframe' } })}

        {video &&
          Icon.create(control, {
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

/**
 * An Embed displays content from external websites, like a post from external social network.
 *
 * @accessibility
 * A `placeholder` slot represents an [`Image`](/components/image) component, please follow recommendations from its
 * accessibility section.
 */
export default withSafeTypeForAs<typeof Embed, EmbedProps, 'span'>(Embed)
