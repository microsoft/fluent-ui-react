import * as React from 'react'
import { Avatar, Popup, Provider } from '@stardust-ui/react'
import EmployeeCard from './EmployeeCard'

class AvatarEmployeeCard extends React.Component<any, { popupOpen: boolean }> {
  state = { popupOpen: false }
  tryClose = false

  togglePopup(popupOpen) {
    if (popupOpen === false) {
      this.tryClose = true
      this.timer()
    } else {
      this.tryClose = false
      this.setState({ popupOpen: true })
    }
  }

  timer = () =>
    setTimeout(() => {
      if (this.tryClose === true) {
        this.setState({
          popupOpen: false,
        })
      }
    }, 500)

  render() {
    return (
      <div>
        <div style={{ margin: '20px' }}>
          <Provider theme={{ componentStyles: { PopupContent: { root: { marginLeft: '10px' } } } }}>
            <Popup
              open={this.state.popupOpen}
              position="after"
              align="top"
              onOpenChange={(e, newProps) => {
                this.setState({ popupOpen: newProps.open })
              }}
              trigger={
                <Avatar
                  name="John Doe"
                  label={{ variables: { backgroundColor: '#00b5ad', color: 'white' } }}
                  status={{ color: 'green', icon: 'check', title: 'Available' }}
                  onMouseEnter={() => {
                    this.togglePopup(true)
                  }}
                  onMouseLeave={() => {
                    this.togglePopup(false)
                  }}
                />
              }
              content={
                <EmployeeCard
                  firstName="John"
                  lastName="Doe"
                  position="SR. SOFTWARE ENGINEER"
                  location="Prague, Czech Repblic"
                  status="Avaiable"
                  team="Stardust UI Engineering"
                  email="John.Doe@company.com"
                  avatar={{
                    label: { variables: { backgroundColor: '#00b5ad', color: 'white' } },
                    status: { color: 'green', icon: 'check', title: 'Available' },
                  }}
                  onMouseEnter={() => {
                    this.togglePopup(true)
                  }}
                  onMouseLeave={() => {
                    this.togglePopup(false)
                  }}
                />
              }
            />
          </Provider>
        </div>
      </div>
    )
  }
}

export default AvatarEmployeeCard
