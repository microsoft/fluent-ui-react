import { ToggleButtonBehavior, IconBehavior } from '../../../src/lib/accessibility/'
import { TestHelper, TestMethod } from './testHelper'
import definitions from './testDefinitions'
const behaviorMenuItems = require('docs/src/behaviorMenu')

const testHelper = new TestHelper()
testHelper.addTests(definitions)

testHelper.addBehavior('ToggleButtonBehavior', ToggleButtonBehavior)
testHelper.addBehavior('IconBehavior', IconBehavior)

testHelper.run(behaviorMenuItems)
