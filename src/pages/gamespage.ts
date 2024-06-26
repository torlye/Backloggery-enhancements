import { updateCharts } from "../chartFunctions";
import { addSystemIcon, createIconsFromKeyWord } from "../iconfunctions";
import { enableLogging, log } from "../logging";
import { getOwnershipCount, incrementGamesSum, updateSystemStatistics } from "../state";
import { createYearLabelFromKeyWord, createYearElement } from "../yearFunctions";

const observer = new MutationObserver(gameListUpdated);

function attachGameListEventReceiver() {
    const content = document.getElementById('content');
    if (content)
        observer.observe(content, {
            childList: true, subtree: true
        });
}

function detachGameListEventReceiver() {
    observer.disconnect();
}

//Process game list on games.php page
export function gameListUpdated() {
    log("gameListUpdated starts");
    detachGameListEventReceiver();

    let gameboxesProcessed = 0;

    document.querySelectorAll("section.gamebox:not(.processed):not(.boxtop):not(.systemend)").forEach(function (element: Element) {
        if (enableLogging)
            log("Processing gamebox " + element.querySelector("h2 b")?.textContent);

        if (element.querySelectorAll('h2 img[alt="Comp"]').length > 0) {
            log("Skipping this gamebox, it's a compilation");
            element.classList.add("processed");
            return;
        }

        const gameRows = element.querySelectorAll("div.gamerow");
        const gameRow1 = gameRows[0];
        const gameRow2: Element | undefined = gameRows[1];

        //Get system information
        const system = gameRow1.textContent?.trim().split(" ")[0];
        if (system) {
            log("System is " + system);
            updateSystemStatistics(system);

            //Add icons for systems that really represent digital distribution stores
            addSystemIcon(system, gameRow1);
        }

        //Get ownership information
        if (gameRow1.querySelector('img[title="Household"]'))
            getOwnershipCount()[1]++;
        else if (gameRow1.querySelector('img[title="Subscription"]'))
            getOwnershipCount()[2]++;
        else if (gameRow1.querySelector('img[title="Borrowed/Rented"]'))
            getOwnershipCount()[3]++;
        else if (gameRow1.querySelector('img[title="Formerly Owned"]'))
            getOwnershipCount()[4]++;
        else if (gameRow1.querySelector('img[title="Ownership: Other"]'))
            getOwnershipCount()[5]++;
        else
            getOwnershipCount()[0]++;

        //Parse words
        const words: Array<string | null> = gameRow2?.textContent?.split(" ") ?? [];
        let hasYear = false;
        const gameTitleEl = gameRow1.querySelector("b");
        const yearElement = createYearElement(gameTitleEl);
        for (const i in words) {
            const word = words[i];

            //Get year
            if (!hasYear) {
                if (yearElement)
                    hasYear = createYearLabelFromKeyWord(word as string, yearElement);
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
        if (gameRow2) {
            gameRow2.textContent = words.join(" ");
            if (! /\S/.test(gameRow2.textContent ?? ''))
                gameRow2.remove();
        }

        element.classList.add("processed");
        gameboxesProcessed++;
        incrementGamesSum();
    });

    if (gameboxesProcessed > 0) {
        updateCharts();
    }

    attachGameListEventReceiver();
    log("gameListUpdated end");
}
