/* This script uses icons from the "Silk" and "Diagona" icon sets, which may
be found at http://www.famfamfam.com/lab/icons/silk/
and http://p.yusukekamiyamane.com/
*/

import { isNonEmpty, isNonNullish } from "./utils";

/*
Use transparent backgrounds for charts. Set to false if the text in the
charts is hard to read.
*/
const transparentBackgroundForCharts = true;

//Enable or disable log messages in the browser's javascript console
const enableLogging = false;

/* In the pie charts, merge categories with very few games
into an "other" category. 0.05 means that services with fewer than 5% of the
total number of games will be put in the "other" category.
This might make the chart less cluttered.
A setting between 0.10 and 0.01 recommended. Set to 0.00 to disable. */
const otherThreshold = 0.04

// Width and height of charts.
const chartWidth = 281;
const chartHeight = 100;

//Variables for gathering statistics
const downloadServiceStatistics: Record<string, number> = {};
const yearStatistics: Record<string, number> = {};
let downloadServiceTotalCount = 0;
let yearTotalCount = 0;
let gamesSum = 0;
const systemCount: Record<string, number> = {};
const ownershipCount: number[] = new Array(6);
for (let i = 0; i < ownershipCount.length; i++)
  ownershipCount[i] = 0;

//Process game list on games.php page
function gameListUpdated() {
  log("gameListUpdated starts");
  detachGameListEventReceiver();

  let gameboxesProcessed = 0;

  $("section.gamebox:not(.processed):not(.boxtop):not(.systemend)").each(function (this: Element, index) {
    if (enableLogging)
      log("Processing gamebox " + $(this).find("h2 b:first").text());

    if ($(this).find('h2 img[alt="Comp"]').length > 0) {
      log("Skipping this gamebox, it's a compilation");
      $(this).addClass("processed");
      return;
    }

    const gameRow1 = $(this).find("div.gamerow").first();
    const gameRow2 = $(this).find("div.gamerow").eq(1);

    //Get system information
    const system = $.trim(gameRow1.text()).split(" ")[0];
    log("System is " + system);
    if (!systemCount[system])
      systemCount[system] = 1;
    else
      systemCount[system]++;

    //Add icons for systems that really represent digital distribution stores
    addSystemIcon(system, gameRow1);

    //Get ownership information
    if (gameRow1.find('img[title="Household"]').length > 0)
      ownershipCount[1]++;
    else if (gameRow1.find('img[title="Subscription"]').length > 0)
      ownershipCount[2]++;
    else if (gameRow1.find('img[title="Borrowed/Rented"]').length > 0)
      ownershipCount[3]++;
    else if (gameRow1.find('img[title="Formerly Owned"]').length > 0)
      ownershipCount[4]++;
    else if (gameRow1.find('img[title="Ownership: Other"]').length > 0)
      ownershipCount[5]++;
    else
      ownershipCount[0]++;

    //Parse words
    const words: Array<string | null> = gameRow2.text().split(" ");
    let hasYear = false;
    for (const i in words) {
      const word = words[i];

      //Get year
      if (!hasYear) {
        hasYear = createYearLabelFromKeyWord(word as string, gameRow1.find("b:first"));
        if (hasYear) {
          words[i] = null;
          continue;
        }
      }

      //Create icons from keyword
      if (createIconsFromKeyWord(word as string, gameRow1)) {
        words[i] = null;
        continue;
      }
    }
    gameRow2.text(words.join(" "));
    if (! /\S/.test(gameRow2.text()))
      gameRow2.remove();

    $(this).addClass("processed");
    gameboxesProcessed++;
    gamesSum++;
  });

  if (gameboxesProcessed > 0) {
    updateCharts();
  }

  attachGameListEventReceiver();
  log("gameListUpdated end");
}

//Process now playing list
function processNowPlayingList() {
  $("div.npgame").each(function (this: Element, index) {
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

//Process multitap
function processMultitap() {
  $("div.friend li").each(function (this: Element, index) {
    if ($(this).contents().length < 4) return;
    const words: Array<string | null> = $(this).contents().get(3).textContent?.split(" ") ?? [];
    const hasYear = false;
    $(this).append("<span class='scripticons'></span>");
    for (const i in words) {
      const word = words[i];
      if (createIconsFromKeyWord(word as string, $(this).find("span.scripticons"))) {
        words[i] = null;
        continue;
      }
    }
    $(this).contents().get(3).textContent = words.join(" ");
  });
}

function createYearLabelFromKeyWord(word: string, yearNode: JQuery) {
  const year = /^\((\d{4})\)$/.exec($.trim(word));
  if (year) {
    log("Appending year node " + year[0]);
    yearNode.append(" " + year[0]);
    //Update year statistics
    yearTotalCount++;
    if (!yearStatistics[year[1]])
      yearStatistics[year[1]] = 1;
    else
      yearStatistics[year[1]] += 1;
    return true;
  }
  return false;
}

function addSystemIcon(system: string, iconsNode: JQuery) {
  if (systemIcons[system])
    createIconsFromKeyWord("[" + systemIcons[system] + "]", iconsNode);
}

function createIconsFromKeyWord(word: string, iconsNode: JQuery) {
  const keyWord = /^\[([\w\.-]+)\]$/.exec($.trim(word));
  if (keyWord) {
    log("Found keyword " + keyWord[1]);

    //Try to parse keyword as download service icon
    let iconNumber = ddicons[keyWord[1].toLowerCase()];
    if (isNonNullish(iconNumber)) {
      appendIconNumberToNode(iconNumber, keyWord[1], iconsNode);

      //Increment counters for charts
      downloadServiceTotalCount++;
      if (!downloadServiceStatistics[keyWord[1]])
        downloadServiceStatistics[keyWord[1]] = 1;
      else
        downloadServiceStatistics[keyWord[1]]++;
      return true;
    }

    //Try to parse keyword as "misc" icon
    iconNumber = miscIcons[keyWord[1].toLowerCase()];
    if (isNonNullish(iconNumber)) {
      appendIconNumberToNode(iconNumber, keyWord[1], iconsNode);
      return true;
    }
  }
  return false;
}

function appendIconNumberToNode(iconNumber: number, iconTitle: string, node: JQuery) {
  log("Appending icon " + iconNumber + " with title " + iconTitle + " to current node");
  node.append(createIconFromURLandTitle(icon_urls[iconNumber], iconTitle));
}

function createIconFromURLandTitle(url: string, title: string) {
  return ' <span class="info"><img width="16" height="16" src="' + url +
    '" alt="' + title + '" title="' + title + '" ' +
    'style="margin-bottom: -1px;" /></span> ';
}

function updateCharts() {
  log("Updating charts");
  const headerSection = $("section").first();
  if (headerSection.find('div#chartDiv1').length < 1)
    headerSection.append("<div id='chartDiv1'></div>");
  if (headerSection.find('div#chartDiv2').length < 1)
    headerSection.append("<div id='chartDiv2'></div>");

  updateStatusChart(headerSection.find('div#chartDiv1'));
  updateSystemChart(headerSection.find('div#chartDiv1'));
  updateOwnershipChart(headerSection.find('div#chartDiv1'));
  updateDDserviceChart(headerSection.find('div#chartDiv1'));
  updateYearChart(headerSection.find('div#chartDiv2'));
}

function updateStatusChart(headerSection: JQuery) {
  const img = headerSection.find("#statusChart");
  if (img.length > 0)
    return;

  $('div#maincolumn > section:first > table').css('display', 'none');

  const tableRows = $('div#maincolumn > section:first > table tr');
  const unfinishedCount = tableRows.eq(0).children(":eq(1)").text();
  const beatenCount = tableRows.eq(1).children(":eq(1)").text();
  const completedCount = tableRows.eq(2).children(":eq(1)").text();
  if (!isNonEmpty(unfinishedCount) ||
    !isNonEmpty(beatenCount) ||
    !isNonEmpty(completedCount) ||
    parseInt(unfinishedCount) + parseInt(beatenCount) + parseInt(completedCount) < 1)
    return;

  const data = unfinishedCount + "," +
    beatenCount + "," + completedCount;

  const url = createPieChart(data,
    "Unfinished|Beaten|Completed", "990000,BDBDBD,FFCC66",
    transparentBackgroundForCharts, chartWidth, chartHeight);

  log("Adding status chart");
  const imgHtml = "<img src='" + url +
    "' title='Status chart' " +
    "alt='Status chart' id='statusChart' " +
    "width='" + chartWidth + "' height='" + chartHeight + "'/> ";
  headerSection.append(imgHtml);
}

function updateSystemChart(headerSection: JQuery) {
  const img = headerSection.find("#systemChart");

  if (gamesSum < 1) {
    img.remove();
    return;
  }

  const url = createSystemChartUrl();
  if (isNonEmpty(url)) {
    if (img.length > 0) {
      log("Updating system chart");
      img.attr("src", url);
    } else {
      log("Adding system service chart");
      const imgHtml = "<img src='" + url +
        "' title='System chart' " +
        "alt='System chart' id='systemChart' " +
        "width='" + chartWidth + "' height='" + chartHeight + "'/> ";
      headerSection.append(imgHtml);
    }
  }
}

function updateOwnershipChart(headerSection: JQuery) {
  const img = headerSection.find("#ownershipChart");

  if (gamesSum < 1) {
    img.remove();
    return;
  }

  const url = createOwnershipChartUrl();
  if (isNonEmpty(url)) {
    if (img.length > 0) {
      log("Updating ownership chart");
      img.attr("src", url);
    } else {
      log("Adding ownership service chart");
      const imgHtml = "<img src='" + url +
        "' title='Ownership chart' " +
        "alt='Ownership chart' id='ownershipChart' " +
        "width='" + chartWidth + "' height='" + chartHeight + "'/> ";
      headerSection.append(imgHtml);
    }
  }
}

function updateDDserviceChart(headerSection: JQuery) {
  const img = headerSection.find("#ddChart");

  if (downloadServiceTotalCount < 1) {
    img.remove();
    return;
  }

  const url = createDDserviceChartUrl();
  if (isNonEmpty(url)) {
    if (img.length > 0) {
      log("Updating DD service chart");
      img.attr("src", url);
    } else {
      log("Adding DD service chart");
      const imgHtml = "<img src='" + url +
        "' title='Digital distribution services chart' " +
        "alt='Digital distribution services chart' id='ddChart' " +
        "width='" + chartWidth + "' height='" + chartHeight + "'/> ";
      headerSection.append(imgHtml);
    }
  }
}

function updateYearChart(headerSection: JQuery) {
  const img = headerSection.find("#yearChart");

  if (yearTotalCount < 2) {
    img.remove();
    return;
  }

  const url = createYearChartUrl();
  if (isNonEmpty(url)) {
    if (img.length > 0) {
      log("Updating year chart");
      img.attr("src", url);
    } else {
      log("Adding year chart");
      const imgHtml = "<img src='" + url +
        "' title='Release years chart' alt='Release years chart' id='yearChart' " +
        "width='" + chartWidth * 2 + "' height='" + chartHeight + "'/> ";
      headerSection.append(imgHtml);
    }
  }
}

function createSystemChartUrl() {
  let chartData = "";
  let chartLabels = "";
  let other = 0;

  for (const system in systemCount) {
    if (systemCount[system] / gamesSum > otherThreshold) {
      chartData += 100 * systemCount[system] / gamesSum + ",";
      chartLabels += system + "|";
    } else {
      other += systemCount[system];
    }
  }
  if (other > 0) {
    chartData += 100 * other / gamesSum + ",";
    chartLabels += "Other" + "|";
  }

  return createPieChart(
    chartData.substr(0, chartData.length - 1),
    chartLabels.substr(0, chartLabels.length - 1),
    "7777ff", transparentBackgroundForCharts, chartWidth, chartHeight);
}

function createOwnershipChartUrl() {
  const ownershipLabels = ["Owned", "Household", "Subscription", "Borrowed/Rented", "Formerly Owned", "Other"];

  //Use chart colors similar to the ownership icons
  const colors = ["b6b718", "fffcb5", "dec123", "7a9e9c", "9bacff", "9b89b6"];

  let chartData = "";
  let chartLabels = "";
  let chartColors = "";

  for (let i = 0; i < ownershipCount.length; i++)
    if (ownershipCount[i] > 0) {
      chartData += 100 * ownershipCount[i] / gamesSum + ",";
      chartLabels += ownershipLabels[i] + "|";
      chartColors += colors[i] + ",";
    }

  return createPieChart(
    chartData.substr(0, chartData.length - 1),
    chartLabels.substr(0, chartLabels.length - 1),
    chartColors.substr(0, chartColors.length - 1),
    transparentBackgroundForCharts, chartWidth, chartHeight);
}

function createDDserviceChartUrl() {
  let chartData = "";
  let chartLabels = "";
  let other = 0;

  for (const keyword in downloadServiceStatistics) {
    if (downloadServiceStatistics[keyword] / downloadServiceTotalCount
      > otherThreshold) {
      chartData += 100 * downloadServiceStatistics[keyword]
        / downloadServiceTotalCount + ",";
      chartLabels += keyword + "|";
    } else {
      other += downloadServiceStatistics[keyword];
    }
  }

  if (other > 0) {
    chartData += 100 * other / downloadServiceTotalCount + ",";
    chartLabels += "Other" + "|";
  }

  return createPieChart(
    chartData.substr(0, chartData.length - 1),
    chartLabels.substr(0, chartLabels.length - 1),
    "11aa11", transparentBackgroundForCharts, chartWidth, chartHeight);
}

function createYearChartUrl() {
  const years: string[] = new Array();
  let yearStatisticsIdx = 0;
  let highestValue = 0;

  for (const year in yearStatistics) {
    years[yearStatisticsIdx] = year;
    yearStatisticsIdx++;
    if (yearStatistics[year] > highestValue)
      highestValue = yearStatistics[year];
  }
  years.sort();

  const lowestYear = parseInt(years[0]);
  const highestYear = parseInt(years[years.length - 1]);

  let chartDataX = "";
  let chartDataY = "";

  const chartLabelScaleFactor = Math.ceil((1 + highestYear - lowestYear) / 20);

  for (let i = lowestYear; i <= highestYear; i++) {
    if (i % chartLabelScaleFactor == 0)
      chartDataX += i + "|";
    else
      chartDataX += "|";
    if (yearStatistics[i.toString()] == null)
      chartDataY += "0,";
    else
      chartDataY += 100 * yearStatistics[i.toString()] / highestValue + ",";
  }

  let barChartUrl = "http://chart.apis.google.com/chart" +
    "?cht=bvs&chs=" + chartWidth * 2 + "x" + chartHeight +
    "&chd=t:" + chartDataY.substr(0, chartDataY.length - 1) +
    "&chxl=0:|" + chartDataX.substr(0, chartDataX.length - 1) +
    "&chxt=x,y&chbh=a" +
    "&chxr=1,0," + highestValue;

  if (transparentBackgroundForCharts)
    barChartUrl += "&chf=bg,s,00000000";
  barChartUrl += "&chco=4D89F9";

  log(barChartUrl);
  return barChartUrl;
}

//Creates pie chart from parameters
function createPieChart(data: string, labels: string, colors: string, transparent: boolean, width: number, height: number) {
  let pieChartUrl = "http://chart.apis.google.com/chart" +
    "?cht=p&chs=" + width + "x" + height +
    "&chd=t:" + data + "&chl=" + labels;

  if (transparent)
    pieChartUrl += "&chf=bg,s,00000000";

  pieChartUrl += "&chco=" + colors;

  log(pieChartUrl);
  return pieChartUrl;
}

function log(message: string) {
  if (enableLogging) {
    const now = new Date();
    const addZero = function (d: number | string) {
      if (d < 10) d = "0" + d; return d;
    };
    let millis: number | string = now.getMilliseconds();
    if (millis < 10) millis = "00" + millis;
    else if (millis < 100) millis = "0" + millis;

    const displayMessage = addZero(now.getHours()) + ":" +
      addZero(now.getMinutes()) + ":" +
      addZero(now.getSeconds()) + ":" +
      millis + " " + message;
    console.log(displayMessage);
  }
}

function attachGameListEventReceiver() {
  $("div#content").bind("DOMNodeInserted", gameListUpdated);
}

function detachGameListEventReceiver() {
  $("div#content").unbind("DOMNodeInserted", gameListUpdated);
}

let loadAllTriggered = false;
$(document).keyup(function (event) {
  if (event.which == 76 && event.shiftKey && event.ctrlKey && !isLoadingAjax()) { //Ctrl-Shift-L
    if (!loadAllTriggered && documentContainsStuffToLoad()) {
      log("Starting load all");
      detachGameListEventReceiver();
      addActivityIndicator();
      loadAllTriggered = true;
      tryLoadNext();
    }
  }
});

function documentContainsStuffToLoad() {
  return ($("input[type='button'][value='Show more games']").length > 0) || ($(".lessmore[onclick]:contains('\u25BC')").length > 0);
}

function isLoadingAjax() {
  return $("img[src$='AJAX_loading.gif']").length > 0;
}

function tryLoadNext() {
  $("div#content").unbind("DOMNodeInserted", tryLoadNext);
  if (isLoadingAjax())
    $("div#content").bind("DOMNodeInserted", tryLoadNext);
  else
    triggerNext();
}

function triggerNext() {
  const showMoreBtn = $("input[type='button'][value='Show more games']");
  if (showMoreBtn.length > 0) {
    log("Loading next page");
    showMoreBtn.click();
    setTimeout(tryLoadNext, 1000);
    return;
  }
  const expandBtn = $(".lessmore[onclick]:contains('\u25BC')").first();
  if (expandBtn.length > 0) {
    log("Expanding collection");
    expandBtn.click();
    setTimeout(tryLoadNext, 1000);
    return;
  }
  log("Load all done");
  gameListUpdated();
  removeActivityIndicator();
}

function addActivityIndicator() {
  let x = (window.innerWidth - 100) / 2;
  let y = (window.innerHeight - 100) / 2;
  $(document.body).append('<div class="loadallindicator" style="width:100px;height:100px;position:fixed;left:' + x + 'px;top:' + y + 'px;z-index:100;background-color:black;opacity:0.7"></div>');

  x += 28; y += 27;
  $(document.body).append('<img class="loadallindicator" style="position:fixed;left:' + x + 'px;top:' + y + 'px;z-index:100" src="images/AJAX_loading.gif?foo" alt="Now Loading..." width="44" height="46" />');
}

function removeActivityIndicator() {
  $('.loadallindicator').remove();
}

processNowPlayingList();
processMultitap();
gameListUpdated();