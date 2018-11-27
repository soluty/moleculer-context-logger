const { Logger } = require('moleculer')
const util = require('util')

module.exports = {
  getLogger (ctx) {
    let service = ctx.service
    let broker = service.broker
    let schema = service.schema
    let bindings = {
      nodeID: broker.nodeID,
      ns: broker.namespace,
      mod: service.fullName,
      svc: service.name,
      ver: service.version,
      requestID: ctx.meta.requestID,
    }
    // 函数, 适合pino.js之类
    if(util.isFunction(schema.logger))
      return schema.logger.call(this, bindings)
    // External logger
    if(util.isObject(schema.logger) && schema.logger !== console)
      return Logger.extend(schema.logger)
    // Disable logging
    if(schema.logger === false)
      return Logger.createDefaultLogger()
    bindings.mod = `${bindings.mod}[${ctx.meta.requestID}]`
    return Logger.createDefaultLogger(console, bindings, schema.logLevel || 'info', schema.logFormatter, schema.logObjectPrinter)
  }
}
