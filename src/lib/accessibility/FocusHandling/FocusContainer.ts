import * as _ from 'lodash'

export class ContainerFocusHandler {
  private focusedItemIndex = 0

  constructor(private getItemsCount: () => number, private readonly setFocusAt: (number) => void) {}

  private noItems = (): boolean => this.getItemsCount() === 0

  private constrainFocusedItemIndex(): void {
    if (this.focusedItemIndex < 0) {
      this.focusedItemIndex = 0
    }

    const itemsCount = this.getItemsCount()
    if (this.focusedItemIndex >= itemsCount) {
      this.focusedItemIndex = itemsCount - 1
    }
  }

  public getFocusedItemIndex(): number {
    return this.focusedItemIndex
  }

  public syncFocusedItemIndex(withCurrentIndex: number) {
    this.focusedItemIndex = withCurrentIndex
  }

  public movePrevious(): void {
    if (this.noItems()) {
      return
    }

    this.focusedItemIndex -= 1
    this.constrainFocusedItemIndex()

    this.setFocusAt(this.focusedItemIndex)
  }

  public moveNext(): void {
    if (this.noItems()) {
      return
    }

    this.focusedItemIndex += 1
    this.constrainFocusedItemIndex()

    this.setFocusAt(this.focusedItemIndex)
  }

  public moveFirst(): void {
    if (this.noItems()) {
      return
    }

    this.focusedItemIndex = 0
    this.setFocusAt(this.focusedItemIndex)
  }

  public moveLast(): void {
    if (this.noItems()) {
      return
    }

    this.focusedItemIndex = this.getItemsCount() - 1
    this.setFocusAt(this.focusedItemIndex)
  }
}
