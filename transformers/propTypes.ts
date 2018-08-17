import * as _ from 'lodash'
import * as ts from 'typescript'

const getPropsTypeName = (node: ts.ClassDeclaration): string => {
  if (node.heritageClauses.length > 1) {
    throw new Error('"ClassDeclaration" contains more that one "HeritageClause"')
  }

  const clause = node.heritageClauses[0]
  const types = clause.types

  if (types.length > 1) {
    throw new Error('"HeritageClause" contains more that one "ExpressionWithTypeArguments"')
  }

  const typeExpression: ts.ExpressionWithTypeArguments = types[0]
  const typeArguments = typeExpression.typeArguments

  return typeArguments[0].getText()
}

const isComponentDeclaration = (node: ts.ClassDeclaration): boolean =>
  _.some(node.heritageClauses, (clause: ts.HeritageClause) =>
    _.some(
      clause.types,
      (type: ts.ExpressionWithTypeArguments) =>
        type.expression.kind === ts.SyntaxKind.Identifier &&
        (type.expression as ts.Identifier).text === 'UIComponent',
    ),
  )

const propTypes = (program: ts.Program) => {
  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      let propsTypeName: string
      const interfaces: ts.InterfaceDeclaration[] = []

      sourceFile.forEachChild((node: ts.Node) => {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
          if (isComponentDeclaration(<ts.ClassDeclaration>node)) {
            propsTypeName = getPropsTypeName(<ts.ClassDeclaration>node)
          }
        }

        if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
          const interfaceDeclaration = node as ts.InterfaceDeclaration

          if (_.endsWith(interfaceDeclaration.name.text, 'Props')) {
            interfaces.push(interfaceDeclaration)
          }
        }
      })

      if (propsTypeName) {
        const propsInterface: ts.InterfaceDeclaration = _.find(
          interfaces,
          (propInterface: ts.InterfaceDeclaration) => propInterface.name.text === propsTypeName,
        )

        if (propsInterface) {
          const props = []

          propsInterface.members.forEach((node: ts.PropertySignature) => {
            props.push(node.name.getText())
          })

          const propTypes = ts.createObjectLiteral(
            props.map(prop =>
              ts.createPropertyAssignment(
                prop,
                ts.createPropertyAccess(ts.createIdentifier('PropTypes'), 'bool'),
              ),
            ),
          )

          sourceFile.statements = ts.createNodeArray([
            ...sourceFile.statements,
            ts.createExpressionStatement(
              ts.createBinary(
                ts.createPropertyAccess(ts.createIdentifier('Image'), 'propTypes'),
                ts.createToken(ts.SyntaxKind.EqualsToken),
                propTypes,
              ),
            ),
          ])

          console.log(propsTypeName, props)
        }
      }

      return sourceFile
    }
  }
}

export default propTypes
