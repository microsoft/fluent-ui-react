import * as React from 'react'
import { Button, Icon } from '@stardust-ui/react'

class RightTopButtons extends React.Component {
  public render() {
    return (
      <div style={{ flexGrow: 0.2 }}>
        <Button
          aria-label="add people"
          circular
          key="userPlus"
          title="add people"
          icon={
            <Icon
              key="userPlus"
              name="user plus"
              size="large"
              variables={siteVars => ({ color: siteVars.gray04 })}
            />
          }
        />
        <Button
          aria-label="more options"
          circular
          key="moreOptions"
          title="more option"
          icon={
            <Icon
              key="userPlus"
              name="ellipsis horizontal"
              size="large"
              variables={siteVars => ({ color: siteVars.gray04 })}
            />
          }
        />
      </div>
    )
  }
}

export default RightTopButtons
