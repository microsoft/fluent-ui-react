import * as React from 'react'
import * as ReactDOM from 'react-dom'

const mountNode = document.querySelector('#root')
const performanceExamples = require.context('docs/src/examples/', true, /.perf.tsx$/)

const renderCycle = Component => {
  ReactDOM.render(<Component />, mountNode)
  ReactDOM.unmountComponentAtNode(mountNode)
}

performanceExamples.keys().forEach(exampleName => {
  const Component = performanceExamples(exampleName).default

  renderCycle(Component)
})
