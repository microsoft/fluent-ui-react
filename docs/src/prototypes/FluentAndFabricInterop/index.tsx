import * as React from 'react'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react'
import { Flex, Text, Header, Button, Grid } from '@fluentui/react'
import ComponentDocThemeSwitcher from '../../components/ComponentDoc/ComponentDocThemeSwitcher'

const generateRow = (text, fabricControl, teamsControl) => {
  return (
    <>
      <Text content="Default button" />
      <div>{fabricControl}</div>
      <div>{teamsControl}</div>
    </>
  )
}

const FluentAndFabricInterop: React.FunctionComponent = () => (
  <Flex column padding="padding.medium" gap="gap.medium">
    <Flex.Item>
      <Text content="Choose Teams to Fabric or Fabric to Teams to explore components interop" />
    </Flex.Item>
    <Flex.Item>
      <ComponentDocThemeSwitcher />
    </Flex.Item>
    <Grid columns="3" variables={{ gridGap: '10px' }}>
      <Header content="Variant" />
      <Header content="Fabric" />
      <Header content="Teams" />
      {generateRow(
        'Default Button',
        <DefaultButton text="default" />,
        <Button content="default" />,
      )}
      {generateRow(
        'Primary Button',
        <PrimaryButton text="primary" />,
        <Button content="primary" primary />,
      )}
    </Grid>
  </Flex>
)

export default FluentAndFabricInterop
