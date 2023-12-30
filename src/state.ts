//Variables for gathering statistics
let downloadServiceStatistics: Record<string, number>;
let yearStatistics: Record<string, number>;
let downloadServiceTotalCount: number;
let yearTotalCount: number;
let gamesSum: number;
let systemCount: Record<string, number>;
let ownershipCount: number[];

export const getDownloadServiceStatistics = () => downloadServiceStatistics;
export const getYearStatistics = () => yearStatistics;
export const getDownloadServiceTotalCount = () => downloadServiceTotalCount;
export const getYearTotalCount = () => yearTotalCount;
export const getGamesSum = () => gamesSum;
export const setGamesSum = (value: number) => gamesSum = value;
export const incrementGamesSum = () => gamesSum++;
export const getSystemCount = () => systemCount;
export const getOwnershipCount = () => ownershipCount;
export const setOwnershipCount = (value: number[]) => ownershipCount = value;

export const resetStatistics = () => {
    downloadServiceStatistics = {};
    yearStatistics = {};
    downloadServiceTotalCount = 0;
    yearTotalCount = 0;
    gamesSum = 0;
    systemCount = {};
    ownershipCount = [0, 0, 0, 0, 0, 0];
};

resetStatistics();

export function updateYearStatistics(year: string) {
    yearTotalCount++;
    if (!yearStatistics[year])
        yearStatistics[year] = 1;

    else
        yearStatistics[year] += 1;
}

export const updateSystemStatistics = (system: string) => {
    if (!systemCount[system])
        systemCount[system] = 1;
    else
        systemCount[system]++;
};

export const updateDownloadServiceStatistics = (keyWord: string) => {
    downloadServiceTotalCount++;
    if (!downloadServiceStatistics[keyWord])
        downloadServiceStatistics[keyWord] = 1;
    else
        downloadServiceStatistics[keyWord]++;
};