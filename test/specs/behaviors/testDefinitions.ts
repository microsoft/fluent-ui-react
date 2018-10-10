import { TestDefinition, TestMethod, TestHelper } from './testHelper'

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

// Example: Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
definitions.push({
  regexp: /Adds attribute '([\w\-\w \s*]+)=([a-z]+)', if there is no '[a-z]+' property provided\.+/g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes.root[attributeToBeAdded]
    expect(testHelper.convertToBooleanIfApplicable(expectedResult)).toBe(
      testHelper.convertToBooleanIfApplicable(attributeExpectedValue),
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
  },
})

export default definitions
