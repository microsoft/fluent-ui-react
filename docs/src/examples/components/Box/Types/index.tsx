import { Alert } from '@stardust-ui/react'
import * as React from 'react'
import { Link } from 'react-router-dom'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <Alert styles={{ display: 'block' }} warning>
      <p>
        <code>Box</code> component should be used carefully, in almost all cases you don't need it.
      </p>
      <p>
        For layouts and positioning please prefer <Link to="/components/flex">Flex</Link> and{' '}
        <Link to="/components/grid">Grid</Link> components, we also have{' '}
        <Link to="/components/text">Text</Link> component to wrap text. In other cases please try to
        use existing components and apply styles via theming features. You also can{' '}
        <Link to="/integrate-custom-components">create your own custom component</Link> for custom
        behaviors.
      </p>
      <p>
        Remember that <code>styles</code> that applied directly to any component are not friendly
        for theme switching, prefer to use <code>variables</code> instead of <code>styles</code> for
        overrides.
      </p>
    </Alert>
    <ComponentExample
      title="Box"
      description="A box allows you to apply styles."
      examplePath="components/Box/Types/BoxExample"
    />
  </ExampleSection>
)

export default Types
