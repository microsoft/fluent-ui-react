import * as React from 'react'
import * as cx from 'classnames'
import { NavLink } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import {
  Button,
  Divider,
  Provider,
  createComponent,
  ComponentSlotStyle,
  ComponentVariablesInput,
} from '@stardust-ui/react'

import DocPage from '../components/DocPage/DocPage'
import ExampleSnippet from '../components/ExampleSnippet/ExampleSnippet'
import { ReactChildren } from '../../../types/utils'

interface StyledButtonProps {
  className?: string
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  children?: ReactChildren
}

const StyledButton: React.SFC<StyledButtonProps> = createComponent<StyledButtonProps>({
  displayName: 'StyledButton',
  render({ stardust, className, children }) {
    const { classes } = stardust
    return <button className={cx(className, classes.root)}>{children}</button>
  },
})

export default () => (
  <DocPage title="Integrate Custom Components">
    <Header as="h2" content="Overview" />
    <p>
      You can use your own components as part of the Stardust's styling and theming mechanisms. In
      order for all theming aspects to be available to your custom components, you should use the{' '}
      <code>createComponent</code> function, provided by the Stardust library.
    </p>

    <Header as="h2" content="Create custom component" />
    <p>
      Let's take a look into one simple example of using the <code>createComponent</code> function
      for adapting your custom component to the Stardust's styling and theming mechanisms.
    </p>

    <ExampleSnippet
      value={[
        `import { createComponent } from '@stardust-ui/react'`,
        ``,
        `const StyledButton = createComponent({`,
        `  displayName: 'StyledButton',`,
        `  render: ({stardust, className, children}) => {`,
        `    const { classes } = stardust`,
        `    return <button className={cx(className, classes.root)}>{children}</button>`,
        `  }`,
        `})`,
      ].join('\n')}
    />

    <p>
      Let's go step by step throughout all bits from the <code>createComponent</code> method.
    </p>

    <p>
      The first argument to the <code>createComponent</code> config's param is the is the{' '}
      <code>displayName</code>, which value might be used as key to define component's styles and
      variables in theme, exactly the same way how it might be done for any first-class Stardust
      component.
    </p>

    <ExampleSnippet
      value={[
        `<Provider`,
        `  theme={{`,
        `    componentVariables: {`,
        `      StyledButton: {`,
        `        color: '#F2F2F2',`,
        `      },`,
        `    },`,
        `    componentStyles: {`,
        `      StyledButton: {`,
        `        root: ({ props, variables, theme: {siteVariables} }) => ({`,
        `          backgroundColor: siteVariables.brand,`,
        `          color: variables.color,`,
        `        }),`,
        `      },`,
        `    },`,
        `  }}`,
        `>`,
        `  <StyledButton> Provider styled button </StyledButton>`,
        '</Provider>',
      ].join('\n')}
      render={() => (
        <Provider
          theme={{
            componentVariables: {
              StyledButton: {
                color: '#F2F2F2',
              },
            },
            componentStyles: {
              StyledButton: {
                root: ({ props, variables, theme: { siteVariables } }) => ({
                  backgroundColor: siteVariables.brand,
                  color: (variables as any).color,
                }),
              },
            },
          }}
        >
          <StyledButton>Provider styled button</StyledButton>
        </Provider>
      )}
    />

    <p>
      The second argument of the <code>createComponent</code> config param is the{' '}
      <code>render</code> method. This is the place where where you might link Stardust bits with
      your custom component - e.g. by simply passing them as props. This <code>render</code> method
      will be invoked with the following parameters:
    </p>
    <ul>
      <li>
        <code>stardust</code> - the object containing the evaluated theming props (<code>
          classes
        </code>
        and <code>rtl</code>).
      </li>
      <li>
        <code>...props</code> - all other props provided by the user.
      </li>
    </ul>

    <Header as="h2" content="Using the custom components" />

    <p>
      We already saw how the <code>Provider</code> can define some stylings and variables for the
      custom components. Next, we will take a look into several examples of how the user can further
      customize styles and variables of these components, the same way they would do with the
      Stardust components.
    </p>

    <Header
      as="h3"
      content={
        <>
          Example 1. Using <code>styles</code> property
        </>
      }
    />

    <ExampleSnippet
      value={[
        `<StyledButton styles={{backgroundColor: "black"}}>`,
        `  Inline styled button`,
        `</StyledButton>`,
      ].join('\n')}
      render={() => (
        <Provider
          theme={{
            componentVariables: {
              StyledButton: {
                color: '#F2F2F2',
              },
            },
            componentStyles: {
              StyledButton: {
                root: ({ props, variables, theme: { siteVariables } }) => ({
                  backgroundColor: siteVariables.brand,
                  color: (variables as any).color,
                }),
              },
            },
          }}
        >
          <StyledButton styles={{ backgroundColor: 'black' }}>Inline styled button</StyledButton>
        </Provider>
      )}
    />

    <Header
      as="h3"
      content={
        <>
          Example 2. Using <code>variables</code> property
        </>
      }
    />

    <ExampleSnippet
      value={[
        `<StyledButton variables={{color: "black" }}>`,
        `  Inline styled button`,
        `</StyledButton>`,
      ].join('\n')}
      render={() => (
        <Provider
          theme={{
            componentVariables: {
              StyledButton: {
                color: '#F2F2F2',
              },
            },
            componentStyles: {
              StyledButton: {
                root: ({ props, variables, theme: { siteVariables } }) => ({
                  backgroundColor: siteVariables.brand,
                  color: (variables as any).color,
                }),
              },
            },
          }}
        >
          <StyledButton variables={{ color: 'black' }}>inline styled button</StyledButton>
        </Provider>
      )}
    />

    <p>
      All other advanced scenarios for applying styles and variables are supported as well. For more
      information, please, take a look in the{' '}
      <NavLink to="theming-examples">Theming Examples</NavLink>.
    </p>

    <br />
    <Divider size={1} />
    <br />
    <Button
      as={NavLink}
      content="Theming Examples"
      icon="arrow left"
      iconPosition="before"
      primary
      to="/theming-examples"
    />
  </DocPage>
)
