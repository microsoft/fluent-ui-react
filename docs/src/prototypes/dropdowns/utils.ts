export const removeElement = (element: string | HTMLElement): HTMLElement => {
  const elementToRemove = typeof element === 'string' ? document.getElementById(element) : element
  return elementToRemove.parentNode.removeChild(elementToRemove)
}

export const insertNodeAtCursorPosition = (params: { id?: string; text?: string } = {}) => {
  const { id, text } = params
  if (!id && !text) {
    throw '[insertNodeAtCursorPosition]: at least one parameter has to be supplied'
  }

  if (!window.getSelection) {
    return
  }

  const sel = window.getSelection()
  if (!sel.getRangeAt || !sel.rangeCount) {
    return
  }

  const range = sel.getRangeAt(0)

  if (text && !id) {
    const textNode = document.createTextNode(text)
    range.insertNode(textNode)
    range.setStartAfter(textNode)
    return
  }

  const elem = document.createElement('span')
  elem.id = id
  if (text) {
    elem.innerText = text
  }
  range.insertNode(elem)
}
