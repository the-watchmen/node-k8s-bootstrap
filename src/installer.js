import config from 'config'
import debug from '@watchmen/debug'
import {pretty} from '@watchmen/helpr'
import applyCharts from './apply-charts'
import {exec} from './helper'

const dbg = debug(__filename)

export default function({manifest}) {
  dbg('config=\n%s', pretty(config))
  dbg('manifest=\n%s', pretty(manifest))

  const {namespace} = config
  try {
    exec(`kubectl create namespace ${namespace}`)
  } catch (error) {
    if (error.message.includes('AlreadyExists')) {
      dbg('namespace=%o already exists, continuing...', namespace)
    } else {
      throw error
    }
  }

  const {charts} = manifest
  applyCharts({namespace, charts})

  dbg('end')
}
