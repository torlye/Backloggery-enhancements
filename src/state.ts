//Variables for gathering statistics
let downloadServiceStatistics: Record<string, number>;
let yearStatistics: Record<string, number>;
let downloadServiceTotalCount: number;
let yearTotalCount: number;
let gamesSum: number;
let systemCount: Record<string, number>;
let ownershipCount: number[];

const resetStatistics = () => {
    downloadServiceStatistics = {};
    yearStatistics = {};
    downloadServiceTotalCount = 0;
    yearTotalCount = 0;
    gamesSum = 0;
    systemCount = {};
    ownershipCount = [0, 0, 0, 0, 0, 0];
};

resetStatistics();

function updateYearStatistics(year: string) {
    yearTotalCount++;
    if (!yearStatistics[year])
        yearStatistics[year] = 1;

    else
        yearStatistics[year] += 1;
}

const updateSystem = (system: string) => {
    if (!systemCount[system])
        systemCount[system] = 1;
    else
        systemCount[system]++;
};