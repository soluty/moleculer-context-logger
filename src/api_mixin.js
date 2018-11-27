const base64id = require('base64id')
const { getLogger } = require('./logger')

module.exports = {
  hooks: {
    before: {
      rest (ctx) {
        let req = ctx.params.req
        let requestID = req.headers[ 'x-request-id' ]
        if(req.headers[ 'x-correlation-id' ]) requestID = req.headers[ 'x-correlation-id' ]
        if(!requestID) {
          if(!ctx.requestID) {
            ctx.meta.requestID = base64id.generateId()
          }
        } else {
          ctx.meta.requestID = requestID
        }
        ctx.logger = getLogger(ctx)
        ctx.logger.debug('request start......')
      },
    },
    after: {
      rest (ctx, res) {
        ctx.logger.debug('request end......')
        ctx.logger = null
        return res
      },
    },
    error: {
      rest (ctx, err) {
        ctx.logger.error('request error......', err.name, ':', err.message, '\n', err.stack, '\nData:', err.data)
        ctx.logger = null
        throw err
      },
    },
  },
}
