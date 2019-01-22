import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import Knobs from 'docs/src/components/Knobs/Knobs'
import { ProviderConsumer } from '@stardust-ui/react'

type MenuExampleColorKnobsProps = {
  onKnobChange: () => void
}

const MenuExampleColorKnobs = (props: MenuExampleColorKnobsProps) => {
  const { onKnobChange } = props

  return (
    <ProviderConsumer
      render={({ siteVariables: { colorScheme } }) => {
        const colorsArr = _.keys(colorScheme).map(color => ({
          name: _.upperCase(color),
          value: color,
        }))

        return (
          <Knobs>
            <Knobs.Select name="Choose a color: " items={colorsArr} onChange={onKnobChange} />
          </Knobs>
        )
      }}
    />
  )
}

MenuExampleColorKnobs.propTypes = {
  onKnobChange: PropTypes.func.isRequired,
}

export default MenuExampleColorKnobs
