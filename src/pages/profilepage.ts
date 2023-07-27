import { createIconsFromKeyWord, createScriptIconsElement } from "../iconfunctions";
import { getDirectTextContent } from "../utils";
import { createYearElement, createYearLabelFromKeyWord } from "../yearFunctions";

//Process now playing list
export function processNowPlayingList() {
    document.querySelectorAll("div.npgame").forEach(element => {
        const progressDiv = element.querySelector('div:nth-last-child(2)');
        if (!progressDiv) return;
        const textContent = getDirectTextContent(progressDiv);
        const words: Array<string | null> = textContent.split(" ") ?? [];
        let hasYear = false;
        const scriptIconsSpan = createScriptIconsElement(progressDiv);
        const yearElement = createYearElement(progressDiv?.previousElementSibling);
        for (const i in words) {
            const word = words[i];
            if (!hasYear && yearElement) {
                hasYear = createYearLabelFromKeyWord(word as string, yearElement);
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

