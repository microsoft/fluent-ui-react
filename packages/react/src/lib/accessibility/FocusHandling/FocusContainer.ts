export class ContainerFocusHandler {
  focusedIndex = 0
  getItemsCount: () => number
  readonly setFocusAt: (number) => void
  circular = false

  constructor(getItemsCount: () => number, setFocusAt: (number) => void, circular = false) {
    this.getItemsCount = getItemsCount
    this.setFocusAt = setFocusAt
    this.circular = circular
  }

  noItems = (): boolean => this.getItemsCount() === 0

  constrainFocusedIndex(): void {
    const itemsCount = this.getItemsCount()
    if (this.focusedIndex < 0) {
      this.focusedIndex = this.circular ? itemsCount - 1 : 0
    }

    if (this.focusedIndex >= itemsCount) {
      this.focusedIndex = this.circular ? 0 : itemsCount - 1
    }
  }

  getFocusedIndex(): number {
    return this.focusedIndex
  }

  syncFocusedIndex(withCurrentIndex: number) {
    this.focusedIndex = withCurrentIndex
  }

  movePrevious(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex -= 1
    this.constrainFocusedIndex()

    this.setFocusAt(this.focusedIndex)
  }

  moveNext(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex += 1
    this.constrainFocusedIndex()

    this.setFocusAt(this.focusedIndex)
  }

  moveFirst(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex = 0
    this.setFocusAt(this.focusedIndex)
  }

  moveLast(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex = this.getItemsCount() - 1
    this.setFocusAt(this.focusedIndex)
  }
}
