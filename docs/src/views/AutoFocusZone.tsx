import * as React from 'react'
import { Header } from '@stardust-ui/react'
import { Link } from 'react-router-dom'
import DocPage from '../components/DocPage'
import { code, link } from '../utils/helpers'
import CodeSnippet from '../components/CodeSnippet'

export default () => (
  <DocPage title="Auto Focus Zone">
    <Header as="h2">Content</Header>
    <ul>
      <li>{link('Overview', 'auto-focus-zone#overview')}</li>
      <li>{link('Usage', 'auto-focus-zone#usage')}</li>
      <li>
        {link('Override AutoFocusZone settings', 'auto-focus-zone#override-autofocuszone-settings')}
      </li>
    </ul>
    <Header as="h2">Overview</Header>
    <p>
      {code('AutoFocusZone')} can wrap a component and is used to grab focus and put it to an inner
      element when the component mounts. For example, when it is needed to focus an inner element in
      the Popup when it mounts.
    </p>
    <p>
      If you need both - grabbing the focus and trap the focus in the component - use{' '}
      <Link to="focus-trap-zone">FocusTrapZone</Link>.
    </p>
    <Header as="h2">Usage</Header>
    <p>
      In Stardust, {code('AutoFocusZone')} is applied through accessibility behavior, as for{' '}
      {code('FocusZone')} and
      {code('FocusTrapZone')}. To enable auto focus for a component, in the behavior set prop{' '}
      {code('autoFocus')} to {code('true')}
      with default settings or set an object with desired values for auto focus zone props.{' '}
      <Link to="accessibility-behaviors">Read more about Accessibility Behaviors.</Link>
    </p>
    <p>
      {code('AutoFocusZone')}'s props which can be applied in accessibility behavior (
      {link(
        'lookup for API on GitHub',
        'https://github.com/stardust-ui/react/blob/master/packages/react/src/lib/accessibility/AutoFocusZone/AutoFocusZone.types.tsx',
        true,
      )}
      ):
    </p>
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
    <Header as="h2">Override {code('AutoFocusZone')} settings</Header>
    <p>
      To be able to add/override {code('AutoFocusZone')} props already set for a component, it is
      needed to override or create a new accessibility behavior.
    </p>
    <p>
      For example, we want to specify the focusable selector for Popup with auto focus, so on Popup
      mount, focus will go to the element matched to that selector. For that purpose, we can to
      override {code('popupAutoFocusBehavior')} and specify {code('firstFocusableSelector')} there.
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
      <li>
        <Link to="accessibility-behaviors">Accessibility Behaviors</Link>
      </li>
      <li>
        <Link to="focus-zone">FocusZone</Link>
      </li>
      <li>
        <Link to="focus-trap-zone">FocusTrapZone</Link>
      </li>
    </ul>
    <p>
      {code('AutoFocusZone')} code on{' '}
      {link(
        'GitHub.',
        'https://github.com/stardust-ui/react/blob/master/packages/react/src/lib/accessibility/FocusZone/AutoFocusZone.tsx',
        true,
      )}
    </p>
  </DocPage>
)
