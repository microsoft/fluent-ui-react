import * as _ from 'lodash'
import { Accessibility } from '../../../src/lib/accessibility/types'

interface FilteredDescription {
  behaviorName: string
  testMethod: ([string]) => void
  params: RegExpExecArray
}

export interface TestMethod {
  behavior: Accessibility
  props: [string]
}

export interface TestDefinition {
  regexp: RegExp
  testMethod: (TestMethod) => void
}

export class TestHelper {
  private behaviors: Map<string, Accessibility> = new Map<string, Accessibility>()
  private testDefinitions: TestDefinition[] = []

  private filteredDescriptionWithAssignedTestMethod: FilteredDescription[] = []

  public addBehavior(name: string, behavior: Accessibility) {
    this.behaviors.set(name, behavior)
  }

  public addTest(regexp: RegExp, testMethod: (TestMethod) => void) {
    this.testDefinitions.push({ regexp, testMethod })
  }

  public addTests(testDefinitions: TestDefinition[]) {
    testDefinitions.forEach(testDefinition => {
      this.testDefinitions.push(testDefinition)
    })
  }

  public run(behaviorMenuItems: any) {
    this.findRegexAndAssingCorrespondingInfoToArray(behaviorMenuItems)

    const groupedByBehavior = _(this.filteredDescriptionWithAssignedTestMethod)
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
        variant.text.split('\n').forEach(singleLineText => {
          this.iterateRegexDefinitions(singleLineText, variant.name)
        })
      })
    })
  }

  public iterateRegexDefinitions(singleLineText: string, behaviorName: string) {
    this.testDefinitions.forEach(testDefinition => {
      const regex = new RegExp(testDefinition.regexp)
      const result = regex.exec(singleLineText)
      if (result) {
        this.filteredDescriptionWithAssignedTestMethod.push({
          behaviorName,
          testMethod: testDefinition.testMethod,
          params: result,
        })
      }
    })
  }

  public getBehavior(behaviorName: string): Accessibility {
    const baseBehaviorName = behaviorName.replace('.ts', '')
    const importedBehavior = this.behaviors.get(baseBehaviorName)
    if (!importedBehavior) {
      throw 'Behavior file was not found, probably was not imported. Import file and add behavior.'
    }
    return importedBehavior
  }

  public convertToBooleanIfApplicable(stringToConvert: string) {
    if (stringToConvert === 'true' || stringToConvert === 'false') {
      return Boolean(stringToConvert)
    }
    return stringToConvert
  }
}
