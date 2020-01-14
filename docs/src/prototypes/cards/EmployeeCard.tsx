import * as React from 'react'
import { Extendable, ShorthandValue } from 'src/types'
import { Avatar, AvatarProps, Divider, Grid, Button } from '@fluentui/react'
import CustomText from './CustomText'
import { Group, NextGroupDirection } from 'ability-helpers-react'

export interface EmployeeCardProps {
  firstName?: string
  lastName?: string
  status?: string
  position?: string
  team?: string
  location?: string
  email?: string
  phone?: string
  avatar?: ShorthandValue<AvatarProps>
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
      cardOrder,
      isLimitedNavigation,
      ...restProps
    } = this.props
    return (
      <Group
        isFocusable={true}
        isLimited={isLimitedNavigation}
        nextGroupDirection={NextGroupDirection.Grid}
        {...restProps}
      >
        <Grid
          columns="80% 20%"
          styles={{
            width: '320px',
            padding: '10px 20px 10px 10px',
            margin: '10px 10px 10px 10px',
            background: 'white',
          }}
        >
          <div>
            <span> is limited navigation: {`${isLimitedNavigation}`} </span>
            <CustomText id={`user-name-${cardOrder}`} size={'medium'} weight={'bold'} as="div">
              {firstName} {`${lastName} ${cardOrder}`}
            </CustomText>
            <CustomText muted as="div">
              {status}
            </CustomText>
            <Divider variables={{ dividerColor: 'white' }} />
            {position && (
              <CustomText muted as="div">
                {position}
              </CustomText>
            )}
            {team && <Button>{team}</Button>}
            {location && (
              <CustomText muted as="div">
                {location}
              </CustomText>
            )}
            {phone && (
              <CustomText muted as="div">
                {phone}
              </CustomText>
            )}
            {email && <a href="#">{email}</a>}
          </div>
          {Avatar.create(avatar, {
            defaultProps: () => ({
              size: 'largest',
              name: `${firstName} ${lastName}`,
            }),
          })}
        </Grid>
      </Group>
    )
  }
}

export default EmployeeCard
