import * as React from 'react'
import { Embed, Flex, Text } from '@stardust-ui/react'

const EmbedExample = () => (
  <Flex column>
    <Embed
      placeholder="https://raw.githubusercontent.com/bower-media-samples/big-buck-bunny-480p-5s/master/poster.jpg"
      video="https://raw.githubusercontent.com/bower-media-samples/big-buck-bunny-1080p-5s/master/video.mp4"
      defaultActive={true}
      variables={{ height: '400px', width: '711.11px' }}
    />
    <Text>(c) copyright 2008, Blender Foundation / www.bigbuckbunny.org</Text>
  </Flex>
)

export default EmbedExample
