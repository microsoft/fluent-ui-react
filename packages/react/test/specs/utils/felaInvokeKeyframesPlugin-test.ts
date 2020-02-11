import felaInvokeKeyframesPlugin from 'src/utils/felaInvokeKeyframesPlugin'

const renderInvokeKeyframes = felaInvokeKeyframesPlugin()

describe('felaRenderKeyframesPlugin', () => {
  test('does not transform the animationName prop if it is already string', () => {
    expect(
      renderInvokeKeyframes({
        animationName: 'k1',
        animationDuration: '2s',
      }),
    ).toMatchObject({
      animationName: 'k1',
      animationDuration: '2s',
    })
  })

  test('does not transform the animationName prop if it is already object', () => {
    expect(
      renderInvokeKeyframes({
        animationName: { from: { rotate: '0deg' }, to: { rotate: '360deg' } },
        animationDuration: '2s',
      }),
    ).toMatchObject({
      animationName: { from: { rotate: '0deg' }, to: { rotate: '360deg' } },
      animationDuration: '2s',
    })
  })

  test('transforms the animationName prop if it contains keyframe in the definition', () => {
    expect(
      renderInvokeKeyframes({
        animationName: {
          keyframe: () => ({ from: { rotate: '0deg' }, to: { rotate: '360deg' } }),
        },
        animationDuration: '2s',
      }),
    ).toMatchObject({
      animationName: expect.objectContaining({
        from: expect.any(Object),
        to: expect.any(Object),
      }),
      animationDuration: '2s',
    })
  })

  test('transforms the animationName prop with params', () => {
    expect(
      renderInvokeKeyframes({
        animationName: {
          keyframe: ({ from }) => ({ from: { rotate: from }, to: { rotate: '360deg' } }),
          params: { from: '100deg' },
        },
        animationDuration: '2s',
      }),
    ).toMatchObject({
      animationName: expect.objectContaining({
        from: { rotate: '100deg' },
        to: expect.any(Object),
      }),
      animationDuration: '2s',
    })
  })

  test('does not transform a list of strings', () => {
    expect(
      renderInvokeKeyframes({
        display: ['inline-grid', '-ms-inline-grid'] as any,
      }),
    ).toMatchObject({
      display: ['inline-grid', '-ms-inline-grid'] as any,
    })
  })
})
