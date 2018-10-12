// eslint-disable-next-line import/no-unassigned-import
import '@babel/polyfill'
import fs from 'fs'
import yml from 'js-yaml'
import config from 'config'
import debug from '@watchmen/debug'
import {getArg} from '@watchmen/helpr/dist/args'
import {exec} from './helper'
import installer from './installer'

const dbg = debug(__filename)

exec('pwd')

const manifestFile = `${config.root}/${config.manifest}`

const version = getArg('v')

if (version) {
  const pkg = require('../package.json')
  console.log(`${pkg.name}: ${pkg.version}`)
} else {
  try {
    const manifest = yml.safeLoad(fs.readFileSync(manifestFile, 'utf8'))
    installer({manifest})
  } catch (error) {
    dbg('caught: error=%o', error)
    throw error
  }
}
