import { formatCode } from '@stardust-ui/docs-components'
import * as React from 'react'

const callbackLogFormatter = (props: string[]) => (
  name: string,
  e: React.SyntheticEvent,
  data: Object,
) => {
  const pickedProps = props.reduce((acc, propName) => {
    acc[propName] = data[propName]
    return acc
  }, {})

  return [
    `/*[${new Date().toLocaleTimeString()}]*/`,
    `${name} (e: { "type": "${e.type}" }, data: ${formatCode(JSON.stringify(pickedProps), 'json')}`,
  ].join(' ')
}

export default callbackLogFormatter
