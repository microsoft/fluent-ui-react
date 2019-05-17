import createManager from '../createManager'
import { Action, ManagerConfig } from '../types'

export type DropdownState = {
  isOpen: boolean
  items: string[]
  text: string
}

export type DropdownActions = {
  open: Action<DropdownState, DropdownActions>
  close: Action<DropdownState, DropdownActions>
  toggle: Action<DropdownState, DropdownActions>
}

export const createDropdownManager = (
  config: Partial<ManagerConfig<DropdownState, DropdownActions>> = {},
) =>
  createManager<DropdownState, DropdownActions>({
    ...config,
    state: {
      isOpen: false,
      items: [],
      text: '',
      ...config.state,
    },

    actions: {
      close: () => () => ({ isOpen: false }),
      open: () => () => ({ isOpen: true }),

      toggle: () => (state: DropdownState, actions: DropdownActions) => {
        if (state.isOpen) {
          return actions.close()(state, actions)
        }
        return actions.open()(state, actions)
      },
      ...config.actions,
    },
  })
