import { ItemShorthand } from 'utils'
import {
  ContainerFocusHandler,
  IFocusContainerProps,
  IFocusContainerState,
} from 'src/lib/accessibility/FocusHandling/FocusContainer'
import { SetStateDelegate } from 'src/lib/accessibility/FocusHandling/FocusableItem'

describe('Focus Container', () => {
  let focusContainer: ContainerFocusHandler<
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

    focusContainer = new ContainerFocusHandler(
      () => props,
      setStateMock,
      s => {
        state = s
      },
      () => state,
    )

    firstItem = focusContainer.assignAtomicItemsProps(0, props.items.length)
    lastItem = focusContainer.assignAtomicItemsProps(props.items.length - 1, props.items.length)
  })

  test('Should init handler', () => {
    const focusContainer = new ContainerFocusHandler(
      () => props,
      setStateMock,
      s => {
        state = s
      },
      () => state,
    )

    expect(focusContainer).toBeDefined()
    expect(state.focusItemOnIdx).toBe(0)
  })

  test('Should assign item properties to first item', () => {
    const item = focusContainer.assignAtomicItemsProps(0, props.items.length)

    expect(item.isFocused).toBe(true)
    expect(item.isFirstElement).toBe(true)
    expect(item.isLastElement).toBe(false)

    expect(item.onEnter).toBeTruthy()
    expect(item.onEsc).toBeTruthy()
  })

  test('Should assign item properties to middle item', () => {
    const item = focusContainer.assignAtomicItemsProps(1, props.items.length)

    expect(item.isFocused).toBe(false)
    expect(item.isFirstElement).toBe(false)
    expect(item.isLastElement).toBe(false)

    expect(item.onEnter).toBeTruthy()
    expect(item.onEsc).toBeTruthy()
  })

  test('Should assign item properties to last item', () => {
    const item = focusContainer.assignAtomicItemsProps(props.items.length - 1, props.items.length)

    expect(item.isFocused).toBe(false)
    expect(item.isFirstElement).toBe(false)
    expect(item.isLastElement).toBe(true)

    expect(item.onEnter).toBeTruthy()
    expect(item.onEsc).toBeTruthy()
  })

  test('Should move previous', () => {
    state.focusItemOnIdx = 1

    focusContainer.movePrevious()

    expect(setStateMock).toBeCalled()
  })

  test('Should not move previous, if first item', () => {
    state.focusItemOnIdx = 0

    focusContainer.movePrevious()

    expect(setStateMock).not.toBeCalled()
  })

  test('Should move next', () => {
    state.focusItemOnIdx = 1

    focusContainer.moveNext()

    expect(setStateMock).toBeCalled()
  })

  test('Should not move next, if last item', () => {
    state.focusItemOnIdx = props.items.length - 1

    focusContainer.moveNext()

    expect(setStateMock).not.toBeCalled()
  })

  test('Should move first', () => {
    state.focusItemOnIdx = 1

    focusContainer.moveFirst()

    expect(setStateMock).toBeCalled()
  })

  test('Should not move first, if first item', () => {
    state.focusItemOnIdx = 0

    focusContainer.moveFirst()

    expect(setStateMock).not.toBeCalled()
  })

  test('Should move last', () => {
    state.focusItemOnIdx = 1

    focusContainer.moveLast()

    expect(setStateMock).toBeCalled()
  })

  test('Should not move last, if last item', () => {
    state.focusItemOnIdx = props.items.length - 1

    focusContainer.moveLast()

    expect(setStateMock).not.toBeCalled()
  })

  test('Should handle Enter', () => {
    firstItem.onEnter()

    expect(setStateMock).not.toBeCalled()
  })

  test('Should handle Esc', () => {
    firstItem.onEsc()

    expect(setStateMock).not.toBeCalled()
  })
})
