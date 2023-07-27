import { log } from "./logging";
import { updateYearStatistics } from "./state";

export function createYearLabelFromKeyWord(word: string, yearNode: Element) {
    const year = /^\((\d{4})\)$/.exec(word.trim());
    if (year) {
        log("Appending year node " + year[0]);
        yearNode.textContent = " " + year[0];
        //Update year statistics
        updateYearStatistics(year[1]);
        return true;
    }
    return false;
}

export const createYearElement = (parentElement: Element | null) => {
    if (!parentElement) return null;

    const existingElement = parentElement.querySelector('.scriptyear');
    if (existingElement) {
        existingElement.textContent = "";
        return existingElement;
    }

    const el = document.createElement('span');
    el.className = 'scriptyear';
    parentElement.append(el);
    return el;
};