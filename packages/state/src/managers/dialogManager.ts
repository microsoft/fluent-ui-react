import createManager from '../createManager'
import { Manager, ManagerConfig } from '../types'

export type DialogActionNames = 'open' | 'close'

export type DialogState = {
  open: boolean
}

export type DialogManager = Manager<DialogState, DialogActionNames>

export const createDialogManager = (
  config: Partial<ManagerConfig<DialogState, DialogActionNames>> = {},
): DialogManager =>
  createManager<DialogState, DialogActionNames>({
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
