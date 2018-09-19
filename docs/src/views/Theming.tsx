import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { Button, Divider, Icon, Provider, Text } from '@stardust-ui/react'

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

    <p>Stardust is intentional in supporting three levels of theming needs:</p>
    <ol>
      <li>
        <strong>None</strong> - Users who just need a good first run experience.
      </li>
      <li>
        <strong>Opt-in</strong> - Users who need to change a little or a lot.
      </li>
      <li>
        <strong>Pixel Perfect</strong> - Users who have pixel perfect design requirements.
      </li>
    </ol>

    <p>Let's look at how this is done.</p>

    <Header as="h2" content="Variables" />
    <p>
      The recommended API for customizing the look and feel of components is through theme
      variables. Variables are both easier to use and more robust than styles. Setting a theme
      variable will ensure your value is properly applied to every applicable style in every
      supported permutation.
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
      value={[
        `<Provider theme={{ siteVariables: { brand: 'hotpink' } }}>`,
        `  <div>`,
        `    <Button type="primary">Branding</Button>`,
        `    <Divider type="primary">Branding</Divider>`,
        `  </div>`,
        `</Provider>`,
      ].join('\n')}
      render={() => (
        <Provider theme={{ siteVariables: { brand: 'hotpink' }, componentVariables: {} }}>
          <div>
            <Button type="primary">Branding</Button>
            <Divider type="primary">Branding</Divider>
          </div>
        </Provider>
      )}
    />

    <Header a="h3" content="Component variables" />
    <p>
      Component variables are theme values specific to each component. This includes information
      such as colors, borders, or box model values.
    </p>

    <p>You can define variables on a single component instance.</p>
    <ExampleSnippet
      value={[
        `<Icon name="user" circular />`,
        `<Icon name="user" circular variables={{ color: 'cornflowerblue' }} />`,
      ].join('\n')}
      render={() => (
        <div>
          <Icon name="user" circular />
          <Icon name="user" circular variables={{ color: 'cornflowerblue' }} />
        </div>
      )}
    />

    <p>
      You can also define variables for all components in a tree using the{' '}
      <NavLink to="components/provider">Provider</NavLink>.
    </p>
    <ExampleSnippet
      value={[
        `<Icon name="user" circular />`,
        `<Icon name="user" circular />`,
        '',
        `<Provider theme={{ componentVariables: { Icon: { color: 'cornflowerblue' } } }}>`,
        `  <span>`,
        `    <Icon name="user" circular />`,
        `    <Icon name="user" circular />`,
        `  </span>`,
        `</Provider>`,
      ].join('\n')}
      render={() => (
        <div>
          <Icon name="user" circular />
          <Icon name="user" circular />

          <Provider theme={{ componentVariables: { Icon: { color: 'cornflowerblue' } } }}>
            <span>
              <Icon name="user" circular />
              <Icon name="user" circular />
            </span>
          </Provider>
        </div>
      )}
    />
    <p>
      You can customize all components in your app by defining component variables on a Provider at
      the root of your app.
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
      All Stardust components explicitly define named parts which make up the component's anatomy.
      Example, the <code>Button</code> anatomy defines an <code>icon</code> part.
    </p>

    <p>Styles can be applied to components and their child parts.</p>
    <p>
      {' '}
      You would style the <code>icon</code> part of a <code>Button</code> component.
    </p>

    <ExampleSnippet
      value={[
        `<Button`,
        `  icon="user"`,
        `  content="Profile"`,
        `  styles={{ icon: { borderBottom: '4px solid red' } }}`,
        `/>`,
      ].join('\n')}
      render={() => (
        <Button
          icon="user"
          content="Profile"
          styles={{ icon: { borderBottom: '4px solid red' } }}
        />
      )}
    />

    <p>
      You can style the <code>color</code> css property of a <code>Text</code> component.
    </p>
    <ExampleSnippet
      label="js"
      value={[
        `const style = { color: 'green' }`,
        ``,
        `<Text styles={{ root: { style } }}>This is green text</Text>`,
      ].join('\n')}
      render={() => <Text styles={{ root: { color: 'green' } }}>This is green text.</Text>}
    />

    <Header as="h2" content="Different styling needs" />
    <Header as="h3" content="None" />
    <p>If you do not need any custom theming, just import some components and start building.</p>
    <ExampleSnippet
      value={[
        `import React from 'react'`,
        `import { Button } from '@stardust-ui/react'`,
        ``,
        `export default () => <Button content="Nice" />`,
      ].join('\n')}
      render={() => <Button content="Nice" />}
    />

    <Header as="h3" content="Opt-in" />
    <p>When you need only small amount of styling isolated per component.</p>
    <ExampleSnippet
      value={[
        `import React from 'react'`,
        `import { Button } from '@stardust-ui/react'`,
        ``,
        `const styles = {`,
        `        icon: {color: 'brown'}`,
        `        root: {backgroundColor: 'coral'}`,
        `      }`,
        `const btnExample = () => <Button type="primary" icon="book" iconOnly styles={styles} />`,
        ``,
        `export default btnExample`,
      ].join('\n')}
      render={() => (
        <Button
          type="primary"
          icon="book"
          iconOnly
          styles={{ icon: { color: 'brown' }, root: { backgroundColor: 'coral' } }}
        />
      )}
    />

    <Header as="h3" content="Pixel Perfect" />
    <p>Pixel Perfect</p>
    <ExampleSnippet
      value={[
        `import React from 'react'`,
        `import { Button, Divider, Provider } from '@stardust-ui/react'`,
        ``,
        `const theme = {`,
        `  siteVariables: {`,
        `    brand: 'darkred',`,
        `    brand04: '#8F5873',`,
        `    gray08: '#A8516E',`,
        `    gray06: '#f4c2c2',`,
        `    gray03: '#757575',`,
        `  },`,
        `  componentVariables: {`,
        `    Button: {`,
        `      height: '24px',`,
        `      minWidth: '24px',`,
        `      borderRadius: '8px',`,
        `      color: 'darkred',`,
        `      typeSecondaryColor: '#ffffff',`,
        `      typeSecondaryBorderColor: 'transparent',`,
        `      typeSecondaryBackgroundColor: '#6699CC',`,
        `      typeSecondaryBackgroundColorHover: '#91A3B0',`,
        `    },`,
        `  },`,
        `  componentStyles: {`,
        `    Button: {`,
        `      icon: {`,
        `        fontSize: '12px',`,
        `      },`,
        `    },`,
        `  },`,
        `}`,
        ``,
        `const provider = () => (`,
        `  <Provider theme={theme}>`,
        `    <div>`,
        `      <Button type="primary" icon="plus" iconOnly />`,
        `      <Button type="secondary" icon="at" content="Send email" />`,
        `      <Divider type="primary">Branding primary</Divider>`,
        `      <Divider type="secondary">Branding secondary</Divider>`,
        `    </div>`,
        `  </Provider>`,
        `)`,
        ``,
        `export default provider`,
      ].join('\n')}
      render={() => (
        <div>
          <p>Before:</p>
          <Button type="primary" icon="plus" iconOnly />
          <Button type="secondary" icon="at" content="Send email" />
          <Divider type="primary">Branding primary</Divider>
          <Divider type="secondary">Branding secondary</Divider>

          <p>After:</p>
          <Provider
            theme={{
              siteVariables: {
                brand: 'darkred',
                brand04: '#8F5873',
                gray08: '#A8516E',
                gray06: '#f4c2c2',
                gray03: '#757575',
              },
              componentVariables: {
                Button: {
                  height: '24px',
                  minWidth: '24px',
                  borderRadius: '8px',
                  color: 'darkred',
                  typeSecondaryColor: '#ffffff',
                  typeSecondaryBorderColor: 'transparent',
                  typeSecondaryBackgroundColor: '#6699CC',
                  typeSecondaryBackgroundColorHover: '#91A3B0',
                },
              },
              componentStyles: {
                Button: {
                  icon: {
                    fontSize: '12px',
                  },
                },
              },
            }}
          >
            <div>
              <Button type="primary" icon="plus" iconOnly />
              <Button type="secondary" icon="at" content="Send email" />
              <Divider type="primary">Branding primary</Divider>
              <Divider type="secondary">Branding secondary</Divider>
            </div>
          </Provider>
        </div>
      )}
    />

    <Header as="h2" content="Nesting" />
    <p>
      If you need to customize a bigger part of the theme, you can nest the second provider and
      overwrite the needed styles.
    </p>
    <ExampleSnippet
      value={[
        `<Provider`,
        `  theme={{`,
        `    siteVariables: { brand: 'charcoal' }`,
        `  }}`,
        `>`,
        `  <Provider`,
        `    theme={{`,
        `      componentStyles: {`,
        `        Button: { root: { color: 'goldenrod'} }`,
        `      }`,
        `    }}`,
        `  >`,
        `    <div>`,
        `      <Button type="primary">Branding</Button>`,
        `      <Divider type="primary">Branding</Divider>`,
        `    </div>`,
        `  </Provider>`,
        `</Provider>`,
      ].join('\n')}
      render={() => (
        <Provider theme={{ siteVariables: { brand: 'darkred' } }}>
          <Provider theme={{ componentStyles: { Button: { root: { color: 'goldenrod' } } } }}>
            <div>
              <Button type="primary">Branding</Button>
              <Divider type="primary">Branding</Divider>
            </div>
          </Provider>
        </Provider>
      )}
    />
  </DocPage>
)
