import { mergeFontFaces } from '../../../../src/lib/mergeThemes'

describe('mergeFontFaces', () => {
  test('returns a compact array', () => {
    expect(
      mergeFontFaces(
        undefined,
        null,
        {
          name: 'Segoe UI',
          paths: ['public/fonts/segoe-ui-regular.woff2'],
          style: { fontWeight: 400 },
        },
        {
          name: 'Segoe UI',
          paths: ['public/fonts/segoe-ui-semibold.woff2'],
          style: { fontWeight: 600 },
        },
        {
          name: 'Segoe UI',
          paths: ['public/fonts/segoe-ui-bold.woff2'],
          style: { fontWeight: 700 },
        },
      ),
    ).toEqual([
      {
        name: 'Segoe UI',
        paths: ['public/fonts/segoe-ui-regular.woff2'],
        style: { fontWeight: 400 },
      },
      {
        name: 'Segoe UI',
        paths: ['public/fonts/segoe-ui-semibold.woff2'],
        style: { fontWeight: 600 },
      },
      {
        name: 'Segoe UI',
        paths: ['public/fonts/segoe-ui-bold.woff2'],
        style: { fontWeight: 700 },
      },
    ])
  })
})
