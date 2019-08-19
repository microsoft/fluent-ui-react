import { sliderBehavior } from 'src/lib/accessibility'

function generatePropertyTest(
  propName: string,
  propValue: string | boolean | number,
  slot: string,
  expectedAttr: string,
  customExpResult?: string,
) {
  test(`${expectedAttr} is set based on property ${propName}:${propValue}`, () => {
    const expectedResultValue = customExpResult || propValue
    const props = {
      [propName]: propValue,
      getA11yValueMessageOnChange: () => {
        return undefined
      },
    }
    const expectedResult = sliderBehavior(props)
    expect(expectedResult.attributes[slot][expectedAttr]).toEqual(expectedResultValue)
  })
}

describe('SliderBehavior.ts', () => {
  generatePropertyTest('disabled', true, 'root', 'aria-disabled')
  generatePropertyTest('min', 0, 'input', 'aria-valuemin')
  generatePropertyTest('max', 0, 'input', 'aria-valuemax')
  generatePropertyTest('value', 0, 'input', 'aria-valuenow')
  generatePropertyTest('vertical', true, 'input', 'aria-orientation', 'vertical')
  generatePropertyTest('vertical', false, 'input', 'aria-orientation', 'horizontal')

  test('aria-valuetext is set based on the property getA11yValueMessageOnChange', () => {
    const ariaValueText = 'custom aria value text'
    const customAriaValueText = () => {
      return ariaValueText
    }
    const property = {
      getA11yValueMessageOnChange: customAriaValueText,
    }
    const expectedResult = sliderBehavior(property)
    expect(expectedResult.attributes.input['aria-valuetext']).toEqual(ariaValueText)
  })
})
