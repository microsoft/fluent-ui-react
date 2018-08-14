export interface IActionHandler {
  onStateChanged(props: any)
}

export interface INavigable {
  moveNext()

  movePrevious()

  moveFirst()

  moveLast()
}

export interface IListNavigable extends INavigable {
  first()
  last()
}

export interface IActionable {
  OnAction()
}

export interface ICancalable {
  OnEsc()
}

export interface IMenuNvigable extends IListNavigable {}

export interface IMenuItemNavigable extends IListNavigable, IActionable, ICancalable {}
