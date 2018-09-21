import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { Button, Divider, Grid, Icon, Label, Provider, Text } from '@stardust-ui/react'

import DocPage from '../components/DocPage/DocPage'
import ExampleSnippet from '../components/ExampleSnippet/ExampleSnippet'

export default () => (
  <DocPage title="Theming Examples">
    <Header as="h2" content="Theming needs" />

    <p>
      A Theme defines default values and functions to generate variables that will eventually be
      used to generate styles for individual components.
    </p>
    <p>Stardust is intentional in supporting three levels of theming needs:</p>
    <ol>
      <li>
        <strong>Default</strong> - Users who just need a good first run experience.
      </li>
      <li>
        <strong>Component level styling</strong> - Users who need to change a little or a lot.
      </li>
      <li>
        <strong>Theme level styling</strong> - Users who have pixel perfect design requirements.
      </li>
      <li>
        <strong>Nesting providers</strong> - Users who need some styling at the upper theme level
        but also at component level.
      </li>
    </ol>

    <Header as="h3" content="Default" />
    <p>If you do not need any custom theming, just import some components and start building.</p>
    <ExampleSnippet
      value={[
        `import React from 'react'`,
        `import { Button } from '@stardust-ui/react'`,
        ``,
        `export default () => `,
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
      When you need only small amount of styling isolated per component, you can opt-in to change
      certain local styles or the variables behind it.
    </p>

    <Header as="h4" content="Changing local styles" />

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
      Talking about pixel perfect output, one might need to obtain more detailed changes applied to
      the entire suite of styles. The components styling can be changed at different levels of the
      theme:
    </p>

    <ol>
      <li>
        <code>siteVariables</code> - when more general changes are requested (colors, page container
        sizes, default fonts that can be inherited or not at the detailed component variables
        level),
      </li>
      <li>
        <code>componentVariables</code> - when all the components of certain kind have to have same
        output,
      </li>
      <li>
        <code>componentStyles</code> - when very specific changes are required and not covered by
        the component variables
      </li>
    </ol>

    <ExampleSnippet
      value={[
        `import React from 'react'`,
        `import { Button, Divider, Provider } from '@stardust-ui/react'`,
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

    <Header as="h3" content="Nesting Providers" />
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
        ``,
        `          <Button content="Button" />`,
        `          <Button type="primary" icon="plus" iconOnly />`,
        `          <Button type="secondary" icon="at" content="Send email" />`,
        `          <Icon name="chess rook" size="big" />`,
        `          <Label content="Label with icon" icon="close" />`,
        `          <br/><br/>`,
        `          <Divider content="Primary Divider" type="primary" />`,
        `          <Divider content="Secondary Divider" type="secondary" />`,
        `        </>`,
        `      </Provider>`,
        `    </>`,
        `  </Provider>`,
        `</div>`,
      ].join('\n')}
      render={() => (
        <div>
          <Header as="h3" content="Default" />
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
