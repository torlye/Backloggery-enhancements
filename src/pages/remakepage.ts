/// <reference path="../logging.ts" />
/// <reference path="../iconfunctions.ts" />
/// <reference path="../yearFunctions.ts" />

const processRemakeGameItem = () => {
    unwatchRemakePage();
    
    document.querySelectorAll(".game-item").forEach(element => {
        const titleElement = element.querySelector('.title');
        const progressElement = element.querySelector('.markdown');
        log("Remake page; game element " + titleElement?.textContent);

        const words: Array<string | null> = progressElement?.textContent?.split(" ") ?? [];
        
        let hasYear = false;
        const yearElement = createYearElement(titleElement);
        const scriptIconsSpan = createScriptIconsElement(titleElement, true);
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
        const progressTextElement = progressElement;
        // if (progressTextElement)
        //     progressTextElement.textContent = words.join(" ");
        log("assign text: " + words.join(" "));
    });

    watchRemakePage();
};


const observerRemakePage = new MutationObserver(processRemakeGameItem);

const watchRemakePage = () => {
    const appElement = document.getElementById('app');
    if (appElement)
        observerRemakePage.observe(appElement, {
            childList: true, subtree: true
        });
};

function unwatchRemakePage() {
    observerRemakePage.disconnect();
}