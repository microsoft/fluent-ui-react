import * as React from 'react'
import { SandboxApp } from '@fluentui/code-sandbox'
import { Button, Flex, Input, Menu, Toolbar, Provider, themes } from '@fluentui/react'

const PopupBoard = () => {
  const [textValue, updateText] = React.useState('')
  React.useLayoutEffect(() => {
    // const canvas = document.getElementById("123canvas");
    // const ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#FFa4a2";
    // ctx.fillRect(0, 0, 300, 150);
    // ctx.font = "30px TImes New Roman";
    // ctx.fillStyle = "black";
    // ctx.textAlign = "center";
    // ctx.fillText(textValue, canvas.width / 2, canvas.height / 2);
    // console.log(textValue);
  })
  return (
    <Flex
      vAlign="center"
      space="between"
      gap="gap.small"
      design={{ height: '200px', width: '400px' }}
    >
      <Menu
        fluid
        vertical
        pointing
        defaultActiveIndex={0}
        styles={{
          borderRightWidth: '0.5px',
          borderRightStyle: 'solid',
          borderRightColor: '#F6F2F2',
          padding: '0px',
          margin: '0px',
        }}
        items={[
          { content: 'Apples', key: 'a' },
          { content: 'Oranges', key: 'o' },
        ]}
      />
      <Flex column padding="padding.medium" gap="gap.medium">
        {/* <Flex.Item> */}
        {/* <canvas id="123canvas" style={{ width: "100%" }} /> */}
        {/* </Flex.Item> */}
        <Flex>
          <Input
            value={textValue}
            onChange={e => updateText(e.target.value)}
            fluid
            input={{
              as: 'textarea',
              rows: '4',
              styles: { resize: 'none', width: '100%' },
            }}
          />
        </Flex>
        <Flex.Item>
          <Flex gap="gap.small">
            <Flex.Item>
              <Button content="Done" primary />
            </Flex.Item>
            <Flex.Item>
              <Button content="Cancel" />
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </Flex>
  )
}

const BodyWrap = () => {
  return (
    <SandboxApp>
      <Provider theme={themes.teams} styles={{ padding: '2rem' }} rtl>
        <Flex
          vAlign="end"
          style={{
            backgroundColor: '#B8887D',
            height: '50%',
            width: '80%',

            // height: '400px',
            // width: '400px',

            position: 'fixed',
          }}
        >
          <Flex
            style={{
              height: '20px',
              backgroundColor: '#F5E8E5',
              width: '100%',
            }}
          >
            <Toolbar
              items={[
                {
                  key: 'read',
                  style: { width: '100px', border: '1px solid red' },
                  icon: 'read-aloud',
                  popup: { content: <PopupBoard /> },
                },
              ]}
            />
          </Flex>
        </Flex>
      </Provider>
    </SandboxApp>
  )
}

const PopupExampleInline = () => (
  <>
    {/* <Popup trigger={<Button icon="more" />} content={<PopupBoard />} /> */}
    <BodyWrap />
  </>
)

export default PopupExampleInline
