import * as PropTypes from 'prop-types'
import * as React from 'react'
import { List } from '@stardust-ui/react'
import { constants } from 'src/lib'

export default class ComponentDocLinks extends React.PureComponent<any, any> {
  static propTypes = {
    repoPath: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  render() {
    const { repoPath } = this.props
    return (
      <List
        styles={{
          boxShadow: '0 0 1em 0.5em #f7f7f7',
          margin: '0.5em',
          padding: '0.5em',
          position: 'absolute',
          right: '0',
          top: '0',
        }}
      >
        <List.Item
          content={
            <code>
              <a
                href={`${constants.repoURL}/blob/master/${repoPath}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repoPath}
              </a>
            </code>
          }
        />
      </List>
    )
  }
}
