export interface IFocusableItemProps {
  isFocused: boolean

  isFirstElement: boolean
  isLastElement: boolean
}

export type SetStateDelegate<P, S> = <K extends keyof S>(
  state:
    | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
    | (Pick<S, K> | S | null),
  callback?: () => void,
) => void

export class FocusableItem {
  constructor(private getProps: () => IFocusableItemProps) {}

  public static create<P extends {} & { focusableItemProps?: IFocusableItemProps }>(
    component: React.Component<P>,
  ): FocusableItem {
    return new this(() => component.props.focusableItemProps)
  }

  public tryFocus(focusableElement: HTMLElement) {
    if (focusableElement && this.getProps() && this.getProps().isFocused) {
      focusableElement.focus()
    }
  }
}
