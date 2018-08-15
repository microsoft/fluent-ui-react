import { spawn } from 'child_process'

const sh = (command, cb) => {
  const [cmd, ...args] = command.split(' ')

  const options = {
    cwd: process.cwd(),
    env: process.env,
  }

  const child = spawn(cmd, args, options)

  child.stdout.on('data', data => {
    console.log(data.toString())
  })

  child.stderr.on('data', data => {
    console.error(data.toString())
  })

  child.on('close', code => {
    if (code === 0) return cb()

    cb(new Error(`child process exited with code ${code}`))
  })
}

export default sh
