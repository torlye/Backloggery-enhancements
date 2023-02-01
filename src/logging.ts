//Enable or disable log messages in the browser's javascript console
const enableLogging = false;

function log(message: string) {
    if (enableLogging) {
        const now = new Date();
        const addZero = function (d: number | string) {
            if (d < 10) d = "0" + d; return d;
        };
        let millis: number | string = now.getMilliseconds();
        if (millis < 10) millis = "00" + millis;
        else if (millis < 100) millis = "0" + millis;

        const displayMessage = addZero(now.getHours()) + ":" +
            addZero(now.getMinutes()) + ":" +
            addZero(now.getSeconds()) + ":" +
            millis + " " + message;
        console.log(displayMessage);
    }
}