import * as React from 'react'
import * as _ from 'lodash'
import { Flex, Loader, Text, Provider, Segment, Header } from '@stardust-ui/react'
import { link } from './../../utils/helpers'
import { BehaviorInfo, ComponentInfo, BehaviorVariantionInfo } from 'docs/src/types'
import { BehaviorCard, exampleStyle } from './BehaviorCard'

const InlineMarkdown = React.lazy(() => import('./InlineMarkdown'))

const behaviorMenu = require('docs/src/behaviorMenu')

const knownIsusesId = 'known-issues'

type ComponentDocAccessibility = {
  info: ComponentInfo
}

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
  if (!stem) {
    return undefined
  }
  const filename = stem && `${_.camelCase(stem)}.ts`
  for (const category of behaviorMenu) {
    const behavior = category.variations.find(variation => variation.name === filename)
    if (behavior) {
      return category.displayName
    }
  }
}

function getAvailableVariantsFromJson(
  availableBehaviors: BehaviorInfo[],
): BehaviorVariantionInfo[] {
  const availableBehaviorsFromJson = []
  availableBehaviors.forEach(availableBehavior => {
    const fileName = `${availableBehavior.name}.ts`
    behaviorMenu.forEach(category => {
      const result = category.variations.find(variation => variation.name === fileName)
      if (result) {
        availableBehaviorsFromJson.push(result)
      }
    })
  })
  return availableBehaviorsFromJson
}

function getAccIssues(info) {
  return _.get(_.find(info.docblock.tags, { title: 'accessibilityIssues' }), 'description')
}

export const ComponentDocAccessibility: React.FC<ComponentDocAccessibility> = ({ info }) => {
  const stem = getStem(info)
  const description = getDescription(info)
  const behaviorName = getBehaviorName(stem)
  const accIssues = getAccIssues(info)

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

      {((behaviorName && info.behaviors) ||
        (behaviorName && accIssues) ||
        (info.behaviors && accIssues)) && (
        <ul>
          <li>
            Behaviors
            <ul>
              {behaviorName && <li>{link(`Default: ${behaviorName}`, '#default-behavior')} </li>}
              {info.behaviors &&
                getAvailableVariantsFromJson(info.behaviors).map(variant => {
                  return (
                    <li>
                      {link(`${variant.name.replace('.ts', '')}`, `#${_.kebabCase(variant.name)}`)}
                    </li>
                  )
                })}
            </ul>
          </li>
          {accIssues && <li>{link('Known issues', `#${knownIsusesId}`)} </li>}
        </ul>
      )}

      {behaviorName && (
        <>
          <Header content="Default behavior" id="default-behavior" as="h2" />
          {behaviorMenu
            .find(behavior => behavior.displayName === behaviorName)
            .variations.map(variation => (
              <BehaviorCard variation={variation} />
            ))}
        </>
      )}

      {info.behaviors && (
        <>
          <Text>
            <Header content="Available behaviors" id="available-behaviors" as="h2" />
            {getAvailableVariantsFromJson(info.behaviors).map(variation => {
              return <BehaviorCard variation={variation} />
            })}
          </Text>
        </>
      )}

      {accIssues && (
        <>
          <Header content="Known issues" id={knownIsusesId} as="h2" />
          <Segment className="docs-example" styles={exampleStyle}>
            <Text style={{ whiteSpace: 'pre-line' }}>
              <React.Suspense fallback={<Loader />}>
                <InlineMarkdown value={accIssues} />
              </React.Suspense>
            </Text>
          </Segment>
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
