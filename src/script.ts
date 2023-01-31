/* This script uses icons from the "Silk" and "Diagona" icon sets, which may 
be found at http://www.famfamfam.com/lab/icons/silk/ 
and http://p.yusukekamiyamane.com/
*/

/*
Use transparent backgrounds for charts. Set to false if the text in the 
charts is hard to read.
*/
var transparentBackgroundForCharts = true;

//Enable or disable log messages in the browser's javascript console
var enableLogging = false;

/* In the pie charts, merge categories with very few games 
into an "other" category. 0.05 means that services with fewer than 5% of the 
total number of games will be put in the "other" category. 
This might make the chart less cluttered.
A setting between 0.10 and 0.01 recommended. Set to 0.00 to disable. */
var otherThreshold = 0.04

// Width and height of charts.
var chartWidth = 281;
var chartHeight = 100;

const ddicons: Record<string, number> = {};
const miscIcons: Record<string, number> = {};
const icon_urls: string[] = [];
const systemIcons: Record<string, string> = {};

//Association between keywords and icons
ddicons['gog.com'] = 0;
ddicons['gog'] = 0;
ddicons['steampowered.com'] = 2;
ddicons['steam'] = 2;
ddicons['playgreenhouse.com'] = 3;
ddicons['greenhouse'] = 3;
ddicons['telltalegames.com'] = 4;
ddicons['telltale'] = 4;
ddicons['zombie-cow.com'] = 5;
ddicons['zombie-cow'] = 5;
ddicons['impulsedriven.com'] = 6;
ddicons['impulse'] = 6;
ddicons['direct2drive.com'] = 7;
ddicons['direct2drive.co.uk'] = 7;
ddicons['direct2drive.eu'] = 7;
ddicons['direct2drive'] = 7;
ddicons['d2d'] = 7;
ddicons['gamersgate.com'] = 8;
ddicons['gamersgate'] = 8;
ddicons['amanita-design.net'] = 9;
ddicons['amanitadesign'] = 9;
ddicons['tale-of-tales.com'] = 10;
ddicons['taleoftales'] = 10;
ddicons['bigfinishgames.com'] = 11;
ddicons['bigfinish'] = 11;
ddicons['2dboy.com'] = 12;
ddicons['2dboy'] = 12;
ddicons['crayonphysics.com'] = 13;
ddicons['crayonphysics'] = 13;
ddicons['bit-blot.com'] = 14;
ddicons['bitblot'] = 14;
ddicons['areo.areograph.com'] = 15;
ddicons['areogames'] = 15;
ddicons['battle.net'] = 20;
ddicons['xboxlive'] = 21;
ddicons['gfw'] = 24;
ddicons['gamesforwindows'] = 24;
ddicons['gamesforwindowsmarketplace'] = 24;
ddicons['getgames'] = 23;
ddicons['getgamesgo'] = 23;
ddicons['android'] = 25;
ddicons['androidmarket'] = 25;
ddicons['googleplay'] = 25;
ddicons['yawma'] = 26;
ddicons['yawma.net'] = 26;
ddicons['humbleindiebundle'] = 27;
ddicons['humblebundle.com'] = 27;
ddicons['humblebundle'] = 27;
ddicons['desura'] = 28;
ddicons['desura.com'] = 28;
ddicons['beamdog'] = 29;
ddicons['beamdog.com'] = 29;
ddicons['casebookthegame.com'] = 30;
ddicons['casebook'] = 30;
ddicons['theballthegame.com'] = 31;
ddicons['theball'] = 31;
ddicons['origin'] = 32;
ddicons['nintendo'] = 33;
ddicons['psn'] = 34;
ddicons['sizefivegames.com'] = 35;
ddicons['sizefivegames'] = 35;
ddicons['indieroyale.com'] = 36;
ddicons['indieroyale'] = 36;
ddicons['gamefly.com'] = 37;
ddicons['gamefly'] = 37;
ddicons['amazon.com'] = 38;
ddicons['amazon'] = 38;
ddicons['greenmangaming.com'] = 39;
ddicons['greenmangaming'] = 39;
ddicons['gmg'] = 39;
ddicons['uplay'] = 40;
ddicons['uplay.ubi.com'] = 40;
ddicons['freebird'] = 41;
ddicons['freebirdgames'] = 41;
ddicons['freebirdgames.com'] = 41;
ddicons['indiegala'] = 42;
ddicons['indiegala.com'] = 42;
ddicons['kickstarter'] = 43;
ddicons['kickstarter.com'] = 43;
ddicons['indiegamestand'] = 44;
ddicons['indiegamestand.com'] = 44;
ddicons['indiegogo'] = 45;
ddicons['indiegogo.com'] = 45;
ddicons['gamestop'] = 46;
ddicons['gamestop.com'] = 46;
ddicons['groupees'] = 47;
ddicons['groupees.com'] = 47;
ddicons['playism'] = 48;
ddicons['playism-games.com'] = 48;
ddicons['bigfish'] = 49;
ddicons['bigfishgames'] = 49;
ddicons['bigfishgames.com'] = 49;
ddicons['dotemu'] = 50;
ddicons['dotemu.com'] = 50;
ddicons['indiecity'] = 51;
ddicons['indiecity.com'] = 51;
ddicons['nuuvem'] = 52;
ddicons['nuuvem.com.br'] = 52;
ddicons['windowsstore'] = 53;
ddicons['itch.io'] = 54;
ddicons['vive'] = 55;
ddicons['oculus'] = 56;
ddicons['rift'] = 56;

//Do not count these icons in the digital distribution stores chart
miscIcons['floppy'] = 16;
miscIcons['disc'] = 17;
miscIcons['cartridge'] = 18;
miscIcons['soundtrack'] = 19;
miscIcons['collectorsedition'] = 22;
miscIcons['specialedition'] = 22;

//List of URLs to icons
icon_urls[0] = "https://lh3.googleusercontent.com/-PhuK9fCqWXg/U4sbbMxLmYI/AAAAAAAABhQ/xYtsQcM6LiY/s800/gog.png";
icon_urls[2] = "https://store.steampowered.com/favicon.ico";
icon_urls[3] = "https://lh6.googleusercontent.com/-i1ugqfN2sM4/U4YanM5_lII/AAAAAAAABdM/RIndcc33kwo/s800/greenhouse.png";
icon_urls[4] = "https://lh3.googleusercontent.com/-LqhGwE8Uyjw/U4YcXukagxI/AAAAAAAABeU/ox9DrBYqDsg/s800/telltale.png";
icon_urls[5] = "https://lh5.googleusercontent.com/-wXSLqwLwihM/U4YcUesxPEI/AAAAAAAABeM/qecM551KaEc/s800/zombie-cow.png";
icon_urls[6] = "https://lh6.googleusercontent.com/-Pc3nu4XDPyE/U4YiGtNVuyI/AAAAAAAABgc/5HFCyvMykiQ/s800/impulse.png";
icon_urls[7] = "https://lh4.googleusercontent.com/-uzHpk1lSL34/U4YYKWxA_5I/AAAAAAAABcU/4V4aJ4p402I/s800/d2d.png";
icon_urls[8] = "https://www.gamersgate.com/favicon.ico";
icon_urls[9] = "https://lh5.googleusercontent.com/-G1BUB8sbDYM/U4Ycre-N0cI/AAAAAAAABe4/XCkQRlAKkRA/s800/amanitadesign.png";
icon_urls[10] = "https://lh4.googleusercontent.com/-z1mzei2qLuk/U4YcMNddPaI/AAAAAAAABeE/kCOwM1d0C98/s800/taleoftales.png";
icon_urls[11] = "https://lh5.googleusercontent.com/-ovDvrXveHKI/U4YY3pqECjI/AAAAAAAABcg/fLSfwSa4PdY/s800/bigfinish.png";
icon_urls[12] = "https://lh3.googleusercontent.com/-cqTpbNOc3Eo/U4YekNHEraI/AAAAAAAABf0/Uimh4LlA9fE/s800/2dboy.png";
icon_urls[13] = "https://lh6.googleusercontent.com/-BCOuRHWLVPU/U4YcMLRzYMI/AAAAAAAABeA/zoLcuAPTTL8/s800/crayonphysics.png";
icon_urls[14] = "https://lh3.googleusercontent.com/-YWvBV6SG95s/U4YVOZiDqOI/AAAAAAAABbg/DWks790O8Tw/s800/bit-blot.png";
icon_urls[15] = "https://lh4.googleusercontent.com/-hiTvab7fNeQ/U4YVNkVzdbI/AAAAAAAABcA/9IR0d7vj5Rw/s800/areogames.png";
icon_urls[16] = "https://lh4.googleusercontent.com/-Fw5IgzTXS0E/U4Yee5J6qWI/AAAAAAAABfs/1I6iJpnY46w/s800/floppy.png";
icon_urls[17] = "https://lh6.googleusercontent.com/-fgYO_GO8n0A/U4Yee6LkbrI/AAAAAAAABfc/syry88tZqUs/s800/disc.png";
icon_urls[18] = "https://lh3.googleusercontent.com/-iwXya8FD7AM/U4YVOp6-AvI/AAAAAAAABbk/WBMb1AgtN2c/s800/cart.png";
icon_urls[19] = "https://lh5.googleusercontent.com/-r8C-lX0w_bI/U4YefafJe7I/AAAAAAAABfo/niNWzjrY3zk/s800/soundtrack.png";
icon_urls[20] = "https://battle.net/static/images/meta/favicon.ico";
icon_urls[21] = "https://lh6.googleusercontent.com/-QRWAZw-QeVI/U4YbLQRWCvI/AAAAAAAABdc/UM6aD_OC45Q/s800/xboxlive.png";
icon_urls[22] = "https://lh6.googleusercontent.com/-VQx0m0aF2vU/U4Yee7XwMFI/AAAAAAAABfY/iQuU-QE9jJA/s800/collectors.png";
icon_urls[23] = "https://drive.google.com/uc?id=1w1yMX9TzI4cuwvJwlBkXaXQ1IIp3BWAQSQ";
icon_urls[24] = "https://lh3.googleusercontent.com/-n3zHP5ZTEk8/U4YoNRILjFI/AAAAAAAABgs/donquTXcOI8/s800/gamesforwindows.png";
icon_urls[25] = "https://lh4.googleusercontent.com/-8k0SFFIFooQ/U4YY4QHg-fI/AAAAAAAABco/6yRzMjhm3BA/s800/googleplay.png";
icon_urls[26] = "https://lh6.googleusercontent.com/-QBuHwtRK93I/U4YapJUfBEI/AAAAAAAABdU/MwwsXQ_3fW4/s800/yawma.png";
icon_urls[27] = "https://humblebundle-a.akamaihd.net/static/hashed/46cf2ed85a0641bfdc052121786440c70da77d75.png";
icon_urls[28] = "https://lh6.googleusercontent.com/-YE1_ScE2oSA/U4Yab588McI/AAAAAAAABc8/MW30tqHQTRo/s800/desura.png";
icon_urls[29] = "https://www.beamdog.com/images/2.0/favicon.png";
icon_urls[30] = "https://lh3.googleusercontent.com/-HwUaInJeAcM/U4YcrYrLjNI/AAAAAAAABe8/L1ks1Jtprqg/s800/casebookthegame.png";
icon_urls[31] = "https://lh6.googleusercontent.com/-imwyJ2Luq18/U4YcZ0s4j6I/AAAAAAAABec/HL0PGHlaD0I/s800/theball.png";
icon_urls[32] = "https://lh4.googleusercontent.com/-HrU72c5icvg/U4YalWTsVOI/AAAAAAAABdE/NvEzPCfVgpw/s800/origin.png";
icon_urls[33] = "https://lh5.googleusercontent.com/-1YJ5GkrcnBg/U4YbYfGR41I/AAAAAAAABds/hk6DEBHe6CI/s800/nintendo.png";
icon_urls[34] = "https://i.imgur.com/BEHlNk2.png";
icon_urls[35] = "https://lh6.googleusercontent.com/-sUX5ivzf6ZY/U4Ycr0vY0nI/AAAAAAAABe0/cchIab0uxsk/s800/sizefivegames.png";
icon_urls[36] = "https://lh6.googleusercontent.com/-KXKZW_UP__k/U4YcrhklOqI/AAAAAAAABew/iZYgGG_T7GM/s800/indieroyale.png";
icon_urls[37] = "https://lh6.googleusercontent.com/-T6pBLW644C4/U4YaRDp7F-I/AAAAAAAABc0/tXWjiAAenZ0/s800/gamefly.png";
icon_urls[38] = "https://lh3.googleusercontent.com/-gNQGzO6OVp8/U4YVNiESYAI/AAAAAAAABbs/yFfiybWjTNk/s800/amazon.png";
icon_urls[39] = "https://www.greenmangaming.com/static/favicon.ico";
icon_urls[40] = "https://static2.cdn.ubi.com/gamesites/uplay/201212201711/img/favicon.ico";
icon_urls[41] = "https://lh6.googleusercontent.com/-mquB7vxjefw/U4YcrV1mJ8I/AAAAAAAABfE/N8IEKbWLgv8/s800/freebird.png";
icon_urls[42] = "https://www.indiegala.com/favicon.ico";
icon_urls[43] = "https://lh4.googleusercontent.com/-QxASAMDxDtY/U4YbYdMopKI/AAAAAAAABd0/aktUFbnE_Lk/s800/kickstarter.png";
icon_urls[44] = "https://drive.google.com/uc?id=1i8bjKbIE6JfMNUanDz6-vri0HfI4ZDSI";
icon_urls[45] = "https://lh5.googleusercontent.com/-33drwcq-8Mg/U4YbYdhNlbI/AAAAAAAABdo/o1tR4OM3SaA/s800/indiegogo.png";
icon_urls[46] = "https://www.gamestop.com/favicon.ico";
icon_urls[47] = "https://lh5.googleusercontent.com/-JqxT5YXGyxo/VLJUVkpErPI/AAAAAAAABmQ/IQcgSJH8iGQ/s800/groupees.png";
icon_urls[48] = "https://lh3.googleusercontent.com/--2pe41xzPjQ/VLJUWniehmI/AAAAAAAABmA/RglbG5rP3Jk/s800/playism-games.png";
icon_urls[49] = "https://lh3.googleusercontent.com/-WTH88IRzlQA/VLJUVpYqu8I/AAAAAAAABmM/b3QZTgeeI4s/s800/bigfishgames.png";
icon_urls[50] = "https://lh3.googleusercontent.com/-q3n7oxCgWso/VLJUVsGuhnI/AAAAAAAABmY/iD6J0AtUpdw/s800/dotemu.png";
icon_urls[51] = "https://lh6.googleusercontent.com/-7W3inoXb0rA/VLJUWHMPa1I/AAAAAAAABmI/v2l2bu1WiB8/s800/indiecity.png";
icon_urls[52] = "https://lh6.googleusercontent.com/-yFqz3QiC_kA/VLJWAcx6cbI/AAAAAAAABmo/WhfJU1JhuoU/s800/nuuvem.png";
icon_urls[53] = "https://lh3.googleusercontent.com/-L0Ae5fzDP9I/VLJUXP5o9RI/AAAAAAAABl8/xb9GYMwX3F0/s800/windowsstore.png";
icon_urls[54] = "https://lh5.googleusercontent.com/-CZqVqn8d67I/VLJUWchVXyI/AAAAAAAABmE/ehhftDUkpi4/s800/itch.io.png";
icon_urls[55] = "https://www.vive.com/static/images/favicon.ico";
icon_urls[56] = "https://static.oculus.com/web/www_static/production/US/4a9fcf4a36ddb3b04c2a311d67ae58f39b17a5c5/baxter/baxter-0.6.9/images/meta/favicon.png";

//Icons for game systems defined by backloggery.com
systemIcons['BNet'] = "Battle.net";
systemIcons['Bdog'] = "Beamdog";
systemIcons['BFG'] = "BigFishGames";
systemIcons['Desura'] = "Desura";
systemIcons['DotEmu'] = "DotEmu";
systemIcons['GGate'] = "GamersGate";
systemIcons['G4W'] = "GamesforWindows";
systemIcons['GGames'] = "GetGames";
systemIcons['GMG'] = "GMG";
systemIcons['GOG'] = "GOG";
systemIcons['Imp'] = "GameStop";
systemIcons['IndieC'] = "IndieCity";
systemIcons['Nuuvem'] = "Nuuvem";
systemIcons['Origin'] = "Origin";
systemIcons['Steam'] = "Steam";
systemIcons['UPlay'] = "UPlay";
systemIcons['WinStr'] = "WindowsStore";

//Variables for gathering statistics
var downloadServiceStatistics: Record<string, number> = {};
var yearStatistics: Record<string, number> = {};
var downloadServiceTotalCount = 0;
var yearTotalCount = 0;
var gamesSum = 0;
var systemCount: Record<string, number> = {};
var ownershipCount: number[] = new Array(6);
for (let i = 0; i < ownershipCount.length; i++)
  ownershipCount[i] = 0;

//Process game list on games.php page
function gameListUpdated() {
  log("gameListUpdated starts");
  detachGameListEventReceiver();
  
  var gameboxesProcessed = 0;
  
  $("section.gamebox:not(.processed):not(.boxtop):not(.systemend)").each(function(this: Element, index) {
    if (enableLogging)
      log("Processing gamebox "+$(this).find("h2 b:first").text());
    
    if ($(this).find('h2 img[alt="Comp"]').length > 0) {
      log("Skipping this gamebox, it's a compilation");
      $(this).addClass("processed");
      return;
    }
    
    var gameRow1 = $(this).find("div.gamerow").first();
    var gameRow2 = $(this).find("div.gamerow").eq(1);
    
    //Get system information
    var system = $.trim(gameRow1.text()).split(" ")[0];
    log("System is "+system);
    if (!systemCount[system])
      systemCount[system] = 1;
    else
      systemCount[system]++;
    
	//Add icons for systems that really represent digital distribution stores
	addSystemIcon(system, gameRow1);
    
    //Get ownership information
    if (gameRow1.find('img[title="Household"]').length > 0)
      ownershipCount[1]++;
    else if (gameRow1.find('img[title="Subscription"]').length > 0)
      ownershipCount[2]++;
    else if (gameRow1.find('img[title="Borrowed/Rented"]').length > 0)
      ownershipCount[3]++;
    else if (gameRow1.find('img[title="Formerly Owned"]').length > 0)
      ownershipCount[4]++;
    else if (gameRow1.find('img[title="Ownership: Other"]').length > 0)
      ownershipCount[5]++;
    else
      ownershipCount[0]++;
  
    //Parse words
    const words: Array<string|null> = gameRow2.text().split(" ");
    let hasYear = false;
    for (const i in words) {
      const word = words[i];
      
      //Get year
      if (!hasYear) {
        hasYear = createYearLabelFromKeyWord(word as string, gameRow1.find("b:first"));
        if (hasYear) {
          words[i] = null;
          continue;
        }
      }
      
      //Create icons from keyword
      if (createIconsFromKeyWord(word as string, gameRow1)) {
        words[i] = null;
        continue;
      }
    }
    gameRow2.text(words.join(" "));
    if (! /\S/.test(gameRow2.text()))
      gameRow2.remove();
    
    $(this).addClass("processed");
    gameboxesProcessed++;
    gamesSum++;
  });
  
  if (gameboxesProcessed > 0) {
    updateCharts();
  }
  
  attachGameListEventReceiver();
  log("gameListUpdated end");
}

//Process now playing list
function processNowPlayingList() {
  $("div.npgame").each(function(this: Element, index) {
    const progressDiv = $(this).children().eq(-2);
    const words: Array<string|null> = progressDiv.contents().get(0).getAttribute("data-torscriptdata")?.split(" ") ?? [];
    let hasYear = false;
    progressDiv.prepend("<span class='scripticons'></span>");
    for (const i in words) {
      const word = words[i];
      if (!hasYear) {
        hasYear = createYearLabelFromKeyWord(word as string, progressDiv.prev());
        if (hasYear) {
          words[i] = null;
          continue;
        }
      }
      
      if (createIconsFromKeyWord(word as string, progressDiv.find("span.scripticons"))) {
        words[i] = null;
        continue;
      }
    }
    progressDiv.contents().get(1).setAttribute("data-torscriptdata", words.join(" "));
  });
}

//Process multitap
function processMultitap() {
  $("div.friend li").each(function(this: Element, index) {
    if ($(this).contents().length < 4) return;
    const words: Array<string|null> = $(this).contents().get(3).getAttribute("data-torscriptdata")?.split(" ") ?? [];
    const hasYear = false;
    $(this).append("<span class='scripticons'></span>");
    for (let i in words) {
      const word = words[i];
      if (createIconsFromKeyWord(word as string, $(this).find("span.scripticons"))) {
        words[i] = null;
        continue;
      }
    }
    $(this).contents().get(3).setAttribute("data-torscriptdata", words.join(" "));
  });
}

function createYearLabelFromKeyWord(word: string, yearNode: JQuery) {
  const year = /^\((\d{4})\)$/.exec($.trim(word));
  if (year) {
    log("Appending year node "+year[0]);
    yearNode.append(" "+year[0]);
    //Update year statistics
    yearTotalCount++;
    if (!yearStatistics[year[1]])
      yearStatistics[year[1]] = 1;
    else
      yearStatistics[year[1]] += 1;
    return true;
  }
  return false;
}

function addSystemIcon(system: string, iconsNode: JQuery) {
  if (systemIcons[system])
    createIconsFromKeyWord("["+systemIcons[system]+"]", iconsNode);
}

function createIconsFromKeyWord(word: string, iconsNode: JQuery) {
  var keyWord = /^\[([\w\.-]+)\]$/.exec($.trim(word));
  if (keyWord) {
    log("Found keyword "+keyWord[1]);
    
    //Try to parse keyword as download service icon
    var iconNumber = ddicons[keyWord[1].toLowerCase()];
    if (isValid(iconNumber)) {
      appendIconNumberToNode(iconNumber, keyWord[1], iconsNode);
      
      //Increment counters for charts
      downloadServiceTotalCount++;
      if (!downloadServiceStatistics[keyWord[1]])
        downloadServiceStatistics[keyWord[1]] = 1;
      else
        downloadServiceStatistics[keyWord[1]]++;
      return true;
    }
    
    //Try to parse keyword as "misc" icon
    iconNumber = miscIcons[keyWord[1].toLowerCase()];
    if (isValid(iconNumber)) {
      appendIconNumberToNode(iconNumber, keyWord[1], iconsNode);
      return true;
    }
  }
  return false;
}

function appendIconNumberToNode(iconNumber:number, iconTitle: string, node: JQuery) {
  log("Appending icon "+iconNumber+" with title "+iconTitle+" to current node");
  node.append(createIconFromURLandTitle(icon_urls[iconNumber], iconTitle));
}

function createIconFromURLandTitle(url: string, title: string) {
  return ' <span class="info"><img width="16" height="16" src="' + url + 
    '" alt="' + title + '" title="' + title + '" ' + 
    'style="margin-bottom: -1px;" /></span> ';
}

function updateCharts() {
  log("Updating charts");
  var headerSection = $("section").first();
  if (headerSection.find('div#chartDiv1').length < 1)
    headerSection.append("<div id='chartDiv1'></div>");
  if (headerSection.find('div#chartDiv2').length < 1)
    headerSection.append("<div id='chartDiv2'></div>");
  
  updateStatusChart(headerSection.find('div#chartDiv1'));
  updateSystemChart(headerSection.find('div#chartDiv1'));
  updateOwnershipChart(headerSection.find('div#chartDiv1'));
  updateDDserviceChart(headerSection.find('div#chartDiv1'));
  updateYearChart(headerSection.find('div#chartDiv2'));
}

function updateStatusChart(headerSection: JQuery) {
  var img = headerSection.find("#statusChart");
  if (img.length > 0)
    return;
    
  $('div#maincolumn > section:first > table').css('display', 'none');
  
  var tableRows = $('div#maincolumn > section:first > table tr');
  var unfinishedCount = tableRows.eq(0).children(":eq(1)").text(); 
  var beatenCount = tableRows.eq(1).children(":eq(1)").text(); 
  var completedCount = tableRows.eq(2).children(":eq(1)").text();
  if (!isValidAndNotEmpty(unfinishedCount) || 
      !isValidAndNotEmpty(beatenCount) || 
      !isValidAndNotEmpty(completedCount) || 
      parseInt(unfinishedCount) + parseInt(beatenCount) + parseInt(completedCount) < 1)
    return; 
  
  var data = unfinishedCount + "," +
    beatenCount + "," + completedCount;
  
  var url = createPieChart(data, 
    "Unfinished|Beaten|Completed", "990000,BDBDBD,FFCC66",
    transparentBackgroundForCharts, chartWidth, chartHeight);
    
  log("Adding status chart");
  var imgHtml = "<img src='" + url + 
    "' title='Status chart' " + 
    "alt='Status chart' id='statusChart' " +
    "width='" + chartWidth + "' height='" + chartHeight + "'/> ";
  headerSection.append(imgHtml);
}

function updateSystemChart(headerSection: JQuery) {
  var img = headerSection.find("#systemChart");
  
  if (gamesSum < 1) {
    img.remove();
    return;
  }
  
  var url = createSystemChartUrl();
  if (isValidAndNotEmpty(url)) {
    if (img.length > 0) {
      log("Updating system chart");
      img.attr("src", url);
    } else {
      log("Adding system service chart");
      var imgHtml = "<img src='" + url + 
      "' title='System chart' " + 
      "alt='System chart' id='systemChart' " +
      "width='" + chartWidth + "' height='" + chartHeight + "'/> ";
      headerSection.append(imgHtml);
    }
  }
}

function updateOwnershipChart(headerSection: JQuery) {
  var img = headerSection.find("#ownershipChart");
  
  if (gamesSum < 1) {
    img.remove();
    return;
  }
  
  var url = createOwnershipChartUrl();
  if (isValidAndNotEmpty(url)) {
    if (img.length > 0) {
      log("Updating ownership chart");
      img.attr("src", url);
    } else {
      log("Adding ownership service chart");
      var imgHtml = "<img src='" + url + 
      "' title='Ownership chart' " + 
      "alt='Ownership chart' id='ownershipChart' " +
      "width='" + chartWidth + "' height='" + chartHeight + "'/> ";
      headerSection.append(imgHtml);
    }
  }
}

function updateDDserviceChart(headerSection: JQuery) {
  var img = headerSection.find("#ddChart");
  
  if (downloadServiceTotalCount < 1) {
    img.remove();
    return;
  }
  
  var url = createDDserviceChartUrl();
  if (isValidAndNotEmpty(url)) {
    if (img.length > 0) {
      log("Updating DD service chart");
      img.attr("src", url);
    } else {
      log("Adding DD service chart");
      var imgHtml = "<img src='" + url + 
      "' title='Digital distribution services chart' " + 
      "alt='Digital distribution services chart' id='ddChart' " +
      "width='" + chartWidth + "' height='" + chartHeight + "'/> ";
      headerSection.append(imgHtml);
    }
  }
}

function updateYearChart(headerSection: JQuery) {
  var img = headerSection.find("#yearChart");
  
  if (yearTotalCount < 2) {
    img.remove();
    return;
  }
  
  var url = createYearChartUrl();
  if (isValidAndNotEmpty(url)) {
    if (img.length > 0) {
      log("Updating year chart");
      img.attr("src", url);
    } else {
      log("Adding year chart");
      const imgHtml = "<img src='" + url + 
      "' title='Release years chart' alt='Release years chart' id='yearChart' " +
      "width='" + chartWidth*2 + "' height='" + chartHeight + "'/> ";
      headerSection.append(imgHtml);
    }
  }
}

function createSystemChartUrl() {
  var chartData = "";
  var chartLabels = "";
  var other = 0;
    
  for (var system in systemCount) {
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
    chartData.substr(0, chartData.length-1), 
    chartLabels.substr(0, chartLabels.length-1), 
    "7777ff", transparentBackgroundForCharts, chartWidth, chartHeight);
}

function createOwnershipChartUrl() {
  const ownershipLabels = ["Owned", "Household", "Subscription", "Borrowed/Rented", "Formerly Owned", "Other"];
    
  //Use chart colors similar to the ownership icons
  var colors = ["b6b718", "fffcb5", "dec123", "7a9e9c", "9bacff", "9b89b6"];
    
  var chartData = "";
  var chartLabels = "";
  var chartColors = "";
    
  for (let i = 0; i < ownershipCount.length; i++)
    if (ownershipCount[i] > 0) {
      chartData += 100 * ownershipCount[i] / gamesSum + ",";
      chartLabels += ownershipLabels[i] + "|";
      chartColors += colors[i] + ",";
    }
  
  return createPieChart(
    chartData.substr(0, chartData.length-1),
    chartLabels.substr(0, chartLabels.length-1),
    chartColors.substr(0, chartColors.length-1),
    transparentBackgroundForCharts, chartWidth, chartHeight);
}

function createDDserviceChartUrl() {
  var chartData = "";
  var chartLabels = "";
  var other = 0;
  
  for (var keyword in downloadServiceStatistics) {
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
    chartData.substr(0, chartData.length-1), 
    chartLabels.substr(0, chartLabels.length-1), 
    "11aa11", transparentBackgroundForCharts, chartWidth, chartHeight);
}

function createYearChartUrl() {
  var years: string[] = new Array();
  var yearStatisticsIdx = 0;
  var highestValue = 0;

  for (var year in yearStatistics) {
    years[yearStatisticsIdx] = year;
    yearStatisticsIdx++;
    if (yearStatistics[year] > highestValue)
      highestValue = yearStatistics[year];
  }
  years.sort();

  var lowestYear = parseInt(years[0]);
  var highestYear = parseInt(years[years.length-1]);

  var chartDataX = "";
  var chartDataY = "";

  var chartLabelScaleFactor = Math.ceil((1 + highestYear - lowestYear) / 20);

  for (var i = lowestYear; i <= highestYear; i++) {
    if (i%chartLabelScaleFactor == 0)
      chartDataX += i + "|";
    else
      chartDataX += "|";
    if (yearStatistics[i.toString()] == null)
      chartDataY += "0,";
    else
      chartDataY += 100*yearStatistics[i.toString()] / highestValue + ",";
  }

  var barChartUrl = "http://chart.apis.google.com/chart" +
  "?cht=bvs&chs=" + chartWidth*2 + "x" + chartHeight +
  "&chd=t:" + chartDataY.substr(0, chartDataY.length-1) +
  "&chxl=0:|" + chartDataX.substr(0, chartDataX.length-1) +
  "&chxt=x,y&chbh=a" +
  "&chxr=1,0," + highestValue;
  
  if (transparentBackgroundForCharts)
    barChartUrl += "&chf=bg,s,00000000";
  barChartUrl += "&chco=4D89F9";

  log(barChartUrl);
  return barChartUrl;
}

//Creates pie chart from parameters
function createPieChart(data: string, labels: string, colors: string, transparent: boolean, width: number, height:number){
  var pieChartUrl = "http://chart.apis.google.com/chart" + 
    "?cht=p&chs=" + width + "x" + height + 
    "&chd=t:" + data + "&chl=" + labels;
    
  if (transparent)
    pieChartUrl += "&chf=bg,s,00000000";
  
  pieChartUrl += "&chco=" + colors;
  
  log(pieChartUrl);
  return pieChartUrl;
}

function isValid(variable: any) {
  if (typeof variable != 'undefined' && variable != null) {
    return true;
  }
  return false;
}

function isValidAndNotEmpty(variable: any) {
  if (isValid(variable) && variable != "") {
    return true;
  }
  return false;
}

function log(message: string) {
  if (enableLogging) {
    var now = new Date();
    var addZero = function(d: number|string) {
      if (d < 10) d = "0" + d; return d;
    };
    var millis: number|string = now.getMilliseconds();
    if (millis < 10) millis = "00" + millis;
    else if (millis < 100) millis = "0" + millis;
    
    const displayMessage = addZero(now.getHours()) + ":" +
      addZero(now.getMinutes()) + ":" +
      addZero(now.getSeconds()) + ":" +
      millis + " " + message;
    console.log(displayMessage);
  }
}

function attachGameListEventReceiver() {
  $("div#content").bind("DOMNodeInserted", gameListUpdated);
}

function detachGameListEventReceiver() {
  $("div#content").unbind("DOMNodeInserted", gameListUpdated);
}

var loadAllTriggered = false;
$(document).keyup(function(event) {
  if (event.which == 76 && event.shiftKey && event.ctrlKey && !isLoadingAjax()) { //Ctrl-Shift-L
    if (!loadAllTriggered && documentContainsStuffToLoad()) {
      log("Starting load all");
      detachGameListEventReceiver();
      addActivityIndicator();
      loadAllTriggered = true;
      tryLoadNext();
    }
  }
});

function documentContainsStuffToLoad() {
  return ($("input[type='button'][value='Show more games']").length > 0) || ($(".lessmore[onclick]:contains('\u25BC')").length > 0);
}

function isLoadingAjax() {
  return $("img[src$='AJAX_loading.gif']").length > 0;
}

function tryLoadNext() {
  $("div#content").unbind("DOMNodeInserted", tryLoadNext);
  if (isLoadingAjax())
    $("div#content").bind("DOMNodeInserted", tryLoadNext);
  else
    triggerNext();
}

function triggerNext() {
  var showMoreBtn = $("input[type='button'][value='Show more games']");
  if (showMoreBtn.length > 0) {
    log("Loading next page");
    showMoreBtn.click();
    setTimeout(tryLoadNext, 1000);
    return;
  }
  var expandBtn = $(".lessmore[onclick]:contains('\u25BC')").first();
  if (expandBtn.length > 0) {
    log("Expanding collection");
    expandBtn.click();
    setTimeout(tryLoadNext, 1000);
    return;
  }
  log("Load all done");
  gameListUpdated();
  removeActivityIndicator();
}

function addActivityIndicator() {
  var x = (window.innerWidth - 100)/2;
  var y = (window.innerHeight - 100)/2;
  $(document.body).append('<div class="loadallindicator" style="width:100px;height:100px;position:fixed;left:' + x + 'px;top:' + y + 'px;z-index:100;background-color:black;opacity:0.7"></div>');
  
  x += 28; y += 27;
  $(document.body).append('<img class="loadallindicator" style="position:fixed;left:' + x + 'px;top:' + y + 'px;z-index:100" src="images/AJAX_loading.gif?foo" alt="Now Loading..." width="44" height="46" />');
}

function removeActivityIndicator() {
  $('.loadallindicator').remove();
}

processNowPlayingList();
processMultitap();
gameListUpdated();