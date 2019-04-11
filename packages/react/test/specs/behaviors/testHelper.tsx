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
  'alertBehavior.ts', // tests are written in alertBehavior-test.tsx
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

    const groupedByBehavior = _.groupBy(
      this.filteredSpecificationWithAssignedTestMethod,
      'behaviorName',
    )

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
          variant.specification.split('\n').forEach(specLine => {
            if (specLine) {
              this.iterateRegexDefinitions(specLine, variant.name)
            }
          })
        }
      })
    })
  }

  public iterateRegexDefinitions(specLine: string, behaviorName: string) {
    let regexMatched = false
    this.testDefinitions.forEach(testDefinition => {
      const regex = new RegExp(testDefinition.regexp)
      const result = regex.exec(specLine)
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
      test(`${behaviorName} \n LINE: ${specLine} `, () => {
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

  public convertToMatchingTypeIfApplicable(stringToConvert: any): boolean | number | string {
    if (stringToConvert === 'true') {
      return true
    }
    if (stringToConvert === 'false') {
      return false
    }
    if (typeof stringToConvert === 'string' && !Number.isNaN(Number(stringToConvert))) {
      return Number(stringToConvert)
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
