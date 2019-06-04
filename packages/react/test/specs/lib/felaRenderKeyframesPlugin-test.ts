import felaRenderKeyframesPlugin from 'src/lib/felaRenderKeyframesPlugin'
import { felaRenderer } from 'src/lib'

const renderKeyframesPlugin = felaRenderKeyframesPlugin()

describe('felaRenderKeyframesPlugin', () => {
  test('does not transform the animationName prop if it is already string', () => {
    const style = {
      animationName: 'k1',
      animationDuration: '2s',
    }

    expect(renderKeyframesPlugin(style, 'RULE', felaRenderer)).toMatchObject(style)
  })

  test('transforms the animationName prop if it contains keyframe in the definition', () => {
    const style = {
      animationName: {
        keyframe: () => ({ from: { rotate: '0deg' }, to: { rotate: '360deg' } }),
      },
      animationDuration: '2s',
    }

    expect(renderKeyframesPlugin(style, 'RULE', felaRenderer)).toMatchObject({
      animationName: expect.any(String),
      animationDuration: '2s',
    })
  })

  test('transforms the animationName prop if it contains keyframe in the definition', () => {
    const style = {
      animationName: {
        keyframe: () => ({ from: { rotate: '0deg' }, to: { rotate: '360deg' } }),
        params: {},
      },
      animationDuration: '2s',
    }

    expect(renderKeyframesPlugin(style, 'RULE', felaRenderer)).toMatchObject({
      animationName: expect.any(String),
      animationDuration: '2s',
    })
  })

  test('calls the renderer with the keyframe and params object', () => {
    const params = { from: '0deg', to: '360deg' }
    const style = {
      animationName: {
        keyframe: () => ({ from: { rotate: '0deg' }, to: { rotate: '360deg' } }),
        params,
      },
      animationDuration: '2s',
    }

    const renderer = { renderKeyframe: jest.fn() }
    renderKeyframesPlugin(style, 'RULE', renderer)
    expect(renderer.renderKeyframe).toHaveBeenCalledWith(expect.any(Function), params)
  })
})
