import * as React from 'react'
import { Layout, Input, toolbarButtonBehavior, toolbarBehavior, Menu } from '@stardust-ui/react'
import { MenuItemProps } from 'src/components/Menu/MenuItem'

type ToolbarProps = MenuItemProps & { key: string; 'aria-label'?: string }
const screenReaderMessageContainerStyles: React.CSSProperties = {
  border: '0px',
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0px',
  width: '1px',
  position: 'absolute',
}

class ComposeMessage extends React.Component {
  public render() {
    return (
      <div>
        <Layout
          role="region"
          aria-labelledby="chat-compose-reader-text"
          vertical
          start={
            <div>
              <div
                role="heading"
                aria-level={2}
                id="chat-compose-reader-text"
                style={screenReaderMessageContainerStyles}
              >
                {' '}
                Compose{' '}
              </div>
              {this.renderInput()}
            </div>
          }
          main={this.renderToolbar()}
          styles={{ padding: '16px 32px' }}
        />
      </div>
    )
  }

  private renderInput(): React.ReactNode {
    return (
      <Input
        fluid
        placeholder="Type a message"
        input={{ styles: { height: '3.1429rem' /* 44px */ } }}
        variables={siteVars => ({ backgroundColor: siteVars.white })}
      />
    )
  }

  private renderToolbar(): React.ReactNode {
    const items: (ToolbarProps | JSX.Element)[] = [
      'compose',
      'attach',
      'smile',
      'picture',
      'smile outline',
      'calendar alternate',
      'ellipsis horizontal',
      'send',
    ].map((icon, index) => this.getMenuItem(icon, index))

    items.splice(-1, 0, { key: 'separator', styles: { flex: 1 } })

    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        iconOnly
        accessibility={toolbarBehavior}
        aria-label="Compose Editor"
        styles={{ marginTop: '10px' }}
      />
    )
  }

  private getMenuItem(
    name: string,
    index: number,
  ): MenuItemProps & { key: string; 'aria-label': string } {
    return {
      key: `${index}-${name}`,
      icon: {
        name,
        xSpacing: 'both',
        variables: siteVars => ({ color: siteVars.gray02 }),
      },
      accessibility: toolbarButtonBehavior,
      'aria-label': `${name} tool`,
    }
  }
}

export default ComposeMessage
