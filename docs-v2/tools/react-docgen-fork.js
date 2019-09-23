/**
 * THIS MODULE is largely based on the parser's logic
 * of react-docgen-typescript library: https://github.com/styleguidist/react-docgen-typescript/blob/master/src/parser.ts
 *
 * All the essential parts are moved from there with the following changes applied:
 * - removed support for component methods pasing
 * - extended support for intersection component types
 *
 * The last one served as the main driver for making this split,
 * as, otherwise, there was no possibility to extend component types
 * with static 'create' factory method.
 *
 * This is a reference to the corresponding issue of react-docgen-typescript
 * that haven't been resolved at time this module was introduced:
 * https://github.com/styleguidist/react-docgen-typescript/issues/158
 */
const path = require("path")
const ts = require("typescript")

// currentDirectoryName is used to trim parent fileNames
const currentDirectoryPath = process.cwd()
const currentDirectoryParts = currentDirectoryPath.split(path.sep)
const currentDirectoryName =
  currentDirectoryParts[currentDirectoryParts.length - 1]

const defaultParserOpts = {}

const defaultOptions = {
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.Latest,
  allowUnusedLabels: true,
  allowUnreachableCode: true
}

const reactComponentSymbolNames = [
  "StatelessComponent",
  "Stateless",
  "StyledComponentClass",
  "FunctionComponent"
]

/**
 * Parses a file with default TS options
 * @param filePath component file that should be parsed
 */
function parse(filePathOrPaths, parserOpts = defaultParserOpts) {
  return withCompilerOptions(defaultOptions, parserOpts).parse(filePathOrPaths)
}

/**
 * Constructs a parser for a specified set of TS compiler options.
 */
function withCompilerOptions(compilerOptions, parserOpts = defaultParserOpts) {
  return {
    parse(filePathOrPaths) {
      return parseWithProgramProvider(
        filePathOrPaths,
        compilerOptions,
        parserOpts
      )
    },
    parseWithProgramProvider(filePathOrPaths, programProvider) {
      return parseWithProgramProvider(
        filePathOrPaths,
        compilerOptions,
        parserOpts,
        programProvider
      )
    }
  }
}

const defaultJSDoc = {
  description: "",
  fullComment: "",
  tags: {}
}

const defaultPropFilter = (prop, component) => {
  // skip children property in case it has no custom documentation
  if (prop.name === "children" && prop.description.length === 0) {
    return false
  }
  return true
}

const getComponentSymbolOfType = type => {
  if (type.symbol) {
    const symbolName = type.symbol.getName()
    if (reactComponentSymbolNames.indexOf(symbolName) !== -1) {
      return type.symbol
    }
  }
  if (type.types) {
    for (const innerType of type.types) {
      const componentSymbol = getComponentSymbolOfType(innerType)
      if (componentSymbol) {
        return componentSymbol
      }
    }
  }
}

class Parser {
  constructor(program, opts) {
    this.checker = program.getTypeChecker()
    this.propFilter = defaultPropFilter
  }

  getComponentInfo(
    symbolParam,
    source,
    componentNameResolver = () => undefined
  ) {
    if (!!symbolParam.declarations && symbolParam.declarations.length === 0) {
      return null
    }
    let exp = symbolParam
    const type = this.checker.getTypeOfSymbolAtLocation(
      exp,
      exp.valueDeclaration || exp.declarations[0]
    )
    let commentSource = exp
    if (!exp.valueDeclaration) {
      const componentSymbol = getComponentSymbolOfType(type)
      exp = type.symbol || componentSymbol
      if (!exp) {
        return null
      }
      if (componentSymbol) {
        commentSource = this.checker.getAliasedSymbol(commentSource)
      } else {
        commentSource = exp
      }
    }
    // Skip over PropTypes that are exported
    if (
      type.symbol &&
      (type.symbol.getEscapedName() === "Requireable" ||
        type.symbol.getEscapedName() === "Validator")
    ) {
      return null
    }
    const propsType =
      this.extractPropsFromTypeIfStatelessComponent(type) ||
      this.extractPropsFromTypeIfStatefulComponent(type)
    const resolvedComponentName = componentNameResolver(exp, source)
    const displayName =
      resolvedComponentName || computeComponentName(exp, source)
    const description = this.findDocComment(commentSource).fullComment
    if (propsType) {
      const defaultProps = this.extractDefaultPropsFromComponent(exp, source)
      const props = this.getPropsInfo(propsType, defaultProps)
      for (const propName of Object.keys(props)) {
        const prop = props[propName]
        const component = {name: displayName}
        if (!this.propFilter(prop, component)) {
          delete props[propName]
        }
      }
      return {
        description,
        displayName,
        props
      }
    }
    if (description && displayName) {
      return {
        description,
        displayName,
        props: {}
      }
    }
    return null
  }

  extractPropsFromTypeIfStatelessComponent(type) {
    const callSignatures = type.getCallSignatures()
    if (callSignatures.length) {
      // Could be a stateless component.  Is a function, so the props object we're interested
      // in is the (only) parameter.
      for (const sig of callSignatures) {
        const params = sig.getParameters()
        if (params.length === 0) {
          continue
        }
        // Maybe we could check return type instead,
        // but not sure if Element, ReactElement<T> are all possible values
        const propsParam = params[0]
        if (propsParam.name === "props" || params.length === 1) {
          return propsParam
        }
      }
    }
    return null
  }
  extractPropsFromTypeIfStatefulComponent(type) {
    const constructSignatures = type.getConstructSignatures()
    if (constructSignatures.length) {
      // React.Component. Is a class, so the props object we're interested
      // in is the type of 'props' property of the object constructed by the class.
      for (const sig of constructSignatures) {
        const instanceType = sig.getReturnType()
        const props = instanceType.getProperty("props")
        if (props) {
          return props
        }
      }
    }
    return null
  }
  getPropsInfo(propsObj, defaultProps = {}) {
    if (!propsObj.valueDeclaration) {
      return {}
    }
    const propsType = this.checker.getTypeOfSymbolAtLocation(
      propsObj,
      propsObj.valueDeclaration
    )
    const propertiesOfProps = propsType.getProperties()
    const result = {}
    propertiesOfProps.forEach(prop => {
      const propName = prop.getName()
      // Find type of prop by looking in context of the props object itself.
      const propType = this.checker.getTypeOfSymbolAtLocation(
        prop,
        propsObj.valueDeclaration
      )
      const propTypeString = this.checker.typeToString(propType)
      // tslint:disable-next-line:no-bitwise
      const isOptional = (prop.getFlags() & ts.SymbolFlags.Optional) !== 0
      const jsDocComment = this.findDocComment(prop)
      let defaultValue = null
      if (defaultProps[propName] !== undefined) {
        defaultValue = {value: defaultProps[propName]}
      } else if (jsDocComment.tags.default) {
        defaultValue = {value: jsDocComment.tags.default}
      }
      const parent = getParentType(prop)
      result[propName] = {
        defaultValue,
        description: jsDocComment.fullComment,
        name: propName,
        parent,
        required: !isOptional,
        type: {name: propTypeString}
      }
    })
    return result
  }
  findDocComment(symbol) {
    const comment = this.getFullJsDocComment(symbol)
    if (comment.fullComment) {
      return comment
    }
    const rootSymbols = this.checker.getRootSymbols(symbol)
    const commentsOnRootSymbols = rootSymbols
      .filter(x => x !== symbol)
      .map(x => this.getFullJsDocComment(x))
      .filter(x => !!x.fullComment)
    if (commentsOnRootSymbols.length) {
      return commentsOnRootSymbols[0]
    }
    return defaultJSDoc
  }
  /**
   * Extracts a full JsDoc comment from a symbol, even
   * though TypeScript has broken down the JsDoc comment into plain
   * text and JsDoc tags.
   */
  getFullJsDocComment(symbol) {
    // in some cases this can be undefined (Pick<Type, 'prop1'|'prop2'>)
    if (symbol.getDocumentationComment === undefined) {
      return defaultJSDoc
    }
    let mainComment = ts.displayPartsToString(
      symbol.getDocumentationComment(this.checker)
    )
    if (mainComment) {
      mainComment = mainComment.replace("\r\n", "\n")
    }
    const tags = symbol.getJsDocTags() || []
    const tagComments = []
    const tagMap = {}
    tags.forEach(tag => {
      const trimmedText = (tag.text || "").trim()
      const currentValue = tagMap[tag.name]
      tagMap[tag.name] = currentValue
        ? `${currentValue}\n${trimmedText}`
        : trimmedText
      if (tag.name !== "default") {
        tagComments.push(formatTag(tag))
      }
    })
    return {
      description: mainComment,
      fullComment: `${mainComment}\n${tagComments.join("\n")}`.trim(),
      tags: tagMap
    }
  }
  extractDefaultPropsFromComponent(symbol, source) {
    let possibleStatements = source.statements
      // ensure that name property is available
      .filter(stmt => !!stmt.name)
      .filter(stmt => this.checker.getSymbolAtLocation(stmt.name) === symbol)
    if (!possibleStatements.length) {
      // if no class declaration is found, try to find a
      // expression statement used in a React.StatelessComponent
      possibleStatements = source.statements.filter(stmt =>
        ts.isExpressionStatement(stmt)
      )
    }
    if (!possibleStatements.length) {
      return {}
    }
    const statement = possibleStatements[0]
    if (statementIsClassDeclaration(statement) && statement.members.length) {
      const possibleDefaultProps = statement.members.filter(
        member => member.name && getPropertyName(member.name) === "defaultProps"
      )
      if (!possibleDefaultProps.length) {
        return {}
      }
      const defaultProps = possibleDefaultProps[0]
      let initializer = defaultProps.initializer
      let properties = initializer.properties
      while (ts.isIdentifier(initializer)) {
        const defaultPropsReference = this.checker.getSymbolAtLocation(
          initializer
        )
        if (defaultPropsReference) {
          const declarations = defaultPropsReference.getDeclarations()
          if (declarations) {
            initializer = declarations[0].initializer
            properties = initializer.properties
          }
        }
      }
      let propMap = {}
      if (properties) {
        propMap = this.getPropMap(properties)
      }
      return propMap
    }
    if (statementIsStateless(statement)) {
      let propMap = {}
      const expressionStatement = statement
      expressionStatement.getChildren().forEach(child => {
        const {right} = child
        if (right) {
          const {properties} = right
          if (properties) {
            propMap = this.getPropMap(properties)
          }
        }
      })
      return propMap
    }
    return {}
  }
  getLiteralValueFromPropertyAssignment(property) {
    let {initializer} = property
    // Shorthand properties, so inflect their actual value
    if (!initializer) {
      if (ts.isShorthandPropertyAssignment(property)) {
        const symbol = this.checker.getShorthandAssignmentValueSymbol(property)
        const decl = symbol && symbol.valueDeclaration
        if (decl && decl.initializer) {
          initializer = decl.initializer
        }
      }
    }
    if (!initializer) {
      return null
    }
    // Literal values
    switch (initializer.kind) {
      case ts.SyntaxKind.PropertyAccessExpression:
        return initializer.getText()
      case ts.SyntaxKind.FalseKeyword:
        return "false"
      case ts.SyntaxKind.TrueKeyword:
        return "true"
      case ts.SyntaxKind.StringLiteral:
        return initializer.text.trim()
      case ts.SyntaxKind.PrefixUnaryExpression:
        return initializer.getFullText().trim()
      case ts.SyntaxKind.NumericLiteral:
        return `${initializer.text}`
      case ts.SyntaxKind.NullKeyword:
        return "null"
      case ts.SyntaxKind.Identifier:
        // can potentially find other identifiers in the source and map those in the future
        return initializer.text === "undefined" ? "undefined" : null
      case ts.SyntaxKind.ObjectLiteralExpression:
        // return the source text for an object literal
        return initializer.getText()
      default:
        return null
    }
  }
  getPropMap(properties) {
    const propMap = properties.reduce((acc, property) => {
      if (ts.isSpreadAssignment(property) || !property.name) {
        return acc
      }
      const literalValue = this.getLiteralValueFromPropertyAssignment(property)
      const propertyName = getPropertyName(property.name)
      if (typeof literalValue === "string" && propertyName !== null) {
        acc[propertyName] = literalValue
      }
      return acc
    }, {})
    return propMap
  }
}

function statementIsClassDeclaration(statement) {
  return !!statement.members
}

function statementIsStateless(statement) {
  const children = statement.getChildren()
  for (const child of children) {
    const {left} = child
    if (left) {
      const {name} = left
      if (name.escapedText === "defaultProps") {
        return true
      }
    }
  }
  return false
}

function getPropertyName(name) {
  switch (name.kind) {
    case ts.SyntaxKind.NumericLiteral:
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.Identifier:
      return name.text
    case ts.SyntaxKind.ComputedPropertyName:
      return name.getText()
    default:
      return null
  }
}

function formatTag(tag) {
  let result = `@${tag.name}`
  if (tag.text) {
    result += ` ${tag.text}`
  }
  return result
}

function getTextValueOfClassMember(classDeclaration, memberName) {
  const [textValue] = classDeclaration.members
    .filter(member => ts.isPropertyDeclaration(member))
    .filter(member => {
      const name = ts.getNameOfDeclaration(member)
      return name && name.text === memberName
    })
    .map(member => {
      const property = member
      return property.initializer && property.initializer.text
    })
  return textValue || ""
}

function getTextValueOfFunctionProperty(exp, source, propertyName) {
  const [textValue] = source.statements
    .filter(statement => ts.isExpressionStatement(statement))
    .filter(statement => {
      const expr = statement.expression
      return (
        expr.left &&
        expr.left.name &&
        expr.left.name.escapedText === propertyName
      )
    })
    .filter(statement => {
      const expr = statement.expression
      return expr.left.expression.escapedText === exp.getName()
    })
    .filter(statement => {
      return ts.isStringLiteral(statement.expression.right)
    })
    .map(statement => {
      return statement.expression.right.text
    })
  return textValue || ""
}

function computeComponentName(exp, source) {
  const exportName = exp.getName()
  const statelessDisplayName = getTextValueOfFunctionProperty(
    exp,
    source,
    "displayName"
  )
  const statefulDisplayName =
    exp.valueDeclaration &&
    ts.isClassDeclaration(exp.valueDeclaration) &&
    getTextValueOfClassMember(exp.valueDeclaration, "displayName")
  if (statelessDisplayName || statefulDisplayName) {
    return statelessDisplayName || statefulDisplayName || ""
  }
  if (
    exportName === "default" ||
    exportName === "__function" ||
    reactComponentSymbolNames.indexOf(exportName) !== -1
  ) {
    return getDefaultExportForFile(source)
  }
  return exportName
}

// Default export for a file: named after file
function getDefaultExportForFile(source) {
  const name = path.basename(source.fileName, path.extname(source.fileName))
  const filename =
    name === "index" ? path.basename(path.dirname(source.fileName)) : name
  // JS identifiers must starts with a letter, and contain letters and/or numbers
  // So, you could not take filename as is
  const identifier = filename
    .replace(/^[^A-Z]*/gi, "")
    .replace(/[^A-Z0-9]*/gi, "")
  return identifier.length ? identifier : "DefaultName"
}

function getParentType(prop) {
  const declarations = prop.getDeclarations()
  if (declarations == null || declarations.length === 0) {
    return undefined
  }
  // Props can be declared only in one place
  const {parent} = declarations[0]
  if (!isInterfaceOrTypeAliasDeclaration(parent)) {
    return undefined
  }
  const parentName = parent.name.text
  const {fileName} = parent.getSourceFile()
  const fileNameParts = fileName.split(path.sep)
  const trimmedFileNameParts = fileNameParts.slice()
  while (trimmedFileNameParts.length) {
    if (trimmedFileNameParts[0] === currentDirectoryName) {
      break
    }
    trimmedFileNameParts.splice(0, 1)
  }
  let trimmedFileName
  if (trimmedFileNameParts.length) {
    trimmedFileName = trimmedFileNameParts.join(path.sep)
  } else {
    trimmedFileName = fileName
  }
  return {
    fileName: trimmedFileName,
    name: parentName
  }
}

function isInterfaceOrTypeAliasDeclaration(node) {
  return (
    node.kind === ts.SyntaxKind.InterfaceDeclaration ||
    node.kind === ts.SyntaxKind.TypeAliasDeclaration
  )
}

function parseWithProgramProvider(
  filePathOrPaths,
  compilerOptions,
  parserOpts,
  programProvider
) {
  const filePaths = Array.isArray(filePathOrPaths)
    ? filePathOrPaths
    : [filePathOrPaths]
  const program = programProvider
    ? programProvider()
    : ts.createProgram(filePaths, compilerOptions)
  const parser = new Parser(program, parserOpts)
  const checker = program.getTypeChecker()
  return filePaths
    .map(filePath => program.getSourceFile(filePath))
    .filter(sourceFile => typeof sourceFile !== "undefined")
    .reduce((docs, sourceFile) => {
      const moduleSymbol = checker.getSymbolAtLocation(sourceFile)
      if (!moduleSymbol) {
        return docs
      }
      Array.prototype.push.apply(
        docs,
        checker
          .getExportsOfModule(moduleSymbol)
          .map(exp =>
            parser.getComponentInfo(
              exp,
              sourceFile,
              parserOpts.componentNameResolver
            )
          )
          .filter(comp => comp !== null)
          .filter((comp, index, comps) =>
            comps
              .slice(index + 1)
              .every(innerComp => innerComp.displayName !== comp.displayName)
          )
      )
      return docs
    }, [])
}

module.exports = {parse}
