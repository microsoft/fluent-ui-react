import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { Button, Header, Divider } from '@stardust-ui/react'

import DocPage from '../components/DocPage'
import CodeSnippet from '../components/CodeSnippet'

export default () => (
  <DocPage title="Architecture">
    <Header as="h2">Overview</Header>
    <p>
      There are two main drivers in the architecture decisions: <strong>accessibility</strong> and{' '}
      <strong>theming</strong>.
    </p>
    <p>Stardust UI project consists of two parts:</p>
    <ul>
      <li>
        <strong>Toolkit (Framework)</strong>, which allows to create any component: primitive or
        composed.
      </li>
      <li>
        <strong>Component Library</strong>, which is the set of primitive and composed components.
      </li>
    </ul>

    <Header as="h2">Toolkit (Framework)</Header>
    <p>
      The responsibility of the toolkit part of the project is to provide an easy way to create UI
      components and encapsulate theming and accessibility logic. This part of the project is almost
      UI framework agnostic and written in pure TypeScript. Stardust UI uses this toolkit to create
      our own set of UI Components and allows other consumers to create their own primitive or
      composed components. This architecture allows to combine Stradust UI primitive or composed
      components with the custom primitive or composed components made by third parties, who were
      using the toolkit to create their own components.
    </p>
    <p>The toolkit combines the following parts:</p>
    <ul>
      <li>
        <strong>Component Logic</strong> - the framework core logic, which couples all other parts
        together and handles component properties, state and events, as ell as provides ability to
        inject and handle themes, accessibility behaviors and accessibility keyboard navigation
        handling.
      </li>
      <li>
        <strong>Accessibility behaviors</strong> - the logic which generates appropriate
        accessibility roles and <code>aria-*</code> attributes for the given component based on the
        component state.
      </li>
      <li>
        <strong>Accessibility keyboard handlers</strong> - provides the logic to handle components
        navigation and focus.
      </li>
      <li>
        <strong>Themes</strong> - the logic to inject and handle component visual representation
        (theme).
      </li>
      <li>
        <strong>Renderer</strong> - to render the HTML Output. Current implementation uses React,
        but it can be extended to other frameworks.
      </li>
    </ul>
    <p>
      <img src="assets/stardust_arch_component_logic.png" />
    </p>

    <Header as="h3">Accessibility</Header>
    <p>
      One of the main purposes of the library is to make component accessible and provide ease
      accessibility integration for the entire projects which will be consumer of the library.
    </p>
    <p>
      The library encapsulates accessibility into <strong>Behaviors</strong>. Behavior is the
      object, which has three major responsibilities:
    </p>
    <ul>
      <li>
        Define <code>aria-*</code> attributes for the standard components (e.g. Image, DropDown,
        Dialog, etc), based on their state (e.g. active, disabled, expanded, etc).
      </li>
      <li>
        Define the correct element <code>role</code>, if the HTML element tag differ from standard
        (e.g. use <code>&lt;span&rt;</code> instead of <code>&lt;button&rt;</code>) to represent the
        button element.
      </li>
      <li>
        Define the keyboard navigation and focus handling for the composed components (e.g. List,
        Grid, Radio Group, etc).
      </li>
    </ul>
    <p>
      Library provides the set of accessibility behaviors and keyboard handlers for the components
      and allows to create and inject your own, if it is necessary for some custom components. In
      most cases it should be enough to use the behaviors provided in the library, but, of course,
      you can provide your own or extend existing behaviors.
    </p>
    <p>
      In addition to behaviors and keyboard handlers, the toolkit also provides FocusZone component,
      which can be used to add focus handling for the wrapped component. There is also FocusTrap
      component, which allows to trap the focus inside some area, which is useful for such a
      component as Dialog.
    </p>

    <Header as="h3">Theming</Header>
    <p>
      You can inject different themes into Stardust components (e.g. Light, Dark or High Contrast).
      To achieve this, we use CSS in JS technique, which is provided by{' '}
      <a href="http://fela.js.org/" target="_blank">
        Fela library
      </a>.
    </p>
    <p>
      Each component has its own set of themes defined. Component logic handles theme switching and
      style overriding by providing ability to set <strong>variables</strong> or override component
      (or its children) styles using <code>styles</code> property.
    </p>
    <p>
      Component styling is managed by the theme provider, which has to wrap components to provide
      default theme and theme switching. Providers can be nested, this is necessary in case if you
      need to use different theme in children and parent components.
    </p>
    <p>
      Additional info about how to use themes or override styles can be found in the{' '}
      <a href="themeing">Theming guide</a>.
    </p>

    <Header as="h3">UIComponent</Header>
    <p>
      The <code>UIComponent</code> is the base component, which handles component default
      properties, accessibility navigation and focus handling and renders the component.
    </p>
    <p>
      We recommend to use <code>UIComponent</code> instead of <code>React.Component</code> when you
      create your own primitive or composed component, to leverage ability of injecting
      accessibility and theming, instead of implementing your own mechanisms for handling these
      parts.
    </p>

    <Header as="h3">AutoControlledComponent</Header>
    <p>
      The <code>AutoControlledComponent</code> is another base component that is used when it's
      necessary to maintain state. It allows to set its initial state based on default properties
      and allows to override state by property with the same name.
    </p>

    <Header as="h2">Component Library</Header>
    <p>
      The Component Library is a catalog of components, primitive and composed, which has predefined
      behavior, themes and accessibility and can be customized using their properties or by
      injecting additional themes and/or children components.
    </p>

    <Header as="h3">Components</Header>
    <p>
      Each component is inherited from <code>UIComponent</code> or{' '}
      <code>AutoControlledComponent</code> and includes the logic to handle <strong>theming</strong>{' '}
      and <strong>accessibility</strong>. Each component has default{' '}
      <strong>accessibility behavior</strong>, which can be overridden by consumer of the library.
      The same can be done with component look and feel by overriding theme styles or setting theme
      variables.
    </p>

    <Header as="h3">Accessibility Behaviors</Header>
    <p>
      <strong>Accessibility Behavior</strong> is a function that returns the set of the
      accessibility attributes based on the component state and allows to bind keyboard navigation
      and focus handling with the corresponding methods.
    </p>
    <CodeSnippet
      label="ButtonBehavior.ts"
      value={[
        `import { Accessibility } from '../../interfaces'`,
        ``,
        `const ButtonBehavior: Accessibility = (props: any) => ({`,
        `  attributes: {`,
        `    root: {`,
        `      role: props.as === 'button' ? undefined : 'button',`,
        `      'aria-disabled': !!props['disabled'],`,
        `    },`,
        `  },`,
        `})`,
        ``,
        `export default ButtonBehavior`,
      ].join('\n')}
    />
    <p>
      Each component has a default accessibility behavior, which can be overridden by injecting the
      other one using <code>accessibility</code> property of the component. Or you can override,
      just single attribute by setting it value on the component.
    </p>
    <CodeSnippet
      label="myButton.tsx"
      value={[
        `<Button type="primary" content="Primary" accessibility="ToggleButtonBehavior" />`,
        `...`,
        `<Button type="primary" content="Primary" aria-disabled="true" />`,
      ].join('\n')}
    />
    <p>
      Additional info about how to use it can be found in the{' '}
      <a href="accessibility/#accessibility-behaviours">Accessibility guide</a>.
    </p>

    <Divider />
    <br />
    {/* Show a preview of the above snippet */}
    <Button
      as={NavLink}
      content="Accessibility"
      type="primary"
      icon="arrow left"
      iconPosition="before"
      to="accessibility"
    />
    <Button
      as={NavLink}
      content="Theming"
      type="primary"
      icon="arrow right"
      iconPosition="after"
      to="theming"
    />
  </DocPage>
)
