import { Accessibility } from '../../interfaces'

const ChatPaneContentBehavior: Accessibility = {
  attributes: {
    root: {
      role: '',
    },
  },

  // keys: {
  //   'ArrowRight': (e: Event) => { e.preventDefault() },
  //   'ArrowLeft': (e: Event) => { e.preventDefault() } // ChatPaneContentReturnAction.execute({ index: props['titleIndex'] })
  // }
}

export default ChatPaneContentBehavior
