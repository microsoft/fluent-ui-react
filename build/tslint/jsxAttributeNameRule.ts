import * as Lint from 'tslint'
import * as ts from 'typescript'

const JSX_ATTRIBUTES_WITH_DASH = [/^aria-[^-]+$/, /^data-.+$/]

const createFailureMessage = (jsxAttributeName: string) => {
  return `JSX attribute name is invalid: ${jsxAttributeName}`
}

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()))
  }
}

// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
  public visitJsxAttribute(node: ts.JsxAttribute) {
    const jsxAttributeName = `${node.name.escapedText}`

    if (
      jsxAttributeName.includes('-') &&
      !JSX_ATTRIBUTES_WITH_DASH.some(pattern => pattern.test(jsxAttributeName))
    ) {
      this.addFailure(
        this.createFailure(
          node.getStart(),
          node.getWidth(),
          createFailureMessage(jsxAttributeName),
        ),
      )
    }
    super.visitJsxAttribute(node)
  }
}
