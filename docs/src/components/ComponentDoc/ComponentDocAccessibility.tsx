import * as React from 'react'
import * as _ from 'lodash'
import { Header, Flex, Text } from '@stardust-ui/react'

const behaviorMenu = require('docs/src/behaviorMenu')

const ComponentDocAccessibility = ({ info }) => {
  const description = _.get(_.find(info.docblock.tags, { title: 'accessibility' }), 'description')
  const defaultValue = _.get(_.find(info.props, { name: 'accessibility' }), 'defaultValue')

  const stem = defaultValue && defaultValue.split('.').pop()
  const filename = stem && `${stem}.ts`

  const behaviorName = behaviorMenu.reduce((acc, next) => {
    return _.find(next.variations, { name: filename }) ? next.displayName : acc
  }, null)

  if (!behaviorName && !description) return null

  return (
    <Flex column>
      <Flex.Item>
        <>
          <Header
            as="h2"
            className="no-anchor"
            content="Accessibility"
            variables={{ color: 'black' }}
          />

          {description && <Text style={{ whiteSpace: 'pre-line' }}>{description}</Text>}

          {behaviorName && (
            <Text>
              Default behavior:{' '}
              <a href={`behaviors/${behaviorName}#${_.kebabCase(stem)}`}>{behaviorName}</a>
            </Text>
          )}

          {info.behaviors && (
            <Text>
              Available behaviors:{' '}
              {info.behaviors.map(behavior => (
                <React.Fragment key={`${behavior.category}-${behavior.name}`}>
                  <a href={`behaviors/${behavior.category}#${_.kebabCase(behavior.name)}`}>
                    {behavior.displayName}
                  </a>{' '}
                </React.Fragment>
              ))}
            </Text>
          )}
        </>
      </Flex.Item>
    </Flex>
  )
}

export default ComponentDocAccessibility
