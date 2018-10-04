import * as React from 'react'
import EmployeeCard from './EmployeeCard'
import Divider from '../../../../src/components/Divider/Divider'
import AvatarEmployeeCard from './AvatarEmployeeCard'

class EmployeeCardPrototype extends React.Component<any, { popupOpen: boolean }> {
  render() {
    const employee = {
      firstName: 'John',
      lastName: 'Doe',
      position: 'SR. SOFTWARE ENGINEER',
      location: 'Prague, Czech Republic',
      status: 'Avaiable',
      team: 'Stardust UI Engineering',
      email: 'John.Doe@company.com',
      avatar: {
        label: { variables: { backgroundColor: '#00b5ad', color: 'white' } },
        status: { color: 'green', icon: 'check', title: 'Available' },
      },
    }
    return (
      <div style={{ margin: '20px' }}>
        <EmployeeCard {...employee} />
        <Divider variables={{ dividerColor: 'transparent' }} />
        <AvatarEmployeeCard {...employee} />
      </div>
    )
  }
}

export default EmployeeCardPrototype
