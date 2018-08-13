import { IAccessibilityDefinition } from '../../interfaces'
import { KeyCodes } from '../../../KeyCodes'

const BasicMenuBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'menu',
    },
  },

  actionsDefinition: {
    movePrevious: {
      keyCombinations: [{ keyCode: KeyCodes.left }],
    },
    moveNext: {
      keyCombinations: [{ keyCode: KeyCodes.right }],
    },
    moveFirst: {
      keyCombinations: [{ keyCode: KeyCodes.home }],
    },
    moveLast: {
      keyCombinations: [{ keyCode: KeyCodes.end }],
    },
  },
}

export default BasicMenuBehavior
