import * as React from 'react'
import { Header } from '@stardust-ui/react'

import CodeSnippet from '../components/CodeSnippet'
import DocPage from '../components/DocPage'
import { code, link } from '../utils/helpers'

export default () => (
  <DocPage title="Focus Zone">
    <Header as="h2">Content</Header>
    <ul>
      <li>{link('Overview', '/focus-zone#overview')}</li>
      <li>
        {link('Usage', '/focus-zone#usage')}
        <ul>
          <li>{link('Mode', '/focus-zone#mode')}</li>
          <li>{link('Props', '/focus-zone#props')}</li>
        </ul>
      </li>
      <li>{link('Override FocusZone settings', '/focus-zone#override-focuszone-settings')}</li>
    </ul>
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
    <p>Focus Zone operates based on DOM structure to:</p>
    <ul>
      <li>Focus the next or previous element after pressing a navigation key</li>
      <li>
        Remember the last focused element within the zone by using{' '}
        {link('Roving tabindex', 'https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex')}
      </li>
    </ul>
    <p>
      Stardust leverages Focus Zone component which is based on the{' '}
      {link(
        'Focus Zone from Office UI Fabric',
        'https://developer.microsoft.com/en-us/fabric#/components/focuszone',
      )}
      . This component allows to wrap any component/element and adds arrow key navigation
      functionality.
    </p>
    <Header as="h2">Usage</Header>
    <div>
      In Stardust, Focus Zone is assigned to components through accessibility behaviors
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
      and then accessibility behavior is set for component
      <CodeSnippet
        label="NavigableMenu.jsx"
        value={`
        const NavigableMenu = () => (
          <Menu accessibility={menuBehavior} />
        )`}
      />
      Read more about <b>accessibility behaviors {link('here', '/accessibility-behaviors')}</b>.
    </div>
    <p>
      For setting Focus Zone properly in accessibility behavior, it is needed to specify FocusZone's{' '}
      <b>mode</b> and <b>props</b>.
    </p>
    <Header as="h3">Mode</Header>
    <p>Type: {code('FocusZoneMode')}, with 2 main options:</p>
    <ul>
      <li>
        <b>Embed</b> - Focus Zone is embeded into component's container, thus all FocusZone's
        attributes/events listeners are applied to component's container.
        <CodeSnippet
          label="html"
          value={`
          <ul role="menu" class="ui-menu">---> FocusZone's attributes/events listeners applied here 
            <li class="ui-menu__item ..." role="presentation">
            </li>
            <li class="ui-menu__item ..." role="presentation">
            </li>
          </ul>
          `}
        />
      </li>
      <li>
        <b>Wrap</b> - Focus Zone wraps component to it's own container and all attributes/events
        listeners applied there.
        <CodeSnippet
          label="html"
          value={`
            <div>---> FocusZone's attributes/events listeners applied here            
              <ul role="menu" class="ui-menu">
                <li class="ui-menu__item ..." role="presentation">
                </li>
                <li class="ui-menu__item ..." role="presentation">
                </li>
              </ul>
            </div>
          `}
        />
      </li>
    </ul>
    <Header as="h3">Props</Header>
    <p>To FocusZone next props can be applied:</p>
    <ul>
      <li>
        <b>as</b> - Element type the root element will use. Default is "div". Only applies to
        FocusZone's container in {code('Wrap')} mode.
        <p>Type: {code('React.ReactType')}</p>
      </li>
      <li>
        <b>className</b> - Additional class name to provide on the root element, in addition to the
        ms-FocusZone class.
        <p>Type: {code('string')}</p>
      </li>
      <li>
        <b>direction</b> - Defines which arrows to react to.
        <p>Type: {code('FocusZoneDirection')}, enum with next options:</p>
        <ul>
          <li>
            <i>horizontal</i> - navigation between items can be made using left/right arrow keys.
            <p>See an example of {link('horizontal menu', '/components/menu#types-menu')}.</p>
          </li>
          <li>
            <i>vertical</i> - navigation between items can be made using up/down arrow keys.
            <p>
              See an example of{' '}
              {link('vertical menu', '/components/menu#variations-vertical-pointing')}.
            </p>
          </li>
          <p>
            Vertical and horizontal menu share same accessibility behavior and direction is defined
            by prop "vertical":
          </p>
          <CodeSnippet
            label="menuBehavior.ts"
            value={`
              const menuBehavior: Accessibility = (props: any) => ({
                //...
                focusZone: {
                  mode: FocusZoneMode.Embed,
                  props: {
                    direction: props.vertical ?
                    FocusZoneDirection.vertical :
                    FocusZoneDirection.horizontal,
                    //...
                  },
                },
              })
              `}
          />
          <li>
            <i>bidirectional</i> - navigation between items can be made using all arrow keys.{' '}
            <b>It is set by default.</b>
            <p>See an example of {link('tab list', '/components/menu#usages-tab-list')}.</p>
          </li>
        </ul>
      </li>
      <li>
        <b>defaultTabbableElement</b> - Function which uses root element as parameter to return the
        initial active element. For example, when there is a chat with a bottom-up approach, it is
        needed the last chat message to be tabbable (active), not the first one, which is by
        default.
        <p>Type: {code('(root: HTMLElement) => HTMLElement')}</p>
        <CodeSnippet
          label="chatBehavior.ts"
          value={`
          const chatBehavior: Accessibility = (props: any) => ({
            //...
            focusZone: {
              //...
              props: {
                defaultTabbableElement: (root: HTMLElement) => {
                  return root.querySelector('[data-last-visible="true"]');
                },
              },
            },
          })
          `}
        />
      </li>
      <li>
        <b>shouldFocusOnMount</b> - If a default tabbable element should be force focused on
        FocusZone mount.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>shouldFocusInnerElementWhenReceivedFocus</b> - if true and FocusZone's root element
        (container) receives focus, the focus will be forced to defaultTabbableElement (if set) or
        first tabbable element of this FocusZone. Usually a case for nested focus zones, when nested
        focus zone's container is a focusable element.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>shouldResetActiveElementWhenTabFromZone</b> - If true and TAB key is not handled by
        FocusZone, resets current active element to null value. For example, when roving index is
        not desirable and focus should always reset to the default tabbable element.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>disabled</b> - If set, the FocusZone will not be tabbable and keyboard navigation will be
        disabled. This does not affect disabled attribute of any child.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>isRtl</b> - If true, FocusZone behavior will change to match RTL environments (left/right
        arrows switched).
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>isCircularNavigation</b> - If true, will cycle to the beginning of the targets once the
        user navigates to the next target while at the end, and to the end when navigate to the
        previous at the beginning.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
        <p>For example, {link('horizontal menu', '/components/menu#types-menu')}.</p>
      </li>
      <li>
        <b>shouldEnterInnerZone</b> - callback function, will be executed on keypresses to determine
        if the user intends to navigate into the inner (nested) zone. Returning true will ask the
        first inner zone to set focus. For example, when chat container is focus zone and chat
        messages are inner focus zones. Navigation between messages possible with up/down arrow
        keys, but when pressing Enter, focus should go to focusable elements inside message, for
        example, a link.
        <p>Default: {code('false')}</p>
        <p>Type: {code('(ev: React.KeyboardEvent<HTMLElement>) => boolean')}</p>
        <CodeSnippet
          label="jsx"
          value={`
            <Chat>--->FocusZone          
             <ChatMessage /> ---> inner FocusZone     
             <ChatMessage /> ---> inner FocusZone        
             <ChatMessage /> ---> inner FocusZone  
            </Chat>
          `}
        />
        <CodeSnippet
          label="chatBehavior.ts"
          value={`
          const chatBehavior: Accessibility = (props: any) => ({
            //...
            focusZone: {
              //...
              props: {
                shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
              },
            },
          })
          `}
        />
      </li>
      <li>
        <b>onActiveElementChanged</b> - Callback for when one of immediate children elements gets
        active by getting focused or by having one of its respective children elements focused.
        <p>Type: {code('(element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void')}</p>
      </li>
      <li>
        <b>shouldReceiveFocus</b> - Callback method for determining if focus should indeed be set on
        the given element.
        <p>Type: {code('(childElement?: HTMLElement) => boolean')}</p>
      </li>
      <li>
        <b>handleTabKey</b> - Allows tab key to be handled to tab through a list of items in the
        focus zone. An unfortunate side effect is that users will not be able to tab out of the
        focus zone and have to hit escape or some other key to exit focus zone.
        <p>Type: {code('FocusZoneTabbableElements')}, enum with next options:</p>
        <ul>
          <li>
            <i>none</i> - tabbing is not allowed
          </li>
          <li>
            <i>all</i> - all tabbing action is allowed
          </li>
          <li>
            <i>inputOnly</i> - tabbing is allowed only on input elements
          </li>
        </ul>
      </li>
      <li>
        <b>shouldInputLoseFocusOnArrowKey</b> - A callback method to determine if the input element
        should lose focus on arrow keys. For example, use arrow keys to navigate when an input
        element is empty or when cursor is at the beginning/end of a string.
        <p>Type: {code('(inputElement: HTMLInputElement) => boolean')}</p>
      </li>
      <li>
        <b>stopFocusPropagation</b> - if true, focus event propagation will be stopped.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>onFocus</b> - callback called when "focus" event triggered in FocusZone.
        <p>Type: {code('(event: React.FocusEvent<HTMLElement | FocusZone>) => void')}</p>
      </li>
      <li>
        <b>preventDefaultWhenHandled</b> - if true, FocusZone prevents default when handled a key
        event.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
    </ul>
    <Header as="h2">Override FocusZone settings</Header>
    <p>
      To be able to add/override Focus Zone settings already set for a component, it is needed to
      override or create a new accessibility behavior.
    </p>
    <p>
      For example, we want to specify default tabbable element for Menu to be the last one, not
      first.
    </p>
    <CodeSnippet
      value={`
      const overridenMenuBehavior: Accessibility = (props: any) => {
        const behavior = menuBehavior(props)
      
        behavior.focusZone.props.defaultTabbableElement = (root: HTMLElement): HTMLElement => {
          return root.querySelector(".ui-menu__item__wrapper:last-child")
        }
      
        return behavior
      }
      `}
    />
    And then use this new behavior by Menu component:
    <CodeSnippet
      label="NavigableMenu.jsx"
      value={`
        const NavigableMenu = () => (
          <Menu accessibility={overridenMenuBehavior} />
        )`}
    />
    <p>Read more about:</p>
    <ul>
      <li>{link('Accessibility Behaviors', '/accessibility-behaviors')}</li>
      <li>{link('Focus Trap Zone', '/focus-trap-zone')}</li>
      <li>{link('Auto Focus Zone', '/auto-focus-zone')}</li>
    </ul>
    <p>
      FocusZone code on{' '}
      {link(
        'GitHub.',
        'https://github.com/stardust-ui/react/blob/master/packages/react/src/lib/accessibility/FocusZone/FocusZone.tsx',
        true,
      )}
    </p>
  </DocPage>
)
