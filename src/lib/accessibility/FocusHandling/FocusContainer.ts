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
    const itemProps: IFocusableItemProps = {
      isFocused: idx === this.getState().focusItemOnIdx && this.getState().focusItemOnIdx !== -1,
      isFirstElement: idx === 0,
      isLastElement: idx === itemsLength - 1,
      onMovePrevious: this.movePrevious.bind(this),
      onMoveNext: this.moveNext.bind(this),
      onMoveFirst: this.moveFirst.bind(this),
      onMoveLast: this.moveLast.bind(this),
      onEnter: this.enter.bind(this),
      onSpace: this.space.bind(this),
      onEsc: this.esc.bind(this),
    }

    return itemProps
  }

  private movePrevious(): void {
    this.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx - 1 }
    })
  }

  private moveNext(): void {
    this.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx + 1 }
    })
  }

  private moveFirst(): void {
    this.setState({
      focusItemOnIdx: 0,
    })
  }

  private moveLast(): void {
    if (!this.getProps().items) {
      return
    }

    this.setState({
      focusItemOnIdx: this.getProps().items.length - 1,
    })
  }

  private enter(): void {}

  private space(): void {}

  private esc(): void {}
}
