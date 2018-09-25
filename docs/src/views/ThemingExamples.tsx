import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { Button, Divider, Icon, Label, Provider } from '@stardust-ui/react'

import DocPage from '../components/DocPage/DocPage'
import ExampleSnippet from '../components/ExampleSnippet/ExampleSnippet'

export default () => (
  <DocPage title="Theming Examples">
    <Header as="h2" content="Theming techniques" />

    <p>
      A Theme is used to ensure design consistency accross an application. It can define styles that
      are common accross the application and for particular component types. Stardust will provide
      some parameterizable standard themes or you can create your own.
    </p>
    <p>
      Startdust theme is constructed around CSS-like style objects (<NavLink to="theming#styles">
        styles
      </NavLink>) and <NavLink to="theming#variables">variables</NavLink>.
    </p>
    <p>Stardust supports four levels of theming:</p>
    <ol>
      <li>
        <strong>Default</strong> - for users who just need a good first run experience.
      </li>
      <li>
        <strong>Component level styling</strong> - for users who need to change a little or a lot.
      </li>
      <li>
        <strong>Theme level styling</strong> - for users who require design consistency accross the
        application.
      </li>
      <li>
        <strong>Nesting themes</strong> - for users who require different styling for the different
        parts of the application.
      </li>
    </ol>

    <Header as="h3" content="Default" />
    <p>If you do not need any custom theming, just import some components and start using them.</p>
    <ExampleSnippet
      value={[
        `import React from 'react'`,
        `import { Button, Divider, Icon, Label, Provider } from '@stardust-ui/react'`,
        ``,
        `export default () => `,
        ` <Provider>`,
        `  <>`,
        `    <Button content="Button" />`,
        `    <Button type="primary" icon="plus" iconOnly />`,
        `    <Button type="secondary" icon="at" content="Send email" />`,
        `    <Icon name="chess rook" size="big" />`,
        `    <Label content="Label with icon" icon="close" />`,
        `    <br/><br/>`,
        `    <Divider content="Primary Divider" type="primary" />`,
        `    <Divider content="Secondary Divider" type="secondary" />`,
        `  </>`,
        ` </Provider>`,
      ].join('\n')}
      render={() => (
        <>
          <Button content="Button" />
          <Button type="primary" icon="plus" iconOnly />
          <Button type="secondary" icon="at" content="Send email" />
          <Icon name="chess rook" size="big" />
          <Label content="Label with icon" icon="close" />
          <br />
          <br />
          <Divider content="Primary Divider" type="primary" />
          <Divider content="Secondary Divider" type="secondary" />
        </>
      )}
    />

    <Header as="h3" content="Component Level Styling" />
    <p>
      When you need to tweak styles of specific component's instance, you can change its styles
      directly or via theme-defined variables. This technique can be used to create component
      wrappers, like in the examples below.
    </p>

    <Header as="h4" content="Changing component styles" />

    <ExampleSnippet
      value={[
        `import React from 'react'`,
        `import { Button } from '@stardust-ui/react'`,
        ``,
        `const styles = {`,
        `        color: "coral",`,
        `        backgroundColor: "coral",`,
        `        fontSize: "14px",`,
        `        padding: "0 10px",`,
        `      }`,
        `const btnExample = () => `,
        `    <Button`,
        `      type="secondary"`,
        `      content="Send email"`,
        `      icon={{`,
        `        name: "at",`,
        `        styles: { color: "brown" }`,
        `      }}`,
        `      styles={styles} />`,
        ``,
        `export default btnExample`,
      ].join('\n')}
      render={() => (
        <Button
          type="secondary"
          content="Send email"
          icon={{ name: 'at', styles: { color: 'brown' } }}
          styles={{
            color: 'coral',
            backgroundColor: 'charcoal',
            fontSize: '14px',
            padding: '0 10px',
          }}
        />
      )}
    />

    <Header as="h4" content="Changing component variables" />

    <ExampleSnippet
      value={[
        `import React from 'react'`,
        `import { Button } from '@stardust-ui/react'`,
        ``,
        `const btnExample = () => `,
        `    <Button`,
        `      type="secondary"`,
        `      icon={{`,
        `        name: "at",`,
        `        variables: { color: "brown" }`,
        `      }}`,
        `      content="Send email"`,
        `      variables={{`,
        `        typeSecondaryColor: "coral",`,
        `        typeSecondaryBackgroundColor: "charcoal"`,
        `        paddingLeftRightValue: 20`,
        `      }}`,
        `    />`,
        ``,
        `export default btnExample`,
      ].join('\n')}
      render={() => (
        <Button
          type="secondary"
          content="Send email"
          icon={{ name: 'at', variables: { color: 'brown' } }}
          variables={{
            typeSecondaryColor: 'coral',
            typeSecondaryBackgroundColor: 'charcoal',
            paddingLeftRightValue: 20,
          }}
        />
      )}
    />

    <Header as="h3" content="Theme Level Styling" />
    <p>
      To achieve pixel perfect output, one might need to obtain more detailed changes applied to the
      entire suite of styles. The components styling can be changed at different levels of the
      theme:
    </p>

    <ul>
      <li>
        <code>siteVariables</code> - those define theme-wide styling parameters that could affect
        styles of all the components. One might want to consider to modify them when more general
        changes are requested (colors, page container sizes, default fonts that can be inherited),
      </li>
      <li>
        <code>componentVariables</code> - define variables that will affect styles of specific
        component type only,
      </li>
      <li>
        <code>componentStyles</code> - define CSS properties that will be applied to components of
        specific type. Those have the same scope as component variables, but serve as a lower level
        styling abstraction (and, thus, are more specific). Consider to use them when very specific
        changes are required and not covered by the component variables provided by theme.
      </li>
    </ul>

    <ExampleSnippet
      value={[
        `import React from 'react'`,
        `import { Button, Divider, Icon, Label, Provider } from '@stardust-ui/react'`,
        ``,
        `const theme = {`,
        `  siteVariables: {`,
        `    brand: 'darkred',`,
        `    brand04: '#8F5873',`,
        `    gray08: '#A8516E8C',`,
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
        `      <Button content="Button" />`,
        `      <Button type="primary" icon="plus" iconOnly />`,
        `      <Button type="secondary" icon="at" content="Send email" />`,
        `      <Icon name="chess rook" size="big" />`,
        `      <Label content="Label with icon" icon="close" />`,
        `      <br /><br />`,
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
          <Provider
            theme={{
              siteVariables: {
                brand: 'darkred',
                brand04: '#8F5873',
                gray08: '#A8516E8C',
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
              <Button content="Button" />
              <Button type="primary" icon="plus" iconOnly />
              <Button type="secondary" icon="at" content="Send email" />
              <Icon name="chess rook" size="big" />
              <Label content="Label with icon" icon="close" />
              <br />
              <br />
              <Divider content="Primary Divider" type="primary" />
              <Divider content="Secondary Divider" type="secondary" />
            </div>
          </Provider>
        </div>
      )}
    />

    <Header as="h3" content="Nesting Themes" />
    <p>
      If you have areas of an application that require additional theming, you can achieve that
      using nested providers and overwrite the needed styles.
    </p>
    <ExampleSnippet
      value={[
        `<div>`,
        `  /* Default theming */`,
        `  <Header as="h3" content="Default" />`,
        `  <Button type="primary">Branding</Button>`,
        `  <Divider type="primary">Branding</Divider>`,
        ``,
        `  /* First provider theming */`,
        `  <Provider`,
        `    theme={{`,
        `      siteVariables: { brand: 'darkred' },`,
        `    }}`,
        `  >`,
        `    <div>`,
        `      <Header as="h3" content="First provider theming" />`,
        ``,
        `      <Button content="Button" />`,
        `      <Button type="primary" icon="plus" iconOnly />`,
        `      <Button type="secondary" icon="at" content="Send email" />`,
        `      <Icon name="chess rook" size="big" />`,
        `      <Label content="Label with icon" icon="close" />`,
        `      <br/><br/>`,
        `      <Divider content="Primary Divider" type="primary" />`,
        `      <Divider content="Secondary Divider" type="secondary" />`,
        ``,
        `      /* Second provider theming */`,
        `      <Provider`,
        `        theme={{`,
        `          componentStyles: {`,
        `            Button: {`,
        `              root: { color: 'goldenrod' },`,
        `            },`,
        `          },`,
        `        }}`,
        `      >`,
        `        <div>`,
        `          <Header as="h3" content="Second provider theming" />`,
        ``,
        `          <Button content="Button" />`,
        `          <Button type="primary" icon="plus" iconOnly />`,
        `          <Button type="secondary" icon="at" content="Send email" />`,
        `          <Icon name="chess rook" size="big" />`,
        `          <Label content="Label with icon" icon="close" />`,
        `          <br/><br/>`,
        `          <Divider content="Primary Divider" type="primary" />`,
        `          <Divider content="Secondary Divider" type="secondary" />`,
        `        </div>`,
        `      </Provider>`,
        `    </div>`,
        `  </Provider>`,
        `</div>`,
      ].join('\n')}
      render={() => (
        <div>
          <Header as="h3" content="Default theming" />
          <Button content="Button" />
          <Button type="primary" icon="plus" iconOnly />
          <Button type="secondary" icon="at" content="Send email" />
          <Icon name="chess rook" size="big" />
          <Label content="Label with icon" icon="close" />
          <br />
          <br />
          <Divider content="Primary Divider" type="primary" />
          <Divider content="Secondary Divider" type="secondary" />

          <Provider
            theme={{
              siteVariables: { brand: 'darkred' },
            }}
          >
            <>
              <Header as="h3" content="First provider theming" />

              <Button content="Button" />
              <Button type="primary" icon="plus" iconOnly />
              <Button type="secondary" icon="at" content="Send email" />
              <Icon name="chess rook" size="big" />
              <Label content="Label with icon" icon="close" />
              <br />
              <br />
              <Divider content="Primary Divider" type="primary" />
              <Divider content="Secondary Divider" type="secondary" />

              <Provider
                theme={{
                  componentStyles: {
                    Button: {
                      root: { color: 'goldenrod' },
                    },
                  },
                }}
              >
                <>
                  <Header as="h3" content="Second provider theming" />

                  <Button content="Button" />
                  <Button type="primary" icon="plus" iconOnly />
                  <Button type="secondary" icon="at" content="Send email" />
                  <Icon name="chess rook" size="big" />
                  <Label content="Label with icon" icon="close" />
                  <br />
                  <br />
                  <Divider content="Primary Divider" type="primary" />
                  <Divider content="Secondary Divider" type="secondary" />
                </>
              </Provider>
            </>
          </Provider>
        </div>
      )}
    />

    <Divider size={1} />
    <br />
    <Button
      as={NavLink}
      content="Theming"
      type="primary"
      icon="arrow left"
      iconPosition="before"
      to="theming"
    />
  </DocPage>
)
