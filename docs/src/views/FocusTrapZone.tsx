import * as React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@stardust-ui/react'
import DocPage from '../components/DocPage'
import { link, code } from '../utils/helpers'

import CodeSnippet from '../components/CodeSnippet'

export default () => (
  <DocPage title="Focus Trap Zone">
    <Header as="h2">Content</Header>
    <ul>
      <li>{link('Overview', 'focus-trap-zone#overview')}</li>
      <li>{link('Usage', 'focus-trap-zone#usage')}</li>
      <li>
        {link('Override FocusTrapZone settings', 'focus-trap-zone#override-focustrapzone-settings')}
      </li>
    </ul>
    <Header as="h2">Overview</Header>
    <p>
      {code('FocusTrapZone')} grabs the focus and traps it within an HTML element, usually a dialog
      or popup. Pressing {code('TAB')} key will circle focus within the inner focusable elements of
      the {code('FocusTrapZone')}. The main purpose is to block user interaction outside{' '}
      {code('FocusTrapZone')}
      in any way. Therefore, keyboard events are not propagated outside {code('FocusTrapZone')}.
    </p>
    <p>
      Stardust leverages Focus Trap Zone component which is based on the{' '}
      {link(
        'Focus Trap Zone from Office UI Fabric.',
        'https://developer.microsoft.com/en-us/fabric#/components/focustrapzone',
      )}
    </p>
    <Header as="h2">Usage</Header>
    <p>
      Stardust applies focus trap via accessibility behavior, the same way as it's done for{' '}
      <Link to="focus-zone">FocusZone</Link>. To enable focus trap for component, it is needed, in
      behavior, to set prop {code('trapFocus')} to
      {code('true')} with default settings or set an object with desired values for focus trap zone
      props. <Link to="accessibility-behaviors">Read more about Accessibility Behaviors.</Link>{' '}
      Currently, it is used for Popup via {code('popupFocusTrapBehavior')} and Dialog via{' '}
      {code('dialogBehavior')}.
    </p>
    <p>
      {code('FocusTrapZone')}'s props which can be applied in accessibility behavior (
      {link(
        'lookup for API on GitHub',
        'https://github.com/stardust-ui/react/blob/master/packages/react/src/lib/accessibility/FocusTrapZone/FocusTrapZone.types.tsx',
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
        <b>className</b> - additional class name to provide to the root element, in addition to the
        ms-FocusZone class.
        <p>Type: {code('string')}</p>
      </li>
      <li>
        <b>elementToFocusOnDismiss</b> - sets the HTMLElement to focus on when exiting the
        {code('FocusTrapZone')}.
        <p>
          Default: The {code('target')} which triggered the {code('FocusTrapZone')}.
        </p>
        <p>Type: {code('React.ReactType')}</p>
      </li>
      <li>
        <b>ariaLabelledBy</b> - sets the "aria-labelledby" attribute.
        <p>Type: {code('string')}</p>
      </li>
      <li>
        <b>isClickableOutsideFocusTrap</b> - if true, allows clicks outside the{' '}
        {code('FocusTrapZone')}.<p>Default: {code('true')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>focusTriggerOnOutsideClick</b> - indicates if the previously focused element outside
        {code('FocusTrapZone')} should be focused on outside click. Note: trigger will be focused
        when exiting FTZ using keyboard. If {code('isClickableOutsideFocusTrap')} ==={' '}
        {code('false')},{code('focusTriggerOnOutsideClick')} will not be taken into account.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>ignoreExternalFocusing</b> - indicates if this Trap Zone will ignore keeping track of
        HTMLElement that activated the Zone.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>forceFocusInsideTrap</b> - indicates whether focus trap zone should force focus inside
        the zone when outside 'focus' event occurs.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>disableFirstFocus</b> - do not put focus onto first element when render focus trap zone.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>focusPreviouslyFocusedInnerElement</b> - specifies the algorithm used to determine which
        descendant element to focus when focus() is called.
        <br /> If false, the first focusable descendant, filtered by the firstFocusableSelector
        property if present, is chosen.
        <br /> If true, the element that was focused when the Trap Zone last had a focused
        descendant is chosen.
        <br /> If it has never had a focused descendant before, behavior falls back to the first
        focused descendant.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>firstFocusableSelector</b> - indicates the selector for first focusable item. By default,
        the first tabbable element will get focus. Only applies if
        {code('focusPreviouslyFocusedInnerElement')} === {code('false')}.
        <p>Type: {code('string | (() => string)')}</p>
      </li>
    </ul>
    <Header as="h2">Override {code('FocusTrapZone')} settings</Header>
    <p>
      To be able to add/override {code('FocusTrapZone')} props already set for a component, it is
      needed to override or create a new accessibility behavior.
    </p>
    <p>
      For example, we want to disable first focus on Popup mount, so we can control the initial
      focus by ourselves.
    </p>
    <CodeSnippet
      value={`
      const overridenFocusTrapBehavior: Accessibility = (props: any) => {
        const behavior = popupFocusTrapBehavior(props)
      
        behavior.trapFocus.disableFirstFocus = true;
      
        return behavior
      }
      `}
    />
    And then use this new behavior by Popup component:
    <CodeSnippet
      label="PopupExample.jsx"
      value={`
        const Popup = () => (
          <Popup accessibility={overridenFocusTrapBehavior} />
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
        <Link to="auto-focus-zone">AutoFocusZone</Link>
      </li>
    </ul>
    <p>
      {code('FocusTrapZone')} code on{' '}
      {link(
        'GitHub.',
        'https://github.com/stardust-ui/react/blob/master/packages/react/src/lib/accessibility/FocusZone/FocusTrapZone.tsx',
        true,
      )}
    </p>
  </DocPage>
)
