import UIComponent from '../UIComponent'

export enum ComponentState {
  enabled,
  disabled,
  hidden,
  focused,
  active,
  inactive,
  expanded,
  collapsed,
}

export interface IAccessibilityBehavior<P, S> {
  readonly name: string
  generateAriaAttributes(props: P, state: S): object
  // the following line might not be needed after component state management is introduced
  changeState(newState: ComponentState): void
  onKeyDown(component: UIComponent<P, S>, props: P, state: S): object
}
