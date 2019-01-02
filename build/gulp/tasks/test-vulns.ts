import * as fs from 'fs'
import { task } from 'gulp'
import * as path from 'path'
import debug from 'debug'

import config from '../../../config'
import sh from '../sh'

const { paths } = config

const SCAN_RESULTS_DIR_NAME = '.vuln-scans'
const SCAN_RESULTS_DIR_PATH = paths.base(SCAN_RESULTS_DIR_NAME)

const log = message => debug.log(message)
log.success = message => debug.log(`✔ ${message}`)

const ensureDirExists = path => {
  if (!fs.existsSync(path)) {
    sh(`mkdir -p ${path}`)
  }
}

const getTodayScanFilePath = () => {
  const now = new Date()

  const year = now.getUTCFullYear()
  const month = now.getUTCMonth() + 1
  const date = now.getUTCDate()

  const fileName = `snyk-scanned-${year}-${month}-${date}`

  return path.resolve(SCAN_RESULTS_DIR_PATH, fileName)
}

const recentlyChecked = () => {
  const recentCheckFilePath = getTodayScanFilePath()
  return fs.existsSync(recentCheckFilePath)
}

const registerRecentSucessfulScan = async () => {
  ensureDirExists(SCAN_RESULTS_DIR_PATH)

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
