/// <reference path="profilepage.ts" />
/// <reference path="../utils.ts" />

test('processNowPlayingList', () => {
    const html = `<h1>Now Playing</h1>
<div class="npgame decay">
    <div style="width: 17px;"><a href="update.php?user=tortest&amp;gameid=11735649"><img src="images/edit.gif" width="15" height="14" alt="E" /></a></div>
    <div style="width: 19px;">
        <img src="images/unfinished.gif" alt="(U)" width="16" height="16" />
    </div>
    <div style="width: 55px;">PC</div>
    <div style="width: 250px;">
        <b>Super duper game</b>
    </div>
    <div>
        [groupees] foo [playism-games.com] (2000) [bigfishgames] [dotemu] [indiecity] [nuuvem.com.br] [windowsstore] [itch.io] bar
        <span class="info"><img src="images/ribbon_50.gif" alt="" class="drop" width="8" height="15"> <span style="right: 0px; left: auto;"><img src="images/ribbon_50.gif" alt="" class="drop" width="8" height="15"> <b>Achievements:</b> 44 / 57 (77%)<table class="achievebar"><tbody><tr><td class="b" style="width: 77%;"></td><td class="bi" style="width: 23%;"></td></tr></tbody></table></span></span>
    </div>
    <div id="nparr1" class="nparr" onclick="getNPInfo2(1)">&#x25B7;</div>
</div>
<div class="npinfo" id="npinfo1">
    <p style="margin-bottom: 10px; font-size: 11px;">
        Updated about 8 years ago</p>
</div>`;
    document.body.innerHTML = html;
    processNowPlayingList();
    const iconsSpan = document.querySelector(".npgame .scripticons");
    expect(iconsSpan).toBeTruthy();

    const images = iconsSpan?.querySelectorAll('img');
    expect(images).toHaveLength(8);
    expect(images?.[0].alt).toBe('groupees');
    expect(images?.[7].alt).toBe('itch.io');

    expect(iconsSpan?.parentElement && getDirectTextContent(iconsSpan.parentElement)).toMatch(/^\s*foo\s+bar\s*$/);
    expect(iconsSpan?.parentElement?.previousElementSibling?.textContent).toMatch(/^\s*Super duper game\s+\(2000\)\s*$/);
});