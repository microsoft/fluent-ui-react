import { alertBehavior } from 'src/lib/accessibility'

describe('AlertBehavior.ts', () => {
  test('use alertWarningBehavior if warning prop is defined', () => {
    const expectedResult = alertBehavior({ warning: true })
    expect(expectedResult.attributes.content.role).toEqual('alert')
  })

  test('use alertWarningBehavior if danger prop is defined', () => {
    const expectedResult = alertBehavior({ danger: true })
    expect(expectedResult.attributes.content.role).toEqual('alert')
  })

  test('use defaultBehavior if success prop is defined', () => {
    const expectedResult = alertBehavior({ success: true })
    expect(expectedResult.attributes.content).toBeUndefined()
  })

  test('use defaultBehavior if info prop is defined', () => {
    const expectedResult = alertBehavior({ info: true })
    expect(expectedResult.attributes.content).toBeUndefined()
  })
})
