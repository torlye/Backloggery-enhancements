function isNonNullish(variable: string | number | null | undefined) {
    if (typeof variable !== 'undefined' && variable !== null) {
        return true;
    }
    return false;
}

function isNonEmpty(value: string | null | undefined) {
    if (isNonNullish(value) && value !== "") {
        return true;
    }
    return false;
}