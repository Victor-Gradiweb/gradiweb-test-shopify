const commandsContext = require.context('../commands/', false, /\.js$/);
commandsContext.keys().forEach(commandsContext);
