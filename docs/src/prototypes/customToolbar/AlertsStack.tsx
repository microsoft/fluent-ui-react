import * as React from 'react'
import Ufd from './Ufd'
import { Button, Text, Ref } from '@stardust-ui/react'
import chatProtoStyle from '.././chatPane/chatProtoStyle'

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

  nextButtonRef = React.createRef<HTMLButtonElement>()
  previousButtonRef = React.createRef<HTMLButtonElement>()

  static getDerivedStateFromProps(props, state) {
    if (props.alerts.length === state.currentAlert) {
      return {
        currentAlert: props.alerts.length - 1,
      }
    }
    return state
  }

  updateAriaLiveElement(textToUpdate: string) {
    setTimeout(() => {
      document.getElementById('ariaLive').innerText = textToUpdate
    }, 250)
  }

  setPrevious() {
    this.setState(
      prevState => ({
        currentAlert: prevState.currentAlert - 1 < 0 ? 0 : prevState.currentAlert - 1,
      }),
      this.handlePreviousFocus,
    )
  }

  handlePreviousFocus() {
    if (this && this.state && this.state.currentAlert === 0) {
      this.nextButtonRef.current.focus()
    }
    this.updateAriaLiveElement(`${this.state.currentAlert + 1} of ${this.props.alerts.length}`)
  }

  handleNextFocus() {
    if (this.state.currentAlert + 1 === this.props.alerts.length) {
      this.previousButtonRef.current.focus()
    }
    this.updateAriaLiveElement(`${this.state.currentAlert + 1} of ${this.props.alerts.length}`)
  }

  setNext() {
    this.setState(
      prevState => ({
        currentAlert:
          prevState.currentAlert + 1 === this.props.alerts.length
            ? this.props.alerts.length - 1
            : prevState.currentAlert + 1,
      }),
      this.handleNextFocus,
    )
  }

  getNextButtonTitle() {
    if (this.state.currentAlert + 1 === this.props.alerts.length) {
      return `No next alert`
    }
    // return `Next alert ${this.state.currentAlert + 2} of ${this.props.alerts.length}`
    return `Next alert`
  }

  getPreviousButtonTitle() {
    if (this.state.currentAlert === 0) {
      return `No previous alert`
    }
    // return `Previous alert ${this.state.currentAlert} of ${this.props.alerts.length}`
    return `Previous alert`
  }

  alertButtonsForMultipleAlerts(anotherButtons, closeButton) {
    const baseButtons = [
      <Ref innerRef={this.previousButtonRef} key="previousAlert">
        <Button
          disabled={this.state.currentAlert === 0}
          iconOnly
          icon={{
            name: 'chevron-down',
            rotate: 90,
            outline: true,
          }}
          title={this.getPreviousButtonTitle()}
          onClick={() => this.setPrevious()}
          primary
        />
      </Ref>,
      <Text
        id="pagination"
        content={`${this.state.currentAlert + 1} of ${this.props.alerts.length}`}
      />,
      <Ref innerRef={this.nextButtonRef} key="nextAlert">
        <Button
          disabled={this.state.currentAlert + 1 === this.props.alerts.length}
          iconOnly
          icon={{
            name: 'chevron-down',
            rotate: -90,
            outline: true,
          }}
          title={this.getNextButtonTitle()}
          onClick={() => this.setNext()}
          primary
        />
      </Ref>,
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

    return (
      <div>
        {alerts && alerts.length === 1 && (
          <div
            role="dialog"
            aria-label="alerts"
            aria-describedby={alerts[this.state.currentAlert].contentId}
          >
            <Ufd
              content={alerts[0].content}
              position={alerts[0].position}
              label={alerts[0].label}
              contentId={alerts[0].contentId}
              buttons={this.getButtonsForSingleAlert(alerts[0].buttons, alerts[0].closeButton)}
            />
          </div>
        )}

        {alerts && alerts.length > 1 && (
          <div
            role="alertdialog"
            aria-describedby={`pagination ${alerts[this.state.currentAlert].contentId}`}
            aria-modal={false}
          >
            <Ufd
              content={alerts[this.state.currentAlert].content}
              position={alerts[this.state.currentAlert].position}
              label={alerts[this.state.currentAlert].label}
              contentId={alerts[this.state.currentAlert].contentId}
              buttons={this.alertButtonsForMultipleAlerts(
                alerts[this.state.currentAlert].buttons,
                alerts[this.state.currentAlert].closeButton,
              )}
            />
          </div>
        )}
        <div
          id="ariaLive"
          aria-live="polite"
          aria-atomic="true"
          style={chatProtoStyle.screenReaderContainerStyles}
        >
          {/* {`${this.state.currentAlert + 1} of ${this.props.alerts.length}`} */}
          {/* {setTimeout( () => `${this.state.currentAlert + 1} of ${this.props.alerts.length}`, 1000 )} */}
        </div>
      </div>
    )
  }
}
