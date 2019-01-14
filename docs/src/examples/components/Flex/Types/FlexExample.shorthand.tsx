import * as React from 'react'
import { Flex, Button, Image, Label } from '@stardust-ui/react'

const Title = props => <Label content={props.content} styles={props.styles} />

Title.__isStardust = true

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

    {/* Lets implement components from Vadim's example */}
    <Flex height="150px">
      <SquareImage />

      <Flex.Item fluid style={{ marginLeft: '20px' }}>
        <Flex column>
          <Flex space="between">
            <Flex.Item basis="40%">
              <Title content="stardust-ui/react" />
            </Flex.Item>

            <Label content="some side note" />
          </Flex>

          <Title content="Description" size="18px" />

          <Flex.Item fluid>
            <span>
              A themable React component library. Contribute to stardust-ui/react development by
              creating an account on GitHub.
            </span>
          </Flex.Item>

          <Label description content="github.com" />
        </Flex>
      </Flex.Item>
    </Flex>
  </>
)

export default FlexExampleShorthand
