import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { LinkedList } from '../../data-structures'
import { eventStack } from '../../..'

const UP_ARROW = 38
const DOWN_ARROW = 40
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const TAB = 9
const ENTER = 13
const ESC = 27

export type MenuType = 'horizontal' | 'vertical'

export class MenuBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menubar',
    tabIndex: 0,
  }
  private menuItems: LinkedList<HTMLElement>

  constructor(private menuType: MenuType) {
    // it would be better to addEventListener on the concrete component root element,
    // instead of adding it to the body
    eventStack.sub('keydown', this.handleKeyDown.bind(this))
  }

  public get name(): string {
    return 'menu'
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

    if (this.menuType === 'vertical') {
      if (e.which === UP_ARROW) {
        console.log('UP arrow pressed')
        this.menuItems.previous()
      }

      if (e.which === DOWN_ARROW) {
        console.log('DOWN arrow pressed')
        this.menuItems.next()
      }
    }

    if (this.menuType === 'horizontal') {
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
