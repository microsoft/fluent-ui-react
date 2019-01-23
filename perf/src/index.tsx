import { Provider, themes } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ProfilerMeasure, ProfilerMeasureCycle } from '../types'

// https://github.com/bvaughn/rfcs/blob/profiler/text/0000-profiler.md
const Profiler = (React as any).unstable_Profiler

const mountNode = document.querySelector('#root')
const performanceExamplesContext = require.context('docs/src/examples/', true, /.perf.tsx$/)

// Heads up!
// We want to randomize examples to avoid any notable issues with always first example
const performanceExampleNames: string[] = _.shuffle(performanceExamplesContext.keys())

const asyncRender = (element: React.ReactElement<any>, mountNode: Element) =>
  new Promise(resolve => {
    ReactDOM.render(element, mountNode, () => {
      ReactDOM.unmountComponentAtNode(mountNode)
      resolve()
    })
  })

const renderCycle = async (
  exampleName: string,
  Component: React.ComponentType,
  exampleIndex: number,
): Promise<ProfilerMeasure> => {
  let profilerMeasure: ProfilerMeasure

  await asyncRender(
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
          profilerMeasure = {
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

  return profilerMeasure
}

window.runMeasures = async () => {
  const performanceMeasures: ProfilerMeasureCycle = {}

  for (const exampleName of performanceExampleNames) {
    // ./components/Button/Performance/Button.perf.tsx => Button.perf.tsx
    const componentName = _.last(exampleName.split('/'))
    const Component = performanceExamplesContext(exampleName).default

    performanceMeasures[componentName] = await renderCycle(
      componentName,
      Component,
      performanceExampleNames.indexOf(exampleName),
    )
  }

  return performanceMeasures
}
