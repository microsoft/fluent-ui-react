import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { constants, Header, Segment, Text } from '@fluentui/react'
import { CodeSnippet } from '@fluentui/docs-components'

import { exampleIndexContext, getMissingExamples } from 'docs/src/utils'

const pkg = require('@fluentui/react/package.json')

interface ComponentExamplesProps {
  displayName: string
}

function getExamplesElement(displayName: string) {
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

  return ExamplesElement
}

/**
 Avoid the boiler plate.
 If we can show what the file should look like, just generate it and notify the dev.

 prepush - confirm missing examples, plop to file if requested.
 */

export class ComponentExamples extends React.Component<ComponentExamplesProps, any> {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
  }

  render() {
    const { displayName } = this.props
    const ExamplesElement = getExamplesElement(displayName)

    const ignoreMissingPropPatterns = [
      /animation/,
      /accessibility/,
      /as/,
      /className/,
      /design/,
      /styles/,
      /variables/,
      /default[A-Z]/,
    ]
    const missingExamples = getMissingExamples(displayName).filter(({ prop }) => {
      return !ignoreMissingPropPatterns.some(re => re.test(prop.name))
    })

    return (
      <>
        {missingExamples && missingExamples.length > 0 && (
          <div style={{ padding: '1em', margin: '2em 0', border: '2px solid #A22' }}>
            <Header
              className="no-anchor"
              style={{ margin: '0' }}
              align="center"
              content="⚠ Missing Examples ⚠"
            />
            <Text align="center">
              There should be an example for each component prop.
              <br />
              See{' '}
              <a
                href={`${constants.repoURL}/blob/master/.github/document-a-feature.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                .github/document-a-feature.md
              </a>{' '}
              for more.
            </Text>
            {_.map(missingExamples, ({ prop }) => {
              const exampleName = [_.startCase(displayName), _.startCase(prop.name), 'Example']
                .join('')
                .replace(/ /g, '')

              const docsFilePath = `/docs/src/examples/components/${displayName}/<category>/${exampleName}.tsx`

              return (
                <div key={prop.name} style={{ margin: '2em 0' }}>
                  <Segment>
                    <Header
                      as="h4"
                      className="no-anchor"
                      styles={{ display: 'inline-block', color: 'inherit', margin: 0 }}
                    >
                      {prop.name}
                    </Header>
                    <Text style={{ float: 'right' }}>
                      <code>{docsFilePath}</code>
                    </Text>

                    <Text style={{ display: 'block' }}>{prop.description}</Text>
                  </Segment>

                  <CodeSnippet
                    fitted
                    label={null}
                    mode="jsx"
                    value={`
                      import { ${displayName} } from '${pkg.name}'

                      const ${exampleName} = () => <${displayName} ${prop.name}={} />

                      export default ${exampleName}
                    `}
                  />
                </div>
              )
            })}
          </div>
        )}
        {ExamplesElement || (
          <Segment inverted color="red">
            Looks like we're missing <code title={displayName}>{`<${displayName} />`}</code>{' '}
            examples.
          </Segment>
        )}
      </>
    )
  }
}
