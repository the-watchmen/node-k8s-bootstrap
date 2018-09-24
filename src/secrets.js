import assert from 'assert'
import fs from 'fs'
import config from 'config'
import {getKeyValueArgs} from './helper'

const strategies = {
  local: {
    get: ({source}) => fs.readFileSync(source, 'utf8').trim(),
    source: ({name, key}) => `${config.root}/${config.secret.root}/${name}/${key}`
  }
}

const strategy = getStrategy({key: config.secret.strategy})

export function getStrategy({key}) {
  return strategies[key]
}

export function getSecret({source}) {
  return strategy.get({source})
}

export function getSecretArgs({name, secrets}) {
  if (!secrets) return ''

  const args = secrets.map(elt => {
    const {key, source} = elt
    assert(key)
    return {
      key,
      value: getSecret({source: source || strategy.source({name, key})})
    }
  })

  return getKeyValueArgs({flag: 'set', args})
}

export function getSecretFileArgs({name, secrets}) {
  if (!secrets) return ''

  const args = secrets.map(elt => {
    const {key, source} = elt
    assert(key)
    return {
      key,
      value: source || strategy.source({name, key})
    }
  })

  return getKeyValueArgs({flag: 'set-file', args})
}
