import * as _ from 'lodash'
import { Accessibility } from '../../../src/lib/accessibility/types'

interface FilteredSpecification {
  behaviorName: string
  testMethod: (arg: TestMethod) => void
  params: RegExpExecArray
}

export interface TestMethod {
  behavior: Accessibility
  props: string[]
}

export interface TestDefinition {
  regexp: RegExp
  testMethod: (arg: TestMethod) => void
}

const skipSpecChecksForFiles = [
  'chatBehavior.ts', // issue https://github.com/stardust-ui/react/issues/476
  'chatMessageBehavior.ts', // issue https://github.com/stardust-ui/react/issues/476
  'listBehavior.ts', // tests are written in listBehavior-test.tsx
  'listItemBehavior.ts', // tests are written in listItemBehavior-test.tsx
]

export class TestHelper {
  private behaviors: Map<string, Accessibility> = new Map<string, Accessibility>()
  private testDefinitions: TestDefinition[] = []

  private filteredSpecificationWithAssignedTestMethod: FilteredSpecification[] = []

  public addBehavior(name: string, behavior: Accessibility) {
    this.behaviors.set(name, behavior)
  }

  public addTest(regexp: RegExp, testMethod: (arg: TestMethod) => void) {
    this.testDefinitions.push({ regexp, testMethod })
  }

  public addTests(testDefinitions: TestDefinition[]) {
    testDefinitions.forEach(testDefinition => {
      this.testDefinitions.push(testDefinition)
    })
  }

  public run(behaviorMenuItems: any) {
    this.findRegexAndAssingCorrespondingInfoToArray(behaviorMenuItems)

    const groupedByBehavior = _(this.filteredSpecificationWithAssignedTestMethod)
      .groupBy('behaviorName')
      .value()
    _.each(groupedByBehavior, (value, key) => {
      describe(key, () => {
        value.forEach(singleTest => {
          test(singleTest.params[0], () => {
            singleTest.testMethod({
              behavior: this.getBehavior(singleTest.behaviorName),
              props: singleTest.params.slice(1),
            })
          })
        })
      })
    })
  }

  public findRegexAndAssingCorrespondingInfoToArray(behaviorMenuItems: any) {
    behaviorMenuItems.forEach(behavior => {
      behavior.variations.forEach(variant => {
        if (!variant.specification && !variant.description) {
          this.failDescriptionPresenceTest(variant.name)
        }
        if (!variant.specification && !skipSpecChecksForFiles.find(item => item === variant.name)) {
          this.failSpecificationPresenceTest(variant.name)
        } else {
          variant.specification.split('\n').forEach(singleSpecLine => {
            if (singleSpecLine) {
              this.iterateRegexDefinitions(singleSpecLine, variant.name)
            }
          })
        }
      })
    })
  }

  public iterateRegexDefinitions(singleSpecLine: string, behaviorName: string) {
    let regexMatched = false
    this.testDefinitions.forEach(testDefinition => {
      const regex = new RegExp(testDefinition.regexp)
      const result = regex.exec(singleSpecLine)
      if (result) {
        regexMatched = true
        this.filteredSpecificationWithAssignedTestMethod.push({
          behaviorName,
          testMethod: testDefinition.testMethod,
          params: result,
        })
      }
    })
    if (!regexMatched) {
      test(`${behaviorName} \n LINE: ${singleSpecLine} `, () => {
        fail(
          `Line mentioned in **behavior specification** doesn't match any regex expression of validation tests.`,
        )
      })
    }
  }

  public getBehavior(behaviorName: string): Accessibility {
    const baseBehaviorName = behaviorName.replace('.ts', '')
    const importedBehavior = this.behaviors.get(baseBehaviorName)
    if (!importedBehavior) {
      throw 'Accessibility behavior file was not found, probably was not imported. Import file and add behavior.'
    }
    return importedBehavior
  }

  public convertToBooleanIfApplicable(stringToConvert: string) {
    if (stringToConvert === 'true' || stringToConvert === 'false') {
      return Boolean(stringToConvert)
    }
    return stringToConvert
  }

  private failSpecificationPresenceTest(behaviorFileName: string) {
    test(`${behaviorFileName} : Accessibility behavior is missing specification tag.`, () => {
      fail(
        `Accessibility behavior should have specification tag. If tests are written in separate file then add behavior file name into 'skipSpecChecksForFiles'.`,
      )
    })
  }

  private failDescriptionPresenceTest(behaviorFileName: string) {
    test(`${behaviorFileName} : Accessibility behavior is missing description.`, () => {
      fail('Accessibility behavior should have description.')
    })
  }
}
