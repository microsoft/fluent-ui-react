import * as React from 'react'
import { Header, Label, Icon, Provider, LabelProps } from '@stardust-ui/react'

type BadgeProps = LabelProps & { attached?: boolean }

const Badge: React.FunctionComponent<BadgeProps> = props => {
  const { attached, variables, ...rest } = props
  return (
    <Label
      circular
      color="red"
      icon={{ name: 'redbang', size: 'smaller' }}
      {...rest}
      variables={{ ...variables, attached }}
    />
  )
}

const BadgeContainer: React.FunctionComponent = () => {
  return (
    <Provider
      theme={{
        componentStyles: {
          Label: {
            root: ({ props: p, variables: v }) => ({
              ...(p.circular && {
                height: 'auto',
                width: 'auto',
                padding: '4px',
              }),
              ...((v as any).attached && {
                position: 'absolute',
                zIndex: '1',
                borderRadius: '50%',
                transform: 'translateX(20%) translateY(-80%)',
              }),
            }),
          },
        },
      }}
    >
      <Header as="h4">Standalone</Header>
      <Badge />
      <Header as="h4">Button</Header>
      <button style={{ position: 'relative' }}>
        Button content
        <Badge attached />
      </button>
      <Header as="h4">Icon Button</Header>
      <button style={{ position: 'relative' }}>
        <Icon name="mic" />
        <Badge attached />
      </button>
    </Provider>
  )
}

export default BadgeContainer
