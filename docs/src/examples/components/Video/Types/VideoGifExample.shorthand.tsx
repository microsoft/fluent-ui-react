import * as React from 'react'
import { Video, Text, Flex } from '@stardust-ui/react'

const VideoGifExample = () => (
  <Flex column>
    <Video.Gif
      poster="https://raw.githubusercontent.com/bower-media-samples/big-buck-bunny-480p-5s/master/poster.jpg"
      src="https://raw.githubusercontent.com/bower-media-samples/big-buck-bunny-1080p-5s/master/video.mp4"
      playing
      variables={{ height: '400px', width: '711.11px' }}
    />
    <Text>(c) copyright 2008, Blender Foundation / www.bigbuckbunny.org</Text>
  </Flex>
)

export default VideoGifExample
