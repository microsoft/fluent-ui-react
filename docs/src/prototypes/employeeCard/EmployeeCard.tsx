import * as React from 'react'
import { Extendable, ShorthandValue } from '../../../../types/utils'
import { Avatar, Divider, Grid } from '@stardust-ui/react'
import Text from './Text'

export interface EmployeeCardProps {
  firstName?: string
  lastName?: string
  status?: string
  position?: string
  team?: string
  location?: string
  email?: string
  phone?: string
  avatar?: ShorthandValue
}

class EmployeeCard extends React.Component<Extendable<EmployeeCardProps>, any> {
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
      phone,
      ...restProps
    } = this.props
    return (
      <Grid
        columns="80% 20%"
        styles={{ width: '320px', padding: '10px 20px 10px 10px', background: 'white' }}
        {...restProps}
      >
        <div>
          <Text size={'medium'} weight={'bold'} as="div">
            {firstName} {lastName}
          </Text>
          <Text muted as="div">
            {status}
          </Text>
          <Divider variables={{ dividerColor: 'white' }} />
          {position && (
            <Text muted as="div">
              {position}
            </Text>
          )}
          {team && (
            <Text muted as="div">
              {team}
            </Text>
          )}
          {location && (
            <Text muted as="div">
              {location}
            </Text>
          )}
          {phone && (
            <Text muted as="div">
              {phone}
            </Text>
          )}
          {email && (
            <Text muted as="div">
              {email}
            </Text>
          )}
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
