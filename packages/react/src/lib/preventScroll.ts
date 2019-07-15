import * as keyboardKey from 'keyboard-key'

const preventScroll = (e: Event) => {
  if (e.type === 'wheel' || e.type === 'touchmove') {
    e.preventDefault()
  } else if (e.type === 'keydown') {
    const keyCode = keyboardKey.getCode(e)
    const isScrollKey =
      keyCode === keyboardKey.ArrowDown ||
      keyCode === keyboardKey.ArrowUp ||
      keyCode === keyboardKey.PageDown ||
      keyCode === keyboardKey.PageUp ||
      keyCode === keyboardKey.Home ||
      keyCode === keyboardKey.End
    if (isScrollKey) {
      e.preventDefault()
    }
  }
}

export default preventScroll
