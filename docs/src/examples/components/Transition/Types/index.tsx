import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Transition specified by the animation name."
      examplePath="components/Transition/Types/TransitionExample"
    />
    <ComponentExample
      title="Duration"
      description="A transition can specify how long time an animation should take to complete."
      examplePath="components/Transition/Types/TransitionExampleDuration"
    />
    <ComponentExample
      title="Delay"
      description="A transition can specify a delay for the start of an animation."
      examplePath="components/Transition/Types/TransitionExampleDelay"
    />
    <ComponentExample
      title="Direction"
      description="A transition can specify whether an animation should be played forwards, backwards or in alternate cycles."
      examplePath="components/Transition/Types/TransitionExampleDirection"
    />
    <ComponentExample
      title="Iteration count"
      description="A transition can specify the number of times an animation should run or specify infinite to make the animation continue forever."
      examplePath="components/Transition/Types/TransitionExampleIterationCount"
    />
    <ComponentExample
      title="Fill mode"
      description="A transition can specify a style for the target element when the animation is not playing (before it starts, after it ends, or both)."
      examplePath="components/Transition/Types/TransitionExampleFillMode"
    />
    <ComponentExample
      title="Timing function"
      description="A transition can specify the speed curve of the animation."
      examplePath="components/Transition/Types/TransitionExampleTimingFunction"
    />
    <ComponentExample
      title="Play state"
      description="A transition can specify whether the animation is running or paused. "
      examplePath="components/Transition/Types/TransitionExamplePlayState"
    />
  </ExampleSection>
)

export default Types
