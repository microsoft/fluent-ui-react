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
    {/* <Flex column height="300px" center space="around">
    <Button content="Hello" />
    <Button content="Another" />
    <Button content="One" />
  </Flex> */}

    {/*
    <Flex.Row></Flex.Row>
    <Flex.Column><Flex.Column/>
    */}

    {/* Lets implement components from Vadim's example */}
    <Flex height="150px">
      <SquareImage />

      <Flex.Item size="*" style={{ marginLeft: '20px' }}>
        <Flex column>
          <Flex space="between">
            <Flex.Item size="auto">
              <Title content="stardust-ui/react" />
            </Flex.Item>

            <Flex.Item>
              {({ classes, styles }) => <Title content="stardust-ui/react" styles={styles} />}
            </Flex.Item>

            <Flex.Item>
              <Label content="some side note" />
            </Flex.Item>
          </Flex>

          <Title content="Description" size="18px" />

          <Flex.Item size="*">
            <Flex as="span" vAlign="center" hAlign="end">
              A themable React component library.
            </Flex>
          </Flex.Item>

          <Label content="github.com" />
        </Flex>
      </Flex.Item>
    </Flex>
  </>
)

export default FlexExampleShorthand
