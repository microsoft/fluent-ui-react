import * as React from 'react'
import { Alert, Button, Flex, ContextMenu } from '@stardust-ui/react'

const items = ['1', '2', '3', { content: 'submenu', menu: { items: ['4', '5'] } }]

class ContextMenuExampleOn extends React.Component {
  state = { alert: false }

  showAlert = () => {
    this.setState({ alert: true })
    setTimeout(() => this.setState({ alert: false }), 2000)
  }

  render() {
    return (
      <>
        <Flex gap="gap.smaller">
          <ContextMenu
            trigger={<Button icon="expand" content="Click" aria-label="Click button" />}
            menu={{ items }}
            on="click"
          />
          <ContextMenu
            trigger={<Button icon="expand" content="Hover" aria-label="Hover button" />}
            menu={{ items }}
            on="hover"
          />
          <ContextMenu
            trigger={<Button icon="expand" content="Focus" aria-label="Focus button" />}
            menu={{ items }}
            on="focus"
          />
          <ContextMenu
            trigger={
              <Button
                icon="expand"
                content="Context"
                aria-label="Context button"
                onClick={this.showAlert}
              />
            }
            menu={{ items }}
            on="context"
          />
        </Flex>
        {this.state.alert && (
          <Alert
            warning
            content="Right, you can still click the button! Right click opens the ContextMenu."
          />
        )}
      </>
    )
  }
}

export default ContextMenuExampleOn
