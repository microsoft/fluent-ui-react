import * as React from 'react'
import * as _ from 'lodash'
import { Header } from '@stardust-ui/react'

const behaviorMenu = require('docs/src/behaviorMenu')

const ComponentDocAccessibility = ({ info }) => {
  const description = _.get(_.find(info.docblock.tags, { title: 'accessibility' }), 'description')
  const defaultValue = _.get(_.find(info.props, { name: 'accessibility' }), 'defaultValue')
  const availableBehaviors = getAvailableBehaviors(info)

  const stem = defaultValue && defaultValue.split('.').pop()
  const filename = stem && `${stem}.ts`

  const behaviorName = behaviorMenu.reduce((acc, next) => {
    return _.find(next.variations, { name: filename }) ? next.displayName : acc
  }, null)

  if (!behaviorName && !description) return null

  return (
    <>
      <Header
        as="h2"
        className="no-anchor"
        content="Accessibility"
        variables={{ color: 'black' }}
      />

      {behaviorName && (
        <p>
          Default behavior:{' '}
          <a href={`behaviors/${behaviorName}#${_.kebabCase(stem)}`}>{behaviorName}</a>
        </p>
      )}

      {availableBehaviors && (
        <p>
          Available behaviors:{' '}
          {availableBehaviors.map(behavior => (
            <>
              <a href={`behaviors/${behavior.category}#${_.kebabCase(behavior.name)}`}>
                {behavior.displayName}
              </a>{' '}
            </>
          ))}
        </p>
      )}

      {description && <p style={{ whiteSpace: 'pre-line' }}>{description}</p>}
    </>
  )
}

const getAvailableBehaviors = info => {
  const tags = _.get(_.find(info.props, { name: 'accessibility' }), 'tags') || ''
  const availableBehaviorNames = _.get(_.find(tags, { title: 'available' }), 'description') || ''

  if (!availableBehaviorNames) {
    return undefined
  }

  return availableBehaviorNames
    .replace(/\s/g, '')
    .split(',')
    .map(name => ({
      name,
      displayName: _.upperFirst(name.replace('Behavior', '')),
      category: behaviorMenu.reduce((acc, next) => {
        return _.find(next.variations, { name: `${name}.ts` }) ? next.displayName : acc
      }, null),
    }))
}

export default ComponentDocAccessibility
