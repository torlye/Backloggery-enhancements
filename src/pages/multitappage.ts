//Process multitap
// function processMultitap() {
//     $("div.friend li").each(function (this: Element) {
//         if ($(this).contents().length < 4) return;
//         const words: Array<string | null> = $(this).contents().get(3).textContent?.split(" ") ?? [];
//         $(this).append("<span class='scripticons'></span>");
//         for (const i in words) {
//             const word = words[i];
//             if (createIconsFromKeyWord(word as string, $(this).find("span.scripticons")[0])) {
//                 words[i] = null;
//                 continue;
//             }
//         }
//         $(this).contents().get(3).textContent = words.join(" ");
//     });
// }
