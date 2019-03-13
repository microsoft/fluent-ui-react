declare module 'simulant' {
  namespace event {
    function fire(el: HTMLElement, event: Event): void
    function fire(el: HTMLElement, event: 'string', payload?: { [key: string]: any }): void
  }

  function event(window: Window, eventName: string, payload?: { [key: string]: any }): Event
  function event(eventName: string, payload?: { [key: string]: any }): Event

  export = event
}
