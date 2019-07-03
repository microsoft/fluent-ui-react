import * as React from 'react'
import { Alert, Button, Flex, Popup, popupFocusTrapBehavior } from '@stardust-ui/react'

const contentWithButtons = {
  content: (
    <Flex gap="gap.smaller">
      <Button>First</Button>
      <Button primary>Second</Button>
    </Flex>
  ),
}

class PopupExampleOnWithFocusTrap extends React.Component {
  state = { alert: false }

  showAlert = () => {
    this.setState({ alert: true })
    setTimeout(() => this.setState({ alert: false }), 2000)
  }

  render() {
    return (
      <>
        <Flex gap="gap.smaller">
          <Popup
            trigger={<Button icon="expand" content="Click" aria-label="Click button" />}
            content={contentWithButtons}
            accessibility={popupFocusTrapBehavior}
            on="click"
          />
          <Popup
            trigger={<Button icon="expand" content="Hover" aria-label="Hover button" />}
            content={contentWithButtons}
            accessibility={popupFocusTrapBehavior}
            on="hover"
          />
          <Popup
            trigger={<Button icon="expand" content="Focus" aria-label="Focus button" />}
            content={contentWithButtons}
            accessibility={popupFocusTrapBehavior}
            on="focus"
          />
          <Popup
            trigger={
              <Button
                icon="expand"
                content="Context"
                aria-label="Context button"
                onClick={this.showAlert}
              />
            }
            content={contentWithButtons}
            accessibility={popupFocusTrapBehavior}
            on="context"
          />
        </Flex>
        {this.state.alert && <Alert warning content="Click!" />}
      </>
    )
  }
}

export default PopupExampleOnWithFocusTrap
