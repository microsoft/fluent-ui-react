import StateManager from './stateManager'

// TOTALLY framework-agnostic implementation
const stateManager = StateManager.create({
  // framework agnostic actions
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

export default stateManager
