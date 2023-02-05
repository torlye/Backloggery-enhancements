/// <reference path="state.ts" />
/// <reference path="logging.ts" />

function createYearLabelFromKeyWord(word: string, yearNode: Element) {
    const year = /^\((\d{4})\)$/.exec(word.trim());
    if (year) {
        log("Appending year node " + year[0]);
        yearNode.append(" " + year[0]);
        //Update year statistics
        updateYearStatistics(year[1]);
        return true;
    }
    return false;
}