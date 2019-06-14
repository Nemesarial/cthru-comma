module.exports = {
    ps:{
        command: 'ps -ax',
        description: 'List the processes the way i like it',
        subCommands: {
            w : {
                command: 'ps -wax',
                description: 'List the processes the way I like it -- in wide format'
            }
        }
    },
    ll: 'ls -lah',
    cwd:{
        command(args){ return process.cwd() },
        description: 'Get current working directory'
    }
}
