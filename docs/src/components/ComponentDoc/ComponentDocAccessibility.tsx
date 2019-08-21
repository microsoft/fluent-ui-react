import * as React from 'react'
import * as _ from 'lodash'
import { Flex, Loader, Text, Provider, Segment, Divider, Header } from '@stardust-ui/react'
import ComponentExampleTitle from './ComponentExample/ComponentExampleTitle'
import BehaviorDescription from './BehaviorDescription'
import { link } from './../../utils/helpers'

const InlineMarkdown = React.lazy(() => import('./InlineMarkdown'))

const behaviorMenu = require('docs/src/behaviorMenu')

const knownIsusesId = 'known-issues'
const exampleStyle: React.CSSProperties = {
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
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
  const filename = stem && `${stem}.ts`.replace(stem[0], stem.charAt(0).toLowerCase())
  for (let i = 0; i < behaviorMenu.length; i++) {
    const behaviour = behaviorMenu[i].variations.find(
      behaviorVariation => behaviorVariation.name === filename,
    )
    if (behaviour) {
      return behaviorMenu[i].displayName
    }
  }
}

function getId(idName: string) {
  return _.kebabCase(idName)
}

function getAvailableBehaviorsFromJson(availableBehaviors: any): any[] {
  const availableBehaviorsFromJson = []
  availableBehaviors.map(availableBehavior => {
    behaviorMenu.map(behaviorInJson => {
      const result = behaviorInJson.variations.find(
        variation => variation.name === `${availableBehavior.name}.ts`,
      )
      if (result) {
        availableBehaviorsFromJson.push(result)
      }
      return
    })
    return
  })
  return availableBehaviorsFromJson
}

function getAccIssues(info) {
  return _.get(_.find(info.docblock.tags, { title: 'accessibilityIssues' }), 'description')
}

const baseName = (fileName: string) => {
  const divided = _.startCase(fileName.replace(/Behavior\.ts$/, ''))
  return _.upperFirst(_.lowerCase(divided))
}

const behaviorCard = (variation: any, keyValue: string) => {
  return (
    <React.Fragment key={keyValue}>
      <Segment className="docs-example" id={getId(variation.name)} styles={exampleStyle}>
        <ComponentExampleTitle
          title={baseName(variation.name)}
          description={`Name: ${variation.name.replace('.ts', '')}`}
        />

        <Divider />

        <div style={{ paddingTop: '1em' }}>
          {variation.description && (
            <>
              <strong>Description:</strong>
              <br />
              <BehaviorDescription value={variation.description} />
            </>
          )}
          {variation.specification && (
            <>
              {variation.description && <br />}
              <strong>Specification:</strong>
              <br />
              <BehaviorDescription value={variation.specification} />
            </>
          )}
        </div>
      </Segment>
      <br />
    </React.Fragment>
  )
}

export const ComponentDocAccessibility = ({ info }) => {
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
                getAvailableBehaviorsFromJson(info.behaviors).map(behavior => {
                  return (
                    <li>
                      {link(`${behavior.name.replace('.ts', '')}`, `#${getId(behavior.name)}`)}
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
            .variations.map((variation, keyValue) => behaviorCard(variation, keyValue))}
        </>
      )}

      {info.behaviors && (
        <>
          <Text>
            <Header content="Available behaviors" id="available-behaviors" as="h2" />
            {getAvailableBehaviorsFromJson(info.behaviors).map(behavior => {
              return behaviorCard(behavior, `${behavior.name.replace('.ts', '')}`)
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
