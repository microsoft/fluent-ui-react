import { ItemShorthand } from 'utils'
import {
  ContainerFocusHandler,
  IContainerProps,
  IContainerState,
} from 'src/lib/accessibility/FocusHandling/ContainerFocusHandler'
import { SetStateDelegate } from 'src/lib/accessibility/FocusHandling/AtomicItemFocusHandler'

describe('Container Focus Handler', () => {
  let containerFocusHandler: ContainerFocusHandler<
    ItemShorthand,
    IContainerProps<ItemShorthand>,
    IContainerState
  >
  let firstItem
  let lastItem

  const items = [{ title: 'First Item' }, { title: 'Second Item' }, { title: 'Third Item' }]
  const props: IContainerProps<ItemShorthand> = {
    items,
  }

  let state: IContainerState = {
    focusItemOnIdx: -1,
  }

  let setStateMock: SetStateDelegate<IContainerProps<ItemShorthand>, IContainerState>

  beforeEach(() => {
    state.focusItemOnIdx = -1
    props.items = items

    setStateMock = jest.fn()

    containerFocusHandler = new ContainerFocusHandler(
      () => props,
      setStateMock,
      s => {
        state = s
      },
      () => state,
    )

    firstItem = containerFocusHandler.assignAtomicItemsProps(0, props.items.length)
    lastItem = containerFocusHandler.assignAtomicItemsProps(
      props.items.length - 1,
      props.items.length,
    )
  })

  test('Should init handler', () => {
    const focusHandler = new ContainerFocusHandler(
      () => props,
      setStateMock,
      s => {
        state = s
      },
      () => state,
    )

    expect(focusHandler).toBeDefined()
    expect(state.focusItemOnIdx).toBe(0)
  })

  test('Should assign item properties to first item', () => {
    const item = containerFocusHandler.assignAtomicItemsProps(0, props.items.length)

    expect(item.isFocused).toBe(true)
    expect(item.isFirstElement).toBe(true)
    expect(item.isLastElement).toBe(false)

    expect(item.onMovePrevious).toBeTruthy()
    expect(item.onMoveNext).toBeTruthy()
    expect(item.onMoveFirst).toBeTruthy()
    expect(item.onMoveLast).toBeTruthy()
    expect(item.onEnter).toBeTruthy()
    expect(item.onSpace).toBeTruthy()
    expect(item.onEsc).toBeTruthy()
  })

  test('Should assign item properties to middle item', () => {
    const item = containerFocusHandler.assignAtomicItemsProps(1, props.items.length)

    expect(item.isFocused).toBe(false)
    expect(item.isFirstElement).toBe(false)
    expect(item.isLastElement).toBe(false)

    expect(item.onMovePrevious).toBeTruthy()
    expect(item.onMoveNext).toBeTruthy()
    expect(item.onMoveFirst).toBeTruthy()
    expect(item.onMoveLast).toBeTruthy()
    expect(item.onEnter).toBeTruthy()
    expect(item.onSpace).toBeTruthy()
    expect(item.onEsc).toBeTruthy()
  })

  test('Should assign item properties to last item', () => {
    const item = containerFocusHandler.assignAtomicItemsProps(
      props.items.length - 1,
      props.items.length,
    )

    expect(item.isFocused).toBe(false)
    expect(item.isFirstElement).toBe(false)
    expect(item.isLastElement).toBe(true)

    expect(item.onMovePrevious).toBeTruthy()
    expect(item.onMoveNext).toBeTruthy()
    expect(item.onMoveFirst).toBeTruthy()
    expect(item.onMoveLast).toBeTruthy()
    expect(item.onEnter).toBeTruthy()
    expect(item.onSpace).toBeTruthy()
    expect(item.onEsc).toBeTruthy()
  })

  test('Should move next', () => {
    firstItem.onMoveNext()

    expect(setStateMock).toBeCalled()
    expect(state.focusItemOnIdx).toBe(1)
  })

  test('Should move previous', () => {
    lastItem.onMovePrevious()

    expect(setStateMock).toBeCalled()
    expect(state.focusItemOnIdx).toBe(1)
  })

  test('Should move first', () => {
    lastItem.onMoveFirst()

    expect(setStateMock).toBeCalled()
  })

  test('Should move last', () => {
    firstItem.onMoveLast()

    expect(setStateMock).toBeCalled()
  })

  test('Should do nothing if items not defined', () => {
    props.items = undefined
    firstItem.onMoveLast()

    expect(setStateMock).not.toBeCalled()
  })

  test('Should handle Enter', () => {
    firstItem.onEnter()

    expect(setStateMock).not.toBeCalled()
  })

  test('Should handle Space', () => {
    firstItem.onSpace()

    expect(setStateMock).not.toBeCalled()
  })

  test('Should handle Esc', () => {
    firstItem.onEsc()

    expect(setStateMock).not.toBeCalled()
  })
})
