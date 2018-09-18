import * as _ from 'lodash'
import { IAtomicItemProps } from './BaseAtomicItem'

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
  // constructor(private props: P, private state: S, private setState: SetStateDelegate<P, S>) {
  //   this.state = _.assign(this.state, { focusItemOnIdx: 0 })
  // }

  constructor(private props: P, private state: S, private component: React.Component<P, S>) {
    this.state = _.assign(this.state, { focusItemOnIdx: 0 })
  }

  public assignAtomicItemsProps(idx: number, itemsLength: number): IAtomicItemProps {
    const itemProps: IAtomicItemProps = {
      isFocused: idx === this.state.focusItemOnIdx && this.state.focusItemOnIdx !== -1,
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

  protected movePrevious(): void {
    this.component.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx - 1 }
    })
  }

  protected moveNext(): void {
    this.component.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx + 1 }
    })
  }

  protected moveFirst(): void {
    this.component.setState({
      focusItemOnIdx: 0,
    })
  }

  protected moveLast(): void {
    if (!this.props.items) {
      return
    }

    this.component.setState({
      focusItemOnIdx: this.props.items.length - 1,
    })
  }

  protected enter(): void {
    console.log('enter()')
  }

  protected space(): void {
    console.log('space()')
  }

  protected esc(): void {
    console.log('esc()')
  }
}
