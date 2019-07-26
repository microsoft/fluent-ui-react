import createManager from '../createManager'
import { Action, Manager, ManagerConfig } from '../types'

export type DialogState = {
  open: boolean
}

export type DialogActions = {
  open: Action<DialogState, DialogActions>
  close: Action<DialogState, DialogActions>
}

export type DialogManager = Manager<DialogState, DialogActions>

export const createDialogManager = (
  config: Partial<ManagerConfig<DialogState, DialogActions>> = {},
): DialogManager =>
  createManager<DialogState, DialogActions>({
    ...config,
    state: {
      open: false,
      ...config.state,
    },

    actions: {
      close: () => () => ({ open: false }),
      open: () => () => ({ open: true }),

      ...config.actions,
    },
  })
