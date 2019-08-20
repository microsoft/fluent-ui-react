import * as React from 'react'
import * as _ from 'lodash'
import { Flex, Loader, Text, Provider } from '@stardust-ui/react'

const InlineMarkdown = React.lazy(() => import('./InlineMarkdown'))

const behaviorMenu = require('docs/src/behaviorMenu')

export function containsAccessibility(info) {
  const stem = getStem(info)
  return !!getDescription(info) || !!getBehaviorName(stem)
}

function getDescription(info) {
  return _.get(_.find(info.docblock.tags, { title: 'accessibility' }), 'description')
}

function getStem(info) {
  const defaultValue = _.get(_.find(info.props, { name: 'accessibility' }), 'defaultValue')
  return defaultValue && defaultValue.split('.').pop()
}

function getBehaviorName(stem) {
  const filename = stem && `${stem}.ts`

  return behaviorMenu.reduce((acc, next) => {
    return _.find(next.variations, { name: filename }) ? next.displayName : acc
  }, null)
}

export const ComponentDocAccessibility = ({ info }) => {
  const stem = getStem(info)
  const description = getDescription(info)
  const behaviorName = getBehaviorName(stem)

  if (!behaviorName && !description) return null

  const accessibilityDetails = (
    <>
      {description && (
        <Text style={{ whiteSpace: 'pre-line' }}>
          <React.Suspense fallback={<Loader />}>
            <InlineMarkdown value={description} />
          </React.Suspense>
        </Text>
      )}

      {behaviorName && (
        <>
          <Text>
            Default behavior:{' '}
            <a href={`behaviors/${behaviorName}#${_.kebabCase(stem)}`}>{behaviorName}</a>
          </Text>
          <br />
        </>
      )}

      {info.behaviors && (
        <>
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
          <br />
        </>
      )}
    </>
  )

  return (
    <Flex column>
      <Flex.Item>
        <Provider styles={{ paddingLeft: '14px', background: 'transparent' }}>
          {accessibilityDetails}
        </Provider>
      </Flex.Item>
    </Flex>
  )
}
