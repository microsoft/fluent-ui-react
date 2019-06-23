import {
  Button,
  Divider,
  Header,
  Toolbar,
  Dropdown,
  DropdownProps,
  Alignment,
  Position,
  PopupEvents,
  RestrictedClickEvents,
} from '@stardust-ui/react'
import * as React from 'react'

import { ComponentPrototype, PrototypeSection } from 'docs/src/prototypes/Prototypes'
import MenuButton from './MenuButton'

interface MenuButtonPrototypeState {
  position: Position
  align: Alignment
  on: string[]
}

class MenuButtonPrototype extends React.Component<{}, MenuButtonPrototypeState> {
  state: MenuButtonPrototypeState = { position: 'below', align: 'start', on: ['click'] }

  handlePositionChange = (e, data: DropdownProps) => {
    this.setState({ position: data.value as Position })
  }

  handleAlignChange = (e, data: DropdownProps) => {
    this.setState({ align: data.value as Alignment })
  }

  handleOnChange = (e, data: DropdownProps) => {
    this.setState({ on: data.value as PopupEvents[] })
  }

  renderToolbarMenu = (ComponentType, props) => (
    <MenuButton trigger={<ComponentType {...props} />} menu={{ items: ['Red', 'Green', 'Blue'] }} />
  )

  render() {
    const { position, align, on } = this.state

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
              , you also can choose placement and trigger event.
            </>
          }
        >
          <Header as="h4" content="Choose position:" />
          <Dropdown
            items={['above', 'below', 'before', 'after']}
            onSelectedChange={this.handlePositionChange}
            value={position}
          />
          <Header as="h4" content="Choose position:" />
          <Dropdown
            items={['start', 'center', 'end']}
            onSelectedChange={this.handleAlignChange}
            value={align}
          />
          <Header as="h4" content="Choose trigger event (on):" />
          <Dropdown
            multiple
            items={[
              'click',
              'focus',
              'hover',
              // 'context',
            ]}
            onSelectedChange={this.handleOnChange}
            value={on}
          />
          <Divider />
          <Button.Group>
            <Button content="A usual button" primary />
            <MenuButton
              trigger={<Button content="WAI-ARIA Quick Links" onClick={() => alert('Clicks!')} />}
              position={position}
              align={align}
              on={(on as any) as RestrictedClickEvents}
              menu={{
                items: [
                  'W3C Home Page',
                  'W3C Web Accessibility Initiative',
                  'Accessible Rich Internet Application Specification',
                  'WAI-ARIA Authoring Practices',
                  { content: 'Submenu', key: 'submenu', menu: ['1', '2', '3'] },
                ],
              }}
            />
            <Button content="Another button" />
          </Button.Group>
        </ComponentPrototype>

        <ComponentPrototype
          title="Context menu"
          description="Right click context menu (will work once popup contextmenu PR is merged"
        >
          <MenuButton
            trigger={
              <div style={{ padding: '10rem' }}>
                In this area you can try the awesome context menu.{' '}
                <a href="#">This is just for focus</a>
              </div>
            }
            position="below"
            align="start"
            // on="context"
            // triggerHandlesFocus={true}
            menu={{
              items: [
                'Random action',
                { content: 'Submenu', key: 'submenu', menu: ['1', '2', '3'] },
              ],
            }}
          />
        </ComponentPrototype>

        <ComponentPrototype
          title="Toolbar"
          description="Shows the usage of menu button inside of toolbar"
        >
          <Toolbar
            items={[
              {
                key: 'highlight',
                icon: { name: 'highlight', outline: true },
              },
              render =>
                render(
                  {
                    key: 'font-color',
                    icon: { name: 'font-color', outline: true },
                  },
                  this.renderToolbarMenu,
                ),
            ]}
          />
        </ComponentPrototype>
      </PrototypeSection>
    )
  }
}

export default MenuButtonPrototype
