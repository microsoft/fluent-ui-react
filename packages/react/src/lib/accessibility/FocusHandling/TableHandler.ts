import * as _ from 'lodash'

export class TableHandler {
  private focusedIndex = 0
  private focusedRowIndex = 0
  private focusedColIndex = 0

  constructor(
    private getRowsCount: () => number,
    private getColumnsCount: () => number,
    private readonly setFocusAt: (rowIndex, colIndex) => void,
  ) {}

  private noItems = (): boolean => this.getRowsCount() * this.getColumnsCount() === 0

  private constrainFocusedIndex(): void {
    if (this.focusedRowIndex < 0) {
      this.focusedRowIndex = 0
    }

    if (this.focusedColIndex < 0) {
      this.focusedColIndex = 0
    }

    const rowsCount = this.getRowsCount()
    if (this.focusedRowIndex >= rowsCount) {
      this.focusedRowIndex = rowsCount - 1
    }

    const columsCount = this.getColumnsCount()
    if (this.focusedColIndex >= columsCount) {
      this.focusedColIndex = columsCount - 1
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

    // this.setFocusAt(this.focusedIndex)
  }

  public moveNext(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex += 1
    this.constrainFocusedIndex()

    // this.setFocusAt(this.focusedIndex)
  }

  public moveFirst(): void {
    if (this.noItems()) {
      return
    }

    this.focusedIndex = 0
    // this.setFocusAt(this.focusedIndex)
  }

  public moveLast(): void {
    if (this.noItems()) {
      return
    }

    // this.focusedIndex = this.getItemsCount() - 1
    // this.setFocusAt(this.focusedIndex)
  }
}
