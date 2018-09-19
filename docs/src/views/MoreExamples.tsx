import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { Button, Divider, Icon, Provider, Text } from '@stardust-ui/react'

import DocPage from '../components/DocPage/DocPage'
import ExampleSnippet from '../components/ExampleSnippet/ExampleSnippet'

export default () => (
  <DocPage title="More Examples">
    <Header as="h2" content="Different styling needs" />

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
        `<div>`,
        `  <Header as="h3" content="Default" />`,
        `  <Button type="primary">Branding</Button>`,
        `  <Divider type="primary">Branding</Divider>`,
        ``,
        `  <Provider`,
        `    theme={{`,
        `      siteVariables: { brand: 'darkred' },`,
        `    }}`,
        `  >`,
        `    <>`,
        `      <Header as="h3" content="First provider theming" />`,
        `      <Button type="primary">Branding</Button>`,
        `      <Divider type="primary">Branding</Divider>`,
        ``,
        `      <Provider`,
        `        theme={{`,
        `          componentStyles: {`,
        `            Button: {`,
        `              root: { color: 'goldenrod' },`,
        `            },`,
        `          },`,
        `        }}`,
        `      >`,
        `        <>`,
        `          <Header as="h3" content="Second provider theming" />`,
        `          <Button type="primary">Branding</Button>`,
        `          <Divider type="primary">Branding</Divider>`,
        `        </>`,
        `      </Provider>`,
        `    </>`,
        `  </Provider>`,
        `</div>`,
      ].join('\n')}
      render={() => (
        <div>
          <Header as="h3" content="Default" />
          <Button type="primary">Branding</Button>
          <Divider type="primary">Branding</Divider>

          <Provider
            theme={{
              siteVariables: { brand: 'darkred' },
            }}
          >
            <>
              <Header as="h3" content="First provider theming" />
              <Button type="primary">Branding</Button>
              <Divider type="primary">Branding</Divider>

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
                  <Button type="primary">Branding</Button>
                  <Divider type="primary">Branding</Divider>
                </>
              </Provider>
            </>
          </Provider>
        </div>
      )}
    />
  </DocPage>
)
