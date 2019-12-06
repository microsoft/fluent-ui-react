import { mergeStaticStyles } from '../../../../src/utils/mergeThemes'

describe('mergeStaticStyles', () => {
  test('returns a compact array', () => {
    expect(
      mergeStaticStyles(
        undefined,
        null,
        '',
        { body: { color: 'red' } },
        '*{box-sizing:border-box;}',
      ),
    ).toEqual([{ body: { color: 'red' } }, '*{box-sizing:border-box;}'])
  })
})
