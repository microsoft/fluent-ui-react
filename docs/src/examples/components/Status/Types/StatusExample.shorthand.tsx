import { Status } from '@fluentui/react'
import { compose } from '@fluentui/react-bindings'
import * as React from 'react'
import * as PropTypes from 'prop-types'

// const MyStatus = compose<{ title: never; disabled?: boolean; name: string }>(Status, {
//   displayName: 'MyStatus',
//   mapPropsToBehavior: props => ({
//     name: props.name,
//   }),
//   mapPropsToStyles: props => ({
//     disabled: props.disabled,
//   }),
//   // Existing
//   // handledProps: ['disabled']
//   // Emotion approach
//   shouldForwardProp: propName => propName === 'disabled',
//   overrideStyles: true,
// })

const StatusWithProp = compose<{ square?: boolean }>(Status, {
  displayName: 'SquareStatus',
  mapPropsToStyles: props => ({
    square: props.square,
  }),
})

StatusWithProp.propTypes = {
  square: PropTypes.bool,
}

const StatusExampleShorthand = () => (
  <>
    <h2>
      Default <code>Status</code>
    </h2>
    <Status title="default state" />
    <h2>
      <code>Status</code> with additional prop
    </h2>
    <StatusWithProp />
    <StatusWithProp square />
    <h2>
      Composed <code>MyStatus</code>
    </h2>
    {/* <MyStatus
      accessibility={props => ({ attributes: { root: { 'data-shift': props.name } } })}
      name="Hoba!"
    />
    <MyStatus disabled /> */}
  </>
)

export default StatusExampleShorthand
