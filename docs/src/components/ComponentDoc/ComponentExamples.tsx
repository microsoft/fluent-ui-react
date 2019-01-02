import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { exampleIndexContext, exampleSourcesContext } from 'docs/src/utils'
import { Grid, List } from 'semantic-ui-react'
import { componentAPIs } from './ComponentSourceManager'
import ContributionPrompt from './ContributionPrompt'

interface ComponentExamplesProps {
  displayName: string
}

export default class ComponentExamples extends React.Component<ComponentExamplesProps, any> {
  public static propTypes = {
    displayName: PropTypes.string.isRequired,
  }

  public render() {
    return this.renderExamples() || this.renderMissingExamples()
  }

  /**
   * RULES for a component with displayName=MyComponent:
   * 1. create a file at ./docs/src/components/MyComponent/index.tsx referencing all MyComponent examples
   * 2. all example file names must contain the word 'Example'; e.g.: MyComponentExampleCircular.tsx
   * 3. all example files must be under ./docs/src/components/MyComponent path; e.g.: ./docs/src/components/MyComponent/SomeType/SomeExample.tsx
   * 2. for every ./docs/src/components/{...}/{...}MyComponent{...}Example{...}.tsx there needs to be a shorthand version of it:
   *              ./docs/src/components/{...}/{...}MyComponent{...}Example{...}.shorthand.tsx
   */
  private renderExamples = (): JSX.Element | null => {
    const { displayName } = this.props

    // rule #1
    const indexPath = _.find(exampleIndexContext.keys(), path =>
      new RegExp(`\/${displayName}\/index\.tsx$`).test(path),
    )
    if (!indexPath) {
      return null
    }

    const ExamplesElement = React.createElement(exampleIndexContext(indexPath).default) as any
    if (!ExamplesElement) {
      return null
    }

    // rules #2 and #3
    const missingPaths = this.getMissingExamplePaths(displayName, exampleSourcesContext.keys())
    return missingPaths && missingPaths.length ? (
      <div>
        {this.renderMissingShorthandExamples(missingPaths)} {ExamplesElement}
      </div>
    ) : (
      ExamplesElement
    )
  }

  private renderMissingExamples = () => {
    const { displayName } = this.props

    return this.renderElementWrappedInGrid(
      <ContributionPrompt>
        Looks like we're missing <code title={displayName}>{`<${displayName} />`}</code> examples.
      </ContributionPrompt>,
    )
  }

  private renderMissingShorthandExamples = (missingPaths: string[]) => {
    return this.renderElementWrappedInGrid(
      <ContributionPrompt>
        <div>Looks like we're missing examples at following paths:</div>
        <List items={missingPaths} />
      </ContributionPrompt>,
    )
  }

  private renderElementWrappedInGrid = (Element: JSX.Element) => (
    <Grid>
      <Grid.Column>{Element}</Grid.Column>
    </Grid>
  )

  private getMissingExamplePaths(displayName: string, allPaths: string[]): string[] {
    const examplesPattern = `\./${displayName}/[\\w/]+Example`
    const [normalExtension, shorthandExtension] = [
      componentAPIs.children.fileSuffix,
      componentAPIs.shorthand.fileSuffix,
    ].map(pattern => `${pattern}.source.json`)

    const [normalRegExp, shorthandRegExp] = [normalExtension, shorthandExtension].map(
      extension => new RegExp(`${examplesPattern}${extension}$`),
    )

    const expectedShorthandExamples = allPaths
      .filter(path => normalRegExp.test(path))
      .map(path => path.replace(normalExtension, shorthandExtension))
    const actualShorthandExamples = allPaths.filter(path => shorthandRegExp.test(path))

    return _.difference(expectedShorthandExamples, actualShorthandExamples).map(exampleFile =>
      exampleFile.replace(/\.source\.json$/, '.tsx'),
    )
  }
}
