import StateManager from './stateManager'

// TOTALLY framework-agnostic implementation
const getPopupStateManager = () =>
  StateManager.create({
    // each action should return diff for updated state
    actions: {
      init: () => ({ open: false }),
      open: () => ({ open: true }),
      close: () => ({ open: false }),
      toggle: it => {
        const state = it.getState()
        return state.open ? it.close() : it.open()
      },
    },
  })

export default getPopupStateManager
