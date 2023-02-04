/// <reference path="chartFunctions.ts" />
/// <reference path="state.ts" />

test('createPieChart', () => {
    expect(createPieChart("", "", "", false, 0, 0))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=0x0&chd=t%3A&chl=&chco=");

    expect(createPieChart("foo bar", "label text", "color value", true, -1, 99))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=-1x99&chd=t%3Afoo+bar&chl=label+text&chf=bg%2Cs%2C00000000&chco=color+value");
});

test('updateStatusChart', () => {
    const html = `<div id="maincolumn">
    <section>
    <table style="margin-left: auto; margin-right: auto;" cellpadding="2">
  <tbody><tr>
      <td><b>Unfinished</b>&nbsp;</td>
      <td style="text-align: right;">2</td>
      <td><a href="games.php?user=tor&amp;status=1&amp;console=360"><img src="images/unfinished.gif"></a></td>
      <td>
          <div class="progress-border ui" style="width: 400px;">
              <span class="info"><div class="progress-bar left-bar un" style="display: inline-block; width: 7.1%;"></div><span style="text-align: center;"><u>&nbsp;&nbsp;1 Unplayed&nbsp;&nbsp;</u><br>50% of Unfinished<br>6.3% of Total</span></span>									<div class="progress-bar  right-bar u" style="margin-left: -3px; display: inline-block;  width: 7.1%;"></div>								</div>
      </td>
      <td style="text-align: right;">
          <b>14.3%</b>
      </td>
  </tr>
    <tr>
        <td><b>Beaten</b>&nbsp;</td>
        <td style="text-align: right;">9</td>
        <td><a href="games.php?user=tor&amp;status=2&amp;console=360"><img src="images/beaten.gif" border="0"></a></td>
        <td>
          <div class="progress-border bi" style="width: 400px;">
                  <div class="progress-bar b" style="width: 64.3%;"></div>
            </div>
      </td>
        <td style="text-align: right;"><b>64.3%</b></td>
    </tr>
    <tr>
        <td><b>Completed</b>&nbsp;</td>
        <td style="text-align: right;">3</td>
        <td><a href="games.php?user=tor&amp;status=3&amp;console=360"><img src="images/completed.gif" border="0"></a></td>
        <td>
          <div class="progress-border ci" style="width: 400px;">
                  <div class="progress-bar c" style="width: 21.4%;"></div>
            </div>
      </td>
        <td style="text-align: right;"><b>21.4%</b></td>
    </tr>
    </tbody></table>
    <div id='chartDiv1'></div>
</section>
</div>`;
    document.body.innerHTML = html;

    updateStatusChart(document.querySelector<HTMLElement>("section div#chartDiv1"));
    const img = document.querySelector("#chartDiv1 img");
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src'))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A2%2C9%2C3&chl=Unfinished%7CBeaten%7CCompleted&chf=bg%2Cs%2C00000000&chco=990000%2CBDBDBD%2CFFCC66");
    expect(img?.id).toBe('statusChart');
    expect(img?.getAttribute('title')).toBe('Status chart');
    expect(img?.getAttribute('alt')).toBe('Status chart');
    expect(img?.getAttribute('width')).toBe(chartWidth.toString());
    expect(img?.getAttribute('height')).toBe(chartHeight.toString());
    expect(document.querySelector('table')?.style.display).toBe('none');
});

test('updateSystemChart', () => {
    const headerSection = document.createElement('div');
    updateSystemStatistics("Android"); gamesSum++;
    updateSystemStatistics("Game Boy Advance"); gamesSum++;
    updateSystemChart(headerSection);

    const img = headerSection.querySelector('img#systemChart');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src'))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A50%2C50&chl=Android%7CGame+Boy+Advance&chf=bg%2Cs%2C00000000&chco=7777ff");
    expect(img?.getAttribute('title')).toBe('System chart');
    expect(img?.getAttribute('alt')).toBe('System chart');
    expect(img?.getAttribute('width')).toBe(chartWidth.toString());
    expect(img?.getAttribute('height')).toBe(chartHeight.toString());

    updateSystemStatistics("Android"); gamesSum++;
    updateSystemChart(headerSection);
    expect(img?.getAttribute('src'))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A66.66666666666667%2C33.333333333333336&chl=Android%7CGame+Boy+Advance&chf=bg%2Cs%2C00000000&chco=7777ff");
});

test('updateOwnershipChart', () => {
    const headerSection = document.createElement('div');
    ownershipCount = [1, 2, 3, 4, 5, 6];
    gamesSum = ownershipCount.reduce((prev, curr) => prev + curr);
    updateOwnershipChart(headerSection);

    const img = headerSection.querySelector('img#ownershipChart');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src'))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A4.761904761904762%2C9.523809523809524%2C14.285714285714286%2C19.047619047619047%2C23.80952380952381%2C28.571428571428573&chl=Owned%7CHousehold%7CSubscription%7CBorrowed%2FRented%7CFormerly+Owned%7COther&chf=bg%2Cs%2C00000000&chco=b6b718%2Cfffcb5%2Cdec123%2C7a9e9c%2C9bacff%2C9b89b6");
    expect(img?.getAttribute('title')).toBe('Ownership chart');
    expect(img?.getAttribute('alt')).toBe('Ownership chart');
    expect(img?.getAttribute('width')).toBe(chartWidth.toString());
    expect(img?.getAttribute('height')).toBe(chartHeight.toString());

    ownershipCount[0]++; gamesSum++;
    updateOwnershipChart(headerSection);
    expect(img?.getAttribute('src'))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A9.090909090909092%2C9.090909090909092%2C13.636363636363637%2C18.181818181818183%2C22.727272727272727%2C27.272727272727273&chl=Owned%7CHousehold%7CSubscription%7CBorrowed%2FRented%7CFormerly+Owned%7COther&chf=bg%2Cs%2C00000000&chco=b6b718%2Cfffcb5%2Cdec123%2C7a9e9c%2C9bacff%2C9b89b6");
});

test('updateDDserviceChart', () => {
    const headerSection = document.createElement('div');
    updateDownloadServiceStatistics('Steam');
    updateDownloadServiceStatistics('HumbleBundle');
    updateDDserviceChart(headerSection);

    const img = headerSection.querySelector('img#ddChart');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src'))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A50%2C50&chl=Steam%7CHumbleBundle&chf=bg%2Cs%2C00000000&chco=11aa11");
    expect(img?.getAttribute('title')).toBe('Digital distribution services chart');
    expect(img?.getAttribute('alt')).toBe('Digital distribution services chart');
    expect(img?.getAttribute('width')).toBe(chartWidth.toString());
    expect(img?.getAttribute('height')).toBe(chartHeight.toString());

    updateDownloadServiceStatistics('HumbleBundle');
    updateDownloadServiceStatistics('GOG');
    updateDDserviceChart(headerSection);
    expect(img?.getAttribute('src'))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A25%2C50%2C25&chl=Steam%7CHumbleBundle%7CGOG&chf=bg%2Cs%2C00000000&chco=11aa11");
});
