import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import _ from 'lodash'
import yargs from 'yargs'
import dayjs from 'dayjs'

exports.command = 'script <name>'
exports.desc = 'Generate a zignis script file'

exports.builder = function(yargs: yargs.Argv) {
  // yargs.option('option', {default, describe, alias})
}

exports.handler = function(
  argv: yargs.Arguments & {
    scriptDir: string
    name: string
  }
) {
  if (!argv.scriptDir || !fs.existsSync(argv.scriptDir)) {
    console.log(chalk.red('"scriptDir" missing in config file or not exist in current directory!'))
    return
  }

  const filePrefix = dayjs().format('YYYYMMDDHHmmssSSS')
  const scriptFile = path.resolve(argv.scriptDir, `${filePrefix}_${_.kebabCase(argv.name)}.js`)
  if (fs.existsSync(scriptFile)) {
    console.log(chalk.red('Scritp file exist!'))
    return
  }

  const code = `
exports.builder = function (yargs) {
  // yargs.option('option', {default, describe, alias})
}

exports.handler = async function (argv) {
  console.log('Start to draw your dream code!')
  process.exit(0)
}
`
  if (!fs.existsSync(scriptFile)) {
    fs.writeFileSync(scriptFile, code)
    console.log(chalk.green(`${scriptFile} created!`))
  }
}