import * as path from 'path'
const g = require('gulp-load-plugins')()

type BasePathProvider = {
  base: (relativePath: string) => string
}

type Config = {
  forImportStartsWith: string
  paths: BasePathProvider
}

type Transform<From, To> = (from: From) => To

const replace = (line: string, what: RegExp, how: Transform<RegExpExecArray, string>) => {
  let replacedLine = line

  let match = what.exec(line)
  while (match != null) {
    const replacement = how(match)
    replacedLine = replacedLine.replace(match[0], replacement)
    match = what.exec(line)
  }

  return replacedLine
}

const replaceInlinedImportPaths = (content: string, how: Transform<string, string>) => {
  const InlinedImportRegexp = /import\(['"]([^.].*?)['"]\)/g

  return content
    .split('\n')
    .map(line =>
      replace(line, InlinedImportRegexp, match => {
        const originalImportStatement = match[0]
        const originalImportPath = match[1]

        if (!originalImportPath) {
          return originalImportStatement
        }

        const modifiedImportPath = how(originalImportPath)
        return originalImportStatement.replace(originalImportPath, modifiedImportPath)
      }),
    )
    .join('\n')
}

export default ({ forImportStartsWith, paths }: Config) =>
  g.transform('utf8', (content, file) => {
    const originalSrcFilePath = file.path

    const contentWithReplacement = replaceInlinedImportPaths(content, importPath => {
      if (forImportStartsWith && !importPath.startsWith(forImportStartsWith)) {
        return importPath
      }

      const absoluteSrcImportPath = paths.base(importPath)

      return path.relative(path.dirname(originalSrcFilePath), absoluteSrcImportPath)
    })

    return contentWithReplacement
  })
