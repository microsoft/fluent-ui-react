import * as React from 'react'
import * as cx from 'classnames'
import * as _ from 'lodash'
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

interface StyledButtonProps {
  className?: string
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  children?: React.ReactNodeArray | React.ReactNode
}

const StyledButton: React.SFC<StyledButtonProps> = createComponent<StyledButtonProps, {}>({
  displayName: 'StyledButton',
  render({ stardust, ...props }) {
    const { classes } = stardust
    const componentProps = _.pick(props, 'children')
    return <button className={cx(props.className, classes.root)} {...componentProps} />
  },
})

export default () => (
  <DocPage title="Custom Components">
    <Header as="h2" content="Overview" />
    <p>
      You can use your own components as part of the Stardust's theming mechanism. In order for all
      theming aspects to be available to your custom components, you should use the{' '}
      <code>createComponent</code>
      function, provided by the Stardust library.
    </p>

    <Header as="h2" content="Create custom component" />
    <p>
      Let's take a look into one simple example of using the <code>createComponent</code> function
      for adapting your custom component to the Stardust's theming mechanism.
    </p>

    <ExampleSnippet
      value={[
        `import { createComponent } from '@stardust-ui/react'`,
        ``,
        `export interface StyledButtonProps {`,
        `  className?: string`,
        `  styles?: ComponentSlotStyle`,
        `  variables?: ComponentVariablesInput`,
        `  children?: React.ReactNodeArray | React.ReactNode`,
        `}`,
        ``,
        `const StyledButton: React.SFC<StyledButtonProps> = createComponent<StyledButtonProps, {}>({`,
        `  displayName: 'StyledButton',`,
        `  render: ({stardust, ...props}) => {`,
        `    const { classes } = stardust`,
        `    const componentProps = _.pick(props, 'children')`,
        `    return (<button className={cx(props.className, classes.root)} {...componentProps} />)`,
        `  }`,
        `})`,
      ].join('\n')}
    />

    <p>Let's go step by step throughout all bits from the renderComponent method.</p>

    <p>
      The first argument to the <code>createComponent</code> config's param is the displayName. This
      name is very important, because that's the key that will be used in the Provider's theme if
      you want to define some styles or variables for this custom component. Let's see one example:
    </p>

    <ExampleSnippet
      value={[
        `<Provider`,
        `  theme={{`,
        `    componentStyles: {`,
        `      StyledButton: {`,
        `        root: ({ props, variables, theme: {siteVariables} }) => ({`,
        `          backgroundColor: siteVariables.brand,`,
        `          color: (variables as any).color,`,
        `        }),`,
        `      },`,
        `    },`,
        `    componentVariables: {`,
        `      StyledButton: {`,
        `        color: '#F2F2F2',`,
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
            componentStyles: {
              StyledButton: {
                root: ({ props, variables, theme: { siteVariables } }) => ({
                  backgroundColor: siteVariables.brand,
                  color: (variables as any).color,
                }),
              },
            },
            componentVariables: {
              StyledButton: {
                color: '#F2F2F2',
              },
            },
          }}
        >
          <StyledButton>Provider styled button</StyledButton>
        </Provider>
      )}
    />

    <p>
      The second argument of the <code>createComponent</code> config param is the render method.
      This is the place where you link the Stardust bits with your custom component. This method is
      invoked with the following parameters:
    </p>
    <ul>
      <li>
        <code>stardust</code> - this is the object containing the evaluated theming props (classes
        and rtl)
      </li>
      <li>
        <code>...props</code> - all other props provided by the user
      </li>
    </ul>
    <p>
      The previous implementation of the render method inside the <code>createComponent</code>{' '}
      function for the
      <code>StyledButton</code>, allows the user, to use the styles and variables properties on the
      custom component in the same way they would be used for any Stardust component.
    </p>

    <Header as="h2" content="Using the custom components" />

    <p>
      We already saw how the <code>Provider</code> can define some stylings and variables for the
      custom components. Next, we will take a look into few examples of how the user can further
      customize the styling and variables of the custom components, the same way they would do with
      the Stardust components.
    </p>

    <Header as="h3" content="Example 1. Using the variables property" />

    <ExampleSnippet
      value={[
        `<StyledButton variables={(siteVars) => ({color: siteVars.black})}>`,
        `  Inline styled button`,
        `</StyledButton>`,
      ].join('\n')}
      render={() => (
        <Provider
          theme={{
            componentStyles: {
              StyledButton: {
                root: ({ props, variables, theme: { siteVariables } }) => ({
                  backgroundColor: siteVariables.brand,
                  color: (variables as any).color,
                }),
              },
            },
            componentVariables: {
              StyledButton: {
                color: '#F2F2F2',
              },
            },
          }}
        >
          <StyledButton variables={siteVariables => ({ color: siteVariables.black })}>
            inline styled button
          </StyledButton>
        </Provider>
      )}
    />

    <Header as="h3" content="Example 2. Using the styles property" />

    <ExampleSnippet
      value={[
        `<StyledButton styles={({theme: {siteVariables}}) => ({backgroundColor: siteVariables.black})}>`,
        `  Inline styled button`,
        `</StyledButton>`,
      ].join('\n')}
      render={() => (
        <Provider
          theme={{
            componentStyles: {
              StyledButton: {
                root: ({ props, variables, theme: { siteVariables } }) => ({
                  backgroundColor: siteVariables.brand,
                  color: (variables as any).color,
                }),
              },
            },
            componentVariables: {
              StyledButton: {
                color: '#F2F2F2',
              },
            },
          }}
        >
          <StyledButton
            styles={({ theme: { siteVariables } }) => ({ backgroundColor: siteVariables.black })}
          >
            Inline styled button
          </StyledButton>
        </Provider>
      )}
    />

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
