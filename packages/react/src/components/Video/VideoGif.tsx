import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { videoGifBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import Image from '../Image/Image'
import Video from '../Video/Video'
import * as _ from 'lodash'

import { ReactProps } from '../../types'

export interface VideoGifProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default videoGifBehavior
   * */
  accessibility?: Accessibility

  /** Video source URL. */
  src?: string

  /** Image source URL for when video isn't playing */
  poster?: string

  /** whether the gif should be playing */
  playing?: boolean
}

export interface VideoGifState {
  isPlaying: boolean
}

/**
 * A GIF is a muted segment of a video
 * @accessibility
 * If GIF should be visible to screen readers, textual representation needs to be provided in 'alt' or 'title' property.
 *
 * Other considerations:
 *  - when alt and title property are empty, then Narrator in scan mode navigates to the gif and narrates it as empty paragraph
 */
class VideoGif extends UIComponent<ReactProps<VideoGifProps>, VideoGifState> {
  static create: Function

  static className = 'ui-video-gif'

  static displayName = 'VideoGif'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    playing: PropTypes.bool,
    poster: PropTypes.string,
    src: PropTypes.string,
  }

  static defaultProps = {
    as: 'span',
    accessibility: videoGifBehavior as Accessibility,
  }

  public state = {
    isPlaying: this.props.playing,
  }

  shouldComponentUpdate(nextProps: VideoGifProps, nextState: VideoGifState): boolean {
    if (nextProps.playing !== this.props.playing) {
      this.setState({ isPlaying: nextProps.playing })
      return false
    }

    return !_.isEqual(this.props, nextProps) || !_.isEqual(nextState, this.state)
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { poster, src } = this.props

    return (
      <ElementType
        {...unhandledProps}
        className={classes.root}
        {...accessibility.attributes.root}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        onClick={this.handleClick}
      >
        {this.state.isPlaying
          ? Video.create(ElementType, {
              defaultProps: {
                src,
                poster,
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
            })
          : Image.create(poster, {
              defaultProps: {
                styles: styles.image,
                variables: {
                  width: variables.width,
                  height: variables.height,
                },
              },
            })}
      </ElementType>
    )
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
  }

  private handleClick = e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ isPlaying: !this.state.isPlaying })
  }
}

VideoGif.create = createShorthandFactory({ Component: VideoGif })

export default VideoGif
