import { alertBehavior } from 'src/lib/accessibility'

describe('AlertBehavior.ts', () => {
  test('use alertWarningBehavior if warning prop is defined', () => {
    const property = {
      warning: true,
    }
    const expectedResult = alertBehavior(property)
    expect(expectedResult.attributes.content.role).toEqual('alert')
  })

  test('use alertWarningBehavior if danger prop is defined', () => {
    const property = {
      danger: true,
    }
    const expectedResult = alertBehavior(property)
    expect(expectedResult.attributes.content.role).toEqual('alert')
  })

  test('use defaultBehavior if success prop is defined', () => {
    const property = {
      success: true,
    }
    const expectedResult = alertBehavior(property)
    expect(expectedResult.attributes.content).toBeUndefined()
  })

  test('use defaultBehavior if info prop is defined', () => {
    const property = {
      info: true,
    }
    const expectedResult = alertBehavior(property)
    expect(expectedResult.attributes.content).toBeUndefined()
  })
})
