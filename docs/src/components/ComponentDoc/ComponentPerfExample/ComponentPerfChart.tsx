import { Box, Flex, Text } from '@stardust-ui/react'
import { PerfChart, usePerfData } from 'docs/src/components/ComponentDoc/PerfChart'
import * as React from 'react'

export const ComponentPerfChart = ({ perfTestName }) => {
  const { loading, error, data } = usePerfData(perfTestName)

  return (
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
        {loading ? (
          <Text content="Loading..." />
        ) : error ? (
          <Text error content={`Error: ${error.message}`} />
        ) : (
          <PerfChart perfData={data} />
        )}
      </Flex>
    </Box>
  )
}
