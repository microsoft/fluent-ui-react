import { getComponentInfo } from '@fluentui/react-docs'

describe('getComp', () => {
  it('creates a Provider component', () => {
    const componentInfo = getComponentInfo('./../fixtures/ClassComponentPropsInline')

    expect(componentInfo).toEqual({
      displayName: 'ClassComponentPropsInline',
    })
  })
})
