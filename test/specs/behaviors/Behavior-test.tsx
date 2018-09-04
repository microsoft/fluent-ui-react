import * as _ from 'lodash'
import { ToggleButtonBehavior, IconBehavior } from '../../../src/lib/accessibility/'
import {
  AccessibilityDefinitionFunction,
  Accessibility,
} from '../../../src/lib/accessibility/interfaces'
const behaviorMenuItems = require('docs/src/componentMenuBehaviors')

type filteredDescription = {
  behaviorName: string
  testMethod: ([]) => void
  params: RegExpExecArray
}

type TestMethod = {
  behavior: AccessibilityDefinitionFunction
  props: []
}

const filteredDescriptionWithAssignedTestMethod: filteredDescription[] = []

const behaviorsMap: Map<string, Accessibility> = new Map([
  ['ToggleButtonBehavior', ToggleButtonBehavior],
  ['IconBehavior', IconBehavior],
])

const regexDefinitionsMap: Map<RegExp, (TestMethod) => void> = new Map([
  [
    /adds attribute '([\w\-\w \s*]+)=([a-z]+)' based on the property '([a-z]+)'/g,
    (parameters: TestMethod) => addAttributeBasedOnProperty(parameters),
  ],
  [
    /adds attribute '([\w\-\w \s*]+)=([a-z]+)' to [a-z]+/g,
    (parameters: TestMethod) => addAttribute(parameters),
  ],
])

function runTests(
  regexDefinitions: Map<RegExp, ([]) => void>,
  behaviors: Map<string, Accessibility>,
) {
  findRegexAndAssingCorrespondingInfoToArray(regexDefinitions)

  const groupedByBehavior = _(filteredDescriptionWithAssignedTestMethod)
    .groupBy('behaviorName')
    .value()
  _.each(groupedByBehavior, (value, key) => {
    describe(key, () => {
      value.forEach(singleTest => {
        singleTest.testMethod({
          behavior: getBehaviorWithProperType(singleTest.behaviorName, behaviors),
          props: singleTest.params,
        })
      })
    })
  })
}

function findRegexAndAssingCorrespondingInfoToArray(regexDefinitions: Map<RegExp, ([]) => void>) {
  behaviorMenuItems.forEach(behavior => {
    behavior.variations.forEach(variant => {
      variant.text.split('\n').forEach(singleLineText => {
        iterateRegexDefinitions(regexDefinitions, singleLineText, variant.name)
      })
    })
  })
}

function iterateRegexDefinitions(
  regexDefinitions: Map<RegExp, ([]) => void>,
  singleLineText: string,
  behaviorName: string,
) {
  regexDefinitions.forEach((key, value) => {
    const regex = new RegExp(value)
    const result = regex.exec(singleLineText)
    if (result) {
      filteredDescriptionWithAssignedTestMethod.push({
        behaviorName,
        testMethod: key,
        params: result,
      })
    }
  })
}

function getBehaviorWithProperType(
  behaviorName: string,
  behaviors: Map<string, Accessibility>,
): AccessibilityDefinitionFunction {
  const baseBehaviorName = behaviorName.replace('.ts', '')
  const importedBehavior = behaviors.get(baseBehaviorName)
  return importedBehavior as AccessibilityDefinitionFunction
}

function addAttributeBasedOnProperty(parameters: TestMethod) {
  test(parameters.props[0], () => {
    const attributeToBeAdded = parameters.props[1]
    const attributeExpectedValue = parameters.props[2]
    const propertyDependingOn = parameters.props[3]
    const property = []
    property[propertyDependingOn] = propertyDependingOn

    const expectedResult = parameters.behavior(property).attributes.root[attributeToBeAdded]
    expect(expectedResult).toBe(Boolean(attributeExpectedValue))
  })
}

function addAttribute(parameters: TestMethod) {
  test(parameters.props[0], () => {
    const attributeToBeAdded = parameters.props[1]
    const attributeExpectedValue = parameters.props[2]
    const property = {}

    const expectedResult = parameters.behavior(property).attributes.root[attributeToBeAdded]
    expect(expectedResult).toEqual(attributeExpectedValue)
  })
}

runTests(regexDefinitionsMap, behaviorsMap)
