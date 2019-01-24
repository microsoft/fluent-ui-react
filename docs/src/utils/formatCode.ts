import prettier from 'prettier/standalone'
import prettierConfig from '../../../.prettierrc.json'

delete prettierConfig.$schema
delete prettierConfig.overrides

// Heads up!
// Please use this function directly and don't reexport it in utils.
// https://github.com/prettier/prettier/issues/4959

const formatCode = (code: string, parser = 'babylon') => {
  if (!code) return ''

  const formatted = prettier.format(code, {
    ...prettierConfig,
    // a narrower print width is more friendly to doc examples
    parser,
    plugins: window.prettierPlugins,
  })

  return formatted.replace(/^;</, '<') // remove beginning semi in JSX/HTML
}

export default formatCode
