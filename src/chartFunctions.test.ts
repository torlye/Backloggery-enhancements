/// <reference path="chartFunctions.ts" />

test('createPieChart', () => {
    expect(createPieChart("", "", "", false, 0, 0))
        .toBe("http://chart.apis.google.com/chart?cht=p&chs=0x0&chd=t:&chl=&chco=");

    expect(createPieChart("foo bar", "label text", "color value", true, -1, 99))
        .toBe("http://chart.apis.google.com/chart?cht=p&chs=-1x99&chd=t:foo bar&chl=label text&chf=bg,s,00000000&chco=color value");
});
