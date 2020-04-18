/* eslint-disable no-console */
function log(str, type) {
    switch (type) {
    case 0: // INFO
        console.log(str);
        break;
    case 1: // ERROR
        console.error(str);
        break;
    case 2: // WARN
        console.warn(str);
        break;
    default: // DEBUG
        console.debug(str);
        break;
    }
}
module.exports = log;
