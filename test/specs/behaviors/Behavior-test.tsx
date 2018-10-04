import {
  BasicListBehavior,
  BasicListItemBehavior,
  ButtonBehavior,
  ButtonGroupBehavior,
  IconBehavior,
  ImageBehavior,
  InputBehavior,
  MenuBehavior,
  MenuItemBehavior,
  PopupBehavior,
  RadioGroupBehavior,
  RadioGroupItemBehavior,
  SelectableListBehavior,
  SelectableListItemBehavior,
  TabBehavior,
  TabListBehavior,
  ToggleButtonBehavior,
  ToolbarBehavior,
} from '../../../src/lib/accessibility/'
import { TestHelper } from './testHelper'
import definitions from './testDefinitions'
const behaviorMenuItems = require('docs/src/behaviorMenu')

const testHelper = new TestHelper()
testHelper.addTests(definitions)

testHelper.addBehavior('BasicListBehavior', BasicListBehavior)
testHelper.addBehavior('BasicListItemBehavior', BasicListItemBehavior)
testHelper.addBehavior('ButtonBehavior', ButtonBehavior)
testHelper.addBehavior('ButtonGroupBehavior', ButtonGroupBehavior)
testHelper.addBehavior('IconBehavior', IconBehavior)
testHelper.addBehavior('InputBehavior', InputBehavior)
testHelper.addBehavior('ImageBehavior', ImageBehavior)
testHelper.addBehavior('MenuBehavior', MenuBehavior)
testHelper.addBehavior('MenuItemBehavior', MenuItemBehavior)
testHelper.addBehavior('PopupBehavior', PopupBehavior)
testHelper.addBehavior('RadioGroupBehavior', RadioGroupBehavior)
testHelper.addBehavior('RadioGroupItemBehavior', RadioGroupItemBehavior)
testHelper.addBehavior('SelectableListBehavior', SelectableListBehavior)
testHelper.addBehavior('SelectableListItemBehavior', SelectableListItemBehavior)
testHelper.addBehavior('TabBehavior', TabBehavior)
testHelper.addBehavior('TabListBehavior', TabListBehavior)
testHelper.addBehavior('ToolbarBehavior', ToolbarBehavior)
testHelper.addBehavior('ToggleButtonBehavior', ToggleButtonBehavior)

testHelper.run(behaviorMenuItems)
