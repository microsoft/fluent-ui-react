import { TestDefinition, TestMethod } from './testHelper'

const definitions: TestDefinition[] = []

definitions.push({
  regexp: /Adds attribute '([\w\-\w \s*]+)=([a-z]+)' based on the property '([a-z]+)'/g,
  testMethod: (parameters: TestMethod) => {
    const [_, attributeToBeAdded, attributeExpectedValue, propertyDependingOn] = [
      ...parameters.props,
    ]
    const property = []
    property[propertyDependingOn] = propertyDependingOn

    const expectedResult = parameters.behavior(property).attributes!.root[attributeToBeAdded]
    expect(expectedResult).toBe(Boolean(attributeExpectedValue))
  },
})

// Adds attribute 'aria-hidden=true' to icon.
definitions.push({
  regexp: /Adds attribute '([\w\-\w \s*]+)=([a-z]+)' to [a-z]+/g,
  testMethod: (parameters: TestMethod) => {
    const [_, attributeToBeAdded, attributeExpectedValue] = [...parameters.props]
    const property = {}
    const expectedResult = parameters.behavior(property).attributes!.root[attributeToBeAdded]
    expect(expectedResult).toEqual(attributeExpectedValue)
  },
})

export default definitions
