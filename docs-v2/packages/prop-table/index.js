import React from "react"
import "./index.css"

export function PropTable({props}) {
  return (
    <div className="table-container">
      <table className="prop-table table is-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default&nbsp;Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props &&
            props.map(prop => {
              return (
                <tr key={prop.name}>
                  <th>{prop.name}</th>
                  <td className="no-wrap">{renderPropTypes(prop.types)}</td>
                  <td className="no-wrap">{renderDefaultValue(prop)}</td>
                  <td>{prop.description}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

function renderPropTypes(types) {
  return types
    .map(type => {
      if (type.name === "literal") {
        return '"' + type.value + '"'
      }

      return type.name
    })
    .join(" | ")
}

function renderDefaultValue(prop) {
  const {defaultValue} = prop
  if (typeof defaultValue === "undefined") {
    return "-"
  } else if (!defaultValue) {
    return "" + defaultValue
  } else if (typeof defaultValue === "object") {
    return JSON.stringify(defaultValue)
  } else {
    return defaultValue
  }
}
