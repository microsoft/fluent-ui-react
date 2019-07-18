import { spawnSync } from 'child_process'

import config from '../../../../config'

const { paths } = config

const getRuntimeDependencies = () => {
  const dependencyRegex = /^dependency:\s+(.*)$/
  const result = spawnSync("yarn gulp test:dependencies:list --prefix='dependency: '", {
    shell: true,
    cwd: paths.base(),
    stdio: 'pipe',
    encoding: 'utf-8',
  })

  const output = `${result.stdout}`
  const error = `${result.stderr}`

  if (error) {
    throw new Error(error)
  }

  return output
    .split('\n')
    .map(line => line.match(dependencyRegex))
    .filter(match => !!match)
    .map(match => match[1])
}

export default getRuntimeDependencies
