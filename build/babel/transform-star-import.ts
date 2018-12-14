import * as T from '@babel/types'
import { BabelPlugin } from './types'

/**
 * Creates an default import:
 * - import React from 'react'
 */
const createDefaultImportDeclaration = (
  t: typeof T,
  declaration: T.ImportDeclaration,
  specifier: T.ImportNamespaceSpecifier,
): T.ImportDeclaration =>
  t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(specifier.local.name))],
    t.stringLiteral(declaration.source.value),
  )

const startImportToDefault: BabelPlugin = ({ types: t }) => ({
  visitor: {
    ImportDeclaration: path => {
      const { specifiers } = path.node
      const specifier = specifiers[0]

      if (specifiers.length === 1 && t.isImportNamespaceSpecifier(specifier)) {
        path.replaceWith(createDefaultImportDeclaration(t, path.node, specifier))
      }
    },
  },
})

export default startImportToDefault
