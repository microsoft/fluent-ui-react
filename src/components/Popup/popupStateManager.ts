import StateManager from './stateManager'

// TOTALLY framework-agnostic implementation
const stateManager = StateManager.create({
  // framework agnostic actions
  actions: {
    open: it => {
      it.setState({ open: true })
    },
    close: it => {
      it.setState({ open: false })
    },
    toggle: it => {
      const state = it.getState()

      if (state.open) {
        it.close()
      } else {
        it.open()
      }
    },
  },
})

export default stateManager
