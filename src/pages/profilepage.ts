/// <reference path="../iconfunctions.ts" />
/// <reference path="../yearFunctions.ts" />

//Process now playing list
function processNowPlayingList() {
    $("div.npgame").each(function (this: Element) {
        const progressDiv = $(this).children().eq(-2);
        const words: Array<string | null> = progressDiv.contents().get(0).textContent?.split(" ") ?? [];
        let hasYear = false;
        progressDiv.prepend("<span class='scripticons'></span>");
        for (const i in words) {
            const word = words[i];
            if (!hasYear) {
                hasYear = createYearLabelFromKeyWord(word as string, progressDiv.prev());
                if (hasYear) {
                    words[i] = null;
                    continue;
                }
            }

            if (createIconsFromKeyWord(word as string, progressDiv.find("span.scripticons"))) {
                words[i] = null;
                continue;
            }
        }
        progressDiv.contents().get(1).textContent = words.join(" ");
    });
}

processNowPlayingList();