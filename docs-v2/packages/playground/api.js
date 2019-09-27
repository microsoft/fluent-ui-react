import React from "react"
import {observable, action, decorate} from "mobx"
import * as Stardust from "@stardust-ui/react"
import * as Babel from "@babel/standalone"
import Prettier from "prettier/standalone"
import BabylonParser from "prettier/parser-babylon"

// Previews assume that React and Stardust components are available in their
// current scope, so we must provide them.
if (typeof window !== "undefined") {
  window.React = React
  for (let key in Stardust) {
    window[key] = Stardust[key]
  }
}

export class PlaygroundAPI {
  rtl = false
  transparent = false
  themes = [
    {id: "Teams Light", value: Stardust.themes.teams},
    {id: "Teams Dark", value: Stardust.themes.teamsDark},
    {id: "Teams High Contrast", value: Stardust.themes.teamsDark}
  ]

  constructor(schema) {
    this.schema = schema
    this.theme = this.themes[0]
    if (schema.examples && schema.examples.length > 0) {
      this.examples = sortExamples(
        schema.examples.map(example => new Example(example))
      )
      this.selectExample(this.examples[0].title)
    } else {
      this.examples = []
    }

    // Bind methods
    this.toggleRTL = this.toggleRTL.bind(this)
    this.toggleTransparent = this.toggleTransparent.bind(this)
    this.selectExample = this.selectExample.bind(this)
    this.selectTheme = this.selectTheme.bind(this)
  }

  selectControl(label) {
    this.activeControl = label
  }

  selectTheme(id) {
    const theme = this.themes.find(theme => theme.id === id)
    if (theme) {
      this.theme = theme
    }
  }

  selectExample(title) {
    if (this.activeExample) {
      this.activeExample.active = false
    }
    this.activeExample = this.examples.find(example => example.title === title)
    this.activeExample.active = true
  }

  toggleRTL() {
    this.rtl = !this.rtl
  }

  toggleTransparent() {
    this.transparent = !this.transparent
  }

  reset() {
    if (this.activeExample) {
      this.activeExample.reset()
    }
  }

  render() {
    if (!this.activeExample) {
      return <div />
    }
    return this.activeExample.render()
  }
}
decorate(PlaygroundAPI, {
  rtl: observable,
  transparent: observable,
  theme: observable.shallow,
  activeExample: observable.shallow,
  selectTheme: action,
  selectExample: action,
  toggleRTL: action,
  toggleTransparent: action
})

function sortExamples(examples) {
  return examples.sort((a, b) => {
    if (a.title === "Default") {
      return -1
    }
    if (b.title === "Default") {
      return 1
    }
    return 0
  })
}

export class Example {
  active = false

  constructor(json) {
    this.title = json.title
      .replace(/\..*/, "")
      .split("-")
      .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
    this.description = json.description
    this._originalSource = this.normalizeSource(json.source)
    this.source = this._originalSource
  }

  normalizeSource(source) {
    source = source
      .split("\n")
      .filter(line => !/^\/\//.test(line))
      .join("\n")
    return source
  }

  format() {
    this.source = Prettier.format(this.source, {
      semi: false,
      bracketSpacing: false,
      parser: "babylon",
      plugins: [BabylonParser]
    })
  }

  reset() {
    this.source = this._originalSource
  }

  render() {
    let source = this.source

    // strip imports
    source = source
      .split("\n")
      .filter(line => !/^import/.test(line))
      .join("\n")

    // replace default export
    source = source.replace("export default", "return")
    source = `(() => { ${source} })()`
    try {
      source = Babel.transform(source, {presets: ["react"]}).code
      const result = eval(source) // eslint-disable-line
      if (typeof result === "function") {
        return React.createElement(result)
      } else {
        return result
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
decorate(Example, {
  active: observable,
  source: observable,
  format: action,
  reset: action
})
