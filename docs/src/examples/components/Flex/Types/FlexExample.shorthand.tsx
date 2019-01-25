import * as React from 'react'
import { Flex, Image, Label } from '@stardust-ui/react'

const Title = props => {
  return (
    <Label style={{ border: '1px dashed grey' }} content={props.content} styles={props.styles} />
  )
}

const SquareImage = () => (
  <Image styles={{ width: '8rem', height: '8rem' }} src="//unsplash.it/100" />
)

const FlexExampleShorthand = () => (
  <>
    <Flex.Row>
      <SquareImage />

      <Flex.Item stretch style={{ marginLeft: '20px' }}>
        <Flex.Column>
          <Flex.Row space="between">
            <Flex.Item size="auto">
              <Title content="stardust-ui/react" />
            </Flex.Item>

            <Flex.Item>
              <Label content="some side note" />
            </Flex.Item>
          </Flex.Row>

          <Title content="Description" size="18px" />

          <Flex.Item stretch>
            <Flex.Row as="span" vAlign="center" hAlign="end">
              A themable React component library.
            </Flex.Row>
          </Flex.Item>

          <Label content="github.com" />
        </Flex.Column>
      </Flex.Item>
    </Flex.Row>
  </>
)

export default FlexExampleShorthand
