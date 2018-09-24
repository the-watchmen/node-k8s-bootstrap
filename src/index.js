// eslint-disable-next-line import/no-unassigned-import
import '@babel/polyfill'
import fs from 'fs'
import yml from 'js-yaml'
import config from 'config'
import debug from '@watchmen/debug'
import installer from './installer'

const dbg = debug(__filename)

const manifestFile = `${config.root}/${config.manifest}`

try {
  const manifest = yml.safeLoad(fs.readFileSync(manifestFile, 'utf8'))
  installer({manifest})
} catch (error) {
  dbg('caught: error=%o', error)
  throw error
}
