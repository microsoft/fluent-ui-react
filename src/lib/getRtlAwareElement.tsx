import * as React from 'react'

const getRtlAwareElement = (element: any) => {
  return typeof element === 'string' ? <span dir="auto">{element}</span> : element
}

export default getRtlAwareElement
