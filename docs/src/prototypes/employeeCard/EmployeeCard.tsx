import * as React from 'react'
import { Sizes } from '../../../../src/lib/enums'
import { Extendable, ItemShorthand } from '../../../../types/utils'
import { Avatar, Divider, Grid, Text } from '@stardust-ui/react'

export interface IEmployeeCardProps {
  firstName?: string
  lastName?: string
  status?: string
  position?: string
  team?: string
  location?: string
  email?: string
  avatar?: ItemShorthand
}

class EmployeeCard extends React.Component<Extendable<IEmployeeCardProps>, any> {
  render() {
    const {
      firstName,
      lastName,
      status,
      position,
      team,
      location,
      email,
      avatar,
      ...rest
    } = this.props
    return (
      <Grid columns="80% 20%" styles={{ width: '320px', paddingRight: '20px' }} {...rest}>
        <div>
          <Text size={Sizes.Medium} weight={'bold'}>
            {firstName} {lastName}
          </Text>
          <br />
          <Text disabled>{status}</Text>
          <Divider variables={{ dividerColor: 'white' }} />
          <Text disabled>{position}</Text>
          <br />
          <Text disabled>{team}</Text>
          <br />
          <Text disabled>{location}</Text>
          <br />
          <Text disabled>{email}</Text>
          <br />
        </div>
        {Avatar.create(avatar, {
          defaultProps: {
            size: 72,
            name: `${firstName} ${lastName}`,
          },
        })}
      </Grid>
    )
  }
}

export default EmployeeCard
