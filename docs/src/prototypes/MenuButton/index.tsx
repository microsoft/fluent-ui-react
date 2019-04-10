import { Button, Divider, Header, Dropdown, DropdownProps } from '@stardust-ui/react'
import * as PopperJS from 'popper.js'
import * as React from 'react'

import { ComponentPrototype, PrototypeSection } from 'docs/src/prototypes/Prototypes'
import MenuButton from './MenuButton'

interface MenuButtonPrototypeState {
  placement: PopperJS.Placement
}

class MenuButtonPrototype extends React.Component<{}, MenuButtonPrototypeState> {
  state: MenuButtonPrototypeState = { placement: 'bottom-start' }

  handleChange = (e, data: DropdownProps) => {
    this.setState({ placement: data.value as PopperJS.Placement })
  }

  render() {
    const { placement } = this.state

    return (
      <PrototypeSection title="MenuButton">
        <ComponentPrototype
          title="A sample MenuButton"
          description={
            <>
              A sample MenuButton, follows{' '}
              <a href="https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html">
                ARIA Navigation Menu example
              </a>
              , you also can choose placement.
            </>
          }
        >
          <Header as="h4" content="Choose placement:" />
          <Dropdown
            items={[
              'auto',
              'top',
              'top-start',
              'top-end',
              'right',
              'right-start',
              'right-end',
              'bottom',
              'bottom-start',
              'bottom-end',
              'left',
              'left-start',
              'left-end',
            ]}
            onSelectedChange={this.handleChange}
            value={placement}
          />
          <Divider />
          <Button.Group>
            <Button content="A usual button" primary />
            <MenuButton
              button="WAI-ARIA Quick Links"
              buttonId="button-example1"
              menu={{
                items: [
                  'W3C Home Page',
                  'W3C Web Accessibility Initiative',
                  'Accessible Rich Internet Application Specification',
                  'WAI-ARIA Authoring Practices',
                ],
              }}
              menuId="menu-example1"
              placement={placement}
            />
            <Button content="Another button" />
          </Button.Group>
        </ComponentPrototype>
      </PrototypeSection>
    )
  }
}

export default MenuButtonPrototype
