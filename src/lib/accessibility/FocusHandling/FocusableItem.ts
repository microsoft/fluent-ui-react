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

export class FocusableItem<P extends {} & { focusableItemProps?: IFocusableItemProps }> {
  constructor(private getProps: () => IFocusableItemProps) {}

  public static create<P extends {} & { focusableItemProps?: IFocusableItemProps }>(
    component: React.Component<P>,
  ): FocusableItem<P> {
    return new this(() => component.props.focusableItemProps)
  }

  public tryFocus(focusableElement: HTMLElement) {
    if (this.getProps().isFocused) {
      focusableElement.focus()
    }
  }
}
