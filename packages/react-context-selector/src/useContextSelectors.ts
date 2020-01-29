import * as React from 'react'

import { Context, ContextSelector, ContextValue } from './types'
import { useIsomorphicLayoutEffect } from './utils'

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
  selectors: ContextSelectors<Value, any>
  value: Value
  selected: ContextSelected<Value, SelectedValue, Properties>
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
  const { subscribe, value } = React.useContext(
    (context as unknown) as Context<ContextValue<Value>>,
  )
  const [, forceUpdate] = React.useReducer((c: number) => c + 1, 0) as [never, () => void]

  const ref = React.useRef<UseSelectorRef<Value, SelectedValue>>()
  const selected = {} as ContextSelected<Value, SelectedValue, Properties>

  Object.keys(selectors).forEach(key => {
    selected[key] = selectors[key](value)
  })

  useIsomorphicLayoutEffect(() => {
    ref.current = {
      selectors,
      value,
      selected,
    }
  })
  useIsomorphicLayoutEffect(() => {
    const callback = (nextState: Value) => {
      try {
        const reference: UseSelectorRef<Value, SelectedValue> = ref.current as NonNullable<
          UseSelectorRef<Value, SelectedValue>
        >

        if (reference.value === nextState) {
          return
        }

        if (
          Object.keys(reference.selected).every(key =>
            Object.is(reference.selected[key], reference.selectors[key](nextState)),
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
