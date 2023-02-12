/// <reference path="state.ts" />
/// <reference path="logging.ts" />

function createYearLabelFromKeyWord(word: string, parent: Element) {
    const year = /^\((\d{4})\)$/.exec(word.trim());
    if (year) {
        log("Appending year node " + year[0]);
        parent.append(" " + year[0]);
        //Update year statistics
        updateYearStatistics(year[1]);
        return true;
    }
    return false;
}

const createYearElement = (parentElement: Element) => {
    const existingElement = parentElement?.querySelector('.scriptyear');
    if (existingElement) {
        existingElement.textContent = "";
        return existingElement;
    }

    const el = document.createElement('span');
    el.className = 'scriptyear';
    parentElement?.append(el);
    return el;
};