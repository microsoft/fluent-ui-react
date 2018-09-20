import PropTypes from 'prop-types'
import * as React from 'react'

import { repoURL } from 'docs/src/utils'
import { Message } from 'semantic-ui-react'
import { Icon } from '@stardust-ui/react'

const wrapStyle = { wordBreak: 'break-word' }

const ContributionPrompt: any = ({ children }) => (
  <Message info icon style={wrapStyle}>
    <Icon name="bullhorn" />
    <Message.Content>
      {children && <div>{children}</div>}
      <p>
        If there's no{' '}
        <a href={`${repoURL}/pulls`}>
          pull request <Icon fitted size="small" name="external" />
        </a>{' '}
        open for this, you should{' '}
        <a href={`${repoURL}/blob/master/.github/CONTRIBUTING.md`}>
          contribute <Icon fitted size="small" name="external" />
        </a>{' '}
        one!
      </p>
    </Message.Content>
  </Message>
)

ContributionPrompt.propTypes = {
  children: PropTypes.node,
}

export default ContributionPrompt
