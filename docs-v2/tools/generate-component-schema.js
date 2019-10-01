const path = require("path")
const doctrine = require("doctrine")
const docgen = require("./react-docgen-fork")

// TODO: assign these categories as tags in component sources
const CATEGORY_MAPPINGS = {
  Accordion: "Surfaces",
  Alert: "Notifications",
  Animation: "Motion",
  Attachment: "Items & Lists",
  Avatar: "Media",
  Box: "Layout",
  Button: "Inputs",
  Chat: null,
  Checkbox: "Inputs",
  Design: "Utilities",
  Dialog: "Surfaces",
  Divider: "Layout",
  Dropdown: "Inputs",
  Embed: "Media",
  Flex: "Layout",
  Form: "Inputs",
  Grid: "Layout",
  Header: "Typography",
  HierarchicalTree: "Layout",
  Icon: "Media",
  Image: "Media",
  Input: "Inputs",
  Label: "Utilities",
  Layout: "Layout",
  List: "Items & Lists",
  Loader: "Motion",
  Menu: "Menus",
  MenuButton: "Menus",
  Popup: "Utilities",
  Portal: "Utilities",
  Provider: "Utilities",
  RadioGroup: "Inputs",
  Reaction: "Inputs",
  Segment: "Surfaces",
  Slider: "Inputs",
  SplitButton: "Inputs",
  Status: "Utilities",
  Text: "Typography",
  TextArea: "Inputs",
  Toolbar: "Menus",
  Tooltip: "Utilities",
  Tree: "Utilities",
  Video: "Media"
}

// The schema generator needs to extract some information directly off of
// React component classes, so we must register this script with ts-node
// in order to import those classes from source.
require("ts-node").register()
require("tsconfig-paths").register({
  baseUrl: path.resolve(__dirname, "../../"),
  paths: {
    "@stardust-ui/*": ["packages/*/src"]
  }
})

// Mask fela warnings
const warn = console.warn
console.warn = (arg, ...args) => {
  if (
    typeof arg === "string" &&
    arg.includes("You are running Fela in production mode")
  ) {
    return
  }
  warn(arg, ...args)
}

exports.generateComponentSchema = function(sourcePath) {
  // Get info from react docgen.
  const info = getComponentInfo(sourcePath)
  const {description, tags} = doctrine.parse(info.description)

  // FIXME: this is a holdover from the old Stardust doc generator. See if
  // it's possible to extract the same info without needing to import a
  // component form source.
  const Component = require(sourcePath)

  // Build schema object. Properties are added incrementally because some
  // values are computed based on a partial schema.
  const schema = {}
  schema.category = CATEGORY_MAPPINGS[info.displayName]
  schema.displayName = info.displayName
  schema.description = description
  schema.tags = tags
  schema.subComponents = getSubComponents(sourcePath)
  schema.isParent = true
  schema.props = getProps(Component, info)
  schema.behaviors = getBehaviors(schema)

  // FIXME: holdover from existing stardust build scripts.
  if (schema.displayName === "Ref") {
    schema.isParent = true
  }
  return schema
}

function getComponentInfo(sourcePath) {
  const components = docgen.parse(sourcePath)
  if (!components.length) {
    throw new Error(`Could not find a component definition in "${sourcePath}".`)
  }
  if (components.length > 1) {
    throw new Error(
      [
        `Found more than one component definition in "${sourcePath}".`,
        "This is currently not supported, please ensure your module only defines a single React component."
      ].join(" ")
    )
  }
  return components[0]
}

function getSubComponents(sourcePath) {
  return []
}

function getProps(Component, info) {
  const props = []
  for (const prop of Object.values(info.props)) {
    const schema = getPropSchema(Component, prop)

    // Skip any props that are tagged with @docSiteIgnore
    if (schema.tags.find(tag => tag.title === "docSiteIgnore")) {
      continue
    }
    props.push(schema)
  }
  return props
}

function getPropSchema(Component, prop) {
  // Special case `as` prop
  if (prop.name === "as") {
    return {
      name: "as",
      description: "An element type to render as (string or component).",
      defaultValue: getPropDefaultValue(Component, prop),
      tags: [],
      types: [{name: "React.ElementType"}],
      required: false
    }
  }

  const {description, tags} = doctrine.parse(prop.description)
  return {
    name: prop.name,
    tags,
    description,
    defaultValue: getPropDefaultValue(Component, prop),
    required: prop.required
  }
}

function getPropDefaultValue(Component, prop) {
  if (Component.defaultProps && prop.name in Component.defaultProps) {
    const defaultValue = Component.defaultProps[prop.name]
    switch (typeof defaultValue) {
      case "function":
        return defaultValue.name
      default:
        return defaultValue
    }
  }

  if (prop.name === "as") {
    return "div"
  }

  return undefined
}

function getBehaviors(schema) {
  const accessibility = schema.props.find(p => p.name === "accessibility")
  if (!accessibility || !accessibility.tags) {
    return []
  }

  const available = accessibility.tags.find(t => t.title === "available")
  if (!available || !available.description) {
    return []
  }

  return available.description
    .replace(/\s/g, "")
    .split(",")
    .map(name => ({
      name,
      displayName: upperFirst(name.replace("Behavior", "")),
      category: upperFirst(name.split(/(?=[A-Z])/)[0])
    }))
}

function upperFirst(str) {
  return str[0].toUpperCase() + str.slice(1)
}
