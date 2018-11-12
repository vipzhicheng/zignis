const co = require('co')
const path = require('path')
const Utils = require('../common/utils')

exports.command = 'script [file]'
exports.alias = 'scr'
exports.desc = 'Execute a script'

exports.builder = function (yargs) {}

exports.handler = function (argv) {
  co(function * () {
    const components = yield Utils.invokeHook('components')
    yield require(path.resolve(process.cwd(), argv.file))(components)
  })
}
