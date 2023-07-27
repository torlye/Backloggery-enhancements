import { isNonEmpty, isNonNullish } from "./utils";

test('isNonNullish', () => {
    expect(isNonNullish(undefined)).toBe(false);
    expect(isNonNullish(null)).toBe(false);
    expect(isNonNullish("")).toBe(true);
    expect(isNonNullish(0)).toBe(true);
});

test('isNonEmpty', () => {
    expect(isNonEmpty(undefined)).toBe(false);
    expect(isNonEmpty(null)).toBe(false);
    expect(isNonEmpty("")).toBe(false);
    expect(isNonEmpty(" ")).toBe(true);
});