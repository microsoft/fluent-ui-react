export interface IFocusableItemProps {
  isFocused: boolean

  isFirstElement: boolean
  isLastElement: boolean

  onEnter: () => void
  onEsc: () => void
}

export interface IFocusableItemState {
  shouldSubContainerBeOpened: boolean
  isLastOpened: boolean
}

export type SetStateDelegate<P, S> = <K extends keyof S>(
  state:
    | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
    | (Pick<S, K> | S | null),
  callback?: () => void,
) => void

export class FocusableItem<P extends IFocusableItemProps, S extends IFocusableItemState> {
  constructor(
    private getProps: () => P,
    private setState: SetStateDelegate<P, S>,
    private initState: (state: IFocusableItemState) => void,
  ) {
    this.initState({
      shouldSubContainerBeOpened: false,
      isLastOpened: false,
    })
  }

  public focus(focusableElement: HTMLElement) {
    if (this.getProps().isFocused) {
      focusableElement.focus()
    }
  }

  public enter() {
    this.setState({ isLastOpened: false })

    if (!this.getProps().isFocused) {
      return
    }

    this.setState({
      shouldSubContainerBeOpened: true,
      isLastOpened: true,
    })

    this.getProps().onEnter()
  }

  public esc() {
    if (!this.getProps().isFocused) {
      return
    }

    this.setState({ shouldSubContainerBeOpened: false })
    this.getProps().onEsc()
  }
}
