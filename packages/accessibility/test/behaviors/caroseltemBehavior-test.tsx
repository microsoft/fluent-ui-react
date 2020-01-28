import { carouselItemBehavior } from '@fluentui/accessibility'

describe('carouselItemBehavior.ts', () => {
  test('set tabIndex="0" when carousel has navigation and item is visible ', () => {
    const expectedResult = carouselItemBehavior({ navigation: true, active: true })
    expect(expectedResult.attributes.root.tabIndex).toEqual(0)
  })

  test('set tabIndex="-1" when carousel has navigation and item is NOT visible ', () => {
    const expectedResult = carouselItemBehavior({ navigation: true, active: false })
    expect(expectedResult.attributes.root.tabIndex).toEqual(-1)
  })

  test('set tabIndex="-1" when carousel has NO navigation and item is visible', () => {
    const expectedResult = carouselItemBehavior({ navigation: false, active: true })
    expect(expectedResult.attributes.root.tabIndex).toEqual(-1)
  })

  test('set tabIndex="-1" when carousel has NO navigation and item is NOT visible', () => {
    const expectedResult = carouselItemBehavior({ navigation: false, active: false })
    expect(expectedResult.attributes.root.tabIndex).toEqual(-1)
  })
})
