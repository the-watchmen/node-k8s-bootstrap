import test from 'ava'
import debug from '@watchmen/debug'
import {oneLine, oneLineTrim, stripIndents} from 'common-tags'

const dbg = debug(__filename)

test('one-line', t => {
  const msg = oneLine`this
  should
  do
  my
  bidding`
  dbg('msg=%o', msg)
  t.is(msg, 'this should do my bidding')
})

test('one-line-trim', t => {
  const one = 'should'
  const two = 'my'
  const msg = oneLineTrim`this
  ${one}
  do
  ${two}
  bidding`
  dbg('msg=%o', msg)
  t.is(msg, 'thisshoulddomybidding')
})

test('strip-indents', t => {
  const one = 'should'
  const two = 'my'
  // eslint-disable-next-line no-use-extend-native/no-use-extend-native
  const msg = stripIndents`${oneLine`this
  ${one}
  do
  ${two}
  bidding`}`
  dbg('msg=%o', msg)
  t.is(msg, 'this should do my bidding')
})
