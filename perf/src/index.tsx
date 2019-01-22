import { Provider, themes } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// https://github.com/bvaughn/rfcs/blob/profiler/text/0000-profiler.md
const Profiler = (React as any).unstable_Profiler

const mountNode = document.querySelector('#root')
const performanceExamplesContext = require.context('docs/src/examples/', true, /.perf.tsx$/)

// Heads up!
// We want to randomize examples to avoid any notable issues with always first example
const performanceExampleNames = _.shuffle(performanceExamplesContext.keys())
const performanceMeasures = {}

const renderCycle = (exampleName: string, Component: React.ComponentType, exampleIndex: number) => {
  ReactDOM.render(
    <Provider theme={themes.teams}>
      <Profiler
        id={exampleName}
        onRender={(
          id: string,
          phase: string,
          actualTime: number,
          baseTime: number,
          startTime: number,
          commitTime: number,
        ) => {
          performanceMeasures[exampleName] = {
            actualTime,
            baseTime,
            exampleIndex,
            phase,
            commitTime,
            startTime,
          }
        }}
      >
        <Component />
      </Profiler>
    </Provider>,
    mountNode,
  )
  ReactDOM.unmountComponentAtNode(mountNode)
}

window.runMeasures = () => {
  performanceExampleNames.forEach((exampleName: string, exampleIndex: number) => {
    // ./components/Button/Performance/Button.perf.tsx => Button.perf.tsx
    const componentName = _.last(exampleName.split('/'))
    const Component = performanceExamplesContext(exampleName).default

    renderCycle(componentName, Component, exampleIndex)
  })

  return performanceMeasures
}
