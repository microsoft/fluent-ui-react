import * as React from 'react'
import * as _ from 'lodash'
import { ShorthandValue } from '../types'

const getOrGenerateIdFromShorthand = <P extends Record<string, any>>(
  prefix: string,
  value: ShorthandValue<P>,
  currentValue?: string,
  fallbackToUnique?: boolean,
): string | undefined => {
  let result: string

  if (_.isNil(value)) {
    result = undefined
  } else if (React.isValidElement(value)) {
    result = (value as React.ReactElement<{ id?: string }>).props.id
  } else if (_.isPlainObject(value)) {
    result = (value as Record<string, any>).id
  } else {
    result = currentValue || _.uniqueId(prefix)
  }

  if (fallbackToUnique && !result) {
    result = _.uniqueId(prefix)
  }

  return result
}

export default getOrGenerateIdFromShorthand
