import { AccessibilityActions } from '../interfaces'

const Helpers = {
  getFirst: (target: HTMLElement): HTMLElement => {
    return target.parentElement && (target.parentElement.firstElementChild as HTMLElement)
  },

  getLast: (target: HTMLElement): HTMLElement => {
    return target.parentElement && (target.parentElement.lastElementChild as HTMLElement)
  },

  getNext: (target: HTMLElement): HTMLElement => {
    return target.nextElementSibling as HTMLElement
  },

  getPrevious: (target: HTMLElement): HTMLElement => {
    return target.previousElementSibling as HTMLElement
  },
}

const DefaultActions: AccessibilityActions = {
  moveNext: (event: KeyboardEvent, elem?: HTMLElement) => {
    const current = event.target as HTMLElement
    if (!current) return

    const next = Helpers.getNext(current) || Helpers.getFirst(current)

    if (!next) return

    next.focus()
    current.tabIndex = -1
    next.tabIndex = 0
    event.preventDefault()
    event.stopPropagation()
  },
  movePrevious: (event: KeyboardEvent) => {
    const current = event.target as HTMLElement
    if (!current) return

    const previous = Helpers.getPrevious(current) || Helpers.getLast(current)

    if (!previous) return

    previous.focus()
    current.tabIndex = -1
    previous.tabIndex = 0
    event.preventDefault()
    event.stopPropagation()
  },
  moveLast: (event: KeyboardEvent) => {
    const current = event.target as HTMLElement
    if (!current) return

    const last = Helpers.getLast(current)

    if (!last) return

    last.focus()
    current.tabIndex = -1
    last.tabIndex = 0
    event.preventDefault()
    event.stopPropagation()
  },
  moveFirst: (event: KeyboardEvent) => {
    const current = event.target as HTMLElement
    if (!current) return

    const first = Helpers.getFirst(current)

    if (!first) return

    first.focus()
    current.tabIndex = -1
    first.tabIndex = 0
    event.preventDefault()
    event.stopPropagation()
  },
  triggerClick: (event: KeyboardEvent) => {
    console.log('[AccessibilityActions] trigger CLICK')

    event.preventDefault()
    event.stopPropagation()
  },
}

export default DefaultActions
