import { Grid, Header, Segment, ThemeComponentVariablesPrepared } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'

import ComponentExampleVariable, { ComponentExampleVariableProps } from './ComponentExampleVariable'

type ComponentExampleVariablesProps = {
  displayName: string
  onChange: ComponentExampleVariableProps['onChange']
  variables: ThemeComponentVariablesPrepared
}

const ComponentExampleVariables: React.FunctionComponent<
  ComponentExampleVariablesProps
> = props => {
  const { displayName, onChange, variables } = props

  if (variables) {
    return (
      <>
        {_.map(variables, (componentVariables, componentName) => (
          <React.Fragment key={componentName}>
            <Header as="h3">{componentName}</Header>
            <Grid columns="4">
              {_.map(componentVariables, (variableValue, variableName) => (
                <ComponentExampleVariable
                  componentName={componentName}
                  key={variableName}
                  onChange={onChange}
                  variableName={variableName}
                  variableValue={variableValue}
                />
              ))}
            </Grid>
          </React.Fragment>
        ))}
      </>
    )
  }

  return <Segment inverted>{displayName} has no variables to edit.</Segment>
}

export default ComponentExampleVariables
