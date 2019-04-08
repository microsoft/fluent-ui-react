import * as React from 'react'
import * as _ from 'lodash'
import { Provider, Text } from '@stardust-ui/react'

const TextSizesExample = () => (
  <Provider.Consumer
    render={({ siteVariables, fontSizes, pxToRem }) => {
      const computedFontSizes = fontSizes(pxToRem)
      return _.map(computedFontSizes, (value, key) => (
        <div key={key}>
          <Text size={key as any}>This is size="{key}" size font.</Text>
        </div>
      ))
    }}
  />
)
export default TextSizesExample
