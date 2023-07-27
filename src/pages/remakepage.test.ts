import { processRemakeGameItem } from './remakepage';

test('processRemakeGameItem', () => {
    const html = `
    <div class="game-item"><div>
    <div class="platform"><div><img src="/img/platforms/PC.png" title="PC" alt="PC" class="bw"></div></div>
    <div id="game739" class="status"><img src="/img/status/UF.png" alt="UF" title="Unfinished"></div>
    <div class="text"><div class="title">Lego Star Wars: The Skywalker Saga</div>
    <div class="markdown">Baz [Steam] (2022) Foo [bigfishgames] bar [dotemu]</div></div>
    <div class="priority"><img src="/img/priority/nowplaying.png" alt="⯈" title="Now Playing">
    </div></div></div>
    `;
    document.body.innerHTML = html;
    processRemakeGameItem();
    const iconsSpan = document.querySelector(".scripticons");
    expect(iconsSpan).toBeTruthy();

    const images = iconsSpan?.querySelectorAll('img');
    expect(images).toHaveLength(3);
    expect(images?.[0].alt).toBe('Steam');
    expect(images?.[1].alt).toBe('bigfishgames');
    expect(images?.[2].alt).toBe('dotemu');

    const titleElement = document.querySelector(".title");
    expect(titleElement).toHaveTextContent("Lego Star Wars: The Skywalker Saga (2022)");
});