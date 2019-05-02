import { unstable_mergeRefs as mergeRefs } from '@stardust-ui/react-component-ref'
import * as React from 'react'

describe('mergeRefs', () => {
  it('merges refs of a different types', () => {
    const node = document.createElement('div')
    const functionalRef = jest.fn()
    const objectRef = React.createRef<HTMLDivElement>()

    mergeRefs(functionalRef, objectRef)(node)

    expect(functionalRef).toHaveBeenCalledWith(node)
    expect(objectRef).toHaveProperty('current', node)
  })
})
