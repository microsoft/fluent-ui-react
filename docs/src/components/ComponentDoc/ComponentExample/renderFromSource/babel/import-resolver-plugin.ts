export const resolverId = '__resolverFn__'

const createVariableDeclaration = (t, specifier, source) =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(specifier.local.name),
      t.callExpression(t.identifier(resolverId), [t.stringLiteral(source.value)]),
    ),
  ])

const createDestructedDeclaration = (t, specifier, source) =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.objectPattern([
        t.objectProperty(
          t.identifier(specifier.imported.name),
          t.identifier(specifier.local.name),
          false,
          true,
        ),
      ]),
      t.callExpression(t.identifier(resolverId), [t.stringLiteral(source.value)]),
    ),
  ])

const importResolverPlugin = ({ types: t }) => ({
  visitor: {
    ImportDeclaration: path => {
      const replacements = path.node.specifiers.map(specifier => {
        if (t.isImportDefaultSpecifier(specifier) || t.isImportNamespaceSpecifier(specifier)) {
          return createVariableDeclaration(t, specifier, path.node.source)
        }

        if (t.isImportSpecifier(specifier)) {
          return createDestructedDeclaration(t, specifier, path.node.source)
        }

        return null
      })

      path.replaceWithMultiple(replacements)
    },
  },
})

export default importResolverPlugin
