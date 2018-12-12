import React from 'react'
import { Button, Layout, Avatar, Icon, Divider, Status } from '@stardust-ui/react'
import ChatTitle from './chatTitle'
import Tabs from './tabs'
import CallingButtons from './callingButtons'

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
]

export default () => (
  <div>
    <div>
      <button>Set focus here </button>
    </div>
    <br />
    <Layout
      start={<Avatar image="public/images/avatar/small/matt.jpg" />}
      main={
        <div>
          <ChatTitle listItems={itemsList.slice(0, 3)} />
          <Tabs />
        </div>
      }
      end={
        <div>
          <CallingButtons />
          <Button
            aria-label="add people"
            circular
            key="userPlus"
            title="add people"
            icon={
              <Icon
                key="userPlus"
                name="user plus"
                size="large"
                variables={siteVars => ({ color: siteVars.gray04 })}
              />
            }
          />
          <Button
            aria-label="more options"
            circular
            key="moreOptions"
            title="more option"
            icon={
              <Icon
                key="userPlus"
                name="ellipsis horizontal"
                size="large"
                variables={siteVars => ({ color: siteVars.gray04 })}
              />
            }
          />
        </div>
      }
    />
    <Divider />
    <br />
    <Layout
      start={<Avatar image="public/images/avatar/small/matt.jpg" />}
      main={
        <div>
          <ChatTitle listItems={itemsList.slice(0, 4)} />
          <Tabs />
        </div>
      }
      end={
        <div>
          <CallingButtons />
          <Button
            aria-label="add people"
            circular
            key="addPeople"
            title="add people"
            icon={
              <Icon
                key=""
                name="user plus"
                size="large"
                variables={siteVars => ({ color: siteVars.gray04 })}
              />
            }
          />
          <Button
            aria-label="more options"
            circular
            key="moreOptions"
            title="more options"
            icon={
              <Icon
                key="userPlus"
                name="ellipsis horizontal"
                size="large"
                variables={siteVars => ({ color: siteVars.gray04 })}
              />
            }
          />
        </div>
      }
    />
    <Divider />
    <br />
  </div>
)
