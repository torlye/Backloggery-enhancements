import { log } from "./logging";
import { getDownloadServiceStatistics, getDownloadServiceTotalCount, getGamesSum, getOwnershipCount, getSystemCount, getYearStatistics, getYearTotalCount } from "./state";
import { isNonEmpty, isNonNullish } from "./utils";

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
export const chartWidth = 281;
export const chartHeight = 100;

//Creates pie chart from parameters
export function createPieChart(data: string, labels: string, colors: string, transparent: boolean, width: number, height: number) {
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

export function updateStatusChart(headerSection: Element | null) {
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

    for (const system in getSystemCount()) {
        if (getSystemCount()[system] / getGamesSum() > otherThreshold) {
            chartData += 100 * getSystemCount()[system] / getGamesSum() + ",";
            chartLabels += system + "|";
        } else {
            other += getSystemCount()[system];
        }
    }
    if (other > 0) {
        chartData += 100 * other / getGamesSum() + ",";
        chartLabels += "Other" + "|";
    }

    return createPieChart(
        chartData.substr(0, chartData.length - 1),
        chartLabels.substr(0, chartLabels.length - 1),
        "7777ff", transparentBackgroundForCharts, chartWidth, chartHeight);
}

export function updateSystemChart(headerSection: Element | null) {
    if (!headerSection) return;
    const img = headerSection.querySelector("#systemChart");

    if (getGamesSum() < 1) {
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

    for (let i = 0; i < getOwnershipCount().length; i++)
        if (getOwnershipCount()[i] > 0) {
            chartData += 100 * getOwnershipCount()[i] / getGamesSum() + ",";
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

    for (const keyword in getDownloadServiceStatistics()) {
        if (getDownloadServiceStatistics()[keyword] / getDownloadServiceTotalCount()
            > otherThreshold) {
            chartData += 100 * getDownloadServiceStatistics()[keyword]
                / getDownloadServiceTotalCount() + ",";
            chartLabels += keyword + "|";
        } else {
            other += getDownloadServiceStatistics()[keyword];
        }
    }

    if (other > 0) {
        chartData += 100 * other / getDownloadServiceTotalCount() + ",";
        chartLabels += "Other" + "|";
    }

    return createPieChart(
        chartData.substr(0, chartData.length - 1),
        chartLabels.substr(0, chartLabels.length - 1),
        "11aa11", transparentBackgroundForCharts, chartWidth, chartHeight);
}

export function updateOwnershipChart(headerSection: Element | null) {
    const img = headerSection?.querySelector("#ownershipChart");

    if (getGamesSum() < 1) {
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

export function updateDDserviceChart(headerSection: Element | null) {
    const img = headerSection?.querySelector("#ddChart");

    if (getDownloadServiceTotalCount() < 1) {
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

    for (const year in getYearStatistics()) {
        years[yearStatisticsIdx] = year;
        yearStatisticsIdx++;
        if (getYearStatistics()[year] > highestValue)
            highestValue = getYearStatistics()[year];
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
        if (!isNonNullish(getYearStatistics()[i.toString()]))
            chartDataY += "0,";
        else
            chartDataY += 100 * getYearStatistics()[i.toString()] / highestValue + ",";
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

export function updateYearChart(headerSection: Element | null) {
    const img = headerSection?.querySelector("#yearChart");

    if (getYearTotalCount() < 2) {
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

export function updateCharts() {
    log("Updating charts");
    const headerSection = document.getElementsByTagName("section")[0];
    let chartDiv1 = headerSection.querySelector('div#chartDiv1');
    if (!chartDiv1) {
        chartDiv1 = document.createElement('div');
        chartDiv1.id = 'chartDiv1';
        headerSection.append(chartDiv1);
    }
    let chartDiv2 = headerSection.querySelector('div#chartDiv2');
    if (!chartDiv2) {
        chartDiv2 = document.createElement('div');
        chartDiv2.id = 'chartDiv2';
        headerSection.append(chartDiv2);
    }

    updateStatusChart(chartDiv1);
    updateSystemChart(chartDiv1);
    updateOwnershipChart(chartDiv1);
    updateDDserviceChart(chartDiv1);
    updateYearChart(chartDiv2);
}