import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class MenuBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  private timeoutId: any
  private isManagingFocus: boolean = false
  private stopPropagation: boolean = true
  private func: Function
  constructor() {
    super('menu')

    this.handleBlur((event, component, props, state) => {
      this.timeoutId = setTimeout(() => {
        if (this.isManagingFocus) {
          this.isManagingFocus = false
        }

        console.log('isManagingFocus blur', this.isManagingFocus)
        return
      }, 0)
    })

    this.handleFocus((event, component, props, state) => {
      clearTimeout(this.timeoutId)
      if (!this.isManagingFocus) {
        this.isManagingFocus = true
      }

      console.log('isManagingFocus focus', this.isManagingFocus)
    })
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menu',
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
