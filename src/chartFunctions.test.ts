/// <reference path="chartFunctions.ts" />

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

    updateStatusChart($(document.querySelectorAll<HTMLElement>("section div#chartDiv1")));
    const img = document.querySelector("#chartDiv1 img");
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src'))
        .toBe("https://chart.apis.google.com/chart?cht=p&chs=281x100&chd=t%3A2%2C9%2C3&chl=Unfinished%7CBeaten%7CCompleted&chf=bg%2Cs%2C00000000&chco=990000%2CBDBDBD%2CFFCC66");
});