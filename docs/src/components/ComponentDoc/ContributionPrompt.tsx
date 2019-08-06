import * as PropTypes from 'prop-types'
import * as React from 'react'

import { Icon, Segment, Text, ICSSInJSStyle } from '@stardust-ui/react'
import { constants } from 'src/lib'

const wrapStyle: ICSSInJSStyle = { wordBreak: 'break-word' }

const ContributionPrompt: any = ({ children }) => (
  <Segment inverted styles={wrapStyle}>
    <Icon name="lightning" />
    <Text>
      {children && <div>{children}</div>}
      <p>
        If there's no{' '}
        <a href={`${constants.repoURL}/pulls`}>
          pull request <Icon size="small" name="open-outside" />
        </a>{' '}
        open for this, you should{' '}
        <a href={`${constants.repoURL}/blob/master/.github/CONTRIBUTING.md`}>
          contribute <Icon size="small" name="open-outside" />
        </a>{' '}
        one!
      </p>
    </Text>
  </Segment>
)

ContributionPrompt.propTypes = {
  children: PropTypes.node,
}

export default ContributionPrompt
