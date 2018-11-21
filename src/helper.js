import child from 'child_process'
import config from 'config'
import yn from 'yn'
import debug from '@watchmen/debug'
import {pretty} from '@watchmen/helpr'
import {getArg, getRequiredArg} from '@watchmen/helpr/dist/args'
import {oneLine} from 'common-tags'

const dbg = debug(__filename)

const cloneRoot = `${config.root}/clone`

export function exec(cmd) {
  const _cmd = oneLine(cmd)
  dbg('cmd=[%o]', _cmd)
  let out
  try {
    out = child.execSync(_cmd)
    process.stdout.write(out)
  } catch (error) {
    dbg(
      'caught: status=%o, message=%o, stdout=%o, stderr=%o',
      error.status,
      error.message,
      error.stdout,
      error.stderr
    )
    throw error
  }
  const lines = out.toString().split('\n')
  dbg('result=\n%s', pretty(lines))
  return lines
}

export function clone({repo}) {
  exec(`rm -rf ${cloneRoot}`)
  exec(`git clone ${repo} ${cloneRoot}`)
  return cloneRoot
}

export function apply({namespace, specs}) {
  exec(
    `kubectl apply
    ${yn(config.force) ? '--force' : ''}
    ${yn(config.wait) ? '--wait' : ''}
    ${yn(config.dryRun) ? '--dry-run' : ''}
    --namespace ${namespace}
    -f ${specs}`
  )
}

// pass:
//
// {
//   flag: 'flag-1',
//   args: [
//     'val-1',
//     'val-2',
//     'val-3'
//   ]
// }
//
// return:
//
// '--flag-1 val-1 --flag-1 val-2 --flag-1 val-3'
//
export function getArgs({flag, args}) {
  const _args = args || []
  return _args.map(arg => `--${flag} "${arg}"`).join(' ')
}

// pass:
//
// {
//   flag: 'flag-1',
//   args: [
//     {
//       key: 'key-1',
//       value: 'val-1'
//     },
//     {
//       key: 'key-2',
//       value: 'val-2'
//     },
//     {
//       key: 'key-3'
//     }
//   ]
// }
//
// return:
//
// '--flag-1 key-1=val-1 --flag-1 key-2=val-2 --flag-1 key-3=true'
//
export function getKeyValueArgs({flag, args}) {
  return getArgs({
    flag,
    args:
      args &&
      args.map(arg => {
        const {key, value, env} = arg
        let _value
        if (env) {
          _value = value ? getArg(env, {dflt: value}) : getRequiredArg(env)
        } else {
          _value = value || 'true'
        }
        return `${key}=${_value}`
      })
  })
}

export function ymlSuffix(file) {
  return `${file}.${config.suffix}`
}
