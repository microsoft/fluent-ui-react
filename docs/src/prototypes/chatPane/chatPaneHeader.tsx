import * as React from 'react'
import { Layout, Avatar, Text, Button, Segment, Icon, Divider } from '@stardust-ui/react'

import { IChat } from './data/interfaces'

export interface IChatPaneHeaderProps {
  chat?: IChat
}

class ChatPaneHeader extends React.PureComponent<IChatPaneHeaderProps> {
  public render() {
    return (
      <Layout
        vertical
        start={this.renderBanner()}
        main={this.renderMainArea()}
        end={<Divider type="secondary" styles={{ marginTop: 0, marginBottom: 0, width: '100%' }} />}
      />
    )
  }

  private renderBanner(): React.ReactNode {
    return (
      <Segment
        content={
          <Icon
            svg
            name="umbrella"
            styles={{ margin: 'auto 0' }}
            variables={siteVars => ({ color: siteVars.white })}
          />
        }
        styles={({ variables: v }) => ({
          backgroundColor: v.backgroundColor,
          borderRadius: 0,
          display: 'flex',
          height: '40px',
          width: '100%',
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
          <Text size="lg" content={chat.title} styles={{ marginLeft: '12px', fontWeight: 600 }} />
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
          icon="call"
          buttons={[
            { key: 'call-primary', icon: 'call', type: 'primary' },
            { key: 'call-secondary', icon: 'call', type: 'secondary', disabled: true },
          ]}
          styles={{ marginRight: '20px' }}
        />
        {['user plus', 'ellipsis horizontal'].map((name, index) => (
          <Icon
            key={`${index}-${name}`}
            name={name}
            tabIndex={0}
            styles={{ fontWeight: 100 }}
            variables={siteVars => ({ color: siteVars.gray04 })}
          />
        ))}
      </div>
    )
  }
}

export default ChatPaneHeader
