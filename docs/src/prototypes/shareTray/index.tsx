import * as React from 'react'
import { Flex, Text } from '@stardust-ui/react'

import ShareTrayList from './list'
import ShareTrayListbox from './listbox'
import ShareTrayMenu from './menu'

const containerStyles = {
  padding: '20px',
}

export default () => (
  <Flex style={containerStyles} column>
    <div>
      <Text styles={{ color: 'red', marginTop: '20px' }} size="larger">
        List and list items
      </Text>
      <ShareTrayList />
    </div>
    <div>
      <Text styles={{ color: 'red', marginTop: '20px' }} size="larger">
        Listbox and option items
      </Text>
      <ShareTrayListbox />
    </div>
    <div>
      <Text styles={{ color: 'red', marginTop: '20px' }} size="larger">
        Menu and menu items
      </Text>
      <ShareTrayMenu />
    </div>
  </Flex>
)
