const debug = require('debug')('index')
// find the first .,.js
function commandList (commandDefs) {
    function commandArray (commandDefs, prefix) {
        let commands = []
        for (let commandAlias in commandDefs) {
            let commandDef = commandDefs[commandAlias]
            if (typeof commandDef !== 'object') {
                if (typeof commandDef === 'string' || typeof commandDef === 'function') {
                    commandDef = { command: commandDef }
                }
            }
            commandDef = Object.assign({ prefix, command: null, description: null, subCommands: null }, commandDef || {})
            // normalize it here
            if (commandDef.command) {
                let fullAlias = [prefix, commandAlias].filter(i => !!i).join('.')
                commands.push({ alias: fullAlias, ...commandDef })
                if (commandDef.subCommands) {
                    let ncommands = commandArray(commandDef.subCommands, fullAlias)
                    commands = [...commands, ...ncommands]
                }
            }
        }
        debug({ commandDefs, prefix, commands })
        return commands
    }
    let commandHash = {}
    commandArray(commandDefs).forEach(command => { commandHash[command.alias] = { command: command.command, description: command.description } })
    return commandHash
}

function getCommand (commandList, args) {
    args = args || []
    let command = null
    if (args.length > 0) {
        let findAlias = args.shift()
        if (commandList.hasOwnProperty(findAlias)) {
            let cmd = commandList[findAlias]
            if (typeof cmd.command === 'function') {
                command = ((command, args) => {
                    return () => command.apply(this, args)
                })(cmd.command, args)
            } else {
                command = `${cmd.command} ${args.join(' ')}`
            }
        }
    }

    return command
}

function executeCommand (command) {
    if (command) {
        if (typeof command === 'function') {
            console.log(command())
        } else {
            const { spawn } = require('child_process')
            const cmdArr = command.split(' ')
            spawn(cmdArr.shift(), cmdArr.filter(arg => !!arg), { cwd: process.cwd(), stdio: 'inherit' })
        }
    }
}

module.exports = {
    executeCommand,
    commandList,
    getCommand
}
