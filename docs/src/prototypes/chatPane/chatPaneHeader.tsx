import * as React from 'react'
import { Avatar, Button, Divider, Icon, Segment, Text, Flex } from '@stardust-ui/react'
import chatProtoStyle from './chatProtoStyle'

import { ChatData } from './services'

export interface ChatPaneHeaderProps {
  chat?: ChatData
}

class ChatPaneHeader extends React.PureComponent<ChatPaneHeaderProps> {
  public render() {
    return (
      <Flex column>
        <Flex.Item>{this.renderBanner()}</Flex.Item>
        {this.renderMainArea()}
        <Divider size={2} styles={{ padding: '0 32px' }} />
      </Flex>
    )
  }

  private renderBanner(): React.ReactElement {
    return (
      <Segment
        content={
          <Icon
            name="team-create"
            styles={{ margin: 'auto 8px' }}
            variables={siteVars => ({ color: siteVars.colors.white })}
          />
        }
        styles={({ variables: v }) => ({
          backgroundColor: v.backgroundColor,
          borderRadius: 0,
          display: 'flex',
          height: '40px',
          padding: 0,
        })}
        variables={siteVars => ({ backgroundColor: siteVars.colors.primary[500] })}
      />
    )
  }

  private renderMainArea(): React.ReactElement {
    const { chat } = this.props

    return (
      <Flex
        role="region"
        aria-labelledby="heading"
        hAlign="stretch"
        vAlign="center"
        styles={{ height: '64px', padding: '0 32px' }}
      >
        <Avatar name={chat.title} />
        <div
          id="heading"
          role="heading"
          aria-level={2}
          aria-labelledby="chat-header-reader-text chat-header-title"
        >
          <div id="chat-header-reader-text" style={chatProtoStyle.screenReaderContainerStyles}>
            Chat header
          </div>
          <Text
            id="chat-header-title"
            size="large"
            content={chat.title}
            styles={{ marginLeft: '12px', fontWeight: 600 }}
          />
        </div>
        <Flex.Item push>{this.renderHeaderButtons()}</Flex.Item>
      </Flex>
    )
  }

  private renderHeaderButtons(): React.ReactElement {
    return (
      <div style={{ display: 'inline-flex' }}>
        <Button.Group
          circular
          buttons={['call-video', 'call'].map((name, index) => ({
            key: `${index}-${name}`,
            icon: {
              name,
              variables: siteVars => ({ color: siteVars.colors.white, margin: 'auto 8px' }),
            },
            primary: true,
          }))}
          styles={{ marginRight: '20px' }}
        />
        {['team-create', 'more'].map((name, index) => (
          <Icon
            key={`${index}-${name}`}
            name={name}
            outline
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
