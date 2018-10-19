import { TestDefinition, TestMethod, TestHelper } from './testHelper'
import * as keyboardKey from 'keyboard-key'

const definitions: TestDefinition[] = []
const testHelper = new TestHelper()

// Example:  Adds attribute 'aria-pressed=true' based on the property 'active'
definitions.push({
  regexp: /Adds attribute '([\w\-\w \s*]+)=([a-z]+)' based on the property '([a-z]+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue, propertyDependingOn] = [...parameters.props]
    const property = {}
    property[propertyDependingOn] = attributeExpectedValue

    const expectedResult = parameters.behavior(property).attributes!.root[attributeToBeAdded]
    expect(testHelper.convertToBooleanIfApplicable(expectedResult)).toEqual(
      testHelper.convertToBooleanIfApplicable(attributeExpectedValue),
    )
  },
})

// Example:  Adds attribute 'aria-hidden=true' to icon
definitions.push({
  regexp: /Adds attribute '([\w\-\w \s*]+)=([a-z]+)' to [a-z]+/g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes!.root[attributeToBeAdded]
    expect(expectedResult).toEqual(attributeExpectedValue)
  },
})

// Example:  Adds role='listbox'.
definitions.push({
  regexp: /Adds role='([a-z]+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [roleToBeAdded] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes.root['role']
    expect(expectedResult).toEqual(roleToBeAdded)
  },
})

// Example:  Adds role 'menuitem' to 'anchor' component's part
definitions.push({
  regexp: /Adds role '([a-z]+)' to '([a-z]+)' component's part/g,
  testMethod: (parameters: TestMethod) => {
    const [roleToBeAdded, elementWhereToBeAdded] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded]['role']
    expect(expectedResult).toEqual(roleToBeAdded)
  },
})

// Example: Adds attribute 'tabIndex=0' to 'anchor' component's part.
//          Adds attribute 'data-is-focusable=true' to 'anchor' component's part.
definitions.push({
  regexp: /Adds attribute '([a-z A-Z -]+)=([a-z 0-9]+)' to '([a-z]+)' component's part\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue, elementWhereToBeAdded] = [
      ...parameters.props,
    ]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded][
      attributeToBeAdded
    ]
    expect(testHelper.convertToBooleanIfApplicable(expectedResult)).toEqual(
      testHelper.convertToBooleanIfApplicable(attributeExpectedValue),
    )
  },
})

// Example: Adds attribute 'aria-label' based on the property 'aria-label' to 'anchor' component's part.
definitions.push({
  regexp: /Adds attribute '([a-z -]+)' based on the property '([a-z -]+)' to '([a-z -]+)' component's part\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, propertyDependingOn, elementWhereToBeAdded] = [...parameters.props]
    const property = {}
    const propertyDependingOnValue = 'value of property'
    property[propertyDependingOn] = propertyDependingOnValue
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded][
      attributeToBeAdded
    ]
    expect(expectedResult).toEqual(
      testHelper.convertToBooleanIfApplicable(propertyDependingOnValue),
    )
  },
})

// Adds attribute 'aria-selected=true' to 'anchor' component's part based on the property 'active'. This can be overriden by directly providing 'aria-selected' property to the component.
definitions.push({
  regexp: /Adds attribute '([a-z A-Z -]+)=([a-z 0-9]+)' to '([a-z -]+)' component's part based on the property '[a-z]+'\. This can be overriden by providing '([a-z -]+)' property directly to the component\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, component, overridingProperty] = [
      ...parameters.props,
    ]

    const propertyWithOverride = {}
    propertyWithOverride[overridingProperty] = valueOfAttributeToBeAdded
    const expectedResultAttributeDefined = parameters.behavior(propertyWithOverride).attributes[
      component
    ][attributeToBeAdded]
    expect(testHelper.convertToBooleanIfApplicable(expectedResultAttributeDefined)).toEqual(
      testHelper.convertToBooleanIfApplicable(valueOfAttributeToBeAdded),
    )
  },
})

// Example: Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
definitions.push({
  regexp: /Adds attribute '([a-z A-Z -]+)=([a-z 0-9]+)' based on the property '[a-z]+'\. This can be overriden by providing '([a-z -]+)' property directly to the component\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, overridingProperty] = [
      ...parameters.props,
    ]
    const propertyWithOverride = {}
    propertyWithOverride[overridingProperty] = valueOfAttributeToBeAdded
    const expectedResultAttributeDefined = parameters.behavior(propertyWithOverride).attributes
      .root[attributeToBeAdded]
    expect(testHelper.convertToBooleanIfApplicable(expectedResultAttributeDefined)).toEqual(
      testHelper.convertToBooleanIfApplicable(valueOfAttributeToBeAdded),
    )
  },
})

// Example: Adds attribute 'aria-disabled=true' to 'trigger' component's part based on the property 'disabled'.
definitions.push({
  regexp: /Adds attribute '([a-z A-Z -]+)=([a-z 0-9]+)' to '([a-z -]+)' component's part based on the property '([a-z -]+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, component, propertyDependsOn] = [
      ...parameters.props,
    ]
    const propertyWithAriaSelected = {}
    propertyWithAriaSelected[propertyDependsOn] = true
    const expectedResultAttributeDefined = parameters.behavior(propertyWithAriaSelected).attributes[
      component
    ][attributeToBeAdded]
    expect(testHelper.convertToBooleanIfApplicable(expectedResultAttributeDefined)).toEqual(
      testHelper.convertToBooleanIfApplicable(valueOfAttributeToBeAdded),
    )
  },
})

// Example: Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
definitions.push({
  regexp: /Adds attribute '([\w\-\w \s*]+)=([a-z]+)', if there is no 'alt' property provided\.+/g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes.root[attributeToBeAdded]
    expect(testHelper.convertToBooleanIfApplicable(expectedResult)).toBe(
      testHelper.convertToBooleanIfApplicable(attributeExpectedValue),
    )

    const propertyWithAlt = { alt: 'mockText' }
    const expectedResultWithAlt = parameters.behavior(propertyWithAlt).attributes.root[
      attributeToBeAdded
    ]
    expect(testHelper.convertToBooleanIfApplicable(expectedResultWithAlt)).toBe(
      testHelper.convertToBooleanIfApplicable(undefined),
    )
  },
})

// Example: Adds role='button' if element type is other than 'button'.
definitions.push({
  regexp: /Adds role='([a-z]+)' if element type is other than '[a-z]+'\.+/g,
  testMethod: (parameters: TestMethod) => {
    const [roleToBeAdded] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes.root.role
    expect(testHelper.convertToBooleanIfApplicable(expectedResult)).toBe(
      testHelper.convertToBooleanIfApplicable(roleToBeAdded),
    )

    const propertyAsButton = { as: 'button' }
    const expectedResultAsButton = parameters.behavior(propertyAsButton).attributes.root.role
    expect(testHelper.convertToBooleanIfApplicable(expectedResultAsButton)).toBe(
      testHelper.convertToBooleanIfApplicable(undefined),
    )
  },
})

// Wraps component in FocusZone allowing arrow key navigation through the children of the component.
definitions.push({
  regexp: /Wraps component in FocusZone allowing arrow key navigation through the children of the component\.+/g,
  testMethod: (parameters: TestMethod) => {
    const property = {
      isCircularNavigation: undefined,
      preventDefaultWhenHandled: undefined,
    }
    const expectedMode = parameters.behavior(property).focusZone.mode
    const expectedIsCircularNav = parameters.behavior(property).focusZone.props.isCircularNavigation
    const expectedPreventDefault = parameters.behavior(property).focusZone.props
      .preventDefaultWhenHandled

    expect(expectedMode).toBe(1)
    expect(expectedIsCircularNav).toBe(false)
    expect(expectedPreventDefault).toBe(true)
  },
})

// Wraps component in FocusZone allowing arrow key navigation through the children of the component.
definitions.push({
  regexp: /Wraps component in FocusZone allowing arrow key navigation through the children of the component.\.+/g,
  testMethod: (parameters: TestMethod) => {
    const property = {
      isCircularNavigation: undefined,
      preventDefaultWhenHandled: undefined,
    }
    const expectedMode = parameters.behavior(property).focusZone.mode
    const expectedIsCircularNav = parameters.behavior(property).focusZone.props.isCircularNavigation
    const expectedPreventDefault = parameters.behavior(property).focusZone.props
      .preventDefaultWhenHandled

    expect(expectedMode).toBe(1)
    expect(expectedIsCircularNav).toBe(true)
    expect(expectedPreventDefault).toBe(true)
  },
})

// Example: Performs 'nextItem' action on ArrowDown, ArrowRight.
definitions.push({
  regexp: /Performs '([a-z A-Z]+)' action on ([a-z A-Z]+), ([a-z A-Z]+)\.+/g,
  testMethod: (parameters: TestMethod) => {
    const [action, firstArrow, secondArrow] = [...parameters.props]
    const property = {}
    const expectedFirstArrowKeyNumber = parameters.behavior(property).keyActions.root[action]
      .keyCombinations[0].keyCode
    const expectedSecondArrowKeyNumber = parameters.behavior(property).keyActions.root[action]
      .keyCombinations[1].keyCode
    expect(expectedFirstArrowKeyNumber).toBe(keyboardKey[firstArrow])
    expect(expectedSecondArrowKeyNumber).toBe(keyboardKey[secondArrow])
  },
})

// Performs click action with 'Enter' and 'Spacebar' on 'anchor'.
definitions.push({
  regexp: /Performs click action with '([a-z A-Z]+)' and '([a-z A-Z]+)' on '([a-z A-Z]+)'\.+/g,
  testMethod: (parameters: TestMethod) => {
    const [firstKey, secondKey, elementToPerformAction] = [...parameters.props]
    const property = {}
    const expectedFirstKeyNumber = parameters.behavior(property).keyActions[elementToPerformAction]
      .performClick.keyCombinations[0].keyCode
    const expectedSecondKeyNumber = parameters.behavior(property).keyActions[elementToPerformAction]
      .performClick.keyCombinations[1].keyCode
    expect(expectedFirstKeyNumber).toBe(keyboardKey[firstKey])
    expect(expectedSecondKeyNumber).toBe(keyboardKey[secondKey])
  },
})

// Implements roving tabIndex
definitions.push({
  regexp: /Implements roving tabIndex.+/g,
  testMethod: (parameters: TestMethod) => {
    const propertyChecked = { checked: true }
    const propertyNotChecked = { checked: false }
    expect(parameters.behavior(propertyChecked).attributes.root.tabIndex).toBe('0')
    expect(parameters.behavior(propertyNotChecked).attributes.root.tabIndex).toBe('-1')
  },
})

export default definitions
