import { Hello } from './hello'

describe('Hello', () => {
  it('says hi', () => {
    expect(new Hello().world()).toEqual('hi')
  })
})
