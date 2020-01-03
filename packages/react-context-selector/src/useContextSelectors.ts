import * as React from 'react'

import { Context, ContextSelector, ContextValue } from './types'
import {
  HOOK_SELECTED_PROPERTY,
  HOOK_SELECTOR_PROPERTY,
  useIsomorphicLayoutEffect,
  HOOK_VALUE_PROPERTY,
  CONTEXT_SUBSCRIBE_PROPERTY,
  CONTEXT_VALUE_PROPERTY,
} from './utils'

type ContextSelectors<Value, SelectedValue> = Record<string, ContextSelector<Value, SelectedValue>>
type ContextSelected<
  Value,
  SelectedValue,
  Properties extends keyof ContextSelectors<Value, SelectedValue>
> = Record<Properties, ReturnType<ContextSelectors<Value, SelectedValue>[Properties]>>

type UseSelectorRef<
  Value,
  SelectedValue,
  Properties extends keyof ContextSelectors<Value, any> = any
> = {
  [HOOK_SELECTOR_PROPERTY]: ContextSelectors<Value, any>
  [HOOK_VALUE_PROPERTY]: Value
  [HOOK_SELECTED_PROPERTY]: ContextSelected<Value, SelectedValue, Properties>
}

/**
 * This hook returns context selected value by selectors.
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referencially changed.
 */
export const useContextSelectors = <
  Value,
  SelectedValue extends Record<string, any>,
  Properties extends keyof ContextSelectors<Value, any> = any
>(
  context: Context<Value>,
  selectors: ContextSelectors<Value, SelectedValue>,
): ContextSelected<Value, SelectedValue, Properties> => {
  const {
    [CONTEXT_SUBSCRIBE_PROPERTY]: subscribe,
    [CONTEXT_VALUE_PROPERTY]: value,
  } = React.useContext((context as unknown) as Context<ContextValue<Value>>)
  const [, forceUpdate] = React.useReducer((c: number) => c + 1, 0) as [never, () => void]

  const ref = React.useRef<UseSelectorRef<Value, SelectedValue>>()
  const selected = {} as ContextSelected<Value, SelectedValue, Properties>

  Object.keys(selectors).forEach(key => {
    selected[key] = selectors[key](value)
  })

  useIsomorphicLayoutEffect(() => {
    ref.current = {
      [HOOK_SELECTOR_PROPERTY]: selectors,
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

        if (reference[HOOK_VALUE_PROPERTY] === nextState) {
          return
        }

        if (
          Object.keys(reference[HOOK_SELECTED_PROPERTY]).every(key =>
            Object.is(
              reference[HOOK_SELECTED_PROPERTY][key],
              reference[HOOK_SELECTOR_PROPERTY][key](nextState),
            ),
          )
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
