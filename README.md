# moleculer-context-logger
给 moleculer项目的ctx 添加 logger，满足项目的requestID需求

可以通过ctx.logger.info打印日志, 满足使用moleculer的微服务项目中请求ID的需求

nodejs版本 >= 8.0

## 如何使用
npm install moleculer-context-logger

### 在一般service的schema文件中
```
const { ContextLoggerServiceMixin } = require('moleculer-context-logger')

module.exports = {
  mixins: [ ContextLoggerServiceMixin ]
}
```
给ctx添加了ctx.logger对象，所以在action中可以直接类似this.logger
```
ctx.logger.info('some log')
```

### 在应用了moleculer官方提供的api网关mixin的service的schema文件中
```
const ApiGateway = require('moleculer-web')
const { ContextLoggerApiMixin } = require('moleculer-context-logger')
module.exports = {
  mixins: [ ApiGateway, ContextLoggerServiceMixin ]
}
```
在routes的aliases函数里面
```
'POST someurl' (req, res) {
  let ctx = req.$ctx
  ctx.logger.info('some log')
}
```
