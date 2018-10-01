import { IFocusableItemProps, SetStateDelegate } from './FocusableItem'

export interface IFocusContainerProps<T> {
  items?: T[]
}

export interface IFocusContainerState {
  focusItemOnIdx: number
}

export class ContainerFocusHandler<
  T,
  P extends IFocusContainerProps<T>,
  S extends IFocusContainerState
> {
  constructor(
    private getProps: () => P,
    private setState: SetStateDelegate<P, S>,
    private initState: (state: IFocusContainerState) => void,
    private getState: () => S,
  ) {
    this.initState({ focusItemOnIdx: 0 })
  }

  public assignAtomicItemsProps(idx: number, itemsLength: number): IFocusableItemProps {
    return {
      isFocused: idx === this.getState().focusItemOnIdx && this.getState().focusItemOnIdx !== -1,
      isFirstElement: idx === 0,
      isLastElement: idx === itemsLength - 1,

      onEnter: this.onEnter,
      onEsc: this.onEsc,
    }
  }

  public movePrevious(): void {
    if (this.getState().focusItemOnIdx <= 0) {
      return
    }

    this.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx - 1 }
    })
  }

  public moveNext(): void {
    if (
      !this.getProps().items ||
      this.getState().focusItemOnIdx >= this.getProps().items.length - 1
    ) {
      return
    }

    this.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx + 1 }
    })
  }

  public moveFirst(): void {
    if (this.getState().focusItemOnIdx === 0) {
      return
    }

    this.setState({
      focusItemOnIdx: 0,
    })
  }

  public moveLast(): void {
    if (
      !this.getProps().items ||
      this.getState().focusItemOnIdx === this.getProps().items.length - 1
    ) {
      return
    }

    this.setState({
      focusItemOnIdx: this.getProps().items.length - 1,
    })
  }

  private onEnter = (): void => {}

  private onEsc = (): void => {}
}
