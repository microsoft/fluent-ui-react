import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
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
      title="Static no content truncation"
      description="Static table with no conteent truncation"
      examplePath="components/Table/Usage/TableExampleStaticNoTextOverflow"
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
