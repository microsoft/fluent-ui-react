import * as fs from 'fs'
import { task } from 'gulp'
import * as path from 'path'
import sh from '../sh'

import * as crypto from 'crypto'

import debug from 'debug'

import config from '../../../config'

const { paths } = config

const SCAN_RESULTS_DIR = paths.base('.vuln-scans')

const log = message => debug.log(message)
log.success = message => debug.log(`✔ ${message}`)

const computeHash = filePath => {
  const md5 = crypto.createHash('md5')
  md5.update(fs.readFileSync(paths.base('yarn.lock')))

  return md5.digest('hex')
}

const ensureDirExists = path => {
  if (!fs.existsSync(path)) {
    sh(`mkdir -p ${path}`)
  }
}

const getTodayScanFilePath = () => {
  const yarnLockHash = computeHash(paths.base('yarn.lock'))
  const now = new Date()

  const fileName = `snyk-scanned-${now.getUTCFullYear()}-${now.getUTCMonth() +
    1}-${now.getUTCDate()}-${yarnLockHash.slice(0, 8)}`

  return path.resolve(SCAN_RESULTS_DIR, fileName)
}

const recentlyChecked = () => {
  const recentCheckFilePath = getTodayScanFilePath()
  return fs.existsSync(recentCheckFilePath)
}

const registerRecentSucessfulScan = async () => {
  ensureDirExists(SCAN_RESULTS_DIR)

  const recentScanFilePath = getTodayScanFilePath()
  await sh(`touch ${recentScanFilePath}`)
}

/**
 * The following strategy is used to perform vulnerabilites scan
 * - check if there is marker of recent sucessful scan
 * - if this marker exists, skip checks
 * - if there is no marker, perform check
 * - if check is successful, create successful check marker
 */
task('test:vulns', async () => {
  if (recentlyChecked()) {
    log.success('Vulnerabilities check was already performed recently, skipping..')
    return
  }

  log('Scanning dependency packages for vulnerabilities..')
  await sh(`yarn snyk test`)
  log.success('Vulnerability scan is successfully passed.')

  registerRecentSucessfulScan()
})
