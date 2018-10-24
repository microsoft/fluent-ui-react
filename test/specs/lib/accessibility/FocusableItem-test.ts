import {
  FocusableItem,
  FocusableItemProps,
} from 'src/lib/accessibility/FocusHandling/FocusableItem'

describe('Focusable Item', () => {
  let focusableItem: FocusableItem<{} & { focusableItemProps: FocusableItemProps }>

  let props: FocusableItemProps

  beforeEach(() => {
    props = {
      isFocused: false,

      isFirstElement: false,
      isLastElement: false,
    }

    focusableItem = new FocusableItem(() => props)
  })

  test('Should init handler', () => {
    const focusableItem = new FocusableItem(() => props)

    expect(focusableItem).toBeDefined()
  })

  test('Should focus focusable element', () => {
    props.isFocused = true
    const button = document.createElement('button') as HTMLElement

    expect(document.activeElement).not.toBe(button)
    focusableItem.tryFocus(button)
    expect(document.activeElement).toBe(button)
  })

  test('Should not focus not focusable element', () => {
    props.isFocused = false
    const button = document.createElement('button') as HTMLElement

    expect(document.activeElement).not.toBe(button)
    focusableItem.tryFocus(button)
    expect(document.activeElement).not.toBe(button)
  })
})
