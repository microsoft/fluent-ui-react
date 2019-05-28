import felaDisableAnimationsPlugin from 'src/lib/felaDisableAnimationsPlugin'

const disableAnimationsPlugin = felaDisableAnimationsPlugin()

describe('felaDisableAnimationsPlugin', () => {
  test('does not disable animations if the props are not provided', () => {
    const style = {
      animation: 'k1',
      margin: '0px 10px',
    }

    expect(disableAnimationsPlugin(style)).toMatchObject(style)
  })

  test('does not disable animations if the disableAnimations flag is undefined', () => {
    const style = {
      animation: 'k1 1s',
      margin: '0px 10px',
    }

    expect(
      disableAnimationsPlugin(style, undefined, undefined, { disableAnimations: undefined }),
    ).toMatchObject(style)
  })

  test('does not disable animations if the disableAnimations flag is false', () => {
    const style = {
      animationName: 'k1',
      animationDuration: '1s',
      margin: '0px 10px',
    }

    expect(
      disableAnimationsPlugin(style, undefined, undefined, { disableAnimations: false }),
    ).toMatchObject(style)
  })

  test('disables animations if the disableAnimations flag is true', () => {
    const style = {
      animationName: 'k1',
      animationDuration: '1s',
      margin: '0px 10px',
    }

    expect(
      disableAnimationsPlugin(style, undefined, undefined, { disableAnimations: true }),
    ).toMatchObject({ margin: '0px 10px' })
  })

  test('disables animations if the disableAnimations flag is true and the animation css shorthand is used', () => {
    const style = {
      animation: 'k1 1s',
      margin: '0px 10px',
    }

    expect(
      disableAnimationsPlugin(style, undefined, undefined, { disableAnimations: true }),
    ).toMatchObject({ margin: '0px 10px' })
  })
})
