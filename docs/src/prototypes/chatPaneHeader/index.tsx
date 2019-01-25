import * as React from 'react'
import { Avatar, Divider, Status, Icon, Segment, Provider, Header } from '@stardust-ui/react'
import ChatTitle from './chatTitle'
import Tabs from './tabs'
import CallingButtons from './callingButtons'
import RightTopButtons from './rightTopButtons'
import { Button } from 'semantic-ui-react'

const itemsList = [
  {
    key: 'irving',
    media: <Status color="green" icon="check" title="Available" />,
    content: 'Irving Kuhic,',
  },
  {
    key: 'skyler',
    media: <Status color="red" icon="minus" title="Busy" />,
    content: 'Skyler Parks,',
  },
  {
    key: 'dante',
    media: <Status color="red" icon="minus" title="Busy" />,
    content: 'Dante Schneider',
  },
  {
    key: 'nobody',
    media: <Status color="red" icon="minus" title="Busy" />,
    content: 'Nobody Schneider',
  },
  {
    key: 'michelangelo',
    media: <Status color="red" icon="minus" title="Busy" />,
    content: 'Michelangelo Lodovico',
  },
  {
    key: ' FarrokhBulsara',
    media: <Status color="red" icon="minus" title="Busy" />,
    content: ' Farrokh Bulsara',
  },
  {
    key: ' WelvetChocolateSweetyBurms',
    media: <Status color="red" icon="minus" title="Busy" />,
    content: 'Welvet Chocolate Sweety Burms',
  },
]

export default () => (
  <div>
    <Header
      styles={{ paddingTop: '1rem' }}
      as="h1"
      content="Chat header when there are equal or less than 3 users in group chat"
      className="no-anchor"
    />
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <Avatar image="public/images/avatar/small/matt.jpg" />
      <ChatTitle listItems={itemsList.slice(0, 3)} />
      <Tabs />
      <CallingButtons />
      <RightTopButtons />
    </div>
    <Divider />
    <Header
      styles={{ marginTop: '4rem' }}
      as="h1"
      content="Chat header when there are more than 3 users in group chat"
      className="no-anchor"
    />
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <Avatar image="public/images/avatar/small/matt.jpg" />
      <ChatTitle listItems={itemsList} />
      <Tabs />
      <CallingButtons />
      <RightTopButtons />
    </div>
    <Divider />
    <Header
      styles={{ marginTop: '4rem' }}
      as="h1"
      content="Chat header when there is group chat name set"
      className="no-anchor"
    />
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <Avatar image="public/images/avatar/small/matt.jpg" />
      <ChatTitle listItems={itemsList} groupChatName="Accessbility issue 9875612" />
      <Tabs />
      <CallingButtons />
      <RightTopButtons />
    </div>
    <Divider />
    <Header
      styles={{ marginTop: '4rem' }}
      as="h1"
      content="Chat header ongoing meeting"
      className="no-anchor"
    />
    <Provider
      theme={{
        componentStyles: {
          Header: {
            root: {
              fontSize: '16px',
              color: 'white',
            },
          },
          HeaderDescription: {
            root: {
              fontSize: '12px',
            },
          },
          Avatar: {
            root: {
              marginRight: '10px',
            },
          },
          MenuItem: {
            root: {
              color: 'white',
            },
          },
        },
      }}
    >
      <Segment
        inverted
        color="#464775"
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <Icon
          name="calendar"
          size="large"
          circular
          variables={siteVars => ({
            color: siteVars.white,
            borderColor: siteVars.brand08,
            backgroundColor: siteVars.brand08,
          })}
        />
        <ChatTitle listItems={itemsList} groupChatName="OPG Fluent Reviews" />
        <Tabs isMeeting="true" />
        <div role="status" aria-label="meeting duration (time in friendly format)">
          {' '}
          00:02{' '}
        </div>
        <div>
          <Avatar image="public/images/avatar/small/matt.jpg" />
          <Avatar image="public/images/avatar/small/matt.jpg" />
          <Button
            onClick={e => window.alert('add people dialog will apear here')}
            aria-label="add people"
            styles={{ backgroundColor: '#464775' }}
            circular
            key="userPlus"
            title="add people"
            icon={
              <Icon
                key="userPlus"
                name="user plus"
                size="large"
                variables={siteVars => ({ color: siteVars.white })}
              />
            }
          />
        </div>
        <Button
          style={{
            marginLeft: '2rem',
            width: '8rem',
            height: '2.5rem',
            backgroundColor: '#6464a9',
          }}
          content="Join"
          primary
        />
      </Segment>
    </Provider>
    <Divider />
  </div>
)
