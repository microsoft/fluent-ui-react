import React from "react"
import "./plugin-host.css"

export function PlaygroundPluginHost({schema, plugins}) {
  const [activePlugin, setActivePlugin] = React.useState()
  return (
    <footer className="playground-plugin-host">
      <nav className="playground-plugin-host__nav">
        {plugins.map(plugin => {
          function handleClick(e) {
            if (activePlugin === plugin) {
              setActivePlugin(null)
            } else {
              setActivePlugin(plugin)
            }
          }

          let className = "playground-plugin-link"
          if (plugin === activePlugin) {
            className += " is-active"
          }
          return (
            <button
              key={plugin.title}
              className={className}
              onClick={handleClick}
            >
              {plugin.title}
            </button>
          )
        })}
      </nav>
      <div className="playground-plugin-body">
        {activePlugin && activePlugin.render({schema})}
      </div>
    </footer>
  )
}
