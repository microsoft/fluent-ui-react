import React from "react"
import {observer} from "mobx-react"
import {usePlayground} from "./context"

export const PlaygroundExamples = () => {
  const playground = usePlayground()

  return (
    <div className="playground-examples">
      <ul className="playground-example-list">
        {playground.examples.map(example => {
          return (
            <Example
              key={example.title}
              example={example}
              onSelect={title => playground.selectExample(title)}
            />
          )
        })}
      </ul>
    </div>
  )
}

const Example = observer(({example, onSelect}) => {
  let className = "playground-example is-selectable"
  if (example.active) {
    className += " is-selected"
  }
  return (
    <li className={className} onClick={() => onSelect(example.title)}>
      <span className="playground-example-title">{example.title}</span>
      <span className="playground-example-description">
        {example.description}
      </span>
    </li>
  )
})
