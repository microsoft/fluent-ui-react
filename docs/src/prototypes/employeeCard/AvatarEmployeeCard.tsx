import * as React from 'react'
import { Avatar, Popup } from '@stardust-ui/react'
import EmployeeCard from './EmployeeCard'
import { Extendable } from '../../../../types/utils'
import { IEmployeeCardProps } from './types/IEmployeeCardProps'

export interface IAvatarEmployeeCardState {
  popupOpen: boolean
}

class AvatarEmployeeCard extends React.Component<
  Extendable<IEmployeeCardProps>,
  IAvatarEmployeeCardState
> {
  state = { popupOpen: false }
  tryClose = false

  togglePopup(popupOpen) {
    if (!popupOpen) {
      this.tryClose = true
      this.timer()
    } else {
      this.tryClose = false
      this.setState({ popupOpen: true })
    }
  }

  timer = () =>
    setTimeout(() => {
      if (this.tryClose) {
        this.setState({
          popupOpen: false,
        })
      }
    }, 500)

  render() {
    const {
      firstName,
      lastName,
      email,
      location,
      position,
      status,
      team,
      phone,
      avatar,
    } = this.props
    return (
      <Popup
        open={this.state.popupOpen}
        position="after"
        align="top"
        onOpenChange={(e, newProps) => {
          this.setState({ popupOpen: newProps.open })
        }}
        trigger={Avatar.create(avatar, {
          defaultProps: {
            name: `${firstName} ${lastName}`,
            onMouseEnter: () => {
              this.togglePopup(true)
            },
            onMouseLeave: () => {
              this.togglePopup(false)
            },
          },
        })}
        content={{
          styles: { marginLeft: '10px' },
          content: (
            <EmployeeCard
              firstName={firstName}
              lastName={lastName}
              position={position}
              location={location}
              status={status}
              team={team}
              email={email}
              avatar={avatar}
              phone={phone}
              onMouseEnter={() => {
                this.togglePopup(true)
              }}
              onMouseLeave={() => {
                this.togglePopup(false)
              }}
            />
          ),
        }}
      />
    )
  }
}

export default AvatarEmployeeCard
