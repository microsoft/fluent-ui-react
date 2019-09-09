import { textAreaBehavior } from 'src/lib/accessibility'

describe('textAreaBehavior.ts', () => {
  test('aria-disabled is undefined by default', () => {
    const behavior = textAreaBehavior({})
    expect(behavior.attributes['textArea']['aria-disabled']).toEqual(undefined)
  })

  test('is enabled', () => {
    const behavior = textAreaBehavior({ disabled: false })
    expect(behavior.attributes['textArea']['aria-disabled']).toEqual(false)
  })

  test('is disabled', () => {
    const behavior = textAreaBehavior({ disabled: true })
    expect(behavior.attributes['textArea']['aria-disabled']).toEqual(true)
  })
})
