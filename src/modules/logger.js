import { cyan, red, redBright, magenta, gray, yellow, white, green} from 'colorette';

// Log Levels from https://datatracker.ietf.org/doc/html/rfc5424
// 0       Emergency: system is unusable
// 1       Alert: action must be taken immediately
// 2       Critical: critical conditions
// 3       Error: error conditions
// 4       Warning: warning conditions
// 5       Notice: normal but significant condition
// 6       Informational: informational messages
// 7       Debug: debug-level messages

const logLevel = {
    EMERGENCY: 'emergency',
    ALERT: 'alert',
    CRITICAL: 'critical',
    ERROR: 'error',
    WARN: 'warn',
    NOTICE: 'notice',
    INFO: 'info',
    DEBUG: 'debug'
};

const logActions = {
    CMD: 'cmd',
    READY: 'ready'
};

let logger = {
    log: (content, type = 'log') => {
        const timestamp = `[${cyan(new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long'}).format(new Date()))}]:`;
        
        switch (type) {
        case logLevel.EMERGENCY: return console.log(`${timestamp} ${redBright(type.toUpperCase())} ${content}`);
        case logLevel.ALERT: return console.log(`${timestamp} ${redBright(type.toUpperCase())} ${content}`);
        case logLevel.CRITICAL: return console.log(`${timestamp} ${red(type.toUpperCase())} ${content}`);
        case logLevel.ERROR: return console.log(`${timestamp} ${red(type.toUpperCase())} ${content}`);
        case logLevel.WARN: return console.log(`${timestamp} ${yellow(type.toUpperCase())} ${content}`);
        case logLevel.INFO: return console.log(`${timestamp} ${gray(type.toUpperCase())} ${content}`);
        case logLevel.NOTICE: return console.log(`${timestamp} ${gray(type.toUpperCase())} ${content}`);
        case logLevel.DEBUG: return console.log(`${timestamp} ${magenta(type.toUpperCase())} ${content}`);
            
        case 'cmd': return console.log(`${timestamp} ${white(type.toUpperCase())} ${content}`);
        case 'ready': return console.log(`${timestamp} ${green(type.toUpperCase())} ${content}`);
        default:
            return console.log(`${timestamp} ${gray('log'.toUpperCase())} ${content}`);
        }
    }
};

const methods = Object.assign({}, logLevel, logActions);
Object.keys(methods).forEach(level => {
    const method = methods[level];
    logger[method] = (...args) => logger.log(...args, method);
});

export default logger;
