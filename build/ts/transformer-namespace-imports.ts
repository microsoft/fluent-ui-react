import * as ts from 'typescript'

type Options = {
  moduleNames: string[]
}

/**
 * A factory that creates ES default import, i.e: import _ from 'lodash'
 */
const createDefaultImport = (importName: string, moduleName: string) =>
  ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(ts.createIdentifier(importName), undefined),
    ts.createStringLiteral(moduleName),
  )

/**
 * A functions transforms ES import to default if it's required:
 *   import * as _ from 'lodash'   - will be transformed
 *   import { pick } from 'lodash' - will be skipped
 *   import _ from 'lodash'        - will be skipped
 */
const transformImportIfRequired = (
  node: ts.ImportDeclaration,
  moduleNames: string[],
): ts.ImportDeclaration => {
  const importClause = node.importClause
  // Heads up!
  // We need there slice quoutes: 'color' => color
  const importName = node.moduleSpecifier.getText().slice(1, -1)
  const includes = moduleNames.indexOf(importName) !== -1

  if (includes && ts.isNamespaceImport(importClause.namedBindings)) {
    return createDefaultImport(importClause.namedBindings.name.text, importName)
  }

  return node
}

const createTransformer = (
  options: Partial<Options> = {},
): ts.TransformerFactory<ts.SourceFile> => {
  return (context: ts.TransformationContext) => {
    return (node: ts.SourceFile) => {
      const visitor: ts.Visitor = (node: ts.Node) => {
        if (ts.isImportDeclaration(node)) {
          return transformImportIfRequired(node, options.moduleNames)
        }

        return ts.visitEachChild(node, visitor, context)
      }

      return ts.visitNode(node, visitor)
    }
  }
}

export default createTransformer
