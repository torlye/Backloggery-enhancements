/// <reference path="../iconfunctions.ts" />
/// <reference path="../yearFunctions.ts" />

//Process now playing list
function processNowPlayingList() {
    document.querySelectorAll("div.npgame").forEach(element => {
        const progressDiv = element.querySelector('div:nth-last-child(2)');
        const words: Array<string | null> = progressDiv?.textContent?.split(" ") ?? [];
        let hasYear = false;
        const scriptIconsSpan = createScriptIconsElement(progressDiv);
        for (const i in words) {
            const word = words[i];
            if (!hasYear && progressDiv?.previousElementSibling) {
                hasYear = createYearLabelFromKeyWord(word as string, progressDiv.previousElementSibling);
                if (hasYear) {
                    words[i] = null;
                    continue;
                }
            }

            if (createIconsFromKeyWord(word as string, scriptIconsSpan)) {
                words[i] = null;
                continue;
            }
        }
        const progressTextElement = progressDiv?.childNodes[1];
        if (progressTextElement)
            progressTextElement.textContent = words.join(" ");
    });
}

processNowPlayingList();
