import { ItemShorthand } from 'utils'
import {
  ContainerFocusHandler,
  IContainerProps,
  IContainerState,
} from 'src/lib/accessibility/FocusHandling/ContainerFocusHandler'
import { SetStateDelegate } from 'src/lib/accessibility/FocusHandling/AtomicItemFocusHandler'

describe('Container Focus Handler', () => {
  const setStateMock: SetStateDelegate<IContainerProps<ItemShorthand>, IContainerState> = jest.fn()
  const containerFocusHandler = new ContainerFocusHandler(
    () => props,
    setStateMock,
    s => {
      state = s
    },
    () => state,
  )

  const props: IContainerProps<ItemShorthand> = {
    items: [{ title: 'First Item' }, { title: 'Second Item' }, { title: 'Third Item' }],
  }

  let state: IContainerState = {
    focusItemOnIdx: -1,
  }

  beforeEach(() => {
    state.focusItemOnIdx = -1
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

  test('Should assign item properties to first item', () => {})

  test('Should assign item properties to middle item', () => {})

  test('Should assign item properties to last item', () => {})
})
