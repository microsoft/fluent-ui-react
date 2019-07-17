import * as React from 'react'
import * as _ from 'lodash'
import { Flex, Loader, Text, Accordion } from '@stardust-ui/react'

const InlineMarkdown = React.lazy(() => import('./InlineMarkdown'))

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

  const accessPanels = [
    {
      key: 'accessibility',
      content: { content: accessibilityDetails, styles: { paddingLeft: '14px' } },
      title: {
        content: <Text content="Accessibility" />,
        as: 'span',
        'aria-level': '2',
        styles: { paddingBottom: '0', paddingTop: '0' },
      },
    },
  ]

  return (
    <Flex column>
      <Flex.Item>
        <>
          <Accordion panels={accessPanels} />
        </>
      </Flex.Item>
    </Flex>
  )
}

export default ComponentDocAccessibility
