import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Divider, Icon, Provider, Text, Animation, Header } from '@stardust-ui/react'

import DocPage from '../components/DocPage/DocPage'
import ExampleSnippet from '../components/ExampleSnippet/ExampleSnippet'

export default () => (
  <DocPage title="Theming">
    <Header as="h2" content="Overview" />
    <p>
      Stardust is a fully themable component library. Theming is opt-in, allowing you to theme as
      much or as little as needed. Themes can be applied to your entire app, to specific subtrees,
      or to individual components. You can also infinitely nest and override themes.
    </p>

    <p>Let's look at how this is done.</p>

    <Header as="h2" content="Variables" />
    <p>
      The recommended API for customizing the look and feel of components is through theme
      variables. Variables are both easier to use and more robust than styles. Setting a theme
      variable will ensure your value is properly applied to every applicable style in every
      supported usage of the component.
    </p>

    <p>Variables are defined at two levels, the site level and the component level.</p>

    <Header a="h3" content="Site variables" />
    <p>
      Site variables define your site, app, or business. These are global values, like brand colors
      and typography, that are shared across many components.
    </p>
    <p>
      You define site variables using the <NavLink to="components/provider">Provider</NavLink>.
    </p>

    <ExampleSnippet
      render={() => (
        <Provider
          theme={{
            siteVariables: {
              colors: {
                white: '#FFF',
                grey: {
                  50: '#F2F2F2',
                  100: '#E6E6E6',
                  200: '#CCCCCC',
                  300: '#B3B3B3',
                  400: '#999999',
                  500: '#737373',
                  600: '#666666',
                  700: '#4D4D4D',
                  800: '#333333',
                  900: '#1A1A1A',
                },
                primary: {
                  50: 'white',
                  100: 'white',
                  200: 'white',
                  300: 'pink',
                  400: 'lightpink',
                  500: 'hotpink',
                  600: 'deeppink',
                  700: 'palevioletred',
                  800: 'black',
                  900: 'black',
                },
              },
            },
          }}
        >
          <Button primary>Branding</Button>
        </Provider>
      )}
    />

    <Header a="h3" content="Component variables" />
    <p>
      Component variables define theme values for a specific component. This includes information
      such as colors, borders, or box model values.
    </p>

    <p>You can define component variables on a single instance of a component.</p>
    <ExampleSnippet
      render={() => (
        <>
          <Icon name="user" circular />
          <Icon name="user" circular variables={{ color: 'cornflowerblue' }} />
        </>
      )}
    />

    <p>
      You can also define component variables for all components in a part of your render tree using
      the <NavLink to="components/provider">Provider</NavLink>.
    </p>
    <ExampleSnippet
      render={() => (
        <>
          <Icon name="user" circular />
          <Icon name="user" circular />

          <Provider theme={{ componentVariables: { Icon: { color: 'cornflowerblue' } } }}>
            <span>
              <Icon name="user" circular />
              <Icon name="user" circular />
            </span>
          </Provider>
        </>
      )}
    />
    <p>
      You can customize component variables for your entire app by defining component variables on a{' '}
      <NavLink to="components/provider">Provider</NavLink> at the root of your app.
    </p>

    <Header as="h2" content="Styles" />
    <blockquote>
      <strong>First, prefer variables</strong> - In order to override component styles you must
      understand and align your overrides to the current theme's style implementation. You also must
      ensure you properly override styles for every permutation of props for the component, which
      can be complex at times. Otherwise, you risk breaking styles in some usages of the component.
      This makes style overrides more brittle and less desirable than variable overrides.
    </blockquote>

    <p>
      Styles are available as an escape hatch for when there is no suitable theme variable available
      for your needs. Component <code>styles</code> are CSS-like style objects that are converted to
      real CSS and applied to your component as HTML class names.
    </p>

    <p>
      You can define <code>styles</code> on a single component instance.
    </p>
    <ExampleSnippet render={() => <Text styles={{ color: 'green' }}>This is green text</Text>} />
    <p>
      Every slot (named part) of every component also accepts <code>styles</code> that are applied
      to the root element of the slot.
    </p>
    <ExampleSnippet
      render={() => (
        <Button icon={{ name: 'user', styles: { boxShadow: '0 0 0 2px red' } }} content="Profile" />
      )}
    />

    <p>
      You can also define <code>styles</code> for all components in a part of your render tree using
      the <NavLink to="components/provider">Provider</NavLink>.
    </p>
    <p>
      This is done with the Provider's <code>theme</code> prop. Styles are applied based on
      component display name and slot name. Here's how we can style the <code>Button</code> and its{' '}
      <code>icon</code> slot.
    </p>
    <ExampleSnippet
      render={() => (
        <>
          <Button icon="user" content="Profile" />
          <Button icon="user" content="Profile" />

          <Provider
            theme={{
              componentStyles: {
                Button: {
                  root: { boxShadow: '0 0 0 2px blue' },
                  icon: { boxShadow: '0 0 0 2px red' },
                  content: { boxShadow: '0 0 0 2px green' },
                },
              },
            }}
          >
            <span>
              <Button icon="user" content="Profile" />
              <Button icon="user" content="Profile" />
            </span>
          </Provider>
        </>
      )}
    />
    <p>
      You can style all components in your app by defining component styles on a{' '}
      <NavLink to="components/provider">Provider</NavLink> at the root of your app.
    </p>

    <Header as="h2" content="Animations" />
    <p>
      You define animations in Stardust in a very similar way to CSS, by providing keyframes and
      animation properties.
    </p>

    <ExampleSnippet
      value={`
        <Provider
          theme={{
            animations: {
              spinner: {
                keyframe: {
                  from: { transform: 'rotate(0deg)' },
                  to: { transform: 'rotate(360deg)' },
                },
                duration: '5s',
                iterationCount: 'infinite',
              },
            },
          }}
        >
          ...
        </Provider>
      `}
    />

    <p>
      You can define the <code>animations</code> in a part of your render tree using the{' '}
      <NavLink to="components/provider">Provider</NavLink>.
    </p>
    <p>
      This is done with the Provider's <code>theme</code> prop. The animations are then applied
      based on their name by using the <NavLink to="components/Animation">Animation</NavLink>{' '}
      component, or the <code>animation</code> property available on all Stardust component. Here's
      how we can use them in our components.
    </p>
    <ExampleSnippet
      render={() => (
        <Provider
          theme={{
            animations: {
              spinner: {
                keyframe: {
                  from: { transform: 'rotate(0deg)' },
                  to: { transform: 'rotate(360deg)' },
                },
                duration: '5s',
                iterationCount: 'infinite',
              },
            },
          }}
        >
          <div>
            <Animation name="spinner">
              <Icon name="user" circular />
            </Animation>
            <Icon name="book" animation="spinner" circular />
          </div>
        </Provider>
      )}
    />

    <p>
      You can also override some of the defined <code>animation</code> properties, by providing
      additional properties to the <code>Animation</code> component, or the <code>animation</code>{' '}
      prop.
    </p>

    <blockquote>
      <strong>Keyframes are static</strong> - Keyframes cannot be overridden using the properties.
      If you want to add new keyframes or change some existing, please use the <code>Provider</code>{' '}
      for this. The API for
      <i>using</i> the animations doesn't provide any way for changing the keyframes.
    </blockquote>

    <ExampleSnippet
      render={() => (
        <Provider
          theme={{
            animations: {
              spinner: {
                keyframe: {
                  from: { transform: 'rotate(0deg)' },
                  to: { transform: 'rotate(360deg)' },
                },
                duration: '5s',
                iterationCount: 'infinite',
              },
            },
          }}
        >
          <div>
            <Animation name="spinner" delay="2s" duration="1s">
              <Icon name="user" circular />
            </Animation>
            <Icon
              name="book"
              animation={{ name: 'spinner', delay: '5s', duration: '2s' }}
              circular
            />
          </div>
        </Provider>
      )}
    />

    <p>
      The difference between using the Animation component versus the animation property is that,
      the Animation component can be safely used for applying animations on{' '}
      <i>all components (Stardust, custom and third party components)</i>. For the Stardust
      components, we recommend using the animation property as there will be no wrapper element
      added just for the purpose of defining the animation. For more details, please see the
      examples in the <NavLink to="components/Animation">Animation</NavLink> component, or the
      structure of the <code>animation</code> property in any of the Stardust components.
    </p>

    <br />
    <Divider size={1} />
    <br />
    <Button
      as={NavLink}
      content="Accessibility"
      icon="arrow left"
      iconPosition="before"
      primary
      to="/accessibility"
    />
    <Button
      as={NavLink}
      content="Theming Examples"
      icon="arrow right"
      iconPosition="after"
      primary
      to="theming-examples"
    />
  </DocPage>
)
