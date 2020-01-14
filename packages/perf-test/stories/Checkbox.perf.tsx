import * as React from 'react'
import { Checkbox as CheckboxFabric } from 'office-ui-fabric-react'
import { Checkbox as CheckboxFluent } from '@fluentui/react'

export default {
  iterations: 1000,
}

export const Fabric = () => <CheckboxFabric />
export const Fluent = () => <CheckboxFluent />
