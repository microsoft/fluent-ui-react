import * as _ from 'lodash'
import * as ts from 'typescript'

const getPropsType = (node: ts.ClassDeclaration) => {
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

  // @ts-ignore
  const propsType = typeArguments[0] as ts.TypeReference

  typeArguments.forEach((typeArgument: ts.TypeReferenceNode) => {
    console.log(typeArgument)
  })
}

const isComponentDeclaration = (node: ts.ClassDeclaration) =>
  _.some(node.heritageClauses, (clause: ts.HeritageClause) =>
    _.some(
      clause.types,
      (type: ts.ExpressionWithTypeArguments) =>
        type.expression.kind === ts.SyntaxKind.Identifier &&
        (type.expression as ts.Identifier).text === 'UIComponent',
    ),
  )

const visitNode = (node: ts.Node) => {
  if (node.kind === ts.SyntaxKind.ClassDeclaration) {
    const classDeclaration = node as ts.ClassDeclaration

    if (isComponentDeclaration(classDeclaration)) {
      getPropsType(classDeclaration)
      // console.log(getPropsType(classDeclaration))
    }

    return
  }

  node.forEachChild(visitNode)
}

const propTypes = (program: ts.Program) => {
  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      sourceFile.forEachChild(visitNode)

      return sourceFile
    }
  }
}

export default propTypes
