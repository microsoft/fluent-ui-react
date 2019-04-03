import * as React from 'react'
import { Header } from '@stardust-ui/react'
import DocPage from '../components/DocPage'
import { link, code } from '../utils/helpers'

import CodeSnippet from '../components/CodeSnippet'

export default () => (
  <DocPage title="Focus Trap Zone">
    <Header as="h2">Content</Header>
    <ul>
      <li>{link('Overview', '/focus-trap-zone#overview')}</li>
      <li>{link('Usage', '/focus-trap-zone#usage')}</li>
      <li>
        {link(
          'Override FocusTrapZone settings',
          '/focus-trap-zone#override-focustrapzone-settings',
        )}
      </li>
    </ul>
    <Header as="h2">Overview</Header>
    <p>
      FocusTrapZone is used to trap the focus in any html element. Pressing TAB key will circle
      focus within the inner focusable elements of the FocusTrapZone.
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
      In Stardust focus trap is applied through accessibility behavior, as for focus zone. To enable
      focus trap for component, it is needed, in behavior, to set prop {code('trapFocus')} to{' '}
      {code('true')} with default settings or set an object with desired values for focus trap zone
      props. {link('Read more about Accessibility Behaviors.', '/accessibility-behaviors')}
      Currently, it is used for Popup via {code('popupFocusTrapBehavior')} and Dialog via{' '}
      {code('dialogBehavior')}.
    </p>
    <p>FocusTrapZone's props which can be applied in accessibility behavior:</p>
    <ul>
      <li>
        <b>as</b> - Element type the root element will use. Default is "div".
        <p>Type: {code('React.ReactType')}</p>
      </li>
      <li>
        <b>className</b> - Additional class name to provide on the root element, in addition to the
        ms-FocusZone class.
        <p>Type: {code('string')}</p>
      </li>
      <li>
        <b>elementToFocusOnDismiss</b> - Sets the HTMLElement to focus on when exiting the
        FocusTrapZone.
        <p>Default: The {code('target')} which triggered the FocusTrapZone.</p>
        <p>Type: {code('React.ReactType')}</p>
      </li>
      <li>
        <b>ariaLabelledBy</b> - Sets the "aria-labelledby" attribute.
        <p>Type: {code('string')}</p>
      </li>
      <li>
        <b>isClickableOutsideFocusTrap</b> - if true, allows clicks outside the FocusTrapZone.
        <p>Default: {code('true')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>focusTriggerOnOutsideClick</b> - Indicates if the previously focused element outside
        FocusTrapZone should be focused on outside click. Note: trigger will be focused when exiting
        FTZ using keyboard. If {code('isClickableOutsideFocusTrap')} === {code('false')},
        {code('focusTriggerOnOutsideClick')} will not be taken into account.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>ignoreExternalFocusing</b> - Indicates if this Trap Zone will ignore keeping track of
        HTMLElement that activated the Zone.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>forceFocusInsideTrap</b> - Indicates whether focus trap zone should force focus inside
        the zone when outside 'focus' event occurs.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>disableFirstFocus</b> - Do not put focus onto first element when render focus trap zone.
        <p>Default: {code('false')}</p>
        <p>Type: {code('boolean')}</p>
      </li>
      <li>
        <b>focusPreviouslyFocusedInnerElement</b> - Specifies the algorithm used to determine which
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
        <b>firstFocusableSelector</b> - Indicates the selector for first focusable item. By default,
        the first tabbable element will get focus. Only applies if
        {code('focusPreviouslyFocusedInnerElement')} === {code('false')}.
        <p>Type: {code('string | (() => string)')}</p>
      </li>
    </ul>
    <Header as="h2">Override FocusTrapZone settings</Header>
    <p>
      To be able to add/override FocusTrapZone props already set for a component, it is needed to
      override or create a new accessibility behavior.
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
      <li>{link('Accessibility Behaviors', '/accessibility-behaviors')}</li>
      <li>{link('Focus Zone', '/focus-zone')}</li>
      <li>{link('Auto Focus Zone', '/auto-focus-zone')}</li>
    </ul>
    <p>
      FocusTrapZone code on{' '}
      {link(
        'GitHub.',
        'https://github.com/stardust-ui/react/blob/master/packages/react/src/lib/accessibility/FocusZone/FocusTrapZone.tsx',
        true,
      )}
    </p>
  </DocPage>
)
