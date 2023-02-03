/// <reference path="../iconfunctions.ts" />
/// <reference path="../yearFunctions.ts" />
/// <reference path="../chartFunctions.ts" />
/// <reference path="../logging.ts" />
/// <reference path="../state.ts" />

function isLoadingAjax() {
    return $("img[src$='AJAX_loading.gif']").length > 0;
}

function addActivityIndicator() {
    let x = (window.innerWidth - 100) / 2;
    let y = (window.innerHeight - 100) / 2;
    $(document.body).append('<div class="loadallindicator" style="width:100px;height:100px;position:fixed;left:' + x + 'px;top:' + y + 'px;z-index:100;background-color:black;opacity:0.7"></div>');

    x += 28; y += 27;
    $(document.body).append('<img class="loadallindicator" style="position:fixed;left:' + x + 'px;top:' + y + 'px;z-index:100" src="images/AJAX_loading.gif?foo" alt="Now Loading..." width="44" height="46" />');
}

function removeActivityIndicator() {
    $('.loadallindicator').remove();
}

function triggerNext() {
    const showMoreBtn = $("input[type='button'][value='Show more games']");
    if (showMoreBtn.length > 0) {
        log("Loading next page");
        showMoreBtn.click();
        setTimeout(tryLoadNext, 1000);
        return;
    }
    const expandBtn = $(".lessmore[onclick]:contains('\u25BC')").first();
    if (expandBtn.length > 0) {
        log("Expanding collection");
        expandBtn.click();
        setTimeout(tryLoadNext, 1000);
        return;
    }
    log("Load all done");
    gameListUpdated();
    removeActivityIndicator();
}

function tryLoadNext() {
    $("div#content").unbind("DOMNodeInserted", tryLoadNext);
    if (isLoadingAjax())
        $("div#content").bind("DOMNodeInserted", tryLoadNext);
    else
        triggerNext();
}

function attachGameListEventReceiver() {
    $("div#content").bind("DOMNodeInserted", gameListUpdated);
}

function detachGameListEventReceiver() {
    $("div#content").unbind("DOMNodeInserted", gameListUpdated);
}

function documentContainsStuffToLoad() {
    return ($("input[type='button'][value='Show more games']").length > 0) || ($(".lessmore[onclick]:contains('\u25BC')").length > 0);
}

let loadAllTriggered = false;
$(document).keyup(function (event) {
    if (event.which == 76 && event.shiftKey && event.ctrlKey && !isLoadingAjax()) { //Ctrl-Shift-L
        if (!loadAllTriggered && documentContainsStuffToLoad()) {
            log("Starting load all");
            detachGameListEventReceiver();
            addActivityIndicator();
            loadAllTriggered = true;
            tryLoadNext();
        }
    }
});

//Process game list on games.php page
function gameListUpdated() {
    log("gameListUpdated starts");
    detachGameListEventReceiver();

    let gameboxesProcessed = 0;

    $("section.gamebox:not(.processed):not(.boxtop):not(.systemend)").each(function (this: Element, index) {
        if (enableLogging)
            log("Processing gamebox " + $(this).find("h2 b:first").text());

        if ($(this).find('h2 img[alt="Comp"]').length > 0) {
            log("Skipping this gamebox, it's a compilation");
            $(this).addClass("processed");
            return;
        }

        const gameRow1 = $(this).find("div.gamerow").first();
        const gameRow2 = $(this).find("div.gamerow").eq(1);

        //Get system information
        const system = $.trim(gameRow1.text()).split(" ")[0];
        log("System is " + system);
        if (!systemCount[system])
            systemCount[system] = 1;
        else
            systemCount[system]++;

        //Add icons for systems that really represent digital distribution stores
        addSystemIcon(system, gameRow1);

        //Get ownership information
        if (gameRow1.find('img[title="Household"]').length > 0)
            ownershipCount[1]++;
        else if (gameRow1.find('img[title="Subscription"]').length > 0)
            ownershipCount[2]++;
        else if (gameRow1.find('img[title="Borrowed/Rented"]').length > 0)
            ownershipCount[3]++;
        else if (gameRow1.find('img[title="Formerly Owned"]').length > 0)
            ownershipCount[4]++;
        else if (gameRow1.find('img[title="Ownership: Other"]').length > 0)
            ownershipCount[5]++;
        else
            ownershipCount[0]++;

        //Parse words
        const words: Array<string | null> = gameRow2.text().split(" ");
        let hasYear = false;
        for (const i in words) {
            const word = words[i];

            //Get year
            if (!hasYear) {
                hasYear = createYearLabelFromKeyWord(word as string, gameRow1.find("b:first")[0]);
                if (hasYear) {
                    words[i] = null;
                    continue;
                }
            }

            //Create icons from keyword
            if (createIconsFromKeyWord(word as string, gameRow1)) {
                words[i] = null;
                continue;
            }
        }
        gameRow2.text(words.join(" "));
        if (! /\S/.test(gameRow2.text()))
            gameRow2.remove();

        $(this).addClass("processed");
        gameboxesProcessed++;
        gamesSum++;
    });

    if (gameboxesProcessed > 0) {
        updateCharts();
    }

    attachGameListEventReceiver();
    log("gameListUpdated end");
}

gameListUpdated();