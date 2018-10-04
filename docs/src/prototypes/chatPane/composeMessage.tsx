import * as React from 'react'
import { Layout, Input, ToolbarButtonBehavior, ToolbarBehavior, Menu } from '@stardust-ui/react'
import { IMenuItemProps } from 'src/components/Menu/MenuItem'

type ToolbarProps = IMenuItemProps & { key: string; 'aria-label'?: string }

class ComposeMessage extends React.Component {
  public render() {
    return (
      <Layout
        vertical
        start={this.renderInput()}
        main={this.renderToolbar()}
        styles={{ padding: '16px 32px' }}
      />
    )
  }

  private renderInput(): React.ReactNode {
    return (
      <Input
        fluid
        placeholder="Type a message"
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
        accessibility={ToolbarBehavior}
        aria-label="Compose Editor"
        styles={{ marginTop: '10px' }}
      />
    )
  }

  private getMenuItem(
    name: string,
    index: number,
  ): IMenuItemProps & { key: string; 'aria-label': string } {
    return {
      key: `${index}-${name}`,
      icon: {
        name,
        xSpacing: 'both',
        variables: siteVars => ({ color: siteVars.gray02 }),
      },
      accessibility: ToolbarButtonBehavior,
      'aria-label': `${name} tool`,
    }
  }
}

export default ComposeMessage
