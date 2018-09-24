import test from 'ava'
import config from 'config'
import {getStrategy} from '../../src/secrets'

test('secrets: local', t => {
  const strategy = getStrategy({key: 'local'})
  const source = strategy.source({name: 'name-1', key: 'secret-1'})
  t.is(source, `${config.root}/${config.secret.root}/name-1/secret-1`)
  const secret = strategy.get({source})
  t.is(secret, 's3cret')
})
