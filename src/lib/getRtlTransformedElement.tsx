import * as React from 'react'

const getRtlTransformedElement = (element: any) => {
  return typeof element === 'string' ? <span dir="auto">{element}</span> : element
}

export default getRtlTransformedElement
