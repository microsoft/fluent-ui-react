import * as React from 'react'
import * as _ from 'lodash'

import ComponentExampleTitle from 'docs/src/components/ComponentDoc/ComponentExample/ComponentExampleTitle'
import { Accordion, Box, Flex, Segment, Text } from '@stardust-ui/react'
import ComponentExample from '../ComponentExample'
import { PerfData, PerfChart } from '../PerfChart'

const ComponentPerfChart = ({ perfTestName }) => (
  <Box
    styles={{
      '::before': {
        paddingTop: '50%',
        content: '""',
        display: 'block',
      },
      position: 'relative',
    }}
  >
    <Flex
      hAlign="center"
      vAlign="center"
      styles={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <PerfData
        filter={perfTestName}
        render={({ loading, error, data }) => {
          if (loading) {
            return <Text content="Loading..." />
          }

          if (error) {
            return <Text error content={`Error: ${error.message}`} />
          }

          return <PerfChart perfData={data} />
        }}
      />
    </Flex>
  </Box>
)

const ComponentPerfExample = props => {
  // FIXME: find a better way
  // "components/Divider/Performance/Divider.perf" -> dividerPerfTsx
  const perfTestName = `${_.camelCase(_.last(props.examplePath.split('/')))}Tsx`

  return (
    <>
      <Segment variables={{ padding: 0 }}>
        <Segment variables={{ boxShadowColor: undefined }}>
          <ComponentExampleTitle title={props.title} description={props.description} />
          <ComponentPerfChart perfTestName={perfTestName} />
        </Segment>
        <Accordion
          panels={
            [
              {
                key: '0',
                title: {
                  key: 't',
                  content: 'Show example',
                  styles: ({ theme }) => {
                    return {
                      fontSize: theme.siteVariables.fontSizes.smaller,
                    }
                  },
                },
                content: {
                  key: 'c',
                  content: <ComponentExample {..._.omit(props, 'title', 'description')} />, // FIXME: defer rendering until opened
                },
              },
            ] as any[]
          }
        />
      </Segment>
    </>
  )
}

export default ComponentPerfExample
