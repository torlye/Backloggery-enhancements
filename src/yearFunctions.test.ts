import { getYearStatistics, getYearTotalCount, resetStatistics } from './state';
import { createYearLabelFromKeyWord } from './yearFunctions';

test('createYearLabelFromKeyWord', () => {
    const el = document.createElement("div");
    el.textContent = "foo";
    expect(createYearLabelFromKeyWord("", el)).toBe(false);
    expect(createYearLabelFromKeyWord("1999", el)).toBe(false);
    expect(createYearLabelFromKeyWord("(1999)", el)).toBe(true);
    expect(el.textContent).toBe(" (1999)");
    expect(getYearStatistics()["1999"]).toBe(1);
    expect(getYearTotalCount()).toBe(1);
});

beforeEach(resetStatistics);