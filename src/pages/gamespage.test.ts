/// <reference path="gamespage.ts" />

test('gameListUpdated', async () => {
    const html = `
<div id="content">
<div id="maincolumn" style="width: 601px;">

    <section>
        <table style="margin-left: auto; margin-right: auto;" cellpadding="2">
            <tbody>
                <tr>
                    <td><b>Unfinished</b>&nbsp;</td>
                    <td style="text-align: right;">2</td>
                    <td><a href="games.php?user=tor&amp;status=1&amp;console=PC"><img src="images/unfinished.gif"></a>
                    </td>
                    <td>
                        <div class="progress-border ui" style="width: 400px;">
                            <span class="info">
                                <div class="progress-bar left-bar un" style="display: inline-block; width: 7.1%;"></div>
                                <span style="text-align: center;"><u>&nbsp;&nbsp;1 Unplayed&nbsp;&nbsp;</u><br>50% of
                                    Unfinished<br>7.1% of Total</span>
                            </span>
                            <div class="progress-bar  right-bar u"
                                style="margin-left: -3px; display: inline-block;  width: 7.1%;"></div>
                        </div>
                    </td>
                    <td style="text-align: right;">
                        <b>14.3%</b>
                    </td>
                </tr>
                <tr>
                    <td><b>Beaten</b>&nbsp;</td>
                    <td style="text-align: right;">12</td>
                    <td><a href="games.php?user=tor&amp;status=2&amp;console=PC"><img src="images/beaten.gif"
                                border="0"></a></td>
                    <td>
                        <div class="progress-border bi" style="width: 400px;">
                            <div class="progress-bar b" style="width: 85.7%;"></div>
                        </div>
                    </td>
                    <td style="text-align: right;"><b>85.7%</b></td>
                </tr>
                <tr>
                    <td><b>Completed</b>&nbsp;</td>
                    <td style="text-align: right;">0</td>
                    <td><a href="games.php?user=tor&amp;status=3&amp;console=PC"><img src="images/completed.gif"
                                border="0"></a></td>
                    <td>
                        <div class="progress-border ci" style="width: 400px;">
                            <div class="progress-bar c" style="width: 0%;"></div>
                        </div>
                    </td>
                    <td style="text-align: right;"><b>0%</b></td>
                </tr>
            </tbody>
        </table>
    </section>

    <div id="output1">
        <section class="system title shadow">PC</section>
        <section class="gamebox">
            <h2>
                <a href="games.php?user=tor&amp;console=PC&amp;status=1"><img alt="(U)" src="images/unfinished.gif"
                        width="16" height="16"></a>
                <b>Command &amp; Conquer: Red Alert 3</b>
                <span class="lessmore" id="arrow0" style="float: right;"
                    onclick="getComp(0,'PC','Command+%26+Conquer%3A+Red+Alert+3')">▼</span>
            </h2>
            <div class="gamerow"><b>
                    PC</b> </div>
            <div class="gamerow">(2008) [Steam]</div>
            <div style="display: none; margin-top: -10px;" id="comp0"></div>
        </section>
        <section class="gamebox">
            <h2><b>
                    <img src="images/compilation.gif" alt="Comp" width="16" height="16">
                    Command &amp; Conquer: The First Decade <span class="lessmore" id="arrow1" style="float: right;"
                        onclick="getComp(1,'PC','Command+%26+Conquer%3A+The+First+Decade')">▼</span>
                </b></h2>
            <div style="display: none;" id="comp1"></div>
        </section>
        <section class="gamebox systemend" style="margin-bottom: 15px;"></section>
    </div>
</div>
</div>`;
    document.body.innerHTML = html;

    gameListUpdated();

    expect(document.querySelectorAll('.gamebox.processed')).toHaveLength(2);
    const row = document.querySelector('.gamebox.processed .gamerow');
    expect(row).toBeTruthy();
    expect(row?.textContent).toMatch(/^\s*PC\s+\(2008\)\s*$/);
    const img = row?.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.alt).toBe('Steam');

    expect(document.getElementById('statusChart')?.getAttribute('src'))
        .toBe('https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A2%2C12%2C0&chl=Unfinished%7CBeaten%7CCompleted&chf=bg%2Cs%2C00000000&chco=990000%2CBDBDBD%2CFFCC66');
    expect(document.getElementById('systemChart')?.getAttribute('src'))
        .toBe('https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A100&chl=PC&chf=bg%2Cs%2C00000000&chco=7777ff');
    expect(document.getElementById('ownershipChart')?.getAttribute('src'))
        .toBe('https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A100&chl=Owned&chf=bg%2Cs%2C00000000&chco=b6b718');
    expect(document.getElementById('ddChart')?.getAttribute('src'))
        .toBe('https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A100&chl=Steam&chf=bg%2Cs%2C00000000&chco=11aa11');
    expect(document.getElementById('yearChart')).toBeFalsy();

    const newsection = document.createElement('section');
    newsection.className = 'gamebox';
    newsection.innerHTML = `
    <h2>
    <a href="games.php?user=tor&amp;console=PS4&amp;status=2"><img alt="(B)" src="images/beaten.gif" width="16" height="16"></a>
    </h2>
    <div class="gamerow"><b>PS4</b> <span class="info"><img src="images/ribbon_50.gif" alt="" class="drop" width="8" height="15"> <span style="right: 0px; left: auto;"><img src="images/ribbon_50.gif" alt="" class="drop" width="8" height="15"> <b>Achievements:</b> 44 / 57 (77%)<table class="achievebar"><tbody><tr><td class="b" style="width: 77%;"></td><td class="bi" style="width: 23%;"></td></tr></tbody></table></span></span> <img src="images/own_other.gif" alt="Ownership: Other" title="Ownership: Other" style="padding: 1px;" width="16" height="14"></div>
    <div class="gamerow">(2014) [PSN] Foobar</div>
    <div></div>`;
    document.getElementById('output1')?.append(newsection);

    const { waitFor } = require('@testing-library/dom');
    await waitFor(() => expect(document.getElementById('yearChart')).toBeTruthy());

    expect(document.querySelectorAll('.gamebox.processed')).toHaveLength(3);
    expect(document.getElementById('statusChart')?.getAttribute('src'))
        .toBe('https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A2%2C12%2C0&chl=Unfinished%7CBeaten%7CCompleted&chf=bg%2Cs%2C00000000&chco=990000%2CBDBDBD%2CFFCC66');
    expect(document.getElementById('systemChart')?.getAttribute('src'))
        .toBe('https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A50%2C50&chl=PC%7CPS4&chf=bg%2Cs%2C00000000&chco=7777ff');
    expect(document.getElementById('ownershipChart')?.getAttribute('src'))
        .toBe('https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A50%2C50&chl=Owned%7COther&chf=bg%2Cs%2C00000000&chco=b6b718%2C9b89b6');
    expect(document.getElementById('ddChart')?.getAttribute('src'))
        .toBe('https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A50%2C50&chl=Steam%7CPSN&chf=bg%2Cs%2C00000000&chco=11aa11');
    expect(document.getElementById('yearChart')?.getAttribute('src'))
        .toBe('https://chart.apis.google.com/chart?cht=bvs&chs=562x100&chd=t%3A100%2C0%2C0%2C0%2C0%2C0%2C100&chxl=0%3A%7C2008%7C2009%7C2010%7C2011%7C2012%7C2013%7C2014&chxt=x%2Cy&chbh=a&chxr=1%2C0%2C1&chf=bg%2Cs%2C00000000&chco=4D89F9');
});