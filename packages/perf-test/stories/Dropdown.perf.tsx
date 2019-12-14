import * as React from 'react'
import { Dropdown as DropdownFabric } from 'office-ui-fabric-react'
import { Dropdown as DropdownFluent } from '@fluentui/react'

export default {
  iterations: 5000,
}

export const Fabric = () => <DropdownFabric />
export const Fluent = () => <DropdownFluent />
