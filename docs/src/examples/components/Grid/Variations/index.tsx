import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Columns"
      description="We can specify a certain amount of columns or the explicit columns for a grid."
      examplePath="components/Grid/Variations/GridExampleColumns"
    />
    <ComponentExample
      title="Rows"
      description="We can specify a certain amount of rows or the explicit rows for a grid."
      examplePath="components/Grid/Variations/GridExampleRows"
    />
    <ComponentExample
      title="Columns and Rows"
      description="We can specify a certain amount of columns and rows or the explicit columns and rows for a grid."
      examplePath="components/Grid/Variations/GridExampleColumnsAndRows"
    />
    <ComponentExample
      title="Navigable with keyboard arrow buttons"
      description="Use a Grid accessibility behavior, so Grid items can be keyboard navigable by adding 'data-is-focusable=true' attribute to each item. This attribute can be skipped if the Grid items are natively focusable elements, like buttons, anchors etc."
      examplePath="components/Grid/Variations/GridExampleKeyboardNavigable"
    />
  </ExampleSection>
)

export default Variations
