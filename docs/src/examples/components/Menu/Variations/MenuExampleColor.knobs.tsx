import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import { ProviderConsumer } from '@stardust-ui/react'

import Knobs from 'docs/src/components/Knobs/Knobs'
import { KnobsSelectItem } from 'docs/src/components/Knobs/KnobsSelect'

type MenuExampleColorKnobsProps = {
  onKnobChange: () => void
  overrides: { selectedItem?: KnobsSelectItem }
}

const MenuExampleColorKnobs = ({
  onKnobChange,
  overrides: { selectedItem },
}: MenuExampleColorKnobsProps) => {
  return (
    <ProviderConsumer
      render={({ siteVariables: { colorScheme } }) => {
        const colorsArr = _.keys(colorScheme).map(color => ({
          name: _.startCase(color),
          value: color,
        }))

        return (
          <Knobs>
            <Knobs.Select
              name="Color"
              items={colorsArr}
              onChange={onKnobChange}
              selectedItem={selectedItem}
            />
          </Knobs>
        )
      }}
    />
  )
}

MenuExampleColorKnobs.propTypes = {
  onKnobChange: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({ name: PropTypes.string, value: PropTypes.string }),
}

MenuExampleColorKnobs.defaultProps = {
  selectedItem: { name: 'Primary', value: 'primary' },
}

export default MenuExampleColorKnobs
