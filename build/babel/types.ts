import * as T from '@babel/types'
import { NodePath } from '@babel/traverse'

export type BabelPluginArguments = {
  types: typeof T
}

type BabelPluginVisitorFunction<T> = (path: NodePath<T>) => void
type BabelPluginVisitor<T> =
  | BabelPluginVisitorFunction<T>
  | {
      exit: BabelPluginVisitorFunction<T>
    }

export type BabelPlugin = (
  options: BabelPluginArguments,
) => {
  visitor: {
    ImportDeclaration: BabelPluginVisitor<T.ImportDeclaration>
  }
}
