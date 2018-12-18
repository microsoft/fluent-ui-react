import * as _ from 'lodash'

export class ContainerFocusHandler {
  private focusedIndex = 0

  constructor(private getItemsCount: () => number, private readonly setFocusAt: (number) => void) {}

  private noItems = (): boolean => this.getItemsCount() === 0

  private constrainFocusedIndex(): void {
    if (this.focusedIndex < 0) {
      this.focusedIndex = 0
    }

    const itemsCount = this.getItemsCount()
    if (this.focusedIndex >= itemsCount) {
      this.focusedIndex = itemsCount - 1
    }
  }

  public getFocusedIndex(): number {
    return this.focusedIndex
  }

  public syncFocusedIndex(withCurrentIndex: number) {
    this.focusedIndex = withCurrentIndex
  }

  public movePrevious(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex -= 1
    this.constrainFocusedIndex()

    this.setFocusAt(this.focusedIndex)
  }

  public moveNext(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex += 1
    this.constrainFocusedIndex()

    this.setFocusAt(this.focusedIndex)
  }

  public moveFirst(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex = 0
    this.setFocusAt(this.focusedIndex)
  }

  public moveLast(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex = this.getItemsCount() - 1
    this.setFocusAt(this.focusedIndex)
  }
}
