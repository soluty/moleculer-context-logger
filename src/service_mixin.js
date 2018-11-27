const { getLogger } = require('./logger')
const base64id = require('base64id')

module.exports = {
  hooks: {
    before: {
      '*' (ctx) {
        ctx.meta.requestID = ctx.meta.requestID || base64id.generateId()
        ctx.logger = getLogger(ctx)
        if(ctx.options && ctx.options.parentCtx) {
          ctx.meta.caller = ctx.options.parentCtx.service.name
        }
        ctx.logger.debug('before action', ctx.action.name, 'caller is', ctx.meta.caller)
      },
    },
    after: {
      '*' (ctx, res) {
        ctx.logger.debug('after action', ctx.action.name)
        ctx.logger = null
        return res
      },
    },
    error: {
      '*' (ctx, err) {
        ctx.logger.debug('error action', ctx.action.name)
        ctx.logger = null
        throw err
      },
    },
  },
}
