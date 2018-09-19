import * as _ from 'lodash'
import { IAtomicItemProps } from './AtomicItemFocusHandler'

export interface IContainerProps<T> {
  items?: T[]
}

export interface IContainerState {
  focusItemOnIdx: number
}

type SetStateDelegate<P, S> = <K extends keyof S>(
  state:
    | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
    | (Pick<S, K> | S | null),
  callback?: () => void,
) => void

export class ContainerFocusHandler<T, P extends IContainerProps<T>, S extends IContainerState> {
  constructor(
    private getProps: () => P,
    private setState: SetStateDelegate<P, S>,
    private initState: (state: IContainerState) => void,
    private getState: () => S,
  ) {
    this.initState({ focusItemOnIdx: 0 })
  }

  public assignAtomicItemsProps(idx: number, itemsLength: number): IAtomicItemProps {
    const itemProps: IAtomicItemProps = {
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
