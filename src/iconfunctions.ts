import { ddicons } from "./icons/ddicons";
import { icon_urls } from "./icons/icon_urls";
import { miscIcons } from "./icons/miscIcons";
import { systemIcons } from "./icons/systemIcons";
import { log } from "./logging";
import { updateDownloadServiceStatistics } from "./state";
import { isNonNullish } from "./utils";

function createIconFromURLandTitle(url: string, title: string) {
    const span = document.createElement('span');
    span.className = 'info';
    const img = document.createElement('img');
    img.width = 16;
    img.height = 16;
    img.src = url;
    img.alt = title;
    img.title = title;
    img.style.marginBottom = '-1px';
    span.append(img);
    return span;
}

function appendIconNumberToNode(iconNumber: number, iconTitle: string, node: Element) {
    log("Appending icon " + iconNumber + " with title " + iconTitle + " to current node");
    node.append(' ', createIconFromURLandTitle(icon_urls[iconNumber], iconTitle), ' ');
}

export function createIconsFromKeyWord(word: string, iconsNode: Element) {
    const keyWord = /^\[([\w.-]+)\]$/.exec(word.trim());
    if (keyWord) {
        log("Found keyword " + keyWord[1]);

        //Try to parse keyword as download service icon
        let iconNumber = ddicons[keyWord[1].toLowerCase()];
        if (isNonNullish(iconNumber)) {
            appendIconNumberToNode(iconNumber, keyWord[1], iconsNode);

            //Increment counters for charts
            updateDownloadServiceStatistics(keyWord[1]);
            return true;
        }

        //Try to parse keyword as "misc" icon
        iconNumber = miscIcons[keyWord[1].toLowerCase()];
        if (isNonNullish(iconNumber)) {
            appendIconNumberToNode(iconNumber, keyWord[1], iconsNode);
            return true;
        }
    }
    return false;
}

export function addSystemIcon(system: string, iconsNode: Element) {
    if (systemIcons[system])
        createIconsFromKeyWord("[" + systemIcons[system] + "]", iconsNode);
}

export function createScriptIconsElement(parentElement: Element | null, append?: boolean) {
    const existingElement = parentElement?.querySelector('.scripticons');
    if (existingElement) {
        existingElement.childNodes.forEach(n => n.nodeType === Node.ELEMENT_NODE && n.remove());
        return existingElement;
    }

    const el = document.createElement('span');
    el.className = 'scripticons';
    if (append)
        parentElement?.append(el);
    else
        parentElement?.prepend(el);
    return el;
}