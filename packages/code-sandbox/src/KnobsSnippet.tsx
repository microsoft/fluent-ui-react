import { CodeSnippet, useKnobValues } from '@stardust-ui/docs-components'
import { createComponent, Flex } from '@stardust-ui/react'
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
  render: ({ children, stardust }) => {
    const knobs = useKnobValues()
    const values = _.fromPairs(knobs.map(knob => [knob.name, knob.value]))

    return (
      <Flex>
        <div className={stardust.classes.root}>{children}</div>
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
