import * as React from 'react'
import { NavLink } from 'react-router-dom'
import DocPage from '../components/DocPage/DocPage'
import CodeSnippet from '../components/CodeSnippet'
import Button from '../../../src/components/Button/Button'

class ShorthandProps extends React.Component {
  render() {
    return (
      <DocPage title="Shorthand Props">
        <p>
          Most components support two APIs: <code>shorthand</code> and <code>children</code>. With
          the <code>shorthand</code> definition we are adding some props to the component in order
          to define it’s content and behavior.
        </p>
        <p>
          When defining the icon and text content displayed in the Button component, we can pass the
          <code>icon</code> and <code>content</code> props.
        </p>
        <CodeSnippet value={'<Button icon="user" content="Click me!" />'} />

        <p>
          With the <code>children</code> API, you are responsible for constructing the proper
          markup. You are also responsible for managing the component's state, styling, and
          accessibility. Due to this, you should strive to use the shorthand API wherever possible.
          It is best to leave the details to the component to solve for you.
        </p>
        <CodeSnippet
          value={[
            `<Button icon iconOnly primary>`,
            `  <Icon name="book" xSpacing="none" />`,
            `</Button>`,
          ].join('\n')}
        />
        <br />
        <Button as={NavLink} content="Quick Start" icon="arrow right" primary to="quick-start" />
      </DocPage>
    )
  }
}

export default ShorthandProps
