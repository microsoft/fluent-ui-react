import UIComponent from '../UIComponent'

export enum ComponentState {
  enabled,
  disabled,
  hidden,
  focused,
  active,
  inactive,
}

export interface IAccessibilityBehavior<P, S> {
  readonly name: string
  generateAriaAttributes(props: P, state: S): object
  // the following line might not be needed after component state management is introduced
  changeState(newState: ComponentState): void
  generateKeyHandlers(component: UIComponent<P, S>, props: P, state: S): object
}
