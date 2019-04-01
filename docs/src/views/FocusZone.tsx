import * as React from 'react'
import { Header, Icon } from '@stardust-ui/react'

import CodeSnippet from '../components/CodeSnippet'
// import ExampleSnippet from '../components/ExampleSnippet'
import DocPage from '../components/DocPage'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'

const code = value => <code>{value}</code>

const link = (content, href, isExternal = false) => (
  <a href={href} {...isExternal && { target: 'blank' }}>
    {content} {isExternal ? <Icon name="external" size="small" link fitted /> : ''}
  </a>
)

// const links = {
//   flex: link('Flex', '/components/flex'),
//   flexItem: link('Flex.Item', '/components/flex'),
//   grid: link('Grid', '/components/grid'),
//   segment: link('Segment', '/components/segment'),
//   box: link('Box', '/components/segment'),
// }

export default () => (
  <DocPage title="Focus Zone">
    <Header as="h2">Overview</Header>
    <p>
      Focus Zone provides arrow key navigation within component's items, for example, in menu, list,
      toolbar, grid etc. and at the same time allows tabbing between these navigable components.
    </p>
    <p>
      Tabbable elements (buttons, anchors, etc., elements with {code('tabindex="0"')} or
      {code('data-is-focusable="true"')} attributes) are considered when pressing directional arrow
      keys and focus is moved appropriately. Tabbing to a zone sets focus only to the current
      "active" element, making it simple to use the tab key to transition from one zone to the next
      (from e.g., tab from Menu to List), rather than through every focusable element.
    </p>
    <p>
      Stardust leverages Focus Zone component which is based on the{' '}
      {link(
        'Focus Zone from Office UI Fabric',
        'https://developer.microsoft.com/en-us/fabric#/components/focuszone',
      )}
      . This component allows to wrap any component/element and adds arrow key navigation
      functionality.
    </p>

    <Header as="h3">Usage</Header>
    <p>
      Alhough FocusZone can be used simply by just wrapping component,
      <CodeSnippet
        label="NavigableMenu.jsx"
        value={`
          const NavigableMenu = () => (
            <FocusZone><Menu/></FocusZone>
          )
        `}
      />
      in Stardust, Focus Zone is assigned to components through accessibility behaviors
      <CodeSnippet
        label="menuBehavior.ts"
        value={`
        const menuBehavior: Accessibility = (props: any) => ({
          //...
          focusZone: {
            mode: FocusZoneMode.Embed,
            props: {
              //...
            },
          },
        })
        `}
      />
    </p>

    <CodeSnippet
      label="App.jsx"
      value={`
        const App = () => (
          <FocusZone><Accordion panels={[{}]} /></FocusZone>
        )
      `}
    />
    <p>{code('FocusZone')} operates based on DOM structure to:</p>
    <ul>
      <li>Focus the next or previous element after pressing a navigation key</li>
      <li>
        Remember the last focused element within the zone by using{' '}
        {link('Roving tabindex', 'https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex')}
      </li>
    </ul>

    <GuidesNavigationFooter
      previous={{ name: 'Accessibility behaviors', url: 'accessibility-behaviors' }}
      next={{ name: 'Focus Trap Zone', url: 'focus-trap-zone' }}
    />
  </DocPage>
)
