export function isNonNullish(value: string | number | null | undefined): value is string | number {
    if (typeof value !== 'undefined' && value !== null) {
        return true;
    }
    return false;
}

export function isNonEmpty(value: string | null | undefined): value is string {
    if (isNonNullish(value) && value !== "") {
        return true;
    }
    return false;
}

export const getDirectTextContent = (element: Element | null) => {
    if (!element) return '';

    return Array.from(element.childNodes).reduce(
        (accumulator, currentValue) =>
            accumulator + (currentValue.nodeType === Node.TEXT_NODE ? currentValue.textContent : ''),
        '');
};