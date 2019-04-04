import * as PropTypes from 'prop-types'
import * as React from 'react'

import { createShorthandFactory, UIComponent, UIComponentProps, commonPropTypes } from '../../lib'

import { ReactProps } from '../../types'

export interface VideoProps extends UIComponentProps {
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
 */
class Video extends UIComponent<ReactProps<VideoProps>> {
  static create: Function

  static className = 'ui-video'

  static displayName = 'Video'

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
    controls: true,
    autoPlay: false,
    muted: false,
  }

  renderComponent({ ElementType, classes, unhandledProps }) {
    const { controls, autoPlay, muted, loop } = this.props

    return (
      <ElementType
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
