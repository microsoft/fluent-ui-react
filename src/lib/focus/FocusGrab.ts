// TODO a better way to  make this a singleton
// TODO should this be in context?
export default class FocusGrab {
  private static parentElementRestriction: Element
  private static token: string

  public static elementShouldGrabFocus(element: HTMLElement) {
    if (
      FocusGrab.parentElementRestriction &&
      FocusGrab.parentElementRestriction.contains(element)
    ) {
      FocusGrab.reset()
      return true
    }
    return false
  }

  public static tokenShouldGrabFocus(token: string) {
    if (FocusGrab.token && FocusGrab.token === token) {
      FocusGrab.reset()
      return true
    }
    return false
  }

  public static focusWithin(element: HTMLElement) {
    FocusGrab.reset()
    FocusGrab.parentElementRestriction = element.parentElement
  }

  public static focusOnce(): string {
    FocusGrab.reset()
    FocusGrab.token = Math.random()
      .toString(36)
      .substring(7)
    return FocusGrab.token
  }

  private static reset() {
    FocusGrab.parentElementRestriction = undefined
    FocusGrab.token = undefined
  }
}
