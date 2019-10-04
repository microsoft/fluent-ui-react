import { getElementType } from '@stardust-ui/react-bindings'

describe('getElementType', () => {
  test('takes a value from "as" prop', () => {
    expect(getElementType({ as: 'span' })).toBe('span')
  })

  test('defaults to "div"', () => {
    expect(getElementType({})).toBe('div')
  })
})
