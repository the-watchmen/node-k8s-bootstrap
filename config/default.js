module.exports = {
  root: '.',
  manifest: 'inception.yaml',
  namespace: 'inception-system',
  dryRun: false,
  // force: // https://github.com/helm/helm/issues/3208
  force: true,
  wait: true,
  secret: {
    root: 'secrets',
    strategy: 'local'
  },
  values: {
    root: 'values'
  },
  helm: {
    // command: 'helm',
    command: 'helm tiller run helm',
    repo: 'https://kubernetes-charts.storage.googleapis.com'
  }
}
