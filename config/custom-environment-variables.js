const prefix = 'K8S_BOOT'

module.exports = {
  root: `${prefix}_ROOT`,
  manifest: `${prefix}_MANIFEST`,
  namespace: `${prefix}_NAMESPACE`,
  dryRun: `${prefix}_DRY_RUN`,
  force: `${prefix}_FORCE`,
  wait: `${prefix}_WAIT`,
  secret: {
    root: `${prefix}_SECRET_ROOT`,
    strategy: `${prefix}_SECRET_STRATEGY`
  },
  values: {
    root: `${prefix}_VALUES_ROOT`
  },
  helm: {
    // command: 'helm',
    command: `${prefix}_HELM_COMMAND`,
    repo: `${prefix}_HELM_REPO`
  }
}
