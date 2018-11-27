import * as fs from 'fs'
import * as crypto from 'crypto'

import config from '../../../../config'

export const getInfoChecksum = (filename: string): string | null => {
  try {
    const buffer = fs.readFileSync(config.paths.docsSrc('componentInfo', filename))
    const componentInfo = JSON.parse(buffer.toString())

    return componentInfo.checksum
  } catch (e) {}

  return null
}

export const getBufferChecksum = (buffer: Buffer): string =>
  crypto
    .createHash('md5')
    .update(buffer)
    .digest('hex')
