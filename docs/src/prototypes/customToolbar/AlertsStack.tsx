import * as React from 'react'
import Ufd from './Ufd'
import { Button, Text } from '@stardust-ui/react'

interface AlertStackProps {
  alerts: any[]
}

interface AlertStacksState {
  currentAlert: number
}

export class AlertStacks extends React.PureComponent<AlertStackProps, AlertStacksState> {
  constructor(props) {
    super(props)
    this.state = {
      currentAlert: 0,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.alerts.length === state.currentAlert) {
      return {
        currentAlert: props.alerts.length - 1,
      }
    }
    return state
  }

  setPrevious() {
    this.setState(prevState => ({
      currentAlert: prevState.currentAlert - 1 < 0 ? 0 : prevState.currentAlert - 1,
    }))
  }

  setNext() {
    this.setState(prevState => ({
      currentAlert:
        prevState.currentAlert + 1 === this.props.alerts.length
          ? this.props.alerts.length - 1
          : prevState.currentAlert + 1,
    }))
  }

  alertButtonsForMultipleAlerts(anotherButtons, closeButton) {
    const baseButtons = [
      <Button
        key="previousAlert"
        iconOnly
        icon={{
          name: 'chevron-down',
          rotate: 90,
          outline: true,
        }}
        title="Previous alert"
        onClick={() => this.setPrevious()}
        primary
      />,
      // <Button content={`${this.state.currentAlert + 1} of ${this.props.alerts.length}`} text />,
      <Text content={`${this.state.currentAlert + 1} of ${this.props.alerts.length}`} />,
      <Button
        iconOnly
        key="nextAlert"
        icon={{
          name: 'chevron-down',
          rotate: -90,
          outline: true,
        }}
        title="Next alert"
        onClick={() => this.setNext()}
        primary
      />,
    ]
    const allButtons = anotherButtons.concat(baseButtons)
    if (allButtons.indexOf(closeButton) === -1) {
      allButtons.push(closeButton)
      return allButtons
    }
    allButtons.splice(allButtons.indexOf(closeButton), 1)
    allButtons.push(closeButton)
    return allButtons
  }

  getButtonsForSingleAlert(anotherButtons, closeButton) {
    if (anotherButtons.length > 0) {
      if (anotherButtons.indexOf(closeButton) === -1) {
        anotherButtons.push(closeButton)
        return anotherButtons
      }
      return anotherButtons
    }
  }

  render() {
    const { alerts } = this.props
    const reverseAlerts = alerts.reverse()

    return (
      <div>
        {reverseAlerts && reverseAlerts.length === 1 && (
          <div
            role="dialog"
            aria-label="alerts"
            aria-describedby={reverseAlerts[this.state.currentAlert].contentId}
          >
            <Ufd
              content={reverseAlerts[0].content}
              position={reverseAlerts[0].position}
              label={reverseAlerts[0].label}
              contentId={reverseAlerts[0].contentId}
              buttons={this.getButtonsForSingleAlert(
                reverseAlerts[0].buttons,
                reverseAlerts[0].closeButton,
              )}
            />
          </div>
        )}

        {reverseAlerts && reverseAlerts.length > 1 && (
          <div
            role="alertdialog"
            aria-label="multiple alerts"
            aria-describedby={reverseAlerts[this.state.currentAlert].contentId}
            aria-modal={false}
          >
            <Ufd
              content={reverseAlerts[this.state.currentAlert].content}
              position={reverseAlerts[this.state.currentAlert].position}
              label={reverseAlerts[this.state.currentAlert].label}
              contentId={reverseAlerts[this.state.currentAlert].contentId}
              buttons={this.alertButtonsForMultipleAlerts(
                reverseAlerts[this.state.currentAlert].buttons,
                reverseAlerts[this.state.currentAlert].closeButton,
              )}
            />
          </div>
        )}
      </div>
    )
  }
}
