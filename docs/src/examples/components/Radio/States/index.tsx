import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'
import Segment from 'src/components/Segment/Segment'

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Checked"
      description="A radio can come pre-checked."
      examplePath="components/Radio/States/RadioExampleChecked"
    >
      <Segment style={{ marginTop: '10px' }}>
        Use{' '}
        <a
          href="https://facebook.github.io/react/docs/forms.html#default-value"
          rel="noopener noreferrer"
          target="_blank"
        >
          <code>defaultChecked</code>
        </a>{' '}
        as you normally would to set default form values.
      </Segment>
    </ComponentExample>
    <ComponentExample
      title="Disabled"
      description="Radios can be disabled."
      examplePath="components/Radio/States/RadioExampleDisabled"
    />
  </ExampleSection>
)

export default States
