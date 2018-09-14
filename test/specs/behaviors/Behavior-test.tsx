import {
  ButtonBehavior,
  InputBehavior,
  ToggleButtonBehavior,
  IconBehavior,
  SelectableListItemBehavior,
  BasicListBehavior,
  BasicListItemBehavior,
  SelectableListBehavior,
  MenuBehavior,
} from '../../../src/lib/accessibility/'
import { TestHelper, TestMethod } from './testHelper'
import definitions from './testDefinitions'
const behaviorMenuItems = require('docs/src/behaviorMenu')

const testHelper = new TestHelper()
testHelper.addTests(definitions)

testHelper.addBehavior('ToggleButtonBehavior', ToggleButtonBehavior)
testHelper.addBehavior('ButtonBehavior', ButtonBehavior)
testHelper.addBehavior('IconBehavior', IconBehavior)
testHelper.addBehavior('InputBehavior', InputBehavior)
testHelper.addBehavior('SelectableListItemBehavior', SelectableListItemBehavior)
testHelper.addBehavior('BasicListBehavior', BasicListBehavior)
testHelper.addBehavior('BasicListItemBehavior', BasicListItemBehavior)
testHelper.addBehavior('SelectableListBehavior', SelectableListBehavior)
testHelper.addBehavior('MenuBehavior', MenuBehavior)

testHelper.run(behaviorMenuItems)
