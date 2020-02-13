import { loaderBehavior } from '@fluentui/accessibility'

describe('LoaderBehavior.ts', () => {
  let props
  beforeEach(() => {
    props =  { labelLoaderId: "label-id" }
  }) 

  test('do NOT add aria-labelledby, when aria-label was set already', () => {
    props['aria-label'] = 'any loading string'
    const expectedResult = loaderBehavior(props)
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual(undefined)
  })

  test('do NOT add aria-labelledby, when aria-labelled was set already', () => {
    props['aria-labelledby'] = 'id'
    const expectedResult = loaderBehavior(props)
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual(undefined)
  })

  test('do NOT add aria-labelledby, when there is no tabIndex specified', () => {
    const expectedResult = loaderBehavior(props)
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual(undefined)
  })

  test('add aria-labelledby, when there is tabIndex=0 specified', () => {
    props['tabIndex'] = 0
    const expectedResult = loaderBehavior(props)
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual("label-id")
  })

  test('add aria-labelledby, when there is tabIndex=-1 specified', () => {
    props['tabIndex'] = -1
    const expectedResult = loaderBehavior(props)
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual("label-id")
  })
})
