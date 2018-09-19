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
  MenuItemBehavior,
  ListBehavior,
  ListItemBehavior,
  ImageBehavior,
} from '../../../src/lib/accessibility/'
import { TestHelper } from './testHelper'
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
testHelper.addBehavior('MenuItemBehavior', MenuItemBehavior)
testHelper.addBehavior('ListBehavior', ListBehavior)
testHelper.addBehavior('ListItemBehavior', ListItemBehavior)
testHelper.addBehavior('ImageBehavior', ImageBehavior)

testHelper.run(behaviorMenuItems)
