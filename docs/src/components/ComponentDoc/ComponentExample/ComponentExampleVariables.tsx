import {
  Checkbox,
  Flex,
  Grid,
  Header,
  ProviderContextPrepared,
  ThemeComponentVariablesPrepared,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from '@stardust-ui/react-fela'

import ComponentExampleVariable, { ComponentExampleVariableProps } from './ComponentExampleVariable'
import { mergeThemeVariables } from 'src/lib/mergeThemes'
import callable from 'src/lib/callable'

type ComponentExampleVariablesProps = {
  onChange: ComponentExampleVariableProps['onChange']
  overriddenVariables: ThemeComponentVariablesPrepared
  usedVariables: Record<string, string[]>
}

const ComponentExampleVariables: React.FunctionComponent<
  ComponentExampleVariablesProps
> = props => {
  const { onChange, overriddenVariables, usedVariables } = props

  const { theme } = React.useContext<ProviderContextPrepared>(ThemeContext)
  const [showAll, setShowAll] = React.useState(false)

  const componentVariables: ThemeComponentVariablesPrepared = _.pickBy(
    mergeThemeVariables(theme.componentVariables, overriddenVariables),
    (componentVariables, componentName) => {
      return usedVariables[componentName]
    },
  )
  const filteredVariables = _.omitBy(
    _.mapValues(componentVariables, (variables, componentName) =>
      _.reduce(
        callable(variables)(theme.siteVariables),
        (acc, variableValue, variableName) => {
          const visible =
            typeof variableValue === 'string' && // TODO: remove after variables will be flatten
            (showAll || usedVariables[componentName].indexOf(variableName) !== -1)

          if (visible) {
            acc[variableName] = variableValue
          }

          return acc
        },
        {},
      ),
    ),
    _.isEmpty,
  )

  return (
    <>
      <Flex hAlign="end">
        <Checkbox
          checked={!showAll}
          label="Show only active"
          onChange={(e, data) => setShowAll(!data.checked)}
        />
      </Flex>

      {_.map(filteredVariables, (componentVariables, componentName) => (
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

export default ComponentExampleVariables
