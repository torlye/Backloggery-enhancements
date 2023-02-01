/// <reference path="state.ts" />
/// <reference path="logging.ts" />

function createYearLabelFromKeyWord(word: string, yearNode: JQuery<Element>) {
    const year = /^\((\d{4})\)$/.exec($.trim(word));
    if (year) {
        log("Appending year node " + year[0]);
        yearNode.append(" " + year[0]);
        //Update year statistics
        yearTotalCount++;
        if (!yearStatistics[year[1]])
            yearStatistics[year[1]] = 1;
        else
            yearStatistics[year[1]] += 1;
        return true;
    }
    return false;
}