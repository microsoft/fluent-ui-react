import * as React from 'react'

const addRtlSupport = (element: any) => {
  return typeof element === 'string' ? <span dir="auto">{element}</span> : element
}

export default addRtlSupport
