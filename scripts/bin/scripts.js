#!/usr/bin/env node
const { addResolvePath } = require('just-scripts')
const path = require('path')
addResolvePath(path.dirname(__dirname))

require('just-scripts/lib/cli.js')
