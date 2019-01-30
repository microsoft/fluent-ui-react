import { spawn } from 'child_process'

const sh = (command: string, pipeOutputToResult: boolean = false): Promise<string> => {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')

    const options = {
      cwd: process.cwd(),
      env: process.env,
      stdio: pipeOutputToResult ? 'pipe' : [0, 1, 2],
      shell: true,
    }

    const child = spawn(cmd, args, options)

    let stdoutData = ''

    if (child.stdout) {
      child.stdout.on('data', data => {
        stdoutData += data
      })
    }

    child.on('close', code => {
      if (code === 0) {
        resolve(stdoutData)
      }

      reject(
        new Error(
          [`${stdoutData}`, `-`.repeat(80), `ERROR: Child process exited with code ${code}`].join(
            '\n',
          ),
        ),
      )
    })
  })
}

export default sh
