function sync(registry, name, callback) {
  let url = name + '/sync?'
  url += querystring.stringify({
    publish,
    nodeps,
  })
  console.log('sync %s, PUT %s/%s', name, registry, url)
  const realRegistry =
    registry === 'https://registry.npmmirror.com'
      ? 'https://registry-direct.npmmirror.com'
      : registry
  request(
    {
      method: 'PUT',
      path: url,
      data: {},
    },
    {
      registry: realRegistry,
      configFile: argv.userconfig,
    },
    function (err, result, data, res) {
      if (err) {
        return callback(err)
      }
      if (res.statusCode === 404 || !result || !result.ok) {
        if (result.reason) {
          console.error(
            '[%s] %s: %s',
            res.statusCode,
            result.error,
            result.reason,
          )
        }
        return callback(null, {
          ok: false,
          statusCode: res.statusCode,
          result,
          data,
        })
      }
      const syncInfo = {
        name,
        lastLines: 0,
        logurl: name + '/sync/log/' + result.logId,
      }
      console.log(
        'logurl: %s/sync/%s#logid=%s',
        registrywebs[registry],
        name,
        result.logId,
      )
      showlog(registry, syncInfo, function (err) {
        if (err) {
          return callback(err)
        }
        callback(null, { ok: true })
      })
    },
  )
}
