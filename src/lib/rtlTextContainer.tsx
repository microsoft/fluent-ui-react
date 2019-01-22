import * as React from 'react'

const rtlTextContainer = {
  getAttributes: ({
    condition = true,
    forElements = [],
  }: {
    condition?: boolean
    forElements: any[]
  }) => {
    if (condition) {
      for (const element of forElements) {
        if (element && typeof element === 'string') {
          return { dir: 'auto' }
        }
      }
    }
    return {}
  },
  createFor: ({ element, condition = true }: { element: any; condition?: boolean }) => {
    if (condition && element && typeof element === 'string') {
      return <span dir="auto">{element}</span>
    }
    return element
  },
}

export default rtlTextContainer
