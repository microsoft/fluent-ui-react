import { CodeSnippet, useKnobValues } from '@fluentui/docs-components'
import { createComponent, Flex } from '@fluentui/react'
import * as _ from 'lodash'
import * as React from 'react'

const knobsSnippetStyles = {
  background: 'whitesmoke',
  color: '#777',
  lineHeight: '1.5',
  padding: `5px 10px`,
}

const KnobsSnippet = createComponent({
  displayName: 'KnobsSnippet',
  render: ({ children, config }) => {
    const knobs = useKnobValues()
    const values = _.fromPairs(knobs.map(knob => [knob.name, knob.value]))

    return (
      <Flex>
        <div className={config.classes.root}>{children}</div>
        <Flex.Item grow>
          {({ classes }) => (
            <CodeSnippet
              className={classes}
              copyable={false}
              fitted
              label="Knobs"
              mode="json"
              value={JSON.stringify(values, null, 2)}
            />
          )}
        </Flex.Item>
      </Flex>
    )
  },
})

KnobsSnippet.defaultProps = {
  styles: knobsSnippetStyles,
}

export default KnobsSnippet
