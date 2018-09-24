import {
  AtomicItemFocusHandler,
  IAtomicItemProps,
  IAtomicItemState,
  SetStateDelegate,
} from 'src/lib/accessibility/FocusHandling/AtomicItemFocusHandler'

describe('Atomic Item Focus Handler', () => {
  type Delegate = () => void
  let atomicItemFocusHandler: AtomicItemFocusHandler<IAtomicItemProps, IAtomicItemState>

  let setStateMock: SetStateDelegate<IAtomicItemProps, IAtomicItemState>

  let onMovePreviousMock: Delegate
  let onMoveNextMock: Delegate
  let onMoveFirstMock: Delegate
  let onMoveLastMock: Delegate
  let onEnterMock: Delegate
  let onSpaceMock: Delegate
  let onEscMock: Delegate

  let props: IAtomicItemProps
  let state: IAtomicItemState

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

    atomicItemFocusHandler = new AtomicItemFocusHandler(() => props, setStateMock, s => {
      state = s
    })
  })

  test('Should init handler', () => {
    state = {
      isLastOpened: true,
      shouldSubContainerBeOpened: true,
    }

    const atomicItemFocusHandler = new AtomicItemFocusHandler(() => props, setStateMock, s => {
      state = s
    })

    expect(atomicItemFocusHandler).toBeDefined()
    expect(state.isLastOpened).toBe(false)
    expect(state.shouldSubContainerBeOpened).toBe(false)
  })

  test('Should focus focusable element', () => {
    props.isFocused = true
    const button = document.createElement('button') as HTMLElement

    expect(document.activeElement).not.toBe(button)
    atomicItemFocusHandler.focus(button)
    expect(document.activeElement).toBe(button)
  })

  test('Should not focus not focusable element', () => {
    props.isFocused = false
    const button = document.createElement('button') as HTMLElement

    expect(document.activeElement).not.toBe(button)
    atomicItemFocusHandler.focus(button)
    expect(document.activeElement).not.toBe(button)
  })

  test('Should move previous', () => {
    props.isFocused = true

    atomicItemFocusHandler.movePrevious()

    expect(onMovePreviousMock).toBeCalled()
  })

  test('Should not move previous, if item not focused', () => {
    props.isFocused = false

    atomicItemFocusHandler.movePrevious()

    expect(onMovePreviousMock).not.toBeCalled()
  })

  test('Should not move previous, if first item', () => {
    props.isFirstElement = true
    props.isFocused = true

    atomicItemFocusHandler.movePrevious()

    expect(onMovePreviousMock).not.toBeCalled()
  })

  test('Should move next', () => {
    props.isFocused = true

    atomicItemFocusHandler.moveNext()

    expect(onMoveNextMock).toBeCalled()
  })

  test('Should not move next, if item not focused', () => {
    props.isFocused = false

    atomicItemFocusHandler.moveNext()

    expect(onMoveNextMock).not.toBeCalled()
  })

  test('Should not move next, if last item', () => {
    props.isLastElement = true
    props.isFocused = true

    atomicItemFocusHandler.moveNext()

    expect(onMoveNextMock).not.toBeCalled()
  })

  test('Should move first', () => {
    props.isFocused = true

    atomicItemFocusHandler.moveFirst()

    expect(onMoveFirstMock).toBeCalled()
  })

  test('Should not move first, if item not focused', () => {
    props.isFocused = false

    atomicItemFocusHandler.moveFirst()

    expect(onMoveFirstMock).not.toBeCalled()
  })

  test('Should not move first, if first item', () => {
    props.isFirstElement = true
    props.isFocused = true

    atomicItemFocusHandler.moveFirst()

    expect(onMoveFirstMock).not.toBeCalled()
  })

  test('Should move last', () => {
    props.isFocused = true

    atomicItemFocusHandler.moveLast()

    expect(onMoveLastMock).toBeCalled()
  })

  test('Should not move last, if item not focused', () => {
    props.isFocused = false

    atomicItemFocusHandler.moveLast()

    expect(onMoveLastMock).not.toBeCalled()
  })

  test('Should not move last, if last item', () => {
    props.isLastElement = true
    props.isFocused = true

    atomicItemFocusHandler.moveLast()

    expect(onMoveLastMock).not.toBeCalled()
  })

  test('Should handle enter', () => {
    props.isFocused = true

    atomicItemFocusHandler.enter()

    expect(onEnterMock).toBeCalled()
  })

  test('Should not handle enter, if item is not focused', () => {
    props.isFocused = false

    atomicItemFocusHandler.enter()

    expect(onEnterMock).not.toBeCalled()
  })

  test('Should handle space', () => {
    props.isFocused = true

    atomicItemFocusHandler.space()

    expect(onSpaceMock).toBeCalled()
  })

  test('Should not handle space, if item is not focused', () => {
    props.isFocused = false

    atomicItemFocusHandler.space()

    expect(onSpaceMock).not.toBeCalled()
  })

  test('Should handle ESC', () => {
    props.isFocused = true

    atomicItemFocusHandler.esc()

    expect(onEscMock).toBeCalled()
  })

  test('Should not handle ESC, if item is not focused', () => {
    props.isFocused = false

    atomicItemFocusHandler.esc()

    expect(onEscMock).not.toBeCalled()
  })
})
