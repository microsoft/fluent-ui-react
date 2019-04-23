import { TestDefinition, TestMethod, TestHelper } from './testHelper'
import { FocusZoneMode, FocusZoneDefinition } from '../../../src/lib/accessibility/types'
import * as keyboardKey from 'keyboard-key'

const definitions: TestDefinition[] = []
const testHelper = new TestHelper()

// Example:  Adds attribute 'aria-pressed=true' based on the property 'active'
definitions.push({
  regexp: /Adds attribute '([\w-]+)=(\w+)' based on the property '(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue, propertyDependingOn] = [...parameters.props]
    const property = {}
    property[propertyDependingOn] = attributeExpectedValue

    const expectedResult = parameters.behavior(property).attributes!.root[attributeToBeAdded]
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    )
  },
})

// Example:  Adds attribute 'aria-hidden=true' to icon
definitions.push({
  regexp: /Adds attribute '([\w-]+)=(\w+)' to \w+/g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes!.root[attributeToBeAdded]
    expect(expectedResult).toEqual(attributeExpectedValue)
  },
})

// Example:  Adds role='listbox'.
definitions.push({
  regexp: /Adds role='(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [roleToBeAdded] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes.root['role']
    expect(expectedResult).toEqual(roleToBeAdded)
  },
})

// Example:  Adds role 'menuitem' to 'anchor' component's part
definitions.push({
  regexp: /Adds role '(\w+)' to '([\w-]+)' component's part/g,
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
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' to '([\w-]+)' component's part\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue, elementWhereToBeAdded] = [
      ...parameters.props,
    ]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded][
      attributeToBeAdded
    ]
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    )
  },
})

// Example: Adds attribute 'aria-expanded=true' based on the property 'menuOpen' if the component has 'menu' property to 'anchor' component's part.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' based on the property '([\w-]+)' if the component has '([\w-]+)' property to '([\w-]+)' component's part\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      attributeExpectedValue,
      propertyBasedOn,
      propertyDependingOn,
      elementWhereToBeAdded,
    ] = [...parameters.props]
    const property = {}
    property[propertyDependingOn] = [{}, {}]
    property[propertyBasedOn] = true
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded][
      attributeToBeAdded
    ]
    expect(expectedResult).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    )

    // when property depending on is undefined, then there should not be 'aria' attribute added
    const propertyDependingOnValue = undefined
    property[propertyDependingOn] = propertyDependingOnValue
    const expectedResultDependingPropertyUndefined = parameters.behavior(property).attributes[
      elementWhereToBeAdded
    ][attributeToBeAdded]
    expect(expectedResultDependingPropertyUndefined).toEqual(propertyDependingOnValue)

    // when property based on is undefined, then there should 'aria' attribute get false value
    property[propertyDependingOn] = [{}, {}]
    property[propertyBasedOn] = undefined
    const expectedResultBasedOnPropertyUndefined = parameters.behavior(property).attributes[
      elementWhereToBeAdded
    ][attributeToBeAdded]
    expect(expectedResultBasedOnPropertyUndefined).toEqual(false)
  },
})

// Example: Adds attribute 'aria-label' based on the property 'aria-label' to 'anchor' component's part.
definitions.push({
  regexp: /Adds attribute '([\w-]+)' based on the property '([\w-]+)' to '([\w-]+)' component's part\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, propertyDependingOn, elementWhereToBeAdded] = [...parameters.props]
    const property = {}
    const propertyDependingOnValue = 'value of property'
    property[propertyDependingOn] = propertyDependingOnValue
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded][
      attributeToBeAdded
    ]
    expect(expectedResult).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(propertyDependingOnValue),
    )
  },
})

// Adds attribute 'aria-selected=true' to 'anchor' component's part based on the property 'active'. This can be overriden by directly providing 'aria-selected' property to the component.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' to '([\w-]+)' component's part based on the property '\w+'\. This can be overriden by providing '([\w-]+)' property directly to the component\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, component, overridingProperty] = [
      ...parameters.props,
    ]

    const propertyWithOverride = {}
    propertyWithOverride[overridingProperty] = valueOfAttributeToBeAdded
    const expectedResultAttributeDefined = parameters.behavior(propertyWithOverride).attributes[
      component
    ][attributeToBeAdded]
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeDefined)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAdded),
    )
  },
})

// Example: Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' based on the property '\w+'\. This can be overriden by providing '([\w-]+)' property directly to the component\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, overridingProperty] = [
      ...parameters.props,
    ]
    const propertyWithOverride = {}
    propertyWithOverride[overridingProperty] = valueOfAttributeToBeAdded
    const expectedResultAttributeDefined = parameters.behavior(propertyWithOverride).attributes
      .root[attributeToBeAdded]
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeDefined)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAdded),
    )
  },
})

function testMethodConditionallyAddAttribute(
  parameters,
  component,
  propertyDependsOn,
  valueOfProperty,
  attributeToBeAdded,
  valueOfAttributeToBeAddedIfTrue,
  valueOfAttributeToBeAddedOtherwise,
) {
  const propertyWithAriaSelected = {}
  const expectedResultAttributeNotDefined = parameters.behavior(propertyWithAriaSelected)
    .attributes[component][attributeToBeAdded]
  expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeNotDefined)).toEqual(
    testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAddedOtherwise),
  )

  propertyWithAriaSelected[propertyDependsOn] = valueOfProperty
  const expectedResultAttributeDefined = parameters.behavior(propertyWithAriaSelected).attributes[
    component
  ][attributeToBeAdded]
  expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeDefined)).toEqual(
    testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAddedIfTrue),
  )
}

// Example: Adds attribute 'aria-disabled=true' to 'trigger' component's part if 'disabled' property is true. Does not set the attribute otherwise.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' to '([\w-]+)' component's part if '([\w-]+)' property is true\. Does not set the attribute otherwise\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, component, propertyDependsOn] = [
      ...parameters.props,
    ]

    testMethodConditionallyAddAttribute(
      parameters,
      component,
      propertyDependsOn,
      true,
      attributeToBeAdded,
      valueOfAttributeToBeAdded,
      undefined,
    )
  },
})

// Example: Adds attribute 'aria-disabled=true' to 'trigger' component's part if 'disabled' property is true. Sets the attribute to 'false' otherwise.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' to '([\w-]+)' component's part if '([\w-]+)' property is true\. Sets the attribute to '([\w\d]+)' otherwise\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      valueOfAttributeToBeAddedIfTrue,
      component,
      propertyDependsOn,
      valueOfAttributeToBeAddedOtherwise,
    ] = [...parameters.props]

    testMethodConditionallyAddAttribute(
      parameters,
      component,
      propertyDependsOn,
      true,
      attributeToBeAdded,
      valueOfAttributeToBeAddedIfTrue,
      valueOfAttributeToBeAddedOtherwise,
    )
  },
})

// Adds attribute 'aria-haspopup=true' to 'root' component's part if 'menu' menu property is set.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' to '([\w-]+)' component's part if '([\w-]+)' property is set\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      valueOfAttributeToBeAddedIfTrue,
      component,
      propertyDependsOn,
      valueOfAttributeToBeAddedOtherwise,
    ] = [...parameters.props]

    testMethodConditionallyAddAttribute(
      parameters,
      component,
      propertyDependsOn,
      'custom-value',
      attributeToBeAdded,
      valueOfAttributeToBeAddedIfTrue,
      valueOfAttributeToBeAddedOtherwise,
    )
  },
})

// Example: Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=(\w+)', if there is no 'alt' property provided\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes.root[attributeToBeAdded]
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    )

    const propertyWithAlt = { alt: 'mockText' }
    const expectedResultWithAlt = parameters.behavior(propertyWithAlt).attributes.root[
      attributeToBeAdded
    ]
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultWithAlt)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(undefined),
    )
  },
})

// Example:  Adds attribute 'aria-expanded=true' based on the property 'open' if the component has 'hasSubtree' property.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=(\w+)' based on the property '(\w+)' if the component has '(\w+)' property\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      attributeExpectedValue,
      propertyDependingOnFirst,
      propertyDependingOnSecond,
    ] = [...parameters.props]

    const property = {}

    property[propertyDependingOnFirst] = attributeExpectedValue
    property[propertyDependingOnSecond] = true
    const actualResult = parameters.behavior(property).attributes.root[attributeToBeAdded]
    expect(testHelper.convertToMatchingTypeIfApplicable(actualResult)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    )

    const propertyFirstPropNegate = {}
    propertyFirstPropNegate[
      propertyDependingOnFirst
    ] = !testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue)
    propertyFirstPropNegate[propertyDependingOnSecond] = true
    const actualResultFirstPropertyNegate = parameters.behavior(propertyFirstPropNegate).attributes
      .root[attributeToBeAdded]
    expect(testHelper.convertToMatchingTypeIfApplicable(actualResultFirstPropertyNegate)).toEqual(
      !testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    )

    const propertyFirstPropUndefined = {}
    propertyFirstPropUndefined[propertyDependingOnFirst] = true
    propertyFirstPropUndefined[propertyDependingOnSecond] = undefined
    const actualResultFirstPropertyNegateUndefined = parameters.behavior(propertyFirstPropUndefined)
      .attributes.root[attributeToBeAdded]
    expect(
      testHelper.convertToMatchingTypeIfApplicable(actualResultFirstPropertyNegateUndefined),
    ).toEqual(undefined)
  },
})

// Example: Adds role='button' if element type is other than 'button'.
definitions.push({
  regexp: /Adds role='(\w+)' if element type is other than '\w+'\./g,
  testMethod: (parameters: TestMethod) => {
    const [roleToBeAdded] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes.root.role
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(roleToBeAdded),
    )

    const propertyAsButton = { as: 'button' }
    const expectedResultAsButton = parameters.behavior(propertyAsButton).attributes.root.role
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAsButton)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(undefined),
    )
  },
})

// Embeds FocusZone into component allowing arrow key navigation through the children of the component.
definitions.push({
  regexp: /Embeds FocusZone into component allowing arrow key navigation through the children of the component\./g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZone = parameters.behavior({}).focusZone

    const expectedFocusZone: FocusZoneDefinition = {
      mode: FocusZoneMode.Embed,
      props: {
        isCircularNavigation: false,
        preventDefaultWhenHandled: true,
      },
    }

    verifyFocusZones(expectedFocusZone, actualFocusZone)
  },
})

// [Circular navigation] Embeds FocusZone into component allowing circular arrow key navigation through the children of the component.
definitions.push({
  regexp: /Embeds FocusZone into component allowing circular arrow key navigation through the children of the component\./g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZone = parameters.behavior({}).focusZone

    const expectedFocusZone: FocusZoneDefinition = {
      mode: FocusZoneMode.Embed,
      props: {
        isCircularNavigation: true,
        preventDefaultWhenHandled: true,
      },
    }

    verifyFocusZones(expectedFocusZone, actualFocusZone)
  },
})

// Wraps component in FocusZone allowing arrow key navigation through the children of the component.
definitions.push({
  regexp: /Wraps component in FocusZone allowing arrow key navigation through the children of the component\./g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZone = parameters.behavior({}).focusZone

    const expectedFocusZone: FocusZoneDefinition = {
      mode: FocusZoneMode.Wrap,
      props: {
        isCircularNavigation: false,
        preventDefaultWhenHandled: true,
      },
    }

    verifyFocusZones(expectedFocusZone, actualFocusZone)
  },
})

// [Circular navigation] Wraps component in FocusZone allowing circular arrow key navigation through the children of the component.
definitions.push({
  regexp: /Wraps component in FocusZone allowing circular arrow key navigation through the children of the component\./g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZone = parameters.behavior({}).focusZone

    const expectedFocusZone: FocusZoneDefinition = {
      mode: FocusZoneMode.Wrap,
      props: {
        isCircularNavigation: true,
        preventDefaultWhenHandled: true,
      },
    }

    verifyFocusZones(expectedFocusZone, actualFocusZone)
  },
})

function verifyFocusZones(
  expectedFocusZone: FocusZoneDefinition,
  actualFocusZone: FocusZoneDefinition,
) {
  expect(expectedFocusZone.mode).toBe(actualFocusZone.mode)
  expect(expectedFocusZone.props.isCircularNavigation).toBe(
    actualFocusZone.props.isCircularNavigation,
  )
  expect(expectedFocusZone.props.preventDefaultWhenHandled).toBe(
    actualFocusZone.props.preventDefaultWhenHandled,
  )
}

// [FocusTrapZone] Traps focus inside component
definitions.push({
  regexp: /Traps focus inside component/,
  testMethod: (parameters: TestMethod) => {
    const focusTrapZoneProps = parameters.behavior({}).focusTrap

    expect(focusTrapZoneProps).toBeDefined()

    if (typeof focusTrapZoneProps === 'boolean') {
      expect(focusTrapZoneProps).toBe(true)
    } else {
      expect(focusTrapZoneProps).not.toBeNull()
      expect(typeof focusTrapZoneProps).toBe('object')
    }
  },
})

// [AutoFocusZone] Automatically focus the first focusable element inside component
definitions.push({
  regexp: /Automatically focus the first focusable element inside component/,
  testMethod: (parameters: TestMethod) => {
    const autofocusZoneProps = parameters.behavior({}).autoFocus

    expect(autofocusZoneProps).toBeDefined()

    if (typeof autofocusZoneProps === 'boolean') {
      expect(autofocusZoneProps).toBe(true)
    } else {
      expect(autofocusZoneProps).not.toBeNull()
      expect(typeof autofocusZoneProps).toBe('object')
    }
  },
})

// Triggers 'click' action with 'Enter' or 'Spacebar' on 'root'.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' or '(\w+)' on '(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, firstKey, secondKey, elementToPerformAction] = [...parameters.props]
    const property = {}
    const expectedFirstKeyNumber = parameters.behavior(property).keyActions[elementToPerformAction][
      action
    ].keyCombinations[0].keyCode
    const expectedSecondKeyNumber = parameters.behavior(property).keyActions[
      elementToPerformAction
    ][action].keyCombinations[1].keyCode
    expect(expectedFirstKeyNumber).toBe(keyboardKey[firstKey])
    expect(expectedSecondKeyNumber).toBe(keyboardKey[secondKey])
  },
})

// Triggers 'closeAllMenus' action with 'Escape' on 'root'.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' on '(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props]
    const property = {}
    const expectedKeyNumber = parameters.behavior(property).keyActions[elementToPerformAction][
      action
    ].keyCombinations[0].keyCode
    expect(expectedKeyNumber).toBe(keyboardKey[key])
  },
})

// Triggers 'openMenu' action with 'ArrowDown' on 'root', when orientaton is horizontal.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' on '([\w-]+)', when orientation is horizontal\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props]
    const property = {}
    const expectedKeyNumber = parameters.behavior(property).keyActions[elementToPerformAction][
      action
    ].keyCombinations[0].keyCode
    expect(expectedKeyNumber).toBe(keyboardKey[key])
  },
})

// Triggers 'openMenu' action with 'ArrowRight' on 'root', when orientation is vertical.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' on '([\w-]+)', when orientation is vertical\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props]
    const propertyVertical = { vertical: true }
    const expectedKeyNumberVertical = parameters.behavior(propertyVertical).keyActions[
      elementToPerformAction
    ][action].keyCombinations[0].keyCode
    expect(expectedKeyNumberVertical).toBe(keyboardKey[key])
  },
})

// Triggers 'doNotNavigateNextParentItem' action with 'ArrowLeft' or 'ArrowRight' on 'wrapper', when toolbar button has submenu and it is opened.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' or '(\w+)' on '([\w-]+)', when toolbar button has submenu and it is opened\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, firstKey, secondKey, elementToPerformAction] = [...parameters.props]
    const propertySubmenuOpened = { menu: { items: [] }, menuOpen: true }
    const expectedFirstKeyNumber = parameters.behavior(propertySubmenuOpened).keyActions[
      elementToPerformAction
    ][action].keyCombinations[0].keyCode
    const expectedSecondKeyNumber = parameters.behavior(propertySubmenuOpened).keyActions[
      elementToPerformAction
    ][action].keyCombinations[1].keyCode
    expect(expectedFirstKeyNumber).toBe(keyboardKey[firstKey])
    expect(expectedSecondKeyNumber).toBe(keyboardKey[secondKey])

    // when menuOpen == "false"
    propertySubmenuOpened.menuOpen = false
    const expectedKeyCombinations = parameters.behavior(propertySubmenuOpened).keyActions[
      elementToPerformAction
    ][action].keyCombinations
    expect(expectedKeyCombinations).toBe(null)
  },
})

// Implements roving tabIndex
definitions.push({
  regexp: /Implements roving tabIndex\./g,
  testMethod: (parameters: TestMethod) => {
    const propertyChecked = { checked: true }
    const propertyNotChecked = { checked: false }
    expect(parameters.behavior(propertyChecked).attributes.root.tabIndex).toBe(0)
    expect(parameters.behavior(propertyNotChecked).attributes.root.tabIndex).toBe(-1)
  },
})

export default definitions
