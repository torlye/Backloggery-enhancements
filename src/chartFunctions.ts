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

function updateStatusChart(headerSection: Element | null) {
    if (!headerSection) return;
    const img = headerSection.querySelectorAll("#statusChart");
    if (img.length > 0)
        return;

    const barChart = document.querySelector('div#maincolumn > section:first-child > table') as HTMLElement | null;
    if (!barChart) return;
    barChart.style.display = 'none';

    const tableRows = barChart.getElementsByTagName('tr');
    const unfinishedCount = tableRows[0]?.children[1]?.textContent;
    const beatenCount = tableRows[1]?.children[1]?.textContent;
    const completedCount = tableRows[2]?.children[1]?.textContent;
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
    const newimg = document.createElement('img');
    newimg.src = url;
    newimg.title = 'Status chart';
    newimg.alt = 'Status chart';
    newimg.id = 'statusChart';
    newimg.width = chartWidth;
    newimg.height = chartHeight;
    headerSection.append(newimg);
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

function updateSystemChart(headerSection: Element | null) {
    if (!headerSection) return;
    const img = headerSection.querySelector("#systemChart");

    if (gamesSum < 1) {
        img?.remove();
        return;
    }

    const url = createSystemChartUrl();
    if (isNonEmpty(url)) {
        if (img) {
            log("Updating system chart");
            img.setAttribute("src", url);
        } else {
            log("Adding system service chart");
            const newimg = document.createElement('img');
            newimg.src = url;
            newimg.title = 'System chart';
            newimg.alt = 'System chart';
            newimg.id = 'systemChart';
            newimg.width = chartWidth;
            newimg.height = chartHeight;
            headerSection.append(newimg);
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

function updateOwnershipChart(headerSection: Element | null) {
    const img = headerSection?.querySelector("#ownershipChart");

    if (gamesSum < 1) {
        img?.remove();
        return;
    }

    const url = createOwnershipChartUrl();
    if (isNonEmpty(url)) {
        if (img) {
            log("Updating ownership chart");
            img.setAttribute("src", url);
        } else {
            log("Adding ownership service chart");
            const newimg = document.createElement('img');
            newimg.src = url;
            newimg.title = 'Ownership chart';
            newimg.alt = 'Ownership chart';
            newimg.id = 'ownershipChart';
            newimg.width = chartWidth;
            newimg.height = chartHeight;
            headerSection?.append(newimg);
        }
    }
}

function updateDDserviceChart(headerSection: Element | null) {
    const img = headerSection?.querySelector("#ddChart");

    if (downloadServiceTotalCount < 1) {
        img?.remove();
        return;
    }

    const url = createDDserviceChartUrl();
    if (isNonEmpty(url)) {
        if (img) {
            log("Updating DD service chart");
            img.setAttribute("src", url);
        } else {
            log("Adding DD service chart");
            const newimg = document.createElement('img');
            newimg.src = url;
            newimg.title = 'Digital distribution services chart';
            newimg.alt = 'Digital distribution services chart';
            newimg.id = 'ddChart';
            newimg.width = chartWidth;
            newimg.height = chartHeight;
            headerSection?.append(newimg);
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
        if (i % chartLabelScaleFactor === 0)
            chartDataX += i + "|";
        else
            chartDataX += "|";
        if (!isNonNullish(yearStatistics[i.toString()]))
            chartDataY += "0,";
        else
            chartDataY += 100 * yearStatistics[i.toString()] / highestValue + ",";
    }

    const barChartUrl = new URL("https://chart.apis.google.com/chart?cht=bvs");
    barChartUrl.searchParams.set('chs', chartWidth * 2 + "x" + chartHeight);
    barChartUrl.searchParams.set('chd', "t:" + chartDataY.substr(0, chartDataY.length - 1));
    barChartUrl.searchParams.set('chxl', "0:|" + chartDataX.substr(0, chartDataX.length - 1));
    barChartUrl.searchParams.set('chxt', 'x,y');
    barChartUrl.searchParams.set('chbh', 'a');
    barChartUrl.searchParams.set('chxr', "1,0," + highestValue);

    if (transparentBackgroundForCharts)
        barChartUrl.searchParams.set('chf', 'bg,s,00000000');
    barChartUrl.searchParams.set('chco', '4D89F9');

    log(barChartUrl.toString());
    return barChartUrl.toString();
}

function updateYearChart(headerSection: Element | null) {
    const img = headerSection?.querySelector("#yearChart");

    if (yearTotalCount < 2) {
        img?.remove();
        return;
    }

    const url = createYearChartUrl();
    if (isNonEmpty(url)) {
        if (img) {
            log("Updating year chart");
            img.setAttribute("src", url);
        } else {
            log("Adding year chart");
            const newimg = document.createElement('img');
            newimg.src = url;
            newimg.title = 'Release years chart';
            newimg.alt = 'Release years chart';
            newimg.id = 'yearChart';
            newimg.width = chartWidth * 2;
            newimg.height = chartHeight;
            headerSection?.append(newimg);
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

    const chartDiv1 = headerSection[0].querySelector('div#chartDiv1');
    updateStatusChart(chartDiv1);
    updateSystemChart(chartDiv1);
    updateOwnershipChart(chartDiv1);
    updateDDserviceChart(chartDiv1);
    updateYearChart(headerSection.find('div#chartDiv2')[0]);
}