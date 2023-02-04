/// <reference path="utils.ts" />
/// <reference path="state.ts" />
/// <reference path="icons/ddicons.ts" />
/// <reference path="icons/icon_urls.ts" />
/// <reference path="icons/miscIcons.ts" />
/// <reference path="icons/systemIcons.ts" />
/// <reference path="logging.ts" />

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

function createIconsFromKeyWord(word: string, iconsNode: Element) {
    const keyWord = /^\[([\w.-]+)\]$/.exec($.trim(word));
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

function addSystemIcon(system: string, iconsNode: Element) {
    if (systemIcons[system])
        createIconsFromKeyWord("[" + systemIcons[system] + "]", iconsNode);
}

function createScriptIconsElement(progressDiv: Element | null) {
    const el = document.createElement('span');
    el.className = 'scripticons';
    progressDiv?.prepend(el);
    return el;
}