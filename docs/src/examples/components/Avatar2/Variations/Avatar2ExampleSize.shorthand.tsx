import _ from 'lodash'
import React from 'react'
import { Avatar2, Provider, themes } from '@stardust-ui/react'

const Avatar2ExampleSizeShorthand = () => (
  <div>
    I'd like to iterate through sizes here: &emsp;
    <Avatar2
      src="public/images/avatar/small/matt.jpg"
      avatarSize="medium"
      avatarType="bot"
      avatarState="unknown"
    />
    <Avatar2
      src="public/images/avatar/small/matt.jpg"
      avatarSize="xlarge"
      avatarType="person"
      avatarState="available"
    />
    {/* <Provider.Consumer
      render={theme => (
          <pre>{JSON.stringify(theme.componentVariables.Avatar2(theme.siteVariables))}</pre>
        )}
    /> */}
    {/* <Provider.Consumer
      render={({ siteVariables }: IThemePrepared) => {
        return _.map(siteVariables.avatarSizes, (value, key) => (
          <div key={key}>
            <Avatar2 />{key}: {value}
          </div>
        ))
      }}
    /> */}
    {/*
    <Provider.Consumer
      render={({ theme.componentVariables.Avatar2() } : IThemePrepared) => {
        const avatarSizes = siteVariables['avatarSizes']

        return (
          <div>
            {_.chunk(_.toPairs(avatarSizes)).map(sizes => {
              return (
                <div>
                  {sizes.map(([key, val]) => (
                    <div>
                      <Avatar2 avatarSize={key} />
                  ))}
                </div>
              )
            })}
          </div>
        )
      }}
     />

    <Provider.Consumer
      render={theme => (
        <pre>{JSON.stringify(theme.componentVariables.Avatar2())}</pre>
      )}
    />

    <Provider.Consumer
      render={theme => (
        <pre>{JSON.stringify(theme)}</pre>
      )}
    />
     */}
  </div>
)

export default Avatar2ExampleSizeShorthand
