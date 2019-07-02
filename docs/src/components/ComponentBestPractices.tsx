import * as React from 'react'
import _ from 'lodash'
import { Box, Flex, Header, Icon, List, Segment, ShorthandValue } from '@stardust-ui/react'
import { Extendable } from 'src/types'

export type ComponentBestPracticesProps = Extendable<{
  doList?: ShorthandValue<{}>[]
  dontList?: ShorthandValue<{}>[]
}>

const ComponentBestPractices: React.FC<ComponentBestPracticesProps> = ({ doList, dontList }) => {
  const updatedDoList: ShorthandValue<{}>[] = []
  const updatedDontList: ShorthandValue<{}>[] = []

  if (_.size(doList) > 0) {
    _.map(doList, element => {
      updatedDoList.push({
        key: doList.indexOf(element),
        content: element,
        media: <Icon name="checkmark" styles={{ color: 'green' }} />,
      })
    })
  }

  if (_.size(dontList) > 0) {
    _.map(dontList, element => {
      updatedDontList.push({
        key: dontList.indexOf(element),
        content: element,
        media: <Icon name="close" styles={{ color: 'red' }} />,
      })
      // element.media = <Icon name="close" styles={{ color: 'red' }} />
    })
  }
  return (
    <>
      <Segment>
        {_.size(doList) > 0 && _.size(dontList) > 0 ? (
          <Flex>
            <Flex.Item size="size.half">
              <Box>
                <Header as="h3" content="Do" styles={{ paddingLeft: '20px' }} />
                <List items={updatedDoList} />
              </Box>
            </Flex.Item>
            <Flex.Item size="size.half">
              <Box>
                <Header as="h3" content="Don't" styles={{ paddingLeft: '20px' }} />
                <List items={updatedDontList} />
              </Box>
            </Flex.Item>
          </Flex>
        ) : _.size(doList) > 0 ? (
          <Flex>
            <Flex.Item grow>
              <Box>
                <Header as="h3" content="Do" styles={{ paddingLeft: '20px' }} />
                <List items={updatedDoList} />
              </Box>
            </Flex.Item>
          </Flex>
        ) : _.size(dontList) > 0 ? (
          <Flex>
            <Flex.Item grow>
              <Box>
                <Header as="h3" content="Don't" styles={{ paddingLeft: '20px' }} />
                <List items={updatedDontList} />
              </Box>
            </Flex.Item>
          </Flex>
        ) : (
          <></>
        )}
      </Segment>
    </>
  )
}

export default ComponentBestPractices
