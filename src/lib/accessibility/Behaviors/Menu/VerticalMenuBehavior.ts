import { IAccessibilityDefinition } from '../../interfaces'
import { KeyCodes } from '../../../KeyCodes'
import DefaultActions from '../../Actions/DefaultActions'

const VerticalMenuBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'menu',
    },
  },

  actionsDefinition: {
    movePrevious: {
      keyCombinations: [{ keyCode: KeyCodes.up }],
    },
    moveNext: {
      keyCombinations: [{ keyCode: KeyCodes.down }],
    },
    moveFirst: {
      keyCombinations: [{ keyCode: KeyCodes.home }],
    },
    moveLast: {
      keyCombinations: [{ keyCode: KeyCodes.end }],
    },
  },

  actions: DefaultActions,
}

export default VerticalMenuBehavior
