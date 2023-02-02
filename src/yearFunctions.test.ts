/// <reference path="yearFunctions.ts" />

test('createYearLabelFromKeyWord', () => {
    const el = document.createElement("div");
    el.textContent = "foo";
    expect(createYearLabelFromKeyWord("", $(el))).toBe(false);
    expect(createYearLabelFromKeyWord("1999", $(el))).toBe(false);
    expect(createYearLabelFromKeyWord("(1999)", $(el))).toBe(true);
    expect(el.textContent).toBe("foo (1999)");
});
