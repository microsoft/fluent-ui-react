class LinkedListItem<T> {
  public next: LinkedListItem<T>
  public prev: LinkedListItem<T>
  public index: number = -1

  public get item(): T {
    return this._item
  }

  constructor(private _item: T) {}
}

export class LinkedList<T> {
  private _items: LinkedListItem<T>[] = []
  private _head: LinkedListItem<T>
  private _tail: LinkedListItem<T>
  private _currentIdx: number = -1

  constructor(private circular: boolean = false, items?: T[]) {
    if (!items) {
      return
    }

    items.forEach(element => {
      this.append(element)
    })
  }

  public get current(): T | null {
    return this._currentIdx !== -1 ? this._items[this._currentIdx].item : null
  }

  public get head(): LinkedListItem<T> {
    return this._head
  }

  public get tail(): LinkedListItem<T> {
    return this._tail
  }

  public get listCount(): number {
    return this._items.length
  }

  public append(item: T): void {
    const linkedListItem = new LinkedListItem(item)

    if (!this.head) {
      this._head = linkedListItem
      this._tail = linkedListItem
      this._currentIdx = 0 // let's start always from the first element
    } else {
      linkedListItem.prev = this._tail
      this._tail.next = linkedListItem
      this._tail = linkedListItem
    }

    this._items.push(linkedListItem)
    linkedListItem.index = this.listCount - 1
  }

  public next(): T | null {
    if (this._currentIdx < this.listCount - 1) {
      this._currentIdx++
    } else if (this._currentIdx === this.listCount - 1 && this.circular === true) {
      // restart round if the end of list reached
      this._currentIdx = 0
    }

    return this.current
  }

  public previous(): T | null {
    if (this._currentIdx > 0) {
      this._currentIdx--
    } else if (this._currentIdx === 0 && this.circular === true) {
      // restart round from end if the start of list reached
      this._currentIdx = this.listCount - 1
    }

    return this.current
  }

  public traverse(callback: (item: T) => {}): void {
    let current: LinkedListItem<T> = this.head
    while (current) {
      callback(current.item)
      current = current.next
    }
  }

  public search(item: T): LinkedListItem<T> {
    let currentNode = this.head

    while (currentNode.item !== item) {
      currentNode = currentNode.next
    }

    return currentNode
  }

  public setCurrentIndex(linkedListItem: LinkedListItem<T>): void {
    this._currentIdx = linkedListItem.index
  }

  public setFirstIndex(): void {
    this._currentIdx = 0
  }

  public setLastIndex(): void {
    this._currentIdx = this.listCount - 1
  }

  public setCurrentItem(item: T): void {
    this.setCurrentIndex(this.search(item))
  }
}
