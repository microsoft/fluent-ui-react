import * as React from 'react'
import { Avatar, Button, Divider, Icon, Layout, Segment, Text } from '@stardust-ui/react'

import { ChatData } from './services'
import { Sizes } from 'src/lib/enums'

export interface ChatPaneHeaderProps {
  chat?: ChatData
}

class ChatPaneHeader extends React.PureComponent<ChatPaneHeaderProps> {
  public render() {
    return (
      <Layout
        vertical
        start={this.renderBanner()}
        main={this.renderMainArea()}
        end={<Divider size={2} styles={{ padding: '0 32px' }} />}
      />
    )
  }

  private renderBanner(): React.ReactNode {
    return (
      <Segment
        content={
          <Icon
            size="big"
            name="team-create"
            variables={siteVars => ({ color: siteVars.white, margin: 'auto 8px' })}
          />
        }
        styles={({ variables: v }) => ({
          backgroundColor: v.backgroundColor,
          borderRadius: 0,
          display: 'flex',
          height: '40px',
          padding: 0,
        })}
        variables={siteVars => ({ backgroundColor: siteVars.brand })}
      />
    )
  }

  private renderMainArea(): React.ReactNode {
    const { chat } = this.props

    return (
      <Layout
        start={<Avatar name={chat.title} />}
        main={
          <Text
            size={Sizes.Large}
            content={chat.title}
            styles={{ marginLeft: '12px', fontWeight: 600 }}
          />
        }
        end={this.renderHeaderButtons()}
        alignItems="center"
        styles={{ padding: '16px 32px' }}
      />
    )
  }

  private renderHeaderButtons(): React.ReactNode {
    return (
      <div style={{ display: 'inline-flex' }}>
        <Button.Group
          circular
          buttons={['call-video', 'call'].map((name, index) => ({
            key: `${index}-${name}`,
            icon: {
              name,
              size: 'big',
              variables: siteVars => ({ color: siteVars.white, margin: 'auto 8px' }),
            },
            type: 'primary',
          }))}
          styles={{ marginRight: '20px' }}
        />
        {['user plus', 'ellipsis horizontal'].map((name, index) => (
          <Icon
            key={`${index}-${name}`}
            name={name}
            tabIndex={0}
            styles={{
              fontWeight: 100,
              margin: 'auto',
              ...(!index && { margin: 'auto 1.6rem auto auto' }),
            }}
            variables={siteVars => ({ color: siteVars.gray04 })}
          />
        ))}
      </div>
    )
  }
}

export default ChatPaneHeader
