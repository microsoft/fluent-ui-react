import * as React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@stardust-ui/react'

import CodeSnippet from '../components/CodeSnippet'
import DocPage from '../components/DocPage'
import { code, link } from '../utils/helpers'

export default () => (
  <DocPage title="Focus Zone">
    <Header as="h2">Content</Header>
    <ul>
      <li>{link('Overview', 'focus-zone#overview')}</li>
      <li>
        {link('Usage', 'focus-zone#usage')}
        <ul>
          <li>{link('Mode', 'focus-zone#mode')}</li>
          <li>{link('Props', 'focus-zone#props')}</li>
        </ul>
      </li>
      <li>{link('Override FocusZone settings', 'focus-zone#override-focuszone-settings')}</li>
    </ul>
    <Header as="h2">Overview</Header>
    <p>
      {code('FocusZone')} provides arrow key navigation between component's child items, in such
      components as
      {code('Menu')}, {code('List')}, {code('Toolbar')} and {code('Grid')}. At the same time it is
      possible to navigate between these components by using {code('TAB')} key.
    </p>
    <p>
      Tabbable elements (buttons, anchors, etc., elements with {code('tabindex="0"')} or
      {code('data-is-focusable="true"')} attributes) are considered when pressing directional arrow
      keys and focus is moved appropriately. Tabbing to a zone sets focus only to the current
      "active" element, making it simple to use the {code('TAB')} key to transition from one zone to
      the next (from e.g., {code('TAB')} from Menu to List), rather than through every focusable
      element.
    </p>
    <p>{code('FocusZone')} operates based on DOM structure to:</p>
    <ul>
      <li>Focus the next or previous element after pressing a navigation key</li>
      <li>
        The last focused element within the zone is identified by using{' '}
        {link('Roving tabindex', 'https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex')}
      </li>
    </ul>
    <p>
      Stardust leverages {code('FocusZone')} component which is based on the{' '}
      {link(
        'Focus Zone from Office UI Fabric.',
        'https://developer.microsoft.com/en-us/fabric#/components/focuszone',
      )}{' '}
      The Focus Zone can wrap any component / element and adds arrow key navigation functionality.
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
      Read more about <Link to="accessibility-behaviors">Accessibility Behaviors</Link>.
    </div>
    <p>
      The accessibility behavior can control the focus zone operation by specifying Focus zone's
      properties - <b>mode</b> and <b>props</b>.
    </p>
    <Header as="h3">Mode</Header>
    <p>Type: {code('FocusZoneMode')}, with 2 main options:</p>
    <ul>
      <li>
        <b>Embed</b> - Focus Zone is embeded into component's container, thus all{' '}
        {code('FocusZone')}'s attributes/events listeners are applied to component's container.
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
    <p>
      The following props can be applied (
      {link(
        'lookup for API on GitHub',
        'https://github.com/stardust-ui/react/blob/master/packages/react/src/lib/accessibility/FocusZone/FocusZone.types.ts',
        true,
      )}
      ):
    </p>
    <ul>
      <li>
        <b>as</b> - element type the root element will use. Default is "div". Only applies to
        {code('FocusZone')}'s container in {code('Wrap')} mode.
        <p>Type: {code('React.ReactType')}</p>
      </li>
      <li>
        <b>className</b> - additional class name to provide to the root element, in addition to the
        ms-FocusZone class.
        <p>Type: {code('string')}</p>
      </li>
      <li>
        <b>direction</b> - defines which arrows to react to.
        <p>Type: {code('FocusZoneDirection')}, enum with next options:</p>
        <ul>
          <li>
            <i>horizontal</i> - navigation between items can be made using left/right arrow keys.
            <p>See an example of {link('horizontal menu', 'components/menu#types-menu')}.</p>
          </li>
          <li>
            <i>vertical</i> - navigation between items can be made using up/down arrow keys.
            <p>
              See an example of{' '}
              {link('vertical menu', 'components/menu#variations-vertical-pointing')}.
            </p>
          </li>
          <p>
            Vertical and horizontal menu share the same accessibility behavior and direction is
            defined by the Menu's prop "vertical":
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
            <p>See an example of {link('tab list', 'components/menu#usages-tab-list')}.</p>
          </li>
        </ul>
      </li>
      <li>
        <b>defaultTabbableElement</b> - function which uses root element as parameter to return the
        initial active element. For example, when there is a chat with a bottom-up approach, it is
        expected that the last chat message is tabbable (active), not the first default one.
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
        <b>shouldFocusOnMount</b> - if a default tabbable element should be force focused on
        FocusZone mount.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>shouldFocusInnerElementWhenReceivedFocus</b> - if true and {code('FocusZone')}'s root
        element (container) receives focus, the focus will land either on the defaultTabbableElement
        (if set) or on the first tabbable element of this {code('FocusZone')}. Usually a case for
        nested focus zones, when nested focus zone's container is a focusable element.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>shouldResetActiveElementWhenTabFromZone</b> - if true and {code('TAB')} key is not
        handled by
        {code('FocusZone')}, resets current active element to null value. For example, when roving
        index is not desirable and focus should always reset to the default tabbable element.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>disabled</b> - if set, the {code('FocusZone')} will not be tabbable and keyboard
        navigation will be disabled. This does not affect disabled attribute of any child.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>isRtl</b> - if true, {code('FocusZone')} behavior will change to match RTL environments
        (left/right arrows switched).
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>isCircularNavigation</b> - if true, will cycle to the beginning of the targets once the
        user attempts to navigate past the last target while at the end, and to the end when the
        user attempts to naviagate before the first target.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
        <p>For example, {link('horizontal menu', 'components/menu#types-menu')}.</p>
      </li>
      <li>
        <b>shouldEnterInnerZone</b> - callback function that will be executed, will be executed on
        keypresses to determine if the user intends to navigate into the inner (nested) zone.
        Returning true will ask the first inner zone to set focus. For example, when chat container
        is focus zone and chat messages are inner focus zones. Navigation between messages possible
        with up/down arrow keys, but when pressing Enter, focus should go to focusable elements
        inside message, for example, a link.
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
        <b>onActiveElementChanged</b> - callback for when one of immediate children elements gets
        activated by getting focused or by having one of its respective children elements focused.
        <p>Type: {code('(element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void')}</p>
      </li>
      <li>
        <b>shouldReceiveFocus</b> - callback method for determining if focus should indeed be set on
        the given element.
        <p>Type: {code('(childElement?: HTMLElement) => boolean')}</p>
      </li>
      <li>
        <b>handleTabKey</b> - allows {code('TAB')} key to be handled, thus alows tabbing through a
        focusable list of items in the focus zone. A side effect is that users will not be able to{' '}
        {code('TAB')} out of the focus zone and have to hit escape or some other key to exit focus
        zone.
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
        <b>shouldInputLoseFocusOnArrowKey</b> - a callback method to determine if the input element
        should lose focus on arrow keys. For example, when arrow keys are pressed to navigate when
        an input element is empty or when cursor is at the beginning/end of a string.
        <p>Type: {code('(inputElement: HTMLInputElement) => boolean')}</p>
      </li>
      <li>
        <b>stopFocusPropagation</b> - if true, focus event propagation will be stopped.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>onFocus</b> - callback called when "focus" event triggered in {code('FocusZone')}.
        <p>Type: {code('(event: React.FocusEvent<HTMLElement | FocusZone>) => void')}</p>
      </li>
      <li>
        <b>preventDefaultWhenHandled</b> - if true, {code('FocusZone')} prevents default behavior
        when handled a key event.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
    </ul>
    <Header as="h2">Override {code('FocusZone')} settings</Header>
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
      <li>
        <Link to="accessibility-behaviors">Accessibility Behaviors</Link>
      </li>
      <li>
        <Link to="focus-trap-zone">FocusTrapZone</Link>
      </li>
      <li>
        <Link to="auto-focus-zone">AutoFocusZone</Link>
      </li>
    </ul>
    <p>
      {code('FocusZone')} code on{' '}
      {link(
        'GitHub.',
        'https://github.com/stardust-ui/react/blob/master/packages/react/src/lib/accessibility/FocusZone/FocusZone.tsx',
        true,
      )}
    </p>
  </DocPage>
)
