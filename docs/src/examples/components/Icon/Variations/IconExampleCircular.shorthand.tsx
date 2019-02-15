import * as React from 'react'
import { Icon } from '@stardust-ui/react'

const IconExampleCircular = () => (
  <div>
    <Icon
      name="chess rook"
      circular
      variables={siteVars => ({
        backgroundColor: siteVars.colors.grey[500],
        color: siteVars.colors.white,
      })}
    />
    <Icon
      name="book"
      circular
      variables={siteVars => ({
        backgroundColor: siteVars.colors.grey[500],
        color: siteVars.colors.white,
      })}
    />
    <Icon
      name="expand"
      circular
      variables={siteVars => ({
        backgroundColor: siteVars.colors.grey[500],
        color: siteVars.colors.white,
      })}
    />
    <Icon
      name="calendar alternate outline"
      circular
      variables={siteVars => ({
        backgroundColor: siteVars.colors.grey[500],
        color: siteVars.colors.white,
      })}
    />
    <Icon
      name="compass outline"
      circular
      variables={siteVars => ({
        backgroundColor: siteVars.colors.grey[500],
        color: siteVars.colors.white,
      })}
    />
    <Icon
      name="area chart"
      circular
      variables={siteVars => ({
        backgroundColor: siteVars.colors.grey[500],
        color: siteVars.colors.white,
      })}
    />
  </div>
)

export default IconExampleCircular
