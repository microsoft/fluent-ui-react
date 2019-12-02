import { formatCode } from '@fluentui/docs-components'
import * as React from 'react'

/**
 * @param props - A set of props that should be logged under `data` param.
 */
const createCallbackLogFormatter = (props: string[] = []) => (
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
    `${name} (e: { "type": "${e.type}" }, data: ${formatCode(
      JSON.stringify(pickedProps),
      'json',
    )})`,
  ].join(' ')
}

export default createCallbackLogFormatter
