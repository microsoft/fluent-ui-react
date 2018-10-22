import { ItemShorthand } from 'utils'
import {
  ContainerFocusHandler,
  FocusContainerProps,
  FocusContainerState,
} from 'src/lib/accessibility/FocusHandling/FocusContainer'
import { SetStateDelegate } from 'src/lib/accessibility/FocusHandling/FocusableItem'

describe('Focus Container', () => {
  let focusContainer: ContainerFocusHandler<
    ItemShorthand,
    FocusContainerProps<ItemShorthand>,
    FocusContainerState
  >

  const items = [{ title: 'First Item' }, { title: 'Second Item' }, { title: 'Third Item' }]
  const props: FocusContainerProps<ItemShorthand> = {
    items,
  }

  let state: FocusContainerState = {
    focusItemOnIdx: -1,
  }

  let setStateMock: SetStateDelegate<FocusContainerProps<ItemShorthand>, FocusContainerState>

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
    const item = focusContainer.createItemProps(0, props.items.length)

    expect(item.isFocused).toBe(true)
    expect(item.isFirstElement).toBe(true)
    expect(item.isLastElement).toBe(false)
  })

  test('Should assign item properties to middle item', () => {
    const item = focusContainer.createItemProps(1, props.items.length)

    expect(item.isFocused).toBe(false)
    expect(item.isFirstElement).toBe(false)
    expect(item.isLastElement).toBe(false)
  })

  test('Should assign item properties to last item', () => {
    const item = focusContainer.createItemProps(props.items.length - 1, props.items.length)

    expect(item.isFocused).toBe(false)
    expect(item.isFirstElement).toBe(false)
    expect(item.isLastElement).toBe(true)
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
})
