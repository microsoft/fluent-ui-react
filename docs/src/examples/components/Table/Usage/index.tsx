import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Responsive"
      description="Responsive table with no interactive content"
      examplePath="components/Table/Usage/TableExampleResponsive"
    />
    <ComponentExample
      title="Static"
      description="Static table with no interactive content"
      examplePath="components/Table/Usage/TableExampleStatic"
    />
    <ComponentExample
      title="Static compact"
      description="Compact view static table"
      examplePath="components/Table/Usage/TableExampleStaticCompact"
    />
    <ComponentExample
      title="Content truncation"
      description="Static table with content truncation"
      examplePath="components/Table/Usage/TableExampleStaticTruncate"
    />
    <ComponentExample
      title="Static headless"
      description="Static table with no header"
      examplePath="components/Table/Usage/TableExampleStaticHeadless"
    />
    <ComponentExample
      title="Static no rows"
      description="Static table with no rows"
      examplePath="components/Table/Usage/TableExampleStaticRowless"
    />
  </ExampleSection>
)

export default Usage
