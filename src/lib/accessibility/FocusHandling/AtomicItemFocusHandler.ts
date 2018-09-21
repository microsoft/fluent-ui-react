export interface IAtomicItemProps {
  isFocused: boolean

  isFirstElement: boolean
  isLastElement: boolean

  onMovePrevious: () => void
  onMoveNext: () => void
  onMoveFirst: () => void
  onMoveLast: () => void
  onEnter: () => void
  onSpace: () => void
  onEsc: () => void
}

export interface IAtomicItemState {
  shouldSubContainerBeOpened: boolean
  isLastOpened: boolean
}

export type SetStateDelegate<P, S> = <K extends keyof S>(
  state:
    | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
    | (Pick<S, K> | S | null),
  callback?: () => void,
) => void

export class AtomicItemFocusHandler<P extends IAtomicItemProps, S extends IAtomicItemState> {
  constructor(
    private getProps: () => P,
    private setState: SetStateDelegate<P, S>,
    private initState: (state: IAtomicItemState) => void,
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

  public movePrevious() {
    if (this.getProps().isFirstElement || !this.getProps().isFocused) {
      return
    }

    this.getProps().onMovePrevious()
  }

  public moveNext() {
    if (this.getProps().isLastElement || !this.getProps().isFocused) {
      return
    }

    this.getProps().onMoveNext()
  }

  public moveFirst() {
    if (this.getProps().isFirstElement || !this.getProps().isFocused) {
      return
    }

    this.getProps().onMoveFirst()
  }

  public moveLast() {
    if (this.getProps().isLastElement || !this.getProps().isFocused) {
      return
    }

    this.getProps().onMoveLast()
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

  public space() {
    if (!this.getProps().isFocused) {
      return
    }

    this.getProps().onSpace()
  }

  public esc() {
    if (!this.getProps().isFocused) {
      return
    }

    this.setState({ shouldSubContainerBeOpened: false })
    this.getProps().onEsc()
  }
}
