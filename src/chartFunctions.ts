/// <reference path="state.ts" />
/// <reference path="utils.ts" />
/// <reference path="logging.ts" />

/*
Use transparent backgrounds for charts. Set to false if the text in the
charts is hard to read.
*/
const transparentBackgroundForCharts = true;

/* In the pie charts, merge categories with very few games
into an "other" category. 0.05 means that services with fewer than 5% of the
total number of games will be put in the "other" category.
This might make the chart less cluttered.
A setting between 0.10 and 0.01 recommended. Set to 0.00 to disable. */
const otherThreshold = 0.04;

// Width and height of charts.
const chartWidth = 281;
const chartHeight = 100;

//Creates pie chart from parameters
function createPieChart(data: string, labels: string, colors: string, transparent: boolean, width: number, height: number) {
    const pieChartUrl = new URL("https://chart.apis.google.com/chart?cht=p");
    pieChartUrl.searchParams.set('chs', width + "x" + height);
    pieChartUrl.searchParams.set('chd', "t:" + data);
    pieChartUrl.searchParams.set('chl', labels);

    if (transparent)
        pieChartUrl.searchParams.set('chf', 'bg,s,00000000');

    pieChartUrl.searchParams.set('chco', colors);
    const urlString = pieChartUrl.toString();

    log(urlString);
    return urlString;
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