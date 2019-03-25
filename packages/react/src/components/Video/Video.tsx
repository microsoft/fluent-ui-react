import * as PropTypes from 'prop-types'
import * as React from 'react'

import { createShorthandFactory, UIComponent, UIComponentProps, commonPropTypes } from '../../lib'
import { videoBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

import { ReactProps } from '../../types'

import VideoGif from './VideoGif'

export interface VideoProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default videoBehavior
   * */
  accessibility?: Accessibility

  /** Video source URL. */
  src?: string

  /** Image source URL for when video isn't playing */
  poster?: string

  /** Whether the video should be allowed to play audio */
  muted?: boolean

  /** Whether the video should start playing when rendered. Autoplay videos must be muted or they will not play immediately in certain browers like Chrome */
  autoPlay?: boolean

  /** Whether to display the native video controls */
  controls?: boolean

  /** Whether the video should automatically restart after it ends */
  loop?: boolean
}

/**
 * An video is a graphicical and audio representation of something.
 * @accessibility
 * If Video should be visible to screen readers, textual representation needs to be provided in 'alt' property.
 *
 * Other considerations:
 *  - when alt property is empty, then Narrator in scan mode navigates to image and narrates it as empty paragraph
 *  - when image has role='presentation' then screen readers navigate to the element in scan/virtual mode. To avoid this, the attribute "aria-hidden='true'" is applied by the default image behavior
 *  - when alt property is used in combination with aria-label, arialabbeledby or title, additional screen readers verification is needed as each screen reader handles this combination differently.
 */
class Video extends UIComponent<ReactProps<VideoProps>, any> {
  static create: Function

  static className = 'ui-video'

  static displayName = 'Video'

  static Gif = VideoGif

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    controls: PropTypes.bool,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    loop: PropTypes.bool,
  }

  static defaultProps = {
    as: 'video',
    accessibility: videoBehavior as Accessibility,
    controls: true,
    autoPlay: false,
    muted: false,
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { controls, autoPlay, muted, loop } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
      />
    )
  }
}

Video.create = createShorthandFactory({ Component: Video })

export default Video
