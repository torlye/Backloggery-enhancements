/// <reference path="utils.ts" />
/// <reference path="state.ts" />
/// <reference path="icons/ddicons.ts" />
/// <reference path="icons/icon_urls.ts" />
/// <reference path="icons/miscIcons.ts" />
/// <reference path="icons/systemIcons.ts" />
/// <reference path="logging.ts" />

function createIconFromURLandTitle(url: string, title: string) {
    return ' <span class="info"><img width="16" height="16" src="' + url +
        '" alt="' + title + '" title="' + title + '" ' +
        'style="margin-bottom: -1px;" /></span> ';
}

function appendIconNumberToNode(iconNumber: number, iconTitle: string, node: JQuery) {
    log("Appending icon " + iconNumber + " with title " + iconTitle + " to current node");
    node.append(createIconFromURLandTitle(icon_urls[iconNumber], iconTitle));
}

function createIconsFromKeyWord(word: string, iconsNode: JQuery) {
    const keyWord = /^\[([\w\.-]+)\]$/.exec($.trim(word));
    if (keyWord) {
        log("Found keyword " + keyWord[1]);

        //Try to parse keyword as download service icon
        let iconNumber = ddicons[keyWord[1].toLowerCase()];
        if (isNonNullish(iconNumber)) {
            appendIconNumberToNode(iconNumber, keyWord[1], iconsNode);

            //Increment counters for charts
            downloadServiceTotalCount++;
            if (!downloadServiceStatistics[keyWord[1]])
                downloadServiceStatistics[keyWord[1]] = 1;
            else
                downloadServiceStatistics[keyWord[1]]++;
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

function addSystemIcon(system: string, iconsNode: JQuery) {
    if (systemIcons[system])
        createIconsFromKeyWord("[" + systemIcons[system] + "]", iconsNode);
}