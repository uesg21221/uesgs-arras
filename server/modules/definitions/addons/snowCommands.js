const commandKey = '/';

module.exports = ({ Events }) => {
    Events.on('chatMessage', ({ message, socket, preventDefault }) => {
        // Exit if not a command
        if (message.indexOf(commandKey) !== 0) return;

        // Disable drawing of the text
        preventDefault();

        let perms = socket.permissions,
            player = socket.player,
            body = player.body,
            id = body.id,
            target = body.target;

        if (!perms || !perms.operator) {
            console.log(socket);
            socket.talk('m', 'You cannot execute commands.');
            return;
        }

        // Parse command
        let commandPlaintext = message.substr(1).split(' '),
            commandCode,
            commandTarget,
            commandOpts;
        switch (commandPlaintext.length) {
            case 0:
            case 1:
                socket.talk('m', 'Invalid command.');
                return;
            case 2:
                commandCode = commandPlaintext[0];
                commandTarget = body;
                commandOpts = commandPlaintext[1];
                break;
            case 3:
                commandCode = commandPlaintext[0];
                commandTarget = global.entities.filter(e => e.id === commandPlaintext[1]);
                if (!commandTarget.length) {
                    socket.talk('m', 'Invalid target.');
                    return;
                }
                commandTarget = commandTarget[0];
                commandOpts = commandPlaintext[2];
                break;
        }

        let parseToNum = (s) => {
            let num;
            try {
                num = JSON.parse(s);
            } catch {
                return 'invalid';
            }
            if (typeof num !== 'number') return 'invalid';
            return num;
        }

        // Process command
        switch (commandCode) {
            case 'score':
                let setScore = parseToNum(commandOpts)
                if (setScore === 'invalid') {
                    socket.talk('m', 'Invalid score.');
                    return;
                }
                commandTarget.skill.reset();
                commandTarget.skill.score = setScore;
                commandTarget.refreshBodyAttributes();
                break;
        }
        
        socket.talk('m', 'Command executed successfully.');
    });

    console.log('[snowCommands.js] SnowCommands active.');
}