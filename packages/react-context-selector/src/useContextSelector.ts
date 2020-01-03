import * as React from 'react'

import { Context, ContextSelector, ContextValue } from './types'
import {
  CONTEXT_SUBSCRIBE_PROPERTY,
  CONTEXT_VALUE_PROPERTY,
  HOOK_SELECTED_PROPERTY,
  HOOK_SELECTOR_PROPERTY,
  HOOK_VALUE_PROPERTY,
  useIsomorphicLayoutEffect,
} from './utils'

type UseSelectorRef<Value, SelectedValue> = {
  [HOOK_SELECTOR_PROPERTY]: ContextSelector<Value, SelectedValue>
  [HOOK_VALUE_PROPERTY]: Value
  [HOOK_SELECTED_PROPERTY]: SelectedValue
}

/**
 * This hook returns context selected value by selector.
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referencially changed.
 */
export const useContextSelector = <Value, SelectedValue>(
  context: Context<Value>,
  selector: ContextSelector<Value, SelectedValue>,
): SelectedValue => {
  const {
    [CONTEXT_SUBSCRIBE_PROPERTY]: subscribe,
    [CONTEXT_VALUE_PROPERTY]: value,
  } = React.useContext((context as unknown) as Context<ContextValue<Value>>)
  const [, forceUpdate] = React.useReducer((c: number) => c + 1, 0) as [never, () => void]

  const ref = React.useRef<UseSelectorRef<Value, SelectedValue>>()
  const selected = selector(value)

  useIsomorphicLayoutEffect(() => {
    ref.current = {
      [HOOK_SELECTOR_PROPERTY]: selector,
      [HOOK_VALUE_PROPERTY]: value,
      [HOOK_SELECTED_PROPERTY]: selected,
    }
  })
  useIsomorphicLayoutEffect(() => {
    const callback = (nextState: Value) => {
      try {
        const reference: UseSelectorRef<Value, SelectedValue> = ref.current as NonNullable<
          UseSelectorRef<Value, SelectedValue>
        >

        if (
          reference[HOOK_VALUE_PROPERTY] === nextState ||
          Object.is(reference[HOOK_SELECTED_PROPERTY], reference[HOOK_SELECTOR_PROPERTY](nextState))
        ) {
          // not changed
          return
        }
      } catch (e) {
        // ignored (stale props or some other reason)
      }

      forceUpdate()
    }

    return subscribe(callback)
  }, [subscribe])

  return selected
}
