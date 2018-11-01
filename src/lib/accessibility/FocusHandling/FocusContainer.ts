import * as _ from 'lodash'

export class ContainerFocusHandler {
  private _focusedItemIndex = 0

  constructor(private getItemsCount: () => number, private readonly setFocusAt: (number) => void) {}

  private coerceFocusedItemIndex() {
    if (this._focusedItemIndex < 0) {
      this._focusedItemIndex = 0
    }

    const itemsCount = this.getItemsCount()
    if (this._focusedItemIndex >= itemsCount) {
      this._focusedItemIndex = itemsCount - 1
    }
  }

  public getFocusedItemIndex(): number {
    return this._focusedItemIndex
  }

  public syncFocusedItemIndex(withCurrentIndex: number) {
    this._focusedItemIndex = withCurrentIndex
  }

  public movePrevious(): void {
    if (this.getItemsCount() === 0) {
      return
    }

    this._focusedItemIndex -= 1
    this.coerceFocusedItemIndex()

    this.setFocusAt(this._focusedItemIndex)
  }

  public moveNext(): void {
    if (this.getItemsCount() === 0) {
      return
    }

    this._focusedItemIndex += 1
    this.coerceFocusedItemIndex()

    this.setFocusAt(this._focusedItemIndex)
  }

  public moveFirst(): void {
    if (this.getItemsCount() === 0) {
      return
    }

    this._focusedItemIndex = 0
    this.setFocusAt(this._focusedItemIndex)
  }

  public moveLast(): void {
    if (this.getItemsCount() === 0) {
      return
    }

    this._focusedItemIndex = this.getItemsCount() - 1
    this.setFocusAt(this._focusedItemIndex)
  }
}
