# Backloggery-enhancements

## General info
This scripts adds various new presentation features to the [backloggery.com](http://backloggery.com) website, to enhance the experience and help better organize your games. Features include:
- Icons for game digital distribution services in the My Games and Now Playing lists
- Displays release years in the *My Games* and *Now Playing lists*
- Pie charts of game systems, game ownership, completion status and digital distribution services
- A bar chart that shows release years


![](https://lh3.googleusercontent.com/-8uI5rcEAFFo/U4YN2ewTQsI/AAAAAAAABbA/e0Z9aHHbL18/s500/chromescreenshot.png)

![](https://lh6.googleusercontent.com/-rEsQ8c9Ci5I/U4bhgq7pVBI/AAAAAAAABhA/pPc0it0IjR4/s500/Chrome%2520screenshot%25203.png)


## Supported browsers

The script is tested to work in Firefox and Chrome, but should generally work in any HTML5-capable browser that supports user scripts.

If you are a Chrome user you can now get the script as a Chrome extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/tors-backloggery-enhancem/bnphjpgoelijapfpilanaikifnekcmfc). The functionality is exactly the same, but the extension is much easier to install for Chrome users and will be auto-updated when a new version is released.

## How to use
- Install the script in your browser. The game system, game ownership and completion status pie charts will start working right away. In order to use the remaining features, update your games list at backloggery.com in the following way:
- Add the release year, e.g. `(1999)`, to each game's "Progress Note" field. Put parentheses around the year. The release year chart will appear after you have added release years to a few games.
- Add the name of the digital distribution service (e.g. `[GOG]`, `[Steam]`, or `[Origin]`) to each game's "Progress Note" field. Put square brackets around the name. This will add the digital distribution service's icon to your game in the game list. Once you have added digital distribution information to a few games, the digital distribution service pie chart will appear.
- If you want, you can also put additional keywords in square brackets, such as `[Soundtrack]` or `[Disc]`. This will add extra icons to the game listing.


### Example
![](https://lh5.googleusercontent.com/-zLSxf1Re8ZA/U4YLLW0pSXI/AAAAAAAABao/_fuIemqLgOY/s400/newscreen1.png)

Enter `(2005)` to indicate the game was released in 2005, `[Steam]` to indicate you purchased this game on Steam, and `[Soundtrack]` to show that you own the soundtrack to the game. This will produce the following output in My Games:

![](https://lh5.googleusercontent.com/-vadnCrEqXeA/U4YLLUTF7AI/AAAAAAAABaw/V5mNOqQNzrA/s400/newscreen3.png)

Even though you use the bracketed keywords, you can still use the Progress Note field for its intended purpose. Just add normal text to the field after your keywords.

![](https://lh4.googleusercontent.com/-RZOOp8U5rDs/U4YLLQTc87I/AAAAAAAABag/6dzSQrw4SU4/s400/newscreen2.png)

![](https://lh6.googleusercontent.com/-OdUyV9ISnDk/U4YLLwxs8RI/AAAAAAAABak/vvu1D_68-SU/s400/newscreen4.png)

Feel free to check [my Backloggery site](http://backloggery.com/tor) to see an example of how the charts and icons look with a fully-populated games list.

## List of keywords and icons
The script will only display icons for keywords that it recognizes. Keywords are not case sensitive, so you can capitalize them any way you want. More keywords can be added upon request, so feel free to contact me.

Most icons have several different keywords to choose from. Pick whichever one you prefer.

### Third party digital distribution stores—theses stores sell games from many different developers

![](https://lh3.googleusercontent.com/-gNQGzO6OVp8/U4YVNiESYAI/AAAAAAAABbs/yFfiybWjTNk/s800/amazon.png) amazon, amazon.com

![](https://lh4.googleusercontent.com/-8k0SFFIFooQ/U4YY4QHg-fI/AAAAAAAABco/6yRzMjhm3BA/s800/googleplay.png) android, androidmarket, googleplay

![](https://www.beamdog.com/images/2.0/favicon.png) beamdog, beamdog.com

![](https://lh3.googleusercontent.com/-WTH88IRzlQA/VLJUVpYqu8I/AAAAAAAABmM/b3QZTgeeI4s/s800/bigfishgames.png) bigfish, bigfishgames, bigfishgames.com

![](https://lh6.googleusercontent.com/-YE1_ScE2oSA/U4Yab588McI/AAAAAAAABc8/MW30tqHQTRo/s800/desura.png) desura, desura.com

![](https://lh4.googleusercontent.com/-uzHpk1lSL34/U4YYKWxA_5I/AAAAAAAABcU/4V4aJ4p402I/s800/d2d.png) direct2drive.com, direct2drive.co.uk, direct2drive.eu, direct2drive, d2d

![](https://lh3.googleusercontent.com/-q3n7oxCgWso/VLJUVsGuhnI/AAAAAAAABmY/iD6J0AtUpdw/s800/dotemu.png) dotemu, dotemu.com

![](https://lh6.googleusercontent.com/-T6pBLW644C4/U4YaRDp7F-I/AAAAAAAABc0/tXWjiAAenZ0/s800/gamefly.png) gamefly, gamefly.com<br/> 

![](https://www.gamersgate.com/favicon.ico) gamersgate.com, gamersgate

![](https://www.gamestop.com/favicon.ico) gamestop.com, gamestop<br/>

![](https://drive.google.com/uc?id=1w1yMX9TzI4cuwvJwlBkXaXQ1IIp3BWAQSQ) getgames, getgamesgo

![](https://lh3.googleusercontent.com/-n3zHP5ZTEk8/U4YoNRILjFI/AAAAAAAABgs/donquTXcOI8/s800/gamesforwindows.png) gfw, gamesforwindows, gamesforwindowsmarketplace

![](https://www.greenmangaming.com/static/favicon.ico) gmg, greenmangaming, greenmangaming.com<br/>

![](https://lh3.googleusercontent.com/-PhuK9fCqWXg/U4sbbMxLmYI/AAAAAAAABhQ/xYtsQcM6LiY/s800/gog.png) gog.com, gog

![](https://lh5.googleusercontent.com/-JqxT5YXGyxo/VLJUVkpErPI/AAAAAAAABmQ/IQcgSJH8iGQ/s800/groupees.png) groupees, groupees.com

![](https://humblebundle-a.akamaihd.net/static/hashed/46cf2ed85a0641bfdc052121786440c70da77d75.png) humbleindiebundle, humblebundle, humblebundle.com

![](https://lh6.googleusercontent.com/-Pc3nu4XDPyE/U4YiGtNVuyI/AAAAAAAABgc/5HFCyvMykiQ/s800/impulse.png) impulse, impulsedriven.com

![](https://lh6.googleusercontent.com/-7W3inoXb0rA/VLJUWHMPa1I/AAAAAAAABmI/v2l2bu1WiB8/s800/indiecity.png) indiecity, indiecity.com

![](https://www.indiegala.com/favicon.ico) indiegala, indiegala.com

![](https://drive.google.com/uc?id=1i8bjKbIE6JfMNUanDz6-vri0HfI4ZDSI) indiegamestand, indiegamestand.com

![](https://lh5.googleusercontent.com/-CZqVqn8d67I/VLJUWchVXyI/AAAAAAAABmE/ehhftDUkpi4/s800/itch.io.png) itch.io

![](https://lh5.googleusercontent.com/-1YJ5GkrcnBg/U4YbYfGR41I/AAAAAAAABds/hk6DEBHe6CI/s800/nintendo.png) nintendo

![](https://lh6.googleusercontent.com/-yFqz3QiC_kA/VLJWAcx6cbI/AAAAAAAABmo/WhfJU1JhuoU/s800/nuuvem.png) nuuvem, nuuvem.com.br

![](https://lh4.googleusercontent.com/-HrU72c5icvg/U4YalWTsVOI/AAAAAAAABdE/NvEzPCfVgpw/s800/origin.png) origin

![](https://lh6.googleusercontent.com/-i1ugqfN2sM4/U4YanM5_lII/AAAAAAAABdM/RIndcc33kwo/s800/greenhouse.png) playgreenhouse.com, greenhouse

![](https://lh3.googleusercontent.com/--2pe41xzPjQ/VLJUWniehmI/AAAAAAAABmA/RglbG5rP3Jk/s800/playism-games.png) playism, playism-games.com

![](https://i.imgur.com/BEHlNk2.png) psn

![](https://store.steampowered.com/favicon.ico) steampowered.com, steam

![](https://static2.cdn.ubi.com/gamesites/uplay/201212201711/img/favicon.ico) uplay, uplay.ubi.com

![](https://lh3.googleusercontent.com/-L0Ae5fzDP9I/VLJUXP5o9RI/AAAAAAAABl8/xb9GYMwX3F0/s800/windowsstore.png) windowsstore

![](https://lh6.googleusercontent.com/-QRWAZw-QeVI/U4YbLQRWCvI/AAAAAAAABdc/UM6aD_OC45Q/s800/xboxlive.png) xboxlive

![](https://lh6.googleusercontent.com/-QBuHwtRK93I/U4YapJUfBEI/AAAAAAAABdU/MwwsXQ_3fW4/s800/yawma.png) yawma, yawma.net 

### Self-publishing developers—stores that sell games from a single developer

![](https://lh3.googleusercontent.com/-cqTpbNOc3Eo/U4YekNHEraI/AAAAAAAABf0/Uimh4LlA9fE/s800/2dboy.png) 2dboy.com, 2dboy<br/> 

![](https://lh5.googleusercontent.com/-G1BUB8sbDYM/U4Ycre-N0cI/AAAAAAAABe4/XCkQRlAKkRA/s800/amanitadesign.png) amanita-design.net, amanitadesign

![](https://lh4.googleusercontent.com/-hiTvab7fNeQ/U4YVNkVzdbI/AAAAAAAABcA/9IR0d7vj5Rw/s800/areogames.png) areo.areograph.com, areogames

![](https://battle.net/static/images/meta/favicon.ico) battle.net

![](https://lh5.googleusercontent.com/-ovDvrXveHKI/U4YY3pqECjI/AAAAAAAABcg/fLSfwSa4PdY/s800/bigfinish.png) bigfinishgames.com, bigfinish

![](https://lh3.googleusercontent.com/-YWvBV6SG95s/U4YVOZiDqOI/AAAAAAAABbg/DWks790O8Tw/s800/bit-blot.png) bit-blot.com, bitblot

![](https://lh3.googleusercontent.com/-HwUaInJeAcM/U4YcrYrLjNI/AAAAAAAABe8/L1ks1Jtprqg/s800/casebookthegame.png) casebookthegame.com, casebook

![](https://lh6.googleusercontent.com/-BCOuRHWLVPU/U4YcMLRzYMI/AAAAAAAABeA/zoLcuAPTTL8/s800/crayonphysics.png) crayonphysics.com, crayonphysics 

![](https://lh6.googleusercontent.com/-mquB7vxjefw/U4YcrV1mJ8I/AAAAAAAABfE/N8IEKbWLgv8/s800/freebird.png) freebird, freebirdgames, freebirdgames.com

![](https://lh6.googleusercontent.com/-KXKZW_UP__k/U4YcrhklOqI/AAAAAAAABew/iZYgGG_T7GM/s800/indieroyale.png) indieroyale, indieroyale.com

![](https://lh6.googleusercontent.com/-sUX5ivzf6ZY/U4Ycr0vY0nI/AAAAAAAABe0/cchIab0uxsk/s800/sizefivegames.png) sizefivegames.com, sizefivegames

![](https://lh4.googleusercontent.com/-z1mzei2qLuk/U4YcMNddPaI/AAAAAAAABeE/kCOwM1d0C98/s800/taleoftales.png) tale-of-tales.com, taleoftales

![](https://lh3.googleusercontent.com/-LqhGwE8Uyjw/U4YcXukagxI/AAAAAAAABeU/ox9DrBYqDsg/s800/telltale.png) telltalegames.com, telltale

![](https://lh6.googleusercontent.com/-imwyJ2Luq18/U4YcZ0s4j6I/AAAAAAAABec/HL0PGHlaD0I/s800/theball.png) theballthegame.com, theball

![](https://lh5.googleusercontent.com/-wXSLqwLwihM/U4YcUesxPEI/AAAAAAAABeM/qecM551KaEc/s800/zombie-cow.png) zombie-cow.com, zombie-cow


### Crowdfunding sites—games financed from a crowdfunding campaign

![](https://lh5.googleusercontent.com/-33drwcq-8Mg/U4YbYdhNlbI/AAAAAAAABdo/o1tR4OM3SaA/s800/indiegogo.png) indiegogo, indiegogo.com

![](https://lh4.googleusercontent.com/-QxASAMDxDtY/U4YbYdMopKI/AAAAAAAABd0/aktUFbnE_Lk/s800/kickstarter.png) kickstarter, kickstarter.com


### Miscellaneous icons (not counted in the digital distribution services chart)

![](https://lh3.googleusercontent.com/-iwXya8FD7AM/U4YVOp6-AvI/AAAAAAAABbk/WBMb1AgtN2c/s800/cart.png) cartridge

![](https://lh6.googleusercontent.com/-VQx0m0aF2vU/U4Yee7XwMFI/AAAAAAAABfY/iQuU-QE9jJA/s800/collectors.png) collectorsedition, specialedition

![](https://lh6.googleusercontent.com/-fgYO_GO8n0A/U4Yee6LkbrI/AAAAAAAABfc/syry88tZqUs/s800/disc.png) disc

![](https://lh4.googleusercontent.com/-Fw5IgzTXS0E/U4Yee5J6qWI/AAAAAAAABfs/1I6iJpnY46w/s800/floppy.png) floppy

![](https://lh5.googleusercontent.com/-r8C-lX0w_bI/U4YefafJe7I/AAAAAAAABfo/niNWzjrY3zk/s800/soundtrack.png) soundtrack

![](https://www.vive.com/static/images/favicon.ico) vive

![](https://static.oculus.com/web/www_static/production/US/4a9fcf4a36ddb3b04c2a311d67ae58f39b17a5c5/baxter/baxter-0.6.9/images/meta/favicon.png) oculus, rift

## Attribution
This script uses icons from the ["Silk"](http://www.famfamfam.com/lab/icons/silk/) and ["Diagona"](http://p.yusukekamiyamane.com/) icon sets, as well as the official icons from the vairous digital distribution stores.


## Links
- [Greasyfork page for the script](https://greasyfork.org/en/scripts/1730-tor-s-backloggery-enhancements)
- [RSS feed for keeping up with updates of this script](http://feeds.feedburner.com/BackloggeryEnhancements)
- [The Backloggery](http://backloggery.com/)
- [Unofficial Backloggery Steam group](http://steamcommunity.com/groups/backloggery)
- [Tor's Backloggery account](http://backloggery.com/tor)


## Changes
- 2.2.0: (Technical) Refactored the code to TypeScript and using an npm project to build.
- 2.1.18: Fixed support for Backloggery's new https URL. Added new icons for Oculus and Vive. Fixed a couple of broken icons. 
- 2.1.16: Added icons for Big Fish Games, DotEmu, Groupees, IndieCity, Itch.io, Nuuvem, Playism, and Windows Store. Fixed Humble Bundle icon. Added icons for several digital distribution stores that are registered as "systems" on the Backloggery site. Technical change: Removed inline jQuery.
- 2.1.15: Updated the ownership chart to take account for the new "Household" and "Subscription" categories. Fixed GOG icon.
- 2.1.14: Added icon for GameStop. Updated all icons to use https and have 16x16 px size to improve compatibility with greasyfork.org. Fixed icons for Impulse, Games for Windows Live, Big Finish Games.
- 2.1.12: Moved script to greasyfork.org because userscripts.org is unstable. Temporarily disabled update notification function because it depended on the userscripts.org website. Added the first version of the Chrome extension.
- 2.1.11: Added icons for Indiegogo and IndieGameStand.
- 2.1.10: Fixed icon for Humble Bundle.
- 2.1.9: Added icons for Freebird Games, Indie Gala and Kickstarter.
- 2.1.8: Added icon for Uplay. Fixed several icons which had stopped working; Google Play, GameFly, Get Games and Battle.net.
- 2.1.7: Fixed the PSN icon which stopped working.
- 2.1.6: Added icon for Green Man Gaming.
- 2.1.5: Added icon for Amazon digital games.
- 2.1.4: Added icon for Indie Royale and GameFly. Added option to use 'googleplay' keyword since Android Market was re-branded to Google Play. Fixed broken icon for the now defunct Direct2Drive digital distribution store.
- 2.1.3: Fixed icons in Now Playing list after site update. Added icons to Multitap on the front page (icon support on the Multitap page, will be added later). Created update checking feature for Chrome and Firefox which will notify about script updates. Note: Chrome users please check that you are running Chrome version 13 or newer before installing the latest version of the script. (Wrench menu -> About Google Chrome) If you are not on the latest version, the act of opening the About dialog should trigger the update (on Windows).
- 2.1.2: Fixed pie chart data bug.
- 2.1.1: Added icons for Nintendo, PSN, Origin, Size Five Games. Fixed icons for Zombie Cow studios, Games for Windows Marketplace (now merged with Xbox)
- 2.1.0: Charts are back! This update also adds GOG/Steam icons for games with system = Steam or Good Old Games.
- 2.0.0: The first version to support the new backloggery site. This update brings back the icon and release year functionality. Charts and filtering will come later.
- 1.3.6: Added icons for Beamdog, casebookthegame.com and theballthegame.com. Updated Android Market icon.
- 1.3.5: Added icons for Desura, YAWMA and The Humble Indie Bundle.
- 1.3.4: Added icon for Android devices and new keyword GFW for Games for Windows Marketplace. Fixed Greenhouse icon.
- 1.3.3: Added icons for Get Games, Games for Windows Marketplace and for collector's/special editions. Updated the GOG icon to the most recent version.
- 1.3.2: Fixed Battle.net and Xbox Live icons.
- 1.3.1: Fixed Battle.net icon.
- 1.3.0: Added real-time filtering/search feature for game titles.
- 1.2.7: Added Xbox Live icon (for Xbox Live Marketplace, Xbox Live Arcade etc.)
- 1.2.6: Improved icons for Telltale Games, Bit-Blot, Big Finish Games and Areo Games.
- 1.2.5: Bugfix: Filtering by digital distribution service should now work correctly for games in compilations.
- 1.2.4: Added Battle.net icon.
- 1.2.3: Added soundtrack icon.
- 1.2.2: Bugfix: Fixed bug where the script recognized keywords inside other words, e.g. vertigogaming.net -> GOG. Added option for using square brackets around keywords and parentheses  around years, in order to avoid unintentional conversion of words into icons and years into year labels.
- 1.2.1: New icons, cosmetic changes.
- 1.2.0: Added two new pie charts (completion status and digital distribution services), release year functionality including bar chart, and option to filter the My Games list by digital distribution services.
- 1.1.2: Fixed bug that prevented pie charts from appearing on the Wishlist page or on My Games pages filtered by status.
- 1.1.1: Bugfixes. Added a couple of new icons.
- 1.1.0: Added Pie charts for game systems/consoles and ownership.
- 1.0.1: Bugfix.
- 1.0.0: First release.