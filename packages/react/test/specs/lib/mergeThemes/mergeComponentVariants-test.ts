import {
  mergeComponentVariants,
  mergeComponentStyles,
  mergeComponentVariables,
} from '../../../../src/lib/mergeThemes'
import {
  ComponentVariant,
  ThemeComponentVariants,
  ComponentVariablesInput,
  ComponentSlotStylesInput,
  ComponentVariablesPrepared,
  ComponentSlotStylesPrepared,
} from 'src/themes/types'

describe('mergeComponentVariants', () => {
  test(`always returns an object`, () => {
    expect(mergeComponentVariants({}, {})).toMatchObject({})
    expect(mergeComponentVariants(null, null)).toMatchObject({})
    expect(mergeComponentVariants(undefined, undefined)).toMatchObject({})

    expect(mergeComponentVariants(null, undefined)).toMatchObject({})
    expect(mergeComponentVariants(undefined, null)).toMatchObject({})

    expect(mergeComponentVariants({}, undefined)).toMatchObject({})
    expect(mergeComponentVariants(undefined, {})).toMatchObject({})

    expect(mergeComponentVariants({}, null)).toMatchObject({})
    expect(mergeComponentVariants(null, {})).toMatchObject({})
  })

  test('gracefully handles null and undefined', () => {
    const variants: ThemeComponentVariants = {}

    expect(() => mergeComponentVariants(variants, null)).not.toThrow()
    expect(() => mergeComponentVariants(null, variants)).not.toThrow()

    expect(() => mergeComponentVariants(variants, undefined)).not.toThrow()
    expect(() => mergeComponentVariants(undefined, variants)).not.toThrow()
  })

  test('definitions for absent components are merged', () => {
    const originalVariants: ThemeComponentVariants = {
      Input: {},
    }
    const variantsToMerge: ThemeComponentVariants = {
      Dropdown: {},
    }

    const mergedVariants = mergeComponentVariants(originalVariants, variantsToMerge)

    expect(mergedVariants.Input).toBe(originalVariants.Input)
    expect(mergedVariants.Dropdown).toBe(variantsToMerge.Dropdown)
  })

  test('definitions for absent variants of the same component are merged', () => {
    const originalInputVariant = { Minimal: {} as ComponentVariant }
    const inputVariantToMerge = { Another: {} as ComponentVariant }

    const mergedVariants = mergeComponentVariants(
      {
        Input: originalInputVariant,
      },
      {
        Input: inputVariantToMerge,
      },
    )

    expect(mergedVariants.Input.Minimal).toBe(originalInputVariant.Minimal)
    expect(mergedVariants.Input.Another).toBe(inputVariantToMerge.Another)
  })

  test('styles of variant definitions are properly merged', () => {
    const originalStyles: ComponentSlotStylesInput = {
      root: () => ({ border: '1px solid black' }),
    }
    const stylesToMerge: ComponentSlotStylesInput = {
      root: { borderWidth: '2px', background: 'transparent' },
    }

    const originalVariants: ThemeComponentVariants = {
      Input: {
        Minimal: { styles: originalStyles },
      },
    }

    const variantsToMerge: ThemeComponentVariants = {
      Input: {
        Minimal: { styles: stylesToMerge },
      },
    }

    const mergedVariants = mergeComponentVariants(originalVariants, variantsToMerge)

    expect(
      (mergedVariants.Input.Minimal.styles as ComponentSlotStylesPrepared).root(),
    ).toMatchObject(mergeComponentStyles(originalStyles, stylesToMerge).root())
  })

  test('variants of variant definitions are properly merged', () => {
    const originalVariables: ComponentVariablesInput = {
      borderWidth: '2px',
    }
    const variablesToMerge: ComponentVariablesInput = () => ({ borderColor: 'grey' })

    const originalVariants: ThemeComponentVariants = {
      Input: {
        Minimal: { variables: originalVariables },
      },
    }
    const variantsToMerge: ThemeComponentVariants = {
      Input: {
        Minimal: { variables: variablesToMerge },
      },
    }

    const mergedVariants = mergeComponentVariants(originalVariants, variantsToMerge)

    expect((mergedVariants.Input.Minimal.variables as ComponentVariablesPrepared)()).toMatchObject(
      mergeComponentVariables(originalVariables, variablesToMerge)(),
    )
  })
})
