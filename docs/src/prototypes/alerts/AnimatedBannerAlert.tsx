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
            color: siteVars.orchid,
            backgroundColor: '#F9F5F8',
            borderColor: '#DCADC7',
          }
        }

        if (urgent) {
          return {
            color: appWhite,
            backgroundColor: siteVars.red,
            borderColor: siteVars.red,
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
  closable?: boolean
}

interface AnimatedBannerAlertState {
  open: boolean
}

/**
 * Needs to have 'slideDown' animation defined in parent Provider
 */
class AnimatedBannerAlert extends React.Component<
  AnimatedBannerAlertProps,
  AnimatedBannerAlertState
> {
  private readonly initialState: AnimatedBannerAlertState = { open: true }

  state = this.initialState

  componentDidUpdate(prevProps: AnimatedBannerAlertProps) {
    const p = prevProps
    const { info, danger, oof, critical, urgent } = this.props

    if (
      p.info !== info ||
      p.danger !== danger ||
      p.oof !== oof ||
      p.critical !== critical ||
      p.urgent !== urgent
    ) {
      this.setState(this.initialState)
    }
  }

  handleClick = () => this.setState({ open: false })

  render() {
    const { open } = this.state
    const { closable, ...rest } = this.props

    return closable ? (
      <Animation name={open ? '' : 'slideDown'}>
        <BannerAlert {...rest} action={{ icon: 'close', onClick: this.handleClick }} />
      </Animation>
    ) : (
      <BannerAlert {...rest} />
    )
  }
}

export default AnimatedBannerAlert
