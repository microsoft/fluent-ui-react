import { spawn } from 'child_process'

const sh = (command: string) => {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')

    const options = {
      cwd: process.cwd(),
      env: process.env,
      stdio: [0, 1, 2],
      shell: true,
    }

    const child = spawn(cmd, args, options)

    child.on('close', code => {
      if (code === 0) {
        resolve()
      }

      reject(new Error(`child process exited with code ${code}`))
    })
  })
}

export default sh
