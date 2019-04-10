import * as PropTypes from 'prop-types'
import * as React from 'react'

import { createShorthandFactory, UIComponent, UIComponentProps, commonPropTypes } from '../../lib'

import { ReactProps } from '../../types'
import { defaultBehavior } from '../../lib/accessibility'
import Ref from '../Ref/Ref'

export interface VideoProps extends UIComponentProps {
  /** Whether the video should start playing when rendered. Autoplay videos must be muted or they will not play immediately in certain browers like Chrome. */
  autoPlay?: boolean

  /** Whether to display the native video controls. */
  controls?: boolean

  /** Whether the video should automatically restart after it ends. */
  loop?: boolean

  /** Whether the video should be allowed to play audio. */
  muted?: boolean

  /** Image source URL for when video isn't playing. */
  poster?: string

  /** Video source URL. */
  src?: string
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
    autoPlay: PropTypes.bool,
    controls: PropTypes.bool,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    poster: PropTypes.string,
    src: PropTypes.string,
  }

  static defaultProps = {
    as: 'video',
    accessibility: defaultBehavior,
    controls: true,
    autoPlay: false,
    muted: false,
  }

  videoRef = React.createRef<HTMLVideoElement>()

  componentDidMount() {
    this.setVideoAttributes()
  }

  componentDidUpdate() {
    this.setVideoAttributes()
  }

  setVideoAttributes = () => {
    // React doesn't guaranty that props will be set:
    // https://github.com/facebook/react/issues/10389
    if (this.videoRef.current) {
      if (this.props.muted) {
        this.videoRef.current.setAttribute('muted', 'true')
      } else {
        this.videoRef.current.removeAttribute('muted')
      }
    }
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps }) {
    const { controls, autoPlay, loop, poster, src } = this.props

    return (
      <Ref innerRef={this.videoRef}>
        <ElementType
          autoPlay={autoPlay}
          className={classes.root}
          controls={controls}
          loop={loop}
          poster={poster}
          src={src}
          {...accessibility.attributes.root}
          {...unhandledProps}
        />
      </Ref>
    )
  }
}

Video.create = createShorthandFactory({ Component: Video, mappedProp: 'src' })

export default Video
