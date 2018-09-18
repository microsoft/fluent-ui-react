import { UIComponent, AutoControlledComponent } from '../..'
import { ItemShorthand } from '../../../../types/utils'
import { IAtomicItemProps } from './BaseAtomicItem'

export interface IContainerProps {
  items?: ItemShorthand[]
}

export interface IContainerState {
  focusItemOnIdx: number
}

export abstract class BaseContainer<
  P extends IContainerProps,
  S extends IContainerState = IContainerState
> extends UIComponent<P, S> {
  constructor(props: P, state: S) {
    super(props, state)

    this.state = {
      focusItemOnIdx: 0,
    } as any
  }

  protected assignAtomicItemsProps(
    itemProps: IAtomicItemProps,
    idx: number,
    itemsLength: number,
  ): any {
    const isFocused = idx === this.state.focusItemOnIdx && this.state.focusItemOnIdx !== -1

    itemProps.isFocused = isFocused

    itemProps.isFirstElement = idx === 0
    itemProps.isLastElement = idx === itemsLength - 1
    itemProps.onMovePrevious = this.movePrevious.bind(this)
    itemProps.onMoveNext = this.moveNext.bind(this)
    itemProps.onMoveFirst = this.moveFirst.bind(this)
    itemProps.onMoveLast = this.moveLast.bind(this)
    itemProps.onEnter = this.enter.bind(this)
    itemProps.onSpace = this.space.bind(this)
    itemProps.onEsc = this.esc.bind(this)

    return itemProps
  }

  protected movePrevious(): void {
    this.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx - 1 }
    })
  }

  protected moveNext(): void {
    this.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx + 1 }
    })
  }

  protected moveFirst(): void {
    this.setState({
      focusItemOnIdx: 0,
    })
  }

  protected moveLast(): void {
    if (!this.props.items) {
      return
    }

    this.setState({
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

export abstract class BaseAutoControlledContainer<
  P extends IContainerProps,
  S extends IContainerState = IContainerState
> extends AutoControlledComponent<P, S> {
  constructor(props: P, state: S) {
    super(props, state)

    this.state = {
      focusItemOnIdx: 0,
    } as any
  }

  protected assignAtomicItemsProps(
    itemProps: IAtomicItemProps,
    idx: number,
    itemsLength: number,
  ): any {
    const isFocused = idx === this.state.focusItemOnIdx && this.state.focusItemOnIdx !== -1

    itemProps.isFocused = isFocused

    itemProps.isFirstElement = idx === 0
    itemProps.isLastElement = idx === itemsLength - 1
    itemProps.onMovePrevious = this.movePrevious.bind(this)
    itemProps.onMoveNext = this.moveNext.bind(this)
    itemProps.onMoveFirst = this.moveFirst.bind(this)
    itemProps.onMoveLast = this.moveLast.bind(this)
    itemProps.onEnter = this.enter.bind(this)
    itemProps.onSpace = this.space.bind(this)
    itemProps.onEsc = this.esc.bind(this)

    return itemProps
  }

  protected movePrevious(): void {
    this.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx - 1 }
    })
  }

  protected moveNext(): void {
    this.setState(prev => {
      return { focusItemOnIdx: prev.focusItemOnIdx + 1 }
    })
  }

  protected moveFirst(): void {
    this.setState({
      focusItemOnIdx: 0,
    })
  }

  protected moveLast(): void {
    if (!this.props.items) {
      return
    }

    this.setState({
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
