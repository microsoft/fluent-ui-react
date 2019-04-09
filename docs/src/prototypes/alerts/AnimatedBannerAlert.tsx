import * as React from 'react'
import { Alert, Animation, SiteVariablesInput, AlertProps } from '@stardust-ui/react'

interface BannerAlertProps extends AlertProps {
  oof?: boolean
  critical?: boolean
  urgent?: boolean
}

/**
 * Customized Alert that can express different intents through boolean props:
 * oof, urgent, critical
 */
const BannerAlert: React.FunctionComponent<BannerAlertProps> = props => {
  const { oof, critical, urgent, ...rest } = props
  return (
    <Alert
      variables={(siteVars: SiteVariablesInput) => {
        const appWhite = siteVars.colors.grey[50]

        if (oof) {
          return {
            color: siteVars.colors.pink[600],
            backgroundColor: '#F9F5F8', // where is this color coming from?
            borderColor: '#DCADC7', // where is this this color coming from?
          }
        }

        if (urgent) {
          return {
            color: appWhite,
            backgroundColor: siteVars.colors.red[400],
            borderColor: siteVars.colors.red[400],
          }
        }

        if (critical) {
          return {
            color: appWhite,
            backgroundColor: siteVars.gray03,
            borderColor: siteVars.gray02,
          }
        }

        return {}
      }}
      {...rest}
    />
  )
}

interface AnimatedBannerAlertProps extends BannerAlertProps {
  open?: boolean
}

/**
 * Needs to have 'slideDown' animation defined in parent Provider
 */
const AnimatedBannerAlert: React.FunctionComponent<AnimatedBannerAlertProps> = props => {
  const { open, ...rest } = props

  if (open === undefined) return <BannerAlert {...rest} />

  return (
    <Animation name={open ? '' : 'slideDown'}>
      <BannerAlert {...rest} />
    </Animation>
  )
}

export default AnimatedBannerAlert
