import * as React from 'react'
import { Input, variantOf } from '@stardust-ui/react'

const MinimalisticInput = variantOf(Input, 'Minimalistic')

const InputExampleMinimalistic = () => <MinimalisticInput clearable placeholder="Search..." />

export default InputExampleMinimalistic
