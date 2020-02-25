import { getComponentInfo } from '@fluentui/react-docs'

describe('getComponentInfo', () => {
  it('throws if path does not exist', () => {
    throw new Error('TODO')
  })

  it('throws if path is not a TSX file', () => {
    throw new Error('TODO')
  })

  it('recognizes class components with props interfaces', () => {
    const componentInfo = getComponentInfo('./fixtures/ClassComponentPropsInterface')

    expect(componentInfo).toEqual({
      displayName: 'ClassComponentPropsInterface',
    })
  })
})
