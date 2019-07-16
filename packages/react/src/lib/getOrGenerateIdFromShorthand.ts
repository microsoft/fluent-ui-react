import * as React from 'react'
import * as _ from 'lodash'
import { ShorthandValue } from '../types'

const getOrGenerateIdFromShorthand = <P extends Record<string, any>>(
  prefix: string,
  value: ShorthandValue<P>,
  currentValue?: string,
): string | undefined => {
  if (_.isNil(value)) {
    return undefined
  }

  if (React.isValidElement(value)) {
    return (value as React.ReactElement<{ id?: string }>).props.id
  }

  if (_.isPlainObject(value)) {
    return (value as Record<string, any>).id
  }

  return currentValue || _.uniqueId(prefix)
}

export default getOrGenerateIdFromShorthand
