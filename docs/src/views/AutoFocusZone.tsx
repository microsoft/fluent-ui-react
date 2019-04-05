import * as React from 'react'
import { Header } from '@stardust-ui/react'
import DocPage from '../components/DocPage'
import { code, link } from '../utils/helpers'
import CodeSnippet from '../components/CodeSnippet'

export default () => (
  <DocPage title="Auto Focus Zone">
    <Header as="h2">Content</Header>
    <ul>
      <li>{link('Overview', '/auto-focus-zone#overview')}</li>
      <li>{link('Usage', '/auto-focus-zone#usage')}</li>
      <li>
        {link(
          'Override AutoFocusZone settings',
          '/auto-focus-zone#override-autofocuszone-settings',
        )}
      </li>
    </ul>
    <Header as="h2">Overview</Header>
    <p>
      AutoFocusZone can wrap a component and is used to grab focus and put it to an inner element
      when the component mounts. For example, it is needed to focus an inner element in the Popup
      when it mounts.
    </p>
    <p>
      If you need both - grabbing the focus and trap the focus in the component - use{' '}
      {link('FocusTrapZone.', '/focus-trap-zone')}
    </p>
    <Header as="h2">Usage</Header>
    <p>
      In Stardust, AutoFocusZone is applied through accessibility behavior, as for FocusZone and
      FocusTrapZone. To enable auto focus for component, it is needed, in behavior, to set prop{' '}
      {code('autoFocus')} to {code('true')} with default settings or set an object with desired
      values for auto focus zone props.{' '}
      {link('Read more about Accessibility Behaviors.', '/accessibility-behaviors')}
    </p>
    <p>AutoFocusZone's props which can be applied in accessibility behavior:</p>
    <ul>
      <li>
        <b>as</b> - element type the root element will use. Default is "div".
        <p>Type: {code('React.ReactType')}</p>
      </li>
      <li>
        <b>firstFocusableSelector</b> - indicates the selector for first focusable item. By default,
        the first tabbable element will get focus.
        <p>Type: {code('string | (() => string)')}</p>
      </li>
    </ul>
    <Header as="h2">Override AutoFocusZone settings</Header>
    <p>
      To be able to add/override AutoFocusZone props already set for a component, it is needed to
      override or create a new accessibility behavior.
    </p>
    <p>
      For example, we want to specify first focusable selector for Popup with auto focus, so on
      Popup mount, focus will go to the element matched to that selector. For that purpose, we can
      to override {code('popupAutoFocusBehavior')} and specify
      {code('firstFocusableSelector')} there.
    </p>
    <CodeSnippet
      value={`
      const overridenAutoFocusBehavior: Accessibility = (props: any) => {
        const behavior = popupFocusTrapBehavior(props)
      
        behavior.autoFocus.firstFocusableSelector = ".btn-submit";
      
        return behavior
      }
      `}
    />
    And then use this new behavior by Popup component:
    <CodeSnippet
      label="PopupExample.jsx"
      value={`
        const Popup = () => (
          <Popup accessibility={overridenAutoFocusBehavior} />
        )`}
    />
    <p>Read more about:</p>
    <ul>
      <li>{link('Accessibility Behaviors', '/accessibility-behaviors')}</li>
      <li>{link('Focus Zone', '/focus-zone')}</li>
      <li>{link('Focus Trap Zone', '/focus-trap-zone')}</li>
    </ul>
    <p>
      AutoFocusZone code on{' '}
      {link(
        'GitHub.',
        'https://github.com/stardust-ui/react/blob/master/packages/react/src/lib/accessibility/FocusZone/AutoFocusZone.tsx',
        true,
      )}
    </p>
  </DocPage>
)
