import * as React from 'react'
import * as _ from 'lodash'
import {
  Flex,
  Provider,
  RadioGroup,
  ThemeAnimation,
  RadioGroupItemProps,
  Header,
  Button,
} from '@stardust-ui/react'

import AnimatedBannerAlert from './AnimatedBannerAlert'
import ComposeMessage from '../chatPane/composeMessage'

type BannerName = 'info' | 'oof' | 'danger' | 'urgent' | 'critical'

const bannerNames: BannerName[] = ['info', 'oof', 'danger', 'urgent', 'critical']

const bannerRadioItems: RadioGroupItemProps[] = bannerNames.map(bannerName => ({
  key: bannerName,
  value: bannerName,
  label: `${_.startCase(bannerName)} banner`,
}))

const isAlertClosable = (bannerName: BannerName) =>
  bannerName !== 'critical' && bannerName !== 'urgent'

interface BannerAlertsState {
  selectedBanner: RadioGroupItemProps
}

class BannerAlerts extends React.Component<{}, BannerAlertsState> {
  private readonly initialState: BannerAlertsState = { selectedBanner: bannerRadioItems[0] }

  state = this.initialState

  render() {
    const { selectedBanner } = this.state
    const bannerName = selectedBanner.value as BannerName

    return (
      <Provider theme={{ animations: { slideDown } }}>
        <Flex
          column
          style={{
            width: '50%',
            backgroundColor: '#f3f2f1',
            padding: '10px 50px',
            position: 'relative',
          }}
        >
          <Flex space="between" vAlign="center">
            <Header as="h3">Select a banner:</Header>
            <Button content="Reset Banner" onClick={() => this.setState(this.initialState)} />
          </Flex>
          <RadioGroup
            checkedValue={selectedBanner.value}
            items={bannerRadioItems}
            checkedValueChanged={(e, props) => this.setState({ selectedBanner: props })}
          />
          <AnimatedBannerAlert
            {...{
              [bannerName]: true,
              attached: true,
              closable: isAlertClosable(bannerName),
              content: selectedBanner.label,
            }}
          />
          <ComposeMessage attached="bottom" />
        </Flex>
      </Provider>
    )
  }
}

export default BannerAlerts

const slideDown: ThemeAnimation = {
  keyframe: {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(100%)', display: 'none' },
  },
  duration: '.3s',
  iterationCount: '1',
  timingFunction: 'linear',
  fillMode: 'forwards',
}
