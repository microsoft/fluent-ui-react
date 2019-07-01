import * as React from 'react'
import {
  KnobInspector,
  useSelectKnob,
  useBooleanKnob,
  useStringKnob,
} from '@stardust-ui/docs-components'

import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import { roleValues, getRoles } from './role'
import ShareTray from './shareTray'
import { PickerGrid } from './picker'
import { PickerList } from './picker-list'

const roleDescriptionValues = ['custom', 'empty', 'not used']

export default () => {
  const [role] = useSelectKnob({
    name: 'role',
    initialValue: roleValues[0],
    values: roleValues,
  })

  const { containerRole, itemRole, wrapperRole } = getRoles(role)

  const [roleDescription] = useSelectKnob({
    name: 'roledescription',
    initialValue: roleDescriptionValues[0],
    values: roleDescriptionValues,
  })

  const [containerRoleDescription] = useStringKnob({
    name: 'container-roledescription',
    initialValue: 'Horizontal selector',
  })

  const [itemRoleDescription] = useStringKnob({
    name: 'item-roledescription',
    initialValue: 'Item',
  })

  const [horizontal] = useBooleanKnob({
    name: 'horizontal',
    initialValue: false,
  })

  const [positions] = useBooleanKnob({
    name: 'generate-positions',
    initialValue: false,
  })

  const componentProps = {
    containerRole,
    itemRole,
    wrapperRole,
    positions,
    horizontal: !!horizontal,
    ...(roleDescription === 'custom' && { containerRoleDescription, itemRoleDescription }),
    ...(roleDescription === 'empty' && { containerRoleDescription: '', itemRoleDescription: '' }),
  }

  return (
    <PrototypeSection title="Selector">
      <ComponentPrototype title="Settings">
        <KnobInspector />
      </ComponentPrototype>

      <ComponentPrototype title="Share tray" description="Calling screen share tray">
        <ShareTray {...componentProps} />
      </ComponentPrototype>

      <ComponentPrototype title="Picker" description="Grid picker">
        <PickerGrid {...componentProps} />
      </ComponentPrototype>

      <ComponentPrototype title="Picker List" description="Grid picker">
        <PickerList {...componentProps} />
      </ComponentPrototype>
    </PrototypeSection>
  )
}
