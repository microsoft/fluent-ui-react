import {
  FocusableItem,
  IFocusableItemProps,
  IFocusableItemState,
  SetStateDelegate,
} from 'src/lib/accessibility/FocusHandling/FocusableItem'

describe('Focusable Item', () => {
  type Delegate = () => void
  let focusableItem: FocusableItem<IFocusableItemProps, IFocusableItemState>

  let setStateMock: SetStateDelegate<IFocusableItemProps, IFocusableItemState>

  let onEnterMock: Delegate
  let onEscMock: Delegate

  let props: IFocusableItemProps
  let state: IFocusableItemState

  beforeEach(() => {
    setStateMock = jest.fn()

    onEnterMock = jest.fn()
    onEscMock = jest.fn()

    state = {
      isLastOpened: false,
      shouldSubContainerBeOpened: false,
    }

    props = {
      isFocused: false,

      isFirstElement: false,
      isLastElement: false,

      onEnter: onEnterMock,
      onEsc: onEscMock,
    }

    focusableItem = new FocusableItem(() => props, setStateMock, s => {
      state = s
    })
  })

  test('Should init handler', () => {
    state = {
      isLastOpened: true,
      shouldSubContainerBeOpened: true,
    }

    const focusableItem = new FocusableItem(() => props, setStateMock, s => {
      state = s
    })

    expect(focusableItem).toBeDefined()
    expect(state.isLastOpened).toBe(false)
    expect(state.shouldSubContainerBeOpened).toBe(false)
  })

  test('Should focus focusable element', () => {
    props.isFocused = true
    const button = document.createElement('button') as HTMLElement

    expect(document.activeElement).not.toBe(button)
    focusableItem.focus(button)
    expect(document.activeElement).toBe(button)
  })

  test('Should not focus not focusable element', () => {
    props.isFocused = false
    const button = document.createElement('button') as HTMLElement

    expect(document.activeElement).not.toBe(button)
    focusableItem.focus(button)
    expect(document.activeElement).not.toBe(button)
  })

  test('Should handle enter', () => {
    props.isFocused = true

    focusableItem.enter()

    expect(onEnterMock).toBeCalled()
  })

  test('Should not handle enter, if item is not focused', () => {
    props.isFocused = false

    focusableItem.enter()

    expect(onEnterMock).not.toBeCalled()
  })

  test('Should handle ESC', () => {
    props.isFocused = true

    focusableItem.esc()

    expect(onEscMock).toBeCalled()
  })

  test('Should not handle ESC, if item is not focused', () => {
    props.isFocused = false

    focusableItem.esc()

    expect(onEscMock).not.toBeCalled()
  })
})
