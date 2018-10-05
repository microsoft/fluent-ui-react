import {
  basicListBehavior,
  basicListItemBehavior,
  buttonBehavior,
  buttonGroupBehavior,
  iconBehavior,
  imageBehavior,
  inputBehavior,
  menuBehavior,
  menuItemBehavior,
  popupBehavior,
  radioGroupBehavior,
  radioGroupItemBehavior,
  selectableListBehavior,
  selectableListItemBehavior,
  tabBehavior,
  tabListBehavior,
  toggleButtonBehavior,
  toolbarBehavior,
} from '../../../src/lib/accessibility/'
import { TestHelper } from './testHelper'
import definitions from './testDefinitions'
const behaviorMenuItems = require('docs/src/behaviorMenu')

const testHelper = new TestHelper()
testHelper.addTests(definitions)

testHelper.addBehavior('basicListBehavior', basicListBehavior)
testHelper.addBehavior('basicListItemBehavior', basicListItemBehavior)
testHelper.addBehavior('buttonBehavior', buttonBehavior)
testHelper.addBehavior('buttonGroupBehavior', buttonGroupBehavior)
testHelper.addBehavior('iconBehavior', iconBehavior)
testHelper.addBehavior('inputBehavior', inputBehavior)
testHelper.addBehavior('imageBehavior', imageBehavior)
testHelper.addBehavior('menuBehavior', menuBehavior)
testHelper.addBehavior('menuItemBehavior', menuItemBehavior)
testHelper.addBehavior('popupBehavior', popupBehavior)
testHelper.addBehavior('radioGroupBehavior', radioGroupBehavior)
testHelper.addBehavior('radioGroupItemBehavior', radioGroupItemBehavior)
testHelper.addBehavior('selectableListBehavior', selectableListBehavior)
testHelper.addBehavior('selectableListItemBehavior', selectableListItemBehavior)
testHelper.addBehavior('tabBehavior', tabBehavior)
testHelper.addBehavior('tabListBehavior', tabListBehavior)
testHelper.addBehavior('toolbarBehavior', toolbarBehavior)
testHelper.addBehavior('toggleButtonBehavior', toggleButtonBehavior)

testHelper.run(behaviorMenuItems)
