// TODO: Rename providerOptions to providers.
exports.getUppyOptions = () => {
  return {
    providerOptions: {
      google: {
        key: process.env.UPPYSERVER_GOOGLE_KEY,
        secret: process.env.UPPYSERVER_GOOGLE_SECRET
      },
      dropbox: {
        key: process.env.UPPYSERVER_DROPBOX_KEY,
        secret: process.env.UPPYSERVER_DROPBOX_SECRET
      },
      instagram: {
        key: process.env.UPPYSERVER_INSTAGRAM_KEY,
        secret: process.env.UPPYSERVER_INSTAGRAM_SECRET
      },
      s3: {
        key: process.env.UPPYSERVER_AWS_KEY,
        secret: process.env.UPPYSERVER_AWS_SECRET,
        bucket: process.env.UPPYSERVER_AWS_BUCKET,
        region: process.env.UPPYSERVER_AWS_REGION
      }
    },
    server: {
      host: process.env.UPPYSERVER_DOMAIN,
      protocol: process.env.UPPYSERVER_PROTOCOL,
      path: process.env.UPPYSERVER_PATH || process.env.UPPYSERVER_IMPLICIT_PATH,
      oauthDomain: process.env.UPPYSERVER_OAUTH_DOMAIN,
      validHosts: (process.env.UPPYSERVER_DOMAINS || process.env.UPPYSERVER_DOMAIN).split(',')
    },
    filePath: process.env.UPPYSERVER_DATADIR,
    redisUrl: process.env.UPPYSERVER_REDIS_URL,
    sendSelfEndpoint: process.env.UPPYSERVER_SELF_ENDPOINT
  }
}

exports.validateConfig = () => {
  const mandatoryOptions = [
    'UPPYSERVER_SECRET',
    'UPPYSERVER_DATADIR',
    'UPPYSERVER_DOMAIN'
  ]
  const unspecified = []

  mandatoryOptions.forEach((i) => {
    if (!process.env[i]) unspecified.push(i)
  })
  if (unspecified.length) {
    console.error('\x1b[31m', 'Please specify the following environment ',
      'variables to run uppy-server as Standalone: ', unspecified.join(','), '\x1b[0m')
    process.exit(1)
  }
}