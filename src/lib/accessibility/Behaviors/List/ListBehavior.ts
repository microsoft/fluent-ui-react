import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { eventStack } from '../../..'
import { LinkedList } from '../../data-structures'

const UP_ARROW = 38
const DOWN_ARROW = 40
const LEFT_ARROW = 37
const RIGHT_ARROW = 39

export type ListType = 'horizontal' | 'vertical'

export class ListBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'list',
  }

  private menuItems: LinkedList<HTMLElement>

  constructor(private listType: ListType) {
    eventStack.sub('keydown', this.handleKeyDown.bind(this))
  }

  public get name(): string {
    return 'list'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}

  // The logic should be extracted into separate reusable object
  // as it will be the same for List/Menu/Tab/ChatList/AppBar/etc
  private handleKeyDown(e: KeyboardEvent) {
    // console.log(e.target)

    // console.log(document.querySelectorAll('[ms-acc-behavior="menuitem"]'))
    // const el = <HTMLElement>document.querySelectorAll('[ms-acc-behavior="menuitem"]')[0]
    // console.log(el)

    // el.focus()

    // This should be extracted to a method and the method should be call on componentMount
    if (!this.menuItems) {
      const nodes = document.querySelectorAll('[ms-acc-behavior="menuitem"]')
      this.menuItems = new LinkedList<HTMLElement>()

      for (let i = 0; i < nodes.length; i++) {
        this.menuItems.append(<HTMLElement>nodes[i])
      }
    }

    console.log(this.menuItems)

    if (this.listType === 'vertical') {
      if (e.which === UP_ARROW) {
        console.log('UP arrow pressed')
        this.menuItems.previous()
      }

      if (e.which === DOWN_ARROW) {
        console.log('DOWN arrow pressed')
        this.menuItems.next()
      }
    }

    if (this.listType === 'horizontal') {
      if (e.which === LEFT_ARROW) {
        console.log('LEFT arrow pressed')
        this.menuItems.previous()
      }

      if (e.which === RIGHT_ARROW) {
        console.log('RIGHT arrow pressed')
        this.menuItems.next()
      }
    }

    this.menuItems.current.focus()
  }
}
