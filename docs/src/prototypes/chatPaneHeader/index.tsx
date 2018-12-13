import React from 'react'
import { Avatar, Divider, Status } from '@stardust-ui/react'
import ChatTitle from './chatTitle'
import Tabs from './tabs'
import CallingButtons from './callingButtons'
import RightTopButtons from './rightTopButtons'
import { Button } from 'semantic-ui-react'

const listItemStyle = {
  float: 'left',
  paddingRight: '0.1rem',
  paddingLeft: '0.1rem',
  fontWeight: 'bold',
}

const itemsList = [
  {
    key: 'irving',
    media: <Status color="green" icon="check" title="Available" />,
    header: 'Irving Kuhic,',
    styles: listItemStyle,
  },
  {
    key: 'skyler',
    media: <Status color="red" icon="minus" title="Busy" />,
    header: 'Skyler Parks,',
    styles: listItemStyle,
  },
  {
    key: 'dante',
    media: <Status color="red" icon="minus" title="Busy" />,
    header: 'Dante Schneider',
    styles: listItemStyle,
  },
  {
    key: 'nobody',
    media: <Status color="red" icon="minus" title="Busy" />,
    header: 'Nobody Schneider',
    styles: listItemStyle,
  },
  {
    key: 'michelangelo',
    media: <Status color="red" icon="minus" title="Busy" />,
    header: 'Michelangelo Lodovico',
    styles: listItemStyle,
  },
  {
    key: ' FarrokhBulsara',
    media: <Status color="red" icon="minus" title="Busy" />,
    header: ' Farrokh Bulsara',
    styles: listItemStyle,
  },
  {
    key: ' WelvetChocolateSweetyBurms',
    media: <Status color="red" icon="minus" title="Busy" />,
    header: 'Welvet Chocolate Sweety Burms',
    styles: listItemStyle,
  },
]

export default () => (
  <div>
    <div>
      <Button style={{ margin: '2rem' }}>
        {' '}
        Chat header when there is equal or less than 3 users in group chat{' '}
      </Button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Avatar image="public/images/avatar/small/matt.jpg" />
      <ChatTitle listItems={itemsList.slice(0, 3)} />
      <Tabs />
      <CallingButtons />
      <RightTopButtons />
    </div>
    <Divider />
    <div>
      <Button style={{ margin: '2rem' }}>
        Chat header when there are more as 3 user in group chat{' '}
      </Button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Avatar image="public/images/avatar/small/matt.jpg" />
      <ChatTitle listItems={itemsList} />
      <Tabs />
      <CallingButtons />
      <RightTopButtons />
    </div>
    <Divider />
    <div>
      <Button style={{ margin: '2rem' }}>Chat header when there is group chat name set </Button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Avatar image="public/images/avatar/small/matt.jpg" />
      <ChatTitle listItems={itemsList} groupChatName="Accessbility issue 9875612" />
      <Tabs />
      <CallingButtons />
      <RightTopButtons />
    </div>
    <Divider />
  </div>
)
