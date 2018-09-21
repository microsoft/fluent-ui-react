import {
  AtomicItemFocusHandler,
  IAtomicItemProps,
  IAtomicItemState,
  SetStateDelegate,
} from 'src/lib/accessibility/FocusHandling/AtomicItemFocusHandler'

describe('Atomic Item Focus Handler', () => {
  type Delegate = () => void

  const setStateMock: SetStateDelegate<IAtomicItemProps, IAtomicItemState> = jest.fn()

  const onMovePreviousMock: Delegate = jest.fn()
  const onMoveNextMock: Delegate = jest.fn()
  const onMoveFirstMock: Delegate = jest.fn()
  const onMoveLastMock: Delegate = jest.fn()
  const onEnterMock: Delegate = jest.fn()
  const onSpaceMock: Delegate = jest.fn()
  const onEscMock: Delegate = jest.fn()

  const props: IAtomicItemProps = {
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

  let state: IAtomicItemState = {
    isLastOpened: false,
    shouldSubContainerBeOpened: false,
  }

  beforeEach(() => {
    state.isLastOpened = false
    state.shouldSubContainerBeOpened = false
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
})
