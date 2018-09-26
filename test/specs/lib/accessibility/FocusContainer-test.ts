import { ItemShorthand } from 'utils'
import {
  ContainerFocusHandler,
  IFocusContainerProps,
  IFocusContainerState,
} from 'src/lib/accessibility/FocusHandling/FocusContainer'
import { SetStateDelegate } from 'src/lib/accessibility/FocusHandling/FocusableItem'

describe('Focus Container', () => {
  let containerFocusHandler: ContainerFocusHandler<
    ItemShorthand,
    IFocusContainerProps<ItemShorthand>,
    IFocusContainerState
  >
  let firstItem
  let lastItem

  const items = [{ title: 'First Item' }, { title: 'Second Item' }, { title: 'Third Item' }]
  const props: IFocusContainerProps<ItemShorthand> = {
    items,
  }

  let state: IFocusContainerState = {
    focusItemOnIdx: -1,
  }

  let setStateMock: SetStateDelegate<IFocusContainerProps<ItemShorthand>, IFocusContainerState>

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
  })

  test('Should move previous', () => {
    lastItem.onMovePrevious()

    expect(setStateMock).toBeCalled()
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
