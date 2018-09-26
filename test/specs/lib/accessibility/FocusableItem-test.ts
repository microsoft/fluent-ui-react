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

  let onMovePreviousMock: Delegate
  let onMoveNextMock: Delegate
  let onMoveFirstMock: Delegate
  let onMoveLastMock: Delegate
  let onEnterMock: Delegate
  let onSpaceMock: Delegate
  let onEscMock: Delegate

  let props: IFocusableItemProps
  let state: IFocusableItemState

  beforeEach(() => {
    setStateMock = jest.fn()

    onMovePreviousMock = jest.fn()
    onMoveNextMock = jest.fn()
    onMoveFirstMock = jest.fn()
    onMoveLastMock = jest.fn()
    onEnterMock = jest.fn()
    onSpaceMock = jest.fn()
    onEscMock = jest.fn()

    state = {
      isLastOpened: false,
      shouldSubContainerBeOpened: false,
    }

    props = {
      isFocused: false,

      isFirstElement: false,
      isLastElement: false,

      onMovePrevious: onMovePreviousMock,
      onMoveNext: onMoveNextMock,
      onMoveFirst: onMoveFirstMock,
      onMoveLast: onMoveLastMock,
      onEnter: onEnterMock,
      onSpace: onSpaceMock,
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

  test('Should move previous', () => {
    props.isFocused = true

    focusableItem.movePrevious()

    expect(onMovePreviousMock).toBeCalled()
  })

  test('Should not move previous, if item not focused', () => {
    props.isFocused = false

    focusableItem.movePrevious()

    expect(onMovePreviousMock).not.toBeCalled()
  })

  test('Should not move previous, if first item', () => {
    props.isFirstElement = true
    props.isFocused = true

    focusableItem.movePrevious()

    expect(onMovePreviousMock).not.toBeCalled()
  })

  test('Should move next', () => {
    props.isFocused = true

    focusableItem.moveNext()

    expect(onMoveNextMock).toBeCalled()
  })

  test('Should not move next, if item not focused', () => {
    props.isFocused = false

    focusableItem.moveNext()

    expect(onMoveNextMock).not.toBeCalled()
  })

  test('Should not move next, if last item', () => {
    props.isLastElement = true
    props.isFocused = true

    focusableItem.moveNext()

    expect(onMoveNextMock).not.toBeCalled()
  })

  test('Should move first', () => {
    props.isFocused = true

    focusableItem.moveFirst()

    expect(onMoveFirstMock).toBeCalled()
  })

  test('Should not move first, if item not focused', () => {
    props.isFocused = false

    focusableItem.moveFirst()

    expect(onMoveFirstMock).not.toBeCalled()
  })

  test('Should not move first, if first item', () => {
    props.isFirstElement = true
    props.isFocused = true

    focusableItem.moveFirst()

    expect(onMoveFirstMock).not.toBeCalled()
  })

  test('Should move last', () => {
    props.isFocused = true

    focusableItem.moveLast()

    expect(onMoveLastMock).toBeCalled()
  })

  test('Should not move last, if item not focused', () => {
    props.isFocused = false

    focusableItem.moveLast()

    expect(onMoveLastMock).not.toBeCalled()
  })

  test('Should not move last, if last item', () => {
    props.isLastElement = true
    props.isFocused = true

    focusableItem.moveLast()

    expect(onMoveLastMock).not.toBeCalled()
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

  test('Should handle space', () => {
    props.isFocused = true

    focusableItem.space()

    expect(onSpaceMock).toBeCalled()
  })

  test('Should not handle space, if item is not focused', () => {
    props.isFocused = false

    focusableItem.space()

    expect(onSpaceMock).not.toBeCalled()
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
