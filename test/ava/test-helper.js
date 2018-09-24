import test from 'ava'
import {getArgs, getKeyValueArgs} from '../../src/helper'

test('getArgs', t => {
  t.is(getArgs({flag: 'foo', args: ['bar', 'baz']}), '--foo "bar" --foo "baz"')
})

test('getKeyValueArgs', t => {
  t.is(
    getKeyValueArgs({flag: 'foo', args: [{key: 'bar', value: 'baz'}, {key: 'bip', value: 'bop'}]}),
    '--foo "bar=baz" --foo "bip=bop"'
  )
})
