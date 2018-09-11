import React from 'react'
import * as _ from 'lodash'
import { Provider, Text } from '@stardust-ui/react'

const TextSizesExampleShorthand = () => (
  <Provider.Consumer
    render={({ siteVariables }) => {
      return _.map(siteVariables.fontSizes, (value, key) => (
        <div key={key}>
          <Text size={key} content="Dicta voluptatum dolorem." />
        </div>
      ))
    }}
  />
)
export default TextSizesExampleShorthand
