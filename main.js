if (typeof R === 'undefined') { var R = window.R || (() => Math.random()); } // v265 iOS跨script块R兜底

(function () {
'use strict';
/* ---------- 玩家头像 v131：6张修仙卡通头像（3男3女，base64嵌入） ---------- */
// 仙玉图标统一用MAGATAMA，禁止用🔮！
const MAGATAMA = '<svg viewBox="0 0 24 28" width="13" height="15" style="vertical-align:-2px"><path d="M12 1C7 1 3 5 3 10c0 2.8 1.3 5.3 3.3 6.9l-2.5 6.5c-.4 1 .9 1.9 1.7 1.2l2-1.9c.5.1 1 .2 1.5.2 1.5 0 2.9-.4 4.1-1C9.5 21.3 7 18.5 7 15c0-1 .3-1.9.7-2.7C9.3 14.5 12 16 12 16s5-2.5 5-8c0-4-2.2-6.4-5-7zm0 4.5c1.4 0 2.5 1.1 2.5 2.5S13.4 10.5 12 10.5 9.5 9.4 9.5 8 10.6 5.5 12 5.5z" fill="#8fd8a8" stroke="#5aa87e" stroke-width="1"/></svg>';
// v1090 头像库清洗（Ye 令）：只留原创 612（每性别 306），AVATAR_SERIES 改作种族分组；第叁套下线，挂名图 1188 张删库
const AVATARS = {
  m: ["av/r/m_001.jpg", "av/r/m_002.jpg", "av/r/m_003.jpg", "av/s/m_001.jpg", "av/s/m_002.jpg", "av/s/m_003.jpg", "av/g/m_xianxia_001.jpg", "av/g/m_xianxia_002.jpg", "av/g/m_xianxia_003.jpg", "av/g/m_xianxia_004.jpg", "av/g/m_xianxia_005.jpg", "av/g/m_xianxia_006.jpg", "av/g/m_xianxia_007.jpg", "av/g/m_xianxia_008.jpg", "av/g/m_xianxia_009.jpg", "av/g/m_xianxia_010.jpg", "av/g/m_xianxia_011.jpg", "av/g/m_xianxia_012.jpg", "av/g/m_xianxia_013.jpg", "av/g/m_xianxia_014.jpg", "av/g/m_xianxia_015.jpg", "av/g/m_xianxia_016.jpg", "av/g/m_xianxia_017.jpg", "av/g/m_xianxia_018.jpg", "av/g/m_xianxia_019.jpg", "av/g/m_xianxia_020.jpg", "av/g/m_xianxia_021.jpg", "av/g/m_xianxia_022.jpg", "av/g/m_xianxia_023.jpg", "av/g/m_xianxia_024.jpg", "av/g/m_xianxia_025.jpg", "av/g/m_xianxia_026.jpg", "av/g/m_xianxia_027.jpg", "av/g/m_xianxia_028.jpg", "av/g/m_xianxia_029.jpg", "av/g/m_xianxia_030.jpg", "av/g/m_xianxia_031.jpg", "av/g/m_xianxia_032.jpg", "av/g/m_xianxia_033.jpg", "av/g/m_xianxia_034.jpg", "av/g/m_xianxia_035.jpg", "av/g/m_xianxia_036.jpg", "av/g/m_xianxia_037.jpg", "av/g/m_xianxia_038.jpg", "av/g/m_xianxia_039.jpg", "av/g/m_xianxia_040.jpg", "av/g/m_xianxia_041.jpg", "av/g/m_xianxia_042.jpg", "av/g/m_xianxia_043.jpg", "av/g/m_xianxia_044.jpg", "av/g/m_xianxia_045.jpg", "av/g/m_xianxia_046.jpg", "av/g/m_xianxia_047.jpg", "av/g/m_xianxia_048.jpg", "av/g/m_xianxia_049.jpg", "av/g/m_xianxia_050.jpg", "av/g/m_xianxia_051.jpg", "av/g/m_xianxia_052.jpg", "av/g/m_xianxia_053.jpg", "av/g/m_xianxia_054.jpg", "av/g/m_xianxia_055.jpg", "av/g/m_xianxia_056.jpg", "av/g/m_xianxia_057.jpg", "av/g/m_xianxia_058.jpg", "av/g/m_xianxia_059.jpg", "av/g/m_xianxia_060.jpg", "av/g/m_xianxia_061.jpg", "av/g/m_xianxia_062.jpg", "av/g/m_xianxia_063.jpg", "av/g/m_xianxia_064.jpg", "av/g/m_xianxia_065.jpg", "av/g/m_xianxia_066.jpg", "av/g/m_xianxia_067.jpg", "av/g/m_xianxia_068.jpg", "av/g/m_xianxia_069.jpg", "av/g/m_xianxia_070.jpg", "av/g/m_xianxia_071.jpg", "av/g/m_xianxia_072.jpg", "av/g/m_xianxia_073.jpg", "av/g/m_xianxia_074.jpg", "av/g/m_xianxia_075.jpg", "av/g/m_xianxia_076.jpg", "av/g/m_xianxia_077.jpg", "av/g/m_xianxia_078.jpg", "av/g/m_xianxia_079.jpg", "av/g/m_xianxia_080.jpg", "av/g/m_xianxia_081.jpg", "av/g/m_xianxia_082.jpg", "av/g/m_xianxia_083.jpg", "av/g/m_xianxia_084.jpg", "av/g/m_xianxia_085.jpg", "av/g/m_xianxia_086.jpg", "av/g/m_xianxia_087.jpg", "av/g/m_xianxia_088.jpg", "av/g/m_xianxia_089.jpg", "av/g/m_xianxia_090.jpg", "av/g/m_xianxia_091.jpg", "av/g/m_xianxia_092.jpg", "av/g/m_xianxia_093.jpg", "av/g/m_xianxia_094.jpg", "av/g/m_xianxia_095.jpg", "av/g/m_xianxia_096.jpg", "av/g/m_xianxia_097.jpg", "av/g/m_xianxia_098.jpg", "av/g/m_xianxia_099.jpg", "av/g/m_xianxia_100.jpg", "av/g/m_game_001.jpg", "av/g/m_game_002.jpg", "av/g/m_game_003.jpg", "av/g/m_game_004.jpg", "av/g/m_game_005.jpg", "av/g/m_game_006.jpg", "av/g/m_game_007.jpg", "av/g/m_game_008.jpg", "av/g/m_game_009.jpg", "av/g/m_game_010.jpg", "av/g/m_game_011.jpg", "av/g/m_game_012.jpg", "av/g/m_game_013.jpg", "av/g/m_game_014.jpg", "av/g/m_game_015.jpg", "av/g/m_game_016.jpg", "av/g/m_game_017.jpg", "av/g/m_game_018.jpg", "av/g/m_game_019.jpg", "av/g/m_game_020.jpg", "av/g/m_game_021.jpg", "av/g/m_game_022.jpg", "av/g/m_game_023.jpg", "av/g/m_game_024.jpg", "av/g/m_game_025.jpg", "av/g/m_game_026.jpg", "av/g/m_game_027.jpg", "av/g/m_game_028.jpg", "av/g/m_game_029.jpg", "av/g/m_game_030.jpg", "av/g/m_game_031.jpg", "av/g/m_game_032.jpg", "av/g/m_game_033.jpg", "av/g/m_game_034.jpg", "av/g/m_game_035.jpg", "av/g/m_game_036.jpg", "av/g/m_game_037.jpg", "av/g/m_game_038.jpg", "av/g/m_game_039.jpg", "av/g/m_game_040.jpg", "av/g/m_game_041.jpg", "av/g/m_game_042.jpg", "av/g/m_game_043.jpg", "av/g/m_game_044.jpg", "av/g/m_game_045.jpg", "av/g/m_game_046.jpg", "av/g/m_game_047.jpg", "av/g/m_game_048.jpg", "av/g/m_game_049.jpg", "av/g/m_game_050.jpg", "av/g/m_game_051.jpg", "av/g/m_game_052.jpg", "av/g/m_game_053.jpg", "av/g/m_game_054.jpg", "av/g/m_game_055.jpg", "av/g/m_game_056.jpg", "av/g/m_game_057.jpg", "av/g/m_game_058.jpg", "av/g/m_game_059.jpg", "av/g/m_game_060.jpg", "av/g/m_game_061.jpg", "av/g/m_game_062.jpg", "av/g/m_game_063.jpg", "av/g/m_game_064.jpg", "av/g/m_game_065.jpg", "av/g/m_game_066.jpg", "av/g/m_game_067.jpg", "av/g/m_game_068.jpg", "av/g/m_game_069.jpg", "av/g/m_game_070.jpg", "av/g/m_game_071.jpg", "av/g/m_game_072.jpg", "av/g/m_game_073.jpg", "av/g/m_game_074.jpg", "av/g/m_game_075.jpg", "av/g/m_game_076.jpg", "av/g/m_game_077.jpg", "av/g/m_game_078.jpg", "av/g/m_game_079.jpg", "av/g/m_game_080.jpg", "av/g/m_game_081.jpg", "av/g/m_game_082.jpg", "av/g/m_game_083.jpg", "av/g/m_game_084.jpg", "av/g/m_game_085.jpg", "av/g/m_game_086.jpg", "av/g/m_game_087.jpg", "av/g/m_game_088.jpg", "av/g/m_game_089.jpg", "av/g/m_game_090.jpg", "av/g/m_game_091.jpg", "av/g/m_game_092.jpg", "av/g/m_game_093.jpg", "av/g/m_game_094.jpg", "av/g/m_game_095.jpg", "av/g/m_game_096.jpg", "av/g/m_game_097.jpg", "av/g/m_game_098.jpg", "av/g/m_game_099.jpg", "av/g/m_game_100.jpg", "av/g/m_anime_001.jpg", "av/g/m_anime_002.jpg", "av/g/m_anime_003.jpg", "av/g/m_anime_004.jpg", "av/g/m_anime_005.jpg", "av/g/m_anime_006.jpg", "av/g/m_anime_007.jpg", "av/g/m_anime_008.jpg", "av/g/m_anime_009.jpg", "av/g/m_anime_010.jpg", "av/g/m_anime_011.jpg", "av/g/m_anime_012.jpg", "av/g/m_anime_013.jpg", "av/g/m_anime_014.jpg", "av/g/m_anime_015.jpg", "av/g/m_anime_016.jpg", "av/g/m_anime_017.jpg", "av/g/m_anime_018.jpg", "av/g/m_anime_019.jpg", "av/g/m_anime_020.jpg", "av/g/m_anime_021.jpg", "av/g/m_anime_022.jpg", "av/g/m_anime_023.jpg", "av/g/m_anime_024.jpg", "av/g/m_anime_025.jpg", "av/g/m_anime_026.jpg", "av/g/m_anime_027.jpg", "av/g/m_anime_028.jpg", "av/g/m_anime_029.jpg", "av/g/m_anime_030.jpg", "av/g/m_anime_031.jpg", "av/g/m_anime_032.jpg", "av/g/m_anime_033.jpg", "av/g/m_anime_034.jpg", "av/g/m_anime_035.jpg", "av/g/m_anime_036.jpg", "av/g/m_anime_037.jpg", "av/g/m_anime_038.jpg", "av/g/m_anime_039.jpg", "av/g/m_anime_040.jpg", "av/g/m_anime_041.jpg", "av/g/m_anime_042.jpg", "av/g/m_anime_043.jpg", "av/g/m_anime_044.jpg", "av/g/m_anime_045.jpg", "av/g/m_anime_046.jpg", "av/g/m_anime_047.jpg", "av/g/m_anime_048.jpg", "av/g/m_anime_049.jpg", "av/g/m_anime_050.jpg", "av/g/m_anime_051.jpg", "av/g/m_anime_052.jpg", "av/g/m_anime_053.jpg", "av/g/m_anime_054.jpg", "av/g/m_anime_055.jpg", "av/g/m_anime_056.jpg", "av/g/m_anime_057.jpg", "av/g/m_anime_058.jpg", "av/g/m_anime_059.jpg", "av/g/m_anime_060.jpg", "av/g/m_anime_061.jpg", "av/g/m_anime_062.jpg", "av/g/m_anime_063.jpg", "av/g/m_anime_064.jpg", "av/g/m_anime_065.jpg", "av/g/m_anime_066.jpg", "av/g/m_anime_067.jpg", "av/g/m_anime_068.jpg", "av/g/m_anime_069.jpg", "av/g/m_anime_070.jpg", "av/g/m_anime_071.jpg", "av/g/m_anime_072.jpg", "av/g/m_anime_073.jpg", "av/g/m_anime_074.jpg", "av/g/m_anime_075.jpg", "av/g/m_anime_076.jpg", "av/g/m_anime_077.jpg", "av/g/m_anime_078.jpg", "av/g/m_anime_079.jpg", "av/g/m_anime_080.jpg", "av/g/m_anime_081.jpg", "av/g/m_anime_082.jpg", "av/g/m_anime_083.jpg", "av/g/m_anime_084.jpg", "av/g/m_anime_085.jpg", "av/g/m_anime_086.jpg", "av/g/m_anime_087.jpg", "av/g/m_anime_088.jpg", "av/g/m_anime_089.jpg", "av/g/m_anime_090.jpg", "av/g/m_anime_091.jpg", "av/g/m_anime_092.jpg", "av/g/m_anime_093.jpg", "av/g/m_anime_094.jpg", "av/g/m_anime_095.jpg", "av/g/m_anime_096.jpg", "av/g/m_anime_097.jpg", "av/g/m_anime_098.jpg", "av/g/m_anime_099.jpg", "av/g/m_anime_100.jpg", "av/n/m_chuan001.jpg", "av/n/m_chuan002.jpg", "av/n/m_chuan003.jpg", "av/n/m_chuan004.jpg", "av/n/m_chuan005.jpg", "av/n/m_chuan006.jpg", "av/n/m_chuan007.jpg", "av/n/m_chuan008.jpg", "av/n/m_chuan009.jpg", "av/n/m_chuan010.jpg", "av/n/m_chuan011.jpg", "av/n/m_chuan012.jpg", "av/n/m_chuan013.jpg", "av/n/m_chuan014.jpg", "av/n/m_chuan015.jpg", "av/n/m_chuan016.jpg", "av/n/m_chuan017.jpg", "av/n/m_chuan018.jpg", "av/n/m_chuan019.jpg", "av/n/m_chuan020.jpg", "av/n/m_chuan021.jpg", "av/n/m_chuan022.jpg", "av/n/m_chuan023.jpg", "av/n/m_chuan024.jpg", "av/n/m_chuan025.jpg", "av/n/m_chuan026.jpg", "av/n/m_chuan027.jpg", "av/n/m_chuan028.jpg", "av/n/m_chuan029.jpg", "av/n/m_chuan030.jpg", "av/n/m_chuan031.jpg", "av/n/m_chuan032.jpg", "av/n/m_chuan033.jpg", "av/n/m_chuan034.jpg", "av/n/m_chuan035.jpg", "av/n/m_chuan036.jpg", "av/n/m_chuan037.jpg", "av/n/m_chuan038.jpg", "av/n/m_chuan039.jpg", "av/n/m_chuan040.jpg", "av/n/m_chuan041.jpg", "av/n/m_chuan042.jpg", "av/n/m_chuan043.jpg", "av/n/m_chuan044.jpg", "av/n/m_chuan045.jpg", "av/n/m_chuan046.jpg", "av/n/m_chuan047.jpg", "av/n/m_chuan048.jpg", "av/n/m_chuan049.jpg", "av/n/m_chuan050.jpg", "av/n/m_chuan051.jpg", "av/n/m_mo001.jpg", "av/n/m_mo002.jpg", "av/n/m_mo003.jpg", "av/n/m_mo004.jpg", "av/n/m_mo005.jpg", "av/n/m_mo006.jpg", "av/n/m_mo007.jpg", "av/n/m_mo008.jpg", "av/n/m_mo009.jpg", "av/n/m_mo010.jpg", "av/n/m_mo011.jpg", "av/n/m_mo012.jpg", "av/n/m_mo013.jpg", "av/n/m_mo014.jpg", "av/n/m_mo015.jpg", "av/n/m_mo016.jpg", "av/n/m_mo017.jpg", "av/n/m_mo018.jpg", "av/n/m_mo019.jpg", "av/n/m_mo020.jpg", "av/n/m_mo021.jpg", "av/n/m_mo022.jpg", "av/n/m_mo023.jpg", "av/n/m_mo024.jpg", "av/n/m_mo025.jpg", "av/n/m_mo026.jpg", "av/n/m_mo027.jpg", "av/n/m_mo028.jpg", "av/n/m_mo029.jpg", "av/n/m_mo030.jpg", "av/n/m_mo031.jpg", "av/n/m_mo032.jpg", "av/n/m_mo033.jpg", "av/n/m_mo034.jpg", "av/n/m_mo035.jpg", "av/n/m_mo036.jpg", "av/n/m_mo037.jpg", "av/n/m_mo038.jpg", "av/n/m_mo039.jpg", "av/n/m_mo040.jpg", "av/n/m_mo041.jpg", "av/n/m_mo042.jpg", "av/n/m_mo043.jpg", "av/n/m_mo044.jpg", "av/n/m_mo045.jpg", "av/n/m_mo046.jpg", "av/n/m_mo047.jpg", "av/n/m_mo048.jpg", "av/n/m_mo049.jpg", "av/n/m_mo050.jpg", "av/n/m_mo051.jpg", "av/n/m_mo052.jpg", "av/n/m_mo053.jpg", "av/n/m_mo054.jpg", "av/n/m_mo055.jpg", "av/n/m_mo056.jpg", "av/n/m_mo057.jpg", "av/n/m_mo058.jpg", "av/n/m_mo059.jpg", "av/n/m_mo060.jpg", "av/n/m_mo061.jpg", "av/n/m_mo062.jpg", "av/n/m_mo063.jpg", "av/n/m_mo064.jpg", "av/n/m_mo065.jpg", "av/n/m_mo066.jpg", "av/n/m_mo067.jpg", "av/n/m_mo068.jpg", "av/n/m_mo069.jpg", "av/n/m_mo070.jpg", "av/n/m_mo071.jpg", "av/n/m_mo072.jpg", "av/n/m_mo073.jpg", "av/n/m_mo074.jpg", "av/n/m_mo075.jpg", "av/n/m_mo076.jpg", "av/n/m_mo077.jpg", "av/n/m_mo078.jpg", "av/n/m_mo079.jpg", "av/n/m_mo080.jpg", "av/n/m_mo081.jpg", "av/n/m_mo082.jpg", "av/n/m_mo083.jpg", "av/n/m_mo084.jpg", "av/n/m_mo085.jpg", "av/n/m_mo086.jpg", "av/n/m_mo087.jpg", "av/n/m_mo088.jpg", "av/n/m_mo089.jpg", "av/n/m_mo090.jpg", "av/n/m_mo091.jpg", "av/n/m_mo092.jpg", "av/n/m_mo093.jpg", "av/n/m_mo094.jpg", "av/n/m_mo095.jpg", "av/n/m_mo096.jpg", "av/n/m_mo097.jpg", "av/n/m_mo098.jpg", "av/n/m_mo099.jpg", "av/n/m_mo100.jpg", "av/n/m_mo101.jpg", "av/n/m_mo102.jpg", "av/n/m_mo103.jpg", "av/n/m_mo104.jpg", "av/n/m_mo105.jpg", "av/n/m_mo106.jpg", "av/n/m_mo107.jpg", "av/n/m_mo108.jpg", "av/n/m_mo109.jpg", "av/n/m_mo110.jpg", "av/n/m_mo111.jpg", "av/n/m_mo112.jpg", "av/n/m_mo113.jpg", "av/n/m_mo114.jpg", "av/n/m_mo115.jpg", "av/n/m_yao001.jpg", "av/n/m_yao002.jpg", "av/n/m_yao003.jpg", "av/n/m_yao004.jpg", "av/n/m_yao005.jpg", "av/n/m_yao006.jpg", "av/n/m_yao007.jpg", "av/n/m_yao008.jpg", "av/n/m_yao009.jpg", "av/n/m_yao010.jpg", "av/n/m_yao011.jpg", "av/n/m_yao012.jpg", "av/n/m_yao013.jpg", "av/n/m_yao014.jpg", "av/n/m_yao015.jpg", "av/n/m_yao016.jpg", "av/n/m_yao017.jpg", "av/n/m_yao018.jpg", "av/n/m_yao019.jpg", "av/n/m_yao020.jpg", "av/n/m_yao021.jpg", "av/n/m_yao022.jpg", "av/n/m_yao023.jpg", "av/n/m_yao024.jpg", "av/n/m_yao025.jpg", "av/n/m_yao026.jpg", "av/n/m_yao027.jpg", "av/n/m_yao028.jpg", "av/n/m_yao029.jpg", "av/n/m_yao030.jpg", "av/n/m_yao031.jpg", "av/n/m_yao032.jpg", "av/n/m_yao033.jpg", "av/n/m_yao034.jpg", "av/n/m_yao035.jpg", "av/n/m_yao036.jpg", "av/n/m_yao037.jpg", "av/n/m_yao038.jpg", "av/n/m_yao039.jpg", "av/n/m_yao040.jpg", "av/n/m_yao041.jpg", "av/n/m_yao042.jpg", "av/n/m_yao043.jpg", "av/n/m_yao044.jpg", "av/n/m_yao045.jpg", "av/n/m_yao046.jpg", "av/n/m_yao047.jpg", "av/n/m_yao048.jpg", "av/n/m_yao049.jpg", "av/n/m_yao050.jpg", "av/n/m_yao051.jpg", "av/n/m_yao052.jpg", "av/n/m_yao053.jpg", "av/n/m_yao054.jpg", "av/n/m_yao055.jpg", "av/n/m_yao056.jpg", "av/n/m_yao057.jpg", "av/n/m_yao058.jpg", "av/n/m_yao059.jpg", "av/n/m_yao060.jpg", "av/n/m_yao061.jpg", "av/n/m_yao062.jpg", "av/n/m_yao063.jpg", "av/n/m_yao064.jpg", "av/n/m_yao065.jpg", "av/n/m_yao066.jpg", "av/n/m_yao067.jpg", "av/n/m_yao068.jpg", "av/n/m_yao069.jpg", "av/n/m_yao070.jpg", "av/n/m_yao071.jpg", "av/n/m_yao072.jpg", "av/n/m_yao073.jpg", "av/n/m_yao074.jpg", "av/n/m_yao075.jpg", "av/n/m_yao076.jpg", "av/n/m_yao077.jpg", "av/n/m_yao078.jpg", "av/n/m_yao079.jpg", "av/n/m_yao080.jpg", "av/n/m_yao081.jpg", "av/n/m_yao082.jpg", "av/n/m_yao083.jpg", "av/n/m_yao084.jpg", "av/n/m_yao085.jpg", "av/n/m_yao086.jpg", "av/n/m_yao087.jpg", "av/n/m_yao088.jpg", "av/n/m_yao089.jpg", "av/n/m_yao090.jpg", "av/n/m_yao091.jpg", "av/n/m_yao092.jpg", "av/n/m_yao093.jpg", "av/n/m_yao094.jpg", "av/n/m_yao095.jpg", "av/n/m_yao096.jpg", "av/n/m_yao097.jpg", "av/n/m_yao098.jpg", "av/n/m_yao099.jpg", "av/n/m_yao100.jpg", "av/n/m_yao101.jpg", "av/n/m_yao102.jpg", "av/n/m_yao103.jpg", "av/n/m_yao104.jpg", "av/n/m_yao105.jpg", "av/n/m_yao106.jpg", "av/n/m_yao107.jpg", "av/n/m_yao108.jpg", "av/n/m_yao109.jpg", "av/n/m_yao110.jpg", "av/n/m_yao111.jpg", "av/n/m_yao112.jpg", "av/n/m_yao113.jpg", "av/n/m_yao114.jpg", "av/n/m_yao115.jpg", "av/n/m_yao116.jpg", "av/n/m_yao117.jpg", "av/n/m_yao118.jpg", "av/n/m_yao119.jpg", "av/n/m_yao120.jpg", "av/n/m_yao121.jpg", "av/n/m_yao122.jpg", "av/n/m_yao123.jpg", "av/n/m_yao124.jpg", "av/n/m_yao125.jpg", "av/n/m_yao126.jpg", "av/n/m_yao127.jpg", "av/n/m_yao128.jpg", "av/n/m_yao129.jpg", "av/n/m_yao130.jpg", "av/n/m_yao131.jpg", "av/n/m_yao132.jpg", "av/n/m_yao133.jpg", "av/n/m_yao134.jpg", "av/n/m_yao135.jpg", "av/n/m_yao136.jpg", "av/n/m_yao137.jpg", "av/n/m_yao138.jpg", "av/n/m_yao139.jpg", "av/n/m_yao140.jpg", "av/n/m_yao141.jpg", "av/n/m_yao142.jpg", "av/n/m_yao143.jpg", "av/n/m_ling001.jpg", "av/n/m_ling002.jpg", "av/n/m_ling003.jpg", "av/n/m_ling004.jpg", "av/n/m_ling005.jpg", "av/n/m_ling006.jpg", "av/n/m_ling007.jpg", "av/n/m_ling008.jpg", "av/n/m_ling009.jpg", "av/n/m_ling010.jpg", "av/n/m_ling011.jpg", "av/n/m_ling012.jpg", "av/n/m_ling013.jpg", "av/n/m_ling014.jpg", "av/n/m_ling015.jpg", "av/n/m_ling016.jpg", "av/n/m_ling017.jpg", "av/n/m_ling018.jpg", "av/n/m_ling019.jpg", "av/n/m_ling020.jpg", "av/n/m_ling021.jpg", "av/n/m_ling022.jpg", "av/n/m_ling023.jpg", "av/n/m_ling024.jpg", "av/n/m_ling025.jpg", "av/n/m_ling026.jpg", "av/n/m_ling027.jpg", "av/n/m_ling028.jpg", "av/n/m_ling029.jpg", "av/n/m_ling030.jpg", "av/n/m_ling031.jpg", "av/n/m_ling032.jpg", "av/n/m_ling033.jpg", "av/n/m_ling034.jpg", "av/n/m_ling035.jpg", "av/n/m_ling036.jpg", "av/n/m_ling037.jpg", "av/n/m_ling038.jpg", "av/n/m_ling039.jpg", "av/n/m_ling040.jpg", "av/n/m_ling041.jpg", "av/n/m_ling042.jpg", "av/n/m_ling043.jpg", "av/n/m_ling044.jpg", "av/n/m_ling045.jpg", "av/n/m_ling046.jpg", "av/n/m_ling047.jpg", "av/n/m_ling048.jpg", "av/n/m_ling049.jpg", "av/n/m_ling050.jpg", "av/n/m_ling051.jpg", "av/n/m_ling052.jpg", "av/n/m_ling053.jpg", "av/n/m_ling054.jpg", "av/n/m_ling055.jpg", "av/n/m_ling056.jpg", "av/n/m_ling057.jpg", "av/n/m_ling058.jpg", "av/n/m_ling059.jpg", "av/n/m_ling060.jpg", "av/n/m_ling061.jpg", "av/n/m_ling062.jpg", "av/n/m_ling063.jpg", "av/n/m_ling064.jpg", "av/n/m_ling065.jpg", "av/n/m_ling066.jpg", "av/n/m_ling067.jpg", "av/n/m_ling068.jpg", "av/n/m_ling069.jpg", "av/n/m_ling070.jpg", "av/n/m_ling071.jpg", "av/n/m_ling072.jpg", "av/n/m_ling073.jpg", "av/n/m_ling074.jpg", "av/n/m_ling075.jpg", "av/n/m_ling076.jpg", "av/n/m_ling077.jpg", "av/n/m_ling078.jpg", "av/n/m_ling079.jpg", "av/n/m_ling080.jpg", "av/n/m_ling081.jpg", "av/n/m_ling082.jpg", "av/n/m_ling083.jpg", "av/n/m_ling084.jpg", "av/n/m_ling085.jpg", "av/n/m_ling086.jpg", "av/n/m_ling087.jpg", "av/n/m_ling088.jpg", "av/n/m_ling089.jpg", "av/n/m_ling090.jpg", "av/n/m_ling091.jpg", "av/n/m_ling092.jpg", "av/n/m_ling093.jpg", "av/n/m_ling094.jpg", "av/n/m_ling095.jpg", "av/n/m_ling096.jpg", "av/n/m_ling097.jpg", "av/n/m_ling098.jpg", "av/n/m_ling099.jpg", "av/n/m_ling100.jpg", "av/n/m_ling101.jpg", "av/n/m_ling102.jpg", "av/n/m_ling103.jpg", "av/n/m_ling104.jpg", "av/n/m_ling105.jpg", "av/n/m_ling106.jpg", "av/n/m_ling107.jpg", "av/n/m_ling108.jpg", "av/n/m_ling109.jpg", "av/n/m_ling110.jpg", "av/n/m_ling111.jpg", "av/n/m_ling112.jpg", "av/n/m_ling113.jpg", "av/n/m_ling114.jpg", "av/n/m_ling115.jpg", "av/n/m_ling116.jpg", "av/n/m_ling117.jpg", "av/n/m_ling118.jpg", "av/n/m_ling119.jpg", "av/n/m_ling120.jpg", "av/n/m_ling121.jpg", "av/n/m_ling122.jpg", "av/n/m_ling123.jpg", "av/n/m_ling124.jpg", "av/n/m_ling125.jpg", "av/n/m_ling126.jpg", "av/n/m_ling127.jpg", "av/n/m_ling128.jpg", "av/n/m_ling129.jpg", "av/n/m_ling130.jpg", "av/n/m_ling131.jpg", "av/n/m_ling132.jpg", "av/n/m_ling133.jpg", "av/n/m_ling134.jpg", "av/n/m_ling135.jpg", "av/n/m_ling136.jpg", "av/n/m_ling137.jpg", "av/n/m_ling138.jpg", "av/n/m_ling139.jpg", "av/n/m_ling140.jpg", "av/n/m_ling141.jpg", "av/n/m_ling142.jpg", "av/n/m_yi001.jpg", "av/n/m_yi002.jpg", "av/n/m_yi003.jpg", "av/n/m_yi004.jpg", "av/n/m_yi005.jpg", "av/n/m_yi006.jpg", "av/n/m_yi007.jpg", "av/n/m_yi008.jpg", "av/n/m_yi009.jpg", "av/n/m_yi010.jpg", "av/n/m_yi011.jpg", "av/n/m_yi012.jpg", "av/n/m_yi013.jpg", "av/n/m_yi014.jpg", "av/n/m_yi015.jpg", "av/n/m_yi016.jpg", "av/n/m_yi017.jpg", "av/n/m_yi018.jpg", "av/n/m_yi019.jpg", "av/n/m_yi020.jpg", "av/n/m_yi021.jpg", "av/n/m_yi022.jpg", "av/n/m_yi023.jpg", "av/n/m_yi024.jpg", "av/n/m_yi025.jpg", "av/n/m_yi026.jpg", "av/n/m_yi027.jpg", "av/n/m_yi028.jpg", "av/n/m_yi029.jpg", "av/n/m_yi030.jpg", "av/n/m_yi031.jpg", "av/n/m_yi032.jpg", "av/n/m_yi033.jpg", "av/n/m_yi034.jpg", "av/n/m_yi035.jpg", "av/n/m_yi036.jpg", "av/n/m_yi037.jpg", "av/n/m_yi038.jpg", "av/n/m_yi039.jpg", "av/n/m_yi040.jpg", "av/n/m_yi041.jpg", "av/n/m_yi042.jpg", "av/n/m_yi043.jpg", "av/n/m_yi044.jpg", "av/n/m_yi045.jpg", "av/n/m_yi046.jpg", "av/n/m_yi047.jpg", "av/n/m_yi048.jpg", "av/n/m_yi049.jpg", "av/n/m_yi050.jpg", "av/n/m_yi051.jpg", "av/n/m_yi052.jpg", "av/n/m_yi053.jpg", "av/n/m_yi054.jpg", "av/n/m_yi055.jpg", "av/n/m_yi056.jpg", "av/n/m_yi057.jpg", "av/n/m_yi058.jpg", "av/n/m_yi059.jpg", "av/n/m_yi060.jpg", "av/n/m_yi061.jpg", "av/n/m_yi062.jpg", "av/n/m_yi063.jpg", "av/n/m_yi064.jpg", "av/n/m_yi065.jpg", "av/n/m_yi066.jpg", "av/n/m_yi067.jpg", "av/n/m_yi068.jpg", "av/n/m_yi069.jpg", "av/n/m_yi070.jpg", "av/n/m_yi071.jpg", "av/n/m_yi072.jpg", "av/n/m_yi073.jpg", "av/n/m_yi074.jpg", "av/n/m_yi075.jpg", "av/n/m_yi076.jpg", "av/n/m_yi077.jpg", "av/n/m_yi078.jpg", "av/n/m_yi079.jpg", "av/n/m_yi080.jpg", "av/n/m_yi081.jpg", "av/n/m_yi082.jpg", "av/n/m_yi083.jpg", "av/n/m_yi084.jpg", "av/n/m_yi085.jpg", "av/n/m_yi086.jpg", "av/n/m_yi087.jpg", "av/n/m_yi088.jpg", "av/n/m_yi089.jpg", "av/n/m_yi090.jpg", "av/n/m_yi091.jpg", "av/n/m_yi092.jpg", "av/n/m_yi093.jpg", "av/n/m_yi094.jpg", "av/n/m_yi095.jpg", "av/n/m_yi096.jpg", "av/n/m_yi097.jpg", "av/n/m_yi098.jpg", "av/n/m_yi099.jpg", "av/n/m_yi100.jpg", "av/n/m_yi101.jpg", "av/n/m_yi102.jpg", "av/n/m_yi103.jpg", "av/n/m_yi104.jpg", "av/n/m_yi105.jpg", "av/n/m_yi106.jpg", "av/n/m_yi107.jpg", "av/n/m_yi108.jpg", "av/n/m_yi109.jpg", "av/n/m_yi110.jpg", "av/n/m_yi111.jpg", "av/n/m_yi112.jpg", "av/n/m_yi113.jpg", "av/n/m_yi114.jpg", "av/n/m_yi115.jpg", "av/n/m_yi116.jpg", "av/n/m_yi117.jpg", "av/n/m_yi118.jpg", "av/n/m_yi119.jpg", "av/n/m_yi120.jpg", "av/n/m_yi121.jpg", "av/n/m_yi122.jpg", "av/n/m_yi123.jpg", "av/n/m_yi124.jpg", "av/n/m_yi125.jpg", "av/n/m_yi126.jpg", "av/n/m_yi127.jpg", "av/n/m_yi128.jpg", "av/n/m_yi129.jpg", "av/n/m_yi130.jpg", "av/n/m_yi131.jpg", "av/n/m_yi132.jpg", "av/n/m_yi133.jpg", "av/n/m_yi134.jpg", "av/n/m_yi135.jpg", "av/n/m_yi136.jpg", "av/n/m_yi137.jpg", "av/n/m_yi138.jpg", "av/n/m_yi139.jpg", "av/n/m_yi140.jpg", "av/n/m_shen001.jpg", "av/n/m_shen002.jpg", "av/n/m_shen003.jpg", "av/n/m_shen004.jpg", "av/n/m_shen005.jpg", "av/n/m_shen006.jpg", "av/n/m_shen007.jpg", "av/n/m_shen008.jpg", "av/n/m_shen009.jpg", "av/n/m_shen010.jpg", "av/n/m_shen011.jpg", "av/n/m_shen012.jpg", "av/n/m_shen013.jpg", "av/n/m_shen014.jpg", "av/n/m_shen015.jpg", "av/n/m_shen016.jpg", "av/n/m_shen017.jpg", "av/n/m_shen018.jpg", "av/n/m_shen019.jpg", "av/n/m_shen020.jpg", "av/n/m_shen021.jpg", "av/n/m_shen022.jpg", "av/n/m_shen023.jpg", "av/n/m_shen024.jpg", "av/n/m_shen025.jpg", "av/n/m_shen026.jpg", "av/n/m_shen027.jpg", "av/n/m_shen028.jpg", "av/n/m_shen029.jpg", "av/n/m_shen030.jpg", "av/n/m_shen031.jpg", "av/n/m_shen032.jpg", "av/n/m_shen033.jpg", "av/n/m_shen034.jpg", "av/n/m_shen035.jpg", "av/n/m_shen036.jpg", "av/n/m_shen037.jpg", "av/n/m_shen038.jpg", "av/n/m_shen039.jpg", "av/n/m_shen040.jpg", "av/n/m_shen041.jpg", "av/n/m_shen042.jpg", "av/n/m_shen043.jpg", "av/n/m_shen044.jpg", "av/n/m_shen045.jpg", "av/n/m_shen046.jpg", "av/n/m_shen047.jpg", "av/n/m_shen048.jpg", "av/n/m_shen049.jpg", "av/n/m_shen050.jpg", "av/n/m_shen051.jpg", "av/n/m_shen052.jpg", "av/n/m_shen053.jpg", "av/n/m_shen054.jpg", "av/n/m_shen055.jpg", "av/n/m_shen056.jpg", "av/n/m_shen057.jpg", "av/n/m_shen058.jpg", "av/n/m_shen059.jpg", "av/n/m_shen060.jpg", "av/n/m_shen061.jpg", "av/n/m_shen062.jpg", "av/n/m_shen063.jpg", "av/n/m_shen064.jpg", "av/n/m_shen065.jpg", "av/n/m_shen066.jpg", "av/n/m_shen067.jpg", "av/n/m_shen068.jpg", "av/n/m_shen069.jpg", "av/n/m_shen070.jpg", "av/n/m_shen071.jpg", "av/n/m_shen072.jpg", "av/n/m_shen073.jpg", "av/n/m_shen074.jpg", "av/n/m_shen075.jpg", "av/n/m_shen076.jpg", "av/n/m_shen077.jpg", "av/n/m_shen078.jpg", "av/n/m_shen079.jpg", "av/n/m_shen080.jpg", "av/n/m_shen081.jpg", "av/n/m_shen082.jpg", "av/n/m_shen083.jpg", "av/n/m_shen084.jpg", "av/n/m_shen085.jpg", "av/n/m_shen086.jpg", "av/n/m_shen087.jpg", "av/n/m_shen088.jpg", "av/n/m_shen089.jpg", "av/n/m_shen090.jpg", "av/n/m_shen091.jpg", "av/n/m_shen092.jpg", "av/n/m_shen093.jpg", "av/n/m_shen094.jpg", "av/n/m_shen095.jpg", "av/n/m_shen096.jpg", "av/n/m_shen097.jpg", "av/n/m_shen098.jpg", "av/n/m_shen099.jpg", "av/n/m_shen100.jpg", "av/n/m_shen101.jpg", "av/n/m_shen102.jpg", "av/n/m_shen103.jpg", "av/n/m_shen104.jpg", "av/n/m_shen105.jpg", "av/n/m_shen106.jpg", "av/n/m_shen107.jpg", "av/n/m_shen108.jpg", "av/n/m_shen109.jpg", "av/n/m_shen110.jpg", "av/n/m_shen111.jpg", "av/n/m_shen112.jpg", "av/n/m_shen113.jpg", "av/n/m_shen114.jpg", "av/n/m_shen115.jpg", "av/n/m_shen116.jpg", "av/n/m_shen117.jpg", "av/n/m_shen118.jpg", "av/n/m_shen119.jpg", "av/n/m_shen120.jpg", "av/n/m_shen121.jpg", "av/n/m_shen122.jpg", "av/n/m_shen123.jpg", "av/n/m_shen124.jpg", "av/n/m_shen125.jpg", "av/n/m_shen126.jpg", "av/n/m_shen127.jpg", "av/n/m_shen128.jpg", "av/n/m_shen129.jpg", "av/n/m_shen130.jpg", "av/n/m_shen131.jpg", "av/n/m_shen132.jpg", "av/n/m_shen133.jpg", "av/n/m_shen134.jpg", "av/n/m_shen135.jpg", "av/n/m_shen136.jpg", "av/n/m_shen137.jpg", "av/n/m_shen138.jpg", "av/n/m_shen139.jpg", "av/n/m_shen140.jpg", "av/n/m_shen141.jpg", "av/n/m_shen142.jpg", "av/n/m_shen143.jpg", "av/n/m_shen144.jpg", "av/n/m_shen145.jpg", "av/n/m_shen146.jpg", "av/n/m_shen147.jpg", "av/n/m_shen148.jpg", "av/n/m_ming001.jpg", "av/n/m_ming002.jpg", "av/n/m_ming003.jpg", "av/n/m_ming004.jpg", "av/n/m_ming005.jpg", "av/n/m_ming006.jpg", "av/n/m_ming007.jpg", "av/n/m_ming008.jpg", "av/n/m_ming009.jpg", "av/n/m_ming010.jpg", "av/n/m_ming011.jpg", "av/n/m_ming012.jpg", "av/n/m_ming013.jpg", "av/n/m_ming014.jpg", "av/n/m_ming015.jpg", "av/n/m_ming016.jpg", "av/n/m_ming017.jpg", "av/n/m_ming018.jpg", "av/n/m_ming019.jpg", "av/n/m_ming020.jpg", "av/n/m_ming021.jpg", "av/n/m_ming022.jpg", "av/n/m_ming023.jpg", "av/n/m_ming024.jpg", "av/n/m_ming025.jpg", "av/n/m_ming026.jpg", "av/n/m_ming027.jpg", "av/n/m_ming028.jpg", "av/n/m_ming029.jpg", "av/n/m_ming030.jpg", "av/n/m_ming031.jpg", "av/n/m_ming032.jpg", "av/n/m_ming033.jpg", "av/n/m_ming034.jpg", "av/n/m_ming035.jpg", "av/n/m_ming036.jpg", "av/n/m_ming037.jpg", "av/n/m_ming038.jpg", "av/n/m_ming039.jpg", "av/n/m_ming040.jpg", "av/n/m_ming041.jpg", "av/n/m_ming042.jpg", "av/n/m_ming043.jpg", "av/n/m_ming044.jpg", "av/n/m_ming045.jpg", "av/n/m_ming046.jpg", "av/n/m_ming047.jpg", "av/n/m_ming048.jpg", "av/n/m_ming049.jpg", "av/n/m_ming050.jpg", "av/n/m_ming051.jpg", "av/n/m_ming052.jpg", "av/n/m_ming053.jpg", "av/n/m_ming054.jpg", "av/n/m_ming055.jpg", "av/n/m_ming056.jpg", "av/n/m_ming057.jpg", "av/n/m_ming058.jpg", "av/n/m_ming059.jpg", "av/n/m_ming060.jpg", "av/n/m_ming061.jpg", "av/n/m_ming062.jpg", "av/n/m_ming063.jpg", "av/n/m_ming064.jpg", "av/n/m_ming065.jpg", "av/n/m_ming066.jpg", "av/n/m_ming067.jpg", "av/n/m_ming068.jpg", "av/n/m_ming069.jpg", "av/n/m_ming070.jpg", "av/n/m_ming071.jpg", "av/n/m_ming072.jpg", "av/n/m_ming073.jpg", "av/n/m_ming074.jpg", "av/n/m_ming075.jpg", "av/n/m_ming076.jpg", "av/n/m_ming077.jpg", "av/n/m_ming078.jpg", "av/n/m_ming079.jpg", "av/n/m_ming080.jpg", "av/n/m_ming081.jpg", "av/n/m_ming082.jpg", "av/n/m_ming083.jpg", "av/n/m_ming084.jpg", "av/n/m_ming085.jpg", "av/n/m_ming086.jpg", "av/n/m_ming087.jpg", "av/n/m_ming088.jpg", "av/n/m_ming089.jpg", "av/n/m_ming090.jpg", "av/n/m_ming091.jpg", "av/n/m_ming092.jpg", "av/n/m_ming093.jpg", "av/n/m_ming094.jpg", "av/n/m_ming095.jpg", "av/n/m_ming096.jpg", "av/n/m_ming097.jpg", "av/n/m_ming098.jpg", "av/n/m_ming099.jpg", "av/n/m_ming100.jpg", "av/n/m_ming101.jpg", "av/n/m_ming102.jpg", "av/n/m_ming103.jpg", "av/n/m_ming104.jpg", "av/n/m_ming105.jpg", "av/n/m_ming106.jpg", "av/n/m_ming107.jpg", "av/n/m_ming108.jpg", "av/n/m_ming109.jpg", "av/n/m_ming110.jpg", "av/n/m_ming111.jpg", "av/n/m_ming112.jpg", "av/n/m_ming113.jpg", "av/n/m_ming114.jpg", "av/n/m_ming115.jpg", "av/n/m_ming116.jpg", "av/n/m_ming117.jpg", "av/n/m_ming118.jpg", "av/n/m_ming119.jpg", "av/n/m_ming120.jpg", "av/n/m_ming121.jpg", "av/n/m_ming122.jpg", "av/n/m_ming123.jpg", "av/n/m_ming124.jpg", "av/n/m_ming125.jpg", "av/n/m_ming126.jpg", "av/n/m_ming127.jpg", "av/n/m_ming128.jpg", "av/n/m_ming129.jpg", "av/n/m_ming130.jpg", "av/n/m_ming131.jpg", "av/n/m_ming132.jpg", "av/n/m_ming133.jpg", "av/n/m_ming134.jpg", "av/n/m_ming135.jpg", "av/n/m_ming136.jpg", "av/n/m_ming137.jpg", "av/n/m_ming138.jpg", "av/n/m_ming139.jpg", "av/n/m_ming140.jpg", "av/n/m_ming141.jpg", "av/n/m_ming142.jpg", "av/n/m_ming143.jpg", "av/n/m_ming144.jpg", "av/n/m_ming145.jpg", "av/n/m_ming146.jpg", "av/n/m_ming147.jpg", "av/n/m_xie001.jpg", "av/n/m_xie002.jpg", "av/n/m_xie003.jpg", "av/n/m_xie004.jpg", "av/n/m_xie005.jpg", "av/n/m_xie006.jpg", "av/n/m_xie007.jpg", "av/n/m_xie008.jpg", "av/n/m_xie009.jpg", "av/n/m_xie010.jpg", "av/n/m_xie011.jpg", "av/n/m_xie012.jpg", "av/n/m_xie013.jpg", "av/n/m_xie014.jpg", "av/n/m_xie015.jpg", "av/n/m_xie016.jpg", "av/n/m_xie017.jpg", "av/n/m_xie018.jpg", "av/n/m_xie019.jpg", "av/n/m_xie020.jpg", "av/n/m_xie021.jpg", "av/n/m_xie022.jpg", "av/n/m_xie023.jpg", "av/n/m_xie024.jpg", "av/n/m_xie025.jpg", "av/n/m_xie026.jpg", "av/n/m_xie027.jpg", "av/n/m_xie028.jpg", "av/n/m_xie029.jpg", "av/n/m_xie030.jpg", "av/n/m_xie031.jpg", "av/n/m_xie032.jpg", "av/n/m_xie033.jpg", "av/n/m_xie034.jpg", "av/n/m_xie035.jpg", "av/n/m_xie036.jpg", "av/n/m_xie037.jpg", "av/n/m_xie038.jpg", "av/n/m_xie039.jpg", "av/n/m_xie040.jpg", "av/n/m_xie041.jpg", "av/n/m_xie042.jpg", "av/n/m_xie043.jpg", "av/n/m_xie044.jpg", "av/n/m_xie045.jpg", "av/n/m_xie046.jpg", "av/n/m_xie047.jpg", "av/n/m_xie048.jpg", "av/n/m_xie049.jpg", "av/n/m_xie050.jpg", "av/n/m_xie051.jpg", "av/n/m_xie052.jpg", "av/n/m_xie053.jpg", "av/n/m_xie054.jpg", "av/n/m_xie055.jpg", "av/n/m_xie056.jpg", "av/n/m_xie057.jpg", "av/n/m_xie058.jpg", "av/n/m_xie059.jpg", "av/n/m_xie060.jpg", "av/n/m_xie061.jpg", "av/n/m_xie062.jpg", "av/n/m_xie063.jpg", "av/n/m_xie064.jpg", "av/n/m_xie065.jpg", "av/n/m_xie066.jpg", "av/n/m_xie067.jpg", "av/n/m_xie068.jpg", "av/n/m_xie069.jpg", "av/n/m_xie070.jpg", "av/n/m_xie071.jpg", "av/n/m_xie072.jpg", "av/n/m_xie073.jpg", "av/n/m_xie074.jpg", "av/n/m_xie075.jpg", "av/n/m_xie076.jpg", "av/n/m_xie077.jpg", "av/n/m_xie078.jpg", "av/n/m_xie079.jpg", "av/n/m_xie080.jpg", "av/n/m_xie081.jpg", "av/n/m_xie082.jpg", "av/n/m_xie083.jpg", "av/n/m_xie084.jpg", "av/n/m_xie085.jpg", "av/n/m_xie086.jpg", "av/n/m_xie087.jpg", "av/n/m_xie088.jpg", "av/n/m_xie089.jpg", "av/n/m_xie090.jpg", "av/n/m_xie091.jpg", "av/n/m_xie092.jpg", "av/n/m_xie093.jpg", "av/n/m_xie094.jpg", "av/n/m_xie095.jpg", "av/n/m_xie096.jpg", "av/n/m_xie097.jpg", "av/n/m_xie098.jpg", "av/n/m_xie099.jpg", "av/n/m_xie100.jpg", "av/n/m_xie101.jpg", "av/n/m_xie102.jpg", "av/n/m_xie103.jpg", "av/n/m_xie104.jpg", "av/n/m_xie105.jpg", "av/n/m_xie106.jpg", "av/n/m_xie107.jpg", "av/n/m_xie108.jpg", "av/n/m_xie109.jpg", "av/n/m_xie110.jpg", "av/n/m_xie111.jpg", "av/n/m_xie112.jpg", "av/n/m_xie113.jpg", "av/n/m_xie114.jpg", "av/n/m_xie115.jpg", "av/n/m_xie116.jpg", "av/n/m_xie117.jpg", "av/n/m_xie118.jpg", "av/n/m_xie119.jpg", "av/n/m_xie120.jpg", "av/n/m_xie121.jpg", "av/n/m_xie122.jpg", "av/n/m_xie123.jpg", "av/n/m_xie124.jpg", "av/n/m_xie125.jpg", "av/n/m_xie126.jpg", "av/n/m_xie127.jpg", "av/n/m_xie128.jpg", "av/n/m_xie129.jpg", "av/n/m_xie130.jpg", "av/n/m_xie131.jpg", "av/n/m_xie132.jpg", "av/n/m_xie133.jpg", "av/n/m_xie134.jpg", "av/n/m_xie135.jpg", "av/n/m_xie136.jpg", "av/n/m_xie137.jpg", "av/n/m_xie138.jpg", "av/n/m_xie139.jpg", "av/n/m_xie140.jpg", "av/n/m_xie141.jpg", "av/n/m_xie142.jpg", "av/n/m_xie143.jpg", "av/n/m_xie144.jpg", "av/n/m_xie145.jpg", "av/n/m_xie146.jpg", "av/n/m_xie147.jpg", "av/n/m_xie148.jpg"],
  f: ["av/r/f_001.jpg", "av/r/f_002.jpg", "av/r/f_003.jpg", "av/s/f_001.jpg", "av/s/f_002.jpg", "av/s/f_003.jpg", "av/g/f_xianxia_001.jpg", "av/g/f_xianxia_002.jpg", "av/g/f_xianxia_003.jpg", "av/g/f_xianxia_004.jpg", "av/g/f_xianxia_005.jpg", "av/g/f_xianxia_006.jpg", "av/g/f_xianxia_007.jpg", "av/g/f_xianxia_008.jpg", "av/g/f_xianxia_009.jpg", "av/g/f_xianxia_010.jpg", "av/g/f_xianxia_011.jpg", "av/g/f_xianxia_012.jpg", "av/g/f_xianxia_013.jpg", "av/g/f_xianxia_014.jpg", "av/g/f_xianxia_015.jpg", "av/g/f_xianxia_016.jpg", "av/g/f_xianxia_017.jpg", "av/g/f_xianxia_018.jpg", "av/g/f_xianxia_019.jpg", "av/g/f_xianxia_020.jpg", "av/g/f_xianxia_021.jpg", "av/g/f_xianxia_022.jpg", "av/g/f_xianxia_023.jpg", "av/g/f_xianxia_024.jpg", "av/g/f_xianxia_025.jpg", "av/g/f_xianxia_026.jpg", "av/g/f_xianxia_027.jpg", "av/g/f_xianxia_028.jpg", "av/g/f_xianxia_029.jpg", "av/g/f_xianxia_030.jpg", "av/g/f_xianxia_031.jpg", "av/g/f_xianxia_032.jpg", "av/g/f_xianxia_033.jpg", "av/g/f_xianxia_034.jpg", "av/g/f_xianxia_035.jpg", "av/g/f_xianxia_036.jpg", "av/g/f_xianxia_037.jpg", "av/g/f_xianxia_038.jpg", "av/g/f_xianxia_039.jpg", "av/g/f_xianxia_040.jpg", "av/g/f_xianxia_041.jpg", "av/g/f_xianxia_042.jpg", "av/g/f_xianxia_043.jpg", "av/g/f_xianxia_044.jpg", "av/g/f_xianxia_045.jpg", "av/g/f_xianxia_046.jpg", "av/g/f_xianxia_047.jpg", "av/g/f_xianxia_048.jpg", "av/g/f_xianxia_049.jpg", "av/g/f_xianxia_050.jpg", "av/g/f_xianxia_051.jpg", "av/g/f_xianxia_052.jpg", "av/g/f_xianxia_053.jpg", "av/g/f_xianxia_054.jpg", "av/g/f_xianxia_055.jpg", "av/g/f_xianxia_056.jpg", "av/g/f_xianxia_057.jpg", "av/g/f_xianxia_058.jpg", "av/g/f_xianxia_059.jpg", "av/g/f_xianxia_060.jpg", "av/g/f_xianxia_061.jpg", "av/g/f_xianxia_062.jpg", "av/g/f_xianxia_063.jpg", "av/g/f_xianxia_064.jpg", "av/g/f_xianxia_065.jpg", "av/g/f_xianxia_066.jpg", "av/g/f_xianxia_067.jpg", "av/g/f_xianxia_068.jpg", "av/g/f_xianxia_069.jpg", "av/g/f_xianxia_070.jpg", "av/g/f_xianxia_071.jpg", "av/g/f_xianxia_072.jpg", "av/g/f_xianxia_073.jpg", "av/g/f_xianxia_074.jpg", "av/g/f_xianxia_075.jpg", "av/g/f_xianxia_076.jpg", "av/g/f_xianxia_077.jpg", "av/g/f_xianxia_078.jpg", "av/g/f_xianxia_079.jpg", "av/g/f_xianxia_080.jpg", "av/g/f_xianxia_081.jpg", "av/g/f_xianxia_082.jpg", "av/g/f_xianxia_083.jpg", "av/g/f_xianxia_084.jpg", "av/g/f_xianxia_085.jpg", "av/g/f_xianxia_086.jpg", "av/g/f_xianxia_087.jpg", "av/g/f_xianxia_088.jpg", "av/g/f_xianxia_089.jpg", "av/g/f_xianxia_090.jpg", "av/g/f_xianxia_091.jpg", "av/g/f_xianxia_092.jpg", "av/g/f_xianxia_093.jpg", "av/g/f_xianxia_094.jpg", "av/g/f_xianxia_095.jpg", "av/g/f_xianxia_096.jpg", "av/g/f_xianxia_097.jpg", "av/g/f_xianxia_098.jpg", "av/g/f_xianxia_099.jpg", "av/g/f_xianxia_100.jpg", "av/g/f_game_001.jpg", "av/g/f_game_002.jpg", "av/g/f_game_003.jpg", "av/g/f_game_004.jpg", "av/g/f_game_005.jpg", "av/g/f_game_006.jpg", "av/g/f_game_007.jpg", "av/g/f_game_008.jpg", "av/g/f_game_009.jpg", "av/g/f_game_010.jpg", "av/g/f_game_011.jpg", "av/g/f_game_012.jpg", "av/g/f_game_013.jpg", "av/g/f_game_014.jpg", "av/g/f_game_015.jpg", "av/g/f_game_016.jpg", "av/g/f_game_017.jpg", "av/g/f_game_018.jpg", "av/g/f_game_019.jpg", "av/g/f_game_020.jpg", "av/g/f_game_021.jpg", "av/g/f_game_022.jpg", "av/g/f_game_023.jpg", "av/g/f_game_024.jpg", "av/g/f_game_025.jpg", "av/g/f_game_026.jpg", "av/g/f_game_027.jpg", "av/g/f_game_028.jpg", "av/g/f_game_029.jpg", "av/g/f_game_030.jpg", "av/g/f_game_031.jpg", "av/g/f_game_032.jpg", "av/g/f_game_033.jpg", "av/g/f_game_034.jpg", "av/g/f_game_035.jpg", "av/g/f_game_036.jpg", "av/g/f_game_037.jpg", "av/g/f_game_038.jpg", "av/g/f_game_039.jpg", "av/g/f_game_040.jpg", "av/g/f_game_041.jpg", "av/g/f_game_042.jpg", "av/g/f_game_043.jpg", "av/g/f_game_044.jpg", "av/g/f_game_045.jpg", "av/g/f_game_046.jpg", "av/g/f_game_047.jpg", "av/g/f_game_048.jpg", "av/g/f_game_049.jpg", "av/g/f_game_050.jpg", "av/g/f_game_051.jpg", "av/g/f_game_052.jpg", "av/g/f_game_053.jpg", "av/g/f_game_054.jpg", "av/g/f_game_055.jpg", "av/g/f_game_056.jpg", "av/g/f_game_057.jpg", "av/g/f_game_058.jpg", "av/g/f_game_059.jpg", "av/g/f_game_060.jpg", "av/g/f_game_061.jpg", "av/g/f_game_062.jpg", "av/g/f_game_063.jpg", "av/g/f_game_064.jpg", "av/g/f_game_065.jpg", "av/g/f_game_066.jpg", "av/g/f_game_067.jpg", "av/g/f_game_068.jpg", "av/g/f_game_069.jpg", "av/g/f_game_070.jpg", "av/g/f_game_071.jpg", "av/g/f_game_072.jpg", "av/g/f_game_073.jpg", "av/g/f_game_074.jpg", "av/g/f_game_075.jpg", "av/g/f_game_076.jpg", "av/g/f_game_077.jpg", "av/g/f_game_078.jpg", "av/g/f_game_079.jpg", "av/g/f_game_080.jpg", "av/g/f_game_081.jpg", "av/g/f_game_082.jpg", "av/g/f_game_083.jpg", "av/g/f_game_084.jpg", "av/g/f_game_085.jpg", "av/g/f_game_086.jpg", "av/g/f_game_087.jpg", "av/g/f_game_088.jpg", "av/g/f_game_089.jpg", "av/g/f_game_090.jpg", "av/g/f_game_091.jpg", "av/g/f_game_092.jpg", "av/g/f_game_093.jpg", "av/g/f_game_094.jpg", "av/g/f_game_095.jpg", "av/g/f_game_096.jpg", "av/g/f_game_097.jpg", "av/g/f_game_098.jpg", "av/g/f_game_099.jpg", "av/g/f_game_100.jpg", "av/g/f_anime_001.jpg", "av/g/f_anime_002.jpg", "av/g/f_anime_003.jpg", "av/g/f_anime_004.jpg", "av/g/f_anime_005.jpg", "av/g/f_anime_007.jpg", "av/g/f_anime_008.jpg", "av/g/f_anime_009.jpg", "av/g/f_anime_010.jpg", "av/g/f_anime_011.jpg", "av/g/f_anime_012.jpg", "av/g/f_anime_013.jpg", "av/g/f_anime_014.jpg", "av/g/f_anime_015.jpg", "av/g/f_anime_016.jpg", "av/g/f_anime_018.jpg", "av/g/f_anime_019.jpg", "av/g/f_anime_020.jpg", "av/g/f_anime_021.jpg", "av/g/f_anime_022.jpg", "av/g/f_anime_023.jpg", "av/g/f_anime_024.jpg", "av/g/f_anime_025.jpg", "av/g/f_anime_026.jpg", "av/g/f_anime_027.jpg", "av/g/f_anime_028.jpg", "av/g/f_anime_030.jpg", "av/g/f_anime_031.jpg", "av/g/f_anime_032.jpg", "av/g/f_anime_033.jpg", "av/g/f_anime_034.jpg", "av/g/f_anime_035.jpg", "av/g/f_anime_036.jpg", "av/g/f_anime_037.jpg", "av/g/f_anime_038.jpg", "av/g/f_anime_039.jpg", "av/g/f_anime_040.jpg", "av/g/f_anime_041.jpg", "av/g/f_anime_042.jpg", "av/g/f_anime_043.jpg", "av/g/f_anime_044.jpg", "av/g/f_anime_045.jpg", "av/g/f_anime_046.jpg", "av/g/f_anime_047.jpg", "av/g/f_anime_048.jpg", "av/g/f_anime_049.jpg", "av/g/f_anime_050.jpg", "av/g/f_anime_051.jpg", "av/g/f_anime_052.jpg", "av/g/f_anime_053.jpg", "av/g/f_anime_054.jpg", "av/g/f_anime_055.jpg", "av/g/f_anime_057.jpg", "av/g/f_anime_058.jpg", "av/g/f_anime_059.jpg", "av/g/f_anime_060.jpg", "av/g/f_anime_061.jpg", "av/g/f_anime_063.jpg", "av/g/f_anime_064.jpg", "av/g/f_anime_065.jpg", "av/g/f_anime_066.jpg", "av/g/f_anime_067.jpg", "av/g/f_anime_068.jpg", "av/g/f_anime_069.jpg", "av/g/f_anime_070.jpg", "av/g/f_anime_071.jpg", "av/g/f_anime_072.jpg", "av/g/f_anime_073.jpg", "av/g/f_anime_074.jpg", "av/g/f_anime_075.jpg", "av/g/f_anime_076.jpg", "av/g/f_anime_077.jpg", "av/g/f_anime_079.jpg", "av/g/f_anime_080.jpg", "av/g/f_anime_081.jpg", "av/g/f_anime_082.jpg", "av/g/f_anime_083.jpg", "av/g/f_anime_084.jpg", "av/g/f_anime_085.jpg", "av/g/f_anime_086.jpg", "av/g/f_anime_087.jpg", "av/g/f_anime_088.jpg", "av/g/f_anime_089.jpg", "av/g/f_anime_090.jpg", "av/g/f_anime_091.jpg", "av/g/f_anime_092.jpg", "av/g/f_anime_093.jpg", "av/g/f_anime_094.jpg", "av/g/f_anime_095.jpg", "av/g/f_anime_096.jpg", "av/g/f_anime_097.jpg", "av/g/f_anime_098.jpg", "av/g/f_anime_099.jpg", "av/g/f_anime_100.jpg", "av/n/f_chuan001.jpg", "av/n/f_chuan002.jpg", "av/n/f_chuan003.jpg", "av/n/f_chuan004.jpg", "av/n/f_chuan005.jpg", "av/n/f_chuan006.jpg", "av/n/f_chuan007.jpg", "av/n/f_chuan008.jpg", "av/n/f_chuan009.jpg", "av/n/f_chuan010.jpg", "av/n/f_chuan011.jpg", "av/n/f_chuan012.jpg", "av/n/f_chuan013.jpg", "av/n/f_chuan014.jpg", "av/n/f_chuan015.jpg", "av/n/f_chuan016.jpg", "av/n/f_chuan017.jpg", "av/n/f_chuan018.jpg", "av/n/f_chuan019.jpg", "av/n/f_chuan020.jpg", "av/n/f_chuan021.jpg", "av/n/f_chuan022.jpg", "av/n/f_chuan023.jpg", "av/n/f_chuan024.jpg", "av/n/f_chuan025.jpg", "av/n/f_chuan026.jpg", "av/n/f_chuan027.jpg", "av/n/f_chuan028.jpg", "av/n/f_chuan029.jpg", "av/n/f_chuan030.jpg", "av/n/f_chuan031.jpg", "av/n/f_chuan032.jpg", "av/n/f_chuan033.jpg", "av/n/f_chuan034.jpg", "av/n/f_chuan035.jpg", "av/n/f_chuan036.jpg", "av/n/f_chuan037.jpg", "av/n/f_chuan038.jpg", "av/n/f_chuan039.jpg", "av/n/f_chuan040.jpg", "av/n/f_chuan041.jpg", "av/n/f_chuan042.jpg", "av/n/f_chuan043.jpg", "av/n/f_chuan044.jpg", "av/n/f_chuan045.jpg", "av/n/f_chuan046.jpg", "av/n/f_chuan047.jpg", "av/n/f_chuan048.jpg", "av/n/f_chuan049.jpg", "av/n/f_chuan050.jpg", "av/n/f_chuan051.jpg", "av/n/f_chuan052.jpg", "av/n/f_chuan053.jpg", "av/n/f_chuan054.jpg", "av/n/f_chuan055.jpg", "av/n/f_mo001.jpg", "av/n/f_mo002.jpg", "av/n/f_mo003.jpg", "av/n/f_mo004.jpg", "av/n/f_mo005.jpg", "av/n/f_mo006.jpg", "av/n/f_mo007.jpg", "av/n/f_mo008.jpg", "av/n/f_mo009.jpg", "av/n/f_mo010.jpg", "av/n/f_mo011.jpg", "av/n/f_mo012.jpg", "av/n/f_mo013.jpg", "av/n/f_mo014.jpg", "av/n/f_mo015.jpg", "av/n/f_mo016.jpg", "av/n/f_mo017.jpg", "av/n/f_mo018.jpg", "av/n/f_mo019.jpg", "av/n/f_mo020.jpg", "av/n/f_mo021.jpg", "av/n/f_mo022.jpg", "av/n/f_mo023.jpg", "av/n/f_mo024.jpg", "av/n/f_mo025.jpg", "av/n/f_mo026.jpg", "av/n/f_mo027.jpg", "av/n/f_mo028.jpg", "av/n/f_mo029.jpg", "av/n/f_mo030.jpg", "av/n/f_mo031.jpg", "av/n/f_mo032.jpg", "av/n/f_mo033.jpg", "av/n/f_mo034.jpg", "av/n/f_mo035.jpg", "av/n/f_mo036.jpg", "av/n/f_mo037.jpg", "av/n/f_mo038.jpg", "av/n/f_mo039.jpg", "av/n/f_mo040.jpg", "av/n/f_mo041.jpg", "av/n/f_mo042.jpg", "av/n/f_mo043.jpg", "av/n/f_mo044.jpg", "av/n/f_mo045.jpg", "av/n/f_mo046.jpg", "av/n/f_mo047.jpg", "av/n/f_mo048.jpg", "av/n/f_mo049.jpg", "av/n/f_mo050.jpg", "av/n/f_mo051.jpg", "av/n/f_mo052.jpg", "av/n/f_mo053.jpg", "av/n/f_mo054.jpg", "av/n/f_mo055.jpg", "av/n/f_mo056.jpg", "av/n/f_mo057.jpg", "av/n/f_mo058.jpg", "av/n/f_mo059.jpg", "av/n/f_mo060.jpg", "av/n/f_mo061.jpg", "av/n/f_mo062.jpg", "av/n/f_mo063.jpg", "av/n/f_mo064.jpg", "av/n/f_mo065.jpg", "av/n/f_mo066.jpg", "av/n/f_mo067.jpg", "av/n/f_mo068.jpg", "av/n/f_mo069.jpg", "av/n/f_mo070.jpg", "av/n/f_mo071.jpg", "av/n/f_mo072.jpg", "av/n/f_mo073.jpg", "av/n/f_mo074.jpg", "av/n/f_mo075.jpg", "av/n/f_mo076.jpg", "av/n/f_mo077.jpg", "av/n/f_mo078.jpg", "av/n/f_mo079.jpg", "av/n/f_mo080.jpg", "av/n/f_mo081.jpg", "av/n/f_mo082.jpg", "av/n/f_mo083.jpg", "av/n/f_mo084.jpg", "av/n/f_mo085.jpg", "av/n/f_mo086.jpg", "av/n/f_mo087.jpg", "av/n/f_mo088.jpg", "av/n/f_mo089.jpg", "av/n/f_mo090.jpg", "av/n/f_mo091.jpg", "av/n/f_mo092.jpg", "av/n/f_mo093.jpg", "av/n/f_mo094.jpg", "av/n/f_mo095.jpg", "av/n/f_mo096.jpg", "av/n/f_mo097.jpg", "av/n/f_mo098.jpg", "av/n/f_mo099.jpg", "av/n/f_mo100.jpg", "av/n/f_mo101.jpg", "av/n/f_mo102.jpg", "av/n/f_mo103.jpg", "av/n/f_mo104.jpg", "av/n/f_mo105.jpg", "av/n/f_mo106.jpg", "av/n/f_mo107.jpg", "av/n/f_mo108.jpg", "av/n/f_mo109.jpg", "av/n/f_mo110.jpg", "av/n/f_mo111.jpg", "av/n/f_mo112.jpg", "av/n/f_mo113.jpg", "av/n/f_mo114.jpg", "av/n/f_mo115.jpg", "av/n/f_mo116.jpg", "av/n/f_mo117.jpg", "av/n/f_mo118.jpg", "av/n/f_mo119.jpg", "av/n/f_mo120.jpg", "av/n/f_mo121.jpg", "av/n/f_mo122.jpg", "av/n/f_mo123.jpg", "av/n/f_mo124.jpg", "av/n/f_mo125.jpg", "av/n/f_mo126.jpg", "av/n/f_mo127.jpg", "av/n/f_mo128.jpg", "av/n/f_mo129.jpg", "av/n/f_mo130.jpg", "av/n/f_mo131.jpg", "av/n/f_mo132.jpg", "av/n/f_mo133.jpg", "av/n/f_mo134.jpg", "av/n/f_mo135.jpg", "av/n/f_mo136.jpg", "av/n/f_mo137.jpg", "av/n/f_mo138.jpg", "av/n/f_mo139.jpg", "av/n/f_mo140.jpg", "av/n/f_mo141.jpg", "av/n/f_mo142.jpg", "av/n/f_mo143.jpg", "av/n/f_mo144.jpg", "av/n/f_mo145.jpg", "av/n/f_mo146.jpg", "av/n/f_yao001.jpg", "av/n/f_yao002.jpg", "av/n/f_yao003.jpg", "av/n/f_yao004.jpg", "av/n/f_yao005.jpg", "av/n/f_yao006.jpg", "av/n/f_yao007.jpg", "av/n/f_yao008.jpg", "av/n/f_yao009.jpg", "av/n/f_yao010.jpg", "av/n/f_yao011.jpg", "av/n/f_yao012.jpg", "av/n/f_yao013.jpg", "av/n/f_yao014.jpg", "av/n/f_yao015.jpg", "av/n/f_yao016.jpg", "av/n/f_yao017.jpg", "av/n/f_yao018.jpg", "av/n/f_yao019.jpg", "av/n/f_yao020.jpg", "av/n/f_yao021.jpg", "av/n/f_yao022.jpg", "av/n/f_yao023.jpg", "av/n/f_yao024.jpg", "av/n/f_yao025.jpg", "av/n/f_yao026.jpg", "av/n/f_yao027.jpg", "av/n/f_yao028.jpg", "av/n/f_yao029.jpg", "av/n/f_yao030.jpg", "av/n/f_yao031.jpg", "av/n/f_yao032.jpg", "av/n/f_yao033.jpg", "av/n/f_yao034.jpg", "av/n/f_yao035.jpg", "av/n/f_yao036.jpg", "av/n/f_yao037.jpg", "av/n/f_yao038.jpg", "av/n/f_yao039.jpg", "av/n/f_yao040.jpg", "av/n/f_yao041.jpg", "av/n/f_yao042.jpg", "av/n/f_yao043.jpg", "av/n/f_yao044.jpg", "av/n/f_yao045.jpg", "av/n/f_yao046.jpg", "av/n/f_yao047.jpg", "av/n/f_yao048.jpg", "av/n/f_yao049.jpg", "av/n/f_yao050.jpg", "av/n/f_yao051.jpg", "av/n/f_yao052.jpg", "av/n/f_yao053.jpg", "av/n/f_yao054.jpg", "av/n/f_yao055.jpg", "av/n/f_yao056.jpg", "av/n/f_yao057.jpg", "av/n/f_yao058.jpg", "av/n/f_yao059.jpg", "av/n/f_yao060.jpg", "av/n/f_yao061.jpg", "av/n/f_yao062.jpg", "av/n/f_yao063.jpg", "av/n/f_yao064.jpg", "av/n/f_yao065.jpg", "av/n/f_yao066.jpg", "av/n/f_yao067.jpg", "av/n/f_yao068.jpg", "av/n/f_yao069.jpg", "av/n/f_yao070.jpg", "av/n/f_yao071.jpg", "av/n/f_yao072.jpg", "av/n/f_yao073.jpg", "av/n/f_yao074.jpg", "av/n/f_yao075.jpg", "av/n/f_yao076.jpg", "av/n/f_yao077.jpg", "av/n/f_yao078.jpg", "av/n/f_yao079.jpg", "av/n/f_yao080.jpg", "av/n/f_yao081.jpg", "av/n/f_yao082.jpg", "av/n/f_yao083.jpg", "av/n/f_yao084.jpg", "av/n/f_yao085.jpg", "av/n/f_yao086.jpg", "av/n/f_yao087.jpg", "av/n/f_yao088.jpg", "av/n/f_yao089.jpg", "av/n/f_yao090.jpg", "av/n/f_yao091.jpg", "av/n/f_yao092.jpg", "av/n/f_yao093.jpg", "av/n/f_yao094.jpg", "av/n/f_yao095.jpg", "av/n/f_yao096.jpg", "av/n/f_yao097.jpg", "av/n/f_yao098.jpg", "av/n/f_yao099.jpg", "av/n/f_yao100.jpg", "av/n/f_yao101.jpg", "av/n/f_yao102.jpg", "av/n/f_yao103.jpg", "av/n/f_yao104.jpg", "av/n/f_yao105.jpg", "av/n/f_yao106.jpg", "av/n/f_yao107.jpg", "av/n/f_yao108.jpg", "av/n/f_yao109.jpg", "av/n/f_yao110.jpg", "av/n/f_yao111.jpg", "av/n/f_yao112.jpg", "av/n/f_yao113.jpg", "av/n/f_yao114.jpg", "av/n/f_yao115.jpg", "av/n/f_yao116.jpg", "av/n/f_yao117.jpg", "av/n/f_yao118.jpg", "av/n/f_yao119.jpg", "av/n/f_yao120.jpg", "av/n/f_yao121.jpg", "av/n/f_yao122.jpg", "av/n/f_yao123.jpg", "av/n/f_yao124.jpg", "av/n/f_yao125.jpg", "av/n/f_yao126.jpg", "av/n/f_yao127.jpg", "av/n/f_yao128.jpg", "av/n/f_yao129.jpg", "av/n/f_yao130.jpg", "av/n/f_yao131.jpg", "av/n/f_yao132.jpg", "av/n/f_yao133.jpg", "av/n/f_yao134.jpg", "av/n/f_yao135.jpg", "av/n/f_yao136.jpg", "av/n/f_ling001.jpg", "av/n/f_ling002.jpg", "av/n/f_ling003.jpg", "av/n/f_ling004.jpg", "av/n/f_ling005.jpg", "av/n/f_ling006.jpg", "av/n/f_ling007.jpg", "av/n/f_ling008.jpg", "av/n/f_ling009.jpg", "av/n/f_ling010.jpg", "av/n/f_ling011.jpg", "av/n/f_ling012.jpg", "av/n/f_ling013.jpg", "av/n/f_ling014.jpg", "av/n/f_ling015.jpg", "av/n/f_ling016.jpg", "av/n/f_ling017.jpg", "av/n/f_ling018.jpg", "av/n/f_ling019.jpg", "av/n/f_ling020.jpg", "av/n/f_ling021.jpg", "av/n/f_ling022.jpg", "av/n/f_ling023.jpg", "av/n/f_ling024.jpg", "av/n/f_ling025.jpg", "av/n/f_ling026.jpg", "av/n/f_ling027.jpg", "av/n/f_ling028.jpg", "av/n/f_ling029.jpg", "av/n/f_ling030.jpg", "av/n/f_ling031.jpg", "av/n/f_ling032.jpg", "av/n/f_ling033.jpg", "av/n/f_ling034.jpg", "av/n/f_ling035.jpg", "av/n/f_ling036.jpg", "av/n/f_ling037.jpg", "av/n/f_ling038.jpg", "av/n/f_ling039.jpg", "av/n/f_ling040.jpg", "av/n/f_ling041.jpg", "av/n/f_ling042.jpg", "av/n/f_ling043.jpg", "av/n/f_ling044.jpg", "av/n/f_ling045.jpg", "av/n/f_ling046.jpg", "av/n/f_ling047.jpg", "av/n/f_ling048.jpg", "av/n/f_ling049.jpg", "av/n/f_ling050.jpg", "av/n/f_ling051.jpg", "av/n/f_ling052.jpg", "av/n/f_ling053.jpg", "av/n/f_ling054.jpg", "av/n/f_ling055.jpg", "av/n/f_ling056.jpg", "av/n/f_ling057.jpg", "av/n/f_ling058.jpg", "av/n/f_ling059.jpg", "av/n/f_ling060.jpg", "av/n/f_ling061.jpg", "av/n/f_ling062.jpg", "av/n/f_ling063.jpg", "av/n/f_ling064.jpg", "av/n/f_ling065.jpg", "av/n/f_ling066.jpg", "av/n/f_ling067.jpg", "av/n/f_ling068.jpg", "av/n/f_ling069.jpg", "av/n/f_ling070.jpg", "av/n/f_ling071.jpg", "av/n/f_ling072.jpg", "av/n/f_ling073.jpg", "av/n/f_ling074.jpg", "av/n/f_ling075.jpg", "av/n/f_ling076.jpg", "av/n/f_ling077.jpg", "av/n/f_ling078.jpg", "av/n/f_ling079.jpg", "av/n/f_ling080.jpg", "av/n/f_ling081.jpg", "av/n/f_ling082.jpg", "av/n/f_ling083.jpg", "av/n/f_ling084.jpg", "av/n/f_ling085.jpg", "av/n/f_ling086.jpg", "av/n/f_ling087.jpg", "av/n/f_ling088.jpg", "av/n/f_ling089.jpg", "av/n/f_ling090.jpg", "av/n/f_ling091.jpg", "av/n/f_ling092.jpg", "av/n/f_ling093.jpg", "av/n/f_ling094.jpg", "av/n/f_ling095.jpg", "av/n/f_ling096.jpg", "av/n/f_ling097.jpg", "av/n/f_ling098.jpg", "av/n/f_ling099.jpg", "av/n/f_ling100.jpg", "av/n/f_ling101.jpg", "av/n/f_ling102.jpg", "av/n/f_ling103.jpg", "av/n/f_ling104.jpg", "av/n/f_ling105.jpg", "av/n/f_ling106.jpg", "av/n/f_ling107.jpg", "av/n/f_ling108.jpg", "av/n/f_ling109.jpg", "av/n/f_ling110.jpg", "av/n/f_ling111.jpg", "av/n/f_ling112.jpg", "av/n/f_ling113.jpg", "av/n/f_ling114.jpg", "av/n/f_ling115.jpg", "av/n/f_ling116.jpg", "av/n/f_ling117.jpg", "av/n/f_ling118.jpg", "av/n/f_ling119.jpg", "av/n/f_ling120.jpg", "av/n/f_ling121.jpg", "av/n/f_ling122.jpg", "av/n/f_ling123.jpg", "av/n/f_ling124.jpg", "av/n/f_ling125.jpg", "av/n/f_ling126.jpg", "av/n/f_ling127.jpg", "av/n/f_ling128.jpg", "av/n/f_ling129.jpg", "av/n/f_ling130.jpg", "av/n/f_ling131.jpg", "av/n/f_ling132.jpg", "av/n/f_ling133.jpg", "av/n/f_ling134.jpg", "av/n/f_ling135.jpg", "av/n/f_ling136.jpg", "av/n/f_ling137.jpg", "av/n/f_ling138.jpg", "av/n/f_ling139.jpg", "av/n/f_ling140.jpg", "av/n/f_ling141.jpg", "av/n/f_ling142.jpg", "av/n/f_ling143.jpg", "av/n/f_yi001.jpg", "av/n/f_yi002.jpg", "av/n/f_yi003.jpg", "av/n/f_yi004.jpg", "av/n/f_yi005.jpg", "av/n/f_yi006.jpg", "av/n/f_yi007.jpg", "av/n/f_yi008.jpg", "av/n/f_yi009.jpg", "av/n/f_yi010.jpg", "av/n/f_yi011.jpg", "av/n/f_yi012.jpg", "av/n/f_yi013.jpg", "av/n/f_yi014.jpg", "av/n/f_yi015.jpg", "av/n/f_yi016.jpg", "av/n/f_yi017.jpg", "av/n/f_yi018.jpg", "av/n/f_yi019.jpg", "av/n/f_yi020.jpg", "av/n/f_yi021.jpg", "av/n/f_yi022.jpg", "av/n/f_yi023.jpg", "av/n/f_yi024.jpg", "av/n/f_yi025.jpg", "av/n/f_yi026.jpg", "av/n/f_yi027.jpg", "av/n/f_yi028.jpg", "av/n/f_yi029.jpg", "av/n/f_yi030.jpg", "av/n/f_yi031.jpg", "av/n/f_yi032.jpg", "av/n/f_yi033.jpg", "av/n/f_yi034.jpg", "av/n/f_yi035.jpg", "av/n/f_yi036.jpg", "av/n/f_yi037.jpg", "av/n/f_yi038.jpg", "av/n/f_yi039.jpg", "av/n/f_yi040.jpg", "av/n/f_yi041.jpg", "av/n/f_yi042.jpg", "av/n/f_yi043.jpg", "av/n/f_yi044.jpg", "av/n/f_yi045.jpg", "av/n/f_yi046.jpg", "av/n/f_yi047.jpg", "av/n/f_yi048.jpg", "av/n/f_yi049.jpg", "av/n/f_yi050.jpg", "av/n/f_yi051.jpg", "av/n/f_yi052.jpg", "av/n/f_yi053.jpg", "av/n/f_yi054.jpg", "av/n/f_yi055.jpg", "av/n/f_yi056.jpg", "av/n/f_yi057.jpg", "av/n/f_yi058.jpg", "av/n/f_yi059.jpg", "av/n/f_yi060.jpg", "av/n/f_yi061.jpg", "av/n/f_yi062.jpg", "av/n/f_yi063.jpg", "av/n/f_yi064.jpg", "av/n/f_yi065.jpg", "av/n/f_yi066.jpg", "av/n/f_yi067.jpg", "av/n/f_yi068.jpg", "av/n/f_yi069.jpg", "av/n/f_yi070.jpg", "av/n/f_yi071.jpg", "av/n/f_yi072.jpg", "av/n/f_yi073.jpg", "av/n/f_yi074.jpg", "av/n/f_yi075.jpg", "av/n/f_yi076.jpg", "av/n/f_yi077.jpg", "av/n/f_yi078.jpg", "av/n/f_yi079.jpg", "av/n/f_yi080.jpg", "av/n/f_yi081.jpg", "av/n/f_yi082.jpg", "av/n/f_yi083.jpg", "av/n/f_yi084.jpg", "av/n/f_yi085.jpg", "av/n/f_yi086.jpg", "av/n/f_yi087.jpg", "av/n/f_yi088.jpg", "av/n/f_yi089.jpg", "av/n/f_yi090.jpg", "av/n/f_yi091.jpg", "av/n/f_yi092.jpg", "av/n/f_yi093.jpg", "av/n/f_yi094.jpg", "av/n/f_yi095.jpg", "av/n/f_yi096.jpg", "av/n/f_yi097.jpg", "av/n/f_yi098.jpg", "av/n/f_yi099.jpg", "av/n/f_yi100.jpg", "av/n/f_yi101.jpg", "av/n/f_yi102.jpg", "av/n/f_yi103.jpg", "av/n/f_yi104.jpg", "av/n/f_yi105.jpg", "av/n/f_yi106.jpg", "av/n/f_yi107.jpg", "av/n/f_yi108.jpg", "av/n/f_yi109.jpg", "av/n/f_yi110.jpg", "av/n/f_yi111.jpg", "av/n/f_yi112.jpg", "av/n/f_yi113.jpg", "av/n/f_yi114.jpg", "av/n/f_yi115.jpg", "av/n/f_yi116.jpg", "av/n/f_yi117.jpg", "av/n/f_yi118.jpg", "av/n/f_yi119.jpg", "av/n/f_yi120.jpg", "av/n/f_yi121.jpg", "av/n/f_yi122.jpg", "av/n/f_yi123.jpg", "av/n/f_yi124.jpg", "av/n/f_yi125.jpg", "av/n/f_yi126.jpg", "av/n/f_yi127.jpg", "av/n/f_yi128.jpg", "av/n/f_yi129.jpg", "av/n/f_yi130.jpg", "av/n/f_yi131.jpg", "av/n/f_yi132.jpg", "av/n/f_yi133.jpg", "av/n/f_yi134.jpg", "av/n/f_yi135.jpg", "av/n/f_yi136.jpg", "av/n/f_yi137.jpg", "av/n/f_yi138.jpg", "av/n/f_yi139.jpg", "av/n/f_yi140.jpg", "av/n/f_yi141.jpg", "av/n/f_yi142.jpg", "av/n/f_yi143.jpg", "av/n/f_yi144.jpg", "av/n/f_yi145.jpg", "av/n/f_shen001.jpg", "av/n/f_shen002.jpg", "av/n/f_shen003.jpg", "av/n/f_shen004.jpg", "av/n/f_shen005.jpg", "av/n/f_shen006.jpg", "av/n/f_shen007.jpg", "av/n/f_shen008.jpg", "av/n/f_shen009.jpg", "av/n/f_shen010.jpg", "av/n/f_shen011.jpg", "av/n/f_shen012.jpg", "av/n/f_shen013.jpg", "av/n/f_shen014.jpg", "av/n/f_shen015.jpg", "av/n/f_shen016.jpg", "av/n/f_shen017.jpg", "av/n/f_shen018.jpg", "av/n/f_shen019.jpg", "av/n/f_shen020.jpg", "av/n/f_shen021.jpg", "av/n/f_shen022.jpg", "av/n/f_shen023.jpg", "av/n/f_shen024.jpg", "av/n/f_shen025.jpg", "av/n/f_shen026.jpg", "av/n/f_shen027.jpg", "av/n/f_shen028.jpg", "av/n/f_shen029.jpg", "av/n/f_shen030.jpg", "av/n/f_shen031.jpg", "av/n/f_shen032.jpg", "av/n/f_shen033.jpg", "av/n/f_shen034.jpg", "av/n/f_shen035.jpg", "av/n/f_shen036.jpg", "av/n/f_shen037.jpg", "av/n/f_shen038.jpg", "av/n/f_shen039.jpg", "av/n/f_shen040.jpg", "av/n/f_shen041.jpg", "av/n/f_shen042.jpg", "av/n/f_shen043.jpg", "av/n/f_shen044.jpg", "av/n/f_shen045.jpg", "av/n/f_shen046.jpg", "av/n/f_shen047.jpg", "av/n/f_shen048.jpg", "av/n/f_shen049.jpg", "av/n/f_shen050.jpg", "av/n/f_shen051.jpg", "av/n/f_shen052.jpg", "av/n/f_shen053.jpg", "av/n/f_shen054.jpg", "av/n/f_shen055.jpg", "av/n/f_shen056.jpg", "av/n/f_shen057.jpg", "av/n/f_shen058.jpg", "av/n/f_shen059.jpg", "av/n/f_shen060.jpg", "av/n/f_shen061.jpg", "av/n/f_shen062.jpg", "av/n/f_shen063.jpg", "av/n/f_shen064.jpg", "av/n/f_shen065.jpg", "av/n/f_shen066.jpg", "av/n/f_shen067.jpg", "av/n/f_shen068.jpg", "av/n/f_shen069.jpg", "av/n/f_shen070.jpg", "av/n/f_shen071.jpg", "av/n/f_shen072.jpg", "av/n/f_shen073.jpg", "av/n/f_shen074.jpg", "av/n/f_shen075.jpg", "av/n/f_shen076.jpg", "av/n/f_shen077.jpg", "av/n/f_shen078.jpg", "av/n/f_shen079.jpg", "av/n/f_shen080.jpg", "av/n/f_shen081.jpg", "av/n/f_shen082.jpg", "av/n/f_shen083.jpg", "av/n/f_shen084.jpg", "av/n/f_shen085.jpg", "av/n/f_shen086.jpg", "av/n/f_shen087.jpg", "av/n/f_shen088.jpg", "av/n/f_shen089.jpg", "av/n/f_shen090.jpg", "av/n/f_shen091.jpg", "av/n/f_shen092.jpg", "av/n/f_shen093.jpg", "av/n/f_shen094.jpg", "av/n/f_shen095.jpg", "av/n/f_shen096.jpg", "av/n/f_shen097.jpg", "av/n/f_shen098.jpg", "av/n/f_shen099.jpg", "av/n/f_shen100.jpg", "av/n/f_shen101.jpg", "av/n/f_shen102.jpg", "av/n/f_shen103.jpg", "av/n/f_shen104.jpg", "av/n/f_shen105.jpg", "av/n/f_shen106.jpg", "av/n/f_shen107.jpg", "av/n/f_shen108.jpg", "av/n/f_shen109.jpg", "av/n/f_shen110.jpg", "av/n/f_shen111.jpg", "av/n/f_shen112.jpg", "av/n/f_shen113.jpg", "av/n/f_shen114.jpg", "av/n/f_shen115.jpg", "av/n/f_shen116.jpg", "av/n/f_shen117.jpg", "av/n/f_shen118.jpg", "av/n/f_shen119.jpg", "av/n/f_shen120.jpg", "av/n/f_shen121.jpg", "av/n/f_shen122.jpg", "av/n/f_shen123.jpg", "av/n/f_shen124.jpg", "av/n/f_shen125.jpg", "av/n/f_shen126.jpg", "av/n/f_shen127.jpg", "av/n/f_shen128.jpg", "av/n/f_shen129.jpg", "av/n/f_shen130.jpg", "av/n/f_shen131.jpg", "av/n/f_shen132.jpg", "av/n/f_shen133.jpg", "av/n/f_shen134.jpg", "av/n/f_shen135.jpg", "av/n/f_shen136.jpg", "av/n/f_shen137.jpg", "av/n/f_shen138.jpg", "av/n/f_shen139.jpg", "av/n/f_shen140.jpg", "av/n/f_shen141.jpg", "av/n/f_shen142.jpg", "av/n/f_shen143.jpg", "av/n/f_shen144.jpg", "av/n/f_shen145.jpg", "av/n/f_ming001.jpg", "av/n/f_ming002.jpg", "av/n/f_ming003.jpg", "av/n/f_ming004.jpg", "av/n/f_ming005.jpg", "av/n/f_ming006.jpg", "av/n/f_ming007.jpg", "av/n/f_ming008.jpg", "av/n/f_ming009.jpg", "av/n/f_ming010.jpg", "av/n/f_ming011.jpg", "av/n/f_ming012.jpg", "av/n/f_ming013.jpg", "av/n/f_ming014.jpg", "av/n/f_ming015.jpg", "av/n/f_ming016.jpg", "av/n/f_ming017.jpg", "av/n/f_ming018.jpg", "av/n/f_ming019.jpg", "av/n/f_ming020.jpg", "av/n/f_ming021.jpg", "av/n/f_ming022.jpg", "av/n/f_ming023.jpg", "av/n/f_ming024.jpg", "av/n/f_ming025.jpg", "av/n/f_ming026.jpg", "av/n/f_ming027.jpg", "av/n/f_ming028.jpg", "av/n/f_ming029.jpg", "av/n/f_ming030.jpg", "av/n/f_ming031.jpg", "av/n/f_ming032.jpg", "av/n/f_ming033.jpg", "av/n/f_ming034.jpg", "av/n/f_ming035.jpg", "av/n/f_ming036.jpg", "av/n/f_ming037.jpg", "av/n/f_ming038.jpg", "av/n/f_ming039.jpg", "av/n/f_ming040.jpg", "av/n/f_ming041.jpg", "av/n/f_ming042.jpg", "av/n/f_ming043.jpg", "av/n/f_ming044.jpg", "av/n/f_ming045.jpg", "av/n/f_ming046.jpg", "av/n/f_ming047.jpg", "av/n/f_ming048.jpg", "av/n/f_ming049.jpg", "av/n/f_ming050.jpg", "av/n/f_ming051.jpg", "av/n/f_ming052.jpg", "av/n/f_ming053.jpg", "av/n/f_ming054.jpg", "av/n/f_ming055.jpg", "av/n/f_ming056.jpg", "av/n/f_ming057.jpg", "av/n/f_ming058.jpg", "av/n/f_ming059.jpg", "av/n/f_ming060.jpg", "av/n/f_ming061.jpg", "av/n/f_ming062.jpg", "av/n/f_ming063.jpg", "av/n/f_ming064.jpg", "av/n/f_ming065.jpg", "av/n/f_ming066.jpg", "av/n/f_ming067.jpg", "av/n/f_ming068.jpg", "av/n/f_ming069.jpg", "av/n/f_ming070.jpg", "av/n/f_ming071.jpg", "av/n/f_ming072.jpg", "av/n/f_ming073.jpg", "av/n/f_ming074.jpg", "av/n/f_ming075.jpg", "av/n/f_ming076.jpg", "av/n/f_ming077.jpg", "av/n/f_ming078.jpg", "av/n/f_ming079.jpg", "av/n/f_ming080.jpg", "av/n/f_ming081.jpg", "av/n/f_ming082.jpg", "av/n/f_ming083.jpg", "av/n/f_ming084.jpg", "av/n/f_ming085.jpg", "av/n/f_ming086.jpg", "av/n/f_ming087.jpg", "av/n/f_ming088.jpg", "av/n/f_ming089.jpg", "av/n/f_ming090.jpg", "av/n/f_ming091.jpg", "av/n/f_ming092.jpg", "av/n/f_ming093.jpg", "av/n/f_ming094.jpg", "av/n/f_ming095.jpg", "av/n/f_ming096.jpg", "av/n/f_ming097.jpg", "av/n/f_ming098.jpg", "av/n/f_ming099.jpg", "av/n/f_ming100.jpg", "av/n/f_ming101.jpg", "av/n/f_ming102.jpg", "av/n/f_ming103.jpg", "av/n/f_ming104.jpg", "av/n/f_ming105.jpg", "av/n/f_ming106.jpg", "av/n/f_ming107.jpg", "av/n/f_ming108.jpg", "av/n/f_ming109.jpg", "av/n/f_ming110.jpg", "av/n/f_ming111.jpg", "av/n/f_ming112.jpg", "av/n/f_ming113.jpg", "av/n/f_ming114.jpg", "av/n/f_ming115.jpg", "av/n/f_ming116.jpg", "av/n/f_ming117.jpg", "av/n/f_ming118.jpg", "av/n/f_ming119.jpg", "av/n/f_ming120.jpg", "av/n/f_ming121.jpg", "av/n/f_ming122.jpg", "av/n/f_ming123.jpg", "av/n/f_ming124.jpg", "av/n/f_ming125.jpg", "av/n/f_ming126.jpg", "av/n/f_ming127.jpg", "av/n/f_ming128.jpg", "av/n/f_ming129.jpg", "av/n/f_ming130.jpg", "av/n/f_ming131.jpg", "av/n/f_ming132.jpg", "av/n/f_ming133.jpg", "av/n/f_ming134.jpg", "av/n/f_ming135.jpg", "av/n/f_ming136.jpg", "av/n/f_ming137.jpg", "av/n/f_ming138.jpg", "av/n/f_ming139.jpg", "av/n/f_ming140.jpg", "av/n/f_ming141.jpg", "av/n/f_ming142.jpg", "av/n/f_ming143.jpg", "av/n/f_ming144.jpg", "av/n/f_ming145.jpg", "av/n/f_ming146.jpg", "av/n/f_ming147.jpg", "av/n/f_xie001.jpg", "av/n/f_xie002.jpg", "av/n/f_xie003.jpg", "av/n/f_xie004.jpg", "av/n/f_xie005.jpg", "av/n/f_xie006.jpg", "av/n/f_xie007.jpg", "av/n/f_xie008.jpg", "av/n/f_xie009.jpg", "av/n/f_xie010.jpg", "av/n/f_xie011.jpg", "av/n/f_xie012.jpg", "av/n/f_xie013.jpg", "av/n/f_xie014.jpg", "av/n/f_xie015.jpg", "av/n/f_xie016.jpg", "av/n/f_xie017.jpg", "av/n/f_xie018.jpg", "av/n/f_xie019.jpg", "av/n/f_xie020.jpg", "av/n/f_xie021.jpg", "av/n/f_xie022.jpg", "av/n/f_xie023.jpg", "av/n/f_xie024.jpg", "av/n/f_xie025.jpg", "av/n/f_xie026.jpg", "av/n/f_xie027.jpg", "av/n/f_xie028.jpg", "av/n/f_xie029.jpg", "av/n/f_xie030.jpg", "av/n/f_xie031.jpg", "av/n/f_xie032.jpg", "av/n/f_xie033.jpg", "av/n/f_xie034.jpg", "av/n/f_xie035.jpg", "av/n/f_xie036.jpg", "av/n/f_xie037.jpg", "av/n/f_xie038.jpg", "av/n/f_xie039.jpg", "av/n/f_xie040.jpg", "av/n/f_xie041.jpg", "av/n/f_xie042.jpg", "av/n/f_xie043.jpg", "av/n/f_xie044.jpg", "av/n/f_xie045.jpg", "av/n/f_xie046.jpg", "av/n/f_xie047.jpg", "av/n/f_xie048.jpg", "av/n/f_xie049.jpg", "av/n/f_xie050.jpg", "av/n/f_xie051.jpg", "av/n/f_xie052.jpg", "av/n/f_xie053.jpg", "av/n/f_xie054.jpg", "av/n/f_xie055.jpg", "av/n/f_xie056.jpg", "av/n/f_xie057.jpg", "av/n/f_xie058.jpg", "av/n/f_xie059.jpg", "av/n/f_xie060.jpg", "av/n/f_xie061.jpg", "av/n/f_xie062.jpg", "av/n/f_xie063.jpg", "av/n/f_xie064.jpg", "av/n/f_xie065.jpg", "av/n/f_xie066.jpg", "av/n/f_xie067.jpg", "av/n/f_xie068.jpg", "av/n/f_xie069.jpg", "av/n/f_xie070.jpg", "av/n/f_xie071.jpg", "av/n/f_xie072.jpg", "av/n/f_xie073.jpg", "av/n/f_xie074.jpg", "av/n/f_xie075.jpg", "av/n/f_xie076.jpg", "av/n/f_xie077.jpg", "av/n/f_xie078.jpg", "av/n/f_xie079.jpg", "av/n/f_xie080.jpg", "av/n/f_xie081.jpg", "av/n/f_xie082.jpg", "av/n/f_xie083.jpg", "av/n/f_xie084.jpg", "av/n/f_xie085.jpg", "av/n/f_xie086.jpg", "av/n/f_xie087.jpg", "av/n/f_xie088.jpg", "av/n/f_xie089.jpg", "av/n/f_xie090.jpg", "av/n/f_xie091.jpg", "av/n/f_xie092.jpg", "av/n/f_xie093.jpg", "av/n/f_xie094.jpg", "av/n/f_xie095.jpg", "av/n/f_xie096.jpg", "av/n/f_xie097.jpg", "av/n/f_xie098.jpg", "av/n/f_xie099.jpg", "av/n/f_xie100.jpg", "av/n/f_xie101.jpg", "av/n/f_xie102.jpg", "av/n/f_xie103.jpg", "av/n/f_xie104.jpg", "av/n/f_xie105.jpg", "av/n/f_xie106.jpg", "av/n/f_xie107.jpg", "av/n/f_xie108.jpg", "av/n/f_xie109.jpg", "av/n/f_xie110.jpg", "av/n/f_xie111.jpg", "av/n/f_xie112.jpg", "av/n/f_xie113.jpg", "av/n/f_xie114.jpg", "av/n/f_xie115.jpg", "av/n/f_xie116.jpg", "av/n/f_xie117.jpg", "av/n/f_xie118.jpg", "av/n/f_xie119.jpg", "av/n/f_xie120.jpg", "av/n/f_xie121.jpg", "av/n/f_xie122.jpg", "av/n/f_xie123.jpg", "av/n/f_xie124.jpg", "av/n/f_xie125.jpg", "av/n/f_xie126.jpg", "av/n/f_xie127.jpg", "av/n/f_xie128.jpg", "av/n/f_xie129.jpg", "av/n/f_xie130.jpg", "av/n/f_xie131.jpg", "av/n/f_xie132.jpg", "av/n/f_xie133.jpg", "av/n/f_xie134.jpg", "av/n/f_xie135.jpg", "av/n/f_xie136.jpg", "av/n/f_xie137.jpg", "av/n/f_xie138.jpg", "av/n/f_xie139.jpg", "av/n/f_xie140.jpg", "av/n/f_xie141.jpg", "av/n/f_xie142.jpg", "av/n/f_xie143.jpg", "av/n/f_xie144.jpg", "av/n/f_xie145.jpg", "av/n/f_xie146.jpg", "av/n/f_xie147.jpg", "av/n/f_xie148.jpg", "av/n/f_xie149.jpg"]
};
window.AVATARS = AVATARS; // v1164 名单页(tail.js)跨文件读头像库

// ===== 头像套装（v1015 三套 1800 → v1090 清洗为两套 612：r 清洗库 / g 群像；s 套下线），S.avatarSet 切换 =====
const AVATAR_SETS = { r: AVATARS, g: { m: ["av/g/m_anime_001.jpg", "av/g/m_anime_002.jpg", "av/g/m_anime_003.jpg", "av/g/m_anime_004.jpg", "av/g/m_anime_005.jpg", "av/g/m_anime_006.jpg", "av/g/m_anime_007.jpg", "av/g/m_anime_008.jpg", "av/g/m_anime_009.jpg", "av/g/m_anime_010.jpg", "av/g/m_anime_011.jpg", "av/g/m_anime_012.jpg", "av/g/m_anime_013.jpg", "av/g/m_anime_014.jpg", "av/g/m_anime_015.jpg", "av/g/m_anime_016.jpg", "av/g/m_anime_017.jpg", "av/g/m_anime_018.jpg", "av/g/m_anime_019.jpg", "av/g/m_anime_020.jpg", "av/g/m_anime_021.jpg", "av/g/m_anime_022.jpg", "av/g/m_anime_023.jpg", "av/g/m_anime_024.jpg", "av/g/m_anime_025.jpg", "av/g/m_anime_026.jpg", "av/g/m_anime_027.jpg", "av/g/m_anime_028.jpg", "av/g/m_anime_029.jpg", "av/g/m_anime_030.jpg", "av/g/m_anime_031.jpg", "av/g/m_anime_032.jpg", "av/g/m_anime_033.jpg", "av/g/m_anime_034.jpg", "av/g/m_anime_035.jpg", "av/g/m_anime_036.jpg", "av/g/m_anime_037.jpg", "av/g/m_anime_038.jpg", "av/g/m_anime_039.jpg", "av/g/m_anime_040.jpg", "av/g/m_anime_041.jpg", "av/g/m_anime_042.jpg", "av/g/m_anime_043.jpg", "av/g/m_anime_044.jpg", "av/g/m_anime_045.jpg", "av/g/m_anime_046.jpg", "av/g/m_anime_047.jpg", "av/g/m_anime_048.jpg", "av/g/m_anime_049.jpg", "av/g/m_anime_050.jpg", "av/g/m_anime_051.jpg", "av/g/m_anime_052.jpg", "av/g/m_anime_053.jpg", "av/g/m_anime_054.jpg", "av/g/m_anime_055.jpg", "av/g/m_anime_056.jpg", "av/g/m_anime_057.jpg", "av/g/m_anime_058.jpg", "av/g/m_anime_059.jpg", "av/g/m_anime_060.jpg", "av/g/m_anime_061.jpg", "av/g/m_anime_062.jpg", "av/g/m_anime_063.jpg", "av/g/m_anime_064.jpg", "av/g/m_anime_065.jpg", "av/g/m_anime_066.jpg", "av/g/m_anime_067.jpg", "av/g/m_anime_068.jpg", "av/g/m_anime_069.jpg", "av/g/m_anime_070.jpg", "av/g/m_anime_071.jpg", "av/g/m_anime_072.jpg", "av/g/m_anime_073.jpg", "av/g/m_anime_074.jpg", "av/g/m_anime_075.jpg", "av/g/m_anime_076.jpg", "av/g/m_anime_077.jpg", "av/g/m_anime_078.jpg", "av/g/m_anime_079.jpg", "av/g/m_anime_080.jpg", "av/g/m_anime_081.jpg", "av/g/m_anime_082.jpg", "av/g/m_anime_083.jpg", "av/g/m_anime_084.jpg", "av/g/m_anime_085.jpg", "av/g/m_anime_086.jpg", "av/g/m_anime_087.jpg", "av/g/m_anime_088.jpg", "av/g/m_anime_089.jpg", "av/g/m_anime_090.jpg", "av/g/m_anime_091.jpg", "av/g/m_anime_092.jpg", "av/g/m_anime_093.jpg", "av/g/m_anime_094.jpg", "av/g/m_anime_095.jpg", "av/g/m_anime_096.jpg", "av/g/m_anime_097.jpg", "av/g/m_anime_098.jpg", "av/g/m_anime_099.jpg", "av/g/m_anime_100.jpg", "av/g/m_game_001.jpg", "av/g/m_game_002.jpg", "av/g/m_game_003.jpg", "av/g/m_game_004.jpg", "av/g/m_game_005.jpg", "av/g/m_game_006.jpg", "av/g/m_game_007.jpg", "av/g/m_game_008.jpg", "av/g/m_game_009.jpg", "av/g/m_game_010.jpg", "av/g/m_game_011.jpg", "av/g/m_game_012.jpg", "av/g/m_game_013.jpg", "av/g/m_game_014.jpg", "av/g/m_game_015.jpg", "av/g/m_game_016.jpg", "av/g/m_game_017.jpg", "av/g/m_game_018.jpg", "av/g/m_game_019.jpg", "av/g/m_game_020.jpg", "av/g/m_game_021.jpg", "av/g/m_game_022.jpg", "av/g/m_game_023.jpg", "av/g/m_game_024.jpg", "av/g/m_game_025.jpg", "av/g/m_game_026.jpg", "av/g/m_game_027.jpg", "av/g/m_game_028.jpg", "av/g/m_game_029.jpg", "av/g/m_game_030.jpg", "av/g/m_game_031.jpg", "av/g/m_game_032.jpg", "av/g/m_game_033.jpg", "av/g/m_game_034.jpg", "av/g/m_game_035.jpg", "av/g/m_game_036.jpg", "av/g/m_game_037.jpg", "av/g/m_game_038.jpg", "av/g/m_game_039.jpg", "av/g/m_game_040.jpg", "av/g/m_game_041.jpg", "av/g/m_game_042.jpg", "av/g/m_game_043.jpg", "av/g/m_game_044.jpg", "av/g/m_game_045.jpg", "av/g/m_game_046.jpg", "av/g/m_game_047.jpg", "av/g/m_game_048.jpg", "av/g/m_game_049.jpg", "av/g/m_game_050.jpg", "av/g/m_game_051.jpg", "av/g/m_game_052.jpg", "av/g/m_game_053.jpg", "av/g/m_game_054.jpg", "av/g/m_game_055.jpg", "av/g/m_game_056.jpg", "av/g/m_game_057.jpg", "av/g/m_game_058.jpg", "av/g/m_game_059.jpg", "av/g/m_game_060.jpg", "av/g/m_game_061.jpg", "av/g/m_game_062.jpg", "av/g/m_game_063.jpg", "av/g/m_game_064.jpg", "av/g/m_game_065.jpg", "av/g/m_game_066.jpg", "av/g/m_game_067.jpg", "av/g/m_game_068.jpg", "av/g/m_game_069.jpg", "av/g/m_game_070.jpg", "av/g/m_game_071.jpg", "av/g/m_game_072.jpg", "av/g/m_game_073.jpg", "av/g/m_game_074.jpg", "av/g/m_game_075.jpg", "av/g/m_game_076.jpg", "av/g/m_game_077.jpg", "av/g/m_game_078.jpg", "av/g/m_game_079.jpg", "av/g/m_game_080.jpg", "av/g/m_game_081.jpg", "av/g/m_game_082.jpg", "av/g/m_game_083.jpg", "av/g/m_game_084.jpg", "av/g/m_game_085.jpg", "av/g/m_game_086.jpg", "av/g/m_game_087.jpg", "av/g/m_game_088.jpg", "av/g/m_game_089.jpg", "av/g/m_game_090.jpg", "av/g/m_game_091.jpg", "av/g/m_game_092.jpg", "av/g/m_game_093.jpg", "av/g/m_game_094.jpg", "av/g/m_game_095.jpg", "av/g/m_game_096.jpg", "av/g/m_game_097.jpg", "av/g/m_game_098.jpg", "av/g/m_game_099.jpg", "av/g/m_game_100.jpg", "av/g/m_xianxia_001.jpg", "av/g/m_xianxia_002.jpg", "av/g/m_xianxia_003.jpg", "av/g/m_xianxia_004.jpg", "av/g/m_xianxia_005.jpg", "av/g/m_xianxia_006.jpg", "av/g/m_xianxia_007.jpg", "av/g/m_xianxia_008.jpg", "av/g/m_xianxia_009.jpg", "av/g/m_xianxia_010.jpg", "av/g/m_xianxia_011.jpg", "av/g/m_xianxia_012.jpg", "av/g/m_xianxia_013.jpg", "av/g/m_xianxia_014.jpg", "av/g/m_xianxia_015.jpg", "av/g/m_xianxia_016.jpg", "av/g/m_xianxia_017.jpg", "av/g/m_xianxia_018.jpg", "av/g/m_xianxia_019.jpg", "av/g/m_xianxia_020.jpg", "av/g/m_xianxia_021.jpg", "av/g/m_xianxia_022.jpg", "av/g/m_xianxia_023.jpg", "av/g/m_xianxia_024.jpg", "av/g/m_xianxia_025.jpg", "av/g/m_xianxia_026.jpg", "av/g/m_xianxia_027.jpg", "av/g/m_xianxia_028.jpg", "av/g/m_xianxia_029.jpg", "av/g/m_xianxia_030.jpg", "av/g/m_xianxia_031.jpg", "av/g/m_xianxia_032.jpg", "av/g/m_xianxia_033.jpg", "av/g/m_xianxia_034.jpg", "av/g/m_xianxia_035.jpg", "av/g/m_xianxia_036.jpg", "av/g/m_xianxia_037.jpg", "av/g/m_xianxia_038.jpg", "av/g/m_xianxia_039.jpg", "av/g/m_xianxia_040.jpg", "av/g/m_xianxia_041.jpg", "av/g/m_xianxia_042.jpg", "av/g/m_xianxia_043.jpg", "av/g/m_xianxia_044.jpg", "av/g/m_xianxia_045.jpg", "av/g/m_xianxia_046.jpg", "av/g/m_xianxia_047.jpg", "av/g/m_xianxia_048.jpg", "av/g/m_xianxia_049.jpg", "av/g/m_xianxia_050.jpg", "av/g/m_xianxia_051.jpg", "av/g/m_xianxia_052.jpg", "av/g/m_xianxia_053.jpg", "av/g/m_xianxia_054.jpg", "av/g/m_xianxia_055.jpg", "av/g/m_xianxia_056.jpg", "av/g/m_xianxia_057.jpg", "av/g/m_xianxia_058.jpg", "av/g/m_xianxia_059.jpg", "av/g/m_xianxia_060.jpg", "av/g/m_xianxia_061.jpg", "av/g/m_xianxia_062.jpg", "av/g/m_xianxia_063.jpg", "av/g/m_xianxia_064.jpg", "av/g/m_xianxia_065.jpg", "av/g/m_xianxia_066.jpg", "av/g/m_xianxia_067.jpg", "av/g/m_xianxia_068.jpg", "av/g/m_xianxia_069.jpg", "av/g/m_xianxia_070.jpg", "av/g/m_xianxia_071.jpg", "av/g/m_xianxia_072.jpg", "av/g/m_xianxia_073.jpg", "av/g/m_xianxia_074.jpg", "av/g/m_xianxia_075.jpg", "av/g/m_xianxia_076.jpg", "av/g/m_xianxia_077.jpg", "av/g/m_xianxia_078.jpg", "av/g/m_xianxia_079.jpg", "av/g/m_xianxia_080.jpg", "av/g/m_xianxia_081.jpg", "av/g/m_xianxia_082.jpg", "av/g/m_xianxia_083.jpg", "av/g/m_xianxia_084.jpg", "av/g/m_xianxia_085.jpg", "av/g/m_xianxia_086.jpg", "av/g/m_xianxia_087.jpg", "av/g/m_xianxia_088.jpg", "av/g/m_xianxia_089.jpg", "av/g/m_xianxia_090.jpg", "av/g/m_xianxia_091.jpg", "av/g/m_xianxia_092.jpg", "av/g/m_xianxia_093.jpg", "av/g/m_xianxia_094.jpg", "av/g/m_xianxia_095.jpg", "av/g/m_xianxia_096.jpg", "av/g/m_xianxia_097.jpg", "av/g/m_xianxia_098.jpg", "av/g/m_xianxia_099.jpg", "av/g/m_xianxia_100.jpg"], f: ["av/g/f_anime_001.jpg", "av/g/f_anime_002.jpg", "av/g/f_anime_003.jpg", "av/g/f_anime_004.jpg", "av/g/f_anime_005.jpg", "av/g/f_anime_006.jpg", "av/g/f_anime_007.jpg", "av/g/f_anime_008.jpg", "av/g/f_anime_009.jpg", "av/g/f_anime_010.jpg", "av/g/f_anime_011.jpg", "av/g/f_anime_012.jpg", "av/g/f_anime_013.jpg", "av/g/f_anime_014.jpg", "av/g/f_anime_015.jpg", "av/g/f_anime_016.jpg", "av/g/f_anime_017.jpg", "av/g/f_anime_018.jpg", "av/g/f_anime_019.jpg", "av/g/f_anime_020.jpg", "av/g/f_anime_021.jpg", "av/g/f_anime_022.jpg", "av/g/f_anime_023.jpg", "av/g/f_anime_024.jpg", "av/g/f_anime_025.jpg", "av/g/f_anime_026.jpg", "av/g/f_anime_027.jpg", "av/g/f_anime_028.jpg", "av/g/f_anime_029.jpg", "av/g/f_anime_030.jpg", "av/g/f_anime_031.jpg", "av/g/f_anime_032.jpg", "av/g/f_anime_033.jpg", "av/g/f_anime_034.jpg", "av/g/f_anime_035.jpg", "av/g/f_anime_036.jpg", "av/g/f_anime_037.jpg", "av/g/f_anime_038.jpg", "av/g/f_anime_039.jpg", "av/g/f_anime_040.jpg", "av/g/f_anime_041.jpg", "av/g/f_anime_042.jpg", "av/g/f_anime_043.jpg", "av/g/f_anime_044.jpg", "av/g/f_anime_045.jpg", "av/g/f_anime_046.jpg", "av/g/f_anime_047.jpg", "av/g/f_anime_048.jpg", "av/g/f_anime_049.jpg", "av/g/f_anime_050.jpg", "av/g/f_anime_051.jpg", "av/g/f_anime_052.jpg", "av/g/f_anime_053.jpg", "av/g/f_anime_054.jpg", "av/g/f_anime_055.jpg", "av/g/f_anime_056.jpg", "av/g/f_anime_057.jpg", "av/g/f_anime_058.jpg", "av/g/f_anime_059.jpg", "av/g/f_anime_060.jpg", "av/g/f_anime_061.jpg", "av/g/f_anime_062.jpg", "av/g/f_anime_063.jpg", "av/g/f_anime_064.jpg", "av/g/f_anime_065.jpg", "av/g/f_anime_066.jpg", "av/g/f_anime_067.jpg", "av/g/f_anime_068.jpg", "av/g/f_anime_069.jpg", "av/g/f_anime_070.jpg", "av/g/f_anime_071.jpg", "av/g/f_anime_072.jpg", "av/g/f_anime_073.jpg", "av/g/f_anime_074.jpg", "av/g/f_anime_075.jpg", "av/g/f_anime_076.jpg", "av/g/f_anime_077.jpg", "av/g/f_anime_078.jpg", "av/g/f_anime_079.jpg", "av/g/f_anime_080.jpg", "av/g/f_anime_081.jpg", "av/g/f_anime_082.jpg", "av/g/f_anime_083.jpg", "av/g/f_anime_084.jpg", "av/g/f_anime_085.jpg", "av/g/f_anime_086.jpg", "av/g/f_anime_087.jpg", "av/g/f_anime_088.jpg", "av/g/f_anime_089.jpg", "av/g/f_anime_090.jpg", "av/g/f_anime_091.jpg", "av/g/f_anime_092.jpg", "av/g/f_anime_093.jpg", "av/g/f_anime_094.jpg", "av/g/f_anime_095.jpg", "av/g/f_anime_096.jpg", "av/g/f_anime_097.jpg", "av/g/f_anime_098.jpg", "av/g/f_anime_099.jpg", "av/g/f_anime_100.jpg", "av/g/f_game_001.jpg", "av/g/f_game_002.jpg", "av/g/f_game_003.jpg", "av/g/f_game_004.jpg", "av/g/f_game_005.jpg", "av/g/f_game_006.jpg", "av/g/f_game_007.jpg", "av/g/f_game_008.jpg", "av/g/f_game_009.jpg", "av/g/f_game_010.jpg", "av/g/f_game_011.jpg", "av/g/f_game_012.jpg", "av/g/f_game_013.jpg", "av/g/f_game_014.jpg", "av/g/f_game_015.jpg", "av/g/f_game_016.jpg", "av/g/f_game_017.jpg", "av/g/f_game_018.jpg", "av/g/f_game_019.jpg", "av/g/f_game_020.jpg", "av/g/f_game_021.jpg", "av/g/f_game_022.jpg", "av/g/f_game_023.jpg", "av/g/f_game_024.jpg", "av/g/f_game_025.jpg", "av/g/f_game_026.jpg", "av/g/f_game_027.jpg", "av/g/f_game_028.jpg", "av/g/f_game_029.jpg", "av/g/f_game_030.jpg", "av/g/f_game_031.jpg", "av/g/f_game_032.jpg", "av/g/f_game_033.jpg", "av/g/f_game_034.jpg", "av/g/f_game_035.jpg", "av/g/f_game_036.jpg", "av/g/f_game_037.jpg", "av/g/f_game_038.jpg", "av/g/f_game_039.jpg", "av/g/f_game_040.jpg", "av/g/f_game_041.jpg", "av/g/f_game_042.jpg", "av/g/f_game_043.jpg", "av/g/f_game_044.jpg", "av/g/f_game_045.jpg", "av/g/f_game_046.jpg", "av/g/f_game_047.jpg", "av/g/f_game_048.jpg", "av/g/f_game_049.jpg", "av/g/f_game_050.jpg", "av/g/f_game_051.jpg", "av/g/f_game_052.jpg", "av/g/f_game_053.jpg", "av/g/f_game_054.jpg", "av/g/f_game_055.jpg", "av/g/f_game_056.jpg", "av/g/f_game_057.jpg", "av/g/f_game_058.jpg", "av/g/f_game_059.jpg", "av/g/f_game_060.jpg", "av/g/f_game_061.jpg", "av/g/f_game_062.jpg", "av/g/f_game_063.jpg", "av/g/f_game_064.jpg", "av/g/f_game_065.jpg", "av/g/f_game_066.jpg", "av/g/f_game_067.jpg", "av/g/f_game_068.jpg", "av/g/f_game_069.jpg", "av/g/f_game_070.jpg", "av/g/f_game_071.jpg", "av/g/f_game_072.jpg", "av/g/f_game_073.jpg", "av/g/f_game_074.jpg", "av/g/f_game_075.jpg", "av/g/f_game_076.jpg", "av/g/f_game_077.jpg", "av/g/f_game_078.jpg", "av/g/f_game_079.jpg", "av/g/f_game_080.jpg", "av/g/f_game_081.jpg", "av/g/f_game_082.jpg", "av/g/f_game_083.jpg", "av/g/f_game_084.jpg", "av/g/f_game_085.jpg", "av/g/f_game_086.jpg", "av/g/f_game_087.jpg", "av/g/f_game_088.jpg", "av/g/f_game_089.jpg", "av/g/f_game_090.jpg", "av/g/f_game_091.jpg", "av/g/f_game_092.jpg", "av/g/f_game_093.jpg", "av/g/f_game_094.jpg", "av/g/f_game_095.jpg", "av/g/f_game_096.jpg", "av/g/f_game_097.jpg", "av/g/f_game_098.jpg", "av/g/f_game_099.jpg", "av/g/f_game_100.jpg", "av/g/f_xianxia_001.jpg", "av/g/f_xianxia_002.jpg", "av/g/f_xianxia_003.jpg", "av/g/f_xianxia_004.jpg", "av/g/f_xianxia_005.jpg", "av/g/f_xianxia_006.jpg", "av/g/f_xianxia_007.jpg", "av/g/f_xianxia_008.jpg", "av/g/f_xianxia_009.jpg", "av/g/f_xianxia_010.jpg", "av/g/f_xianxia_011.jpg", "av/g/f_xianxia_012.jpg", "av/g/f_xianxia_013.jpg", "av/g/f_xianxia_014.jpg", "av/g/f_xianxia_015.jpg", "av/g/f_xianxia_016.jpg", "av/g/f_xianxia_017.jpg", "av/g/f_xianxia_018.jpg", "av/g/f_xianxia_019.jpg", "av/g/f_xianxia_020.jpg", "av/g/f_xianxia_021.jpg", "av/g/f_xianxia_022.jpg", "av/g/f_xianxia_023.jpg", "av/g/f_xianxia_024.jpg", "av/g/f_xianxia_025.jpg", "av/g/f_xianxia_026.jpg", "av/g/f_xianxia_027.jpg", "av/g/f_xianxia_028.jpg", "av/g/f_xianxia_029.jpg", "av/g/f_xianxia_030.jpg", "av/g/f_xianxia_031.jpg", "av/g/f_xianxia_032.jpg", "av/g/f_xianxia_033.jpg", "av/g/f_xianxia_034.jpg", "av/g/f_xianxia_035.jpg", "av/g/f_xianxia_036.jpg", "av/g/f_xianxia_037.jpg", "av/g/f_xianxia_038.jpg", "av/g/f_xianxia_039.jpg", "av/g/f_xianxia_040.jpg", "av/g/f_xianxia_041.jpg", "av/g/f_xianxia_042.jpg", "av/g/f_xianxia_043.jpg", "av/g/f_xianxia_044.jpg", "av/g/f_xianxia_045.jpg", "av/g/f_xianxia_046.jpg", "av/g/f_xianxia_047.jpg", "av/g/f_xianxia_048.jpg", "av/g/f_xianxia_049.jpg", "av/g/f_xianxia_050.jpg", "av/g/f_xianxia_051.jpg", "av/g/f_xianxia_052.jpg", "av/g/f_xianxia_053.jpg", "av/g/f_xianxia_054.jpg", "av/g/f_xianxia_055.jpg", "av/g/f_xianxia_056.jpg", "av/g/f_xianxia_057.jpg", "av/g/f_xianxia_058.jpg", "av/g/f_xianxia_059.jpg", "av/g/f_xianxia_060.jpg", "av/g/f_xianxia_061.jpg", "av/g/f_xianxia_062.jpg", "av/g/f_xianxia_063.jpg", "av/g/f_xianxia_064.jpg", "av/g/f_xianxia_065.jpg", "av/g/f_xianxia_066.jpg", "av/g/f_xianxia_067.jpg", "av/g/f_xianxia_068.jpg", "av/g/f_xianxia_069.jpg", "av/g/f_xianxia_070.jpg", "av/g/f_xianxia_071.jpg", "av/g/f_xianxia_072.jpg", "av/g/f_xianxia_073.jpg", "av/g/f_xianxia_074.jpg", "av/g/f_xianxia_075.jpg", "av/g/f_xianxia_076.jpg", "av/g/f_xianxia_077.jpg", "av/g/f_xianxia_078.jpg", "av/g/f_xianxia_079.jpg", "av/g/f_xianxia_080.jpg", "av/g/f_xianxia_081.jpg", "av/g/f_xianxia_082.jpg", "av/g/f_xianxia_083.jpg", "av/g/f_xianxia_084.jpg", "av/g/f_xianxia_085.jpg", "av/g/f_xianxia_086.jpg", "av/g/f_xianxia_087.jpg", "av/g/f_xianxia_088.jpg", "av/g/f_xianxia_089.jpg", "av/g/f_xianxia_090.jpg", "av/g/f_xianxia_091.jpg", "av/g/f_xianxia_092.jpg", "av/g/f_xianxia_093.jpg", "av/g/f_xianxia_094.jpg", "av/g/f_xianxia_095.jpg", "av/g/f_xianxia_096.jpg", "av/g/f_xianxia_097.jpg", "av/g/f_xianxia_098.jpg", "av/g/f_xianxia_099.jpg", "av/g/f_xianxia_100.jpg"] }, a: { m: ["av/a/m_mo001.jpg", "av/a/m_mo002.jpg", "av/a/m_mo003.jpg", "av/a/m_mo004.jpg", "av/a/m_mo005.jpg", "av/a/m_mo006.jpg", "av/a/m_mo007.jpg", "av/a/m_mo008.jpg", "av/a/m_mo009.jpg", "av/a/m_mo010.jpg", "av/a/m_mo011.jpg", "av/a/m_mo012.jpg", "av/a/m_mo013.jpg", "av/a/m_mo014.jpg", "av/a/m_mo015.jpg", "av/a/m_mo016.jpg", "av/a/m_mo017.jpg", "av/a/m_mo018.jpg", "av/a/m_mo019.jpg", "av/a/m_mo020.jpg", "av/a/m_mo021.jpg", "av/a/m_mo022.jpg", "av/a/m_mo023.jpg", "av/a/m_mo024.jpg", "av/a/m_mo025.jpg", "av/a/m_mo026.jpg", "av/a/m_mo027.jpg", "av/a/m_mo028.jpg", "av/a/m_mo029.jpg", "av/a/m_mo030.jpg", "av/a/m_mo031.jpg", "av/a/m_mo032.jpg", "av/a/m_mo033.jpg", "av/a/m_mo034.jpg", "av/a/m_mo035.jpg", "av/a/m_mo036.jpg", "av/a/m_mo037.jpg", "av/a/m_mo038.jpg", "av/a/m_mo039.jpg", "av/a/m_mo040.jpg", "av/a/m_mo041.jpg", "av/a/m_mo042.jpg", "av/a/m_mo043.jpg", "av/a/m_mo044.jpg", "av/a/m_mo045.jpg", "av/a/m_mo046.jpg", "av/a/m_mo047.jpg", "av/a/m_mo048.jpg", "av/a/m_mo049.jpg", "av/a/m_mo050.jpg", "av/a/m_yao001.jpg", "av/a/m_yao002.jpg", "av/a/m_yao003.jpg", "av/a/m_yao004.jpg", "av/a/m_yao005.jpg", "av/a/m_yao006.jpg", "av/a/m_yao007.jpg", "av/a/m_yao008.jpg", "av/a/m_yao009.jpg", "av/a/m_yao010.jpg", "av/a/m_yao011.jpg", "av/a/m_yao012.jpg", "av/a/m_yao013.jpg", "av/a/m_yao014.jpg", "av/a/m_yao015.jpg", "av/a/m_yao016.jpg", "av/a/m_yao017.jpg", "av/a/m_yao018.jpg", "av/a/m_yao019.jpg", "av/a/m_yao020.jpg", "av/a/m_yao021.jpg", "av/a/m_yao022.jpg", "av/a/m_yao023.jpg", "av/a/m_yao024.jpg", "av/a/m_yao025.jpg", "av/a/m_yao026.jpg", "av/a/m_yao027.jpg", "av/a/m_yao028.jpg", "av/a/m_yao029.jpg", "av/a/m_yao030.jpg", "av/a/m_yao031.jpg", "av/a/m_yao032.jpg", "av/a/m_yao033.jpg", "av/a/m_yao034.jpg", "av/a/m_yao035.jpg", "av/a/m_yao036.jpg", "av/a/m_yao037.jpg", "av/a/m_yao038.jpg", "av/a/m_yao039.jpg", "av/a/m_yao040.jpg", "av/a/m_yao041.jpg", "av/a/m_yao042.jpg", "av/a/m_yao043.jpg", "av/a/m_yao044.jpg", "av/a/m_yao045.jpg", "av/a/m_yao046.jpg", "av/a/m_yao047.jpg", "av/a/m_yao048.jpg", "av/a/m_yao049.jpg", "av/a/m_yao050.jpg", "av/a/m_ling001.jpg", "av/a/m_ling002.jpg", "av/a/m_ling003.jpg", "av/a/m_ling004.jpg", "av/a/m_ling005.jpg", "av/a/m_ling006.jpg", "av/a/m_ling007.jpg", "av/a/m_ling008.jpg", "av/a/m_ling009.jpg", "av/a/m_ling010.jpg", "av/a/m_ling011.jpg", "av/a/m_ling012.jpg", "av/a/m_ling013.jpg", "av/a/m_ling014.jpg", "av/a/m_ling015.jpg", "av/a/m_ling016.jpg", "av/a/m_ling017.jpg", "av/a/m_ling018.jpg", "av/a/m_ling019.jpg", "av/a/m_ling020.jpg", "av/a/m_ling021.jpg", "av/a/m_ling022.jpg", "av/a/m_ling023.jpg", "av/a/m_ling024.jpg", "av/a/m_ling025.jpg", "av/a/m_ling026.jpg", "av/a/m_ling027.jpg", "av/a/m_ling028.jpg", "av/a/m_ling029.jpg", "av/a/m_ling030.jpg", "av/a/m_ling031.jpg", "av/a/m_ling032.jpg", "av/a/m_ling033.jpg", "av/a/m_ling034.jpg", "av/a/m_ling035.jpg", "av/a/m_ling036.jpg", "av/a/m_ling037.jpg", "av/a/m_ling038.jpg", "av/a/m_ling039.jpg", "av/a/m_ling040.jpg", "av/a/m_ling041.jpg", "av/a/m_ling042.jpg", "av/a/m_ling043.jpg", "av/a/m_ling044.jpg", "av/a/m_ling045.jpg", "av/a/m_ling046.jpg", "av/a/m_ling047.jpg", "av/a/m_ling048.jpg", "av/a/m_ling049.jpg", "av/a/m_ling050.jpg", "av/a/m_yi001.jpg", "av/a/m_yi002.jpg", "av/a/m_yi003.jpg", "av/a/m_yi004.jpg", "av/a/m_yi005.jpg", "av/a/m_yi006.jpg", "av/a/m_yi007.jpg", "av/a/m_yi008.jpg", "av/a/m_yi009.jpg", "av/a/m_yi010.jpg", "av/a/m_yi011.jpg", "av/a/m_yi012.jpg", "av/a/m_yi013.jpg", "av/a/m_yi014.jpg", "av/a/m_yi015.jpg", "av/a/m_yi016.jpg", "av/a/m_yi017.jpg", "av/a/m_yi018.jpg", "av/a/m_yi019.jpg", "av/a/m_yi020.jpg", "av/a/m_yi021.jpg", "av/a/m_yi022.jpg", "av/a/m_yi023.jpg", "av/a/m_yi024.jpg", "av/a/m_yi025.jpg", "av/a/m_yi026.jpg", "av/a/m_yi027.jpg", "av/a/m_yi028.jpg", "av/a/m_yi029.jpg", "av/a/m_yi030.jpg", "av/a/m_yi031.jpg", "av/a/m_yi032.jpg", "av/a/m_yi033.jpg", "av/a/m_yi034.jpg", "av/a/m_yi035.jpg", "av/a/m_yi036.jpg", "av/a/m_yi037.jpg", "av/a/m_yi038.jpg", "av/a/m_yi039.jpg", "av/a/m_yi040.jpg", "av/a/m_yi041.jpg", "av/a/m_yi042.jpg", "av/a/m_yi043.jpg", "av/a/m_yi044.jpg", "av/a/m_yi045.jpg", "av/a/m_yi046.jpg", "av/a/m_yi047.jpg", "av/a/m_yi048.jpg", "av/a/m_yi049.jpg", "av/a/m_yi050.jpg", "av/a/m_shen001.jpg", "av/a/m_shen002.jpg", "av/a/m_shen003.jpg", "av/a/m_shen004.jpg", "av/a/m_shen005.jpg", "av/a/m_shen006.jpg", "av/a/m_shen007.jpg", "av/a/m_shen008.jpg", "av/a/m_shen009.jpg", "av/a/m_shen010.jpg", "av/a/m_shen011.jpg", "av/a/m_shen012.jpg", "av/a/m_shen013.jpg", "av/a/m_shen014.jpg", "av/a/m_shen015.jpg", "av/a/m_shen016.jpg", "av/a/m_shen017.jpg", "av/a/m_shen018.jpg", "av/a/m_shen019.jpg", "av/a/m_shen020.jpg", "av/a/m_shen021.jpg", "av/a/m_shen022.jpg", "av/a/m_shen023.jpg", "av/a/m_shen024.jpg", "av/a/m_shen025.jpg", "av/a/m_shen026.jpg", "av/a/m_shen027.jpg", "av/a/m_shen028.jpg", "av/a/m_shen029.jpg", "av/a/m_shen030.jpg", "av/a/m_shen031.jpg", "av/a/m_shen032.jpg", "av/a/m_shen033.jpg", "av/a/m_shen034.jpg", "av/a/m_shen035.jpg", "av/a/m_shen036.jpg", "av/a/m_shen037.jpg", "av/a/m_shen038.jpg", "av/a/m_shen039.jpg", "av/a/m_shen040.jpg", "av/a/m_shen041.jpg", "av/a/m_shen042.jpg", "av/a/m_shen043.jpg", "av/a/m_shen044.jpg", "av/a/m_shen045.jpg", "av/a/m_shen046.jpg", "av/a/m_shen047.jpg", "av/a/m_shen048.jpg", "av/a/m_shen049.jpg", "av/a/m_shen050.jpg", "av/a/m_ming001.jpg", "av/a/m_ming002.jpg", "av/a/m_ming003.jpg", "av/a/m_ming004.jpg", "av/a/m_ming005.jpg", "av/a/m_ming006.jpg", "av/a/m_ming007.jpg", "av/a/m_ming008.jpg", "av/a/m_ming009.jpg", "av/a/m_ming010.jpg", "av/a/m_ming011.jpg", "av/a/m_ming012.jpg", "av/a/m_ming013.jpg", "av/a/m_ming014.jpg", "av/a/m_ming015.jpg", "av/a/m_ming016.jpg", "av/a/m_ming017.jpg", "av/a/m_ming018.jpg", "av/a/m_ming019.jpg", "av/a/m_ming020.jpg", "av/a/m_ming021.jpg", "av/a/m_ming022.jpg", "av/a/m_ming023.jpg", "av/a/m_ming024.jpg", "av/a/m_ming025.jpg", "av/a/m_ming026.jpg", "av/a/m_ming027.jpg", "av/a/m_ming028.jpg", "av/a/m_ming029.jpg", "av/a/m_ming030.jpg", "av/a/m_ming031.jpg", "av/a/m_ming032.jpg", "av/a/m_ming033.jpg", "av/a/m_ming034.jpg", "av/a/m_ming035.jpg", "av/a/m_ming036.jpg", "av/a/m_ming037.jpg", "av/a/m_ming038.jpg", "av/a/m_ming039.jpg", "av/a/m_ming040.jpg", "av/a/m_ming041.jpg", "av/a/m_ming042.jpg", "av/a/m_ming043.jpg", "av/a/m_ming044.jpg", "av/a/m_ming045.jpg", "av/a/m_ming046.jpg", "av/a/m_ming047.jpg", "av/a/m_ming048.jpg", "av/a/m_ming049.jpg", "av/a/m_ming050.jpg", "av/a/m_xie001.jpg", "av/a/m_xie002.jpg", "av/a/m_xie003.jpg", "av/a/m_xie004.jpg", "av/a/m_xie005.jpg", "av/a/m_xie006.jpg", "av/a/m_xie007.jpg", "av/a/m_xie008.jpg", "av/a/m_xie009.jpg", "av/a/m_xie010.jpg", "av/a/m_xie011.jpg", "av/a/m_xie012.jpg", "av/a/m_xie013.jpg", "av/a/m_xie014.jpg", "av/a/m_xie015.jpg", "av/a/m_xie016.jpg", "av/a/m_xie017.jpg", "av/a/m_xie018.jpg", "av/a/m_xie019.jpg", "av/a/m_xie020.jpg", "av/a/m_xie021.jpg", "av/a/m_xie022.jpg", "av/a/m_xie023.jpg", "av/a/m_xie024.jpg", "av/a/m_xie025.jpg", "av/a/m_xie026.jpg", "av/a/m_xie027.jpg", "av/a/m_xie028.jpg", "av/a/m_xie029.jpg", "av/a/m_xie030.jpg", "av/a/m_xie031.jpg", "av/a/m_xie032.jpg", "av/a/m_xie033.jpg", "av/a/m_xie034.jpg", "av/a/m_xie035.jpg", "av/a/m_xie036.jpg", "av/a/m_xie037.jpg", "av/a/m_xie038.jpg", "av/a/m_xie039.jpg", "av/a/m_xie040.jpg", "av/a/m_xie041.jpg", "av/a/m_xie042.jpg", "av/a/m_xie043.jpg", "av/a/m_xie044.jpg", "av/a/m_xie045.jpg", "av/a/m_xie046.jpg", "av/a/m_xie047.jpg", "av/a/m_xie048.jpg", "av/a/m_xie049.jpg", "av/a/m_xie050.jpg", "av/a/m_chuan001.jpg", "av/a/m_chuan002.jpg", "av/a/m_chuan003.jpg", "av/a/m_chuan004.jpg", "av/a/m_chuan005.jpg", "av/a/m_chuan006.jpg", "av/a/m_chuan007.jpg", "av/a/m_chuan008.jpg", "av/a/m_chuan009.jpg", "av/a/m_chuan010.jpg", "av/a/m_chuan011.jpg", "av/a/m_chuan012.jpg", "av/a/m_chuan013.jpg", "av/a/m_chuan014.jpg", "av/a/m_chuan015.jpg", "av/a/m_chuan016.jpg", "av/a/m_chuan017.jpg", "av/a/m_chuan018.jpg", "av/a/m_chuan019.jpg", "av/a/m_chuan020.jpg", "av/a/m_chuan021.jpg", "av/a/m_chuan022.jpg", "av/a/m_chuan023.jpg", "av/a/m_chuan024.jpg", "av/a/m_chuan025.jpg", "av/a/m_chuan026.jpg", "av/a/m_chuan027.jpg", "av/a/m_chuan028.jpg", "av/a/m_chuan029.jpg", "av/a/m_chuan030.jpg", "av/a/m_chuan031.jpg", "av/a/m_chuan032.jpg", "av/a/m_chuan033.jpg", "av/a/m_chuan034.jpg", "av/a/m_chuan035.jpg", "av/a/m_chuan036.jpg", "av/a/m_chuan037.jpg", "av/a/m_chuan038.jpg", "av/a/m_chuan039.jpg", "av/a/m_chuan040.jpg", "av/a/m_chuan041.jpg", "av/a/m_chuan042.jpg", "av/a/m_chuan043.jpg", "av/a/m_chuan044.jpg", "av/a/m_chuan045.jpg", "av/a/m_chuan046.jpg", "av/a/m_chuan047.jpg", "av/a/m_chuan048.jpg", "av/a/m_chuan049.jpg", "av/a/m_chuan050.jpg"], f: ["av/a/f_mo001.jpg", "av/a/f_mo002.jpg", "av/a/f_mo003.jpg", "av/a/f_mo004.jpg", "av/a/f_mo005.jpg", "av/a/f_mo006.jpg", "av/a/f_mo007.jpg", "av/a/f_mo008.jpg", "av/a/f_mo009.jpg", "av/a/f_mo010.jpg", "av/a/f_mo011.jpg", "av/a/f_mo012.jpg", "av/a/f_mo013.jpg", "av/a/f_mo014.jpg", "av/a/f_mo015.jpg", "av/a/f_mo016.jpg", "av/a/f_mo017.jpg", "av/a/f_mo018.jpg", "av/a/f_mo019.jpg", "av/a/f_mo020.jpg", "av/a/f_mo021.jpg", "av/a/f_mo022.jpg", "av/a/f_mo023.jpg", "av/a/f_mo024.jpg", "av/a/f_mo025.jpg", "av/a/f_mo026.jpg", "av/a/f_mo027.jpg", "av/a/f_mo028.jpg", "av/a/f_mo029.jpg", "av/a/f_mo030.jpg", "av/a/f_mo031.jpg", "av/a/f_mo032.jpg", "av/a/f_mo033.jpg", "av/a/f_mo034.jpg", "av/a/f_mo035.jpg", "av/a/f_mo036.jpg", "av/a/f_mo037.jpg", "av/a/f_mo038.jpg", "av/a/f_mo039.jpg", "av/a/f_mo040.jpg", "av/a/f_mo041.jpg", "av/a/f_mo042.jpg", "av/a/f_mo043.jpg", "av/a/f_mo044.jpg", "av/a/f_mo045.jpg", "av/a/f_mo046.jpg", "av/a/f_mo047.jpg", "av/a/f_mo048.jpg", "av/a/f_mo049.jpg", "av/a/f_mo050.jpg", "av/a/f_yao001.jpg", "av/a/f_yao002.jpg", "av/a/f_yao003.jpg", "av/a/f_yao004.jpg", "av/a/f_yao005.jpg", "av/a/f_yao006.jpg", "av/a/f_yao007.jpg", "av/a/f_yao008.jpg", "av/a/f_yao009.jpg", "av/a/f_yao010.jpg", "av/a/f_yao011.jpg", "av/a/f_yao012.jpg", "av/a/f_yao013.jpg", "av/a/f_yao014.jpg", "av/a/f_yao015.jpg", "av/a/f_yao016.jpg", "av/a/f_yao017.jpg", "av/a/f_yao018.jpg", "av/a/f_yao019.jpg", "av/a/f_yao020.jpg", "av/a/f_yao021.jpg", "av/a/f_yao022.jpg", "av/a/f_yao023.jpg", "av/a/f_yao024.jpg", "av/a/f_yao025.jpg", "av/a/f_yao026.jpg", "av/a/f_yao027.jpg", "av/a/f_yao028.jpg", "av/a/f_yao029.jpg", "av/a/f_yao030.jpg", "av/a/f_yao031.jpg", "av/a/f_yao032.jpg", "av/a/f_yao033.jpg", "av/a/f_yao034.jpg", "av/a/f_yao035.jpg", "av/a/f_yao036.jpg", "av/a/f_yao037.jpg", "av/a/f_yao038.jpg", "av/a/f_yao039.jpg", "av/a/f_yao040.jpg", "av/a/f_yao041.jpg", "av/a/f_yao042.jpg", "av/a/f_yao043.jpg", "av/a/f_yao044.jpg", "av/a/f_yao045.jpg", "av/a/f_yao046.jpg", "av/a/f_yao047.jpg", "av/a/f_yao048.jpg", "av/a/f_yao049.jpg", "av/a/f_yao050.jpg", "av/a/f_ling001.jpg", "av/a/f_ling002.jpg", "av/a/f_ling003.jpg", "av/a/f_ling004.jpg", "av/a/f_ling005.jpg", "av/a/f_ling006.jpg", "av/a/f_ling007.jpg", "av/a/f_ling008.jpg", "av/a/f_ling009.jpg", "av/a/f_ling010.jpg", "av/a/f_ling011.jpg", "av/a/f_ling012.jpg", "av/a/f_ling013.jpg", "av/a/f_ling014.jpg", "av/a/f_ling015.jpg", "av/a/f_ling016.jpg", "av/a/f_ling017.jpg", "av/a/f_ling018.jpg", "av/a/f_ling019.jpg", "av/a/f_ling020.jpg", "av/a/f_ling021.jpg", "av/a/f_ling022.jpg", "av/a/f_ling023.jpg", "av/a/f_ling024.jpg", "av/a/f_ling025.jpg", "av/a/f_ling026.jpg", "av/a/f_ling027.jpg", "av/a/f_ling028.jpg", "av/a/f_ling029.jpg", "av/a/f_ling030.jpg", "av/a/f_ling031.jpg", "av/a/f_ling032.jpg", "av/a/f_ling033.jpg", "av/a/f_ling034.jpg", "av/a/f_ling035.jpg", "av/a/f_ling036.jpg", "av/a/f_ling037.jpg", "av/a/f_ling038.jpg", "av/a/f_ling039.jpg", "av/a/f_ling040.jpg", "av/a/f_ling041.jpg", "av/a/f_ling042.jpg", "av/a/f_ling043.jpg", "av/a/f_ling044.jpg", "av/a/f_ling045.jpg", "av/a/f_ling046.jpg", "av/a/f_ling047.jpg", "av/a/f_ling048.jpg", "av/a/f_ling049.jpg", "av/a/f_ling050.jpg", "av/a/f_yi001.jpg", "av/a/f_yi002.jpg", "av/a/f_yi003.jpg", "av/a/f_yi004.jpg", "av/a/f_yi005.jpg", "av/a/f_yi006.jpg", "av/a/f_yi007.jpg", "av/a/f_yi008.jpg", "av/a/f_yi009.jpg", "av/a/f_yi010.jpg", "av/a/f_yi011.jpg", "av/a/f_yi012.jpg", "av/a/f_yi013.jpg", "av/a/f_yi014.jpg", "av/a/f_yi015.jpg", "av/a/f_yi016.jpg", "av/a/f_yi017.jpg", "av/a/f_yi018.jpg", "av/a/f_yi019.jpg", "av/a/f_yi020.jpg", "av/a/f_yi021.jpg", "av/a/f_yi022.jpg", "av/a/f_yi023.jpg", "av/a/f_yi024.jpg", "av/a/f_yi025.jpg", "av/a/f_yi026.jpg", "av/a/f_yi027.jpg", "av/a/f_yi028.jpg", "av/a/f_yi029.jpg", "av/a/f_yi030.jpg", "av/a/f_yi031.jpg", "av/a/f_yi032.jpg", "av/a/f_yi033.jpg", "av/a/f_yi034.jpg", "av/a/f_yi035.jpg", "av/a/f_yi036.jpg", "av/a/f_yi037.jpg", "av/a/f_yi038.jpg", "av/a/f_yi039.jpg", "av/a/f_yi040.jpg", "av/a/f_yi041.jpg", "av/a/f_yi042.jpg", "av/a/f_yi043.jpg", "av/a/f_yi044.jpg", "av/a/f_yi045.jpg", "av/a/f_yi046.jpg", "av/a/f_yi047.jpg", "av/a/f_yi048.jpg", "av/a/f_yi049.jpg", "av/a/f_yi050.jpg", "av/a/f_shen001.jpg", "av/a/f_shen002.jpg", "av/a/f_shen003.jpg", "av/a/f_shen004.jpg", "av/a/f_shen005.jpg", "av/a/f_shen006.jpg", "av/a/f_shen007.jpg", "av/a/f_shen008.jpg", "av/a/f_shen009.jpg", "av/a/f_shen010.jpg", "av/a/f_shen011.jpg", "av/a/f_shen012.jpg", "av/a/f_shen013.jpg", "av/a/f_shen014.jpg", "av/a/f_shen015.jpg", "av/a/f_shen016.jpg", "av/a/f_shen017.jpg", "av/a/f_shen018.jpg", "av/a/f_shen019.jpg", "av/a/f_shen020.jpg", "av/a/f_shen021.jpg", "av/a/f_shen022.jpg", "av/a/f_shen023.jpg", "av/a/f_shen024.jpg", "av/a/f_shen025.jpg", "av/a/f_shen026.jpg", "av/a/f_shen027.jpg", "av/a/f_shen028.jpg", "av/a/f_shen029.jpg", "av/a/f_shen030.jpg", "av/a/f_shen031.jpg", "av/a/f_shen032.jpg", "av/a/f_shen033.jpg", "av/a/f_shen034.jpg", "av/a/f_shen035.jpg", "av/a/f_shen036.jpg", "av/a/f_shen037.jpg", "av/a/f_shen038.jpg", "av/a/f_shen039.jpg", "av/a/f_shen040.jpg", "av/a/f_shen041.jpg", "av/a/f_shen042.jpg", "av/a/f_shen043.jpg", "av/a/f_shen044.jpg", "av/a/f_shen045.jpg", "av/a/f_shen046.jpg", "av/a/f_shen047.jpg", "av/a/f_shen048.jpg", "av/a/f_shen049.jpg", "av/a/f_shen050.jpg", "av/a/f_ming001.jpg", "av/a/f_ming002.jpg", "av/a/f_ming003.jpg", "av/a/f_ming004.jpg", "av/a/f_ming005.jpg", "av/a/f_ming006.jpg", "av/a/f_ming007.jpg", "av/a/f_ming008.jpg", "av/a/f_ming009.jpg", "av/a/f_ming010.jpg", "av/a/f_ming011.jpg", "av/a/f_ming012.jpg", "av/a/f_ming013.jpg", "av/a/f_ming014.jpg", "av/a/f_ming015.jpg", "av/a/f_ming016.jpg", "av/a/f_ming017.jpg", "av/a/f_ming018.jpg", "av/a/f_ming019.jpg", "av/a/f_ming020.jpg", "av/a/f_ming021.jpg", "av/a/f_ming022.jpg", "av/a/f_ming023.jpg", "av/a/f_ming024.jpg", "av/a/f_ming025.jpg", "av/a/f_ming026.jpg", "av/a/f_ming027.jpg", "av/a/f_ming028.jpg", "av/a/f_ming029.jpg", "av/a/f_ming030.jpg", "av/a/f_ming031.jpg", "av/a/f_ming032.jpg", "av/a/f_ming033.jpg", "av/a/f_ming034.jpg", "av/a/f_ming035.jpg", "av/a/f_ming036.jpg", "av/a/f_ming037.jpg", "av/a/f_ming038.jpg", "av/a/f_ming039.jpg", "av/a/f_ming040.jpg", "av/a/f_ming041.jpg", "av/a/f_ming042.jpg", "av/a/f_ming043.jpg", "av/a/f_ming044.jpg", "av/a/f_ming045.jpg", "av/a/f_ming046.jpg", "av/a/f_ming047.jpg", "av/a/f_ming048.jpg", "av/a/f_ming049.jpg", "av/a/f_ming050.jpg", "av/a/f_xie001.jpg", "av/a/f_xie002.jpg", "av/a/f_xie003.jpg", "av/a/f_xie004.jpg", "av/a/f_xie005.jpg", "av/a/f_xie006.jpg", "av/a/f_xie007.jpg", "av/a/f_xie008.jpg", "av/a/f_xie009.jpg", "av/a/f_xie010.jpg", "av/a/f_xie011.jpg", "av/a/f_xie012.jpg", "av/a/f_xie013.jpg", "av/a/f_xie014.jpg", "av/a/f_xie015.jpg", "av/a/f_xie016.jpg", "av/a/f_xie017.jpg", "av/a/f_xie018.jpg", "av/a/f_xie019.jpg", "av/a/f_xie020.jpg", "av/a/f_xie021.jpg", "av/a/f_xie022.jpg", "av/a/f_xie023.jpg", "av/a/f_xie024.jpg", "av/a/f_xie025.jpg", "av/a/f_xie026.jpg", "av/a/f_xie027.jpg", "av/a/f_xie028.jpg", "av/a/f_xie029.jpg", "av/a/f_xie030.jpg", "av/a/f_xie031.jpg", "av/a/f_xie032.jpg", "av/a/f_xie033.jpg", "av/a/f_xie034.jpg", "av/a/f_xie035.jpg", "av/a/f_xie036.jpg", "av/a/f_xie037.jpg", "av/a/f_xie038.jpg", "av/a/f_xie039.jpg", "av/a/f_xie040.jpg", "av/a/f_xie041.jpg", "av/a/f_xie042.jpg", "av/a/f_xie043.jpg", "av/a/f_xie044.jpg", "av/a/f_xie045.jpg", "av/a/f_xie046.jpg", "av/a/f_xie047.jpg", "av/a/f_xie048.jpg", "av/a/f_xie049.jpg", "av/a/f_xie050.jpg", "av/a/f_chuan001.jpg", "av/a/f_chuan002.jpg", "av/a/f_chuan003.jpg", "av/a/f_chuan004.jpg", "av/a/f_chuan005.jpg", "av/a/f_chuan006.jpg", "av/a/f_chuan007.jpg", "av/a/f_chuan008.jpg", "av/a/f_chuan009.jpg", "av/a/f_chuan010.jpg", "av/a/f_chuan011.jpg", "av/a/f_chuan012.jpg", "av/a/f_chuan013.jpg", "av/a/f_chuan014.jpg", "av/a/f_chuan015.jpg", "av/a/f_chuan016.jpg", "av/a/f_chuan017.jpg", "av/a/f_chuan018.jpg", "av/a/f_chuan019.jpg", "av/a/f_chuan020.jpg", "av/a/f_chuan021.jpg", "av/a/f_chuan022.jpg", "av/a/f_chuan023.jpg", "av/a/f_chuan024.jpg", "av/a/f_chuan025.jpg", "av/a/f_chuan026.jpg", "av/a/f_chuan027.jpg", "av/a/f_chuan028.jpg", "av/a/f_chuan029.jpg", "av/a/f_chuan030.jpg", "av/a/f_chuan031.jpg", "av/a/f_chuan032.jpg", "av/a/f_chuan033.jpg", "av/a/f_chuan034.jpg", "av/a/f_chuan035.jpg", "av/a/f_chuan036.jpg", "av/a/f_chuan037.jpg", "av/a/f_chuan038.jpg", "av/a/f_chuan039.jpg", "av/a/f_chuan040.jpg", "av/a/f_chuan041.jpg", "av/a/f_chuan042.jpg", "av/a/f_chuan043.jpg", "av/a/f_chuan044.jpg", "av/a/f_chuan045.jpg", "av/a/f_chuan046.jpg", "av/a/f_chuan047.jpg", "av/a/f_chuan048.jpg", "av/a/f_chuan049.jpg", "av/a/f_chuan050.jpg"] } };


// v116: 全局错误捕获，显示到日志方便排查
window.addEventListener('error', function(e) {
  try {
    var _em = e.message || '';
    if (_em.indexOf('maiVLuo') >= 0) { try { console.error('[filtered] S.maiVLuo', e); } catch(_) {} return; }
    var msg = '❌ JS错误: ' + (_em || '未知');
    if (typeof log === 'function') log('bad', msg);
    console.error(msg, e);
  } catch(_) {}
});
const C = window.Core, K = C.K, AN = C.AN, ATTRS = C.ATTRS;
const SAVE_KEY = 'fushengwendao_save_v1';
const PETS = C.PETS, EGGS = C.EGGS, PQLT = C.PQLT, petQ = C.petQ; const petMatchTxt = C.petMatchTxt;
const DISHES = C.DISHES;
const MATS = C.MATS, SKILLS = C.SKILLS, DIFFS = C.DIFFS, ORES = C.ORES, GATHER = C.GATHER;
const MEATS = C.MEATS;
const PREY = C.PREY, PAGES = C.PAGES;
const eggTotal = C.eggTotal;
const TIERCLS = ['w" style="color:#fff', 'q2', 'q1" style="font-weight:700', 'gq4" style="font-weight:700', 'q3']; // v582 灵石颜色；v583 中品改淡紫
const tierOf = k => { const m = /^(sp|dw)(\d)$/.exec(k); return m ? +m[2] - 1 : -1; };
const rarTxt = (kind, k) => { const it = GATHER[kind].items[k], n = it.name, t = kind === 'read' ? +k.slice(2) - 1 : tierOf(k);
  if (kind === 'read') return k === 'pg1' ? `<span style="color:#fff">📜${n}</span>` : `<span class="${TIERCLS[t]}">📜${n}</span>`;
  if (t >= 0) { const _si = { sp1: '🪨', sp2: '🌒', sp3: '🌗', sp4: '💎', sp5: '💠' }[k] || (k[0] === 's' ? '💠' : '💧'); return `<span class="${TIERCLS[t]}">${_si}${n}</span>`; }
  if (kind === 'farm') return `<span class="g">${n}</span>`;
  const i = Object.keys(GATHER[kind].items).indexOf(k); return i === 3 ? `<span class="q3">${n}</span>` : i === 2 ? `<span class="q2">${n}</span>` : n; };
const useOpt = { lu: '', spirit: '' };
const alcExtraSel = {}; // v998 加料选择
const alcExtrasArr = () => { const a = []; for (const k in alcExtraSel) for (let i = 0; i < alcExtraSel[k]; i++) a.push(k); return a; }; // 炼药时投入哪一品凝露 / 灵石（可选，各 1）
const LU = C.LU, SPK = ['sp1', 'sp2', 'sp3', 'sp4', 'sp5'], LUK = ['dw1', 'dw2', 'dw3']; // v1128 凝露三品
const $ = id => document.getElementById(id);
var S, pk = null; window.S = S;

function load() {
  try { const raw = localStorage.getItem(SAVE_KEY); S = raw ? C.normalize(JSON.parse(raw)) : null; } catch (e) { S = null; }
  if (!S) { S = C.newState(); welcome(); }
  try { if (window.LG) window.LG.ensure(S); } catch(_) {} // v867 老存档补抽灵根（跨块走window.LG）
}
function save() { try { S.log = S.log.slice(-K.LOG_KEEP); localStorage.setItem(SAVE_KEY, JSON.stringify(S)); try{window.MHXY&&MHXY.markDirty(SAVE_KEY)}catch(_){} } catch (e) {} }
function welcome() {
  log('gold', `<b class="y">欢迎来到【梦回逍遥】</b><br>每日<b>签到</b>可得 ${C.checkinAmount(S)} 点体力（每升 1 级 +1）。体力可用于<b>修炼</b>属性、<b>炼药</b>、<b>冒险</b>斩妖、与他人<b>PK</b>夺取属性。冒险与 PK 获胜可得<b>金元</b>，在<b>商店</b>购买药草与技能书。<br>初入江湖，赠你 ${K.START_STAMINA} 点体力。`);
  // v1088 新号强制建号链：性别→头像→名字→种族
  if (!S._onboarded) setTimeout(() => chainNext(), 300);
}

/* ---------- 调试模式 ---------- */
const params = new URLSearchParams(location.search);
if (params.get('debug') === '1') sessionStorage.setItem('fsd_debug', '1');
if (params.get('debug') === '0') sessionStorage.removeItem('fsd_debug');
function applyDebug() { document.body.classList.toggle('debug', sessionStorage.getItem('fsd_debug') === '1'); }
let taps = 0, tapT = 0;
$('title').addEventListener('click', () => {
  const now = Date.now(); taps = now - tapT < 600 ? taps + 1 : 1; tapT = now;
  if (taps >= 1) { taps = 0; if (sessionStorage.getItem('fsd_debug')) sessionStorage.removeItem('fsd_debug'); else sessionStorage.setItem('fsd_debug', '1'); applyDebug(); toastLog('sys', '调试模式：' + (document.body.classList.contains('debug') ? '开启' : '关闭')); }
});

/* ---------- 日志 ---------- */
function timeStr() { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
function log(cls, html) { const e = { c: cls, h: html, t: timeStr() }; S.log.push(e); renderEntry(e, true); }
function toastLog(cls, html) { renderEntry({ c: cls, h: html, t: timeStr() }, true); }
function showTip(html) { // v1171 会消失的大提示：屏幕正中，10 秒自动淡出（Ye 定：被卡时要说明原因，不依赖日记浮窗）
  try {
    let el = document.getElementById('mtip');
    if (!el) { el = document.createElement('div'); el.id = 'mtip'; el.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:9999;background:rgba(20,16,32,.94);border:1px solid #c9a227;color:#ffe9a8;padding:10px 18px;border-radius:12px;font-size:15px;pointer-events:none;opacity:0;transition:opacity .3s;max-width:86vw;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.5)'; document.body.appendChild(el); }
    el.innerHTML = html; el.style.opacity = '1';
    if (window._mtipT) clearTimeout(window._mtipT);
    window._mtipT = setTimeout(() => { el.style.opacity = '0'; }, 10000); // Ye 定：屏幕中间，10 秒消失
  } catch(_) {}
}
window.showTip = showTip;
function renderEntry(e, scroll) {
  const d = document.createElement('div'); d.className = 'e ' + (e.c || '');
  d.innerHTML = `<span class="ts">${e.t || ''}</span>${e.h}`;
  const logEl = $('log');
  if (logEl) {
    logEl.appendChild(d);
    while (logEl.children.length > 5) logEl.removeChild(logEl.firstChild);
  }
  const store = $('fullLogStore');
  if (store) { const d2 = d.cloneNode(true); store.appendChild(d2); while (store.children.length > K.LOG_KEEP) store.removeChild(store.firstChild); }
  try { if (window._chatTab === 'diary' && document.getElementById('chatFloat') && document.getElementById('chatFloat').classList.contains('on') && typeof window.renderChatFloat === 'function') window.renderChatFloat(); } catch(_) {} // v446 日记tab自动刷新
  try { const _mf2 = JSON.parse(localStorage.getItem('msgFilter') || '{"diary":1}'); if (!_mf2.diary) return; const cf = document.getElementById('chatFloat'); if (cf) { window._chatTab = 'diary'; cf.classList.add('on'); if (typeof window.renderChatFloat === 'function') window.renderChatFloat(); if (window._logHideT) clearTimeout(window._logHideT); window._logHideT = setTimeout(() => { const _cf = document.getElementById('chatFloat'); if (_cf) _cf.classList.remove('on'); }, 5000); } } catch(_) {} // v576 新内容自动显示5秒后隐藏；v577 切到日记tab；v578 过滤时不弹出
}
function renderLog() { $('log').innerHTML = ''; S.log.forEach(e => renderEntry(e, false)); $('log').scrollTop = $('log').scrollHeight; }
// v310 主界面地图
if (typeof S !== 'undefined' && !S.worldMap) S.worldMap = { px: 2, py: 3 }; // v342 剑格中央
window.useFurnace = function(fk) {
  try {
    const lk = fk === 'ding' ? 'alc' : fk;
    const dd = (S.furnaceDur && S.furnaceDur[fk] != null) ? S.furnaceDur[fk] : (fk === 'ding' ? 200 : 100);
    if (dd <= 0) { if (typeof toastLog === 'function') toastLog('sys', '炉子耐久不足，需要修理'); return; }
    S.furnaceDur[fk] = dd - 1; if (typeof save === 'function') save();
    closeSheet(); if (typeof sheetLife === 'function') sheetLife(lk);
    if (typeof renderWorldMap === 'function') renderWorldMap();
  } catch (_) {}
};
// v463 地图闭关入口
window._afkFromMap = function(type, name) {
  try {
    if (S.afk) { try { afkExit(S, 'switch'); } catch(e) {} S.afk = null; }
    S.afk = { type, start: Date.now() };
    try { log('good', '🧘 开始' + name + '…'); } catch(e) {}
    closeSheet(); save(); render();
    if (typeof renderWorldMap === 'function') renderWorldMap();
  } catch (_) {}
};
// v343 剑形地图：剑尖(2,0)-剑身(1-3,1)(1-3,2)-剑格(0-5,3)-剑柄(2,4)-剑首(1-3,5)
function isSwordCell(x, y) {
  if (x === 2 && y === 0) return true; // 剑尖
  if (y >= 1 && y <= 2 && x >= 1 && x <= 3) return true; // 剑身
  if (y === 3 && x >= 0 && x <= 5) return true; // 剑格（护手）
  if (x === 2 && y === 4) return true; // 剑柄
  if (y === 5 && x >= 1 && x <= 3) return true; // 剑首
  return false;
}
function renderWorldMap() {
  try {
    try { const _ssb = document.getElementById('shenshiBtn'); if (_ssb) _ssb.style.display = (S.realm|0) >= 1 ? '' : 'none'; try { window._myRealm = (S.realm|0) || 0; } catch(_) {} } catch(_) {} // v1072 神识单按钮：练气显示；同步全局境界（Ye 定整合）
    try { refreshMainMailBtn(); } catch(_) {}
// v536 保留地(4,3)资源点：草药+矿石定时刷新
// v899 采集阵自动采集系统
// S.arrays: [{id, map:'world', x, y, fuelUntil, storage:{h,o,v,m,e}, guarded, lastTick}]
function arrayTick(S) {
  try {
    if (!S.arrays || !S.arrays.length) return;
    const now = Date.now();
    S.arrays.forEach(a => {
      if (!(a.lastTick > 0) || a.lastTick > now + 60000) { a.lastTick = now; try { log('sys', `🧭 采集阵(${a.x},${a.y})时间戳异常，已重置计时`); } catch(_) {} } // v954 自愈：lastTick损坏(NaN/缺失)或未来时间则重置，否则静默跳过永不采集
      if (!a.fuelUntil || a.fuelUntil <= now) {
        // v918 燃料耗尽自动消耗背包上品灵石续1小时
        if (((S.ores || {}).sp4|0) > 0) {
          S.ores.sp4--;
          a.fuelUntil = Math.max(now, Number(a.fuelUntil)||0) + 3600000; // v922 时间戳不用|0防溢出
          if (!a.lastTick) a.lastTick = now;
          try { log('good', `💎 采集阵(${a.x},${a.y})自动消耗上品灵石×1续燃料`); } catch(_) {}
        } else return; // 没燃料也没灵石，停止
      }
      if (!a.lastTick) a.lastTick = now;
      const secs = Math.floor((now - a.lastTick) / 1000);
      if (secs < 10) return; // v923 10秒1次（手动2-5秒的一半速度）
      const times = Math.floor(secs / 10);
      a.lastTick += times * 10 * 1000;
      a.storage = a.storage || {};
      // 从格子资源转移到阵存储（只转存在的）
      for (let i = 0; i < times; i++) {
        if (a.map === 'world' && a.x === 3 && a.y === 2) {
          // 田药园：草药
          try { herbTick(S); if ((S.herbGarden.h|0) > 0) { S.herbGarden.h--; a.storage.h = (a.storage.h|0) + 1; } } catch(_) {}
        } else if (a.map === 'world' && a.x === 4 && a.y === 3) {
          // 灵脉矿区：随机采集草药/矿石/灵脉其一
          try {
            reserveTick(S); const rn = S.reserveNode;
            const _pool = [];
            if ((rn.h|0) > 0) _pool.push('h');
            if ((rn.o|0) > 0) _pool.push('o');
            if ((rn.v|0) > 0) _pool.push('v');
            if (_pool.length) {
              const _p = _pool[Math.floor(Math.random()*_pool.length)]; // v924 随机
              if (_p === 'h') { rn.h--; a.storage.h = (a.storage.h|0) + 1; }
              else if (_p === 'o') { rn.o--; a.storage.o = (a.storage.o|0) + 1; }
              else { if (!Array.isArray(rn.vs)) rn.vs = [rn.v|0, 0, 0]; const _avt = (rn.vs[2]|0) > 0 ? 2 : (rn.vs[1]|0) > 0 ? 1 : 0; if ((rn.vs[_avt]|0) > 0) rn.vs[_avt]--; rn.v = Math.max(0, (rn.v|0) - 1); a.storage.v = (a.storage.v|0) + 1; a.storage.vt = _avt; } // v1007 按档扣
            }
          } catch(_) {}
        } else if (a.map === 'world' && a.x === 2 && a.y === 0) {
          // 养殖园：肉/蛋
          try { if (typeof ranchTick === 'function') ranchTick(S); const rc = S.ranch || {};
            if ((rc.m|0) > 0) { rc.m--; a.storage.m = (a.storage.m|0) + 1; }
            else if ((rc.e|0) > 0) { rc.e--; a.storage.e = (a.storage.e|0) + 1; }
          } catch(_) {}
        }
      }
    });
    // NPC随机破坏（每小时2%每阵）：对战判定
    if (false) { // v1108 NPC 偷袭已取消（Ye 令 2026-10-27）：不再有 NPC 破阵
      S._lastRaid = now;
      const toRemove = [];
      S.arrays.forEach(a => {
        if (Math.random() < 0.02) {
          // 阵战力：500+玩家等级*10；神识战力：玩家总属性（坐阵时）
          let arrPow = 500 + (S.level|0) * 10;
          let defPow = arrPow;
          let defName = '采集阵';
          if (a.guarded) {
            defPow += (a.guardPow|0) || 1000; // 守卫人的属性
            defName = '神识+采集阵';
          }
          // NPC战力：随机，随玩家境界浮动
          const npcPow = Math.floor((800 + Math.random() * 700) * (1 + (S.realm|0) * 0.1));
          const atkName = (typeof CHAT_NAMES !== 'undefined' && CHAT_NAMES.length ? CHAT_NAMES[Math.floor(Math.random()*CHAT_NAMES.length)] : '神秘人'); // v921 攻击者名字
          // v929 气息隐匿：NPC神识需超过玩家气息才能发现采集阵
          const npcSS = Math.floor(Math.random() * 200); // NPC神识0-200随机
          if (npcSS <= Math.floor((S.qixi|0)/2)) { return; } // v950 阵气息=本人/2
          if (npcPow > defPow) {
            // 攻破：2/3被抢，1/3损失
            const stolen = {};
            Object.keys(a.storage || {}).forEach(k => {
              if (k === 'vt') return;
              const total = a.storage[k]|0;
              const s = Math.floor(total * 2 / 3);
              if (s > 0) stolen[k] = s;
            });
            // v923 燃料灵石也按2/3被抢、1/3损毁
            const _fuelStones = a.fuelUntil > Date.now() ? Math.floor((a.fuelUntil - Date.now()) / 3600000) : 0;
            if (_fuelStones > 0) {
              const _s = Math.floor(_fuelStones * 2 / 3);
              if (_s > 0) stolen['sp4'] = _s;
            }
            toRemove.push(a);
            try { log('bad', `🧭 采集阵(${a.x},${a.y})被【${atkName}】攻破！${defName}战败${Object.keys(stolen).length ? '，被抢走 ' + Object.entries(stolen).map(([k,v]) => ({h:'草药',o:'矿石',v:'灵脉',m:'肉',e:'蛋',sp4:'上品灵石'}[k]||k) + '×' + v).join('、') + '（1/3损毁）' : '，阵内空空如也'}`); } catch(_) {}
            try { // v900 书信提醒
              S.mail = S.mail || [];
              const _dt = new Date();
              const _tstr = `${_dt.getMonth()+1}月${_dt.getDate()}日 ${_dt.getHours()}:${String(_dt.getMinutes()).padStart(2,'0')}`;
              S.mail.push({ from: '阵灵', text: `【${_tstr}】你的采集阵在残陨之剑(${a.x},${a.y})被【${atkName}】攻破！${defName}战败${Object.keys(stolen).length ? '，被抢走' + Object.entries(stolen).map(([k,v]) => ({h:'草药',o:'矿石',v:'灵脉',m:'肉',e:'蛋',sp4:'上品灵石'}[k]||k) + '×' + v).join('、') : ''}（1/3物资损毁）`, time: Date.now(), claimed: false });
              if (S.mail.length > 50) S.mail = S.mail.slice(-50);
            } catch(_) {}
          } else {
            try { log('good', `🛡️ 采集阵(${a.x},${a.y})击退【${atkName}】！${defName}守住了`); } catch(_) {}
            try { // v900 书信提醒
              S.mail = S.mail || [];
              const _dt2 = new Date();
              const _tstr2 = `${_dt2.getMonth()+1}月${_dt2.getDate()}日 ${_dt2.getHours()}:${String(_dt2.getMinutes()).padStart(2,'0')}`;
              S.mail.push({ from: '阵灵', text: `【${_tstr2}】你的采集阵在残陨之剑(${a.x},${a.y})遭到【${atkName}】攻击，${defName}将其击退，阵完好无损`, time: Date.now(), claimed: false });
              if (S.mail.length > 50) S.mail = S.mail.slice(-50);
            } catch(_) {}
          }
        }
      });
      toRemove.forEach(a => { const _i = S.arrays.indexOf(a); if (_i >= 0) S.arrays.splice(_i, 1); });
    }
  } catch(e) {}
}
// v954 后台tick后保存：必须放在本script块内才能取到S/arrayTick/save（v953误写在core块，跨块取不到故从未生效）
if (!window._arrayWatchdog) { window._arrayWatchdog = setInterval(() => { try { if (typeof S !== 'undefined' && S && typeof arrayTick === 'function') { arrayTick(S); if (typeof save === 'function') save(); } } catch(_) {} }, 5000); }
// v899 采集阵UI
window.placeArray = function(x, y) {
  try {
    S.formations = S.formations || {};
    const _tier = (S.formations.f_gather | 0) > 0 ? 1 : (S.formations.f_gather2 | 0) > 0 ? 2 : (S.formations.f_gather3 | 0) > 0 ? 3 : 0; // v1128 优先用最低档
    if (!_tier) { log('bad', '没有采集阵（阵法台合成）'); return; }
    S.arrays = S.arrays || [];
    if (S.arrays.some(a => a.map === 'world' && a.x === x && a.y === y)) { log('bad', '该格已有采集阵（一人一格一个）'); return; } // v920 一人一格一个
    S.formations[_tier === 1 ? 'f_gather' : _tier === 2 ? 'f_gather2' : 'f_gather3']--;
    S.arrays.push({ id: Date.now(), map: 'world', x, y, tier: _tier, fuelUntil: 0, storage: {}, guarded: false, lastTick: Date.now() });
    log('good', `🧭 ${['', '小型', '中型', '大型'][_tier]}采集阵已布于(${x},${y})，放入上品灵石启动（1颗=1小时）`);
    commit(); renderWorldMap();
  } catch(e) {}
};
window.arrayPanel = function(id) {
  try {
    try { if (typeof arrayTick === 'function') { arrayTick(S); if (typeof save === 'function') save(); } } catch(_) {} // v954 开面板先结算一次，iOS挂起定时器时也能补采
    const a = (S.arrays || []).find(v => v.id === id);
    if (!a) return;
    const now = Date.now();
    const fuelH = a.fuelUntil > now ? ((a.fuelUntil - now) / 3600000).toFixed(1) : '0';
    const fuelStones = a.fuelUntil > now ? Math.round((a.fuelUntil - now) / 3600000) : 0; // v922 四舍五入对齐显示
    const st = a.storage || {};
    const _nm = {h:'🌿草药',o:'⛏️矿石',v:'💧灵脉',m:'🍖兽肉',e:'🥚兽蛋'};
    const _ents = Object.entries(st).filter(([k,v]) => k !== 'vt' && v > 0);
    if (fuelStones > 0) _ents.unshift(['sp4', fuelStones]); // v922 灵石进库存显示
    _nm['sp4'] = '💎上品灵石';
    const items = _ents.length ? `<div class="grid2" style="grid-template-columns:repeat(3,1fr);gap:4px;margin:6px 0">` + _ents.map(([k,v]) => `<div class="row" style="padding:6px;text-align:center"><div class="lab">${_nm[k]||k}<br><b class="y">×${v}</b></div></div>`).join('') + `</div>` : '<div class="empty">空</div>'; // v915 背包式
    const stoneCount = ((S.ores || {}).sp4|0); // v915 key修正
    openSheet(`<h2>🧭 采集阵 (${a.x},${a.y})#${String(a.id).slice(-3)}</h2><div class="hint">燃料剩余：<b class="y">${fuelH}</b>小时 · ${a.guarded ? '🛡️ 神识坐阵中' : '无守卫'}<br>你的上品灵石：${stoneCount}颗<br>阵内灵石：<b class="y">${fuelStones}</b>颗（燃料${fuelH}小时）</div><h3>🎒 阵内库存（人人可看）</h3>${items}<div class="grid2"><button class="btn gold" onclick="window.fuelArray(${id})">💎 加灵石</button><button class="btn" onclick="window.withdrawFuel(${id})">💎 取灵石</button><button class="btn" onclick="window.collectArray(${id})">📦 收取</button><button class="btn" onclick="window.toggleGuard(${id})">${a.guarded ? '🔓 撤回神识' : '🛡️ 神识坐阵'}</button><button class="btn danger" onclick="window.destroyArray(${id})">💥 拆除</button></div><button class="btn full" onclick="closeSheet()">关闭</button>`);
  } catch(e) {}
};
window.fuelArray = function(id) {
  try {
    const a = (S.arrays || []).find(v => v.id === id);
    if (!a) return;
    if (((S.ores || {}).sp4|0) <= 0) { log('bad', '没有上品灵石'); return; }
    S.ores.sp4--; // v914 上品灵石key修正
    const now = Date.now();
    a.fuelUntil = Math.max(now, Number(a.fuelUntil)||0) + 3600000; // v922 时间戳不用|0防溢出
    if (!a.lastTick) a.lastTick = now;
    log('good', `💎 采集阵(${a.x},${a.y})燃料+1小时`);
    commit(); window.arrayPanel(id);
  } catch(e) {}
};
window.withdrawFuel = function(id) { // v917 取出灵石
  try {
    const a = (S.arrays || []).find(v => v.id === id);
    if (!a) return;
    const now = Date.now();
    const remain = (Number(a.fuelUntil)||0) - now; // v922
    if (remain < 3600000) { log('bad', '燃料不足1小时，无法取出'); return; }
    a.fuelUntil -= 3600000;
    S.ores = S.ores || {}; S.ores.sp4 = (S.ores.sp4|0) + 1;
    log('good', `💎 取出上品灵石×1（剩余燃料${((a.fuelUntil-now)/3600000).toFixed(1)}小时）`);
    commit(); window.arrayPanel(id);
  } catch(e) {}
};
window.collectArray = async function(id) {
  // v966 彻底版：登录在线时走服务端（服务端按正确语义实现，修本地 bug）
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const resp = await MHXY.api('/api/roll/array_collect', {method:'POST', body:{id}});
      const j = resp && resp.json;
      if (resp.ok && j && j.ok) {
        const got = [];
        for (const gg of (j.gains||[])) {
          if (!S[gg.st]) { S[gg.st] = gg.st === 'veins' ? [0,0,0] : {}; }
          if (Array.isArray(S[gg.st])) { const _vi = Math.min(2, Math.max(0, gg.k|0)); S[gg.st][_vi] = (S[gg.st][_vi]|0) + (gg.n|0); got.push(`${['小型灵脉', '中型灵脉', '巨型灵脉'][_vi]}×${gg.n}`); } // v1039 灵脉按灵脉入账，不折灵石
          else { S[gg.st][gg.k] = (S[gg.st][gg.k]|0) + gg.n; got.push(`${gg.k}×${gg.n}`); }
        }
        // 本地阵 storage 清零（与服务端一致）
        try { const a = (S.arrays||[]).find(v => v.id === id); if (a && a.storage) { a.storage.h = 0; a.storage.o = 0; a.storage.v = 0; a.storage.m = 0; a.storage.e = 0; } } catch(_){}
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        if (got.length) log('good', `📦 从采集阵收取：${got.join('、')}`);
        else log('sys', '阵内空空如也');
        commit(); window.arrayPanel(id);
        return;
      }
      if (!resp.netErr) { if ((j||{}).error === 'no_array') log('sys', '阵不存在'); return; }
    } catch(e) { /* 回落本地 */ }
  }
  try {
    const a = (S.arrays || []).find(v => v.id === id);
    if (!a || !a.storage) return;
    const st = a.storage;
 // v1038 自愈旧污染：草药/蛋被误存为数字时先转回正道
    if (typeof S.herbs === 'number' && S.herbs > 0) S.herbs = { lq1: S.herbs|0 };
    if (typeof S.eggs === 'number' && S.eggs > 0) { S.petEggs = (S.petEggs|0) + (S.eggs|0); S.eggs = {}; }
    let got = [];
    if ((st.h|0) > 0) { if (!S.herbs || typeof S.herbs !== 'object') S.herbs = {}; for (let _hi = 0; _hi < (st.h|0); _hi++) { const _hk = ['lq1', 'lq2', 'lq3'][(window._mineTier ? window._mineTier() : 0)] || 'lq1'; S.herbs[_hk] = (S.herbs[_hk]|0) + 1; } got.push('草药×' + st.h); st.h = 0; } // v1038 草药逐株入字典（矿区档位掷骰）
    if ((st.o|0) > 0) { S.ores = S.ores || {}; S.ores.sp1 = (S.ores.sp1|0) + st.o; got.push('矿石×' + st.o); st.o = 0; }
    if ((st.v|0) > 0) { if (!Array.isArray(S.veins) || S.veins.length < 3) S.veins = [0, 0, 0]; const _vt2 = Math.min(2, Math.max(0, st.vt|0)); S.veins[_vt2] = (S.veins[_vt2]|0) + (st.v|0); got.push('灵脉×' + st.v); st.v = 0; } // v1038 灵脉入 S.veins
    if ((st.m|0) > 0) { S.food = S.food || {}; S.food.rabbit = (S.food.rabbit|0) + (st.m|0); got.push('肉×' + st.m); st.m = 0; } // v1038 肉入 food.rabbit（与迁移口径一致）
    if ((st.e|0) > 0) { S.petEggs = (S.petEggs|0) + (st.e|0); got.push('蛋×' + st.e); st.e = 0; } // v1038 蛋入 petEggs 计数，不动 eggs 字典
    if (got.length) log('good', `📦 从采集阵收取：${got.join('、')}`);
    else log('sys', '阵内空空如也');
    commit(); window.arrayPanel(id);
  } catch(e) {}
};
window.toggleGuard = function(id) {
  try {
    const a = (S.arrays || []).find(v => v.id === id);
    if (!a) return;
    if ((S.realm|0) < 5) { log('bad', '需要化神以上'); return; }
    a.guarded = !a.guarded;
    if (a.guarded) {
      // 存守卫人属性（以后别人帮忙看时用别人的）
      try { a.guardPow = (typeof C !== 'undefined' && C.total) ? C.total(S.attrs) : 1000; a.guardName = '你'; } catch(_) { a.guardPow = 1000; }
    } else { a.guardPow = 0; }
    log('good', a.guarded ? `🛡️ 神识坐阵(${a.x},${a.y})，破坏需对战神识+采集阵` : `🔓 已撤回神识`);
    commit(); window.arrayPanel(id);
  } catch(e) {}
};
window.destroyArray = function(id) {
  try {
    const idx = (S.arrays || []).findIndex(v => v.id === id);
    if (idx < 0) return;
    const a = S.arrays[idx];
    if (!confirm(`确定拆除(${a.x},${a.y})的采集阵？库存将自动收取。`)) return;
    // 自动收取库存
    const st = a.storage || {};
 // v1038 自愈旧污染：草药/蛋被误存为数字时先转回正道
    if (typeof S.herbs === 'number' && S.herbs > 0) S.herbs = { lq1: S.herbs|0 };
    if (typeof S.eggs === 'number' && S.eggs > 0) { S.petEggs = (S.petEggs|0) + (S.eggs|0); S.eggs = {}; }

    if ((st.h|0) > 0) { if (!S.herbs || typeof S.herbs !== 'object') S.herbs = {}; for (let _hi = 0; _hi < (st.h|0); _hi++) { const _hk = ['lq1', 'lq2', 'lq3'][(window._mineTier ? window._mineTier() : 0)] || 'lq1'; S.herbs[_hk] = (S.herbs[_hk]|0) + 1; } } // v1038 草药逐株入字典
    if ((st.o|0) > 0) { S.ores = S.ores || {}; S.ores.sp1 = (S.ores.sp1|0) + st.o; }
    if ((st.v|0) > 0) { if (!Array.isArray(S.veins) || S.veins.length < 3) S.veins = [0, 0, 0]; const _vt3 = Math.min(2, Math.max(0, st.vt|0)); S.veins[_vt3] = (S.veins[_vt3]|0) + (st.v|0); } // v1038 灵脉入 S.veins
    if ((st.m|0) > 0) { S.food = S.food || {}; S.food.rabbit = (S.food.rabbit|0) + (st.m|0); } // v1038 肉入 food.rabbit
    if ((st.e|0) > 0) S.petEggs = (S.petEggs|0) + (st.e|0); // v1038 蛋入 petEggs 计数
    S.arrays.splice(idx, 1);
    S.formations = S.formations || {}; const _rt = Math.min(3, Math.max(1, a.tier | 0 || 1)); S.formations[_rt === 1 ? 'f_gather' : _rt === 2 ? 'f_gather2' : 'f_gather3'] = (S.formations[_rt === 1 ? 'f_gather' : _rt === 2 ? 'f_gather2' : 'f_gather3'] | 0) + 1; // v1128 拆阵按档退回
    log('good', `💥 采集阵已拆除，库存已收取，${['', '小型', '中型', '大型'][_rt]}采集阵已退回`);
    commit(); closeSheet(); renderWorldMap();
  } catch(e) {}
};
function reserveTick(S) { // 草药/矿石每分钟+1 上限99；灵脉按大小刷新：小型1分钟/中型10分钟/巨型30分钟一条（v1007）
  const now = Date.now();
  if (!S.reserveNode) S.reserveNode = { h: 0, o: 0, v: 0, vt: 0, t: now };
  const rn = S.reserveNode;
  if (!rn.t) rn.t = now; else if (rn.t > now) rn.t = now; // 兼容旧存档
  if (!Array.isArray(rn.vs)) { rn.vs = [(rn.v|0), 0, 0]; rn.vAcc = [0, 0, 0]; rn.vTickT = rn.t; } // v1007 旧库存折算为小型
  if (!Array.isArray(rn.vAcc)) rn.vAcc = [0, 0, 0];
  if (!rn.vTickT || rn.vTickT > now) rn.vTickT = now;
  const vmins = (now - rn.vTickT) / 60000;
  if (vmins > 0) {
    rn.vTickT = now;
    rn.vAcc[0] += vmins; rn.vAcc[1] += vmins / 10; rn.vAcc[2] += vmins / 30;
    for (let _t = 0; _t < 3; _t++) { const _add = Math.floor(rn.vAcc[_t]); if (_add > 0) { rn.vs[_t] = Math.min(99, (rn.vs[_t]|0) + _add); rn.vAcc[_t] -= _add; if (rn.vs[_t] >= 99) rn.vAcc[_t] = 0; } }
    rn.v = (rn.vs[0]|0) + (rn.vs[1]|0) + (rn.vs[2]|0);
  }
  const mins = Math.floor((now - rn.t) / 60000);
  if (mins <= 0) return;
  rn.h = Math.min(99, (rn.h|0) + mins);
  rn.o = Math.min(99, (rn.o|0) + mins);
  rn.t += mins * 60000;
}
function reserveHas(S) {
  if (!S || !S.reserveNode) return false;
  reserveTick(S);
  return (S.reserveNode.h > 0 || S.reserveNode.o > 0 || (S.reserveNode.v | 0) > 0); // v538
}
// v540 田药园(3,2)：草药刷新
function herbTick(S) { // v666 叠加：每分钟+1株，上限99
  const now = Date.now();
  if (!S.herbGarden) S.herbGarden = { h: 0, t: now };
  const hg = S.herbGarden;
  if (!hg.t) hg.t = now; else if (hg.t > now) hg.t = now;
  const mins = Math.floor((now - hg.t) / 60000);
  if (mins <= 0) return;
  hg.h = Math.min(99, (hg.h|0) + mins);
  hg.t += mins * 60000;
}
function herbHas(S) {
  if (!S || !S.herbGarden) return false;
  herbTick(S);
  return (S.herbGarden.h > 0);
}
// v1002 草药品阶配色：地品蓝 / 天品黄 / 仙品红（Ye 定）
window._herbHtml = function(key, name) {
  const c = { lq1: '#6db3ff', lq2: '#ffd94d', lq3: '#ff5f57' }[key];
  const n = name || ({ lq1: '地品灵草', lq2: '天品灵草', lq3: '仙品灵草' })[key] || key;
  return c ? '<b style="color:' + c + '">' + n + '</b>' : n;
};
window.doHerbGather = async function() { // v666 一次采1株
  // v966 彻底版：登录在线时走服务端
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const resp = await MHXY.api('/api/roll/herb_garden', {method:'POST', body:{}});
      const j = resp && resp.json;
      if (resp.ok && j && j.ok) {
        if (!S.herbs) S.herbs = {};
        S.herbs[j.key] = (S.herbs[j.key]|0) + 1;
        if (S.herbGarden) S.herbGarden.h = Math.max(0, (S.herbGarden.h|0) - 1);
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        const hn = window._herbHtml(j.key);
        log('good', `🌱 在田药园采集：${hn}×1（剩余${S.herbGarden ? S.herbGarden.h|0 : 0}株）`);
        thunderGatherJudge();
        commit(); renderWorldMap(); openHerbSheet();
        if (typeof toastLog === 'function') toastLog('good', `采集${hn}×1`);
        return;
      }
      if ((j||{}).error === 'no_herb' || !resp.netErr) { if (typeof toastLog === 'function') toastLog('sys', '草药还未长好'); return; }
    } catch(e) { /* 回落本地 */ }
  }
  // v540 采集田药园；v542 免费
  herbTick(S);
  const hg = S.herbGarden;
  if ((hg.h|0) <= 0) { if (typeof toastLog === 'function') toastLog('sys', '草药还未长好'); return; }
  const hk = Math.random() < 0.7 ? 'lq1' : 'lq2'; // 地品灵草/天品灵草
  if (!S.herbs) S.herbs = {};
  S.herbs[hk] = (S.herbs[hk]|0) + 1;
  hg.h--;
  const hn = window._herbHtml(hk);
  log('good', `🌱 在田药园采集：${hn}×1（剩余${hg.h}株）`);
  thunderGatherJudge(); // v718 采集触发雷云判定
  commit(); renderWorldMap(); openHerbSheet();
  if (typeof toastLog === 'function') toastLog('good', `采集${hn}×1`);
}; // v540
window.gatherProgWrap = function(txt, fn) { // v717 田药园/灵脉矿区采集进度条
  try {
    const _gp = document.getElementById('gatherProg'), _gb = document.getElementById('gatherProgBar'), _gt = document.getElementById('gatherProgTxt');
    if (_gp && _gb) {
      _gp.style.display = 'block'; _gb.style.width = '0%';
      if (_gt) _gt.textContent = txt || '采集中……';
      let _p = 0;
      const _iv = setInterval(() => {
        _p += 10;
        if (_gb) _gb.style.width = Math.min(100, _p) + '%';
        if (_p >= 100) { clearInterval(_iv); if (_gp) _gp.style.display = 'none'; fn(); }
      }, 80);
    } else { fn(); }
  } catch(_) { fn(); }
};
window.gatherProgWrapRand = function(txt, fn, durationMs) { // v721 随机时长进度条（自动采集用）
  try {
    const _gp = document.getElementById('gatherProg'), _gb = document.getElementById('gatherProgBar'), _gt = document.getElementById('gatherProgTxt');
    if (_gp && _gb) {
      _gp.style.display = 'block'; _gb.style.width = '0%';
      if (_gt) _gt.textContent = txt || '采集中……';
      const _steps = 50, _iv_ms = Math.max(20, (durationMs || 3000) / _steps);
      let _p = 0;
      const _iv = setInterval(() => {
        _p += 100 / _steps;
        if (_gb) _gb.style.width = Math.min(100, _p) + '%';
        if (_p >= 100) { clearInterval(_iv); if (_gp) _gp.style.display = 'none'; fn(); }
      }, _iv_ms);
    } else { fn(); }
  } catch(_) { fn(); }
};
window._autoGather = window._autoGather || { active: false, timer: null, type: null }; // v720/v733 自动采集状态
window.toggleAutoGather = function(type) { // v720 自动采集开关；v733 极简重写
  if (window._autoGather.active) {
    try { clearTimeout(window._autoGather.timer); } catch(_){}
    try { const _gp = document.getElementById('gatherProg'); if (_gp) _gp.style.display = 'none'; } catch(_){}
    window._autoGather.active = false;
    window._autoGather.timer = null;
    window._autoGather.type = null;
    try { if (type === 'herb') openHerbSheet(); else if (type === 'ranch') openRanchSheet(); else openReserveSheet(); } catch(_){}
    return;
  }
  let _ok = false;
  try { _ok = confirm('开启自动采集？每2～5秒随机自动采集1个，资源采完或雷劫到来时自动停止，可随时手动关闭。'); } catch(_) { _ok = true; }
  if (!_ok) return;
  window._autoGather.active = true;
  window._autoGather.type = type;
  const _doOne = () => {
    if (!window._autoGather.active) return;
    if (typeof S !== 'undefined' && S && S.thunderOk) { window.toggleAutoGather(type); return; }
    let _fn = null, _txt = '';
    try {
      if (type === 'herb') { herbTick(S); if ((S.herbGarden.h|0) > 0) { _fn = doHerbGather; _txt = '采药中……（自动）'; } }
      else if (type === 'ranch') { // v799 养殖园自动；v809 改随机：肉/蛋随机收
        try { if (typeof ranchTick === 'function') ranchTick(S); } catch(_) {}
        const _rr = S.ranch || {};
        const _hasM = (_rr.m|0) > 0, _hasE = (_rr.e|0) > 0;
        if (_hasM && _hasE) {
          if (Math.random() < 0.5) { _fn = doRanchHunt; _txt = '打猎中……（自动）'; }
          else { _fn = doRanchPatrol; _txt = '巡视中……（自动）'; }
        }
        else if (_hasM) { _fn = doRanchHunt; _txt = '打猎中……（自动）'; }
        else if (_hasE) { _fn = doRanchPatrol; _txt = '巡视中……（自动）'; }
      }
      else {
        reserveTick(S); const _rn = S.reserveNode;
        if ((_rn.h|0) > 0) { _fn = doReserveHerb; _txt = '采草药中……（自动）'; }
        else if ((_rn.o|0) > 0) { _fn = doReserveOre; _txt = '挖矿中……（自动）'; }
        else if ((_rn.v|0) > 0) { _fn = doReserveVein; _txt = '采灵脉中……（自动）'; }
      }
    } catch(_){}
    if (!_fn) {
      window.toggleAutoGather(type);
      try { if (typeof toastLog === 'function') toastLog('sys', '资源已采完，自动采集停止'); } catch(_){}
      return;
    }
    // 显示进度条（纯视觉，CSS过渡）
    try {
      const _gp = document.getElementById('gatherProg'), _gb = document.getElementById('gatherProgBar'), _gt = document.getElementById('gatherProgTxt');
      if (_gp && _gb) {
        const _delay = 2000 + Math.random() * 3000;
        _gp.style.display = 'block';
        _gb.style.transition = 'none'; _gb.style.width = '0%';
        if (_gt) _gt.textContent = _txt;
        // 强制重排后启动过渡
        void _gb.offsetWidth;
        _gb.style.transition = `width ${_delay}ms linear`; _gb.style.width = '100%';
        window._autoGather.timer = setTimeout(() => {
          try { if (_gp) _gp.style.display = 'none'; } catch(_){}
          if (!window._autoGather.active) return;
          try { _fn(); } catch(_){}
          if (!window._autoGather.active) return;
          window._autoGather.timer = setTimeout(_doOne, 500);
        }, _delay);
      } else {
        try { _fn(); } catch(_){}
        if (window._autoGather.active) window._autoGather.timer = setTimeout(_doOne, 2500);
      }
    } catch(_) {
      try { _fn(); } catch(_){}
      if (window._autoGather.active) window._autoGather.timer = setTimeout(_doOne, 2500);
    }
  };
  _doOne();
  try { if (type === 'herb') openHerbSheet(); else openReserveSheet(); } catch(_){}
};
window.thunderGatherJudge = function() { // v718 采集触发雷云判定（田药园/灵脉矿区）
  thunderJudgeWithProb(0.10);
};
window.thunderJudgeWithProb = function(baseP) { // v741 可调概率的雷云判定（赌石用）
  try {
    if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) {
      S._trigFail = S._trigFail|0; S._succFail = S._succFail|0;
      const _bp = (typeof baseP === 'number' && baseP > 0) ? baseP : 0.10;
      const _trigP = Math.min(1, _bp + 0.10*S._trigFail);
      if (Math.random() < _trigP) {
        S._trigFail = 0;
        const _scenes = [['微风忽起，落叶打旋','天色微暗','远处闷雷一声'],['灵气躁动，飞鸟惊散','乌云聚顶，云层压得很低','雷声滚滚，由远及近'],['草木低伏，虫鸣骤止','劫云翻涌，云中有电光游走','雷声震耳，地面微颤'],['空气粘稠，呼吸不畅','金色雷纹在云中若隐若现','雷声如鼓，声声催心'],['灵气倒卷，阵法纹路浮现','云层裂开，白光倾泻','虚空嗡鸣，如大道低语'],['十里之内，鸟兽绝迹','雷光如瀑，倾天而下','威压先至，骨骼作响'],['天地灵气一空','云开一线，天眼似开','万籁俱寂，只闻心跳'],['凡尘涤荡，浊气尽散','雷柱接天，直贯九霄','天道之音，响彻神魂'],['仙器共鸣，嗡嗡作响','九彩劫云，遮天蔽日','法则碎片，四散飞溅'],['小世界灵气被抽空','虚空裂缝，蔓延天际','空间涟漪，层层荡开'],['数个小世界震动','劫云蔽星，日月无光','法则碰撞，星火四溅'],['三千世界战栗','灭世洪流，席卷星海','雷威吞声，万物噤声']];
        const _sc = _scenes[Math.min(11, S.realm|0)] || _scenes[0];
        if (window.TRIB_OMEN) window.TRIB_OMEN.show(S); log('warn', '🌩️ '+_sc[0]+'。'+_sc[1]+'。'+_sc[2]+'……<br>雷云判定中……');
        const _succP = Math.min(1, 0.01 + 0.01*S._succFail);
        if (Math.random() < _succP) {
          S.thunderOk = true; S._succFail = 0; S._trigFail = 0;
          log('good', '⚡ <b class="r">天道已将你锁定</b>——雷劫将至，生死只在一线之间！<br>速速调整状态，迎接天威洗礼！<br>⚡ 突破契机已到，随时可破');
          commit();
        } else {
          S._succFail++;
          log('info', '<span style="filter:brightness(0)">🌫️</span> 雷云缓缓散去，天威渐消……<br><span style="color:#888">看来火候未到，天道还未注意到你。继续修炼吧。</span>');
        }
      } else { S._trigFail++; }
    }
  } catch(_){}
};
// v541 养殖园(2,0)：肉和蛋
function ranchTick(S) { // v666 叠加：每分钟肉/蛋各+1，上限99
  const now = Date.now();
  if (!S.ranch) S.ranch = { m: 0, e: 0, t: now };
  const r = S.ranch;
  if (!r.t) r.t = now; else if (r.t > now) r.t = now;
  const mins = Math.floor((now - r.t) / 60000);
  if (mins <= 0) return;
  r.m = Math.min(99, (r.m|0) + mins);
  r.e = Math.min(99, (r.e|0) + mins);
  r.t += mins * 60000;
}
function ranchHas(S) {
  if (!S || !S.ranch) return false;
  ranchTick(S);
  return (S.ranch.m > 0 || S.ranch.e > 0);
}
window.doRanchGather = function() {
  // v542 免费
  const r = S.ranch;
  if (r.m <= 0 && r.e <= 0) { if (typeof toastLog === 'function') toastLog('sys', '还未产出'); return; }
  // 肉：随机种类存S.food
  const meatKeys = Object.keys(C.MEATS || {});
  for (let i = 0; i < r.m; i++) {
    const k = meatKeys[Math.floor(Math.random() * meatKeys.length)];
    if (k) { if (!S.food) S.food = {}; S.food[k] = (S.food[k] | 0) + 1; }
  }
  // 蛋：随机种类存S.eggs
  const eggKeys = Object.keys(C.EGGS || {});
  for (let i = 0; i < r.e; i++) {
    const k = eggKeys[Math.floor(Math.random() * eggKeys.length)];
    if (k) { if (!S.eggs) S.eggs = {}; S.eggs[k] = (S.eggs[k] | 0) + 1; }
  }
  const mn = r.m, en = r.e; r.m = 0; r.e = 0;
  log('good', `🥚 在养殖园收获：肉×${mn}、蛋×${en}`);
  commit(); renderWorldMap();
  if (typeof toastLog === 'function') toastLog('good', `收获成功：肉×${mn} 蛋×${en}`);
}; // v541
// v1001 矿区三档：一档(金丹-)60% / 二档(元婴+)30% / 三档(仙人+)10%，未解锁落回最高已解锁档
window._mineTier = function() {
  const r = Math.random();
  let t = r < 0.6 ? 0 : r < 0.9 ? 1 : 2;
  const mx = (S.realm|0) >= 8 ? 2 : (S.realm|0) >= 4 ? 1 : 0;
  return Math.min(t, mx);
};
window.doReserveHerb = async function() { // v558 采草药；v666 一次采1株
  // v962 彻底版：登录在线时走服务端掷骰发放（系统记账，不限流）；网络失败/未登录回落本地逻辑
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const r = await MHXY.api('/api/roll/gather', {method:'POST', body:{from:'reserve'}});
      const j = r && r.json;
      if (r.ok && j && j.key) {
        if (!S.herbs) S.herbs = {};
        S.herbs[j.key] = (S.herbs[j.key]|0) + 1;
        if (S.reserveNode) S.reserveNode.h = j.remaining;
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        log('good', `🌿 在灵脉矿区采集：${window._herbHtml(j.key)}×1（剩余${j.remaining}株）`);
        thunderGatherJudge();
        commit(); renderWorldMap(); openReserveSheet();
        if (typeof toastLog === 'function') toastLog('good', `采集${window._herbHtml(j.key)}×1`);
        return;
      }
      if (j && j.error === 'no_herb') { if (typeof toastLog === 'function') toastLog('sys', '没有草药'); return; }
      if (r.status === 401) { /* 登录过期，回落本地 */ }
      else if (!r.netErr) { return; } // 服务端已响应（限流/冲突等），不回落，避免重复记账
    } catch(e) { /* 网络失败，回落本地 */ }
  }
  reserveTick(S);
  const rn = S.reserveNode;
  if ((rn.h|0) <= 0) { if (typeof toastLog === 'function') toastLog('sys', '没有草药'); return; }
  const hk = ['lq1', 'lq2', 'lq3'][window._mineTier()]; // v1001 三档
  if (!S.herbs) S.herbs = {};
  S.herbs[hk] = (S.herbs[hk]|0) + 1;
  rn.h--;
  const hn = window._herbHtml(hk);
  log('good', `🌿 在灵脉矿区采集：${hn}×1（剩余${rn.h}株）`);
  thunderGatherJudge(); // v718 采集触发雷云判定
  commit(); renderWorldMap(); openReserveSheet();
  if (typeof toastLog === 'function') toastLog('good', `采集${hn}×1`);
};
window.doReserveOre = async function() { // v558 挖矿石；v666 一次挖1块
  // v962 彻底版：登录在线时走服务端掷骰发放（系统记账，不限流）；网络失败/未登录回落本地逻辑
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const r = await MHXY.api('/api/roll/mine', {method:'POST', body:{}});
      const j = r && r.json;
      if (r.ok && j && j.key) {
        if (!S.ores) S.ores = {};
        S.ores[j.key] = (S.ores[j.key]|0) + 1;
        if (S.reserveNode) S.reserveNode.o = j.remaining;
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        log('good', `⛏️ 在灵脉矿区采集：${j.name}×1（剩余${j.remaining}块）`);
        thunderGatherJudge();
        commit(); renderWorldMap(); openReserveSheet();
        if (typeof toastLog === 'function') toastLog('good', `采集${window._herbHtml(j.key, j.name)}×1`);
        return;
      }
      if (j && j.error === 'no_ore') { if (typeof toastLog === 'function') toastLog('sys', '没有矿石'); return; }
      if (r.status === 401) { /* 登录过期，回落本地 */ }
      else if (!r.netErr) { return; } // 服务端已响应（限流/冲突等），不回落，避免重复记账
    } catch(e) { /* 网络失败，回落本地 */ }
  }
  reserveTick(S);
  const rn = S.reserveNode;
  if ((rn.o|0) <= 0) { if (typeof toastLog === 'function') toastLog('sys', '没有矿石'); return; }
  const _opool = [['iron', 'copper'], ['silver', 'gold'], ['sp1', 'sp2', 'sp3']][window._mineTier()]; // v1001 三档
  const k = _opool[Math.floor(Math.random() * _opool.length)];
  let knm = '矿石';
  if (k) { if (!S.ores) S.ores = {}; S.ores[k] = (S.ores[k]|0) + 1; knm = (C.ORES[k] && C.ORES[k].name) || k; }
  rn.o--;
  log('good', `⛏️ 在灵脉矿区采集：${knm}×1（剩余${rn.o}块）`);
  thunderGatherJudge(); // v718 采集触发雷云判定
  commit(); renderWorldMap(); openReserveSheet();
  if (typeof toastLog === 'function') toastLog('good', `采集${knm}×1`);
};
window._veinYield = function(t) { // 灵脉产出表：小型 sp1/sp2/sp3、中型 sp3/sp4/sp5 均匀三选一；巨型 上品45%/极品35%/仙玉20%（仙玉概率最低）；成功返回产出名，背包满返回 null
  const pools = [['sp1', 'sp2', 'sp3'], ['sp3', 'sp4', 'sp5']];
  let k;
  if (t === 2) { const _x = Math.random(); k = _x < 0.45 ? 'sp4' : _x < 0.80 ? 'sp5' : 'xy'; }
  else k = pools[t][Math.floor(Math.random() * 3)];
  if (k === 'xy') { S.xianyu = (S.xianyu|0) + 1; return '仙玉×1'; }
  const added = C.gainItem(S, 'ores', k, 1);
  if (added <= 0) return null;
  return C.ORES[k].name + '×1';
};
window.doEatVein = function(t) { // v1003 吃灵脉（存量灵脉道具，产出同 _veinYield）
  try {
    if (!S.veins) S.veins = [0, 0, 0];
    if ((S.veins[t]|0) <= 0) { if (typeof toastLog === 'function') toastLog('sys', '没有这条灵脉'); return; }
    const got = window._veinYield(t);
    if (got === null) { if (typeof toastLog === 'function') toastLog('sys', '背包已满'); return; }
    S.veins[t]--;
    const names = ['小型灵脉', '中型灵脉', '巨型灵脉'];
    log('good', `💎 吃下${names[t]}：得 ${got}`);
    if (typeof toastLog === 'function') toastLog('good', `吃下${names[t]}：${got}`);
    commit(); if (typeof sheetBag === 'function') sheetBag(); // v1125 矿区删除，吃灵脉改在背包
  } catch(_) {}
};
window._veinGate = function(t) { return t === 0 || (S.realm|0) >= (t === 1 ? 4 : 8); }; // v1007 中型元婴可采、巨型仙人可采
window._autoVeinTier = function() { try { reserveTick(S); const rn = S.reserveNode; if (!rn || !Array.isArray(rn.vs)) return -1; for (const t of [2, 1, 0]) { if ((rn.vs[t]|0) > 0 && window._veinGate(t)) return t; } } catch(_) {} return -1; };
window.doReserveVein = async function(t) { // v558 采灵脉；v1007 按大小采集
  const _want = (typeof t === 'number') ? t : window._autoVeinTier();
  if (_want >= 0 && !window._veinGate(_want)) { if (typeof toastLog === 'function') toastLog('sys', _want === 1 ? '元婴境方可采中型灵脉' : '仙人境方可采巨型灵脉'); return; }
  // v966 彻底版：登录在线时走服务端
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const resp = await MHXY.api('/api/roll/vein', {method:'POST', body:{tier: _want}});
      const j = resp && resp.json;
      if (resp.ok && j && j.ok) {
        const veinNames = ['小型灵脉', '中型灵脉', '巨型灵脉'];
        const vtn = Math.max(0, (typeof j.key === 'number') ? (j.key|0) : _want);
        const got = window._veinYield(vtn); // v1005 采灵脉直接出灵石/仙玉
        if (got === null) { if (typeof toastLog === 'function') toastLog('sys', '背包已满'); return; }
        if (S.reserveNode) { const _rn = S.reserveNode; if (!Array.isArray(_rn.vs)) _rn.vs = [_rn.v|0, 0, 0]; const _dt = ((_rn.vs[vtn]|0) > 0) ? vtn : _want; if (_dt >= 0 && (_rn.vs[_dt]|0) > 0) _rn.vs[_dt]--; _rn.v = (_rn.vs[0]|0) + (_rn.vs[1]|0) + (_rn.vs[2]|0); }
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        log('good', `💎 在灵脉矿区采集：${veinNames[vtn]} → ${got}（剩余${S.reserveNode ? S.reserveNode.v|0 : 0}条）`);
        thunderGatherJudge();
        commit(); renderWorldMap(); openReserveSheet();
        if (typeof toastLog === 'function') toastLog('good', `采${veinNames[vtn]}：${got}`);
        return;
      }
      if ((j||{}).error === 'no_vein' || !resp.netErr) { if (typeof toastLog === 'function') toastLog('sys', '没有灵脉'); return; }
    } catch(e) { /* 回落本地 */ }
  }
  reserveTick(S);
  const rn = S.reserveNode;
  if (!Array.isArray(rn.vs)) rn.vs = [rn.v|0, 0, 0];
  const vtn = (typeof t === 'number') ? t : window._autoVeinTier();
  if (vtn < 0 || (rn.vs[vtn]|0) <= 0) { if (typeof toastLog === 'function') toastLog('sys', '没有灵脉'); return; }
  const veinNames = ['小型灵脉', '中型灵脉', '巨型灵脉'];
  const got = window._veinYield(vtn); // v1005 直接出货
  if (got === null) { if (typeof toastLog === 'function') toastLog('sys', '背包已满'); return; }
  rn.vs[vtn]--; rn.v = (rn.vs[0]|0) + (rn.vs[1]|0) + (rn.vs[2]|0);
  log('good', `💎 在灵脉矿区采集：${veinNames[vtn]} → ${got}（该档剩余${rn.vs[vtn]}条）`);
  thunderGatherJudge(); // v718 采集触发雷云判定
  commit(); renderWorldMap(); openReserveSheet();
  if (typeof toastLog === 'function') toastLog('good', `采${veinNames[vtn]}：${got}`);
};
// v666 三区采集面板（逐个采集，采后刷新数量）
window.openReserveSheet = function() {
  try {
    reserveTick(S); const rn = S.reserveNode;
    const _vn = ['小型灵脉','中型灵脉','巨型灵脉'];
    const vtxt = (rn.v|0) > 0 ? '灵脉×' + rn.v : '无';
    openSheet(`<h2>⛏️ 灵脉矿区</h2><div class="hint">草药矿石每分钟生长 · 灵脉按大小刷新 · 免费逐个采集</div><div class="grid2"><button class="btn gold" onclick="gatherProgWrap('采草药中……',doReserveHerb)" ${(rn.h|0)>0?'':'disabled'}>🌿 采草药<br><small>剩余×${rn.h|0}</small></button><button class="btn gold" onclick="gatherProgWrap('挖矿中……',doReserveOre)" ${(rn.o|0)>0?'':'disabled'}>⛏️ 挖矿石<br><small>剩余×${rn.o|0}</small></button></div>${[0, 1, 2].map(t => { const _cnt = (rn.vs && rn.vs[t])|0; const _gate = t === 0 || (S.realm|0) >= (t === 1 ? 4 : 8); const _cyc = ['每分钟刷新', '每10分钟刷新', '每半小时刷新'][t]; return `<div class="row"><div class="lab">${['💎 小型灵脉', '💎 中型灵脉', '💎 巨型灵脉'][t]}<small>${_cyc} · 剩余×${_cnt}${_gate ? '' : (t === 1 ? ' · 元婴可采' : ' · 仙人可采')}</small></div><button class="btn gold" onclick="gatherProgWrap('开采中……',function(){doReserveVein(${t})})" ${(_cnt > 0 && _gate) ? '' : 'disabled'}>开采</button></div>`; }).join('')}${((S.veins||[]).some(v => (v|0) > 0)) ? '<div class="hint" style="margin-top:6px">💎 我的灵脉（吃下出灵石，巨型可出仙玉）</div>' + [0, 1, 2].map(t => `<div class="row"><div class="lab">${['小型灵脉', '中型灵脉', '巨型灵脉'][t]}<small>持有 ×${(S.veins && S.veins[t])|0}</small></div><button class="btn gold" onclick="doEatVein(${t})">吃</button></div>`).join('') : ''}<button class="btn full" onclick="toggleAutoGather('reserve')">${(window._autoGather.active && window._autoGather.type==='reserve') ? '⏸️ 停止自动采集' : '▶️ 自动采集（2～5秒随机）'}</button>${(S.formations&&((S.formations.f_gather|0)+(S.formations.f_gather2|0)+(S.formations.f_gather3|0))>0) && !(S.arrays||[]).some(a=>a.map==='world'&&a.x===4&&a.y===3) ? '<button class="btn gold full" onclick="window.placeArray(4,3)">🧭 放置采集阵<br><small>上品灵石驱动自动采集（神识可坐阵守卫）</small></button>' : ''}${(S.arrays||[]).some(a=>a.map==='world'&&a.x===4&&a.y===3) ? `<button class="btn full" onclick="window.arrayPanel(${(S.arrays||[]).find(a=>a.map==='world'&&a.x===4&&a.y===3).id})">🧭 管理采集阵</button>` : ''}<button class="btn full" data-a="close">关闭</button>`);
  } catch(_) {}
};
window.openHerbSheet = function() {
  try {
    herbTick(S); const hg = S.herbGarden;
    openSheet(`<h2>🌱 田药园</h2><div class="hint">每分钟生长1株，上限99 · 免费逐个采集</div><button class="btn gold full" onclick="gatherProgWrap('采药中……',doHerbGather)" ${(hg.h|0)>0?'':'disabled'}>🌱 采1株<br><small>剩余×${hg.h|0}</small></button><button class="btn full" onclick="toggleAutoGather('herb')">${(window._autoGather.active && window._autoGather.type==='herb') ? '⏸️ 停止自动采集' : '▶️ 自动采集（2～5秒随机）'}</button>${(S.formations&&((S.formations.f_gather|0)+(S.formations.f_gather2|0)+(S.formations.f_gather3|0))>0) && !(S.arrays||[]).some(a=>a.map==='world'&&a.x===3&&a.y===2) ? '<button class="btn gold full" onclick="window.placeArray(3,2)">🧭 放置采集阵<br><small>上品灵石驱动自动采集（神识可坐阵守卫）</small></button>' : ''}${(S.arrays||[]).some(a=>a.map==='world'&&a.x===3&&a.y===2) ? `<button class="btn full" onclick="window.arrayPanel(${(S.arrays||[]).find(a=>a.map==='world'&&a.x===3&&a.y===2).id})">🧭 管理采集阵</button>` : ''}<button class="btn full" data-a="close">关闭</button>`);
  } catch(_) {}
};
window.openRanchSheet = function() {
  try {
    ranchTick(S); const r = S.ranch;
    openSheet(`<h2>🥚 养殖园</h2><div class="hint">每分钟肉/蛋各产出1个，上限99 · 免费逐个收获</div><div class="grid2"><button class="btn gold" onclick="doRanchHunt()" ${(r.m|0)>0?'':'disabled'}>🏹 打猎<br><small>收1块肉（剩余×${r.m|0}）</small></button><button class="btn gold" onclick="doRanchPatrol()" ${(r.e|0)>0?'':'disabled'}>🔍 巡视<br><small>收1枚蛋（剩余×${r.e|0}）</small></button></div><button class="btn full" onclick="toggleAutoGather('ranch')">${(window._autoGather.active && window._autoGather.type==='ranch') ? '⏸️ 停止自动收获' : '▶️ 自动收获（2～5秒随机）'}</button>${(S.formations&&((S.formations.f_gather|0)+(S.formations.f_gather2|0)+(S.formations.f_gather3|0))>0) && !(S.arrays||[]).some(a=>a.map==='world'&&a.x===2&&a.y===0) ? '<button class="btn gold full" onclick="window.placeArray(2,0)">🧭 放置采集阵<br><small>上品灵石驱动自动采集（神识可坐阵守卫）</small></button>' : ''}${(S.arrays||[]).some(a=>a.map==='world'&&a.x===2&&a.y===0) ? `<button class="btn full" onclick="window.arrayPanel(${(S.arrays||[]).find(a=>a.map==='world'&&a.x===2&&a.y===0).id})">🧭 管理采集阵</button>` : ''}<button class="btn full" data-a="close">关闭</button>`);
  } catch(_) {}
};
window.doRanchHunt = function() { // v666 一次收1块肉（修复v555未定义）
  ranchTick(S);
  const r = S.ranch;
  if ((r.m|0) <= 0) { if (typeof toastLog === 'function') toastLog('sys', '还没有肉'); return; }
  const meatKeys = Object.keys(C.MEATS || {});
  const k = meatKeys[Math.floor(Math.random() * meatKeys.length)];
  let knm = '肉';
  if (k) { if (!S.food) S.food = {}; S.food[k] = (S.food[k]|0) + 1; knm = (C.MEATS[k] && C.MEATS[k].name) || k; }
  r.m--;
  log('good', `🥚 在养殖园收获：${knm}×1（剩余${r.m}块）`);
  try { if (typeof thunderRanch === 'function') thunderRanch(); } catch(_) {} // v809 养殖园收获触发雷云判定
  commit(); renderWorldMap(); openRanchSheet();
  if (typeof toastLog === 'function') toastLog('good', `收获${knm}×1`);
};
window.doRanchPatrol = function() { // v666 一次收1枚蛋（修复v555未定义）
  ranchTick(S);
  const r = S.ranch;
  if ((r.e|0) <= 0) { if (typeof toastLog === 'function') toastLog('sys', '还没有蛋'); return; }
  const eggKeys = Object.keys(C.EGGS || {});
  const k = eggKeys[Math.floor(Math.random() * eggKeys.length)];
  let knm = '蛋';
  if (k) { if (!S.eggs) S.eggs = {}; S.eggs[k] = (S.eggs[k]|0) + 1; knm = (C.EGGS[k] && C.EGGS[k].name) || k; }
  r.e--;
  log('good', `🥚 在养殖园收获：${knm}×1（剩余${r.e}枚）`);
  try { if (typeof thunderRanch === 'function') thunderRanch(); } catch(_) {} // v809 养殖园收获触发雷云判定
  commit(); renderWorldMap(); openRanchSheet();
  if (typeof toastLog === 'function') toastLog('good', `收获${knm}×1`);
};
// v543 地图NPC玩家
function npcPos(S) {
  const now = Date.now();
  S.npcs = { t: now, spots: [] }; return []; // v1108 地图 NPC 玩家已取消（Ye 令 2026-10-27）
  if (!S.npcs || now - (S.npcs.t | 0) > 60 * 1000) {
    const spots = [];
    const wm = S.worldMap || { px: 2, py: 3 };
    let guard = 0;
    while (spots.length < 5 && guard++ < 100) {
      const x = Math.floor(Math.random() * 6), y = Math.floor(Math.random() * 6);
      if (spots.some(s => s[0] === x && s[1] === y)) continue;
      spots.push([x, y]); // v549 允许与玩家同格
    }
    const _pool = (typeof AVATARS !== 'undefined') ? AVATARS.m.concat(AVATARS.f) : []; // v547 开局600头像
    const _surnames = ['李','王','张','刘','陈','杨','赵','黄','周','吴','徐','孙','林','郭','何','罗'];
    const _given = ['逍遥','青云','白羽','墨尘','凌霄','紫阳','天行','无痕','长风','明月','星河','云帆'];
    const _realms = ['凡人','练气','筑基','金丹','元婴'];
    S.npcs = { t: now, spots: spots.map(function(s, i){
      const _r = Math.floor(Math.random() * 5), _l = 1 + Math.floor(Math.random() * 10);
      const _av = _pool.length ? _pool[Math.floor(Math.random() * _pool.length)] : '';
      return [s[0], s[1], _av,
        _surnames[Math.floor(Math.random()*_surnames.length)] + _given[Math.floor(Math.random()*_given.length)],
        _r, _l, _realms[_r], _l * 2];
    }) }; // v545 NPC有名有境界；v547 用600头像；v937 NPC气息=2/级
  }
  return S.npcs.spots;
}
    const grid = document.getElementById('mapGrid'); if (!grid) return;
    if (typeof S !== 'undefined' && !S.worldMap) S.worldMap = { px: 2, py: 3 }; // v342 剑格中央
    if (typeof S !== 'undefined' && !S.furnaceDur) S.furnaceDur = { alc: 100, forge: 100, ding: 200 }; // v315 炉子耐久；v317 加丹鼎200
    const wm = (typeof S !== 'undefined' && S.worldMap) || { px: 2, py: 2 };
    try { // v666 主城移动触发雷云判定（成功率不叠加）
      if (typeof S !== 'undefined' && S) {
        if (window._wmLX === undefined) { window._wmLX = wm.px; window._wmLY = wm.py; }
        else if (window._wmLX !== wm.px || window._wmLY !== wm.py) {
          window._wmLX = wm.px; window._wmLY = wm.py;
          try { if (typeof MHXY !== 'undefined' && MHXY.loggedIn && MHXY.loggedIn()) MHXY.api('/api/world/heartbeat', { method:'POST', body:{ x: wm.px|0, y: wm.py|0 } }); } catch(_) {} // v1009 移动即报位置
          if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) {
            S._trigFail = S._trigFail|0;
            const _tp = Math.min(1, 0.10 + 0.10*S._trigFail);
            if (Math.random() < _tp) {
              S._trigFail = 0; S._succFail = S._succFail|0;
              const _sc=[['微风忽起，落叶打旋','天色微暗','远处闷雷一声'],['灵气躁动，飞鸟惊散','乌云聚顶，云层压得很低','雷声滚滚，由远及近'],['草木低伏，虫鸣骤止','劫云翻涌，云中有电光游走','雷声震耳，地面微颤'],['空气粘稠，呼吸不畅','金色雷纹在云中若隐若现','雷声如鼓，声声催心'],['灵气倒卷，阵法纹路浮现','云层裂开，白光倾泻','虚空嗡鸣，如大道低语'],['十里之内，鸟兽绝迹','雷光如瀑，倾天而下','威压先至，骨骼作响'],['天地灵气一空','云开一线，天眼似开','万籁俱寂，只闻心跳'],['凡尘涤荡，浊气尽散','雷柱接天，直贯九霄','天道之音，响彻神魂'],['仙器共鸣，嗡嗡作响','九彩劫云，遮天蔽日','法则碎片，四散飞溅'],['小世界灵气被抽空','虚空裂缝，蔓延天际','空间涟漪，层层荡开'],['数个小世界震动','劫云蔽星，日月无光','法则碰撞，星火四溅'],['三千世界战栗','灭世洪流，席卷星海','雷威吞声，万物噤声']]; const _s=_sc[Math.min(11,S.realm|0)]||_sc[0];
              if (window.TRIB_OMEN) window.TRIB_OMEN.show(S); log('warn',C.thunderCloud(S)+' '+_s[0]+'。'+_s[1]+'。'+_s[2]+'……<br>雷云判定中……');
              const _spm = Math.min(1, 0.01 + 0.01*S._succFail);
              if (Math.random() < _spm) { S.thunderOk = true; S._succFail = 0; S._trigFail = 0; log('good','⚡ <b class="r">天道已将你锁定</b>——雷劫将至，生死只在一线之间！<br>速速调整状态，迎接天威洗礼！<br>⚡ 突破契机已到，随时可破'); commit(); }
              else { S._succFail++; log('info','<span style="filter:brightness(0)">🌫️</span> 雷云缓缓散去，天威渐消……<br><span style="color:#888">看来火候未到，天道还未注意到你。继续修炼吧。</span>'); }
            } else { S._trigFail++; }
          }
        }
      }
    } catch(_){}
    const _npcs = (typeof S !== 'undefined' && typeof npcPos === 'function') ? npcPos(S) : [];
    const _plAt = {}; // v1009 真人玩家位置（同 NPC 一样画在地图上）
    try { (window._worldPlayers || []).forEach(function(p) { const _k = p.x + ',' + p.y; (_plAt[_k] = _plAt[_k] || []).push(p); }); } catch(_) {}
    let cells = '';
    for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) {
      const isP = x === wm.px && y === wm.py;
      const _npcHere = _npcs.find(function(s){ return s[0] === x && s[1] === y; }); const isNpc = !!_npcHere; // v543；v544 头像
      // v314 左上角炼丹炉/炼器炉
      const isFurnace = (x === 2 && y === 5) ? 'both_alc' : null; // v448 炼器炉并入炼丹房，(2,4)不再单独设炉
      const isArena = (x === 2 && y === 1) ? 'pk' : (x === 2 && y === 2) ? 'arena' : null; // v342 剑身上放PK和擂台
      const isPortal = (x === 5 && y === 3) ? true : false; // v344 传送阵
      const isShop = (x === 2 && y === 3) ? true : false; // v346 商会
      const isTrainPortal = (x === 0 && y === 3) ? true : false; // v397 修炼传送门
      const isStall = (x === 1 && y >= 1 && y <= 3) ? true : false; // v400 摆摊区
      const isCasino = (x === 3 && y === 1) ? true : false; // v410 赌场
      const isCultivate = (x === 1 && y === 5) ? true : false; // v452 修炼区
      const isCookRefine = (x === 2 && y === 4) ? true : false; // v458 灶台·点金台
      const isBeastGarden = (x === 3 && y === 3) ? true : false; // v465 兽园
      const isFormationTalisman = (x === 3 && y === 5) ? true : false; // v790 制阵室·画符台
      const isHerbGarden = (x === 3 && y === 2) ? true : false; // v540 田药园（v1125 Ye 定保留）
      const isRanch = (x === 2 && y === 0) ? true : false; // v541 养殖园：肉和蛋（v1125 Ye 定保留）
      const dur = (typeof S !== 'undefined' && S.furnaceDur) ? S.furnaceDur : { alc: 100, forge: 100, ding: 200 }; if (dur.ding == null) dur.ding = 200;
      const _npcQxG = _npcHere ? ((_npcHere[7]|0) || (_npcHere[5]*2)) : 999; const _mySSG = (typeof effShenshi === 'function' && typeof S !== 'undefined' && S) ? effShenshi(S) : 0; // v969 NPC格子图标神识判定，与信息栏v937一致
      const icon = isP ? `<img src="${(typeof avatarUrl === 'function' ? avatarUrl() : '')}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;display:block" onerror="this.outerHTML='🧑'">` : (isNpc && _npcHere[2] && _npcQxG <= _mySSG) ? `<img src="${_npcHere[2]}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;display:block" title="${(_npcHere[3]||'') + ' ' + (_npcHere[6]||'')}">` : isFurnace === 'both_alc' ? '<span style="font-size:20px">🏛️</span>' : isFurnace ? `<div style="display:flex;flex-direction:column;align-items:center"><span style="font-size:20px">🔨</span><span style="font-size:8px;color:var(--dim)">${dur[isFurnace]||100}/100</span></div>` : isArena === 'pk' ? '<span style="font-size:20px">⚔️</span>' : isArena === 'arena' ? '<span style="font-size:20px">🏟️</span>' : isPortal ? '<span style="font-size:20px">🌀</span>' : isShop ? '<span style="font-size:20px">🏪</span>' : isTrainPortal ? '<span style="font-size:20px">⛰️</span>' : isStall ? '<span style="font-size:20px">🎪</span>' : isCasino ? '<span style="font-size:20px">🎲</span>' : isCultivate ? '<span style="font-size:13px">☯️🪷🕉️⚡⛰️</span>' : isCookRefine ? '<span style="font-size:16px">🍳🪙</span>' : isBeastGarden ? '<span style="font-size:20px">🐾</span>' : isFormationTalisman ? '<span style="font-size:16px">🧭📜</span>' : isHerbGarden ? (herbHas(S) ? '<span style="font-size:20px">🌱</span>' : '⬜') : isRanch ? (ranchHas(S) ? '<span style="font-size:20px">🥚</span>' : '⬜') : '⬜'; // v1057 NPC全图显示（神识可见） // v540；v541 // v465 兽园 // v456 大殿只显示🏛️；v457 修炼区五图标；v458 灶台点金台；v790 阵符坊；v1125 灵脉矿区删除（资源搬到冒险图），田药园/养殖园保留
      const furnaceAttr = isFurnace && !isP ? ` data-furnace="${isFurnace}"` : '';
      const arenaAttr = isArena && !isP ? ` data-arena="${isArena}"` : '';
      if (!isSwordCell(x, y)) { cells += `<div style="aspect-ratio:1;visibility:hidden"></div>`; continue; }
      let _cellIcon = icon; // v892 化神分身在神识范围内资源点显示
      try {
        if ((S.realm|0) >= 5 && (isHerbGarden || isRanch) && !isP) {
          const _wm = S.worldMap || { px: 2, py: 3 };
          const _d = Math.max(Math.abs(x - _wm.px), Math.abs(y - _wm.py));
          if (_d >= 1 && _d <= 3) _cellIcon = `<div style="position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${icon}<span style="position:absolute;bottom:-2px;right:-2px;font-size:10px" title="化神分身可收取">👤</span></div>`;
        }
      } catch(_) {}
      try { // v899 采集阵显示（主城阵只剩田药园/养殖园）
        const _arr = (S.arrays || []).find(a => a.map === 'world' && a.x === x && a.y === y);
        if (_arr && !isP) {
          _cellIcon = `<div style="position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${_cellIcon}<span style="position:absolute;top:-2px;right:-2px;font-size:10px" title="采集阵${_arr.guarded ? '(神识守卫)' : ''}">🧭</span></div>`;
        }
      } catch(_) {}
      try {
        let _pl = _plAt[x + ',' + y];
        // v1057 真人玩家可见规则（Ye 定）：神识外放10秒内，相邻格子、气息<神识才可见；同格始终可见；v1070 主城区探查神识+100（Ye 定）
        if (_pl && _pl.length && !isP) {
          const _ssOn = Date.now() < (window._ssRevealUntil || 0);
          let _mySS = (typeof effShenshi === 'function' && typeof S !== 'undefined' && S) ? effShenshi(S) : 0;
          _mySS += 100; // v1070 主城区神识探查+100
          const _wmp = (typeof S !== 'undefined' && S.worldMap) || { px: 2, py: 3 };
          if (!_ssOn) { _pl = null; }
          else {
            const _d = Math.max(Math.abs(x - _wmp.px), Math.abs(y - _wmp.py));
            if (_d !== 1) { _pl = null; }
            else { _pl = _pl.filter(function(p){ return ((p.level|0) * 2) < _mySS; }); if (!_pl.length) _pl = null; }
          }
        }
        if (_pl && _pl.length) { if (isP) { _cellIcon = `<div style="position:relative;width:100%;height:100%">${_cellIcon}<span style="position:absolute;bottom:-2px;right:-2px;font-size:10px" title="同格道友：${_pl.map(function(p){ return String(p.username || ''); }).join('、')}">🧑×${_pl.length}</span></div>`; } else { _cellIcon = `<div style="font-size:10px;line-height:1;text-align:center;cursor:pointer" onclick="event.stopPropagation();window.showPlayersAt(${x},${y})" title="点击查看${_pl.length}位道友资料">🧑${_pl.length > 1 ? '×' + _pl.length : ''}<br><span style="font-size:8px">${String(_pl[0].username || '').slice(0, 4)}</span><br><span style="font-size:8px;color:#7ec8ff">查看资料</span></div>`; } }
      } catch(_) {} // v1009 真人玩家标记；v1057 可见规则
      cells += `<div data-mx="${x}" data-my="${y}"${furnaceAttr}${arenaAttr} style="aspect-ratio:1;background:#1a1a2e;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer" title="${isFurnace === 'both_alc' ? '大殿' : isArena === 'pk' ? 'PK' : isArena === 'arena' ? '擂台' : isPortal ? '传送阵' : isShop ? '商会' : isTrainPortal ? '洞府·灵脉闭关' : isStall ? '摆摊区' : isCasino ? '赌场' : isCultivate ? '修炼区' : isCookRefine ? '灶台·点金台' : isBeastGarden ? '兽园' : isFormationTalisman ? '制阵室·画符台' : isHerbGarden ? '田药园' : isRanch ? '养殖园' : ''}">${_cellIcon}</div>`; // v713 修title泄漏；v790 阵符坊
    }
    grid.innerHTML = cells;
    grid.querySelectorAll('[data-mx]').forEach(c => {

// v849 主城移动技能距离判定：缩地2格/大挪移3格，斜走需技能
function cityMoveOk(w, x, y) {
  try {
    const _dx = x - w.px, _dy = y - w.py;
    const _cheb = Math.max(Math.abs(_dx), Math.abs(_dy));
    const _dist = Math.abs(_dx) + Math.abs(_dy);
    const _hasSk = typeof S !== 'undefined' && S.skills && S.skills.includes('shukuchi');
    const _hasDny = typeof S !== 'undefined' && S.skills && S.skills.includes('danuoyi');
    const _maxDist = _hasDny ? 3 : (_hasSk ? 2 : 1);
    const _maxDiag = _hasDny ? 2 : (_hasSk ? 1 : 0); // v850 大挪移斜2格，缩地斜1格
    const _isOrth = (_dx === 0 || _dy === 0);
    return (_isOrth && _dist >= 1 && _dist <= _maxDist) || ((!_isOrth) && (_hasSk || _hasDny) && _cheb >= 1 && _cheb <= _maxDiag);
  } catch(_) { return Math.abs(x - w.px) + Math.abs(y - w.py) === 1; }
}
// v851 主城移动触发雷劫判定：缩地2倍、大挪移3倍
function cityMoveThunder() {
  try {
    const _hasDny = typeof S !== 'undefined' && S.skills && S.skills.includes('danuoyi');
    const _hasSk = typeof S !== 'undefined' && S.skills && S.skills.includes('shukuchi');
    const _p = _hasDny ? 0.30 : (_hasSk ? 0.20 : 0.10);
    if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(_p);
  } catch(_) {}
}
      c.onclick = () => {
        try {
          if (typeof S === 'undefined' || !S) return; // v713 防御
          if (!S.worldMap) S.worldMap = { px: 2, py: 3 }; // v713 自动初始化
          const furnace = c.dataset.furnace;
          const arena = c.dataset.arena;
          const x = +c.dataset.mx, y = +c.dataset.my;
          const w = S.worldMap;
          // v1051 组队：队员跟随队长，不能自己移动
          if (window._myTeam && !window._isTeamLeader){
            try { if (typeof toastLog === 'function') toastLog('sys', '👥 组队跟随中，移动由队长控制'); else if (typeof glog === 'function') glog('sys', '👥 组队跟随中，移动由队长控制'); } catch(_){}
            return;
          }
          // v1159 移动新规（Ye 定）：闭关期间不能移动、冒险未脱离不能回主城；化神及以上例外
          if ((S.realm|0) < 5 && S.afk) {
            try { if (typeof toastLog === 'function') toastLog('sys', '🧘 闭关期间不能移动，先出关（化神以上不受此限）'); } catch(_){} try { showTip('🧘 闭关期间不能移动<br><small>先出关再走（化神以上不受此限）</small>'); } catch(_){}
            return;
          }
          if ((S.realm|0) < 5 && S.run) {
            try { if (typeof toastLog === 'function') toastLog('sys', '🗺️ 冒险未脱离，不能回主城（先撤退/走完冒险；化神以上不受此限）'); } catch(_){} try { showTip('🗺️ 冒险未脱离，不能回主城<br><small>先撤退或走完冒险（化神以上不受此限）</small>'); } catch(_){}
            return;
          }
          // v557 地图点NPC不再弹资料/PK（Ye取消），只走移动逻辑；NPC资料从信息栏"点我查看"进
          const isPortalCell = (x === 5 && y === 3);
          const isShopCell = (x === 2 && y === 3);
          const isTrainCell = (x === 0 && y === 3);
          const isStallCell = (x === 1 && y >= 1 && y <= 3);
          const isCasinoCell = (x === 3 && y === 1);
          const isReserveCell = (x === 4 && y === 3); // v536
          const isHerbCell = (x === 3 && y === 2); // v540
          const isRanchCell = (x === 2 && y === 0); // v541
          const isFormationTalismanCell = (x === 3 && y === 5); // v790 制阵室·画符台
          if (isFormationTalismanCell) {
            if (w.px === x && w.py === y) {
              if (typeof sheetFormationTalisman === 'function') sheetFormationTalisman();
            } else { // v828 主城也可用缩地/大挪移：2格/3格
              const _hasDanuoyi = S.skills && S.skills.includes('danuoyi');
              const _hasShukuchi = S.skills && S.skills.includes('shukuchi');
              const _maxDist = _hasDanuoyi ? 3 : (_hasShukuchi ? 2 : 1);
              const _dist = Math.abs(x - w.px) + Math.abs(y - w.py);
              if (_dist >= 1 && _dist <= _maxDist) {
                w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
              }
            }
            return;
          }
          if (isShopCell) {
            if (w.px === x && w.py === y) {
              if (typeof sheetShop === 'function') sheetShop();
            } else { // v828 主城也可用缩地/大挪移
              const _hasDanuoyi2 = S.skills && S.skills.includes('danuoyi');
              const _hasShukuchi2 = S.skills && S.skills.includes('shukuchi');
              const _maxDist2 = _hasDanuoyi2 ? 3 : (_hasShukuchi2 ? 2 : 1);
              const _dist2 = Math.abs(x - w.px) + Math.abs(y - w.py);
              if (_dist2 >= 1 && _dist2 <= _maxDist2) {
                w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
              }
            }
            return;
          }
          if (isPortalCell) {
            if (w.px === x && w.py === y) {
              if (typeof sheetAdventure === 'function') sheetAdventure();
            } else if (cityMoveOk(w, x, y)) { // v849 缩地/大挪移
              w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
            }
            return;
          }
window.goBackCaveChoice = function() { // v800 功能区回洞府/仙府选择；v890 元婴以下不得入内
  try {
    const _dg = S.dongfuGrids|0, _xg = S.xianfuGrids|0;
    if (_dg <= 0 && _xg <= 0) { log('bad', '你还没有开辟洞府，商店可购买洞府令'); return; }
    if ((S.realm|0) < 4 && _dg > 0 && _xg <= 0) { log('bad', '洞府需<b class="r">元婴</b>境界才能进入'); return; }
    if ((S.realm|0) < 8 && _xg > 0 && _dg <= 0) { log('bad', '仙府需<b class="r">仙人</b>境界才能进入'); return; }
    if (_dg > 0 && _xg > 0) {
      if (typeof openSheet === 'function') openSheet(`<h2>🏠 回洞府</h2><div class="hint">你开辟了洞府和仙府，要回哪个？</div><div class="grid2"><button class="btn gold" onclick="goBackCave('dongfu')">🏠 回洞府<br><small>${_dg} 格·灵气 ${_dg*2}</small></button><button class="btn gold" onclick="goBackCave('xianfu')">🏯 回仙府<br><small>${_xg} 格·灵气 ${_xg*5}</small></button></div><div class="row"><button class="btn full" onclick="closeSheet()">关闭</button></div>`);
      return;
    }
    goBackCave(_dg > 0 ? 'dongfu' : 'xianfu');
  } catch(e) {}
};
window.goBackCave = function(which) { // v799 回洞府/仙府；v801 直接传送进个人洞府面板；v804 显示格子；v817 改为真正传送（全屏洞府地图）
  try {
    const isDong = which === 'dongfu';
    const grids = isDong ? (S.dongfuGrids|0) : (S.xianfuGrids|0);
    const energy = isDong ? (S.dongfuEnergy|0) : (S.xianfuEnergy|0);
    if (grids <= 0) { log('bad', '你还没有开辟' + (isDong ? '洞府' : '仙府')); return; }
    S.inCave = which;
    try { if (typeof commit === 'function') commit(); } catch(_) {}
    renderCaveMap();
    log('good', `传送回${isDong ? '洞府' : '仙府'}！`);
  } catch(e) {}
};
window.leaveCave = function() { // v817 离开洞府，传回残陨之剑
  try {
    S.inCave = null;
    try { if (typeof commit === 'function') commit(); } catch(_) {}
    try { if (typeof render === 'function') render(); } catch(_) {}
    try { if (typeof renderWorldMap === 'function') renderWorldMap(); } catch(_) {}
  } catch(e) {}
};
window.renderCaveMap = function() { // v817 全屏洞府地图；v819 可在洞府内走动；v887 灵田种植
  try {
    const which = S.inCave;
    if (!which) return;
    const isDong = which === 'dongfu';
    // v887 灵田生长结算：仅元婴以上元神照料才生长
    try {
      if (!S.caveCrops) S.caveCrops = {};
      const _now = Date.now(), _isYuan = (S.realm|0) >= 4;
      if (_isYuan) {
        const _dt = S.caveCropTick ? Math.min(_now - S.caveCropTick, 86400000) : 0; // 上限1天防跳变
        if (_dt > 0) {
          for (const _k in S.caveCrops) {
            const _c = S.caveCrops[_k];
            if (!_c || _c.done) continue;
            _c.g = (_c.g || 0) + _dt;
            if (_c.g >= 14400000) { // 4小时成熟，元婴自动收获
              _c.done = 1;
              if (_c.lw) { // v1130 灵物种子：收获灵物，年份与五行都在收割时掷（1~当前上限）
                const _y = C.rollLwYearsL(), _e = C.rollLwEleL();
                if (!Array.isArray(S.lingwu)) S.lingwu = [];
                S.lingwu.push({ g: _c.lw.g, e: _e, y: _y });
                delete S.caveCrops[_k];
                try { log('good', `🌿 元神照料：灵物成熟，自动收获 <b>${C.LW_GRADE_NAMES[_c.lw.g - 1]}·${_e}（${_y} 年）</b>！`); } catch(_) {}
                continue;
              }
              const _herbs = ['h_str','h_agi','h_def','h_vit','h_int'];
              const _got = [];
              for (let _i = 0; _i < 3; _i++) { const _h = _herbs[Math.floor(Math.random() * _herbs.length)]; S.mats[_h] = (S.mats[_h]||0) + 1; _got.push(MATS[_h].name); }
              delete S.caveCrops[_k];
              try { log('good', `👶 元神照料：灵植成熟，自动收获 ${_got.join('、')}！`); } catch(_) {}
            }
          }
        }
      }
      S.caveCropTick = _now;
    } catch(_) {}
    const grids = isDong ? (S.dongfuGrids|0) : (S.xianfuGrids|0);
    const energy = isDong ? (S.dongfuEnergy|0) : (S.xianfuEnergy|0);
    const name = isDong ? '洞府' : '仙府';
    const icon = isDong ? '🏠' : '🏯';
    // 洞府内坐标，默认中心
    if (S.cavePx == null) { S.cavePx = 2; S.cavePy = 2; }
    const _size = 5;
    let _cells = '';
    const _hasSkC = S.skills && S.skills.includes('shukuchi'), _hasDnyC = S.skills && S.skills.includes('danuoyi'); // v886
    const _moveHint = _hasDnyC ? '大挪移：正交3格/斜2格' : _hasSkC ? '缩地：正交2格/斜1格' : '点击相邻格子走动';
    for (let y = 0; y < _size; y++) {
      for (let x = 0; x < _size; x++) {
        const _idx = y * _size + x;
        const _opened = _idx < grids;
        const _isPlayer = (S.cavePx === x && S.cavePy === y);
        const _cdx = x - S.cavePx, _cdy = y - S.cavePy; // v886 洞府移动接缩地/大挪移
        const _cheb = Math.max(Math.abs(_cdx), Math.abs(_cdy)), _cdist = Math.abs(_cdx) + Math.abs(_cdy);
        const _maxD = _hasDnyC ? 3 : (_hasSkC ? 2 : 1), _maxG = _hasDnyC ? 2 : (_hasSkC ? 1 : 0);
        const _isOrth = (_cdx === 0 || _cdy === 0);
        const _isAdj = (_isOrth && _cdist >= 1 && _cdist <= _maxD) || (!_isOrth && (_hasSkC || _hasDnyC) && _cheb >= 1 && _cheb <= _maxG);
        const _bg = _isPlayer ? '#4a3a1a' : (_opened ? '#3a2a1a' : '#1a1a2e');
        const _bd = _isPlayer ? '#fc0' : (_opened ? '#a63' : '#333');
        let _content = _isPlayer ? `<img src="${(typeof avatarUrl === 'function' ? avatarUrl() : '')}" style="width:80%;height:80%;object-fit:cover;border-radius:50%;display:block" onerror="this.outerHTML='🧑‍🌾'">` : (_opened ? '🟫' : ''); // v885 洞府用本人头像
        let _click = _isAdj ? `onclick="caveMove(${x},${y})" style="cursor:pointer;"` : '';
        // v887 灵田：已开空格显示作物/种植
        if (!_isPlayer && _opened && isDong) {
          const _crop = (S.caveCrops||{})[_idx];
          if (_crop && !_crop.done) {
            const _pct = Math.min(100, Math.floor(((_crop.g||0) / 14400000) * 100));
            const _yy = (S.realm|0) >= 4 ? '<span style="font-size:10px">👶</span>' : ''; // v891 元婴照料中
            _content = _crop.lw ? `<div style="display:flex;flex-direction:column;align-items:center"><span style="font-size:22px">🌿</span><span style="font-size:8px;color:${C.GRADE_COLORS[_crop.lw.g - 1]}">${C.LW_GRADE_NAMES[_crop.lw.g - 1].slice(0, 2)} ${_pct}%${(S.realm|0) >= 4 ? '' : '·需元神'}</span></div>` : `<div style="display:flex;flex-direction:column;align-items:center"><span style="font-size:22px">${_pct >= 100 ? '🌾' : '🌱'}${_yy}</span><span style="font-size:8px;color:#8f8">${_pct}%${(S.realm|0) >= 4 ? '' : '·需元神'}</span></div>`; // v1129 灵物作物显示品级与五行
            _click = '';
          } else if (!_crop && ((S.mats['lz_seed']|0) > 0 || Object.values(S.lwseeds || {}).some(v => (v | 0) > 0))) {
            _content = `<span style="font-size:16px;opacity:0.5">➕</span>`;
            if (!_isAdj) _click = `onclick="cavePlant(${_idx})" style="cursor:pointer;"`;
          }
        }
        _cells += `<div ${_click} style="aspect-ratio:1;background:${_bg};border:2px solid ${_bd};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;${_isAdj ? 'cursor:pointer;' : ''}">${_content}</div>`;
      }
    }
    const _html = `<div style="padding:12px;min-height:60vh;background:linear-gradient(180deg,#1a0f0a,#0a0a1a);border-radius:12px">`
      + `<h2 style="text-align:center">${icon}${icon} ${name}</h2>`
      + `<div class="hint" style="text-align:center">你的个人${name} · 已开 ${grids} 格 · 灵气 ${energy} · ${_moveHint}</div>`
      + ((S.realm|0) >= 4 ? `<div class="hint" style="text-align:center">👶 <b class="pu">元婴坐镇</b> · 元神正在照料灵植</div>` : '')
      + ((S.realm|0) >= 5 ? `<div class="hint" style="text-align:center;display:flex;align-items:center;justify-content:center;gap:6px">👤 <b class="pu">化神分身</b><img src="${(typeof avatarUrl === 'function' ? avatarUrl() : '')}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;border:2px solid #4dd" onerror="this.style.display='none'"> · 分身正在外放神识</div>` : '')
      + ((S.realm|0) >= 6 ? `<div class="hint" style="text-align:center">🙏 <b class="y">功德金身</b> · 功德 ${(S.merit|0)}（减伤 ${Math.min(30, Math.floor((S.merit|0) / 10))}%${(S.merit|0) >= 100 ? ' · 突破+5%' : ''}）</div>` : '')
      + `<div style="display:grid;grid-template-columns:repeat(${_size},1fr);gap:8px;margin:12px 0;max-width:400px;margin-left:auto;margin-right:auto">${_cells}</div>`
      + `<div class="row"><div class="lab">灵气加成</div><div>闭关每秒${isDong ? '法力' : '仙力'} +${energy}</div></div>`
      + `<div class="empty">🌱 灵植种植、🐟 养鱼即将开放……</div>`
      + `<button class="btn gold full" onclick="leaveCave()" style="margin-top:12px">🚪 离开${name}（传回收仙界）</button>`
      + `</div>`;
    let _caveDiv = document.getElementById('caveMapView');
    if (!_caveDiv) {
      _caveDiv = document.createElement('div');
      _caveDiv.id = 'caveMapView';
      _caveDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#0a0a1a;z-index:999;overflow-y:auto;padding:12px;padding-top:60px;';
      document.body.appendChild(_caveDiv);
    }
    _caveDiv.innerHTML = _html;
    _caveDiv.style.display = 'block';
  } catch(e) {}
};
window.swordIntro = function() { // v888 残陨之剑介绍；v895 改事件监听；v898 去掉看看
  try {
    openSheet(`<h2>🗡️ 残陨之剑</h2><div class="hint" style="line-height:1.8">在此地四周是时空乱流。一把残剑之上，不知多久孕育万物，但此地除了传送阵能用无法与外界取得联系。据推测应该是上古大能损毁的残剑，一直不停的穿梭在时空乱流之中！在这片时空错乱之中充满机遇和变数，无数的bug玩法等你开采发现利用。抓住自己的机缘冲破界混沌。</div><div class="row"><button class="btn full" onclick="closeSheet()">关闭</button></div>`);
  } catch(e) {}
};

window.addMerit = function(n, why) { // v893 功德增减（大乘起）；v1088 魔族煞体：杀孽扣的功德减半
  try {
    if ((S.realm|0) < 6) return; // 大乘以下不计功德
    if (n < 0 && S.race === 'mo' && /杀孽/.test(why || '')) n = Math.trunc(n / 2);
    S.merit = Math.max(0, (S.merit|0) + n);
    if (why) log(n > 0 ? 'good' : 'bad', `🙏 功德 <span class="${n > 0 ? 'y' : 'r'}">${n > 0 ? '+' : ''}${n}</span>（${why}，当前 ${S.merit}）`);
    try { if (typeof commit === 'function') commit(); } catch(_) {}
  } catch(_) {}
};
window.doTogglePetLock = function(id) { // v894 锁定/解锁灵宠
  try {
    const _pt = S.pets.find(p => p.id === id);
    if (!_pt) return;
    _pt.locked = !_pt.locked;
    log('good', `${_pt.locked ? '🔒' : '🔓'} ${PETS[_pt.k].name}#${_pt.id}${_pt.locked ? '已锁定（不可放生/吞噬）' : '已解锁'}`);
    try { if (typeof commit === 'function') commit(); } catch(_) {}
    sheetChar();
  } catch(e) {}
};
window.doReleasePet = function(id) { // v893 放生灵宠+10功德；v894 锁定不可放
  try {
    const _i = S.pets.findIndex(p => p.id === id);
    if (_i < 0) return;
    const _pt = S.pets[_i];
    if (_pt.locked) { log('bad', '🔒 该灵宠已锁定，先解锁才能放生'); return; }
    if (!confirm(`放生 ${PETS[_pt.k].name}#${_pt.id}？放生后灵宠回归山林。`)) return;
    S.pets.splice(_i, 1);
    if (Array.isArray(S.pet)) S.pet = S.pet.filter(x => x !== id); else if (S.pet === id) S.pet = null;
    try { if (typeof addMerit === 'function') addMerit(10, '放生灵宠'); if (typeof addFame === 'function') addFame(2, '放生灵宠'); } catch(_) {}
    log('good', `🕊️ 放生了 ${PETS[_pt.k].icon}${PETS[_pt.k].name}，它回归山林自由生活！`);
    try { if (typeof commit === 'function') commit(); } catch(_) {}
    sheetChar();
  } catch(e) {}
};
window.shenshiPanel = function() { // v887 化神神识；v1057 外放激活10秒玩家探查（相邻格气息<神识可见）；v1125 主城资源点删除，远程收取下线，只保留探查
  try {
    if ((S.realm|0) < 5) { log('bad', '需化神境界才能神识外放'); return; }
    try { window._ssRevealUntil = Date.now() + 10000; } catch(_) {} // v1057 神识外放10秒探查
    const wm = S.worldMap || { px: 2, py: 3 };
    const _spots = [
      { x: 3, y: 2, name: '🌱田药园', fn: 'openHerbSheet' },
      { x: 2, y: 0, name: '🥚养殖园', fn: 'openRanchSheet' }
    ].filter(s => {
      const _d = Math.max(Math.abs(s.x - wm.px), Math.abs(s.y - wm.py));
      return _d >= 1 && _d <= 3;
    });
    if (!_spots.length) { log('good', '👁️ 神识外放：10 秒内，相邻格气息低于你的道友可见'); try { renderWorldMap(); } catch(_) {} return; }
    openSheet(`<h2>👁️ 神识外放</h2><div class="hint">化神神识覆盖3格，远程收取资源；外放同时激活10秒探查</div>` +
      _spots.map(s => `<div class="row"><div class="lab">${s.name} <small>(${s.x},${s.y})</small></div><button class="btn gold" onclick="window.${s.fn}()">收取</button></div>`).join('') +
      `<div class="row"><button class="btn full" onclick="closeSheet()">关闭</button></div>`);
  } catch(e) {}
};
window.cavePlant = function(idx) { // v887 洞府灵田种植；v1129 有灵物种子时先选种
  try {
    const _lwGrades = [1, 2, 3].filter(g => ((S.lwseeds || {})[g] | 0) > 0);
    if (_lwGrades.length) {
      openSheet(`<h2>🌱 选种</h2><div class="hint">这块灵田种什么？灵物种子约 4 小时成熟（元婴以上元神照料才生长），年份与五行都在收割时才定。</div>` +
        ((S.mats['lz_seed'] | 0) > 0 ? `<div class="row"><div class="lab">🌱 灵植种子 ×${S.mats['lz_seed']}<small>成熟收获 3 株随机属性草</small></div><button class="btn" onclick="window.cavePlantPick(${idx},'lz')">种下</button></div>` : '') +
        _lwGrades.map(g => `<div class="row"><div class="lab"><b style="color:${C.GRADE_COLORS[g - 1]}">${C.LW_SEED_NAMES[g - 1]}</b> ×${S.lwseeds[g]}<small>成熟收获${C.LW_GRADE_NAMES[g - 1]}（收割时定五行）</small></div><button class="btn gold" onclick="window.cavePlantPick(${idx},'${g}')">种下</button></div>`).join('') +
        `<button class="btn full" data-close>取消</button>`);
      return;
    }
    if ((S.mats['lz_seed']|0) <= 0) { log('bad', '没有灵植种子，商会可购买'); return; }
    if (!S.caveCrops) S.caveCrops = {};
    if (S.caveCrops[idx]) return;
    S.mats['lz_seed']--; if (S.mats['lz_seed'] <= 0) delete S.mats['lz_seed'];
    S.caveCrops[idx] = { g: 0 };
    try { if (typeof commit === 'function') commit(); } catch(_) {}
    log('good', `🌱 灵植种下！${(S.realm|0) >= 4 ? '元神会自动照料，约4小时成熟' : '<b class="r">需元婴以上元神照料才生长</b>'}`);
    renderCaveMap();
  } catch(e) {}
};
window.cavePlantPick = function(idx, kind) { // v1129 灵田选种落种
  try {
    if (!S.caveCrops) S.caveCrops = {};
    if (S.caveCrops[idx]) return;
    if (kind === 'lz') {
      if ((S.mats['lz_seed'] | 0) <= 0) { log('bad', '没有灵植种子'); return; }
      S.mats['lz_seed']--; if (S.mats['lz_seed'] <= 0) delete S.mats['lz_seed'];
      S.caveCrops[idx] = { g: 0 };
      log('good', `🌱 灵植种下！${(S.realm|0) >= 4 ? '元神会自动照料，约4小时成熟' : '<b class="r">需元婴以上元神照料才生长</b>'}`);
    } else {
      const _g = +kind || 1;
      if (!S.lwseeds || (S.lwseeds[_g] | 0) <= 0) { log('bad', '没有这种灵物种子'); return; }
      S.lwseeds[_g]--; if (S.lwseeds[_g] <= 0) delete S.lwseeds[_g];
      S.caveCrops[idx] = { g: 0, lw: { g: _g } }; // v1130 作物不记五行，收割才定
      log('good', `🌿 ${C.LW_SEED_NAMES[_g - 1]} 种下！${(S.realm|0) >= 4 ? '元神会自动照料，约4小时成熟' : '<b class="r">需元婴以上元神照料才生长</b>'}`);
    }
    try { if (typeof commit === 'function') commit(); } catch(_) {}
    closeSheet(); renderCaveMap();
  } catch(e) {}
};
window.caveMove = function(x, y) { // v819 洞府内走动；v886 接缩地/大挪移
  try {
    const _cdx = x - S.cavePx, _cdy = y - S.cavePy;
    const _cheb = Math.max(Math.abs(_cdx), Math.abs(_cdy)), _cdist = Math.abs(_cdx) + Math.abs(_cdy);
    const _hasSk = S.skills && S.skills.includes('shukuchi'), _hasDny = S.skills && S.skills.includes('danuoyi');
    const _maxD = _hasDny ? 3 : (_hasSk ? 2 : 1), _maxG = _hasDny ? 2 : (_hasSk ? 1 : 0);
    const _isOrth = (_cdx === 0 || _cdy === 0);
    const _ok = (_isOrth && _cdist >= 1 && _cdist <= _maxD) || (!_isOrth && (_hasSk || _hasDny) && _cheb >= 1 && _cheb <= _maxG);
    if (!_ok) return;
    S.cavePx = x; S.cavePy = y;
    try { if (typeof commit === 'function') commit(); } catch(_) {}
    renderCaveMap();
  } catch(e) {}
};
// 进入洞府时如果已有全屏视图，先隐藏
(function() {
  const _origLeave = window.leaveCave;
  window.leaveCave = function() {
    try { const _d = document.getElementById('caveMapView'); if (_d) _d.style.display = 'none'; } catch(_) {}
    _origLeave();
  };
})();
window.qtyPrompt = function(type, key, max) { // v824 背包数量输入
  try {
    const _n = prompt(`用几个？（1-${max}）`, max);
    if (_n == null) return;
    const n = Math.max(1, Math.min(max, parseInt(_n) || 1));
    if (type === 'ebook' && typeof sheetEbook === 'function') sheetEbook(key, n);
    else if (type === 'drinkmai') { try { if (typeof doDrinkMai === 'function') doDrinkMai(n); } catch(_) {} try { if (typeof sheetBag === 'function') sheetBag(); } catch(_) {} } // v832 修：调doDrinkMai(n)，原drinkMaiOne不存在
    else { try { const _d = { n }; if (type === 'mai') _d.usemai = n; else if (type === 'drink') { const _p = key.split('_'); _d.drink = _p[0]; _d.g = _p[1]; } else if (type === 'lu') _d.lu = key; else if (type === 'spirit') _d.spirit = key; else if (type === 'smash') _d.smash = n; if (typeof bagAction === 'function') bagAction(_d); else if (typeof handleBagClick === 'function') handleBagClick(_d); } catch(_) {} }
  } catch(e) {}
};
          if (isTrainCell) {
            if (w.px === x && w.py === y) {
              if ((S.stamina|0) <= 0) { // v564 体力耗尽点⛰️区直接进闭关二选一，不再弹体力不足
                const _im = (S.realm|0) === 0, _ix = (S.realm|0) >= 8;
                const _ct = _im ? 'wushu' : 'cave', _vt = _im ? 'ningqi' : 'vein';
                const _cn = _im ? '🥋 习武' : '🏔️ 洞府闭关', _vn = _im ? '🌀 凝气' : '⛰️ 灵脉闭关';
                const _cd = _im ? '每分钟+1经验，安全' : (_ix ? '每秒+1仙力，参悟法则，安全无风险' : '每秒+1法力，安全无风险');
                const _vd = _im ? '每小时凝气判定，攒引气入体' : (_ix ? '每秒+2仙力，参悟法则，入关1小时后会被真人PK匹配' : '每秒+2法力，可凝气🌀，入关1小时后会被真人PK匹配');
                if (typeof openSheet === 'function') openSheet(`<h2>⛰️ 闭关</h2><div class="grid2"><button class="btn" onclick="window._afkFromMap('${_ct}','${_cn}')">${_cn}<br><small>${_cd}</small></button><button class="btn" onclick="window._afkFromMap('${_vt}','${_vn}')">${_vn}<br><small>${_vd}</small></button></div>`);
                return;
              }
              if (typeof sheetTrain === 'function') sheetTrain();
            } else if (cityMoveOk(w, x, y)) { // v849 缩地/大挪移
              w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
            }
            return;
          }
          if (isStallCell) {
            if (w.px === x && w.py === y) {
              if (typeof sheetStall === 'function') sheetStall(x, y);
            } else if (cityMoveOk(w, x, y)) { // v849 缩地/大挪移
              w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
            }
            return;
          }
          if (isCasinoCell) {
            if (w.px === x && w.py === y) {
              if (typeof sheetCasino === 'function') sheetCasino();
            } else if (cityMoveOk(w, x, y)) { // v849 缩地/大挪移
              w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
            }
            return;
          }
          if (isHerbCell) { // v540 田药园（v1125 保留）
            if (w.px === x && w.py === y) {
              if (typeof openHerbSheet === 'function') openHerbSheet(); // v666
            } else if (cityMoveOk(w, x, y)) { // v849 缩地/大挪移
              w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
            }
            return;
          }
          if (isRanchCell) { // v541 养殖园（v1125 保留）
            if (w.px === x && w.py === y) {
              if (typeof openRanchSheet === 'function') openRanchSheet(); // v666
            } else if (cityMoveOk(w, x, y)) { // v849 缩地/大挪移
              w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
            }
            return;
          }
          if (arena) {
            if (w.px === x && w.py === y) {
              if (arena === 'pk' && typeof doPkChooseRealm === 'function') doPkChooseRealm();
              else if (arena === 'arena' && typeof doArena === 'function') doArena();
            } else if (cityMoveOk(w, x, y)) { // v849 缩地/大挪移
              if (typeof isSwordCell === 'function' && !isSwordCell(x, y)) return;
              w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
              if (typeof toastLog === 'function') toastLog('sys', '走到' + (arena === 'pk' ? 'PK台' : '擂台') + '旁，再点一次进入');
            }
            return;
          }
          if (furnace) {
            // v316 人物必须站在炉子上才能用；v320 同格双炉弹选择
            if (w.px === x && w.py === y) {
              if (furnace === 'both_alc') {
                if (typeof openSheet === 'function') openSheet(`<h2>🏛️ 大殿</h2><div class="grid2"><button class="btn" onclick="window.useFurnace('alc')">⚗️ 炼丹炉<br><small>耐久 ${(S.furnaceDur&&S.furnaceDur.alc!=null)?S.furnaceDur.alc:100}/100</small></button><button class="btn" onclick="window.useFurnace('ding')">🏺 丹鼎<br><small>耐久 ${(S.furnaceDur&&S.furnaceDur.ding!=null)?S.furnaceDur.ding:200}/200</small></button><button class="btn" onclick="window.useFurnace('forge')">🔨 炼器炉<br><small>耐久 ${(S.furnaceDur&&S.furnaceDur.forge!=null)?S.furnaceDur.forge:100}/100</small></button></div>`); // v448 炼器炉并入炼丹房
                return;
              }
              if (typeof sheetLife === 'function') {
                const d = (S.furnaceDur && S.furnaceDur[furnace]) || 0;
                if (d <= 0) { if (typeof toastLog === 'function') toastLog('sys', '炉子耐久不足，需要修理'); return; }
                S.furnaceDur[furnace] = d - 1; if (typeof save === 'function') save();
                sheetLife(furnace);
              }
            } else if (cityMoveOk(w, x, y)) { // v849 缩地/大挪移
              w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); // v851；v1051 组队同步
              if (typeof toastLog === 'function') toastLog('sys', '走到' + (furnace === 'both_alc' ? '大殿' : '炼器炉') + '旁，再点一次使用'); // v455 改名大殿
            }
            return;
          }
          if (cityMoveOk(w, x, y)) { w.px = x; w.py = y; if (typeof save === 'function') save(); renderWorldMap(); cityMoveThunder(); teamLeaderMoveSync(x, y); } // v1051 组队同步
        } catch (_) {}
      };
    });
    // v318 当前格子信息小窗；v319 点小窗直接用炉子
    try {
      const ci = document.getElementById('cellInfo');
      if (ci) {
        const wx = wm.px, wy = wm.py;
        const furn = (wx === 2 && wy === 5) ? 'alc' : null; // v448 炼器炉已并入炼丹房
        const dur = (typeof S !== 'undefined' && S.furnaceDur) ? S.furnaceDur : {};
        const furn2 = (wx === 2 && wy === 5) ? 'both_alc' : null; // v448
        const arena2 = (wx === 2 && wy === 1) ? 'pk' : (wx === 2 && wy === 2) ? 'arena' : null; // v342 剑形位置
        const isPortal2 = (wx === 5 && wy === 3); // v344 传送阵
        const isShop2 = (wx === 2 && wy === 3); // v346 商会
        const isTrain2 = (wx === 0 && wy === 3); // v397 修炼传送门
        const isStall2 = (wx === 1 && wy >= 1 && wy <= 3); // v400 摆摊区
        const isCasino2 = (wx === 3 && wy === 1); // v417 赌场
        const isCultivate2 = (wx === 1 && wy === 5); // v452 修炼区
        const isCookRefine2 = (wx === 2 && wy === 4); // v458 灶台·点金台
        const isBeastGarden2 = (wx === 3 && wy === 3); // v465 兽园
        const isHerb2 = (wx === 3 && wy === 2); // v553 田药园（v1125 保留）
        const isRanch2 = (wx === 2 && wy === 0); // v553 养殖园（v1125 保留）
        if (furn2 === 'both_alc') ci.innerHTML = '⚗️ <b>炼丹炉</b>(' + (dur.alc != null ? dur.alc : 100) + '/100) 🏺 <b>丹鼎</b>(' + (dur.ding != null ? dur.ding : 200) + '/200) 🔨 <b>炼器炉</b>(' + (dur.forge != null ? dur.forge : 100) + '/100）· <u>点我选择</u>'; // v448 炼器炉并入
        else if (arena2 === 'pk') ci.innerHTML = '⚔️ <b>PK</b> · <u>点我进入</u>';
        else if (arena2 === 'arena') ci.innerHTML = '🏟️ <b>擂台</b> · <u>点我进入</u>';
        else if (isPortal2) ci.innerHTML = '🌀 <b>传送阵</b> · <u>点我进入冒险</u>';
        else if (isShop2) ci.innerHTML = '🏪 <b>商会</b> · <u>点我进入商店</u>';
        else if (isTrain2) ci.innerHTML = '⛰️ <b>洞府·灵脉</b> · <u>点我选闭关</u>'; // v463 改闭关
        else if (isStall2) ci.innerHTML = '🎪 <b>摆摊区</b> · <u>点我看看摊位</u>';
        else if (isCultivate2) ci.innerHTML = '☯️🪷🕉️⚡⛰️ <b>修炼区</b> · <u>点我修炼</u>'; // v452；v457 五图标
        else if (isCookRefine2) ci.innerHTML = '🍳 <b>灶台</b> 🪙 <b>点金台</b> · <u>点我选择</u>'; // v458
        else if (isBeastGarden2) ci.innerHTML = '🐾 <b>兽园</b> · <u>点我驯兽</u>'; // v465
        else if (isCasino2) ci.innerHTML = '🎲 <b>赌场</b> · <u>点我进入</u>';
        else if (isHerb2) { try { herbTick(S); const _hg = S.herbGarden; ci.innerHTML = '🌱 <b>田药园</b>' + (_hg.h>0 ? '（草药×'+_hg.h+'）' : '（待生长）') + ' · <u>点我采集</u>'; } catch(e) { ci.innerHTML = '🌱 <b>田药园</b> · <u>点我采集</u>'; } } // v553
        else if (isRanch2) { try { ranchTick(S); const _rc = S.ranch; const _r2 = []; if (_rc.m>0) _r2.push('肉×'+_rc.m); if (_rc.e>0) _r2.push('蛋×'+_rc.e); ci.innerHTML = '🥚 <b>养殖园</b>' + (_r2.length ? '（'+_r2.join('、')+'）' : '（待产出）') + ' · <u>点我收获</u>'; } catch(e) { ci.innerHTML = '🥚 <b>养殖园</b> · <u>点我收获</u>'; } } // v553
        else {
          // v552 文字显示这格有啥：人/矿/灵草等
          const _parts = [];
          // NPC
          try {
            const _ns = (S.npcs && S.npcs.spots) || [];
            const _mySS = (typeof effShenshi === 'function' && typeof S !== 'undefined' && S) ? effShenshi(S) : 0; // v947 探查双倍
            const _here = _ns.filter(function(s){ return s[0] === wx && s[1] === wy; }).filter(function(s){ const _qx = (s[7]|0) || (s[5]*2); return _qx <= _mySS; }); // v937 气息高不显示
            if (_here.length) _parts.push('人×' + _here.length + '（' + _here.map(function(s){ return s[3]; }).join('、') + '）');
          } catch(e) {}
          // 田药园(3,2)
          if (wx === 3 && wy === 2) {
            try { herbTick(S); const _hg = S.herbGarden;
              _parts.push('🌱 <b>田药园</b>' + (_hg.h > 0 ? '：草药×' + _hg.h : '（待生长）'));
            } catch(e) { _parts.push('🌱 <b>田药园</b>'); }
          }
          // 养殖园(2,0)
          if (wx === 2 && wy === 0) {
            try { ranchTick(S); const _rc = S.ranch;
              const _r2 = [];
              if (_rc.m > 0) _r2.push('肉×' + _rc.m);
              if (_rc.e > 0) _r2.push('蛋×' + _rc.e);
              _parts.push('🥚 <b>养殖园</b>' + (_r2.length ? '：' + _r2.join('、') : '（待产出）'));
            } catch(e) { _parts.push('🥚 <b>养殖园</b>'); }
          }
          ci.innerHTML = _parts.length ? _parts.join('<br>') : '⬜ 空地（' + wx + ',' + wy + '）';
        }
        // v554 NPC也显示在信息栏；v556 独立点击
        try {
          const _ns2 = (S.npcs && S.npcs.spots) || [];
          const _mySS2 = (typeof effShenshi === 'function' && typeof S !== 'undefined' && S) ? effShenshi(S) : 0; // v947
          const _here2 = _ns2.filter(function(s){ return s[0] === wx && s[1] === wy; }).filter(function(s){ const _qx = (s[7]|0) || (s[5]*2); return _qx <= _mySS2; }); // v937
          if (_here2.length) {
            const _names = _here2.map(function(s){ return s[3]; }).join('、');
            const _idx = window._npcInfoIdx = (window._npcInfoIdx|0) + 1;
            window['_npcList' + _idx] = _here2;
            ci.innerHTML += (ci.innerHTML ? '<br>' : '') + '👤 <b>修士×' + _here2.length + '</b>（' + _names + '）· <u style="cursor:pointer" onclick="event.stopPropagation();window._showNpcInfo(' + _idx + ')">点我查看</u>';
          }
        } catch(e) {}
        // v1160 主城信息条补同格真人玩家（Ye 令）：站上格子，信息条能看到这格的商店与玩家；同格始终可见（v1057），点我查看→同格道友名单→人物卡互动（仙缘/组队/资料/切磋/攻击）
        try {
          const _myAid1160 = (function(){ try { return localStorage.getItem('mhxy_aid') || ''; } catch(_) { return ''; } })();
          const _wp1160 = (window._worldPlayers || []).filter(function(p){ return p && p.online && (p.x|0) === wx && (p.y|0) === wy && String(p.accountId || '') !== _myAid1160; });
          if (_wp1160.length) {
            const _pn1160 = _wp1160.slice(0, 3).map(function(p){ return String(p.username || '道友').replace(/</g, '&lt;'); }).join('、') + (_wp1160.length > 3 ? ' 等' : ''); // v1167 名字只列前3：信息条单行裁剪，长名单会把「点我查看」挤出可视区点不到（Ye 报）
            ci.innerHTML += (ci.innerHTML ? '<br>' : '') + '<span style="cursor:pointer" onclick="event.stopPropagation();window.showPlayersAt(' + wx + ',' + wy + ')">👥 <b>道友×' + _wp1160.length + '</b>（' + _pn1160 + '）· <u>点我查看</u></span>'; // v1167 整行可点
          }
        } catch(e) {}
        ci.style.cursor = (furn2 || arena2 || isPortal2 || isShop2 || isTrain2 || isStall2 || isCasino2 || isCultivate2 || isCookRefine2 || isBeastGarden2 || isHerb2 || isRanch2) ? 'pointer' : 'default'; // v452；v458；v465；v553
        ci.onclick = (furn2 || arena2 || isPortal2 || isShop2 || isTrain2 || isStall2 || isCasino2 || isCultivate2 || isCookRefine2 || isBeastGarden2 || isHerb2 || isRanch2) ? () => { // v452；v458；v465
          try {
            if (typeof isPortal2 !== 'undefined' && isPortal2 && typeof sheetAdventure === 'function') { sheetAdventure(); return; }
            if (typeof isShop2 !== 'undefined' && isShop2 && typeof sheetShop === 'function') { sheetShop(); return; }
            if (typeof isTrain2 !== 'undefined' && isTrain2) { // v463 改洞府/灵脉闭关二选一；v464 描述写详细
              const _isMortal = (S.realm|0) === 0, _isXian = (S.realm|0) >= 8;
              const _caveT = _isMortal ? 'wushu' : 'cave', _veinT = _isMortal ? 'ningqi' : 'vein';
              const _caveN = _isMortal ? '🥋 习武' : '🏔️ 洞府闭关', _veinN = _isMortal ? '🌀 凝气' : '⛰️ 灵脉闭关';
              const _caveD = _isMortal ? '每分钟+1经验，安全' : (_isXian ? '每秒+1仙力，参悟法则，安全无风险' : '每秒+1法力，安全无风险');
              const _veinD = _isMortal ? '每小时凝气判定，攒引气入体' : (_isXian ? '每秒+2仙力，参悟法则，入关1小时后会被真人PK匹配' : '每秒+2法力，可凝气🌀，入关1小时后会被真人PK匹配');
              if (typeof openSheet === 'function') openSheet(`<h2>⛰️ 闭关</h2><div class="grid2"><button class="btn" onclick="window._afkFromMap('${_caveT}','${_caveN}')">${_caveN}<br><small>${_caveD}</small></button><button class="btn" onclick="window._afkFromMap('${_veinT}','${_veinN}')">${_veinN}<br><small>${_veinD}</small></button></div><div class="hint" style="margin-top:8px">🌫️ 天地灵气 <b class="y">${C.qiTierName(C.qiNow())}</b>（${Math.round(C.qiNow())}/100）· 闭关收益 ×${C.qiFactor().toFixed(2)}。灵气全服同享：衰则末法、盛则潮汐。往灵脉投灵石可聚灵——</div><div class="grid2" style="grid-template-columns:repeat(4,1fr);gap:5px;margin-top:6px"><button class="btn" data-juling="sp1:1">聚灵·灵气石×1<br><small>持有 ${S.ores.sp1|0} · +1</small></button><button class="btn" data-juling="sp1:10">聚灵·灵气石×10<br><small>+10</small></button><button class="btn" data-juling="sp2:1">聚灵·下品×1<br><small>持有 ${S.ores.sp2|0} · +4</small></button><button class="btn" data-juling="sp2:10">聚灵·下品×10<br><small>+40</small></button></div>`);
              return;
            }
            if (typeof isStall2 !== 'undefined' && isStall2 && typeof sheetStall === 'function') { sheetStall(wx, wy); return; }
            if (typeof isCasino2 !== 'undefined' && isCasino2 && typeof sheetCasino === 'function') { sheetCasino(); return; }
            if (typeof isCultivate2 !== 'undefined' && isCultivate2) { if ((S.stamina|0) <= 0) { try { alert('体力不足'); } catch(e) {} return; } if (typeof sheetTrain === 'function') { sheetTrain(); return; } } // v452 修炼区进修炼
            if (typeof isCookRefine2 !== 'undefined' && isCookRefine2) { if (typeof openSheet === 'function') openSheet(`<h2>🍳 灶台 · 🪙 点金台</h2><div class="grid2"><button class="btn" onclick="if(typeof sheetLife==='function')sheetLife('cook')">🍳 灶台<br><small>烹饪</small></button><button class="btn" onclick="if(typeof sheetLife==='function')sheetLife('refine')">🪙 点金台<br><small>炼金</small></button></div>`); return; } // v458
            if (typeof isBeastGarden2 !== 'undefined' && isBeastGarden2) { // v465 兽园；v467 加吞噬二选一
              if (typeof openSheet === 'function') openSheet(`<h2>🐾 兽园</h2><div class="grid2"><button class="btn" onclick="window.sheetLife('tame')">🐾 驯兽<br><small>驯化灵宠</small></button><button class="btn" onclick="window.sheetBeastDevour()">☣️ 吞噬<br><small>宠物互噬</small></button><button class="btn" onclick="window.sheetPetBreak()">💥 突破<br><small>冲破等级上限</small></button></div>`); // v469 改window调用
              return;
            }
            if (arena2 === 'pk' && typeof doPkChooseRealm === 'function') { doPkChooseRealm(); return; }
            if (typeof isHerb2 !== 'undefined' && isHerb2) { // v553 田药园
              if (typeof openHerbSheet === 'function') openHerbSheet();
              return;
            }
            if (typeof isRanch2 !== 'undefined' && isRanch2) { // v553 养殖园；v555 分开
              if (typeof openRanchSheet === 'function') openRanchSheet();
              return;
            }
            if (arena2 === 'arena' && typeof doArena === 'function') { doArena(); return; }
            if (furn2 === 'both_alc') {
              if (typeof openSheet === 'function') openSheet(`<h2>🏛️ 大殿</h2><div class="grid2"><button class="btn" onclick="window.useFurnace('alc')">⚗️ 炼丹炉<br><small>耐久 ${(S.furnaceDur&&S.furnaceDur.alc!=null)?S.furnaceDur.alc:100}/100</small></button><button class="btn" onclick="window.useFurnace('ding')">🏺 丹鼎<br><small>耐久 ${(S.furnaceDur&&S.furnaceDur.ding!=null)?S.furnaceDur.ding:200}/200</small></button><button class="btn" onclick="window.useFurnace('forge')">🔨 炼器炉<br><small>耐久 ${(S.furnaceDur&&S.furnaceDur.forge!=null)?S.furnaceDur.forge:100}/100</small></button></div>`); // v448 炼器炉并入炼丹房
              return;
            }
            const d = (S.furnaceDur && S.furnaceDur[furn2] != null) ? S.furnaceDur[furn2] : 100;
            if (d <= 0) { if (typeof toastLog === 'function') toastLog('sys', '炉子耐久不足，需要修理'); return; }
            S.furnaceDur[furn2] = d - 1; if (typeof save === 'function') save();
            if (typeof sheetLife === 'function') sheetLife(furn2);
            renderWorldMap();
          } catch (_) {}
        } : null;
      }
    } catch (_) {}
    // v447 📜按钮已移除，日记在聊天窗📝tab查看
    // v446 日记已并入悬浮聊天窗为tab，移除独立开关
    // v445 悬浮聊天窗：世界/宗门/组队/日记
    if (!window._chatTab) window._chatTab = 'world';
    window.renderChatFloat = function() {
      const cf = document.getElementById('chatFloat'); if (!cf) return;
      if (!Array.isArray(S.sectChat)) S.sectChat = []; if (!Array.isArray(S.teamChat)) S.teamChat = [];
      const tab = window._chatTab;
      let _fhCss = ''; try { const _fh = parseInt(localStorage.getItem('chatFloatH') || '0', 10); if (_fh >= 120) _fhCss = ' style="height:' + Math.min(_fh, Math.max(120, window.innerHeight - 200)) + 'px"'; } catch(_) {} // v1166 拖拽高度重渲染不丢失（Ye：拖小了点别的又变高——就是重渲染把高度冲了）
      try { const _mf = JSON.parse(localStorage.getItem('msgFilter') || '{"world":1,"sect":1,"team":1,"diary":1}'); if (tab && _mf[tab] === 0) { cf.innerHTML = `<div class="cfbox"${_fhCss}><div class="cftop"><button class="cfclose" data-cfclose>✖️</button></div><div class="cfmsgs"><div class="hint">该频道已在设置中关闭</div></div><div class="cfresize"></div></div>`; const _cc2 = cf.querySelector('[data-cfclose]'); if (_cc2) _cc2.onclick = () => { try { localStorage.setItem('chatFloatOn','0'); } catch(_){} cf.classList.remove('on'); }; return; } } catch(_) {} // v641 频道过滤
      let msgs = '', hint = '', canSend = true;
      const _loggedIn = (typeof MHXY !== 'undefined' && MHXY.loggedIn && MHXY.loggedIn());
      if (tab === 'world') {
        if (_loggedIn) {
          // v973 真人世界聊天：显示服务端消息
          const _srv = (window._srvChat || []).slice(-20);
          const _dispName = m => { if (m.rname) return m.rname; if (m.roleName) return m.roleName; try { const ps = window._worldPlayers || []; for (const p of ps) { if (p && p.player_no != null && m.playerNo != null && String(p.player_no) === String(m.playerNo) && p.username) return p.username; } } catch(_) {} return m.n || m.username || '道友'; }; // v1010 道号优先
          msgs = _srv.map(m => { var _xh = (m.xHandle && !m.xHidden && !m.x_hide) ? '<span style="color:#1d9bf0">@' + esc(m.xHandle) + '</span>' + (m.xVerified ? '<span style="color:#1d9bf0">✓</span>' : '') + ' ' : (((m.xHidden || m.x_hide) && m.xVerified) ? '<span style="color:#1d9bf0">✓</span> ' : ''); var _tx = m.t || m.text || ''; var _ex = ''; var _mt = /【观礼#([0-9a-z]+)\|([^|]*)\|([^|]*)\|([^】]*)】/.exec(_tx); if (_mt) _ex += ' <button class="btn sm" data-spectate="' + _mt[1] + '" data-specmeta="' + esc(_mt[2]) + '|' + esc(_mt[3]) + '|' + esc(_mt[4]) + '">👀 观礼</button>'; var _rp = /【红包#([0-9a-z]+)/.exec(_tx); if (_rp) _ex += ' <button class="btn sm" data-redpacket="' + _rp[1] + '">🧧 抢红包</button>'; return `<div class="chat-msg"><b style="color:#7ec8ff">${_xh}${esc(_dispName(m))}</b>：${esc(_tx)}${_ex}</div>`; }).join('') || '<div class="hint">暂无消息，道友先开个头吧</div>';
          // 确保连接 WS 并拉取历史
          try { if (typeof chatWsConnect === 'function') chatWsConnect(); } catch(_) {}
          try { if (typeof chatHistoryToCache === 'function') chatHistoryToCache(); } catch(_) {}
        } else {
          msgs = (S.chatLog || []).filter(m => m.sys || m.announce).slice(-20).map(m => m.announce ? `<div class="chat-announce" style="font-size:11px">📢 ${esc(m.t)}</div>` : `<div class="chat-msg"><b style="color:#7ec8ff">${esc(m.n)}</b>：${esc(m.t)}</div>`).join('') || '<div class="hint">暂无消息</div>';
          msgs = '<div class="hint" style="color:#ffb84d">⚠️ 未登录真人联机：这里是游戏内通告，发言进不了世界（菜单 → 真人联机 登录）</div>' + msgs; // v1008
        }
      } else if (tab === 'sect' || tab === 'ally') { // v1164 真人宗门/仙盟频道（服务端消息）
        const _isAlly = tab === 'ally';
        if (!_loggedIn) { hint = '登录真人联机后可用此频道'; canSend = false; }
        else {
          const _sv = window._mySect;
          if (_sv === undefined) { hint = '加载中…'; canSend = false; try { sectChatSync(_isAlly ? 'ally' : 'sect'); } catch(_) {} }
          else if (!_sv || !_sv.sect) { hint = '尚未加入宗门（仙缘 → 宗门）'; canSend = false; }
          else if (_isAlly && !_sv.alliance) { hint = '所在宗门尚未加入仙盟'; canSend = false; }
          else {
            const _cm = (_isAlly ? window._allyMsgs : window._sectMsgs) || [];
            msgs = _cm.slice(-20).map(m => `<div class="chat-msg"><b style="color:#7ec8ff">${esc(m.n)}</b>：${esc(m.t)}</div>`).join('') || `<div class="hint">${_isAlly ? '仙盟' : '宗门'}频道暂无消息</div>`;
            try { sectChatSync(_isAlly ? 'ally' : 'sect'); } catch(_) {}
          }
        }
      } else if (tab === 'diary') { // v446 日记tab
        canSend = false;
        msgs = (S.log || []).slice(-20).map(e => `<div class="de ${(e.c||'')}"><span class="ts" style="color:#888;font-size:10px;margin-right:6px">${e.t||''}</span>${e.h}</div>`).join('') || '<div class="hint">暂无日记</div>';
      } else {
        hint = '组队功能开发中，敬请期待'; canSend = false;
        msgs = (S.teamChat || []).slice(-20).map(m => `<div class="chat-msg"><b style="color:#7ec8ff">${esc(m.n)}</b>：${esc(m.t)}</div>`).join('');
      }
      cf.innerHTML = `<div class="cfbox"${_fhCss}><div class="cftop"><button class="cfclose" data-cfclose>✖️</button></div><div class="cfmsgs">${hint ? `<div class="hint">${hint}</div>` : msgs}</div><div class="cfresize"></div></div>`;
      cf.querySelectorAll('[data-ctab]').forEach(b => b.onclick = () => { window._chatTab = b.dataset.ctab; window.renderChatFloat(); });
      const _cc = cf.querySelector('[data-cfclose]'); if (_cc) _cc.onclick = (e) => { e.stopPropagation(); try { localStorage.setItem('chatFloatOn', '0'); } catch(_){} const _cf = document.getElementById('chatFloat'); if (_cf) _cf.classList.remove('on'); const _ctb = document.getElementById('chatToggleBtn'); if (_ctb) _ctb.style.opacity = '0.4'; }; // v513；v575 输入栏常驻
      const sendBtn = cf.querySelector('[data-cfsend]'); const inp = cf.querySelector('#cfInput');
      const doSend = () => { const v = (inp.value || '').trim(); if (!v) return;
        // v973 登录时世界频道走真人聊天
        if (tab === 'world' && _loggedIn) {
          try {
            MHXY.api('/api/chat/send', { method:'POST', body:{ text:v.slice(0,200), realm: (typeof curRealm === 'function' ? curRealm() : 0) } }).then(function(r) {
              if (r.ok && r.json && r.json.ok) { inp.value = ''; try { window._srvChat = (window._srvChat || []).concat([{ n: '我', t: v.slice(0, 200) }]); window.renderChatFloat(); } catch(_) {} try { chatHistoryToCache(); } catch(_) {} }
              else if (r.status === 429) { try { toastLog('sys', '发言太快，3秒后再试'); } catch(_) {} }
              else if (r.status === 401) { try { toastLog('sys', '登录已过期，请到真人联机重新登录后再发言'); } catch(_) {} }
              else { try { toastLog('sys', '发送失败' + (r.netErr ? '（网络不通）' : '')); } catch(_) {} }
            });
          } catch(_) {}
          return;
        }
        if (tab === 'world') { try { toastLog('sys', '登录真人联机后可在世界频道发言'); } catch(_) {} } else if (tab === 'sect' || tab === 'ally') { inp.value = ''; try { sectChatSend(tab, v); } catch(_) {} } else save(); window.renderChatFloat(); };
      if (sendBtn) sendBtn.onclick = doSend;
      if (inp) inp.onkeydown = e => { if (e.key === 'Enter') doSend(); };
      const box = cf.querySelector('.cfmsgs'); if (box) box.scrollTop = box.scrollHeight;
    };
    const mfb = document.getElementById('msgFilterBtn'); const mfp = document.getElementById('msgFilterPop');
    const renderMfp = () => { if (!mfp) return; let mf; try { mf = JSON.parse(localStorage.getItem('msgFilter') || '{"world":1,"sect":1,"team":1,"diary":1}'); } catch(_) { mf = {world:1,sect:1,team:1,diary:1}; } const btn = (k, label) => `<button data-mf="${k}" style="display:block;width:100%;text-align:left;background:${mf[k] ? '#2a2a4e' : '#111'};border:1px solid #444;color:${mf[k] ? '#fff' : '#666'};border-radius:6px;padding:8px;margin-bottom:4px;font-size:13px;cursor:pointer">${mf[k] ? '✅' : '🚫'} ${label}</button>`; mfp.innerHTML = `<div style="font-size:12px;color:#888;margin-bottom:6px">选择不看的消息</div>${btn('world','世界聊天')}${btn('sect','宗门聊天')}${btn('team','组队聊天')}${btn('diary','每步操作')}`; mfp.querySelectorAll('[data-mf]').forEach(b => b.onclick = () => { const k = b.dataset.mf; try { const _mf = JSON.parse(localStorage.getItem('msgFilter') || '{"world":1,"sect":1,"team":1,"diary":1}'); _mf[k] = _mf[k] ? 0 : 1; localStorage.setItem('msgFilter', JSON.stringify(_mf)); } catch(_) {} renderMfp(); }); };
    if (mfb && mfp) mfb.onclick = (e) => { e.stopPropagation(); const show = mfp.style.display === 'none'; if (show) renderMfp(); mfp.style.display = show ? 'block' : 'none'; };
    document.addEventListener('click', (e) => { const _p = document.getElementById('msgFilterPop'); if (_p && _p.style.display !== 'none' && !e.target.closest('#msgFilterPop') && !e.target.closest('#msgFilterBtn')) _p.style.display = 'none'; });
    const ctb = document.getElementById('chatToggleBtn');
    const applyChat = () => { const cf = document.getElementById('chatFloat'); const on = localStorage.getItem('chatFloatOn') === '1'; if (cf) cf.classList.toggle('on', on); if (ctb) ctb.style.opacity = on ? '1' : '0.4'; if (on) window.renderChatFloat(); }; // v509；v575 输入栏常驻
    if (ctb && !ctb._bound) { ctb._bound = 1; ctb.onclick = () => { const on = localStorage.getItem('chatFloatOn') === '1'; if (!on) { localStorage.setItem('chatFloatOn', '1'); } else { const _order = ['world','sect'].concat((window._mySect && window._mySect.alliance) ? ['ally'] : [], ['team','diary']); const _cur = window._chatTab || 'world'; const _nx = _order[(_order.indexOf(_cur)+1) % _order.length]; window._chatTab = _nx; } applyChat(); }; } // v501 💬开着时轮切tab
    applyChat();
    // v479 聊天框自由拖动（事件委托，防innerHTML重写冲掉）
    if (!window._chatDragInit) { window._chatDragInit = 1;
      // v502 顶部拉手：底部固定，只调高度
      try {
        let _tsy=0, _th=0, _tresizing=false;
        const _cf2 = () => document.getElementById('chatFloat');
        const _isTop = (t) => t && t.closest && t.closest('.cftop') && !t.closest('[data-cfclose]'); // v518 点✖️不触发拖动
        const _tstart = (x, y, t) => { if (!_isTop(t)) return false; const cf = _cf2(); if (!cf) return false; const _box = cf.querySelector('.cfbox'); if (!_box) return false; _tsy=y; _th=_box.getBoundingClientRect().height; _tresizing=true; return true; };
        const _tmove = (x, y) => { if (!_tresizing) return; const cf = _cf2(); if (!cf) return; const _box = cf.querySelector('.cfbox'); if (!_box) return; let _nh = _th + (_tsy - y); _nh = Math.max(120, Math.min(window.innerHeight - 200, _nh)); _box.style.height=_nh+'px'; try { localStorage.setItem('chatFloatH', String(Math.round(_nh))); } catch(e){} };
        const _tend = () => { _tresizing=false; };
        document.addEventListener('touchstart', e => { if (e.touches.length===1) { if (_tstart(0, e.touches[0].clientY, e.target)) e.preventDefault(); } }, {passive:false});
        document.addEventListener('touchmove', e => { if (_tresizing && e.touches.length===1) { _tmove(0, e.touches[0].clientY); e.preventDefault(); } }, {passive:false});
        document.addEventListener('touchend', _tend);
        document.addEventListener('mousedown', e => { _tstart(0, e.clientY, e.target); });
        document.addEventListener('mousemove', e => _tmove(0, e.clientY));
        document.addEventListener('mouseup', _tend);
        // 恢复保存的高度
        try { const _sh = parseInt(localStorage.getItem('chatFloatH')||'0', 10); if (_sh >= 120) { const _cf3 = _cf2(); const _b3 = _cf3 && _cf3.querySelector('.cfbox'); if (_b3) _b3.style.height = _sh+'px'; } } catch(e){}
      } catch(_){}
      return;
      try {
        const _cf = () => document.getElementById('chatFloat');
        let _saved = JSON.parse(localStorage.getItem('chatFloatPos') || 'null'); if (_saved && !_saved.v494) { try { localStorage.removeItem('chatFloatPos'); } catch(e){} _saved = null; } // v494
        const _applySaved = () => { const cf = _cf(); if (cf && _saved) { cf.style.left = _saved.l+'px'; cf.style.right = 'auto'; cf.style.top = _saved.t+'px'; cf.style.bottom = 'auto'; if (_saved.w) cf.style.width = _saved.w+'px'; if (_saved.h) { const _b = cf.querySelector('.cfbox'); if (_b) _b.style.height = _saved.h+'px'; const _m = cf.querySelector('.cfmsgs'); if (_m) _m.style.maxHeight = Math.max(60, _saved.h-170)+'px'; } } }; // v496
        _applySaved(); setTimeout(_applySaved, 500);
        let _sx=0, _sy=0, _ol=0, _ot=0, _dragging=false;
        const _isTabs = (t) => t && t.closest && t.closest('.cftabs');
        const _start = (x, y, t) => { if (!_isTabs(t)) return false; const cf = _cf(); if (!cf) return false; const r = cf.getBoundingClientRect(); _sx=x; _sy=y; _ol=r.left; _ot=r.top; _dragging=true; cf.style.right='auto'; cf.style.bottom='auto'; cf.style.width=r.width+'px'; if (cf) { const _tb = cf.querySelector('.cftabs'); if (_tb) _tb.style.cursor='move'; } return true; };
        const _move = (x, y) => { if (!_dragging) return; const cf = _cf(); if (!cf) return; let _nl = _ol + x - _sx, _nt = _ot + y - _sy; _nl = Math.max(0, Math.min(window.innerWidth - 80, _nl)); _nt = Math.max(0, Math.min(window.innerHeight - 80, _nt)); cf.style.left=_nl+'px'; cf.style.top=_nt+'px'; };
        const _end = () => { if (!_dragging) return; _dragging=false; const cf = _cf(); if (!cf) return; const r = cf.getBoundingClientRect(); try { localStorage.setItem('chatFloatPos', JSON.stringify({l:Math.round(r.left), t:Math.round(r.top), w:Math.round(r.width), v494:1})); } catch(e){} };
        document.addEventListener('touchstart', e => { if (e.touches.length===1) _start(e.touches[0].clientX, e.touches[0].clientY, e.target); }, {passive:true});
        document.addEventListener('touchmove', e => { if (_dragging && e.touches.length===1) { _move(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); } }, {passive:false});
        document.addEventListener('touchend', _end);
        document.addEventListener('mousedown', e => { _start(e.clientX, e.clientY, e.target); });
        document.addEventListener('mousemove', e => _move(e.clientX, e.clientY));
        document.addEventListener('mouseup', _end);
        // v486 缩放：按住右下角手柄拖
        let _rsx=0, _rsy=0, _rw=0, _rh=0, _resizing=false;
        const _isRs = (t) => t && t.closest && t.closest('.cfresize');
        const _rstart = (x, y, t) => { if (!_isRs(t)) return false; const cf = _cf(); if (!cf) return false; const r = cf.getBoundingClientRect(); _rsx=x; _rsy=y; _rw=r.width; _rh=r.height; _resizing=true; return true; };
        const _rmove = (x, y) => { if (!_resizing) return; const cf = _cf(); if (!cf) return; let _nw = _rw + x - _rsx, _nh = _rh + y - _rsy; _nw = Math.max(200, Math.min(window.innerWidth - 16, _nw)); _nh = Math.max(120, Math.min(window.innerHeight - 60, _nh)); cf.style.width=_nw+'px'; cf.style.right='auto'; const _box = cf.querySelector('.cfbox'); if (_box) _box.style.height=_nh+'px'; const _msgs = cf.querySelector('.cfmsgs'); if (_msgs) _msgs.style.maxHeight=Math.max(60, _nh-170)+'px'; }; // v496
        const _rend = () => { if (!_resizing) return; _resizing=false; const cf = _cf(); if (!cf) return; try { const _p = JSON.parse(localStorage.getItem('chatFloatPos')||'{}'); const _box = cf.querySelector('.cfbox'); localStorage.setItem('chatFloatPos', JSON.stringify(Object.assign(_p, {w:Math.round(cf.getBoundingClientRect().width), h:Math.round(_box?_box.getBoundingClientRect().height:0), v494:1}))); } catch(e){} };
        document.addEventListener('touchstart', e => { if (e.touches.length===1) { if (_rstart(e.touches[0].clientX, e.touches[0].clientY, e.target)) e.preventDefault(); } }, {passive:false});
        document.addEventListener('touchmove', e => { if (_resizing && e.touches.length===1) { _rmove(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); } }, {passive:false});
        document.addEventListener('touchend', _rend);
        document.addEventListener('mousedown', e => { _rstart(e.clientX, e.clientY, e.target); });
        document.addEventListener('mousemove', e => _rmove(e.clientX, e.clientY));
        document.addEventListener('mouseup', _rend);
      } catch (_) {}
    }
  } catch (_) {}
}
const gainsTxt = g => Object.keys(g).map(k => `${AN[k]}<span class="g">+${g[k]}</span>`).join('、');
const lostName = l => l.store === 'pages' ? C.PAGES[l.k].name : l.store === 'expBooks' ? C.EXP_BOOKS[l.k].name : l.store === 'skillPages' ? SKILLS[l.k].name + '技能残页' : l.store === 'skillBooks' ? SKILLS[l.k].name + '技能书' : l.store === 'inv' ? (([a, g]) => `${C.GRADES[+g]}${AN[a]}丹`)(l.k.split('_')) : l.store === 'petEggs' ? '灵宠蛋' : l.store === 'maiPages' ? '🌀脉络残页' : l.store === 'elixirs' ? (C.potOf(l.k) ? C.QNAME[C.potOf(l.k).q] + C.potOf(l.k).name : l.k) : (({ mats: MATS, ores: ORES, prey: C.PREY, eggs: EGGS, food: MEATS, meds: C.MEDS })[l.store][l.k] || { name: l.k }).name;
const potName = (a, g) => `<span class="q${g}">${C.GRADES[g]}${AN[a]}丹</span>`;

/* ---------- 状态面板 ---------- */
function setBar(id, cur, max, txt) { $(id + 'Bar').style.width = (max > 0 ? Math.max(0, Math.min(100, cur / max * 100)) : 0) + '%'; $(id + 'Txt').textContent = txt; }
function render() {
  try { const _eb = document.getElementById('encBanner'); if (_eb) _eb.style.display = (typeof S !== 'undefined' && S && S.encPending) ? 'block' : 'none'; } catch(_) {} // v1013 奇遇横幅
  try { // v1094 梦境回溯：离线超 2 小时回来必出一场（一天最多一场）；24 小时不点自动散；横幅入梦不弹窗
    if (typeof S !== 'undefined' && S) {
      if (S.dreamPending && Date.now() - (S.dreamPending.createdAt || 0) > 86400000) S.dreamPending = null;
      if (!S.dreamPending && S.dreamDay !== C.todayStr()) {
        const _gap = Date.now() - (S.lastTick || Date.now());
        if (_gap >= 7200000) S.dreamPending = { tier: _gap >= 43200000 ? 2 : _gap >= 21600000 ? 1 : 0, seed: (Date.now() % 1000000) * 1000 + Math.floor(Math.random() * 1000), createdAt: Date.now() };
      }
      const _db = document.getElementById('dreamBanner'); if (_db) _db.style.display = S.dreamPending ? 'block' : 'none';
      if (S._pendingTrib && S.chenyuNext && !S._chenyuShown) { S._chenyuShown = 1; log('sys', '⚡ 雷云异象里，你想起梦里那句话：<span class="y">' + escDg(S.chenyuNext) + '</span>'); S.chenyuNext = null; }
      if (!S._pendingTrib && S._chenyuShown) delete S._chenyuShown;
    }
  } catch(_) {}
  try { const _st = document.getElementById('skyTitle'); const _sl = document.getElementById('skyLine'); if (_sl) _sl.style.display = 'none'; if (_st && typeof S !== 'undefined' && S) { const _sk = C.skyToday(); if (_sk.key !== 'calm') { _st.style.display = 'inline'; _st.textContent = '🌌 ' + _sk.name; _st.title = '天象 · ' + _sk.name + '——' + _sk.desc; if (S._skySeen !== _sk.key + new Date().getDate()) { S._skySeen = _sk.key + new Date().getDate(); log('sys', '🌌 今日天象：<b class="y">' + _sk.name + '</b>——' + _sk.desc + '。'); } } else _st.style.display = 'none'; } } catch(_) {} // v1110 天象缩进标题栏
  try { const _ml = document.getElementById('meritLine'); if (_ml && typeof S !== 'undefined' && S && (S.realm|0) >= 6 && typeof meritDaysLeft === 'function') { const _dl = meritDaysLeft(); if (_dl <= 3) { _ml.style.display = 'block'; _ml.textContent = '🌩️ 大劫 ' + _dl + ' 天后降临 · 功德 ' + (S.merit|0) + '/100'; } else _ml.style.display = 'none'; } else if (_ml) _ml.style.display = 'none'; } catch(_) {} // v1015 大劫示警
  try { if (typeof window !== 'undefined' && !window.pk) { try { pk = null; } catch(_) {} } } catch(_) {} // v845 render开头同步：window.pk为空时本地pk也清，避免操作旧对象（v843条件太严，undefined没覆盖）
  try { // v802 全局兜底：心魔已死强制结算；v805 加调试日志
    const _G = (typeof G !== 'undefined' ? G : window);
    const _pk = (typeof pk !== 'undefined' && pk) ? pk : (_G.pk ? _G.pk : null);
    if (_pk && _pk.battle && _pk.battle.B) {
      const _bhp = _pk.battle.B.hp, _trib = _pk.trib, _bname = _pk.battle.B.name || '';
      const _isDemon = _trib === 'demon' || _bname.indexOf('心魔') >= 0;
      if (_isDemon && _bhp < 1) {
        if (typeof pkHandleOver === 'function') { pkHandleOver(); return; }
      }
    }
  } catch(_e) {}
try { if (typeof C !== 'undefined' && typeof C.afkHourly === 'function' && typeof S !== 'undefined' && S) C.afkHourly(S); } catch(_) {} // v1161 经 C 调 afkHourly（原裸引用解析不到，凝气每小时结算一直被跳过；出关全算不丢收益，但关内引气入体不涨）
  if (typeof S === 'undefined' || !S) { try { load(); } catch(_) {} }
  if (typeof S === 'undefined' || !S) return;
  try { renderWorldMap(); } catch (_) {}
  /* 战斗中只显示战斗界面，隐藏主界面 header */
  const hdr = document.querySelector('header'); if (hdr) hdr.style.display = pk ? 'none' : '';
  /* 体力耗尽时主界面显示闭关选择（不再弹窗） */
  if (S.bc && S.bc.length) { // 全服通告：弹横幅 + 记日志
    const items = S.bc; S.bc = [];
    const b = $('bcBanner'); b.innerHTML = items.join('<br>'); b.style.display = 'block';
    clearTimeout(b._t); b._t = setTimeout(() => b.style.display = 'none', 6000);
    items.forEach(h => log('good', h));
  }
  const a = S.attrs, hpMax = C.bumpPeak(S) * 5, hpFull = (a.str + a.def + a.vit) * 5, hp = S.hpCur != null ? Math.max(0, Math.min(hpMax, Math.floor(S.hpCur))) : hpFull;
  $('lv').textContent = 'Lv.' + ((S.realm|0) * 10 + (S.level|0)); // v623 顶栏显示累计等级
  setBar('hp', hp, hpMax, `生命 ${C.fmtN(hp)}/${C.fmtN(hpMax)}`);
  const advVit = Math.floor(S.advVit || 0);
  const hpFillEl = $('hpBar');
  if (advVit > 0 && hpMax > 0) {
    // 黄条在生命条上显示：橙色临时在左，绿色基础在右；有溢出时像仙力条一样显示相对基础上限的百分比
    const total = hp + advVit * 5, totMax = hpMax + advVit * 5;
    const yPct = total > 0 ? (advVit * 5 / total * 100) : 0;
    hpFillEl.style.width = Math.min(100, totMax > 0 ? total / totMax * 100 : 0) + '%';
    hpFillEl.style.background = `linear-gradient(90deg,#f97316 0%,#f97316 ${yPct}%,#22c55e ${yPct}%,#22c55e 100%)`;
    $('hpOverWrap').style.display = 'none';
    $('hpTxt').textContent = `生命 ${C.fmtN(total)}/${C.fmtN(hpMax)} (${Math.round(total / hpMax * 100)}%)`;
  } else {
    hpFillEl.style.background = '';
    $('hpOverWrap').style.display = 'none';
  }

  const mpWrap = $('mpBar').parentElement;
  if (C.useFali(S)) { const isXian = (S.realm|0) >= 8; const _nc = C.manaCap(S), _ec = C.manaCapEff(S); S.mana = Math.max(0, Math.min(_ec, S.mana|0)); if (S.mana <= _nc) S.shaExcess = 0; const mMax = C.manaMax(S); const pct = mMax > 0 ? S.mana / mMax * 100 : 0; const isOver = pct > 100; mpWrap.className = 'bar mp' + (isXian ? ' xian' : ''); const mpFill = mpWrap.querySelector('i'); const mTxt = `${isXian ? '仙力' : '法力'} ${C.fmtN(S.mana)}/${C.fmtN(mMax)}`; if (isOver) { const _pp = Math.min(100, (S.mana - mMax) / (mMax||1) * 100).toFixed(1); mpFill.style.width = '100%'; const oc = isXian ? '#e04040' : '#9b30ff', bc = isXian ? '#7b2ff7' : '#3b9ddd'; mpFill.style.background = `linear-gradient(90deg,${oc} 0%,${oc} ${_pp}%,transparent ${_pp}%),${bc}`; mpWrap.querySelector('span').textContent = mTxt + ` (${Math.round(S.mana / mMax * 100)}%)`; } else { mpFill.style.background = ''; mpFill.style.width = ''; setBar('mp', S.mana, mMax, mTxt); } }
  else { mpWrap.className = 'bar vig'; setBar('mp', S.vigor|0, C.vigorCap(S), `活力 ${S.vigor|0}/${C.vigorCap(S)}`); }
  $('manaBarWrap').style.display = 'none'; // 主界面不显示生活技能法力条，只在生活页看
  const xpWrap = $('xpBar').parentElement;
  xpWrap.style.display = 'none'; // 经验条已移到升级/轮回中间
  const lvBtn = $('lvUpBtn'); lvBtn.style.display = ''; lvBtn.disabled = !C.canLevelUp(S); lvBtn.querySelector('.t').textContent = (S.level === C.REALM_MAX_LV - 1) ? '⬆️ 突破圆满' : '⬆️ 升级'; // v566 9级按钮叫突破圆满 lvBtn.style.fontSize = '11px'; lvBtn.style.padding = '4px 8px'; lvBtn.style.whiteSpace = 'nowrap'; lvBtn.style.width = 'auto'; lvBtn.style.flex = 'none';
  const rcBtn = $('reincBtn'); rcBtn.style.display = !S.dead ? '' : 'none'; rcBtn.style.fontSize = '11px'; rcBtn.style.padding = '4px 8px'; rcBtn.style.whiteSpace = 'nowrap'; rcBtn.style.width = 'auto'; rcBtn.style.maxWidth = '90px'; rcBtn.style.flex = 'none'; rcBtn.style.marginLeft = 'auto';
  // v450 回滚v436：#lvRow恢复隐藏（用户确认之前外面看不到经验/升级/轮回）
  // 中间升级所需法力条（大圆满显示提示）
  if (C.useFali(S)) { if (S.level < C.REALM_MAX_LV) { const need = C.manaNeed(S, S.level); const mn = (S.realm|0) >= 8 ? '仙力' : '法力'; setBar('manaNeed', S.mana, need, `升级需 ${S.mana}/${need} ${mn}`); } else { setBar('manaNeed', 1, 1, '已大圆满，可突破'); } }
  else { const need = C.xpNeed(S.level); setBar('manaNeed', S.xp, need, S.level >= C.REALM_MAX_LV ? `经验 ${S.xp}（大圆满）` : `经验 ${S.xp}/${need}`); }
  $('manaNeedWrap').classList.toggle('xp', !C.useFali(S));
  $('manaNeedWrap').style.display = '';
  const _btXpOk = (S.realm|0) !== 0 || S.level >= C.REALM_MAX_LV || (S.xp|0) >= C.xpNeed(C.REALM_MAX_LV - 1); // v574 凡人经验不足不显示突破按钮;v713 满级直接通过
  const _needThunder = (S.realm|0) >= 2; // v640 筑基起需雷云判定
  $('btBtn').style.display = (S.level >= C.REALM_MAX_LV && !S.dead && S.realm < C.REALMS.length - 1 && _btXpOk && !C.isPermanentlyDegraded(S) && (!_needThunder || S.thunderOk)) ? '' : 'none'; // v590 第二次失败才隐藏；v629 需雷云判定成功
  $('alcBar').parentElement.style.display = 'none'; // 主界面不显示炼药条（生活页里看）
  $('attrs').style.display = 'none'; // v118 五维移入个人属性面板，主界面只留血条+活力/法力条
  $('stam').textContent = S.stamina; $('vig').textContent = S.vigor;
  const vigSpan = $('vig').parentElement; if (vigSpan) vigSpan.style.display = (S.realm|0) >= 1 ? 'none' : ''; // 练气后隐藏活力
  $('gold').textContent = S.gold;
  $('invCnt').textContent = C.invCount(S);
  const ap = C.activePet(S), aQ = ap ? petQ(ap) : null; $('petState').innerHTML = ap ? `${PETS[ap.k].icon} <b style="color:${aQ.color}">${PETS[ap.k].name}</b> <small>饥饿 <b class="${ap.hunger < K.PET_HUNGRY ? 'r' : ''}">${Math.round(ap.hunger)}</b> 忠诚 <b class="${ap.loyal < 30 ? 'r' : ''}">${ap.loyal}</b> 寿命 <b class="${ap.life <= 20 ? 'r' : ''}">${ap.life}</b></small>` : '';
  const db = $('deathBanner'); db.style.display = S.dead ? 'block' : 'none';
  if (S.dead) { const t = new Date(); t.setDate(t.getDate() + 1); db.innerHTML = `☠️ <b>你已${S.dead.cause === 'poison' ? '毒发' : '流血'}身亡</b>，今日无法修炼、生活技能、冒险、PK。<br>明日（${t.getMonth() + 1}月${t.getDate()}日）<b>签到</b>即可复活（${S.dead.cause === 'poison' ? `复活后生命为 ${Math.max(1, Math.ceil(S.dead.base / 2))}，但仍身中剧毒，需用解毒丹` : '复活后生命仅剩 1，需重新修炼'}）。`; }
  const ab = $('afkBanner'); // 体力耗尽：闭关挂机选择
  if (!S.dead && S.stamina <= 0 && !S.afk) {
    const lbl = C.resLbl(S);
    ab.style.display = 'block';
    ab.innerHTML = `🧘 <b>体力耗尽</b>，请点左侧地图⛰️区闭关积累${lbl}（无上限），下次签到或体力恢复时自动出关。`;
    if (!ab.dataset.ts10) { ab.dataset.ts10 = '1'; setTimeout(() => { ab.style.display = 'none'; delete ab.dataset.ts10; }, 10000); } // v561 体力耗尽横幅只显示10秒
  } else if (S.afk) {
    delete ab.dataset.ts10;
    ab.style.display = 'block';
    const afkType = S.afk.type;
    const typeName = afkType === 'vein' ? '灵脉' : afkType === 'cave' ? '洞府' : afkType === 'wushu' ? '习武' : '凝气';
    const typeIcon = afkType === 'wushu' ? '🥋' : afkType === 'ningqi' ? '🌀' : '🧘';
    let gainDesc = '';
    const _dbgMs = (S.afk && S.afk.dbgAdd) || 0;
    if (afkType === 'wushu') { const mins = Math.floor((Date.now() - S.afk.start + _dbgMs) / 60000); const _w2x = ((C.setCounts(S).fatal || 0) >= 2) ? 2 : 1; gainDesc = `已 ${mins} 分钟，已累积 <span class="g">经验 +${mins * _w2x}</span>${_w2x > 1 ? '（力量套隐藏翻倍）' : ''}`; }
    else if (afkType === 'ningqi') { const hrs = Math.floor((Date.now() - S.afk.start + _dbgMs) / 3600000); const _hc = ((C.setCounts(S).heal || 0)), _hi = _hc >= 2 ? Math.min(5, _hc) - 2 : -1, _nb = _hi >= 0 ? C.GEAR_SETS.heal.ningqi[_hi] : 0, _ag = _hi >= 0 ? C.GEAR_SETS.heal.ningqiAgain[_hi] : 0, _rt = Math.round(Math.min(0.95, 0.30 + _nb) * 100); gainDesc = `已 ${hrs} 小时（每小时${_rt}%得150经验${_nb > 0 ? '，含治愈套隐藏加成' : ''}${_ag > 0 ? `，${Math.round(_ag * 100)}%双倍` : ''}）`; }
    else { const secs = Math.floor((Date.now() - S.afk.start + _dbgMs) / 1000); const gain = secs * (afkType === 'vein' ? 2 : 1); gainDesc = `已 ${Math.floor(secs/60)} 分 ${secs%60} 秒，已累积 <span class="g">${C.resLbl(S)} +${gain}</span>`; }
    ab.innerHTML = `${typeIcon} <b>${typeName}中</b>（${gainDesc}）<br><small style="color:var(--dim)">下次签到或吃东西恢复体力时自动出关结算${afkType === 'vein' ? ' · 灵脉闭关入关1小时后会被真人PK匹配（输赢照常结算、不打断闭关）' : ''} · 闭关中只能用商会/背包/生活</small>`;
  } else ab.style.display = 'none';
  const rb = $('realmBanner'); // 大圆满：突破/轮回
  if (!S.dead && S.level >= C.REALM_MAX_LV) {
    const _needSanShi = (S.realm|0) >= 10 && (S.sanShi || [0,0,0]).filter(x=>x).length < 3; // v859 需斩三尸时显示banner
    rb.style.display = _needSanShi ? 'block' : 'none'; // 有独立按钮时隐藏，但斩三尸需显示
    const bonus = C.reincBonus(S), next = C.REALMS[S.realm + 1], btB = Math.min(20, S.btTotal || 0);
    let _btBtn = '';
    if ((S.realm|0) >= 10) { // v812 合体大圆满需先斩三尸；v820 尊者及以上可补斩
      S.sanShi = S.sanShi || [0,0,0];
      const _names = ['上尸·彭倨', '中尸·彭质', '下尸·彭矫'];
      const _cut = S.sanShi.filter(x=>x).length;
      const _isBu = (S.realm|0) > 10; // 已过合体，补斩
      if (_cut < 3) {
        _btBtn = `<div style="margin:4px 0;padding:8px;border:1px solid #a33;border-radius:6px;background:#1a0a0a"><b class="r">⚔️ 斩三尸${_isBu ? '（补）' : ''}</b> <small>（${_cut}/3）${_isBu ? '当年未斩，今日补之' : '合体入尊者，需先斩去三尸'}</small><br>` +
          _names.map((n,i)=> S.sanShi[i] ? `<span class="g">✓ ${n}已斩</span>` : `<button class="btn" data-sanshi="${i}" style="margin:4px 4px 0 0">⚔️ 斩${n}</button>`).join(' ') +
          `</div>` + (_isBu ? '' : '');
        if (!_isBu) {
          // 合体时，斩完才显示突破按钮
        } else {
          // 尊者及以上，补斩不影响突破，只显示斩三尸
          _btBtn += `<div style="margin-top:4px">` + (next ? `<button class="btn gold" data-breakthrough style="margin:4px 4px 0 0">⚡ 突破至${next}（成功率 ${C.pct(C.breakthroughRate(S))}）</button>` : `<small class="y">已至最高境界【主宰】</small>`) + `</div>`;
        }
      } else {
        _btBtn = (next ? `<button class="btn gold" data-breakthrough style="margin:4px 4px 0 0">⚡ 突破至${next}（三尸已斩，成功率 ${C.pct(C.breakthroughRate(S))}）</button>` : `<small class="y">已至最高境界【主宰】</small>`);
      }
    } else {
      _btBtn = (next ? `<button class=\"btn gold\" data-breakthrough style=\"margin:4px 4px 0 0\">⚡ 突破至${next}</button>` : `<small class=\"y\">已至最高境界【主宰】</small>`);
    }
    rb.innerHTML = `🌟 <b>${C.REALMS[S.realm]}·大圆满</b> <small>轮回加成：升级全属性 +${1 + bonus}（已轮回 ${bonus} 次，各境上限 10）· 突破经验 +${btB}% 成功率</small><br>` +
      _btBtn +
      `<button class="btn" data-reincarnate style="margin:4px 0 0">🔄 轮回重修（回凡人 Lv.1，其余全保留；${S.realm === 12 ? '主宰轮回：前面各境池 +1' : C.REALMS[S.realm] + '已轮回 ' + (S.reinc[S.realm] || 0) + ' 次'}）</button>`;
  } else rb.style.display = 'none';
  $('hgState').innerHTML = `🍗 饱食 <b class="${S.hunger >= K.WELL_FED ? 'g' : S.hunger < 30 ? 'r' : 'y'}">${Math.floor(S.hunger)}</b>${S.hunger >= K.WELL_FED ? ' <small class="g">气运</small>' : ''} · ⏳寿元 <b class="${(S.lifespan|0) <= 10 ? 'r' : (S.lifespan|0) <= 30 ? 'y' : 'g'}">${S.lifespan|0}</b><small>年</small> · 🌀络 <b class=\"y\">${C.maiLuo(S)}</b><small>条</small> · 脉 <b class=\"y\">${C.maiMai(S)}</b><small>条</small> · 🌫️灵气 <b class="${C.qiNow() <= 15 ? 'r' : C.qiNow() >= 86 ? 'y' : 'g'}">${C.qiTierName(C.qiNow())}</b>`;
  $('stState').innerHTML = S.dead ? '' : ((S.curseN|0) > 0 ? `<span class="r">👻诅咒×${S.curseN}</span><small style="color:var(--dim)">突破-${S.curseN}%</small> ` : '') + C.activeStatus(S).map(k => `<span class="r">${C.STATUS[k].icon}${C.STATUS[k].name}</span><small style="color:var(--dim)">${k === 'depress' ? Math.ceil((S.status[k] - Date.now()) / 3600000) + 'h' : k === 'poison' ? '余' + C.leftBeforeDeath(S, k) + '体力' : '余' + C.leftBeforeDeath(S, k) + '签'}</small>`).join(' ') + (!S.dead ? Object.entries(C.setCounts(S)).filter(([k, n]) => n >= 2).map(([k, n]) => ` <span class="y">🛡️${C.GEAR_SETS[k].name}${n}</span>`).join('') : '') + (S.buff && !S.dead ? ` <span class="y">🍲${BUFFN(S.buff)}</span><small style="color:var(--dim)">余${S.buff.left}${S.buff.k === 'luck' ? '体力' : '战'}</small>` : '') + (S.protect > 0 && !S.dead ? ` <span class="y">🛡️新人保护×${S.protect}</span>` : '');
  $('ciState').innerHTML = C.canCheckin(S) ? '<span class="y">今日未签到</span>' : '今日已签到 ✓';
  renderActions();
}
function medIcon() { return (typeof S !== 'undefined' && S && S.gender === 'f') ? '🧘‍♀️' : '🧘'; } // v198 打坐图标：男🧘/女🧘‍♀️（闭关打坐中时功能栏显示）
function doDazuo() { // v199 打坐调息：恢复10%生命上限；v277 1分钟冷却；v1112 不耗体力
  if (S.dead || S.afk) { toastLog('sys', S.dead ? '已死亡，无法调息' : '闭关中，无法调息'); return; }
  const now = Date.now(), cd = 60000;
  if (S.dazuoCd && now - S.dazuoCd < cd) { const s = Math.ceil((cd - (now - S.dazuoCd)) / 1000); toastLog('sys', `调息冷却中，还需${s}秒`); return; }
  const hpMax = C.bumpPeak(S) * 5, hpFull = (S.attrs.str + S.attrs.def + S.attrs.vit) * 5, cur = S.hpCur != null ? Math.floor(S.hpCur) : hpFull; // v1114 空值按当前属性算，与主界面/战斗同口径
  const _mNeed = (S.realm|0) >= 1 && (S.mana|0) < C.manaCapEff(S); if (cur >= hpMax && !_mNeed) { toastLog('sys', '生命已满，无需调息'); return; }
  S.dazuoCd = now;
  try { if (typeof thunderCheck==='function') thunderCheck(1); } catch(_){} // v642 打坐也触发雷云判定
  const add = cur < hpMax ? Math.min(hpMax - cur, Math.max(1, Math.floor(hpMax * 0.10))) : 0;
  if (add > 0) S.hpCur = cur + add;
  let manaTxt = '';
  const isXian = (S.realm|0) >= 8;
  if (isXian) { S.mana = Math.min(C.manaCapEff(S), (S.mana|0) + 1); manaTxt = `，仙力 <span class="g">+1</span>`; } // v280 仙人运转仙力回1点仙力
  else if ((S.realm|0) >= 1 && C.useFali(S)) { const mMax = C.manaMax(S), mAdd = Math.max(1, Math.floor(mMax * 0.05)); S.mana = Math.min(C.manaCapEff(S), (S.mana|0) + mAdd); manaTxt = `，法力 <span class="g">+${mAdd}</span>`; } // v279 调息回5%法力，凡人没有
  log('good', `${medIcon()} ${isXian ? '运转仙力' : '调息'}${add > 0 ? `，生命 <span class="g">+${add}</span>（${Math.floor(S.hpCur)}/${hpMax}）` : '，生命已满'}${manaTxt}`);
  save(); render();
}
function renderActions() {
  const nav = $('actions');
  if (pk) { renderCombat(); return; }
  // v306 去掉体力耗尽简化版，永远显示完整功能区
  $('combat').classList.remove('on'); nav.classList.add('main'); try { document.body.classList.remove('combating'); } catch(_) {} // v837 战斗结束移除body类
  const _wm2 = $('worldMapSec'); if (_wm2) _wm2.style.display = ''; // v337 恢复地图
  const st = S.stamina, ci = C.canCheckin(S);
  const _isMortal = (S.realm|0) === 0;
  const _afkCaveT = _isMortal ? 'wushu' : 'cave', _afkVeinT = _isMortal ? 'ningqi' : 'vein';
  const _afkCaveT2 = _isMortal ? '🥋 习武' : '🏔️ 洞府', _afkVeinT2 = _isMortal ? '🌀 凝气' : ((S.realm|0) >= 8 ? '⚖️ 参悟法则' : '⛰️ 灵脉'); // v306 仙人显示参悟法则
  const _dzMax = C.bumpPeak(S) * 5, _dzCur = S.hpCur != null ? Math.floor(S.hpCur) : (S.attrs.str + S.attrs.def + S.attrs.vit) * 5, _dzCdOk = !(S.dazuoCd && Date.now() - S.dazuoCd < 60000), _dzManaNeed = (S.realm|0) >= 1 && (S.mana|0) < C.manaCapEff(S), _canDz = !S.dead && !S.afk && (_dzCur < _dzMax || _dzManaNeed) && _dzCdOk; // v1112 调息不耗体力，体力不再是可用条件
  nav.innerHTML = `
    <div style="display:flex;align-items:center"><button class="act" data-char style="padding:0;overflow:hidden;border-radius:50%;aspect-ratio:1/1;width:30px"><img src="${avatarUrl()}" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:50%"></button></div> <!-- v488 再缩小 -->
    <div style="display:flex;flex-direction:column;gap:1px;grid-column:span 2"><button class="act ${ci ? 'primary' : ''}" data-a="checkin" ${ci ? '' : 'disabled'} style="flex:1;padding:1px;min-height:0"><span class="t" style="font-size:9px">签到</span><span class="s" style="font-size:7px">${ci ? '+' + C.checkinAmount(S) + '体力' : '明日再来'}</span></button></div> <!-- v451 移除PK/擂台；v475 缩小；v488 再压 -->
    <div style="display:flex;flex-direction:column;gap:1px;grid-column:span 2"><button class="act" data-a="bag" style="flex:1;padding:1px;min-height:0"><span class="t" style="font-size:9px">背包</span><span class="s" style="font-size:7px">${C.invCount(S)}瓶丹药</span></button></div> <!-- v454 移除商会；v474 移除生活；v475 缩小；v488 再压 -->
    ${S.afk ? `<button class="act primary" id="afkExitBtn" style="padding:1px"><span class="t" style="font-size:9px">${S.afk.type === 'vein' ? ((S.realm|0) >= 8 ? '⚖️ 参悟法则中' : '🌀 凝气中') : S.afk.type === 'cave' ? medIcon() + ' 调息中' : '🛌 出关'}</span><span class="s" style="font-size:7px">点击出关结算</span></button>` : `<div style="display:flex;flex-direction:column;gap:1px;grid-column:span 3"><button class="act" data-a="dazuo" ${_canDz ? '' : 'disabled'} style="flex:1;padding:1px;min-height:0"><span class="t" style="font-size:9px">${medIcon()} ${(S.realm|0) >= 8 ? '运转仙力' : '调息'}</span><span class="s" style="font-size:7px">${(S.realm|0) >= 8 ? '10%生命+1仙力' : '10%生命+5%法力'}</span></button></div>`} <!-- v474 移除两个闭关按钮，改走地图(0,3)；v475 缩小 -->
    <!-- v453 功能区修炼按钮已移除，改走地图(1,5)修炼区 -->
    ${((S.realm|0) >= 8 || (S.dongfuGrids|0) + (S.xianfuGrids|0) > 0) ? `<div style="display:flex;flex-direction:column;gap:1px;grid-column:span 2"><button class="act" data-a="cave" style="flex:1;padding:2px;min-height:0"><span class="t" style="font-size:10px">🏔️ 洞府</span><span class="s" style="font-size:8px">${(S.dongfuGrids|0)+(S.xianfuGrids|0)>0 ? `${S.dongfuGrids|0}格${(S.xianfuGrids|0)>0?`+${S.xianfuGrids|0}仙府`:''}` : '仙家洞府'}</span></button></div>` : ''}
    <div id="chatInputRow" style="display:flex;grid-column:1/-1;gap:6px;align-items:center"><input id="cfInput" maxlength="100" placeholder="说点什么…" style="flex:1;padding:6px 8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff;font-size:12px"><button data-cfsend style="padding:6px 12px;border-radius:6px;background:#c9a227;color:#000;font-size:12px;flex:none">发送</button></div>`; // v475 功能区整体缩小；v509 聊天输入放功能栏
  setTimeout(() => {
    const _cfi = $('cfInput'); if (_cfi && !_cfi._bound) { _cfi._bound = 1; _cfi.onkeydown = e => { if (e.key === 'Enter') { const _sb = document.querySelector('[data-cfsend]'); if (_sb) _sb.click(); } }; } // v1008 回车发送
    const bb2 = $('burnBloodBtn'); if (bb2) bb2.onclick = () => { S.burnBlood = !S.burnBlood; save(); render(); toastLog('sys', `🔥燃血已${S.burnBlood ? '开启' : '关闭'}`); };
    /* burnSpiritBtn2 replaced by tier buttons */
    const aeb = $('afkExitBtn'); if (aeb) aeb.onclick = () => { let gain = 0; try { gain = afkExit(S, 'manual'); } catch(e) {} S.afk = null; try { const lbl = C.resLbl(S); log('good', gain > 0 ? `🛌 出关，获得 <span class="g">${lbl} +${gain}</span>` : `🛌 出关（无收益）`); } catch(e) {} save(); render(); };
    const _afkEnter = (type, msg) => { if (S.afk) { try { afkExit(S, 'switch'); } catch(e) {} S.afk = null; } S.afk = { type, start: Date.now() }; try { log('good', msg); } catch(e) {} save(); render(); };
    const acb = $('afkCaveBtn'); if (acb) acb.onclick = () => _afkEnter(_afkCaveT, (S.realm|0) === 0 ? '🥋 开始习武…' : '🧘 开始洞府闭关挂机…');
    const avb = $('afkVeinBtn'); if (avb) avb.onclick = () => _afkEnter(_afkVeinT, (S.realm|0) === 0 ? '🌀 开始凝气…' : '🧘 开始灵脉闭关挂机…');
  }, 0);
}
function fRow(f) {
  if (f.isPet && f.hp <= 0) return `<div style="font-size:10px;color:var(--dim);opacity:.5;padding:2px 0 2px 6px">🐾${esc(f.name)} <span class="r">💫已倒下</span></div>`;
  const isMortal = f.isPlayer && f.S && (f.S.realm|0) === 0; // 凡人没有蓝
  const isXianF = f.isPlayer && f.S && (f.S.realm|0) >= 8;
  // 法力溢出显示（与主界面一致）：蓝底+紫溢出，文字带总量百分比
  const mpOver = !isMortal && f.maxMp > 0 && f.mp > f.maxMp;
  const mpPctTxt = mpOver ? ` (${Math.round(f.mp / f.maxMp * 100)}%)` : '';
  let mpStyle;
  if (mpOver) {
    const _pp = Math.min(100, (f.mp - f.maxMp) / (f.maxMp||1) * 100).toFixed(1);
    const oc = isXianF ? '#e04040' : '#9b30ff', bc = isXianF ? '#7b2ff7' : '#3b9ddd';
    mpStyle = `width:100%;background:linear-gradient(90deg,${oc} 0%,${oc} ${_pp}%,transparent ${_pp}%),${bc}`;
  } else {
    mpStyle = `width:${f.maxMp ? f.mp / f.maxMp * 100 : 0}%`;
  }
  const _advVit = (f.isPlayer && f.S && (f.S.advVit|0) > 0) ? (f.S.advVit|0) * 5 : 0;
  const _baseMax = f.maxHp - _advVit;
  const _yHp = Math.max(0, Math.min(f.hp, f.hp - _baseMax));
  const _yPct = (f.hp > 0 && _yHp > 0) ? (_yHp / f.hp * 100) : 0;
  const _hpStyle = _yPct > 0 ? `width:${f.hp / f.maxHp * 100}%;background:linear-gradient(90deg,#f97316 0%,#f97316 ${_yPct}%,#22c55e ${_yPct}%,#22c55e 100%)` : `width:${f.hp / f.maxHp * 100}%`;
  const _pInfo = (!f.isPlayer && !f.isPet && f.name) ? (() => { try { return encodeURIComponent(JSON.stringify({name:f.name, realm:f.realm||0, level:f.lv||f.level||1, attrs:f.a||f.attrs||{}, skills:f.skills||[], style:f.style||'', pet:f.pet||null})); } catch (_) { return ''; } })() : '';
  const _pLink = _pInfo ? ` data-person="${esc(f.name)}" data-info="${_pInfo}"` : (f.isPlayer ? ` data-self="1"` : '');
  const _nmInner = `${f.isPlayer ? `<img src=\"${avatarUrl()}\" style=\"width:22px;height:22px;border-radius:50%;vertical-align:middle;object-fit:cover;margin-right:4px\">` : ``}${f.name}`; // v773 怪物/雷云不显示人物头像
  const _nmHtml = _pInfo ? `<a href="javascript:void(0)"${_pLink} style="color:inherit;text-decoration:underline;cursor:pointer">${_nmInner}</a>` : _nmInner;
  return `<div class="cf${(f._lunge && f.hp > 0) ? ' lunge-' + f._lunge : ''}"${f.isPet ? ' style="opacity:' + (f.hp > 0 ? 1 : .35) + ';filter:grayscale(80%)"' : ''}><span class="nm" style="${f.isPet ? 'font-size:11px;padding-left:6px;' : ''}color:${f.isPlayer ? 'var(--blue)' : 'var(--red)'}">${_nmHtml}</span>
    <div class="bar hp${f._dodged ? ' dodging' : ''}"><i style="${_hpStyle}"></i><span>${C.fmtN(f.hp)}/${C.fmtN(f.maxHp)}${f.shield ? ' 🛡' + C.fmtN(f.shield) : ''}${f.bleed ? ' 🩸' : ''}${f.poison > 0 ? ' ☠️' : ''}${f.burn ? ' 🔥' : ''}</span>${(f._wasHit && f._hitDmg > 0) ? `<span class="dmgnum">-${C.fmtN(f._hitDmg)}</span>` : ''}${f._float ? `<span class="floatxt ${f._float.t}">${f._float.txt}</span>` : ''}</div>
    ${f.isPet ? `<span style="font-size:11px;color:var(--dim)">${f.hp <= 0 ? '<span class="r">💫 已倒下</span>' : '灵宠' + (f.bleed ? ' <span class="r">🩸</span>' : '') + (f.poison > 0 ? ' <span class="r">☠️</span>' : '') + (C.petBiteChance(f) > 0 ? ` <span class="r">反咬${C.pct(C.petBiteChance(f))}</span>` : '')}</span>` : (isMortal ? '' : `<div class="bar mp${isXianF ? ' xian' : ''}"><i style="${mpStyle}"></i><span>${C.fmtN(f.mp)}/${C.fmtN(f.maxMp)}${mpPctTxt}${f.guard ? ' 🐢' : ''}</span></div>`)}</div>`;
}
function renderCombat() {
  try { if (typeof window !== 'undefined') pk = window.pk || null; } catch(_) {} // v836 跨块同步，不留旧对象
  try { // v793 兜底：心魔已死但界面还在，直接走结算；v795 血量<1也算死（小数血量）；v827 防重入破死循环；v830 序号检查
    if (window._inPkOver) return;
    const _G = (typeof G !== 'undefined' ? G : window);
    const _pk = (typeof pk !== 'undefined' && pk) ? pk : (_G && _G.pk ? _G.pk : null);
    if (_pk && window._pkSeq && (!_pk._seq || _pk._seq !== window._pkSeq)) return; // 旧pk忽略
    if (_pk && _pk.trib === 'demon' && _pk.battle && _pk.battle.B && _pk.battle.B.hp < 1) {
      if (typeof pkHandleOver === 'function') { window._inPkOver = true; try { pkHandleOver(); } finally { window._inPkOver = false; } return; }
    }
  } catch(_) { try { window._inPkOver = false; } catch(__) {} }
  if (!pk || !pk.battle) { try { $('combat').classList.remove('on'); document.body.classList.remove('combating'); } catch(_) {} return; } // v840 pk已空时直接关战斗UI
  const b = pk.battle, A = b.A, B = b.B;
  if (pk.target === 'pet' && !(B.pet && B.pet.hp > 0)) pk.target = 'foe'; // 宠物已死切回打人
  try {
    const cb = $('combat');
    const critNow = window._lastCritT && (Date.now() - window._lastCritT < 600);
    cb.classList.toggle('shake', !!critNow);
    if (critNow) { clearTimeout(cb._shkT); cb._shkT = setTimeout(() => cb.classList.remove('shake'), 350); }
  } catch (_) {}
  if (A.isPlayer && A.S && (A.S.realm|0) >= 8) { A.maxMp = Math.max(1, Math.floor(C.manaMax(A.S))); A.mp = Math.max(0, Math.floor(A.S.mana)); }
  $('combat').classList.add('on'); $('actions').classList.remove('main'); try { document.body.classList.add('combating'); } catch(_) {} // v837 战斗时body加类，隐藏顶部条
  const _wm = $('worldMapSec'); if (_wm) _wm.style.display = 'none'; // v337 战斗时隐藏地图
  const _petsHtml = f => (f.pets || []).map(p => fRow(p)).join('');
  // v1051 组队战标识：队长开战时显示队伍成员
  var _teamTag = '';
  try {
    if (window._myTeam && window._isTeamLeader && window._myTeam.members && window._myTeam.members.length > 1){
      var _tnames = window._myTeam.members.map(function(m){ return escH(m.username || '?'); }).join('、');
      _teamTag = '<div style="text-align:center;margin:8px 0;font-size:13px;color:#7ec8ff">👥 组队战：' + _tnames + '</div>';
    }
  } catch(_){}
  $('combat').innerHTML = _teamTag + `<div style="margin-bottom:14px">` + fRow(B) + _petsHtml(B) + `</div><div style="text-align:center;margin:10px 0;font-size:15px;font-weight:bold;color:var(--gold);letter-spacing:6px">⚔️ VS ⚔️ <button class=\"btn\" data-battlelog style=\"font-size:12px;padding:2px 8px;letter-spacing:normal\">📜</button></div>${pk.turnBanner ? `<div class="turnbanner ${pk.turnBanner.who}">${pk.turnBanner.txt}</div>` : ''}<div style="margin-top:14px">` + fRow(A) + _petsHtml(A) + `</div><div style="font-size:11px;color:var(--dim)">第 ${b.round + 1} 回合 · ${A.a.agi > B.a.agi ? '你敏捷更高，先手' : A.a.agi < B.a.agi ? '对手敏捷更高，先手' : '敏捷相同，随机先手'}</div>`;
  for (const f of [A, B, ...(A.pets||[]), ...(B.pets||[])]) if (f) { f._wasHit = 0; f._float = null; f._dodged = 0; f._lunge = null; }
  if (pk.zxPending) { // 战前珍馐：最先手，无视敏捷，每场限用 1 种
    const zxs = Object.keys(S.zx || {}).filter(k => S.zx[k] > 0 && DISHES[k] && DISHES[k].zx);
    $('actions').innerHTML = `<div style="grid-column:1/-1;font-size:12px;color:var(--dim)">🍲 战前珍馐（最先手，无视敏捷，每场限用 1 种）</div>` +
      zxs.map(k => `<button class="act" data-zx="${k}"><span class="t">${DISHES[k].name} ×${S.zx[k]}</span><span class="s">${DISHES[k].zxDesc}</span></button>`).join('') +
      `<button class="act primary" data-zx=""><span class="t">直接开战</span><span class="s">不使用珍馐</span></button>`;
    return;
  }
  const sk = Object.keys(C.SKILLS).filter(k => k !== 'tunmo' && !C.SKILLS[k].passive && A.skills.includes(k)).map(k => { const s = C.SKILLS[k]; return `<button class="act skill" data-c="${k}" ${A.mp >= s.mp ? '' : 'disabled'}><span class="t">${s.name}</span><span class="s">${s.mp} 法力</span></button>`; }).join(''); // v780 被动技能不显示
  const isXian = (S.realm|0) >= 8, isMortal = (S.realm|0) === 0, showBurnFa = !isXian && !isMortal;
  const burnOpts = `<div style="grid-column:1/-1;font-size:10px;color:var(--dim)">🔥燃血${showBurnFa?'💧燃法':''}⏳燃寿（点一下+1层，最高10层）</div>` +
    (() => { const _bt = ((pk && pk.battle && pk.battle.A ? pk.battle.A.burnBloodTier : S.burnBloodTier)|0), _cn = ['','一','二','三','四','五','六','七','八','九','十'][_bt], _bb = [0,20,45,70,100,130,165,205,250,300,355][_bt]; return `<button class="act${_bt>0?' gold':''}" data-burnbloodtier="tap"><span class="t">🔥燃血 ${_bt>0?_cn+'倍':'关'}</span><span class="s">${_bt>0?`${_bt}/10层 -${_bt*5}%血/回合 攻+${_bb}%`:'点+1层，-5%血/回合/层'}</span></button>`; })() +
    (showBurnFa ? (() => { const _bt = ((pk && pk.battle && pk.battle.A ? pk.battle.A.burnTier : S.burnTier)|0), _cn = ['','一','二','三','四','五','六','七','八','九','十'][_bt], _bb = [0,20,45,70,100,130,165,205,250,300,355][_bt]; return `<button class="act${_bt>0?' gold':''}" data-burntier="tap"><span class="t">💧燃法 ${_bt>0?_cn+'倍':'关'}</span><span class="s">${_bt>0?`${_bt}/10层 -${_bt*5}%法/回合 法攻+${_bb}%`:'点+1层，-5%法力/回合/层'}</span></button>`; })() : '') +
    (() => { const _bl = ((pk && pk.battle && pk.battle.A ? pk.battle.A.burnLife : 0)|0); return `<button class="act${_bl>0?' gold':''}" data-burn="life"><span class="t">⏳燃寿 ${_bl>0?'×'+_bl+'层':'关'}</span><span class="s">${_bl>0?`${_bl}/10层 攻+${_bl*30}%`:'点+1层，-10年寿元/层'}</span></button>`; })();
  const _xbOn = (pk && pk.battle && pk.battle.A ? pk.battle.A.xbOn : S.xianBurstOn)|0, _xbPts = (pk && pk.battle && pk.battle.A && pk.battle.A.xbPts != null ? pk.battle.A.xbPts : S.xianBurst)|0;
  const burstOpts = isXian ? `<div style="grid-column:1/-1;font-size:10px;color:var(--dim)">⚡仙力爆发（每点+20%攻击和防御，当前仙力 ${C.fmtN(S.mana)}）</div><button class="act${_xbOn ? ' gold' : ''}" data-xburst="toggle" style="grid-column:1/-1"><span class="t">⚡爆发 ${_xbOn ? '开' : '关'}</span><span class="s">${_xbOn ? _xbPts + '点' : '设置'}</span></button>` : '';
  const tgtOpts = (b.B.pet && b.B.pet.hp > 0) ? `<div style="grid-column:1/-1;font-size:12px;color:var(--dim)">🎯 目标：<button class="act${pk.target === 'pet' ? '' : ' gold'}" data-target="foe" style="padding:4px 10px"><span class="t">${esc(b.B.name)}</span></button> <button class="act${pk.target === 'pet' ? ' gold' : ''}" data-target="pet" style="padding:4px 10px"><span class="t">🐾${esc(b.B.pet.name)}</span></button></div>` : '';
  const _aPets = (b.A.pets || []).filter(p => p.hp > 0 && !p.ko);
  const petOrderOpts = _aPets.length ? `<div style="grid-column:1/-1;font-size:10px;color:var(--dim)">🐾 灵宠指令（点选切换，不消耗回合）</div>` + _aPets.map((p, i) => { const _o = p._order || 'auto'; return `<div style="grid-column:1/-1;display:flex;gap:4px;align-items:center;font-size:11px;color:var(--dim)"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(p.name)}</span>${[['auto','🤖自动'],['attack','⚔️攻击'],['defend','🛡️防御'],['magic','✨法术']].map(([v, t]) => `<button class="act${_o === v ? ' gold' : ''}" data-petorder="${i}:${v}" style="padding:4px 8px;flex:0 0 auto"><span class="t" style="font-size:12px">${t}</span></button>`).join('')}</div>`; }).join('') : '';
  $('actions').innerHTML = `${tgtOpts}${burnOpts}${burstOpts}${petOrderOpts}<button class="act white" data-c="attack"><span class="t">普通攻击</span><span class="s">力量×1</span></button>${!isMortal ? `<button class="act" data-c="mana_attack"><span class="t">${(S.realm|0) >= 8 ? '⚡仙力攻击' : '💧法力攻击'}</span><span class="s">${(S.realm|0) >= 8 ? '1仙力=100万伤' : '1法力=10伤'}</span></button>` : ''}${(S.realm|0) >= 8 ? `<button class="act" data-c="xian_defend"><span class="t">🛡️仙力防御</span><span class="s">1仙力=100万防·1回合</span></button>` : ''}${!isMortal ? `<button class="act" data-c="fashu_defend"><span class="t">🔰法术防御</span><span class="s">${(S.realm|0) >= 8 ? '1仙力=100万法防' : '1法力=10法防'}·1回合</span></button>` : ''}${sk}<button class="act" data-c="defend"><span class="t">防御</span><span class="s">减伤</span></button>${['hp'].map(t => { const n = Object.keys(S.elixirs || {}).filter(k => k[0] === t[0] && k.startsWith(t)).reduce((a, k) => a + S.elixirs[k], 0); return n ? `<button class="act" data-c="pot:${t}"><span class="t">${C.POTIONS[t].name}</span><span class="s">×${n} · 用最好的</span></button>` : ''; }).join('')}
    <button class="act" data-battlebag style="grid-column:span 3;padding:6px"><span class="t">🎒 背包</span><span class="s">使用药水/疗伤药（消耗本回合）</span></button>
    <button class="act danger" data-c="surrender" style="grid-column:span 3;padding:6px"><span class="s">逃跑（视为落败）</span></button>`;
  const xi = $('xbInput');
  if (xi) {
    // 如果 S.xianBurst 有值，确保输入框显示它（防止重绘丢失）
    if ((S.xianBurst|0) > 0 && xi.value !== String(S.xianBurst)) xi.value = S.xianBurst;
    xi.oninput = () => { let v = Math.floor(+xi.value || 0); v = Math.max(0, Math.min(v, Math.floor(S.mana))); S.xianBurst = v; save(); };
    xi.onchange = () => { renderCombat(); };
  }
}

function sheetBattleLog() { // v296 战斗记录弹窗：点📜查看；操作记录与战斗记录分开展示
  const b = (typeof pk !== 'undefined' && pk && pk.battle) || null; if (!b) return;
  const ops = (b.opLines || []).join('');
  const lines = (b.lines || []).join('');
  openSheet('<h2>📜 战斗记录</h2>' +
    '<div style="display:flex;gap:8px;margin-bottom:8px"><button class="btn gold" data-blogtab="op" style="flex:1">👆 操作记录</button><button class="btn" data-blogtab="bat" style="flex:1">⚔️ 战斗记录</button></div>' +
    '<div id="blogOp" style="max-height:350px;overflow-y:auto;font-size:13px;line-height:1.6">' + (ops || '<div class="hint">暂无操作记录</div>') + '</div>' +
    '<div id="blogBat" style="max-height:350px;overflow-y:auto;font-size:13px;line-height:1.6;display:none">' + (lines || '<div class="hint">暂无战斗记录</div>') + '</div>' +
    '<div class="row"><button class="btn full" data-close>关闭</button></div>');
}
window.sheetBattleLog = sheetBattleLog;

/* ---------- 弹层 ---------- */
function openSheet(html) { $('sheet').innerHTML = html; $('sheet').scrollTop = 0; $('mask').classList.add('on'); }
function closeSheet() {
  $('mask').classList.remove('on'); $('sheet').classList.remove('full'); $('sheet').innerHTML = '';
  if (window._fromAdv) { window._fromAdv = false; try { if (S.run && S.run.grid && typeof sheetRun === 'function') sheetRun(); } catch(_) {} } // v770 从冒险打开人物面板，关闭返回冒险
}
window.closeSheet = closeSheet;
window.openSheet = openSheet; // v959 联机模块需要（顶层函数默认非全局）
$('mask').addEventListener('click', e => { if (e.target === $('mask') && !$('mask').dataset.lock) closeSheet(); });

const GK = { str: 'mine', agi: 'hunt', def: 'farm', vit: 'egg', int: 'read' }, GV = { mine: '挖', hunt: '猎', farm: '种', egg: '掏', read: '读' }, GI = { mine: '⛏️', hunt: '🏹', farm: '🌱', egg: '🥚', read: '📖' };
// v400 摆摊区：奇遇捡漏或入坑；v405 可租赁
const STALL_RENT = { '1,1': { kind: 'xianyu', key: 'xianyu', name: '仙玉', price: 1 }, '1,2': { kind: 'ore', key: 'sp5', name: '极品灵石', price: 1 }, '1,3': { kind: 'ore', key: 'sp4', name: '上品灵石', price: 1 } };
const STALL_CUR = { '1,1': { key: 'xianyu', name: '仙玉', icon: MAGATAMA }, '1,2': { key: 'sp5', name: '极品灵石', icon: '💠' }, '1,3': { key: 'sp4', name: '上品灵石', icon: '💎' } };
const STALL_CURS = { gold: { key: 'gold', name: '金元', icon: '🪙' }, xianyu: { key: 'xianyu', name: '仙玉', icon: MAGATAMA }, sp2: { key: 'sp2', name: '下品灵石', icon: '🌒' }, sp3: { key: 'sp3', name: '中品灵石', icon: '🌗' }, sp4: { key: 'sp4', name: '上品灵石', icon: '💎' }, sp5: { key: 'sp5', name: '极品灵石', icon: '💠' } };
function stallCur(x, y) { return STALL_CUR[x + ',' + y] || { key: 'gold', name: '金元' }; }
function stallBal(curKey) { return curKey === 'xianyu' ? (S.xianyu||0) : curKey === 'gold' ? (S.gold||0) : (S.ores[curKey]||0); }
function stallRented(x, y) {
  const k = x + ',' + y;
  const r = (S.stalls || {})[k];
  return r && r.until > Date.now() ? r : null;
}
function stallGen(x, y) {
  const _d = new Date(); const _ds = _d.getFullYear() + '-' + String(_d.getMonth()+1).padStart(2,'0') + '-' + String(_d.getDate()).padStart(2,'0');
  const key = 'stall_' + x + '_' + y + '_' + _ds;
  if (S._stallCache && S._stallCache.key === key) return S._stallCache.items;
  const items = [];
  const pool = [];
  // 矿石
  for (const k of ['iron','copper','silver','gold']) { const o = ORES[k]; if (o) pool.push(['ore', k, o.name, o.price || 10]); }
  // 灵石
  for (const k of ['sp1','sp2','sp3','sp4','sp5']) { const o = ORES[k]; if (o) pool.push(['ore', k, o.name, 20]); }
  // 药草
  for (const k of Object.keys(MATS)) { const m = MATS[k]; if (m && m.price) pool.push(['mat', k, m.name, m.price]); }
  const n = (x === 1 && y === 1) ? 8 : (x === 1 && y === 2) ? 5 : 3;
  const _sc = stallCur(x, y);
  for (let i = 0; i < n; i++) {
    const p = pool[Math.floor(Math.random() * pool.length)];
    const r = Math.random();
    let mult, tag;
    if (r < 0.3) { mult = 0.5 + Math.random() * 0.3; tag = '<span class="g">捡漏</span>'; }
    else if (r < 0.8) { mult = 0.9 + Math.random() * 0.3; tag = ''; }
    else { mult = 1.5 + Math.random() * 1.5; tag = '<span class="r">高价</span>'; }
    const price = Math.max(1, Math.round(p[3] * mult));
    items.push({ kind: p[0], key: p[1], name: p[2], price, tag, qty: 1 + Math.floor(Math.random() * 5) });
  }
  S._stallCache = { key, items };
  return items;
}
async function sheetStall(x, y) {
  // v1085 线上摆摊：NPC 摊货下线，只显示真人摊主的摊位
  if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn()) {
    openSheet(`<h2>🎪 摆摊区</h2><div class="hint">摆摊区已改真人摊位，需登录联机后查看。</div><div class="empty">请先在联机面板登录</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
    return;
  }
  const tile = x + ',' + y;
  const _sc = stallCur(x, y);
  openSheet(`<h2>🎪 摆摊区 (${x},${y})</h2><div class="hint">正在拉取摊位…</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
  let r;
  try { r = await MHXY.api('/api/stall/view?tile=' + encodeURIComponent(tile)); } catch (e) { r = null; }
  if (!r || !r.ok || !r.json || !r.json.ok) {
    openSheet(`<h2>🎪 摆摊区 (${x},${y})</h2><div class="hint">拉取失败，请稍后再试。</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
    return;
  }
  const d = r.json;
  const _bal = stallBal(_sc.key);
  let html = `<h2>🎪 摆摊区 (${x},${y})</h2><div class="hint">租金货币：${_sc.icon||''}${_sc.name} <b class="y">${_bal}</b> · 真人摊位 · 售价货币每件自选</div>`;
  if (d.renter) {
    const _mins = Math.ceil((d.renter.until - Date.now()) / 60000);
    html += `<div class="hint">🏠 摊主：<b class="y">${esc(d.renter.username)}</b>${d.renter.isMine ? '（你的摊位）' : ''}，剩余 <b class="y">${_mins}</b> 分钟</div>`;
    if (d.renter.isMine) {
      html += `<div class="row"><button class="btn gold" data-stallrent="${x},${y}">续租 1 小时（1 ${_sc.name}）</button><button class="btn gold" data-stalllist="${x},${y}">上架物品</button></div>`;
    }
  } else {
    html += `<div class="hint">空摊待租：<button class="btn gold" data-stallrent="${x},${y}">租 1 小时（1 ${_sc.name}）</button></div>`;
  }
  const items = d.items || [];
  if (!items.length) html += `<div class="empty">${d.renter ? '摊主暂无上架物品' : '暂无摊主，快来租下这个摊位'}</div>`;
  else html += items.map((it) => { const _ic = STALL_CURS[it.cur] || _sc; const _ibal = stallBal(it.cur || _sc.key); return `<div class="row"><div class="lab">${esc(it.item_name)} ×${it.qty} <span class="tag">${it.price} ${_ic.icon||''}${_ic.name}/个</span><small> · ${esc(it.seller_name)}</small></div>`
    + (it.isMine || (it.seller_id && (function(){ try { return localStorage.getItem('mhxy_aid') === it.seller_id; } catch (_) { return false; } })())
      ? `<button class="btn" data-stallunlist-id="${it.id}" data-sx="${x}" data-sy="${y}">下架</button>`
      : `<button class="btn gold" data-stallbuy-id="${it.id}" data-sx="${x}" data-sy="${y}" ${_ibal >= it.price * it.qty ? '' : 'disabled'}>买下 ${it.price * it.qty}${_ic.icon||''}${_ic.name}</button>`) + `</div>`; }).join('');
  html += `<div class="row"><button class="btn full" data-close>关闭</button></div>`;
  openSheet(html);
}
// v406 摊位上架面板
function sheetStallList(x, y) {
  const _oreKeys = Object.keys(S.ores || {}).filter(k => (S.ores[k]||0) > 0);
  const _matKeys = Object.keys(S.mats || {}).filter(k => (S.mats[k]||0) > 0);
  let html = `<h2>📦 上架到摊位</h2><div class="hint">选择物品上架到 (${x},${y}) 摊位</div>`;
  const _scc2 = stallCur(x, y);
  html += `<div class="hint">售价货币：每件自选（默认${_scc2.name}）</div>`;
  for (const k of _oreKeys) {
    const o = ORES[k]; const nm = o ? o.name : k; const have = S.ores[k]||0;
    html += `<div class="row"><div class="lab">${nm} ×${have}</div>
      <input id="sq_stall_${k}" type="number" min="1" max="${have}" value="1" style="width:45px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px">
      <input id="sp_stall_${k}" type="number" min="1" value="10" style="width:55px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
<select id="sc_stall_${k}" style="padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px"><option value="gold" ${_scc2.key==='gold'?'selected':''}>🪙金元</option><option value="xianyu" ${_scc2.key==='xianyu'?'selected':''}>${MAGATAMA}仙玉</option><option value="sp2" ${_scc2.key==='sp2'?'selected':''}>🌒下品灵石</option><option value="sp3" ${_scc2.key==='sp3'?'selected':''}>🌗中品灵石</option><option value="sp4" ${_scc2.key==='sp4'?'selected':''}>💎上品灵石</option><option value="sp5" ${_scc2.key==='sp5'?'selected':''}>💠极品灵石</option></select>
      <button class="btn gold" data-stalldo="ore:${k}" data-sx="${x}" data-sy="${y}">上架</button></div>`;
  }
  for (const k of _matKeys) {
    const m = MATS[k]; const nm = m ? m.name : k; const have = S.mats[k]||0;
    html += `<div class="row"><div class="lab">${nm} ×${have}</div>
      <input id="sq_stall_${k}" type="number" min="1" max="${have}" value="1" style="width:45px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px">
      <input id="sp_stall_${k}" type="number" min="1" value="10" style="width:55px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
<select id="sc_stall_${k}" style="padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px"><option value="gold" ${_scc2.key==='gold'?'selected':''}>🪙金元</option><option value="xianyu" ${_scc2.key==='xianyu'?'selected':''}>${MAGATAMA}仙玉</option><option value="sp2" ${_scc2.key==='sp2'?'selected':''}>🌒下品灵石</option><option value="sp3" ${_scc2.key==='sp3'?'selected':''}>🌗中品灵石</option><option value="sp4" ${_scc2.key==='sp4'?'selected':''}>💎上品灵石</option><option value="sp5" ${_scc2.key==='sp5'?'selected':''}>💠极品灵石</option></select>
      <button class="btn gold" data-stalldo="mat:${k}" data-sx="${x}" data-sy="${y}">上架</button></div>`;
  }
  html += `<div class="row"><button class="btn full" data-stallback="${x},${y}">返回摊位</button></div>`;
  openSheet(html);
}
// v410 赌场：骰子猜大小；v412 下注用灵石/仙玉；v420 仙玉区/灵石区分开
const CASINO_CUR = { sp2: { name: '下品灵石', icon: '🌒', zone: 'stone' }, sp3: { name: '中品灵石', icon: '🌗', zone: 'stone' }, sp4: { name: '上品灵石', icon: '💎', zone: 'stone' }, sp5: { name: '极品灵石', icon: '💠', zone: 'stone' }, xianyu: { name: '仙玉', icon: MAGATAMA, zone: 'jade' } };
function casinoBal(ck) { return ck === 'xianyu' ? (S.xianyu||0) : (S.ores[ck]||0); }
function casinoTakeBet() {
// v967 赌场服务端版：获取下注信息（不扣款，服务端扣）
function casinoGetBet() {
  const _csel = $('casino_cur'); const _ck = _csel ? _csel.value : (S._casinoCur || 'sp2');
  const _bet = Math.max(1, Math.floor(+($('casino_bet')||{}).value||0));
  const _bal = casinoBal(_ck);
  if (_bet <= 0 || _bal < _bet) {
    const _cnm = _ck==='xianyu' ? '仙玉' : (CASINO_CUR[_ck]||{}).name || '货币';
    try { alert(_cnm + '不足（拥有 ' + _bal + '）'); } catch(e) {}
    return null;
  }
  return { ck: _ck, bet: _bet, ci: CASINO_CUR[_ck] };
}
// v967 调用服务端赌场（在线才走，离线回落本地）
async function casinoServerPlay(game, choice) {
  const _b = casinoGetBet();
  if (!_b) return null;
  if (typeof MHXY === 'undefined' || !MHXY.loggedIn || !MHXY.loggedIn()) return { local:true, bet:_b };
  try {
    const r = await MHXY.api('/api/roll/casino', 'POST', { game, ck:_b.ck, bet:_b.bet, choice });
    if (!r.ok || !r.json || !r.json.ok) return { local:true, bet:_b };
    if (typeof MHXY.setBaseRev === 'function' && r.json.rev) MHXY.setBaseRev(r.json.rev);
    return { bet:_b, srv:r.json };
  } catch(e) { return { local:true, bet:_b }; }
}
// v967 服务端赢后：收手 / 双倍
async function casinoServerCollect() {
  try {
    const r = await MHXY.api('/api/roll/casino_collect', 'POST', {});
    if (r.ok && r.json && r.json.ok) {
      if (typeof MHXY.setBaseRev === 'function' && r.json.rev) MHXY.setBaseRev(r.json.rev);
      // 同步本地：服务端已发放，本地加上
      const _p = window._casinoSrvPending;
      if (_p) {
        if (_p.ck === 'xianyu') S.xianyu = (S.xianyu||0) + _p.amount;
        else S.ores[_p.ck] = (S.ores[_p.ck]||0) + _p.amount;
        window._casinoSrvPending = null;
      }
      commit();
      return true;
    }
  } catch(e) {}
  return false;
}
async function casinoServerDouble(guess) {
// v967 服务端版 casinoPay：赢了走 pending（收手/双倍），输了直接展示
function casinoPayServer(win) {
  const _cn = win.ck==='xianyu' ? MAGATAMA : (win.ci.icon||'');
  if (win.amount > 0) {
    window._casinoSrvPending = { ck:win.ck, amount:win.amount };
    openSheet(`<h2>${win.title}</h2><div class="hint">${win.text} <b class="y">赢 ${win.amount} ${_cn}${win.ci.name}</b></div><div class="hint">收手落袋，还是搏一把双倍？</div><div class="row" style="display:flex;gap:6px"><button class="btn gold" data-casino-srv-collect style="flex:1">收手</button><button class="btn danger" data-casino-srv-double style="flex:1">双倍！<br><small>猜单双</small></button></div>`);
    return;
  }
  commit();
  try { if (typeof thunderGatherJudge === 'function') thunderGatherJudge(); } catch(_) {}
  openSheet(`<h2>${win.title}</h2><div class="hint">${win.text} <b style="color:#f66">输 ${win.bet} ${_cn}${win.ci.name}</b></div><div class="row"><button class="btn gold full" data-casino-again="${win.game}">再来一把</button></div><div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`);
}
// v967 服务端收手按钮
async function casinoSrvCollectUI() {
  const _p = window._casinoSrvPending;
  if (!_p) return;
  const _ok = await casinoServerCollect();
  const _cn = _p.ck==='xianyu' ? MAGATAMA : ((CASINO_CUR[_p.ck]||{}).icon||'');
  const _nm = _p.ck==='xianyu' ? '仙玉' : ((CASINO_CUR[_p.ck]||{}).name||'');
  try { if (_ok && typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.20); } catch(_) {}
  openSheet(`<h2>💰 落袋</h2><div class="hint">${_ok ? `赢 <b class="y">${_p.amount} ${_cn}${_nm}</b> 已到账` : '网络异常，稍后在背包确认'}</div><div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`);
  render();
}
// v967 服务端双倍按钮
function casinoSrvDoubleUI() {
  const _p = window._casinoSrvPending;
  if (!_p) return;
  openSheet(`<h2>🎲 双倍一搏</h2><div class="hint">当前奖金 <b class="y">${_p.amount}</b>。猜中翻倍，猜错全输！</div><div class="row" style="display:flex;gap:6px"><button class="btn gold" data-casino-srv-guess="odd" style="flex:1">单</button><button class="btn gold" data-casino-srv-guess="even" style="flex:1">双</button></div><div class="row"><button class="btn full" data-casino-srv-collect>不搏了，收手</button></div>`);
}
async function casinoSrvGuessUI(guess) {
  const _r = await casinoServerDouble(guess);
  if (!_r) { openSheet(`<h2>🎲 双倍</h2><div class="hint">网络异常，请重试</div><div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`); return; }
  const _p = window._casinoSrvPending;
  if (_r.win) {
    if (_p) _p.amount = _r.amount;
    window._casinoSrvPending = _p;
    openSheet(`<h2>🎲 双倍成功！</h2><div class="hint">🎲${_r.num}</div><div class="hint">奖金翻到 <b class="y">${_r.amount}</b>！继续搏还是收手？</div><div class="row" style="display:flex;gap:6px"><button class="btn gold" data-casino-srv-collect style="flex:1">收手</button><button class="btn danger" data-casino-srv-double style="flex:1">再双倍！</button></div>`);
  } else {
    window._casinoSrvPending = null;
    commit();
    openSheet(`<h2>🎲 双倍</h2><div class="hint">🎲${_r.num} 搏输了，奖金清零</div><div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`);
  }
  render();
}
  try {
    const r = await MHXY.api('/api/roll/casino_double', 'POST', { guess });
    if (r.ok && r.json && r.json.ok) {
      if (typeof MHXY.setBaseRev === 'function' && r.json.rev) MHXY.setBaseRev(r.json.rev);
      return r.json;
    }
  } catch(e) {}
  return null;
}
  const _csel = $('casino_cur'); const _ck = _csel ? _csel.value : (S._casinoCur || 'sp2');
  const _bet = Math.max(1, Math.floor(+($('casino_bet')||{}).value||0));
  const _bal = casinoBal(_ck);
  if (_bet <= 0 || _bal < _bet) {
    const _cnm = _ck==='xianyu' ? '仙玉' : (CASINO_CUR[_ck]||{}).name || '货币';
    try { alert(_cnm + '不足（拥有 ' + _bal + '）'); } catch(e) {}
    return null;
  }
  if (_ck === 'xianyu') S.xianyu -= _bet; else S.ores[_ck] -= _bet;
  // v461 奖池+VIP：每注2%进奖池，累计投注
  if (_ck !== 'xianyu') { S._jackpot = (S._jackpot|0) + Math.max(1, Math.floor(_bet*0.02)); }
  S._vipWager = (S._vipWager|0) + _bet;
  return { ck: _ck, bet: _bet, ci: CASINO_CUR[_ck] };
}
// v461 VIP等级
function casinoVip() {
  const _w = S._vipWager|0;
  if (_w >= 200000) return { name:'赌王', bonus:0.20 };
  if (_w >= 50000) return { name:'豪侠', bonus:0.15 };
  if (_w >= 10000) return { name:'富商', bonus:0.10 };
  if (_w >= 1000) return { name:'小豪', bonus:0.05 };
  return { name:'平民', bonus:0 };
}
// v461 每日幸运符
function casinoLucky() {
  const _today = new Date().toISOString().slice(0,10);
  if (!S._lucky || S._lucky.date !== _today) {
    const _syms = ['⚔️','💎','🌀','🗡️','💠','⭐'];
    S._lucky = { date:_today, sym:_syms[Math.floor(Math.random()*_syms.length)] };
    if (typeof save==='function') save();
  }
  return S._lucky.sym;
}
function casinoPay(win) {
  // v460 通用连胜加成+赢后双倍（slots自带的不重复）；v461 VIP加成
  if (!win.skipStreak) {
    if (win.amount > 0) { S._casinoStreak = (S._casinoStreak|0)+1; const _st = S._casinoStreak; let _m = _st>=5 ? 2.0 : _st>=3 ? 1.5 : _st>=2 ? 1.2 : 1.0; _m += casinoVip().bonus; if (_m > 1) { const _b = Math.floor(win.amount*(_m-1)); win.amount += _b; win.text += ` <span class="y">🔥${_st}连胜 +${_b}</span>`; } }
    else { S._casinoStreak = 0; }
  }
  if (win.amount > 0) { S._casinoMaxWin = Math.max(S._casinoMaxWin|0, win.amount); }
  // v460 赢后双倍（slots自带跳过）
  if (win.amount > 0 && !win.skipDouble && !win._doubled) {
    window._casinoPending = win;
    const _cn0 = win.ck==='xianyu' ? MAGATAMA : (win.ci.icon||'');
    openSheet(`<h2>${win.title}</h2><div class="hint">${win.text} <b class="y">赢 ${win.amount} ${_cn0}${win.ci.name}</b></div><div class="hint">收手落袋，还是搏一把双倍？</div><div class="row" style="display:flex;gap:6px"><button class="btn gold" data-casino-collect style="flex:1">收手</button><button class="btn danger" data-casino-double style="flex:1">双倍！<br><small>猜单双</small></button></div>`);
    return;
  }
  const { ck, bet } = win; const _w = win.amount;
  if (_w > 0) { if (ck === 'xianyu') S.xianyu += _w; else S.ores[ck] = (S.ores[ck]||0) + _w; }
  commit();
  try { if (_w > 0 && typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.20); else if (typeof thunderGatherJudge === 'function') thunderGatherJudge(); } catch(_) {} // v813 赌场赢了20%判定，输了10%
  const _cn = win.ck==='xianyu' ? MAGATAMA : (win.ci.icon||'');
  const _res = win.text + (_w>0 ? ` <b class="y">赢 ${_w} ${_cn}${win.ci.name}</b>` : ` <b style="color:#f66">输 ${bet} ${_cn}${win.ci.name}</b>`);
  openSheet(`<h2>${win.title}</h2><div class="hint">${_res}</div><div class="row"><button class="btn gold full" data-casino-again="${win.game}">再来一把</button></div><div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`);
}
function sheetCasino(zone) {
  zone = zone || S._casinoZone || 'stone';
  S._casinoZone = zone;
  const _isJade = zone === 'jade';
  const _vip = casinoVip(); const _lucky = casinoLucky(); const _jp = S._jackpot|0; // v461
  let html = `<h2>🎲 赌场</h2><div class="hint">🏆奖池 ${_jp} · 👑${_vip.name} · 今日幸运 ${_lucky}</div><div class="hint">选个玩法试试手气。</div>
    <div class="row"><button class="btn full${!_isJade?' gold':''}" data-casino-zone="stone">💠 押灵石</button></div>
    <div class="row"><button class="btn full${_isJade?' gold':''}" data-casino-zone="jade">${MAGATAMA} 押仙玉</button></div>
    <div class="grid2">
      <button class="btn gold" data-casino-game="dice">🎲 猜大小</button>
      <button class="btn gold" data-casino-game="beast">🐉 灵兽斗</button>
      <button class="btn gold" data-casino-game="slots">🎰 仙缘机</button>
      <button class="btn gold" data-casino-game="bowls">🥣 猜灵石</button>
      <button class="btn gold" data-casino-game="number">🎯 射覆</button>
      <button class="btn gold" data-casino-game="card">🃏 翻仙牌</button>
      <button class="btn gold" data-casino-game="stone">🪨 赌石</button>
    </div>
    <div class="row"><button class="btn full" data-close>离开</button></div>`;
  openSheet(html);
}
// v584 赌石：3灵气石+1000金元开一次，三选一（70%灵气石/20%中品/8%上品/2%极品）
function stoneGambleRoll() {
  const r = Math.random() * 100;
  if (r < 70) return 'sp1';
  if (r < 90) return 'sp3';
  if (r < 98) return 'sp4';
  return 'sp5';
}
function sheetStoneGamble() {
  const sp1Has = S.ores.sp1|0, goldHas = S.gold|0;
  const canPlay = sp1Has >= 3 && goldHas >= 1000;
  let html = `<h2>🪨 赌石</h2><div class="hint">3块灵气石 + 1000金元开一次，从100块原石中按概率出三块（70灵气石/20中品/8上品/2极品），每次开石千分之一出一块🧭仙玉，任选一块切开。</div>
    <div class="row"><div class="lab">拥有</div><div id="stoneOwn">🪨灵气石 <b>${sp1Has}</b> · 金元 <b>${goldHas}</b></div></div>
    <div class="row"><button class="btn gold full" data-stone-start ${canPlay ? '' : 'disabled'}>开石（3灵气石+1000金元）</button></div>
    <div id="stoneResult"></div>
    <div class="row"><button class="btn full" data-close>离开</button></div>`;
  openSheet(html);
}
async function stoneGambleStart() {
  // v965 彻底版：登录在线时走服务端（两步：start 扣费生成 picks，pick 领取）
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const resp = await MHXY.api('/api/roll/gamble_stone/start', {method:'POST', body:{}});
      const j = resp && resp.json;
      if (resp.ok && j && j.ok) {
        S.ores.sp1 = (S.ores.sp1|0) - 3; S.gold = (S.gold|0) - 1000;
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        try { if (typeof log === 'function') log('info', `🪨 消耗 3灵气石+1000金元，剩余 🪨${S.ores.sp1|0} · 金元${S.gold|0}`); } catch(_) {}
        try { const _so = $('stoneOwn'); if (_so) _so.innerHTML = `🪨灵气石 <b>${S.ores.sp1|0}</b> · 金元 <b>${S.gold|0}</b>`; } catch(_) {}
        try { if (typeof thunderGatherJudge === 'function') thunderGatherJudge(); } catch(_) {}
        S._stonePicks = j.picks;
        const names = { sp1: ['🪨','灵气石'], sp3: ['🌗','中品灵石'], sp4: ['💎','上品灵石'], sp5: ['💠','极品灵石'] };
        const btns = j.picks.map((k, i) => `<button class="btn gold" data-stone-pick="${i}" style="flex:1;padding:20px 4px;font-size:14px">🪨<br>原石${i+1}<br><small>点我切开</small></button>`).join('');
        const el = $('stoneResult');
        if (el) el.innerHTML = `<div class="hint">三块原石已出，选一块切开：</div><div style="display:flex;gap:6px">${btns}</div>`;
        save(); render();
        return;
      }
      if ((j||{}).error === 'no_mats' || !resp.netErr) { try { alert('灵气石或金元不足'); } catch(e) {} return; }
    } catch(e) { /* 回落本地 */ }
  }
  if ((S.ores.sp1|0) < 3 || (S.gold|0) < 1000) { try { alert('灵气石或金元不足'); } catch(e) {} return; }
  S.ores.sp1 -= 3; S.gold -= 1000;
  try { if (typeof log === 'function') log('info', `🪨 消耗 3灵气石+1000金元，剩余 🪨${S.ores.sp1|0} · 金元${S.gold|0}`); } catch(_) {}
  try { const _so = $('stoneOwn'); if (_so) _so.innerHTML = `🪨灵气石 <b>${S.ores.sp1|0}</b> · 金元 <b>${S.gold|0}</b>`; } catch(_) {} // v756 实时更新面板拥有数
  try { if (typeof thunderGatherJudge === 'function') thunderGatherJudge(); } catch(_) {} // v735 赌石触发雷云判定
  const picks = [stoneGambleRoll(), stoneGambleRoll(), stoneGambleRoll()];
  if (Math.random() < 0.001) picks[Math.floor(Math.random() * 3)] = 'xianyu'; // v744 每次开石千分之一出一块仙玉
  S._stonePicks = picks;
  const names = { sp1: ['🪨','灵气石'], sp3: ['🌗','中品灵石'], sp4: ['💎','上品灵石'], sp5: ['💠','极品灵石'] };
  const btns = picks.map((k, i) => { const n = names[k]; return `<button class="btn gold" data-stone-pick="${i}" style="flex:1;padding:20px 4px;font-size:14px">🪨<br>原石${i+1}<br><small>点我切开</small></button>`; }).join('');
  const el = $('stoneResult');
  if (el) el.innerHTML = `<div class="hint">三块原石已出，选一块切开：</div><div style="display:flex;gap:6px">${btns}</div>`;
  save(); render();
}
async function stoneGamblePick(i) {
  // v965 彻底版：登录在线且服务端有 picks 时走服务端领取
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const resp = await MHXY.api('/api/roll/gamble_stone/pick', {method:'POST', body:{i}});
      const j = resp && resp.json;
      if (resp.ok && j && j.ok && (j.gains||[]).length) {
        const gg = j.gains[0];
        const k = gg.k;
        if (k === 'xianyu') S.xianyu = (S.xianyu|0) + 1; else { if (!S.ores) S.ores = {}; S.ores[k] = (S.ores[k]|0) + 1; }
        S._stonePicks = null;
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        const names = { sp1: '🪨灵气石', sp3: '🌗中品灵石', sp4: '💎上品灵石', sp5: '💠极品灵石', xianyu: '🧭仙玉' };
        try { const _jp = k === 'xianyu' ? 1.0 : k === 'sp5' ? 0.80 : k === 'sp4' ? 0.50 : k === 'sp3' ? 0.30 : 0.10; if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(_jp); } catch(_) {}
        try { log('good', `🪨 赌石切出 <b class="y">${names[k]}×1</b>！`); } catch(e) {}
        if (typeof announce === 'function') { try {
          const _am = `📢 全服通告：恭喜道友赌石切出【${names[k]}】！`;
          if (k === 'xianyu') { announce(S, _am); }
          else if (k === 'sp3') { announce(S, _am); }
          else if (k === 'sp4') { announce(S, _am); setTimeout(() => { try { announce(S, _am); } catch(e) {} }, 10*60*1000); }
          else if (k === 'sp5') { announce(S, _am); setTimeout(() => { try { announce(S, _am); } catch(e) {} }, 20*60*1000); setTimeout(() => { try { announce(S, _am); } catch(e) {} }, 40*60*1000); }
        } catch(e) {} }
        const el = $('stoneResult');
        if (el) el.innerHTML = `<div class="hint">切出 <b class="y">${names[k]}×1</b>！</div><div class="row"><button class="btn gold full" data-stone-start>再开一次（3灵气石+1000金元）</button></div>`;
        save(); render();
        return;
      }
      // 服务端无 picks（no_picks）→ 回落本地逻辑
    } catch(e) { /* 回落本地 */ }
  }
  const picks = S._stonePicks; if (!picks || !picks[i]) return;
  const k = picks[i];
  const names = { sp1: '🪨灵气石', sp3: '🌗中品灵石', sp4: '💎上品灵石', sp5: '💠极品灵石', xianyu: '🧭仙玉' };
  if (k === 'xianyu') S.xianyu = (S.xianyu|0) + 1; else S.ores[k] = (S.ores[k]|0) + 1;
  S._stonePicks = null;
  try { const _jp = k === 'xianyu' ? 1.0 : k === 'sp5' ? 0.80 : k === 'sp4' ? 0.50 : k === 'sp3' ? 0.30 : 0.10; if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(_jp); } catch(_) {} // v741/v742 品级越高概率越高，仙玉必定触发
  try { log('good', `🪨 赌石切出 <b class="y">${names[k]}×1</b>！`); } catch(e) {}
  if (typeof announce === 'function') { try {
    const _am = `📢 全服通告：恭喜道友赌石切出【${names[k]}】！`;
    if (k === 'xianyu') { announce(S, _am); } // v742 仙玉通告
    else if (k === 'sp3') { announce(S, _am); } // v586 中品通告一次
    else if (k === 'sp4') { announce(S, _am); setTimeout(() => { try { announce(S, _am); } catch(e) {} }, 10*60*1000); } // v586 上品通告1次，10分钟后再1次
    else if (k === 'sp5') { announce(S, _am); setTimeout(() => { try { announce(S, _am); } catch(e) {} }, 20*60*1000); setTimeout(() => { try { announce(S, _am); } catch(e) {} }, 40*60*1000); } // v586 极品通告1次，每20分钟1次共3次
  } catch(e) {} }
  const el = $('stoneResult');
  if (el) el.innerHTML = `<div class="hint">切出 <b class="y">${names[k]}×1</b>！</div><div class="row"><button class="btn gold full" data-stone-start>再开一次（3灵气石+1000金元）</button></div>`;
  save(); render();
}
// 赌场下注面板通用
function casinoBetPanel(game, title, desc) {
  const zone = S._casinoZone || 'stone';
  const _isJade = zone === 'jade';
  const _opts = _isJade ? ['xianyu'] : ['sp2','sp3','sp4','sp5'];
  const _ck = (S._casinoCur && _opts.includes(S._casinoCur)) ? S._casinoCur : _opts[0];
  S._casinoCur = _ck;
  const _bal = casinoBal(_ck);
  const _curHtml = _isJade
    ? `<div class="row"><div class="lab">下注货币</div><div><b>${MAGATAMA} 仙玉 (${S.xianyu||0})</b><input type="hidden" id="casino_cur" value="xianyu"></div></div>`
    : `<div class="row"><div class="lab">下注货币</div><select id="casino_cur" style="padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px">` +
      _opts.map(k => { const c = CASINO_CUR[k]; return `<option value="${k}"${_ck===k?' selected':''}>${c.icon}${c.name} (${casinoBal(k)})</option>`; }).join('') +
      `</select></div>`;
  return _curHtml +
    `<div class="row"><div class="lab">下注金额</div><input id="casino_bet" type="number" min="1" max="${_bal}" value="1" style="width:80px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px"></div>`;
}
// v424 赌场六玩法
function casinoDice() {
  let html = `<h2>🎲 猜大小</h2><div class="hint">三颗骰子，猜大小。</div>` + casinoBetPanel('dice') +
    `<div class="row"><button class="btn gold" data-casino="big">大 (11-17) 1:1</button><button class="btn gold" data-casino="small">小 (4-10) 1:1</button></div>
    <div class="row"><button class="btn gold full" data-casino="triple">豹子 (三同) 1:24</button></div>
    <div class="row"><div class="lab">猜点数</div><input id="dice_sum" type="number" min="4" max="17" value="10" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px"><button class="btn gold" data-casino="sum">押中 1:10</button></div>
    <div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`; // v460 加猜点数
  openSheet(html);
}
function casinoBeast() {
  const _beasts = [['青龙','🐉'],['白虎','🐯'],['朱雀','🐦'],['玄龟','🐢'],['灵狐','🦊']];
  const _b1 = _beasts[Math.floor(Math.random()*5)], _b2 = _beasts[Math.floor(Math.random()*5)];
  S._beastPair = [_b1[0], _b2[0]];
  let html = `<h2>🐉 灵兽斗</h2><div class="hint">${_b1[1]}${_b1[0]} VS ${_b2[1]}${_b2[0]}，押中 1:1.8</div>` + casinoBetPanel('beast') +
    `<div class="row"><button class="btn gold full" data-casino-beast="0">${_b1[1]} 押${_b1[0]}</button></div>
    <div class="row"><button class="btn gold full" data-casino-beast="1">${_b2[1]} 押${_b2[0]}</button></div>
    <div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`;
  openSheet(html);
}
function casinoSlots() {
  const _diff = S._slotsDiff || 'safe'; // v459 自选难度
  const _streak = S._slotsStreak | 0;
  let html = `<h2>🎰 仙缘机</h2><div class="hint">三格同符 ${ _diff === 'risk' ? '1:20' : '1:10' }，两格同 1:2${ _streak >= 2 ? ` · 🔥${_streak}连胜加成中` : ''}</div>` +
    `<div class="row" style="display:flex;gap:6px"><button class="btn${_diff==='safe'?' gold':''}" data-slots-diff="safe" style="flex:1">稳<br><small>三同1:10</small></button><button class="btn${_diff==='risk'?' gold':''}" data-slots-diff="risk" style="flex:1">狠<br><small>三同1:20·更难中</small></button></div>` +
    casinoBetPanel('slots') +
    `<div class="row"><button class="btn gold full" data-casino-slots>摇一把</button></div>
    <div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`;
  openSheet(html);
}
function casinoBowls() {
  let html = `<h2>🥣 猜灵石</h2><div class="hint">三只碗，一颗灵石，押中 1:2。先下注洗牌，再凭眼力选！</div>` + casinoBetPanel('bowls') +
    `<div class="row"><button class="btn gold full" data-casino-bowls-shuffle>开始洗牌</button></div>
    <div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`; // v461 洗牌动画
  openSheet(html);
}
function casinoNumber() {
  let html = `<h2>🎯 射覆</h2><div class="hint">庄家藏数1-10。押单双 1:1，押中数字 1:9</div>` + casinoBetPanel('number') +
    `<div class="row"><button class="btn gold" data-casino-num="odd">单 1:1</button><button class="btn gold" data-casino-num="even">双 1:1</button></div>
    <div class="row"><div class="lab">押数字</div><input id="casino_num" type="number" min="1" max="10" value="5" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px"><button class="btn gold" data-casino-num="exact">押中 1:9</button></div>
    <div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`;
  openSheet(html);
}
function casinoCard() {
  let html = `<h2>🃏 翻仙牌</h2><div class="hint">翻一张牌，押大(8-A)押小(2-7)，1:1</div>` + casinoBetPanel('card') +
    `<div class="row"><button class="btn gold" data-casino-card="big">大 1:1</button><button class="btn gold" data-casino-card="small">小 1:1</button></div>
    <div class="row" style="display:flex;gap:6px"><button class="btn gold" data-casino-suit="♠" style="flex:1">♠ 1:4</button><button class="btn gold" data-casino-suit="♥" style="flex:1">♥ 1:4</button><button class="btn gold" data-casino-suit="♣" style="flex:1">♣ 1:4</button><button class="btn gold" data-casino-suit="♦" style="flex:1">♦ 1:4</button></div>
    <div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`; // v460 加猜花色
  openSheet(html);
}
// v429 成就系统；v430 扩到35个
const ACHIEVEMENTS = [
  // 财富
  { id: 'first_gold', name: '第一桶金', desc: '拥有100金元', check: () => (S.gold|0) >= 100, reward: { gold: 50 } },
  { id: 'rich', name: '富甲一方', desc: '拥有10000金元', check: () => (S.gold|0) >= 10000, reward: { gold: 500 } },
  { id: 'gold100k', name: '金山银山', desc: '拥有10万金元', check: () => (S.gold|0) >= 100000, reward: { gold: 2000 } },
  { id: 'first_jade', name: '仙玉初得', desc: '拥有1仙玉', check: () => (S.xianyu|0) >= 1, reward: { gold: 200 } },
  { id: 'jade10', name: '仙玉满堂', desc: '拥有10仙玉', check: () => (S.xianyu|0) >= 10, reward: { xianyu: 2 } },
  // PK
  { id: 'first_blood', name: '初试锋芒', desc: '赢得第一场PK', check: () => (S.pkWin|0) >= 1, reward: { gold: 100 } },
  { id: 'pk10', name: '十战十胜', desc: '累计赢得10场PK', check: () => (S.pkWin|0) >= 10, reward: { gold: 300 } },
  { id: 'pk50', name: '百战名将', desc: '累计赢得50场PK', check: () => (S.pkWin|0) >= 50, reward: { gold: 1000 } },
  { id: 'lose10', name: '屡败屡战', desc: '累计输掉10场PK', check: () => (S.pkLose|0) >= 10, reward: { gold: 100 } },
  { id: 'champion', name: '擂主', desc: '成为过擂主', check: () => (S._wasChampion|0) >= 1, reward: { gold: 300 } },
  // 渡劫突破
  { id: 'trib1', name: '渡劫成功', desc: '成功渡过一次天劫', check: () => (S.tribWin|0) >= 1, reward: { xianyu: 1 } },
  { id: 'trib5', name: '天劫如风', desc: '累计渡劫成功5次', check: () => (S.tribWin|0) >= 5, reward: { xianyu: 3 } },
  { id: 'bt10', name: '突破十次', desc: '累计突破成功10次', check: () => (S.btTotal|0) >= 10, reward: { gold: 500 } },
  // 赌场
  { id: 'casino_win', name: '赌场得意', desc: '在赌场单次赢得100以上', check: () => (S._casinoMaxWin|0) >= 100, reward: { gold: 200 } },
  { id: 'casino_big', name: '豪赌', desc: '在赌场单次赢得1000以上', check: () => (S._casinoMaxWin|0) >= 1000, reward: { gold: 500 } },
  { id: 'casino_try', name: '小赌怡情', desc: '玩过赌场', check: () => (S._casinoPlays|0) >= 1, reward: { gold: 50 } },
  // 摊位
  { id: 'stall_rent', name: '摊主', desc: '租下过摊位', check: () => S.stalls && Object.keys(S.stalls).length > 0, reward: { gold: 100 } },
  { id: 'stall_sell', name: '生意兴隆', desc: '在摊位上架过物品', check: () => (S._stallListed|0) >= 1, reward: { gold: 100 } },
  // 等级境界
  { id: 'level10', name: '小有所成', desc: '达到10级', check: () => (S.level|0) >= 10, reward: { gold: 200 } },
  { id: 'level50', name: '渐入佳境', desc: '达到50级', check: () => (S.level|0) >= 50, reward: { gold: 500 } },
  { id: 'realm2', name: '筑基有成', desc: '突破到筑基', check: () => (S.realm|0) >= 2, reward: { xianyu: 1 } },
  { id: 'realm5', name: '金丹大道', desc: '突破到金丹', check: () => (S.realm|0) >= 5, reward: { xianyu: 2 } },
  { id: 'realm8', name: '仙人指路', desc: '突破到仙人', check: () => (S.realm|0) >= 8, reward: { xianyu: 5 } },
  // 生活
  { id: 'cook5', name: '厨艺精进', desc: '烹饪达到5级', check: () => (S.life && S.life.cook && S.life.cook.lv >= 5), reward: { gold: 150 } },
  { id: 'forge5', name: '锻造大师', desc: '锻造达到5级', check: () => (S.life && S.life.forge && S.life.forge.lv >= 5), reward: { gold: 150 } },
  { id: 'tame_pet', name: '灵宠相伴', desc: '拥有灵宠', check: () => S.pets && S.pets.length > 0, reward: { gold: 200 } },
  // 冒险
  { id: 'adv10', name: '历险者', desc: '完成10次冒险', check: () => (S._advCount|0) >= 10, reward: { gold: 300 } },
  { id: 'adv_boss', name: '斩将', desc: '击败过冒险守关BOSS', check: () => (S._advBossWin|0) >= 1, reward: { gold: 300 } },
  // 签到
  { id: 'checkin7', name: '持之以恒', desc: '连续签到7天', check: () => (S._consecCheckin|0) >= 7, reward: { gold: 300 } },
  { id: 'checkin30', name: '水滴石穿', desc: '连续签到30天', check: () => (S._consecCheckin|0) >= 30, reward: { xianyu: 3 } },
  // 特殊
  { id: 'first_death', name: '向死而生', desc: '经历一次死亡', check: () => (S._deaths|0) >= 1, reward: { gold: 100 } },
  { id: 'reincarnate', name: '轮回转世', desc: '完成一次轮回', check: () => (S.reincTotal|0) >= 1, reward: { xianyu: 2 } },
  { id: 'sp5_first', name: '极品在手', desc: '拥有极品灵石', check: () => (S.ores && (S.ores.sp5|0) >= 1), reward: { gold: 200 } },
  { id: 'consign_first', name: '寄售初体验', desc: '在寄售行上架过', check: () => (S._consignCount|0) >= 1, reward: { gold: 100 } },
  // v430 新增20个
  { id: 'gold1m', name: '富可敌国', desc: '拥有100万金元', check: () => (S.gold|0) >= 1000000, reward: { gold: 5000 } },
  { id: 'jade50', name: '仙玉如山', desc: '拥有50仙玉', check: () => (S.xianyu|0) >= 50, reward: { xianyu: 5 } },
  { id: 'pk100', name: '战神', desc: '累计赢得100场PK', check: () => (S.pkWin|0) >= 100, reward: { gold: 2000 } },
  { id: 'pk_streak5', name: '五连胜', desc: 'PK五连胜', check: () => (S._pkStreak|0) >= 5, reward: { gold: 300 } },
  { id: 'pk_streak10', name: '十连胜', desc: 'PK十连胜', check: () => (S._pkStreak|0) >= 10, reward: { gold: 800 } },
  { id: 'trib10', name: '雷劫炼体', desc: '累计渡劫成功10次', check: () => (S.tribWin|0) >= 10, reward: { xianyu: 5 } },
  { id: 'casino_slots', name: '仙缘深厚', desc: '在仙缘机中过三同', check: () => (S._slotsTriple|0) >= 1, reward: { gold: 300 } },
  { id: 'casino_beast', name: '御兽大师', desc: '在灵兽斗中获胜', check: () => (S._beastWin|0) >= 1, reward: { gold: 200 } },
  { id: 'level100', name: '登峰造极', desc: '达到100级', check: () => (S.level|0) >= 100, reward: { gold: 1000 } },
  { id: 'realm10', name: '合体大能', desc: '突破到合体', check: () => (S.realm|0) >= 10, reward: { xianyu: 5 } },
  { id: 'alc5', name: '炼药宗师', desc: '炼药达到5级', check: () => (S.life && S.life.alc && S.life.alc.lv >= 5), reward: { gold: 150 } },
  { id: 'refine5', name: '炼金术士', desc: '炼金达到5级', check: () => (S.life && S.life.refine && S.life.refine.lv >= 5), reward: { gold: 150 } },
  { id: 'tame5', name: '驯兽宗师', desc: '驯兽达到5级', check: () => (S.life && S.life.tame && S.life.tame.lv >= 5), reward: { gold: 150 } },
  { id: 'pet_legend', name: '神兽认主', desc: '拥有传说以上灵宠', check: () => S.pets && S.pets.some(p => p.q >= 5), reward: { gold: 500 } },
  { id: 'adv50', name: '冒险王', desc: '完成50次冒险', check: () => (S._advCount|0) >= 50, reward: { gold: 800 } },
  { id: 'checkin100', name: '百年如一日', desc: '连续签到100天', check: () => (S._consecCheckin|0) >= 100, reward: { xianyu: 10 } },
  { id: 'reinc5', name: '五世轮回', desc: '完成5次轮回', check: () => (S.reincTotal|0) >= 5, reward: { xianyu: 5 } },
  { id: 'equip_legend', name: '神兵在手', desc: '拥有传说装备', check: () => S.gearBag && S.gearBag.some(g => g.q >= 4), reward: { gold: 500 } },
  { id: 'shatter', name: '碎玉', desc: '砸开过极品灵石', check: () => (S._shattered|0) >= 1, reward: { gold: 100 } },
  { id: 'first_aid', name: '妙手回春', desc: '使用过疗伤药', check: () => (S._usedMed|0) >= 1, reward: { gold: 50 } },
  // v1013 奇遇成就
  { id: 'enc1', name: '初遇奇缘', desc: '触发1次奇遇', check: () => (S.encTotal|0) >= 1, reward: { gold: 100 } },
  { id: 'enc10', name: '奇遇连连', desc: '累计触发10次奇遇', check: () => (S.encTotal|0) >= 10, reward: { gold: 300 } },
  { id: 'enc30', name: '命途多奇', desc: '累计触发30次奇遇', check: () => (S.encTotal|0) >= 30, reward: { xianyu: 2 } },
  { id: 'encbad5', name: '命途多舛', desc: '遭遇5次坏奇遇', check: () => (S.encBad|0) >= 5, reward: { gold: 200 } },
  { id: 'encchain', name: '环环相扣', desc: '走完一条奇遇链', check: () => (S.encChain|0) >= 1, reward: { gold: 300 } },
  { id: 'enckinds', name: '见闻广博', desc: '见识20种不同奇遇', check: () => !!(S.encSeen && Object.keys(S.encSeen).length >= 20), reward: { xianyu: 2 } },
  { id: 'baidu', name: '百毒不侵', desc: '凡人时丹毒达到5000（佩戴时丹毒上限10000、不中毒；轮回后消失）', check: () => (S.realm|0) === 0 && (S.danDu|0) >= 5000, reward: {} }, // v1140
];
function checkAchievements() {
  if (!S.achv) S.achv = {};
  for (const a of ACHIEVEMENTS) {
    if (!S.achv[a.id]) {
      try {
        if (a.check()) {
          S.achv[a.id] = 1;
          // 发奖励
          if (a.reward.gold) S.gold = (S.gold|0) + a.reward.gold;
          if (a.reward.xianyu) S.xianyu = (S.xianyu|0) + a.reward.xianyu;
          // 弹横幅
          try { toastLog('good', `🏆 成就达成：<b class="y">${a.name}</b>！${a.reward.gold?'金元+'+a.reward.gold:''}${a.reward.xianyu?'仙玉+'+a.reward.xianyu:''}`); } catch(e) {}
          // NPC道贺
          try { if (typeof chatPush === 'function') { const _msgs = ['恭喜道友！','道友天资过人！','厉害啊！']; chatPush('npc', `【${a.name}】${_msgs[Math.floor(Math.random()*_msgs.length)]}`); } } catch(e) {}
        }
      } catch(e) {}
    }
  }
  try { if (typeof save === 'function') save(); } catch(e) {}
}
function sheetTrain() {
  // 体力耗尽时直接弹系统选择框
  if (S.stamina <= 0 && !S.afk && !S.dead) {
    closeSheet();
    doAfkChoose();
    return;
  }
  openSheet(`<h2>修炼</h2><div class="hint">消耗体力提升属性，1 体力 = 1 点。当前体力 <b class="g">${S.stamina}</b>，🍗饱食度 <b class="g">${S.hunger}</b>${(S.realm|0) >= 1 && window.LG ? `<br>🌟灵根 <b>${window.LG.name(S)}</b>：修炼 <b class="g">${window.LG.trainTxt(S)}</b> 概率多得1点，闭关收益 <b class="g">${window.LG.afkTxt(S)}</b>` : ''}</div>` + (C.hasSt(S, 'poison') ? `<div class="warn">☠️ 你身中剧毒：每次进入冒险生命 -${Math.max(1, Math.ceil(C.bumpPeak(S) * 5 * K.POISON_VIT))}，<b>再进 ${C.leftBeforeDeath(S, 'poison')} 次冒险将毒发身亡</b>！请先用解毒丹。</div>` : '') +
    ATTRS.map(k => GK[k] ? (kind => { const g = GATHER[kind], v = GV[kind]; return `<div class="row"><div class="lab">${GI[kind]} ${g.name} · ${AN[k]} <b>${S.attrs[k]}</b><small>${AN[k]} +1，获得${g.noun}${kind === 'read' ? `（学习/深度学习/小悟/中悟/大悟 ${Object.values(C.gatherProbs(S, 'read')).map(C.pct).join('/')}，${C.pct(C.skillPageChance(S))} 得技能残页）` : `（${kind === 'farm' ? '丰收' : '暴击'}率 ${C.pct(C.gatherCrit(S, kind))}，${kind === 'farm' ? '用于炼药' : '可在商店出售'}${kind === 'egg' ? `，${C.pct(K.PET_EGG_CHANCE)} 掏到灵宠蛋` : ''}）`}</small></div>
      <button class="btn" data-gather="${kind}" data-n="1" ${S.stamina >= 1 ? '' : 'disabled'}>${v} 1</button>
      <button class="btn gold" data-gather="${kind}" data-n="5" ${S.stamina >= 5 ? '' : 'disabled'}>${v} 5</button></div>`; })(GK[k]) : `<div class="row"><div class="lab">📖 看书 · ${AN[k]} <b>${S.attrs[k]}</b><small>${AN[k]} +1，挑灯夜读，不获得物品</small></div>
      <button class="btn" data-train="${k}" data-n="1" ${S.stamina >= 1 ? '' : 'disabled'}>读 1</button>
      <button class="btn gold" data-train="${k}" data-n="5" ${S.stamina >= 5 ? '' : 'disabled'}>读 5</button></div>`).join('') +
    ((S.realm|0) >= 11 && window.LG ? `<h3 style="margin:10px 0 4px">☯️ 参悟法则 <small style="color:var(--dim)">灵根：${window.LG.name(S)} · 每次3体力 · 单法则圆满对应属性+15%</small></h3><div class="hint" style="margin-top:-2px">本命圆满：对应灵根属性各+5%，突破+5%×灵根数（双+10%/三+15%/四+20%）· 五行圆满：各属性+5%、突破+25%·混元道体</div>` +
      window.LG.ELES.map(el => { const pg = (S.faZe && S.faZe[el]) | 0, mine = window.LG.hasEle(S, el), done = pg >= 100; // v1129 变异根按来源行
        const _an = {str:'力量',vit:'体质',agi:'身法',int:'智力',def:'防御'}[window.LG.ATTR[el]];
        return `<div class="row"><div class="lab">${window.LG.ICON[el]} ${el}之法则 <b>${pg}%</b><small>对应${_an}${done ? ` · <b class="g">圆满（${_an}+15%生效中）</b>` : ''}${mine ? '' : ' · 🔒无此灵根'}</small></div>
        <button class="btn gold" data-faze="${el}" ${!mine || done || (S.stamina|0) < 3 ? 'disabled' : ''}>参悟</button></div>`; }).join('') +
      (S.faZeDone5 ? `<div class="hint">🌈 <b class="y">五行圆满 · 混元道体</b>：各属性+5%，突破主宰成功率+25%</div>` : S.faZeDone ? `<div class="hint">☯️ <b class="y">本命法则圆满</b>：${window.LG.benMingTxt(S)}</div>` : '') : '') +

    `<button class="btn full" data-close>关闭</button>`);
}
function sheetAlchemy(warn) {
  if (lifeLocked('alc')) { openSheet(`<h2>⚗️ 炼药</h2><div class="hint">🔒 未选择<b>炼药</b>技能，无法炼药。</div><div class="row"><button class="btn gold full" data-lcopen>🎯 选择生活技能</button></div><button class="btn full" data-close>关闭</button>`); return; } // v204
  const m = S.mats; if (useOpt.spirit && !(S.ores[useOpt.spirit] > 0)) useOpt.spirit = ''; if (useOpt.lu && !(m[useOpt.lu] > 0)) useOpt.lu = '';
  const gp = C.gradeProbs(S, useOpt.lu, useOpt.spirit);
  for (const ek in alcExtraSel) { const hv = m[ek] || 0; if (alcExtraSel[ek] > hv) alcExtraSel[ek] = hv; if (alcExtraSel[ek] <= 0) delete alcExtraSel[ek]; } // v998 加料剪除
  const tBtn = (kind, k, have, item) => `<button class="btn ${useOpt[kind] === k ? 'on' : ''}" data-${kind}opt="${k}" ${have > 0 ? '' : 'disabled'} style="padding:6px 2px;font-size:12px;line-height:1.3">${item.name.slice(0, 2)} ×${have || 0}<br><small>+${C.pct(item.alc)}</small></button>`;
  const tRow = (title, kind, keys, store, items) => `<div class="row" style="border:none;padding-bottom:2px"><div class="lab">${title}<small>可选 1 品，每次炼制消耗 1 个，成功率与上品概率同时提升</small></div></div><div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:6px">${keys.map(k => tBtn(kind, k, store[k], items[k])).join('')}</div>`;
  openSheet(`<h2>炼药 · Lv.${S.alc.lv} <small style="font-size:12px;color:var(--dim)">关联 智力 ${S.attrs.int}（成功率 +${C.pct(C.lifeAttrRate(S, 'alc'))}，上品 +${C.pct(C.lifeAttrQ(S, 'alc'))}）</small></h2>` + (warn ? `<div class="warn">${warn}</div>` : '') +
    `<div class="hint">每次消耗 ${C.useFali(S) ? C.lifeManaCost(S) + ' 法力' : K.COST_LIFE + ' 活力'} + 1 株对应药草 + 1 枚兽蛋（药引，优先低级，当前 <b style="color:#7fd6ff">${eggTotal(S)}</b> 枚）（当前${C.useFali(S) ? `法力 <b style="color:#5fd8e0">${S.mana}/${C.manaMax(S)}</b>` : `活力 <b style="color:#7fd6ff">${S.vigor}</b>`}，药草可种植或在商店购买）。成功率 <b class="y">${C.pct(C.alcRate(S, useOpt.lu, useOpt.spirit))}</b>；成丹 <b class="y">1-10 枚随机</b>；品质 <span class="q3">完美+5</span> ${C.pct(gp.q5)} · <span class="q2">丹纹+4</span> ${C.pct(gp.q4)} · <span class="q3">上品+3</span> ${C.pct(gp.q3)} · <span class="q2">中品+2</span> ${C.pct(gp.q2)} · <span class="q1">下品+1</span> ${C.pct(gp.q1)}</div>` +
    tRow('💧 凝露', 'lu', LUK, m, LU) + tRow('💠 灵石', 'spirit', SPK, S.ores, ORES) +
    `<div class="row" style="border:none;padding-bottom:2px"><div class="lab">🧪 加料<small>自选 0-3 味投进炉里（点按增减）。搭配对了有惊喜，不对会炸炉——基础料损 1 份、加料全损，结果自负</small></div></div><div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:6px">${[['h_str', MATS['h_str'].name], ['h_agi', MATS['h_agi'].name], ['h_def', MATS['h_def'].name], ['h_vit', MATS['h_vit'].name], ['h_int', MATS['h_int'].name], ['dw1', '下品凝露'], ['dw2', '中品凝露'], ['dw3', '上品凝露']].map(([ek, nm]) => { const have = m[ek] || 0, sel = alcExtraSel[ek] || 0; return `<button class="btn ${sel ? 'on' : ''}" data-extra="${ek}" ${have > 0 ? '' : 'disabled'} style="padding:6px 2px;font-size:12px;line-height:1.3">${nm} ×${have}<br><small>${sel ? '已投 ' + sel : '未投'}</small></button>`; }).join('')}</div>` +
    `<div class="hint">🧪 丹毒 <b class="${(S.danDu|0) > 60 ? 'r' : (S.danDu|0) > 20 ? 'y' : 'g'}">${S.danDu|0}</b>/${C.danDuCap(S)}（${C.toxTier(S.danDu|0)}）· 当前丹药药效 <b class="y">${Math.round(C.toxFactor(S) * 100)}%</b> ${S.toxDan ? ` · ☣️毒丹累积池 <b class="y">${S.toxPool|0}</b>` : ''} · 化无丹可清毒（见下方丹方）</div>` +
    ATTRS.map(k => { const h = m['h_' + k] || 0, noEgg = eggTotal(S) < 1; return `<div class="row"><div class="lab">${AN[k]}丹<small>${MATS['h_' + k].name} ×<b class="${h ? 'g' : 'r'}">${h}</b> + 兽蛋 ×<b class="${noEgg ? 'r' : 'g'}">${eggTotal(S)}</b></small></div>
      <button class="btn" data-brew="${k}" data-n="1" ${(C.lifeCost(S) || noEgg) ? 'disabled' : ''}>炼 1 次</button>
      <button class="btn gold" data-brew="${k}" data-n="5" ${(C.lifeCost(S) || noEgg) ? 'disabled' : ''}>炼 5 次</button></div>`; }).join('') +
    `<div class="row"><div class="lab">🍃 化无丹<small>${MATS['h_vit'].name} ×<b class="${(m['h_vit']||0) ? 'g' : 'r'}">${m['h_vit']||0}</b> + 一品凝露 ×<b class="${(m['dw1']||0) ? 'g' : 'r'}">${m['dw1']||0}</b> · 成丹 1-3 颗 · 服 1 颗清丹毒 20 点（持有 <b class="y">${S.inv['detox']|0}</b>）</small></div>
      <button class="btn" data-brewdetox="1" ${(C.lifeCost(S) || !(m['h_vit'] > 0) || !(m['dw1'] > 0)) ? 'disabled' : ''}>炼 1 次</button>
      <button class="btn gold" data-brewdetox="5" ${(C.lifeCost(S) || !(m['h_vit'] > 0) || !(m['dw1'] > 0)) ? 'disabled' : ''}>炼 5 次</button></div>` +
    `<div class="row"><div class="lab">💊 解毒丹<small>${MATS['h_agi'].name} ×<b class="${(m['h_agi']||0) ? 'g' : 'r'}">${m['h_agi']||0}</b> + 一品凝露 ×<b class="${(m['dw1']||0) ? 'g' : 'r'}">${m['dw1']||0}</b> · 成丹 1-3 颗 · 解除中毒（持有 <b class="y">${S.meds['antidote']|0}</b>）</small></div>
      <button class="btn" data-brewantidote="1" ${(C.lifeCost(S) || !(m['h_agi'] > 0) || !(m['dw1'] > 0)) ? 'disabled' : ''}>炼 1 次</button>
      <button class="btn gold" data-brewantidote="5" ${(C.lifeCost(S) || !(m['h_agi'] > 0) || !(m['dw1'] > 0)) ? 'disabled' : ''}>炼 5 次</button></div>` +
    `<div class="row"><div class="lab">🍘 辟谷丸<small>${MATS['h_vit'].name} ×<b class="${(m['h_vit']||0) ? 'g' : 'r'}">${m['h_vit']||0}</b> + 兽蛋 ×<b class="${eggTotal(S) ? 'g' : 'r'}">${eggTotal(S)}</b> · 饱食 +20 · 丸非丹，不积丹毒（持有 <b class="y">${(S.dan && S.dan.bigu)|0}</b>）</small></div>
      <button class="btn" data-brewdan="bigu" data-n="1" ${(C.lifeCost(S) || !(m['h_vit'] > 0) || eggTotal(S) < 1 || (S.alc.lv|0) < 3) ? 'disabled' : ''}>${(S.alc.lv|0) < 3 ? '炼药 Lv.3' : '炼 1 次'}</button>
      <button class="btn gold" data-brewdan="bigu" data-n="5" ${(C.lifeCost(S) || !(m['h_vit'] > 0) || eggTotal(S) < 1 || (S.alc.lv|0) < 3) ? 'disabled' : ''}>${(S.alc.lv|0) < 3 ? '炼药 Lv.3' : '炼 5 次'}</button></div>` +
    `<div class="row"><div class="lab">💪 气力丸<small>${MATS['h_str'].name} ×<b class="${(m['h_str']||0) ? 'g' : 'r'}">${m['h_str']||0}</b> + 兽蛋 ×<b class="${eggTotal(S) ? 'g' : 'r'}">${eggTotal(S)}</b> · 体力 +3 · 丸非丹，不积丹毒（持有 <b class="y">${(S.dan && S.dan.qili)|0}</b>）</small></div>
      <button class="btn" data-brewdan="qili" data-n="1" ${(C.lifeCost(S) || !(m['h_str'] > 0) || eggTotal(S) < 1 || (S.alc.lv|0) < 5) ? 'disabled' : ''}>${(S.alc.lv|0) < 5 ? '炼药 Lv.5' : '炼 1 次'}</button>
      <button class="btn gold" data-brewdan="qili" data-n="5" ${(C.lifeCost(S) || !(m['h_str'] > 0) || eggTotal(S) < 1 || (S.alc.lv|0) < 5) ? 'disabled' : ''}>${(S.alc.lv|0) < 5 ? '炼药 Lv.5' : '炼 5 次'}</button></div>` +
    `<h3>🌿 灵物丹</h3>` + ((S.lingwu || []).length ? S.lingwu.map((w2, i2) => { const needLv = [6, 8, 10][w2.g - 1], can = (S.alc.lv | 0) >= needLv && (m['h_vit'] | 0) >= 3 && eggTotal(S) >= 1 && !C.lifeCost(S); return `<div class="row"><div class="lab"><b style="color:${C.GRADE_COLORS[w2.g - 1]}">${C.LW_GRADE_NAMES[w2.g - 1]}</b>·<b style="color:${C.LW_ELE_COLORS[w2.e]}">${w2.e}</b>（${w2.y} 年）<small>炼寿元丹：生命草×3（有 ${m['h_vit'] | 0}）+ 兽蛋×1（有 ${eggTotal(S)}）· 成丹寿元 +${Math.floor(w2.y * 0.5)} · 年份暴击 ${Math.min(40, String(w2.y).length * 5)}% 出 2~10 颗 · 服丹倍率：对行100%·同系80%·双根共鸣130%·不对行50%</small></div><button class="btn gold" onclick="window.brewSyd(${i2})" ${can ? '' : 'disabled'}>${(S.alc.lv | 0) < needLv ? '炼药 Lv.' + needLv : '炼寿元丹'}</button></div>`; }).join('') : '<div class="empty">暂无灵物（冒险采草药有概率出）</div>') +
    (() => { const cnt = [1, 2, 3].map(g => (S.lingwu || []).filter(w => w.g === g).length); const can = cnt.every(c => c > 0) && eggTotal(S) >= 1 && (S.alc.lv | 0) >= 10 && !C.lifeCost(S); return `<div class="row"><div class="lab">🌀 开脉丹<small>地品×${cnt[0]} 天品×${cnt[1]} 仙品×${cnt[2]}（各需 1 株，自动用年份最低的）+ 兽蛋×1（有 ${eggTotal(S)}）· 不分五行 · 每颗开一穴（持有 <b class="y">${S.inv['mai'] | 0}</b>）</small></div><button class="btn gold" onclick="window.brewKm()" ${can ? '' : 'disabled'}>${(S.alc.lv | 0) < 10 ? '炼药 Lv.10' : '炼开脉丹'}</button></div>`; })() +
    `<div class="grid2"><button class="btn full" data-life="cook">← 生活技能</button><button class="btn full" data-close>关闭</button></div>`);
}
function sheetAdventure(page) {
  if (S.run) return sheetRun();
  page = page || 1;
  const mjLeft = (C.MIJING_DAILY + ID_TIERS[idTier()].mj) - (S.mijingD === C.todayStr() ? (S.mijingN | 0) : 0);
  const mj = C.DIFFS.mijing;
  const isXian = (S.realm | 0) >= 8, wxLeft = C.wxDailyLeft(S), wxLim = C.WX_DAILY[S.realm | 0] || 0;
  let content = '';
  if (page === 5 && isXian) {
    content = `<h3 style="margin:10px 0 4px">🖐️ 仙术五行修炼 <small style="color:var(--dim)">10步 · 守关必为👑王阶（必掉1对应残物）· 每日限 ${wxLim} 次（今日剩余 <b class="${wxLeft > 0 ? 'g' : 'r'}">${wxLeft}</b> 次）</small></h3>` +
      C.WUXING.map(e => { const k = 'wx_' + e.k, d = DIFFS[k];
        const _fzOk = ((S.faZe || {})[e.name] | 0) >= 100; // v874 需对应法则圆满
        const can = S.stamina >= d.cost && (S.mana | 0) >= C.WX_COST_XIAN && !S.dead && wxLeft > 0 && _fzOk;
        return `<div class="row"><div class="lab"><b style="color:${e.color}">${e.name}行</b><small>-${C.WX_COST_XIAN} 仙力 · -${d.cost} 体力 · ${C.ADV_STEPS[k]} 步 · ${e.name}属性怪 · 王必掉<b style="color:${e.color}">【${e.name}残物】</b>×1，其他怪 ${C.pct(C.WX_FRAG_DROP)} 掉落（每次不出+1%，出了清零）${_fzOk ? '' : `<br><span class="r">需${e.name}之法则圆满（尊者参悟）</span>`}</small></div>
        <button class="btn gold" data-adv="${k}" ${can ? '' : 'disabled'}>进入</button></div>`; }).join('') +
      `<div class="row"><div class="lab">⚗️ <b>五行合成</b><small>10个同属性残物合成1件，自选 <b>X之力</b>（攻击附带+10%属性伤害/件）或 <b>X之抗</b>（免除X属性伤害，按(抗-力)反弹）</small></div>
        <button class="btn" data-a="wxsynth">合成</button></div>`;
  } else {
    const pageDiffs = { 1: ['easy', 'mid', 'hard', 'brutal', 'hell', 'abyss', 'nightmare'], 2: ['mijing'], 3: [], 4: [] };
    const keys = pageDiffs[page] || [];
    content = keys.map(k => {
      if (k === 'mijing') {
        return `<div class="row" style="border:1px solid var(--gold);border-radius:8px"><div class="lab">🌀 <b class="y">秘境</b> <small>-${mj.cost} 体力 · 10-15步随机 · 怪物更强、高阶怪更多，<b class="y">稀有掉落大幅提升</b>，守关必为👑王阶 · 每日限 ${C.MIJING_DAILY + ID_TIERS[idTier()].mj} 次（今日剩余 <b class="${mjLeft > 0 ? 'g' : 'r'}">${mjLeft}</b> 次）</small></div>
          <button class="btn gold" data-adv="mijing" ${S.stamina >= mj.cost && !S.dead && mjLeft > 0 ? '' : 'disabled'}>进入秘境</button></div>`;
      }
      const d = DIFFS[k]; const low = S.level < d.rec || C.total(S.attrs) < d.recTot, rw = C.RANK_W[k], sum = rw.reduce((a, b) => a + b, 0);
      return `<div class="row"><div class="lab">${d.name} <small style="display:inline" class="${low ? 'r' : 'g'}">建议 Lv.${d.rec}+ · 总属性 ${d.recTot}+</small><small>-${d.cost} 体力 · ${C.ADV_STEPS[k]} 步 · 怪物 ${C.RANKS.map((r, i) => rw[i] ? `<span class="${r.cls}">${r.name}${Math.round(rw[i] / sum * 100)}%</span>` : '').filter(Boolean).join(' ')} · 败：属性 -${d.lose}、伤病 ${C.pct(d.st)}</small></div>
        <button class="btn ${d.cost >= 10 ? 'red' : d.cost >= 3 ? 'gold' : ''}" data-adv="${k}" ${S.stamina >= d.cost && !S.dead ? '' : 'disabled'}>出发</button></div>`;
    }).join('');
  }
  const pageBtns = [1,2,3,4,5].map(p => `<button class="btn" data-advpage="${p}" style="flex:1;${p===page?'opacity:0.5':''}">${p}</button>`).join('');
  openSheet(`<h2>冒险 · 选择难度</h2><div class="hint">6×6 格子地图，点格子移动探索：❓ 格子藏着遇怪/奇遇/陷阱/休息点，🎁宝箱与🌿灵草都有守怪——可🤫悄悄获取（敏捷检定，被发现则开战）或⚔️斩杀守怪；难度越高体力越多、怪物越强、奖励与稀有掉落越多（当前体力 <b class="g">${S.stamina}</b>，Lv.${S.level}，总属性 ${C.total(S.attrs)}）。战败将扣除属性、<span class="r">清空剩余体力</span>并损失 ${C.pct(K.DEATH_GOLD_PCT)} 金元，冒险随即结束；随时可撤退保住收获。</div>` + // v774 取消终点门
    content +
    `<div class="row" style="padding:12px 0 0;background:var(--panel);display:flex;gap:8px">${pageBtns}</div>` +

    `<button class="btn full" data-close>关闭</button>`);
}
function sheetWxSynth() { // 五行合成：10残物→1力/抗
  const rows = C.WUXING.map(e => { const n = S.wxFrag[e.k] | 0, can = n >= 10;
    return `<div class="row"><div class="lab"><b style="color:${e.color}">${e.name}残物</b> ×${n}<small>10个合成1件：<b style="color:${e.color}">${e.name}之力</b> ×${S.wxPow[e.k] | 0}（攻击附带+10%${e.name}伤/件，无法闪避） / <b style="color:${e.color}">${e.name}之抗</b> ×${S.wxRes[e.k] | 0}（免除${e.name}伤，被命中时按(抗-力)件数反弹10%/件）</small></div>
      <div style="display:flex;gap:6px"><button class="btn gold" data-wxsyn="${e.k}:pow" ${can && !S.dead ? '' : 'disabled'}>合力</button><button class="btn" data-wxsyn="${e.k}:res" ${can && !S.dead ? '' : 'disabled'}>合抗</button></div></div>`; }).join('');
  openSheet(`<h2>⚗️ 五行合成</h2><div class="hint">10个同属性残物合成1件<b>之力</b>或<b>之抗</b>，可叠加。之力：攻击时附带对应属性伤害（每件+10%）；之抗：免除对应属性伤害，被命中时按（抗件数-力件数）反弹（每件反弹10%属性伤害，如1金之力打3金之抗，反弹20%）。属性伤害颜色：金<span style="color:#ffd700">金</span> · 木<span style="color:#22c55e">绿</span> · 水<span style="color:#3b9ddd">蓝</span> · 火<span style="color:#ef4444">红</span> · 土<span style="color:#a16207">褐</span>。</div>` + rows + `<button class="btn full" data-close>关闭</button>`);
}
function doWxSynth(k, kind) {
  const r = C.synthWx(S, k, kind); if (!r) return;
  const e = C.wxByK(k);
  log('ok', `⚗️ 合成成功：<b style="color:${e.color}">【${r.name}】</b>×1（${e.name}残物 -10）`);
  afterAct(); commit(); sheetWxSynth();
}
const rewTxt = rw => { const it = Object.keys(rw.items).map(key => { const [st, k] = key.split(':'); return `${C.itemLabel(st, k)}×${rw.items[key]}`; }); const xpLbl = C.resLbl(S); return [rw.pts ? `属性 <span class="g">${Object.keys(rw.gains).map(a => AN[a] + '+' + rw.gains[a]).join(' ')}</span>` : '', rw.gold ? `金元 <span class="y">+${rw.gold}</span>` : '', rw.xp ? `${xpLbl} <span class="g">+${rw.xp}</span>` : '', it.length ? `物品 <span class="y">${it.join(' ')}</span>` : ''].filter(Boolean).join('，') || '无'; };
function monCard(m, tail) { const r = C.RANKS[m.rank]; return `<span class="${r.cls}">【${r.name}】${m.name}</span>（Lv.${m.lv}）${tail || ''}${m.skills.length ? ' <span class="pu">' + m.skills.map(k => SKILLS[k].name).join('·') + '</span>' : ''}<br><small style="color:var(--dim)">${ATTRS.map(k => AN[k] + C.fmtN(m.attrs[k])).join(' ')} · 你：${ATTRS.map(k => AN[k] + C.fmtN(C.fightAttrs(S, true)[k])).join(' ')}</small>`; }
function sheetRun(out) { // v182 格子冒险：地图 + 上下左右方向键 + 事件面板
  const run = S.run; if (!run || !run.grid) return;
  const d = DIFFS[run.dk], g = run.grid, ev = run.ev, chs = ev ? (ev.type === 'dungeonText' ? [] : C.advChoices(S)) : [];
  const TICON = { start: '🟫', empty: '⬜', fight: '⚔️', fortune: '✨', chest: '🎁', gchest: '🎁', gherb: '🌿', trap: '⚠️', rest: '⛺', event: '📜', rherb: '🌱', rore: '⛏️', rvein: '💎', herb: '🌿', ore: '⛏️', vein: '💎' }; // v1154 资源格类型图标
  const shared = run.shared && run.shared.on ? run.shared : null;
  // v971 其他玩家位置索引
  const otherAt = {};
  if (shared && shared.players) {
    shared.players.forEach(function(p) { const _k = p.x + ',' + p.y; (otherAt[_k] = otherAt[_k] || []).push(p); }); // v1007 同格多人全记
  }
  let cells = '';
  const _coHere = otherAt[g.px + ',' + g.py];
  const _coLine = (_coHere && _coHere.length) ? `<div class="hint">🧑 同格道友：${_coHere.map(function(p) { return String(p.username || ''); }).join('、')}</div>` : '';
  for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) {
    const t = g.tiles[y][x], isP = x === g.px && y === g.py;
    // v971 共享模式：tile 类型取服务端，本地 grid 只记位置
    let tileT = t.t, tileCleared = false, tileRespawn = 0, tileRes = null;
    if (shared && shared.tiles && shared.tiles[y] && shared.tiles[y][x]) {
      const st = shared.tiles[y][x];
      tileT = st.t; tileCleared = st.state === 'cleared'; tileRespawn = st.respawn_in | 0; tileRes = st.res || null; // v1125 资源
    }
    if (tileT === 'void' && !isP) { cells += '<div class="acell" style="background:transparent;border:none;box-shadow:none;cursor:default"></div>'; continue; } // v1151 虚空格：透明，露出地图形状
    let icon = '❓', cls = '';
    if (isP) { icon = `<img src="${avatarUrl()}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;display:block">`; cls = ' me'; const _co = otherAt[x + ',' + y]; if (_co && _co.length) icon += `<span style="position:absolute;right:0;bottom:0;background:rgba(0,0,0,.68);color:#ffd94d;font-size:8px;line-height:1.3;padding:0 3px;border-radius:4px">🧑×${_co.length}</span>`; }
    else if (otherAt[x + ',' + y]) {
      // v971 显示其他玩家
      const _ops = otherAt[x + ',' + y]; const op = _ops[0];
      icon = `<div style="font-size:10px;line-height:1;text-align:center">🧑${_ops.length > 1 ? '×' + _ops.length : ''}<br><span style="font-size:8px">${String(op.username || '').slice(0, 4)}</span></div>`;
      cls = ' other';
    }
    else if (tileT === 'exit') { icon = '🚪'; cls = ' exit'; }
    else if (tileCleared) { icon = '<span style="opacity:0.35">💨</span>'; cls = ' cleared'; }
    else if (tileT === 'herb' || tileT === 'ore' || tileT === 'vein') { // v1154 资源格：类型图标 + 等级徽（数量/怪站上去才看）
      const _lv = (shared && shared.tiles && shared.tiles[y] && shared.tiles[y][x] ? (shared.tiles[y][x].lv | 0) : (t.lv | 0)) || 1;
      const _base = TICON[tileT];
      icon = tileT === 'ore' ? _base : `<span style="position:relative;display:inline-block">${_base}<span style="position:absolute;right:-5px;bottom:-5px;background:${C.GRADE_COLORS[_lv - 1]};color:#fff;font-size:8px;line-height:1.5;padding:0 3px;border-radius:4px">${tileT === 'herb' ? ['地', '天', '仙'][_lv - 1] : ['小', '中', '巨'][_lv - 1]}</span></span>`;
    }
    else if (t.seen || shared) { icon = TICON[tileT] || '⬜'; }
    // v1125 采集阵标记（共享图）
    if (shared && (shared.arrays || []).some(a => a.x === x && a.y === y)) {
      if (isP) icon += `<span style="position:absolute;left:0;bottom:0;font-size:10px">🧭</span>`;
      else icon = `<div style="position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center">${icon}<span style="position:absolute;top:-2px;right:-2px;font-size:10px">🧭</span></div>`;
    }
    const _dist = Math.abs(x - g.px) + Math.abs(y - g.py);
    const _cheb = Math.max(Math.abs(x - g.px), Math.abs(y - g.py)); // v764 斜走用切比雪夫距离
    const _hasSk = S.skills && S.skills.includes('shukuchi');
    const _hasDny = S.skills && S.skills.includes('danuoyi');
    const _maxDist = _hasDny ? 3 : (_hasSk ? 2 : 1);
    const _maxDiag = _hasDny ? 2 : (_hasSk ? 1 : 0); // 斜走与主城同规（v850）：大挪移斜2格、缩地斜1格
    // v767 无技能只能正交1格；有缩地/大挪移才能斜走
    const _isOrth = (x === g.px || y === g.py);
    const _adj = !isP && ((_isOrth && _dist >= 1 && _dist <= _maxDist) || ((!_isOrth) && (_hasSk || _hasDny) && _cheb >= 1 && _cheb <= _maxDiag));
    cells += isP ? `<button class="acell${cls}" data-advself="1" style="position:relative">${icon}</button>` : (_adj ? `<button class="acell${cls}" data-advx="${x}" data-advy="${y}">${icon}</button>` : `<div class="acell${cls}">${icon}</div>`); // v768 点自己看状态
  }
  const scene = ev
    ? (ev.type === 'dungeonText' ? escDg(ev.text) : ev.type === 'fight' ? `${ev.text ? `<span class="r">${ev.text}</span> ` : ''}${ev.boss ? '<b class="r">守关</b>' : ''}一只${monCard(ev.mon, '挡住去路')}`
      : ev.type === 'guarded' ? `🛡️ ${ev.text}——${monCard(ev.mon, '正守着' + (ev.loot === 'herb' ? '🌿灵草' : '🎁宝箱'))}`
      : C.ADV_EVENTS[ev.id].t)
    : `<span style="color:var(--dim)">点格子移动，踩开 ❓ 格子触发事件；随时可撤退。</span>`; // v774 取消终点门
  // v1154 当前格信息条：站上资源格才显示存量与怪数；可采集，也可选档攻击（共享/本地同）
  let resRow = '';
  if (!ev) {
    const mySt = shared && shared.tiles && shared.tiles[g.py] ? shared.tiles[g.py][g.px] : null;
    const lt = g.tiles[g.py][g.px];
    const rk = mySt ? mySt.t : lt.t;
    const btns = [];
    let infoLine = '';
    if (rk === 'herb' || rk === 'ore' || rk === 'vein') {
      const lv = ((mySt ? mySt.lv : lt.lv) | 0) || 1, amt = (mySt ? mySt.amt : lt.amt) | 0, mons = (mySt ? mySt.mons : lt.mons) || { w: 0, m: 0, s: 0 };
      const nm = rk === 'herb' ? `🌿 草药丛·${['', '地品', '天品', '仙品'][lv]}` : rk === 'vein' ? `💎 灵脉·${['', '小型', '中型', '巨型'][lv]}` : '⛏️ 矿石';
      const monsTxt = [['w', '弱'], ['m', '中'], ['s', '强']].filter(([k]) => (mons[k] | 0) > 0).map(([k, n]) => `${n}×${mons[k]}`).join(' ');
      infoLine = `<div class="hint" style="text-align:center">${nm} · 存量 ×${amt}${monsTxt ? ` · 怪：${monsTxt}` : ''}</div>`;
      if (amt > 0) btns.push(`<button class="btn gold" data-advres2 style="flex:1">✋ 采集</button>`);
      [['w', '弱'], ['m', '中'], ['s', '强']].forEach(([k, n]) => { if ((mons[k] | 0) > 0) btns.push(`<button class="btn" data-advatk="${k}" style="flex:1">⚔️ 攻·${n}</button>`); });
    }
    if (shared) {
      const myArr = (shared.arrays || []).find(a => a.mine);
      const arrHere = myArr && myArr.x === g.px && myArr.y === g.py;
      const arrOnTile = (shared.arrays || []).some(a => a.x === g.px && a.y === g.py);
      if (arrHere) { const _iv = myArr.inv || { mats: {}, ores: {}, lw: [], seeds: {} }; const _cnt = o => Object.values(o || {}).reduce((sv, v) => sv + (v | 0), 0); btns.push(`<button class="btn" data-advarr style="flex:1">🧭 ${['', '小型', '中型', '大型'][Math.min(3, Math.max(1, myArr.tier | 0 || 1))]}采集阵（存货 ${_cnt(_iv.mats) + _cnt(_iv.ores) + (_iv.lw || []).length + _cnt(_iv.seeds)}）</button>`); }
      else if (mySt && (rk === 'herb' || rk === 'ore' || rk === 'vein') && !arrOnTile && !myArr && ((S.formations && ((S.formations.f_gather | 0) + (S.formations.f_gather2 | 0) + (S.formations.f_gather3 | 0))) | 0) > 0) btns.push(`<button class="btn" data-advplace style="flex:1">🧭 在此布采集阵</button>`);
      if (myArr && !arrHere) btns.push(`<button class="btn" data-advarr style="flex:1">🧭 我的采集阵（${myArr.x},${myArr.y}）</button>`);
    }
    if (btns.length || infoLine) resRow = infoLine + (btns.length ? `<div class="row" style="display:flex;gap:8px;flex-wrap:wrap">${btns.join('')}</div>` : '');
  }
  // v1169 冒险内近况：最近 3 条日志直接显示在面板里（此前反馈只进日记、被冒险面板盖住看不见，Ye 报「没提示、没记录、看不了聊天框」）
  const _recentHtml = (() => { try { const _lg = (Array.isArray(S.log) ? S.log.slice(-3) : []).filter(e => e && e.h); if (!_lg.length) return ''; return `<div class="empty" style="text-align:left;padding:8px 2px">📜 近况${_lg.map(e => `<div style="font-size:11px;color:var(--dim)"><span style="color:#666">${e.t || ''}</span> ${e.h}</div>`).join('')}</div>`; } catch(_) { return ''; } })();
  openSheet(`<h2>${run.dungeon ? '🏰 ' + escDg(run.dungeon.title) + ' <small style="font-size:12px;color:var(--dim)">作者：' + escDg(run.dungeon.by) + '</small>' : '🗺️ ' + d.name + '冒险'} <small style="font-size:12px;color:var(--dim)">已走 ${g.moves} 格 · 触发 ${run.evCount | 0} 事件</small></h2>` +
    (out && out.lines && out.lines.length ? `<div class="hint">${out.lines.join('；')}${out.battle ? `<details><summary>战斗记录（${out.battle.round} 回合）</summary>${out.battle.lines.join('')}</details>` : ''}</div>` : '') +
    `<div class="agrid">${cells}</div>${_coLine}` +
    `<div class="scene">${scene}</div>` +
    resRow +
    (ev && ev.type === 'dungeonText' ? `<div class="grid2"><button class="btn gold full" data-dungeontext>继续前行</button></div>` : ev ? `<div class="grid2">${chs.map((c, i) => `<button class="btn ${c.retreat ? '' : i === 0 ? 'gold' : ''}" data-advc="${i}" ${c.dis ? 'disabled' : ''} style="line-height:1.3">${c.l}${c.hint ? `<br><small>${c.hint}</small>` : ''}</button>`).join('')}</div><div class="hint" style="text-align:center">也可直接走开，事件留在格子上，回来再处理</div>` : '') +
    `<div class="row" style="display:flex;gap:8px"><button class="btn gold" data-dazuo style="flex:1">🧘 调息（回10%生命）</button><button class="btn" data-tpscroll style="flex:1" ${(S.meds.tpscroll|0) > 0 ? '' : 'disabled'}>📜 传送卷×${S.meds.tpscroll|0}</button></div>` +
    `<div class="row" style="display:flex;gap:8px"><button class="btn" data-advretreat style="flex:1">🏳️ 撤退</button><button class="btn" data-close style="flex:1">稍后继续</button></div>` +
    `<div class="empty" style="text-align:left;padding:8px 2px">本轮收获：${rewTxt(run.rew)}</div>` + _recentHtml);
}
function doAdvMove(dir) {
  const r = C.advMove(S, dir); if (!r || r.err) return;
  if (r.end) { showAdvEnd({ lines: ['抵达终点'], end: r.end }); return; }
  afterAct(); commit(); sheetRun();
  if (r.resMsg) { try { toastLog('good', r.resMsg); } catch (_) {} } // v1125 资源格采集反馈
}
function doAdvRetreat() {
  const r = C.advRetreat(S); if (!r) return;
  showAdvEnd(r);
}
function showAdvEnd(r) { // 冒险结算统一展示
  const e = r.end, d = DIFFS[e.dk], why = { done: e.grid ? '抵达终点' : '顺利走完全程', retreat: '中途撤退', defeat: '战败而归', dead: '昏死过去' }[e.why] || '';
  const prog = e.grid ? `探索 ${e.steps} 格，触发 ${e.total} 事件` : `${e.steps}/${e.total} 步`;
  const sum = `🏁 <b>${d.name}冒险结束</b>（${why}，${prog}，胜 ${e.rew.wins} 场）：${rewTxt(e.rew)}${lvUpTxt(e.rew.lvUp)}${e.newSt.length ? `<br>⚠️ 你带着伤病归来：${stTxt(e.newSt)}` : ''}`;
  log(e.defeat ? 'bad' : 'good', sum); afterAct(); commit();
  openSheet(`<h2>冒险结束</h2>${r.lines.length ? `<div class="hint">${r.lines.join('；')}</div>` : ''}<div class="scene">${sum}</div><div class="grid2"><button class="btn gold" data-a="adventure">再来一轮</button><button class="btn" data-close>关闭</button></div>`);
}
function doAdventure(dk) {
  if (S.run && !S.dead) { sheetRun(); return; } // 已在冒险中：直接继续
  const run = C.advStart(S, dk); if (!run) { if (S.dead) { closeSheet(); afterAct(); commit(); } return; }
  if (C.hasSt(S, 'poison') && !S.dead) { // 中毒：每次进冒险扣中毒时生命上限的10%
    if (!S.status.poisonBase) S.status.poisonBase = S.attrs.vit;
    const hpMaxA = C.bumpPeak(S) * 5, hpFullA = (S.attrs.str + S.attrs.def + S.attrs.vit) * 5;
    const loss = Math.max(1, Math.ceil(hpMaxA * K.POISON_VIT));
    S.hpCur = Math.max(0, (S.hpCur != null ? S.hpCur : hpFullA) - loss);
    C.addPoisonAcc(C.drainVit(S, 'poison', loss, 0));
    log('bad', `☠️ 毒发：进入冒险，生命 -${Math.round(loss)}（中毒时上限的10%）`);
    if (S.attrs.vit <= 0) { C.die(S, 'poison'); closeSheet(); afterAct(); commit(); return; }
  }
  log('pk', `🗺️ ${DIFFS[dk].name}${dk.startsWith('wx_') ? '🖐️五行' : ''}冒险（-${DIFFS[dk].cost} 体力${dk.startsWith('wx_') ? ` -${C.WX_COST_XIAN} 仙力` : ''}，6×6 格子探索）`); afterAct(); commit();
  // v971 全服共享地图：异步接入，成功后刷新面板
  try { C.advSharedInit(S).then(function(ok) { if (ok && S.run) { try { sheetRun(); } catch (_) {} } }); } catch (_) {}
  sheetRun();
}
async function doAdvChoose(i) {
  const ev = S.run && S.run.ev;
  if (ev && ev.type === 'fight' && i === 0) { // 冒险战斗：进手动战斗界面再选燃血/燃法/仙力
    const run = S.run;
    const _pkA = { battle: C.advBattleSetup(S, run), adv: true };
    try { window._pkSeq = Date.now(); } catch(_) {}
    _pkA._seq = window._pkSeq;
    pk = _pkA;
    try { window.pk = _pkA; } catch(_) {}
    try { const _GA = (typeof G !== 'undefined' ? G : window); _GA.pk = _pkA; } catch(_) {}
    log('pk', `⚔️ ${monCard(ev.mon)}<br>进入战斗！先选燃血/燃法/仙力爆发，再点攻击。`);
    closeSheet(); afterAct(); save();
    try { if (typeof renderCombat === 'function') renderCombat(); else render(); } catch(_) {}
    return;
  }
  const r = await C.advChoose(S, i); if (!r || r.err) return;
  if (S.run && S.run.monKillPending) { const mp = S.run.monKillPending; S.run.monKillPending = null; try { await advMonKillShared(mp); } catch (_) {} } // v1154 共享图击杀登记（v1170 统一走带 not_there 自愈的实现；裸调与 finishAdvBattle 同口径）
  const head = ev.type === 'fight' ? `⚔️ ${monCard(ev.mon)}` : ev.type === 'guarded' ? `🗺️ 守怪宝藏` : `🗺️ ${C.ADV_EVENTS[ev.id].t}`;
  log(r.battle && !r.battle.winner.isPlayer ? 'bad' : 'good', `${head}<br>${r.lines.join('；')}` + (r.battle ? `<details><summary>战斗记录（${r.battle.round} 回合）</summary>${r.battle.lines.join('')}</details>` : ''));
  if (r.end) { showAdvEnd(r); return; }
  afterAct(); commit(); sheetRun(r);
}
let feedTo = 0; // 人物卡喂食对象：0 = 自己，否则灵宠 id
function foodSection() {
  if (feedTo && !S.pets.some(p => p.id === feedTo)) feedTo = 0;
  const who = feedTo ? S.pets.find(p => p.id === feedTo) : null, whoTxt = who ? `${PETS[who.k].icon}${PETS[who.k].name}#${who.id}（饥饿 ${Math.round(who.hunger)}）` : `自己（饱食 ${Math.floor(S.hunger)}）`;
  const tgt = S.pets.length ? `<div class="row" style="flex-wrap:wrap;gap:4px"><small style="width:100%;color:var(--dim)">喂给：</small><button class="btn ${feedTo ? '' : 'on'}" data-feedto="0" style="padding:6px 10px;font-size:12px">自己</button>${S.pets.map(p => `<button class="btn ${feedTo === p.id ? 'on' : ''}" data-feedto="${p.id}" style="padding:6px 10px;font-size:12px">${PETS[p.k].icon}${PETS[p.k].name}#${p.id} ${Math.round(p.hunger)}</button>`).join('')}</div>` : '';
  const row = (kind, k, it, have, icon, extra) => `<div class="row"><div class="lab">${icon} ${it.name} ×${have}<small>饱食 +${it.hunger}${extra}</small></div><button class="btn" data-food="${kind}" data-k="${k}" data-n="1">吃 1</button>${have > 1 ? `<input type="number" min="1" max="${have}" value="${Math.min(have,(S.foodLastN&&S.foodLastN[kind+'_'+k])||have)}" data-foodnum="${kind}_${k}" style="width:56px;padding:6px;border-radius:6px;border:1px solid #555;background:#222;color:#fff;font-size:12px"><button class="btn gold" data-food="${kind}" data-k="${k}" data-ncustom="1">吃</button>` : ''}</div>`;
  const meats = Object.keys(MEATS).filter(k => S.food[k] > 0).map(k => row('meat', k, MEATS[k], S.food[k], '🍖', who ? '' : `，体力 +${MEATS[k].sta}`));
  const eggs = Object.keys(EGGS).filter(k => S.eggs[k] > 0).map(k => row('egg', k, EGGS[k], S.eggs[k], '🥚', ''));
  return `<h3>食物 <small style="font-weight:400">（喂给 ${whoTxt} · 体力 ${S.stamina}）</small></h3>` + tgt + (meats.length + eggs.length ? meats.join('') + eggs.join('') : '<div class="empty">暂无食物，打猎偶得肉、掏兽蛋得蛋</div>');
}
function medSection() {
  const ks = Object.keys(C.MEDS).filter(k => S.meds[k] > 0);
  return `<h3>疗伤药</h3>` + (ks.length ? ks.map(k => { const m = C.MEDS[k], need = k === 'stealthfu' ? true : (m.cure === 'curse' ? (S.curseN|0) > 0 : C.hasSt(S, m.cure)); return `<div class="row"><div class="lab">💊 ${m.name} ×${S.meds[k]}<small>${m.desc}${k === 'stealthfu' && Number(S.stealthUntil || 0) > Date.now() ? ` · <span class="g">🥷 隐身中（剩 ${Math.ceil((Number(S.stealthUntil) - Date.now()) / 60000)} 分钟）</span>` : ''}</small></div><button class="btn ${need ? 'gold' : ''}" data-med="${k}" ${need ? '' : 'disabled'}>${need ? '使用' : '无需'}</button></div>`; }).join('') : '<div class="empty">暂无，可在商店购买</div>');
}
const ZQ_DEFS = [ // v1128 阵棋：小/中/大三档，合成采集阵（个数 64/128/256）
  { g: 1, name: '小型阵棋', need: [['ores', 'iron', 10], ['ores', 'copper', 5], ['prey', 'rabbit', 10], ['prey', 'deer', 5]], synth: 64, fkey: 'f_gather', fname: '小型采集阵' },
  { g: 2, name: '中型阵棋', need: [['ores', 'copper', 10], ['ores', 'silver', 5], ['prey', 'deer', 10], ['prey', 'wolf', 5]], synth: 128, fkey: 'f_gather2', fname: '中型采集阵' },
  { g: 3, name: '大型阵棋', need: [['ores', 'silver', 10], ['ores', 'gold', 5], ['prey', 'wolf', 10], ['prey', 'tiger', 5]], synth: 256, fkey: 'f_gather3', fname: '大型采集阵' },
];
function sheetFormationTalisman() { // v790 制阵室·画符台：阵法/符箓制作
  const fRecipes = C.FORMATIONS || {}, tRecipes = C.TALISMANS || {};
  const fHtml = Object.keys(fRecipes).filter(k => k !== 'f_gather').map(k => { // v1128 采集阵旧直做配方取消，改阵棋合成（见下方）
    const r = fRecipes[k], need = r.need.map(([st, ik, n]) => { const _nm = st === 'prey' ? PREY[ik].name : st === 'ores' ? ORES[ik].name : st === 'mats' ? ((typeof MATS !== 'undefined' && MATS[ik]||{}).name||ik) : ik; return `${_nm}×${n}`; }).join(' + ');
    return `<div class="row"><div class="lab">🧭 <b class="y">${r.name}</b><small>${r.desc}<br>材料：${need} · 拥有阵法 ${S.formations && S.formations[k] || 0}</small></div><button class="btn gold" onclick="doCraftFormation('${k}')">制作</button></div>`;
  }).join('');
  const zqHtml = `<h3>♟️ 阵棋（合成采集阵）</h3>` + ZQ_DEFS.map(z => { const own = (S.zhenqi && S.zhenqi[z.g]) | 0, fown = (S.formations && S.formations[z.fkey]) | 0; const need = z.need.map(([st, ik, n]) => `${st === 'prey' ? PREY[ik].name : ORES[ik].name}×${n}`).join(' + '); return `<div class="row"><div class="lab">♟️ <b style="color:${C.GRADE_COLORS[z.g - 1]}">${z.name}</b> ×${own}<small>材料：${need}<br>${z.synth} 个合成 1 个${z.fname}（拥有阵 ${fown}）· 阵档决定可收资源等级，阵不收矿石</small></div><button class="btn" onclick="window.craftZhenqi(${z.g})">做阵棋</button><button class="btn gold" onclick="window.synthZhenqi(${z.g})" ${own >= z.synth ? '' : 'disabled'}>合成阵</button></div>`; }).join('');
  const tHtml = Object.keys(tRecipes).map(k => {
    const r = tRecipes[k], need = r.need.map(([st, ik, n]) => { const _nm = st === 'prey' ? PREY[ik].name : st === 'ores' ? ORES[ik].name : st === 'pages' ? PAGES[ik].name : ik; return `${_nm}×${n}`; }).join(' + ');
    return `<div class="row"><div class="lab">📜 <b class="y">${r.name}</b><small>${r.desc}<br>材料：${need} · 拥有符箓 ${S.talismans && S.talismans[k] || 0}</small></div><button class="btn gold" onclick="doCraftTalisman('${k}')">制作</button></div>`;
  }).join('');
  openSheet(`<h2>🧭📜 制阵室·画符台</h2><div class="hint">阵法需「阵法」生活技能，符箓需「制符」生活技能（主宰轮回后参悟）。</div><h3>🧭 阵法台</h3>${fHtml}${zqHtml}<h3>📜 画符台</h3>${tHtml}<div class="row"><button class="btn full" data-a="close">关闭</button></div>`);
}
window.craftZhenqi = function (g) { // v1128 做阵棋：材料直扣（无失败），需阵法生活技能
  try {
    if (lifeLocked('formation')) { log('bad', '需要「阵法」生活技能（轮回后参悟）'); return; }
    const z = ZQ_DEFS.find(v => v.g === g); if (!z) return;
    for (const [st, ik, n] of z.need) if (((S[st] || {})[ik] | 0) < n) { log('bad', `材料不足：${st === 'prey' ? PREY[ik].name : ORES[ik].name} 需 ${n}`); return; }
    for (const [st, ik, n] of z.need) { S[st][ik] -= n; if (S[st][ik] <= 0) delete S[st][ik]; }
    if (!S.zhenqi) S.zhenqi = { 1: 0, 2: 0, 3: 0 };
    S.zhenqi[g] = (S.zhenqi[g] | 0) + 1;
    log('good', `♟️ 制成【${z.name}】×1（现有 ${S.zhenqi[g]}，满 ${z.synth} 可合成${z.fname}）`);
    save(); sheetFormationTalisman();
  } catch (e) { try { log('bad', '制作出错:' + e.message); } catch (_) {} }
};
window.synthZhenqi = function (g) { // v1128 阵棋合成采集阵
  try {
    const z = ZQ_DEFS.find(v => v.g === g); if (!z) return;
    if (!S.zhenqi || (S.zhenqi[g] | 0) < z.synth) { log('bad', `阵棋不足（需 ${z.synth}）`); return; }
    S.zhenqi[g] -= z.synth;
    S.formations = S.formations || {};
    S.formations[z.fkey] = (S.formations[z.fkey] | 0) + 1;
    log('good', `🧭 ${z.synth} 个${z.name}合成【${z.fname}】×1！`);
    save(); sheetFormationTalisman();
  } catch (e) { try { log('bad', '合成出错:' + e.message); } catch (_) {} }
};
window.doCraftFormation = function(key) { // v790 制作阵法；v901 noskill提示
  try {
    const r = C.craft(S, 'formation', key);
    if (!r) { log('bad', '制作失败'); return; }
    if (r.err === 'noskill') { log('bad', '需要「阵法」生活技能（轮回后参悟）'); return; }
    if (r.err) { log('bad', '材料不足或等级不够'); return; }
    log('good', `🧭 制成【${C.FORMATIONS[key].name}】×1！`);
    save(); sheetFormationTalisman();
  } catch(e) { try { log('bad', '制作出错:' + e.message); } catch(_) {} }
};
window.doCraftTalisman = function(key) { // v790 制作符箓；v901 noskill提示
  try {
    const r = C.craft(S, 'talisman', key);
    if (!r) { log('bad', '制作失败'); return; }
    if (r.err === 'noskill') { log('bad', '需要「制符」生活技能（轮回后参悟）'); return; }
    if (r.err) { log('bad', '材料不足或等级不够'); return; }
    log('good', `📜 制成【${C.TALISMANS[key].name}】×1！`);
    save(); sheetFormationTalisman();
  } catch(e) { try { log('bad', '制作出错:' + e.message); } catch(_) {} }
};
function sheetShop(msg) {
  const _dgp = p => S.race === 'traveler' ? Math.ceil(p * 0.95) : p; // v1095 穿越者商会折扣：按钮可用性按折后价算
  const g = S.gold, mRow = k => { const it = MATS[k]; return `<div class="row"><div class="lab">${it.name} <span class="tag">${it.price} 金</span><small>${it.desc || '炼制' + AN[it.basic] + '丹必需'} · 拥有 ${S.mats[k] || 0}</small></div>
      <button class="btn" data-buy="mat" data-k="${k}" data-n="1" ${g >= _dgp(it.price) ? '' : 'disabled'}>买 1</button>
      <button class="btn gold" data-buy="mat" data-k="${k}" data-n="5" ${g >= _dgp(it.price) * 5 ? '' : 'disabled'}>买 5</button></div>`; };
  openSheet(`<h2>🏛️ 商会</h2><div class="hint">当前金元 <b class="y">${g}</b>。冒险与 PK 获胜、出售矿石、猎物与兽蛋可获得金元。${S.race === 'traveler' ? '🌠 穿越者天赋：商会购物 95 折（结算时抵扣）。' : ''}</div>` + (msg ? `<div class="warn">${msg}</div>` : '') +
    `<div class="grid2" style="grid-template-columns:1fr 1fr;gap:8px;margin:8px 0"><button class="btn gold" data-consign style="padding:10px">🏪 寄售行</button><button class="btn gold" data-auction style="padding:10px">🔨 拍卖行</button></div>` +
    `<h3>药草（炼药必需）</h3>` + Object.keys(MATS).filter(k => MATS[k].basic).map(mRow).join('') +
    `<h3>🌱灵植种子</h3>` + Object.keys(MATS).filter(k => MATS[k].seed).map(mRow).join('') +
    `<h3>凝露（炼药增益，中品以上仅可种植获得）</h3>` + Object.keys(MATS).filter(k => !MATS[k].basic && !MATS[k].token && !MATS[k].seed && MATS[k].price).map(mRow).join('') +
    `<h3>🧧 红包（买了去真人世界频道发）</h3>` + rpShopHtml() +
      `<h3>洞府令（开辟洞府）</h3>` + Object.keys(MATS).filter(k => MATS[k].token).map(k => { const it = MATS[k]; const _canB = g >= _dgp(it.price) && (S.realm|0) >= (it.needRealm|0); return `<div class="row"><div class="lab">${it.name} <span class="tag">${it.price} 金</span><small>${it.desc} · 拥有 ${S.mats[k] || 0}</small></div><button class="btn" data-buy="mat" data-k="${k}" data-n="1" ${_canB ? '' : 'disabled'}>买 1</button></div>`; }).join('') +
    `<h3>⛏️ 器具（冒险采集）</h3>` + [['pick', '⛏️'], ['hoe', '🌿']].map(([tk, ic]) => { const t = S.tools && S.tools[tk]; return `<div class="row"><div class="lab">${ic} <b style="color:${C.TOOL_TIER_COLORS[0]}">${C.TOOL_NAMES[tk][0]}</b> <span class="tag">100 金</span><small>${tk === 'pick' ? '挖矿石、采灵脉用（灵脉需镐档不低于灵脉大小）' : '采草药用（需锄档不低于草药等级）'} · ${t ? `已拥有 ${C.TOOL_NAMES[tk][t.tier]}（持久 ${t.dur}/${t.max}）` : '未拥有'}</small></div>${t ? '<button class="btn" disabled>已拥有</button>' : `<button class="btn gold" data-buy="tool" data-k="${tk}" data-n="1" ${g >= _dgp(100) ? '' : 'disabled'}>购买</button>`}</div>`; }).join('') +
    `<div class="row"><div class="lab">🎫 强化符 <span class="tag">200 金</span><small>普通器具持久上限 +100 并回满（背包里使用，升法器后不可再用） · 拥有 ${(S.inv && S.inv.fuq) | 0}</small></div><button class="btn" data-buy="tool" data-k="fuq" data-n="1" ${g >= _dgp(200) ? '' : 'disabled'}>买 1</button><button class="btn gold" data-buy="tool" data-k="fuq" data-n="5" ${g >= _dgp(200) * 5 ? '' : 'disabled'}>买 5</button></div>` +
    `<h3>灵石</h3><div class="row"><div class="lab">🪨 灵气石 <span class="tag">100 金</span><small>服用：经验 +20 · 炼药投入：成功率/上品 +5% · 拥有 ${S.ores.sp1 || 0}</small></div>
      <button class="btn" data-buy="spirit" data-k="sp1" data-n="1" ${g >= _dgp(100) ? '' : 'disabled'}>买 1</button>
      <button class="btn gold" data-buy="spirit" data-k="sp1" data-n="5" ${g >= _dgp(100) * 5 ? '' : 'disabled'}>买 5</button></div>
    <div class="row"><div class="lab">🪨 灵气石回收 <span class="tag">40 金/块</span><small>拥有 ${S.ores.sp1 || 0}</small></div>
      <button class="btn" data-sellspirit="1" ${(S.ores.sp1|0) > 0 ? '' : 'disabled'}>卖 1</button>
      <button class="btn gold" data-sellspirit="all" ${(S.ores.sp1|0) > 0 ? '' : 'disabled'}>全卖 +${(S.ores.sp1|0)*40}</button></div>` +
    Object.keys(GATHER).filter(kind => !GATHER[kind].nosell).map(kind => { const g = GATHER[kind], st = S[g.store], ks = Object.keys(g.items).filter(k => st[k] > 0 && g.items[k].price);
      return `<h3>出售${g.noun}</h3>` + (ks.length ? ks.map(k => `<div class="row"><div class="lab">${rarTxt(kind, k)} ×${st[k]} <span class="tag">${g.items[k].price} 金/${g.unit}</span></div>
      <button class="btn" data-sell="${k}" data-kind="${kind}" data-n="1">卖 1</button>
      <button class="btn gold" data-sell="${k}" data-kind="${kind}" data-n="${st[k]}">全部 +${st[k] * g.items[k].price}</button></div>`).join('') : `<div class="empty">暂无${g.noun}，修炼中${g.name}可得</div>`); }).join('') +
    `<h3>疗伤药</h3>` + Object.keys(C.MEDS).map(k => { const m = C.MEDS[k]; return `<div class="row"><div class="lab">💊 ${m.name} <span class="tag">${m.price} 金</span><small>${m.desc} · 拥有 ${S.meds[k] || 0}${m.cure === 'curse' ? ((S.curseN|0) > 0 ? ` · <span class="r">诅咒×${S.curseN}</span>` : '') : (C.hasSt(S, m.cure) ? ' · <span class="r">你正' + C.STATUS[m.cure].name + '</span>' : '')}</small></div>
      <button class="btn" data-buy="med" data-k="${k}" data-n="1" ${g >= _dgp(m.price) ? '' : 'disabled'}>买 1</button></div>`; }).join('') +
    `<h3>🎒小型储物袋</h3><div class="row"><div class="lab">🎒 小型储物袋 <span class="tag">1000 金</span><small>物品包+100格（当前 ${S.pouch || 0} 只，每号限购1只）</small></div>
      ${(S.pouch || 0) >= 10 || S.ringBought ? '<button class="btn" disabled>已满</button>' : `<button class="btn gold" data-buy="ring" data-k="ring" ${g >= _dgp(1000) ? '' : 'disabled'}>购买</button>`}</div>` +
    `<h3>💍储物戒指（×2）</h3>` + [['sp2','🌒下品灵石'],['sp3','🌗中品灵石'],['sp4','💎上品灵石']].map(([sk, sn]) => `<div class="row"><div class="lab">💍 储物戒指 <span class="tag">${sn}×1</span><small>物品包与装备包上限×2（已拥有 ${S.rings || 0} 枚，每种灵石每号限购1枚）</small></div>${S['ringBought_' + sk] ? '<button class="btn" disabled>已购</button>' : `<button class="btn gold" data-buy="ring_stone" data-k="${sk}" ${(S.ores[sk] || 0) >= 1 ? '' : 'disabled'}>购买</button>`}</div>`).join('') +
    `<h3>📦储物空间</h3><div class="row"><div class="lab">📦 储物空间（小） <span class="tag">💠极品灵石×1</span><small>物品包上限×3（每号限购1个）</small></div>${S.spaceSBought ? '<button class="btn" disabled>已购</button>' : `<button class="btn gold" data-buy="space_s" data-k="space_s" ${(S.ores.sp5 || 0) >= 1 ? '' : 'disabled'}>购买</button>`}</div>` +
    `<div class="row"><div class="lab">📦 储物空间（大） <span class="tag">${MAGATAMA}仙玉×1</span><small>物品包上限×4（每号限购1个）</small></div>${S.spaceLBought ? '<button class="btn" disabled>已购</button>' : `<button class="btn gold" data-buy="space_l" data-k="space_l" ${(S.xianyu || 0) >= 1 ? '' : 'disabled'}>购买</button>`}</div>` +

    `<button class="btn full" data-close>关闭</button>`);
}


/* ---------- 性别/头像选择 v131 ---------- */
function sheetGender() {
  const html = `<h2>🎭 选择性别</h2><div class="hint">初入仙途，先定性别</div>
  <div class="grid2" style="grid-template-columns:1fr 1fr;gap:10px">
    <button class="act" data-gender="m" style="padding:20px"><span class="t" style="font-size:24px">👨‍🦰</span><span class="s">男修</span></button>
    <button class="act" data-gender="f" style="padding:20px"><span class="t" style="font-size:24px">👩‍🦰</span><span class="s">女修</span></button>
  </div>`;
  openSheet(html);
}
let _raceMode = null; // v1088 种族面板模式：onboard 建号 / old 老号补选 / reinc 轮回重选
function sheetRace(mode) { // v1088 九族选择
  _raceMode = mode || 'onboard';
  const cur = S.race;
  const rows = Object.keys(RACES).map(k => { const r = RACES[k]; return `<div class="row"><div class="lab">${r.icon} ${r.name} · <b>${r.talent}</b><small>${r.desc}</small></div><button class="btn ${cur === k ? 'gold' : ''}" data-race="${k}">${cur === k ? '已选' : '选择'}</button></div>`; }).join('');
  const keepBtn = (mode === 'reinc' && cur) ? `<div class="row"><button class="btn full" data-racekeep>保持原种族（${RACES[cur].name}）</button></div>` : '';
  openSheet(`<h2>🧬 选择种族</h2><div class="hint">种族天赋为被动加成，选定后锁定，轮回时可重选${mode === 'reinc' ? '；也可保持原种族' : ''}</div>${rows}${keepBtn}`);
  if (mode !== 'reinc') $('mask').dataset.lock = '1';
}
function chainNext() { // v1088 建号/轮回链条：性别→头像→名字→种族→生活技能
  if (!S._onboarded) { // 建号：四步强制，缺一步都进不去
    if (!S.gender) { sheetGender(); $('mask').dataset.lock = '1'; return; }
    if (!S._avatarPicked) { sheetAvatar(S.gender); $('mask').dataset.lock = '1'; return; }
    if (!S.name) { sheetNameInput(); $('mask').dataset.lock = '1'; return; }
    if (!S.race) { sheetRace('onboard'); return; }
    S._onboarded = true; save(); delete $('mask').dataset.lock; sheetLifeChoice(true); return;
  }
  if (S._reincChain) { // 轮回：四步皆可重选（可关掉，不强制）
    const step = S._reincStep || 'gender';
    if (step === 'gender') { sheetGender(); return; }
    if (step === 'avatar') { sheetAvatar(S.gender); return; }
    if (step === 'name') { sheetNameInput(); return; }
    if (step === 'race') { sheetRace('reinc'); return; }
    S._reincChain = false; S._reincStep = null; save(); sheetLifeChoice(true); return;
  }
  sheetLifeChoice(true);
}
const AVATAR_CATS = {
  m: {'动漫': [3, 5, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305], '游戏': [106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205], '修仙': [0, 1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140, 1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, 1200, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1298, 1299, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339]},
  f: {'动漫': [2, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299], '游戏': [3, 4, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205], '修仙': [0, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140, 1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, 1200, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1298, 1299, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360, 1361, 1362, 1363, 1364, 1365]}
};
/* ---------- 头像出处系列 v169：与 AVATARS 下标一一对应 ---------- */
const AVATAR_SERIES = {
  m: ["人族", "人族", "魔族", "人族", "人族", "穿越者", "人族", "人族", "人族", "人族", "魔族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "魔族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "魔族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "魔族", "魔族", "魔族", "魔族", "魔族", "人族", "魔族", "人族", "人族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "人族", "人族", "人族", "人族", "人族", "灵族", "人族", "人族", "人族", "人族", "人族", "人族", "穿越者", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "魔族", "人族", "异族", "人族", "人族", "异族", "人族", "人族", "人族", "人族", "人族", "穿越者", "穿越者", "异族", "神族", "异族", "异族", "人族", "人族", "异族", "灵族", "人族", "人族", "人族", "灵族", "人族", "机械", "人族", "人族", "人族", "妖族", "人族", "人族", "妖族", "人族", "人族", "人族", "人族", "机械", "妖族", "冥族", "人族", "魔族", "人族", "冥族", "人族", "异族", "穿越者", "灵族", "妖族", "穿越者", "魔族", "人族", "魔族", "人族", "妖族", "人族", "魔族", "灵族", "人族", "人族", "异族", "人族", "人族", "魔族", "人族", "异族", "人族", "人族", "人族", "冥族", "穿越者", "灵族", "人族", "异族", "人族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "灵族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "魔族", "穿越者", "穿越者", "穿越者", "穿越者", "妖族", "穿越者", "穿越者", "灵族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "妖族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "神族", "穿越者", "穿越者", "穿越者", "魔族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "魔族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械"],
  f: ["人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "妖族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "妖族", "人族", "妖族", "人族", "妖族", "人族", "人族", "人族", "人族", "人族", "人族", "魔族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "灵族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "灵族", "人族", "人族", "人族", "人族", "人族", "人族", "灵族", "人族", "人族", "异族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "灵族", "异族", "人族", "人族", "人族", "魔族", "人族", "人族", "人族", "冥族", "穿越者", "妖族", "人族", "妖族", "人族", "人族", "人族", "人族", "人族", "穿越者", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "穿越者", "妖族", "人族", "人族", "人族", "人族", "人族", "穿越者", "冥族", "穿越者", "神族", "异族", "神族", "人族", "穿越者", "机械", "人族", "神族", "冥族", "人族", "灵族", "人族", "人族", "人族", "人族", "人族", "人族", "人族", "魔族", "神族", "人族", "异族", "人族", "人族", "人族", "异族", "人族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "妖族", "穿越者", "穿越者", "穿越者", "妖族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "灵族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "灵族", "穿越者", "穿越者", "妖族", "穿越者", "穿越者", "穿越者", "妖族", "魔族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "神族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "妖族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "妖族", "穿越者", "穿越者", "穿越者", "穿越者", "妖族", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械"]
};
/* ---------- v1092 动漫套：系列（种族）与名字，与 AVATAR_SETS.a 下标一一对应 ---------- */
const AVATAR_SERIES_ANIME = {
  m: ["魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者"],
  f: ["魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "魔族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "妖族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "灵族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "异族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "神族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "冥族", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "机械", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者", "穿越者"]
};
const AVATAR_NAMES_ANIME = {
  m: ["煞君者", "魔主", "魔修灵", "熔岩客", "魅君", "煞君灵", "魔者", "魔君", "魔公", "魔修者", "煞君者", "魔将", "煞君客", "魔主灵", "血魔君", "魔君客", "魔主客", "魔君灵", "魔君灵", "熔岩客", "暗影灵", "魔君", "熔岩者", "熔岩灵", "魔君客", "魔君者", "暗影", "血魔灵", "魔君", "熔岩", "魔将灵", "血魔客", "魔君", "魔修君", "血魔客", "魅魔客", "熔岩者", "魔君灵", "魔修", "魅魔君", "熔岩者", "熔岩", "熔岩者", "魔修", "魅魔灵", "煞君灵", "暗影客", "魔将者", "暗影君", "魔君", "狼妖者", "蛇君客", "九尾者", "鹤君者", "鹿灵客", "兔灵者", "狸奴", "狼妖君", "鹤君", "猫妖灵", "狼妖者", "鹿灵", "狐仙灵", "蝶妖者", "九尾灵", "鹤主", "鹿灵", "狐仙者", "蛇主客", "猫妖者", "蝶妖客", "鹤君灵", "狸奴客", "蛇君", "蝶妖灵", "狼妖灵", "狼妖灵", "鹤主灵", "猫妖君", "鹿灵客", "狸奴客", "狐仙灵", "狸奴客", "鹿灵", "鹿灵", "鹤君客", "狐仙者", "狸奴者", "狼妖者", "蛇君", "兔灵", "蝶妖君", "蛇君灵", "鹤者灵", "九尾客", "猫妖君", "猫妖灵", "蛇者客", "狸奴客", "蝶妖", "银叶者", "月精", "泉灵", "林心客", "花灵", "暗夜者", "林心", "暗夜", "银叶君", "碧叶君", "林心君", "暗夜客", "星叶灵", "暗夜", "星叶君", "林心灵", "星叶灵", "泉灵者", "林心君", "林心客", "碧叶", "花灵", "森语灵", "碧叶君", "暗夜者", "暗夜", "暗夜灵", "月精者", "银叶", "银叶君", "月精者", "花灵君", "花灵君", "星叶客", "暗夜客", "泉灵", "林心灵", "花灵", "林心灵", "泉灵", "花灵", "暗夜灵", "星叶", "碧叶", "泉灵", "暗夜", "森语者", "碧叶君", "花灵君", "月精客", "巨力者", "半身者", "荒原", "半身", "巨力", "巨力灵", "牛头君", "半身君", "巧匠灵", "巨力客", "绿皮客", "绿皮客", "石拳", "巨力", "铁须灵", "石拳灵", "铜锤者", "巨力客", "绿皮君", "炉火君", "铁须者", "炉火灵", "荒原", "巨力者", "牛头客", "铜锤", "铜锤", "石拳君", "绿皮客", "炉火君", "铜锤者", "绿皮客", "半身", "石拳", "牛头君", "铁须者", "牛头君", "牛头", "巨力", "荒原", "石拳客", "铜锤君", "铜锤君", "铜锤者", "绿皮君", "铁须客", "炉火", "巧匠君", "炉火君", "铜锤", "圣骑士灵", "神谕者", "晨星", "天环君", "羽翼灵", "圣君客", "神谕客", "白翼客", "圣君客", "神谕者", "神谕灵", "白翼", "圣君者", "圣光", "圣骑士者", "白翼君", "圣骑士灵", "圣君灵", "羽翼君", "神将者", "白翼灵", "神将者", "羽翼者", "晨星者", "圣君", "神谕", "白翼灵", "羽翼客", "神谕君", "圣君", "金辉君", "圣光灵", "羽翼君", "圣光君", "圣骑士", "圣光灵", "晨星灵", "晨星", "圣光者", "神将客", "神谕灵", "圣君灵", "圣骑士灵", "神谕君", "圣光客", "天环者", "神谕者", "天环君", "天环灵", "圣光君", "白骨客", "骸将君", "白骨灵", "幽影客", "冥君", "冥君客", "冥君灵", "冥主客", "幽影灵", "绷带君", "幽影", "幽冥客", "骸将君", "白骨", "幽冥客", "冥修", "幽冥者", "幽影客", "白骨客", "冥君客", "冥者客", "鬼君灵", "骨王客", "幽冥君", "幽影者", "骨王客", "幽影者", "幽影君", "白骨客", "骸将灵", "幽冥客", "冥君", "鬼君灵", "冥公客", "冥君灵", "幽影灵", "骸将者", "绷带客", "鬼君客", "冥君", "骨王客", "绷带", "幽冥", "幽冥灵", "骸将客", "冥君灵", "绷带者", "鬼君", "冥修灵", "骸将客", "铁匠机者", "义体者", "巡电机灵", "机芯者", "义体客", "义体灵", "巡电机客", "巡电机灵", "铁匠机客", "钢魂者", "机芯君", "齿轮", "铁卫", "义体客", "钢魂者", "铁卫灵", "铁卫客", "钢魂灵", "铜机灵", "齿轮灵", "铜机", "银机灵", "铁匠机客", "铁匠机君", "齿轮君", "义体客", "机巧客", "巡电机客", "铁匠机者", "机芯", "铁匠机", "钢魂", "机芯者", "机芯客", "义体客", "银机君", "铁卫君", "巡电机灵", "钢魂灵", "银机客", "铁卫灵", "钢魂君", "钢魂君", "银机者", "铜机君", "铁卫客", "铁卫客", "钢魂灵", "义体", "机芯客", "来客", "护士客", "问天者", "护士者", "行者君", "球手", "学生灵", "球手", "乐手", "乐手者", "行者客", "护士者", "白领君", "乐手君", "乐手君", "白领", "厨师", "医者", "问天", "护士客", "乐手客", "厨师者", "来客", "问天者", "乐手君", "乐手", "白领客", "行者", "行者君", "行者", "护士客", "乐手客", "厨师", "厨师", "厨师灵", "乐手", "行者灵", "问天客", "来客君", "医者", "问天君", "医者", "护士客", "医者客", "球手客", "乐手", "乐手", "学生", "医者灵", "学生者"],
  f: ["魔姬", "魔女", "煞君姬", "血魔灵", "血魔", "魔君姬", "魅魔灵", "魔姬灵", "血魔姬", "熔岩", "暗影子", "魔修", "魅魔子", "魔姬", "血魔姬", "魔女灵", "煞君", "魔将灵", "煞君姬", "魔姬灵", "魔女姬", "魔君姬", "魔修灵", "魔修", "魔君姬", "魔将灵", "魔将子", "魔将灵", "魔君姬", "魔修灵", "熔岩姬", "魔修灵", "魔女", "魔修灵", "魔修灵", "魔君", "暗影姬", "魔修子", "魔姬", "魔女灵", "魔君姬", "熔岩", "魔女姬", "血魔", "魔女子", "煞君姬", "煞君灵", "熔岩子", "魔君姬", "魔姬", "狼妖", "狸奴姬", "猫妖灵", "狼妖", "狐仙灵", "鹤姬", "鹿灵", "蛇姬子", "狸奴", "鹤姬灵", "蝶妖子", "狐仙姬", "兔灵子", "狸奴", "鹤姬", "兔灵", "狼妖", "狸奴姬", "狸奴", "狐仙姬", "蝶妖子", "狼妖子", "鹿灵子", "鹤姬", "猫妖", "猫妖子", "九尾子", "九尾子", "蝶妖", "狐仙姬", "鹿灵子", "猫妖子", "兔灵", "蝶妖子", "狼妖", "蛇姬", "蛇姬", "狸奴姬", "兔灵", "九尾", "狸奴", "狼妖姬", "狼妖姬", "鹤姬", "兔灵子", "兔灵姬", "狐仙姬", "九尾姬", "狐仙姬", "兔灵", "森语子", "碧叶子", "碧叶姬", "泉灵", "月精", "月精姬", "林心子", "暗夜", "银叶子", "森语灵", "林心子", "森语灵", "月精", "银叶", "暗夜姬", "星叶", "月精灵", "森语姬", "银叶灵", "月精姬", "碧叶", "暗夜姬", "月精子", "月精灵", "银叶子", "花灵", "泉灵姬", "银叶子", "碧叶灵", "林心灵", "花灵", "花灵", "暗夜子", "泉灵", "银叶", "泉灵姬", "星叶子", "暗夜", "花灵", "林心灵", "林心子", "林心子", "月精姬", "暗夜姬", "月精灵", "林心子", "花灵", "泉灵姬", "星叶灵", "泉灵姬", "牛头", "巧匠姬", "炉火", "铁须子", "石拳", "铜锤灵", "巨力灵", "半身灵", "巧匠姬", "铜锤灵", "铜锤", "铁须", "牛头姬", "石拳姬", "荒原姬", "半身灵", "铜锤子", "铁须", "半身姬", "巨力子", "巧匠姬", "半身姬", "巨力子", "荒原子", "半身子", "铁须姬", "半身灵", "牛头子", "巨力", "石拳姬", "巨力灵", "铜锤子", "铜锤", "石拳姬", "半身灵", "炉火子", "半身", "巧匠姬", "巨力子", "牛头灵", "半身姬", "半身子", "炉火子", "炉火", "荒原灵", "半身", "铁须子", "铜锤灵", "铜锤灵", "荒原姬", "神谕子", "圣女姬", "白翼灵", "晨星灵", "金辉姬", "天环姬", "金辉灵", "天环", "圣女", "圣骑士子", "羽翼姬", "羽翼", "天环", "圣光子", "神谕姬", "晨星姬", "圣女子", "圣光灵", "白翼子", "金辉灵", "白翼灵", "羽翼子", "圣光子", "圣光", "羽翼", "晨星子", "羽翼灵", "圣光灵", "圣女", "金辉姬", "晨星", "圣骑士子", "金辉灵", "圣女", "圣骑士", "圣光灵", "圣光子", "晨星灵", "天环", "圣光灵", "圣光姬", "白翼姬", "圣骑士", "神将子", "白翼", "羽翼灵", "圣光灵", "金辉姬", "神将姬", "圣光灵", "幽影子", "白骨子", "骸将", "冥姬子", "白骨姬", "幽影姬", "冥后", "绷带子", "冥后子", "幽影", "幽冥姬", "冥姬", "幽冥姬", "骸将子", "绷带", "幽影", "幽冥灵", "冥修姬", "冥姬子", "冥后灵", "幽影子", "幽冥姬", "冥姬灵", "冥姬子", "冥修姬", "鬼姬灵", "冥修灵", "绷带灵", "冥姬", "骨王灵", "骸将子", "鬼姬子", "幽影姬", "冥姬", "鬼姬灵", "冥后", "骨王灵", "白骨姬", "骨王灵", "骸将灵", "鬼姬灵", "绷带姬", "骸将", "白骨子", "幽影姬", "绷带", "骨王", "骨王姬", "冥后灵", "骨王姬", "铜机灵", "义体姬", "机芯子", "铁匠机子", "齿轮", "机芯姬", "铁匠机", "银机灵", "银机子", "机芯姬", "银机", "铜机姬", "铁卫", "铁卫", "铁卫灵", "义体子", "铜机", "机巧", "义体灵", "铜机灵", "机芯灵", "铁卫灵", "机芯姬", "巡电机", "义体姬", "铁卫子", "机巧", "钢魂灵", "义体灵", "铁卫姬", "银机姬", "铁卫灵", "铁匠机子", "铁卫", "巡电机灵", "铜机灵", "银机子", "义体灵", "钢魂", "机巧", "机巧姬", "机巧子", "机巧子", "齿轮姬", "机芯姬", "钢魂姬", "铁匠机姬", "钢魂子", "铁匠机灵", "钢魂灵", "球手子", "球手灵", "球手子", "问天灵", "学生姬", "问天姬", "白领子", "白领", "来客姬", "来客姬", "行者灵", "白领", "乐手灵", "乐手", "学生姬", "来客姬", "厨师姬", "行者灵", "问天灵", "医者", "问天姬", "厨师", "问天", "护士", "厨师", "学生灵", "问天", "行者", "护士", "厨师灵", "医者子", "医者子", "来客姬", "乐手姬", "学生", "学生子", "医者子", "学生子", "学生", "行者灵", "球手", "乐手灵", "来客子", "乐手姬", "医者", "学生子", "来客子", "球手", "厨师", "医者姬"]
};
function sheetNameInput() {
  const cur = S.name || '';
  openSheet(`<h2>📝 取个道号</h2><div class="hint">为你的新一世取个名字吧</div>
    <div class="row"><input id="nameInput" maxlength="12" placeholder="输入名字…" value="${esc(cur)}" style="width:100%;padding:10px;border-radius:8px;border:1px solid #555;background:#222;color:#fff;font-size:16px"></div>
    <div class="row"><button class="btn gold full" data-savename>确定</button></div>`);
  const inp = $('nameInput'); if (inp) { inp.focus(); inp.select(); }
}
function avatarChangeCost() { // v1171 设置里换头像：扣 1 颗极品灵石（ores.sp5），不足返回 false 并提示（Ye 定）
  const have = (S.ores && S.ores.sp5) | 0;
  if (have < 1) { log('bad', '💠 换头像需要 1 颗极品灵石，你没有'); return false; } // 用 log 落日记（toastLog 只闪现不保存）
  S.ores.sp5 = have - 1; return true;
}
function sheetAvatar(gender, cat) {
  cat = cat || '动漫';
  let setKey = S._pickSet || S.avatarSet || 'r'; if (typeof AVATAR_SETS === 'undefined' || !AVATAR_SETS[setKey]) setKey = 'r'; // v1090 第叁套下线后旧存档兜底
  const set = (typeof AVATAR_SETS !== 'undefined' && AVATAR_SETS[setKey]) || AVATARS;
  const list = set[gender] || set.m || [];
  const isR = setKey === 'r';
  const names = gender === 'f' ? ["冷艳剑修", "温柔丹修", "灵动少女", "红甲女将", "红发女战士", "白衣巫女", "青衣仙子", "青衣剑修", "青衣丹修", "青衣琴修", "青衣圣女", "青衣魔女", "青衣灵女", "青衣药女", "青衣散修", "青衣仙姑", "白衣仙子", "白衣剑修", "白衣丹修", "白衣琴修", "白衣圣女", "白衣魔女", "白衣灵女", "白衣药女", "白衣散修", "白衣仙姑", "红衣仙子", "红衣剑修", "红衣丹修", "红衣琴修", "红衣圣女", "红衣魔女", "红衣灵女", "红衣药女", "红衣散修", "红衣仙姑", "紫衣仙子", "紫衣剑修", "紫衣丹修", "紫衣琴修", "紫衣圣女", "紫衣魔女", "紫衣灵女", "紫衣药女", "紫衣散修", "紫衣仙姑", "素衣仙子", "素衣剑修", "素衣丹修", "素衣琴修", "素衣圣女", "素衣魔女", "素衣灵女", "素衣药女", "素衣散修", "素衣仙姑", "碧衣仙子", "碧衣剑修", "碧衣丹修", "碧衣琴修", "碧衣圣女", "碧衣魔女", "碧衣灵女", "碧衣药女", "碧衣散修", "碧衣仙姑", "月白仙子", "月白剑修", "月白丹修", "月白琴修", "月白圣女", "月白魔女", "月白灵女", "月白药女", "月白散修", "月白仙姑", "霜华仙子", "霜华剑修", "霜华丹修", "霜华琴修", "霜华圣女", "霜华魔女", "霜华灵女", "霜华药女", "霜华散修", "霜华仙姑", "流云仙子", "流云剑修", "流云丹修", "流云琴修", "流云圣女", "流云魔女", "流云灵女", "流云药女", "流云散修", "流云仙姑", "烟岚仙子", "烟岚剑修", "烟岚丹修", "烟岚琴修", "烟岚圣女", "烟岚魔女", "烟岚灵女", "烟岚药女", "烟岚散修", "烟岚仙姑", "星辉女神", "星辉射手", "星辉法师", "星辉骑士", "星辉刺客", "星辉牧师", "星辉舞者", "星辉女王", "星辉猎手", "星辉歌姬", "月光女神", "月光射手", "月光法师", "月光骑士", "月光刺客", "月光牧师", "月光舞者", "月光女王", "月光猎手", "月光歌姬", "烈焰女神", "烈焰射手", "烈焰法师", "烈焰骑士", "烈焰刺客", "烈焰牧师", "烈焰舞者", "烈焰女王", "烈焰猎手", "烈焰歌姬", "寒冰女神", "寒冰射手", "寒冰法师", "寒冰骑士", "寒冰刺客", "寒冰牧师", "寒冰舞者", "寒冰女王", "寒冰猎手", "寒冰歌姬", "雷霆女神", "雷霆射手", "雷霆法师", "雷霆骑士", "雷霆刺客", "雷霆牧师", "雷霆舞者", "雷霆女王", "雷霆猎手", "雷霆歌姬", "疾风女神", "疾风射手", "疾风法师", "疾风骑士", "疾风刺客", "疾风牧师", "疾风舞者", "疾风女王", "疾风猎手", "疾风歌姬", "暗影女神", "暗影射手", "暗影法师", "暗影骑士", "暗影刺客", "暗影牧师", "暗影舞者", "暗影女王", "暗影猎手", "暗影歌姬", "圣光女神", "圣光射手", "圣光法师", "圣光骑士", "圣光刺客", "圣光牧师", "圣光舞者", "圣光女王", "圣光猎手", "圣光歌姬", "蔷薇女神", "蔷薇射手", "蔷薇法师", "蔷薇骑士", "蔷薇刺客", "蔷薇牧师", "蔷薇舞者", "蔷薇女王", "蔷薇猎手", "蔷薇歌姬", "琉璃女神", "琉璃射手", "琉璃法师", "琉璃骑士", "琉璃刺客", "琉璃牧师", "琉璃舞者", "琉璃女王", "琉璃猎手", "琉璃歌姬", "樱色少女", "樱色学姐", "樱色学妹", "樱色巫女", "樱色偶像", "樱色大小姐", "樱色同桌", "樱色前辈", "樱色班长", "月夜少女", "月夜学姐", "月夜学妹", "月夜巫女", "月夜偶像", "月夜女仆", "月夜同桌", "月夜前辈", "月夜班长", "星野少女", "星野学姐", "星野学妹", "星野巫女", "星野偶像", "星野女仆", "星野大小姐", "星野同桌", "星野班长", "雪乃少女", "雪乃学姐", "雪乃学妹", "雪乃巫女", "雪乃偶像", "雪乃女仆", "雪乃大小姐", "雪乃同桌", "雪乃前辈", "雪乃班长", "风见少女", "风见学姐", "风见学妹", "风见巫女", "风见偶像", "风见女仆", "风见大小姐", "风见同桌", "风见前辈", "风见班长", "水无少女", "水无学姐", "水无学妹", "水无巫女", "水无偶像", "水无大小姐", "水无同桌", "水无前辈", "水无班长", "苍蓝少女", "苍蓝学妹", "苍蓝巫女", "苍蓝偶像", "苍蓝女仆", "苍蓝大小姐", "苍蓝同桌", "苍蓝前辈", "苍蓝班长", "绯红少女", "绯红学姐", "绯红学妹", "绯红巫女", "绯红偶像", "绯红女仆", "绯红大小姐", "绯红前辈", "绯红班长", "白鸟少女", "白鸟学姐", "白鸟学妹", "白鸟巫女", "白鸟偶像", "白鸟女仆", "白鸟大小姐", "白鸟同桌", "白鸟前辈", "白鸟班长", "千鹤少女", "千鹤学姐", "千鹤学妹", "千鹤巫女", "千鹤偶像", "千鹤女仆", "千鹤大小姐", "千鹤同桌", "千鹤前辈", "千鹤班长", "蓝发少女", "粉发护士", "黑发女仆", "学生老师", "学生客", "学生队长", "来客医生", "医者", "行者队长", "乐手同学", "乐手客", "医者客", "乐手老师", "球手", "乐手医生", "白领客", "行者队长", "护士同学", "医者客", "学生", "护士", "行者医生", "白领队长", "厨师老师", "医者同学", "医者队长", "乐手老师", "学生老师", "问天老师", "来客同学", "白领医生", "白领客", "乐手", "医者老师", "球手老师", "行者同学", "白领老师", "医者队长", "白领老师", "护士同学", "来客同学", "白领老师", "医者老师", "学生同学", "乐手队长", "问天同学", "学生客", "白领同学", "医者", "问天客", "行者队长", "学生客", "问天队长", "问天", "白领", "红发魅魔", "熔岩魔女", "紫发魔姬", "魅魔姬", "魅魔姬", "暗影者", "魔将", "煞君姬", "魔姬君", "暗影客", "魔将君", "熔岩", "煞君者", "魔女子", "血魔客", "魔姬客", "熔岩姬", "魔修君", "魔君姬", "魔姬", "煞君灵", "熔岩者", "魅魔", "魔姬", "魔女", "熔岩灵", "煞君", "暗影", "煞君客", "魔女君", "血魔子", "魅魔姬", "血魔者", "暗影者", "魔女客", "魅魔子", "魔将子", "熔岩姬", "魔修君", "魔姬", "魅魔君", "血魔", "魔姬者", "血魔姬", "暗影者", "熔岩灵", "魔修子", "魔将君", "魔君客", "魔修君", "魔女", "血魔客", "魔姬灵", "煞君客", "熔岩子", "魔女客", "魔女者", "魔姬灵", "魔将君", "煞君", "血魔姬", "煞君者", "魔女", "暗影客", "魔君", "魔将灵", "魔将子", "血魔君", "煞君姬", "暗影", "魅魔客", "熔岩灵", "煞君者", "魔君客", "煞君灵", "魔修姬", "魔姬子", "魔将姬", "血魔者", "魔君姬", "魔女姬", "魔女子", "熔岩者", "魔女姬", "魔修君", "血魔姬", "魔女灵", "熔岩", "熔岩者", "魔女子", "魔女君", "魔女姬", "熔岩姬", "魔君", "魔女灵", "魔君", "魔君姬", "熔岩", "魔将子", "血魔君", "血魔子", "煞君", "暗影君", "煞君客", "魔姬君", "血魔", "魔修", "魅魔", "熔岩", "煞君", "魔姬子", "暗影君", "血魔君", "血魔子", "魔姬灵", "魔修者", "煞君者", "熔岩灵", "魔修者", "魔姬", "魔姬", "魔将灵", "魅魔灵", "魅魔客", "魔君者", "魔修客", "魔将客", "魔修客", "魅魔姬", "魅魔客", "魔修姬", "魔女灵", "煞君灵", "魔修客", "魔女姬", "魔君客", "血魔客", "魔修客", "魔女君", "魅魔客", "魔姬子", "魔女客", "暗影者", "血魔姬", "魅魔君", "魔修者", "九尾狐女", "兔耳少女", "猫耳巫女", "狸奴君", "兔灵", "狼妖客", "蛇姬君", "猫妖", "蝶妖", "兔灵子", "狐仙子", "狸奴者", "蝶妖", "猫妖姬", "鹿灵客", "九尾君", "鹿灵者", "鹿灵姬", "蝶妖君", "九尾者", "蛇姬客", "兔灵子", "九尾", "鹤姬者", "狼妖君", "狐仙子", "九尾姬", "九尾客", "狐仙灵", "狸奴者", "狸奴客", "猫妖者", "狐仙君", "九尾客", "狸奴君", "狼妖", "鹤姬者", "狸奴君", "狸奴子", "蝶妖灵", "鹤姬", "九尾者", "猫妖灵", "鹤姬", "狼妖子", "蝶妖者", "狐仙", "鹤姬灵", "狐仙子", "狸奴客", "狸奴客", "兔灵", "狼妖姬", "九尾姬", "狸奴灵", "蝶妖客", "狐仙", "兔灵", "兔灵", "兔灵子", "鹤姬", "猫妖姬", "蛇姬子", "猫妖", "蛇姬", "兔灵客", "九尾者", "狼妖姬", "狼妖子", "狐仙灵", "狼妖客", "蝶妖姬", "狸奴姬", "九尾者", "蝶妖子", "鹤姬子", "兔灵客", "狼妖灵", "鹿灵子", "猫妖", "狸奴灵", "兔灵客", "鹤姬", "鹿灵客", "蛇姬者", "蝶妖姬", "九尾", "九尾者", "兔灵姬", "兔灵", "兔灵者", "鹤姬客", "蝶妖姬", "猫妖姬", "鹤姬客", "鹿灵", "兔灵者", "九尾客", "猫妖姬", "蛇姬灵", "猫妖姬", "九尾客", "狸奴灵", "九尾者", "蝶妖君", "鹤姬", "鹿灵", "鹤姬", "猫妖客", "狼妖客", "九尾者", "狼妖子", "鹿灵客", "狼妖", "鹿灵者", "蛇姬灵", "九尾子", "蛇姬君", "兔灵者", "狼妖君", "鹿灵", "蛇姬", "鹤姬", "九尾客", "鹤姬者", "鹿灵子", "蝶妖子", "兔灵子", "蝶妖子", "蛇姬", "蝶妖灵", "兔灵客", "狐仙子", "鹤姬者", "鹤姬者", "鹤姬君", "金冠公主", "花叶精灵", "藤蔓婆婆", "森语者", "泉灵姬", "藤婆", "星叶", "森语姬", "月精", "泉灵者", "银叶灵", "月精子", "森语灵", "银叶灵", "森语者", "碧叶", "碧叶灵", "泉灵者", "藤婆者", "泉灵者", "林心客", "森语者", "花灵", "花灵", "森语", "森语子", "森语子", "花灵子", "星叶客", "月精客", "星叶君", "暗夜姬", "碧叶者", "银叶灵", "森语姬", "暗夜姬", "森语姬", "林心灵", "泉灵", "月精灵", "林心灵", "月精君", "星叶灵", "月精客", "星叶者", "月精客", "碧叶者", "林心灵", "星叶子", "暗夜客", "花灵客", "森语君", "林心君", "森语灵", "碧叶子", "花灵", "花灵者", "森语", "林心姬", "藤婆者", "碧叶君", "藤婆子", "碧叶子", "碧叶子", "森语子", "月精子", "林心", "森语子", "花灵子", "银叶君", "林心", "碧叶灵", "月精君", "藤婆", "暗夜客", "藤婆君", "月精灵", "银叶子", "藤婆子", "银叶灵", "银叶姬", "月精子", "星叶姬", "暗夜灵", "森语姬", "月精灵", "碧叶姬", "藤婆客", "花灵子", "银叶灵", "碧叶子", "月精", "月精", "泉灵", "暗夜君", "藤婆灵", "林心者", "暗夜者", "银叶客", "月精子", "月精君", "暗夜", "泉灵客", "花灵", "银叶姬", "银叶客", "碧叶灵", "森语客", "银叶客", "藤婆者", "林心客", "月精姬", "森语君", "暗夜君", "泉灵者", "花灵君", "林心姬", "森语客", "月精者", "泉灵姬", "星叶君", "藤婆", "月精者", "林心客", "星叶姬", "林心子", "林心君", "森语君", "月精", "暗夜者", "星叶者", "月精子", "藤婆客", "花灵君", "暗夜客", "森语子", "森语君", "碧叶姬", "银叶子", "森语姬", "森语者", "泉灵君", "花灵君", "红辫铁匠", "绿皮女将", "地精巧匠", "半身", "巨力姬", "半身君", "牛头者", "巧匠子", "半身姬", "石拳灵", "牛头", "牛头者", "荒原君", "荒原", "巧匠君", "巧匠子", "石拳者", "铜锤君", "巨力者", "铁须客", "炉火灵", "绿皮者", "石拳子", "铁须者", "巧匠者", "炉火君", "石拳客", "铁须", "荒原灵", "牛头灵", "铁须子", "牛头灵", "巨力者", "荒原君", "绿皮君", "绿皮子", "巨力君", "半身客", "炉火者", "荒原", "铜锤灵", "铜锤子", "半身灵", "铜锤姬", "绿皮客", "铜锤", "巧匠君", "巧匠子", "荒原姬", "牛头者", "牛头者", "铜锤灵", "绿皮者", "铜锤客", "石拳姬", "铜锤", "铜锤姬", "巧匠子", "铜锤客", "荒原者", "巨力子", "绿皮客", "铜锤姬", "绿皮者", "炉火子", "荒原客", "牛头", "铜锤姬", "绿皮", "石拳", "铁须姬", "石拳者", "牛头", "巧匠", "荒原", "炉火灵", "牛头君", "炉火者", "绿皮君", "绿皮者", "半身姬", "牛头君", "铜锤子", "绿皮君", "炉火君", "石拳灵", "绿皮", "铁须者", "炉火子", "铜锤", "铁须灵", "牛头子", "绿皮子", "铜锤子", "石拳灵", "炉火姬", "巧匠", "炉火者", "巧匠姬", "铁须", "绿皮子", "铁须姬", "石拳子", "铜锤姬", "铜锤姬", "铜锤君", "绿皮客", "牛头子", "半身者", "荒原君", "铁须者", "铜锤", "半身子", "巧匠君", "荒原", "巧匠姬", "铜锤客", "铜锤客", "炉火灵", "荒原客", "炉火", "荒原姬", "绿皮者", "绿皮子", "石拳子", "巧匠者", "铁须者", "巨力姬", "半身者", "石拳客", "半身灵", "牛头客", "铜锤灵", "巧匠君", "牛头灵", "铜锤君", "铁须灵", "石拳灵", "牛头子", "荒原姬", "半身", "巧匠子", "石拳姬", "荒原", "半身者", "女武神", "竖琴圣女", "羽翼骑士", "羽翼", "圣骑士客", "神谕子", "天环客", "神谕子", "天环子", "白翼姬", "圣骑士", "神将者", "圣女灵", "金辉客", "圣骑士", "圣骑士", "天环客", "金辉者", "圣女", "晨星君", "神将君", "圣女者", "圣光姬", "圣骑士君", "神谕子", "天环", "白翼君", "羽翼", "神将者", "金辉", "圣骑士灵", "晨星姬", "圣光", "圣女", "白翼姬", "圣骑士灵", "白翼客", "神谕客", "金辉灵", "神将姬", "晨星客", "天环灵", "圣女灵", "白翼子", "圣光子", "羽翼灵", "晨星灵", "神谕", "圣骑士客", "圣女者", "金辉子", "圣光姬", "羽翼", "神将客", "羽翼灵", "神将君", "圣女", "金辉子", "圣光灵", "神将客", "圣骑士君", "晨星君", "天环", "圣光姬", "白翼者", "神将", "圣骑士子", "圣光灵", "白翼客", "羽翼君", "圣光", "神将子", "天环子", "晨星子", "天环者", "羽翼灵", "神将灵", "金辉", "晨星客", "圣骑士", "天环客", "羽翼者", "白翼客", "圣光君", "圣女子", "羽翼客", "神将姬", "羽翼君", "神将子", "圣骑士灵", "圣骑士君", "金辉姬", "金辉姬", "圣女者", "羽翼姬", "金辉君", "羽翼客", "圣女客", "金辉子", "金辉客", "羽翼姬", "金辉子", "神将君", "晨星姬", "神谕子", "羽翼客", "神将者", "金辉子", "圣光客", "羽翼姬", "圣骑士姬", "圣光姬", "圣骑士姬", "羽翼子", "神谕子", "神将君", "晨星姬", "天环灵", "晨星", "金辉子", "圣女者", "神谕", "神谕子", "圣光", "金辉姬", "神将", "圣光者", "圣骑士姬", "羽翼客", "神谕客", "金辉姬", "神将灵", "羽翼灵", "晨星姬", "晨星子", "晨星者", "圣骑士君", "白翼姬", "金辉灵", "天环灵", "神谕者", "神将子", "神将子", "圣女君", "圣女", "幽灵新娘", "绷带女王", "白发鬼姬", "冥后客", "冥修姬", "冥修灵", "白骨客", "鬼姬灵", "骨王", "冥后子", "冥后客", "白骨灵", "冥修君", "白骨客", "白骨客", "绷带姬", "幽冥者", "骨王者", "幽影灵", "骨王灵", "白骨君", "冥修者", "冥姬子", "冥姬客", "绷带者", "白骨姬", "绷带者", "绷带姬", "骸将子", "鬼姬者", "幽影", "幽影", "幽冥姬", "幽影", "冥姬", "冥后者", "冥姬", "幽冥子", "冥后君", "幽影客", "骨王者", "幽影者", "骸将君", "骨王客", "骨王客", "骸将君", "冥姬", "绷带客", "鬼姬者", "幽影者", "幽影客", "幽影灵", "绷带灵", "冥修客", "幽影者", "白骨者", "冥姬灵", "骸将姬", "绷带子", "鬼姬者", "骨王君", "骨王者", "冥修子", "冥修", "白骨灵", "绷带子", "骸将君", "冥姬者", "幽冥君", "鬼姬子", "幽冥君", "幽冥子", "冥姬君", "冥姬子", "鬼姬", "幽影客", "冥后子", "幽影客", "骨王", "幽冥客", "冥姬", "鬼姬灵", "绷带子", "绷带姬", "绷带君", "冥后子", "冥姬者", "骨王君", "冥姬君", "绷带", "绷带者", "骨王子", "鬼姬灵", "绷带灵", "冥姬灵", "冥姬灵", "白骨灵", "白骨灵", "骸将", "冥姬客", "幽冥灵", "冥后姬", "绷带子", "冥修子", "幽冥姬", "冥后", "幽影子", "骸将子", "鬼姬", "绷带子", "冥修君", "幽影灵", "幽冥客", "幽冥客", "冥姬者", "冥后", "绷带客", "白骨", "幽冥君", "幽冥", "骨王", "白骨子", "冥修", "幽冥君", "绷带客", "幽影者", "绷带者", "骨王者", "幽冥灵", "鬼姬", "冥姬君", "冥后子", "冥后者", "白骨客", "骸将者", "绷带灵", "幽冥子", "幽冥者", "幽影灵", "骸将者", "冥修君", "绷带灵", "冥姬客", "冥修", "白骨", "幽影灵", "骸将客", "银机少女", "机巧女仆", "蓝瞳战姬", "铁卫客", "钢魂子", "齿轮子", "巡电机灵", "巡电机子", "巡电机客", "机芯", "巡电机", "铁卫灵", "机芯君", "巡电机姬", "铁卫姬", "机芯子", "巡电机客", "钢魂者", "铁卫子", "铁匠机姬", "铁卫", "铁匠机姬", "钢魂客", "齿轮子", "机芯姬", "钢魂姬", "机芯", "义体君", "巡电机", "巡电机", "巡电机灵", "银机灵", "铜机灵", "巡电机者", "银机者", "义体者", "齿轮客", "机芯灵", "义体君", "机芯客", "机巧灵", "机巧者", "机巧子", "钢魂客", "钢魂君", "机芯姬", "巡电机君", "银机者", "齿轮灵", "齿轮", "齿轮客", "铁匠机姬", "钢魂客", "铁匠机灵", "银机君", "巡电机姬", "钢魂灵", "齿轮君", "钢魂灵", "钢魂君", "银机姬", "钢魂者", "铁匠机君", "铜机君", "银机灵", "铜机姬", "铁匠机姬", "铁卫君", "巡电机姬", "齿轮灵", "义体姬", "巡电机", "铁卫姬", "巡电机者", "钢魂客", "机芯者", "机巧灵", "银机灵", "齿轮君", "巡电机客", "铁匠机君", "机芯子", "铜机者", "铁卫者", "义体灵", "机芯灵", "铁卫灵", "义体姬", "机巧", "巡电机灵", "铜机客", "齿轮者", "机巧子", "机芯灵", "铁匠机子", "义体子", "铁匠机客", "铁匠机者", "巡电机子", "铁卫君", "铜机姬", "银机君", "巡电机客", "铁卫客", "机巧姬", "齿轮者", "铁卫灵", "银机", "银机灵", "铜机灵", "铜机", "银机客", "铜机姬", "钢魂者", "巡电机灵", "银机", "机芯灵", "铁卫姬", "机巧者", "巡电机姬", "钢魂者", "巡电机子", "铁匠机客", "钢魂灵", "铁匠机者", "机芯子", "齿轮者", "铁卫姬", "机芯", "钢魂姬", "巡电机灵", "巡电机姬", "机芯君", "银机者", "钢魂客", "铜机君", "铜机灵", "齿轮子", "钢魂客", "义体君", "齿轮", "铁卫", "机巧君", "机芯子", "铜机姬", "义体灵", "齿轮君", "巡电机姬", "铜机灵"] : ["剑眉少年", "温润丹修", "霸气魔修", "银发青年", "黑衣修士", "金发青年", "青衫剑修", "青衫丹修", "青衫刀修", "青衫散修", "青衫魔君", "青衫仙君", "青衫书生", "青衫道人", "青衫侠客", "青衫公子", "白袍剑修", "白袍丹修", "白袍刀修", "白袍散修", "白袍魔君", "白袍仙君", "白袍书生", "白袍道人", "白袍侠客", "白袍公子", "玄衣剑修", "玄衣丹修", "玄衣刀修", "玄衣散修", "玄衣魔君", "玄衣仙君", "玄衣书生", "玄衣道人", "玄衣侠客", "玄衣公子", "素衣剑修", "素衣丹修", "素衣刀修", "素衣散修", "素衣魔君", "素衣仙君", "素衣书生", "素衣道人", "素衣侠客", "素衣公子", "锦袍剑修", "锦袍丹修", "锦袍刀修", "锦袍散修", "锦袍魔君", "锦袍仙君", "锦袍书生", "锦袍道人", "锦袍侠客", "锦袍公子", "黑袍剑修", "黑袍丹修", "黑袍刀修", "黑袍散修", "黑袍魔君", "黑袍仙君", "黑袍书生", "黑袍道人", "黑袍侠客", "黑袍公子", "青袍剑修", "青袍丹修", "青袍刀修", "青袍散修", "青袍魔君", "青袍仙君", "青袍书生", "青袍道人", "青袍侠客", "青袍公子", "玉冠剑修", "玉冠丹修", "玉冠刀修", "玉冠散修", "玉冠魔君", "玉冠仙君", "玉冠书生", "玉冠道人", "玉冠侠客", "玉冠公子", "布衣剑修", "布衣丹修", "布衣刀修", "布衣散修", "布衣魔君", "布衣仙君", "布衣书生", "布衣道人", "布衣侠客", "布衣公子", "金纹剑修", "金纹丹修", "金纹刀修", "金纹散修", "金纹魔君", "金纹仙君", "金纹书生", "金纹道人", "金纹侠客", "金纹公子", "星辉战神", "星辉骑士", "星辉法师", "星辉射手", "星辉刺客", "星辉君主", "星辉勇者", "星辉游侠", "星辉术士", "星辉猎人", "月光战神", "月光骑士", "月光法师", "月光射手", "月光刺客", "月光君主", "月光勇者", "月光游侠", "月光术士", "月光猎人", "烈焰战神", "烈焰骑士", "烈焰法师", "烈焰射手", "烈焰刺客", "烈焰君主", "烈焰勇者", "烈焰游侠", "烈焰术士", "烈焰猎人", "寒冰战神", "寒冰骑士", "寒冰法师", "寒冰射手", "寒冰刺客", "寒冰君主", "寒冰勇者", "寒冰游侠", "寒冰术士", "寒冰猎人", "雷霆战神", "雷霆骑士", "雷霆法师", "雷霆射手", "雷霆刺客", "雷霆君主", "雷霆勇者", "雷霆游侠", "雷霆术士", "雷霆猎人", "疾风战神", "疾风骑士", "疾风法师", "疾风射手", "疾风刺客", "疾风君主", "疾风勇者", "疾风游侠", "疾风术士", "疾风猎人", "暗影战神", "暗影骑士", "暗影法师", "暗影射手", "暗影刺客", "暗影君主", "暗影勇者", "暗影游侠", "暗影术士", "暗影猎人", "圣光战神", "圣光骑士", "圣光法师", "圣光射手", "圣光刺客", "圣光君主", "圣光勇者", "圣光游侠", "圣光术士", "圣光猎人", "蔷薇战神", "蔷薇骑士", "蔷薇法师", "蔷薇射手", "蔷薇刺客", "蔷薇君主", "蔷薇勇者", "蔷薇游侠", "蔷薇术士", "蔷薇猎人", "琉璃战神", "琉璃骑士", "琉璃法师", "琉璃射手", "琉璃刺客", "琉璃君主", "琉璃勇者", "琉璃游侠", "琉璃术士", "琉璃猎人", "樱色少年", "樱色学长", "樱色学弟", "樱色前辈", "樱色同桌", "樱色班长", "樱色球员", "樱色侦探", "樱色队长", "樱色社长", "月夜少年", "月夜学长", "月夜学弟", "月夜前辈", "月夜同桌", "月夜班长", "月夜球员", "月夜侦探", "月夜队长", "月夜社长", "星野少年", "星野学长", "星野学弟", "星野前辈", "星野同桌", "星野班长", "星野球员", "星野侦探", "星野队长", "星野社长", "雪乃少年", "雪乃学长", "雪乃学弟", "雪乃前辈", "雪乃同桌", "雪乃班长", "雪乃球员", "雪乃侦探", "雪乃队长", "雪乃社长", "风见少年", "风见学长", "风见学弟", "风见前辈", "风见同桌", "风见班长", "风见球员", "风见侦探", "风见队长", "风见社长", "水无少年", "水无学长", "水无学弟", "水无前辈", "水无同桌", "水无班长", "水无球员", "水无侦探", "水无队长", "水无社长", "苍蓝少年", "苍蓝学长", "苍蓝学弟", "苍蓝前辈", "苍蓝同桌", "苍蓝班长", "苍蓝球员", "苍蓝侦探", "苍蓝队长", "苍蓝社长", "绯红少年", "绯红学长", "绯红学弟", "绯红前辈", "绯红同桌", "绯红班长", "绯红球员", "绯红侦探", "绯红队长", "绯红社长", "白鸟少年", "白鸟学长", "白鸟学弟", "白鸟前辈", "白鸟同桌", "白鸟班长", "白鸟球员", "白鸟侦探", "白鸟队长", "白鸟社长", "千鹤少年", "千鹤学长", "千鹤学弟", "千鹤前辈", "千鹤同桌", "千鹤班长", "千鹤球员", "千鹤侦探", "千鹤队长", "千鹤社长", "球场少年", "西装青年", "问天客", "行者同学", "医者", "问天队长", "医者医生", "护士老师", "问天医生", "行者", "学生医生", "白领同学", "护士队长", "医者同学", "行者", "来客队长", "医者老师", "医者医生", "来客医生", "学生医生", "学生客", "医者医生", "医者同学", "白领同学", "护士同学", "厨师医生", "来客", "厨师老师", "医者", "学生队长", "白领医生", "行者客", "学生", "乐手队长", "医者队长", "球手老师", "行者", "问天客", "来客医生", "问天队长", "乐手客", "行者队长", "学生", "学生队长", "球手同学", "厨师老师", "学生", "球手", "来客同学", "护士老师", "问天同学", "红发魔君", "羊角魔将", "紫瞳魔修", "魔君灵", "暗影君", "魔君子", "血魔主", "魔君客", "血魔客", "魔君主", "暗影者", "暗影灵", "魔君子", "熔岩灵", "魔主灵", "魔将", "魔将主", "魔君公", "血魔客", "血魔灵", "煞君灵", "熔岩", "熔岩客", "魔君者", "魔君", "魔将", "暗影者", "魔修子", "魔君客", "魔修", "魔将者", "魔修君", "魔君", "暗影子", "魔主客", "魔修客", "暗影", "暗影主", "煞君者", "血魔灵", "魔君客", "熔岩者", "魔君者", "魔修", "魅魔子", "血魔公", "煞君主", "血魔君", "魔君者", "魔君灵", "魔修灵", "魔者灵", "魔君", "魅魔君", "魔君者", "魔君者", "魅魔君", "魔将客", "魔将客", "魔君客", "暗影公", "暗影灵", "熔岩主", "魔君者", "魔者客", "魔君", "魔修客", "魔将君", "暗影灵", "血魔客", "魔君客", "暗影客", "魔公客", "魔将灵", "血魔灵", "魔修主", "魔客", "煞君子", "血魔君", "魅魔客", "魅魔客", "煞君公", "暗影", "魔君", "魔君", "熔岩君", "煞君客", "熔岩子", "血魔者", "魅魔者", "血魔君", "魔君", "血魔君", "魔将君", "魅魔君", "魔公灵", "魔修者", "魔君子", "暗影客", "魔君子", "魔修君", "血魔君", "魔将", "熔岩君", "熔岩者", "煞君", "熔岩灵", "魔君客", "魔主者", "煞君者", "魔修君", "熔岩灵", "魅魔客", "魔君", "魔主主", "狐耳少年", "猫耳青年", "灰发狼妖", "蝶妖子", "鹤君", "蝶妖灵", "鹿灵客", "猫妖子", "蝶妖灵", "狼妖客", "猫妖客", "狐仙客", "鹤君者", "鹿灵君", "狸奴子", "兔灵主", "狼妖君", "兔灵子", "蝶妖灵", "猫妖灵", "狐仙", "狸奴者", "鹤君客", "狐仙客", "九尾君", "狼妖者", "兔灵子", "狼妖子", "狸奴子", "狼妖", "九尾", "兔灵客", "九尾客", "狼妖者", "猫妖灵", "蛇君", "狸奴客", "蛇主主", "鹤主客", "狼妖灵", "鹤君", "狐仙", "鹤主君", "狐仙者", "鹤主主", "鹿灵", "兔灵子", "蝶妖客", "猫妖君", "蛇者", "鹤者", "鹿灵子", "蝶妖灵", "九尾灵", "蝶妖子", "狼妖子", "鹤者客", "蝶妖者", "狸奴君", "狸奴主", "狐仙主", "狐仙者", "蝶妖灵", "狼妖子", "兔灵君", "兔灵", "狐仙公", "猫妖君", "狸奴", "狼妖客", "鹿灵客", "狼妖灵", "猫妖灵", "兔灵", "鹤公客", "九尾灵", "猫妖者", "九尾者", "兔灵子", "狼妖子", "鹤公公", "蝶妖者", "鹤者君", "狸奴者", "狐仙君", "蝶妖", "兔灵公", "鹿灵者", "鹤主者", "蝶妖君", "狼妖客", "狼妖者", "猫妖客", "兔灵者", "狼妖客", "鹿灵", "鹤君子", "狼妖主", "狐仙", "猫妖者", "狐仙君", "蝶妖子", "兔灵君", "鹿灵", "鹤客", "狐仙君", "猫妖", "鹤君客", "九尾", "蛇君者", "狼妖子", "猫妖主", "鹿灵主", "狸奴君", "蛇君子", "狐仙灵", "鹿灵公", "狼妖公", "狼妖君", "兔灵客", "鹿灵客", "狸奴灵", "鹿灵", "狐仙子", "狸奴", "鹿灵客", "狼妖子", "鹿灵客", "蛇君灵", "蝶妖", "狸奴", "狸奴子", "九尾灵", "蛇君客", "九尾客", "兔灵君", "狼妖者", "兔灵君", "狐仙者", "鹿灵客", "鹿灵君", "九尾子", "猫妖", "银甲骑士", "绿叶精灵", "暗夜精灵", "月精灵", "星叶", "银叶客", "林心主", "森语灵", "月精主", "碧叶客", "星叶者", "星叶子", "藤婆君", "花灵", "银叶者", "星叶公", "碧叶灵", "泉灵子", "暗夜客", "暗夜者", "森语君", "森语君", "泉灵客", "泉灵", "暗夜", "森语公", "森语客", "藤婆者", "银叶者", "藤婆", "泉灵子", "月精君", "花灵公", "林心", "暗夜主", "银叶", "森语者", "碧叶灵", "泉灵者", "银叶", "藤婆君", "泉灵君", "林心灵", "花灵主", "泉灵君", "银叶君", "星叶灵", "花灵君", "藤婆灵", "泉灵君", "银叶者", "花灵客", "林心灵", "月精君", "泉灵", "藤婆子", "银叶子", "藤婆君", "森语客", "银叶者", "花灵君", "花灵", "碧叶子", "暗夜者", "暗夜者", "月精灵", "林心君", "森语", "花灵客", "藤婆主", "森语", "藤婆子", "藤婆公", "林心灵", "星叶", "森语主", "森语客", "银叶子", "星叶者", "星叶君", "月精", "花灵子", "泉灵君", "花灵", "月精者", "银叶客", "森语客", "银叶君", "藤婆", "泉灵", "银叶子", "泉灵君", "森语君", "藤婆客", "星叶", "暗夜灵", "暗夜子", "林心者", "星叶者", "花灵者", "碧叶客", "月精者", "碧叶子", "林心灵", "泉灵公", "月精客", "碧叶子", "碧叶", "星叶", "银叶主", "月精", "星叶客", "碧叶者", "林心公", "林心君", "花灵子", "暗夜者", "暗夜君", "暗夜者", "银叶公", "花灵客", "森语君", "花灵君", "林心", "星叶主", "月精子", "森语君", "暗夜君", "泉灵主", "林心君", "月精客", "藤婆客", "月精公", "月精者", "月精客", "星叶君", "泉灵君", "藤婆", "月精子", "月精", "暗夜君", "星叶者", "红须铁匠", "绿皮战士", "牛头战士", "牛头灵", "铁须灵", "牛头客", "炉火君", "铁须灵", "绿皮主", "石拳子", "牛头者", "巨力君", "半身子", "巧匠者", "绿皮子", "牛头灵", "半身主", "绿皮灵", "巧匠主", "巨力者", "炉火子", "巨力", "绿皮", "铜锤客", "牛头", "铜锤主", "铁须灵", "荒原君", "半身", "石拳者", "铁须", "半身灵", "荒原客", "铜锤灵", "巨力灵", "半身子", "牛头客", "半身客", "石拳君", "铜锤君", "巧匠君", "绿皮灵", "巨力主", "牛头子", "半身灵", "巨力子", "巨力公", "荒原客", "巧匠客", "荒原者", "牛头灵", "半身", "巧匠", "巧匠客", "牛头子", "铁须灵", "铜锤子", "巨力君", "巨力客", "巨力", "炉火灵", "炉火主", "牛头子", "铁须君", "牛头主", "炉火子", "石拳者", "炉火子", "荒原主", "荒原者", "荒原", "巧匠子", "巧匠子", "炉火者", "荒原", "巨力", "绿皮者", "石拳者", "炉火灵", "铁须君", "荒原", "炉火者", "荒原灵", "铜锤公", "巨力客", "铜锤君", "绿皮者", "半身客", "铁须子", "石拳者", "绿皮子", "牛头子", "巨力灵", "半身君", "铜锤者", "炉火客", "铜锤灵", "巧匠灵", "荒原灵", "石拳子", "炉火君", "炉火灵", "巧匠君", "铜锤君", "炉火", "铁须客", "铜锤客", "半身者", "炉火子", "炉火灵", "牛头公", "牛头", "铁须君", "半身客", "铜锤君", "铜锤客", "铜锤子", "绿皮子", "铜锤客", "巧匠者", "巨力君", "荒原子", "巨力", "石拳灵", "绿皮君", "荒原灵", "炉火者", "巧匠公", "巧匠君", "绿皮者", "牛头君", "牛头君", "荒原客", "绿皮公", "绿皮者", "荒原客", "半身灵", "铁须子", "铁须客", "铜锤客", "圣光骑士", "白袍圣子", "银翼神将", "晨星君", "白翼", "圣骑士子", "圣骑士君", "羽翼灵", "羽翼主", "神谕主", "晨星主", "圣光者", "圣骑士灵", "圣骑士客", "圣骑士主", "神将公", "圣光子", "圣君者", "神谕客", "圣君者", "晨星公", "圣君", "神谕客", "天环主", "圣君客", "白翼客", "天环灵", "晨星者", "晨星子", "天环", "圣骑士客", "天环子", "金辉主", "晨星君", "晨星客", "天环者", "神将子", "白翼灵", "神将子", "白翼者", "神谕君", "金辉者", "圣光子", "晨星者", "神将主", "羽翼客", "金辉客", "羽翼者", "神谕灵", "天环客", "神谕君", "神将君", "白翼客", "白翼者", "神将子", "金辉君", "羽翼子", "晨星君", "神谕", "白翼", "圣光客", "晨星者", "天环子", "金辉君", "圣君者", "羽翼者", "羽翼灵", "圣骑士客", "神将灵", "圣君主", "圣骑士者", "天环者", "天环子", "羽翼", "羽翼君", "圣骑士灵", "圣君", "圣骑士者", "金辉客", "圣骑士公", "金辉公", "圣光主", "白翼君", "白翼君", "金辉灵", "天环子", "神将君", "圣君", "羽翼者", "神将客", "白翼君", "神谕君", "神将者", "圣光客", "圣君者", "天环者", "白翼主", "白翼客", "羽翼", "天环客", "白翼", "神谕灵", "圣光公", "神将者", "圣君公", "神将子", "羽翼公", "金辉灵", "圣君子", "圣君客", "圣君灵", "神将君", "圣骑士君", "羽翼君", "白翼公", "白翼灵", "天环者", "圣骑士君", "天环君", "金辉君", "神将客", "白翼君", "神将子", "圣骑士者", "圣骑士", "神将客", "圣骑士灵", "圣光客", "圣君客", "金辉子", "圣骑士", "晨星子", "金辉灵", "圣骑士者", "金辉", "神谕者", "圣骑士", "圣骑士君", "天环子", "圣骑士子", "羽翼", "神将君", "天环客", "白翼", "天环公", "晨星子", "金辉君", "圣光君", "骷髅王", "绷带法老", "死亡骑士", "幽影灵", "绷带子", "冥修主", "冥君者", "冥修客", "幽冥君", "白骨", "冥君", "幽影者", "绷带君", "鬼君灵", "幽影灵", "鬼君", "幽冥子", "鬼君", "冥修君", "冥君", "骸将子", "冥君灵", "冥修灵", "幽冥", "骸将者", "冥修子", "鬼君", "绷带", "白骨主", "幽影子", "骸将灵", "冥君客", "幽影者", "骸将主", "骨王", "骨王灵", "白骨者", "冥君主", "骨王灵", "冥主君", "绷带客", "骨王", "幽影君", "骸将", "冥君者", "鬼君", "幽影灵", "冥修者", "骸将客", "骸将客", "冥修灵", "鬼君客", "冥君灵", "鬼君", "鬼君子", "鬼君客", "冥君子", "绷带灵", "冥修灵", "绷带君", "鬼君", "冥主", "冥君", "幽冥客", "冥君子", "幽冥灵", "幽冥者", "白骨者", "骸将君", "鬼君", "冥者君", "冥君客", "骨王君", "鬼君客", "骸将客", "冥君", "幽影子", "冥君客", "幽冥子", "幽冥灵", "骨王者", "冥君", "鬼君子", "绷带主", "冥主灵", "绷带子", "冥者", "冥公君", "冥修君", "幽影君", "绷带者", "幽冥灵", "冥修客", "白骨子", "骨王君", "骸将者", "骸将客", "白骨子", "鬼君客", "白骨公", "幽影", "鬼君者", "鬼君者", "绷带者", "冥修君", "白骨君", "骸将君", "幽冥", "白骨者", "骸将灵", "幽影", "冥君", "幽冥主", "白骨子", "冥主客", "冥修者", "鬼君主", "幽冥灵", "冥君公", "幽冥公", "冥君", "鬼君客", "白骨客", "绷带者", "绷带灵", "冥修子", "冥君子", "骸将公", "冥修灵", "骸将君", "冥君者", "冥君客", "骸将君", "绷带客", "幽影", "绷带者", "绷带子", "冥修", "骸将", "骨王", "骨王子", "冥主主", "冥君", "幽冥灵", "白骨灵", "骸将君", "鬼君", "黄铜绅士", "铁甲战魂", "义体青年", "钢魂", "机巧灵", "齿轮子", "钢魂灵", "机巧君", "齿轮者", "银机子", "义体子", "钢魂灵", "巡电机客", "银机", "齿轮君", "铁卫子", "机芯者", "义体者", "银机子", "齿轮灵", "铜机客", "铜机君", "机巧者", "齿轮", "钢魂者", "机巧", "义体灵", "铜机者", "铁卫灵", "钢魂客", "钢魂客", "银机者", "铁匠机子", "铁卫灵", "铁卫君", "铜机君", "机巧灵", "巡电机君", "义体君", "钢魂子", "铜机", "义体君", "银机客", "义体灵", "齿轮灵", "铁匠机者", "机芯子", "铜机子", "义体灵", "机巧者", "铜机主", "钢魂君", "巡电机客", "银机客", "铁卫主", "机芯客", "巡电机君", "巡电机者", "齿轮子", "铁匠机子", "齿轮客", "铜机客", "钢魂子", "机芯灵", "钢魂子", "齿轮", "义体", "银机主", "巡电机主", "巡电机君", "铜机客", "铜机客", "铁匠机者", "钢魂", "巡电机子", "铜机君", "齿轮客", "银机君", "铁匠机君", "巡电机", "巡电机者", "齿轮主", "铁匠机者", "机芯主", "钢魂主", "铁卫灵", "钢魂灵", "钢魂者", "义体君", "铜机者", "铜机者", "钢魂", "铁卫客", "钢魂", "巡电机公", "银机公", "机芯客", "齿轮灵", "齿轮公", "铜机君", "铁匠机", "铜机客", "铜机灵", "义体灵", "机巧君", "机芯君", "机芯灵", "机芯者", "齿轮客", "义体灵", "铁卫", "铁匠机", "钢魂子", "铁卫君", "齿轮子", "铜机公", "义体主", "机芯君", "齿轮子", "义体君", "钢魂客", "巡电机者", "义体灵", "铜机者", "机芯者", "义体君", "铁匠机主", "铜机灵", "机巧者", "铁卫客", "齿轮君", "银机者", "齿轮灵", "义体公", "铁卫子", "银机子", "义体君", "银机", "铁匠机公", "巡电机客", "齿轮者", "机芯者", "义体", "铜机", "银机子", "铁匠机客", "钢魂公", "齿轮子"];
  const isA = setKey === 'a';
  const nmOf = i => isR ? (names[i] || '无名修士') : isA ? ((AVATAR_NAMES_ANIME[gender] || [])[i] || '无名修士') : ('修士 ' + (i + 1));
  const sealedAvatars = new Set((S.sealed || []).filter(x => x && !x.done && x.gender === gender && (x.avatarSet || 'r') === setKey).map(x => x.avatar|0));
  const catIdxs = isR ? ((AVATAR_CATS[gender] && AVATAR_CATS[gender][cat]) || list.map((_, i) => i)) : list.map((_, i) => i);
  const cats = isR ? Object.keys(AVATAR_CATS[gender] || {}) : [];
  let html = `<h2>🖼️ 选择头像</h2><div class="hint">图库三套共 3506 张，点任意一张即换上${sealedAvatars.size ? '<br><span class="r">前世遗物未消散，前世头像不可选</span>' : ''}${S._avatarSettings ? '<br>💠 换头像需极品灵石×1（现有 ×' + ((S.ores && S.ores.sp5) | 0) + '）' : ''}</div>`;
  html += `<div class="row" style="display:flex;gap:8px;margin-bottom:8px">${[['r', '第壹套'], ['g', '第贰套'], ['a', '动漫套'], ['gallery', '玩家图库']].map(([k, n2]) => `<button class="btn" data-avatarset="${k}" style="flex:1;${setKey === k ? 'opacity:0.5' : ''}">${n2}</button>`).join('')}</div>`;
  html += `<div class="row"><div class="lab">📤 上传自己的头像<small>私用仅本机；入库可自取名，审核通过后全服可选</small></div>${S.avatarCustom ? `<img src="${S.avatarCustom}" style="width:40px;height:40px;border-radius:50%;object-fit:cover"><button class="btn sm" data-avsubmit="1">📮 提交入库</button><button class="btn sm" data-clearavatar="1">用回图库</button>` : '<input type="file" id="avatarFile" accept="image/*" style="flex:1;font-size:12px;min-width:0">'}</div>`;
  if (setKey === 'gallery') {
    const gal = window._avGallery;
    if (!gal && !window._avGalLoading) { window._avGalLoading = 1; try { window.MHXY.api('GET', '/api/avatar/gallery').then(j => { window._avGalLoading = 0; window._avGallery = (j && j.ok && Array.isArray(j.list)) ? j.list : []; if (S._pickSet === 'gallery') sheetAvatar(gender, cat); }).catch(() => { window._avGalLoading = 0; window._avGallery = []; if (S._pickSet === 'gallery') sheetAvatar(gender, cat); }); } catch (_) { window._avGalLoading = 0; window._avGallery = []; } }
    html += !gal ? '<div class="hint">⏳ 正在打开玩家图库…</div>' : (gal.length ? `<div class="grid2" style="grid-template-columns:repeat(3,1fr);gap:10px">${gal.map(e => `<button class="act" data-avgal="${e.id}" style="padding:6px"><img src="${e.data}" loading="lazy" style="width:100%;border-radius:10px;display:block"><span class="t" style="font-size:11px">${String(e.name || e.by || '道友').replace(/[<>&"]/g, '')}</span></button>`).join('')}</div>` : '<div class="hint">玩家图库暂无头像——上传自己的头像并提交入库，第一批就从道友们开始攒。</div>');
    html += `${(!S._onboarded || S._reincChain) ? '<div class="row" style="margin-top:10px"><button class="btn" data-back-gender>← 重选性别</button></div>' : ''}`;
    openSheet(html); S._pickGender = gender; save(); bindAvatarFile(); return;
  }
  if (cats.length) html += `<div class="row" style="display:flex;gap:8px;margin-bottom:8px">${cats.map(c => `<button class="btn" data-avatarcat="${c}" style="flex:1;${c === cat ? 'opacity:0.5' : ''}">${c}</button>`).join('')}</div>`;
  html += `<div class="grid2" style="grid-template-columns:repeat(3,1fr);gap:10px">`;
  const cell = i => { const banned = sealedAvatars.has(i); return `<button class="act" data-avatar="${i}" style="padding:6px;${banned ? 'opacity:0.3' : ''}" ${banned ? 'disabled' : ''}><img src="${list[i]}" loading="lazy" style="width:100%;border-radius:10px;display:block"><span class="t" style="font-size:11px">${nmOf(i)}</span></button>`; };
  if (isR || isA) {
    const seriesOf = i => isA ? ((AVATAR_SERIES_ANIME[gender] && AVATAR_SERIES_ANIME[gender][i]) || '原创') : ((AVATAR_SERIES[gender] && AVATAR_SERIES[gender][i]) || '原创');
    const seenSeries = [];
    catIdxs.forEach(i => { const s = seriesOf(i); if (seenSeries.indexOf(s) < 0) seenSeries.push(s); });
    seenSeries.forEach(s => { html += `<div style="grid-column:1/-1;font-size:13px;font-weight:bold;padding:8px 2px 0"><span class="y">📚 ${s}</span></div>`; catIdxs.forEach(i => { if (seriesOf(i) === s) html += cell(i); }); });
  } else catIdxs.forEach(i => { html += cell(i); });
  html += `</div>${(!S._onboarded || S._reincChain) ? '<div class="row" style="margin-top:10px"><button class="btn" data-back-gender>← 重选性别</button></div>' : ''}`;
  openSheet(html);
  S._pickGender = gender; save();
  bindAvatarFile();
  function bindAvatarFile() { const fi = document.getElementById('avatarFile'); if (fi) fi.addEventListener('change', () => { const f = fi.files && fi.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => { const img = new Image(); img.onload = () => { try { const cv = document.createElement('canvas'); cv.width = 256; cv.height = 256; const cx = cv.getContext('2d'); const s0 = Math.min(img.width, img.height); cx.drawImage(img, (img.width - s0) / 2, (img.height - s0) / 2, s0, s0, 0, 0, 256, 256); const _d = cv.toDataURL('image/jpeg', 0.85); if (S._onboarded && S._avatarSettings && !avatarChangeCost()) return; S.avatarCustom = _d; try { saveAvatarSeparate(_d, null); } catch(_) {} save(); if (!S._onboarded) { S._avatarPicked = true; save(); toastLog('good', '🖼️ 头像已换上（自定义）'); chainNext(); } else { toastLog('good', '🖼️ 头像已换上（自定义）'); sheetAvatar(gender, cat); } /* v1088 建号上传头像即算选头像 */ } catch(_) {} }; img.src = rd.result; }; rd.readAsDataURL(f); }); }
}
function avatarUrl() {
  // v1052: 头像独立存储（localStorage mhxy_avatar_v1），不随存档 S 走，轮回/刷新不丢
  try {
    const _av = localStorage.getItem('mhxy_avatar_v1');
    if (_av) { const _o = JSON.parse(_av); if (_o && _o.data) return _o.data; }
  } catch(_) {}
  if (S.avatarCustom) return S.avatarCustom;
  // 图库头像 dataURL 丢失时，尝试从已加载的图库中按 ID 恢复
  if (S.avatarGalleryId && window._avGallery) {
    const g = window._avGallery.find(x => String(x.id) === String(S.avatarGalleryId));
    if (g && g.data) { S.avatarCustom = g.data; try { save(); } catch(e) {} return g.data; }
  }
  const set = (typeof AVATAR_SETS !== 'undefined' && AVATAR_SETS[S.avatarSet || 'r']) || AVATARS;
  if (!S.gender || !set[S.gender]) return AVATARS.m[0];
  return set[S.gender][S.avatar|0] || set[S.gender][0] || AVATARS.m[0];
}
// v1052: 头像写入独立存储（与存档分离，轮回/刷新不丢）
function saveAvatarSeparate(data, galleryId) {
  try {
    localStorage.setItem('mhxy_avatar_v1', JSON.stringify({ data: data || null, gid: galleryId || null, ts: Date.now() }));
  } catch(_) {}
}
function clearAvatarSeparate() {
  try { localStorage.removeItem('mhxy_avatar_v1'); } catch(_) {}
}

function npcAvatar(name) { // v294 NPC按名字固定分配头像（同名同头像）
  let h = 0; const s = String(name || '');
  for (let i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) | 0;
  const pool = AVATARS.m.concat(AVATARS.f);
  return pool[Math.abs(h) % pool.length];
}
// v135 前世遗物头像：用上一世的头像，没有则返回 null（显示默认🌟）
function sealAvatarUrl(seal) {
  if (!seal || !seal.gender || !AVATARS[seal.gender]) return null;
  return AVATARS[seal.gender][seal.avatar|0] || AVATARS[seal.gender][0];
}

/* ---------- 个人属性面板 v124：完整人物卡 ---------- */
const STAR_NMER=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13];
const STAR_DOTS_F=[[52,0,35.17,23.21],[52,0,64.83,23.21],[53,0,35.17,23.21],[53,0,64.83,23.21],[54,0,35.5,26.31],[54,0,64.5,26.31],[55,0,35.2,28.87],[55,0,64.8,28.87],[56,0,34.9,31.46],[56,0,65.1,31.46],[57,0,34.74,34.59],[57,0,65.26,34.59],[58,0,33.72,38.1],[58,0,66.28,38.1],[59,0,32.39,41.4],[59,0,67.61,41.4],[60,0,30.43,45.43],[60,0,69.57,45.43],[61,0,33.2,54.8],[61,0,66.8,54.8],[62,0,34.2,58.1],[62,0,65.9,58.2],[82,0,46.48,11.08],[82,0,53.52,11.08],[83,0,46.98,8.64],[83,0,53.02,8.64],[84,0,45.56,10.5],[84,0,54.44,10.5],[85,0,44.92,12.4],[85,0,55.08,12.4],[86,0,44.46,10.15],[86,0,55.54,10.15],[87,0,43.95,7.9],[87,0,56.05,7.9],[88,0,45.72,5.77],[88,0,54.28,5.77],[89,0,44.17,7.95],[89,0,55.83,7.95],[90,0,44.86,10.15],[90,0,55.14,10.15],[91,0,45.56,12.34],[91,0,54.44,12.34],[92,0,45.76,14.36],[92,0,54.24,14.36],[93,0,45.08,17.47],[93,0,54.92,17.47],[94,0,43.24,21.08],[94,0,56.76,21.08],[95,0,41.76,22.83],[95,0,58.24,22.83],[96,0,41.41,24.19],[96,0,58.59,24.19],[97,0,41.17,25.56],[97,0,58.83,25.56],[98,0,40.94,26.91],[98,0,59.06,26.91],[99,0,40.81,28.27],[99,0,59.19,28.27],[100,0,40.9,29.65],[100,0,59.1,29.65],[101,0,41.02,31.51],[101,0,58.98,31.51],[102,0,41.14,33.36],[102,0,58.86,33.36],[103,0,41.27,35.22],[103,0,58.73,35.22],[104,0,41.5,37.07],[104,0,58.5,37.07],[105,0,41.73,38.92],[105,0,58.27,38.92],[106,0,41.92,40.75],[106,0,58.08,40.75],[107,0,42.33,42.58],[107,0,57.67,42.58],[108,0,45.77,44.42],[108,0,54.23,44.42],[109,0,45.88,46.24],[109,0,54.12,46.24],[110,0,45.95,49.43],[110,0,54.05,49.43],[111,0,46.21,52.55],[111,0,53.79,52.55],[112,0,46.24,56.2],[112,0,53.76,56.2],[113,0,46.27,59.87],[113,0,53.73,59.87],[114,0,46.3,63.53],[114,0,53.7,63.53],[115,0,46.31,67.02],[115,0,53.69,67.02],[116,0,46.34,69.43],[116,0,53.66,69.43],[117,0,46.36,71.83],[117,0,53.64,71.83],[118,0,46.4,74.24],[118,0,53.6,74.24],[119,0,46.41,76.65],[119,0,53.59,76.65],[120,0,46.44,79.05],[120,0,53.56,79.05],[121,0,46.46,81.45],[121,0,53.54,81.45],[122,0,46.49,84.78],[122,0,53.51,84.78],[123,0,46.51,88.38],[123,0,53.49,88.38],[124,0,46.31,92.88],[124,0,53.69,92.88],[125,0,45.98,96.07],[125,0,54.02,96.07],[126,0,45.64,97.47],[126,0,54.36,97.47],[127,0,45.3,97.75],[127,0,54.7,97.75],[128,0,47.15,97.8],[128,0,52.85,97.8],[129,0,46.01,97.05],[129,0,53.99,97.05],[130,0,44.86,92.65],[130,0,55.14,92.65],[131,0,44.29,86.24],[131,0,55.71,86.24],[132,0,44.16,81.15],[132,0,55.84,81.15],[133,0,44.03,77.41],[133,0,55.97,77.41],[134,0,43.89,73.69],[134,0,56.11,73.69],[135,0,43.77,69.98],[135,0,56.23,69.98],[136,0,43.66,66.02],[136,0,56.34,66.02],[137,0,43.54,60.26],[137,0,56.46,60.26],[138,0,43.43,54.56],[138,0,56.57,54.56],[139,0,42.91,49.43],[139,0,57.09,49.43],[140,0,42.79,45.23],[140,0,57.21,45.23],[141,0,38.47,42.39],[141,0,61.53,42.39],[142,0,38.29,39.54],[142,0,61.71,39.54],[143,0,38.91,36.68],[143,0,61.09,36.68],[144,0,39.07,33.8],[144,0,60.93,33.8],[145,0,38.31,34.37],[145,0,61.69,34.37],[146,0,36.45,30.98],[146,0,63.55,30.98],[147,0,34.43,28.87],[147,0,65.57,28.87],[148,0,33.62,31.69],[148,0,66.38,31.69],[149,0,37.49,24.37],[149,0,62.51,24.37],[150,0,36.75,26.24],[150,0,63.25,26.24],[151,0,36.06,28.12],[151,0,63.94,28.12],[152,0,37.62,33.29],[152,0,62.38,33.29],[153,0,37.08,36.81],[153,0,62.92,36.81],[154,0,35.74,40.25],[154,0,64.26,40.25],[155,0,34.57,43.38],[155,0,65.43,43.38],[156,0,31.41,55.12],[156,0,68.59,55.12],[157,0,30.1,61.0],[157,0,70.1,61.0],[173,0,46.61,14.0],[173,0,53.39,14.0],[174,0,47.33,12.19],[174,0,52.67,12.19],[175,0,47.48,10.34],[175,0,52.52,10.34],[176,0,48.49,9.12],[176,0,51.51,9.12],[243,0,47.98,8.15],[243,0,52.02,8.15],[244,0,45.21,96.03],[244,0,54.79,96.03],[245,0,46.36,94.58],[245,0,53.64,94.58],[246,0,47.61,89.49],[246,0,52.39,89.49],[247,0,47.82,84.31],[247,0,52.18,84.31],[248,0,47.84,80.38],[248,0,52.16,80.38],[249,0,47.86,77.21],[249,0,52.14,77.21],[250,0,47.87,74.03],[250,0,52.13,74.03],[251,0,47.9,70.86],[251,0,52.1,70.86],[252,0,47.9,67.69],[252,0,52.1,67.69],[253,0,47.9,63.38],[253,0,52.1,63.38],[254,0,47.9,58.62],[254,0,52.1,58.62],[255,0,47.9,53.79],[255,0,52.1,53.79],[256,0,47.77,49.52],[256,0,52.23,49.52],[257,0,47.75,45.69],[257,0,52.25,45.69],[258,0,45.65,43.28],[258,0,54.35,43.28],[259,0,44.3,40.82],[259,0,55.7,40.82],[260,0,44.32,38.41],[260,0,55.68,38.41],[261,0,44.21,35.93],[261,0,55.79,35.93],[262,0,44.1,33.48],[262,0,55.9,33.48],[263,0,43.99,31.03],[263,0,56.01,31.03],[264,0,43.9,28.83],[264,0,56.1,28.83],[265,0,43.82,27.02],[265,0,56.18,27.02],[266,0,43.75,25.23],[266,0,56.25,25.23],[267,0,43.69,23.41],[267,0,56.31,23.41],[268,0,44.13,21.38],[268,0,55.87,21.38],[269,0,45.58,16.55],[269,0,54.42,16.55],[270,0,46.98,13.02],[270,0,53.02,13.02],[271,0,36.15,24.37],[271,0,63.85,24.37],[272,0,36.76,27.77],[272,0,63.24,27.77],[273,0,36.5,30.26],[273,0,63.5,30.26],[274,0,36.2,32.97],[274,0,63.8,32.97],[275,0,35.83,36.43],[275,0,64.17,36.43],[276,0,34.44,39.86],[276,0,65.56,39.86],[277,0,33.24,43.0],[277,0,66.76,43.0],[278,0,29.65,54.88],[278,0,70.35,54.88],[279,0,30.49,60.83],[279,0,69.0,60.96],[300,0,47.98,8.64],[300,0,52.02,8.64],[301,0,46.93,7.46],[301,0,53.07,7.46],[302,0,45.97,6.2],[302,0,54.03,6.2],[325,0,33.68,28.53],[325,0,66.32,28.53],[326,0,35.1,31.58],[326,0,64.9,31.58],[327,0,36.87,35.4],[327,0,63.13,35.4],[328,0,38.81,39.56],[328,0,61.19,39.56],[329,0,38.3,37.83],[329,0,61.7,37.83],[330,0,36.94,40.87],[330,0,63.06,40.87],[331,0,39.62,43.83],[331,0,60.38,43.83],[332,0,42.77,46.94],[332,0,57.23,46.94],[333,0,43.58,61.97],[333,0,56.42,61.97],[334,0,43.66,65.8],[334,0,56.34,65.8],[335,0,43.73,68.61],[335,0,56.27,68.61],[336,0,43.81,71.17],[336,0,56.19,71.17],[337,0,43.89,73.69],[337,0,56.11,73.69],[338,0,43.97,76.19],[338,0,56.03,76.19],[339,0,44.07,78.69],[339,0,55.93,78.69],[340,0,44.16,81.19],[340,0,55.84,81.19],[341,0,44.26,84.62],[341,0,55.74,84.62],[342,0,44.35,88.38],[342,0,55.65,88.38],[343,0,44.13,92.99],[343,0,55.87,92.99],[344,0,43.69,96.0],[344,0,56.31,96.0],[345,0,43.24,97.21],[345,0,56.76,97.21],[346,0,42.81,97.4],[346,0,57.19,97.4],[347,0,46.5,97.96],[347,0,53.5,97.96],[348,0,46.28,95.75],[348,0,53.72,95.75],[349,0,46.07,86.84],[349,0,53.93,86.84],[350,0,45.98,79.87],[350,0,54.02,79.87],[351,0,45.9,74.44],[351,0,54.1,74.44],[352,0,45.81,69.02],[352,0,54.19,69.02],[353,0,45.74,62.05],[353,0,54.26,62.05],[354,0,45.66,53.79],[354,0,54.34,53.79],[355,0,45.26,46.4],[355,0,54.74,46.4],[356,0,42.53,48.83],[356,0,57.47,48.83],[357,0,38.15,38.14],[357,0,61.85,38.14],[358,0,39.8,38.48],[358,0,60.2,38.48],[359,0,37.04,29.76],[359,0,62.96,29.76],[360,0,37.72,26.69],[360,0,62.28,26.69],[48,0,50.0,10.59],[49,0,50.0,11.81],[50,0,50.0,12.77],[51,0,50.0,13.52],[0,0,50.0,49.3],[1,0,50.0,47.73],[2,0,50.0,45.27],[3,0,50.0,43.32],[4,0,50.0,41.76],[5,0,50.0,40.2],[6,0,50.0,38.65],[7,0,50.0,36.68],[8,0,50.0,34.31],[9,0,50.0,31.94],[10,0,50.0,29.97],[11,0,50.0,28.41],[12,0,50.0,26.97],[13,0,50.0,25.53],[14,0,50.0,24.37],[15,0,50.0,23.21],[16,0,50.0,22.05],[17,0,50.0,19.47],[18,0,50.0,17.17],[19,0,50.0,14.83],[20,0,50.0,13.52],[21,0,50.0,12.05],[22,0,50.0,10.1],[23,0,50.0,8.64],[63,1,31.36,60.31],[63,1,68.64,60.31],[64,1,31.9,56.21],[64,1,68.1,56.21],[65,1,30.38,49.35],[65,1,69.62,49.35],[66,1,32.3,41.88],[66,1,67.8,41.88],[67,1,32.8,39.93],[67,1,67.2,39.93],[68,1,33.91,37.55],[68,1,66.09,37.55],[69,1,38.61,29.99],[69,1,61.39,29.99],[70,1,39.31,28.49],[70,1,60.69,28.49],[71,1,39.53,27.18],[71,1,60.47,27.18],[72,1,39.77,26.01],[72,1,60.23,26.01],[73,1,39.98,24.88],[73,1,60.02,24.88],[74,1,40.2,23.71],[74,1,59.8,23.71],[75,1,40.28,22.13],[75,1,59.72,22.13],[76,1,40.96,19.94],[76,1,59.04,19.94],[77,1,42.26,18.13],[77,1,57.74,18.13],[78,1,44.44,16.51],[78,1,55.56,16.51],[79,1,46.51,14.48],[79,1,53.49,14.48],[80,1,47.64,11.52],[80,1,52.36,11.52],[81,1,48.02,10.01],[81,1,51.98,10.01],[158,1,29.7,61.1],[158,1,70.3,61.1],[159,1,29.6,52.5],[159,1,69.9,52.5],[160,1,32.0,42.69],[160,1,68.1,42.69],[161,1,32.8,39.84],[161,1,67.1,39.84],[162,1,33.4,36.9],[162,1,66.5,36.9],[163,1,33.81,34.01],[163,1,66.19,34.01],[164,1,37.14,27.54],[164,1,62.86,27.54],[165,1,37.44,26.14],[165,1,62.56,26.14],[166,1,37.76,24.75],[166,1,62.24,24.75],[167,1,37.98,23.39],[167,1,62.02,23.39],[168,1,37.99,23.81],[168,1,62.01,23.81],[169,1,37.81,24.54],[169,1,62.19,24.54],[170,1,37.87,22.99],[170,1,62.13,22.99],[171,1,37.84,20.65],[171,1,62.16,20.65],[172,1,43.0,18.13],[172,1,57.0,18.13],[177,1,47.57,8.59],[177,1,52.43,8.59],[178,1,47.24,8.13],[178,1,52.76,8.13],[179,1,46.93,7.7],[179,1,53.07,7.7],[180,1,46.6,7.24],[180,1,53.4,7.24],[181,1,46.19,7.08],[181,1,53.81,7.08],[182,1,45.67,7.02],[182,1,54.33,7.02],[183,1,45.06,7.05],[183,1,54.94,7.05],[184,1,44.74,7.16],[184,1,55.26,7.16],[185,1,45.94,11.21],[185,1,54.06,11.21],[186,1,46.16,13.59],[186,1,53.84,13.59],[187,1,45.52,15.84],[187,1,54.48,15.84],[188,1,44.94,17.51],[188,1,55.06,17.51],[189,1,43.94,19.33],[189,1,56.06,19.33],[190,1,42.99,21.46],[190,1,57.01,21.46],[191,1,43.03,23.1],[191,1,56.97,23.1],[192,1,43.08,24.23],[192,1,56.92,24.23],[193,1,43.12,25.23],[193,1,56.88,25.23],[194,1,43.16,26.26],[194,1,56.84,26.26],[195,1,43.21,27.27],[195,1,56.79,27.27],[196,1,43.26,28.43],[196,1,56.74,28.43],[197,1,43.33,29.72],[197,1,56.67,29.72],[198,1,43.41,31.01],[198,1,56.59,31.01],[199,1,43.5,32.32],[199,1,56.5,32.32],[200,1,43.6,33.61],[200,1,56.4,33.61],[201,1,43.65,35.1],[201,1,56.35,35.1],[202,1,43.37,37.67],[202,1,56.63,37.67],[203,1,43.11,40.24],[203,1,56.89,40.24],[204,1,42.89,42.8],[204,1,57.11,42.8],[205,1,42.68,45.35],[205,1,57.32,45.35],[206,1,45.06,46.57],[206,1,54.94,46.57],[207,1,45.83,47.81],[207,1,54.17,47.81],[208,1,46.63,49.03],[208,1,53.37,49.03],[209,1,47.47,49.72],[209,1,52.53,49.72],[210,1,48.36,50.26],[210,1,51.64,50.26],[211,1,45.54,52.46],[211,1,54.46,52.46],[212,1,45.06,56.8],[212,1,54.94,56.8],[213,1,44.78,61.15],[213,1,55.22,61.15],[214,1,44.34,65.5],[214,1,55.66,65.5],[215,1,43.71,69.84],[215,1,56.29,69.84],[216,1,40.91,18.98],[216,1,59.09,18.98],[217,1,39.11,21.7],[217,1,60.89,21.7],[218,1,39.72,23.62],[218,1,60.28,23.62],[219,1,39.81,24.92],[219,1,60.19,24.92],[220,1,39.89,26.21],[220,1,60.11,26.21],[221,1,39.98,27.52],[221,1,60.02,27.52],[222,1,40.1,29.1],[222,1,59.9,29.1],[223,1,40.24,30.76],[223,1,59.76,30.76],[224,1,40.41,32.42],[224,1,59.59,32.42],[225,1,40.6,34.07],[225,1,59.4,34.07],[226,1,40.35,36.69],[226,1,59.65,36.69],[227,1,39.86,39.98],[227,1,60.14,39.98],[228,1,39.43,43.28],[228,1,60.57,43.28],[229,1,39.04,46.57],[229,1,60.96,46.57],[230,1,43.71,72.37],[230,1,56.29,72.37],[231,1,43.96,74.39],[231,1,56.04,74.39],[232,1,44.15,76.45],[232,1,55.85,76.45],[233,1,44.34,78.47],[233,1,55.66,78.47],[234,1,44.34,80.54],[234,1,55.66,80.54],[235,1,44.34,82.75],[235,1,55.66,82.75],[236,1,44.52,84.99],[236,1,55.48,84.99],[237,1,44.91,87.25],[237,1,55.09,87.25],[238,1,44.34,90.51],[238,1,55.66,90.51],[239,1,43.51,93.2],[239,1,56.49,93.2],[240,1,43.76,95.1],[240,1,56.64,95.1],[241,1,42.65,95.64],[241,1,57.75,95.64],[242,1,41.29,95.7],[242,1,59.11,95.7],[280,1,30.23,59.76],[280,1,69.77,59.76],[281,1,29.4,52.85],[281,1,70.0,52.85],[282,1,31.5,44.74],[282,1,68.7,44.74],[283,1,32.6,40.66],[283,1,67.4,40.66],[284,1,33.1,38.45],[284,1,66.8,38.45],[285,1,33.62,36.06],[285,1,66.38,36.06],[286,1,38.04,29.07],[286,1,61.96,29.07],[287,1,38.31,27.64],[287,1,61.69,27.64],[288,1,38.59,26.48],[288,1,61.41,26.48],[289,1,38.88,25.32],[289,1,61.12,25.32],[290,1,39.14,24.15],[290,1,60.86,24.15],[291,1,39.11,22.8],[291,1,60.89,22.8],[292,1,39.18,20.79],[292,1,60.82,20.79],[293,1,40.93,18.53],[293,1,59.07,18.53],[294,1,44.58,16.79],[294,1,55.42,16.79],[295,1,46.46,15.03],[295,1,53.54,15.03],[296,1,47.57,11.79],[296,1,52.43,11.79],[297,1,47.41,10.32],[297,1,52.59,10.32],[298,1,46.8,8.98],[298,1,53.2,8.98],[299,1,45.95,7.73],[299,1,54.05,7.73],[303,1,48.79,9.44],[303,1,51.21,9.44],[304,1,48.38,9.04],[304,1,51.62,9.04],[305,1,47.94,8.64],[305,1,52.06,8.64],[306,1,47.53,8.27],[306,1,52.47,8.27],[307,1,47.0,7.89],[307,1,53.0,7.89],[308,1,46.52,7.56],[308,1,53.48,7.56],[309,1,46.03,7.22],[309,1,53.97,7.22],[310,1,45.46,7.39],[310,1,54.54,7.39],[311,1,44.86,7.67],[311,1,55.14,7.67],[312,1,44.82,8.1],[312,1,55.18,8.1],[313,1,44.94,8.61],[313,1,55.06,8.61],[314,1,45.06,9.1],[314,1,54.94,9.1],[315,1,45.22,9.58],[315,1,54.78,9.58],[316,1,45.52,10.03],[316,1,54.48,10.03],[317,1,45.93,10.52],[317,1,54.07,10.52],[318,1,46.23,11.0],[318,1,53.77,11.0],[319,1,46.16,11.58],[319,1,53.84,11.58],[320,1,45.98,12.5],[320,1,54.02,12.5],[321,1,45.65,13.75],[321,1,54.35,13.75],[322,1,45.02,14.92],[322,1,54.98,14.92],[323,1,40.91,18.98],[323,1,59.09,18.98],[324,1,36.3,53.4],[324,1,63.7,53.4],[24,1,50.0,51.11],[25,1,50.0,47.81],[26,1,50.0,44.13],[27,1,50.0,40.48],[28,1,50.0,36.82],[29,1,50.0,33.92],[30,1,50.0,32.08],[31,1,50.0,30.24],[32,1,50.0,28.4],[33,1,50.0,26.81],[34,1,50.0,25.36],[35,1,50.0,23.91],[36,1,50.0,21.95],[37,1,50.0,18.98],[38,1,50.0,16.12],[39,1,50.0,14.2],[40,1,50.0,11.55],[41,1,50.0,10.29],[42,1,50.0,9.15],[43,1,50.0,7.16],[44,1,50.0,6.96],[45,1,50.0,6.83],[46,1,50.0,6.7],[47,1,50.0,6.56]];
const STAR_DOTS_M=[[52,0,34.7,26.92],[52,0,65.3,26.92],[53,0,34.7,26.92],[53,0,65.3,26.92],[54,0,33.63,28.5],[54,0,66.37,28.5],[55,0,32.55,30.12],[55,0,67.45,30.12],[56,0,32.13,33.07],[56,0,67.87,33.07],[57,0,31.33,35.52],[57,0,68.67,35.52],[58,0,29.43,38.28],[58,0,70.57,38.28],[59,0,26.62,41.02],[59,0,73.38,41.02],[60,0,22.54,44.53],[60,0,77.46,44.53],[61,0,11.31,49.87],[61,0,88.89,49.76],[62,0,7.29,51.22],[62,0,92.61,51.0],[82,0,46.65,18.09],[82,0,53.35,18.09],[83,0,47.13,15.98],[83,0,52.87,15.98],[84,0,45.79,17.58],[84,0,54.21,17.58],[85,0,45.17,19.24],[85,0,54.83,19.24],[86,0,44.74,17.29],[86,0,55.26,17.29],[87,0,44.26,15.34],[87,0,55.74,15.34],[88,0,46.12,13.49],[88,0,53.88,13.49],[89,0,44.45,15.39],[89,0,55.55,15.39],[90,0,45.12,17.29],[90,0,54.88,17.29],[91,0,45.79,19.19],[91,0,54.21,19.19],[92,0,45.91,21.08],[92,0,54.09,21.08],[93,0,45.27,23.1],[93,0,54.73,23.1],[94,0,43.56,25.24],[94,0,56.44,25.24],[95,0,42.07,26.59],[95,0,57.93,26.59],[96,0,41.68,27.76],[96,0,58.32,27.76],[97,0,41.4,28.93],[97,0,58.6,28.93],[98,0,41.11,30.09],[98,0,58.89,30.09],[99,0,40.93,31.26],[99,0,59.07,31.26],[100,0,40.96,32.44],[100,0,59.04,32.44],[101,0,41.0,34.04],[101,0,59.0,34.04],[102,0,41.04,35.63],[102,0,58.96,35.63],[103,0,41.08,37.23],[103,0,58.92,37.23],[104,0,41.23,38.81],[104,0,58.77,38.81],[105,0,41.69,41.44],[105,0,58.31,41.44],[106,0,42.22,44.45],[106,0,57.78,44.45],[107,0,42.69,46.77],[107,0,57.31,46.77],[108,0,46.01,49.09],[108,0,53.99,49.09],[109,0,46.14,51.41],[109,0,53.86,51.41],[110,0,46.17,53.72],[110,0,53.83,53.72],[111,0,46.14,56.21],[111,0,53.86,56.21],[112,0,46.11,59.34],[112,0,53.89,59.34],[113,0,46.07,62.47],[113,0,53.93,62.47],[114,0,46.04,65.6],[114,0,53.96,65.6],[115,0,46.0,68.56],[115,0,54.0,68.56],[116,0,46.03,70.56],[116,0,53.97,70.56],[117,0,46.06,72.57],[117,0,53.94,72.57],[118,0,46.09,74.58],[118,0,53.91,74.58],[119,0,46.11,76.59],[119,0,53.89,76.59],[120,0,46.14,78.59],[120,0,53.86,78.59],[121,0,46.16,80.6],[121,0,53.84,80.6],[122,0,46.19,83.37],[122,0,53.81,83.37],[123,0,46.21,86.39],[123,0,53.79,86.39],[124,0,46.0,90.58],[124,0,54.0,90.58],[125,0,45.64,94.12],[125,0,54.36,94.12],[126,0,45.27,95.64],[126,0,54.73,95.64],[127,0,44.9,95.84],[127,0,55.1,95.84],[128,0,46.9,95.66],[128,0,53.1,95.66],[129,0,45.67,95.21],[129,0,54.33,95.21],[130,0,44.42,90.32],[130,0,55.58,90.32],[131,0,43.81,84.59],[131,0,56.19,84.59],[132,0,43.67,80.34],[132,0,56.33,80.34],[133,0,43.52,77.22],[133,0,56.48,77.22],[134,0,43.37,74.11],[134,0,56.63,74.11],[135,0,43.24,71.02],[135,0,56.76,71.02],[136,0,43.14,67.72],[136,0,56.86,67.72],[137,0,43.2,62.8],[137,0,56.8,62.8],[138,0,43.26,57.94],[138,0,56.74,57.94],[139,0,43.3,53.72],[139,0,56.7,53.72],[140,0,43.22,50.13],[140,0,56.78,50.13],[141,0,38.92,46.53],[141,0,61.08,46.53],[142,0,38.24,42.53],[142,0,61.76,42.53],[143,0,36.98,38.48],[143,0,63.02,38.48],[144,0,38.28,36.0],[144,0,61.72,36.0],[145,0,34.87,33.57],[145,0,65.13,33.57],[146,0,33.49,31.43],[146,0,66.51,31.43],[147,0,32.08,31.05],[147,0,67.92,31.05],[148,0,30.56,33.26],[148,0,69.44,33.26],[149,0,37.75,27.91],[149,0,62.25,27.91],[150,0,36.57,29.52],[150,0,63.43,29.52],[151,0,35.4,31.13],[151,0,64.6,31.13],[152,0,34.26,32.88],[152,0,65.74,32.88],[153,0,33.7,37.27],[153,0,66.3,37.27],[154,0,31.12,40.01],[154,0,68.88,40.01],[155,0,28.38,42.75],[155,0,71.62,42.75],[156,0,17.17,51.93],[156,0,83.03,51.93],[157,0,14.8,56.0],[157,0,85.2,56.0],[173,0,46.77,20.63],[173,0,53.23,20.63],[174,0,47.46,19.06],[174,0,52.54,19.06],[175,0,47.61,17.46],[175,0,52.39,17.46],[176,0,48.56,16.4],[176,0,51.44,16.4],[243,0,48.09,15.55],[243,0,51.91,15.55],[244,0,44.8,94.08],[244,0,55.2,94.08],[245,0,46.06,92.46],[245,0,53.94,92.46],[246,0,47.41,87.31],[246,0,52.59,87.31],[247,0,47.64,82.99],[247,0,52.36,82.99],[248,0,47.66,79.7],[248,0,52.34,79.7],[249,0,47.68,77.05],[249,0,52.32,77.05],[250,0,47.7,74.4],[250,0,52.3,74.4],[251,0,47.72,71.76],[251,0,52.28,71.76],[252,0,47.72,69.11],[252,0,52.28,69.11],[253,0,47.75,65.46],[253,0,52.25,65.46],[254,0,47.8,61.4],[254,0,52.2,61.4],[255,0,47.85,57.27],[255,0,52.15,57.27],[256,0,47.89,53.76],[256,0,52.11,53.76],[257,0,47.89,50.71],[257,0,52.11,50.71],[258,0,45.87,47.66],[258,0,54.13,47.66],[259,0,44.52,44.56],[259,0,55.48,44.56],[260,0,44.2,40.54],[260,0,55.8,40.54],[261,0,44.07,37.84],[261,0,55.93,37.84],[262,0,44.03,35.73],[262,0,55.97,35.73],[263,0,43.99,33.63],[263,0,56.01,33.63],[264,0,43.96,31.73],[264,0,56.04,31.73],[265,0,43.94,30.19],[265,0,56.06,30.19],[266,0,43.92,28.65],[266,0,56.08,28.65],[267,0,43.91,27.09],[267,0,56.09,27.09],[268,0,44.4,25.37],[268,0,55.6,25.37],[269,0,45.7,22.54],[269,0,54.3,22.54],[270,0,47.13,19.78],[270,0,52.87,19.78],[271,0,35.89,27.91],[271,0,64.11,27.91],[272,0,34.83,29.42],[272,0,65.17,29.42],[273,0,33.74,30.98],[273,0,66.26,30.98],[274,0,33.39,34.26],[274,0,66.61,34.26],[275,0,32.27,36.97],[275,0,67.73,36.97],[276,0,29.73,39.67],[276,0,70.27,39.67],[277,0,26.95,42.4],[277,0,73.05,42.4],[278,0,14.58,51.42],[278,0,85.22,51.31],[279,0,11.01,55.66],[279,0,88.49,55.98],[300,0,48.09,15.98],[300,0,51.91,15.98],[301,0,47.08,14.96],[301,0,52.92,14.96],[302,0,46.17,13.86],[302,0,53.83,13.86],[325,0,31.25,30.77],[325,0,68.75,30.77],[326,0,32.35,33.16],[326,0,67.65,33.16],[327,0,33.72,36.17],[327,0,66.28,36.17],[328,0,38.85,36.82],[328,0,61.15,36.82],[329,0,37.83,39.53],[329,0,62.17,39.53],[330,0,37.52,44.6],[330,0,62.48,44.6],[331,0,40.18,48.35],[331,0,59.82,48.35],[332,0,43.25,52.14],[332,0,56.75,52.14],[333,0,43.18,64.26],[333,0,56.82,64.26],[334,0,43.14,67.53],[334,0,56.86,67.53],[335,0,43.2,69.88],[335,0,56.8,69.88],[336,0,43.28,72.01],[336,0,56.72,72.01],[337,0,43.37,74.11],[337,0,56.63,74.11],[338,0,43.47,76.2],[338,0,56.53,76.2],[339,0,43.57,78.29],[339,0,56.43,78.29],[340,0,43.67,80.38],[340,0,56.33,80.38],[341,0,43.77,83.25],[341,0,56.23,83.25],[342,0,43.87,86.39],[342,0,56.13,86.39],[343,0,43.63,90.69],[343,0,56.37,90.69],[344,0,43.16,94.04],[344,0,56.84,94.04],[345,0,42.66,95.39],[345,0,57.34,95.39],[346,0,42.2,95.6],[346,0,57.8,95.6],[347,0,46.2,95.78],[347,0,53.8,95.78],[348,0,45.96,93.75],[348,0,54.04,93.75],[349,0,45.73,85.1],[349,0,54.27,85.1],[350,0,45.64,79.27],[350,0,54.36,79.27],[351,0,45.55,74.75],[351,0,54.45,74.75],[352,0,45.46,70.22],[352,0,54.54,70.22],[353,0,45.47,64.33],[353,0,54.53,64.33],[354,0,45.56,57.27],[354,0,54.44,57.27],[355,0,45.56,51.6],[355,0,54.44,51.6],[356,0,36.94,46.37],[356,0,63.06,46.37],[357,0,37.93,40.08],[357,0,62.07,40.08],[358,0,38.38,36.14],[358,0,61.62,36.14],[359,0,36.64,32.54],[359,0,63.36,32.54],[360,0,37.88,29.9],[360,0,62.12,29.9],[48,0,50.0,17.67],[49,0,50.0,18.73],[50,0,50.0,19.57],[51,0,50.0,20.21],[0,0,50.0,52.6],[1,0,50.0,52.64],[2,0,50.0,50.17],[3,0,50.0,47.7],[4,0,50.0,45.74],[5,0,50.0,43.71],[6,0,50.0,40.96],[7,0,50.0,38.48],[8,0,50.0,36.44],[9,0,50.0,34.41],[10,0,50.0,32.72],[11,0,50.0,31.39],[12,0,50.0,30.14],[13,0,50.0,28.9],[14,0,50.0,27.91],[15,0,50.0,26.92],[16,0,50.0,25.82],[17,0,50.0,24.29],[18,0,50.0,22.91],[19,0,50.0,21.52],[20,0,50.0,20.21],[21,0,50.0,18.94],[22,0,50.0,17.24],[23,0,50.0,15.98],[63,1,26.51,60.31],[63,1,73.49,60.31],[64,1,27.38,56.8],[64,1,72.62,56.8],[65,1,26.61,49.69],[65,1,73.39,49.69],[66,1,26.62,41.53],[66,1,73.38,41.53],[67,1,27.71,39.4],[67,1,72.29,39.4],[68,1,28.62,37.37],[68,1,71.38,37.37],[69,1,33.76,34.59],[69,1,66.24,34.59],[70,1,34.53,32.65],[70,1,65.47,32.65],[71,1,34.75,30.95],[71,1,65.25,30.95],[72,1,35.03,29.45],[72,1,64.97,29.45],[73,1,35.35,27.98],[73,1,64.65,27.98],[74,1,35.7,26.47],[74,1,64.3,26.47],[75,1,36.08,25.01],[75,1,63.92,25.01],[76,1,36.33,23.58],[76,1,63.67,23.58],[77,1,37.75,22.26],[77,1,62.25,22.26],[78,1,41.47,20.72],[78,1,58.53,20.72],[79,1,44.9,19.0],[79,1,55.1,19.0],[80,1,46.81,16.44],[80,1,53.19,16.44],[81,1,47.61,14.02],[81,1,52.39,14.02],[158,1,24.47,60.1],[158,1,75.53,60.1],[159,1,22.09,51.42],[159,1,77.91,51.42],[160,1,26.03,42.42],[160,1,73.97,42.42],[161,1,24.25,39.31],[161,1,75.75,39.31],[162,1,25.42,36.82],[162,1,74.58,36.82],[163,1,26.58,34.37],[163,1,73.42,34.37],[164,1,26.61,31.97],[164,1,73.39,31.97],[165,1,31.34,29.61],[165,1,68.66,29.61],[166,1,31.56,27.83],[166,1,68.44,27.83],[167,1,31.82,26.07],[167,1,68.18,26.07],[168,1,31.75,26.6],[168,1,68.25,26.6],[169,1,31.6,27.54],[169,1,68.4,27.54],[170,1,31.88,25.73],[170,1,68.12,25.73],[171,1,32.19,24.01],[171,1,67.81,24.01],[172,1,38.9,22.26],[172,1,61.1,22.26],[177,1,47.13,11.71],[177,1,52.87,11.71],[178,1,46.74,10.97],[178,1,53.26,10.97],[179,1,46.37,10.27],[179,1,53.63,10.27],[180,1,45.98,9.53],[180,1,54.02,9.53],[181,1,45.5,9.27],[181,1,54.5,9.27],[182,1,44.88,9.17],[182,1,55.12,9.17],[183,1,44.17,9.22],[183,1,55.83,9.22],[184,1,43.78,9.39],[184,1,56.22,9.39],[185,1,44.63,15.95],[185,1,55.37,15.95],[186,1,44.5,18.27],[186,1,55.5,18.27],[187,1,43.23,20.12],[187,1,56.77,20.12],[188,1,42.07,21.68],[188,1,57.93,21.68],[189,1,40.57,23.2],[189,1,59.43,23.2],[190,1,39.96,24.51],[190,1,60.04,24.51],[191,1,40.1,25.82],[191,1,59.9,25.82],[192,1,40.25,27.14],[192,1,59.75,27.14],[193,1,40.4,28.45],[193,1,59.6,28.45],[194,1,40.56,29.76],[194,1,59.44,29.76],[195,1,40.72,31.08],[195,1,59.28,31.08],[196,1,40.91,32.57],[196,1,59.09,32.57],[197,1,41.13,34.23],[197,1,58.87,34.23],[198,1,41.36,35.89],[198,1,58.64,35.89],[199,1,41.6,37.6],[199,1,58.4,37.6],[200,1,41.85,39.26],[200,1,58.15,39.26],[201,1,42.09,40.96],[201,1,57.91,40.96],[202,1,42.01,43.1],[202,1,57.99,43.1],[203,1,41.93,45.25],[203,1,58.07,45.25],[204,1,41.85,47.38],[204,1,58.15,47.38],[205,1,41.77,49.53],[205,1,58.23,49.53],[206,1,44.49,50.55],[206,1,55.51,50.55],[207,1,45.39,51.57],[207,1,54.61,51.57],[208,1,46.29,52.59],[208,1,53.71,52.59],[209,1,47.21,53.61],[209,1,52.79,53.61],[210,1,48.13,54.51],[210,1,51.87,54.51],[211,1,44.65,56.69],[211,1,55.35,56.69],[212,1,44.01,60.21],[212,1,55.99,60.21],[213,1,43.58,63.74],[213,1,56.42,63.74],[214,1,42.93,67.28],[214,1,57.07,67.28],[215,1,42.03,70.8],[215,1,57.97,70.8],[216,1,35.65,22.98],[216,1,64.35,22.98],[217,1,34.41,24.66],[217,1,65.59,24.66],[218,1,34.7,26.36],[218,1,65.3,26.36],[219,1,35.0,28.04],[219,1,65.0,28.04],[220,1,35.3,29.71],[220,1,64.7,29.71],[221,1,35.63,31.39],[221,1,64.37,31.39],[222,1,36.04,33.44],[222,1,63.96,33.44],[223,1,36.49,35.58],[223,1,63.51,35.58],[224,1,36.96,37.72],[224,1,63.04,37.72],[225,1,37.47,39.86],[225,1,62.53,39.86],[226,1,37.62,42.29],[226,1,62.38,42.29],[227,1,37.46,45.04],[227,1,62.54,45.04],[228,1,37.3,47.79],[228,1,62.7,47.79],[229,1,37.14,50.55],[229,1,62.86,50.55],[230,1,42.0,73.06],[230,1,58.0,73.06],[231,1,42.32,75.17],[231,1,57.68,75.17],[232,1,42.56,77.33],[232,1,57.44,77.33],[233,1,42.8,79.43],[233,1,57.2,79.43],[234,1,42.8,81.58],[234,1,57.2,81.58],[235,1,42.8,83.89],[235,1,57.2,83.89],[236,1,43.04,86.22],[236,1,56.96,86.22],[237,1,43.52,88.57],[237,1,56.48,88.57],[238,1,42.8,91.97],[238,1,57.2,91.97],[239,1,41.74,94.25],[239,1,58.26,94.25],[240,1,40.54,95.55],[240,1,59.46,95.55],[241,1,39.13,95.92],[241,1,60.87,95.92],[242,1,37.4,95.96],[242,1,62.6,95.96],[280,1,25.57,60.1],[280,1,74.43,60.1],[281,1,24.63,53.5],[281,1,75.37,53.5],[282,1,24.57,44.64],[282,1,75.43,44.64],[283,1,25.53,40.2],[283,1,74.47,40.2],[284,1,26.54,38.12],[284,1,73.46,38.12],[285,1,27.46,36.1],[285,1,72.54,36.1],[286,1,32.76,33.4],[286,1,67.24,33.4],[287,1,32.9,31.55],[287,1,67.1,31.55],[288,1,33.11,30.04],[288,1,66.89,30.04],[289,1,33.35,28.55],[289,1,66.65,28.55],[290,1,33.63,27.04],[290,1,66.37,27.04],[291,1,33.93,25.57],[291,1,66.07,25.57],[292,1,34.24,24.1],[292,1,65.76,24.1],[293,1,35.56,22.64],[293,1,64.44,22.64],[294,1,41.63,20.98],[294,1,58.37,20.98],[295,1,44.74,19.46],[295,1,55.26,19.46],[296,1,46.66,16.88],[296,1,53.34,16.88],[297,1,46.8,14.52],[297,1,53.2,14.52],[298,1,46.22,12.35],[298,1,53.78,12.35],[299,1,45.22,10.31],[299,1,54.78,10.31],[303,1,48.56,13.1],[303,1,51.44,13.1],[304,1,48.09,12.45],[304,1,51.91,12.45],[305,1,47.56,11.8],[305,1,52.44,11.8],[306,1,47.08,11.19],[306,1,52.92,11.19],[307,1,46.46,10.59],[307,1,53.54,10.59],[308,1,45.89,10.04],[308,1,54.11,10.04],[309,1,45.31,9.49],[309,1,54.69,9.49],[310,1,44.65,9.76],[310,1,55.35,9.76],[311,1,43.93,10.23],[311,1,56.07,10.23],[312,1,43.87,10.92],[312,1,56.13,10.92],[313,1,44.02,11.75],[313,1,55.98,11.75],[314,1,44.17,12.54],[314,1,55.83,12.54],[315,1,44.35,13.32],[315,1,55.65,13.32],[316,1,44.59,14.07],[316,1,55.41,14.07],[317,1,44.88,14.85],[317,1,55.12,14.85],[318,1,45.08,15.61],[318,1,54.92,15.61],[319,1,44.8,16.54],[319,1,55.2,16.54],[320,1,44.37,17.42],[320,1,55.63,17.42],[321,1,43.75,18.4],[321,1,56.25,18.4],[322,1,42.63,19.36],[322,1,57.37,19.36],[323,1,35.65,22.98],[323,1,64.35,22.98],[324,1,34.42,55.23],[324,1,65.58,55.23],[24,1,50.0,55.6],[25,1,50.0,51.57],[26,1,50.0,48.5],[27,1,50.0,45.44],[28,1,50.0,42.39],[29,1,50.0,39.66],[30,1,50.0,37.28],[31,1,50.0,34.9],[32,1,50.0,32.53],[33,1,50.0,30.49],[34,1,50.0,28.6],[35,1,50.0,26.73],[36,1,50.0,24.85],[37,1,50.0,22.98],[38,1,50.0,20.35],[39,1,50.0,18.76],[40,1,50.0,16.49],[41,1,50.0,14.47],[42,1,50.0,12.62],[43,1,50.0,9.39],[44,1,50.0,9.07],[45,1,50.0,8.86],[46,1,50.0,8.65],[47,1,50.0,8.43]];

const starLit = () => C.SZ_SEATS.reduce((n, _, i) => n + C.szSeatLitNames(S, i), 0); // v993：已亮穴名数（神藏进度派生）
function szSpiralSvg(frac, full, size) {
  let pts = '';
  for (let i = 0; i <= 60; i++) { const t = i / 60, a = t * Math.PI * 2 * 2.2 - Math.PI / 2, r = 15 * (0.15 + 0.85 * t); pts += `${(17 + r * Math.cos(a)).toFixed(1)},${(17 + r * Math.sin(a)).toFixed(1)} `; }
  return `<svg width="${size}" height="${size}" viewBox="0 0 34 34"><polyline points="${pts}" fill="none" stroke="rgba(120,126,160,.55)" stroke-width="2" stroke-linecap="round"/><polyline points="${pts}" fill="none" stroke="#ffd76a" stroke-width="2" stroke-linecap="round" pathLength="100" stroke-dasharray="${Math.round(frac * 100)} 100" ${full ? 'style="filter:drop-shadow(0 0 3px rgba(255,205,92,.8))"' : ''}/></svg>`;
}
function starChartHtml() {
  if (typeof C.szSyncMai === 'function') C.szSyncMai(S);
  const g = S.gender === 'f' ? 'f' : 'm';
  const view = window._starView === 'back' ? 1 : 0;
  const DOTS = g === 'f' ? STAR_DOTS_F : STAR_DOTS_M;
  const sidesOf = nm => { const cs = DOTS.filter(d => d[0] === nm && d[1] === view); if (!cs.length) return null; if (cs.length === 1) return [cs[0]]; const a = cs.reduce((p2, c) => (c[2] < p2[2] ? c : p2)); const b = cs.reduce((p2, c) => (c[2] > p2[2] ? c : p2)); return [a, b]; };
  // v1101 成对亮点：单侧经每穴左右成对亮（男先左、女先右），任督先任后督；亮点以 dot 对象计
  const litDots = new Set();
  C.SZ_SEATS.forEach((st, i) => { const names = []; STAR_NMER.forEach((m, ni) => { if (st.mer.includes(m)) names.push(ni); }); names.sort((x, y) => x - y); const d = C.szDan(S, i); if (st.mer.length > 1) { for (let j = 0; j < Math.min(24, d); j++) { const s = sidesOf(names[j]); if (s) s.forEach(dd => litDots.add(dd)); } for (let j = 24; j < 24 + Math.min(28, Math.max(0, d - 24)); j++) { const s = sidesOf(names[j]); if (s) s.forEach(dd => litDots.add(dd)); } } else { const first = (g === 'f') ? 1 : 0; for (let k = 0; k < Math.min(st.cnt * 2, d); k++) { const s = sidesOf(names[Math.floor(k / 2)]); if (s) litDots.add(s[(k % 2 === 0) ? first : 1 - first] || s[0]); } } });
  const lit = S.maiVLuo | 0;
  const MCOL = [{ c: '#ffe08a', g: 'rgba(255,224,138,' }, { c: '#ffb03a', g: 'rgba(255,176,58,' }, { c: '#e8ecf4', g: 'rgba(232,236,244,' }, { c: '#b9c4d6', g: 'rgba(185,196,214,' }, { c: '#d9b45b', g: 'rgba(217,180,91,' }, { c: '#f2a541', g: 'rgba(242,165,65,' }, { c: '#ff5a5a', g: 'rgba(255,90,90,' }, { c: '#ff8a5c', g: 'rgba(255,138,92,' }, { c: '#4dc9ff', g: 'rgba(77,201,255,' }, { c: '#5a7bff', g: 'rgba(90,123,255,' }, { c: '#ff6fa5', g: 'rgba(255,111,165,' }, { c: '#c95eff', g: 'rgba(201,94,255,' }, { c: '#2fd4c4', g: 'rgba(47,212,196,' }, { c: '#8be04e', g: 'rgba(139,224,78,' }]; // v1051 每经一色（五行配色）：任 督 肺 大肠 胃 脾 心 小肠 膀胱 肾 心包 三焦 胆 肝
  const goldAll = (S.maiVLuo | 0) >= 670; // v1100：整图 670 穴全亮→全变金色（只认丹穴；气旋不点亮穴位）
  const GOLD = { c: '#ffd76a', g: 'rgba(255,205,92,' };
  let linesSvg = ''; // v1051 Ye 定：丹点满一条经络→黄线相连，没满不连（双侧经一侧一条；任督各一条）
  { const chains = [];
    C.SZ_SEATS.forEach((st, i) => { // v1101：连线认丹穴（单侧经满座两侧线同出，任督各满各连）
      const names = []; STAR_NMER.forEach((m, ni) => { if (st.mer.includes(m)) names.push(ni); }); names.sort((x, y) => x - y);
      const chainOf = (list, sIdx) => list.map(nm => { const s = sidesOf(nm); return s ? (s[sIdx] || s[0]) : null; }).filter(Boolean);
      const d = C.szDan(S, i);
      if (st.mer.length > 1) { if (d >= 24) chains.push({ mer: 0, pts: chainOf(names.slice(0, 24), 0) }); if (d >= 52) chains.push({ mer: 1, pts: chainOf(names.slice(24), 0) }); }
      else { if (d >= st.cnt * 2) { chains.push({ mer: st.mer[0], pts: chainOf(names, 0) }); chains.push({ mer: st.mer[0], pts: chainOf(names, 1) }); } }
    });
    const good = chains.filter(ch => ch.pts.length >= 2);
    if (good.length) linesSvg = `<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 100 100" preserveAspectRatio="none">${good.map(ch => `<polyline points="${ch.pts.map(d => d[2] + ',' + d[3]).join(' ')}" fill="none" stroke="${goldAll ? GOLD.c : MCOL[ch.mer].c}" stroke-opacity=".95" stroke-width="2.2" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/>`).join('')}</svg>`;
  }
  const fullSeats = C.szOpenCount(S);
  const grand = fullSeats >= 13;
  const cur = C.SZ_SEATS.findIndex((_, i) => C.szProg(S, i) < 10);
  let sel = (window._starSeat === undefined) ? C.szFirstDanOpen(S) : window._starSeat; if (sel < 0) sel = 12; // v1121 默认卡=首个需喂丹的经（满丹的任督卡无喂丹按钮，吃不了丹）
  let inner = linesSvg, frontier = null;
  for (let i = 0; i < 13 && !frontier; i++) { if (C.szProg(S, i) >= 10) continue; const st = C.SZ_SEATS[i]; const names = []; STAR_NMER.forEach((m, ni) => { if (st.mer.includes(m)) names.push(ni); }); names.sort((x, y) => x - y); const d = C.szDan(S, i); const cap = st.mer.length > 1 ? 52 : st.cnt * 2; if (d >= cap) continue; let nm, side; if (st.mer.length > 1) { nm = names[d]; side = 0; } else { nm = names[Math.floor(d / 2)]; const first = (g === 'f') ? 1 : 0; side = (d % 2 === 0) ? first : 1 - first; } const s = sidesOf(nm); if (s) frontier = s[side] || s[0]; }
  DOTS.forEach((d, di) => {
    if (d[1] !== view || !litDots.has(d)) return;
    const seatIdx = C.SZ_SEATS.findIndex(st => st.mer.includes(STAR_NMER[d[0]]));
    const full = C.szProg(S, seatIdx) >= 10 || C.szDan(S, seatIdx) >= C.szDanCap(seatIdx); // v1100 满座柔光：气旋满或丹穴满座（双侧满）
    const h = (di * 2654435761 % 100 + 100) % 100;
    const r = (full ? 7 : 5) + (h % 4);
    const mer0 = STAR_NMER[d[0]]; const mc = goldAll ? GOLD : MCOL[mer0]; // v1056：整图全亮时金色
    const col = mc.c, glowC = mc.g;
    const glow = full ? `;box-shadow:0 0 6px 1px ${glowC}.6)` : (h > 62 ? `;box-shadow:0 0 ${3 + (h % 4)}px 1px ${glowC}.5)` : ''); // v1051 Ye 定：点位光晕缩小
    inner += `<span style="position:absolute;left:${d[2]}%;top:${d[3]}%;width:${r}px;height:${r}px;margin:${(-r / 2).toFixed(1)}px 0 0 ${(-r / 2).toFixed(1)}px;border-radius:50%;background:${col}${glow}"></span>`;
  });
  { // v1054 Ye 定：开脉丹线也给一个「下一个穴」标记，用蓝色（落在当前选中座，丹未满时）
    const st = C.SZ_SEATS[sel]; const dn = C.szDan(S, sel); const cap = st.mer.length > 1 ? 52 : st.cnt * 2;
    if (dn > 0 && dn < cap) { const names = []; STAR_NMER.forEach((m, ni) => { if (st.mer.includes(m)) names.push(ni); }); names.sort((x, y) => x - y); let dd = null; if (st.mer.length > 1) { if (dn < names.length) { const s = sidesOf(names[dn]); dd = s ? s[0] : null; } } else { const nm = names[Math.floor(dn / 2)]; const s = sidesOf(nm); const first = (g === 'f') ? 1 : 0; const side = (dn % 2 === 0) ? first : 1 - first; dd = s ? (s[side] || s[0]) : null; } if (dd) inner += `<span style="position:absolute;left:${dd[2]}%;top:${dd[3]}%;width:15px;height:15px;margin:-7.5px 0 0 -7.5px;border:2px solid rgba(94,168,255,.95);border-radius:50%;animation:starPulse 2.2s ease-out infinite"></span><span style="position:absolute;left:${dd[2]}%;top:${dd[3]}%;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;background:#5ea8ff"></span>`; }
  }
  if (frontier) inner += `<span style="position:absolute;left:${frontier[2]}%;top:${frontier[3]}%;width:19px;height:19px;margin:-9.5px 0 0 -9.5px;border:2px solid ${MCOL[STAR_NMER[frontier[0]]].g}.9);border-radius:50%;animation:starPulse 2.2s ease-out infinite"></span><span style="position:absolute;left:${frontier[2]}%;top:${frontier[3]}%;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;background:${MCOL[STAR_NMER[frontier[0]]].c}"></span>`;
  const tg = (v, lab) => `<button class="btn sm" data-starview="${v}" style="flex:1;padding:5px 0;${(view === (v === 'back' ? 1 : 0)) ? 'border-color:var(--gold);color:var(--gold)' : 'opacity:.65'}">${lab}</button>`;
  const swirl = i => { const p = C.szProg(S, i), st = C.SZ_SEATS[i]; return `<button data-seat="${i}" style="background:${i === sel ? 'rgba(255,205,92,.08)' : 'none'};border:none;padding:2px 0;cursor:pointer;display:flex;flex-direction:column;align-items:center;border-radius:8px">${szSpiralSvg(p / 10, p >= 10, 34)}<span style="font-size:11px;line-height:1.15;color:${p > 0 ? 'var(--gold)' : '#8a86a0'}">${st.merName}</span><span style="font-size:9px;color:#6d6a84">${p}/10</span></button>`; };
  const colL = C.SZ_MER_ORDER.slice(0, 7).map(swirl).join('');
  const colR = C.SZ_MER_ORDER.slice(7).map(swirl).join('') + `<div style="padding:2px 0;display:flex;flex-direction:column;align-items:center"><span style="position:relative;display:inline-block;opacity:.55">${szSpiralSvg(0, false, 34)}<span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-12deg);font-size:11px;line-height:1.2;color:#e8b4b8;border:1px solid rgba(232,180,184,.75);border-radius:3px;padding:0 2px;background:rgba(20,16,28,.6)">封</span></span><span style="font-size:11px;line-height:1.15;color:#6d6a84">封印</span><span style="font-size:9px;color:#55536b">未启</span></div>`; // v1046 主宰下封印气旋：只显示、无功能
  const sq = false; // v1032 男背已换长图，不再方形显示
  const fx = !grand ? '' : `<div style="position:absolute;inset:0;border-radius:8px;background:radial-gradient(ellipse 62% 46% at 50% 42%,rgba(255,196,74,.30),rgba(255,196,74,.10) 55%,transparent 75%);pointer-events:none"></div><div style="position:absolute;left:50%;top:${sq ? '1%' : '0.5%'};width:${sq ? '26%' : '52%'};aspect-ratio:1/1;transform:translateX(-50%);border:2px solid rgba(255,214,110,.85);border-radius:50%;box-shadow:0 0 18px rgba(255,205,92,.55),inset 0 0 14px rgba(255,205,92,.35);pointer-events:none"></div>`;
  const body = sq
    ? `<div style="position:relative;width:100%"><img src="star/${g}_back.jpg" style="width:100%;display:block;border-radius:8px">${fx}${inner}</div>`
    : `<div style="position:relative;display:inline-block;height:64vh"><img src="star/${g}${view ? '_back' : '_front'}.jpg" style="height:100%;display:block;border-radius:8px">${fx}${inner}</div>`;
  const st = C.SZ_SEATS[sel], p = C.szProg(S, sel);
  const pages = S.maiPages | 0, pills = S.inv['mai'] | 0;
  const card = p >= 10
    ? `<div style="font-size:15px"><b class="y">${st.merName}</b></div><div style="font-size:12px;color:#aaa6bd;margin-top:5px">气旋已开满 · 丹穴 ${C.szDan(S, sel)} / ${C.szDanCap(sel)}。</div>${C.szDan(S, sel) < C.szDanCap(sel) ? `<div style="display:flex;gap:8px;margin-top:10px"><button class="btn" data-pillseat="1" style="flex:1;padding:9px 0;border-color:var(--gold);color:var(--gold)" ${pills > 0 ? '' : 'disabled'}>开脉丹开一穴</button><button class="btn" data-qtyseat="pill" style="width:64px;padding:9px 0" ${pills > 0 ? '' : 'disabled'}>数量</button></div>` : ''}<div style="display:flex;gap:8px;margin-top:10px"><button class="btn gold" data-feedseat="1" style="flex:1;padding:9px 0" ${pages > 0 ? '' : 'disabled'}>吃1张残页</button><button class="btn" data-qtyseat="page" style="width:64px;padding:9px 0" ${pages > 0 ? '' : 'disabled'}>数量</button></div>`
    : `<div style="font-size:15px"><b class="y">${st.merName}</b></div><div style="font-size:12px;color:#aaa6bd;margin:5px 0 10px">气旋已开 ${p} / 10 · 再吃 ${10 - p} 张残页开满；开脉丹每颗开一穴（本经已亮 ${C.szLitCnt(S, sel)} / ${C.szDanCap(sel)} 穴）</div><div style="display:flex;gap:8px"><button class="btn gold" data-feedseat="1" style="flex:1;padding:9px 0" ${pages > 0 ? '' : 'disabled'}>吃1张残页</button><button class="btn" data-qtyseat="page" style="width:64px;padding:9px 0" ${pages > 0 ? '' : 'disabled'}>数量</button></div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" data-pillseat="1" style="flex:1;padding:9px 0;border-color:var(--gold);color:var(--gold)" ${pills > 0 && C.szDan(S, sel) < C.szDanCap(sel) ? '' : 'disabled'}>开脉丹开一穴</button><button class="btn" data-qtyseat="pill" style="width:64px;padding:9px 0" ${pills > 0 && C.szDan(S, sel) < C.szDanCap(sel) ? '' : 'disabled'}>数量</button></div>`;
  return `<style>@keyframes starPulse{0%{transform:scale(.55);opacity:1}70%{transform:scale(1.3);opacity:.2}100%{transform:scale(1.3);opacity:0}}</style>`
    + (grand ? `<div style="border:1px solid rgba(255,205,92,.75);border-radius:12px;box-shadow:0 0 22px rgba(255,190,70,.35),inset 0 0 34px rgba(255,190,70,.10);padding:8px 6px">` : `<div>`)
    + `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding-right:10px"><span style="font-size:14px">✦ <b class="y">神藏星图</b></span><span style="font-size:12px">已开 ${lit} / 670</span></div>`
    + `<div style="font-size:12px;color:#aaa6bd;margin-bottom:6px">神藏 ${fullSeats} 全开${cur < 0 ? ' · 十三经全开 · 大圆满' : ` · 第 ${C.SZ_MER_ORDER.indexOf(cur) + 1} 经开启中`}</div>`
    + `<div style="display:flex;gap:8px;margin-bottom:8px">${tg('front', '正面')}${tg('back', '背面')}</div>`
    + `<div style="display:flex;gap:2px;align-items:flex-start"><div style="display:flex;flex-direction:column;gap:2px;width:52px;flex:none">${colL}</div><div style="flex:1;text-align:center;min-width:0">${body}</div><div style="display:flex;flex-direction:column;gap:2px;width:52px;flex:none">${colR}</div></div>`
    + `<div style="display:flex;align-items:center;gap:14px;background:#1e1b2c;border-radius:8px;padding:6px 12px;margin-top:8px;font-size:12px"><span style="display:flex;align-items:center;gap:4px">${szSpiralSvg(1, false, 18)} 小气旋 ×${C.szSmallCount(S)}</span><span style="display:flex;align-items:center;gap:4px">${szSpiralSvg(1, true, 22)} 大气旋 ×${C.szBigCount(S)}</span><span>残页 ×${pages}</span><span>丹 ×${pills}</span></div>`
    + `<div style="background:#201c30;border:1px solid #46406a;border-radius:10px;padding:12px;margin-top:8px">${card}</div></div>`;
}
// v1113 点一下只吃1张，批量走数量
function doFeedSeat() { const i = (window._starSeat === undefined) ? C.SZ_SEATS.findIndex((_, x) => C.szProg(S, x) < 10) : window._starSeat; if (i < 0) return; const r = C.useMaiPages(S, 1, i); if (r.n <= 0) return; if (r.n > 0) { log('good', `🌀 吃脉络残页 ×${r.n}，<b class="y">${C.SZ_SEATS[i].merName}</b> 气旋 ${C.szProg(S, i)}/10${C.szProg(S, i) >= 10 ? '，<b class="y">神藏已开！</b>' : ''}（实络 +${r.n}${r.lvUp > 0 ? `，开脉术升级，实脉 +${r.lvUp}` : ''}）`); } commit(); sheetChar(); }
function doPillSeat() { const i = (window._starSeat === undefined) ? C.szFirstDanOpen(S) : window._starSeat; if (i < 0) return; if (C.szDan(S, i) >= C.szDanCap(i)) return; const got = C.drinkMai(S, 1, i); if (got > 0) { log('good', `🌀 服用开脉丹，<b class="y">${C.SZ_SEATS[i].merName}</b> 开一穴（已亮 ${C.szLitCnt(S, i)}/${C.szDanCap(i)} 穴）`); } commit(); sheetChar(); }
window.szQtyBack = function(bag) { if (bag) { try { sheetBag(); } catch(_) {} } else { try { sheetChar(); } catch(_) {} } };
window.szQty = function(kind, seat, bag) { // v1054 Ye 定：残页/开脉丹可选数量（游戏内选量表，不用系统 prompt）
  let max, title;
  if (kind === 'page') { if (seat < 0) seat = C.SZ_SEATS.findIndex((_, x) => C.szProg(S, x) < 10); if (seat < 0) return; max = Math.min(10 - C.szProg(S, seat), S.maiPages | 0); title = `🌀 脉络残页 · ${C.SZ_SEATS[seat].merName}（还差 ${10 - C.szProg(S, seat)} 张开满 · 库存 ${S.maiPages | 0}）`; }
  else if (seat >= 0) { max = Math.min(C.szDanCap(seat) - C.szDan(S, seat), S.inv['mai'] | 0); title = `🌀 开脉丹 · ${C.SZ_SEATS[seat].merName}（还差 ${C.szDanCap(seat) - C.szDan(S, seat)} 颗 · 库存 ${S.inv['mai'] | 0}）`; }
  else { max = S.inv['mai'] | 0; title = `🌀 开脉丹（按经络顺序服用 · 库存 ${max}）`; }
  if (max <= 0) return;
  const opts = [...new Set([1, 3, 5, 10, max].filter(n2 => n2 >= 1 && n2 <= max))].sort((a, b) => a - b);
  openSheet(`<h3 style="margin:2px 0 10px">${title}</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:8px">${opts.map(n2 => `<button class="btn ${n2 === max ? 'gold' : ''}" style="padding:10px 0" onclick="szUse('${kind}',${seat},${n2},${bag ? 1 : 0})">用 ${n2}${n2 === max ? '（全部）' : ''}</button>`).join('')}</div><button class="btn" style="width:100%;margin-top:10px;padding:9px 0" onclick="szQtyBack(${bag ? 1 : 0})">取消</button>`);
};
window.szUse = function(kind, seat, n, bag) { // v1054：按选定数量使用残页/开脉丹
  if (kind === 'page') { const r = C.useMaiPages(S, n, seat); if (r.n > 0) log('good', `🌀 吃脉络残页 ×${r.n}，<b class="y">${C.SZ_SEATS[seat].merName}</b> 气旋 ${C.szProg(S, seat)}/10${C.szProg(S, seat) >= 10 ? '，<b class="y">神藏已开！</b>' : ''}（实络 +${r.n}${r.lvUp > 0 ? `，开脉术升级，实脉 +${r.lvUp}` : ''}）`); }
  else if (seat >= 0) { const got = C.drinkMai(S, n, seat); if (got > 0) log('good', `🌀 服用开脉丹 ×${got}，<b class="y">${C.SZ_SEATS[seat].merName}</b> 已亮 ${C.szLitCnt(S, seat)}/${C.szDanCap(seat)} 穴`); }
  else { const got = C.drinkMai(S, n); if (got > 0) log('good', `🌀 服用开脉丹 ×${got}（已亮 ${C.SZ_SEATS.reduce((t, _, i) => t + C.szSeatLitNames(S, i), 0)}/670 穴）`); }
  commit();
  if (bag) { try { sheetBag(); } catch(_) {} } else { try { sheetChar(); } catch(_) {} }
};
function sheetChar() {
  const a = S.attrs, fa = C.fightAttrs(S, false);
  const hpMax = C.bumpPeak(S) * 5;
  const isXian = (S.realm|0) >= 8;
  const useMana = C.useFali(S);
  const manaMax = useMana ? C.manaMax(S) : 0;
  const page = window._charPage || 1;

  let html = ``;


  // v143 头像+升级/经验/轮回合并一行，确保都可见
  const canLv = C.canLevelUp(S);
  const needTxt = useMana ? (isXian ? `升级需 ${C.fmtN(S.mana|0)}/${C.fmtN(C.manaNeed(S, S.level))} 仙力` : `升级需 ${C.fmtN(S.mana|0)}/${C.fmtN(C.manaNeed(S, S.level))} 法力`) : (S.level >= C.REALM_MAX_LV ? `经验 ${C.fmtN(S.xp|0)}（大圆满）` : `经验 ${C.fmtN(S.xp|0)}/${C.fmtN(C.xpNeed(S.level))}`);
  const needPct = useMana ? Math.min(100, S.mana / Math.max(1, C.manaNeed(S, S.level)) * 100) : Math.min(100, (S.xp|0) / Math.max(1, C.xpNeed(S.level)) * 100);
  const checkinTxt = C.canCheckin(S) ? '<span class="y">今日未签到</span>' : '今日已签到 ✓';
  html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">${(S.protect|0) > 0 ? `<span class="y" style="font-size:12px">🛡️新人保护×${S.protect}</span>` : '<span></span>'}<span style="font-size:12px">${(S.realm|0) === 0 ? `🌪️引气入体 <b>${S.yinQi|0}</b>/10` : ((S.realm|0) >= 8 ? `⚖️法则之力 <b>${S.yinQi|0}</b>/10` : `🌀凝气 <b>${S.yinQi|0}</b>/10`)}</span><span style="font-size:12px">${checkinTxt}</span></div>`;
  html += `<div style="display:flex;gap:6px;align-items:center;margin-bottom:2px"><button data-avataredit="1" style="background:none;border:none;padding:0;flex:none;cursor:pointer" title="换头像"><img src="${avatarUrl()}" style="width:44px;height:44px;border-radius:50%;border:2px solid var(--gold);object-fit:cover;display:block"></button><div style="flex:1;min-width:0;display:flex;gap:6px;align-items:center"><button class="act primary" data-a="lvup" style="flex:none;padding:6px 8px" ${canLv ? '' : 'disabled'}><span class="t" style="font-size:12px">${S.level === C.REALM_MAX_LV - 1 ? '⬆️突破圆满' : '⬆️升级'}</span></button><div class="bar${useMana ? '' : ' xp'}" style="margin:0;flex:1;min-width:0;height:22px"><i style="width:${needPct}%"></i><span style="font-size:11px">${needTxt}</span></div>${S.dead ? '' : '<button class="act" data-a="reinc" style="flex:none;padding:6px 6px"><span class="t" style="font-size:12px">🔄轮回</span></button>'}</div></div>`;
  if (!S.dead && (S.realm|0) === 0 && (S.level|0) < C.REALM_MAX_LV) html += `<div style="font-size:12px;margin-bottom:6px;color:var(--dim)">🌱 引气入体 · 凡人 Lv.${S.level}/${C.REALM_MAX_LV} —— 修至圆满，便可叩开练气之门<small>（锻炼、冒险、闭关皆可精进）</small></div>`; // v1096 前门第一目标：只在凡人期显示，不弹窗不教程
  // v186 套装加成（🎽防御X件等）移到名字行
  const _setsTop = C.setCounts(S), _setNamesTop = { crit: '暴击', fatal: '致命', def: '防御', heal: '治愈', luck: '幸运' };
  let _sbTop = [];
  Object.keys(_setNamesTop).forEach(k => { if ((_setsTop[k]|0) >= 2) _sbTop.push(`<span class="y">🎽${_setNamesTop[k]}${_setsTop[k]}件</span>`); });
  const setBonusHtml = _sbTop.length ? `<span style="font-weight:normal;font-size:12px">${_sbTop.join(' ')}</span>` : '';
  html += `<div style="font-size:13px;font-weight:bold;margin-bottom:6px;display:flex;gap:6px;align-items:center"><span style="width:44px;flex:none;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(S.name || '无名道友')}</span><div style="flex:1;min-width:0;display:flex;gap:6px;align-items:center"><button class="act primary" style="flex:none;padding:6px 8px;visibility:hidden;pointer-events:none"><span class="t" style="font-size:12px">${S.level === C.REALM_MAX_LV - 1 ? '⬆️突破圆满' : '⬆️升级'}</span></button><span style="flex:1;text-align:center">${C.realmTxt(S)}</span>${S.dead ? '' : '<button class="act" style="flex:none;padding:6px 6px;visibility:hidden;pointer-events:none"><span class="t" style="font-size:12px">🔄轮回</span></button>'}</div><span style="flex:none;font-size:11px;font-weight:normal">👁️<b>${C.fmtN(S.shenshi|0)}</b>${(typeof flowerIcons === 'function' ? flowerIcons(S) : '') ? ` <span class="y">${flowerIcons(S)} <span style="margin-left:4px">${(typeof qixiIcon === 'function' ? qixiIcon(S) : '👣')}<b>${C.fmtN(S.qixi|0)}</b></span></span>` : ''}</span>${setBonusHtml}</div>`; // v570 名字对齐头像正中；v571 阶段对齐经验条正中；v581 神识放阶段右边
  if (S.race && RACES[S.race]) { const _rc = RACES[S.race]; html += `<div style="font-size:12px;margin-bottom:6px">🧬 ${_rc.icon} ${_rc.name} · 天赋【${_rc.talent}】<small style="color:var(--dim)"> ${_rc.desc}</small></div>`; } // v1088 种族显示
  try { const _ds = C.destinyStar(S); html += `<div class="row" style="padding:4px 0"><div class="lab">🌠 命星<small>${_ds.t}</small></div><div class="lab"><b class="pu">${_ds.n}</b></div></div>`; } catch(_) {}
  try { const _fs = C.fateSignOf(S); if (_fs) html += `<div class="row" style="padding:4px 0"><div class="lab">🎴 宿命签<small>${_fs.t}</small></div><div class="lab" style="text-align:right"><b class="y">${_fs.n}</b><br><small>${C.fateModText(_fs)}</small></div></div>`; } catch(_) {} // v1012
  try { const _tb = S.taboo | 0; if (_tb > 0) html += `<div class="row" style="padding:4px 0"><div class="lab">${S.tabooAwake ? '🌑 第十人' : '？？？'}<small>${S.tabooAwake ? '已苏醒，伴你而行' : (_tb < 40 ? '沉睡' : _tb < 70 ? '微动' : '低语')}</small></div><div class="lab" style="text-align:right"><b class="pu">苏醒 ${_tb}%</b>${S.tabooAwake ? '<br><small>突破成功率 +5% · 雷劫威力 -5%</small>' : ''}</div></div>`; } catch(_) {} // v1013 禁忌苏醒度
  { xyInit(); const _xyt = xyTotal(); html += `<div class="row" style="padding:4px 0"><div class="lab">💞 仙缘<small>♂ ${S.xianyuan.m|0} · ♀ ${S.xianyuan.f|0} · 共 ${_xyt}</small></div><div class="lab">🔗 编号<small>${S.bindNum}</small></div><button class="btn sm" data-a="xianyuan">仙缘</button></div>`; }
  { const _spn = window._spouseNames || []; if (_spn.length) html += `<div class="row" style="padding:4px 0"><div class="lab">💕 道侣<small>${_spn.map(function(n){ return String(n).replace(/</g, '&lt;'); }).join('、')}</small></div></div>`; try { if (typeof MHXY !== 'undefined' && MHXY.api) MHXY.api('/api/xianyuan/spouses').then(function(r){ if (r.ok && r.json) window._spouseNames = (r.json.spouses || []).map(function(s){ return s.username; }); }); } catch(_) {} }
  html += `<div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:3.5px;margin-bottom:4px;margin-left:0;margin-right:0;font-size:12px"><span style="white-space:nowrap">⏳寿元 <b class="${(S.lifespan|0) <= 10 ? 'r' : 'g'}">${S.lifespan|0}</b>年</span><span style="white-space:nowrap;text-align:center">🧪丹毒 <b class="${(S.danDu|0) > 60 ? 'r' : (S.danDu|0) > 20 ? 'y' : 'g'}">${S.danDu|0}</b><small> ${C.toxTier(S.danDu|0)}</small></span><span class="stam" style="text-align:center">体力 <b style="font-size:12px">${S.stamina|0}</b></span><span style="white-space:nowrap;text-align:center">🌫️灵气 <b>${Math.round(C.qiNow())}</b><small> ${C.qiTierName(C.qiNow())}</small></span><span style="text-align:center;position:relative;left:-15px">🍗饱食 <b class="${S.hunger >= 60 ? 'g' : S.hunger < 30 ? 'r' : 'y'}">${Math.floor(S.hunger)}</b></span></div>`;
  if ((S.realm|0) >= 1 && window.LG) html += `<div class="row" style="padding:4px 0"><div class="lab">🌟 灵根<small>${window.LG.name(S)}</small></div>${S.faZeDone5 ? '<div class="lab">🌈 <b class="y">混元道体</b></div>' : ''}${(S.realm|0) >= 6 ? `<div class="lab">🙏 功德金身<small>功德 <b class="y">${S.merit|0}</b> · 减伤 ${Math.min(30, Math.floor((S.merit|0)/10))}%${(S.merit|0) >= 100 ? ' · 突破+5%' : ''} · 大劫 ${meritDaysLeft()} 天后</small></div>` : ''}${S.toxDan ? `<div class="lab">☣️ <b class="y">毒丹</b><small>累积池 ${S.toxPool|0}</small></div>` : ''}</div>`; // v867 灵根显示；v906 功德金身放灵根一排

  // 五维：一行五列
  html += ``;
  html += `<div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:3.5px;margin-bottom:6px;margin-left:0;margin-right:0">`;
  ATTRS.forEach((k, idx) => {
    const fight = fa[k]|0;
    html += `<div class="card" style="padding:4px 2px;text-align:center${idx === 1 ? ';margin-left:-1.75px' : ''}"><small style="font-size:10px">${AN[k]}</small><br><b style="font-size:13px">${C.fmtN(fight)}</b></div>`;
  });
  html += `</div>`;
  // 资源：和外面 .meta 一样的排版
  const resMana = useMana ? `<span class="vig">${isXian ? '仙力' : '法力'} <b>${C.fmtN(S.mana|0)}/${C.fmtN(manaMax)}</b></span>` : `<span class="vig">活力 <b style="color:#7fd6ff">${S.vigor|0}/${C.vigorCap(S)}</b></span>`;
  html += `<div class="meta" style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;font-size:12px"><span class="gold">金元 <b>${C.fmtN(S.gold|0)}</b></span><span>${MAGATAMA}仙玉 <b>${C.fmtN(S.xianyu|0)}</b></span><span></span><span>${(S.ores.sp5|0) > 0 ? `<button class="btn sm" data-smash="1">砸开</button>` : ''}</span></div><div class="meta" style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;font-size:12px;margin-top:2px"><span>🌒下品 <b>${S.ores.sp2|0}</b></span><span>🌗中品 <b>${S.ores.sp3|0}</b></span><span>💎上品 <b>${S.ores.sp4|0}</b></span><span>💠极品 <b>${S.ores.sp5|0}</b></span></div>`;

  // 生存：生命/饱食/寿元/引气入体/络脉
  html += ``;

  // 状态：诅咒/负面/保护
  let stHtml = '';
  if ((S.curseN|0) > 0) stHtml += `<span class="r">👻诅咒×${S.curseN}</span>`;
  const stList = C.activeStatus(S);
  if (stList.length) stHtml += stList.map(k => `<span class="r">${C.STATUS[k].icon}${C.STATUS[k].name}</span>`).join('');
  if (stHtml) html += `<div class="meta" style="justify-content:flex-start;gap:12px">${stHtml}</div>`;

  // 灵宠：出战详情
  // 宠物属性栏已移除（用户觉得难看）

  // 加成：煞气/菜肴（v186 套装🎽X件已移到名字行）
  let bonus = [];
  if (S.buff && AN[S.buff.k]) bonus.push(`<span>🍲${AN[S.buff.k]}+${Math.round(S.buff.v*100)}%(${S.buff.left}场)</span>`);
  if (bonus.length) html += `<div class="meta" style="justify-content:flex-start;gap:12px">${bonus.join('')}</div>`;

  // 喂食：人物/灵宠（v192 从背包搬到人物卡基本页）
  html += foodSection();

  // v140 内容均匀铺满整个面板，利用空白
  if (page === 2) {
    if ((S.maiVLuo|0) >= 10 && typeof C.synthVMai === 'function') { let _sn2 = 0; while ((S.maiVLuo|0) >= 10 && C.synthVMai(S)) _sn2++; if (_sn2 > 0) { log('good', `🌀 虚络满10自动合成 <b class="g">虚脉 +${_sn2}</b>（当前 ${C.maiMult(S)} 倍）`); save(); } } // v443 打开经络面板时补合成（兜底v442之前攒的虚络）
    // v1055 Ye 定：脉络残页不再满10自动使用——攒着由玩家自己选数量、选座（原 v443 自动使用已去除）
    let p2 = `<div style="font-size:13px;margin-bottom:8px">🌀 <b class="y">经络总览</b></div>`;
    p2 += `<div style="font-size:12px;line-height:1.8">虚络 ${S.maiVLuo|0}<span class="r">（开脉丹派生）</span> · 实络 ${S.maiRLuo|0}<span class="g">（永久）</span> · 虚脉 ${S.maiVMai|0}<span class="r">（经络条数）</span> · 实脉 ${C.maiRMaiEff(S)}<span class="g">（永久）</span><br>络：每条闭关+1/秒；脉：虚脉左右成对每对+1倍、任督各+1（最多14）·实脉每条+1倍（封顶13）·当前 ${C.maiMult(S)} 倍<br>📖开脉术 Lv.${C.maiShuLv(S)}（经验 ${S.maiShuXp|0}/${(C.maiShuLv(S)+1)*10}，每10点升1级、实脉+1）</div>`;
    if ((S.inv['sha']|0) > 0) {
      p2 += `<div class="row" style="margin-top:8px"><div class="lab">👹 <b class="y">煞气</b> ×${S.inv['sha']}<small>携带：${S.shaMode === 'def' ? `防御+${S.inv['sha']}%` : `攻击+${S.inv['sha']}%`}<br><button class="btn sm" data-shamode="atk" ${S.shaMode !== 'def' ? 'disabled' : ''}>⚔️转攻击</button> <button class="btn sm" data-shamode="def" ${S.shaMode === 'def' ? 'disabled' : ''}>🛡️转防御</button>${S.skills.includes('tunmo') ? '' : '<br><span class="r">吞噬需先习得《吞魔》（商店有售）</span>'}</small></div>${S.skills.includes('tunmo') ? `<button class="btn gold" data-sha="use">吞噬·法力+1上限</button>` : ''}</div>`;
    }
    const _seals2 = (S.sealed || []).filter(x => x && !x.done);
    if (_seals2.length) {
      p2 += `<div style="font-size:13px;margin:8px 0">🌟 <b class="y">前世遗物</b></div><div class="hint">每次突破每件独立 ${Math.round(sealAwakenProb(S) * 100)}% 觉醒胎中之谜（幸运套/灵宠幸运技能加成），需输入印记主题方可继承，继承后遗物消散。<br>遗物有寿数：${C.REALMS[1]}3世起，每高一境+1世，未觉醒则消散。</div><div class="grid2" style="grid-template-columns:repeat(2,1fr);gap:6px">` + _seals2.map(x => { const _au = sealAvatarUrl(x); const _rl = C.sealRemainLives(x, S.sealLife|0); return `<div class="card" style="padding:6px"><div class="lab">${_au ? `<img src="${_au}" style="width:28px;height:28px;border-radius:50%;vertical-align:-6px;object-fit:cover">` : '🌟'} <b class="y">${x.playerName || x.name}</b><small>第${x.life}世·${C.REALMS[x.realm]} · ${AN[x.attr]} +${x.value} · <span class="${_rl <= 1 ? 'r' : ''}">余${_rl}世</span></small></div></div>`; }).join('') + `</div>`;
    }
    html = p2;
  } else if (page === 3) {
    let p3 = `<div style="font-size:13px;margin-bottom:8px">🐾 <b class="y">宠物</b></div>`;
    if (S.pets.length) {
      p3 += `<div class="row"><div class="lab">选择灵宠<small>（点一下上场/下场，最多4只）<br>${S.pets.map(pt => { const P = PETS[pt.k], Q = petQ(pt); const _isOut = Array.isArray(S.pet) ? S.pet.map(x=>+x).includes(pt.id) : S.pet === pt.id; return `<button class="btn ${_isOut ? 'on' : ''}" data-battlepet="${pt.id}" style="margin:2px;padding:4px 8px;font-size:12px">${P.icon}<span style="color:${Q.color}">${P.name}</span>#${pt.id}${_isOut ? '✓' : ''}</button>`; }).join('')}</small></div></div>`;
    }
    p3 += (S.petEggs > 0 ? `<div class="row"><div class="lab"><b class="q3">🥚灵宠蛋</b> ×${S.petEggs}<small>孵化得随机灵宠：${Object.entries(C.hatchProbs(S)).map(([k, v]) => PETS[k].name + ' ' + C.pct(v)).join(' · ')}（驯兽等级越高稀有越多）${S.level < K.HATCH_LV ? `<br><span class="r">需玩家 ${K.HATCH_LV} 级（当前 Lv.${S.level}）</span>` : ''}</small></div>${S.level >= K.HATCH_LV ? '<button class="btn gold" data-hatch="1">孵化</button>' : `<button class="btn" data-hatch="1" disabled>${K.HATCH_LV}级可孵化</button>`}</div>` : '');
    p3 += (S.pets.length ? S.pets.map(pt => { const P = PETS[pt.k], Q = petQ(pt); return `<div class="row" style="flex-wrap:wrap"><div class="lab">${P.icon} <b style="color:${Q.color}">${P.name}</b><small style="display:inline;color:${Q.color}"> ·${Q.name}</small> <small style="display:inline">#${pt.id} · Lv.${pt.lv}（经验 ${pt.xp}/${C.petXpNeed(pt.lv)}）· 总属性 ${C.total(pt.attrs)} · 升级 +5点/全属性+${Q.grow}</small><small>饥饿 <b class="${pt.hunger < K.PET_HUNGRY ? 'r' : 'g'}">${Math.round(pt.hunger)}</b> · 忠诚 <b class="${pt.loyal < 30 ? 'r' : pt.loyal >= 60 ? 'g' : 'y'}">${pt.loyal}</b> · 寿命 <b class="${pt.life <= 20 ? 'r' : 'g'}">${pt.life}</b>${C.petBiteChance(pt) > 0 ? ` · <span class="r">PK 反咬率 ${C.pct(C.petBiteChance(pt))}${pt.hunger < K.PET_HUNGRY ? '，饿了会咬人！' : ''}</span>` : ''}<br>${ATTRS.map(a => AN[a] + ' ' + pt.attrs[a]).join(' · ')}<br>PK：${P.style} · 冒险：${C.petBonusTxt(pt.k)} · 对应 <b class="y">${petMatchTxt(pt.k)}</b> · 技能 <b class="y">${(pt.skills || []).map(sk => C.petSkillTxt(S, pt, sk)).join("·") || "无"}</b>${pt.q === 7 ? ` · 🌟神通 <b class="y">${pt.talent ? C.PET_TALENT[pt.k].name + '（' + C.PET_TALENT[pt.k].desc + '）' : '未领悟（升级 10% 领悟）'}</b>` : ''}<br>🎽灵宠套装：${petSetTxt(pt)}</small></div>
        ${S.pets.length > 1 ? `` : ''} <!-- v467 吞噬移至兽园 -->
        ${pt.pts > 0 ? `<div style="flex-basis:100%;display:flex;gap:4px;align-items:center;margin-top:6px"><small class="y" style="white-space:nowrap">可分配 ${pt.pts} 点</small>${['str', 'vit', 'def', 'agi', 'int'].map(a => `<button class="btn" style="flex:1;padding:6px 0;font-size:12px" data-passign="${pt.id}" data-attr="${a}">${AN[a]}+1</button>`).join('')}</div>` : ''}
        <div style="flex-basis:100%;margin-top:4px;display:flex;gap:4px"><button class="btn" style="font-size:11px;padding:4px 8px" onclick="window.doTogglePetLock(${pt.id})">${pt.locked ? '🔓 解锁' : '🔒 锁定'}</button><button class="btn" style="font-size:11px;padding:4px 8px" onclick="window.doReleasePet(${pt.id})" ${pt.locked ? 'disabled' : ''}>🕊️ 放生</button>${pt.locked ? '<small class="y" style="align-self:center">已锁定</small>' : ''}</div></div>`; }).join('') : (S.petEggs > 0 ? '' : '<div class="empty">暂无灵宠，掏兽蛋时偶尔可得灵宠蛋</div>'));
    html = p3;
  } else if (page === 4) {
    html = starChartHtml();
  } else if (page === 5) {
    html = swordPageHtml();
  } else if (page === 6) {
    html = pastLivesHtml();
  } else if (page === 7) {
    html = encCodexHtml();
  } else if (page === 8) {
    html = achHtml();
  } else if (page === 9) {
    html = idnHtml();
  } else {
    html = html + `<div style="height:40vh"></div>`;
  }
  html = `<div style="max-height:60vh;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior:contain">` + html + `</div>`;
  html += `<div class="row" style="padding:12px 0 0;background:var(--panel);display:flex;gap:8px"><button class="btn" data-charpage="1" style="flex:1;white-space:nowrap;font-size:12px;padding:6px 1px;${page===1?'opacity:0.5':''}">基本</button><button class="btn" data-charpage="2" style="flex:1;white-space:nowrap;font-size:12px;padding:6px 1px;${page===2?'opacity:0.5':''}">根基</button><button class="btn" data-charpage="3" style="flex:1;white-space:nowrap;font-size:12px;padding:6px 1px;${page===3?'opacity:0.5':''}">宠物</button><button class="btn" data-charpage="4" style="flex:1;white-space:nowrap;font-size:12px;padding:6px 1px;${page===4?'opacity:0.5':''}">星藏</button><button class="btn" data-charpage="5" style="flex:1;white-space:nowrap;font-size:12px;padding:6px 1px;${page===5?'opacity:0.5':''}">本命</button><button class="btn" data-charpage="6" style="flex:1;white-space:nowrap;font-size:12px;padding:6px 1px;${page===6?'opacity:0.5':''}">百世</button><button class="btn" data-charpage="7" style="flex:1;white-space:nowrap;font-size:12px;padding:6px 1px;${page===7?'opacity:0.5':''}">见闻</button><button class="btn" data-charpage="8" style="flex:1;white-space:nowrap;font-size:12px;padding:6px 1px;${page===8?'opacity:0.5':''}">成就</button><button class="btn" data-charpage="9" style="flex:1;white-space:nowrap;font-size:12px;padding:6px 1px;${page===9?'opacity:0.5':''}">身份</button><button class="btn full" data-close style="flex:2">关闭</button></div>`;
  openSheet(html);
  $('sheet').classList.remove('full');
}

/* ---------- 百世书（v1013 前世谱改版） ---------- */
function pastLivesHtml() {
  const list = Array.isArray(S.pastLives) ? S.pastLives.slice().reverse() : [];
  let h = '<h3 style="margin:2px 0 6px">📖 百世书</h3>';
  if (!list.length) return h + '<div class="hint">尚未轮回，百世书犹是空白。</div>';
  h += list.map((p, i) => {
    const d = p.detail || null;
    // 老记录无 detail：沿用原简略行
    if (!d) return `<div class="row"><div class="lab">第 ${p.n} 世<small>${p.from || ''}</small></div><div class="lab" style="text-align:right"><small>${p.star ? '🌠 ' + p.star : ''}${p.fate ? ' · 🎴 ' + p.fate : ''}${p.seal ? '<br>印记：' + p.seal : ''}</small></div></div>`;
    const rl = C.REALMS[d.realm | 0] || '';
    const open = !!(window._baishiOpen && window._baishiOpen[i]);
    let s = `<div class="row"><div class="lab">第 ${d.life} 世<small>${d.name || ''} · ${rl} Lv.${d.level}${p.star ? ' · 🌠 ' + p.star : ''}${d.reg ? ' · <span style="color:#7ec8ff">已登记</span>' : ''}</small></div><button class="btn" style="font-size:11px;padding:4px 8px" onclick="window.toggleBaishi(${i})">${open ? '收起' : '明细'}</button></div>`;
    if (open) {
      const a = d.attrs || {};
      const raceName = d.race && RACES[d.race] ? RACES[d.race].name : '未选';
      const genTxt = d.gender === 'f' ? '女' : d.gender === 'm' ? '男' : '—';
      const rootsTxt = (Array.isArray(d.roots) && d.roots.length) ? d.roots.join('、') : '未觉醒';
      const dt = d.ts ? new Date(d.ts) : null;
      const dateTxt = dt ? (dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0')) : '';
      s += `<div class="row"><div class="lab"><small>姓名 ${d.name || '—'} · 性别 ${genTxt} · 种族 ${raceName}<br>境界 ${rl} Lv.${d.level} · 寿元 ${Math.floor(d.lifespan || 0)}/${d.lifespanMax || 0}<br>${AN.str} ${a.str || 0} · ${AN.agi} ${a.agi || 0} · ${AN.def} ${a.def || 0} · ${AN.vit} ${a.vit || 0} · ${AN.int} ${a.int || 0}<br>灵根 ${rootsTxt} · 命星 ${p.star || '—'}${p.fate ? ' · 宿命 🎴 ' + p.fate : ''}<br>金元 ${d.gold || 0}${p.seal ? ' · 封存 ' + p.seal : ''}${dateTxt ? '<br>轮回于 ' + dateTxt : ''}</small></div></div>`;
    }
    return s;
  }).join('');
  return h;
}
window.toggleBaishi = function(i) { try { window._baishiOpen = window._baishiOpen || {}; window._baishiOpen[i] = !window._baishiOpen[i]; sheetChar(); } catch(_) {} };

/* ---------- v1006 本命飞剑 ---------- */
function swordPageHtml() {
  const sw = S.sword;
  let h = '<h3 style="margin:2px 0 6px">🗡️ 本命飞剑</h3>';
  if ((S.realm|0) < 1) return h + '<div class="hint">练气之后，方可铸本命飞剑。</div>';
  const ores = S.ores || {};
  if (!sw) {
    h += '<div class="hint">以金矿×2、灵气石×5 铸剑，择一剑意与剑相伴。换剑意须斩旧剑重铸。</div>';
    const ok = (ores.gold|0) >= 2 && (ores.sp1|0) >= 5;
    for (const k in C.SWORD_TAGS) { const t = C.SWORD_TAGS[k]; h += `<div class="row"><div class="lab">${t.n} · ${t.sword}<small>${t.desc}；主加${AN[t.attr]}</small></div><button class="btn gold" onclick="doForgeSword('${k}')" ${ok ? '' : 'disabled'}>铸剑</button></div>`; }
    return h;
  }
  const t = C.SWORD_TAGS[sw.tag];
  const cost = (sw.lv|0) * 2;
  const totPages = Object.values(S.pages || {}).reduce((a, b) => a + (b|0), 0);
  h += `<div class="row"><div class="lab">🗡️ ${t.sword}<small>剑意·${t.n} Lv.${sw.lv}/10</small></div><div>全属性 +${sw.lv}% · ${AN[t.attr]} 另 +${sw.lv * 2}%</div></div>`;
  h += `<div class="row"><div class="lab">悟剑<small>耗观相残页 ${cost} 张（现有 ${totPages} 张），剑意升 1 级</small></div><button class="btn gold" onclick="doSwordEnlighten()" ${(sw.lv < 10 && totPages >= cost) ? '' : 'disabled'}>${sw.lv >= 10 ? '已圆满' : '悟剑'}</button></div>`;
  h += `<div class="row"><div class="lab">斩旧剑<small>斩断旧剑重铸新意：耗 200 金元，剑意归零重铸</small></div><button class="btn danger" onclick="doSwordSever(this)">斩旧剑</button></div>`;
  return h;
}
window.doForgeSword = function(tag) { try { if (S.sword) return; if ((S.realm|0) < 1) return; const ores = S.ores || (S.ores = {}); if (!((ores.gold|0) >= 2 && (ores.sp1|0) >= 5)) { toastLog('sys', '材料不足'); return; } ores.gold -= 2; ores.sp1 -= 5; S.sword = { tag, lv: 1 }; log('good', `🗡️ 铸成本命飞剑【${C.SWORD_TAGS[tag].sword}】，剑意·${C.SWORD_TAGS[tag].n}，与剑同修！`); commit(); window._charPage = 5; sheetChar(); } catch(_) {} };
window.doSwordEnlighten = function() { try { const sw = S.sword; if (!sw || sw.lv >= 10) return; const cost = (sw.lv|0) * 2; const tot = Object.values(S.pages || {}).reduce((a, b) => a + (b|0), 0); if (tot < cost) { toastLog('sys', '观相残页不足'); return; } let left = cost; for (const k of Object.keys(S.pages)) { if (left <= 0) break; const take = Math.min(left, S.pages[k]|0); S.pages[k] -= take; if (!S.pages[k]) delete S.pages[k]; left -= take; } sw.lv++; log('good', `🗡️ 悟剑有得：【${C.SWORD_TAGS[sw.tag].sword}】剑意升至 Lv.${sw.lv}`); commit(); window._charPage = 5; sheetChar(); } catch(_) {} };
window.doSwordSever = function(btn) { try { if (!S.sword) return; if (!btn.dataset.armed) { btn.dataset.armed = '1'; btn.textContent = '再点一次确认斩剑'; return; } if ((S.gold|0) < 200) { toastLog('sys', '金元不足 200'); return; } S.gold -= 200; const old = C.SWORD_TAGS[S.sword.tag].sword; S.sword = null; log('warn', `🗡️ 你亲手斩断本命飞剑【${old}】，剑意散尽，静待重铸。`); commit(); window._charPage = 5; sheetChar(); } catch(_) {} };

/* ---------- 拍卖行（三日循环 v116） ---------- */
// 规则：每天3个拍卖位，玩家竞价抢第二天的位（位钱系统回收，不退）；
// 抢到者第二天上架物品（可匿名），接受竞价；第三天结算收钱。成交不收手续费。
// S.auc3 = { day, slots:[[{who,amt}]x3], listings:[], mySlots }

const AUC3_NPC = ['神秘客', '富商', '散修', '剑客', '丹师'];

function auc3Init(S) {
  if (!S.auc3 || typeof S.auc3 !== 'object') {
    S.auc3 = { day: 0, slots: [[], [], []], listings: [], mySlots: 0 };
  }
  if (!Array.isArray(S.auc3.slots) || S.auc3.slots.length !== 3) S.auc3.slots = [[], [], []];
  if (!Array.isArray(S.auc3.listings)) S.auc3.listings = [];
  S.auc3.mySlots = S.auc3.mySlots | 0;
  return S.auc3;
}

function auc3Top(bids) {
  let top = null;
  (bids || []).forEach(b => { if (!top || b.amt > top.amt) top = b; });
  return top;
}

// 每日结算（签到时调用）
function auc3Daily(S) {
  const A = auc3Init(S);
  const today = S.checkinDays | 0;
  if (A.day >= today) return; // 今日已结算
  A.day = today;

  // 1. 结算昨日拍卖品（竞价结束）
  (A.listings || []).forEach(L => {
    const top = auc3Top(L.bids);
    if (top && top.amt > 0) {
      if (L.seller === '你') {
        S.gold = (S.gold | 0) + top.amt;
        try { log('gold', `🔨 拍卖成交！${L.icon}${L.itemName}×${L.qty} 以 <b class="y">${top.amt}金</b> 售出（买家 ${top.who === '你' ? '你' : esc(top.who)}），钱已到账。`); } catch (e) {}
      } else if (top.who === '你') {
        // 玩家竞得：给物品
        try {
          const store = L.store === 'herbs' ? S.herbs : S.ores;
          if (store) store[L.itemKey] = (store[L.itemKey] | 0) + L.qty;
          log('good', `🔨 竞拍成功！获得 ${L.icon}${L.itemName}×${L.qty}（${top.amt}金）。`);
        } catch (e) {}
      }
      // NPC之间成交：静默
    } else {
      // 流拍：退还给卖家
      if (L.seller === '你') {
        try {
          const store = L.store === 'herbs' ? S.herbs : S.ores;
          if (store) store[L.itemKey] = (store[L.itemKey] | 0) + L.qty;
          log('warn', `🔨 ${L.icon}${L.itemName}×${L.qty} 流拍，已退回背包。`);
        } catch (e) {}
      }
    }
  });

  // 2. 结算昨日拍卖位竞价
  const newListings = [];
  let myWins = 0;
  for (let i = 0; i < 3; i++) {
    const top = auc3Top(A.slots[i]);
    if (top && top.who === '你') {
      myWins++;
    } else {
      // NPC抢到位：生成一个随机拍品
      const npcItem = auc3GenNpcItem(S);
      if (npcItem) {
        newListings.push({
          seller: top ? top.who : AUC3_NPC[Math.floor(Math.random() * AUC3_NPC.length)],
          anon: false,
          store: npcItem.store, itemKey: npcItem.key, itemName: npcItem.name,
          icon: npcItem.icon, qty: npcItem.qty, start: npcItem.price,
          bids: []
        });
      }
    }
  }
  if (myWins > 0) {
    A.mySlots += myWins;
    try { log('good', `🎫 恭喜！抢到 <b class="y">${myWins}</b> 个今日拍卖位，快去上架物品吧。`); } catch (e) {}
  }

  // 3. 重置：新位竞价（明日），新拍品（今日NPC的）
  A.slots = [[], [], []];
  A.listings = newListings;
  commit();
}

function auc3GenNpcItem(S) {
  // NPC随机拍品：矿石或药草
  const ores = [['iron', '铁矿', '⚫', 20], ['copper', '铜矿', '🟤', 50], ['silver', '银矿', '⚪', 120], ['gold', '金矿', '🟡', 300], ['sp1', '灵气石', '🪨', 100]];
  const herbs = [['lq1', '地品灵草', '🌿', 30], ['lq2', '天品灵草', '🌱', 80], ['lq3', '仙品灵草', '🌿', 200]];
  const pool = Math.random() < 0.6 ? ores : herbs;
  const it = pool[Math.floor(Math.random() * pool.length)];
  const qty = 1 + Math.floor(Math.random() * 5);
  return { store: pool === ores ? 'ores' : 'herbs', key: it[0], name: it[1], icon: it[2], qty: qty, price: it[3] * qty };
}

// NPC随机出价（打开页面时）
function auc3NpcBid(S) {
  const A = auc3Init(S);
  let changed = false;
  // 位竞价：每个位30%概率有NPC加价
  A.slots.forEach((bids, i) => {
    if (Math.random() < 0.35) {
      const top = auc3Top(bids);
      const base = top ? top.amt : 50;
      const amt = base + 20 + Math.floor(Math.random() * 100);
      const who = AUC3_NPC[Math.floor(Math.random() * AUC3_NPC.length)];
      // NPC出价不扣钱（系统模拟）
      bids.push({ who: who, amt: amt });
      changed = true;
    }
  });
  // 拍品竞价：每个拍品30%概率有NPC加价
  (A.listings || []).forEach(L => {
    if (Math.random() < 0.3) {
      const top = auc3Top(L.bids);
      const base = top ? top.amt : L.start;
      const inc = Math.max(10, Math.floor(base * 0.1));
      const who = AUC3_NPC[Math.floor(Math.random() * AUC3_NPC.length)];
      L.bids.push({ who: who, amt: base + inc });
      changed = true;
    }
  });
  if (changed) commit();
}

async function sheetAuction3(msg) {
  // v1086 线上拍卖行：NPC 拍品/出价下线，全走服务端三日循环
  if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn()) {
    openSheet(`<h2>🔨 拍卖行</h2><div class="hint">拍卖行已改真人竞价，需登录联机后查看。</div><div class="empty">请先在联机面板登录</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
    return;
  }
  openSheet(`<h2>🔨 拍卖行</h2><div class="hint">正在拉取真人拍卖数据…</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
  let r;
  try { r = await MHXY.api('/api/auction/view'); } catch (e) { r = null; }
  if (!r || !r.ok || !r.json || !r.json.ok) {
    openSheet(`<h2>🔨 拍卖行</h2><div class="hint">拉取失败，请稍后再试。</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
    return;
  }
  const d = r.json;
  window._aucMySlots = d.mySlots | 0;
  let html = `<h2>🔨 拍卖行</h2><div class="hint">三日循环：今日抢<b class="y">明日</b>拍卖位 → 明日上架 → 后日收钱<br>金元 <b class="y">${S.gold | 0}</b> · 位钱系统回收不退，成交不收手续费 · 出价金托管，被超价立即退还</div>` + (msg ? `<div class="warn">${msg}</div>` : '');
  if (d.mySlots > 0) {
    html += `<div class="row" style="background:#2a2a1a"><div class="lab">🎫 你有 <b class="y">${d.mySlots}</b> 个今日拍卖位待上架</div><button class="btn gold" data-auc3list>上架物品</button></div>`;
  }
  html += `<h3>🎫 明日拍卖位（3个）</h3><div class="hint">出价最高者获得明日上架权，出价不退（系统回收）</div>`;
  d.slots.forEach((sl) => {
    const top = sl.top;
    const nextAmt = (top ? top.amt : 50) + 20;
    html += `<div class="row"><div class="lab">拍卖位 ${sl.slot + 1}<small>当前 <b class="y">${top ? top.amt + '金（' + esc(top.bidder_name) + '）' : '暂无出价'}${sl.myBid ? ` · 你的出价 ${sl.myBid}金` : ''}</small></div>` +
      `<button class="btn gold" data-auc3slot="${sl.slot}" ${S.gold >= nextAmt ? '' : 'disabled'}>出价 ${nextAmt}金</button></div>`;
  });
  html += `<h3>🔨 今日拍卖品</h3>`;
  if (!d.listings.length) {
    html += `<div class="hint">今日暂无拍品（昨日无人抢到位）</div>`;
  }
  d.listings.forEach((L) => {
    const cur = L.cur;
    const inc = Math.max(10, Math.floor(cur * 0.1));
    const nextAmt = cur + inc;
    html += `<div class="row"><div class="lab">${L.icon} ${esc(L.name)}×${L.qty}<small>卖家 ${esc(L.seller)} · 当前 <b class="y">${cur}金</b>${L.topName ? `（${L.topIsMe ? '<b style="color:#7fd6ff">你的出价领先</b>' : esc(L.topName) + '领先'}）` : '（起拍价）'}</small></div>` +
      (L.isMine ? `<span class="tag">你的拍品</span>` : `<button class="btn ${L.topIsMe ? '' : 'gold'}" data-auc3bid="${L.id}" ${S.gold >= nextAmt ? '' : 'disabled'}>出价 ${nextAmt}金</button>`) + `</div>`;
  });
  html += `<div class="row"><button class="btn full" data-close>关闭</button></div>`;
  openSheet(html);
}

function doAuc3Slot(i) {
  const A = auc3Init(S);
  i = +i;
  if (i < 0 || i > 2) return;
  const bids = A.slots[i];
  const top = auc3Top(bids);
  const amt = (top ? top.amt : 50) + 20;
  if ((S.gold | 0) < amt) { sheetAuction3('金元不足。'); return; }
  S.gold -= amt; // 位钱系统回收，不退
  bids.push({ who: '你', amt: amt });
  try { log('gold', `🎫 拍卖位 ${i + 1} 出价 <b class="y">${amt}金</b>（系统回收，不退）`); } catch (e) {}
  commit(); sheetAuction3();
}

function doAuc3Bid(i) {
  const A = auc3Init(S);
  i = +i;
  const L = A.listings[i];
  if (!L || L.seller === '你') return;
  const top = auc3Top(L.bids);
  const cur = top ? top.amt : L.start;
  const inc = Math.max(10, Math.floor(cur * 0.1));
  const amt = cur + inc;
  if ((S.gold | 0) < amt) { sheetAuction3('金元不足。'); return; }
  // 退还自己之前的出价
  if (top && top.who === '你') S.gold += top.amt;
  S.gold -= amt;
  L.bids.push({ who: '你', amt: amt });
  try { log('gold', `🔨 出价 <b class="y">${amt}金</b> 竞拍 ${L.icon}${L.itemName}×${L.qty}`); } catch (e) {}
  commit(); sheetAuction3();
}

// 上架物品：选择背包物品
function sheetAuc3List() {
  const mySlots = window._aucMySlots | 0;
  if (mySlots <= 0) { sheetAuction3('没有待上架的拍卖位。'); return; }
  let html = `<h2>🎫 上架拍卖品</h2><div class="hint">剩余拍卖位 <b class="y">${mySlots}</b> · 选择一件物品上架</div>`;
  // 可上架：矿石
  const ores = S.ores || {};
  const oreNames = { iron: ['铁矿', '⚫'], copper: ['铜矿', '🟤'], silver: ['银矿', '⚪'], gold: ['金矿', '🟡'], sp1: ['灵气石', '🪨'], sp2: ['下品灵石', '🌒'], sp3: ['中品灵石', '🌗'], sp4: ['上品灵石', '💎'], sp5: ['极品灵石', '💠'] };
  Object.keys(oreNames).forEach(k => {
    const n = ores[k] | 0;
    if (n > 0) {
      html += `<div class="row"><div class="lab">${oreNames[k][1]} ${oreNames[k][0]}×${n}</div><button class="btn gold" data-auc3pick="ores:${k}">选择</button></div>`;
    }
  });
  // 药草
  const herbs = S.herbs || {};
  Object.keys(herbs).forEach(k => {
    const n = herbs[k] | 0;
    if (n > 0) html += `<div class="row"><div class="lab">🌿 ${k}×${n}</div><button class="btn gold" data-auc3pick="herbs:${k}">选择</button></div>`;
  });
  html += `<div class="row"><button class="btn full" data-close>关闭</button></div>`;
  openSheet(html);
}

let _auc3Pick = null;
function sheetAuc3ListConfirm(store, key) {
  const names = { iron: '铁矿', copper: '铜矿', silver: '银矿', gold: '金矿', sp1: '灵气石', sp2: '下品灵石', sp3: '中品灵石', sp4: '上品灵石', sp5: '极品灵石' };
  const icons = { iron: '⛏️', copper: '🟤', silver: '⚪', gold: '🟡', sp1: '💎', sp2: '💎', sp3: '💎', sp4: '💎', sp5: '💠' };
  const s = store === 'herbs' ? (S.herbs || {}) : (S.ores || {});
  const maxN = s[key] | 0;
  if (maxN <= 0) { sheetAuction3('物品不足。'); return; }
  _auc3Pick = { store, key, maxN };
  const name = store === 'herbs' ? key : (names[key] || key);
  const icon = store === 'herbs' ? '🌿' : (icons[key] || '📦');
  let html = `<h2>🎫 上架确认</h2><div class="hint">${icon} ${name}（拥有 ${maxN}）</div>` +
    `<div class="row"><div class="lab">数量（1-${maxN}）</div><input id="auc3qty" type="number" value="1" min="1" max="${maxN}" style="width:80px"></div>` +
    `<div class="row"><div class="lab">起拍价（金元）</div><input id="auc3price" type="number" value="100" min="10" style="width:80px"></div>` +
    `<div class="row"><div class="lab">匿名上架</div><input type="checkbox" id="auc3anon" style="width:24px;height:24px"></div>` +
    `<div class="row"><button class="btn gold full" data-auc3confirm>确认上架</button></div>` +
    `<div class="row"><button class="btn full" data-close>取消</button></div>`;
  openSheet(html);
}

function doAuc3Confirm() {
  // v1086 线上上架
  if (!_auc3Pick || (window._aucMySlots | 0) <= 0) { sheetAuction3('上架失败。'); return; }
  const qtyEl = document.getElementById('auc3qty');
  const priceEl = document.getElementById('auc3price');
  const anonBtn = document.getElementById('auc3anon');
  const qty = Math.max(1, Math.min(_auc3Pick.maxN, parseInt((qtyEl || {}).value) || 1));
  const price = Math.max(10, parseInt((priceEl || {}).value) || 100);
  const anon = !!(anonBtn && anonBtn.checked);
  const { store, key } = _auc3Pick;
  const names = { iron: '铁矿', copper: '铜矿', silver: '银矿', gold: '金矿', sp1: '灵气石', sp2: '下品灵石', sp3: '中品灵石', sp4: '上品灵石', sp5: '极品灵石' };
  const icons = { iron: '⛏️', copper: '🟤', silver: '⚪', gold: '🟡', sp1: '💎', sp2: '💎', sp3: '💎', sp4: '💎', sp5: '💠' };
  const name = store === 'herbs' ? key : (names[key] || key);
  const icon = store === 'herbs' ? '🌿' : (icons[key] || '📦');
  (async () => {
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/auction/list', { method: 'POST', body: { store, key, name, icon, qty, start: price, anon } });
      if (r.status === 401) { toastLog('sys', '登录已过期，请重新登录'); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); await mktRefreshRev(); _auc3Pick = null; sheetAuction3(); }
      else { const _e = (r.json || {}).error; sheetAuction3(_e === 'no_slot' ? '拍卖位已用完。' : _e === 'no_item' ? '物品不足。' : '上架失败。'); }
    } catch(_) { sheetAuction3('网络不通，稍后再试。'); }
  })();
}


let consignSec = 'shangpin';
const CONSIGN_SECS = [
  { key: 'xiapin', name: '下品灵石', icon: '🌒', kind: 'ore', item: 'sp2', cur: 'sp2', curName: '下品灵石', curIcon: '🌒' },
  { key: 'zhongpin', name: '中品灵石', icon: '🌗', kind: 'ore', item: 'sp3', cur: 'sp3', curName: '中品灵石', curIcon: '🌗' },
  { key: 'shangpin', name: '上品灵石', icon: '💎', kind: 'ore', item: 'sp4', cur: 'sp4', curName: '上品灵石', curIcon: '💎' },
  { key: 'jipin', name: '极品灵石', icon: '💠', kind: 'ore', item: 'sp5', cur: 'sp5', curName: '极品灵石', curIcon: '💠' },
  { key: 'xianyu', name: '仙玉', icon: MAGATAMA, kind: 'xianyu', item: 'xianyu', cur: 'xianyu', curName: '仙玉', curIcon: MAGATAMA },
  { key: 'jinyuan', name: '金元', icon: '🪙', kind: 'gold', item: 'gold', cur: 'gold', curName: '金元', curIcon: '🪙' },
]; // v587 加下品/中品灵石区；v588 加金元区
// 获取当前区货币（挂window供script0调用）
function consignCur(sec) { const s = CONSIGN_SECS.find(x => x.key === sec); return s ? { key: s.cur, name: s.curName, icon: s.curIcon } : { key: 'gold', name: '金元', icon: '' }; }
window.consignCur = consignCur; window.CONSIGN_SECS = CONSIGN_SECS;
/* ================= 寄售行（v960 全转线上） =================
 * Ye 指令"没有线下以后全是线上"：NPC 市场/购买/定时购买已删除。
 * 市场/上架/下架全部走后端 /api/market/*，服务端权威结算（仿 PK 防刷）。
 * 未登录联机账号时显示登录引导。
 */
let _mktView = null; // {tab, sec}：防异步加载过期重绘
let _mktCat = 'all';
function mktBal(cur) { // 当前分区货币余额
  if (cur === 'xianyu') return S.xianyu || 0;
  if (cur === 'gold') return S.gold || 0;
  return (S.ores && S.ores[cur]) || 0;
}
function mktApplySave(sv) { // 交易后应用服务端返回的存档（服务端已是最新，只写本地不上传）
  if (!sv || typeof sv !== 'object') return;
  S = sv; window.S = S;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch(_) {}
  try { if (typeof render === 'function') render(); } catch(_) {}
}
async function mktRefreshRev() { // 交易后刷新同步基线，避免下次上传 409 冲突
  try {
    const m = await window.MHXY.api('/api/save/meta');
    if (m.ok && m.json && typeof m.json.rev === 'number') window.MHXY.setBaseRev(m.json.rev);
  } catch(_) {}
}
function mktHeadHtml(sec, msg, tab) {
  return `<h2>🏪 寄售行</h2><div class="hint">线上玩家市场 · 成交收5%手续费 · ${esc(window.MHXY.myName())}</div>` +
    (msg ? `<div class="warn">${msg}</div>` : '') +
    `<div class="grid2" style="grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:8px">` +
    CONSIGN_SECS.map(x => `<button class="btn${sec === x.key ? ' gold' : ''}" data-consignsec="${x.key}" style="padding:6px 2px;font-size:12px">${x.icon}${x.name}</button>`).join('') + `</div>` +
    `<div class="grid2" style="margin-bottom:8px">` +
    `<button class="btn${tab==='market'?' gold':''}" data-consigntab="market">市场</button>` +
    `<button class="btn${tab==='mine'?' gold':''}" data-consigntab="mine">我的寄售</button>` +
    `<button class="btn${tab==='list'?' gold':''}" data-consigntab="list">上架</button></div>`;
}
async function sheetConsign(tab, msg, sec) {
  tab = tab || 'market'; sec = sec || consignSec; consignSec = sec;
  const view = { tab, sec }; _mktView = view;
  if (!window.MHXY || !MHXY.loggedIn()) {
    openSheet(`<h2>🏪 寄售行</h2><div class="hint">线上玩家市场 · 成交收5%手续费</div>` +
      `<div class="empty">需要登录联机账号才能交易<br><br><button class="btn gold" data-mktlogin>🌐 去登录联机</button></div>` +
      `<div class="row"><button class="btn full" data-close>关闭</button></div>`);
    return;
  }
  if (tab === 'list') { sheetConsignList(msg, sec); return; }
  openSheet(mktHeadHtml(sec, null, tab) + `<div class="empty">加载中……</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
  const SEC = CONSIGN_SECS.find(x => x.key === sec) || CONSIGN_SECS[2];
  let data = null, loginBad = false;
  try {
    await window.MHXY.syncNow(); // 先推本地脏存档，避免服务端存档过期
    const r = await window.MHXY.api(tab === 'mine' ? '/api/market/mine' : ('/api/market/list?cur=' + encodeURIComponent(SEC.cur) + '&limit=100'));
    if (r.status === 401) loginBad = true;
    else if (r.ok && r.json) data = r.json;
  } catch(_) { data = null; }
  if (_mktView !== view) return; // 用户已切走，不重绘
  if (loginBad) { sheetConsign(tab, '登录已过期，请重新登录联机账号。', sec); return; }
  if (!data) { openSheet(mktHeadHtml(sec, '网络不通，稍后再试。', tab) + `<div class="row"><button class="btn full" data-close>关闭</button></div>`); return; }
  if (tab === 'mine') sheetConsignMineShow(sec, data.listings || [], msg);
  else sheetConsignMarketShow(sec, data.listings || [], msg);
}
const MKT_CATS = [['all', '全部'], ['ore', '矿石'], ['elixir', '丹药'], ['med', '疗伤药'], ['misc', '杂物']];
function sheetConsignMarketShow(sec, list, msg) {
  const SEC = CONSIGN_SECS.find(x => x.key === sec) || CONSIGN_SECS[2];
  const curName = SEC.curName, curIcon = SEC.curIcon || '';
  const bal = mktBal(SEC.cur), me = window.MHXY.myName();
  const catOf = c => c.kind === 'ore' ? 'ore' : c.kind === 'elixir' ? 'elixir' : c.kind === 'med' ? 'med' : 'misc';
  let html = mktHeadHtml(sec, msg, 'market') +
    `<div class="hint">本区货币：${curIcon}${curName} <b class="y">${bal}</b> · <button class="btn" data-mktrefresh style="padding:2px 8px">🔄 刷新</button></div>` +
    `<div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:8px">` +
    MKT_CATS.map(([k, n]) => `<button class="btn${_mktCat===k?' gold':''}" data-mktcat="${k}" style="padding:6px 2px;font-size:12px">${n}</button>`).join('') + `</div>`;
  const rows = list.filter(c => _mktCat === 'all' || catOf(c) === _mktCat);
  html += rows.map(c => {
    const own = c.seller_name === me;
    return `<div class="row"><div class="lab">${esc(c.name)} ×${c.qty} <span class="tag">${c.price}${curName}/个</span><small>卖家 ${own ? '<span class="y">我</span>' : esc(c.seller_name)}</small></div>` +
      (own ? `<button class="btn" disabled>我的寄售</button>` :
        `<input id="bq_${c.id}" type="number" min="1" max="${c.qty}" value="1" style="width:45px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px">` +
        `<button class="btn gold" data-mktbuy="${c.id}"${bal >= c.price ? '' : ' disabled'}>买下</button>`) + `</div>`;
  }).join('') || '<div class="empty">该区暂无货物，快去上架吧</div>';
  html += `<div class="row"><button class="btn full" data-close>关闭</button></div>`;
  openSheet(html);
}
function sheetConsignMineShow(sec, list, msg) {
  let html = mktHeadHtml(sec, msg, 'mine');
  html += list.map(c => {
    const z = CONSIGN_SECS.find(x => x.cur === c.cur);
    const zn = z ? (z.icon + z.curName) : c.cur;
    return `<div class="row"><div class="lab">${esc(c.name)} ×${c.qty} <span class="tag">${c.price}${z ? z.curName : c.cur}/个</span><small>${zn}区</small></div>` +
      `<button class="btn" data-mkdel="${c.id}">下架</button></div>`;
  }).join('') || '<div class="empty">你还没有上架物品</div>';
  html += `<div class="row"><button class="btn full" data-close>关闭</button></div>`;
  openSheet(html);
}
function sheetConsignList(msg, sec) {
  let html = mktHeadHtml(sec, msg, 'list');

    // 矿石类目（所有矿石 + 灵石 + 仙玉）
    const _cur = consignCur(sec);
    const _oreKeys = Object.keys(S.ores || {}).filter(k => (S.ores[k]||0) > 0);
    const _hasXy = (S.xianyu||0) > 0;
    if (_oreKeys.length || _hasXy) {
      html += `<h3>⛏️ 矿石</h3>`;
      const _oreIcon = { sp1: '🪨', sp2: '🌒', sp3: '🌗', sp4: '💎', sp5: '💠', iron: '⚫', copper: '🟤', silver: '⚪', gold: '🟡' };
      for (const _ok of _oreKeys) {
        const _oh = S.ores[_ok] || 0;
        const _on = ((ORES[_ok]||{}).name || _ok);
        const _ob = C.consignPrice('ore', _ok);
        const _oi = _oreIcon[_ok] || '💎';
        html += `<div class="row"><div class="lab">${_oi} ${esc(_on)} ×${_oh} <small>参考价 ${_ob}${_cur.name}</small></div>
        <input id="cq_ore_${_ok}" type="number" min="1" max="${_oh}" value="${_oh}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
        <input id="cp_ore_${_ok}" type="number" min="1" value="${_ob}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
        <button class="btn gold" data-clist="ore:${_ok}">上架</button></div>`;
      }
      if (_hasXy) {
        const _xb = C.consignPrice('xianyu', 'xianyu');
        html += `<div class="row"><div class="lab">${MAGATAMA} 仙玉 ×${S.xianyu} <small>参考价 ${_xb}${_cur.name}</small></div>
        <input id="cq_xianyu_xianyu" type="number" min="1" max="${S.xianyu}" value="${S.xianyu}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
        <input id="cp_xianyu_xianyu" type="number" min="1" value="${_xb}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
        <button class="btn gold" data-clist="xianyu:xianyu">上架</button></div>`;
      }
    }
    // 药水类目（疗伤药）
    const _medKeys = Object.keys(S.meds || {}).filter(k => (S.meds[k]||0) > 0);
    if (_medKeys.length) {
      html += `<h3>💊 疗伤药</h3>`;
      for (const _mk of _medKeys) {
        const _mh = S.meds[_mk] || 0;
        const _mn = ((MEDS[_mk]||{}).name || _mk);
        const _mb = C.consignPrice('med', _mk);
        html += `<div class="row"><div class="lab">💊 ${esc(_mn)} ×${_mh} <small>参考价 ${_mb}${_cur.name}</small></div>
        <input id="cq_med_${_mk}" type="number" min="1" max="${_mh}" value="${_mh}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
        <input id="cp_med_${_mk}" type="number" min="1" value="${_mb}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
        <button class="btn gold" data-clist="med:${_mk}">上架</button></div>`;
      }
    }
    // 杂物类目（煞气等）
    const _invItems = [];
    if ((S.inv['sha']||0) > 0) _invItems.push(['sha', '👹 煞气', S.inv['sha']]);
    if ((S.inv['mai']||0) > 0) _invItems.push(['mai', '🌀 开脉丹', S.inv['mai']]);
    for (const k in (S.eggs||{})) if ((S.eggs[k]||0) > 0) { const _en = ((typeof EGGS !== 'undefined' ? EGGS[k] : null)||{}).name || k; _invItems.push(['EGGSEP'+k, '🥚 '+_en, S.eggs[k]]); }
    if (_invItems.length) {
      html += `<h3>📦 杂物</h3>`;
      for (const [_ik, _inm, _ih] of _invItems) {
        const _ib = 10;
        html += `<div class="row"><div class="lab">${_inm} ×${_ih} <small>参考价 ${_ib}${_cur.name}</small></div>
        <input id="cq_inv_${_ik}" type="number" min="1" max="${_ih}" value="${_ih}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
        <input id="cp_inv_${_ik}" type="number" min="1" value="${_ib}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
        <button class="btn gold" data-clist="inv:${_ik}">上架</button></div>`;
      }
      // 灵宠蛋
      const _peggs = S.petEggs || 0;
      if (_peggs > 0) {
        const _pb = C.consignPrice('petegg', 'petEgg');
        html += `<div class="row"><div class="lab">🥚 灵宠蛋 ×${_peggs} <small>参考价 ${_pb}${_cur.name}</small></div>
        <input id="cq_petegg_petEgg" type="number" min="1" max="${_peggs}" value="${_peggs}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
        <input id="cp_petegg_petEgg" type="number" min="1" value="${_pb}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
        <button class="btn gold" data-clist="petegg:petEgg">上架</button></div>`;
      }
    }
    // 丹药类目（生命/法力药水）
    const _elxKeys = Object.keys(S.elixirs || {}).filter(k => (S.elixirs[k]||0) > 0);
    if (_elxKeys.length) {
      html += `<h3>🧪 丹药</h3>`;
      for (const _ek of _elxKeys) {
        const _eh = S.elixirs[_ek] || 0;
        let _en = _ek;
        try { const _po = (typeof potOf === 'function' ? potOf(_ek) : null); _en = _po ? (_po.name || _ek) : ((POTIONS[_ek]||{}).name || _ek); } catch(_e) {}
        const _eb = C.consignPrice('elixir', _ek);
        html += `<div class="row"><div class="lab">🧪 ${esc(_en)} ×${_eh} <small>参考价 ${_eb}${_cur.name}</small></div>
        <input id="cq_elixir_${_ek}" type="number" min="1" max="${_eh}" value="${_eh}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
        <input id="cp_elixir_${_ek}" type="number" min="1" value="${_eb}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
        <button class="btn gold" data-clist="elixir:${_ek}">上架</button></div>`;
      }
    }
    // v999 寄售扩容：药草凝露（mat 全键）
  const _matKs = Object.keys(S.mats || {}).filter(k => (S.mats[k]||0) > 0);
  if (_matKs.length) {
    html += `<h3>🌿 药草凝露</h3>`;
    for (const _k of _matKs) {
      const _h = S.mats[_k] || 0; const _n = ((MATS[_k] || LU[_k] || {}).name || _k); const _b = C.consignPrice('mat', _k);
      html += `<div class="row"><div class="lab">🌿 ${esc(_n)} ×${_h} <small>参考价 ${_b}${_cur.name}</small></div>
      <input id="cq_mat_${_k}" type="number" min="1" max="${_h}" value="${_h}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
      <input id="cp_mat_${_k}" type="number" min="1" value="${_b}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
      <button class="btn gold" data-clist="mat:${_k}">上架</button></div>`;
    }
  }
  // v999 寄售扩容：属性丹（inv attr_grade）
  const _pillRows = C.invList(S);
  if (_pillRows.length) {
    html += `<h3>💊 属性丹</h3>`;
    for (const p of _pillRows) {
      const _k = p.attr + '_' + p.grade; const _b = C.consignPrice('inv', _k);
      html += `<div class="row"><div class="lab">${potName(p.attr, p.grade)} ×${p.count} <small>参考价 ${_b}${_cur.name}</small></div>
      <input id="cq_inv_${_k}" type="number" min="1" max="${p.count}" value="${p.count}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
      <input id="cp_inv_${_k}" type="number" min="1" value="${_b}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
      <button class="btn gold" data-clist="inv:${_k}">上架</button></div>`;
    }
  }
  // v999 寄售扩容：变异丹 + 化无丹（inv mut_*/detox）
  const _mutKs = Object.keys(C.MUT_PILLS).filter(id => (S.inv['mut_' + id]|0) > 0); const _detN = S.inv['detox']|0;
  if (_mutKs.length || _detN > 0) {
    html += `<h3>🌀 变异丹</h3>`;
    for (const id of _mutKs) {
      const _k = 'mut_' + id; const _h = S.inv[_k]|0; const _b = C.consignPrice('inv', _k);
      html += `<div class="row"><div class="lab">🌀 <b class="y">${C.MUT_PILLS[id].name}</b> ×${_h} <small>参考价 ${_b}${_cur.name}</small></div>
      <input id="cq_inv_${_k}" type="number" min="1" max="${_h}" value="${_h}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
      <input id="cp_inv_${_k}" type="number" min="1" value="${_b}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
      <button class="btn gold" data-clist="inv:${_k}">上架</button></div>`;
    }
    if (_detN > 0) {
      const _b = C.consignPrice('inv', 'detox');
      html += `<div class="row"><div class="lab">🍃 <b class="y">化无丹</b> ×${_detN} <small>参考价 ${_b}${_cur.name}</small></div>
      <input id="cq_inv_detox" type="number" min="1" max="${_detN}" value="${_detN}" style="width:50px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="数量">
      <input id="cp_inv_detox" type="number" min="1" value="${_b}" style="width:60px;padding:6px;background:#222;color:#fff;border:1px solid #555;border-radius:6px" placeholder="单价">
      <button class="btn gold" data-clist="inv:detox">上架</button></div>`;
    }
  }
  html += `<div class="row"><button class="btn full" data-close>关闭</button></div>`;
  openSheet(html);
}
// ===== v1128 器具 UI（锻造页 + 背包共用）：升档/修复/强化符均为本地材料增减（只减不增，过存档守卫）=====
function toolCardHtml(which, from) {
  const t = S.tools && S.tools[which];
  const icon = which === 'pick' ? '⛏️' : '🌿';
  if (!t) return `<div class="row"><div class="lab">${icon} ${which === 'pick' ? '矿镐' : '药锄'}<small>未拥有，去商会购买（100 金）</small></div></div>`;
  const nm = C.TOOL_NAMES[which][t.tier | 0], tc = C.TOOL_TIER_COLORS[t.tier | 0];
  const lvl = t.lvl | 0;
  const lvlTxt = lvl >= 1000 ? `<span class="toolRainbow">${lvl} 级</span>` : `<span style="color:${C.TOOL_LVL_COLORS[Math.min(9, Math.floor(lvl / 100))]};font-weight:700">${lvl} 级</span>`;
  const upCost = t.tier === 0 ? '铁500·铜300·银150·金50·极品灵石×1' : t.tier === 1 ? '铁5000·铜3000·银1500·金500·仙玉×1' : '';
  const fixCost = t.tier === 0 ? (which === 'pick' ? '铁矿×5' : '金矿×1') : t.tier === 1 ? '极品灵石×1' : '仙玉×1';
  return `<div class="row"><div class="lab">${icon} <b style="color:${tc}">${nm}</b> ${lvlTxt}<small>持久 <b class="${t.dur <= 10 ? 'r' : 'y'}">${t.dur}</b>/${t.max} · 本级采集 ${t.uses | 0}/${C.toolNeedL(lvl)} · 暴击率 <b class="y">${(Math.min(100, lvl * 0.1)).toFixed(1)}%</b>（暴击产量 ×1~10）</small><small>${t.tier < 2 ? `升档：${upCost}（升档后上限 = 当前持久） · ` : ''}修复（修满）：${fixCost}${t.tier === 0 ? ' · 强化符：上限 +100 并回 100' : ''}</small></div>` +
    `${t.tier < 2 ? `<button class="btn gold" onclick="window.toolUp('${which}','${from}')">升档</button>` : ''}<button class="btn" onclick="window.toolFix('${which}','${from}')" ${t.dur >= t.max ? 'disabled' : ''}>修复</button>${t.tier === 0 ? `<button class="btn" onclick="window.toolFuqUse('${which}','${from}')" ${((S.inv && S.inv.fuq) | 0) > 0 ? '' : 'disabled'}>强化符(${(S.inv && S.inv.fuq) | 0})</button>` : ''}</div>`;
}
function toolBack(from) { if (from === 'bag') sheetBag(); else sheetLife('forge'); }
window.toolUp = function (which, from) {
  try {
    const t = S.tools && S.tools[which]; if (!t || t.tier >= 2) return;
    const ores = S.ores || (S.ores = {});
    const need = t.tier === 0 ? { iron: 500, copper: 300, silver: 150, gold: 50 } : { iron: 5000, copper: 3000, silver: 1500, gold: 500 };
    for (const k in need) if ((ores[k] | 0) < need[k]) { toastLog('sys', `⚠️ ${ORES[k].name}不足（需 ${need[k]}）`); return; }
    if (t.tier === 0) { if ((ores.sp5 | 0) < 1) { toastLog('sys', '⚠️ 需要极品灵石×1'); return; } }
    else if ((S.xianyu | 0) < 1) { toastLog('sys', '⚠️ 需要仙玉×1'); return; }
    for (const k in need) ores[k] -= need[k];
    if (t.tier === 0) ores.sp5 -= 1; else S.xianyu -= 1;
    t.tier += 1; t.max = t.dur; // 升档带上限：新档上限 = 升档时当前持久，满持久开局
    log('good', `✨ 升档成功：<b style="color:${C.TOOL_TIER_COLORS[t.tier]}">${C.TOOL_NAMES[which][t.tier]}</b>，持久 ${t.dur}/${t.max}`);
    commit(); toolBack(from);
  } catch (_) {}
};
window.toolFix = function (which, from) {
  try {
    const t = S.tools && S.tools[which]; if (!t || t.dur >= t.max) return;
    const ores = S.ores || (S.ores = {});
    if (t.tier === 0) {
      if (which === 'pick') { if ((ores.iron | 0) < 5) { toastLog('sys', '⚠️ 修复需铁矿×5'); return; } ores.iron -= 5; }
      else { if ((ores.gold | 0) < 1) { toastLog('sys', '⚠️ 修复需金矿×1'); return; } ores.gold -= 1; }
    } else if (t.tier === 1) { if ((ores.sp5 | 0) < 1) { toastLog('sys', '⚠️ 修复需极品灵石×1'); return; } ores.sp5 -= 1; }
    else { if ((S.xianyu | 0) < 1) { toastLog('sys', '⚠️ 修复需仙玉×1'); return; } S.xianyu -= 1; }
    t.dur = t.max;
    log('good', `🔧 ${C.TOOL_NAMES[which][t.tier]} 修复完成，持久 ${t.dur}/${t.max}`);
    commit(); toolBack(from);
  } catch (_) {}
};
window.toolFuqUse = function (which, from) {
  try {
    const t = S.tools && S.tools[which]; if (!t || t.tier !== 0) return;
    if (!S.inv || (S.inv.fuq | 0) < 1) { toastLog('sys', '⚠️ 没有强化符（商会有售）'); return; }
    S.inv.fuq -= 1; t.max += 100; t.dur += 100;
    log('good', `🎫 ${C.TOOL_NAMES[which][0]} 强化完成：持久 ${t.dur}/${t.max}`);
    commit(); toolBack(from);
  } catch (_) {}
};
window.lwEat = function (idx) {
  try {
    const arr = S.lingwu || [];
    const it = arr[idx | 0]; if (!it) return;
    const base = Math.floor(it.y * 0.1), f = C.eleFactorL(S, it.e), gain = Math.floor(base * f), note = C.eleNoteL(f); // v1130 倍率矩阵
    arr.splice(idx | 0, 1);
    const _aw = C.tryAwakenRoot(S, C.rootBaseL(it.e)); // v1134 生吃灵物觉醒判定：须有该行基础灵根
    const _cp = _aw ? null : C.tryComprehendRoot(S, it.e); // v1135 吃不相对应灵物：极稀有领悟新灵根
    S.lifespan = (S.lifespan || 100) + gain;
    log('good', `🌿 生吃<b style="color:${C.GRADE_COLORS[it.g - 1]}">${C.LW_GRADE_NAMES[it.g - 1]}</b>·<b style="color:${C.LW_ELE_COLORS[it.e]}">${it.e}</b>（${it.y} 年），寿元 <span class="g">+${gain}</span>${note ? `（${note}）` : ''}`);
    if (_aw) log('good', `🌟 <b>灵根觉醒！</b>${C.rootBaseL(it.e)}灵根食灵而醒，化作<b>${_aw}</b>灵根！`); // v1134
    if (_cp) log('good', `🌟 <b>顿悟新灵根！</b>此物与自身灵根不合，却意外领悟了从未有过的<b>${_cp}</b>灵根！`); // v1135
    commit(); sheetBag();
  } catch (_) {}
};
window.eatHerb = async function (key) { // v1136 吃属性草
  try {
    await srvProg('/api/progress/eat_herb', { key });
    const r = C.eatHerb(S, key); if (!r) return;
    if (r.err === 'daily') { log('bad', '🌿 今日属性草已吃满 5 棵，明日再来'); return; }
    if (r.err) { log('bad', '没有这种药草'); return; }
    const _an = { str: '力量', vit: '体质', agi: '身法', int: '智力', def: '防御' }[r.attr] || r.attr;
    log('good', `🌿 吃下${MATS[key].name}：饱食 <span class="g">+20</span> · ${_an} <span class="g">+1</span> · 丹毒 <span class="r">+20</span>（今日 ${r.n}/5）`);
    if (r.awakened) log('good', `🌟 <b>灵根觉醒！</b>${r.e}灵根食草而醒，化作<b>${r.awakened}</b>灵根！`);
    if (r.comprehended) log('good', `🌟 <b>顿悟新灵根！</b>竟领悟了从未有过的<b>${r.comprehended}</b>灵根！`);
    commit(); sheetBag();
  } catch (_) {}
};
let lifeTab = 'cook', tameAttr = 'str', tameTargetId = 0, forgeSlot = 'weapon', forgeSet = 'crit', forgeKind = 'char', forgePet = null;
const VIG = n => `<b style="color:#7fd6ff">${n}</b>`;
const needTxt = need => need.map(([st, k, n]) => { const have = S[st][k] || 0, nm = st === 'food' ? MEATS[k].name : st === 'eggs' ? EGGS[k].name : st === 'mats' ? (MATS[k] || LU[k]).name : st === 'prey' ? PREY[k].name : st === 'pages' ? PAGES[k].name : ORES[k].name; return `<span class="${have >= n ? '' : 'r'}">${nm}×${n}<small style="display:inline">(${have})</small></span>`; }).join(' + ');
const dishName = k => { const d = C.dishOf(k); return d ? `<span class="${['', '', 'q2', 'q3'][d.q]}">${d.q > 1 ? C.QNAME[d.q] : ''}${d.name}</span>` : k; };
const gearName = g => `<span class="gq${g.q || 1}" title="${C.GQNAME[g.q || 1]}">${C.gearItemName(g.k, g.set)}</span> <small style="display:inline">${AN[C.GEAR_SETS[g.set].attr]}+${(g.rl|0) > 0 ? Math.round(g.v * C.refineMult(g)) : g.v}</small>${g.rule && C.GEAR_RULES[g.rule] ? ` <span class="pu" title="${C.GEAR_RULES[g.rule].d}">【规则·${C.GEAR_RULES[g.rule].n}】</span>` : ''}${(g.rl|0) > 0 ? ` <span class="y">炼灵${g.rl}${C.refineTierName(g.rl) ? '·' + C.refineTierName(g.rl) : ''}</span>` : ''}`; // v1006 规则词条 + v1013 炼灵纹
const petSetTxt = pt => { const act = C.petActiveSets(pt), ks = Object.keys(act); return ks.length ? ks.map(k => `<span class="y">🛡️${C.GEAR_SETS[k].name}套 ${C.GEAR_SETS[k].fmt(act[k])}</span>`).join(' ') : '<small style="display:inline;color:var(--dim)">未激活（同套 2 件起）</small>'; };
const setTxt = () => { const c = C.setCounts(S), qm = C.setQuality(S), act = C.activeSets(S), ks = Object.keys(C.GEAR_SETS).filter(k => c[k]); return (ks.length ? ks.map(k => { const G = C.GEAR_SETS[k], n = c[k]; if (n >= 2 && k === 'def') { const myDef = C.fightAttrs(S, false).def, pt = C.activePet(S); return `<span class="y">🛡️${G.name}套 ${n}件：${G.fmt(act[k])}</span> <small style="display:inline;color:var(--dim)">（${n}件档 ${Math.round(G.v[Math.min(5, n) - 2] * 100)}% × 品质 ${Math.round(qm[k] * 100) / 100}；你 防御 ${myDef} → ${myDef + C.setDefBoost(myDef, act[k])}${pt ? `；出战灵宠 防御 ${pt.attrs.def} → ${pt.attrs.def + C.setDefBoost(pt.attrs.def, act[k])}` : ''}）</small>`; } return n >= 2 ? `<span class="y">🛡️${G.name}套 ${n}件：${G.fmt(act[k])}</span> <small style="display:inline;color:var(--dim)">（${n}件档 ${G.fmt(G.v[Math.min(5, n) - 2]).replace(/^\D+/, '')} × 品质 ${Math.round(qm[k] * 100) / 100}）</small>` : `<small style="display:inline;color:var(--dim)">${G.name}套 1件（2件激活：${G.fmt(G.v[0])}）</small>`; }).join('<br>') : '<small style="display:inline;color:var(--dim)">未穿戴装备</small>') + `<small>同套 2/3/4/5 件逐级增强，效果 × 同套平均品质系数，可同时激活多套</small>`; };
const BUFFN = b => b.k === 'luck' ? `气运 ×${b.v}` : `${AN[b.k]} +${Math.round(b.v * 100)}%`;
function lifeLocked(k) { if ((C.ADV_LIFE||[]).includes(k) && !C.canAdvLife(S)) return true; return !((S.lifeChoices || []).includes(k)); } // v204 未选择的生活技能锁定；v560 高阶需主宰轮回；v565 改走C对象
let _lcFromName = false; // v204 选择面板是否来自取名流程
function sheetLifeChoice(fromName) { // v204 选择生活技能（取名后必选；境界提升后可补选）
  _lcFromName = !!fromName;
  const max = C.lifeChoiceMax(S), cur = S.lifeChoices || [], left = Math.max(0, max - cur.length);
  const desc = { alc: '炼制丹药', cook: '烹饪菜肴', forge: '锻造装备', refine: '炼金提炼', tame: '驯养灵宠' };
  openSheet(`<h2>🎯 选择生活技能</h2><div class="hint">选择你的生活技能（还可选择 <b class="y">${left}</b> 个，境界提升可解锁更多）。未选择的技能将<b class="r">无法使用</b>。</div>` +
    `<div class="grid2" style="grid-template-columns:repeat(2,1fr);gap:8px">` + Object.keys(C.LIFE_SKILLS).map(k => {
      const sk = C.LIFE_SKILLS[k], chosen = cur.includes(k);
      const _advLock = (C.ADV_LIFE||[]).includes(k) && !C.canAdvLife(S); // v560 主宰轮回后参悟；v565 改走C对象
      return `<button class="act" data-lifechoice="${k}" ${ _advLock ? 'disabled style="padding:12px;opacity:0.4"' : `style="padding:12px;${chosen ? 'border:2px solid #ffd700;' : ''}"`}><span class="t" style="font-size:20px">${_advLock ? '🔒' : sk.icon}</span><span class="s">${sk.name}${chosen ? ' ✓' : ''}<br><small>${_advLock ? '主宰轮回后参悟' : desc[k] + ' · 关联' + AN[sk.attr]}</small></span></button>`;
    }).join('') + `</div>` +
    `<div class="row" style="margin-top:10px"><button class="btn gold full" data-lcdone>${fromName ? '确定，开始仙途' : '完成'}</button></div>` +
    (fromName ? '' : `<div class="row"><button class="btn full" data-a="life">返回生活技能</button></div>`));
}
function sheetLife(tab) {
  if (S.dead) { closeSheet(); return; }
  tab = tab || lifeTab;
  const _cur = S.lifeChoices || [];
  if (!_cur.length) { sheetLifeChoice(false); return; } // v204 未选择：先选
  if (lifeLocked(tab)) tab = _cur[0]; // v204 当前页未解锁：跳到已选第一个
  lifeTab = tab; const LS = C.LIFE_SKILLS, L = C.lifeOf(S, tab);
  const tabs = `<div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:8px">` + Object.keys(LS).map(k => { const l = C.lifeOf(S, k), locked = lifeLocked(k); return `<button class="btn ${k === tab ? 'on' : ''}" ${locked ? 'disabled' : (k === 'alc' ? 'data-a="alchemy"' : `data-life="${k}"`)} style="padding:6px 2px;font-size:12px;line-height:1.3;${locked ? 'opacity:0.4;' : ''}">${locked ? '🔒' : LS[k].icon}${LS[k].name}<br><small>${locked ? '未选择' : (l ? `Lv.${l.lv} · ${AN[LS[k].attr]}` : '未学习')}</small></button>`; }).join('') + `</div>`;
  const qp = C.lifeQProbs(S, tab), fali = C.useFali(S);
  const manaBarHtml = fali ? `<div class="bar mana${(S.realm|0) >= 8 ? ' xian' : ''}" style="margin-bottom:8px"><i style="width:${Math.min(100, S.mana / C.manaMax(S) * 100)}%"></i><span>${(S.realm|0) >= 8 ? '仙力' : '法力'} ${S.mana}/${C.manaMax(S)}（每次 ${C.lifeManaCost(S)}）</span></div>` : '';
  const head = manaBarHtml + `<div class="hint">${fali ? `法力 <b style="color:#5fd8e0">${S.mana}/${C.manaMax(S)}</b>（每次 ${C.lifeManaCost(S)} 法力，签到恢复）` : `活力 ${VIG(S.vigor)}/${C.vigorCap(S)}（每次 ${K.COST_LIFE} 活力，签到恢复）`}，🍗饱食度 <b class="g">${S.hunger}</b>（每次 ${K.HUNGER_ACT}）。${LS[tab].icon}${LS[tab].name} Lv.${L.lv}（经验 ${L.xp}/${C.alcNeed(L.lv)}）· 关联属性 <b>${AN[LS[tab].attr]} ${S.attrs[LS[tab].attr]}</b>（成功率 +${C.pct(C.lifeAttrRate(S, tab))}，品质 +${C.pct(C.lifeAttrQ(S, tab))}）· 成功率 <b class="y">${C.pct(C.lifeRate(S, tab))}</b>${tab === 'refine' ? '' : tab === 'forge' ? '（铁矿；其他矿石见下方）' : ` · 品质 <span class="q3">极品</span> ${C.pct(qp.q3)} / <span class="q2">精良</span> ${C.pct(qp.q2)}`}</div>`; // v715 饱食度显示
  const dis = (lv) => C.lifeCost(S) || L.lv < lv ? 'disabled' : '';
  const btns = (k, lv) => `<button class="btn" data-craft="${tab}" data-k="${k}" data-n="1" ${dis(lv)}>${L.lv < lv ? 'Lv.' + lv : '做 1'}</button><button class="btn gold" data-craft="${tab}" data-k="${k}" data-n="5" ${dis(lv)}>做 5</button>`;
  const forgePetRecipes = () => `<h3>打造灵宠装备</h3><div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:6px">${Object.keys(C.GEAR_SETS).map(st => `<button class="btn ${forgeSet === st ? 'on' : ''}" data-fset="${st}" style="padding:6px 2px;font-size:12px;line-height:1.3">${C.GEAR_SETS[st].name}套<br><small>+${AN[C.GEAR_SETS[st].attr]}</small></button>`).join('')}</div><div class="empty" style="padding:2px 0 6px;text-align:left">${C.GEAR_SETS[forgeSet].name}套：2/3/4/5 件 ${C.GEAR_SETS[forgeSet].v.map(v => C.GEAR_SETS[forgeSet].fmt(v)).join(' / ')}（与人物套装同规则）</div><div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:6px">${Object.keys(C.SLOTS).map(sl => `<button class="btn ${forgeSlot === sl ? 'on' : ''}" data-fslot="${sl}" style="padding:6px 2px;font-size:12px;line-height:1.3">${C.PET_SLOT_NAMES[sl]}<br><small>${C.GEAR_SETS[forgeSet].name}${C.PET_SLOT_NAMES[sl]}</small></button>`).join('')}</div>` + Object.keys(C.PET_GEAR).filter(k => C.PET_GEAR[k].slot === forgeSlot).map(k => { const g = C.PET_GEAR[k]; return `<div class="row"><div class="lab">${C.gearItemName(k, forgeSet)}<small>${needTxt(g.need)}</small><small>成功率 <b class="y">${C.pct(C.forgeRate(S, k))}</b> · 品质 ${C.forgeQProbs(S, k).map((p, i) => `<span class="gq${i + 1}">${C.GQNAME[i + 1]} ${C.pct(p)}</span>`).join(' ')}</small></div>${btns(k, g.lv)}</div>`; }).join('');
  const forgePetBody = () => {
    if (!S.pets.length) return '<div class="empty">暂无灵宠，先去掏个兽蛋吧</div>' + forgePetRecipes();
    if (!forgePet || !S.pets.find(p => p.id === forgePet)) forgePet = (S.pets.find(p => p.id === S.pet) || S.pets[0]).id;
    const pt = S.pets.find(p => p.id === forgePet), P = PETS[pt.k];
    return `<h3>穿戴 · ${P.icon}${P.name}#${pt.id}</h3><div class="row" style="flex-wrap:wrap;gap:4px">${S.pets.map(p => `<button class="btn ${p.id === forgePet ? 'on' : ''}" data-pickpet="${p.id}" style="padding:6px 10px;font-size:12px">${PETS[p.k].icon}${PETS[p.k].name}#${p.id}</button>`).join('')}</div>` +
    `<div class="row"><div class="lab">${petSetTxt(pt)}<small>灵宠技能取自身套装，无自身套装时取主人套装，再无则 2 件基础</small></div></div>` +
    Object.keys(C.SLOTS).map(sl => { const g = pt.peq && pt.peq[sl]; return `<div class="row"><div class="lab">${C.PET_SLOT_NAMES[sl]}：${g ? gearName(g) : '<small style="display:inline">空</small>'}</div>${g ? `<button class="btn" data-punequip="${pt.id}:${sl}">卸下</button>` : ''}</div>`; }).join('') +
    ((S.petBag || []).length ? `<h3>灵宠装备包</h3>` + S.petBag.map(g => `<div class="row"><div class="lab">${gearName(g)}</div><button class="btn gold" data-pequip="${pt.id}:${g.id}">给${P.name}穿</button><button class="btn" data-psell="${g.id}">卖 ${C.gearPrice(g)}金</button></div>`).join('') : '<div class="empty">装备包是空的，在下方打造</div>') +
    forgePetRecipes();
  };

  let body = '';
  if (tab === 'cook') body = Object.keys(C.DISHES).filter(k => !C.DISHES[k].zx).map(k => { const d = C.DISHES[k]; return `<div class="row"><div class="lab">${d.name}<small>${needTxt(d.need)}<br>饱食 +${d.hunger} · 体力 +${C.dishSta(k, 1)}/${C.dishSta(k, 2)}/${C.dishSta(k, 3)} · 精良/极品：${d.buff === 'luck' ? '气运 ×1.15/×1.3（10 点体力）' : AN[d.buff] + ' +10%/+20%（3 场战斗）'}</small></div>${btns(k, d.lv)}</div>`; }).join('') + `<div class="empty" style="padding:6px">做好的菜肴在背包中食用</div>` +
    `<h3>🍲 珍馐<small style="font-weight:normal;color:var(--dim)"> · PK 战前使用，最先手无视敏捷</small></h3>` + Object.keys(C.DISHES).filter(k => C.DISHES[k].zx).map(k => { const d = C.DISHES[k], n = (S.zx || {})[k] || 0; return `<div class="row"><div class="lab">${d.name}${n ? ` <b class="y">×${n}</b>` : ''}<small>${needTxt(d.need)}<br>${d.zxDesc}</small></div>${btns(k, d.lv)}</div>`; }).join('');
  else if (tab === 'forge') body = `<h3>⛏️ 采集器具</h3>` + toolCardHtml('pick', 'forge') + toolCardHtml('hoe', 'forge') + `<div class="grid2" style="grid-template-columns:repeat(2,1fr);gap:5px;margin-bottom:8px"><button class="btn ${forgeKind === 'char' ? 'on' : ''}" data-fkind="char" style="padding:6px 2px">🗡️ 人物装备</button><button class="btn ${forgeKind === 'pet' ? 'on' : ''}" data-fkind="pet" style="padding:6px 2px">🐾 灵宠装备</button></div>` + (forgeKind === 'pet' ? forgePetBody() :
    `<h3>当前装备</h3><div class="row"><div class="lab">${setTxt()}</div></div>` + Object.keys(C.SLOTS).map(sl => { const g = S.equip[sl]; return `<div class="row"><div class="lab">${C.SLOTS[sl].name}：${g ? gearName(g) : '<small style="display:inline">空</small>'}</div>${g ? `<button class="btn" data-unequip="${sl}">卸下</button><button class="btn" data-refine="equip:${sl}">炼灵</button>` : ''}</div>`; }).join('') +
    (S.gearBag.length ? `<h3>装备包（${S.gearBag.length}/${C.bagCap(S)}件）</h3>` + S.gearBag.map(g => `<div class="row"><div class="lab">${gearName(g)}</div><button class="btn gold" data-equip="${g.id}">装备</button><button class="btn" data-sellgear="${g.id}">卖 ${C.gearPrice(g)}金</button><button class="btn" data-refine="bag:${g.id}">炼灵</button></div>`).join('') : '') +
    `<h3>打造</h3><div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:6px">${Object.keys(C.GEAR_SETS).map(st => `<button class="btn ${forgeSet === st ? 'on' : ''}" data-fset="${st}" style="padding:6px 2px;font-size:12px;line-height:1.3">${C.GEAR_SETS[st].name}套<br><small>+${AN[C.GEAR_SETS[st].attr]}</small></button>`).join('')}</div><div class="empty" style="padding:2px 0 6px;text-align:left">${C.GEAR_SETS[forgeSet].name}套（每件 +${AN[C.GEAR_SETS[forgeSet].attr]}）：2/3/4/5 件 ${C.GEAR_SETS[forgeSet].v.map(v => C.GEAR_SETS[forgeSet].fmt(v)).join(' / ')}</div><div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:6px">${Object.keys(C.SLOTS).map(sl => `<button class="btn ${forgeSlot === sl ? 'on' : ''}" data-fslot="${sl}" style="padding:6px 2px;font-size:12px;line-height:1.3">${C.SLOTS[sl].name}<br><small>${C.SET_ITEMS[forgeSet][sl]}</small></button>`).join('')}</div>` + Object.keys(C.GEAR).filter(k => C.GEAR[k].slot === forgeSlot).map(k => { const g = C.GEAR[k]; return `<div class="row"><div class="lab">${C.gearItemName(k, forgeSet)}<small>${AN[C.GEAR_SETS[forgeSet].attr]} +${[1, 2, 3, 4, 5].map(q => `<span class="gq${q}">${C.gearVal(k, q)}</span>`).join('/')} · ${needTxt(g.need)}</small><small>成功率 <b class="y">${C.pct(C.forgeRate(S, k))}</b> · 品质 ${C.forgeQProbs(S, k).map((p, i) => `<span class="gq${i + 1}">${C.GQNAME[i + 1]} ${C.pct(p)}</span>`).join(' ')}</small></div>${btns(k, g.lv)}</div>`; }).join(''));
  else if (tab === 'refine') body = `<div class="empty" style="padding:6px">双倍产出概率 ${C.pct(C.refineDouble(S))} · 极品灵石/凝露只能掉落</div>` + Object.keys(C.REFINES).map(k => { const r = C.REFINES[k]; return `<div class="row"><div class="lab">${r.name}${k.startsWith('r_gold') ? ' → 金矿×1' : ''}<small>${needTxt(r.need)}${r.pot ? ` · 回复${C.POTIONS[r.pot].res}上限 <span class="q1">30%</span>/<span class="q2">40%</span>/<span class="q3">50%</span>（品质 <span class="q3">极品</span> ${C.pct(qp.q3)} / <span class="q2">精良</span> ${C.pct(qp.q2)}）${r.pot === 'mp' ? ' · 场外使用' : ''}` : ''}</small></div>${btns(k, r.lv)}</div>`; }).join('');
  else { const ap = C.activePet(S), hp = C.hatchProbs(S);
    const bp = S.beastPills || {}, meatN = ['rabbit', 'deer', 'wolf', 'tiger'].reduce((a, k) => a + (S.food[k] || 0), 0);
    const pillRows = `<div class="row"><div class="lab">🦴 炼制灵兽丹<small>肉×2（优先低级，当前 ${meatN} 份）+ 📜普通残页×1（当前 ${S.pages.pg1 || 0} 张，成功才扣）· 成功率 <b class="y">${C.pct(C.lifeRate(S, 'tame'))}</b> · 品质 <span class="q1">普通</span>/<span class="q2">精良</span>/<span class="q3">极品</span>（灵宠经验 +${K.BEASTPILL_XP[1]}/+${K.BEASTPILL_XP[2]}/+${K.BEASTPILL_XP[3]}）· 失败只耗 1 份肉 · 极品全服通告</small></div><button class="btn" data-tamepill="1" ${(C.lifeCost(S) || meatN < 2 || !(S.pages.pg1 > 0)) ? 'disabled' : ''}>炼 1</button><button class="btn gold" data-tamepill="5" ${(C.lifeCost(S) || meatN < 2 || !(S.pages.pg1 > 0)) ? 'disabled' : ''}>炼 5</button></div>` +
      `<div class="row"><div class="lab">🦴 灵兽丹库存<small>${[1, 2, 3].map(q => `<span class="q${q}">${C.QNAME[q]}</span>×${bp['bp' + q] || 0}`).join(' · ')}${ap ? ' → 喂给' + PETS[ap.k].icon + PETS[ap.k].name : '（需出战灵宠）'}</small></div>${[1, 2, 3].filter(q => bp['bp' + q] > 0).map(q => `<button class="btn gold" data-feedpill="${q}" ${ap ? '' : 'disabled'}>喂${C.QNAME[q]}</button>`).join('')}</div>`;
    const _tap = (tameTargetId ? S.pets.find(p => p.id === tameTargetId) : null) || ap;
    const petList = S.pets.length > 1 ? `<div class="row"><div class="lab">选择灵宠<small>（点一下切换训练目标+上场，双击下场，最多4只）<br>${S.pets.map(pt => { const P = PETS[pt.k], Q = petQ(pt); const _isOut = Array.isArray(S.pet) ? S.pet.map(x=>+x).includes(pt.id) : S.pet === pt.id; const _isTap = _tap && _tap.id === pt.id; return `<button class="btn ${_isOut ? 'on' : ''}" data-battlepet="${pt.id}" style="margin:2px;padding:4px 8px;font-size:12px;${_isTap ? 'border:2px solid #ffd700;' : ''}">${P.icon}<span style="color:${Q.color}">${P.name}</span>#${pt.id}${_isOut ? '✓' : ''}${_isTap ? '🎯' : ''}</button>`; }).join('')}</small></div></div>` : '';
    body = petList + (_tap ? `<div class="row"><div class="lab">${PETS[_tap.k].icon} <b style="color:${petQ(_tap).color}">${PETS[_tap.k].name}</b> #${_tap.id} Lv.${_tap.lv}<small>忠诚 <b>${_tap.loyal}</b> · 饥饿 ${Math.round(_tap.hunger)} · 成功时忠诚 +${Math.min(100 - _tap.loyal, K.TAME_LOYAL + Math.floor(L.lv / 3))}，${C.pct(C.tamePetXpChance(S))} 得灵宠经验 +${K.TAME_PET_XP}<br>技能 <b class="y">${(_tap.skills || []).map(sk => C.petSkillTxt(S, _tap, sk)).join("·") || "无"}</b>${_tap.q === 7 ? ` · 🌟神通 <b class="y">${_tap.talent ? C.PET_TALENT[_tap.k].name : '未领悟'}</b>` : ''}</small></div></div>
      <div class="row"><div class="lab">驯养次数<small>${(S.realm | 0) >= 8 ? `每次耗<span style="color:#ef5350">${(_tap.q | 0) >= 6 ? 20 : 10}年寿元${(_tap.q | 0) >= 6 ? '（仙级以上双倍）' : ''}</span> · ` : ''}输入一次后锁定</small></div>
      <input type="number" id="tameNInput" value="${S.tameN || 1}" min="1" max="999" style="width:64px;padding:8px;font-size:15px;text-align:center;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:10px" onchange="try{var _v=document.getElementById('tameNInput');S.tameN=Math.max(1,Math.min(999,parseInt(_v.value)||1));_v.value=S.tameN;commit()}catch(_){}" ><button class="btn gold" data-tame-once ${C.lifeCost(S) ? 'disabled' : ''} style="padding:8px 20px">驯</button></div>` +
      `<div class="row" style="border:none;padding-bottom:2px"><div class="lab">训练属性<small>成功时该属性 +1 / 精良 +2 / 极品 +3；失败无收获</small></div></div><div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:6px">${['str', 'agi', 'def', 'vit', 'int'].map(a => `<button class="btn ${tameAttr === a ? 'on' : ''}" data-tameattr="${a}" style="padding:6px 2px;font-size:12px;line-height:1.3">${AN[a]}<br><small>${_tap.attrs[a]}</small></button>`).join('')}</div>` : '<div class="empty">没有可训练的灵宠</div>') + pillRows +
      `<div class="row"><div class="lab">驯兽加成<small>灵宠咬人概率 ×${Math.round(C.tameBiteMult(S) * 100) / 100} · 孵化概率 ${Object.keys(hp).map(k => PETS[k].name + ' ' + C.pct(hp[k])).join(' · ')}</small></div></div>`; }
  openSheet(`<h2>生活技能</h2>` + (() => { const _mx = C.lifeChoiceMax(S), _cl = (S.lifeChoices || []).length, _lf = Math.max(0, _mx - _cl); return _lf > 0 ? `<div class="row"><button class="btn gold full" data-lcopen>🎯 再选择 ${_lf} 个生活技能（境界提升解锁更多）</button></div>` : ''; })() + tabs + head + body + `<button class="btn full" data-close>关闭</button>`);
}
async function doCraft(skill, k, n, opt) {
  if (lifeLocked(skill)) { toastLog('bad', '🔒 未选择该生活技能'); return; } // v204
  let ok = 0, fail = 0, lvUp = 0, xp = 0, stop = ''; const got = [];
  // v964 彻底版：炼金丹药分支登录在线时走服务端
  const useAlcServer = skill === 'alc' && C.REFINES[k] && C.REFINES[k].pot && window.MHXY && MHXY.loggedIn && MHXY.loggedIn();
  for (let i = 0; i < n; i++) {
    let r;
    if (useAlcServer) {
      try {
        const resp = await MHXY.api('/api/roll/craft_alc', {method:'POST', body:{key:k}});
        const j = resp && resp.json;
        if (resp.ok && j && j.ok) {
          // 本地应用（服务端已记账）
          if (!S.elixirs) S.elixirs = {};
          if (j.success && j.key) S.elixirs[j.key] = (S.elixirs[j.key]|0) + j.n;
          const need = C.REFINES[k].need || [];
          if (j.success) { for (const [nst,nk,nn] of need) { if (S[nst]) { S[nst][nk] = (S[nst][nk]|0) - nn; if (S[nst][nk] <= 0) delete S[nst][nk]; } } }
          else if (need[0]) { const [fst,fk] = need[0]; if (S[fst]) { S[fst][fk] = (S[fst][fk]|0) - 1; if (S[fst][fk] <= 0) delete S[fst][fk]; } }
          try { payLife(S); } catch(_){}
          S.vigor = j.vigor; S.mana = j.mana;
          if (S.life && S.life.refine) { S.life.refine.lv = j.lifeLv; S.life.refine.xp = j.lifeXp; }
          try { hungerDown(S, K.HUNGER_ACT, 1); } catch(_){}
          if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
          r = {ok: j.success, pot: j.key, n: j.n||0, xp: 0, lvUp: j.lvUp||0};
          xp += 0; // 服务端已加经验，本地 xp 仅用于显示（此处计 0，由 lvUp 体现）
        } else {
          const e = (j||{}).error;
          if (e === 'no_vigor') r = {err:'vigor'};
          else if (e === 'no_mana') r = {err:'mana'};
          else if (e === 'no_mats' || e === 'bad_key') r = {err:'mat'};
          else if (e === 'low_lv') r = {err:'lv'};
          else if (e === 'dead') r = {err:'dead'};
          else if (resp.netErr) r = C.craft(S, skill, k, opt);
          else { stop = '服务端异常，请稍后重试'; break; }
        }
      } catch(e) { r = C.craft(S, skill, k, opt); }
    } else {
      r = C.craft(S, skill, k, opt);
    }
    if (!r) break;
    if (r.err) { stop = { vigor: '活力不足', mana: '法力不足（签到回满，或喝法力药水）', mat: '材料不足', lv: '等级不足', dead: '' }[r.err]; break; }
    xp += r.xp; lvUp += r.lvUp; if (r.ok) { ok++; got.push(skill === 'cook' ? dishName(r.item) : skill === 'forge' ? gearName(r.gear) + (r.equipped ? '（已自动装备）' : '') : C.REFINES[k].pot ? `${elixName(r.pot)}${r.n > 1 ? '×' + r.n + '<span class="y">（双倍！）</span>' : ''}` : `${C.REFINES[k].out[0] === 'ores' ? rarTxt('mine', C.REFINES[k].out[1]) : rarTxt('farm', C.REFINES[k].out[1])}×${r.n}${r.n > 1 ? '<span class="y">（双倍！）</span>' : ''}`); } else fail++; }
  if (ok + fail) { const LS = C.LIFE_SKILLS[skill], nm = skill === 'forge' ? C.gearItemName(k, opt.set) : (C.RECIPES[skill][k]).name;
    log(ok ? 'good' : 'bad', `${LS.icon} ${LS.name}「${nm}」${ok + fail} 次：成功 <span class="g">${ok}</span>，失败 <span class="r">${fail}</span>（活力 -${ok + fail}，${LS.name}经验 +${xp}）` + (got.length ? `<br>获得：${got.join('、')}` : '') + (fail ? `<br><small>失败损耗了少量材料</small>` : '') + (lvUp ? `<br><span class="y">${LS.name}等级提升至 Lv.${C.lifeOf(S, skill).lv}！</span>` : '') + (stop ? `<br><span class="r">⚠️ ${stop}</span>` : '')); }
  else if (stop) toastLog('sys', '⚠️ ' + stop);
  afterAct(); commit(); sheetLife(skill);
}
function doTame(n) {
  if (lifeLocked('tame')) { toastLog('bad', '🔒 未选择该生活技能'); return; } // v204
  let ok = 0, fail = 0, loyal = 0, px = 0, pu = 0, psks = [], ptls = [], lvUp = 0, stop = '', pet = null, gain = 0, lifeSpent = 0; const qs = [0, 0, 0, 0];
  for (let i = 0; i < n; i++) { const r = C.tame(S, tameAttr, tameTargetId || undefined); if (r.ok) { gain += r.gain; qs[r.q]++; } if (r.err) { stop = { vigor: '活力不足', mana: '法力不足（签到回满，或喝法力药水）', pet: '没有出战灵宠', lifespan: '寿元不足，无法驯养', dead: '' }[r.err]; break; } pet = r.pet; lvUp += r.lvUp; lifeSpent += (r.lifeCost | 0); if (r.ok) { ok++; loyal += r.loyal; px += r.petXp; pu += r.petUp; if (r.petSks) psks = psks.concat(r.petSks); if (r.petTls) ptls = ptls.concat(r.petTls); } else fail++; }
  if (pet) log(ok ? 'good' : 'bad', `🐾 驯养 ${PETS[pet.k].icon}${PETS[pet.k].name} ${ok + fail} 次：成功 ${ok}${qs[2] || qs[3] ? `（<span class="q2">精良 ${qs[2]}</span> · <span class="q3">极品 ${qs[3]}</span>）` : ''}，${AN[tameAttr]} <span class="g">+${gain}</span>（${pet.attrs[tameAttr]}），忠诚 <span class="g">+${loyal}</span>（${pet.loyal}）` + (px ? `，灵宠经验 +${px}${pu ? `，<span class="y">升到 Lv.${pet.lv}！</span>` : ''}${psks.length ? `，<span class="y">✨领悟【${[...new Set(psks)].map(sk => C.GEAR_SETS[sk].name).join('·')}】</span>` : ''}${ptls.length ? `，<span class="y">🌟 领悟天赋神通【${[...new Set(ptls)].join('·')}】</span>` : ''}` : '') + `（活力 -${ok + fail}${lifeSpent ? `，寿元 -${lifeSpent}年` : ''}）` + (lvUp ? `<br><span class="y">驯兽等级提升至 Lv.${S.life.tame.lv}！</span>` : '') + (stop ? `<br><span class="r">⚠️ ${stop}</span>` : ''));
  else if (stop) toastLog('sys', '⚠️ ' + stop);
  afterAct(); commit(); sheetLife('tame');
}
function doTamePill(n) {
  let ok = 0, fail = 0, xp = 0, lvUp = 0, stop = ''; const qs = [0, 0, 0, 0];
  for (let i = 0; i < n; i++) { const r = C.tamePill(S); if (r.err) { stop = { vigor: '活力不足', mana: '法力不足（签到回满，或喝法力药水）', mat: '肉不足（需要 2 份肉）', dead: '' }[r.err]; break; } lvUp += r.lvUp; xp += r.xp; if (r.ok) { ok++; qs[r.q]++; } else fail++; }
  if (ok + fail) log(ok ? 'good' : 'bad', `🦴 炼制灵兽丹 ${ok + fail} 次：成功 <span class="g">${ok}</span>${qs[2] || qs[3] ? `（<span class="q2">精良 ${qs[2]}</span> · <span class="q3">极品 ${qs[3]}</span>）` : ''}，失败 <span class="r">${fail}</span>（活力 -${ok + fail}）` + (lvUp ? `<br><span class="y">驯兽等级提升至 Lv.${C.lifeOf(S, 'tame').lv}！</span>` : '') + (stop ? `<br><span class="r">⚠️ ${stop}</span>` : ''));
  else if (stop) toastLog('sys', '⚠️ ' + stop);
  afterAct(); commit(); sheetLife('tame');
}
function doFeedPill(q) {
  const r = C.feedBeastPill(S, q);
  if (!r || r.err) { toastLog('sys', '⚠️ ' + ({ pet: '没有出战的灵宠', mat: '没有这种灵兽丹' }[r && r.err] || '无法喂食')); return; }
  const P = PETS[r.pet.k];
  log('good', `🦴 ${P.icon}<b class="pu">${P.name}</b> 服下<span class="q${r.q}">${C.QNAME[r.q]}灵兽丹</span>，灵宠经验 <span class="g">+${r.xp}</span>${r.ups ? `，<span class="y">升级至 Lv.${r.pet.lv}！</span>` : ''}${r.sks.length ? `，<span class="y">✨领悟【${[...new Set(r.sks)].map(sk => C.GEAR_SETS[sk].name).join('·')}】</span>` : ''}${r.tls.length ? `，<span class="y">🌟 领悟天赋神通【${[...new Set(r.tls)].join('·')}】</span>` : ''}`);
  petSay('feed', 0.65); if (r.ups) petSay('lvup', 0.9);
  afterAct(); commit(); sheetLife('tame');
}
function doDish(k, n) { const r = C.eatDish(S, k, n); if (r) log('good', `🍽️ 享用 ${dishName(k)} ×${r.n}，饱食 +${r.hunger}${r.sta ? `，体力 <span class="g">+${r.sta}</span>` : ''}` + (r.buff ? `，获得增益 <span class="y">${BUFFN(r.buff)}</span>（${r.buff.k === 'luck' ? '接下来 ' + r.buff.left + ' 点体力' : '接下来 ' + r.buff.left + ' 场战斗'}）` : '')); commit(); sheetBag(); }
const elixName = k => { const P = C.potOf(k); return P ? `<span class="${['', 'q1', 'q2', 'q3'][P.q]}">${C.QNAME[P.q]}${P.name}</span>` : k; };
function potSection() { const ks = Object.keys(S.elixirs || {}).filter(k => S.elixirs[k] > 0).sort(); if (!ks.length) return '';
  return `<h3>🧪 药水</h3>` + ks.map(k => { const P = C.potOf(k); return `<div class="row"><div class="lab">${C.POTIONS[P.t].icon} ${elixName(k)} ×${S.elixirs[k]}<small>${P.t === 'hp' ? `回复 ${Math.round(P.pct * 100)}% 生命上限（场外按最高生命 ${C.bumpPeak(S)} 计，当前 ${S.attrs.vit}；PK 中按战斗生命）` : `回复 ${Math.round(P.pct * 100)}% 法力上限（当前 ${S.mana}/${C.manaMax(S)}）`}</small></div>${P.t === 'hp' ? `<button class="btn gold" data-hppot="${k}" ${S.attrs.vit >= C.bumpPeak(S) || S.dead ? 'disabled' : ''}>使用</button>` : `<button class="btn gold" data-mppot="${k}" ${S.mana >= C.manaMax(S) || S.dead ? 'disabled' : ''}>使用</button>`}</div>`; }).join(''); }
function dishSection() { const ks = Object.keys(S.dishes).filter(k => S.dishes[k] > 0 && C.dishOf(k)); if (!ks.length) return '';
  return `<h3>🍲 菜肴</h3>` + ks.map(k => { const d = C.dishOf(k); return `<div class="row"><div class="lab">${dishName(k)} ×${S.dishes[k]}<small>饱食 +${d.hunger} · 体力 +${C.dishSta(d.d, d.q)}${d.q > 1 ? ' · 增益 ' + BUFFN(d.buff === 'luck' ? { k: 'luck', v: K.BUFF_LUCK[d.q] } : { k: d.buff, v: K.BUFF_ATTR[d.q] }) : ''}</small></div><button class="btn gold" data-dish="${k}" data-n="1">食用</button></div>`; }).join(''); }
function gearSection() { const eq = Object.keys(C.SLOTS).filter(sl => S.equip[sl]); if (!eq.length && !S.gearBag.length) return '';
  return `<h3>🗡️ 装备</h3><div class="row"><div class="lab">${setTxt()}</div></div>` + eq.map(sl => `<div class="row"><div class="lab">${C.SLOTS[sl].name}：${gearName(S.equip[sl])}<small>装备中（冒险/PK 生效）</small></div></div>`).join('') + (S.gearBag.length ? `<h3>装备包（${S.gearBag.length}/${C.bagCap(S)}件）</h3>` + S.gearBag.map(g => `<div class="row"><div class="lab">${gearName(g)}</div><button class="btn gold" data-equip="${g.id}">装备</button><button class="btn" data-sellgear="${g.id}">卖 ${C.gearPrice(g)}金</button><button class="btn" data-refine="bag:${g.id}">炼灵</button></div>`).join('') : ''); }
function sheetEbook(k, n) {
  const EB = C.EXP_BOOKS[k], LS = C.LIFE_SKILLS;
  openSheet(`<h2>使用 ${EB.name} ×${n}</h2><div class="hint">共 +${EB.xp * n} 经验，选择要提升的生活技能：</div>` + Object.keys(LS).map(t => { const l = C.lifeOf(S, t); if (!l) return ''; return `<div class="row"><div class="lab">${LS[t].icon}${LS[t].name} Lv.${l.lv} <small style="display:inline">· ${AN[LS[t].attr]}</small><small>经验 ${l.xp}/${C.alcNeed(l.lv)}</small></div><button class="btn gold" data-ebt="${t}" data-k="${k}" data-n="${n}">选择</button></div>`; }).join('') + `<button class="btn full" data-a="bag">返回背包</button>`);
}
function bookSection() { // 看书所得：观相残页 / 经验书 / 技能残页 / 技能书
  const PG = C.PAGES, EB = C.EXP_BOOKS, NP = K.PAGES_PER_BOOK, NS = K.SKILL_PAGES_PER_BOOK, life = Object.values(C.LIFE_SKILLS).map(x => x.name).join('、');
  const pk = Object.keys(PG).filter(k => S.pages[k] > 0), bk = Object.keys(EB).filter(k => S.expBooks[k] > 0), sp = Object.keys(SKILLS).filter(k => S.skillPages[k] > 0), sb = Object.keys(SKILLS).filter(k => S.skillBooks[k] > 0);
  const bookOf = pg => Object.keys(EB).find(b => EB[b].page === pg);
  return `<h3>📜 观相残页</h3>` + (pk.length ? pk.map(k => { const b = bookOf(k), can = Math.floor(S.pages[k] / NP); return `<div class="row"><div class="lab">${rarTxt('read', k)} ×${S.pages[k]}<small>${NP} 张合成 1 本${EB[b].name}（生活技能经验 +${EB[b].xp}）</small></div>
      <button class="btn" data-cpage="${k}" data-n="1" ${can ? '' : 'disabled'}>合成</button>${can > 1 ? `<button class="btn gold" data-cpage="${k}" data-n="${can}">全部 ×${can}</button>` : ''}</div>`; }).join('') : '<div class="empty">暂无残页，去修炼中看书吧</div>') +
    (bk.length ? `<h3>📘 经验书</h3>` + bk.map(k => `<div class="row"><div class="lab"><span class="${TIERCLS[+k.slice(2) - 1]}">📘${EB[k].name}</span> ×${S.expBooks[k]}<small>生活技能经验 +${EB[k].xp}/本 · 可用于：${life}（使用时选择）</small></div>
      <button class="btn" data-ebook="${k}" data-n="1">使用</button>${S.expBooks[k] > 1 ? `<button class="btn gold" onclick="qtyPrompt('ebook','${k}',${S.expBooks[k]})">数量</button>` : ''}</div>`).join('') : '') +
    (sp.length ? `<h3>📕 技能残页</h3>` + sp.map(k => `<div class="row"><div class="lab"><b class="q2">📕${SKILLS[k].name}</b>技能残页 ${S.skillPages[k]}/${NS}<small>集齐 ${NS} 张合成「${SKILLS[k].name}」技能书${S.skills.includes(k) ? '（已习得，合成后可出售）' : ''}</small></div>
      <button class="btn gold" data-cskill="${k}" ${S.skillPages[k] >= NS ? '' : 'disabled'}>合成</button></div>`).join('') : '') +
    ((S.maiPages | 0) > 0 ? `<h3>🌀 脉络残页</h3><div class="row"><div class="lab">🌀脉络残页 ×${S.maiPages}<small>秘境专属掉落 · 星藏使用：喂神藏气旋推进，实络 +1<span class="g">（永久，轮回保留）</span>，开脉术经验 +1（当前 ${S.maiShuXp}，Lv.${C.maiShuLv(S)}，每10点升1级，每级实脉+1）</small></div>
      <button class="btn" data-charpage="4">去星藏</button></div>` : '') +
    (sb.length ? `<h3>📗 技能书</h3>` + sb.map(k => `<div class="row"><div class="lab"><b class="pu">📗${SKILLS[k].name}</b>技能书 ×${S.skillBooks[k]}<small>${SKILLS[k].desc}${S.skills.includes(k) ? ` · 已习得，可出售 ${C.skillBookPrice(k)} 金` : ''}</small></div>
      ${S.skills.includes(k) ? `<button class="btn" data-sskill="${k}">出售</button>` : `<button class="btn gold" data-uskill="${k}">学习</button>`}</div>`).join('') : '');
}
async function doBook(kind, k, n) {
  if (kind === 'cpage') { const r = C.combinePages(S, k, n); if (r.ok) log('good', `📜 将 ${r.n * K.PAGES_PER_BOOK} 张${C.PAGES[k].name}装订成 <b>📘${C.EXP_BOOKS[r.book].name} ×${r.n}</b>`); }
  else if (kind === 'ebook') { const r = C.useExpBook(S, k, n, arguments[3] || 'alc'); if (r.ok) log('alc', `📘 研读${C.EXP_BOOKS[k].name} ×${r.n}，${C.LIFE_SKILLS[r.target].name}经验 <span class="g">+${r.xp}</span>` + (r.lvUp ? `，<span class="y">${C.LIFE_SKILLS[r.target].name}等级提升至 Lv.${C.lifeOf(S, r.target).lv}！</span>` : `（${C.lifeOf(S, r.target).xp}/${C.alcNeed(C.lifeOf(S, r.target).lv)}）`)); }
  else if (kind === 'cskill') { if (C.combineSkillPages(S, k).ok) log('good', `📕 集齐 ${K.SKILL_PAGES_PER_BOOK} 张残页，合成了 <b class="pu">📗${SKILLS[k].name}</b>技能书！`); }
  else if (kind === 'usemai') { const r = C.useMaiPages(S, parseInt(k) || 1); const n = r.n; if (n > 0) log('good', `🌀 使用脉络残页 ×${n}，实络 <span class="y">+${n}</span><span class="g">（永久）</span>，开脉术经验 +${n}（当前 ${(S.maiShuXp|0)}，Lv.${C.maiShuLv(S)}）${r.lvUp > 0 ? `，<b class="y">📖开脉术升级！实脉 +${r.lvUp}</b><span class="g">（永久）</span>` : ''}（当前实络 ${S.maiRLuo} 条，实脉 ${S.maiRMai} 条）`); }
  else if (kind === 'uskill') { if (C.useSkillBook(S, k).ok) log('good', `📗 研读技能书，习得技能 <b class="pu">${SKILLS[k].name}</b>！`); }
  else if (kind === 'sskill') { const sr = await sellServer('skillbook', k); if (sr && sr.ok) log('gold', `📗 出售${SKILLS[k].name}技能书，金元 <span class="y">+${sr.gold}</span>`); else if (!sr) { const r = C.sellSkillBook(S, k); if (r.ok) log('gold', `📗 出售${SKILLS[k].name}技能书，金元 <span class="y">+${r.gold}</span>`); } }
  commit(); if (kind === 'ebook' && arguments[3]) sheetLife(arguments[3] === 'alc' ? lifeTab : arguments[3]); else sheetBag();
}
window.useCaveToken = function(k) { // v798 使用洞府令/仙府令开格；v799 分开记洞府/仙府；v878 境界门槛
  try {
    if ((S.mats[k]|0) <= 0) { log('bad', '没有该令牌'); return; }
    const it = MATS[k];
    if (!it || !it.token) { log('bad', '不是洞府令'); return; }
    const _nr = it.needRealm|0, _rn = _nr === 8 ? '仙人' : _nr === 4 ? '元婴' : '';
    if (_nr > 0 && (S.realm|0) < _nr) { log('bad', `${it.name}需<b class="r">${_rn}</b>境界才能使用`); return; }
    let _cost = 1; // v886 洞府开格递增：第N格需N个令牌
    if (it.token === 'cave') _cost = (S.dongfuGrids|0) + 1;
    if ((S.mats[k]|0) < _cost) { log('bad', `令牌不足！开辟第 <b class="y">${(S.dongfuGrids|0) + 1}</b> 格需 <b class="r">${_cost}</b> 个${it.name}`); return; }
    S.mats[k] -= _cost; if (S.mats[k] <= 0) delete S.mats[k];
    if (it.token === 'cave') {
      S.dongfuGrids = (S.dongfuGrids|0) + 1;
      S.dongfuEnergy = (S.dongfuEnergy|0) + (it.energy|0);
      log('good', `${it.name}×${_cost}使用成功！开辟洞府第 <b class="y">${S.dongfuGrids}</b> 格，灵气 <b class="pu">+${it.energy}</b>（洞府灵气 ${S.dongfuEnergy}，下格需${S.dongfuGrids + 1}个令牌）`);
    } else {
      S.xianfuGrids = (S.xianfuGrids|0) + 1;
      S.xianfuEnergy = (S.xianfuEnergy|0) + (it.energy|0);
      log('good', `${it.name}使用成功！开辟仙府第 <b class="y">${S.xianfuGrids}</b> 格，灵气 <b class="pu">+${it.energy}</b>（仙府灵气 ${S.xianfuEnergy}）`);
    }
    // 兼容旧版合并字段
    S.caveGrids = (S.dongfuGrids|0) + (S.xianfuGrids|0);
    S.caveEnergy = (S.dongfuEnergy|0) + (S.xianfuEnergy|0);
    try { commit(); } catch(_) {}
    try { save(); } catch(_) {}
    sheetBag();
  } catch(e) { try { log('bad', '使用失败:' + e.message); } catch(_) {} }
};
function sheetBag() {
  const list = C.invList(S), mats = Object.keys(MATS).filter(k => MATS[k].basic && S.mats[k] > 0);
  const _seals = (S.sealed || []).filter(x => x && !x.done);
  openSheet(`<h2>背包</h2><div class="hint">金元 <b class="y">${S.gold}</b> · ${MAGATAMA}仙玉 <b class="y">${S.xianyu || 0}</b> · 🌒下品 <b class="y">${S.ores.sp2|0}</b> · 🌗中品 <b class="y">${S.ores.sp3|0}</b> · 💎上品 <b class="y">${S.ores.sp4|0}</b> · 💠极品 <b class="y">${S.ores.sp5|0}</b>。物品 <b class="y">${C.itemCount(S)}/${C.itemCap(S)}</b>（小型储物袋可扩充）。服用丹药可永久提升属性。</div>` +
    `<h3>⛏️ 器具</h3>` + toolCardHtml('pick', 'bag') + toolCardHtml('hoe', 'bag') +
    (((S.lingwu || []).length || Object.values(S.lwseeds || {}).some(v => (v | 0) > 0)) ? `<h3>🌿 灵物</h3>` + (S.lingwu || []).map((w, i) => { const _base = Math.floor(w.y * 0.1), _f = C.eleFactorL(S, w.e), _gain = Math.floor(_base * _f), _note = C.eleNoteL(_f); return `<div class="row"><div class="lab"><b style="color:${C.GRADE_COLORS[w.g - 1]}">${C.LW_GRADE_NAMES[w.g - 1]}</b>·<b style="color:${C.LW_ELE_COLORS[w.e]}">${w.e}</b> · ${w.y} 年<small>炼寿元丹的材料（炼药面板）；生吃：寿元 +${_gain}${_note ? `（${_note}）` : ''}</small></div><button class="btn" onclick="window.lwEat(${i})">生吃</button></div>`; }).join('') + [1, 2, 3].filter(g => ((S.lwseeds || {})[g] | 0) > 0).map(g => `<div class="row"><div class="lab"><b style="color:${C.GRADE_COLORS[g - 1]}">${C.LW_SEED_NAMES[g - 1]}</b> ×${S.lwseeds[g]}<small>种到洞府灵田，收割时才定五行，可长${C.LW_GRADE_NAMES[g - 1]}</small></div></div>`).join('') : '') +
    (((S.syd || []).length) ? `<h3>💊 寿元丹</h3>` + S.syd.map((p, i) => { const _f = C.eleFactorL(S, p.e), _note = C.eleNoteL(_f); return `<div class="row"><div class="lab"><b style="color:${C.LW_ELE_COLORS[p.e]}">${p.e}行寿元丹</b><small>寿元 +${Math.floor(p.val * _f)}${_note ? `（${_note}）` : ''} · 积丹毒</small></div><button class="btn gold" onclick="window.eatSyd(${i})">服用</button></div>`; }).join('') : '') +
    `<h3>丹药</h3>` +
    (list.length ? list.map(p => `<div class="row"><div class="lab">${potName(p.attr, p.grade)} ×${p.count}<small>${AN[p.attr]} +${p.grade}</small></div>
      <button class="btn" data-drink="${p.attr}" data-g="${p.grade}" data-n="1">服用</button>
      ${p.count > 1 ? `<button class="btn gold" onclick="qtyPrompt('drink','${p.attr}_${p.grade}',${p.count})">数量</button>` : ''}</div>`).join('')
      : '') +
    ((S.inv['mai']|0) > 0 ? `<div class="row"><div class="lab">🌀 <b class="y">开脉丹</b> ×${S.inv['mai']}<small>星藏服用：每颗开一穴、虚络 +1（不加气旋），当前虚络 ${S.maiVLuo|0} 条 · 虚脉 ${S.maiVMai|0} 条</small></div>
      <button class="btn" data-charpage="4">去星藏</button></div>` : '') +
    ((S.inv['butian']|0) > 0 ? `<div class="row"><div class="lab">🌟 <b class="y">补天丹</b> ×${S.inv['butian']}<small>服用：随机+1条灵根（上限5条），每境界限服1颗，当前${window.LG ? window.LG.name(S) : ''}</small></div>
      <button class="btn gold" data-drinkbutian="1">服用</button></div>` : '') +
    (Object.keys(C.MUT_PILLS).filter(id => (S.inv['mut_' + id]|0) > 0).map(id => `<div class="row"><div class="lab">🌀 <b class="y">${C.MUT_PILLS[id].name}</b> ×${S.inv['mut_' + id]}<small>${C.MUT_PILLS[id].desc}（变异丹 · 丹毒 +${C.MUT_PILLS[id].tox}）</small></div><button class="btn gold" data-mut="${id}">服用</button></div>`).join('')) +
    ((S.inv['detox']|0) > 0 ? `<div class="row"><div class="lab">🍃 <b class="y">化无丹</b> ×${S.inv['detox']}<small>服用：丹毒 -20（当前丹毒 ${S.danDu|0}/${C.danDuCap(S)}）</small></div><button class="btn gold" data-detoxuse="1">服用</button></div>` : '') +
    (((S.dan && S.dan.bigu)|0) > 0 ? `<div class="row"><div class="lab">🍘 <b class="y">辟谷丸</b> ×${S.dan.bigu}<small>服用：饱食 +20（丸非丹，不积丹毒）</small></div><button class="btn gold" data-danuse="bigu">服用</button></div>` : '') +
    (((S.dan && S.dan.qili)|0) > 0 ? `<div class="row"><div class="lab">💪 <b class="y">气力丸</b> ×${S.dan.qili}<small>服用：体力 +3（丸非丹，不积丹毒）</small></div><button class="btn gold" data-danuse="qili">服用</button></div>` : '') +
    `<div class=row><div>🌿修复灵物</div><button data-allrep>一键领取</button></div>`+[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>S.inv['repair'+i]>0?`<div class=row><div>🌿修${'胎气基丹婴神乘劫余散合尊'[i]}×${S.inv['repair'+i]}</div><button data-rep=${i}>服</button></div>`:'').join('')+


    (!list.length && !(S.inv['mai']|0) ? '<div class="empty">空空如也，去炼药吧～</div>' : '') +
    (((S.inv['chestN']|0) + (S.inv['chestR']|0) + (S.inv['chestA']|0) + (S.inv['chestB']|0)) > 0 ? `<h3>宝箱</h3>` +
      ((S.inv['chestB']|0) > 0 ? `<div class="row"><div class="lab">🎲 <b class="y">盲盒</b> ×${S.inv['chestB']}<small>擂台日榜奖励，开出随机惊喜</small></div><button class="btn gold" data-chest="chestB" data-n="1">开启</button>${(S.inv['chestB']|0) > 1 ? `<button class="btn" data-chest="chestB" data-n="${S.inv['chestB']}">全开</button>` : ''}</div>` : '') +
      ((S.inv['chestN']|0) > 0 ? `<div class="row"><div class="lab">🎀 <b class="y">精致盲盒</b> ×${S.inv['chestN']}<small>擂台周榜奖励，开出灵石/金元</small></div><button class="btn gold" data-chest="chestN" data-n="1">开启</button>${(S.inv['chestN']|0) > 1 ? `<button class="btn" data-chest="chestN" data-n="${S.inv['chestN']}">全开</button>` : ''}</div>` : '') +
      ((S.inv['chestR']|0) > 0 ? `<div class="row"><div class="lab">🎁 <b class="y">稀有宝箱</b> ×${S.inv['chestR']}<small>擂台月榜奖励，开出高品灵石/凝露</small></div><button class="btn gold" data-chest="chestR" data-n="1">开启</button>${(S.inv['chestR']|0) > 1 ? `<button class="btn" data-chest="chestR" data-n="${S.inv['chestR']}">全开</button>` : ''}</div>` : '') +
      ((S.inv['chestA']|0) > 0 ? `<div class="row"><div class="lab">💎 <b class="y">高级宝箱</b> ×${S.inv['chestA']}<small>擂台年榜奖励，开出极品灵石/珍稀</small></div><button class="btn gold" data-chest="chestA" data-n="1">开启</button>${(S.inv['chestA']|0) > 1 ? `<button class="btn" data-chest="chestA" data-n="${S.inv['chestA']}">全开</button>` : ''}</div>` : '') : '') +
    `<h3>材料</h3>` + (mats.length ? mats.map(k => `<div class="row"><div class="lab">${MATS[k].name} ×${S.mats[k]}<small>直接吃：饱食 +20 · 对应属性 +1 · 丹毒 +20（今日已吃 ${C.herbEatenToday(S)}/5）</small></div><button class="btn" onclick="window.eatHerb('${k}')">吃</button></div>`).join('') : '<div class="empty">暂无材料，可在商店购买</div>') +
    `<h3>🏠 洞府令</h3>` + ((S.mats['cave_token']|0) + (S.mats['xianfu_token']|0) > 0 ? ['cave_token','xianfu_token'].filter(k => (S.mats[k]|0) > 0).map(k => { const _eg = k === 'cave_token' ? `洞府 ${S.dongfuGrids|0} 格·灵气 ${S.dongfuEnergy|0}·下格需${(S.dongfuGrids|0) + 1}令牌` : `仙府 ${S.xianfuGrids|0} 格·灵气 ${S.xianfuEnergy|0}`; return `<div class="row"><div class="lab">${MATS[k].name} ×${S.mats[k]}<small>${MATS[k].desc} · ${_eg}</small></div><button class="btn gold" onclick="useCaveToken('${k}')">使用</button></div>`; }).join('') : '<div class="empty">暂无，商店有售</div>') +
    `<h3>凝露</h3>` + (LUK.some(k => S.mats[k] > 0) ? LUK.filter(k => S.mats[k] > 0).map(k => `<div class="row"><div class="lab">${rarTxt('farm', k)} ×${S.mats[k]}<small>服用：随机属性 +${LU[k].pts} · 炼药投入：成功率/上品 +${C.pct(LU[k].alc)}</small></div>
      <button class="btn" data-lu="${k}" data-n="1">服用</button>${S.mats[k] > 1 ? `<button class="btn gold" onclick="qtyPrompt('lu','${k}',${S.mats[k]})">数量</button>` : ''}</div>`).join('') : '<div class="empty">暂无凝露，种植时偶尔可得（一品可在商店购买）</div>') +
    `<h3>灵石</h3>` + (Object.keys(ORES).some(k => ORES[k].extra && S.ores[k] > 0) ? Object.keys(ORES).filter(k => ORES[k].extra && S.ores[k] > 0).map(k => `<div class="row"><div class="lab">${rarTxt('mine', k)} ×${S.ores[k]}<small>服用：${ORES[k].lvl ? '直接提升 1 级' : '经验 +' + ORES[k].xp} · 炼药投入：成功率/上品 +${C.pct(ORES[k].alc)}</small></div>
      <button class="btn" data-spirit="${k}" data-n="1">服用</button>${S.ores[k] > 1 ? `<button class="btn gold" onclick="qtyPrompt('spirit','${k}',${S.ores[k]})">数量</button>` : ''}</div>${k === 'sp5' ? `<div class="row" style="padding-top:0"><div class="lab"><small>🔨 砸开：每块碎成 ${C.SMASH_N} 块一~上品灵石</small></div><button class="btn" data-smash="1">砸开</button>${S.ores[k] > 1 ? `<button class="btn gold" onclick="qtyPrompt('smash','',${S.ores[k]})">数量砸开</button>` : ''}</div>` : ''}`).join('') : '<div class="empty">暂无灵石，挖矿时偶尔可得</div>') +
    (((S.veins || []).some(v => (v | 0) > 0)) ? `<h3>灵脉</h3>` + [0, 1, 2].filter(t => ((S.veins && S.veins[t]) | 0) > 0).map(t => `<div class="row"><div class="lab">💎 ${['小型灵脉', '中型灵脉', '巨型灵脉'][t]} ×${(S.veins && S.veins[t]) | 0}<small>吃下出灵石，巨型可出仙玉</small></div><button class="btn gold" onclick="window.doEatVein(${t})">吃</button></div>`).join('') : '') +
    Object.keys(GATHER).filter(kind => !GATHER[kind].nosell).map(kind => { const g = GATHER[kind], st = S[g.store], ks = Object.keys(g.items).filter(k => st[k] > 0 && g.items[k].price);
      return `<h3>${g.noun}</h3>` + (ks.length ? ks.map(k => `<div class="row"><div class="lab">${rarTxt(kind, k)} ×${st[k]}<small>商店收购价 ${g.items[k].price} 金/${g.unit}</small></div></div>`).join('') : `<div class="empty">暂无${g.noun}</div>`); }).join('') +
    `<h3>🍖 肉类</h3>` + (() => { const mks = Object.keys(MEATS).filter(k => (S.food[k] | 0) > 0); return mks.length ? mks.map(k => `<div class="row"><div class="lab">🍖 ${MEATS[k].name} ×${S.food[k]}<small>饱食 +${MEATS[k].hunger} · 体力 +${MEATS[k].sta}</small></div></div>`).join('') : '<div class="empty">暂无，打猎偶得</div>'; })() + // v437 背包显示肉类（食用仍在人物卡）
    bookSection() + dishSection() + potSection() + gearSection() + medSection() +
    `<h3>已习得技能</h3><div class="row"><div class="lab">普通攻击 · 防御` + S.skills.map(k => ` · <span class="pu">${SKILLS[k].name}</span>`).join('') + `<small>技能书由10张同名技能残页合成</small></div></div>` +

    `<button class="btn full" data-close>关闭</button>`);
}
function sheetBattleBag() {
  const pots = Object.keys(S.elixirs || {}).filter(k => S.elixirs[k] > 0).sort();
  const meds = Object.keys(C.MEDS).filter(k => S.meds[k] > 0 && C.MEDS[k].cure !== 'curse');
  const potRows = pots.length ? pots.map(k => { const P = C.potOf(k); return `<div class="row"><div class="lab">${C.POTIONS[P.t].icon} ${elixName(k)} ×${S.elixirs[k]}<small>${P.t === 'hp' ? `回复 ${Math.round(P.pct * 100)}% 生命` : `回复 ${Math.round(P.pct * 100)}% 法力`}</small></div><button class="btn gold" data-battleuse="pot:${P.t}">使用</button></div>`; }).join('') : '<div class="empty">暂无药水</div>';
  const medRows = meds.length ? meds.map(k => { const m = C.MEDS[k], need = C.hasSt(S, m.cure); return `<div class="row"><div class="lab">💊 ${m.name} ×${S.meds[k]}<small>${m.desc}</small></div><button class="btn ${need ? 'gold' : ''}" data-battleuse="med:${k}" ${need ? '' : 'disabled'}>${need ? '使用' : '无需'}</button></div>`; }).join('') : '<div class="empty">暂无疗伤药，可在商店购买</div>';
  openSheet(`<h2>🎒 战斗背包</h2><div class="hint">使用物品将<b class="r">消耗本回合</b>行动。</div><h3>🧪 药水</h3>${potRows}<h3>💊 疗伤药</h3>${medRows}<button class="btn full" data-close>返回战斗</button>`);
}
function sheetDebug() {
  const d = [
    ['测试签到', 'dbg_checkin'], // v307 恢复
    ['一键全物品', 'dbg_allitems'],
    ['清理重复灵石', 'dbg_clear_dup_ores'],
    ['+1000金元', 'dbg_gold1k'],
    ['⚠️恢复初始', 'dbg_reset'],
    ['闭关+1小时', 'dbg_afk_1h'],
    ['闭关+24小时', 'dbg_afk_24h'],
    ['+1000万 法力', 'dbg_mana10m'],
    ['+1万 仙力', 'dbg_xian10k'],
    ['+100万 仙力', 'dbg_xian1m'],
    ['恢复仙力2280', 'dbg_xian_fix'],
    ['直升1级', 'dbg_lvup'],
    ['直升圆满', 'dbg_yuanman'],
    ['回满血', 'dbg_fullhp'],
    ['中毒', 'dbg_poison'],
    ['流血', 'dbg_bleed'],
    ['抑郁', 'dbg_depress'],
    ['毒发身亡（立即）', 'dbg_poison_die'],
    ['流血身亡（立即）', 'dbg_bleed_die'],
    ['清除所有状态', 'dbg_clear'],
    ['全物品各+1', 'dbg_items'],
  ];
  openSheet(`<h2>调试后台</h2>` + d.map(x => `<button class="act" data-a="debug" data-dbg="${x[1]}"><span class="t">${x[0]}</span></button>`).join(''));
}
const RANK_TABS = [['level','🏆等级榜'],['str','💪力量榜'],['agi','💨敏捷榜'],['def','🛡️防御榜'],['vit','❤️生命榜'],['int','🧠智力榜'],['checkin','📅签到榜'],['afk','🧘闭关榜'],['deathmatch','☠️生死局榜'],['bounty','📜赏金猎人榜']];
let _rankCache = null, _rankTab = 'level';
function sheetPersonInfo(e, backBtn) {
  if (!e) return;
  // v931 神识vs气息：看透判定
  let _hidden = false;
  try {
    if (!e.isMe && typeof S !== 'undefined' && S) {
      const mySS = (typeof effShenshi === 'function' ? effShenshi(S) : (S.shenshi|0)); // v947
      // 对方气息：有则用，没有按等级估算（2/级）
      const tgtQX = (e.qixi|0) || ((e.level|0) * 2 + (e.realm|0) * 20);
      if (mySS < tgtQX) _hidden = true; // v948 神识>=气息可见（含等于）
    }
  } catch(_) {}
  const a = e.attrs || {};
  const petTxt = e.pet && C.PETS[e.pet.k] ? `${C.PETS[e.pet.k].icon} ${C.PETS[e.pet.k].name} Lv.${e.pet.lv}` : '<span style="color:var(--dim)">无</span>';
  const maiTxt = e.isMe ? `络${C.maiLuo(S)}<small>（虚${S.maiVLuo|0}/实${S.maiRLuo|0}）</small>·脉${C.maiMai(S)}<small>（虚${S.maiVMai|0}/实${S.maiRMai|0}）</small>` : `${e.meridians || 0}条`;
  const skillTxt = (e.skills || []).length ? e.skills.map(k => (typeof SKILLS !== 'undefined' && SKILLS[k]) ? SKILLS[k].name : k).join('·') : '<span style="color:var(--dim)">无</span>';
  const styleTxt = e.style ? `<div class="row"><div class="lab">⚔️ 流派</div><div><b class="y">${e.style}</b></div></div>` : '';
  const backHtml = backBtn || `<div class="row"><button class="btn full" onclick="closeSheet()">← 返回</button></div>`;
  openSheet(`<h2 style="text-align:center">${e.isMe ? '🧍 <b class="y">你</b>' : (e.name || '未知')}</h2>
    <div style="text-align:center;margin-bottom:10px"><span class="tag" style="font-size:15px;padding:6px 14px">${C.REALMS[e.realm || 0]} · Lv.${e.level || 1}</span></div>
    <h3>五维属性</h3>
    ${_hidden ? '<div class="hint" style="text-align:center;padding:12px">👁️ 神识不足，无法看透高境界修士<br><small>提升神识（升级+1）开花后可跨境界查看</small></div>' : `<div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:10px">
      <div style="text-align:center;background:#1a1a2e;border-radius:8px;padding:8px 2px">💪<br><b class="y">${C.fmtN(a.str || 0)}</b><br><small>力量</small></div>
      <div style="text-align:center;background:#1a1a2e;border-radius:8px;padding:8px 2px">🤸<br><b class="y">${C.fmtN(a.agi || 0)}</b><br><small>敏捷</small></div>
      <div style="text-align:center;background:#1a1a2e;border-radius:8px;padding:8px 2px">🛡️<br><b class="y">${C.fmtN(a.def || 0)}</b><br><small>防御</small></div>
      <div style="text-align:center;background:#1a1a2e;border-radius:8px;padding:8px 2px">❤️<br><b class="y">${C.fmtN(a.vit || 0)}</b><br><small>生命</small></div>
      <div style="text-align:center;background:#1a1a2e;border-radius:8px;padding:8px 2px">🧠<br><b class="y">${C.fmtN(a.int || 0)}</b><br><small>智力</small></div>
    </div>`}
    <h3>修行</h3>
    ${styleTxt}
    <div class="row"><div class="lab">📜 技能</div><div>${skillTxt}</div></div>
    <div class="row"><div class="lab">🌀 脉络</div><div><b class="y">${maiTxt}</b></div></div>
    <div class="row"><div class="lab">⏳ 寿元</div><div><b class="${(e.lifespan || 0) <= 10 ? 'r' : 'y'}">${C.fmtN(e.lifespan || 0)}年</b></div></div>
    <div class="row"><div class="lab">🐾 灵宠</div><div>${petTxt}</div></div>
    ${e.checkins ? `<div class="row"><div class="lab">📅 累计签到</div><div><b class="y">${e.checkins}次</b></div></div>` : ''}
    ${e.afkSecs ? `<div class="row"><div class="lab">🧘 累计闭关</div><div><b class="y">${Math.floor(e.afkSecs / 3600)}小时</b></div></div>` : ''}
    ${backHtml}`);
}
function sheetRankInfo(idx) {
  const e = _rankCache && _rankCache[idx]; if (!e) return;
  sheetPersonInfo(e, `<div class="row"><button class="btn full" data-ranktab="${_rankTab}">← 返回榜单</button></div>`);
}
function sheetRank(tab) {
  tab = tab || 'level';
  // v1083 真人榜单：服务端现算排名
  if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn()) {
    openSheet(`<h2>🏆 修仙榜单</h2><div class="hint">真人榜单需登录联机后查看。</div><div class="empty">请先在联机面板登录</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
    return;
  }
  openSheet(`<h2>🏆 修仙榜单</h2><div class="hint">正在拉取真人数据…</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
  MHXY.api('/api/rank/list?tab=' + encodeURIComponent(tab)).then(function(r){
    if (!r.ok || !r.json || !r.json.ok) {
      openSheet(`<h2>🏆 修仙榜单</h2><div class="hint">拉取失败，请稍后再试。</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
      return;
    }
    const list = r.json.list || [];
    const myRank = r.json.myRank, myScore = r.json.myScore;
    const valTxt = function(e){ return tab === 'level' ? (C.REALMS[e.realm] || '') + ' Lv.' + e.level : '<b class="y">' + e.score + '</b>'; };
    let html = `<h2>🏆 修仙榜单</h2><div class="hint">共 ${r.json.total || 0} 位道友上榜${myRank ? ` · 你的排名：第 <b class="y">${myRank}</b> 名（${myScore}）` : ' · 你暂未上榜'}</div>`
      + `<div class="grid2" style="margin-bottom:8px">` +
      RANK_TABS.map(function(t){ return `<button class="btn${tab===t[0]?' gold':''}" data-ranktab="${t[0]}">${t[1]}</button>`; }).join('') +
      `</div>`;
    if (!list.length) html += `<div class="empty">暂无道友数据</div>`;
    else html += list.map(function(e){
      return `<div class="row"${e.isMe ? ' style="border:1px solid var(--gold);border-radius:8px"' : ''}>`
        + `<div class="lab" style="display:flex;align-items:center;gap:6px"><b class="${e.rank <= 3 ? 'y' : ''}">${e.rank}</b>`
        + `<span style="color:#7ec8ff">${String(e.username).replace(/</g, '&lt;')}</span><span style="color:#666">[${e.playerNo || '?'}]</span>`
        + `${e.title ? `<span style="color:#999;font-size:12px">${String(e.title).replace(/</g, '&lt;')}</span>` : ''}`
        + `<small>${C.REALMS[e.realm] || ''} Lv.${e.level}</small></div>`
        + `<div>${valTxt(e)}</div></div>`;
    }).join('');
    html += `<div class="row"><button class="btn full" data-close>关闭</button></div>`;
    openSheet(html);
  }).catch(function(){
    openSheet(`<h2>🏆 修仙榜单</h2><div class="hint">拉取失败（网络），请稍后再试。</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
  });
  return;
  const list = C.getRankList(S, tab);
  _rankCache = list; _rankTab = tab;
  const valTxt = e => tab === 'level' ? `${C.REALMS[e.realm]} Lv.${e.level}` : tab === 'checkin' ? `${e.checkins || 0}次` : tab === 'afk' ? `${Math.floor((e.afkSecs || 0) / 3600)}小时` : C.fmtN(e.attrs[tab]);
  let html = `<h2>🏆 修仙榜单</h2><div class="hint">与天下道友一较高下（模拟100位玩家+你，正式版将接入真人数据）。</div>
    <div class="grid2" style="margin-bottom:8px">` +
    RANK_TABS.map(([k, n]) => `<button class="btn${tab===k?' gold':''}" data-ranktab="${k}">${n}</button>`).join('') +
    `</div>` +
    list.map((e, i) => { const _av = e.isMe ? (function(){ try { return avatarUrl(); } catch(_){ return ''; } })() : (typeof npcAvatar === 'function' ? npcAvatar(e.name) : ''); return `<div class="row"${e.isMe ? ' style="border:1px solid var(--gold);border-radius:8px"' : ''}>
      <div class="lab" style="display:flex;align-items:center;gap:6px"><b class="${e.rank <= 3 ? 'y' : ''}">${e.rank}</b>${_av ? `<img src="${_av}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex:none">` : ''}<a href="javascript:void(0)" data-rankinfo="${i}" style="color:#7ec8ff;text-decoration:underline;cursor:pointer">${e.isMe ? '你' : e.name}</a>
      <small>${C.REALMS[e.realm]} Lv.${e.level}</small></div>
      <div><b class="y">${valTxt(e)}</b></div></div>`; }).join('') +
    `<div class="row"><button class="btn full" data-close>关闭</button></div>`;
  openSheet(html);
}
function sheetMenu(tab) {
  tab = tab || 'func';
  const s = S.stats;
  let html = `<h2>菜单</h2><div class="hint">存档自动保存在本机浏览器（localStorage）。</div>
    <div class="grid2" style="margin-bottom:8px">
      <button class="btn${tab==='func'?' gold':''}" data-menutab="func">⚙️ 功能</button>
      <button class="btn${tab==='news'?' gold':''}" data-menutab="news">📢 公告</button>
    </div>`;
  if (tab === 'func') {
    html += `
    <div class="row"><button class="btn gold full" data-battleplan>⚔️ 战斗预设（前5回合）</button></div>
    <div class="row"><button class="btn gold full" data-rank="1">🏆 修仙榜单</button></div>
    <div class="row"><button class="btn full" data-chat>💬 世界聊天</button></div>
    <div class="row"><button class="btn full" data-stele>🪦 主城碑林</button></div>
    <div class="row"><button class="btn full" data-mhxy>🌐 真人联机</button></div>
    <div class="row"><div class="lab">🏦 天道池<small id="poolMenuTxt">读取中…</small></div><button class="btn sm" data-poolview>看池子</button></div>
    <div class="row"><div class="lab">⚔️ 本世冒险<small>${s.advWin || 0} 胜 / ${s.adv || 0} 战</small></div></div>
    <div class="row"><div class="lab">⚔️ 历世冒险<small>${s.advWinTotal || 0} 胜 / ${s.advTotal || 0} 战（不清零）</small></div></div>
    <div class="row"><div class="lab">🥊 本世 PK<small>${s.pkWin || 0} 胜 / ${s.pk || 0} 战</small></div></div>
    <div class="row"><div class="lab">🥊 历世 PK<small>${s.pkWinTotal || 0} 胜 / ${s.pkTotal || 0} 战（不清零）</small></div></div>
    <div class="row"><div class="lab">📅 本世签到<small>${s.checkins || 0} 天</small></div></div>
    <div class="row"><div class="lab">📅 历世签到<small>${s.checkinsTotal || 0} 天（不清零）</small></div></div>
    <div class="row"><div class="lab">🧘 本世闭关<small>${Math.floor((s.afkSecs || 0) / 3600)} 小时（轮回清零）</small></div></div>
    <div class="row"><div class="lab">🧘 历世闭关<small>${Math.floor((s.afkSecsTotal || 0) / 3600)} 小时（不清零）</small></div></div>
    <div class="row"><div class="lab">炼药记录<small>成功 ${s.brewOk} / 共 ${s.brew} 次</small></div></div>
    <div class="grid2"><button class="btn red full" data-reset>重置存档</button><button class="btn full" data-close>关闭</button></div>`;
  } else {
    html += `
    <div class="row"><div class="lab">玩法说明<small>每日签到得体力 = 4 + 等级（当前 Lv.${S.level} 可得 ${C.checkinAmount(S)}）；活力 = 10 + 每 2 级 +1（当前 ${C.vigorGain(S)}，最多囤 ${K.VIGOR_CAP_DAYS} 天量 = ${C.vigorCap(S)}，死亡不清空）。体力用于修炼、冒险与 PK；<b>活力用于生活技能</b>。<br>· 法力：10 级前生活技能只耗活力，没有法力；10 级后法力取代活力，每次生活技能耗 2 法力（不再耗活力）。法力上限 = 8 + 智力×2，签到回满，法力药水可回复。新角色五项属性均为 1（生命上限 10）。<br>· 生活技能（炼药/烹饪/锻造/炼金/驯兽）：10 级前每次 1 活力、10 级后每次 2 法力，成功得经验 10、失败 4，升级需 等级×30；关联属性：炼药-智力、锻造-力量、烹饪-防御、炼金-敏捷、驯兽-生命，每点成功率 +0.1%（上限 +10%）、极品/上品 +0.05%（上限 +5%）。烹饪/锻造/炼金/驯兽成功率 60% + 每级 4% + 属性加成（上限 95%），极品 5% + 每级 2% + 属性加成（上限 40%）×气运、精良 30%；失败只损耗第一种材料 1 份。🍳烹饪：肉/蛋/药草做成菜肴，比生食多回饱食与体力，精良/极品附带增益（属性 +10%/+20% 持续 3 场战斗，或气运 ×1.15/×1.3 持续 10 点体力）。🔨锻造：选择部位用矿石 + 1 张同档猎物皮（铁兔/铜鹿/银狼/金虎）打造装备，5 个装备栏：头/项链/武器/衣服/鞋子；每件装备加的属性由套装决定（暴击套+敏捷、致命套+力量、防御套+防御、治愈套+生命、幸运套+智力），铁/铜/银/金 需锻造 Lv1/2/4/6，冒险与 PK 生效。锻造时选择套装与部位，装备名 = 矿石+套装+部位（如 铜暴击头盔、铁防御项链、金致命剑；部位：头盔/项链/剑/衣服/鞋子）；品质 5 档：普通/优秀/精良/史诗/传说（名字颜色 白/绿/蓝/紫/橙），每件加套装属性：铁 +1/+2/+3/+4/+5、铜 +2/+3/+4/+5/+6、银 +3/+4/+5/+6/+7、金 +4/+5/+6/+7/+8（品质 普通/优秀/精良/史诗/传说 + 档位加成），套装效果 ×1/1.1/1.25/1.4/1.6；铁矿锻造 Lv1 约 50/30/14/5/1%，Lv10 约 25/30/25/14/6%；矿石越好越容易出好品质（铜小幅、银中幅、金约让史诗/传说翻倍）且成功率 +0/5/10/15%（上限 98%），力量与气运也略提升，材质与品质决定数值；同套穿 2/3/4/5 件逐级生效（可同时激活多套）；🎒<b>小型储物袋</b>：物品包每只+100格（默认100），连续签到7天送1只、商店1000金限购1只；💍<b>储物戒指</b>：物品包与装备包上限×2，下/中/上品灵石各限购1枚；📦<b>储物空间（小）</b>：物品包×3，极品灵石限购1个；📦<b>储物空间（大）</b>：物品包×4，1仙玉限购1个；每号商店每种限购1次；包满时冒险掉落装备自动卖金；<b>防御套与治愈（生命）套同样作用于出战灵宠</b>（按灵宠自身防御加成、按灵宠自身最大生命回血；将来的队友同理）：暴击套暴击率 +5/8/12/18%；幸运套气运 +10/18/28/40%（修炼掉落、冒险等）；防御套防御 +10/18/28/40%（按各自防御的百分比，四舍五入）；治愈套每回合回复 2/3/4/6% 最大生命；致命套每次攻击 6/10/14/20% 触发（5件+🔥燃血30%、+🔥燃寿每层+10%）<b>致命一击</b>（以上数值再 × 同套装备平均品质系数；致命套只放大触发率）（本场对同一目标累计：第1次扣 50% 最大生命；第2次扣 49% 并锁血至 1；第3次若只剩 1 血则直接死亡，若已回血则再次锁至 1；第4次起<b>绝杀</b>）。✨炼金：3 个同品灵石/凝露 + 1 张普通残页合成 1 个高一品（最高四品，五品只能掉落），或 5 铁矿/3 铜矿 + 1 张普通残页点化为 1 金矿（失败残页不损耗），等级越高越易双倍产出；还能炼制<b>生命药水</b>（1 生命草 + 1 一品凝露 + 1 普通残页）与<b>法力药水</b>（1 智力草 + 1 一品凝露 + 1 普通残页），品质 普通/精良/极品 回复 30%/40%/50%：生命药水在背包随时可喝（场外按到达过的最高生命计上限，补回流血/中毒/被咬掉的生命，但不解除状态；被夺走的属性补不回）；战斗中点🎒背包可使用药水与疗伤药（消耗本回合），疗伤药可解除战斗中的流血/中毒；法力药水回复法力（场外使用）。🐾驯兽：选择出战灵宠的一项属性训练，成功时该属性 +1（精良 +2、极品 +3），同时忠诚 +3（每 3 级 +1），15%+ 概率得灵宠经验；<b class="r">成仙后每次驯养耗10年寿元，仙级以上灵宠双倍（20年）</b>；每级降低灵宠咬人概率 5%（最多 50%），并提高孵出青龙/白虎的概率（每级 +10%，最多翻倍）。可炼制🦴<b>灵兽丹</b>（肉×2 + 1 张普通残页（驯兽诀，成功才扣），优先消耗低级肉；成功率 = 驯兽成功率，失败只耗 1 份肉）：品质 普通/精良/极品，喂给出战灵宠 +30/+80/+200 经验（可升级、领悟技能），极品全服通告。经验书可用于任一生活技能。<br>· 修炼：力量为挖矿（得矿石，偶得灵石），敏捷为打猎（得猎物，偶得兔/鹿/狼/虎肉，食用恢复 1/2/3/5 体力），防御为种植（收获炼药用药草，丰收可得多株，偶得凝露），生命为掏兽蛋（得鸡/鸭/鹅/鸵鸟蛋，暴击可得多枚），智力为<b>看书</b>（1 体力智力 +1，每次随机得学习/深度学习/小悟/中悟/大悟之一，对应普通/精读/小悟/中悟/大悟残页各 1 张，基础 50/30/13/5/2%，智力越高高档越多；另有 1.5%~3% 得随机战斗技能的技能观相残页）。矿石、猎物与兽蛋可在商店出售。<br>· 📜残页：在背包中同品 10 张合成 1 本经验书（普通/精读/小悟/中悟/大悟经验书 = 生活技能经验 +20/50/120/300/800），使用时任选一项生活技能（炼药/烹饪/锻造/炼金/驯兽）。同一技能的技能残页 10 张合成该技能书，学习效果与商店购买相同；已会的技能书可按原价 50% 出售。<br>· 掏兽蛋每次有 ${C.pct(K.PET_EGG_CHANCE)} 掏到灵宠蛋，<b>玩家 ${K.HATCH_LV} 级后</b>可在背包孵化（之前可先收集保存），得随机灵宠（灵狐 38% / 玄龟 27% / 朱雀 16% / 青龙 11% / 白虎 8%），初始五项属性均为 1（与新角色相同）；每只灵宠孵化时独立随机品质：普通 30% / 优秀 25% / 稀有 18% / 卓越 12% / 史诗 8% / 传说 4% / 仙 2% / 神 1%，名字颜色即品质（白/绿/蓝/青/紫/橙/金/红）。<br>· PK 中出战灵宠亲自参战：每回合在主人行动后自动出手，伤害/闪避/防御/生命按灵宠自身属性、与玩家相同的公式计算。灵狐迅捷可连咬；玄龟护主，主人受伤 -35%；朱雀喷火并可能灼烧 2 回合；青龙吐息并回复主人生命；白虎撕裂并可能使敌方流血。对手攻击有 30% 会落在灵宠身上，灵宠倒下后本场不再出手。灵宠本场阵亡则<b class="r">寿命 -${K.PET_DEATH_LIFE}、忠诚 -${K.PET_DEATH_LOYAL}</b>（寿命初始 ${K.PET_LIFE_MAX}，归零则永久死亡）。部分 AI 对手也会带灵宠。<br>· ✨灵宠技能：每次升级有 ${C.pct(K.PET_SKILL_P)} 领悟本系套装技能（灵狐-暴击 / 白虎-致命 / 玄龟-防御 / 青龙-治愈 / 朱雀-幸运）；吞噬时对方每项已掌握技能有 ${C.pct(K.PET_DEVOUR_P)} 被习得（可跨系累积）。<b>技能属性优先级：灵宠自身套装 > 主人同套装 > 2 件基础</b>（如灵宠穿 2 件精良暴击套则 +6.25%，无自身套装时主人穿 5 件暴击套则 +18%，都无则 2 件基础：暴击+5%/致命3%/防御+10%/治愈+2%/幸运闪避+10%）。<br>· 🌟<b class="y">天赋神通</b>：<b>神级</b>灵宠每次升级有 ${C.pct(K.TALENT_LEARN_P)} 领悟本系天赋神通——灵狐【魅惑】（10% 魅惑敌方全体，1 回合无法行动，含吃药）、玄龟【嘲讽】（50% 嘲讽，敌方全体 2 回合只能攻击玄龟）、朱雀【重生】（倒下时 20% 浴火重生，可无限触发）、青龙【沐浴】（30% 甘霖，主仆恢复 25% 最大生命）、白虎【狂袭】（按 40%/30%/20%/10% 连续再击，最多 5 连）。<br>· 🎽灵宠套装：锻造 → 灵宠装备，可打造 5 套灵宠装备（兽盔/项圈/利爪/软甲/踏云靴，铁矿即可），在锻造页选择灵宠穿戴；同套 2/3/4/5 件激活，与人物套装同规则（含品质加成）。<br>· 灵宠成长：出战灵宠参加 PK 得经验（等级上限：普通30/优秀40/稀有50/卓越60/史诗70/传说80/仙90/神100级）（胜 +${K.PET_XP_WIN} / 负 +${K.PET_XP_LOSE}，认输不得），升级需 ${K.PET_XP_PER_LV}×当前等级 经验，每升 1 级得 ${K.PET_LV_PTS} 点自由属性点（各品质相同，在背包自由分配），并按品质全属性自动成长：普通 +1 / 优秀 +2 / 稀有 +3 / 卓越 +4 / 史诗 +5 / 传说 +6 / 仙 +7 / 神 +8。<br>· 吞噬：在背包选一只灵宠吞噬另一只，吞噬者获得对方全部五项属性和全部经验，被吞噬者永久消失；<b>同品种同品质</b>吞噬有15%概率品质进阶1级（最高到神）。<br>· 冒险中出战灵宠仅提供小额被动加成（灵狐·敏捷·暴击套 / 白虎·力量·致命套 / 玄龟·防御·防御套 / 青龙·生命·治愈套 / 朱雀·智力·幸运套，各 +5%）。<br>· 饱食度（0~100）：修炼/炼药每点体力 -${K.HUNGER_ACT}，冒险/PK 每次 -${K.HUNGER_FIGHT}。<b class="r">饱食为0时饥饿劳作扣寿元</b>：凡人每1次扣1年/练气每2次扣2年/筑基每3次扣4年/金丹每4次扣8年/元婴每10次扣20年/化神每20次扣40年/大乘每40次扣80年/渡劫每80次扣160年，仙人以上不扣（修炼/生活技能/冒险/PK均计）。≥${K.WELL_FED} 时有<b class="g">气运</b>：掉落稀有度、暴击、灵石/凝露/肉/灵宠蛋概率 ×${K.LUCK_FED}。在背包吃肉（饱食 +10/15/20/30，另回体力）或蛋（鸡/鸭/鹅/鸵鸟蛋 +5/8/12/25）恢复，也可选择喂给灵宠。<br>· 灵宠饥饿每参战 -${K.PET_HUNGER_FIGHT}、每天 -${K.PET_HUNGER_DAY}；忠诚初始 ${K.PET_LOYAL_START}，喂食（${C.pct(K.FEED_LOYAL_P)} +2~4）、并肩作战（${C.pct(K.FIGHT_LOYAL_P)} +1~2）、升级（${C.pct(K.LVUP_LOYAL_P)} +3~5）时可能提升。饥饿低于 ${K.PET_HUNGRY} 的灵宠每次行动/上线有 ${C.pct(K.PET_BITE_OUT)} 咬主人（生命 -力量×25%，忠诚 -${K.BITE_LOYAL}，可能流血/抑郁）。PK 中忠诚低于 50 或饥饿时灵宠可能反咬主人。<br>· 状态：<b class="r">🩸流血</b>——战斗中每回合 -5% 最大生命（玩家、灵宠、敌人皆然）；战斗外不会自愈，每次签到扣除当前生命的 20%（不足1按1扣），<b>只能用止血药</b>治愈；第 5 次签到仍在流血将<b class="r">流血身亡</b>。<br>· ☠️死亡（流血或中毒致死）：失去全部体力、活力清空、寿元-0.1%，当天无法修炼、炼药、冒险、PK；背包中随机 ${K.DEATH_LOSE_MIN}~${K.DEATH_LOSE_MAX} 件物品会被路过的玩家顺手牵羊拿走（按数量随机，可能涉及多种；灵宠与技能不会丢失）。次日签到即复活：流血致死者流血清除、生命只剩 1；毒发致死者生命恢复为中毒时生命上限的一半，但<b>中毒仍在</b>（进冒险仍扣 10%、修炼仍扣 2%，不治很快会再次毒发），务必尽快服用解毒丹。<br>· 🛡️<b class="y">新人保护</b>：新角色前 ${K.PROTECT_N} 次死亡、冒险战败、PK战败免除全部惩罚（不掉落物品、体力不清零、不扣属性），死亡时生命保留 1 点并清除流血/中毒；每次触发会提示剩余次数与本次免除的惩罚。用完 ${K.PROTECT_N} 次后正常结算（老存档不补发）。<br>· <b class="r">☠️中毒</b>——战斗中每回合 -4%；战斗外<b>不会自行消退</b>，每次进入冒险扣当前生命的 10%、每次修炼扣当前生命的 2%（不足1按1扣），生命扣到 0 即<b class="r">毒发身亡</b>（次日复活时生命为原上限一半且毒仍在，约 5 次行动后再次毒发），<b>只能用解毒丹</b>治愈。<b class="r">🌧️抑郁</b>——${K.DEPRESS_HOURS} 小时内战斗属性 -10%、气运 ×${K.DEPRESS_LUCK}、修炼 ${C.pct(K.DEPRESS_FAIL)} 失败；进食/喂灵宠有机会驱散，或用兴奋剂。野兽（狼、野猪、蝙蝠、熊、鹰）攻击可致流血，蛇妖/炼尸道人可致中毒，吸血斩可致流血，冒险惨败与被灵宠咬伤也可能留下伤病。<br>· 灵石分灵气石/二~五品（约 50/25/15/8/2%，力量/防御越高高品越易出），凝露各分一~五品。<br>· 灵石不可出售，服用得经验：灵气石 +20、二品 +50、三品 +120、四品 +300，五品直接升 1 级。炼金合成链：10灵气石→下品（+200经验）→10下品→中品（+2000经验）→100中品→上品（+200000经验）→1000上品→极品（直接升1级）。<br>· 极品灵石也可在背包「砸开」，每块碎成 ${C.SMASH_N} 块一~上品灵石（各品约 51/26/15/8%）。<br>· 凝露服用得随机属性：一品 +1、二品 +2、三品 +3、四品 +5、五品 +8；一品凝露可在商店购买。<br>· 炼药时可各投入 1 块灵石、1 瓶凝露，按品阶使成功率与上品概率各 +5/10/15/25/40%（成功率最高 ${C.pct(K.ALC_BOOST_RATE_MAX)}、上品最高 ${C.pct(K.ALC_BOOST_Q3_MAX)}）。<br>· 每升 1 级全属性 +（境界+1）（凡人1/练气2/筑基3…主宰13）（+轮回加成），签到体力 +1。<br>· 🌟<b class="y">境界</b>：凡人→练气→筑基→金丹→元婴→化神→大乘→渡劫→仙人→金仙→合体→尊者→主宰，每境 10 级，10 级为<b>大圆满</b>，需<b>突破</b>才能继续升级。<b>⚡突破</b>：（60%-境界×5%）×气运成功率（凡人60%/练气55%/筑基50%/金丹45%…每境-5%，尊者→主宰5%，上限 95%），成功进下境 1 级且<b>全属性×突破倍率</b>（凡人→练气×1无加成，练气→筑基×1.1，之后每境+0.1，尊者→主宰×2.1）；失败则当前经验清零并退 1~2 级；突破需<b>法力 100/100</b>（签到回满或喝法力药水，凡人用经验不限）；<b>⚡渡劫</b>（筑基→金丹起）：判定成功后先扛<b>⚡天雷</b>（雷数按突破品级：下品 9 道、中品 18、上品 27、完美 36、圆满 45、压条满 2000% 引九九 81 道极劫；每 9 道为一层、一层比一层狠，按防御减免，扛不住则突破失败），雷劫后必经<b>👹心魔劫</b>（随机<b>斗法</b>或<b>问心</b>：斗法是与属性为自身九成的心魔一战（身上诅咒每层使心魔增强 5%，渡劫前宜先解咒）；问心是 3 道 ABCD 问答，仙人以下考游戏机制、仙人以上问道，答对 2 道即过）；渡劫失败退 1~9 级并折寿 10%（不死）；灵气（仙力）可<b>压条</b>超出上限、最高 1000%——压条越高天劫越强，1000% 为最强天劫（雷伤×2.5、天魔 2.5 倍属性）；<b>金丹/元婴品质</b>按突破前压条定档：900%为<b>圆满</b>（×2.0）、700%<b>完美</b>（×1.8）、500%<b>上品</b>（×1.6）、超200%<b>中品</b>（×1.4）、否则<b>下品</b>（×1.2），压条 1000% 则结出<b>圆满金丹极</b>（×2.2，圆满之上独立一档），品质倍率替代原突破倍率；压条≤200% 时另有 1% 概率<b>天劫异变</b>，随机撞上中品/上品/完美/圆满级雷劫，扛过即按该档结丹；历次突破成功每次永久 +1% 成功率（上限 +20%）。<b>🔄轮回</b>：任何境界都回到<b>凡人</b> 1 级，选<b>一个属性封存</b>为<b class="y">前世遗物</b>（自取名+刻录<b class="r">灵魂印记</b>，存入背包，全属性重置为 1，<b class="r">不再直接继承</b>），<b class="r">已学技能消失需重学</b>（技能书/残页保留），物品等其余全部保留；<b>🌟胎中之谜</b>：遗物有寿数——练气遗物3世、每高一境+1世（筑基4/金丹5/…/主宰14），逾期未觉醒则消散。每次<b>突破成功</b>时，每件遗物独立 <b class="y">50%</b> 概率觉醒（幸运套每2件+5%、出战灵宠有幸运技能+10%，上限95%），一次突破最多觉醒一件（多件同时成功由玩家选择）；觉醒时需输入<b class="r">灵魂印记</b>，输对才继承前世属性、遗物消散，输错则无法继承、下次突破继续判定；遗物可永久保留；加成按走过的境界计：练气起到当前境界-1各池 +1，当前境界大圆满再 +1（如金丹大圆满轮回=练气/筑基/金丹各+1=3点，金丹未大圆满=练气/筑基各+1=2点）；每个池子另奖励🌀开脉丹×1；加成<b>下次突破后生效</b>：只计当前境界以下各境（如金丹1层只享受练气+筑基=20点，突破到元婴后才享受金丹池），每点使每升 1 级全属性多 +1（每境上限 10 次，多境累加，凡人轮回不计）（次数记在轮回前所在境界，各境上限 10 次，多境累加，如凡人 10 次+筑基 3 次则金丹每级 +14）；<b>主宰</b>轮回则前面各境池各 +1。<br>· 🧪<b class="y">加料 · 变异 · 丹毒</b>：炼药时可自选加料 0-3 味，搭配对了出<b>变异丹</b>、不对会<b>炸炉</b>（基础料损 1 份、加料全损），搭配全靠自试。服丹积<b>丹毒</b>（0-100）：20 点以内药效十成，其后每多 10 点药效降一成，100 点时只剩两成；<b>化无丹</b>（生命草 + 一品凝露炼制）服 1 颗清 20 点，轮回全清。<br>· 炼药需消耗 1 株对应药草 + 1 枚兽蛋（药引，优先低级），可种植/掏蛋获得或在商店购买。炼药 Lv.3 可炼辟谷丸（饱食 +20）、Lv.5 可炼气力丸（体力 +3），丸非丹，不积丹毒。<br>· 🌀<b class="y">秘境</b>：独立于7档难度的特殊冒险，每日限3次，每次10体力、10-15步随机；怪物更强、高阶怪更多，守关必为👑王阶，稀有掉落大幅提升。秘境专属产出<b>🌀脉络残页</b>（背包直接使用，每张+1实络，永久）与各种珍稀物资（高品灵石/凝露、技能书、开脉丹等）。<br>· 冒险是<b>文字冒险</b>，分 7 档：初级 1 / 中级 3 / 高级 5 / 困难 10 / 地狱 15 / 深渊 20 / 噩梦 30 体力（出发时扣除），每轮 3/3/4/4/5/5/6 步；冒险地图<b>全服共用</b>（每档一张不同的图），空格会随机刷新 🌱草药 / ⛏️矿石 / 💎灵脉（灵脉较稀有）：站在格上点采集获得（草药 = 五种属性草之一；矿石 = 铁/铜/银/金，低概率出灵气石与下品灵石；采灵脉直接出灵石，灵脉越大出得越好，巨型灵脉有概率出仙玉），先到先得；<b>采集阵</b>可布在空格上，上品灵石驱动，自动收走该格刷新的资源；每步随机事件：遇怪、奇遇（隐士、山洞、商人、毒蘑菇、灵泉、石碑谜题…）、宝箱、陷阱、休息点，每个事件 2~4 个选择，部分选择要检定属性（敏捷躲陷阱、智力解谜、力量推石…，按钮上显示成功率），非陷阱事件可随时<b>撤退</b>保住收获；最后一步必定遇到守关怪。怪物分 <span class="rk1">普通</span>/<span class="rk2">精英</span>/<span class="rk3">变异</span>/<span class="rk4">领主</span>/<span class="rk5">王</span> 五阶，越高越强、奖励与掉落越好（王可能掉极品灵石/凝露），高难度更常遇到领主与王；遇怪可选战斗或逃跑（敏捷检定，失败被迫迎战）。战斗沿用原战斗规则（灵宠加成、装备与套装生效）。事件共数百种，均为一句话描述+选项。游戏里的所有物品（矿石、兽皮、肉、兽蛋、药草、各品灵石/凝露、各档残页与经验书、技能残页、技能书、丹药、药水、菜肴、止血药/解毒丹/兴奋剂、各套装各部位各品质装备、灵宠蛋、金元）都可能在冒险中获得：越稀有越少见，难度越高、怪物阶级越高越容易出好东西。战败：扣属性、清空剩余体力、损失金元、可能染上伤病，冒险结束（新人保护期内免除）。建议等级 Lv1/2/3/5/7/9/12、总属性 5/30/60/120/200/300/450，总属性不足时怪物按建议值强度出现；战败扣除属性、清空体力并损失 ${C.pct(K.DEATH_GOLD_PCT)} 金元。<br>· PK 胜者夺取对方指定属性（按境界：基数=对方境界每级属性点，凡人1…主宰13；同境全额，高打低差1/2/3/4境×0.5/0.3/0.2/0.1、差5+无，低打高差1/2/3境×2/3/5、差4+×10封顶）并获得金元；胜利另有 30% 得👹<b class="y">煞气</b>×1（击杀敌方灵宠每只另 30%、冒险击杀怪物 10%、王阶 30%）、60% 被👻<b class="r">诅咒</b>（永久，每层突破成功率 -1%，可叠加；商店买💧<b>神水</b>50金可消除一层）。煞气放在背包中每个被动+1%攻击或+1%防御（背包中自选）；习得《吞魔》（商店 800 金）后可吞噬，每次加1个法力上限的法力、无视上限无限叠加。<br>· 🍲<b class="y">珍馐</b>：烹饪 Lv6+ 可烹制 5 种珍馐（虎肉 + 药草 / 三品凝露，无品质）：<b>珍馐毒</b>（敌方全体中毒）、<b>珍馐离</b>（敌方混乱 3 回合，50% 概率转头互砍）、<b>珍馐力</b>（己方主人+灵宠力量 +50%，持续 5 回合）、<b>珍馐衰</b>（敌方全属性 -30%，持续 5 回合）、<b>回魂珍馐</b>（本场战斗中主人或灵宠首次倒下时复活，恢复 50% 生命）。PK 战前可使用 1 种，<b>最先手、无视敏捷</b>。<br>· 📢<b class="y">全服通告</b>：获得橙色以上物品时全服通告——传说装备（掉落/锻造）、极品丹药/药水/菜肴、传说及以上品质灵宠（传说/仙/神）。<br>· 商店出售药草、一品凝露、疗伤药（止血药 25、解毒丹 1000、兴奋剂 30 金）与技能书，收购矿石、猎物与兽蛋。<br>· 🏪<b class="y">寄售行</b>：商店→🏪寄售行，线上玩家市场，可上架矿石/药草凝露/丹药（含变异丹）/疗伤药等，成交收5%手续费。<br>· 💬<b class="y">世界聊天</b>：菜单→💬世界聊天，可与天下真人道友畅谈；突破成功时全服通告。<br>· 🏆<b class="y">修仙榜单</b>：菜单→🏆修仙榜单，与天下真人道友一较高下；共7榜：<b>等级榜</b>（境界+等级）、<b>力量/敏捷/防御/生命/智力</b>五榜、<b>📅签到榜</b>（累计签到次数）与<b>🧘闭关榜</b>（累计闭关时长），每榜取前20名。<b>每日榜单奖励</b>（等级/五维/签到榜，每榜按名次）：第1名🌀脉络残页×1、第2-3名🌀开脉丹×1、第4-10名👹煞气×1、第11名及以后💠极品灵石×1，每日可领一次。<br>· 🔥<b class="y">连续签到</b>：每天签到累积，断签清零；连续签到7天送 🎒小型储物袋 ×1（每个号限领1次）。<br>· 🎒<b class="y">物品上限</b>：背包物品默认上限100，装备包默认5件；超出上限的物品无法获得、直接消失；小型储物袋/储物戒指/储物空间可扩充上限。<br>· ⏳<b class="y">寿元</b>：凡人100年，每日签到-1年；突破后寿元取max(当前,新境界基础)，每突破一境×2（练气200/筑基400/金丹800/元婴1600/化神3200/大乘6400/渡劫12800/仙人25600/金仙51200/合体10万/尊者20万/主宰409600年）；寿元≤10年变红预警，耗尽则<b class="r">强制抉择</b>：<b class="y">轮回转世</b>（选一个属性保留，物品保留）或<b class="r">☠️坐化死亡</b>（失去一切，重开一局）；轮回后寿元重置为100年。战斗中可<b class="y">🔥燃血</b>/<b class="y">💧燃法</b>/<b class="y">⏳燃寿</b>：点一下+1层，最高10层（燃血/燃法10层后再点关闭）。<b class="y">🔥燃血</b>配合<b>防御</b>=<b class="r">🔥燃血御守</b>：防御加成百分比与攻击加成相同，对方物理攻击<b class="y">反弹100%伤害</b>，法术攻击则防御无效。<b class="y">⏳燃寿</b>：每层燃烧10年寿元，本场攻击+30%（最多10层），寿元不足10年无法燃烧。<b class="y">🔰法术防御</b>：消耗法力/仙力换取本回合法术防御（练气~渡劫1法力=10点，仙人以上1仙力=100万点），专门抵挡火球术/雷击等法术伤害（与防御叠加），灵宠同样生效；<b class="y">💧燃法</b>配合<b>🔰法术防御</b>=<b class="pu">💧燃法灵盾</b>：对方的法术伤害优先扣<span class="pu">法力</span>（蓝条空了则扣血），并反弹<span class="y">流失法力×10</span>的法术回击；<b class="pu">⚡仙力攻击</b>也会被反弹，反弹=<span class="y">仙术伤害+攻击者消耗仙力×10</span>；即使被秒杀回击依然有效，可<span class="r">☠️同归于尽</span>（双方各自承受死亡惩罚，互夺：双方从对方背包各夺1件物品，属性互相转移，外加各自全属性消散1%）。<b class="y">🛡️仙力防御</b>：仙人境以上可用，1仙力=100万防御，只持续1回合，灵宠同样生效；<b class="y">只反弹⚡仙力攻击</b>（反弹100%所受伤害，物理/法术攻击不反弹）。<b class="y">⚡仙力攻击</b>：1仙力=100万直接伤害，无视防御；仙人境以上的对手也有概率使用（耗5-20仙力）。<br>· 🌀<b class="y">经络</b>：分<b>络</b>（加闭关速度）与<b>脉</b>（加法力溢出上限）两种，各分虚/实。<b>虚络</b>：<b>开脉丹</b>（冒险低概率掉落）服用每颗开一穴（点亮神藏穴位）、虚络 +1（不加气旋）；<b>实络</b>：<b>🌀脉络残页</b>（秘境专属）在背包直接使用，每张+1<span class="g">（永久，轮回保留）</span>。每条络闭关+1/秒（洞府1+络+经验/秒，灵脉2+络+经验/秒）。<b>虚脉</b>：10虚络在背包合成1条<span class="r">（临时）</span>；<b>实脉</b>：每用10张脉络残页<b>📖开脉术</b>升1级，实脉+1<span class="g">（永久）</span>。溢出上限=基础2倍+虚脉（最多12条生效）+实脉（不封顶，可突破10倍）。每用1张脉络残页开脉术经验+1，每点经验闭关+1/秒。<b>🌀神藏</b>：星藏分13座神藏（一座一经、任督合一，座名按境界），图外围气旋即进度；每座吃10张脉络残页开满（不按穴数），开脉丹每颗开一穴、不动气旋，部分进度按比例亮星，轮回只清丹开的穴、气旋保留；虚络由开脉丹开穴派生；开脉丹点满一条经络一侧得虚脉1条（12经左右共24条、任督各1条，共26条），左右成对多压一条、任督各压一条（虚脉最多压14条）；气旋吃满一座为大气旋、算实脉1条，实脉封顶13条。<br>· 🌫️<b class="y">天地灵气</b>：全服共享的灵气浓度（末法/稀薄/平常/浓郁/潮汐），影响所有人闭关收益与凝气（×0.6~×1.4）；灵脉闭关可养气，往灵脉投灵石可聚灵，灵气会自然衰减。<br>· 🎖️<b class="y">身份</b>：声望攒身份（散修→客卿→供奉→长老→太上长老），签到/突破/观礼/奇遇/放生/发红包都攒声望；身份给特权：签到体力加成、秘境次数、观礼体力加成。<br>· 🌩️<b class="y">功德大劫</b>：大乘起 30 天一劫，结算时功德 ≥100 安然渡过得天道赐福，<100 劫火焚身扣寿元 5%，结算后功德减半。<br>· 🧧<b class="y">红包</b>：商会卖红包皮（金元/下品/中品/上品/极品灵石/仙玉六种，各 1 个对应货币一张），发放时放入对应货币（≥100 个、≥10 人抢，每人随机至少 1、最多整包一半），24 小时没抢完的回收进<b class="y">天道池</b>；天道池全服可见，玩家可捐献补池，池亏空过深则灵气不稳引大劫。<br>· 🖼️<b class="y">玩家头像图库</b>：上传头像可自己取名，私用只存本机，入库则提交审核、通过后进头像页「玩家图库」全服可选；攒得多了将来逐步替换官方图。· 🐾<b class="y">灵宠开口</b>：出战灵宠有性格，会在出战、战斗、喂食、升级、奇遇时说话。<br>· 🌠<b class="y">定命星</b>：开局所定命星，只论命格，不论强弱。<br>· 🗡️<b class="y">本命飞剑</b>：练气后在个人面板「本命」页铸剑，择一剑意（雷意/河意/山意）；悟剑耗观相残页提升剑意，换意须斩旧剑重铸。<br>· ⚖️<b class="y">法宝规则词条</b>：传说品质装备必带一条规则（不灭/噬灵/连珠/背水），改写战斗规则而非堆数值。<br>· 🧘<b class="y">闭关</b>：闭关期间只能点商会/背包/生活，修炼/冒险/PK不可用；<b>灵脉闭关</b>入关1小时后会被真人PK匹配：自动应战、输赢照常结算、不打断闭关；优先匹配还没被打过的闭关者；闭关调息每秒恢复 <b class="g">10% 生命上限</b>（出关结算）。<br>· ⚔️<b class="y">仙术五行修炼</b>：仙人境起可进，金/木/水/火/土五条修炼线，每条固定10步，每次耗<b>10仙力+5体力</b>；每日五条线共计：仙人1次/金仙2次/合体3次/尊者4次/主宰5次。守关必为👑王阶且必掉1个对应属性残物（其他怪极低概率掉落，每次不出+1%直到出，出后重计）；10个同属性残物在冒险页⚗️五行合成中合1件，自选<b>X之力</b>或<b>X之抗</b>。X之力：攻击附带对应属性伤害（每件+10%，<b>无法闪避</b>，颜色：金<span style="color:#ffd700">金</span>/木<span style="color:#22c55e">绿</span>/水<span style="color:#3b9ddd">蓝</span>/火<span style="color:#ef4444">红</span>/土<span style="color:#a16207">褐</span>）；X之抗：免除对应属性伤害，且被命中时按（抗件数-力件数）反弹10%/件（例：1金之力打3金之抗，抗方无属性伤害并反弹20%）。</small></div></div>
    <div class="row"><button class="btn full" data-close>关闭</button></div>`;
  }
  openSheet(html + `</div>`);
  poolMenuTxt();
}
const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function sheetChat() {
  const _li = (typeof MHXY !== 'undefined' && MHXY.loggedIn && MHXY.loggedIn());
  let log = '', hint = '';
  if (_li) {
    hint = '与天下道友畅谈（真人世界，3秒1条）。';
    try { if (typeof chatWsConnect === 'function') chatWsConnect(); } catch(_) {}
    try { if (typeof chatHistoryToCache === 'function') chatHistoryToCache(); } catch(_) {}
    const srv = (window._srvChat || []);
    log = srv.map(m => { const xh = m.xHandle ? `<span style="color:#1d9bf0">@${esc(m.xHandle)}</span>${m.xVerified ? '<span style="color:#1d9bf0">✓</span>' : ''} ` : ''; const _tx = m.text || m.t || ''; let _ex = ''; const _mt = /【观礼#([0-9a-z]+)\|([^|]*)\|([^|]*)\|([^】]*)】/.exec(_tx); if (_mt) _ex += ' <button class="btn sm" data-spectate="' + _mt[1] + '" data-specmeta="' + esc(_mt[2]) + '|' + esc(_mt[3]) + '|' + esc(_mt[4]) + '">👀 观礼</button>'; const _rp = /【红包#([0-9a-z]+)/.exec(_tx); if (_rp) _ex += ' <button class="btn sm" data-redpacket="' + _rp[1] + '">🧧 抢红包</button>'; return `<div class="chat-msg" style="margin-bottom:3px"><b style="color:#7ec8ff">${xh}${esc(m.username || m.n || '道友')}<span style="color:#666">[${m.playerNo != null ? m.playerNo : ''}]</span></b>：${esc(_tx)}${_ex}</div>`; }).join('') || '<div class="hint">暂无消息，道友先开个头吧</div>'; // v1097 世界聊天面板补抢红包/观礼按钮（与悬浮窗同款；此前该面板只拼文字无按钮，点公告无反应）
    const _n0 = srv.length;
    setTimeout(() => { const b = $('chatBox'); const i2 = $('chatInput'); if (b && document.body.contains(b) && ((window._srvChat || []).length !== _n0) && !(i2 && document.activeElement === i2 && i2.value)) sheetChat(); }, 1500);
  } else {
    hint = '⚠️ 还没登录真人联机：这里只显示游戏内通告，发言不会进入世界频道。';
    log = (S.chatLog || []).filter(m => m.sys || m.announce).map(m => m.announce ? `<div class="chat-announce">📢【全服通告】${esc(m.t)}</div>` : `<div class="chat-sys">📢 ${esc(m.t)}</div>`).join('') || '<div class="hint">暂无通告</div>';
  }
  openSheet(`<h2>💬 世界聊天</h2><div class="hint">${hint}</div>
    <div id="chatBox" style="max-height:300px;overflow-y:auto;border:1px solid #444;border-radius:8px;padding:8px;margin-bottom:8px;background:#111">${log}</div>
    ${_li ? '<div class="row" style="display:flex;gap:6px"><input id="chatInput" maxlength="100" placeholder="说点什么…" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><button class="btn gold" data-chatsend>发送</button><button class="btn" data-redopen>🧧 红包</button></div>' : '<div class="row"><button class="btn gold full" data-mhxy>🌐 未登录真人联机——点此登录，登录后发言才进世界</button></div>'}
    <div class="row"><button class="btn full" data-close>关闭</button></div>`);
  const box = $('chatBox'); if (box) box.scrollTop = box.scrollHeight;
  const inp = $('chatInput'); if (inp) inp.focus();
}
function sheetBattlePlan() {
  const acts = [['attack','⚔️攻击'],['defend','🛡️防御']];
  Object.keys(SKILLS).forEach(k => { if ((S.skills||[]).includes(k)) acts.push([k, SKILLS[k].name + `（${SKILLS[k].mp}法力）`]); });
  let html = `<h2>⚔️ 战斗预设</h2><div class="hint">自动战斗前5回合按此出招，之后系统接管。点选每回合招式：</div>`;
  for (let i = 0; i < 5; i++) {
    const cur = (S.battlePlan||[])[i] || 'attack';
    const curName = acts.find(a=>a[0]===cur)?.[1]||cur;
    html += `<div class="row"><div class="lab">第 ${i+1} 回合<small>当前：${curName}</small></div><div class="grid2">`;
    acts.forEach(([k,name]) => { html += `<button class="btn${k===cur?' gold':''}" data-bp="${i}:${k}">${name}</button>`; });
    html += `</div></div>`;
  }
  html += `<div class="row"><button class="btn full" data-close>关闭</button></div>`;
  openSheet(html);
}
function sheetPkWin() {
  const o = pk.opp;
  const oInfoW = encodeURIComponent(JSON.stringify({name:o.name, realm:o.realm||0, level:o.lv||1, attrs:o.attrs||{}, skills:o.skills||[], style:o.style||'', pet:o.pet||null, lifespan:o.lifespan||0}));
  $('mask').dataset.lock = '1';
  openSheet(`<h2>🏆 PK 胜利！</h2><div class="hint">选择要从 <b class="r"><a href="javascript:void(0)" data-person="${esc(o.name)}" data-info="${oInfoW}" style="color:#7ec8ff;text-decoration:underline;cursor:pointer">${o.name}</a></b> 身上夺取的属性（最多 ${K.PK_TAKE} 点，对方属性不低于 ${K.ATTR_MIN}）：</div>` +
    `<div class="row"><div class="lab">选择属性<small>选后直接夺取</small></div><select data-pktake="1" style="flex:1;padding:10px;font-size:14px"><option value="">请选择…</option>` + ATTRS.map(k => { const t = Math.max(0, Math.min(K.PK_TAKE, o.attrs[k] - K.ATTR_MIN)); return `<option value="${k}" ${t ? '' : 'disabled'}>${AN[k]}（对方${o.attrs[k]}·你${S.attrs[k]}）夺取+${t}</option>`; }).join('') + `</select></div>`);
}

/* ---------- 行动 ---------- */
function doDebug(act) {
  if (act === 'dbg_afk_cave' || act === 'dbg_afk_vein') {
    S.afk = { type: act === 'dbg_afk_vein' ? 'vein' : 'cave', start: Date.now() };
    save(); render();
    try { log('good', '🧘 开始' + (act === 'dbg_afk_vein' ? '灵脉' : '洞府') + '闭关挂机…'); } catch(e) {}
    return;
  }
  if (act === 'dbg_afk_1h' || act === 'dbg_afk_24h') {
    try {
      if (!S.afk) { toastLog('sys', '当前未在闭关中'); return; }
      const hrs = act === 'dbg_afk_24h' ? 24 : 1;
      const type = S.afk.type, isMana = (typeof C.useFali === 'function' ? C.useFali(S) : false);
      let gain = 0, lbl = '', nqBonusDbg = 0, hcDbg = 0, defDbg = 0, defMultDbg = 0;
      const sc = (typeof C.setCounts === 'function' ? C.setCounts(S) : {});
      if (type === 'wushu') { const w2x = (sc.fatal || 0) >= 2 ? 2 : 1; gain = hrs * 60 * w2x; lbl = '经验'; }
      else if (type === 'ningqi') { const hc = (sc.heal || 0), hi = hc >= 2 ? Math.min(5, hc) - 2 : -1; let nqBonus = 0, nqAgain = 0; try { nqBonus = hi >= 0 ? (C.GEAR_SETS.heal.ningqi[hi] || 0) : 0; nqAgain = hi >= 0 ? (C.GEAR_SETS.heal.ningqiAgain[hi] || 0) : 0; nqBonusDbg = nqBonus; hcDbg = hc; } catch(e) {} const nqRate = Math.min(0.95, (0.30 + nqBonus) * C.qiFactor()); for (let i = 0; i < hrs; i++) { if (Math.random() < nqRate) { gain += 150; S.yinQi = (S.yinQi|0) + 1; if (nqAgain > 0 && Math.random() < nqAgain) gain += 150; } } lbl = '经验'; } // v116 v1064 改 C.qiFactor（修 iOS 测试结算报错）
      else { const isVein = type === 'vein'; const dc = (sc.def || 0), di = dc >= 1 ? Math.min(5, dc) - 1 : -1; let afkMult = 0; try { afkMult = di >= 0 ? (C.GEAR_SETS.def.afkMult[di] || 0) : 0; defDbg = dc; defMultDbg = afkMult; } catch(e) {} gain = Math.floor(hrs * 3600 * ((isVein ? 2 : 1) + C.maiLuo(S)) * (1 + afkMult)); lbl = (typeof C.resLbl === 'function' ? C.resLbl(S) : '灵力'); if (isVein) { let nqB2 = 0, nqA2 = 0; try { const hc2 = (sc.heal || 0), hi2 = hc2 >= 2 ? Math.min(5, hc2) - 2 : -1; nqB2 = hi2 >= 0 ? (C.GEAR_SETS.heal.ningqi[hi2] || 0) : 0; nqA2 = hi2 >= 0 ? (C.GEAR_SETS.heal.ningqiAgain[hi2] || 0) : 0; } catch(e) {} const nqR2 = Math.min(0.95, 0.30 + nqB2); let nqN2 = 0; for (let i = 0; i < hrs; i++) { if (Math.random() < nqR2) { nqN2++; S.yinQi = (S.yinQi|0) + 1; if (nqA2 > 0 && Math.random() < nqA2) { nqN2++; S.yinQi = (S.yinQi|0) + 1; } } } if (nqN2 > 0) log('good', (S.realm|0) >= 8 ? `⚖️ 参悟法则，法则之力 <span class="g">+${nqN2}缕</span>（${S.yinQi|0}/10）` : `🌀 灵脉凝气，凝气 <span class="g">+${nqN2}缕</span>（${S.yinQi|0}/10）`); } } // v89：每条络+1；v1059 Ye 定：开脉术经验不加闭关（只升级、给实脉）；v202 灵脉每小时判定凝气
      if (gain > 0) { if (isMana) S.mana = Math.min(C.manaCapEff(S), S.mana + gain); else S.xp += gain; }
      S.stats = S.stats || {}; S.stats.afkSecs = (S.stats.afkSecs || 0) + hrs * 3600; S.stats.afkSecsTotal = (S.stats.afkSecsTotal || 0) + hrs * 3600;
      save(); render();
      const dbgInfo = type === 'ningqi' ? `heal件数=${hcDbg},加成=${Math.round(nqBonusDbg*100)}%` : (type === 'dongfu' || type === 'vein') ? `def件数=${defDbg},加成=${Math.round(defMultDbg*100)}%` : '';
      log('good', `⏰ 测试结算 +${hrs}小时：<span class="g">${lbl} +${gain}</span>（${dbgInfo}）`);
    } catch(err) { try { log('bad', '测试结算报错：' + (err && err.message)); } catch(e) {} }
    return;
  }
  closeSheet();
  if (act === 'dbg_reset') { if (confirm('确定要恢复初始账号吗？当前存档将清空！')) { localStorage.removeItem(SAVE_KEY); pk = null; S = C.newState(); closeSheet(); $('log').innerHTML = ''; welcome(); commit(); } return; }
  if (act === 'dbg_checkin') { doCheckin(true); return; }
  if (act === 'dbg_allitems') {
    const _give = (store, defObj, n) => { try { if (!defObj) return; for (const k in defObj) store[k] = (store[k]||0) + n; } catch(e) {} };
    try { if (!S.ores) S.ores = {}; _give(S.ores, (typeof ORES !== 'undefined' ? ORES : null), 99); } catch(e) {}
    try { if (!S.mats) S.mats = {}; _give(S.mats, (typeof MATS !== 'undefined' ? MATS : null), 99); } catch(e) {}
    try { if (!S.meds) S.meds = {}; _give(S.meds, (typeof MEDS !== 'undefined' ? MEDS : null), 99); } catch(e) {}
    try {
      if (!S.elixirs) S.elixirs = {};
      const _pot = (typeof POTIONS !== 'undefined' ? POTIONS : null);
      if (_pot) for (const k in _pot) for (let q = 1; q <= 4; q++) { const _ek = k + q; S.elixirs[_ek] = (S.elixirs[_ek]||0) + 99; }
    } catch(e) {}
    try { if (!S.eggs) S.eggs = {}; _give(S.eggs, (typeof EGGS !== 'undefined' ? EGGS : null), 99); } catch(e) {}
    try { if (!S.pages) S.pages = {}; _give(S.pages, (typeof PAGES !== 'undefined' ? PAGES : null), 99); } catch(e) {}
    try { if (!S.food) S.food = {}; _give(S.food, (typeof MEATS !== 'undefined' ? MEATS : null), 99); } catch(e) {}
    try { if (!S.dishes) S.dishes = {}; _give(S.dishes, (typeof DISHES !== 'undefined' ? DISHES : null), 99); } catch(e) {}
    try { if (!S.inv) S.inv = {}; S.inv['sha'] = (S.inv['sha']||0) + 99; S.inv['mai'] = (S.inv['mai']||0) + 99; } catch(e) {}
    try { if (!S.skillPages) S.skillPages = {}; const _sk = (typeof SKILLS !== 'undefined' ? SKILLS : null); if (_sk) for (const k in _sk) S.skillPages[k] = (S.skillPages[k]||0) + 99; } catch(e) {}
    try { S.petEggs = (S.petEggs||0) + 99; } catch(e) {}
    try { S.xianyu = (S.xianyu||0) + 99; } catch(e) {}
    try { S.gold = (S.gold||0) + 999999; } catch(e) {}
    try { log('good', '🧪 <span class="pu">[测试]</span> 所有物品 +99，金元 +999999'); } catch(e) {}
    afterAct(); commit(); return;
  }
  if (act === 'dbg_clear_dup_ores') {
    try {
      // 清理没有图标的重复灵石（合成版：xps, zps, sps, jps）
      for (const k of ['xps', 'zps', 'sps', 'jps']) { if (S.ores && S.ores[k]) delete S.ores[k]; }
      log('good', '🧪 <span class="pu">[测试]</span> 已清理重复灵石');
    } catch(e) {}
    afterAct(); commit(); return;
  }
  if (act === 'dbg_gold1k') { S.gold = (S.gold||0) + 1000; log('gold', '🛠️ 测试：金元 +1000'); commit(); sheetDebug(); return; }
  if (act === 'dbg_items') {
    const add = (o, k, n=1) => { if (o) o[k] = (o[k]||0) + n; };
    for (let q=1; q<=5; q++) { add(S.ores, 'sp'+q); add(S.ores, 'lu'+q); }
    ['hp1','hp2','hp3','mp1','mp2','mp3'].forEach(k => add(S.elixirs, k));
    Object.keys(MEDS).forEach(k => add(S.meds, k));
    for (let q=1; q<=5; q++) add(S.pages, 'pg'+q);
    for (let q=1; q<=5; q++) add(S.expBooks, 'exp'+q);
    Object.keys(SKILLS).forEach(k => add(S.skillBooks, k));
    add(S.elixirs, 'beast1', 3);
    add(S, 'gold', 1000);
    afterAct(); commit(); render(); toastLog('sys', '全物品各+1（背包查看使用）'); return;
  }
  if (act === 'dbg_xp1k') { C.gainXp(S, 1000); toastLog('sys', '经验 +1000'); }
  else if (act === 'dbg_xp10k') { C.gainXp(S, 10000); toastLog('sys', '经验 +10000'); }
  else if (act === 'dbg_mana1k') { S.mana = Math.min(C.manaCapEff(S), S.mana + 1000); toastLog('sys', '法力 +1000'); }
  else if (act === 'dbg_mana100k') { S.mana = Math.min(C.manaCapEff(S), S.mana + 100000); toastLog('sys', '法力 +100000'); }
  else if (act === 'dbg_mana1m') { S.mana = Math.min(C.manaCapEff(S), S.mana + 1000000); toastLog('sys', '法力 +100万'); }
  else if (act === 'dbg_mana10m') { S.mana = Math.min(C.manaCapEff(S), S.mana + 10000000); toastLog('sys', '法力 +1000万'); }
  else if (act === 'dbg_xian10k') { if ((S.realm|0) >= 8) S.xianCap = Math.max(1, (S.xianCap|0) + 10000); S.mana = (S.mana|0) + 10000; toastLog('sys', '仙力 +1万'); } // v844 仙人境加仙力时同步涨上限，否则被cap卡住没用
  else if (act === 'dbg_xian1m') { if ((S.realm|0) >= 8) S.xianCap = Math.max(1, (S.xianCap|0) + 1000000); S.mana = (S.mana|0) + 1000000; toastLog('sys', '仙力 +100万'); } // v844 同上
  else if (act === 'dbg_xian_fix') { S.xianCap = 2280; S.mana = 2280; toastLog('sys', '仙力已恢复为2280（22.8亿/100万）'); }
  else if (act === 'dbg_lvup') { C.levelUp(S, 1); afterAct(); commit(); render(); toastLog('sys', '升1级'); } else if (act === 'dbg_yuanman') { C.levelUp(S, 10 - (S.level|0)); toastLog('sys', '已直升圆满'); } else if (act === 'dbg_fullhp') { S.hpCur = null; toastLog('sys', '已回满血'); }
  else if (act === 'dbg_maxlv') { while (S.level < 10) C.levelUp(S); toastLog('sys', '已满级'); }
  if (act === 'dbg_poison') { C.addStatus(S, 'poison'); toastLog('sys', '已中毒'); }
  else if (act === 'dbg_bleed') { C.addStatus(S, 'bleed'); toastLog('sys', '已流血'); }
  else if (act === 'dbg_depress') { C.addStatus(S, 'depress'); toastLog('sys', '已抑郁'); }
  else if (act === 'dbg_poison_die') { S.status.poison = true; C.die(S, 'poison'); toastLog('sys', '毒发身亡'); }
  else if (act === 'dbg_bleed_die') { S.status.bleed = true; C.die(S, 'bleed'); toastLog('sys', '流血身亡'); }
  else if (act === 'dbg_clear') { S.status.bleed = false; S.status.poison = false; S.status.depress = 0; toastLog('sys', '状态已清除'); }
  save(); render();
}
function doCheckin(force) {
  // v605 测试签到给一键全物
  if (force) {
    try {
      for(let i=0;i<12;i++)S.inv['repair'+i]=Math.max(S.inv['repair'+i]|0,9);
      for(const k in ORES)S.ores[k]=Math.max(S.ores[k]|0,99);
      for(const k in MATS)S.mats[k]=Math.max(S.mats[k]|0,99);
      for(const k in MEDS)S.meds[k]=Math.max(S.meds[k]|0,99);
      for(const k in POTIONS)S.elixirs[k]=Math.max(S.elixirs[k]|0,99);
      S.xianyu=Math.max(S.xianyu|0,99);S.gold=Math.max(S.gold|0,9999);
      log('good','🎒 <span class="pu">[测试]</span> 一键全物已发放');
    } catch(e) {}
  }
  // 出关结算（防C.checkin里没跑到）
  if (S.afk) {
    let gain = 0;
    try { gain = afkExit(S, 'checkin'); } catch(e) { S.afk = null; }
    if (S.afk) S.afk = null; // 兜底：确保AFK清除
    try {
      const lbl = C.resLbl(S);
      log('good', gain > 0 ? `🧘 闭关结束，出关获得 <span class="g">${lbl} +${gain}</span>。` : `🧘 闭关结束（无收益）。`);
    } catch(e) {}
    afterAct(); commit();
    if (!force && !C.canCheckin(S)) return; // 已签到：只出关，不再签到
  }
  const r = C.checkin(S, force);
  if (!r.ok) { toastLog('sys', '今日已签到，明天再来吧。'); return; }
  // v978 X 验证用户签到体力翻倍
  try {
    if (typeof isXVerified === 'function' && isXVerified() && r.gain > 0) {
      S.stamina = (S.stamina|0) + r.gain;
      r.gain = r.gain * 2;
      log('gold', '🎖️ <span class="y">X 认证</span>加成：签到体力翻倍！');
    }
  } catch(_) {}
  if (r.toxLoss) log('bad', `🧪 <b>丹毒攻心</b>（丹毒 ${S.danDu|0}），寿元 <span class="r">-${r.toxLoss} 年</span>`); // v1138
  // v1086 拍卖行已改服务端结算，本地 auc3Daily 停用（避免重复结算）
  if (r.revived) log('good', (r.revived.cause === 'poison' || r.revived.cause === 'old' ? '' : `🌅 你从昏迷中醒来——<b class="g">复活了</b>！`) + `${r.revived.cause === 'old' ? `⏳ 寿元耗尽坐化，一缕残魂不散，重聚肉身。<b class="r">寿元已尽（0年）</b>，请尽快<b class="y">突破</b>增加寿元，或<b class="y">轮回</b>转世重修！` : r.revived.cause === 'poison' ? `🌅 因为中毒太深昏死过去，嘴巴大张，恰巧仙鸟飞过，拉了一坨糑糑进入嘴里，刚好缓解了中毒状态，但是毒依然未解除。<br><b class="g">复活了</b>：生命恢复到 <b class="r">${r.revived.vit}</b>（上限 ${r.revived.base} 的一半）。<b class="r">再消耗 ${C.leftBeforeDeath(S, 'poison')} 点体力将再次毒发身亡</b>，速用<b>解毒丹</b>！` : `流血止住了，但元气大伤，生命只剩 <b class="r">1</b>（原 ${r.revived.base}），需重新修炼。`}`);
  log('gold', `📅 ${force ? '<span class="pu">[测试]</span> ' : ''}签到成功，体力 <span class="g">+${r.gain}</span>${r.died && !r.died.protected ? '' : `（当前 ${S.stamina}）`}，活力 <span style="color:#7fd6ff">+${r.vigor}</span>（${S.vigor}/${C.vigorCap(S)}${r.vigor < C.vigorGain(S) ? '，已满' : ''}）<br>🔥 连续签到 <b class="y">${r.consecDays}</b> 天` + (r.ringReward ? `<br>🎉 <span class="g">连续签到 ${r.consecDays} 天！获得 🎒小型储物袋 ×1（当前 ${S.pouch} 只）</span>` : '') + (r.bled ? `<br><span class="r">🩸 伤口流血不止，生命 -${r.bled * K.HP_PER_VIT}（当前 ${S.attrs.vit * K.HP_PER_VIT}）。${r.died ? '' : `<b>再签到 ${C.leftBeforeDeath(S, 'bleed')} 次将流血身亡！</b>`}只有<b>止血药</b>能止血！</span>` : ''));
  try { if (typeof addMerit === 'function') addMerit(1, '每日签到'); } catch(_) {} // v893
  try { if (typeof addFame === 'function') addFame(1, '每日签到'); const _idb = ID_TIERS[idTier()].ci; if (_idb > 0) { S.stamina = (S.stamina|0) + _idb; log('gold', `🎖️ 身份特权：签到体力 +${_idb}（${ID_TIERS[idTier()].name}）`); } } catch(_) {}
  afterAct();
  commit();
  if (r.forceReinc) doReincarnate(true);
}
function doFaZe(el) { // v867 参悟法则：尊者解锁，3体力/次，仅对应灵根
  if ((S.realm|0) < 11 || !window.LG) return;
  if (!window.LG.hasEle(S, el)) { toastLog('bad', '🔒 无此灵根，无法参悟' + el + '之法则'); return; } // v1129 变异根按来源行
  S.faZe = S.faZe || {};
  const cur = (S.faZe[el]|0);
  if (cur >= 100) { toastLog('sys', el + '之法则已圆满'); return; }
  if ((S.stamina|0) < 3) { toastLog('bad', '⚡ 体力不足（参悟需3点）'); return; }
  S.stamina -= 3;
  let add = 1 + Math.floor(Math.random() * 3), dw = false;
  if (Math.random() < 0.05) { add += 8; dw = true; } // 5%顿悟
  S.faZe[el] = Math.min(100, cur + add);
  if (S.faZe[el] >= 100) log('good', `✨ <b>${el}之法则圆满！</b>${{str:'力量',vit:'体质',agi:'身法',int:'智力',def:'防御'}[window.LG.ATTR[el]]}+15%！`);
  else log('good', `${dw ? '💡 顿悟！' : '☯️ '}${el}之法则参悟 +${add}%（${S.faZe[el]}%/100%）`);
  const _awF = C.tryAwakenRoot(S, el); if (_awF) log('good', `🌟 <b>灵根觉醒！</b>${el}灵根参悟有感，觉醒为<b>${_awF}</b>灵根！`); // v1134 参悟觉醒：须现有基础灵根
  const _allMine = (S.lingGen||[]).filter(e => e !== '毒').every(e => (S.faZe[e]|0) >= 100); // v1139 毒根无法则不计本命
  const _allFive = window.LG.ELES.every(e => (S.faZe[e]|0) >= 100);
  if (_allFive && !S.faZeDone5) { S.faZeDone5 = 1; log('warn', `🌈 <b>五行圆满！成就【混元道体】！</b>各属性+5%，突破主宰成功率+25%！`); }
  else if (_allMine && !S.faZeDone) { S.faZeDone = 1; log('warn', `☯️ <b>本命法则圆满！</b>${window.LG.benMingTxt(S)}！`); }
  afterAct(); save(); sheetTrain(); render();
}
async function doTrain(k, n) { await srvProg('/api/progress/train', { attr: k, n: Math.min(120, n | 0) }); const d = C.train(S, k, n), f = C.train.fail || 0; if (d) { const xpGain = S.realm === 0 ? (C.train.gain || 0) * 10 : 0; const _lgb = C.train._lgb || 0; log(S.dead ? 'bad' : 'good', `📖 挑灯看书，${AN[k]} <span class="g">+${C.train.gain}</span>（体力 -${d}）` + (_lgb ? `，<span class="g">灵根 +${_lgb}</span>` : '') + (xpGain ? `，经验 <span class="g">+${xpGain}</span>` : '') + (f ? `<br><span class="r">🌧️ 心绪低落，${f} 次看书读不进去</span>` : '')); afterAct(); commit(); S.dead ? closeSheet() : sheetTrain(); } }
async function doLvUp() {
  await srvProg('/api/progress/levelup', {});
  const r = C.doManualLevelUp(S);
  if (r.err) { toastLog('bad', r.err === 'dead' ? '已死亡' : r.err === 'max' ? '已大圆满' : r.err === 'mana' ? '法力不足' : '经验不足'); return; }
  { const mn2 = (S.realm|0) >= 8 ? '仙力' : '法力'; log('good', `⬆️ <b>升级！</b>当前 Lv.${S.level}，全属性 +${(S.realm|0) + 1 + C.reincBonus(S)}` + (r.manaBoost ? `，<span class="g">满${mn2}升级：当前${mn2} ×1.1（${S.mana}）</span>` : '')); }
  afterAct(); commit(); render();
  if (window._charPage) sheetChar();
}
window.doBreakthrough = doBreakthrough; // v438 突破按钮无响应兜底
function doBreakthrough() {
  if (S.afk) { log('bad', '⚡ 闭关中无法突破，请先出关。'); return; } // v267 闭关时不能突破
  if (C.isPermanentlyDegraded(S)) { log('bad', `⚡ 你已是【${S.degraded}】，道途已断，无法再破境。`); return; } // v590 第二次失败才不可破境
  if ((S.realm|0) === 0 && (S.xp|0) < C.xpNeed(C.REALM_MAX_LV - 1)) { log('bad', `⚡ 经验不足（<b class="y">${S.xp|0}/${C.xpNeed(C.REALM_MAX_LV - 1)}</b>），需积累经验才能破境。`); return; } // v573 凡人破境需经验满足
  if ((S.yinQi|0) < 10) { const _m0 = (S.realm|0) === 0; log('bad', _m0 ? `⚡ 引气入体不足（<b class="y">${S.yinQi|0}/10缕</b>），需🌀凝气积累至10缕才能突破。` : `⚡ 凝气不足（<b class="y">${S.yinQi|0}/10缕</b>），需⛰️灵脉闭关积累至10缕才能突破。`); return; } // v116 突破需引气入体10点；v202 练气以上需凝气10缕（灵脉闭关每小时判定）
  try { if (window.TRIB_OMEN) window.TRIB_OMEN.foundOpen(S); } catch(_) {}
    const r = C.breakthrough(S);
  if (!r) { log('bad', '⚡ 突破结算异常，请重试。'); return; } // v823 防御r为undefined
  if (r.err) { if (r.err === 'nohp') log('bad', '⚡ 当前生命为 0，无法突破，请先恢复生命。'); else if (r.err === 'sanshi') log('bad', '⚔️ 需先斩去三尸（上尸·彭倨/中尸·彭质/下尸·彭矫），方能突破尊者！'); else if (r.err === 'nomana') { const _mm = C.manaMax(S), _pp = _mm > 0 ? Math.floor((S.mana|0) / _mm * 100) : 0; log('bad', `⚡ 法力未满（${_pp}/100），突破需法力 100/100，请先补满（签到回满或喝法力药水）。`); } else if (r.err === 'dead') log('bad', '⚡ 已死亡，无法突破。'); else if (r.err === 'nolife') log('bad', '⚡ 寿元已尽，无法突破，请先轮回转世。'); return; }
  closeSheet();
  if (r.pending === 'thunder') { try {
    const _bx = window._bx || {};
    if (!_bx.Battle) throw new Error('battle not ready');
    const _fa = _bx.fightAttrs(S, false);
    const _pw = r.thunderPw != null ? r.thunderPw : _bx.tribPower(S);
    const _ta = {}; _bx.ATTRS.forEach(k => _ta[k] = Math.max(1, Math.round(_fa[k] * 0.5 * _pw)));
    const _cloudRaw = (() => { try { const _tf = (typeof window !== 'undefined' && typeof window.tribFull === 'function') ? window.tribFull : ((typeof tribFull === 'function') ? tribFull : null); const _f = (_tf ? _tf(S) : 0) || 0; if (_f >= 10) return '🫯'; if (_f >= 9) return '⛈️'; if (_f >= 7) return '🌩️'; if (_f >= 5) return '🌫️'; if (_f > 2) return '🌧️'; return '☁️'; } catch(_) { return '🌩️'; } })(); // v806 修复_bx.tribFull不存在时永远☁️；v816 改用window.tribFull跨块
    const _th = _bx.fighter(_cloudRaw + '雷云', _ta, false, []); // v689 黑云敌人名
    _th.avatar = _cloudRaw; _th.icon = _cloudRaw; _th.noPhoto = true; // v691 去掉人物头像用黑云
    const _b = new _bx.Battle(_bx.playerFighter(S, false), _th);
    _b.unlimited = true; _b.tribStrikes = (typeof window.tribStrikes === 'function' ? window.tribStrikes(S, r.trib) : 9); _b.surviveRounds = _b.tribStrikes + 1; // v985 雷劫分层：品级定雷数（存活兜底+1，沿用旧关系）
    pk = { battle: _b, adv: true, trib: 'thunder', tribData: { trib: r.trib, fromRealm: r.fromRealm, pw: _pw } };
    try { if (typeof G !== 'undefined' && G) G.pk = pk; window.pk = pk; } catch(_) {} // v842 雷劫开战双写window.pk，避免renderCombat被旧null覆盖
    try { closeSheet(); } catch(_){}
    afterAct(); save(); render();
  try { if (window.TRIB_OMEN) window.TRIB_OMEN.beat(S, 'open'); } catch(_) {} } catch(_e){ log('bad','雷劫启动失败:'+(_e.message||_e)); } return; } // v683 script2内直接设pk
  if (r.trib) { // v172 渡劫战报
    if (r.trib.jackpot) { const _jg = C.gradeFromFull(r.trib.jackpot.full); log('warn', `⚡ <b>天现异象！</b>劫云翻涌——这竟是【<b class="y">${_jg.name}</b>】级别的天劫！扛过去便按【${_jg.name}】档结丹！`); } // v176
    if (r.trib.thunder.pw >= 1.25 && !r.trib.jackpot) log('sys', '⚡ 天劫感应到你充盈的灵气，雷威大涨！'); // v175
    (r.trib.thunder.lines || []).forEach(l => log('sys', '⚡ ' + l));
    if (r.trib.thunder.ok) log('good', '⚡ ' + (typeof window.tribStrikes === 'function' ? window.tribStrikes(S, r.trib) : 9) + '道天雷，尽数扛下！');
    if (r.trib.demonMet && r.trib.demon) { const d = r.trib.demon, _dr = d.battle.round | 0, _cu = (S.curseN|0) > 0 ? `（👻诅咒×${S.curseN}，心魔增强）` : ''; log(d.win ? 'good' : 'bad', `👹 心魔来袭${_cu}，激战 ${_dr} 回合，${d.win ? '<b>斩灭心魔，道心稳固！</b>' : '<b class="r">不敌心魔，道心受损……</b>'}`); try { if (window.TRIB_OMEN) window.TRIB_OMEN.beat(S, d.win ? 'dWin' : 'dLose'); } catch(_) {} }
  }
  if (r.pending === 'quiz') { commit(); render(); sheetTribQuiz(r.trib.quiz); return; } // v174 心魔问心：弹出答题面板
  if (r.ok) { S.yinQi = 0; const _gs = r.grade ? `结成【<b class="y">${r.grade}</b>】，全属性 <span class="y">×${r.mult}</span>！` : `全属性 <span class="y">×${r.mult||'?'}</span>`; log('good', `⚡ <b>突破成功！</b>踏入【${r.realm}】，${_gs}法力上限 <span class="g">×2</span>！${S.realm === 1 ? '引气入体' : '凝气'}已耗尽（0/10缕）。`); try { if (window.TRIB_OMEN) window.TRIB_OMEN.beat(S, 'win'); } catch(_) {} sealAwakenCheck(); } // v116 突破成功清零引气入体
  else if (r.tribFail === 'thunder') log('bad', `⚡ 倒在第${r.trib.thunder.failAt}道天雷之下，突破失败……道途已断，沦为【${r.degraded || S.degraded}】（卡9级后期），折寿 <span class="r">${r.lifeLost}</span> 年。`); // v589
  else if (r.tribFail === 'demon') log('bad', `👹 心魔难斩，突破失败……道途已断，沦为【${r.degraded || S.degraded}】（卡9级后期），折寿 <span class="r">${r.lifeLost}</span> 年。`); // v589
  else if (r.degraded) log('bad', `⚡ 突破失败……道途受损，沦为【${r.degraded}】，气运可提高成功率。`); // v597 失败进降级状态
  else log('bad', `⚡ 突破失败……退回 <span class="r">${r.back} 级</span>（当前 Lv.${S.level}），气运可提高成功率。`);
  if (!r.ok) { try { if (window.TRIB_OMEN) window.TRIB_OMEN.beat(S, 'fail'); } catch(_) {} }
  afterAct(); commit(); render();
}
// v174 心魔问心答题面板
let tqQuiz = null; const tqAns = {};
function sheetTribQuiz(quiz) {
  if (tqQuiz !== quiz) { for (const k in tqAns) delete tqAns[k]; } // v434 只有新题目才清空答案，重绘保留已选
  tqQuiz = quiz;
  try { window.__tqOmen = (window.TRIB_OMEN && window.TRIB_OMEN.text(S, 'quiz')) || ''; } catch(_) { window.__tqOmen = ''; }
  const qn = ['一', '二', '三', '四', '五'];
  openSheet(`<h2>👹 心魔问心</h2>${window.__tqOmen ? '<div class="hint">' + window.__tqOmen + '</div>' : ''}<div class="hint">心魔化作${quiz.qs.length}问，直指道心——答对 <b class="y">${K.TRIB_QUIZ_NEED} 道</b>方可通过。答错则突破失败，退级并折寿！</div>` +
    quiz.qs.map((qq, qi) => `<div style="margin:10px 0 4px"><b>第${qn[qi]}问：</b>${qq.q}</div><div>` +
      qq.opts.map((op, oi) => `<button class="btn${tqAns[qi] === oi ? ' gold' : ''}" data-tq="${qi}" data-to="${oi}"${tqAns[qi] !== undefined ? ' disabled' : ''}>${'ABCD'[oi]}. ${op}</button>`).join('') + `</div>`).join('') +
    `<div class="hint">已答 ${Object.keys(tqAns).length}/${quiz.qs.length}</div>`);
  // v281 直接绑事件（iOS onclick不可靠）
  try {
    document.querySelectorAll('#sheet [data-tq]').forEach(btn => {
      btn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); window.doTribQuizAnswer(+btn.dataset.tq, +btn.dataset.to); });
    });
  } catch(e) {}
}
window.sheetTribQuiz = sheetTribQuiz; // v746 暴露给pkSettle跨块调用
// v752 全局委托兜底：问心按钮重建后也能点
try {
  document.addEventListener('click', function(e) {
    const _b = e.target && e.target.closest ? e.target.closest('[data-tq]') : null;
    if (_b && _b.dataset && _b.dataset.tq !== undefined) {
      e.preventDefault(); e.stopPropagation();
      try { window.doTribQuizAnswer(+_b.dataset.tq, +_b.dataset.to); } catch(_) {}
    }
  }, true);
} catch(_) {}
window.doTribQuizAnswer = function(qi, oi) {
  if (!tqQuiz || tqAns[qi] !== undefined) return;
  tqAns[qi] = oi;
  if (Object.keys(tqAns).length < tqQuiz.qs.length) { sheetTribQuiz(tqQuiz); return; }
  const quiz = tqQuiz; tqQuiz = null;
  // v982 问心完成，清理 _pendingTrib
  try { delete S._pendingTrib; delete S._pendingFromRealm; } catch(_){}
  const r = C.finishTribQuiz(S, quiz, quiz.qs.map((_, i) => tqAns[i]));
  closeSheet();
  if (r.pending === 'demon') { // v739 答题后遇心魔战斗
    const n2 = r.trib.quizCorrect;
    let _wrongDetail2 = '';
    if (r.trib.quizDetail) { // v858 有心魔战时也显示答错详情
      const _qn2 = ['一', '二', '三', '四', '五'];
      _wrongDetail2 = '<br>' + quiz.qs.map((qq, qi) => {
        if (r.trib.quizDetail[qi]) return '';
        const _correctOpt2 = 'ABCD'[qq.ans | 0] + '. ' + qq.opts[qq.ans | 0];
        return `<span class="r">第${_qn2[qi]}问答错</span>，正解：<b class="y">${_correctOpt2}</b>`;
      }).filter(Boolean).join('<br>');
    }
    log('good', `👹 心魔${quiz.qs.length}问，答对 <b class="g">${n2}</b> 道——<b>道心稳固！</b>${_wrongDetail2}<br><span class="r">心魔不甘，化形来战！</span>`);
    try { (typeof startDemonBattle === 'function' ? startDemonBattle : window.startDemonBattle)(S, r.trib, r.fromRealm); } catch(_e) { try { log('sys', '心魔战启动失败:' + (_e.message || _e)); } catch(_) {} }
    try { if (typeof window !== 'undefined' && window.pk && typeof pk !== 'undefined' && !pk) pk = window.pk; } catch(_) {} // v787 同步window.pk到主作用域
    try { if (typeof renderCombat === 'function') renderCombat(); else if (typeof render === 'function') render(); } catch(_) {} // v787 主作用域直接开战斗UI
    return;
  }
  const n = r.trib.quizCorrect, pass = n >= K.TRIB_QUIZ_NEED;
  let _wrongDetail = '';
  if (r.trib.quizDetail) { // v748 答错显示错哪道及正确答案；v784 答对也显示
    const _qn = ['一', '二', '三', '四', '五'];
    _wrongDetail = '<br>' + quiz.qs.map((qq, qi) => {
      if (r.trib.quizDetail[qi]) return '';
      const _correctOpt = 'ABCD'[qq.ans | 0] + '. ' + qq.opts[qq.ans | 0];
      return `<span class="r">第${_qn[qi]}问答错</span>，正解：<b class="y">${_correctOpt}</b>`;
    }).filter(Boolean).join('<br>');
  }
  log(pass ? 'good' : 'bad', `👹 心魔${quiz.qs.length}问，答对 <b class="${pass ? 'g' : 'r'}">${n}</b> 道${pass ? '——<b>道心稳固，心魔退散！</b>' : '——<b class="r">道心动摇……</b>'}${_wrongDetail}`);
  if (r.ok) { S.yinQi = 0; const _gs2 = r.grade ? `结成【<b class="y">${r.grade}</b>】，全属性 <span class="y">×${r.mult}</span>！` : `全属性 <span class="y">×${r.mult||'?'}</span>`; log('good', `⚡ <b>突破成功！</b>踏入【${r.realm}】，${_gs2}法力上限 <span class="g">×2</span>！${S.realm === 1 ? '引气入体' : '凝气'}已耗尽（0/10缕）。`); try { if (window.TRIB_OMEN) window.TRIB_OMEN.beat(S, 'win'); } catch(_) {} sealAwakenCheck(); }
  else log('bad', `👹 心魔问心失败……退回 <span class="r">${r.back} 级</span>（当前 Lv.${S.level}），折寿 <span class="r">${r.lifeLost}</span> 年。`);
  afterAct(); commit(); render();
}
// 胎中之谜：每次突破每个封存物独立判定50%（幸运套每2件+5%，出战灵宠有幸运技能+10%），一次突破最多觉醒一个
function sealAwakenProb(S) {
  const n = ((C.setCounts(S).luck || 0));
  let p = 0.5 + Math.floor(n / 2) * 0.05;
  try { const _ap = C.activePets(S); if (_ap.some(pt => pt && (pt.skills || []).includes('luck'))) p += 0.10; } catch (e) {} // v1161 经 C 调 activePets（原裸引用解析不到，灵宠幸运 +10% 一直被 try/catch 吞掉不生效）
  return Math.min(0.95, p);
}
function sealAwakenCheck() {
  const seals = (S.sealed || []).filter(x => x && !x.done);
  if (!seals.length) return;
  const p = sealAwakenProb(S);
  const hits = seals.filter(() => R() < p);
  if (hits.length === 1) sealAwakenPrompt(hits[0]);
  else if (hits.length > 1) {
    const btns = hits.map(x => `<button class="btn" data-seal-pick="${x.id}" style="margin:4px;padding:10px">${x.playerName || x.name}<br><small>${AN[x.attr]} ${x.value}（第${x.life}世·${C.REALMS[x.realm]}）</small></button>`).join('');
    openSheet(`<h2>🌟 胎中之谜</h2><div class="hint">多世记忆同时翻涌！一次只能觉醒 <b class="y">一个</b>，请选择要唤醒哪一世：</div><div style="display:flex;flex-direction:column">${btns}</div><button class="btn" data-a="close" style="width:100%;margin-top:6px">暂不觉醒</button>`);
  }
}
function sealAwakenPrompt(seal) {
  const _sealAu = sealAvatarUrl(seal);
  const _isFame = !!(seal.sealTpl && seal.sealName); // v216 求名：填完整句
  let _awHint, _awPh;
  if (_isFame) {
    const _fh = seal.sealHint || '＿＿'; // v219 提示句
    // v779 有些出上对下，有些出下对上：看名字在模板中的位置
    const _tpl = seal.sealTpl || '';
    const _namePos = _tpl.indexOf('{n}');
    const _hintPos = _tpl.indexOf(_fh);
    const _isLowerGiven = _namePos >= 0 && _hintPos >= 0 && _namePos < _hintPos; // 名字在前，提示在后 → 给出的是下联
    if (_isLowerGiven) {
      _awHint = `天道留名，下联：<b class="y">「${_fh}」</b><br>对出 <b class="r">上半句</b> 方可继承：`;
      _awPh = '续写上半句';
    } else {
      _awHint = `天道留名，上联：<b class="y">「${_fh}」</b><br>对出 <b class="r">下半句</b> 方可继承：`;
      _awPh = '续写下半句';
    }
  } else {
    const _th2 = seal.sealTheme;
    const _themeHint = (_th2 && SOUL_QUATRAINS[_th2]) ? SOUL_QUATRAINS[_th2].replace(/\n/g, '<br>') : (seal.seal || ''); // v242 觉醒：显示该主题七绝，玩家输入主题名继承
    _awHint = `前世印记：<b class="y">${_themeHint}</b><br>输入其 <b class="r">主题</b> 方可继承：`;
    _awPh = '输入主题（如：剑）';
  }
  openSheet(`<h2>🌟 胎中之谜</h2><div class="hint">${_sealAu ? `<img src="${_sealAu}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-right:8px">` : ''}前世遗物 <b class="y">${seal.playerName || seal.name}</b>（${AN[seal.attr]} ${seal.value}，第${seal.life}世·${C.REALMS[seal.realm]}）有感应！<br>${_awHint}</div>
  <div class="row"><input id="sealUnlock" maxlength="20" placeholder="${_awPh}" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>
  <div class="row"><button class="btn gold" data-seal-unlock="${seal.id}" style="flex:1">觉醒继承</button><button class="btn" data-a="close">放弃</button></div>`);
}
function sealAwakenDo(sealId, code) {
  const i = (S.sealed || []).findIndex(x => x && x.id === sealId && !x.done);
  if (i < 0) { toastLog('sys', '遗物已不在'); return; }
  const seal = S.sealed[i];
  let _ok, _err = '灵魂印记不符，无法继承';
  if (seal.sealTpl && seal.sealName) { _ok = (code || '').trim() === (seal.sealAns || seal.seal || ''); _err = '上半句不对，无法继承'; } // v220 求名：续写上半句；v778
  else if (seal.sealTheme) { _ok = (code || '').trim() === seal.sealTheme; _err = '主题不符，无法继承'; } // v206 求道：填主题
  else { _ok = (code || '') === (seal.seal || ''); } // 旧遗物：全文比对
  if (!_ok) { toastLog('bad', _err); return; }
  S.attrs[seal.attr] = (S.attrs[seal.attr] | 0) + (seal.value | 0);
  S.sealed.splice(i, 1);
  closeSheet();
  log('good', `🌟 <b>胎中之谜觉醒！</b>继承${seal.playerName || seal.name}：${AN[seal.attr]} <span class="y">+${seal.value}</span>（当前 ${S.attrs[seal.attr]}），遗物已消散。`);
  afterAct(); commit(); render();
}
function doReincarnate(forced) {
  if (S.dead) return;
  forced = forced || S.forceReinc;
  const perf = S.level >= C.REALM_MAX_LV;
  const pools = C.REALMS.map((r, i) => i === 0 ? '' : `${r}<b class="y">${S.reinc && S.reinc[i] ? S.reinc[i] : 0}</b>`).filter(Boolean).join(' · ');
  // v135 凡人轮回无前世遗物：直接确认，不选属性封存
  if ((S.realm|0) === 0) {
    openSheet(`<h2>🔄 轮回重修</h2><div class="hint">${forced ? '<b class="r">⏳ 寿元已尽，必须轮回转世！</b><br>' : ''}将回到 <b>凡人 Lv.1</b>，全属性重置为 1。<b class="r">已学技能消失</b>，需用技能书重学。物品、金元等全部保留。<br>凡人轮回不产生前世遗物，不计加成次数。</div><div class="row"><button class="btn primary full" data-reinc-mortal="${forced ? 1 : 0}">确认轮回</button></div>${forced ? '' : '<button class="btn" data-a="close" style="width:100%">取消</button>'}`);
    return;
  }
  const btns = ATTRS.map(k => `<button class="btn" data-reinc-keep="${k}" style="padding:10px 4px">${AN[k]}<br><b>${S.attrs[k]}</b></button>`).join('');
  openSheet(`<h2>🔄 轮回重修</h2><div class="hint">${forced ? '<b class="r">⏳ 寿元已尽，必须轮回转世！</b><br>' : ''}将回到 <b>凡人 Lv.1</b>（当前境界：${C.realmTxt(S)}${perf ? '·大圆满' : ''}）。<br>选择 <b>一个属性封存</b>，化为前世遗物存入背包（不再直接继承）。每次<b class="y">突破</b>有 <b class="y">50%</b> 概率觉醒<b class="y">胎中之谜</b>（幸运套可提高），觉醒时需输入<b class="r">灵魂印记</b>才能继承前世属性。<b class="r">已学技能消失</b>，需用技能书重学。物品、金元等全部保留。<br>${perf ? '大圆满轮回计加成次数。' : '<b>未大圆满</b>轮回不计加成次数。'}<br><small style="color:var(--dim)">📊 轮回池：${pools}（各境上限 10，升级全属性 +${1 + C.reincBonus(S)}）</small></div><div class="grid2" style="grid-template-columns:repeat(5,1fr);gap:6px;margin:10px 0">${btns}</div>${forced ? '' : '<button class="btn" data-a="close" style="width:100%">取消</button>'}`);
}
const SOUL_THEMES = {
  '剑': ['我有一剑','一剑破万法','剑心通明','剑来','人剑合一','一剑霜寒','剑气如霜','仗剑走天涯','剑指苍穹','一剑开天门','十步杀一人','千里不留行','事了拂衣去','深藏身与名','三杯吐然诺','五岳倒为轻'],
  '道': ['大道朝天','一念成仙','道心不改','以身合道','道法自然','一步登仙','顺为凡逆为仙','朝闻道夕可死'],
  '天命': ['我命由我不由天','与天争命','逆天改命','笑问苍天','战天斗地','天道酬勤','人定胜天'],
  '逍遥': ['逍遥天地间','一念逍遥','御风而行','醉卧云端','笑傲江湖','快意恩仇','纵横四海','乘风归去'],
  '心境': ['心如止水','明镜止水','古井无波','一尘不染','一念成佛','一念成魔','放下屠刀','立地成佛']
}; // v206 灵魂印记：五大主题
const SOUL_QUATRAINS = {
  '剑': '一剑霜寒照九州，\n十年砥砺未曾休。\n今朝出鞘惊天地，\n剑指苍穹不低头。',
  '道': '大道无形亦无名，\n万物芸芸各自行。\n朝闻夕死原无憾，\n悟得真机是长生。',
  '天命': '休言天命早安排，\n我命由我不由天。\n一怒拔剑三千里，\n敢叫日月换新颜。',
  '逍遥': '不羡鸳鸯不羡仙，\n一壶浊酒对青天。\n白云深处吾家在，\n笑看红尘四百年。',
  '心境': '宠辱不惊看花开，\n去留无意望云来。\n放下尘心天地阔，\n明月清风入我怀。'
}; // v237 我写的五首七绝；与用户版五首合共10首
function genSoulSeal(forceTheme) { // v206 随机主题+短语；v215 可指定主题
  const ks = Object.keys(SOUL_THEMES);
  const th = (forceTheme && SOUL_THEMES[forceTheme]) ? forceTheme : ks[Math.floor(Math.random() * ks.length)];
  const arr = SOUL_THEMES[th];
  return { theme: th, phrase: arr[Math.floor(Math.random() * arr.length)] };
}
const SOUL_FAME = [
  { tpl: '仙路尽头谁为峰，一见{n}道成空', hint: '仙路尽头谁为峰', ans: '一见{n}道成空' },
  { tpl: '天不生{n}，剑道万古如长夜', hint: '剑道万古如长夜', ans: '天不生{n}' },
  { tpl: '天上剑仙三百万，见{n}也需尽低眉', hint: '天上剑仙三百万', ans: '见{n}也需尽低眉' },
  { tpl: '要问天下谁争锋，遇见{n}道成空', hint: '要问天下谁争锋', ans: '遇见{n}道成空' },
  { tpl: '{n}一出，谁与争锋', hint: '谁与争锋', ans: '{n}一出' },
  { tpl: '仙之巅，傲世间，有{n}便有天', hint: '仙之巅，傲世间', ans: '有{n}便有天' },
  { tpl: '手握日月摘星辰，世间无{n}这般人', hint: '手握日月摘星辰', ans: '世间无{n}这般人' },
  { tpl: '天上地下，唯{n}独尊', hint: '天上地下', ans: '唯{n}独尊' },
  { tpl: '天若赐我辉煌，{n}定比天猖狂', hint: '天若赐我辉煌', ans: '{n}定比天猖狂' },
  { tpl: '若天压我，劈开这天，若地拘{n}，踏碎这地', hint: '若天压我，劈开这天', ans: '若地拘{n}，踏碎这地' },
  { tpl: '天不容我，{n}便灭天', hint: '天不容我', ans: '{n}便灭天' },
  { tpl: '逆了苍天，{n}踏破碧落黄泉', hint: '逆了苍天', ans: '{n}踏破碧落黄泉' },
  { tpl: '天要亡我，{n}必血战到底', hint: '天要亡我', ans: '{n}必血战到底' },
  { tpl: '天不赐我辉煌，{n}化身为魔，剑在手，奈我何', hint: '天不赐我辉煌', ans: '{n}化身为魔，剑在手，奈我何' },
  { tpl: '佛渡不了天下，由{n}来渡', hint: '佛渡不了天下', ans: '由{n}来渡' },
  { tpl: '我从不信神，因为{n}便是自己的神', hint: '我从不信神', ans: '因为{n}便是自己的神' },
  { tpl: '满堂花醉三千客，{n}一剑霜寒十四州', hint: '满堂花醉三千客', ans: '{n}一剑霜寒十四州' },
  { tpl: '一虎怒时出万狼，霸业奋起天下亡，挥指雄狮三千万，踏平天下{n}最狂', hint: '一虎怒时出万狼，霸业奋起天下亡，挥指雄狮三千万', ans: '踏平天下{n}最狂' },
  { tpl: '宁{n}负天下人，不叫天下人负我', hint: '不叫天下人负我', ans: '宁{n}负天下人' }
]; // v216 求名：名字模板；v219 提示句；v220 玩家续写下半句；v223 加4句；v224 加4句；v227 再加6句共19句
function genFameSeal() { // v216 求名生成：随机模板+玩家名
  const _pool = (window._famePool || []).filter(x => x && x.text); // v1015 碑林月冠句入留名池
  if (_pool.length && Math.random() < 0.35) { const _e = _pool[Math.floor(Math.random() * _pool.length)]; const _t = String(_e.text).slice(0, 40); const _cut = Math.max(_t.indexOf('，'), _t.indexOf('、')); let _hint, _ans; if (_cut > 0) { _hint = _t.slice(_cut + 1); _ans = _t.slice(0, _cut); } else { const _hh = Math.ceil(_t.length / 2); _ans = _t.slice(0, _hh); _hint = _t.slice(_hh); } return { tpl: _t, hint: _hint, name: (S.name || '').trim() || '无名', full: _t, ans: _ans }; }
  const o = SOUL_FAME[Math.floor(Math.random() * SOUL_FAME.length)];
  const nm = (S.name || '').trim() || '无名';
  return { tpl: o.tpl, hint: o.hint, name: nm, full: o.tpl.split('{n}').join(nm), ans: o.ans.split('{n}').join(nm) };
}
function sealPhraseHtml() { // v215 印记显示；v216 求名；v222 封存直接写名字；v242 求道封存显示七绝整首
  if (window._sealPath === 'fame') {
    const g = window._fameGen || { full: '' };
    return `「${g.full}」`;
  }
  const g = window._sealGen || { theme: '', phrase: '' };
  const _mq = (g.theme && SOUL_QUATRAINS[g.theme]) ? SOUL_QUATRAINS[g.theme].replace(/\n/g, '<br>') : '';
  return _mq ? `【${g.theme}】<br>${_mq}` : `【${g.theme}】「${g.phrase}」`;
}
function doReincarnateName(keepAttr, forced, path) { // v215 path: dao求道(随机主题)/fame求名(名字模板)
  const v = S.attrs[keepAttr] | 0;
  window._sealPath = path || 'dao';
  window._sealRerollCount = 0; // v244 换几次计数；求名3次求道1次
  if (window._sealPath === 'fame') window._fameGen = genFameSeal(); else window._sealGen = genSoulSeal(); // v216 求名用名字模板
  const _au = avatarUrl(), _pn = (S.name || '无名'); // v209 显示玩家头像+名字，不再取遗物名
  const _pathName = window._sealPath === 'fame' ? '求名' : '求道';
  const _hint2 = window._sealPath === 'fame' ? '天道为你 <b class="r">留名</b>：记住此印记模板，觉醒胎中之谜时，天道出下联，你对 <b class="r">上半句</b>（含你的名字）方可继承（建议截图保存）。' : '天道赐下 <b class="r">灵魂印记</b>：觉醒胎中之谜时，输入印记的 <b class="r">主题</b> 方可继承（建议截图保存）。'; // v777 上下联标反修正
  const _rerollLabel = window._sealPath === 'fame' ? '🔄 换一句（3次）' : '🔄 换一次';
  openSheet(`<div style="min-height:70vh;display:flex;flex-direction:column;justify-content:center;gap:10px"><div style="text-align:center"><img src="${_au}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;margin-bottom:6px"><h2 style="font-size:18px;margin:2px 0">🔄 封存前世</h2><div style="font-size:13px;color:var(--dim)"><b style="font-size:15px;color:#fff">${_pn}</b> 的前世遗物 · ${_pathName}</div></div><div class="hint" style="font-size:12px;line-height:1.8;text-align:center">将 <b>${AN[keepAttr]} ${v}</b> 封存。<br>${_hint2}</div>
  <div class="row" style="padding:10px 0"><div class="lab" style="font-size:13px">灵魂印记</div><div id="sealPhrase" style="flex:1;min-height:110px;display:flex;align-items:center;justify-content:center;padding:32px 12px;border-radius:10px;border:1px solid #555;background:#1a1a2e;color:#ffd700;font-size:13px;line-height:1.8;text-align:center">${sealPhraseHtml()}</div></div>
  <div class="row" style="padding:8px 0;justify-content:center"><button class="btn" data-reroll-seal="1" style="padding:6px 16px;font-size:12px">${_rerollLabel}</button></div>
  <div class="row" style="padding:10px 0 4px"><button class="btn gold" id="sealConfirmBtn" data-reinc-confirm="${keepAttr}" data-forced="${forced ? 1 : ''}" style="flex:1;padding:14px;font-size:14px">确认轮回</button><button class="btn" data-a="close" style="padding:14px;font-size:13px">取消</button></div></div>`);
}
function doReincarnateConfirm(keepAttr, sealGen, forced) { // v209 去掉 sealName 参数；v216 sealGen={seal,sealTpl,sealName,sealTheme}
  const _valid = sealGen && (sealGen.sealTheme || (sealGen.sealTpl && sealGen.sealName));
  if (keepAttr && !_valid) { toastLog('sys', '灵魂印记未生成，请重试'); return; }
  if (S.afk) { // 轮回强制结束闭关状态
    const afkName = S.afk.type === 'wushu' ? '习武' : S.afk.type === 'ningqi' ? '凝气' : S.afk.type === 'vein' ? '灵脉闭关' : '洞府闭关';
    log('sys', `🌀 轮回转世，${afkName}<b class="r">强制出关</b>`);
    try { afkExit(S, 'reincarnate'); } catch(e) {}
    S.afk = null;
  }
  if (S.run) { // 轮回强制结束进行中的冒险
    const advName = (typeof DIFFS !== 'undefined' && DIFFS[S.run.dk]) ? DIFFS[S.run.dk].name : '冒险';
    log('sys', `🌀 轮回转世，${advName}${S.run.grid ? `（已探索 ${S.run.grid.moves} 格）` : `（第 ${S.run.step} 步）`}<b class="r">强制结束</b>`);
    S.run = null; S.advVit = 0;
  }
  const r = C.reincarnate(S, keepAttr, sealGen); // v216 印记信息存遗物（求道：主题；求名：名字模板）
  try { if (window.MHXY && MHXY.loggedIn()) MHXY.api('/api/profile/title', { method: 'POST', body: { title: S.titleAch || '' } }).catch(() => {}); } catch(_) {} // v1140 轮回后同步称号（百毒不侵已随轮回消失）
  if (r.err) return;
  S.forceReinc = false;
  closeSheet();
  const rb = C.reincBonus(S);
  const _sealAu2 = (keepAttr && r.seal) ? sealAvatarUrl(r.seal) : null;
  const _sealTxt = (keepAttr && r.seal) ? `${_sealAu2 ? `<img src="${_sealAu2}" style="width:24px;height:24px;border-radius:50%;vertical-align:-4px;object-fit:cover"> ` : ''}<b>${AN[keepAttr]} ${r.seal.value}</b> 已封存为前世遗物 <b class="y">${r.seal.playerName || r.seal.name}</b>（存入背包），` : '';
  const _expTxt = (r.expired && r.expired.length) ? `<br><span style="color:var(--dim)">🌫️ 前世遗物【${r.expired.map(x => x.name).join('】【')}】久未觉醒，已随风消散…</span>` : '';
  log('good', `🔄 <b>轮回重修</b>（${r.from}第 ${r.n} 次）：回到凡人 Lv.1，${_sealTxt}全属性重置为 1，<b class="r">已学技能已遗忘</b>（可用技能书重学）。${r.n > 0 ? `加成已记入${r.from}池，突破后升级全属性 +${1 + rb}。` : '凡人轮回不计加成，练气及以上每境10次有效。'}` + (r.maiGain > 0 ? `<br>🌀 获得 <span class="g">开脉丹 ×${r.maiGain}</span>（每个池子1颗）` : '') + ((keepAttr && r.seal) ? `<br><small style="color:var(--dim)">每次突破有50%概率觉醒胎中之谜，届时需输入印记主题方可继承。</small>` : '') + _expTxt);
  if (r.fate) log('sys', `🎴 宿命签：<b class="y">${r.fate.n}</b>——${r.fate.t}（${C.fateModText(r.fate)}，随此世生效）`); // v1012
  if (r.tabooAwoke) log('sys', '🌑 <b>禁忌苏醒</b>——轮回深处沉睡的存在睁开了眼睛，自此伴你而行。（突破成功率 +5% · 雷劫威力 -5%，永久）'); // v1013
  else if (r.taboo === 10) log('sys', '🌑 轮回深处，有什么东西动了一下。'); // v1013 禁忌初现
  afterAct(); commit(); render();
  // v1088 轮回后可重选性别头像种族
  S._reincChain = true; S._reincStep = 'gender'; save(); setTimeout(() => chainNext(), 500);
}
async function doBrew(k, n) {
  if (lifeLocked('alc')) { toastLog('bad', '🔒 未选择该生活技能'); return; } // v204
  const lines = []; let got = [], ok = 0, fail = 0, ups = 0, used = {}, stop = ''; let bombN = 0; // v998
  // v964 彻底版：登录在线时走服务端掷骰
  const useBrewServer = window.MHXY && MHXY.loggedIn && MHXY.loggedIn() && alcExtrasArr().length === 0; // v998 有加料走本地判定（服务端扩展已 [DEV] 同步 muse2）
  for (let i = 0; i < n; i++) {
    let r;
    if (useBrewServer) {
      try {
        const resp = await MHXY.api('/api/roll/brew', {method:'POST', body:{attr:k, lu: useOpt.lu||undefined, spirit: useOpt.spirit||undefined}});
        const j = resp && resp.json;
        if (resp.ok && j && j.ok) {
          // 本地应用（服务端已记账）
          if (!S.inv) S.inv = {};
          for (const gg of (j.gains||[])) S.inv[gg.k] = (S.inv[gg.k]|0) + gg.n;
          S.mats['h_'+k] = (S.mats['h_'+k]|0) - 1; if (S.mats['h_'+k] <= 0) delete S.mats['h_'+k];
          try { takeEgg(S, 1); } catch(_){}
          if (j.lu && S.mats) { S.mats[j.lu] = (S.mats[j.lu]|0) - 1; if (S.mats[j.lu] <= 0) delete S.mats[j.lu]; }
          if (j.sp && S.ores) { S.ores[j.sp] = (S.ores[j.sp]|0) - 1; if (S.ores[j.sp] <= 0) delete S.ores[j.sp]; }
          try { payLife(S); } catch(_){} // 雷云判定（v661）
          S.vigor = j.vigor; S.mana = j.mana;
          S.alc.lv = j.alcLv; S.alc.xp = j.alcXp;
          try { hungerDown(S, K.HUNGER_ACT, 1); } catch(_){}
          if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
          // 转 UI 格式
          const potions = [];
          for (const gg of (j.gains||[])) { const grade = parseInt((gg.k||'').split('_')[1])||1; for (let q=0; q<gg.n; q++) potions.push(grade); }
          r = {ok: j.success, rate: j.rate, attr: k, potions, xp: 0, lvUp: j.lvUp||0, lu: j.lu||null, sp: j.sp||null};
        } else {
          const e = (j||{}).error;
          if (e === 'no_mats') r = {err:'mat'};
          else if (e === 'no_mana') r = {err:'mana'};
          else if (e === 'no_vigor') r = {err:'vigor'};
          else if (e === 'dead') r = {err:'dead'};
          else if (resp.netErr) r = C.brew(S, k, Object.assign({}, useOpt, { extras: alcExtrasArr() })); // 网络异常 → 回落本地
          else { stop = '服务端异常，请稍后重试'; break; } // 服务端已响应，不回落
        }
      } catch(e) { r = C.brew(S, k, Object.assign({}, useOpt, { extras: alcExtrasArr() })); } // 网络异常 → 回落本地
    } else {
      r = C.brew(S, k, Object.assign({}, useOpt, { extras: alcExtrasArr() }));
    }
    if (!r) break;
    if (r.err === 'dead') { stop = '你毒发身亡了。'; break; }
    if (r.err) { stop = r.err === 'mat' ? `缺少<b>${MATS['h_' + k].name}</b>，无法炼制${AN[k]}丹。可在修炼中种植，或到商店购买。` : r.err === 'mana' ? '法力不足，无法继续炼药（签到回满，或喝法力药水）。' : '活力不足，无法继续炼药（每日签到恢复活力）。'; break; }
    if (r.lu) used[r.lu] = (used[r.lu] || 0) + 1; if (r.sp) used[r.sp] = (used[r.sp] || 0) + 1;
    if (r.mut) { ok++; lines.push(`🌀 <b class="y">炉中异变！</b>出炉的不是${AN[k]}丹——是一颗 <b class="y">${C.MUT_PILLS[r.mut].name}</b>：${C.MUT_PILLS[r.mut].desc}`); }
    else if (r.ok) { ok++; got = got.concat(r.potions); lines.push(`✅ 成丹 ${r.potions.length} 枚：${r.potions.map(g => potName(k, g)).join(' ')}${r.duilu ? '（炉火旺了三分）' : ''}`); }
    else if (r.bomb) { fail++; bombN++; lines.push(`💥 <b class="r">炸炉！</b>炉盖冲天，这一炉废了（加料尽毁，药引未伤）`); }
    else { fail++; lines.push(`💨 丹炉炸裂，炼制失败`); }
    ups += r.lvUp;
  }
  if (bombN > 0) { S.bc = S.bc || []; S.bc.push('💥 炸炉啦——有道友炼丹时炉盖飞天，丹香三里，焦了一里。'); } // v998 小事件包装：炸炉上世界横幅
  if (!ok && !fail) { if (S.dead) { closeSheet(); afterAct(); commit(); return; } toastLog('sys', '⚠️ ' + stop); sheetAlchemy(stop); return; }
  const usedTxt = LUK.filter(k => used[k]).map(k => `${rarTxt('farm', k)} ×${used[k]}`).concat(SPK.filter(k => used[k]).map(k => `${rarTxt('mine', k)} ×${used[k]}`)).join('、');
  log('alc', `⚗️ 炼制${AN[k]}丹 ${ok + fail} 次：成功 <span class="g">${ok}</span>，失败 <span class="r">${fail}</span>` + (usedTxt ? `（使用 ${usedTxt}）` : '') +
    (ok + fail > 1 ? `<details open><summary>炼制详情</summary>${lines.map(l => `<div class="bl">${l}</div>`).join('')}</details>` : `<br>${lines[0]}`) +
    (ups ? `<br><span class="y">炼药等级提升至 Lv.${S.alc.lv}！成功率 ${C.pct(C.alcRate(S))}</span>` : '') +
    (stop ? `<br><span class="r">⚠️ ${stop}</span>` : ''));
  afterAct(); commit(); S.dead ? closeSheet() : sheetAlchemy(stop);
}
function doAlcExtra(ek) { // v998 加料点按
  const have = (S.mats || {})[ek] || 0; if (have <= 0) return;
  const cur = alcExtraSel[ek] || 0; const total = alcExtrasArr().length;
  if (cur >= have) { delete alcExtraSel[ek]; }
  else if (total >= 3) { toastLog('sys', '🧪 加料最多 3 味'); return; }
  else alcExtraSel[ek] = cur + 1;
  sheetAlchemy();
}
function doBrewAntidote(n) { // v1163 炼制解毒丹（本地判定，与化无丹同口径）
  if (lifeLocked('alc')) { toastLog('bad', '🔒 未选择该生活技能'); return; }
  const lines = []; let ok = 0, fail = 0, got = 0, ups = 0, stop = '';
  for (let i = 0; i < n; i++) {
    const r = C.brewAntidote(S); if (!r) break;
    if (r.err) { stop = r.err === 'mat' ? '缺敏捷草或一品凝露，无法炼制解毒丹。' : r.err === 'mana' ? '法力不足，无法继续炼药。' : r.err === 'dead' ? '你已身亡，无法炼药。' : '活力不足，无法继续炼药。'; break; }
    if (r.ok) { ok++; got += r.n; lines.push('✅ 成丹 解毒丹 ×' + r.n); } else { fail++; lines.push('💨 丹炉炸裂，炼制失败'); }
    ups += r.lvUp;
  }
  if (!ok && !fail) { toastLog('sys', '⚠️ ' + stop); sheetAlchemy(stop); return; }
  log('alc', '💊 炼制解毒丹 ' + (ok + fail) + ' 次：成功 <span class="g">' + ok + '</span>（得解毒丹 ×' + got + '），失败 <span class="r">' + fail + '</span>' + (ok + fail > 1 ? '<details open><summary>炼制详情</summary>' + lines.map(l => '<div class="bl">' + l + '</div>').join('') + '</details>' : '<br>' + lines[0]) + (ups ? '<br><span class="y">炼药等级提升至 Lv.' + S.alc.lv + '！</span>' : '') + (stop ? '<br><span class="r">⚠️ ' + stop + '</span>' : ''));
  afterAct(); commit(); S.dead ? closeSheet() : sheetAlchemy(stop);
}
function doBrewDetox(n) { // v998 炼制化无丹（本地判定）
  if (lifeLocked('alc')) { toastLog('bad', '🔒 未选择该生活技能'); return; }
  const lines = []; let ok = 0, fail = 0, got = 0, ups = 0, stop = '';
  for (let i = 0; i < n; i++) {
    const r = C.brewDetox(S); if (!r) break;
    if (r.err) { stop = r.err === 'mat' ? '缺生命草或一品凝露，无法炼制化无丹。' : r.err === 'mana' ? '法力不足，无法继续炼药。' : r.err === 'dead' ? '你毒发身亡了。' : '活力不足，无法继续炼药。'; break; }
    if (r.ok) { ok++; got += r.n; lines.push('✅ 成丹 化无丹 ×' + r.n); } else { fail++; lines.push('💨 丹炉炸裂，炼制失败'); }
    ups += r.lvUp;
  }
  if (!ok && !fail) { toastLog('sys', '⚠️ ' + stop); sheetAlchemy(stop); return; }
  log('alc', '🍃 炼制化无丹 ' + (ok + fail) + ' 次：成功 <span class="g">' + ok + '</span>（得化无丹 ×' + got + '），失败 <span class="r">' + fail + '</span>' + (ok + fail > 1 ? '<details open><summary>炼制详情</summary>' + lines.map(l => '<div class="bl">' + l + '</div>').join('') + '</details>' : '<br>' + lines[0]) + (ups ? '<br><span class="y">炼药等级提升至 Lv.' + S.alc.lv + '！</span>' : '') + (stop ? '<br><span class="r">⚠️ ' + stop + '</span>' : ''));
  afterAct(); commit(); S.dead ? closeSheet() : sheetAlchemy(stop);
}
async function doUseMut(id) { // v998 服变异丹
  await srvProg('/api/progress/eat_mut', { id });
  const r = C.useMutPill(S, id); if (!r) return;
  const def = C.MUT_PILLS[id];
  const gtxt = Object.keys(r.gains).map(a => AN[a] + ' <span class="g">+' + r.gains[a] + '</span>').join('、');
  log('good', '🌀 服下变异丹【<b class="y">' + def.name + '</b>】：' + [gtxt, r.txt].filter(Boolean).join('，') + (r.f < 1 ? '（丹毒未清，药效仅 ' + Math.round(r.f * 100) + '%）' : '') + '（丹毒 ' + (S.danDu|0) + '/' + C.danDuCap(S) + '）');
  commit(); sheetBag();
}
function doUseDetox() { // v998 服化无丹
  const d = C.useDetoxPill(S, 1); if (d <= 0) return;
  log('good', '🍃 服下化无丹，丹毒 <span class="g">-' + d + '</span>（当前 ' + (S.danDu|0) + '/' + C.danDuCap(S) + ' · ' + C.toxTier(S.danDu|0) + '）');
  commit(); sheetBag();
}
function doBrewDan(key, n) { // v1096 炼丸（本地判定，照抄化无丹）
  if (lifeLocked('alc')) { toastLog('bad', '🔒 未选择该生活技能'); return; }
  const def = C.DANWAN[key]; if (!def) return;
  const lines = []; let ok = 0, fail = 0, got = 0, ups = 0, stop = '';
  for (let i = 0; i < n; i++) {
    const r = C.brewDan(S, key); if (!r) break;
    if (r.err) { stop = r.err === 'mat' ? '缺药草或兽蛋，无法炼制' + def.name + '。' : r.err === 'mana' ? '法力不足，无法继续炼药。' : r.err === 'vigor' ? '活力不足，无法继续炼药。' : r.err === 'lv' ? '炼药等级不足（需 Lv.' + def.lv + '）。' : r.err === 'dead' ? '你毒发身亡了。' : ''; break; }
    if (r.ok) { ok++; got += r.n; lines.push('✅ 成丸 ' + def.name + ' ×' + r.n); } else { fail++; lines.push('💨 丹炉炸裂，炼制失败'); }
    ups += r.lvUp;
  }
  if (!ok && !fail) { toastLog('sys', '⚠️ ' + stop); sheetAlchemy(stop); return; }
  log('alc', '💊 炼制' + def.name + ' ' + (ok + fail) + ' 次：成功 <span class="g">' + ok + '</span>（得' + def.name + ' ×' + got + '），失败 <span class="r">' + fail + '</span>' + (ups ? '，炼药升至 Lv.' + S.alc.lv : '') + (lines.length ? '<br>' + lines.join('<br>') : ''));
  afterAct(); commit(); S.dead ? closeSheet() : sheetAlchemy(stop);
}
function doEatDan(key) { // v1096 服丸
  const def = C.DANWAN[key]; if (!def) return;
  const n = C.useDanwan(S, key, 1); if (n <= 0) return;
  if (def.fx === 'hunger') log('good', '🍘 服下' + def.name + '，饱食 <span class="g">+' + def.val + '</span>（当前 ' + Math.floor(S.hunger) + '）');
  else log('good', '💪 服下' + def.name + '，体力 <span class="g">+' + def.val + '</span>（当前 ' + S.stamina + '）');
  commit(); sheetBag();
}
window.brewSyd = function (idx) { // v1129 炼寿元丹
  try {
    if (lifeLocked('alc')) { toastLog('bad', '🔒 未选择炼药技能'); return; }
    const r = C.brewSyd(S, idx); if (!r) return;
    if (r.err) { toastLog('bad', r.err === 'mat' ? '材料不足（生命草×3 + 兽蛋×1）' : r.err === 'lv' ? '炼药等级不足' : r.err === 'mana' ? '法力不足' : r.err === 'vigor' ? '活力不足' : '无法炼制'); sheetAlchemy(); return; }
    if (r.ok) log('good', `⚗️ 炼成 <b style="color:${C.LW_ELE_COLORS[r.e]}">${r.e}行寿元丹</b> ×${r.n}${r.crit ? '（<b class="y">💥年份暴击！</b>）' : ''}，每颗寿元 +${r.val}（背包服用）`);
    else log('bad', '⚗️ 炼制失败，灵物与材料已消耗');
    if (r.lvUp) log('good', `⚗️ 炼药升级至 Lv.${S.alc.lv}！`);
    commit(); sheetAlchemy();
  } catch (_) {}
};
window.brewKm = function () { // v1129 炼开脉丹
  try {
    if (lifeLocked('alc')) { toastLog('bad', '🔒 未选择炼药技能'); return; }
    const r = C.brewKm(S); if (!r) return;
    if (r.err) { toastLog('bad', r.err === 'mat' ? '灵物不足（地+天+仙各需 1 株）或缺兽蛋' : r.err === 'lv' ? '炼药等级不足（需 Lv.10）' : r.err === 'mana' ? '法力不足' : r.err === 'vigor' ? '活力不足' : '无法炼制'); sheetAlchemy(); return; }
    if (r.ok) log('good', '🌀 炼成 <b class="y">开脉丹</b> ×1（星藏里服用开穴）');
    else log('bad', '⚗️ 炼制失败，三株灵物与兽蛋已消耗');
    if (r.lvUp) log('good', `⚗️ 炼药升级至 Lv.${S.alc.lv}！`);
    commit(); sheetAlchemy();
  } catch (_) {}
};
window.eatSyd = async function (idx) { // v1129 服寿元丹
  try {
    await srvProg('/api/progress/eat_syd', { idx });
    const r = C.eatSyd(S, idx); if (!r) return;
    log('good', `💊 服下<b style="color:${C.LW_ELE_COLORS[r.e]}">${r.e}行寿元丹</b>，寿元 <span class="g">+${r.gain}</span>${C.eleNoteL(r.f) ? `（${C.eleNoteL(r.f)}）` : ''}`);
    if (r.awakened) log('good', `🌟 <b>灵根觉醒！</b>${C.rootBaseL(r.e)}灵根应丹气而醒，化作<b>${r.awakened}</b>灵根！`); // v1134
    if (r.comprehended) log('good', `🌟 <b>顿悟新灵根！</b>此丹与自身灵根不合，却意外领悟了从未有过的<b>${r.comprehended}</b>灵根！`); // v1135
    commit(); sheetBag();
  } catch (_) {}
};
function doJuling(spec) { // v999 聚灵：投灵石涨世界灵气
  const [k, ns] = String(spec).split(':'); const n = Math.max(1, +ns || 1);
  const have = (S.ores || {})[k] || 0; if (have < n) { toastLog('bad', '灵石不足'); return; }
  S.ores[k] = have - n; if (!S.ores[k]) delete S.ores[k];
  const pts = n * (k === 'sp2' ? 4 : 1);
  const q = C.qiAdd(pts, S);
  if (pts >= 20) { S.bc = S.bc || []; S.bc.push('🌫️ 有道友往灵脉投下灵石聚灵，天地灵气渐盛（【' + C.qiTierName(q) + '】 ' + Math.round(q) + '/100）。'); }
  log('good', '🌫️ 聚灵：投入灵石 +' + pts + ' 点灵气（当前 【' + C.qiTierName(q) + '】 ' + Math.round(q) + '/100，闭关收益 ×' + C.qiFactor().toFixed(2) + '）');
  commit(); closeSheet(); render();
}
function doDrinkMai(n) {
  const got = C.drinkMai(S, n);
  if (!got) { toastLog('sys', (S.inv['mai'] | 0) > 0 ? '⚠️ 穴位已全部点亮' : '⚠️ 没有开脉丹'); return; }
  log('good', `🌀 服用开脉丹 ×${got}，新开 <b class="y">${got}</b> 穴（已亮 ${C.SZ_SEATS.reduce((t, _, i) => t + C.szSeatLitNames(S, i), 0)}/670）`);
  afterAct(); commit(); sheetBag();
}
function doDrinkButian() { // v867 补天丹：+1随机灵根，上限5条，每境界限1颗
  const have = S.inv['butian']|0; if (have <= 0) { toastLog('sys', '没有补天丹'); return; }
  if (window.LG) window.LG.ensure(S);
  const g = S.lingGen || [];
  if (g.length >= 5) { toastLog('sys', '灵根已满（5条），无需补天丹'); return; }
  const rm = S.realm|0;
  S.butianTaken = S.butianTaken || {};
  if (S.butianTaken[rm]) { toastLog('sys', '本境界已服用过补天丹（每境界限1颗）'); return; }
  const missing = window.LG.ELES.filter(e => !window.LG.hasEle(S, e)); // v1129 变异根占来源行
  const el = missing[Math.floor(Math.random() * missing.length)]; // v1134 补天丹只补基础根，变异靠觉醒
  S.inv['butian']--; if (S.inv['butian'] <= 0) delete S.inv['butian'];
  S.lingGen.push(el); S.butianTaken[rm] = 1;
  S.faZeDone = 0; // 灵根变化，本命圆满需重判
  log('good', `🌟 服用补天丹，补全 <b class="y">${window.LG.ICON[el]}灵根</b>！当前：<b>${window.LG.name(S)}</b>`);
  afterAct(); commit(); sheetBag();
}
async function doOpenChest(kind, n) { // v251 开宝箱
  // v965 彻底版：登录在线时走服务端
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const resp = await MHXY.api('/api/roll/chest', {method:'POST', body:{kind, n}});
      const j = resp && resp.json;
      if (resp.ok && j && j.ok) {
        if (!S.inv) S.inv = {}; if (!S.ores) S.ores = {}; if (!S.mats) S.mats = {};
        S.inv[kind] = (S.inv[kind]|0) - j.n; if (S.inv[kind] <= 0) delete S.inv[kind];
        const gains = [];
        for (const gg of (j.gains||[])) {
          if (gg.st === 'gold') { S.gold = (S.gold|0) + gg.n; gains.push('金元+' + gg.n); }
          else if (gg.st === 'ores') { S.ores[gg.k] = (S.ores[gg.k]|0) + gg.n; gains.push((gg.k==='sp1'?'下品灵石':gg.k==='sp2'?'中品灵石':gg.k==='sp3'?'上品灵石':gg.k==='sp4'?'极品灵石':gg.k==='sp5'?'💠极品灵石':gg.k) + '×' + gg.n); }
          else if (gg.st === 'mats') { S.mats[gg.k] = (S.mats[gg.k]|0) + gg.n; if (gg.k === 'maiPages') gains.push('🌀脉络残页×1'); else gains.push((gg.k==='lu1'?'一':gg.k==='lu2'?'二':'三') + '品凝露×1'); }
          else if (gg.st === 'inv') { S.inv[gg.k] = (S.inv[gg.k]|0) + gg.n; gains.push('🌟补天丹×1'); }
        }
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        const name = kind === 'chestN' ? '🎀精致盲盒' : kind === 'chestB' ? '🎲盲盒' : kind === 'chestR' ? '🎁稀有宝箱' : '💎高级宝箱';
        log('good', name + ' ×' + j.n + ' 开启，获得：<span class="y">' + gains.join('、') + '</span>');
        afterAct(); commit(); sheetBag();
        return;
      }
      if ((j||{}).error === 'no_chest' || !resp.netErr) { toastLog('sys', '没有宝箱'); return; }
    } catch(e) { /* 回落本地 */ }
  }
  const have = S.inv[kind] | 0; if (have <= 0) { toastLog('sys', '没有宝箱'); return; }
  n = Math.max(1, Math.min(have, n | 0 || 1));
  S.inv[kind] -= n; if (S.inv[kind] <= 0) delete S.inv[kind];
  const gains = [];
  for (let i = 0; i < n; i++) {
    const r = Math.random();
    const _btR = kind === 'chestB' ? 0.001 : kind === 'chestN' ? 0.002 : kind === 'chestR' ? 0.003 : 0.004; // v867 补天丹：盲盒1‰，每高一档+1‰
    if (Math.random() < _btR) { S.inv['butian'] = (S.inv['butian']|0) + 1; gains.push('🌟补天丹×1'); }
    if (kind === 'chestN' || kind === 'chestB') {
      if (r < 0.5) { const g = 20 + Math.floor(Math.random() * 30); S.gold += g; gains.push('金元+' + g); }
      else if (r < 0.8) { S.ores['sp1'] = (S.ores['sp1'] | 0) + 1; gains.push('下品灵石×1'); }
      else { S.ores['sp2'] = (S.ores['sp2'] | 0) + 1; gains.push('中品灵石×1'); }
    } else if (kind === 'chestR') {
      if (r < 0.4) { S.ores['sp3'] = (S.ores['sp3'] | 0) + 1; gains.push('上品灵石×1'); }
      else if (r < 0.7) { S.ores['sp4'] = (S.ores['sp4'] | 0) + 1; gains.push('极品灵石×1'); }
      else { const k2 = 'lu' + (1 + Math.floor(Math.random() * 3)); S.mats[k2] = (S.mats[k2] | 0) + 1; gains.push((k2 === 'lu1' ? '一' : k2 === 'lu2' ? '二' : '三') + '品凝露×1'); }
    } else {
      if (r < 0.4) { S.ores['sp5'] = (S.ores['sp5'] | 0) + 2; gains.push('💠极品灵石×2'); }
      else if (r < 0.7) { S.mats['maiPages'] = (S.mats['maiPages'] | 0) + 1; gains.push('🌀脉络残页×1'); }
      else { const g = 100 + Math.floor(Math.random() * 100); S.gold += g; gains.push('金元+' + g); }
    }
  }
  const name = kind === 'chestN' ? '🎀精致盲盒' : kind === 'chestB' ? '🎲盲盒' : kind === 'chestR' ? '🎁稀有宝箱' : '💎高级宝箱';
  log('good', name + ' ×' + n + ' 开启，获得：<span class="y">' + gains.join('、') + '</span>');
  afterAct(); commit(); sheetBag();
}
function doSynthVMai() {
  if (!C.synthVMai(S)) { toastLog('sys', '⚠️ 虚络不足10条'); return; }
  log('good', `🌀 10虚络合成 <b class="y">虚脉 ×1</b><span class="r">（临时）</span>（当前虚脉 ${S.maiVMai}，溢出上限 ${C.maiMult(S)} 倍）`);
  afterAct(); commit(); sheetBag();
}
function doSynthXPS() {
  if (!C.synthXPS(S)) { toastLog('sys', '⚠️ 灵气石不足10个'); return; }
  log('good', `💎 10灵气石合成 <b class="y">下品灵石 ×1</b>（当前下品灵石 ${S.ores.xps}）`);
  afterAct(); commit(); sheetBag();
}
function doSynthZPS() {
  if (!C.synthZPS(S)) { toastLog('sys', '⚠️ 下品灵石不足10个'); return; }
  log('good', `💎 10下品灵石合成 <b class="y">中品灵石 ×1</b>（当前中品灵石 ${S.ores.zps}）`);
  afterAct(); commit(); sheetBag();
}
function doSynthSPS() {
  if (!C.synthSPS(S)) { toastLog('sys', '⚠️ 中品灵石不足100个'); return; }
  log('good', `💎 100中品灵石合成 <b class="y">上品灵石 ×1</b>（当前上品灵石 ${S.ores.sps}）`);
  afterAct(); commit(); sheetBag();
}
function doSynthJPS() {
  if (!C.synthJPS(S)) { toastLog('sys', '⚠️ 上品灵石不足1000个'); return; }
  log('good', `💎 1000上品灵石合成 <b class="y">极品灵石 ×1</b>（当前极品灵石 ${S.ores.jps}）`);
  afterAct(); commit(); sheetBag();
}
function doSha() {
  const r = C.useSha(S);
  if (!r.ok) { toastLog('sys', r.why === 'noskill' ? '需先习得《吞魔》' : '⚠️ 没有煞气'); return; }
  log('good', `👹 吞噬煞气！${r.manaGained ? `法力 <span class="y">+${C.fmtN(r.manaGained)}</span>（无视上限，可叠加）` : '（凡人无法力，仅消耗）'}`);
  afterAct(); commit(); sheetBag();
}
// v964 彻底版：出售走服务端（固定价，服务端验算）。返回 true=已处理（无论成功失败），false=需走本地。
async function sellServer(type, idOrKey) {
  if (!(window.MHXY && MHXY.loggedIn && MHXY.loggedIn())) return false;
  try {
    const body = type === 'gear' || type === 'petgear' ? {type, id: idOrKey} : {type, key: idOrKey};
    const resp = await MHXY.api('/api/shop/sell', {method:'POST', body});
    const j = resp && resp.json;
    if (resp.ok && j && j.ok) {
      // 本地应用（确定性，无随机）
      if (type === 'gear') { const i = S.gearBag.findIndex(g => g.id === idOrKey); if (i >= 0) S.gearBag.splice(i, 1); }
      else if (type === 'petgear') { const i = (S.petBag||[]).findIndex(g => g.id === idOrKey); if (i >= 0) S.petBag.splice(i, 1); }
      else if (type === 'skillbook') { if (S.skillBooks) { S.skillBooks[idOrKey] = (S.skillBooks[idOrKey]|0) - 1; if (S.skillBooks[idOrKey] <= 0) delete S.skillBooks[idOrKey]; } }
      S.gold = (S.gold|0) + j.gold;
      if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
      return {ok: true, gold: j.gold};
    }
    return {ok: false, err: (j||{}).error}; // 服务端已响应，不回落
  } catch(e) { return false; } // 网络异常 → 回落本地
}
async function doBuy(kind, k, n) {
  if (kind === 'tool') { // v1128 器具购买：登录走服务端原子扣金发器具；网络异常回落本地（本地扣金只减不增过守卫）
    const price = k === 'fuq' ? 200 : 100;
    const applyToolBuy = (nn) => {
      if (k === 'pick' || k === 'hoe') { if (!S.tools) S.tools = { pick: null, hoe: null }; S.tools[k] = { tier: 0, dur: 100, max: 100, lvl: 0, uses: 0 }; }
      else { if (!S.inv) S.inv = {}; S.inv.fuq = (S.inv.fuq | 0) + Math.max(1, nn | 0); }
    };
    const toolLabel = () => k === 'pick' ? '普通矿镐' : k === 'hoe' ? '普通药锄' : '强化符';
    if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
      try {
        const resp = await MHXY.api('/api/shop/buy', { method: 'POST', body: { kind, key: k, n } });
        const j = resp && resp.json;
        if (resp.ok && j && j.ok) {
          if (typeof j.gold === 'number') S.gold = j.gold; else S.gold = (S.gold | 0) - j.cost;
          applyToolBuy(j.n);
          if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
          log('gold', `🛒 购买 ${toolLabel()} ×${j.n}（金元 -${j.cost}）`);
          try { if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.10); } catch (_) {}
          commit(); const _sy = $('sheet').scrollTop; sheetShop(); $('sheet').scrollTop = _sy;
          return;
        }
        if (!resp.netErr) { sheetShop((j || {}).error === 'have_tool' ? '已拥有该器具。' : (j || {}).error === 'no_money' ? '金元不足。' : '购买失败：' + ((j || {}).error || resp.status)); return; }
      } catch (e) { /* 回落本地 */ }
    }
    if ((k === 'pick' || k === 'hoe') && S.tools && S.tools[k]) { sheetShop('已拥有该器具。'); return; }
    const cnt = k === 'fuq' ? Math.max(1, n | 0) : 1;
    const cost = (S.race === 'traveler' ? Math.ceil(price * 0.95) : price) * cnt;
    if ((S.gold | 0) < cost) { sheetShop('金元不足。'); return; }
    S.gold = (S.gold | 0) - cost; applyToolBuy(cnt);
    log('gold', `🛒 购买 ${toolLabel()} ×${cnt}（金元 -${cost}）`);
    try { if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.10); } catch (_) {}
    commit(); const _sy2 = $('sheet').scrollTop; sheetShop(); $('sheet').scrollTop = _sy2;
    return;
  }
  // v964 彻底版：med/mat/spirit 登录在线时走服务端（固定价兑换，服务端验算）
  if ((kind === 'med' || kind === 'mat' || kind === 'spirit') && window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const resp = await MHXY.api('/api/shop/buy', {method:'POST', body:{kind, key:k, n}});
      const j = resp && resp.json;
      if (resp.ok && j && j.ok) {
        const store = kind === 'med' ? 'meds' : kind === 'mat' ? 'mats' : 'ores';
        const skey = kind === 'spirit' ? 'sp1' : k;
        // v972 服务端返回权威金元余额，直接采用（修复本地虚高问题）
        if (typeof j.gold === 'number') S.gold = j.gold;
        else S.gold = (S.gold|0) - j.cost;
        if (!S[store]) S[store] = {};
        S[store][skey] = (S[store][skey]|0) + j.n;
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        if (kind === 'spirit') log('gold', `🛒 购买 💎一品灵石 ×${j.n}（金元 -${j.cost}）`);
        else log('gold', `🛒 购买 ${(kind === 'med' ? C.MEDS : MATS)[k].name} ×${j.n}（金元 -${j.cost}）`);
        try { if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.10); } catch(_) {}
        commit(); const _sy = $('sheet').scrollTop; sheetShop(); $('sheet').scrollTop = _sy;
        return;
      }
      if ((j||{}).error === 'no_money') {
        sheetShop('金元不足。');
        return; // 服务端已响应，不回落
      }
      if (!resp.netErr) {
        // v972 服务端返回其他错误时显示真实原因，不再一律报金元不足
        const _err = (j||{}).error || ('HTTP ' + resp.status);
        sheetShop('购买失败：' + _err);
        return;
      }
      // 网络异常 → 回落本地
    } catch(e) { /* 回落本地 */ }
  }
  const r = C.buy(S, kind, k, n);
  if (!r.ok) { sheetShop(r.why === 'gold' ? '金元不足。' : r.why === 'learned' ? '已习得该技能。' : r.why === 'once' ? '每号限购1次。' : r.why === 'stone' ? '灵石不足。' : r.why === 'xianyu' ? '仙玉不足。' : '购买失败。'); return; }
  if (kind === 'skill') log('gold', `📖 购买技能书，习得 <span class="pu">【${SKILLS[k].name}】</span>（金元 -${r.cost}）`);
  else if (kind === 'ring') log('gold', `🎒 购买 <span class="y">小型储物袋</span> ×1（当前 ${S.pouch} 只，金元 -${r.cost}）`);
  else if (kind === 'ring_stone') log('gold', `💍 购买 <span class="y">储物戒指</span> ×1（当前 ${S.rings} 枚）`);
  else if (kind === 'space_s') log('gold', `📦 购买 <span class="y">储物空间（小）</span> ×1（物品包×3）`);
  else if (kind === 'space_l') log('gold', `📦 购买 <span class="y">储物空间（大）</span> ×1（物品包×4）`);
  else if (kind === 'spirit') log('gold', `🛒 购买 💎一品灵石 ×${r.n}（金元 -${r.cost}）`);
  else log('gold', `🛒 购买 ${(kind === 'med' ? C.MEDS : MATS)[k].name} ×${r.n}（金元 -${r.cost}）`);
  try { if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.10); } catch(_) {} // v796 交易触发雷云判定
  commit(); const _sy = $('sheet').scrollTop; sheetShop(); $('sheet').scrollTop = _sy; // v200 购买后保持滚动位置
}
const HUNT_FLAVOR = { rabbit: '林间射中一只野兔，剥得', deer: '追踪鹿迹，猎得', wolf: '与恶狼周旋良久，斩获', tiger: '深山遇虎，险中求胜，剥得' };
const FARM_LINES = ['晨露未干，采得', '精心浇灌，收获', '锄禾日当午，采得', '药圃清香，收获'];
const READ_FLAVOR = { pg1: '【学习】挑灯看书，读懂几行，拾得', pg2: '【深度学习】反复研读，心有所得，拾得', pg3: '【小悟】书中字句忽然贯通，<span class="pu">小有所悟</span>，拾得', pg4: '【中悟】物我两忘，<span class="q2">豁然开朗</span>，拾得', pg5: '【大悟】灵台清明，<b class="q3">大彻大悟</b>！拾得' };
const EGG_FLAVOR = { chicken: '在草垛里摸到', duck: '在河边芦苇丛中掏到', goose: '趁大鹅不备，捡到', ostrich: '冒险闯入鸵鸟巢，抱回' };
const MINE_FLAVOR = { iron: '挖到', copper: '挖到', silver: '挖到一块', gold: '运气不错，挖到了' };
// v963 彻底版：主采集服务端掷骰。登录在线时走 /api/roll/wild（系统记账，不限流），
// 失败回 null 由调用方回落本地 gather()。返回的 out 兼容 doGather 的 UI 格式。
async function gatherServer(S, kind, n) {
  const out = [];
  const g = GATHER[kind];
  n = Math.min(n || 1, 20);
  for (let i = 0; i < n; i++) {
    let resp;
    try { resp = await MHXY.api('/api/roll/wild', {method:'POST', body:{kind}}); }
    catch(e) { return null; } // 网络异常 → 回落本地
    const j = resp && resp.json;
    if (!(resp.ok && j && j.ok)) {
      const e = (j||{}).error;
      if (e === 'would_die' || e === 'dead' || e === 'no_stamina') return null; // 交由本地完整流程（含死亡/提示）
      if (resp.netErr) return null;
      break; // 服务端已响应（bad_kind/conflict 等），不回落，返回已有部分
    }
    for (const gg of (j.gains || [])) {
      if (gg.st === 'petEggs') S.petEggs = (S.petEggs|0) + gg.n;
      else { if (!S[gg.st]) S[gg.st] = {}; S[gg.st][gg.k] = (S[gg.st][gg.k]|0) + gg.n; }
    }
    S.stamina = j.stamina;
    if (!j.fail && g && g.attr) S.attrs[g.attr] = (S.attrs[g.attr]|0) + 1;
    try { if (typeof hungerDown === 'function') hungerDown(S, K.HUNGER_ACT, 1); } catch(_){}
    if (j.poison) { S.hpCur = Math.max(0, (S.hpCur|0) - j.poison); try { if (typeof poisonAcc !== 'undefined') poisonAcc += j.poison; } catch(_){} }
    if (S.buff && S.buff.k === 'luck') { S.buff.left = (S.buff.left|0) - 1; if (S.buff.left <= 0) S.buff = null; }
    if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
    const x = [];
    if (j.fail) { x.fail = true; }
    else {
      for (const gg of (j.gains || [])) {
        for (let q = 0; q < gg.n; q++) x.push(gg.k);
        if (gg.st === 'food') { x.meat = gg.k; (out.meat = out.meat || {})[gg.k] = ((out.meat[gg.k]||0) + gg.n); }
        if (gg.st === 'petEggs') { x.petEgg = 1; out.petEgg = (out.petEgg||0) + gg.n; }
        if (kind === 'farm' && gg.st === 'mats' && /^lu/.test(gg.k)) { x.premium = gg.k; (out.premium = out.premium || {})[gg.k] = ((out.premium[gg.k]||0) + gg.n); }
        if (kind === 'mine' && gg.st === 'ores' && /^sp/.test(gg.k)) { x.spirit = gg.k; (out.spirit = out.spirit || {})[gg.k] = ((out.spirit[gg.k]||0) + gg.n); }
      }
    }
    out.push(x);
    if (S.dead) { out.died = true; break; }
  }
  out.fails = out.filter(x => x.fail).length;
  return out;
}
async function doGather(kind, n) {
  if (typeof S === 'undefined' || !S) { try { load(); } catch(_) {} }
  if (typeof S === 'undefined' || !S) { log('bad', '❌状态异常，请刷新页面'); return; }
  try { if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) { S._trigFail=S._trigFail|0; S._succFail=S._succFail|0; const _n=Math.max(1,(n||1)|0); const _trigP=Math.min(1,0.10+0.10*S._trigFail); let _tr=false; for (let _i=0;_i<_n;_i++) { if (Math.random()<_trigP) { _tr=true; break; } } if (!_tr) { S._trigFail++; } else { S._trigFail=0; const _scenes=[['微风忽起，落叶打旋','天色微暗','远处闷雷一声'],['灵气躁动，飞鸟惊散','乌云聚顶，云层压得很低','雷声滚滚，由远及近'],['草木低伏，虫鸣骤止','劫云翻涌，云中有电光游走','雷声震耳，地面微颤'],['空气粘稠，呼吸不畅','金色雷纹在云中若隐若现','雷声如鼓，声声催心'],['灵气倒卷，阵法纹路浮现','云层裂开，白光倾泻','虚空嗡鸣，如大道低语'],['十里之内，鸟兽绝迹','雷光如瀑，倾天而下','威压先至，骨骼作响'],['天地灵气一空','云开一线，天眼似开','万籁俱寂，只闻心跳'],['凡尘涤荡，浊气尽散','雷柱接天，直贯九霄','天道之音，响彻神魂'],['仙器共鸣，嗡嗡作响','九彩劫云，遮天蔽日','法则碎片，四散飞溅'],['小世界灵气被抽空','虚空裂缝，蔓延天际','空间涟漪，层层荡开'],['数个小世界震动','劫云蔽星，日月无光','法则碰撞，星火四溅'],['三千世界战栗','灭世洪流，席卷星海','雷威吞声，万物噤声']]; const _sc=_scenes[Math.min(11,S.realm|0)]||_scenes[0]; if (window.TRIB_OMEN) window.TRIB_OMEN.show(S); log('warn', '🌩️ '+_sc[0]+'。'+_sc[1]+'。'+_sc[2]+'……<br>雷云判定中……'); const _succP=Math.min(1,0.01+0.01*S._succFail); if (Math.random()<_succP) { S.thunderOk=true; S._succFail=0; S._trigFail=0; log('good', '⚡ <b class="r">天道已将你锁定</b>——雷劫将至，生死只在一线之间！<br>速速调整状态，迎接天威洗礼！<br>⚡ 突破契机已到，随时可破'); commit(); } else { S._succFail++; log('info', '<span style="filter:brightness(0)">🌫️</span> 雷云缓缓散去，天威渐消……<br><span style="color:#888">看来火候未到，天道还未注意到你。继续修炼吧。</span>'); } } } } catch(_){} // v653 保底叠加
  const g = GATHER[kind];
  let r;
  // v963 彻底版：mine/farm/hunt/egg 登录在线时走服务端掷骰
  if (['mine','farm','hunt','egg'].indexOf(kind) >= 0 && window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    r = await gatherServer(S, kind, n);
    if (r === null) r = C.gather(S, kind, n); // 网络失败/需本地流程 → 回落
  } else {
    r = C.gather(S, kind, n);
  }
  if (!r.length) { if (S.dead) { closeSheet(); afterAct(); commit(); } return; }
  const cnt = {}; let crits = 0, total = 0, lostTotal = 0; r.forEach(x => { if (x.length > 1) crits++; x.forEach(k => { cnt[k] = (cnt[k] || 0) + 1; total++; }); lostTotal += x.lost || 0; }); // v433 统计背包满丢失数
  const fails = r.fails || 0, okCnt = r.length - fails;
  const xpGain = S.realm === 0 && !S.dead ? okCnt * 10 : 0; if (xpGain) S.xp += xpGain; // 凡人每次成功修炼+10经验
  const icon = GI[kind], verb = kind === 'farm' ? '收获' : GV[kind] + '到', critW = kind === 'farm' ? '丰收' : '暴击';
  const lines = r.map(x => x.fail ? `<span class="r">🌧️ 心绪低落，心不在焉，一无所获</span>` : (!x.length ? `<span class="r">🎒 背包已满，未能带回</span>` : (x.length > 1 ? `<span class="y">${critW}！${verb} ${x.length} ${g.unit}${g.noun}</span>：${x.map(k => rarTxt(kind, k)).join('、')}`
    : `${icon} ${kind === 'farm' ? C.pick(FARM_LINES) : ({ mine: MINE_FLAVOR, hunt: HUNT_FLAVOR, egg: EGG_FLAVOR, read: READ_FLAVOR })[kind][x[0]]} ${rarTxt(kind, x[0])}`)) + (x.premium ? `，药圃深处竟长出了 ${rarTxt('farm', x.premium)}！` : '') + (x.meat ? `，还带回 1 块<span class="g">${MEATS[x.meat].name}</span>🍖` : '') + (x.spirit ? `，石缝中闪出一块 ${rarTxt('mine', x.spirit)}！` : '') + (x.petEgg ? '，窝底竟藏着一枚流光溢彩的<b class="q3">🥚灵宠蛋</b>！' : '') + (x.skillPage ? `，书页间竟夹着一张 <b class="q2">📕${SKILLS[x.skillPage].name}·技能观相残页</b>！` : '')); // v433 空数组显示背包满，避免rarTxt(undefined)崩溃
  log('good', `${icon} ${{ mine: '下矿挖掘', hunt: '进山打猎', farm: '耕种药圃', egg: '攀树掏蛋', read: '挑灯看书' }[kind]} ${r.length} 次，${AN[g.attr]} <span class="g">+${r.length - fails}</span>（体力 -${r.length + (r.died ? 1 : 0)}）${fails ? `，<span class="r">抑郁失手 ${fails} 次</span>` : ''}${lostTotal ? `，<span class="r">🎒背包已满 ${lostTotal} 件未能带回</span>` : ''}${xpGain ? `，经验 <span class="g">+${xpGain}</span>` : ''}，共得 ${total} ${g.unit}${g.noun}：${Object.keys(g.items).filter(k => cnt[k]).map(k => rarTxt(kind, k) + ' ×' + cnt[k]).join('、')}` + (r.meat ? `，另得 ${Object.keys(r.meat).map(k => `<span class="g">${MEATS[k].name} ×${r.meat[k]}</span>`).join('、')}🍖（可在人物卡食用恢复体力）` : '') + (r.spirit ? '，' + Object.keys(r.spirit).map(k => rarTxt('mine', k) + ' ×' + r.spirit[k]).join('、') : '') + (r.premium ? '，另得 ' + Object.keys(r.premium).map(k => rarTxt('farm', k) + ' ×' + r.premium[k]).join('、') : '') + (r.petEgg ? `，另得 <b class="q3">🥚灵宠蛋 ×${r.petEgg}</b>（可在背包孵化）` : '') + (r.skillPage ? '，另得 ' + Object.keys(r.skillPage).map(k => `<b class="q2">📕${SKILLS[k].name}技能残页 ×${r.skillPage[k]}</b>`).join('、') + '（背包中集齐 10 张可合成技能书）' : '') +
    (r.length > 1 ? (crits ? `，<span class="y">${critW} ${crits} 次</span>` : '') + `<details ${crits ? 'open' : ''}><summary>${g.name}详情</summary>${lines.map(l => `<div class="bl">${l}</div>`).join('')}</details>` : `<br>${lines[0]}`));
  afterAct(); commit(); S.dead ? closeSheet() : sheetTrain();
}
const petXpTxt = r => r.pet ? `<br>${petTag(r.pet)} 经验 +${r.petXp}（${r.pet.xp}/${C.petXpNeed(r.pet.lv)}）` + (r.petUps ? ` <span class="y">升到 Lv.${r.pet.lv}！获得 ${r.petUps * K.PET_LV_PTS} 点属性点，可在背包分配</span>` : '') + (r.petSks && r.petSks.length ? ` <span class="y">✨领悟技能【${r.petSks.map(sk => C.GEAR_SETS[sk].name).join('·')}】！</span>` : '') + (r.petTls && r.petTls.length ? ` <span class="y">🌟 领悟天赋神通【${r.petTls.join('·')}】！</span>` : '') : '';
const petTag = pt => { const Q = petQ(pt); return `${PETS[pt.k].icon} <b style="color:${Q.color}">${PETS[pt.k].name}</b><small style="color:${Q.color}">·${Q.name}</small>#${pt.id}`; };
function doHatch() {
  const r = C.hatchPet(S); if (!r) return;
  log('gold', `🐣 灵宠蛋破壳而出——${petTag(r.pet)}！${ATTRS.map(a => AN[a] + r.pet.attrs[a]).join(' ')}（总 ${C.total(r.pet.attrs)}）` + (r.auto ? '，已自动出战！' : '，可在宠物页设为出战。'));
  commit(); if (window._charPage === 3) { sheetChar(); } else { sheetBag(); }
}
function doPet(id) { if (lifeLocked('tame')) { toastLog('bad', '🔒 未选择驯兽技能，无法携带灵宠'); return; } // v205 选了驯兽才能带宠物
  const wasOut = Array.isArray(S.pet) ? S.pet.includes(id) : S.pet === id; if (C.setPet(S, id)) { const pt = S.pets.find(p => p.id === id); const n = C.activePets(S).length; const isOut = Array.isArray(S.pet) && S.pet.includes(id); log('good', `${petTag(pt)} ${isOut ? '出战' : '撤下'}！当前出战 ${n}/4 只，PK 中亲自参战，冒险中${C.petBonusTxt(pt.k)}`); commit(); if (window._charPage) { sheetChar(); } else { sheetBag(); } if (typeof sheetLife === 'function') sheetLife('tame'); petSay('greet', 0.6); } else if (!wasOut) { log('bad', '出战灵宠已满 4 只，先点一下已出战的把它撤下，再选新的'); } }
function doAssign(id, a) { if (C.petAssign(S, id, a, 1)) { save(); render(); const els = [$('sheet'), $('mask')], ys = els.map(e => e.scrollTop); if (window._charPage === 3) { sheetChar(); } else { sheetBag(); } els.forEach((e, i) => e.scrollTop = ys[i]); } }
function sheetDevour(id) {
  const eater = S.pets.find(p => p.id === id); if (!eater) return;
  // v483 同品种同品质置顶（可进阶），其余按品种分组+品质从高到低
  const _foods = S.pets.filter(p => p.id !== id).sort((a, b) => {
    const _am = (a.k === eater.k && (a.q|0) === (eater.q|0)) ? 0 : 1;
    const _bm = (b.k === eater.k && (b.q|0) === (eater.q|0)) ? 0 : 1;
    if (_am !== _bm) return _am - _bm;
    if (a.k !== b.k) return a.k < b.k ? -1 : 1;
    return (b.q|0) - (a.q|0);
  });
  openSheet(`<h2>吞噬</h2><div class="hint">选择被 ${petTag(eater)} 吞噬的灵宠：吞噬者获得对方<b class="y">全部五项属性</b>，被吞噬的灵宠将<b class="r">永久消失</b>。<br>🌟 <b class="y">同品种同品质</b>排前面，15%概率品质进阶！</div><div class="row" style="display:flex;gap:6px;margin-bottom:6px"><button class="btn" onclick="window.sheetBeastDevour()" style="flex:1">↩️ 返回重选吞噬者</button></div>` + // v485 返回按钮放顶部
    _foods.map(p => { const _match = (p.k === eater.k && (p.q|0) === (eater.q|0)); return `<div class="row"><div class="lab">${_match ? '🌟' : ''}${p.locked ? '🔒' : ''}${petTag(p)} Lv.${p.lv}${S.pet === p.id ? ' <span class="tag">出战中</span>' : ''}<small>${ATTRS.map(a => AN[a] + ' +' + p.attrs[a]).join(' · ')}（总 +${C.total(p.attrs)}）</small></div><button class="btn danger" data-devfood="${p.id}" data-eater="${id}" ${p.locked ? 'disabled' : ''}>吞噬</button></div>`; }).join('') +
    `<button class="btn full" data-a="bag">返回背包</button>`);
}
// v467 兽园吞噬入口：先选吞噬者
window.sheetBeastDevour = function() {
  if (!S.pets.length) { if (typeof openSheet==='function') openSheet(`<h2>☣️ 兽园 · 吞噬</h2><div class="empty">暂无灵宠</div>`); return; }
  if (S.pets.length < 2) { if (typeof openSheet==='function') openSheet(`<h2>☣️ 兽园 · 吞噬</h2><div class="hint">吞噬需要至少2只灵宠，当前只有1只。</div>`); return; }
  openSheet(`<h2>☣️ 兽园 · 吞噬</h2><div class="row" style="display:flex;gap:6px;margin-bottom:6px;align-items:stretch"><button class="btn gold" onclick="if(typeof window.doAutoDevour==='function')window.doAutoDevour()" style="flex:1">🤖 一键自动吞噬<br><small>该品阶及以下自动互噬</small></button><div id="autoDevQRow" style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;justify-content:center;max-width:120px">${[['-1','全',' #ffd700']].concat(PQLT.map((q,i)=>[String(i),q.name[0],q.color])).map(([v,n,c])=>`<button data-q="${v}" onclick="window._autoDevQ=parseInt(this.dataset.q);window.sheetBeastDevour()" style="width:28px;height:28px;border-radius:50%;border:2px solid ${window._autoDevQ==parseInt(v)?'#fff':'transparent'};background:${c};color:#000;font-size:11px;font-weight:bold;cursor:pointer" title="${v==='-1'?'全部品阶':PQLT[parseInt(v)].name}">${n}</button>`).join('')}</div></div><div class="hint">选择吞噬者（获得对方全部五项属性）：</div>` + // v517 自动吞噬放顶部；v519 品质选择
    [...S.pets].sort((a, b) => a.k !== b.k ? (a.k < b.k ? -1 : 1) : (b.q|0) - (a.q|0)).map(p => `<div class="row"><div class="lab">${petTag(p)} Lv.${p.lv}<small>总属性 ${C.total(p.attrs)}</small></div><button class="btn gold" onclick="window.sheetDevour(${p.id})">选为吞噬者</button></div>`).join('')); // v482 品种分组+品质降序
}; // v469
window.sheetLife = sheetLife; window.sheetDevour = sheetDevour; // v471 挂全局供兽园调用
function doDevour(eaterId, foodId) {
  const e = S.pets.find(p => p.id === eaterId), f = S.pets.find(p => p.id === foodId); if (!e || !f) return;
  if (f.locked) { log('bad', '🔒 该灵宠已锁定，不可吞噬'); return; } // v894
  if (!confirm(`确定让 ${PETS[e.k].name}#${e.id} 吞噬 ${PETS[f.k].name}#${f.id}？\n${PETS[f.k].name}#${f.id} 将永久消失！`)) return;
  const r = C.devourPet(S, eaterId, foodId); if (!r) return;
  if (r.err) { log('bad', r.err); return; }
  log('gold', `🌀 ${petTag(r.eater)} 吞噬了 ${petTag(r.food)}，获得 ${gainsTxt(r.gains)}（总属性 ${C.total(r.eater.attrs)}）` + (r.xpGain > 0 ? `，经验 <span class="y">+${r.xpGain}</span>${r.xpUp && r.xpUp.ups ? `，<span class="y">升到 Lv.${r.eater.lv}！</span>` : ''}` : '') + (r.moved ? `，并接替出战` : '') + (r.sks && r.sks.length ? `，<span class="y">✨习得技能【${r.sks.map(sk => C.GEAR_SETS[sk].name).join('·')}】</span>` : '') + (r.xpUp && r.xpUp.sks.length ? `，<span class="y">✨领悟【${[...new Set(r.xpUp.sks)].map(sk => C.GEAR_SETS[sk].name).join('·')}】</span>` : '') + (r.xpUp && r.xpUp.tls.length ? `，<span class="y">🌟 领悟天赋神通【${[...new Set(r.xpUp.tls)].join('·')}】</span>` : '') + (r.qup ? `<br>🌟 <span class="g">品质进阶！${petTag(r.eater)}</span>` : ''));
  // v480 吞噬结果横幅，10秒消失
  try {
    const _tip = document.getElementById('devourTip');
    if (_tip) {
      _tip.innerHTML = `🌀 <b>${petTag(r.eater)}</b> 吞噬了 ${petTag(r.food)}<br>` + (r.qup ? `🌟 <span style="color:#7CFC00;font-weight:bold">品质进阶成功！</span>` : `品质进阶<span style="color:#ff6b6b">失败</span>（15%概率）`);
      _tip.style.display = 'block';
      if (window._devourTipT) clearTimeout(window._devourTipT);
      window._devourTipT = setTimeout(() => { const _t2 = document.getElementById('devourTip'); if (_t2) _t2.style.display = 'none'; }, 5000); // v484 5秒消失
    }
  } catch (_) {}
  commit(); if (typeof window.sheetBeastDevour==='function' && S.pets.length > 1) window.sheetBeastDevour(); else sheetBag(); // v472 吞噬完留兽园
}
window.doAutoDevour = function() {
  // v517 一键自动吞噬：同品种同品质的自动互噬（留最强的一只）；v519 可选品阶
  const _q = (typeof window._autoDevQ === 'number') ? window._autoDevQ : -1; // v522 图标选择
  const _battle = Array.isArray(S.pet) ? S.pet : (S.pet ? [S.pet] : []);
  const _groups = {};
  S.pets.forEach(p => { if (_battle.includes(p.id)) return; if (_q >= 0 && (p.q|0) > _q) return; const _k = p.k + '|' + (p.q|0); (_groups[_k] = _groups[_k] || []).push(p); }); // v523 该品阶及以下
  let _done = 0, _up = 0; const _logs = [];
  Object.values(_groups).forEach(g => {
    if (g.length < 2) return;
    // 留总属性最高的做吞噬者
    g.sort((a, b) => C.total(b.attrs) - C.total(a.attrs));
    const _eater = g[0];
    for (let i = 1; i < g.length; i++) {
      const _food = S.pets.find(p => p.id === g[i].id); if (!_food) continue;
      const _e = S.pets.find(p => p.id === _eater.id); if (!_e) break;
      const r = C.devourPet(S, _e.id, _food.id); if (!r) continue;
      _done++;
      if (r.qup) { _up++; _logs.push(`🌟 ${petTag(r.eater)} 品质进阶！`); }
    }
  });
  if (!_done) { if (typeof toastLog==='function') toastLog('sys', '没有可自动吞噬的同品种同品质灵宠'); return; }
  log('gold', `🤖 自动吞噬完成：共吞噬 ${_done} 只` + (_up ? `，<span class="g">品质进阶 ${_up} 次！</span>` : '，未进阶') + (_logs.length ? '<br>' + _logs.join('<br>') : ''));
  // v520 自动吞噬横幅显示哪些进阶成功
  try {
    const _tip = document.getElementById('devourTip');
    if (_tip) {
      _tip.innerHTML = `🤖 自动吞噬 ${_done} 只<br>` + (_up ? `🌟 <span style="color:#7CFC00;font-weight:bold">进阶成功 ${_up} 只：</span><br>` + _logs.join('<br>') : `品质进阶<span style="color:#ff6b6b">全部失败</span>（15%概率）`);
      _tip.style.display = 'block';
      if (window._devourTipT) clearTimeout(window._devourTipT);
      window._devourTipT = setTimeout(() => { const _t2 = document.getElementById('devourTip'); if (_t2) _t2.style.display = 'none'; }, 8000);
    }
  } catch (_) {}
  commit(); if (typeof window.sheetBeastDevour==='function' && S.pets.length > 1) window.sheetBeastDevour(); else sheetBag();
}; // v517
function sheetPetBreak() {
  const list = S.pets.filter(p => p.lv >= petEffLvMax(p));
  if (!list.length) { openSheet(`<h2>💥 灵宠突破</h2><div class="empty">没有达到等级上限的灵宠</div>`); return; }
  openSheet(`<h2>💥 灵宠突破</h2><div class="hint">突破后等级上限+10。神宠无上限，其他品质有次数限制。</div>` +
    list.map(p => {
      const q = (p.q|0), bc = (p.breakCount|0), mx = PET_BREAK_MAX[q];
      const can = bc < mx;
      return `<div class="row"><div class="lab">${petTag(p)} Lv.${p.lv}/${petEffLvMax(p)}<br><small>已突破${bc}次${mx>=999?'（无上限）':'/'+mx+'次'}</small></div><button class="btn"${can?'':' disabled'} onclick="window.doPetBreak(${p.id})">${can?'💥 突破':'已达上限'}</button></div>`;
    }).join(''));
}
function doPetBreak(id) {
  const p = S.pets.find(x => x.id === id); if (!p) return;
  const q = (p.q|0), bc = (p.breakCount|0), mx = PET_BREAK_MAX[q];
  if (bc >= mx) { log('bad', '已达突破上限'); return; }
  if (p.lv < petEffLvMax(p)) { log('bad', '未达到等级上限'); return; }
  // 突破消耗：100金 × (突破次数+1)
  const cost = 100 * (bc + 1);
  if ((S.gold|0) < cost) { log('bad', `金元不足，需${cost}金`); return; }
  if (!confirm(`${petTag(p)} 突破？消耗${cost}金元，等级上限+10`)) return;
  S.gold -= cost;
  p.breakCount = bc + 1;
  log('gold', `💥 ${petTag(p)} 突破成功！等级上限提升至 ${petEffLvMax(p)}（已突破${p.breakCount}次）`);
  commit(); sheetPetBreak();
}
window.sheetPetBreak = sheetPetBreak; window.doPetBreak = doPetBreak; // v1091 灵宠突破入口/动作挂全局（兽园按钮与面板按钮调 window.*；此前未导出致按钮全死）

// v1155 成长服务端化：发放登记助手——登录时先经服务端掷骰记账（成长账本），本地照常执行显示；
// 服务端拒绝/离线都不拦本地（上传守卫有预算吸收小额差），但服务端已发放的 rev 要接住防冲突。
async function srvProg(path, body) {
  if (!(window.MHXY && MHXY.loggedIn && MHXY.loggedIn())) return null;
  try {
    const resp = await MHXY.api(path, { method: 'POST', body: body || {} });
    if (resp && resp.ok && resp.json && resp.json.ok) { if (typeof resp.json.rev === 'number') MHXY.setBaseRev(resp.json.rev); return resp.json; }
    if (resp && !resp.netErr && resp.json && resp.json.error) return { denied: resp.json.error };
  } catch (e) {}
  return null;
}
// v1155 闭关/突破登记：挂在 save/commit 之后统一侦测（入关盖服务端时间戳、出关按服务端时长对账、突破进境登记）
window.__afkSrv = false; window.__afkLocalGain = null; window.__srvAfkMark = null;
window.__srvRealmSeen = null; window.__srvAttrSnap = null; window.__pendingBt = null;
try { const _afkExit0 = afkExit; if (typeof _afkExit0 === 'function') afkExit = function (S2, reason) { const g = _afkExit0(S2, reason); window.__afkLocalGain = g; return g; }; } catch (e) {}
function progAfterSave() {
  try {
    if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn() || typeof S === 'undefined' || !S) return;
    if (window.__srvRealmSeen == null) { window.__srvRealmSeen = S.realm | 0; window.__srvAttrSnap = Object.assign({}, S.attrs || {}); }
    else if ((S.realm | 0) > window.__srvRealmSeen && !window.__pendingBt) {
      const keys = ['str', 'agi', 'def', 'vit', 'int'], ratios = [];
      for (const k of keys) { const o = (window.__srvAttrSnap || {})[k] | 0, n = S.attrs[k] | 0; if (o >= 1 && n >= 1) ratios.push(n / o); }
      ratios.sort((a, b) => a - b);
      let mult = ratios.length ? ratios[Math.floor(ratios.length / 2)] : 1;
      mult = Math.round(mult * 10) / 10; if (!(mult >= 1)) mult = 1; if (mult > 2.2) mult = 2.2;
      window.__pendingBt = { to: S.realm | 0, mult };
    }
    if (window.__pendingBt) {
      const pb = window.__pendingBt;
      MHXY.api('/api/progress/breakthrough', { method: 'POST', body: { to: pb.to, mult: pb.mult, lingGen: S.lingGen || [], xianCap: S.xianCap || 0 } }).then(function (resp) {
        if (resp && resp.ok && resp.json && resp.json.ok) { if (typeof resp.json.rev === 'number') MHXY.setBaseRev(resp.json.rev); window.__srvRealmSeen = pb.to; window.__pendingBt = null; }
        else if (resp && resp.json && resp.json.error === 'already_or_skip') { window.__srvRealmSeen = pb.to; window.__pendingBt = null; }
      }).catch(function () {});
    }
    if ((S.realm | 0) < window.__srvRealmSeen) window.__srvRealmSeen = S.realm | 0;
    window.__srvAttrSnap = Object.assign({}, S.attrs || {});
    if (S.afk && S.afk.start) {
      if (window.__srvAfkMark !== S.afk.start) {
        window.__srvAfkMark = S.afk.start;
        MHXY.api('/api/progress/afk_begin', { method: 'POST', body: { type: S.afk.type } }).then(function (resp) { if (resp && resp.ok && resp.json && resp.json.ok) { window.__afkSrv = true; if (typeof resp.json.rev === 'number') MHXY.setBaseRev(resp.json.rev); } }).catch(function () {});
      }
    } else if (window.__srvAfkMark) {
      window.__srvAfkMark = null;
      if (window.__afkSrv) {
        window.__afkSrv = false;
        const localGain = window.__afkLocalGain; window.__afkLocalGain = null;
        MHXY.api('/api/progress/afk_settle', { method: 'POST', body: { qi: (typeof C !== 'undefined' && C.qiNow) ? C.qiNow() : 50 } }).then(function (resp) {
          if (resp && resp.ok && resp.json && resp.json.ok) {
            const j = resp.json; if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
            if (typeof localGain === 'number') { const diff = (j.gain | 0) - localGain; if (diff !== 0) { if (j.isMana) S.mana = Math.max(0, (S.mana || 0) + diff); else S.xp = Math.max(0, (S.xp || 0) + diff); try { save(); } catch (e) {} } }
          }
        }).catch(function () {});
      }
    }
    // v1156 生活技能经验汇报：与上次快照比对总经验增量，攒够/超时批量经服务端发放登记
    try {
      const tot = s2 => { const L2 = s2 === 'alc' ? S.alc : (S.life || {})[s2]; if (!L2) return 0; let t2 = L2.xp | 0; for (let i2 = 1; i2 < (L2.lv | 0 || 1); i2++) t2 += i2 * 30; return t2; };
      const keys2 = ['alc', 'cook', 'forge', 'refine', 'tame'];
      if (!window.__skillSnap) { window.__skillSnap = {}; window.__skillPend = {}; window.__skillFlushAt = 0; for (const k2 of keys2) window.__skillSnap[k2] = tot(k2); }
      else {
        let pendSum = 0;
        for (const k2 of keys2) { const now2 = tot(k2), d2 = now2 - (window.__skillSnap[k2] | 0); window.__skillSnap[k2] = now2; if (d2 > 0) window.__skillPend[k2] = (window.__skillPend[k2] | 0) + d2; pendSum += window.__skillPend[k2] | 0; }
        if (pendSum > 0 && (pendSum >= 50 || Date.now() - window.__skillFlushAt > 30000)) {
          window.__skillFlushAt = Date.now();
          for (const k2 of keys2) {
            const p2 = Math.min(500, window.__skillPend[k2] | 0); if (!p2) continue;
            window.__skillPend[k2] -= p2;
            srvProg('/api/progress/skillxp', { skill: k2, xp: p2 }).then(function (res) { if (!res || !res.ok) window.__skillPend[k2] = (window.__skillPend[k2] | 0) + p2; else if ((res.applied | 0) < p2) window.__skillPend[k2] = (window.__skillPend[k2] | 0) + (p2 - (res.applied | 0)); });
          }
        }
      }
    } catch (e) {}
  } catch (e) {}
}
try { const _c0 = commit; if (typeof _c0 === 'function') commit = function () { const r = _c0.apply(this, arguments); progAfterSave(); return r; }; } catch (e) {}
try { const _s0 = save; if (typeof _s0 === 'function') save = function () { const r = _s0.apply(this, arguments); progAfterSave(); return r; }; } catch (e) {}
// v1156 冒险整场结算汇报：run.rew.gains 经服务端核定（按胜场/事件/难度与每日上限），超核部分当场校正
try { const _sae0 = showAdvEnd; if (typeof _sae0 === 'function') showAdvEnd = function (r) { const out = _sae0.apply(this, arguments); try { const e = r && r.end; if (e && e.rew && e.rew.gains) { const gains = {}; let tot = 0; for (const a in e.rew.gains) { const v = e.rew.gains[a] | 0; if (v > 0) { gains[a] = v; tot += v; } } if (tot > 0) srvProg('/api/progress/adv', { dk: e.dk, wins: e.rew.wins | 0, ev: e.total | 0, gains }).then(function (res) { if (res && res.ok && res.gains) { let cut = 0; for (const a in gains) { const d = gains[a] - (res.gains[a] | 0); if (d > 0) { S.attrs[a] = Math.max(1, (S.attrs[a] | 0) - d); cut += d; } } if (cut > 0) { log('warn', `🌐 天道核验：本场修为超出核定 ${cut} 点，已校正。`); try { commit(); } catch (e2) {} try { render(); } catch (e2) {} } } }); } } catch (e) {} return out; }; } catch (e) {}
// v1156 参悟法则服务端版：登录时服务端扣体力掷增量/觉醒，本地按结果落账；离线/被拒回落本地原逻辑
try { const _dfz0 = doFaZe; if (typeof _dfz0 === 'function') doFaZe = async function (el) { try { if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn()) return _dfz0(el); if ((S.realm | 0) < 11 || !window.LG || !window.LG.hasEle(S, el)) return _dfz0(el); S.faZe = S.faZe || {}; if ((S.faZe[el] | 0) >= 100 || (S.stamina | 0) < 3) return _dfz0(el); const r = await srvProg('/api/progress/faze', { el }); if (!r || !r.ok) return _dfz0(el); S.stamina = Math.max(0, (S.stamina | 0) - 3); S.faZe[el] = r.total; if (r.total >= 100) log('good', `✨ <b>${el}之法则圆满！</b>${{ str: '力量', vit: '体质', agi: '身法', int: '智力', def: '防御' }[window.LG.ATTR[el]]}+15%！`); else log('good', `${r.dw ? '💡 顿悟！' : '☯️ '}${el}之法则参悟 +${r.add}%（${r.total}%/100%）`); if (r.awaken) { const gi = (S.lingGen || []).indexOf(el); if (gi >= 0) S.lingGen[gi] = r.awaken; log('good', `🌟 <b>灵根觉醒！</b>${el}灵根参悟有感，觉醒为<b>${r.awaken}</b>灵根！`); } const _allMine = (S.lingGen || []).filter(e2 => e2 !== '毒').every(e2 => (S.faZe[e2] | 0) >= 100); const _allFive = window.LG.ELES.every(e2 => (S.faZe[e2] | 0) >= 100); if (_allFive && !S.faZeDone5) { S.faZeDone5 = 1; log('warn', `🌈 <b>五行圆满！成就【混元道体】！</b>各属性+5%，突破主宰成功率+25%！`); } else if (_allMine && !S.faZeDone) { S.faZeDone = 1; log('warn', `☯️ <b>本命法则圆满！</b>${window.LG.benMingTxt(S)}！`); } afterAct(); save(); sheetTrain(); render(); } catch (e) { return _dfz0(el); } }; } catch (e) {}

async function doLu(k, n) {
  await srvProg('/api/progress/eat_lu', { k, n });
  const r = C.useLu(S, k, n); if (!r) return;
  log('good', `💧 服用 ${rarTxt('farm', k)} ×${r.n}，获得 ${r.pts} 点属性：${gainsTxt(r.gains)}`);
  commit(); sheetBag();
}
async function doSmash(n) {
  // v966 彻底版：登录在线时走服务端
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const resp = await MHXY.api('/api/roll/smash', {method:'POST', body:{n}});
      const j = resp && resp.json;
      if (resp.ok && j && j.ok) {
        if (!S.ores) S.ores = {};
        S.ores.sp5 = (S.ores.sp5|0) - j.n; if (S.ores.sp5 <= 0) delete S.ores.sp5;
        const got = {};
        for (const gg of (j.gains||[])) { S.ores[gg.k] = (S.ores[gg.k]|0) + gg.n; got[gg.k] = (got[gg.k]|0) + gg.n; }
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        log('gold', `🔨 砸开 ${rarTxt('mine', 'sp5')}${j.n > 1 ? ' ×' + j.n : ''}，得到 ` + ['sp1', 'sp2', 'sp3', 'sp4'].filter(k => got[k]).map(k => `${rarTxt('mine', k)}×${got[k]}`).join(' '));
        commit(); if (window._charPage) { sheetChar(); } else { sheetBag(); }
        return;
      }
      if (!resp.netErr) return; // 服务端已响应，不回落
    } catch(e) { /* 回落本地 */ }
  }
  const r = C.smashSpirit(S, n); if (!r) return;
  log('gold', `🔨 砸开 ${rarTxt('mine', 'sp5')}${r.n > 1 ? ' ×' + r.n : ''}，得到 ` + ['sp1', 'sp2', 'sp3', 'sp4'].filter(k => r.got[k]).map(k => `${rarTxt('mine', k)}×${r.got[k]}`).join(' '));
  commit(); if (window._charPage) { sheetChar(); } else { sheetBag(); }
}
async function doSpirit(k, n) {
  await srvProg('/api/progress/eat_spirit', { k, n });
  const r = C.useSpirit(S, k, n); if (!r) return;
  log('gold', `💠 服用 ${rarTxt('mine', k)} ×${r.n}，` + (r.xp ? `经验 <span class="g">+${r.xp}</span>（${S.xp}/${C.xpNeed(S.level)}）` : '灵力灌顶！') + lvUpTxt(r.ups));
  commit(); sheetBag();
}
const stTxt = ks => ks.map(k => `<span class="r">${C.STATUS[k].icon}${C.STATUS[k].name}</span>`).join('、');
function afterAct() { // 行动后：中毒掉生命、死亡结算、饥饿灵宠咬人
  const pl = C.takePoisonLoss(); if (pl && !S.dead) { const left = C.leftBeforeDeath(S, 'poison'); const hpMaxL = C.bumpPeak(S) * 5, hpFullL = (S.attrs.str + S.attrs.def + S.attrs.vit) * 5, hpCurL = S.hpCur != null ? S.hpCur : hpFullL; log('bad', `☠️ 毒性发作，消耗体力伤及根本——生命 <span class="r">-${pl}</span>（当前 ${Math.floor(hpCurL)}/${hpMaxL}）。<b class="r">再消耗 ${left} 点体力将毒发身亡！</b>速用<b>解毒丹</b>解毒。`); }
  if (S.dead && !S.dead.logged) { S.dead.logged = true; const d = S.dead;
    log('bad', `☠️ <b class="r">${d.cause === 'poison' ? '剧毒攻心，你毒发倒地……' : '你流血过多，倒在了路边……'}</b>体力 ${d.lostSta} 点尽失，今日无法再行动。` + (d.lost && d.lost.length ? `<br>你晕倒时，路过的玩家顺手牵羊，拿走了 <b>${d.lost.map(l => lostName(l) + '×' + l.n).join(' ')}</b>。` : '') + `<br>明日签到即可复活（${d.cause === 'poison' ? `生命恢复一半，但毒仍未解` : '生命仅剩 1'}）。`); }
  if (S.protEvt) { const e = S.protEvt; S.protEvt = null; const total = e.lost.reduce((a, l) => a + l.n, 0);
    log('good', `🛡️ <b class="y">新人保护</b>：${e.cause === 'poison' ? '剧毒攻心' : '流血过多'}，你本应倒下——天道庇佑，免除本次死亡全部惩罚！<b>剩余 ${e.left} 次</b>。<br>本次免除：体力清零（${e.lostSta} 点）、背包丢失 ${total} 件${e.lost.length ? '（' + e.lost.map(l => lostName(l) + '×' + l.n).join(' ') + '）' : ''}、生命归零（${e.lostVit}→保留 1 点）。${e.cause === 'poison' ? '剧毒已解除' : '流血已止住'}，行事仍需小心。`); }
  if (S.dead) return;
  const e = C.afterAction(S);
  e.bites.forEach(b => log('bad', `🦷 ${petTag(b.pet)} 饿极了，<span class="r">狠狠咬了你一口</span>！生命 <span class="r">-${b.lost}</span>，灵宠饥饿 +${K.BITE_HUNGER}、忠诚 -${K.BITE_LOYAL}` + (b.st.length ? `，你陷入 ${stTxt(b.st)}` : '') + '。快喂它吃东西！'));
  let _encLocal = null; try { _encLocal = C.rollEncounter(S); if (_encLocal) log('sys', '🌀 <b class="y">奇遇降临</b>——顶部横幅等你处理。'); } catch(_) {} // v1013 奇遇触发
  try { // v1094 玩家奇遇：本地没触发时，低概率从全服投稿池抽一条（署名，模板效果；每日仍限 3 次）
    if (!_encLocal && !S.encPending && typeof MHXY !== 'undefined' && MHXY.loggedIn() && Math.random() < 0.03) {
      const _today = C.todayStr(), _ed = S.encDay;
      if (!_ed || _ed.d !== _today || (_ed.n | 0) < 3) {
        MHXY.api('/api/creator/encounter/random').then(function(r) {
          try {
            if (r.ok && r.json && r.json.ok && r.json.id && !S.encPending) {
              C.encRegister({ id: r.json.id, sc: 'any', text: r.json.text, opts: r.json.opts, by: r.json.by });
              S.encPending = r.json.id;
              if (!S.encDay || S.encDay.d !== _today) S.encDay = { d: _today, n: 0 };
              S.encDay.n++;
              log('sys', '🌀 <b class="y">奇遇降临</b>——顶部横幅等你处理。');
              render();
            }
          } catch(_) {}
        });
      }
    }
  } catch(_) {}
}

/* ---------- v1094 玩家创作：秘境 + 奇遇投稿 + 梦境回溯 ---------- */
function escDg(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
const DG_FEE_TIERS = [0, 10, 50, 100];
const DG_GUARD_NAMES = { easy: '弱', mid: '中', hard: '强' };
const ENC_FX_TEMPLATES = [
  { k: 'gold30', n: '金元 +30' }, { k: 'gold_20', n: '金元 -20' },
  { k: 'sta1', n: '体力 +1' }, { k: 'sta_1', n: '体力 -1' },
  { k: 'life10', n: '寿元 +10' }, { k: 'life_5', n: '寿元 -5' },
  { k: 'mana20', n: '法力 +20' }, { k: 'sp1', n: '下品灵石 +1' }, { k: 'none', n: '无事发生' },
];
/* --- 梦境回溯：三段拼模板（36 底景 × 12 梦中人 × 12 收尾）+ 16 组二选一 + 12 句谶语 --- */
const DREAM_SCENES = ['云海翻涌，脚下无路','一座旧宅，门扉半掩','断桥横在雾里，桥那头没有人','无字碑立在荒原上，碑面光滑如镜','月下长河，河水倒着流','古松之下，落了一地松针','残碑半截埋在土里，字迹被风磨平','雾中山门大开，门内空无一人','空殿里摆着一桌冷酒','枯井深处传来水声','雪夜无月，脚印只有一串','竹林深处，有人在吹一支短笛','荒冢前放着一束未谢的花','丹炉冷了，炉灰里埋着半颗丹','石阶九百九十九级，尽头是云','莲池无波，莲叶上停着一只白鹤','风铃挂在枯枝上，无风自响','一卷旧书摊在案上，缺了最后一页','寒潭如镜，潭底沉着一柄剑','飞瀑倒悬，水声却听不见','青铜门半开，门后透出微光','纸船顺着暗河漂，不沉也不停','万家灯火在脚下，唯独一盏是冷的','孤舟横在雾江上，舟上没有桨','霜桥结满了冰，桥下是空的','枯藤缠着一座石塔，塔顶有光','云梯垂落，梯级上全是旧脚印','沙洲上立着一面旗，旗面没有字','梅林深处，一树梅花开在雪里','古道尽头，有一间不点灯的客栈','石镜立在路边，镜里没有人影','灵田荒着，田埂上坐着一只白狐','废庙的空龛里，多了一炷冷香','星河低垂，星子一颗颗熄灭','雾桥通向对岸，对岸也是雾','寒宫的门开着，门内结着霜花'];
const DREAM_FIGURES = ['一位故人站在雾里，容颜如旧','灵宠蹲在路边，尾巴尖沾着露水','白衣人背对着你，望着远处','自己的声音从身后传来，叫你的名字','一名老道坐在石上，闭目不语','小童提着一盏灯，灯芯是冷的','影子先你一步，站在了前面','一只白鹤落在肩头，不肯飞走','陌生的女子立在桥头，手里捏着半片叶子','少年时的你坐在台阶上，低头数着石子','一位披蓑的老者，蓑衣上落满了雪','空无一人，只有一件旧衣挂在枝上'];
const DREAM_ENDINGS = ['醒来时，窗外正下着雨','梦散了，枕边多了一片叶子','再回头时，身后的路已经不见了','天光微亮，梦里的声音还在耳边','睁开眼，手心里攥着一缕凉气','梦醒了，那盏灯却还亮着','一声钟响，整座梦都碎了','醒来后，忽然想不起梦里那人的脸','梦的尽头，有人轻轻合上了门','晨光漫进来，梦里的雪化在了眉间','梦散时，耳边留下一句没听清的话','醒来时，屋里静得像什么都没发生过'];
const DREAM_CHOICES = [
  { a: '推门进去', b: '转身离开', ra: '门后空无一人，只有一桌冷茶。', rb: '身后的脚步声停了。', ka: 'xp', kb: 'mana' },
  { a: '接过那盏灯', b: '不接', ra: '灯芯一暖，照亮了来路。', rb: '灯灭了，路却还在。', ka: 'mana', kb: 'merit' },
  { a: '开口问一句', b: '只看不言', ra: '那人笑了笑，没有回答。', rb: '沉默里，雾散了一点。', ka: 'merit', kb: 'xp' },
  { a: '伸手去取', b: '收手后退', ra: '指尖触到一片凉意。', rb: '那东西自己落回了原处。', ka: 'luck', kb: 'mana' },
  { a: '跟上去', b: '站在原地', ra: '跟了三步，雾里没了人影。', rb: '原地等了一夜，天亮了。', ka: 'xp', kb: 'luck' },
  { a: '坐下来', b: '继续往前走', ra: '坐下后，心静了许多。', rb: '越往前走，风越轻。', ka: 'merit', kb: 'xp' },
  { a: '喊一声', b: '捂住耳朵', ra: '喊声在雾里转了个圈。', rb: '安静下来，听见了水声。', ka: 'mana', kb: 'merit' },
  { a: '把花留下', b: '把花带走', ra: '花留在冢前，开了一夜。', rb: '花带在怀里，香了一路。', ka: 'merit', kb: 'luck' },
  { a: '吹熄那盏灯', b: '添一炷香', ra: '灯灭了，影子回来了。', rb: '香烟笔直，升进云里。', ka: 'luck', kb: 'merit' },
  { a: '登上石阶', b: '绕开石阶', ra: '登到一半，云从脚下升起。', rb: '绕开后，路自己伸到了脚下。', ka: 'xp', kb: 'mana' },
  { a: '饮一口冷酒', b: '不碰那桌酒', ra: '酒入喉，凉意直达心底。', rb: '酒还在桌上，香气散了。', ka: 'mana', kb: 'xp' },
  { a: '推开青铜门', b: '敲三下门', ra: '门后是一间空屋。', rb: '门内传来一声叹息。', ka: 'luck', kb: 'merit' },
  { a: '拾起那片叶子', b: '任它飘走', ra: '叶子在掌心化成了一滴水。', rb: '叶子飘进雾里，不见了。', ka: 'merit', kb: 'xp' },
  { a: '向那人行礼', b: '转身就走', ra: '那人还了一礼，雾淡了。', rb: '走了几步，回头已无人。', ka: 'merit', kb: 'luck' },
  { a: '把剑拔出来', b: '不碰那柄剑', ra: '剑出鞘三寸，又自己归鞘。', rb: '剑沉在潭底，光未灭。', ka: 'xp', kb: 'mana' },
  { a: '睁开眼', b: '再睡一会儿', ra: '睁开眼，天已经亮了。', rb: '再睡一会儿，梦深了一层。', ka: 'luck', kb: 'xp' },
];
const DREAM_CHENYU = ['桥断处，路还在。','灯冷时，人未远。','镜中人，先你一步。','井水满时，月在井底。','雪落无声，门自开。','旧衣还在枝上。','云散后，山门自开。','那一页，始终是空的。','影子先回来了。','香冷了，龛还空着。','河倒流时，鱼往上游。','星熄处，路让出来了。'];
function dreamRng(seed) { let s = (seed >>> 0) || 1; return function() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function dreamCompose(seed) {
  let s = seed, out = null;
  for (let t = 0; t < 20; t++) {
    const r = dreamRng(s);
    const sc = DREAM_SCENES[Math.floor(r() * DREAM_SCENES.length)];
    const fg = DREAM_FIGURES[Math.floor(r() * DREAM_FIGURES.length)];
    const en = DREAM_ENDINGS[Math.floor(r() * DREAM_ENDINGS.length)];
    const ch = DREAM_CHOICES[Math.floor(r() * DREAM_CHOICES.length)];
    out = { key: sc + '|' + fg + '|' + en, text: sc + '。' + fg + '。' + en, ch: ch };
    if (out.key !== S.dreamLastKey) break;
    s++;
  }
  return out;
}
function dreamOpen() {
  const p = S.dreamPending; if (!p) { render(); return; }
  if (Date.now() - (p.createdAt || 0) > 86400000) { S.dreamPending = null; render(); return; }
  if (!p.parts) p.parts = dreamCompose(p.seed);
  const tierName = ['短梦', '长梦', '大梦'][p.tier] || '短梦';
  openSheet(`<h2>🌙 梦境回溯 · ${tierName}</h2><div class="scene">${escDg(p.parts.text)}</div><div class="hint">梦中抉择（没有对错，选完梦就醒）</div><div class="grid2"><button class="btn gold" data-dreamopt="0">${escDg(p.parts.ch.a)}</button><button class="btn gold" data-dreamopt="1">${escDg(p.parts.ch.b)}</button></div><div class="row"><button class="btn full" data-close>先不做这个梦（横幅留着）</button></div>`);
}
function doDreamOpt(i) {
  const p = S.dreamPending; if (!p || !p.parts) return;
  const ch = p.parts.ch, side = i === 0 ? 'a' : 'b', knob = side === 'a' ? ch.ka : ch.kb, res = side === 'a' ? ch.ra : ch.rb, tier = p.tier | 0;
  const perSec = 1 + C.maiLuo(S) + (((S.realm | 0) >= 8) ? (S.xianfuEnergy | 0) : (S.dongfuEnergy | 0));
  const secs = tier === 2 ? 900 : tier === 1 ? 480 : 180;
  let eff = '';
  try {
    if (knob === 'xp') { const n = perSec * secs; C.gainXp(S, n); eff = '修为 +' + n; }
    else if (knob === 'mana') { const n = perSec * secs; S.mana = Math.min(C.manaCapEff(S), S.mana + n); eff = '法力 +' + n; }
    else if (knob === 'merit') { const n = tier + 1; S.merit = (S.merit | 0) + n; eff = '功德 +' + n; }
    else { const v = [1.10, 1.15, 1.20][tier]; S.buff = { k: 'luck', v: v, left: K.BUFF_ACTS, src: '梦境' }; eff = '气运 ×' + v + '（' + K.BUFF_ACTS + ' 点体力）'; }
  } catch(_) {}
  log('good', '🌙 ' + res + (eff ? `<br><span class="g">${eff}</span>` : ''));
  try { // v1094 谶语：一成概率留一句进见闻，下次突破前雷云异象里再见（无加成）
    if (Math.random() < 0.10) {
      const line = DREAM_CHENYU[Math.floor(Math.random() * DREAM_CHENYU.length)];
      S.chenyuNext = line; S.chenyuLog = ((S.chenyuLog || []).concat([line])).slice(-20);
      log('sys', '🔮 梦里还留了一句话，已记入见闻。');
    }
  } catch(_) {}
  S.dreamDay = C.todayStr(); S.dreamLastKey = p.parts.key; S.dreamPending = null;
  try { commit(); } catch(_) {}
  closeSheet(); render();
}
/* --- 玩家秘境 --- */
function sheetDungeonList() {
  if (!MHXY.loggedIn()) { openSheet('<h2>🏰 玩家秘境</h2><div class="hint">先在联机面板登录，才能看别人的秘境、提交自己的。</div><div class="row"><button class="btn full" data-close>关闭</button></div>'); return; }
  openSheet('<h2>🏰 玩家秘境</h2><div class="hint">加载中…</div>');
  MHXY.api('/api/creator/dungeon/list').then(function(r) {
    try {
      if (!r.ok || !r.json || !r.json.ok) { openSheet('<h2>🏰 玩家秘境</h2><div class="hint">加载失败，稍后再试。</div><div class="row"><button class="btn full" data-close>关闭</button></div>'); return; }
      const list = r.json.list || [];
      let h = '<h2>🏰 玩家秘境</h2><div class="hint">别人做的 6×6 秘境：闯关费 70% 归作者。通关率与评分全服可见。</div>';
      h += '<div class="grid2"><button class="btn gold full" data-dungeoneditor>✏️ 我要做秘境</button><button class="btn full" data-dungeonmine>📜 我的秘境</button></div>';
      if (!list.length) h += '<div class="hint">还没有通过审核的秘境。你可以做第一个。</div>';
      list.forEach(function(dg) {
        const rate = dg.attempts ? Math.round(dg.clears / dg.attempts * 100) + '%' : '—';
        const stars = dg.ratings ? (dg.avgStars || 0).toFixed(1) + '★（' + dg.ratings + '评）' : '暂无评分';
        h += `<div class="row"><div class="lab">🏰 ${escDg(dg.title)}<small>作者 ${escDg(dg.author)} · 闯关费 ${dg.fee} 金元 · 通关率 ${rate} · ${stars}</small></div><button class="btn gold" data-dungeonenter="${dg.id}">进入</button></div>`;
      });
      h += '<div class="row"><button class="btn full" data-close>关闭</button></div>';
      openSheet(h);
    } catch(_) {}
  });
}
function dgNewEdit() {
  const tiles = [];
  for (let y = 0; y < 6; y++) { const row = []; for (let x = 0; x < 6; x++) row.push({ t: 'empty' }); tiles.push(row); }
  tiles[5][0] = { t: 'start' }; tiles[0][5] = { t: 'exit' };
  return { title: '', fee: 0, paint: 'fight', sel: null, tiles: tiles };
}
function sheetDungeonEditor() {
  if (!MHXY.loggedIn()) { openSheet('<h2>✏️ 做秘境</h2><div class="hint">先在联机面板登录。</div><div class="row"><button class="btn full" data-close>关闭</button></div>'); return; }
  const ed = window._dgEdit || (window._dgEdit = dgNewEdit());
  const DG_ICONS = { start: '🚶', exit: '🚪', empty: '⬜', fight: '⚔️', gchest: '🎁', gherb: '🌿', event: '📜', rest: '⛺' };
  const DG_NAMES = { empty: '空', fight: '守怪', gchest: '宝箱', gherb: '灵草', event: '事件', rest: '休息' };
  let cells = '';
  for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) {
    const c = ed.tiles[y][x], sel = ed.sel && ed.sel[0] === x && ed.sel[1] === y;
    const fixed = c.t === 'start' || c.t === 'exit';
    cells += fixed ? `<div class="acell" style="border:1px solid #b8860b">${DG_ICONS[c.t]}</div>`
      : `<button class="acell${sel ? ' gold' : ''}" data-dgsel="${x},${y}" data-dgpaint="${x},${y}">${DG_ICONS[c.t]}</button>`;
  }
  let combat = 0, evs = 0;
  ed.tiles.forEach(row => row.forEach(c => { if (c.t === 'fight' || c.t === 'gchest' || c.t === 'gherb') combat++; if (c.t === 'event') evs++; }));
  let detail = '<div class="hint">点格子涂色（左下起点、右上终点固定）。</div>';
  if (ed.sel) {
    const c = ed.tiles[ed.sel[1]][ed.sel[0]];
    if (c.t === 'fight' || c.t === 'gchest' || c.t === 'gherb') {
      detail = `<div class="row"><div class="lab">守怪强度：${DG_GUARD_NAMES[c.guard] || '中'}</div><button class="btn" data-dgguard="easy">弱</button><button class="btn" data-dgguard="mid">中</button><button class="btn" data-dgguard="hard">强</button></div>`;
      if (c.t === 'gchest') detail += `<div class="row"><div class="lab">宝箱档次：${c.chest === 'fine' ? '精致（+1 株灵草）' : '普通'}</div><button class="btn" data-dgchest="normal">普通</button><button class="btn" data-dgchest="fine">精致</button></div>`;
    } else if (c.t === 'event') {
      detail = `<div class="row" style="display:flex;gap:6px"><input id="dgEvTxt" maxlength="40" placeholder="事件格一句文本（≤40 字）" value="${escDg(c.text || '')}" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><button class="btn gold" data-dgeventsave>保存文本</button></div>`;
    } else detail = `<div class="hint">当前格：${DG_NAMES[c.t] || ''}。</div>`;
  }
  openSheet(`<h2>✏️ 做秘境</h2><div class="hint">6×6 编辑器：摆图、选守怪档、宝箱档、事件格写一句文本。数值与概率永远由系统定，玩家只定名字、文本、组合。提交后等 GM 审核，通过全服可选。</div>`
    + `<div class="row" style="display:flex;gap:6px"><input id="dgTitle" maxlength="20" placeholder="秘境名（≤20 字）" value="${escDg(ed.title)}" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>`
    + `<div class="row"><div class="lab">闯关费：${ed.fee} 金元（70% 归你）</div>${DG_FEE_TIERS.map(f => `<button class="btn${ed.fee === f ? ' gold' : ''}" data-dgfee="${f}">${f}</button>`).join('')}</div>`
    + `<div class="row"><div class="lab">画笔：${DG_NAMES[ed.paint]}</div><button class="btn${ed.paint === 'fight' ? ' gold' : ''}" data-dgpainttype="fight">⚔️守怪</button><button class="btn${ed.paint === 'gchest' ? ' gold' : ''}" data-dgpainttype="gchest">🎁宝箱</button><button class="btn${ed.paint === 'gherb' ? ' gold' : ''}" data-dgpainttype="gherb">🌿灵草</button><button class="btn${ed.paint === 'event' ? ' gold' : ''}" data-dgpainttype="event">📜事件</button><button class="btn${ed.paint === 'rest' ? ' gold' : ''}" data-dgpainttype="rest">⛺休息</button><button class="btn${ed.paint === 'empty' ? ' gold' : ''}" data-dgpainttype="empty">⬜擦除</button></div>`
    + `<div class="agrid">${cells}</div>`
    + `<div class="hint">战斗格 ${combat}（至少 3）· 事件格 ${evs}（至多 8）</div>` + detail
    + `<div class="grid2"><button class="btn gold" data-dgsubmit>提交审核</button><button class="btn" data-dgclear>清空重画</button></div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
}
function dgPaintCell(x, y) {
  const ed = window._dgEdit; if (!ed) return;
  const c = ed.tiles[y][x]; if (c.t === 'start' || c.t === 'exit') return;
  const p = ed.paint;
  if (p === 'fight') ed.tiles[y][x] = { t: 'fight', guard: 'mid' };
  else if (p === 'gchest') ed.tiles[y][x] = { t: 'gchest', guard: 'mid', chest: 'normal' };
  else if (p === 'gherb') ed.tiles[y][x] = { t: 'gherb', guard: 'mid' };
  else if (p === 'event') ed.tiles[y][x] = { t: 'event', text: '' };
  else if (p === 'rest') ed.tiles[y][x] = { t: 'rest' };
  else ed.tiles[y][x] = { t: 'empty' };
  ed.sel = [x, y];
}
function doDungeonSubmit() {
  const ed = window._dgEdit; if (!ed) return;
  const titleEl = document.getElementById('dgTitle'); if (titleEl) ed.title = titleEl.value.trim();
  if (!ed.title) { toastLog('sys', '先给秘境起个名字'); return; }
  let combat = 0, evs = 0, badEv = false;
  ed.tiles.forEach(row => row.forEach(c => { if (c.t === 'fight' || c.t === 'gchest' || c.t === 'gherb') combat++; if (c.t === 'event') { evs++; if (!c.text || !c.text.trim()) badEv = true; } }));
  if (combat < 3) { toastLog('sys', '战斗格至少 3 格（守怪/宝箱/灵草都算）'); return; }
  if (evs > 8) { toastLog('sys', '事件格至多 8 格'); return; }
  if (badEv) { toastLog('sys', '每个事件格都要写一句文本'); return; }
  MHXY.api('/api/creator/dungeon/submit', { method: 'POST', body: { title: ed.title, fee: ed.fee, grid: { tiles: ed.tiles } } }).then(function(r) {
    if (r.ok && r.json && r.json.ok) { window._dgEdit = null; toastLog('sys', '秘境已提交，等 GM 审核'); sheetDungeonMine(); }
    else toastLog('sys', '提交失败：' + ((r.json && r.json.error) || '网络不通'));
  });
}
function sheetDungeonMine() {
  if (!MHXY.loggedIn()) { openSheet('<h2>📜 我的秘境</h2><div class="hint">先在联机面板登录。</div><div class="row"><button class="btn full" data-close>关闭</button></div>'); return; }
  openSheet('<h2>📜 我的秘境</h2><div class="hint">加载中…</div>');
  MHXY.api('/api/creator/dungeon/mine').then(function(r) {
    try {
      const list = (r.ok && r.json && r.json.ok) ? (r.json.list || []) : [];
      const stName = { pending: '待审核', approved: '已通过', rejected: '未通过' };
      let h = '<h2>📜 我的秘境</h2><div class="hint">每人最多 3 个待审+已通过。</div>';
      if (!list.length) h += '<div class="hint">你还没有提交过秘境。</div>';
      list.forEach(function(dg) {
        const rate = dg.attempts ? Math.round(dg.clears / dg.attempts * 100) + '%' : '—';
        h += `<div class="row"><div class="lab">🏰 ${escDg(dg.title)}<small>${stName[dg.status] || dg.status} · 费 ${dg.fee} · 闯 ${dg.attempts} · 通关 ${dg.clears}（${rate}）</small></div></div>`;
      });
      h += '<div class="grid2"><button class="btn gold full" data-dungeoneditor>✏️ 再做一个</button><button class="btn full" data-close>关闭</button></div>';
      openSheet(h);
    } catch(_) {}
  });
}
function doDungeonEnter(id) {
  if (S.run) { toastLog('sys', '先结束当前冒险再进秘境'); return; }
  if ((S.stamina | 0) < 1) { toastLog('sys', '体力不足（进秘境要 1 点体力）'); return; }
  MHXY.api('/api/creator/dungeon/enter', { method: 'POST', body: { id: id } }).then(function(r) {
    try {
      if (!r.ok || !r.json || !r.json.ok) { toastLog('sys', '进入失败：' + ((r.json && r.json.error) || '网络不通')); return; }
      const j = r.json;
      const tiles = j.grid.tiles.map(function(row) { return row.map(function(c) { return { t: c.t, guard: c.guard, chest: c.chest, text: c.text, seen: 0 }; }); });
      S.run = { dk: 'mid', step: 1, steps: 999, seen: [], rew: { pts: 0, gains: {}, gold: 0, xp: 0, items: {}, lvUp: 0, wins: 0 }, last: [], grid: { w: 6, h: 6, tiles: tiles, px: 0, py: 5, ex: 5, ey: 0, moves: 0 }, evCount: 0, ev: null, dungeon: { id: j.id, runId: j.runId, title: j.title, by: j.by, fee: j.fee } };
      S.stamina = Math.max(0, (S.stamina | 0) - 1);
      commit(); sheetRun();
    } catch(_) {}
  });
}
function doDungeonClear() {
  const run = S.run; if (!run || !run.dungeon) return;
  MHXY.api('/api/creator/dungeon/clear', { method: 'POST', body: { runId: run.dungeon.runId } }).then(function(r) {
    try {
      if (!r.ok || !r.json || !r.json.ok) { toastLog('sys', '通关未记上（网络不通），走出去再走回来可重试'); sheetRun(); return; }
      S._lastDungeonId = run.dungeon.id;
      const sum = C.advEnd(S, 'dungeon');
      commit();
      openSheet(`<h2>🏰 通关！</h2><div class="scene">${escDg(run.dungeon.title)}——你走到了终点。</div><div class="hint">走了 ${sum.steps} 格 · 触发 ${sum.total} 事件。给这个秘境打个分：</div><div class="grid2">${[1, 2, 3, 4, 5].map(n => `<button class="btn${n >= 4 ? ' gold' : ''}" data-dungeonrate="${n}">${n}★</button>`).join('')}</div><div class="row"><button class="btn full" data-close>关闭</button></div>`);
    } catch(_) {}
  });
}
/* --- 奇遇投稿 --- */
function sheetEncSubmit() {
  if (!MHXY.loggedIn()) { openSheet('<h2>🌀 奇遇投稿</h2><div class="hint">先在联机面板登录。</div><div class="row"><button class="btn full" data-close>关闭</button></div>'); return; }
  openSheet('<h2>🌀 奇遇投稿</h2><div class="hint">加载中…</div>');
  MHXY.api('/api/creator/encounter/mine').then(function(r) {
    try {
      const list = (r.ok && r.json && r.json.ok) ? (r.json.list || []) : [];
      const stName = { pending: '待审核', approved: '已通过（全服奇遇池）', rejected: '未通过' };
      const fxOpts = ENC_FX_TEMPLATES.map(f => `<option value="${f.k}">${f.n}</option>`).join('');
      let h = '<h2>🌀 奇遇投稿</h2><div class="hint">一句话 + 两个选项，结果类型从模板里选（数值永远由系统定）。通过审核后进全服奇遇池，署名跟着走。每人一个待审，提交新的会覆盖旧的。</div>';
      h += `<div class="row" style="display:flex;gap:6px"><input id="encTxt" maxlength="100" placeholder="奇遇正文（≤100 字）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>`
        + `<div class="row" style="display:flex;gap:6px"><input id="encA" maxlength="20" placeholder="选项一（≤20 字）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><select id="encAFx" style="padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">${fxOpts}</select></div>`
        + `<div class="row" style="display:flex;gap:6px"><input id="encAMsg" maxlength="60" placeholder="选项一结果话（≤60 字）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>`
        + `<div class="row" style="display:flex;gap:6px"><input id="encB" maxlength="20" placeholder="选项二（≤20 字）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><select id="encBFx" style="padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">${fxOpts}</select></div>`
        + `<div class="row" style="display:flex;gap:6px"><input id="encBMsg" maxlength="60" placeholder="选项二结果话（≤60 字）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>`
        + `<div class="grid2"><button class="btn gold" data-encsubmit>提交审核</button><button class="btn" data-close>关闭</button></div>`;
      if (list.length) {
        h += '<h3 style="margin:8px 0 2px">我的投稿</h3>';
        list.forEach(function(e) { h += `<div class="row"><div class="lab">🌀 ${escDg(e.text)}<small>${stName[e.status] || e.status}</small></div></div>`; });
      }
      openSheet(h);
    } catch(_) {}
  });
}
function doEncSubmit() {
  const gv = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const text = gv('encTxt'), a = gv('encA'), b = gv('encB'), aMsg = gv('encAMsg'), bMsg = gv('encBMsg');
  const aFx = gv('encAFx'), bFx = gv('encBFx');
  if (!text || !a || !b || !aMsg || !bMsg) { toastLog('sys', '正文、两个选项、两句结果话都要填'); return; }
  MHXY.api('/api/creator/encounter/submit', { method: 'POST', body: { text: text, optA: { t: a, fx: aFx, msg: aMsg }, optB: { t: b, fx: bFx, msg: bMsg } } }).then(function(r) {
    if (r.ok && r.json && r.json.ok) { toastLog('sys', '奇遇已提交，等 GM 审核'); sheetEncSubmit(); }
    else toastLog('sys', '提交失败：' + ((r.json && r.json.error) || '网络不通'));
  });
}
window.sheetDungeonList = sheetDungeonList;
window.sheetDungeonEditor = sheetDungeonEditor;
window.sheetDungeonMine = sheetDungeonMine;
window.sheetEncSubmit = sheetEncSubmit;

/* ---------- v1015 见闻录 ---------- */
function encCodexHtml() {
  const seen = S.encSeen || {};
  const list = C.ENCOUNTERS || [];
  const got = list.filter(e => seen[e.id]).length;
  const scName = { any: '通用', train: '修炼', life: '生活', move: '行路', brew: '炼丹', retreat: '闭关', chain: '连环' };
  let h = '<h3 style="margin:2px 0 6px">🌀 见闻录</h3>';
  h += `<div class="hint">已历 ${got} / ${list.length} · 累计触发 ${(S.encTotal|0)} 次${(S.encChain|0) ? ' · 走完奇遇链 ' + (S.encChain|0) + ' 条' : ''}${(S.encBad|0) ? ' · 遭逢坏奇遇 ' + (S.encBad|0) + ' 次' : ''}</div>`;
  h += list.map(e => seen[e.id]
    ? `<div class="row"><div class="lab">🌀 ${e.text}<small>${scName[e.sc] || ''} · 已历</small></div></div>`
    : `<div class="row"><div class="lab" style="opacity:.5">？？？<small>${scName[e.sc] || ''} · 未历</small></div></div>`).join('');
  if (S.chenyuLog && S.chenyuLog.length) { h += '<h3 style="margin:8px 0 2px">🔮 梦中谶语</h3>' + S.chenyuLog.map(l => `<div class="row"><div class="lab">🔮 ${escDg(l)}<small>梦里留的话 · 只是眼熟</small></div></div>`).join(''); }
  return h;
}
/* ---------- v1015 成就称号 ---------- */
function achTitleName() { const a = ACHIEVEMENTS.find(x => x.id === S.titleAch); return a ? a.name : ''; }
function achHtml() {
  const worn = S.titleAch || '';
  let h = '<h3 style="margin:2px 0 6px">🏆 成就</h3>';
  h += `<div class="hint">${worn ? '当前称号：【' + achTitleName() + '】' : '尚未佩戴称号'} · 已解锁 ${ACHIEVEMENTS.filter(a => S.achv && S.achv[a.id]).length} / ${ACHIEVEMENTS.length}</div>`;
  h += ACHIEVEMENTS.map(a => { const got = !!(S.achv && S.achv[a.id]); return `<div class="row"><div class="lab">${got ? '🏆' : '🔒'} ${a.name}<small>${a.desc}</small></div>${got ? (worn === a.id ? '<span class="y">佩戴中</span>' : `<button class="btn sm" data-wearach="${a.id}">佩戴</button>`) : ''}</div>`; }).join('');
  if (worn) h += '<div class="row"><button class="btn full" data-wearach="">摘下称号</button></div>';
  return h;
}
/* ---------- v1015 渡劫观礼 ---------- */
function worldAnnounce(kind) {
  try {
    if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn()) return;
    const nm = String(S.name || '无名').replace(/[|#【】〔〕]/g, '');
    const rn = (C.REALMS && C.REALMS[S.realm|0]) || ('第' + ((S.realm|0) + 1) + '境');
    const evt = Date.now().toString(36);
    let txt;
    if (kind === 'trib') txt = `⚡【观礼#${evt}|${nm}|${rn}|渡劫】${nm} 渡劫功成，晋入${rn}！`;
    else if (kind === 'id') txt = `🎖️ ${nm} 声望日隆，晋身【${ID_TIERS[idTier()].name}】！`;
    else if (kind === 'merit') txt = `🌈 ${nm} 功德护身，安然渡过大劫！`;
    else txt = `✨【观礼#${evt}|${nm}|${rn}|突破】${nm} 突破成功，晋入${rn}！`;
    MHXY.api('/api/chat/send', { method: 'POST', body: { text: txt.slice(0, 200), realm: S.realm|0 } }).catch(() => {});
  } catch(_) {}
}
function obsWatch() {
  if (typeof S === 'undefined' || !S) return;
  try { meritSettleCheck(); } catch(_) {}
  if (S._obsBt === undefined) { S._obsBt = S.btTotal|0; S._obsTrib = S.tribWin|0; }
  else {
    const bt = S.btTotal|0, tw = S.tribWin|0;
    if (tw > (S._obsTrib|0)) { S._obsTrib = tw; S._obsBt = bt; worldAnnounce('trib'); }
    else if (bt > (S._obsBt|0)) { S._obsBt = bt; if ((S.realm|0) >= 1) worldAnnounce('bt'); }
  }
  if (!window._famePoolFetched && window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) { window._famePoolFetched = 1; try { MHXY.api('/api/stele/fame-pool').then(r => { if (r && r.json && r.json.list) window._famePool = r.json.list; }).catch(() => {}); } catch(_) {} }
}

// ===== v1015 身份线 / 功德大劫 / 灵宠开口 / 红包 =====
const ID_TIERS = [
  { name: '散修', need: 0, ci: 0, mj: 0, spec: 0 },
  { name: '客卿', need: 60, ci: 2, mj: 0, spec: 0 },
  { name: '供奉', need: 240, ci: 4, mj: 1, spec: 1 },
  { name: '长老', need: 700, ci: 7, mj: 1, spec: 2 },
  { name: '太上长老', need: 1800, ci: 10, mj: 2, spec: 2 }
];
function idTier() { let t = 0; for (let i = 0; i < ID_TIERS.length; i++) if ((S.fame|0) >= ID_TIERS[i].need) t = i; return t; }
window.addFame = function(n, why) {
  const before = idTier();
  S.fame = Math.max(0, (S.fame|0) + n);
  if (why && n > 0) log('good', `🌟 声望 <span class="y">+${n}</span>（${why}，当前 ${S.fame}）`);
  const now = idTier();
  if (now > before) { log('gold', `🎖️ 身份晋升：<b class="y">${ID_TIERS[now].name}</b>！特权已生效（个人面板「身份」页）`); try { worldAnnounce('id'); } catch(_){} }
};
function idnHtml() {
  const t = idTier(), cur = ID_TIERS[t], nx = ID_TIERS[t + 1];
  let h = `<div class="hint">这一世是个什么人——声望攒身份，身份给特权。声望来源：签到 +1 · 突破 +8 · 观礼 +3 · 奇遇 +1（走完链 +5）· 放生 +2 · 发红包 +1。</div>`;
  h += `<div class="row"><div class="lab">🎖️ 当前身份<small>声望 ${S.fame|0}</small></div><b class="y" style="font-size:16px">${cur.name}</b></div>`;
  h += `<div class="row"><div class="lab">现行特权<small>签到体力 +${cur.ci} · 秘境每日 +${cur.mj} 次 · 观礼体力 +${cur.spec}</small></div></div>`;
  if (nx) { const pctv = Math.max(0, Math.min(100, Math.floor(((S.fame|0) - cur.need) / (nx.need - cur.need) * 100))); h += `<div class="row"><div class="lab">下一身份：${nx.name}<small>还差 ${nx.need - (S.fame|0)} 声望</small></div><div style="flex:1;margin-left:8px;background:#222;border-radius:4px;height:8px"><div style="width:${pctv}%;height:8px;border-radius:4px;background:var(--gold)"></div></div></div>`; }
  else h += `<div class="hint" style="text-align:center">已是人间绝顶。</div>`;
  h += ID_TIERS.map((x, i) => `<div class="row"><div class="lab">${i <= t ? '🎖️' : '🔒'} ${x.name}<small>声望 ${x.need}+ · 签到 +${x.ci} · 秘境 +${x.mj} · 观礼 +${x.spec}</small></div>${i === t ? '<span class="y">当前</span>' : ''}</div>`).join('');
  return h;
}
const MERIT_EPOCH = 1767225600000, MERIT_CYCLE_MS = 30 * 86400000;
function meritCycleIdx() { return Math.floor((Date.now() - MERIT_EPOCH) / MERIT_CYCLE_MS); }
function meritDaysLeft() { const el = Date.now() - MERIT_EPOCH; return 30 - Math.floor((el % MERIT_CYCLE_MS) / 86400000); }
function meritSettleCheck() {
  if ((S.realm|0) < 6) return;
  const ci = meritCycleIdx();
  if ((S.meritCycle|0) < 0) { S.meritCycle = ci; return; }
  if (S.meritCycle < ci) {
    const m = S.merit|0;
    if (m >= 100) { S.stamina = (S.stamina|0) + 50; S.xianyu = (S.xianyu|0) + 2; log('gold', `🌈 <b>大劫已过！</b>功德 ${m} 护身，天道赐福：体力 +50、仙玉 +2。功德耗去一半（余 ${Math.floor(m / 2)}）。`); try { worldAnnounce('merit'); } catch(_){} try { meritBlessClaim(S.xianyu|0); } catch(_){} }
    else { const loss = Math.max(1, Math.floor((S.lifespan || 0) * 0.05)); S.lifespan = Math.max(0, (S.lifespan || 0) - loss); log('bad', `🌩️ <b>大劫降临！</b>功德不足（${m}/100），劫火焚身：寿元 -${loss} 年。功德耗去一半（余 ${Math.floor(m / 2)}）。`); }
    S.merit = Math.floor(m / 2); S.meritCycle = ci;
  }
  if (meritDaysLeft() <= 3 && S.meritWarn !== ci) { S.meritWarn = ci; log('bad', `🌩️ 天象示警：<b>大劫 ${meritDaysLeft()} 天后降临</b>，功德 ≥100 方可安然渡过（当前 ${S.merit|0}）。`); }
}
// v1124 大劫赐福的仙玉 +2 走服务端发放：本地先加（离线照常显示），登录时向服务端报到，
// 服务端把 +2 直接写进云存档（只靠本地上传会被只减不增守卫砍掉），再按回执对齐同步基线与余额。
function meritBlessClaim(settledXianyu) {
  try {
    if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn() || !MHXY.api) return;
    MHXY.api('/api/merit/bless', { method: 'POST', body: {} }).then(function(r) {
      try {
        if (!r || !r.ok || !r.json || !r.json.ok) return;
        if (r.json.rev) { try { if (typeof MHXY.setBaseRev === 'function') MHXY.setBaseRev(r.json.rev); } catch(_) {} }
        if (typeof r.json.xianyu === 'number' && (S.xianyu|0) === settledXianyu && r.json.xianyu !== settledXianyu) { S.xianyu = r.json.xianyu; try { save(); } catch(_) {} }
      } catch(_) {}
    }).catch(function() {});
  } catch(_) {}
}
const PET_TALK = {
  fox: { greet: ['这把稳了，我鼻子灵。', '别怕，我跑得比他们都快。', '有好吃的记得分我。'], battle: ['咬他！……我先上！', '看我身法，嘿！', '别小看狐狸。'], feed: ['唔……这个香！', '就一口？再来一口嘛。', '你最好了。'], lvup: ['尾巴都更有光泽了！', '感觉能多咬两口了。', '哼哼，变强了。'], enc: ['等等，我闻到点什么……', '那边好像有动静。', '直觉告诉我，选稳妥的。'] },
  turtle: { greet: ['……慢工出细活。', '我在，我就在。', '不急，不急。'], battle: ['站我身后。', '壳硬，命也硬。', '顶得住。'], feed: ['……嗯，存着慢慢吃。', '多谢。', '吃饱了，壳更亮了。'], lvup: ['又厚了一层。', '岁月，是我的铠甲。', '稳。'], enc: ['且看看，再走。', '听风。', '莫慌。'] },
  zhuque: { greet: ['哼，本座醒了。', '羽毛都梳理好了，开打吧。', '别拖后腿。'], battle: ['烧成灰！', '这点场面？', '火焰会说话。'], feed: ['勉强……再来一份。', '味道配得上本座。', '哼，赏你的笑。'], lvup: ['火焰更纯了。', '重生之火，愈燃愈烈。', '很好。'], enc: ['有意思。', '本座倒要看看。', '小心火星。'] },
  qinglong: { greet: ['云从龙，我来了。', '今日宜出行。', '我在云端看着你们。'], battle: ['龙息所至，退避！', '莫慌，我护着你。', '且看这一击。'], feed: ['甘之如饴。', '多谢款待。', '这味道，有灵气。'], lvup: ['龙吟更盛了。', '行云布雨，指日可待。', '善。'], enc: ['风云有变。', '我感应到了。', '顺其自然。'] },
  baihu: { greet: ['吼。（我在）', '爪子痒了。', '走。'], battle: ['撕碎它！', '我的！', '别抢我的猎物。'], feed: ['肉！……我是说，多谢。', '够劲。', '下次还要。'], lvup: ['爪子更利了。', '吼！', '再来强的。'], enc: ['有杀气。', '我先探。', '跟紧。'] }
};
function petSay(kind, chance) {
  try {
    const aps = C.activePets(S); if (!aps || !aps.length) return;
    if (Math.random() > (chance == null ? 0.4 : chance)) return;
    const pt = aps[0]; const T = PET_TALK[pt.k]; if (!T) return;
    const lines = T[kind] || T.greet; if (!lines || !lines.length) return;
    log('sys', `${PETS[pt.k].icon} <b>${esc(pt.name || PETS[pt.k].name)}</b>：『${lines[Math.floor(Math.random() * lines.length)]}』`);
  } catch(_) {}
}
const RP_KINDS = { // v1044 图标全用老图：红包本体一律 🧧，货币用各自老图标（灵石：下🌒/中🌗/上💎/极品💠，与背包灵石老图一致）
  gold: { name: '金元红包', icon: '🧧', cur: '🪙', costTxt: '1 金元' },
  sp2: { name: '下品灵石红包', icon: '🧧', cur: '🌒', costTxt: '1 下品灵石' },
  sp3: { name: '中品灵石红包', icon: '🧧', cur: '🌗', costTxt: '1 中品灵石' },
  sp4: { name: '上品灵石红包', icon: '🧧', cur: '💎', costTxt: '1 上品灵石' },
  sp5: { name: '极品灵石红包', icon: '🧧', cur: '💠', costTxt: '1 极品灵石' },
  xy: { name: '仙玉红包', icon: '🧧', cur: '<svg viewBox="0 0 24 28" width="13" height="15" style="vertical-align:-2px"><path d="M12 1C7 1 3 5 3 10c0 2.8 1.3 5.3 3.3 6.9l-2.5 6.5c-.4 1 .9 1.9 1.7 1.2l2-1.9c.5.1 1 .2 1.5.2 1.5 0 2.9-.4 4.1-1C9.5 21.3 7 18.5 7 15c0-1 .3-1.9.7-2.7C9.3 14.5 12 16 12 16s5-2.5 5-8c0-4-2.2-6.4-5-7zm0 4.5c1.4 0 2.5 1.1 2.5 2.5S13.4 10.5 12 10.5 9.5 9.4 9.5 8 10.6 5.5 12 5.5z" fill="#8fd8a8" stroke="#5aa87e" stroke-width="1"/></svg>', costTxt: '1 仙玉' } // 仙玉老图=MAGATAMA勾玉（与全站统一，禁用🔮）
};
function rpCount(k) { return (S.redPackets && S.redPackets[k]) | 0; }
function rpAfford(k) { return k === 'gold' ? (S.gold|0) >= 1 : k === 'xy' ? (S.xianyu|0) >= 1 : ((S.ores || {})[k]|0) >= 1; }
function rpShopHtml() { return Object.keys(RP_KINDS).map(k => { const it = RP_KINDS[k]; return `<div class="row"><div class="lab">${it.icon} ${it.name} <span class="tag">${it.cur} ${it.costTxt}</span><small>拥有 ${rpCount(k)} 张皮 · 发放时放入对应货币（≥100），去真人世界频道发</small></div><button class="btn" data-rpbuy="${k}" ${rpAfford(k) ? '' : 'disabled'}>买 1</button></div>`; }).join(''); }
function doRpBuy(k) {
  const it = RP_KINDS[k]; if (!it) return;
  if (!rpAfford(k)) { toastLog('bad', '不足，买不了这个红包'); return; }
  if (k === 'gold') S.gold -= 1; else if (k === 'xy') S.xianyu -= 1; else { S.ores[k] -= 1; if (!S.ores[k]) delete S.ores[k]; }
  S.redPackets = S.redPackets || {}; S.redPackets[k] = rpCount(k) + 1;
  log('good', `🧧 买入 ${it.cur} ${it.name} ×1（现有 ${S.redPackets[k]} 个，去真人世界频道发）`);
  commit(); sheetShop();
}
function rpBalance(k) { return k === 'gold' ? (S.gold|0) : k === 'xy' ? (S.xianyu|0) : ((S.ores || {})[k]|0); }
function rpDeduct(k, n) { if (k === 'gold') S.gold -= n; else if (k === 'xy') S.xianyu -= n; else { S.ores = S.ores || {}; S.ores[k] -= n; if (!S.ores[k]) delete S.ores[k]; } }
function poolRefreshTxt() {
  const el = document.getElementById('poolTxt'); if (!el) return;
  if (!window.MHXY || !MHXY.api) { el.textContent = '未连接真人联机'; return; }
  MHXY.api('/api/pool').then(r => { const j = r && r.json; const e2 = document.getElementById('poolTxt'); if (!e2) return; if (j && j.ok && j.pool) { e2.textContent = Object.keys(RP_KINDS).map(k => RP_KINDS[k].name.replace('红包', '') + ' ' + (j.pool[k]|0)).join(' · ') + (j.stable === false ? ' · ⚠️ 灵气不稳' : ''); } else e2.textContent = '天道池尚未开设（等后端）'; }).catch(() => { const e2 = document.getElementById('poolTxt'); if (e2) e2.textContent = '读取失败'; });
}
function poolChatTxt(){
  const el = document.getElementById('poolChatTxt'); if (!el) return;
  if (!window.MHXY || !MHXY.api) { el.textContent = '未连接真人联机'; return; }
  MHXY.api('/api/pool').then(r => { const j = r && r.json; const e2 = document.getElementById('poolChatTxt'); if (!e2) return; if (j && j.ok && j.pool) { e2.textContent = Object.keys(RP_KINDS).map(k => RP_KINDS[k].name.replace('红包', '') + ' ' + Math.floor(Number(j.pool[k]) || 0)).join(' · ') + (j.stable === false ? ' ⚠️灵气不稳' : ''); } });
}
function poolMenuTxt(){
  const el = document.getElementById('poolMenuTxt'); if (!el) return;
  if (!window.MHXY || !MHXY.api) { el.textContent = '未连接真人联机'; return; }
  MHXY.api('/api/pool').then(r => { const j = r && r.json; const e2 = document.getElementById('poolMenuTxt'); if (!e2) return; if (j && j.ok && j.pool) { e2.textContent = Object.keys(RP_KINDS).map(k => RP_KINDS[k].name.replace('红包', '') + ' ' + Math.floor(Number(j.pool[k]) || 0)).join(' · ') + (j.stable === false ? ' ⚠️灵气不稳' : ''); } });
}
function sheetPool(){
  openSheet('<h2>🏦 天道池</h2><div class="hint">全服共有的灵气池：红包过期余量、玩家捐献都会进池；池子亏空过深时灵气不稳。</div><div id="poolViewBody"><div class="hint">读取中…</div></div><div class="row"><button class="btn sm" data-poolview>刷新</button><button class="btn full" data-close>关闭</button></div>');
  if (!window.MHXY || !MHXY.api) { const b = document.getElementById('poolViewBody'); if (b) b.innerHTML = '<div class="hint">未连接真人联机</div>'; return; }
  MHXY.api('/api/pool').then(r => {
    const b = document.getElementById('poolViewBody'); if (!b) return;
    const j = r && r.json;
    if (!(j && j.ok && j.pool)) { b.innerHTML = '<div class="hint">读取失败，点刷新重试</div>'; return; }
    let h = Object.keys(RP_KINDS).map(k => { const it = RP_KINDS[k]; const amt = Math.floor(Number(j.pool[k]) || 0); return `<div class="row"><div class="lab">${it.cur} ${it.name.replace('红包', '')}</div><div>${amt}</div></div>`; }).join('');
    if (j.stable === false) h += '<div class="hint">⚠️ 天道池亏空过深，灵气不稳！大劫将至……</div>';
    b.innerHTML = h;
  });
}
function sheetRedpacket() {
  let h = `<h2>🧧 红包 · 天道池</h2><div class="hint">商会买红包皮，发放时放入对应货币：最少 100 个、最少 10 人抢 · 每人随机（至少 1、单人最多整包一半）· 24 小时没抢完的回收进天道池 · 发一个 +1 声望</div>`;
  h += `<div class="row"><div class="lab">🏦 天道池<small id="poolTxt">读取中…</small></div><button class="btn sm" data-poolrefresh>刷新</button><button class="btn sm" data-poolview>看池子</button></div>`;
  h += `<div class="row" style="flex-wrap:wrap;gap:4px"><small style="width:100%;color:var(--dim)">捐献补池（补灵气）：</small>${Object.keys(RP_KINDS).map(k => `<button class="btn sm" data-pooldonate="${k}">捐${RP_KINDS[k].name.replace('红包', '')}</button>`).join('')}</div>`;
  h += `<h3>我的红包皮</h3>`;
  h += Object.keys(RP_KINDS).map(k => { const it = RP_KINDS[k]; const n = rpCount(k); return `<div class="row"><div class="lab">${it.icon} ${it.name}<small>皮 ${n} 个 · 我有 ${rpBalance(k)} ${it.name.replace('红包', '')}</small></div><button class="btn gold" data-redsend="${k}" ${n > 0 ? '' : 'disabled'}>发红包</button></div>`; }).join('');
  h += `<div class="row"><button class="btn full" data-redback>← 回世界聊天</button></div>`;
  openSheet(h);
  try { poolRefreshTxt(); } catch(_) {}
}
function doRedpacketSend(k) { // v1045：改游戏内输入面板（原 prompt() 在手机上不弹、流程静默中止，发不了红包）
  if (rpCount(k) <= 0) { toastLog('bad', '没有这种红包皮，先去商会买'); return; }
  if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn()) { toastLog('bad', '先登录真人联机才能发红包'); return; }
  const it = RP_KINDS[k]; const cname = it.name.replace('红包', ''); const bal = rpBalance(k);
  openSheet(`<h2>🧧 发红包 · ${it.name}</h2><div class="hint">皮 ${rpCount(k)} 个 · 我有 ${it.cur} ${bal} ${cname} · 发一个 +1 声望 · 24 小时没抢完的回收进天道池</div><div class="row"><div class="lab">放入数量<small>最少 100</small></div><input id="rpAmt" type="number" inputmode="numeric" style="width:120px;padding:9px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;font-size:15px;text-align:center" value="100"></div><div class="row"><div class="lab">抢的人数<small>最少 10 人 · 不能超过放入数量</small></div><input id="rpPpl" type="number" inputmode="numeric" style="width:120px;padding:9px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;font-size:15px;text-align:center" value="10"></div><div class="row"><button class="btn gold full" data-redsendgo="${k}">🧧 发出红包</button></div><div class="row"><button class="btn full" data-redopen>← 返回</button></div>`);
}
function doRedpacketSendGo(k) {
  const it = RP_KINDS[k]; if (!it) return;
  if (rpCount(k) <= 0) { toastLog('bad', '没有这种红包皮，先去商会买'); return; }
  if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn()) { toastLog('bad', '先登录真人联机才能发红包'); return; }
  const cname = it.name.replace('红包', ''); const bal = rpBalance(k);
  const amt = Math.floor(+(document.getElementById('rpAmt') || {}).value);
  if (!(amt >= 100)) { toastLog('bad', '最少放入 100 个'); return; }
  if (amt > bal) { toastLog('bad', cname + '不足'); return; }
  const ppl = Math.floor(+(document.getElementById('rpPpl') || {}).value);
  if (!(ppl >= 10)) { toastLog('bad', '最少 10 人抢'); return; }
  if (ppl > amt) { toastLog('bad', '人数不能超过放入数量（每人至少 1 个）'); return; }
  MHXY.api('/api/redpacket/send', { method: 'POST', body: { kind: k, amount: amt, people: ppl } }).then(r => {
    if (r && r.json && r.json.ok) { S.redPackets[k] = rpCount(k) - 1; rpDeduct(k, amt); try { addFame(1, '发红包'); } catch(_){} commit(); toastLog('gold', `🧧 ${RP_KINDS[k].name} 已发出：${amt} 个 · ${ppl} 人抢，24 小时有效！`); if (MHXY.panel) MHXY.panel(); }
    else toastLog('bad', (r && r.json && r.json.error) ? '发送失败：' + r.json.error : '红包通道尚未开放（等后端上线）');
  }).catch(() => toastLog('bad', '红包发送失败（网络）'));
}
function doPoolDonate(k) { // v1045：同红包，改游戏内输入面板（原 prompt() 手机上不弹）
  const it = RP_KINDS[k]; const cname = it.name.replace('红包', ''); const bal = rpBalance(k);
  openSheet(`<h2>🏦 捐献补池 · ${cname}</h2><div class="hint">我有 ${it.cur} ${bal} ${cname} · 捐进天道池补灵气</div><div class="row"><div class="lab">捐献数量<small>至少 1</small></div><input id="poolAmt" type="number" inputmode="numeric" style="width:120px;padding:9px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;font-size:15px;text-align:center" value="100"></div><div class="row"><button class="btn gold full" data-pooldonatego="${k}">🏦 捐进天道池</button></div><div class="row"><button class="btn full" data-redopen>← 返回</button></div>`);
}
function doPoolDonateGo(k) {
  const cname = RP_KINDS[k].name.replace('红包', ''); const bal = rpBalance(k);
  const amt = Math.floor(+(document.getElementById('poolAmt') || {}).value);
  if (!(amt >= 1)) { toastLog('bad', '至少捐 1 个'); return; }
  if (amt > bal) { toastLog('bad', cname + '不足'); return; }
  if (!window.MHXY || !MHXY.api) { toastLog('bad', '未连接真人联机'); return; }
  MHXY.api('/api/pool/donate', { method: 'POST', body: { kind: k, amount: amt } }).then(r => {
    if (r && r.json && r.json.ok) { rpDeduct(k, amt); commit(); toastLog('gold', `🏦 已捐 ${amt} ${cname} 进天道池，灵气稍盛。`); sheetRedpacket(); }
    else toastLog('bad', '天道池尚未开设（等后端）');
  }).catch(() => toastLog('bad', '捐献失败（网络）'));
}
function doRedpacket(id) {
  // v1087：本地 redSeen 只作成功后的备忘，不再拦截重试（服务端是唯一真相；
  // 旧版失败也进 redSeen，导致 v1082 之前 404 过的包永远点不开）
  if (!window.MHXY || !MHXY.api) { toastLog('bad', '红包通道尚未开放'); return; }
  MHXY.api('/api/redpacket/claim', { method: 'POST', body: { id } }).then(r => {
    const j = r && r.json;
    S.redSeen = S.redSeen || [];
    if (j && j.ok) {
      if (S.redSeen.indexOf(id) < 0) S.redSeen.push(id);
      const kind = j.kind, amt = j.amount|0 || 1;
      if (kind === 'gold') S.gold = (S.gold|0) + amt; else if (kind === 'xy') S.xianyu = (S.xianyu|0) + amt; else if (kind && RP_KINDS[kind]) { S.ores = S.ores || {}; S.ores[kind] = (S.ores[kind]|0) + amt; }
      commit();
      toastLog('gold', `🧧 抢到了！${RP_KINDS[kind] ? RP_KINDS[kind].name : '红包'} +${amt}`);
      try { document.querySelectorAll('button[data-redpacket="' + id + '"]').forEach(function(b){ var s = document.createElement('span'); s.textContent = '🧧 已抢 +' + amt; b.replaceWith(s); }); } catch(_){} // v1098：点完按钮就地变已抢（提示只写主界面日志，聊天面板盖住时看不到，观礼因直接开面板才显得正常）
    } else {
      const _e = (j && j.error) || '';
      if (_e === 'already_claimed' && S.redSeen.indexOf(id) < 0) { S.redSeen.push(id); commit(); }
      if (_e === 'already_claimed') { try { document.querySelectorAll('button[data-redpacket="' + id + '"]').forEach(function(b){ var s = document.createElement('span'); s.textContent = '🧧 已抢过'; b.replaceWith(s); }); } catch(_){} } // v1098：同上，抢过再点也有可见反馈
      const _msg = _e === 'already_claimed' ? '这个红包你已经抢过了' : _e === 'empty' ? '来晚了，红包已被抢完' : _e === 'expired' ? '红包已过期' : _e === 'sender_cannot_claim' ? '不能抢自己的红包' : _e === 'not_found' ? '红包不存在（可能已过期回收）' : _e === 'ambiguous_id' ? '红包识别异常，稍后再试' : '抢红包失败';
      toastLog('bad', _msg);
    }
  }).catch(() => toastLog('bad', '抢红包失败（网络）'));
}
function doSpectate(evt, meta) {
  const p = String(meta || '').split('|'); const nm = p[0] || '某道友', rn = p[1] || '', kind = p[2] || '突破';
  S.specSeen = S.specSeen || {};
  const td = new Date(); const day = td.getFullYear() + '-' + (td.getMonth() + 1) + '-' + td.getDate();
  if (!S.specDay || S.specDay.d !== day) S.specDay = { d: day, n: 0 };
  let reward = '';
  if (!S.specSeen[evt] && S.specDay.n < 3) { S.specSeen[evt] = 1; S.specDay.n++; const _sg = 2 + ID_TIERS[idTier()].spec; S.stamina = (S.stamina|0) + _sg; reward = `<br><span class="y">沾得喜气，体力 +${_sg}。</span>`; try { addFame(3, '观礼'); if (typeof addMerit === 'function') addMerit(2, '观礼'); } catch(_){} }
  else if (S.specSeen[evt]) reward = '<br><small>这一场，你已观礼过了。</small>';
  else reward = '<br><small>今日观礼已满三次。</small>';
  commit();
  openSheet(`<h2>👀 观礼</h2><div style="font-size:14px;line-height:1.8">道友 <b class="y">${esc(nm)}</b> ${kind === '渡劫' ? '雷劫加身，九死一生，终是踏碎劫云' : '灵光冲霄，关隘尽破'}，晋入 <b class="y">${esc(rn)}</b>。${reward}</div><div class="row" style="margin-top:10px"><button class="btn full" data-close>👍 道一声贺</button></div>`);
}
/* ---------- v1015 主城碑林 ---------- */
async function sheetStele() {
  openSheet('<h2>🪦 主城碑林</h2><div class="hint">加载中…</div>');
  let data = null;
  try { if (window.MHXY && MHXY.loggedIn()) { const r = await MHXY.api('/api/stele/list'); if (r && r.json) data = r.json; } } catch(_) {}
  let h = '<h2>🪦 主城碑林</h2><div class="hint">主宰大圆满可立碑，只留一句 · 点赞是夸人：每人每天只能赞一句 · 月榜第一的句子写进轮回留名 · 月末统计，赞过冠军的人按点赞天数领体力 1+2+3…</div>';
  if (!data || !data.ok) { h += '<div class="hint">碑林尚未开放（后端未就绪），敬请期待。</div>'; openSheet(h); return; }
  const mine = data.mine || null; const list = data.list || [];
  if ((S.realm|0) >= 12 && (S.level|0) >= 10) h += `<div class="row"><input id="steleText" maxlength="30" placeholder="只留一句（30 字内）" value="${mine ? esc(mine.text) : ''}" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><button class="btn gold" data-stelepost>${mine ? '改碑' : '立碑'}</button></div>`;
  else h += '<div class="hint">修至主宰大圆满，方可在此立碑。</div>';
  const lm = data.lastMonth;
  if (lm && lm.text) { const _wp = lm.myRewardParts && (lm.myRewardParts.winner|0); const _vp = lm.myRewardParts && (lm.myRewardParts.voter|0); h += `<div class="row"><div class="lab">🏆 上月月冠「${esc(lm.text)}」<small>${esc(lm.author || '')}${(lm.myVotes|0) ? ' · 你赞了 ' + (lm.myVotes|0) + ' 天' : ''}${_wp ? ' · 冠军奖 ' + _wp + '（❤️×' + _wp + '）' : ''}${_vp ? ' · 点赞奖 ' + _vp : ''}</small></div>${(lm.myReward|0) > 0 && !lm.claimed ? `<button class="btn gold sm" data-steleclaim>领体力 ${lm.myReward|0}</button>` : (lm.claimed ? '<span class="y">已领</span>' : '')}</div>`; }
  h += list.length ? list.map((s2, i) => `<div class="row"><div class="lab">${i === 0 ? '👑 ' : ''}「${esc(s2.text)}」<small>${s2.title ? '【' + esc(s2.title) + '】' : ''}${esc(s2.name || '')} · ${esc(s2.month || '')}</small></div><button class="btn sm" data-stelelike="${s2.id}" ${(s2.liked || data.votedToday) ? 'disabled' : ''}>👍 ${s2.likes|0}${s2.liked ? ' · 今日已赞' : ''}</button></div>`).join('') : '<div class="hint">尚无人立碑。</div>';
  openSheet(h);
}
function doStelePost() {
  const inp = $('steleText'); const v = inp ? (inp.value || '').trim().slice(0, 30) : '';
  if (!v) { toastLog('bad', '先写一句话'); return; }
  try { MHXY.api('/api/stele/post', { method: 'POST', body: { text: v } }).then(r => { if (r && r.json && r.json.ok) { toastLog('good', '🪦 碑已立下'); sheetStele(); } else toastLog('bad', '立碑失败' + ((r && r.json && r.json.error) ? '：' + r.json.error : '')); }).catch(() => toastLog('bad', '立碑失败（网络）')); } catch(_) {}
}
function doSteleClaim() {
  try { MHXY.api('/api/stele/claim', { method: 'POST', body: {} }).then(r => { if (r && r.json && r.json.ok) { const rw = r.json.reward|0; if (rw > 0) { S.stamina = (S.stamina|0) + rw; commit(); toastLog('good', '🏆 领得体力 +' + rw); } sheetStele(); } else toastLog('bad', '领取失败' + ((r && r.json && r.json.error) ? '：' + r.json.error : '')); }).catch(() => toastLog('bad', '领取失败（网络）')); } catch(_) {}
}
function doSteleLike(id) {
  try { MHXY.api('/api/stele/like', { method: 'POST', body: { id } }).then(r => { if (r && r.json && r.json.ok) sheetStele(); else toastLog('bad', '点赞失败' + ((r && r.json && r.json.error) ? '：' + r.json.error : '')); }).catch(() => toastLog('bad', '点赞失败（网络）')); } catch(_) {}
}

function openEncSheet() { const e = C.encById(S.encPending); if (!e) { S.encPending = null; render(); return; } openSheet(`<h2>🌀 奇遇</h2>${e.by ? `<div class="hint">✍️ 作者：${escDg(e.by)}</div>` : ''}<div style="font-size:14px;line-height:1.7;margin:8px 0">${e.by ? escDg(e.text) : e.text}</div>` + e.opts.map((o, i) => `<button class="btn full" style="margin-top:6px" data-encopt="${i}">${e.by ? escDg(o.t) : o.t}</button>`).join('')); petSay('enc', 0.25); } // v1013 奇遇；v1094 玩家投稿署名+转义
function doEncOpt(i) { const r = C.chooseEncOpt(S, i | 0); if (!r) { closeSheet(); return; } log(r.bad ? 'bad' : 'good', `🌀 ${r.msg}`); if (r.next) { commit(); openEncSheet(); } else { commit(); closeSheet(); try { checkAchievements(); } catch(_) {} } } // v1013 奇遇
function doRefineGear(spec) { const _p = String(spec).split(':'); const r = C.refineGear(S, _p[0], _p[0] === 'bag' ? +_p[1] : _p[1]); if (!r.ok) { toastLog('bad', '🔥 炼灵失败：' + r.err); return; } log('good', `🔥 炼灵成功：炼灵 ${r.rl}${r.tier ? '·' + r.tier : ''}（耗寿元 ${r.cost} 年，该装备属性 +${r.rl * 5}%）`); commit(); sheetLife('forge'); } // v1013 炼灵
function doFood(kind, k, n) {
  const r = C.eatFood(S, kind, k, n, feedTo); if (!r) return; const it = (kind === 'egg' ? EGGS : MEATS)[k];
  if (r.pet) log('good', `🍼 给 ${petTag(r.pet)} 喂了 ${it.name} ×${r.n}，灵宠饥饿 <span class="g">+${r.hunger}</span>（${Math.round(r.pet.hunger)}）` + (r.loyal ? `，忠诚 <span class="g">+${r.loyal}</span>（${r.pet.loyal}）` : '') + (r.cured ? '。和灵宠亲昵一番，<span class="g">抑郁一扫而空</span>' : ''));
  else log('good', `${kind === 'egg' ? '🥚' : '🍖'} 吃下 ${it.name} ×${r.n}，饱食 <span class="g">+${r.hunger}</span>（${Math.floor(S.hunger)}）` + (r.sta ? `，体力 <span class="g">+${r.sta}</span>（当前 ${S.stamina}）` : '') + (r.cured ? '。饱餐一顿，<span class="g">抑郁消散了</span>' : ''));
  commit(); const els = [$('sheet'), $('mask')], ys = els.map(e => e.scrollTop); if (window._charPage) { sheetChar(); } else { sheetBag(); } els.forEach((e, i) => e.scrollTop = ys[i]);
}
async function useStealthFu() { // v1162 隐身符：服务端结算优先（服务端存档即时生效、线上采集立刻不惊扰）；网络失败回落本地（本地图同样生效，存档同步后线上认）
  if (!((S.meds.stealthfu|0) > 0)) return;
  try {
    const r = await window.MHXY.api('/api/progress/stealth_use', { method: 'POST', body: {} });
    if (r && r.json && r.json.ok) {
      if ((r.json.count|0) > 0) S.meds.stealthfu = r.json.count|0; else delete S.meds.stealthfu;
      S.stealthUntil = Number(r.json.stealthUntil || 0);
      if (typeof r.json.rev === 'number' && window.MHXY && window.MHXY.setBaseRev) window.MHXY.setBaseRev(r.json.rev);
      log('good', `🥷 使用 隐身符，<span class="g">隐身 ${Math.ceil((S.stealthUntil - Date.now()) / 60000)} 分钟</span>（采集不惊扰怪物）`);
      commit(); sheetBag(); return;
    }
    if (r && r.json && r.json.error) { log('bad', r.json.error === 'none' ? '隐身符不足' : r.json.error === 'dead' ? '已死亡，无法使用' : '使用失败'); return; }
  } catch(_) {}
  S.meds.stealthfu = (S.meds.stealthfu|0) - 1; if (!S.meds.stealthfu) delete S.meds.stealthfu;
  S.stealthUntil = Math.max(Date.now(), Number(S.stealthUntil || 0)) + 30 * 60000;
  log('good', `🥷 使用 隐身符，<span class="g">隐身 ${Math.ceil((S.stealthUntil - Date.now()) / 60000)} 分钟</span>（采集不惊扰怪物）`);
  commit(); sheetBag();
}
function doMed(k) { if (k === 'stealthfu') { useStealthFu(); return; } const r = C.useMed(S, k); if (!r.ok) return; log('good', r.cure === 'curse' ? `💧 使用 ${C.MEDS[k].name}，<span class="g">消除一层诅咒</span>（剩余 ${S.curseN|0} 层）` : `💊 使用 ${C.MEDS[k].name}，${C.STATUS[r.cure].icon}${C.STATUS[r.cure].name}<span class="g">已解除</span>`); commit(); sheetBag(); }
function doEat(k, n) { const d = C.eatMeat(S, k, n); if (d) { log('good', `🍖 吃下 ${MEATS[k].name} ×${n}，体力 <span class="g">+${d}</span>（当前 ${S.stamina}）`); commit(); sheetBag(); } }
async function doSell(kind, k, n) {
  // v964 彻底版：登录在线时走服务端（固定价，服务端验算）
  if (window.MHXY && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const resp = await MHXY.api('/api/shop/sell', {method:'POST', body:{type:'item', key:k, n}});
      const j = resp && resp.json;
      if (resp.ok && j && j.ok) {
        const store = GATHER[kind].store;
        if (!S[store]) S[store] = {};
        S[store][k] = (S[store][k]|0) - j.n; if (S[store][k] <= 0) delete S[store][k];
        S.gold = (S.gold|0) + j.gold;
        if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
        log('gold', `💰 出售 ${GATHER[kind].items[k].name} ×${j.n}，金元 <span class="y">+${j.gold}</span>`);
        try { if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.10); } catch(_) {} // v1095 卖出也触发雷云判定（与买入同口径）
        commit(); const _sy2 = $('sheet').scrollTop; sheetShop(); $('sheet').scrollTop = _sy2;
        return;
      }
      if (!resp.netErr) return; // 服务端已响应（no_item 等），不回落
    } catch(e) { /* 网络异常 → 回落本地 */ }
  }
  const r = C.sellItem(S, kind, k, n); if (!r.ok) return;
  log('gold', `💰 出售 ${GATHER[kind].items[k].name} ×${r.n}，金元 <span class="y">+${r.gold}</span>`);
  try { if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.10); } catch(_) {} // v1095 卖出也触发雷云判定（与买入同口径）
  commit(); const _sy2 = $('sheet').scrollTop; sheetShop(); $('sheet').scrollTop = _sy2; // v200 出售后保持滚动位置
}
function doDrink(a, g, n) { const d = C.drink(S, a, g, n); if (d !== null && d !== undefined) { const fx = S._drinkFx; log('good', `💊 服下 ${potName(a, g)} ×${n}，${AN[a]} <span class="g">+${d}</span>${fx && fx.f < 1 ? `（丹毒未清，药效 ${Math.round(fx.f * 100)}%）` : ''}（丹毒 ${S.danDu|0}/${C.danDuCap(S)}）`); commit(); sheetBag(); } }
function lvUpTxt(n) { const _per = (S.realm|0) + 1; return n ? `<br><span class="y">🎉 ${n > 1 ? '连升 ' + n + ' 级，' : ''}等级提升至 Lv.${S.level}！全属性 +${n * _per}</span>` : ''; }
function arenaData() { // v246 每个境界独立的擂台数据；v247 加擂主守擂时间
  const cr = S.realm | 0;
  if (S.arena && typeof S.arena.score === 'number') { // 旧版扁平数据迁移到当前境界
    const _old = S.arena; S.arena = {}; S.arena['r' + cr] = _old;
  }
  S.arena = S.arena || {};
  const k = 'r' + cr;
  const a = S.arena[k] || (S.arena[k] = { score: 0, win: 0, lose: 0, streak: 0, best: 0 });
  if (!a.champion) { // 初始化擂主为NPC
    const _nm = (typeof RANK_PLAYER_NAMES !== 'undefined' && RANK_PLAYER_NAMES.length) ? RANK_PLAYER_NAMES[Math.floor(Math.random() * RANK_PLAYER_NAMES.length)] : '无名氏';
    a.champion = { name: _nm, since: Date.now() - Math.floor(Math.random() * 72) * 3600000, isPlayer: false };
  }
  return a;
}
window.arenaData = arenaData; // v291 显式挂window防iOS跨块访问失败（同v265修R）
function arenaDefenseTime(a) { // v247 守擂时长（毫秒）
  if (!a.champion || !a.champion.since) return 0;
  return Math.max(0, Date.now() - a.champion.since);
}
function arenaFmtDuration(ms) { // v247 格式化时长
  const h = Math.floor(ms / 3600000), d = Math.floor(h / 24);
  if (d > 0) return `${d}天${h % 24}小时`;
  if (h > 0) return `${h}小时`;
  const m = Math.floor(ms / 60000);
  return m > 0 ? `${m}分钟` : '刚刚';
}
function arenaTickChampion(a) { // v247 结算擂主守擂奖励；v248 日榜按分钟算（1分钟=1分）；v249 取消NPC夺擂
  if (!a.champion) return null;
  let msg = null;
  if (a.champion.isPlayer) {
    // v283 日/周/月/年榜：守擂1分钟=1分
    const mins = Math.floor(arenaDefenseTime(a) / 60000);
    const claimedM = a.champion.claimedMins | 0;
    if (mins > claimedM) {
      const gain = mins - claimedM;
      a.day.score += gain;
      a.week.score = Math.max(0, (a.week.score | 0) + gain);
      a.month.score = Math.max(0, (a.month.score | 0) + gain);
      a.year.score = Math.max(0, (a.year.score | 0) + gain);
      a.score = Math.max(0, (a.score || 0) + gain);
      a.champion.claimedMins = mins;
      msg = `🏆 守擂 ${arenaFmtDuration(arenaDefenseTime(a))}，日/周/月/年榜 +${gain} 分`;
    }
  }
  return msg;
}
async function doArena() { // v245 擂台：所有境界可见；v246 每个境界独立擂台；v247 守擂时间制；v255 日榜前20发宝箱
  if (S.dead || S.stamina < K.COST_PK) { toastLog('sys', '体力不足或已死亡'); return; }
  const a = arenaData();
  arenaCheckReset(a, false); // v967 轻量日期滚动；结算走服务端
  let settleMsg = '';
  // v967 服务端擂台结算（在线才走）
  if (typeof MHXY !== 'undefined' && MHXY.loggedIn && MHXY.loggedIn()) {
    try {
      const r = await MHXY.api('/api/roll/arena_settle', 'POST', {});
      if (r.ok && r.json && r.json.ok) {
        if (typeof MHXY.setBaseRev === 'function' && r.json.rev) MHXY.setBaseRev(r.json.rev);
        const _gains = r.json.gains || [];
        for (const _g of _gains) {
          // 服务端已发放到 D1，本地同步
          if (_g.st === 'inv') S.inv[_g.k] = (S.inv[_g.k]||0) + _g.n;
          else if (S[_g.st] && typeof S[_g.st] === 'object') S[_g.st][_g.k] = (S[_g.st][_g.k]||0) + _g.n;
        }
        if (_gains.length) commit();
        const _msgs = r.json.msgs || [];
        if (_msgs.length) settleMsg = _msgs.join('<br>');
      }
    } catch(e) {}
  } else {
    // 离线回落：本地结算
    settleMsg = arenaCheckReset(a, true) || '';
  }
  const tickMsg = arenaTickChampion(a); // v247 守擂结算
  const cr = S.realm | 0;
  const ch = a.champion;
  const chHtml = ch ? (ch.isPlayer ? `🏆 现任擂主：<b class="y">你</b>（已守擂 ${arenaFmtDuration(arenaDefenseTime(a))}）` : `🏆 现任擂主：<b class="x">${ch.name}</b>（已守擂 ${arenaFmtDuration(arenaDefenseTime(a))}）`) : '';
  const _now = new Date(); const _mid = new Date(_now); _mid.setHours(24, 0, 0, 0); const _ms = _mid - _now; const _h = Math.floor(_ms / 3600000), _m = Math.floor((_ms % 3600000) / 60000);
  openSheet(`<h2>🏟️ 擂台 · ${C.REALMS[cr]}</h2><div class="hint">本境界独立擂台 · 挑战守擂者，胜者为新擂主<br>胜 +10 积分、败 +1 积分；<b>日/周/月/年榜守擂1分钟=1分</b>；<b>不夺取属性、不掉属性</b><br>📅 日榜前20：🎲盲盒（第1名20个递减）<br>⏰ 距日榜结算还有 <b class="y">${_h}小时${_m}分</b></div>
  ${settleMsg ? `<div class="hint" style="color:var(--gold)">${settleMsg}</div>` : ''}
  ${tickMsg ? `<div class="hint" style="color:var(--gold)">${tickMsg}</div>` : ''}
  <div class="row"><div class="lab">${chHtml}</div></div>
  <div class="row"><div class="lab">🏟️ 擂台积分<small>${a.score} 分</small></div><div class="lab">战绩<small>${a.win} 胜 / ${a.lose} 负</small></div></div>
  <div class="row"><div class="lab">🔥 连胜<small>${a.streak} 连胜（最高 ${a.best}）</small></div></div>
  <div class="row"><button class="btn gold full" data-arena-start="1">⚔️ 挑战${ch && !ch.isPlayer ? ch.name : '守擂者'}（-${K.COST_PK}体力）</button></div>
  <div class="row"><button class="btn full" data-arena-rank="day">🏆 ${C.REALMS[cr]}擂台榜单（日/周/月/年）</button></div>
  <div class="row"><button class="btn full" data-close="1">关闭</button></div>`);
}
// v246 擂台榜单周期：日/周/月/年
function arenaPeriodKeys() {
  const d = new Date();
  const day = d.toISOString().slice(0, 10);
  const weekD = new Date(d); weekD.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // 周一起始
  const week = weekD.toISOString().slice(0, 10);
  const month = day.slice(0, 7);
  const year = day.slice(0, 4);
  return { day, week, month, year };
}
// v250 擂台日结：种子随机保证同一天NPC分数一致
function arenaSeededRng(seedStr) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) | 0;
  return function() { h = (h * 1103515245 + 12345) & 0x7fffffff; return h / 0x7fffffff; };
}
function arenaDailySettle(a, dayDate, dayScore) { // v257 日榜发盲盒；v253 前20名；v255 取消体力奖励
  if (!dayScore || dayScore <= 0) return null;
  const rng = arenaSeededRng('arena' + dayDate);
  const scale = 120;
  let higher = 0;
  for (let i = 0; i < 59; i++) {
    const npcScore = Math.floor(rng() * rng() * scale);
    if (npcScore > dayScore) higher++;
  }
  const rank = higher + 1;
  if (rank > 20) return null;
  const count = 21 - rank; // 第1名20个...第20名1个
  S.inv = S.inv || {}; S.inv['chestB'] = (S.inv['chestB'] || 0) + count;
  return `🏆 擂台日结：昨日${dayDate}日榜第 <b class="y">${rank} 名</b>，获得🎲盲盒 <b class="g">×${count}</b>`;
}
// v251 周/月/年榜结算
function arenaPeriodSettle(a, period, periodKey, score, topN, chestKey, chestName) {
  if (!score || score <= 0) return null;
  const rng = arenaSeededRng('arena' + period + periodKey);
  const scale = { week: 600, month: 2500, year: 12000 }[period] || 600;
  const npcCount = Math.min(topN * 3, 500); // 模拟对手数
  let higher = 0;
  for (let i = 0; i < npcCount; i++) {
    const npcScore = Math.floor(rng() * rng() * scale);
    if (npcScore > score) higher++;
  }
  const rank = higher + 1;
  if (rank > topN) return null;
  const count = topN - rank + 1; // 第1名topN个，第2名topN-1个...
  S.inv = S.inv || {}; S.inv[chestKey] = (S.inv[chestKey] || 0) + count;
  const periodName = { week: '周', month: '月', year: '年' }[period];
  return `🏆 擂台${periodName}榜结算：第 <b class="y">${rank} 名</b>，获得${chestName} <b class="g">×${count}</b>`;
}
function arenaCheckReset(a, doSettle) {
  const k = arenaPeriodKeys();
  let msgs = [];
  doSettle = doSettle !== false;
  if (!a.day || a.day.date !== k.day) {
    if (doSettle && a.day && a.day.date && !a.day.settled) {
      const msg = arenaDailySettle(a, a.day.date, a.day.score | 0);
      if (msg) msgs.push(msg);
      a.day.settled = true;
    }
    a.day = { date: k.day, score: 0 };
  }
  if (!a.week || a.week.start !== k.week) {
    if (doSettle && a.week && a.week.start) {
      const msg = arenaPeriodSettle(a, 'week', a.week.start, a.week.score | 0, 100, 'chestN', '🎀精致盲盒');
      if (msg) msgs.push(msg);
    }
    a.week = { start: k.week, score: 0 };
  }
  if (!a.month || a.month.ym !== k.month) {
    if (doSettle && a.month && a.month.ym) {
      const msg = arenaPeriodSettle(a, 'month', a.month.ym, a.month.score | 0, 200, 'chestR', '🎁稀有宝箱');
      if (msg) msgs.push(msg);
    }
    a.month = { ym: k.month, score: 0 };
  }
  if (!a.year || a.year.y !== k.year) {
    if (doSettle && a.year && a.year.y) {
      const msg = arenaPeriodSettle(a, 'year', a.year.y, a.year.score | 0, 500, 'chestA', '💎高级宝箱');
      if (msg) msgs.push(msg);
    }
    a.year = { y: k.year, score: 0 };
  }
  if (msgs.length) { a._settleMsg = msgs.join('<br>'); }
  if (a._settleMsg) { const m = a._settleMsg; a._settleMsg = null; return m; }
  return null;
}
window.arenaAddScore = function(a, pts) {
  arenaCheckReset(a);
  a.score = Math.max(0, (a.score || 0) + pts);
  // v414 日榜也按积分算
  a.day.score = Math.max(0, (a.day.score | 0) + pts);
  a.week.score = Math.max(0, a.week.score + pts);
  a.month.score = Math.max(0, a.month.score + pts);
  a.year.score = Math.max(0, a.year.score + pts);
}
let _arenaRankTab = 'day';
function doArenaRank(tab) { // v246 擂台榜单：日/周/月/年；每个境界独立；v1084 真人榜单
  tab = tab || _arenaRankTab || 'day'; _arenaRankTab = tab;
  const cr = S.realm | 0;
  if (!window.MHXY || !MHXY.loggedIn || !MHXY.loggedIn()) {
    openSheet(`<h2>🏆 擂台榜单 · ${C.REALMS[cr]}</h2><div class="hint">真人擂台榜单需登录联机后查看。</div><div class="empty">请先在联机面板登录</div><div class="row"><button class="btn full" data-a="arena">← 返回擂台</button></div>`);
    return;
  }
  // 上擂心跳：顺便结算守擂分钟进榜
  try { MHXY.api('/api/arena/defend', { method: 'POST', body: { realm: cr } }).catch(function(){}); } catch (_) {}
  openSheet(`<h2>🏆 擂台榜单 · ${C.REALMS[cr]}</h2><div class="hint">正在拉取真人数据…</div><div class="row"><button class="btn full" data-a="arena">← 返回擂台</button></div>`);
  MHXY.api('/api/arena/rank?realm=' + cr + '&tab=' + encodeURIComponent(tab)).then(function(r){
    if (!r.ok || !r.json || !r.json.ok) {
      openSheet(`<h2>🏆 擂台榜单 · ${C.REALMS[cr]}</h2><div class="hint">拉取失败，请稍后再试。</div><div class="row"><button class="btn full" data-a="arena">← 返回擂台</button></div>`);
      return;
    }
    const tabs = [['day', '📅 日榜'], ['week', '📆 周榜'], ['month', '🗓️ 月榜'], ['year', '🎊 年榜']];
    const list = r.json.list || [];
    const myRank = r.json.myRank, myScore = r.json.myScore;
    const ch = r.json.champion;
    const chHtml = ch ? `<div class="hint">🏆 现任擂主：<b class="y">${String(ch.username).replace(/</g, '&lt;')}</b>[${ch.playerNo || '?'}]</div>` : '';
    let html = `<h2>🏆 擂台榜单 · ${C.REALMS[cr]}</h2><div class="hint">你的排名：<b class="y">${myRank ? '第 ' + myRank + ' 名' : '未上榜'}</b>（${myScore || 0} 分） · 本境界独立榜单·按积分排名 · 真人数据</div>${chHtml}`
      + `<div class="grid2" style="margin-bottom:8px">` +
      tabs.map(function(t){ return `<button class="btn${tab===t[0]?' gold':''}" data-arena-rank="${t[0]}">${t[1]}</button>`; }).join('') +
      `</div>`;
    if (!list.length) html += `<div class="empty">本榜暂无真人成绩，来守擂抢榜首吧</div>`;
    else html += list.map(function(e){
      return `<div class="row"${e.isMe ? ' style="border:1px solid var(--gold);border-radius:8px"' : ''}>`
        + `<div class="lab"><b class="${e.rank <= 3 ? 'y' : ''}">${e.rank}</b> ${e.isMe ? '你' : String(e.username).replace(/</g, '&lt;')}<span style="color:#666">[${e.playerNo || '?'}]</span></div>`
        + `<div><b class="y">${e.score}</b> <small>分</small></div></div>`;
    }).join('');
    html += `<div class="row"><button class="btn full" data-a="arena">← 返回擂台</button></div>`;
    openSheet(html);
  }).catch(function(){
    openSheet(`<h2>🏆 擂台榜单 · ${C.REALMS[cr]}</h2><div class="hint">拉取失败（网络），请稍后再试。</div><div class="row"><button class="btn full" data-a="arena">← 返回擂台</button></div>`);
  });
  return;
}
// v263 仙缘系统：永久编号、绑定、体力邮件、宗门；v1081 NPC 全禁用
function xyInit() {
  if (S.bindNum === null || S.bindNum === undefined) S.bindNum = 0; // 从0开始，永久
  if (!S.xianyuan) S.xianyuan = {m:0,f:0};
  if (!Array.isArray(S.binders)) S.binders = [];
  if (!Array.isArray(S.mail)) S.mail = [];
  if (!S._xyNpcPurged) { // v1081 一次性清掉旧 NPC 绑定者（无 accountId 的均为 NPC）
    const npcCount = S.binders.filter(b => !b.accountId).length;
    if (npcCount) {
      S.binders = S.binders.filter(b => b.accountId);
      let rem = npcCount;
      const takeM = Math.min(S.xianyuan.m|0, rem); S.xianyuan.m -= takeM; rem -= takeM;
      const takeF = Math.min(S.xianyuan.f|0, rem); S.xianyuan.f -= takeF;
      if (S.spouse && !S.spouse.accountId) S.spouse = null; // NPC 道侣一并解除
    }
    S._xyNpcPurged = 1;
  }
  for (const b of S.binders) if (b.intimacy === undefined) b.intimacy = 0; // v264 补亲密度
}
function xyTotal() { xyInit(); return (S.xianyuan.m|0) + (S.xianyuan.f|0); }
function xySimBind() { // 模拟NPC绑定
  xyInit();
  const baseNames = (typeof RANK_PLAYER_NAMES !== 'undefined' ? RANK_PLAYER_NAMES.slice() : ['无名道友']);
  const name = baseNames[Math.floor(Math.random() * baseNames.length)];
  const gender = Math.random() < 0.5 ? 'm' : 'f';
  // 避免重名
  if (S.binders.some(b => b.name === name)) return null;
  const b = { name, gender, since: Date.now(), streak: 1, lastCheckin: new Date().toISOString().slice(0,10), intimacy: 0 }; // v264 亲密度
  S.binders.push(b);
  S.xianyuan[gender] = (S.xianyuan[gender]|0) + 1;
  return b;
}
function xyUnbind(idx) { // 解绑：仙缘消失，重新绑定进入7天冷却
  xyInit();
  const b = S.binders[idx]; if (!b) return;
  S.binders.splice(idx, 1);
  S.xianyuan[b.gender] = Math.max(0, (S.xianyuan[b.gender]|0) - 1);
  if (S.spouse && S.spouse.name === b.name) S.spouse = null; // v282 解绑道侣则分道扬镳
  S.xyUnbindAt = Date.now(); // v282 重新绑定7天冷却计时
}
function xyRebindCd() { // v282 返回重新绑定剩余冷却毫秒，0表示可重新绑定
  xyInit();
  if (!S.xyUnbindAt) return 0;
  return Math.max(0, S.xyUnbindAt + 7 * 86400000 - Date.now());
}
function xyCheckBinderMail() { // 模拟绑定者签到，发体力邮件
  xyInit();
  const today = new Date().toISOString().slice(0,10);
  const yest = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  let newMails = 0;
  for (const b of S.binders) {
    if (b.lastCheckin === today) continue;
    // 模拟签到：90%签到
    if (Math.random() < 0.9) {
      b.streak = (b.lastCheckin === yest) ? (b.streak|0) + 1 : 1;
      b.streak = Math.min(365, b.streak);
      b.lastCheckin = today;
      b.intimacy = (b.intimacy|0) + 1; // v264 每次签到+1亲密
      S.mail.push({ from: b.name, text: `${b.name}道友连续签到第${b.streak}天，送你${b.streak}点体力`, stamina: b.streak, time: Date.now(), claimed: false });
      newMails++;
    } else {
      b.streak = 0; // 断签
      b.lastCheckin = today;
    }
  }
  // 只保留最近50封
  if (S.mail.length > 50) S.mail = S.mail.slice(-50);
  return newMails;
}
function doXianyuan() { // 仙缘面板（v1081：玩家互绑版，NPC 模拟停用）
  xyInit();
  const total = xyTotal();
  const canSect = total >= 10 && !S.sect;
  let html = `<h2>🔗 仙缘</h2><div class="hint">你的永久编号：<b class="y" style="font-size:18px">${S.bindNum}</b>（玩家间仙缘绑定）</div>`;
  html += `<div class="row"><div class="lab">💞 仙缘<small>♂ ${S.xianyuan.m} · ♀ ${S.xianyuan.f} · 共 ${total}</small></div><div class="lab">👥 绑定者<small id="xyBinderCount">…</small></div></div>`;
  html += `<div class="row"><button class="btn gold full" id="xyCheckinBtn">📬 每日签到（给绑定者发体力邮件）</button></div>`;
  html += `<div id="xyRequests"></div><div id="xyBinders"></div><div id="xySpouses"></div><div id="xyProposals"></div>`;
  html += `<div class="row"><button class="btn full" data-a="mail">📬 邮箱${S.mail.filter(m => !m.claimed).length ? `（${S.mail.filter(m => !m.claimed).length}未读）` : ''}</button></div>`;
  html += `<div id="xySect"><div class="hint">宗门信息加载中…</div></div>`; // v1164 真人宗门（服务端）
  html += `<div class="row"><button class="btn full" data-close="1">关闭</button></div>`;
  openSheet(html);
  commit();
  // 拉服务端绑定列表 + 待确认请求
  try {
    if (typeof MHXY !== 'undefined' && MHXY.api) {
      MHXY.api('/api/xianyuan/list').then(function(r){
        if (!r.ok || !r.json) return;
        const binders = r.json.binders || [], reqs = r.json.requests || [];
        window._xyBindersCache = binders;
        const bc = document.getElementById('xyBinderCount'); if (bc) bc.textContent = binders.length + ' 人 · 今日发起 ' + (r.json.bindUsedToday | 0) + '/1';
        const rq = document.getElementById('xyRequests');
        if (rq) {
          rq.innerHTML = reqs.length ? `<h3>待确认的绑定请求</h3>` + reqs.map(function(q){
            const fid = String(q.from_id).replace(/'/g, '');
            return `<div class="row"><div class="lab">💞 ${String(q.from_name || '?').replace(/</g, '&lt;')}<small>想与你绑定仙缘</small></div><button class="btn gold sm" onclick="window.xyAccept('${fid}')">接受</button><button class="btn sm" onclick="window.xyDecline('${fid}')">拒绝</button></div>`;
          }).join('') : '';
        }
        const bd = document.getElementById('xyBinders');
        if (bd) {
          bd.innerHTML = binders.length ? `<h3>绑定者</h3>` + binders.map(function(b){
            const tid = String(b.accountId).replace(/'/g, '');
            return `<div class="row"><div class="lab">🧑 ${String(b.username || '?').replace(/</g, '&lt;')}<small>编号 [${b.playerNo || '?'}]</small></div><button class="btn sm" onclick="window.xyUnbind('${tid}')">解绑</button></div>`;
          }).join('') : `<div class="empty">暂无绑定者，点玩家资料里的 💞 仙缘发起绑定吧～</div>`;
        }
      });
      // v1164 宗门区（服务端）
      MHXY.api('/api/sect/me').then(function(sr2){
        if (sr2.ok && sr2.json && sr2.json.ok) { window._mySect = sr2.json; if (window.sectHomeRender) window.sectHomeRender(sr2.json); }
      }).catch(function(){});
      // v1158 道侣：道侣名单 / 求娶与待同意 / 绑定者结道侣按钮
      MHXY.api('/api/xianyuan/spouses').then(function(sr){
        if (!sr.ok || !sr.json) return;
        const sj = sr.json;
        window._spouseNames = (sj.spouses || []).map(function(s){ return s.username; });
        const spouseIds = {};
        (sj.spouses || []).forEach(function(s){ spouseIds[s.accountId] = 1; });
        const spEl = document.getElementById('xySpouses');
        if (spEl) {
          spEl.innerHTML = (sj.spouses && sj.spouses.length) ? `<h3>💕 道侣</h3>` + sj.spouses.map(function(s){
            const tid = String(s.accountId).replace(/'/g, '');
            return `<div class="row"><div class="lab">💕 ${String(s.username || '?').replace(/</g, '&lt;')}<small>编号 [${s.playerNo || '?'}]</small></div><button class="btn sm" onclick="window.xyDivorce('${tid}')">离缘</button></div>`;
          }).join('') : '';
        }
        const bd2 = document.getElementById('xyBinders');
        const cache = window._xyBindersCache || [];
        if (bd2 && cache.length) {
          bd2.innerHTML = `<h3>绑定者</h3>` + cache.map(function(b){
            const tid = String(b.accountId).replace(/'/g, '');
            const days = Math.floor((Date.now() - (b.since || 0)) / 86400000);
            let act = '';
            if (spouseIds[b.accountId]) act = `<span class="y" style="margin-right:6px">💕道侣</span>`;
            else if (days >= 7) act = `<button class="btn gold sm" onclick="window.xyProposeMarry('${tid}')">💕 结为道侣</button>`;
            else act = `<small style="margin-right:6px">满7天可结道侣（${days}/7）</small>`;
            return `<div class="row"><div class="lab">🧑 ${String(b.username || '?').replace(/</g, '&lt;')}<small>编号 [${b.playerNo || '?'}] · 绑定${days}天</small></div>${act}<button class="btn sm" onclick="window.xyUnbind('${tid}')">解绑</button></div>`;
          }).join('');
        }
        const pp = document.getElementById('xyProposals');
        if (pp) {
          let h = '';
          (sj.consentsOwed || []).forEach(function(o){
            const pid = String(o.proposalId).replace(/'/g, '');
            h += `<div class="row"><div class="lab">💌 ${String(o.fromName || '?').replace(/</g, '&lt;')}<small>想再娶 ${String(o.toName || '?').replace(/</g, '&lt;')} 为道侣，须你同意</small></div><button class="btn gold sm" onclick="window.xyMarryConsent('${pid}',1)">同意</button><button class="btn sm" onclick="window.xyMarryConsent('${pid}',0)">反对</button></div>`;
          });
          (sj.incoming || []).forEach(function(o){
            const pid = String(o.id).replace(/'/g, '');
            if (o.status === 'awaiting') h += `<div class="row"><div class="lab">💕 ${String(o.fromName || '?').replace(/</g, '&lt;')}<small>求与你结为道侣（双方各出999金元入天道池）</small></div><button class="btn gold sm" onclick="window.xyMarryRespond('${pid}',1)">同意结为道侣</button><button class="btn sm" onclick="window.xyMarryRespond('${pid}',0)">拒绝</button></div>`;
            else h += `<div class="row"><div class="lab">💕 ${String(o.fromName || '?').replace(/</g, '&lt;')}<small>求与你结为道侣 · 等他现有道侣同意中…</small></div></div>`;
          });
          (sj.outgoing || []).forEach(function(o){
            const pid = String(o.id).replace(/'/g, '');
            const st = o.status === 'awaiting' ? '等对方回应' : `等道侣同意（还差${o.consentsLeft}人）`;
            h += `<div class="row"><div class="lab">💌 求娶 ${String(o.toName || '?').replace(/</g, '&lt;')}<small>${st}</small></div><button class="btn sm" onclick="window.xyMarryCancel('${pid}')">撤回</button></div>`;
          });
          if (sj.divorceCdUntil && sj.divorceCdUntil > Date.now()) h += `<div class="hint">🍂 离缘冷却中：${new Date(sj.divorceCdUntil).toLocaleDateString()} 前不能再结道侣</div>`;
          pp.innerHTML = h ? `<h3>道侣事务</h3>` + h : '';
        }
      });
      const cb = document.getElementById('xyCheckinBtn');
      if (cb) cb.onclick = function(){
        MHXY.api('/api/xianyuan/checkin', { method: 'POST', body: {} }).then(function(r){
          if (r.ok) {
            if (r.json && r.json.already) { if (typeof toastLog === 'function') toastLog('sys', '今天已签到过了'); }
            else if (typeof toastLog === 'function') toastLog('good', `📬 签到成功！连续第${(r.json && r.json.streak) || 1}天，已给${(r.json && r.json.sent) || 0}位绑定者发体力邮件${(r.json && r.json.capped) ? `（${r.json.capped}位的前20已满，未送达）` : ''}`);
          }
        });
      };
    }
  } catch(_) {}
}
// v1081 仙缘：接受/拒绝/解绑
window.xyAccept = function(fromId){
  try {
    if (typeof MHXY !== 'undefined' && MHXY.api) {
      MHXY.api('/api/xianyuan/accept', { method: 'POST', body: { fromId: fromId } }).then(function(r){
        if (r.ok) { xyInit(); S.xianyuan.m = (S.xianyuan.m|0) + 1; commit(); if (typeof toastLog === 'function') toastLog('good', '💞 绑定成功，仙缘+1！'); doXianyuan(); }
      });
    }
  } catch(e) {}
};
window.xyDecline = function(fromId){
  try {
    if (typeof MHXY !== 'undefined' && MHXY.api) {
      MHXY.api('/api/xianyuan/decline', { method: 'POST', body: { fromId: fromId } }).then(function(){ doXianyuan(); });
    }
  } catch(e) {}
};
window.xyUnbind = function(targetId){
  try {
    if (typeof MHXY !== 'undefined' && MHXY.api) {
      MHXY.api('/api/xianyuan/unbind', { method: 'POST', body: { targetId: targetId } }).then(function(r){
        if (r.ok) { xyInit(); const tot = xyTotal(); if (tot > 0) { if (S.xianyuan.m > 0) S.xianyuan.m--; else if (S.xianyuan.f > 0) S.xianyuan.f--; } commit(); if (typeof toastLog === 'function') toastLog('sys', '已解绑，仙缘-1'); doXianyuan(); }
        else if (r.json && r.json.error === 'married') { if (typeof toastLog === 'function') toastLog('bad', '已是道侣，先离缘才能解绑'); }
      });
    }
  } catch(e) {}
};
// v1158 道侣：求娶 / 回应 / 同意 / 撤回 / 离缘 + 邮件复仇
const XY_ERR_TXT = { daily_bind_limit: '今天已发起过绑定了（每天只能发起1个）', not_bound: '还没绑定', bind_too_new: '绑定未满7天', already_spouses: '已是道侣', already_proposed: '已有进行中的求娶', insufficient_gold: '金元不足（双方各需999）', divorce_cooldown: '离缘后7天内不能再结道侣', remarriage_banned: '原配本世不能再婚（除非一方先轮回）', not_spouses: '不是道侣', no_proposal: '请求已失效', not_ready: '还没轮到你回应', not_a_consenter: '这事不用你同意' };
function xyErrToast(r, fallback) {
  const e = (r && r.json && r.json.error) || '';
  if (typeof toastLog === 'function') toastLog('bad', XY_ERR_TXT[e] || (fallback + (e ? '：' + e : '')));
}
window.xyProposeMarry = function(targetId){
  try {
    MHXY.api('/api/xianyuan/marry/propose', { method: 'POST', body: { targetId: targetId } }).then(function(r){
      if (r.ok && r.json && r.json.ok) { if (typeof toastLog === 'function') toastLog('good', '💕 求娶已发出' + ((r.json.needConsents | 0) > 0 ? `，须 ${r.json.needConsents} 位现有道侣先同意` : '，等对方回应')); }
      else xyErrToast(r, '求娶失败');
      doXianyuan();
    });
  } catch(e) {}
};
window.xyMarryRespond = function(pid, accept){
  try {
    MHXY.api('/api/xianyuan/marry/respond', { method: 'POST', body: { proposalId: pid, accept: !!accept } }).then(function(r){
      if (r.ok && r.json && r.json.married) { if (typeof toastLog === 'function') toastLog('good', '💒 结为道侣！999金元已入天道池'); try { downloadSave(true); } catch(_) {} }
      else if (r.ok && r.json && r.json.rejected) { if (typeof toastLog === 'function') toastLog('sys', '已拒绝'); }
      else xyErrToast(r, '回应失败');
      doXianyuan();
    });
  } catch(e) {}
};
window.xyMarryConsent = function(pid, agree){
  try {
    MHXY.api('/api/xianyuan/marry/consent', { method: 'POST', body: { proposalId: pid, agree: !!agree } }).then(function(r){
      if (r.ok && r.json && r.json.ok) { if (typeof toastLog === 'function') toastLog('good', agree ? '💕 已同意' : '已反对，此求娶作罢'); }
      else xyErrToast(r, '操作失败');
      doXianyuan();
    });
  } catch(e) {}
};
window.xyMarryCancel = function(pid){
  try {
    MHXY.api('/api/xianyuan/marry/cancel', { method: 'POST', body: { proposalId: pid } }).then(function(r){
      if (typeof toastLog === 'function') toastLog('sys', '已撤回求娶');
      doXianyuan();
    });
  } catch(e) {}
};
window.xyDivorce = function(targetId){
  let ok = false;
  try { ok = confirm('确定要离缘吗？离缘后7天内不能再结道侣，且此世不能再与对方结为道侣（除非一方先轮回）。'); } catch(_) { ok = true; }
  if (!ok) return;
  try {
    MHXY.api('/api/xianyuan/divorce', { method: 'POST', body: { targetId: targetId } }).then(function(r){
      if (r.ok && r.json && r.json.ok) { if (typeof toastLog === 'function') toastLog('sys', '🍂 已离缘'); }
      else xyErrToast(r, '离缘失败');
      doXianyuan();
    });
  } catch(e) {}
};
window.pkMailRevenge = function(sid, victimId){
  try {
    const m = (S.mail || []).find(function(x){ return x.sid === sid; });
    const mine = (typeof myAid === 'function') && victimId === myAid();
    const url = mine ? '/api/world/revenge/activate' : '/api/world/revenge/activate-for';
    const body = mine ? {} : { victimId: victimId };
    MHXY.api(url, { method: 'POST', body: body }).then(function(r){
      if (r.ok && r.json && r.json.ok) {
        if (m) { m.pkDone = 1; commit(); }
        if (typeof toastLog === 'function') toastLog('good', `⚔️ 复仇已开启！目标：${r.json.targetName || '仇人'}（10分钟内在世界中挑战他）`);
      } else {
        const e = (r.json && (r.json.error || r.json.err)) || r.status;
        const txt = e === 'no revenge available' ? '复仇已失效' : e === 'revenge already active' ? '复仇已在进行中' : e === 'no charges left' ? '复仇次数已用完' : e === 'not_spouse' ? '你不是他的道侣' : e;
        if (typeof toastLog === 'function') toastLog('bad', '开启复仇失败：' + txt);
      }
      doMail();
    });
  } catch(e) {}
};
function refreshMainMailBtn(){
  try {
    const el = document.getElementById('mailMainCount');
    if (!el) return;
    const n = (typeof S !== 'undefined' && S && S.mail) ? S.mail.filter(m => !m.claimed).length : 0;
    el.textContent = n ? '（' + n + '未读）' : '';
  } catch (_) {}
}
async function mailPull(){
  if (window._mailPulling) return;
  if (!window.MHXY || !MHXY.api) return;
  window._mailPulling = true;
  try {
    const r = await MHXY.api('/api/mail/pending');
    const j = r && r.json;
    if (!(j && j.ok && Array.isArray(j.mails))) return;
    S.mail = S.mail || [];
    const have = new Set(S.mail.map(m => m.sid).filter(Boolean));
    const fresh = j.mails.filter(m => !have.has(m.id));
    if (!fresh.length) return;
    fresh.forEach(m => {
      const p = (m.payload && typeof m.payload === 'object') ? m.payload : {};
      S.mail.push({ from: m.from, title: m.title, text: m.text, stamina: Math.floor(Number(p.stamina) || 0), items: (p.items && typeof p.items === 'object') ? p.items : null, claimed: false, sid: m.id, kind: m.kind, pk: (p.pk && typeof p.pk === 'object') ? p.pk : null });
    });
    commit();
    MHXY.api('/api/mail/ack', { method: 'POST', body: { ids: fresh.map(m => m.id) } }).catch(() => {});
    refreshMainMailBtn();
    doMail();
  } catch (_) {}
  finally { window._mailPulling = false; }
}
async function doMailClaimServer(sid){
  if (!window.MHXY || !MHXY.api) { toastLog('bad', '未连接真人联机'); return; }
  const r = await MHXY.api('/api/mail/claim', { method: 'POST', body: { id: sid } });
  if (r.ok && r.json && r.json.ok) {
    const g = r.json.granted || {};
    if (g.stamina) S.stamina = (S.stamina | 0) + g.stamina;
    if (g.items) { S.inv = S.inv || {}; Object.keys(g.items).forEach(k => { S.inv[k] = (S.inv[k] | 0) + g.items[k]; }); }
    const m = (S.mail || []).find(x => x.sid === sid);
    if (m) m.claimed = true;
    const parts = [];
    if (g.stamina) parts.push(g.stamina + '体力');
    if (g.items) Object.keys(g.items).forEach(k => parts.push(k + '×' + g.items[k]));
    toastLog('good', '📬 奖励已领取' + (parts.length ? '：' + parts.join('、') : ''));
    try { if (typeof M !== 'undefined' && M && r.json.rev) { M.baseRev = r.json.rev; try { localStorage.setItem('mhxy_rev', String(r.json.rev)); } catch (_) {} } } catch (_) {}
    commit();
    refreshMainMailBtn();
    doMail();
  } else {
    const e = (r.json || {}).error || r.status;
    if (e === 'already_claimed') { const m = (S.mail || []).find(x => x.sid === sid); if (m) m.claimed = true; commit(); refreshMainMailBtn(); doMail(); }
    else toastLog('bad', '领取失败：' + e);
  }
}
function doMail() {
  xyInit();
  mailPull();
  const unclaimed = S.mail.filter(m => !m.claimed);
  let html = `<h2>📬 邮箱</h2>`; if (S.mail.some(m => m.claimed)) html += `<div class="row"><button class="btn sm" data-maildelall>🗑️ 删除全部已读</button></div>`;
  if (!S.mail.length) html += `<div class="empty">空空如也</div>`;
  else html += S.mail.slice().reverse().map((m, ri) => {
    const i = S.mail.length - 1 - ri;
    return `<div class="row"><div class="lab">💌 ${m.from}<small>${m.title ? m.title + '：' : ''}${m.text}</small></div>${(m.pk && m.pk.steal) ? `<button class="btn gold sm" onclick="window.pkStealPick('${String(m.pk.steal).replace(/'/g, '')}')">🎁 挑选战利品</button>` : ''}${(m.pk && m.pk.death && m.pk.bountyRight && m.pk.code) ? `<button class="btn danger sm" onclick="window.pkMailBounty('${String(m.pk.code).replace(/'/g, '')}')">📜 发布通缉</button>` : ''}${(m.pk && m.pk.revenge && !m.pkDone) ? `<button class="btn danger sm" onclick="window.pkMailRevenge('${m.sid || ''}','${String(m.pk.victim || '').replace(/'/g, '')}')">${(typeof myAid === 'function' && m.pk.victim === myAid()) ? '⚔️ 开启复仇' : '⚔️ 代为复仇'}</button>` : ''}${m.claimed ? '<small>已领取</small><button class="btn sm" data-maildel="' + i + '">删除</button>' : (m.sid ? `<button class="btn gold sm" data-mailclaimsv="${m.sid}">领取奖励</button>` : `${(m.stamina|0) > 0 ? `<button class="btn gold sm" data-mailclaim="${i}">领取${m.stamina}体力</button>` : `<button class="btn sm" data-mailclaim="${i}">已读</button>`}`)}</div>`;
  }).join('');
  html += `<div class="row"><button class="btn full" data-a="xianyuan">← 返回仙缘</button></div>`;
  openSheet(html);
}
// ===== v1164 真人宗门/仙盟（三期）：面板与频道（服务端 sect.js）=====
function sectErr(r) {
  const e = (r && r.json && r.json.error) || '';
  const map = { need_xy10: '仙缘不足 10 点', name_taken: '这个名字被占了', already_in_sect: '你已在宗门里', no_invite: '邀请已失效', cooldown: '退宗冷却中，3 天内不能进新宗门', sect_full: '宗门人数已满', not_bound: '只能邀请你的仙缘绑定者', no_perm: '权限不足', vice_exists: '已有副宗主，先免现任', elder_full: '长老已满 2 人', master_must_transfer: '宗主须先传位或解散宗门', need_build100: '建设度不足 100', already_in_alliance: '已在仙盟中', alliance_full: '仙盟已满 5 个宗门', not_leader: '只有盟主能发公告', no_target: '对方不存在', target_in_sect: '对方已在宗门里', sect_gone: '宗门已不在了', already: '今天已经签到过了', bad_name: '名字不合规', not_member: '对方不是本宗成员', empty: '内容为空', no_sect: '你不在宗门里', no_alliance: '尚未加入仙盟', bad_target: '目标不对', bad_role: '职位不对' };
  return map[e] || ('失败：' + (e || (r && r.status) || '网络不通'));
}
function sectApi(path, body) {
  if (body) return MHXY.api(path, { method: 'POST', body });
  return MHXY.api(path);
}
window.sectHomeRender = function(j) {
  const el = document.getElementById('xySect'); if (!el) return;
  window._mySect = j;
  let h = '';
  if (j.sect) {
    h += `<div class="row"><div class="lab">🏯 ${esc(j.sect.name)}<small>建设度 ${j.sect.build} · 成员 ${j.sect.members.length}/${j.sect.cap} · 我是${j.sect.myRoleName}</small></div><button class="btn gold" data-a="sect">进入</button></div>`;
  } else {
    if ((j.invites || []).length) {
      h += `<h3>宗门邀请</h3>` + j.invites.map(function(iv) {
        const sid = String(iv.sectId).replace(/'/g, '');
        return `<div class="row"><div class="lab">🏯 ${esc(iv.sectName)}<small>建设度 ${iv.build} · 成员 ${iv.members} 人</small></div><button class="btn gold sm" onclick="window.sectAccept('${sid}')">加入</button><button class="btn sm" onclick="window.sectDecline('${sid}')">拒绝</button></div>`;
      }).join('');
    }
    if ((j.cooldownMs | 0) > 0) h += `<div class="hint">退宗冷却中：还剩 ${Math.ceil(j.cooldownMs / 3600000)} 小时才能加入新宗门。</div>`;
    else if ((j.xyCount | 0) >= 10) h += `<div class="row"><button class="btn gold full" data-xysect="1">🏯 开设宗门（仙缘 ${j.xyCount} 点）</button></div>`;
    else h += `<div class="hint">🏯 仙缘满 10 点可开设宗门（当前 ${j.xyCount | 0}/10）；加入宗门需宗门里的人邀请你（只能邀各自的绑定者）。</div>`;
    if (S.sect) h += `<div class="hint">旧的本地宗门「${esc(S.sect.name || '')}」已停用，现在是真人宗门了。</div>`;
  }
  el.innerHTML = h;
};
window.sectCreate = function() {
  const nm = prompt('输入宗门名称（12 字内）：', (S.sect && S.sect.name) || '');
  if (!nm || !nm.trim()) return;
  sectApi('/api/sect/create', { name: nm.trim() }).then(function(r) {
    if (r.ok && r.json && r.json.ok) {
      S.sect = null; S.sectChat = []; commit();
      log('good', `🏯 宗门 <b class="y">${esc(nm.trim())}</b> 开设成功，你是宗主！`);
      window._mySect = r.json; doSect();
    } else toastLog('bad', '开设失败：' + sectErr(r));
  }).catch(function() { toastLog('bad', '开设失败（网络不通）'); });
};
window.sectAccept = function(sid) {
  sectApi('/api/sect/accept', { sectId: sid }).then(function(r) {
    if (r.ok && r.json && r.json.ok) { log('good', '🏯 已加入宗门！'); window._mySect = r.json; doSect(); }
    else toastLog('bad', '加入失败：' + sectErr(r));
  }).catch(function() { toastLog('bad', '加入失败（网络不通）'); });
};
window.sectDecline = function(sid) {
  sectApi('/api/sect/decline', { sectId: sid }).then(function() { doXianyuan(); }).catch(function() { doXianyuan(); });
};
function sectPanelRender(j) {
  window._mySect = j;
  const sc = j.sect;
  if (!sc) { openSheet(`<h2>🏯 宗门</h2><div class="hint">你还没有加入宗门。</div><div class="row"><button class="btn full" data-a="xianyuan">← 返回仙缘</button></div>`); return; }
  const isMaster = sc.myRole === 'master';
  const canInvite = ['master', 'vice', 'elder'].includes(sc.myRole);
  let h = `<h2>🏯 ${esc(sc.name)}</h2><div class="hint">建设度 <b class="y">${sc.build}</b> · 成员 ${sc.members.length}/${sc.cap} · 我是 <b class="y">${sc.myRoleName}</b></div>`;
  h += sc.checkedInToday
    ? `<div class="row"><div class="lab">📅 今日已签到<small>每日签到建设度 +1</small></div><button class="btn" disabled>已签到</button></div>`
    : `<div class="row"><div class="lab">📅 宗门签到<small>每日签到建设度 +1</small></div><button class="btn gold" onclick="window.sectCheckin()">签到</button></div>`;
  h += `<h3>成员</h3>` + sc.members.map(function(m) {
    const tid = String(m.accountId).replace(/'/g, '');
    let act = '';
    if (isMaster && m.accountId !== (window._myAidCache || '')) {
      // 宗主管理按钮（不能对自己）
      act = `<span style="white-space:nowrap">`
        + (m.role !== 'vice' ? `<button class="btn sm" onclick="window.sectRole('${tid}','vice')">副宗主</button>` : '')
        + (m.role !== 'elder' ? `<button class="btn sm" onclick="window.sectRole('${tid}','elder')">长老</button>` : '')
        + (m.role !== 'disciple' ? `<button class="btn sm" onclick="window.sectRole('${tid}','disciple')">弟子</button>` : '')
        + `<button class="btn sm" onclick="window.sectTransfer('${tid}')">传位</button>`
        + `<button class="btn danger sm" onclick="window.sectKick('${tid}')">踢出</button></span>`;
    }
    return `<div class="row"><div class="lab">🧑 ${esc(m.username)} <span class="tag">${m.roleName}</span><small>编号 [${m.playerNo || '?'}]</small></div>${act}</div>`;
  }).join('');
  if (canInvite) h += `<h3>邀请绑定者</h3><div id="sectInviteList"><div class="hint">加载绑定者…</div></div>`;
  // 仙盟
  h += `<h3>🤝 仙盟</h3>`;
  if (j.alliance) {
    const al = j.alliance;
    h += `<div class="row"><div class="lab">🤝 ${esc(al.name)}<small>${al.sects.length}/5 个宗门</small></div></div>`;
    h += al.sects.map(function(x) {
      return `<div class="row"><div class="lab">🏯 ${esc(x.name)}${x.id === al.leaderSectId ? ' <span class="tag">盟主宗</span>' : ''}<small>建设度 ${x.build | 0} · 宗主 ${esc(x.masterName || '')}</small></div></div>`;
    }).join('');
    if (al.amLeader) h += `<div class="row" style="display:flex;gap:8px"><input id="allyAnnText" maxlength="300" placeholder="全盟公告（发到全盟成员邮箱）" style="flex:1;padding:8px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;min-width:0"><button class="btn gold" onclick="window.allyAnnounce()">发布</button></div>`;
    if (isMaster) h += `<div class="row"><button class="btn full" onclick="window.allyLeave()">退出仙盟</button></div>`;
  } else if (isMaster && sc.build >= 100) {
    h += `<div class="row"><button class="btn gold full" onclick="window.allyCreate()">创建仙盟</button></div><div id="sectAllyList"><div class="hint">加载仙盟列表…</div></div>`;
  } else if (isMaster) {
    h += `<div class="hint">建设度满 100 可创建 / 加入仙盟（当前 ${sc.build}）。</div>`;
  } else {
    h += `<div class="hint">本宗尚未加入仙盟（由宗主决定）。</div>`;
  }
  h += `<h3>🏆 宗门榜（建设度）</h3><div id="sectRankList"><div class="hint">加载中…</div></div>`;
  h += `<div class="row"><button class="btn full" data-a="xianyuan">← 返回仙缘</button></div>`;
  h += isMaster
    ? `<div class="row"><button class="btn danger full" onclick="window.sectDisband()">解散宗门</button></div><div class="hint">宗主要退出宗门，须先传位给成员或解散宗门。</div>`
    : `<div class="row"><button class="btn danger full" onclick="window.sectLeave()">退出宗门</button></div><div class="hint">退宗后 3 天内不能加入新宗门。</div>`;
  openSheet(h);
  // 异步填充：邀请名单 / 盟列表 / 宗门榜
  if (canInvite) {
    MHXY.api('/api/xianyuan/list').then(function(r) {
      const el = document.getElementById('sectInviteList'); if (!el) return;
      if (!r.ok || !r.json) { el.innerHTML = '<div class="hint">绑定者加载失败</div>'; return; }
      const memberIds = {}; sc.members.forEach(function(m) { memberIds[m.accountId] = 1; });
      const cand = (r.json.binders || []).filter(function(b) { return !memberIds[b.accountId]; });
      el.innerHTML = cand.length ? cand.map(function(b) {
        const tid = String(b.accountId).replace(/'/g, '');
        return `<div class="row"><div class="lab">🧑 ${esc(b.username || '?')}<small>编号 [${b.playerNo || '?'}]</small></div><button class="btn gold sm" onclick="window.sectInvite('${tid}')">邀请</button></div>`;
      }).join('') : '<div class="hint">没有可邀请的绑定者（绑定者须未在任何宗门）。</div>';
    }).catch(function() {});
  }
  if (!j.alliance && isMaster && sc.build >= 100) {
    MHXY.api('/api/ally/list').then(function(r) {
      const el = document.getElementById('sectAllyList'); if (!el) return;
      if (!r.ok || !r.json) { el.innerHTML = ''; return; }
      const list = (r.json.list || []).filter(function(a) { return a.sects < 5; });
      el.innerHTML = list.length ? '<h4 style="margin:8px 0 4px">可加入的仙盟</h4>' + list.map(function(a) {
        const aid = String(a.id).replace(/'/g, '');
        return `<div class="row"><div class="lab">🤝 ${esc(a.name)}<small>${a.sects}/5 宗 · 总建设度 ${a.totalBuild} · 盟主宗 ${esc(a.leaderSectName || '')}</small></div><button class="btn gold sm" onclick="window.allyJoin('${aid}')">加入</button></div>`;
      }).join('') : '<div class="hint">暂无可加入的仙盟，可自己创建。</div>';
    }).catch(function() {});
  }
  MHXY.api('/api/sect/list').then(function(r) {
    const el = document.getElementById('sectRankList'); if (!el) return;
    if (!r.ok || !r.json) { el.innerHTML = '<div class="hint">榜单加载失败</div>'; return; }
    el.innerHTML = (r.json.list || []).length ? r.json.list.map(function(x, i) {
      return `<div class="row"><div class="lab">${i + 1}. 🏯 ${esc(x.name)}${x.id === sc.id ? ' <span class="tag">本宗</span>' : ''}<small>建设度 ${x.build} · 成员 ${x.members}/${x.cap} · 宗主 ${esc(x.masterName)}</small></div></div>`;
    }).join('') : '<div class="empty">暂无宗门</div>';
  }).catch(function() {});
}
function sectRefresh(r) {
  if (r.ok && r.json && r.json.ok) { window._mySect = r.json; sectPanelRender(r.json); return true; }
  toastLog('bad', sectErr(r)); return false;
}
window.sectCheckin = function() { sectApi('/api/sect/checkin', {}).then(sectRefresh).catch(function() { toastLog('bad', '签到失败（网络不通）'); }); };
window.sectInvite = function(tid) {
  sectApi('/api/sect/invite', { targetId: tid }).then(function(r) {
    if (r.ok && r.json && r.json.ok) toastLog('good', '邀请已发出，等对方在仙缘面板确认');
    else toastLog('bad', '邀请失败：' + sectErr(r));
  }).catch(function() { toastLog('bad', '邀请失败（网络不通）'); });
};
window.sectKick = function(tid) { if (!confirm('确定踢出这名成员？')) return; sectApi('/api/sect/kick', { targetId: tid }).then(sectRefresh).catch(function() { toastLog('bad', '操作失败（网络不通）'); }); };
window.sectRole = function(tid, role) { sectApi('/api/sect/role', { targetId: tid, role }).then(sectRefresh).catch(function() { toastLog('bad', '操作失败（网络不通）'); }); };
window.sectTransfer = function(tid) { if (!confirm('确定把宗主之位传给他？你将成为普通弟子。')) return; sectApi('/api/sect/transfer', { targetId: tid }).then(sectRefresh).catch(function() { toastLog('bad', '传位失败（网络不通）'); }); };
window.sectLeave = function() { if (!confirm('确定退出宗门？退后 3 天内不能加入新宗门。')) return; sectApi('/api/sect/leave', {}).then(function(r) { if (sectRefresh(r)) log('sys', '已退出宗门（3 天冷却）。'); }).catch(function() { toastLog('bad', '退宗失败（网络不通）'); }); };
window.sectDisband = function() { if (!confirm('确定解散宗门？成员将全部退出，建设度清零，不可恢复！')) return; sectApi('/api/sect/disband', {}).then(function(r) { if (r.ok && r.json && r.json.ok) { window._mySect = r.json; log('sys', '宗门已解散。'); doXianyuan(); } else toastLog('bad', sectErr(r)); }).catch(function() { toastLog('bad', '解散失败（网络不通）'); }); };
window.allyCreate = function() {
  const nm = prompt('输入仙盟名称（12 字内）：', '');
  if (!nm || !nm.trim()) return;
  sectApi('/api/ally/create', { name: nm.trim() }).then(sectRefresh).catch(function() { toastLog('bad', '建盟失败（网络不通）'); });
};
window.allyJoin = function(aid) { if (!confirm('确定让本宗加入这个仙盟？')) return; sectApi('/api/ally/join', { allyId: aid }).then(sectRefresh).catch(function() { toastLog('bad', '入盟失败（网络不通）'); }); };
window.allyLeave = function() { if (!confirm('确定让本宗退出仙盟？')) return; sectApi('/api/ally/leave', {}).then(sectRefresh).catch(function() { toastLog('bad', '退盟失败（网络不通）'); }); };
window.allyAnnounce = function() {
  const inp = document.getElementById('allyAnnText');
  const v = inp ? (inp.value || '').trim() : '';
  if (!v) { toastLog('sys', '先写公告内容'); return; }
  sectApi('/api/ally/announce', { text: v }).then(function(r) {
    if (r.ok && r.json && r.json.ok) { toastLog('good', `公告已发到全盟成员邮箱（${r.json.sent} 人）`); if (inp) inp.value = ''; }
    else toastLog('bad', '发布失败：' + sectErr(r));
  }).catch(function() { toastLog('bad', '发布失败（网络不通）'); });
};
window._sectSyncAt = 0;
function sectChatSync(scope, force) { // 宗门/仙盟频道：拉宗门信息 + 消息（4 秒节流）
  try {
    if (typeof MHXY === 'undefined' || !MHXY.api || !(MHXY.loggedIn && MHXY.loggedIn())) return;
    const now = Date.now();
    if (!force && now - (window._sectSyncAt || 0) < 4000) return;
    window._sectSyncAt = now;
    MHXY.api('/api/sect/me').then(function(r) {
      if (r && r.ok && r.json && r.json.ok) window._mySect = r.json;
      return MHXY.api(scope === 'ally' ? '/api/ally/chat/list' : '/api/sect/chat/list');
    }).then(function(r2) {
      if (r2 && r2.ok && r2.json && r2.json.ok) {
        const key = scope === 'ally' ? '_allyMsgs' : '_sectMsgs';
        const changed = JSON.stringify(window[key] || []) !== JSON.stringify(r2.json.msgs || []);
        window[key] = r2.json.msgs || [];
        if (changed) { const cf = document.getElementById('chatFloat'); if (cf && cf.classList.contains('on') && typeof window.renderChatFloat === 'function') window.renderChatFloat(); }
      }
    }).catch(function() {});
  } catch (_) {}
}
function sectChatSend(scope, v) {
  MHXY.api(scope === 'ally' ? '/api/ally/chat/send' : '/api/sect/chat/send', { method: 'POST', body: { text: String(v).slice(0, 200) } }).then(function(r) {
    if (r && r.ok && r.json && r.json.ok) sectChatSync(scope, true);
    else if (r && r.status === 429) toastLog('sys', '发言太快，歇一下');
    else toastLog('bad', '发送失败：' + sectErr(r));
  }).catch(function() { toastLog('bad', '发送失败（网络不通）'); });
}
function doSect() { // v1164 真人宗门面板（服务端数据）
  if (typeof MHXY === 'undefined' || !MHXY.loggedIn || !MHXY.loggedIn()) { toastLog('sys', '先到真人联机登录，才能用宗门'); return; }
  try { window._myAidCache = (typeof myAid === 'function') ? myAid() : ''; } catch (_) {}
  openSheet('<h2>🏯 宗门</h2><div class="hint">加载中…</div>');
  MHXY.api('/api/sect/me').then(function(r) {
    if (r.ok && r.json && r.json.ok) sectPanelRender(r.json);
    else openSheet('<h2>🏯 宗门</h2><div class="hint">加载失败：' + sectErr(r) + '</div>');
  }).catch(function() { openSheet('<h2>🏯 宗门</h2><div class="hint">加载失败（网络不通）</div>'); });
}
function doArenaStart() {
  if (S.afk) { try { const gain = afkExit(S, 'arena'); log('good', gain > 0 ? `🧘 出关迎战，获得 <span class="g">${resLbl(S)} +${gain}</span>。` : `🧘 出关迎战。`); } catch(e) { S.afk = null; } }
  const pk0 = C.pkStart(S, S.realm | 0); if (!pk0) { if (S.dead) { afterAct(); commit(); } return; }
  pk0.isArena = true;
  pk0.opp.name = '守擂者·' + pk0.opp.name;
  pk = pk0; pk.target = 'foe';
  closeSheet();
  log('pk', `🏟️ 你登上擂台，挑战 <b class="x">${pk.opp.name}</b>（${C.REALMS[pk.opp.realm]} Lv.${pk.opp.lv}）！`);
  afterAct(); commit(); render();
}
window._showNpcInfo = function(idx) { // v556 信息栏点NPC
  try {
    const _list = window['_npcList' + idx] || [];
    if (!_list.length) return;
    const _n = _list[0];
    const _nm = _n[3] || '无名修士', _rl = _n[4]|0, _lv = _n[5]|0, _rn = _n[6] || '', _av = _n[2] || '';
    const _img = _av ? '<img src="' + _av + '" style="width:40px;height:40px;border-radius:50%;vertical-align:middle"> ' : '';
    let _all = _list.map(function(x,i){ return (i+1) + '. ' + (x[3]||'') + ' ' + (x[6]||'') + ' Lv.' + (x[5]|0); }).join('<br>');
    if (typeof openSheet === 'function') openSheet('<h2>' + _img + _nm + '</h2><div class="hint">' + _rn + ' Lv.' + _lv + '</div>' + (_list.length > 1 ? '<div class="hint">同格还有：<br>' + _all + '</div>' : '') + '<div class="row"><button class="btn danger full" onclick="doNpcPk(\'' + _nm + '\',' + _rl + ',' + _lv + ')">⚔️ 切磋PK</button></div><button class="btn full" data-a="close">关闭</button>');
  } catch(e) {}
};
window.doNpcPk = function(name, realm, lv) {
  // v545 与地图NPC切磋：按NPC境界匹配对手
  if (typeof closeSheet === 'function') closeSheet();
  if (typeof doPkStart === 'function') doPkStart(realm);
}; // v545
function _revengeRow() { // v958 复仇状态行
  try {
    const now = Date.now();
    if ((S.revengeUntil|0) > now) {
      const _m = Math.ceil(((S.revengeUntil|0) - now) / 60000);
      return `<div class="row"><div class="lab">⚔️ <b class="r">复仇中</b><small>剩余${_m}分钟，PK胜利不扣功德</small></div></div>`;
    }
    if ((S.lastPkLossAt|0) > 0 && now - (S.lastPkLossAt|0) < 86400000) {
      return `<div class="row"><div class="lab">⚔️ <b class="y">复仇</b><small>战败后24小时内可开启，持续1小时</small></div><button class="btn danger" onclick="window.doRevenge()">开启复仇</button></div>`;
    }
  } catch(_) {}
  return '';
}
window.doRevenge = function() { // v958 开启复仇
  try {
    S.revengeUntil = Date.now() + 3600000;
    try { log('good', '⚔️ <b class="r">复仇状态已开启</b>！1小时内PK胜利不扣功德（首胜后解除）'); } catch(_) {}
    try { if (typeof commit === 'function') commit(); } catch(_) {}
    try { if (typeof doPkChooseRealm === 'function') doPkChooseRealm(); } catch(_) {}
  } catch(_) {}
};
function doPkChooseRealm() {
  if (S.dead || S.stamina < K.COST_PK) { doPkStart(S.realm|0); return; }
  const cr = S.realm|0;
  const _rmap = C.REALMS.map((rn, i) => i).filter(i => cr < 12 || i === 12); // 主宰只能打主宰
  openSheet(`<h2>🥊 选择对手境界</h2><div class="hint">当前境界：<b class="y">${C.REALMS[cr]}</b> · 对手属性按境界差 ×2<sup>|差|</sup>（高你1境=2倍，高2境=4倍）${cr >= 12 ? '<br><span class="r">主宰境只能与主宰切磋</span>' : ''}</div>` +
    `<div class="row"><div class="lab">🌐 <b class="y">联机对战</b><small>与真人玩家实时1v1（测试版）</small></div><button class="btn gold" data-netpk="1">寻找对手</button></div>` +
    _rmap.map(i => { const rn = C.REALMS[i]; const d = i - cr; const tag = d === 0 ? '同境' : (d > 0 ? `高${d}境` : `低${-d}境`); const mult = d === 0 ? '' : ` · 属性×${Math.pow(2, Math.abs(d))}`; return `<div class="row"><div class="lab">${rn}<small>${tag}${mult}</small></div><button class="btn ${d === 0 ? 'gold' : 'danger'}" data-pkrealm="${i}">${d === 0 ? '切磋' : (d > 0 ? '挑战' : '碾压')}</button></div>`; }).join('') +
    _revengeRow() +
    `<div class="row"><button class="btn" data-close="1">取消</button></div>`);
}
function doPkStart(forceRealm) {
  if (S.afk) { try { const gain = afkExit(S, 'pk'); log('good', gain > 0 ? `🧘 出关迎战，获得 <span class="g">${resLbl(S)} +${gain}</span>。` : `🧘 出关迎战。`); } catch(e) { S.afk = null; } }
  pk = C.pkStart(S, forceRealm); if (!pk) { if (S.dead) { afterAct(); commit(); } return; }
  pk.target = 'foe'; // 默认目标：对手本人
  try {
    const A = pk.battle && pk.battle.A;
    if (A && A.isPlayer && A.S && (A.S.realm|0) >= 1 && (A.S.realm|0) < 8 && typeof C.manaMax === 'function') {
      A.maxMp = Math.max(1, Math.floor(C.manaMax(A.S)));
      const cap = (typeof C.manaCapEff === 'function') ? C.manaCapEff(A.S) : A.maxMp * 10;
      A.mp = Math.max(0, Math.min(cap, Math.floor(A.S.mana)));
    }
  } catch (_) {}
  pk.zxPending = Object.keys(S.zx || {}).some(k => S.zx[k] > 0 && DISHES[k] && DISHES[k].zx); // 有珍馐：战前先选是否使用
  const o = pk.opp;
  const oInfo = encodeURIComponent(JSON.stringify({name:o.name, realm:o.realm||0, level:o.lv||1, attrs:o.attrs||{}, skills:o.skills||[], style:o.style||'', pet:o.pet||null, lifespan:o.lifespan||0}));
  log('pk', `🥊 你向 <b class="x"><a href="javascript:void(0)" data-person="${esc(o.name)}" data-info="${oInfo}" style="color:#7ec8ff;text-decoration:underline;cursor:pointer">${o.name}</a></b>（${o.style} · Lv.${o.lv}）发起切磋！${o.skills.length ? ' <span class="pu">' + o.skills.map(k => SKILLS[k].name).join('·') + '</span>' : ''}<br><small style="color:var(--dim)">${ATTRS.map(k => AN[k] + o.attrs[k]).join(' ')}</small>` + (o.pet ? `<br>对方携带灵宠 ${PETS[o.pet.k].icon}<b class="x">${PETS[o.pet.k].name}</b> <small style="color:var(--dim)">${ATTRS.map(k => AN[k] + o.pet.attrs[k]).join(' ')}</small>` : '') + (pk.battle.A.pet ? `<br>你的 ${pk.battle.A.pet.name} 随你出战！` : ''));
  afterAct(); save(); render();
}
function doPkZhenxiu(key) {
  if (!pk || !pk.zxPending) return;
  if (key) { const L = C.applyZhenxiu(S, pk, key); if (L) log('pk', L.join('')); }
  pk.zxPending = false;
  save(); render();
}
function doPkAction(act) {
  if (!pk || pk.zxPending || pk._acting) return;
  const b = pk.battle;
  pk._acting = true;
  try { const ac = $('actions'); if (ac) ac.style.opacity = '0.5'; } catch (_) {}
  setTimeout(() => { try { doPkActionGo(act); } catch (e) { try { pk._acting = false; const ac2 = $('actions'); if (ac2) ac2.style.opacity = ''; } catch (_) {} } }, 700);
}
function pkHandleOver() { // v805 合并：删除旧版，保留v791版
  try { if (typeof window !== 'undefined' && window.pk) pk = window.pk; } catch(_) {} // v835 跨块同步
  let _pk = null;
  try { _pk = (typeof pk !== 'undefined' && pk) ? pk : null; } catch(_) {}
  if (!_pk) { try { const _G = (typeof G !== 'undefined' ? G : window); _pk = (_G && _G.pk) ? _G.pk : null; } catch(_) {} } // v791 心魔战pk挂window时从window取
  if (!_pk) return;
  const b = _pk.battle;
  if (_pk.trib === 'thunder') { try { (window.pkSettle || pkSettle)(S, _pk); } catch(_e) { try { log('sys', '雷劫结算异常:' + (_e.message || _e)); } catch(_) {} } try { if (typeof pk !== 'undefined') pk = null; } catch(_) {} try { const _G2 = (typeof G !== 'undefined' ? G : window); if (_G2) _G2.pk = null; } catch(_) {} try{render();}catch(_){} return; } // v692 清外部pk；v725 pkSettle异常保护；v726 用window.pkSettle；v791 清window.pk
  if (_pk.trib === 'sanshi') { // v812 斩三尸结算
    try {
      const _idx = (_pk.tribData && _pk.tribData.sanShiIdx) | 0;
      const _names = ['上尸·彭倨', '中尸·彭质', '下尸·彭矫'];
      const _win = b && b.B && b.B.hp < 1; // 敌方血量<1算赢
      const _G3 = (typeof G !== 'undefined' ? G : window);
      if (_win) {
        S.sanShi = S.sanShi || [0,0,0];
        S.sanShi[_idx] = 1;
        log('good', `⚔️ <b>${_names[_idx]||'三尸'}已斩！</b>（${S.sanShi.filter(x=>x).length}/3）`);
      } else {
        const _lost = Math.max(1, Math.floor((S.lifespan|0) * 0.10));
        S.lifespan = Math.max(1, (S.lifespan|0) - _lost);
        log('bad', `💀 斩${_names[_idx]||'三尸'}失败，折寿10%（-${_lost}年）`);
      }
      if (typeof commit === 'function') commit();
    } catch(_e) {}
    try { if (typeof pk !== 'undefined') pk = null; } catch(_) {}
    try { const _G4 = (typeof G !== 'undefined' ? G : window); if (_G4) _G4.pk = null; } catch(_) {}
    try { render(); } catch(_) {}
    return;
  }
  if (_pk.trib === 'demon') { try { const _Gs = (typeof G !== 'undefined' ? G : window); const _Ss = _Gs.S || window.S || (typeof S !== 'undefined' ? S : null); (window.finishDemonBattle || finishDemonBattle)(_Ss); } catch(_e) {} finally { try { if (typeof pk !== 'undefined') pk = null; } catch(_) {} try { const _G5 = (typeof G !== 'undefined' ? G : window); if (_G5) _G5.pk = null; } catch(_) {} try { window.pk = null; } catch(_) {} try { if (typeof render === 'function') render(); } catch(_) {} } return; } // v654；v808 用window版跨script块；v814 传S；v847 finally确保清pk，finishDemonBattle先调（需tribData）
  if (pk.escape) {
    log('good', '💨 你成功逃离了战斗。');
    pk = null; afterAct(); commit();
    if (S.run) sheetRun();
    return;
  }
  if (pk.adv) { finishAdvBattle(); return; }
  if (b.winner === b.A) { render(); sheetPkWin(); return; }
  finishPk();
}
function pkClearActing() { try { if (pk) pk._acting = false; const ac = $('actions'); if (ac) ac.style.opacity = ''; } catch (_) {} }
function doPkActionGo(act) {
  try { if (typeof window !== 'undefined') pk = window.pk || null; } catch(_) {} // v836 跨块同步：window.pk是null就清掉，不留旧对象；v833方向
  try { if (typeof log === 'function' && pk && pk.trib === 'demon') log('sys', `[诊断]攻击: seq=${pk._seq||'无'}, B.hp=${pk.battle&&pk.battle.B?pk.battle.B.hp:'?'}, windowSeq=${window._pkSeq||'无'}`); } catch(_) {} // v834 诊断
  if (!pk || pk.zxPending) return;
  const b = pk.battle;
  // v299 操作记录：记玩家动作
  try {
    if (b && Array.isArray(b.opLines)) {
      const actName = { attack: '⚔️普通攻击', defend: '🛡️防御', mana_defend: '🛡️仙力防御', magic_defend: '🔰法术防御', flee: '🏳️逃跑' }[act] || (String(act).indexOf('mana_attack:') === 0 ? '⚡仙力攻击×' + act.split(':')[1] : String(act));
      b.opLines.push(`<div>第${b.round + 1}回合：你使用了【${actName}】</div>`);
    }
  } catch (_) {}
  if (typeof act === 'string' && act.indexOf('mana_attack:') === 0) {
    const amt = Math.max(0, Math.floor(+act.split(':')[1] || 0));
    const isXian = (S.realm|0) >= 8;
    const curMp = Math.floor(b.A.mp);
    if (amt <= 0 || amt > curMp) { log('bad', '法力不足'); pkClearActing(); return; }
    b.A.mp = curMp - amt; S.mana = Math.max(0, (S.mana|0) - amt); save();
    if (typeof renderCombat === 'function') try { renderCombat(); } catch (_) {}
    const dmg = Math.round(amt * (isXian ? 1000000 : 10) * (b.A._xb || 1));
    const label = isXian ? '⚡仙力攻击' : '💧法力攻击';
    const unit = isXian ? '仙力' : '法力';
    // 直接伤害（无视防御，能量灌注）
    let tgt = b.B;
    if (pk.target === 'pet' && b.B.pet && b.B.pet.hp > 0 && !b.B.pet.ko) tgt = b.B.pet;
    tgt.hp = Math.max(0, tgt.hp - dmg);
    log('pk', `${label}！消耗 <span class="pu">${amt}</span> 点${unit}，造成 <span class="r">${C.fmtN(dmg)}</span> 点伤害！`);
    save(); render();
    const _isThunderTgt = (b.B && b.B.name && b.B.name.indexOf('雷云') >= 0) || (pk && pk.trib === 'thunder'); // v724 雷云判定增强
    if (tgt.hp <= 0 || b.B.hp <= 0 || (_isThunderTgt && b.B.hp < 1)) { b.over = true; b.winner = b.A; pkClearActing(); pkHandleOver(); return; } // v719/v724 雷云小数血量击杀判定
    // 本回合玩家已用法力攻击，标记跳过普通攻击动作（燃血/燃法照常扣）
    b.A._skipAtk = true;
    let playerAct2 = 'attack';
    if (b.A) b.A._targetChoice = pk.target;
    const foeAct2 = C.aiChoose(b.B, b.A);
    const prepL2 = b.prepRound(playerAct2, foeAct2);
    if (!prepL2) { b.A._skipAtk = false; pkClearActing(); return; }
    log('pk', prepL2.join(''));
    const order2 = b._order;
    const doFinish2 = () => {
      if (!pk) return; // v967 雷劫已结算，pk 已置空，直接返回防炸
      b.A._skipAtk = false;
      pk.turnBanner = null;
      if (pk.target === 'pet' && !(b.B.pet && b.B.pet.hp > 0)) pk.target = 'foe';
      const Le = b.finishRound();
      if (pk && pk.trib === 'thunder' && (b.B.hp < 1 || (b.round >= (b.tribStrikes || 9) && b.A.hp > 0))) { try{ (C.pkSettle||window.pkSettle)(S, pk); }catch(_e){ try{ log('sys','雷劫doFinish结算报错:'+(_e.message||_e)); }catch(_){} } pk = null; try{render();}catch(_){} return; } // v700 雷云优先结算
    if (pk && pk.trib === 'demon' && b.B.hp < 1) { try { if (typeof pkHandleOver === 'function') pkHandleOver(); } catch(_e) {} try{render();}catch(_){} return; } // v797 心魔优先结算（仿雷云v700）
      if (pk && pk.trib === 'demon' && b.B.hp < 1) { try { if (typeof pkHandleOver === 'function') pkHandleOver(); } catch(_e) {} try{render();}catch(_){} return; } // v797 心魔优先结算（仿雷云v700）
      if (pk.trib === 'thunder' && !b.over && b.round >= (b.tribStrikes || 9) && b.A.hp > 0) { // v654 雷劫10回合存活即胜
        b.over = true; b._tribSurvive = true;
        const _sl = '<div class="bl y">⚡ ' + (b.tribStrikes || 9) + '道天雷已尽，你扛过了天雷洗礼！雷云缓缓散去……</div>';
        Le.push(_sl); log('pk', _sl);
      }
      if (Le.length) log('pk', Le.join(''));
      save(); render(); pkClearActing();
        if (b.over) pkHandleOver();
    };
    const doOne2 = (idx) => {
      if (!pk) { b.A._skipAtk = false; pkClearActing(); return; }
      const [me, foe, a] = order2[idx];
      const isMe = (me === b.A);
      if (isMe && me._skipAtk) {
        // 玩家本回合已用法力攻击，跳过动作
        const dead = b.A.hp <= 0 || b.B.hp <= 0;
        if (dead) { doFinish2(); return; }
        if (idx === 1) { setTimeout(doFinish2, 500); return; }
        setTimeout(() => doOne2(1), 500);
        return;
      }
      let mvName = '普通攻击';
      try { if (a === 'defend') mvName = '防御'; else if (a && a !== 'attack' && typeof SKILLS !== 'undefined' && SKILLS[a]) mvName = SKILLS[a].name || a; else if (a && a !== 'attack') mvName = a; } catch (_) {}
      pk.turnBanner = { who: isMe ? 'me' : 'foe', txt: isMe ? `⚔️ 你使用【${mvName}】！` : `⚔️ ${b.B.name}使用【${mvName}】！` };
      const L = b.playHalf(me, foe, a);
      if (L.length) log('pk', L.join(''));
      try { const mCap = b.A.maxMp * (b.A.S ? C.maiMult(b.A.S) : 2); if (b.A.mp > mCap) b.A.mp = mCap; } catch (_) {}
      save(); render();
      const dead2 = b.A.hp <= 0 || b.B.hp <= 0;
      if (dead2) { doFinish2(); return; }
      if (idx === 1) { setTimeout(() => { try { doFinish2(); } catch (e) { pkClearActing(); } }, 2000); return; }
      setTimeout(() => { try { doOne2(1); } catch (e) { pkClearActing(); } }, 2000);
    };
    doOne2(0);
    return;
  }
  if (act === 'surrender' && pk.trib) { // v654 渡劫中逃跑视为落败
    if (!confirm('天威之下逃跑视为渡劫失败，确定吗？')) { pkClearActing(); return; }
    log('bad', '🏳️ 天威之下，无处可逃——渡劫失败！');
    pk.battle.over = true; pk.battle.winner = pk.battle.B;
    pkClearActing(); pkHandleOver();
    return;
  }
  if (act === 'surrender') {
    if (!confirm('确定逃跑？50%概率成功，失败则视为落败。')) { pkClearActing(); return; }
    if (Math.random() < 0.5) {
      log('good', '🏃 逃跑成功！');
      pk.battle.over = true; pk.escape = true;
    } else {
      log('bad', '🏳️ 逃跑失败，被对方抓住！');
      C.pkSurrender(pk);
    }
    pkClearActing(); pkHandleOver();
    return;
  }
  let playerAct = act;
  /* v60 xburst 单次攻击已废弃，改为开关 */
  if (b.A) b.A._targetChoice = pk.target;
  const foeAct = C.aiChoose(b.B, b.A);
  // 敏捷高者先手，你一下我一下
  const prepL = b.prepRound(playerAct, foeAct);
  if (!prepL) { pkClearActing(); return; }
  log('pk', prepL.join(''));
  const order = b._order;
  const doFinish = () => {
    pk.turnBanner = null;
    if (pk.target === 'pet' && !(b.B.pet && b.B.pet.hp > 0)) pk.target = 'foe'; // 宠物已死切回打人
    const Le = b.finishRound();
    if (pk && pk.trib === 'thunder' && (b.B.hp < 1 || (b.round >= (b.tribStrikes || 9) && b.A.hp > 0))) { try{ (C.pkSettle||window.pkSettle)(S, pk); }catch(_e){ try{ log('sys','雷劫doFinish结算报错:'+(_e.message||_e)); }catch(_){} } pk = null; try{render();}catch(_){} return; } // v700 雷云优先结算
    if (pk && pk.trib === 'demon' && b.B.hp < 1) { try { if (typeof pkHandleOver === 'function') pkHandleOver(); } catch(_e) {} try{render();}catch(_){} return; } // v797 心魔优先结算（仿雷云v700）
    if (pk.trib === 'thunder' && !b.over && b.round >= (b.tribStrikes || 9) && b.A.hp > 0) { // v654 雷劫10回合存活即胜
      b.over = true; b._tribSurvive = true;
      const _sl = '<div class="bl y">⚡ ' + (b.tribStrikes || 9) + '道天雷已尽，你扛过了天雷洗礼！雷云缓缓散去……</div>';
      Le.push(_sl); log('pk', _sl);
    }
    if (Le.length) log('pk', Le.join(''));
    save(); render();
    pkClearActing();
    if (b.over) pkHandleOver();
  };
  const doOne = (idx) => {
    if (!pk) { pkClearActing(); return; }
    const [me, foe, a] = order[idx];
    const isMe = (me === b.A);
    let mvName = '普通攻击';
    try { if (a === 'defend') mvName = '防御'; else if (a && a !== 'attack' && typeof SKILLS !== 'undefined' && SKILLS[a]) mvName = SKILLS[a].name || a; else if (a && a !== 'attack') mvName = a; } catch (_) {}
    pk.turnBanner = { who: isMe ? 'me' : 'foe', txt: isMe ? `⚔️ 你使用【${mvName}】！` : `⚔️ ${b.B.name}使用【${mvName}】！` };
    const L = b.playHalf(me, foe, a);
    /* v60 爆发开关不再清除 */
    if (L.length) log('pk', L.join(''));
    try { const mCap = b.A.maxMp * (b.A.S ? C.maiMult(b.A.S) : 2); if (b.A.mp > mCap) b.A.mp = mCap; } catch (_) {}
    save(); render();
    const dead = b.A.hp <= 0 || b.B.hp <= 0;
    if (dead) { doFinish(); return; }
    if (idx === 1) { setTimeout(() => { try { doFinish(); } catch (e) { pkClearActing(); } }, 2000); return; }
    setTimeout(() => { try { doOne(1); } catch (e) { pkClearActing(); } }, 2000);
  };
  doOne(0);
}
async function finishAdvBattle() {
  const run = S.run, b = pk.battle;
  const r = await C.advBattleSettle(S, run, b);
  const head = `⚔️ ${monCard(run.ev.mon)}`;
  log(r.win ? 'good' : 'bad', `${head}<br>${r.lines.join('；')}` + `<details><summary>战斗记录（${b.round} 回合）</summary>${b.lines.join('')}</details>`);
  pk = null;
  const out = { lines: r.lines, ev: run.ev, battle: b };
  if (run.defeat || S.dead) out.end = C.advEnd(S, S.dead ? 'dead' : 'defeat');
  else if (r.win) {
    if (run.grid) { // v182 格子：终点 BOSS 打赢即通关，否则继续走格子（v184：同步格子事件状态；v185：守怪战利品）
      const g = run.grid, t = g.tiles[g.py][g.px];
      if (run.ev.monTile) { const mt = run.ev.monTile; if (run.shared && run.shared.on) advMonKillShared(mt); else if (t.mons) t.mons[mt.tier] = Math.max(0, (t.mons[mt.tier] | 0) - 1); run.ev = null; out.lines.push('⚔️ 怪物已除'); }
      else if (run.ev.exitBoss) { t.done = 1; t.ev = null; out.lines.push('击败守关者，抵达终点'); out.end = C.advEnd(S, 'done'); }
      else { if (run.ev.guardedFrom) out.lines.push('⚔️ 守怪已除；' + C.guardedLoot(S, run, run.ev.loot)); t.evDone = 1; t.ev = null; run.ev = null; }
    }
    else if (run.step >= run.steps) { out.lines.push('抵达终点'); out.end = C.advEnd(S, 'done'); }
    else { run.step++; C.advNewEvent(S, run); out.ev = run.ev; }
  }
  if (out.end) { showAdvEnd(out); return; }
  afterAct(); commit(); sheetRun(out);
}
window.finishPk = function(chosen) {
  const r = C.pkSettle(S, pk, chosen), o = pk.opp;
  const oInfo2 = encodeURIComponent(JSON.stringify({name:o.name, realm:o.realm||0, level:o.lv||1, attrs:o.attrs||{}, skills:o.skills||[], style:o.style||'', pet:o.pet||null, lifespan:o.lifespan||0}));
  if (pk.isArena) { // v247 擂台结果显示
    if (r.win) { S.pkWin = (S.pkWin|0)+1; S._pkStreak = (S._pkStreak|0)+1; log('good', `🏟️ 你在擂台上击败了 <b class="x">${o.name}</b>！积分 <span class="y">+${r.arenaScore}</span>，金元 <span class="y">+${r.gold}</span>，经验 +${r.xp}${r.becameChampion ? '<br>🏆 <b class="y">你成为了新任擂主！</b>守擂1分钟=1积分' : ''}` + lvUpTxt(r.lvUp) + petXpTxt(r)); }
    else { S.pkLose = (S.pkLose|0)+1; S._pkStreak = 0; log('bad', `🏟️ 你在擂台上败给了 <b class="x">${o.name}</b>，积分 <span class="r">${r.arenaScore}</span>，经验 +${r.xp}`); }
    const ex = [];
    if (r.bites) ex.push(`<span class="r">${petTag(r.pet)} 本场反咬你 ${r.bites} 次，忠诚 -${2 * r.bites}</span>`);
    if (r.petDead) ex.push(`<span class="r">💀 ${petTag(r.pet)} 本场阵亡：寿命 -${K.PET_DEATH_LIFE}（余 ${r.pet.life}）、忠诚 -${K.PET_DEATH_LOYAL}</span>`);
    if (r.petGone) ex.push(`<span class="r">🪦 ${petTag(r.pet)} 寿命耗尽，永远离你而去了……</span>`);
    if (r.pet && !r.petGone) ex.push(`${petTag(r.pet)} 饥饿 ${Math.round(r.pet.hunger)} · 忠诚 ${r.pet.loyal}${r.loyal ? ` <span class="g">(+${r.loyal})</span>` : ''}`);
    if (r.newSt && r.newSt.length) ex.push(`⚠️ 你陷入 ${stTxt(r.newSt)}`);
    if (ex.length) log(r.win ? 'good' : 'bad', ex.join('<br>'));
    pk = null; delete $('mask').dataset.lock; closeSheet(); afterAct(); commit(); return;
  }
  if (r.win) { // v958 以大欺小扣功德（复仇状态免扣，首胜后解除复仇）
    try {
      const _or = (o && typeof o.realm === 'number') ? (o.realm|0) : (S.realm|0);
      const _diff = (S.realm|0) - _or;
      if ((S.revengeUntil|0) > Date.now()) { S.revengeUntil = 0; try { log('sys', '⚔️ 复仇完成，复仇状态解除'); } catch(_) {} }
      else if (_diff > 0 && typeof addMerit === 'function') addMerit(-10 * _diff, `以大欺小（对方低${_diff}境）`);
    } catch(_) {}
  }
  if (r.win) log('good', `🏆 你击败了 <b class="x"><a href="javascript:void(0)" data-person="${esc(o.name)}" data-info="${oInfo2}" style="color:#7ec8ff;text-decoration:underline;cursor:pointer">${o.name}</a></b>，夺取 ${AN[r.attr]} <span class="g">+${r.take}</span>，金元 <span class="y">+${r.gold}</span>，经验 +${r.xp}` + lvUpTxt(r.lvUp) + petXpTxt(r) + (r.sha ? `<br>👹 获得 <b class="y">煞气 ×1</b>（背包中习得吞魔后可吞噬）` : '') + (r.shaPet ? `<br>👹 击杀敌方灵宠获得 <b class="y">煞气 ×${r.shaPet}</b>` : '') + (r.curse ? `<br>👻 你被 <b class="r">诅咒</b>了！诅咒×${r.curse}，突破成功率 -${r.curse}%（永久叠加）` : ''));
  else if (r.protected) log('good', `💔 你败给了 <b class="x"><a href="javascript:void(0)" data-person="${esc(o.name)}" data-info="${oInfo2}" style="color:#7ec8ff;text-decoration:underline;cursor:pointer">${o.name}</a></b>，<span class="y">🛡️新人保护（余 ${r.protectLeft} 次）</span>免除被夺走 ${AN[r.attr]} -${r.wouldTake}，经验 +${r.xp}` + lvUpTxt(r.lvUp) + petXpTxt(r));
  else { if (!r.draw) { try { S.lastPkLossAt = Date.now(); } catch(_) {} } log('bad', `${r.draw ? '☠️<span class="r">同归于尽</span>！' : '💔 你败给了 '}<b class="x"><a href="javascript:void(0)" data-person="${esc(o.name)}" data-info="${oInfo2}" style="color:#7ec8ff;text-decoration:underline;cursor:pointer">${o.name}</a></b>，被夺走 ${AN[r.attr]} <span class="r">-${r.take}</span>，经验 +${r.xp}` + lvUpTxt(r.lvUp) + petXpTxt(r) + (r.draw ? `<br>⚔️ 互夺：你夺得 ${AN[r.drawTakeAttr]} <span class="g">+${r.drawTake}</span>；${r.drawLost ? `你的 <span class="r">${C.lootLabel('inv', r.drawLost)}×1</span> 被对方夺走` : '你的背包空无一物'}；你夺得对方 <span class="y">${r.drawGot ? C.lootLabel('inv', r.drawGot.k) + '×1' : '（对方背包已空）'}</span>${r.drawPctLoss && Object.keys(r.drawPctLoss).length ? `；全属性消散1%：<span class="r">${Object.keys(r.drawPctLoss).map(a => AN[a] + '-' + r.drawPctLoss[a]).join(' ')}</span>` : ''}` : '')); }
  const ex = [];
  if (r.bites) ex.push(`<span class="r">${petTag(r.pet)} 本场反咬你 ${r.bites} 次，忠诚 -${2 * r.bites}</span>`);
  if (r.petDead) ex.push(`<span class="r">💀 ${petTag(r.pet)} 本场阵亡：寿命 -${K.PET_DEATH_LIFE}（余 ${r.pet.life}）、忠诚 -${K.PET_DEATH_LOYAL}</span>`);
  if (r.petGone) ex.push(`<span class="r">🪦 ${petTag(r.pet)} 寿命耗尽，永远离你而去了……</span>`);
  if (r.pet && !r.petGone) ex.push(`${petTag(r.pet)} 饥饿 ${Math.round(r.pet.hunger)} · 忠诚 ${r.pet.loyal}${r.loyal ? ` <span class="g">(+${r.loyal})</span>` : ''}`);
  if (r.newSt && r.newSt.length) ex.push(`⚠️ 你陷入 ${stTxt(r.newSt)}`);
  if (ex.length) log(r.win ? 'good' : 'bad', ex.join('<br>'));
  pk = null; delete $('mask').dataset.lock; closeSheet(); afterAct(); commit();
}
function doReset() {
  if (!confirm('确定要重置存档吗？所有进度将被清除且无法恢复！')) return;
  localStorage.removeItem(SAVE_KEY); pk = null; S = C.newState(); closeSheet(); $('log').innerHTML = ''; welcome(); commit();
}

function commit() { if (typeof S === 'undefined' || !S) { try { load(); } catch(_) {} } if (typeof S === 'undefined' || !S) return; try { if (typeof arrayTick === 'function') arrayTick(S); } catch(_) {} // v899 采集阵tick
  try { obsWatch(); } catch(_) {} // v1015 观礼瞭望
/* v1055 Ye 定：残页不再自动使用（原 v441 已去除） */ if ((S.maiVLuo|0) >= 10 && typeof C.synthVMai === 'function') { let _sn = 0; while ((S.maiVLuo|0) >= 10 && C.synthVMai(S)) _sn++; if (_sn > 0) log('good', `🌀 虚络满10自动合成 <b class="g">虚脉 +${_sn}</b>（当前 ${C.maiMult(S)} 倍）`); } save(); try { if (typeof checkAchievements === 'function') checkAchievements(); } catch(e) {} render(); } // v441 脉络残页满10自动使用；v442 虚络满10自动合成虚脉

/* ---------- 事件 ---------- */
document.addEventListener('touchstart', e => { const t = e.target.closest && e.target.closest('button'); if (t) { const a = document.activeElement; if (a && (a.id === 'xbInput')) a.blur(); } }, { passive: true });
function doBurnLife() {
  const A = pk.battle.A;
  A.burnLife = A.burnLife | 0;
  if (A.burnLife >= 10) { A.burnLife = 0; save(); renderCombat(); toastLog('sys', '⏳燃寿已关闭'); return; }
  if ((S.lifespan | 0) <= 10) { toastLog('sys', '寿元不足10年，无法燃烧'); return; }
  S.lifespan -= 10;
  A.burnLife++;
  log('good', '⏳燃寿！燃烧10年寿元，攻击+' + (A.burnLife * 30) + '%（' + A.burnLife + '/10层），剩余寿元' + S.lifespan + '年');
  save(); renderCombat();
}
document.addEventListener('change', function(e) {
  const t = e.target;
  if (!t || t.tagName !== 'SELECT') return;
  if (t.dataset && t.dataset.pktake && t.value && typeof window.finishPk === 'function') {
    window.finishPk(t.value);
  }
});
document.addEventListener('click', e => {
  if (typeof S === 'undefined' || !S) { try { load(); } catch(_) {} }
  if (typeof S === 'undefined' || !S) return;
  const sp = e.target.closest && e.target.closest('a[data-self]');
  if (sp) { e.preventDefault(); if (typeof sheetChar === 'function') sheetChar(); return; }
  const ap = e.target.closest && e.target.closest('a[data-person]');
  if (ap) {
    e.preventDefault();
    let e2 = null;
    try { if (ap.dataset.info) e2 = JSON.parse(decodeURIComponent(ap.dataset.info)); } catch (_) {}
    if (!e2 && ap.dataset.person && window._personCache) e2 = window._personCache[ap.dataset.person];
    if (!e2 && ap.dataset.person && typeof window.getChatPerson === 'function') e2 = window.getChatPerson(S, ap.dataset.person);
    if (e2) { sheetPersonInfo(e2); return; }
  }
  const ar = e.target.closest && e.target.closest('a[data-rankinfo]');
  if (ar && ar.dataset.rankinfo !== undefined) { e.preventDefault(); sheetRankInfo(+ar.dataset.rankinfo); return; }
  const t = e.target.closest('button'); if (!t || t.disabled) return;
  const d = t.dataset;
  if (window.MHXY && MHXY.onClick(d, t, e)) return; // v959 联机模块钩子
  if (d.afk) { window._afkShown = false; afkStart(S, d.afk); closeSheet(); log('good', `🧘 开始${d.afk === 'vein' ? '灵脉' : '洞府'}闭关挂机…`); save(); render(); return; }
  if (d.reincKeep) { const _k = d.reincKeep; openSheet(`<div style="min-height:40vh;display:flex;flex-direction:column;justify-content:center;gap:10px"><h2 style="font-size:18px;text-align:center">🔄 轮回之路</h2><div class="hint" style="text-align:center;font-size:13px">此世将尽，当选一条路：</div><div class="row"><button class="btn gold" data-seal-path="dao" data-attr="${_k}" data-v="1" style="flex:1;padding:16px;font-size:15px">求道<br><small style="font-weight:normal">天道随机赐下灵魂印记</small></button></div><div class="row"><button class="btn" data-seal-path="fame" data-attr="${_k}" data-v="1" style="flex:1;padding:16px;font-size:15px">求名<br><small style="font-weight:normal">自选印记主题，留名于世</small></button></div><div class="row"><button class="btn" data-a="close" style="flex:1">取消</button></div></div>`); return; } // v215 先选求道/求名
  else if (d.sealPath) { doReincarnateName(d.attr, S.forceReinc, d.sealPath); return; } // v215 进入封存面板
  if (d.reincMortal !== undefined) { doReincarnateConfirm(null, null, d.reincMortal === '1'); return; }
  if (d.reincConfirm) { let _sg; if (window._sealPath === 'fame') { const _fg = window._fameGen || { tpl: '', hint: '', ans: '', name: '', full: '' }; _sg = { seal: _fg.full, sealTpl: _fg.tpl, sealHint: _fg.hint, sealAns: _fg.ans, sealName: _fg.name, sealTheme: '' }; } else { const _gg = window._sealGen || { theme: '', phrase: '' }; _sg = { seal: _gg.phrase, sealTpl: '', sealHint: '', sealAns: '', sealName: '', sealTheme: _gg.theme }; } doReincarnateConfirm(d.reincConfirm, _sg, d.forced === '1'); return; } // v216 求道存主题，求名存名字模板；v219 存提示句；v220 存下半句答案
  else if (d.rerollSeal) { const _maxR = (window._sealPath === 'fame') ? 3 : 1; const _usedR = window._sealRerollCount | 0; if (_usedR >= _maxR) return; window._sealRerollCount = _usedR + 1; if (window._sealPath === 'fame') window._fameGen = genFameSeal(); else window._sealGen = genSoulSeal(); const _el = document.getElementById('sealPhrase'); if (_el) _el.innerHTML = sealPhraseHtml(); const _rb = document.querySelector('[data-reroll-seal]'); if (_rb) { const _left = _maxR - window._sealRerollCount; if (_left <= 0) _rb.style.display = 'none'; else if (window._sealPath === 'fame') _rb.textContent = `🔄 换一句（${_left}次）`; } return; } // v244 求名3次求道1次，用完按钮消失；v206 换一句印记；v216 求名重随名字模板
  if (d.sealPick) { const _sl = (S.sealed || []).find(x => x && x.id === d.sealPick && !x.done); if (_sl) sealAwakenPrompt(_sl); return; }
  if (d.sealUnlock) { const _cd = (document.getElementById('sealUnlock') || {}).value || ''; sealAwakenDo(d.sealUnlock, _cd); return; }
  if ('battlebag' in d) { sheetBattleBag(); return; }
  if (d.battleuse) { closeSheet(); doPkAction(d.battleuse); return; }
  if ('dieold' in d) { doDieOld(); return; }
  if (d.pkrealm !== undefined) { closeSheet(); doPkStart(+d.pkrealm); return; }
  if (d.arenaStart) { doArenaStart(); return; }
  if (d.arenaRank) { doArenaRank(d.arenaRank); return; }
  if (d.xyunbind !== undefined) { xyUnbind(+d.xyunbind); doXianyuan(); return; }
  if (d.xymarry !== undefined) { log('sys', '💕 道侣须与真人结：去仙缘面板，与绑定满7天的真人绑定者结为道侣。'); doXianyuan(); return; }
  if (d.mailclaim !== undefined) { const m = S.mail[+d.mailclaim]; if (m && !m.claimed) { m.claimed = true; const _mst = m.stamina|0; if (_mst > 0) { S.stamina = (S.stamina|0) + _mst; log('good', `📬 领取邮件体力 <span class="g">+${_mst}</span>`); } } commit(); refreshMainMailBtn(); doMail(); return; }
  if (d.mailclaimsv !== undefined) { doMailClaimServer(d.mailclaimsv); return; }
  if (d.maildel !== undefined) { S.mail.splice(+d.maildel, 1); commit(); refreshMainMailBtn(); doMail(); return; }
  if (d.maildelall !== undefined) { if (!confirm('确定删除全部已读邮件？')) return; S.mail = S.mail.filter(m => !m.claimed); commit(); refreshMainMailBtn(); doMail(); return; }
  if (d.xysect) { if (window.sectCreate) window.sectCreate(); return; } // v1164 改服务端开宗
  if ('netpk' in d) { Net.queue(); return; }
  if (d.netact) { Net.act(d.netact); return; }
  if ('close' in d) { closeSheet(); return; }
  if (d.refine) { doRefineGear(d.refine); return; }
  if (d.avataredit) { S._avatarSettings = 1; S._pickSet = S.avatarSet || 'r'; S._pickGender = S.gender || 'm'; sheetAvatar(S._pickGender); return; }
  if (d.avatarset) { S._pickSet = d.avatarset; sheetAvatar(S._pickGender || S.gender || 'm'); return; }
  if (d.clearavatar) { S.avatarCustom = null; S.avatarGalleryId = null; try { clearAvatarSeparate(); } catch(_) {} save(); sheetAvatar(S._pickGender || S.gender || 'm'); return; }
  if (d.avgal) { const e2 = (window._avGallery || []).find(x => String(x.id) === String(d.avgal)); if (e2 && e2.data) { if (S._avatarSettings && !avatarChangeCost()) { sheetAvatar(S._pickGender || S.gender || 'm'); return; } S.avatarCustom = e2.data; S.avatarGalleryId = e2.id; try { saveAvatarSeparate(e2.data, e2.id); } catch(_) {} S._avatarSettings = 0; save(); if (!S._onboarded) { S._avatarPicked = true; save(); toastLog('good', '🖼️ 已换上玩家图库头像'); chainNext(); } else if (S._reincChain) { S._reincStep = 'name'; toastLog('good', '🖼️ 已换上玩家图库头像'); chainNext(); } else { toastLog('good', '🖼️ 已换上玩家图库头像'); render(); sheetChar(); } } return; } // v1088 建号/轮回图库头像进链
  if (d.avsubmit) { if (!S.avatarCustom) { toastLog('bad', '先上传一张自己的头像'); return; } if (!(window.MHXY && MHXY.loggedIn && MHXY.loggedIn())) { toastLog('bad', '先登录联机账号才能提交入库'); return; } const nmIn = prompt('给这张图取个名（入库后按此名展示，12 字内）', ''); if (nmIn === null) return; const avName = String(nmIn).trim().slice(0, 12); if (!avName) { toastLog('bad', '先取个名再入库'); return; } MHXY.api('POST', '/api/avatar/submit', { data: S.avatarCustom, name: avName }).then(j => { if (j && j.ok) toastLog('good', '📮 已提交入库，审核通过后全服可选'); else toastLog('bad', '📮 玩家图库尚未开放'); }).catch(() => toastLog('bad', '📮 玩家图库尚未开放')); return; }
  if (d.wearach !== undefined) { S.titleAch = d.wearach || ''; save(); try { if (window.MHXY && MHXY.loggedIn()) MHXY.api('/api/profile/title', { method: 'POST', body: { title: S.titleAch } }).catch(() => {}); } catch(_) {} sheetChar(); return; }
  if (d.stele !== undefined) { sheetStele(); return; }
  if (d.stelepost !== undefined) { doStelePost(); return; }
  if (d.stelelike) { doSteleLike(d.stelelike); return; }
  if (d.rpbuy) { doRpBuy(d.rpbuy); return; }
  if (d.redopen !== undefined) { sheetRedpacket(); return; }
  if (d.redsend) { doRedpacketSend(d.redsend); return; }
  if (d.redsendgo) { doRedpacketSendGo(d.redsendgo); return; }
  if (d.redback !== undefined) { if (window.MHXY && MHXY.panel) MHXY.panel(); return; }
  if (d.redpacket) { doRedpacket(d.redpacket); return; }
  if (d.pooldonate) { doPoolDonate(d.pooldonate); return; }
  if (d.pooldonatego) { doPoolDonateGo(d.pooldonatego); return; }
  if (d.poolrefresh !== undefined) { poolRefreshTxt(); return; }
  if (d.poolview !== undefined) { sheetPool(); return; }
  if (d.steleclaim !== undefined) { doSteleClaim(); return; }
  if (d.spectate) { doSpectate(d.spectate, t.getAttribute('data-specmeta') || ''); return; }
  if (d.encopen) { openEncSheet(); return; }
  if (d.dreamopen !== undefined) { dreamOpen(); return; }
  if (d.dreamopt !== undefined) { doDreamOpt(+d.dreamopt); return; }
  if (d.dungeontext !== undefined) { if (S.run) S.run.ev = null; sheetRun(); return; }
  if (d.dungeoneditor !== undefined) { sheetDungeonEditor(); return; }
  if (d.dungeonmine !== undefined) { sheetDungeonMine(); return; }
  if (d.dungeonenter !== undefined) { doDungeonEnter(d.dungeonenter); return; }
  if (d.dungeonrate !== undefined) { MHXY.api('/api/creator/dungeon/rate', { method: 'POST', body: { id: S._lastDungeonId, stars: +d.dungeonrate } }).then(function() { toastLog('sys', '评分已记下，多谢道友'); closeSheet(); }); return; }
  if (d.dgpainttype !== undefined) { if (window._dgEdit) window._dgEdit.paint = d.dgpainttype; sheetDungeonEditor(); return; }
  if (d.dgsel !== undefined) { const _p = d.dgsel.split(',').map(Number); dgPaintCell(_p[0], _p[1]); sheetDungeonEditor(); return; }
  if (d.dgguard !== undefined) { const _ed = window._dgEdit; if (_ed && _ed.sel) _ed.tiles[_ed.sel[1]][_ed.sel[0]].guard = d.dgguard; sheetDungeonEditor(); return; }
  if (d.dgchest !== undefined) { const _ed = window._dgEdit; if (_ed && _ed.sel) _ed.tiles[_ed.sel[1]][_ed.sel[0]].chest = d.dgchest; sheetDungeonEditor(); return; }
  if (d.dgeventsave !== undefined) { const _ed = window._dgEdit, _el = document.getElementById('dgEvTxt'); if (_ed && _ed.sel && _el) _ed.tiles[_ed.sel[1]][_ed.sel[0]].text = _el.value.trim().slice(0, 40); sheetDungeonEditor(); return; }
  if (d.dgfee !== undefined) { if (window._dgEdit) window._dgEdit.fee = +d.dgfee; sheetDungeonEditor(); return; }
  if (d.dgsubmit !== undefined) { doDungeonSubmit(); return; }
  if (d.dgclear !== undefined) { window._dgEdit = dgNewEdit(); sheetDungeonEditor(); return; }
  if (d.encsubmit !== undefined) { doEncSubmit(); return; }
  if (d.encopt !== undefined && d.encopt !== null && d.encopt !== '') { doEncOpt(parseInt(d.encopt, 10)); return; }
  if (d.charpage) { window._charPage = parseInt(d.charpage); sheetChar(); return; }
  if (d.starview) { window._starView = d.starview; sheetChar(); return; }
  if (d.seat !== undefined) { window._starSeat = +d.seat; sheetChar(); return; }
  if (d.feedseat) { doFeedSeat(); return; }
  if (d.pillseat) { doPillSeat(); return; }
  if (d.qtyseat) { if (d.qtyseat === 'page') { const _cur = C.SZ_SEATS.findIndex((_, x) => C.szProg(S, x) < 10); const i = (window._starSeat === undefined) ? _cur : window._starSeat; if (i >= 0) window.szQty('page', i, false); } else { const i = (window._starSeat === undefined) ? C.szFirstDanOpen(S) : window._starSeat; if (i >= 0) window.szQty('pill', i, false); } return; }
  if (d.a) { const fn = ({ close: () => closeSheet(), checkin: () => doCheckin(false), train: sheetTrain, alchemy: () => sheetAlchemy(), life: () => sheetLife(lifeTab), adventure: sheetAdventure, wxsynth: sheetWxSynth, pk: doPkChooseRealm, arena: doArena, xianyuan: doXianyuan, mail: doMail, sect: doSect, shop: () => sheetShop(), bag: sheetBag, cave: () => { const _dg = S.dongfuGrids|0, _xg = S.xianfuGrids|0; if (_dg > 0 || _xg > 0) { if (typeof goBackCaveChoice === 'function') goBackCaveChoice(); } else { toastLog('sys', '🏔️ 洞府功能开发中，敬请期待'); } }, debug: () => doDebug(d.dbg), lvup: () => doLvUp(), reinc: () => doReincarnate(), breakthrough: () => doBreakthrough(), dazuo: () => doDazuo(), afkCave: () => doAfkChoose('cave'), afkVein: () => doAfkChoose('vein') })[d.a]; if (fn) fn(); }
  else if (d.advpage) sheetAdventure(+d.advpage);
  else if (d.adv) { petSay('battle', 0.3); doAdventure(d.adv); }
  else if (d.wxsyn) { const [k, kind] = String(d.wxsyn).split(':'); doWxSynth(k, kind); }
  else if (d.advc !== undefined) doAdvChoose(+d.advc);
  else if (d.advres !== undefined) { try { window.advGatherRes(); } catch(_) {} } // v1125 共享图手采资源
  else if (d.advres2 !== undefined) { try { if (S.run && S.run.shared && S.run.shared.on) window.advGatherRes(); else window.advLocalGatherUI(); } catch(_) {} } // v1154 当前格采集（共享/本地）
  else if (d.advatk !== undefined) { try { window.advAttackMon(d.advatk); } catch(_) {} } // v1154 选档攻击怪物
  else if (d.advplace !== undefined) { try { window.advPlaceArray(); } catch(_) {} } // v1125 布采集阵
  else if (d.advarr !== undefined) { try { window.advArrayPanel(); } catch(_) {} } // v1125 采集阵面板
  else if (d.a2fuel !== undefined) { try { window.advArrayFuel(); } catch(_) {} }
  else if (d.a2collect !== undefined) { try { window.advArrayTake(false); } catch(_) {} }
  else if (d.a2remove !== undefined) { try { window.advArrayTake(true); } catch(_) {} }
  else if (d.a2back !== undefined) { try { sheetRun(); } catch(_) {} }
  else if (d.advmove) doAdvMove(d.advmove);
  else if (d.advx !== undefined) { // v758 点地图格子移动；v762 缩地两格/大挪移三格；v763 1秒冷却；v764 斜走；v766 直接跳跃；v767 斜走需技能
    try {
      const _now = Date.now();
      if (window._advMoveCd && _now - window._advMoveCd < 1000) return; // 1秒内不重复移动
      const _gx = +d.advx, _gy = +d.advy, _run = S.run, _gr = _run && _run.grid;
      if (!_gr) return;
      // v971 共享地图：奖励格先 claim，成功才移动
      const _shared = _run.shared && _run.shared.on ? _run.shared : null;
      const _doMove = function() {
        window._advMoveCd = Date.now();
        const _tt = _gr.tiles[_gy] && _gr.tiles[_gy][_gx];
        if (_tt && _tt.t === 'void') return; // v1151 虚空格不可站
        const _stt = _shared && _shared.tiles && _shared.tiles[_gy] && _shared.tiles[_gy][_gx];
        if (_stt && _stt.t === 'void') return;
        const _dx = _gx - _gr.px, _dy = _gy - _gr.py;
        const _cheb = Math.max(Math.abs(_dx), Math.abs(_dy));
        const _dist = Math.abs(_dx) + Math.abs(_dy);
        const _hasSk = S.skills && S.skills.includes('shukuchi');
        const _hasDny = S.skills && S.skills.includes('danuoyi');
        const _maxDist = _hasDny ? 3 : (_hasSk ? 2 : 1);
        const _maxDiag = _hasDny ? 2 : (_hasSk ? 1 : 0);
        const _isOrth = (_dx === 0 || _dy === 0);
        const _canMove = (_isOrth && _dist >= 1 && _dist <= _maxDist) || ((!_isOrth) && (_hasSk || _hasDny) && _cheb >= 1 && _cheb <= _maxDiag);
        if (_canMove) {
          // v766 直接跳到目标格，只触发落点事件
          _gr.px = _gx; _gr.py = _gy; _gr.moves++;
          const _t = _gr.tiles[_gy][_gx];
          _run.ev = null;
          let _r = { moved: true };
          if (_stt && _stt.state === 'cleared') { _t.seen = 1; _t.ev = null; } // v1168 共享图已清理的事件格当空地走：不清这一行会再触发一次事件
          if (_run.dungeon && _t.t === 'exit') { // v1094 秘境通关：到达终点格即通关（无守关 BOSS）
            try { commit(); } catch(_) {}
            doDungeonClear(); return;
          }
          if (_t.t === 'exit' && !_t.done) {
            if (!_t.ev) { const _m = C.advMonster(S, _run.dk, (_run.dk === 'mijing' || _run.dk.startsWith('wx_')) ? 4 : 1); _t.ev = { type: 'fight', mon: _m, boss: true, exitBoss: true, text: '终点守关' }; _run.evCount = (_run.evCount|0) + 1; }
            _run.ev = _t.ev; _r.ev = _run.ev;
          } else if (_t.ev && !_t.evDone) {
            _run.ev = _t.ev; _r.ev = _run.ev;
          } else if ((_t.t === 'rherb' || _t.t === 'rore' || _t.t === 'rvein') && !_run.dungeon) { // v1125 本地图资源格：踩上即采；v1128 器具门槛（不过不消耗格）
            const _rkind = _t.t === 'rherb' ? 'herb' : _t.t === 'rvein' ? 'vein' : 'ore';
            const _gate = C.toolGateL(S, _rkind, _t.rg || 1);
            if (_gate.err) { _t.seen = 1; try { toastLog('bad', _gate.err); } catch(_) {} }
            else {
              _t.t = 'empty'; _t.seen = 1;
              try { const _rm2 = C.advResGrant(S, _run, _rkind, _t.rg || 1); if (_rm2) toastLog('good', _rm2); } catch(_) {}
            }
          } else if (!_t.seen && _t.t !== 'empty' && _t.t !== 'start') {
            _t.seen = 1; _run.evCount = (_run.evCount|0) + 1;
            if (_run.dungeon && _t.t === 'event') { // v1094 秘境事件格：只显示作者写的一句文本，不进系统事件库
              _run.ev = { type: 'dungeonText', text: _t.text || '这里留着前人的一句话。' };
              _t.ev = _run.ev; _r.ev = _run.ev;
            } else {
              const _savedDk = _run.dk;
              if (_run.dungeon && _t.guard) _run.dk = _t.guard;
              if (_run.dungeon && _t.t === 'gchest' && _t.chest === 'fine') { const _hks = ['h_str', 'h_agi', 'h_def', 'h_vit', 'h_int']; const _hk = _hks[Math.floor(Math.random() * _hks.length)]; S.mats = S.mats || {}; S.mats[_hk] = (S.mats[_hk] | 0) + 1; try { log('good', '📜 精致宝箱边还生着一株灵草，顺手采了。'); } catch(_) {} }
              try { (typeof advTileEvent === 'function' ? advTileEvent : window.advTileEvent)(S, _run, _t.t); } catch(_) {}
              _run.dk = _savedDk;
              _t.ev = _run.ev; _r.ev = _run.ev;
            }
          } else {
            _t.seen = 1;
          }
          if (_r.ev && _r.ev.exitBoss) { /* 终点事件在sheetRun显示 */ }
          try { commit(); } catch(_) {}
          try { sheetRun(_r); } catch(_) {}
          // v971 移动后同步位置到服务端
          try { C.advSharedHeartbeat(_gx, _gy); } catch(_) {}
          return;
        }
      }; // end _doMove
      // v971 共享地图 claim 检查
      if (_shared && _shared.tiles && _shared.tiles[_gy] && _shared.tiles[_gy][_gx]) {
        const _st = _shared.tiles[_gy][_gx];
        if (['fight', 'gchest', 'gherb'].indexOf(_st.t) >= 0) {
          if (_st.state === 'cleared') {
            _doMove(); // v1168 已清理格 = 空地，直接走上去（此前 return 拦死，人永远站不上💨格，Ye 报）
            return;
          }
          // 异步 claim
          window._advMoveCd = _now;
          const _dk = (_run.shared && _run.shared.dk) || 'easy';
          MHXY.api('/api/advmap/claim?dk=' + encodeURIComponent(_dk), { method: 'POST', body: { x: _gx, y: _gy } }).then(function(r) {
            if (r.ok && r.json && r.json.ok) {
              // claim 成功：更新本地 tile 状态，执行移动
              _st.state = 'cleared';
              _doMove();
            } else if (r.json && r.json.error === 'not_there' && !window._advClaimRetried) {
              // v1168 DO 玩家记录 5 分钟无心跳即删：站太久/打太久记录过期，claim 报 not_there——用当前站位补心跳后重试一次
              window._advClaimRetried = true;
              try { C.advSharedHeartbeat(_gr.px, _gr.py); } catch(_) {}
              setTimeout(function() {
                MHXY.api('/api/advmap/claim?dk=' + encodeURIComponent(_dk), { method: 'POST', body: { x: _gx, y: _gy } }).then(function(r2) {
                  window._advClaimRetried = false;
                  if (r2.ok && r2.json && r2.json.ok) { _st.state = 'cleared'; _doMove(); }
                  else { try { toastLog('sys', '💨 慢了一步，被别人抢先了'); } catch(_) {} }
                }).catch(function() { window._advClaimRetried = false; });
              }, 600);
            } else {
              try { toastLog('sys', '💨 慢了一步，被别人抢先了'); } catch(_) {}
              // 刷新共享状态
              MHXY.api('/api/advmap/state?dk=' + encodeURIComponent(_dk)).then(function(sr) {
                if (sr.ok && sr.json && sr.json.ok && S.run && S.run.shared) {
                  S.run.shared.tiles = sr.json.tiles;
                  S.run.shared.players = sr.json.players || [];
                  try { sheetRun(); } catch(_) {}
                }
              });
            }
          });
          return;
        }
      }
      // 非共享模式或非奖励格：直接移动
      _doMove();
    } catch(_) {}
  }
  else if (d.advretreat !== undefined) doAdvRetreat();
  else if (d.tquiz !== undefined) { const _tq = String(d.tquiz).split(':'); doTribQuizAnswer(+_tq[0], +_tq[1]); }
  else if (d.buy) doBuy(d.buy, d.k, +d.n || 1);
  else if (d.advself !== undefined) { // v768 冒险中点自己看状态；v770 打开完整人物面板
    try {
      window._fromAdv = true; // 标记从冒险打开
      if (typeof sheetChar === 'function') sheetChar();
    } catch(_) {}
  }
  else if (d.dazuo !== undefined) { // v761 冒险中调息
    try { doDazuo(); } catch(_) {}
    try { if (S.run && S.run.grid) sheetRun(); } catch(_) {}
  }
  else if (d.tpscroll !== undefined) { // v765 随机传送卷
    try {
      if ((S.meds.tpscroll|0) <= 0) return;
      const _run = S.run, _gr = _run && _run.grid;
      if (!_gr) return;
      S.meds.tpscroll--;
      // 随机选一格（排除当前位置）
      let _nx, _ny, _tries = 0;
      do {
        _nx = Math.floor(Math.random() * _gr.w);
        _ny = Math.floor(Math.random() * _gr.h);
        _tries++;
      } while ((_nx === _gr.px && _ny === _gr.py) && _tries < 50);
      _gr.px = _nx; _gr.py = _ny; _gr.moves++;
      try { if (typeof log === 'function') log('info', `📜 使用随机传送卷，传送到 (${_nx},${_ny})`); } catch(_) {}
      // 触发落点事件（复用advMove的事件逻辑）
      const _t = _gr.tiles[_ny][_nx];
      _run.ev = null;
      let _r = { moved: true };
      if (_t.t === 'exit' && !_t.done) {
        if (!_t.ev) { const _m = C.advMonster(S, _run.dk, (_run.dk === 'mijing' || _run.dk.startsWith('wx_')) ? 4 : 1); _t.ev = { type: 'fight', mon: _m, boss: true, exitBoss: true, text: '终点守关' }; _run.evCount = (_run.evCount|0) + 1; }
        _run.ev = _t.ev; _r.ev = _run.ev;
      } else if (_t.ev && !_t.evDone) {
        _run.ev = _t.ev; _r.ev = _run.ev;
      } else if (!_t.seen && _t.t !== 'empty' && _t.t !== 'start') {
        _t.seen = 1; _run.evCount = (_run.evCount|0) + 1;
        try { (typeof advTileEvent === 'function' ? advTileEvent : window.advTileEvent)(S, _run, _t.t); } catch(_) {}
        _t.ev = _run.ev; _r.ev = _run.ev;
      } else {
        _t.seen = 1;
      }
      try { commit(); } catch(_) {}
      try { sheetRun(_r); } catch(_) {}
    } catch(_) {}
  }
  else if (d.sellspirit !== undefined) { // v759 灵气石40金回收
    try {
      const _n = d.sellspirit === 'all' ? (S.ores.sp1|0) : 1;
      const _has = S.ores.sp1|0;
      if (_has <= 0) return;
      const _sellN = Math.min(_n, _has);
      S.ores.sp1 -= _sellN; S.gold = (S.gold|0) + _sellN * 40;
      try { if (typeof log === 'function') log('gold', `🛒 出售 🪨灵气石 ×${_sellN}（金元 +${_sellN*40}）`); } catch(_) {}
      try { if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.10); } catch(_) {} // v1095 卖灵石也触发雷云判定
      try { commit(); } catch(_) {}
      try { const _sy = $('sheet').scrollTop; sheetShop(); $('sheet').scrollTop = _sy; } catch(_) {}
    } catch(_) {}
  }
  else if (d.luopt) { useOpt.lu = useOpt.lu === d.luopt ? '' : d.luopt; sheetAlchemy(); }
  else if (d.spiritopt) { useOpt.spirit = useOpt.spirit === d.spiritopt ? '' : d.spiritopt; sheetAlchemy(); }
  else if (d.lu) doLu(d.lu, +d.n);
  else if (d.burn === 'life') doBurnLife();
  else if (d.xburst === 'toggle') {
    var _bA = (typeof pk !== 'undefined' && pk && pk.battle && pk.battle.A) ? pk.battle.A : null;
    var _on = _bA ? (_bA.xbOn|0) : (S.xianBurstOn|0);
    if (_on) {
      S.xianBurstOn = 0;
      if (_bA) { _bA.xbOn = 0; _bA.xbPts = 0; _bA._xb = 1; _bA._xbDef = 1; }
      save(); render();
      if (typeof renderCombat === 'function') { try { renderCombat(); } catch (_) {} }
      return;
    }
    var _max = Math.floor(S.mana);
    if (_max <= 0) { toastLog('sys', '仙力不足'); return; }
    var _v = prompt('仙力爆发用几点？(1-' + _max + ')', '' + Math.min(_max, (S.xianBurst|0) || 1));
    if (_v === null) return;
    var _pts = Math.max(1, Math.min(_max, Math.floor(+_v || 0)));
    if (!(_pts > 0)) return;
    S.xianBurst = _pts; S.xianBurstOn = 1;
    S.mana = Math.max(0, (S.mana|0) - _pts);
    if (_bA) { _bA.xbOn = 1; _bA.xbPts = _pts; _bA._xb = 1 + _pts * 0.2; _bA._xbDef = 1 + _pts * 0.2; _bA.mp = Math.max(0, _bA.mp - _pts); if (_bA.S) _bA.S.mana = S.mana; }
    save(); render();
    log('pk', '⚡仙力爆发开！消耗 ' + _pts + ' 点仙力，攻击和防御 +' + (_pts*20) + '%');
    if (typeof renderCombat === 'function') { try { renderCombat(); } catch (_) {} }
    return;
  }
  else if (d.battlelog !== undefined) { sheetBattleLog(); return; }
  else if (d.blogtab !== undefined) { const op = $('blogOp'), bat = $('blogBat'); if (op && bat) { const isOp = d.blogtab === 'op'; op.style.display = isOp ? '' : 'none'; bat.style.display = isOp ? 'none' : ''; } return; }
  else if (d.burnbloodtier !== undefined) { const _bA = (pk && pk.battle && pk.battle.A), _cur = _bA ? (_bA.burnBloodTier|0) : (S.burnBloodTier|0); let _nt = _cur >= 10 ? 0 : _cur + 1; S.burnBloodTier = _nt; S.burnBlood = _nt > 0; if (_bA) _bA.burnBloodTier = _nt; save(); render(); toastLog('sys', _nt > 0 ? `🔥燃血${['','一','二','三','四','五','六','七','八','九','十'][_nt]}倍（${_nt}/10层）` : '🔥燃血已关闭'); if (typeof renderCombat === 'function') try { renderCombat(); } catch (_) {} return; }
  else if (d.burntier !== undefined) { const _bA2 = (pk && pk.battle && pk.battle.A), _cur2 = _bA2 ? (_bA2.burnTier|0) : (S.burnTier|0); let _nt2 = _cur2 >= 10 ? 0 : _cur2 + 1; /*v694去法力上限*/ S.burnTier = _nt2; S.burnSpirit = _nt2 > 0; if (_bA2) _bA2.burnTier = _nt2; save(); render(); toastLog('sys', _nt2 > 0 ? `💧燃法${['','一','二','三','四','五','六','七','八','九','十'][_nt2]}倍（${_nt2}/10层）` : '💧燃法已关闭'); if (typeof renderCombat === 'function') try { renderCombat(); } catch (_) {} return; }
  else if (d.burn) {
    if (d.burn === 'blood') { const _nbt = +(d.burnbloodtier || 0); if (_nbt) { S.burnBloodTier = (S.burnBloodTier|0) === _nbt ? 0 : _nbt; S.burnBlood = (S.burnBloodTier|0) > 0; pk.battle.A.burnBloodTier = S.burnBloodTier|0; } else { S.burnBlood = !S.burnBlood; S.burnBloodTier = S.burnBlood ? 1 : 0; pk.battle.A.burnBloodTier = S.burnBloodTier|0; } }
    else { const _nt = +(d.burntier || 0); S.burnTier = (S.burnTier|0) === _nt ? 0 : _nt; S.burnSpirit = (S.burnTier|0) > 0; pk.battle.A.burnTier = S.burnTier|0; pk.battle.A.burnSpirit = (S.burnTier|0) > 0; }
    save(); renderCombat();
  }
  else if (d.target) { if (pk) { pk.target = d.target; save(); renderCombat(); } }
  else if (d.petorder !== undefined) { if (pk && pk.battle && pk.battle.A) { const _parts = String(d.petorder).split(':'), _pi = +_parts[0], _pv = _parts[1]; const _pets = pk.battle.A.pets || []; if (_pets[_pi]) { _pets[_pi]._order = _pv; save(); renderCombat(); toastLog('sys', `🐾${_pets[_pi].name}指令：${{auto:'🤖自动',attack:'⚔️攻击',defend:'🛡️防御',magic:'✨法术'}[_pv] || _pv}`); } } } 
  else if (d.c === 'xian_defend') {
    const b = pk.battle;
    const _curXian = Math.floor(b.A.mp);
    const v = prompt(`消耗多少仙力防御？(1点=100万防御，当前仙力 ${_curXian})`, '');
    if (v === null) return;
    const amt = Math.floor(+v || 0);
    if (amt <= 0) { toastLog('sys', '已取消'); return; }
    if (amt > _curXian) { toastLog('sys', `仙力不足（当前 ${_curXian}）`); return; }
    const defGain = amt * 1000000;
    b.A.def = (b.A.def|0) + defGain;
    if (b.A.pet && b.A.pet.hp > 0 && !b.A.pet.ko) b.A.pet.def = (b.A.pet.def|0) + defGain;
    b.A.mp = Math.max(0, (b.A.mp|0) - amt);
    S.mana = Math.max(0, (S.mana|0) - amt);
    log('pk', `🛡️仙力防御！消耗 <span class="pu">${amt}</span> 点仙力，你${b.A.pet && b.A.pet.hp > 0 && !b.A.pet.ko ? '和灵宠' : ''}防御 +<span class="g">${C.fmtN(defGain)}</span>（本回合有效）！`);
    save(); render();
    if (typeof renderCombat === 'function') try { renderCombat(); } catch (_) {}
    // 消耗本回合行动，对手正常行动
    b.A._skipAtk = true;
    b.A._xianDefOn = true; // v87：仙力防御反弹标记（只反弹仙力攻击）
    let playerAct2 = 'attack';
    if (b.A) b.A._targetChoice = pk.target;
    const foeAct2 = C.aiChoose(b.B, b.A);
    const prepL2 = b.prepRound(playerAct2, foeAct2);
    if (!prepL2) { b.A._skipAtk = false; pkClearActing(); return; }
    log('pk', prepL2.join(''));
    const order2 = b._order;
    for (const who of order2) {
      if (b.over) break;
      let L2 = [];
      if (who === b.A) {
        // 玩家本回合已用仙力防御，跳过动作
      } else {
        L2 = b.playHalf(b.B, b.A, foeAct2);
      }
      if (L2.length) log('pk', L2.join(''));
      if (b.over) break;
    }
    // 仙力防御只持续一回合：移除加成
    b.A.def = Math.max(0, (b.A.def|0) - defGain);
    if (b.A.pet) b.A.pet.def = Math.max(0, (b.A.pet.def|0) - defGain);
    b.A._skipAtk = false;
    b.A._xianDefOn = false; // v87：清除反弹标记
    pkClearActing();
    if (b.over) pkHandleOver();
    else { save(); render(); if (typeof renderCombat === 'function') try { renderCombat(); } catch (_) {} }
    return;
  }
  else if (d.c === 'fashu_defend') {
    const b = pk.battle;
    const isXian = (S.realm|0) >= 8, rate = isXian ? 1000000 : 10, unit = isXian ? '仙力' : '法力';
    const _curM = Math.floor(b.A.mp);
    const v = prompt(`消耗多少${unit}法术防御？(1${unit}=${isXian ? '100万' : '10'}点法术防御，专门抵挡法术，当前${unit} ${_curM})`, '');
    if (v === null) return;
    const amt = Math.floor(+v || 0);
    if (amt <= 0) { toastLog('sys', '已取消'); return; }
    if (amt > _curM) { toastLog('sys', `${unit}不足（当前 ${_curM}）`); return; }
    const mdefGain = amt * rate;
    b.A.mdef = (b.A.mdef|0) + mdefGain;
    if (b.A.pet && b.A.pet.hp > 0 && !b.A.pet.ko) b.A.pet.mdef = (b.A.pet.mdef|0) + mdefGain;
    b.A.mp = Math.max(0, (b.A.mp|0) - amt);
    S.mana = Math.max(0, (S.mana|0) - amt);
    log('pk', `🔰法术防御！消耗 <span class="pu">${amt}</span> 点${unit}，你${b.A.pet && b.A.pet.hp > 0 && !b.A.pet.ko ? '和灵宠' : ''}法术防御 +<span class="g">${C.fmtN(mdefGain)}</span>（本回合有效，专门抵挡法术伤害）！`);
    if ((b.A.burnTier|0) > 0) { b.A._manaShield = true; log('pk', `🔰<span class="pu">💧燃法灵盾</span>！法术伤害优先扣<span class="pu">法力</span>（蓝空则扣血），流失法力 <span class="y">×10</span> 法术回击`); }
    save(); render();
    if (typeof renderCombat === 'function') try { renderCombat(); } catch (_) {}
    // 消耗本回合行动，对手正常行动
    b.A._skipAtk = true;
    let playerAct2 = 'attack';
    if (b.A) b.A._targetChoice = pk.target;
    const foeAct2 = C.aiChoose(b.B, b.A);
    const prepL2 = b.prepRound(playerAct2, foeAct2);
    if (!prepL2) { b.A._skipAtk = false; pkClearActing(); return; }
    log('pk', prepL2.join(''));
    const order2 = b._order;
    for (const who of order2) {
      if (b.over) break;
      let L2 = [];
      if (who === b.A) {
        // 玩家本回合已用法术防御，跳过动作
      } else {
        L2 = b.playHalf(b.B, b.A, foeAct2);
      }
      if (L2.length) log('pk', L2.join(''));
      if (b.over) break;
    }
    // 法术防御只持续一回合：移除加成
    b.A.mdef = Math.max(0, (b.A.mdef|0) - mdefGain);
    if (b.A.pet) b.A.pet.mdef = Math.max(0, (b.A.pet.mdef|0) - mdefGain);
    b.A._manaShield = false;
    b.A._skipAtk = false;
    pkClearActing();
    if (b.over) pkHandleOver();
    else { save(); render(); if (typeof renderCombat === 'function') try { renderCombat(); } catch (_) {} }
    return;
  }
  else if (d.c === 'mana_attack') { try { if (typeof window !== 'undefined' && window.pk) pk = window.pk; } catch(_) {} const isXian = (S.realm|0) >= 8; const cur = pk && pk.battle && pk.battle.A ? Math.floor(pk.battle.A.mp) : 0; const unit = isXian ? '仙力' : '法力'; const ratio = isXian ? '1点=100万伤害' : '1点=10伤害'; const v = prompt(`输入消耗的${unit}（${ratio}，当前${cur}）：`, ''); if (v === null) return; const amt = Math.max(0, Math.floor(+v || 0)); if (amt <= 0) { toastLog('sys', '已取消'); return; } if (amt > cur) { toastLog('sys', `${unit}不足`); return; } doPkAction('mana_attack:' + amt); }
  else if (d.c) doPkAction(d.c);
  else if (d.zx !== undefined) doPkZhenxiu(d.zx);
  else if (d.train) doTrain(d.train, +d.n);
  else if (d.faze) doFaZe(d.faze);
  else if (d.gather) { const _gk=d.gather,_gn=+d.n||1; try { const _gp=document.getElementById('gatherProg'),_gb=document.getElementById('gatherProgBar'),_gt=document.getElementById('gatherProgTxt'); if(_gp&&_gb){ _gp.style.display='block'; _gb.style.width='0%'; const _names={mine:'挖矿中……',hunt:'打猎中……',farm:'种植中……',egg:'掏蛋中……',read:'看书中……'}; if(_gt)_gt.textContent=_names[_gk]||'采集中……'; let _p=0; const _iv=setInterval(()=>{ _p+=10; if(_gb)_gb.style.width=Math.min(100,_p)+'%'; if(_p>=100){ clearInterval(_iv); if(_gp)_gp.style.display='none'; doGather(_gk,_gn); } },80); } else { doGather(_gk,_gn); } } catch(_){ doGather(_gk,_gn); } } // v663 采集进度条
  else if (d.breakthrough !== undefined) doBreakthrough();
  else if (d.reincarnate !== undefined) doReincarnate();
  else if (d.sanshi !== undefined) { // v865 用window._bx命名空间（主块看不到fightAttrs，v864已证实）
    try {
      const _sidx = +d.sanshi;
      const _bx = window._bx || {};
      if (!_bx.Battle) throw new Error('battle not ready');
      try { if (typeof pk !== 'undefined') pk = null; } catch(_) {}
      try { const _G0 = (typeof G !== 'undefined' ? G : window); _G0.pk = null; } catch(_) {}
      try { window.pk = null; } catch(_) {}
      try { window._demonDeadT = 0; } catch(_) {}
      const _names = ['上尸·彭倨', '中尸·彭质', '下尸·彭矫'];
      const _name = _names[_sidx] || '三尸';
      const _fa = _bx.fightAttrs(S, false);
      const _dattrs = {}; _bx.ATTRS.forEach(k => _dattrs[k] = Math.max(1, Math.round(_fa[k] * 1.5))); // 三尸1.5倍属性
      const _foe = _bx.fighter('💀' + _name, _dattrs, false, []);
      const _b = new _bx.Battle(_bx.playerFighter(S, false), _foe);
      const _G = (typeof G !== 'undefined' ? G : window);
      try { window._pkSeq = Date.now(); } catch(_) {}
      const _pkS = { battle: _b, trib: 'sanshi', tribData: { sanShiIdx: _sidx }, target: 'foe', _seq: window._pkSeq };
      _G.pk = _pkS; try { window.pk = _pkS; } catch(_) {}
      try { closeSheet(); } catch(_){}
      log('warn', `💀 <b>${_name}现形！</b>——斩去三尸方能突破尊者！<br><span style="color:#888">此战凶险，败则折寿10%</span>`);
      try { if (typeof afterAct === 'function') afterAct(); } catch(_) {}
      try { if (typeof save === 'function') save(); } catch(_) {}
      try { if (typeof renderCombat === 'function') renderCombat(); else if (typeof render === 'function') render(); } catch(_) {}
    } catch(_e) { try { log('sys', '斩三尸失败:' + (_e.message||_e)); } catch(_) {} }
  }
  else if (d.sell) doSell(d.kind, d.sell, +d.n);
  else if (d.eat) doEat(d.eat, +d.n);
  else if (d.spirit) doSpirit(d.spirit, +d.n);
  else if (d.smash) doSmash(+d.smash);
  else if (d.hatch) doHatch();
  else if (d.cpage) doBook('cpage', d.cpage, +d.n);
  else if (d.ebook) sheetEbook(d.ebook, +d.n);
  else if (d.ebt) doBook('ebook', d.k, +d.n, d.ebt);
  else if (d.life) sheetLife(d.life);
  else if (d.craft) doCraft(d.craft, d.k, +d.n, d.craft === 'forge' ? { set: forgeSet } : null);
  else if (d.tame) { const _tn=+d.tame||1; try { if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) { S._trigFail=S._trigFail|0; S._succFail=S._succFail|0; const _trigP=Math.min(1,0.10+0.10*S._trigFail); let _tr=false; for (let _i=0;_i<_tn;_i++) { if (Math.random()<_trigP) { _tr=true; break; } } if (!_tr) { S._trigFail++; } else { S._trigFail=0; if (window.TRIB_OMEN) window.TRIB_OMEN.show(S); log('warn','<span style="filter:brightness(0)">🌩️</span> 雷云判定中……'); const _succP=Math.min(1,0.01+0.01*S._succFail); if (Math.random()<_succP) { S.thunderOk=true; S._succFail=0; S._trigFail=0; log('good','⚡ <b class="r">天道已将你锁定</b>！'); commit(); } else { S._succFail++; log('info','🌫️ 雷云散去……'); } } } } catch(_){} doTame(_tn); } // v667 驯兽内联
  else if (d.tameOnce !== undefined) { const _inp = document.getElementById('tameNInput'); S.tameN = Math.max(1, Math.min(999, parseInt(_inp && _inp.value) || S.tameN || 1)); commit(); const _tn2=S.tameN; try { if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) { S._trigFail=S._trigFail|0; S._succFail=S._succFail|0; const _trigP2=Math.min(1,0.10+0.10*S._trigFail); let _tr2=false; for (let _i2=0;_i2<_tn2;_i2++) { if (Math.random()<_trigP2) { _tr2=true; break; } } if (!_tr2) { S._trigFail++; } else { S._trigFail=0; if (window.TRIB_OMEN) window.TRIB_OMEN.show(S); log('warn','<span style="filter:brightness(0)">🌩️</span> 雷云判定中……'); const _succP2=Math.min(1,0.01+0.01*S._succFail); if (Math.random()<_succP2) { S.thunderOk=true; S._succFail=0; S._trigFail=0; log('good','⚡ <b class="r">天道已将你锁定</b>！'); commit(); } else { S._succFail++; log('info','🌫️ 雷云散去……'); } } } } catch(_){} doTame(_tn2); } // v667 修正v433：data-tame-once的dataset键是tameOnce（驼峰），不是'tame-once'
  else if (d.tamepill) doTamePill(+d.tamepill);
  else if (d.feedpill) doFeedPill(+d.feedpill);
  else if (d.fslot) { forgeSlot = d.fslot; sheetLife('forge'); }
  else if (d.fset) { forgeSet = d.fset; sheetLife('forge'); }
  else if (d.fkind) { forgeKind = d.fkind; sheetLife('forge'); }
  else if (d.pickpet) { forgePet = +d.pickpet; sheetLife('forge'); }
  else if (d.pequip) { const [pid, gid] = String(d.pequip).split(':'); const g = (S.petBag || []).find(x => x.id === +gid); if (C.equipPetGear(S, +pid, +gid) && g) log('good', `🎽 ${gearName(g)} 已穿戴`); commit(); sheetLife('forge'); }
  else if (d.punequip) { const [pid, sl] = String(d.punequip).split(':'); if (C.unequipPetGear(S, +pid, sl)) log('sys', '🎽 已卸下灵宠装备'); commit(); sheetLife('forge'); }
  else if (d.psell) { (async () => { const it = (S.petBag || []).find(x => x.id === +d.psell); const sr = await sellServer('petgear', +d.psell); if (sr && sr.ok) { log('gold', `🔨 出售 ${it ? gearName(it) : '灵宠装备'}，金元 <span class="y">+${sr.gold}</span>`); } else if (!sr) { const g = C.sellPetGear(S, +d.psell); if (g) log('gold', `🔨 出售 ${it ? gearName(it) : '灵宠装备'}，金元 <span class="y">+${g}</span>`); } commit(); sheetLife('forge'); })(); }
  else if (d.battlepet) { const _bid = +d.battlepet; const _arr = (Array.isArray(S.pet) ? S.pet.map(x=>+x) : []); const _was = _arr.includes(_bid); const _now = Date.now();
    if (!_was) { if (_arr.length >= 4) { log('bad', '出战已满4只，双击✓的撤下一只再选'); } else { _arr.push(_bid); S.pet = _arr; tameTargetId = _bid; log('good', `出战 ${petTag(S.pets.find(p=>p.id===_bid))}，当前 ${_arr.length}/4 只`); } }
    else { if (window._lastBp && window._lastBp.id === _bid && _now - window._lastBp.t < 500) { S.pet = _arr.filter(x => x !== _bid); window._lastBp = null; log('good', `撤下 ${petTag(S.pets.find(p=>p.id===_bid))}，当前 ${S.pet.length}/4 只`); } else { window._lastBp = { id: _bid, t: _now }; tameTargetId = _bid; toastLog('info', '已切换训练目标，再点一下撤下'); } }
    commit(); if (window._charPage) { sheetChar(); } else { sheetLife('tame'); } }
  else if (d.tametarget) { tameTargetId = +d.tametarget; sheetLife('tame'); }
  else if (d.tameattr) { tameAttr = d.tameattr; sheetLife('tame'); }
  else if (d.dish) doDish(d.dish, +d.n);
  else if (d.mppot) { const r = C.useManaPotion(S, d.mppot); if (r.ok) log('good', `💧 饮下 ${elixName(d.mppot)}，法力 <span class="g">+${r.gain}</span>（${r.mana}/${r.max}）`); else toastLog('bad', r.err === 'full' ? '💧 法力已满，无需服用' : r.err === 'dead' ? '已昏死' : '没有药水'); commit(); sheetBag(); }
  else if (d.hppot) { const r = C.useHpPotion(S, d.hppot); if (r.ok) log('good', `❤️ 饮下 ${elixName(d.hppot)}，生命 <span class="g">+${r.gain}</span>（${r.vit}/${r.cap}）`); else toastLog('bad', r.err === 'full' ? '❤️ 生命已满，无需服用' : r.err === 'dead' ? '已昏死' : '没有药水'); commit(); sheetBag(); }
  else if (d.equip) { const g = S.gearBag.find(x => x.id === +d.equip); if (C.equipGear(S, +d.equip) && g) log('good', `🗡️ 装备 ${gearName(g)}`); commit(); sheetLife('forge'); }
  else if (d.unequip) { const r = C.unequipGear(S, d.unequip); if (r === 'full') { log('warn', '装备包已满！获得储物戒指可扩充容量'); } else { commit(); } sheetLife('forge'); }
  else if (d.sellgear) { (async () => { const it = S.gearBag.find(x => x.id === +d.sellgear); const sr = await sellServer('gear', +d.sellgear); if (sr && sr.ok) { log('gold', `🔨 出售 ${it ? gearName(it) : '装备'}，金元 <span class="y">+${sr.gold}</span>`); } else if (!sr) { const g = C.sellGear(S, +d.sellgear); if (g) log('gold', `🔨 出售 ${it ? gearName(it) : '装备'}，金元 <span class="y">+${g}</span>`); } commit(); sheetLife('forge'); })(); }
  else if (d.cskill) doBook('cskill', d.cskill);
  else if (d.usemai) doBook('usemai', d.usemai);
  else if (d.rank) sheetRank();
  else if (d.ranktab) sheetRank(d.ranktab);
  else if (d.rankreward !== undefined) claimRankReward();
  else if (d.rankinfo !== undefined) sheetRankInfo(+d.rankinfo);
  else if (d.uskill) doBook('uskill', d.uskill);
  else if (d.sskill) doBook('sskill', d.sskill);
  else if (d.pet) doPet(+d.pet);
  else if (d.passign) doAssign(+d.passign, d.attr);
  else if (d.feedto !== undefined) { feedTo = +d.feedto; const els = [$('sheet'), $('mask')], ys = els.map(e => e.scrollTop); if (window._charPage) { sheetChar(); } else { sheetBag(); } els.forEach((e, i) => e.scrollTop = ys[i]); }
  else if (d.food) { let _n = +d.n || 1; if (d.ncustom) { const _inp = document.querySelector('[data-foodnum="' + d.food + '_' + d.k + '"]'); _n = _inp ? Math.max(1, parseInt(_inp.value||'1',10)||1) : 1; try { S.foodLastN=S.foodLastN||{}; S.foodLastN[d.food+'_'+d.k]=_n; } catch(_){} } doFood(d.food, d.k, _n); }
  else if (d.med) doMed(d.med);
  else if (d.devour) sheetDevour(+d.devour);
  else if (d.devfood) doDevour(+d.eater, +d.devfood);
  else if (d.brew) doBrew(d.brew, +d.n);
  else if (d.extra) doAlcExtra(d.extra);
  else if (d.brewdetox) doBrewDetox(+d.brewdetox);
  else if (d.brewantidote) doBrewAntidote(+d.brewantidote);
  else if (d.brewdan) doBrewDan(d.brewdan, +d.n);
  else if (d.mut) doUseMut(d.mut);
  else if (d.detoxuse) doUseDetox();
  else if (d.danuse) doEatDan(d.danuse);
  else if (d.juling) doJuling(d.juling);
  else if(d.allrep!==undefined){for(let i=0;i<12;i++)S.inv['repair'+i]=(S.inv['repair'+i]|0)+9;commit();render();log('good','🌿12种修复灵物各+9');}else if(d.rep>=0){const r=C.useRepair(S,+d.rep);commit();render();const rp=r.split('|');log(rp[0]==='ok'?'good':'bad',rp[0]==='ok'?`🌿修复成功！${rp[1]}→${rp[2]}`:'🌿'+r);}else if(d.drinkmai)doDrinkMai(+d.drinkmai); else if(d.drinkbutian)doDrinkButian(); else if (d.chest) doOpenChest(d.chest, +d.n || 1); else if (d.synthvmai) doSynthVMai(); else if (d.synthxps) doSynthXPS(); else if (d.synthzps) doSynthZPS(); else if (d.synthsps) doSynthSPS(); else if (d.synthjps) doSynthJPS();   else if (d.shamode) { S.shaMode = d.shamode; save(); render(); try { if (typeof sheetChar === 'function' && $('sheet') && $('sheet').style.display !== 'none') sheetChar(); } catch(_) {} toastLog('sys', d.shamode === 'def' ? '🛡️ 煞气转为加防御' : '⚔️ 煞气转为加攻击'); }
  else if (d.sha) doSha(d.sha);
  else if (d.drink) doDrink(d.drink, +d.g, +d.n);
  else if (d.take) window.finishPk(d.take);
  else if (d.bp) { const [idx, act] = d.bp.split(':'); if (!Array.isArray(S.battlePlan)) S.battlePlan = ['attack','attack','attack','attack','attack']; S.battlePlan[+idx] = act; save(); sheetBattlePlan(); }
  else if ('close' in d) closeSheet();
  else if ('reset' in d) doReset();
  else if (t.id === 'menuBtn') sheetMenu();
  else if ('battleplan' in d) sheetBattlePlan();
  else if ('chat' in d) sheetChat();
  else if ('consign' in d) sheetConsign();
  else if ('char' in d) { window._charPage = 1; sheetChar(); }
  else if (d.gender) { if (!S._onboarded || S._reincChain) { S.gender = d.gender; S.avatar = 0; save(); if (S._reincChain) S._reincStep = 'avatar'; chainNext(); } } // v1088 建号/轮回链；v1171 性别仅建号/轮回可改（Ye 定）
  else if (d.avatar !== undefined) { if (S._avatarSettings && !avatarChangeCost()) { sheetAvatar(S._pickGender || S.gender || 'm'); return; } S.avatar = parseInt(d.avatar)|0; if (S._avatarSettings) { S.avatarSet = S._pickSet || S.avatarSet || 'r'; S.avatarCustom = null; S.avatarGalleryId = null; try { clearAvatarSeparate(); } catch(_) {} S._avatarSettings = 0; save(); toastLog('good', '🖼️ 头像已换上（消耗极品灵石💠×1）'); sheetChar(); try { if (typeof renderActions === 'function') renderActions(); } catch(e) {} } else if (S._reincChain) { S._reincStep = 'name'; save(); chainNext(); } else if (!S._onboarded) { S._avatarPicked = true; save(); chainNext(); } else { save(); sheetNameInput(); } } // v1060 恢复 v1036：换头像强制刷新底部导航；v1088 建号头像强制
  else if ('savename' in d) { const inp = $('nameInput'); const nm = inp ? inp.value.trim().slice(0, 12) : ''; if (nm) { S.name = nm; } if (S._reincChain) { S._reincStep = 'race'; save(); chainNext(); } else if (!S._onboarded) { if (!nm) { toastLog('bad', '请先取个名字'); sheetNameInput(); $('mask').dataset.lock = '1'; return; } save(); chainNext(); } else { save(); sheetLifeChoice(true); } } // v204 取名后选生活技能；v1088 建号名字强制
  else if (d.race && RACES[d.race]) { S.race = d.race; save(); if (_raceMode === 'reinc') { if (S._reincChain) S._reincStep = 'done'; delete $('mask').dataset.lock; closeSheet(); chainNext(); } else if (_raceMode === 'old') { delete $('mask').dataset.lock; closeSheet(); toastLog('good', `🧬 已选择 ${RACES[S.race].name}，天赋【${RACES[S.race].talent}】已生效`); } else { chainNext(); } } // v1088 种族选择
  else if ('racekeep' in d) { if (S._reincChain) S._reincStep = 'done'; closeSheet(); chainNext(); } // v1088 轮回保持原种族
  else if (d.lifechoice) { const k = d.lifechoice, cur = S.lifeChoices || []; const i = cur.indexOf(k); if (i >= 0) cur.splice(i, 1); else if (cur.length < C.lifeChoiceMax(S)) cur.push(k); else toastLog('bad', '已达可选上限，境界提升可解锁更多'); S.lifeChoices = cur; save(); sheetLifeChoice(_lcFromName); } // v204
  else if ('lcdone' in d) { if (!(S.lifeChoices || []).length) { try { alert('至少选择 1 个生活技能'); } catch(e) { toastLog('bad', '至少选择 1 个生活技能'); } return; } const _hadPet = Array.isArray(S.pet) ? S.pet.length > 0 : S.pet != null; if (!S.lifeChoices.includes('tame') && _hadPet) { S.pet = Array.isArray(S.pet) ? [] : null; log('bad', '🔒 未选择驯兽技能，已卸下所有出战灵宠'); } S.life = S.life || {}; (S.lifeChoices || []).forEach(_k => { if (!S.life[_k]) S.life[_k] = { lv: 0, xp: 0 }; }); // v912 新选技能初始化
  save(); const _fn = _lcFromName; _lcFromName = false; if (_fn) { closeSheet(); toastLog('good', '🎭 头像已选定，仙途开启！'); } else sheetLife(); render(); } // v204
  else if ('lcopen' in d) sheetLifeChoice(false); // v204 补选生活技能
  else if ('back-gender' in d) { if (!S._onboarded || S._reincChain) sheetGender(); else toastLog('sys', '性别只能在建号或轮回时重选'); }
  else if (d.avatarcat) sheetAvatar(S._pickGender || S.gender || 'm', d.avatarcat);
  else if ('auction' in d) sheetAuction3();
  else if (d.auc3slot !== undefined) { (async () => { // v1086 线上抢位
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/auction/slot', { method: 'POST', body: { slot: +d.auc3slot } });
      if (r.status === 401) { toastLog('sys', '登录已过期，请重新登录'); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); await mktRefreshRev(); sheetAuction3(); }
      else toastLog('sys', (r.json || {}).error === 'no_gold' ? '金元不足。' : '抢位失败。');
    } catch(_) { toastLog('sys', '网络不通，稍后再试。'); }
  })(); }
  else if (d.auc3bid !== undefined) { (async () => { // v1086 线上竞价（id）
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/auction/bid', { method: 'POST', body: { id: d.auc3bid } });
      if (r.status === 401) { toastLog('sys', '登录已过期，请重新登录'); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); await mktRefreshRev(); sheetAuction3(); }
      else { const _e = (r.json || {}).error; toastLog('sys', _e === 'no_gold' ? '金元不足。' : _e === 'own_item' ? '不能竞拍自己的拍品。' : _e === 'not_found' ? '该拍品已结束。' : '竞价失败。'); }
    } catch(_) { toastLog('sys', '网络不通，稍后再试。'); }
  })(); }
  else if ('auc3list' in d) sheetAuc3List();
  else if (d.auc3pick) { const _pk = String(d.auc3pick).split(':'); sheetAuc3ListConfirm(_pk[0], _pk[1]); }
  else if ('auc3confirm' in d) doAuc3Confirm();
  else if (d.consigntab) sheetConsign(d.consigntab, null, consignSec);
  else if (d.consignsec) sheetConsign('market', null, d.consignsec);
  else if (d.mcat) { window._marketCat = d.mcat; sheetConsign('market', null, consignSec); }
  else if (d.mktbuy) { (async () => { // v960 线上购买
    const _qid = $('bq_' + d.mktbuy);
    const _qty = _qid ? Math.max(1, Math.floor(+_qid.value)) : 1;
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/market/buy', { method: 'POST', body: { id: d.mktbuy, qty: _qty } });
      if (r.status === 401) { sheetConsign('market', '登录已过期，请重新登录联机账号。', consignSec); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); try { if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.10); } catch(_) {} await mktRefreshRev(); sheetConsign('market', '购买成功！', consignSec); }
      else { const _e = (r.json || {}).error; sheetConsign('market', _e === 'no_money' ? '货币不足。' : _e === 'not_found' ? '该寄售已下架。' : _e === 'own' ? '不能购买自己的寄售。' : '购买失败。', consignSec); }
    } catch(_) { sheetConsign('market', '网络不通，稍后再试。', consignSec); }
  })(); }
  else if ('mktrefresh' in d) sheetConsign('market', null, consignSec);
  else if (d.mktcat) { _mktCat = d.mktcat; sheetConsign('market', null, consignSec); }
  else if ('mktlogin' in d) { try { window.MHXY.panel(); } catch(e) {} }
  else if (d.stallbuy !== undefined) { /* v1085 NPC 摊货已下线，购买走 stallbuy-id */ }
  else if (d.stallbuyId) { (async () => { // v1085 线上购买
    const _sx = +d.sx, _sy = +d.sy;
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/stall/buy', { method: 'POST', body: { id: d.stallbuyId } });
      if (r.status === 401) { toastLog('sys', '登录已过期，请重新登录'); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); try { if (typeof thunderJudgeWithProb === 'function') thunderJudgeWithProb(0.10); } catch(_) {} await mktRefreshRev(); sheetStall(_sx, _sy); }
      else { const _e = (r.json || {}).error; toastLog('sys', _e === 'no_cur' ? '货币不足。' : _e === 'not_found' ? '该摊货已下架。' : _e === 'own_item' ? '不能买自己的摊货。' : '购买失败。'); }
    } catch(_) { toastLog('sys', '网络不通，稍后再试。'); }
  })(); }
  else if (d.stallrent) { (async () => { // v1085 线上租摊
    const _parts = String(d.stallrent).split(','); const _rx = +_parts[0], _ry = +_parts[1];
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/stall/rent', { method: 'POST', body: { tile: _rx + ',' + _ry } });
      if (r.status === 401) { toastLog('sys', '登录已过期，请重新登录'); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); await mktRefreshRev(); sheetStall(_rx, _ry); }
      else { const _e = (r.json || {}).error; toastLog('sys', _e === 'rented' ? '该摊位已被别人租下。' : _e === 'no_cur' ? '租金货币不足。' : '租摊失败。'); }
    } catch(_) { toastLog('sys', '网络不通，稍后再试。'); }
  })(); }
  else if (d.stalllist) { const _p = String(d.stalllist).split(','); sheetStallList(+_p[0], +_p[1]); }
  else if (d.stallback) { const _p = String(d.stallback).split(','); sheetStall(+_p[0], +_p[1]); }
  else if (d.stalldo) { (async () => { // v1085 线上上架
    const _p = String(d.stalldo).split(':'); const _kind = _p[0], _key = _p[1]; const _sx = +d.sx, _sy = +d.sy; const _q = $('sq_stall_' + _key); const _pr = $('sp_stall_' + _key); const _qty = _q ? Math.max(1, Math.floor(+_q.value)) : 1; const _price = _pr ? Math.max(1, Math.floor(+_pr.value)) : 1; const _nm = _kind === 'ore' ? ((ORES[_key]||{}).name || _key) : ((MATS[_key]||{}).name || _key); const _scEl = $('sc_stall_' + _key); const _cur = _scEl ? _scEl.value : undefined;
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/stall/list', { method: 'POST', body: { tile: _sx + ',' + _sy, kind: _kind, key: _key, name: _nm, qty: _qty, price: _price, cur: _cur } });
      if (r.status === 401) { toastLog('sys', '登录已过期，请重新登录'); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); await mktRefreshRev(); sheetStall(_sx, _sy); }
      else { const _e = (r.json || {}).error; toastLog('sys', _e === 'not_renter' ? '请先租下该摊位。' : _e === 'no_item' ? '物品不足。' : _e === 'bad_cur' ? '售价货币不对。' : '上架失败。'); }
    } catch(_) { toastLog('sys', '网络不通，稍后再试。'); }
  })(); }
  else if (d.casino) { (async () => { const _choice = d.casino;
    let _sumGuess = 10; if (_choice==='sum') _sumGuess = Math.max(4, Math.min(17, Math.floor(+($('dice_sum')||{}).value||10)));
    const _sr = await casinoServerPlay('dice', { type:_choice, sum:_sumGuess });
    if (!_sr) return;
    if (_sr.local) { // 离线回落：原本地逻辑
      const _b = casinoTakeBet(); if (!_b) return; const _bd = { ck:_b.ck, bet:_b.bet, ci:_b.ci };
      let _html = `<h2>🎲 摇骰中...</h2><div class="hint" style="font-size:32px" id="dice_anim">🎲 🎲 🎲</div><div class="row"><button class="btn full" disabled>开盅中...</button></div>`;
      openSheet(_html); let _ticks = 0;
      const _iv = setInterval(() => { _ticks++; const _e = $('dice_anim');
        if (_e) _e.innerHTML = `🎲 ${1+Math.floor(Math.random()*6)} ${1+Math.floor(Math.random()*6)} ${1+Math.floor(Math.random()*6)}`;
        if (_ticks >= 8) { clearInterval(_iv);
          const _d1 = 1+Math.floor(Math.random()*6), _d2 = 1+Math.floor(Math.random()*6), _d3 = 1+Math.floor(Math.random()*6);
          const _sum = _d1+_d2+_d3; const _isTriple = (_d1===_d2 && _d2===_d3);
          let _mult = 0; if (_choice==='triple' && _isTriple) _mult = 24; else if (_choice==='sum') { if (_sumGuess===_sum) _mult = 10; } else if (!_isTriple) { if (_choice==='big' && _sum>=11 && _sum<=17) _mult = 2; else if (_choice==='small' && _sum>=4 && _sum<=10) _mult = 2; }
          const _amt = _mult>0 ? _bd.bet*_mult : 0;
          casinoPay({ ck:_bd.ck, bet:_bd.bet, ci:_bd.ci, amount:_amt, title:'🎲 开盅', game:'dice', text:`🎲 ${_d1} ${_d2} ${_d3} (和${_sum}) ` + (_isTriple?'豹子！':(_sum>=11?'大':'小')) });
        } }, 120);
      return;
    }
    // 服务端版：动画后展示服务端的骰子
    const _bd = _sr.bet, _o = _sr.srv.outcome, _win = _sr.srv.win|0;
    // 本地扣注显示（服务端已扣，本地同步）
    if (_bd.ck === 'xianyu') S.xianyu -= _bd.bet; else S.ores[_bd.ck] -= _bd.bet;
    let _html = `<h2>🎲 摇骰中...</h2><div class="hint" style="font-size:32px" id="dice_anim">🎲 🎲 🎲</div><div class="row"><button class="btn full" disabled>开盅中...</button></div>`;
    openSheet(_html); let _ticks = 0;
    const _iv = setInterval(() => { _ticks++; const _e = $('dice_anim');
      if (_e) _e.innerHTML = `🎲 ${1+Math.floor(Math.random()*6)} ${1+Math.floor(Math.random()*6)} ${1+Math.floor(Math.random()*6)}`;
      if (_ticks >= 8) { clearInterval(_iv);
        const _txt = `🎲 ${_o.dice[0]} ${_o.dice[1]} ${_o.dice[2]} (和${_o.sum}) ` + (_o.isTriple?'豹子！':(_o.sum>=11?'大':'小'));
        casinoPayServer({ ck:_bd.ck, bet:_bd.bet, ci:_bd.ci, amount:_win, title:'🎲 开盅', game:'dice', text:_txt, srvWin:_sr.srv });
      } }, 120);
  })(); }
  else if (d.casinoback !== undefined) { if (typeof sheetCasino==='function') sheetCasino(); }
  // v424 灵兽斗
  else if (d.casinoBeast !== undefined) { (async () => { const _pick = +d.casinoBeast;
    const _sr = await casinoServerPlay('beast', { pick:_pick });
    if (!_sr) return;
    const _icons = { '青龙':'🐉', '白虎':'🐯', '朱雀':'🐦', '玄龟':'🐢', '灵狐':'🦊' };
    if (_sr.local) { const _b = casinoTakeBet(); if (!_b) return; const _pair = S._beastPair || ['青龙','白虎'];
      let _hp = [100, 100];
      openSheet(`<h2>🐉 灵兽斗</h2><div class="hint" id="beast_log">${_icons[_pair[0]]||'🐉'}${_pair[0]} VS ${_icons[_pair[1]]||'🐯'}${_pair[1]}<br>战斗开始！</div><div class="row"><button class="btn full" disabled>激战中...</button></div>`);
      let _round = 0;
      const _iv = setInterval(() => { _round++; const _atk = Math.floor(Math.random()*2); const _dmg = 15 + Math.floor(Math.random()*20);
        _hp[1-_atk] = Math.max(0, _hp[1-_atk] - _dmg); const _e = $('beast_log');
        if (_e) _e.innerHTML += `<br>${_icons[_pair[_atk]]}${_pair[_atk]} 攻击，造成 ${_dmg} 伤害！（${_pair[0]}:${_hp[0]} / ${_pair[1]}:${_hp[1]}）`;
        if (_hp[0] <= 0 || _hp[1] <= 0 || _round >= 8) { clearInterval(_iv);
          const _winner = _hp[0] > _hp[1] ? 0 : (_hp[1] > _hp[0] ? 1 : Math.floor(Math.random()*2));
          const _win = _pick === _winner; if (_win) S._beastWin = (S._beastWin|0)+1;
          const _amt = _win ? Math.floor(_b.bet*1.8) : 0;
          setTimeout(() => casinoPay({ ck:_b.ck, bet:_b.bet, ci:_b.ci, amount:_amt, title:'🐉 灵兽斗', game:'beast', text:`${_icons[_pair[0]]}${_pair[0]} VS ${_icons[_pair[1]]}${_pair[1]}<br>胜者 <b>${_pair[_winner]}</b>` }), 800);
        } }, 600);
      return;
    }
    const _bd = _sr.bet, _o = _sr.srv.outcome, _win = _sr.srv.win|0;
    if (_bd.ck === 'xianyu') S.xianyu -= _bd.bet; else S.ores[_bd.ck] -= _bd.bet;
    const _pair = _o.pair;
    openSheet(`<h2>🐉 灵兽斗</h2><div class="hint" id="beast_log">${_icons[_pair[0]]||'🐉'}${_pair[0]} VS ${_icons[_pair[1]]||'🐯'}${_pair[1]}<br>战斗开始！</div><div class="row"><button class="btn full" disabled>激战中...</button></div>`);
    let _round = 0; const _hp = [100, 100];
    const _iv = setInterval(() => { _round++; const _atk = Math.floor(Math.random()*2); const _dmg = 15 + Math.floor(Math.random()*20);
      _hp[1-_atk] = Math.max(0, _hp[1-_atk] - _dmg); const _e = $('beast_log');
      if (_e) _e.innerHTML += `<br>${_icons[_pair[_atk]]}${_pair[_atk]} 攻击，造成 ${_dmg} 伤害！`;
      if (_round >= 6) { clearInterval(_iv);
        setTimeout(() => casinoPayServer({ ck:_bd.ck, bet:_bd.bet, ci:_bd.ci, amount:_win, title:'🐉 灵兽斗', game:'beast', text:`${_icons[_pair[0]]}${_pair[0]} VS ${_icons[_pair[1]]}${_pair[1]}<br>胜者 <b>${_pair[_o.winner]}</b>` }), 600);
      } }, 500);
  })(); }
  // v424 仙缘机
  else if (d.casinoSlots !== undefined) { (async () => {
    const _diff = S._slotsDiff || 'safe';
    const _sr = await casinoServerPlay('slots', { diff:_diff });
    if (!_sr) return;
    if (_sr.local) { // 离线回落：跳转到原逻辑太长，直接提示
      openSheet(`<h2>🎰 仙缘机</h2><div class="hint">离线时仙缘机暂不可用，请登录后使用</div><div class="row"><button class="btn full" data-casino-back>返回赌场</button></div>`);
      return;
    }
    const _bd = _sr.bet, _o = _sr.srv.outcome, _win = _sr.srv.win|0;
    if (_bd.ck === 'xianyu') S.xianyu -= _bd.bet; else S.ores[_bd.ck] -= _bd.bet;
    S._casinoPlays = (S._casinoPlays|0)+1;
    const _final = _o.symbols;
    const _syms = _diff === 'risk' ? ['⚔️','💎','🌀','🗡️','💠','⭐','🌙','🔥'] : ['⚔️','💎','🌀','🗡️','💠','⭐'];
    const _tripleMult = _diff === 'risk' ? 20 : 10;
    openSheet(`<h2>🎰 仙缘机</h2><div class="hint">点下面的停，亲自定格每一格！三格同符 1:${_tripleMult}，两格同 1:2</div><div class="hint" style="font-size:36px" id="slots_anim">🎰 🎰 🎰</div><div class="row" id="slots_stoprow" style="display:flex;gap:6px"><button class="btn gold" data-slotstop="0" style="flex:1">停左</button><button class="btn gold" data-slotstop="1" style="flex:1">停中</button><button class="btn gold" data-slotstop="2" style="flex:1">停右</button></div>`);
    let _stop = [false, false, false];
    window._slotsStop = function(i) { _stop[i] = true; const _btns = document.querySelectorAll('[data-slotstop]'); if (_btns[i]) { _btns[i].disabled = true; _btns[i].textContent = '已停'; } if (_stop[0] && _stop[1] && _stop[2] && window._slotsIv) { clearInterval(window._slotsIv); window._slotsIv = null;
      let _txt_jp = '';
      if (_o.jpWin > 0) _txt_jp = ` 🏆奖池暴击+${_o.jpWin}`;
      if (_o.luckyBonus > 0) _txt_jp += ` 🍀幸运${_o.lucky}+${_o.luckyBonus}`;
      const _e2 = $('slots_anim'); if (_e2) _e2.innerHTML = _final.join(' ');
      const _txt = `${_final[0]} ${_final[1]} ${_final[2]}` + _txt_jp;
      setTimeout(() => {
        casinoPayServer({ ck:_bd.ck, bet:_bd.bet, ci:_bd.ci, amount:_win, title:'🎰 仙缘机', game:'slots', text:_txt });
      }, 500);
    } };
    const _n = _syms.length;
    window._slotsIv = setInterval(() => {
      const _e = $('slots_anim');
      if (_e) {
        const _d = [
          _stop[0] ? _final[0] : _syms[Math.floor(Math.random()*_n)],
          _stop[1] ? _final[1] : _syms[Math.floor(Math.random()*_n)],
          _stop[2] ? _final[2] : _syms[Math.floor(Math.random()*_n)]
        ];
        _e.innerHTML = _d.join(' ');
      }
    }, 100);
  })(); }
  else if (d.slotstop !== undefined) { if (typeof window._slotsStop === 'function') window._slotsStop(+d.slotstop); } // v449 手动停格
  else if (d.slotsDiff) { S._slotsDiff = d.slotsDiff; if (typeof save==='function') save(); if (typeof casinoSlots==='function') casinoSlots(); } // v459 选难度
  else if (d.slotsCollect !== undefined) { const _p = window._slotsPending; window._slotsPending = null; if (_p) casinoPay(_p); } // v459 收手
  else if (d.slotsDouble !== undefined) { const _p = window._slotsPending; if (_p) { openSheet(`<h2>🎰 双倍一搏</h2><div class="hint">当前奖金 <b class="y">${_p.amount}</b>（已双倍${_p.doubles}次）。猜中翻倍，猜错全输！</div><div class="row" style="display:flex;gap:6px"><button class="btn gold" data-slots-guess="odd" style="flex:1">单</button><button class="btn gold" data-slots-guess="even" style="flex:1">双</button></div><div class="row"><button class="btn full" data-slots-collect>不搏了，收手</button></div>`); } } // v459 双倍猜单双
  else if (d.slotsGuess) { const _p = window._slotsPending; if (_p) { const _n2 = 1+Math.floor(Math.random()*10); const _win = (d.slotsGuess==='odd') === (_n2%2===1); if (_win) { _p.amount *= 2; _p.doubles++; _p.text += ` 🎲${_n2}双倍成功`; openSheet(`<h2>🎰 双倍成功！</h2><div class="hint">${_p.text}</div><div class="hint">奖金翻到 <b class="y">${_p.amount}</b>！继续搏还是收手？</div><div class="row" style="display:flex;gap:6px"><button class="btn gold" data-slots-collect style="flex:1">收手</button><button class="btn danger" data-slots-double style="flex:1">再双倍！</button></div>`); } else { _p.text += ` 🎲${_n2}搏输了`; _p.amount = 0; S._slotsStreak = 0; window._slotsPending = null; casinoPay(_p); } } } // v459 双倍结算
  // v460 通用赢后双倍
  else if (d.casinoCollect !== undefined) { const _p = window._casinoPending; window._casinoPending = null; if (_p) { _p._doubled = true; casinoPay(_p); } }
  else if (d.casinoDouble !== undefined) { const _p = window._casinoPending; if (_p) { openSheet(`<h2>${_p.title} · 双倍一搏</h2><div class="hint">当前奖金 <b class="y">${_p.amount}</b>。猜中翻倍，猜错全输！</div><div class="row" style="display:flex;gap:6px"><button class="btn gold" data-casino-guess="odd" style="flex:1">单</button><button class="btn gold" data-casino-guess="even" style="flex:1">双</button></div><div class="row"><button class="btn full" data-casino-collect>不搏了，收手</button></div>`); } }
  else if (d.casinoSrvCollect !== undefined) { casinoSrvCollectUI(); }
  else if (d.casinoSrvDouble !== undefined) { casinoSrvDoubleUI(); }
  else if (d.casinoSrvGuess) { casinoSrvGuessUI(d.casinoSrvGuess); }
  else if (d.casinoGuess) { const _p = window._casinoPending; if (_p) { const _n3 = 1+Math.floor(Math.random()*10); const _win = (d.casinoGuess==='odd') === (_n3%2===1); if (_win) { _p.amount *= 2; _p._doubled = true; window._casinoPending = _p; openSheet(`<h2>${_p.title} · 双倍成功！</h2><div class="hint">${_p.text} 🎲${_n3}</div><div class="hint">奖金翻到 <b class="y">${_p.amount}</b>！继续搏还是收手？</div><div class="row" style="display:flex;gap:6px"><button class="btn gold" data-casino-collect style="flex:1">收手</button><button class="btn danger" data-casino-double style="flex:1">再双倍！</button></div>`); } else { _p.text += ` 🎲${_n3}搏输了`; _p.amount = 0; S._casinoStreak = 0; window._casinoPending = null; _p._doubled = true; casinoPay(_p); } } }
  // v424 猜灵石
  else if (d.casinoBowls !== undefined) { (async () => { const _pick = +d.casinoBowls; const _b0 = window._bowlsBet;
    if (!_b0 || _pick < 0) return;
    // v967 服务端版：洗牌时已下注（服务端扣），这里只发 pick
    const _sr = await casinoServerPlay('bowls', { pick:_pick });
    if (!_sr) return;
    window._bowlsBet = null;
    if (_sr.local) { const _hide = window._bowlsHide|0; const _win = _pick === _hide; const _amt = _win ? _b0.bet*2 : 0; const _bowls = ['🥣','🥣','🥣']; _bowls[_hide] = '💎'; casinoPay({ ck:_b0.ck, bet:_b0.bet, ci:_b0.ci, amount:_amt, title:'🥣 猜灵石', game:'bowls', text:`${_bowls.join(' ')}` }); return; }
    const _bd = _sr.bet, _o = _sr.srv.outcome, _win = _sr.srv.win|0;
    // 注意：洗牌时服务端已扣注，这里不同步扣（避免重复）
    const _bowls = ['🥣','🥣','🥣']; _bowls[_o.hide] = '💎';
    casinoPayServer({ ck:_bd.ck, bet:_bd.bet, ci:_bd.ci, amount:_win, title:'🥣 猜灵石', game:'bowls', text:`${_bowls.join(' ')}` });
  })(); } // v461 洗牌后选
  else if (d.casinoBowlsShuffle !== undefined) { const _b = casinoGetBet(); if (_b) { window._bowlsBet = _b; window._bowlsHide = Math.floor(Math.random()*3);
    openSheet(`<h2>🥣 洗牌中...</h2><div class="hint" style="font-size:32px" id="bowls_anim">🥣<small>1</small> 🥣<small>2</small> 🥣<small>3</small></div><div class="hint">盯紧编号！灵石在哪只碗下？</div>`);
    let _ticks = 0; let _order = [1,2,3]; const _iv = setInterval(() => { _ticks++; const _a = Math.floor(Math.random()*3); let _c = Math.floor(Math.random()*3); if (_c===_a) _c=(_c+1)%3; const _t=_order[_a]; _order[_a]=_order[_c]; _order[_c]=_t; const _e = $('bowls_anim'); if (_e) _e.innerHTML = _order.map(n=>`🥣<small>${n}</small>`).join(' '); if (_ticks >= 18) { clearInterval(_iv); openSheet(`<h2>🥣 猜灵石</h2><div class="hint" style="font-size:36px">🥣 🥣 🥣</div><div class="hint">洗好了！凭刚才的编号选一只碗。</div><div class="grid2"><button class="btn gold" data-casino-bowls="0">🥣 左</button><button class="btn gold" data-casino-bowls="1">🥣 中</button><button class="btn gold" data-casino-bowls="2">🥣 右</button></div>`); } }, 150);
  } } // v461 洗牌动画；v462 编号可见
  // v424 射覆
  else if (d.casinoNum) { (async () => { const _mode = d.casinoNum;
    let _guess = 5; if (_mode==='exact') _guess = Math.max(1, Math.min(10, Math.floor(+($('casino_num')||{}).value||5)));
    const _sr = await casinoServerPlay('number', { type:_mode, num:_guess });
    if (!_sr) return;
    if (_sr.local) { const _b = casinoTakeBet(); if (!_b) return; const _n = 1+Math.floor(Math.random()*10); let _win = false, _mult = 0;
      if (_mode==='odd' && _n%2===1) { _win=true; _mult=2; } else if (_mode==='even' && _n%2===0) { _win=true; _mult=2; } else if (_mode==='exact') { if (_guess===_n) { _win=true; _mult=9; } }
      const _amt = _win ? _b.bet*_mult : 0; casinoPay({ ck:_b.ck, bet:_b.bet, ci:_b.ci, amount:_amt, title:'🎯 射覆', game:'number', text:`开 ${_n}` }); return; }
    const _bd = _sr.bet, _o = _sr.srv.outcome, _win = _sr.srv.win|0;
    if (_bd.ck === 'xianyu') S.xianyu -= _bd.bet; else S.ores[_bd.ck] -= _bd.bet;
    casinoPayServer({ ck:_bd.ck, bet:_bd.bet, ci:_bd.ci, amount:_win, title:'🎯 射覆', game:'number', text:`开 ${_o.num}` });
  })(); }
  // v424 翻仙牌
  else if (d.casinoCard) { const _b = casinoTakeBet(); if (_b) { const _cards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']; const _c = _cards[Math.floor(Math.random()*13)]; const _v = _cards.indexOf(_c); const _isBig = _v >= 6; const _pickBig = d.casinoCard==='big'; const _win = _pickBig === _isBig; const _amt = _win ? _b.bet*2 : 0; casinoPay({ ck:_b.ck, bet:_b.bet, ci:_b.ci, amount:_amt, title:'🃏 翻仙牌', game:'card', text:`翻出 <b>${_c}</b> (${_isBig?'大':'小'})` }); } }
  else if (d.casinoSuit) { const _b = casinoTakeBet(); if (_b) { const _suits = ['♠','♥','♣','♦']; const _s = _suits[Math.floor(Math.random()*4)]; const _cards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']; const _c = _cards[Math.floor(Math.random()*13)]; const _win = d.casinoSuit === _s; const _amt = _win ? _b.bet*4 : 0; casinoPay({ ck:_b.ck, bet:_b.bet, ci:_b.ci, amount:_amt, title:'🃏 翻仙牌', game:'card', text:`翻出 <b>${_s}${_c}</b>` }); } } // v460 猜花色
  else if (d.casinoZone) { if (typeof sheetCasino==='function') sheetCasino(d.casinoZone); }
  else if (d.casinoGame) { const _g = d.casinoGame; if (_g==='dice' && typeof casinoDice==='function') casinoDice(); else if (_g==='beast' && typeof casinoBeast==='function') casinoBeast(); else if (_g==='slots' && typeof casinoSlots==='function') casinoSlots(); else if (_g==='bowls' && typeof casinoBowls==='function') casinoBowls(); else if (_g==='number' && typeof casinoNumber==='function') casinoNumber(); else if (_g==='card' && typeof casinoCard==='function') casinoCard(); else if (_g==='stone' && typeof sheetStoneGamble==='function') sheetStoneGamble(); }
  else if (d.stoneStart !== undefined && typeof stoneGambleStart==='function') stoneGambleStart();
  else if (d.stonePick !== undefined && typeof stoneGamblePick==='function') stoneGamblePick(+d.stonePick);
  else if (d.casinoBack !== undefined) { if (typeof sheetCasino==='function') sheetCasino(); }
  else if (d.casinoAgain) { const _ag = d.casinoAgain; if (_ag==='dice') casinoDice(); else if (_ag==='beast') casinoBeast(); else if (_ag==='slots') casinoSlots(); else if (_ag==='bowls') casinoBowls(); else if (_ag==='number') casinoNumber(); else if (_ag==='card') casinoCard(); }
  else if (d.stallunlistId) { (async () => { // v1085 线上下架
    const _ux = +d.sx, _uy = +d.sy;
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/stall/unlist', { method: 'POST', body: { id: d.stallunlistId } });
      if (r.status === 401) { toastLog('sys', '登录已过期，请重新登录'); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); await mktRefreshRev(); sheetStall(_ux, _uy); }
      else toastLog('sys', '下架失败。');
    } catch(_) { toastLog('sys', '网络不通，稍后再试。'); }
  })(); }
  else if (d.mkdel) { (async () => { // v960 线上下架
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/market/delist', { method: 'POST', body: { id: d.mkdel } });
      if (r.status === 401) { sheetConsign('mine', '登录已过期，请重新登录联机账号。', consignSec); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); await mktRefreshRev(); sheetConsign('mine', '已下架，物品退回背包。', consignSec); }
      else sheetConsign('mine', '下架失败。', consignSec);
    } catch(_) { sheetConsign('mine', '网络不通，稍后再试。', consignSec); }
  })(); }
  else if (d.clist) { (async () => { // v960 线上上架
    const _parts = String(d.clist).split(':');
    const _rk = _parts[0], _rkey = _parts.slice(1).join(':');
    let _ak = _rk, _akey = _rkey;
    if (_ak === 'inv' && _akey.indexOf('EGGSEP') === 0) { _ak = 'egg'; _akey = _akey.slice(6); } // EGGSEP：实际存放在S.eggs
    const q = $('cq_' + _rk + '_' + _rkey), pr = $('cp_' + _rk + '_' + _rkey);
    const _qty = q ? Math.floor(+q.value) : 0, _price = pr ? Math.floor(+pr.value) : 0;
    if (!(_qty > 0) || !(_price > 0)) { sheetConsign('list', '数量或价格无效。'); return; }
    const _SEC = CONSIGN_SECS.find(x => x.key === consignSec) || CONSIGN_SECS[2];
    try {
      await window.MHXY.syncNow();
      const r = await window.MHXY.api('/api/market/sell', { method: 'POST', body: { kind: _ak, key: _akey, qty: _qty, price: _price, cur: _SEC.cur, name: consignName(_ak, _akey) } });
      if (r.status === 401) { sheetConsign('list', '登录已过期，请重新登录联机账号。', consignSec); return; }
      if (r.ok && r.json && r.json.ok) { mktApplySave(r.json.save); await mktRefreshRev(); sheetConsign('list', '上架成功！'); }
      else sheetConsign('list', ((r.json || {}).error === 'no_item') ? '物品不足（存档可能已同步变动）。' : '上架失败。', consignSec);
    } catch(_) { sheetConsign('list', '网络不通，稍后再试。', consignSec); }
  })(); }
  else if ('chatsend' in d) { const inp = $('chatInput'); const v = inp ? (inp.value || '').trim() : ''; if (v) { const _li2 = (typeof MHXY !== 'undefined' && MHXY.loggedIn && MHXY.loggedIn()); if (_li2 && MHXY.api) { MHXY.api('/api/chat/send', { method: 'POST', body: { text: v.slice(0, 200), realm: (S.realm|0) } }).then(r => { if (r.ok && r.json && r.json.ok) { if (inp) inp.value = ''; try { chatHistoryToCache(); } catch(_) {} setTimeout(() => { if ($('chatBox')) sheetChat(); }, 600); } else if (r.status === 429) { toastLog('sys', '发言太快，3秒后再试'); } else if (r.status === 401) { toastLog('sys', '登录已过期，请重新登录真人联机'); } else { toastLog('sys', '发送失败'); } }); } else { toastLog('sys', '请先登录真人联机再发言'); } } }
  else if ('cfsend' in d) { const inp = $('cfInput'); const v = inp ? (inp.value||'').trim() : ''; if (v) { var _cfOpen1016 = false; try { var _cfEl1016 = document.getElementById('chatFloat'); _cfOpen1016 = !!(_cfEl1016 && _cfEl1016.classList.contains('on')); } catch(_) {} var _tab2 = _cfOpen1016 ? (window._chatTab || 'world') : 'world'; /* v1016: 悬浮窗未开时主界面发言强制走world，修静默丢消息 */ const _li3 = (typeof MHXY !== 'undefined' && MHXY.loggedIn && MHXY.loggedIn()); if (_tab2 === 'world' && _li3 && MHXY.api) { MHXY.api('/api/chat/send', { method: 'POST', body: { text: v.slice(0, 200), realm: (S.realm|0) } }).then(r => { if (r.ok && r.json && r.json.ok) { inp.value = ''; try { window._srvChat = (window._srvChat || []).concat([{ n: (MHXY.myName ? MHXY.myName() : '我'), t: v.slice(0, 200) }]); } catch(_) {} if (window.renderChatFloat) window.renderChatFloat(); try { chatHistoryToCache(); } catch(_) {} } else if (r.status === 429) { toastLog('sys', '发言太快，3秒后再试'); } else if (r.status === 401) { toastLog('sys', '登录已过期，请到真人联机重新登录后再发言'); } else { toastLog('sys', '发送失败' + (r.netErr ? '（网络不通）' : '')); } }); } else { if (_tab2 === 'world') toastLog('sys', '未登录真人联机：这条只留在本机，先去真人联机登录'); if (typeof C.chatSend === 'function') { C.chatSend(S, v); inp.value = ''; save(); if (window.renderChatFloat) window.renderChatFloat(); } } } } // v1008 主界面输入框按频道/登录态分流（原写死本地）
  else if (d.menutab) sheetMenu(d.menutab);
  else if (t.id === 'debugBtn') sheetDebug();
});

load(); applyDebug(); renderLog(); afterAct(); if (S._onboarded && !S.race && !S.forceReinc) setTimeout(() => sheetRace('old'), 600); // v1088 老号登录补选种族
// v982 修 Bug#35：_pendingTrib 真恢复——读档时若问心未完成且境界未推进，重弹问心
try {
  if (S && S._pendingTrib && S._pendingTrib.quiz && (S.realm|0) === (S._pendingFromRealm|0)) {
    const _pq = S._pendingTrib.quiz;
    // 延迟一点等 UI 就绪
    setTimeout(function() {
      try {
        if (typeof sheetTribQuiz === 'function') sheetTribQuiz(_pq);
        else if (typeof window.sheetTribQuiz === 'function') window.sheetTribQuiz(_pq);
        try { log('warn', '⚡ 检测到未完成的问心，已为你重新弹出。'); } catch(_){}
      } catch(_qe) {
        try { log('bad', '⚡ 问心恢复失败：' + ((_qe && _qe.message) || _qe)); } catch(_){}
      }
    }, 800);
    // 确保按钮可见
    try { S.thunderOk = true; } catch(_){}
  } else if (S && S._pendingTrib) {
    // 境界已推进，清理死状态
    try { delete S._pendingTrib; delete S._pendingFromRealm; } catch(_){}
  }
} catch(_){}
render(); save();
// v960 寄售行转线上：本地寄售物品退回背包，NPC 市场清空（一次性迁移）
try {
  if (S && !S._mkt960mig) {
    if (Array.isArray(S.consign) && S.consign.length) {
      for (const _c of S.consign) {
        try { if (_c && _c.qty > 0) { const _st = consignStore(S, _c.kind); _st[_c.key] = (_st[_c.key] || 0) + _c.qty; } } catch(_){}
      }
    }
    S.consign = []; S.consignMarket = null; S.consignMarketTime = 0; S._mkt960mig = 1;
    save();
  }
} catch(_){}
if (S.forceReinc) setTimeout(() => doReincarnate(true), 500); // 刷新后仍有强制轮回标记则弹窗
// AFK横幅每10秒刷新一次
setInterval(() => { try { if (S.afk) render(); } catch(e) {} }, 10000);
// 世界聊天NPC每60秒35%概率发言（v960 寄售NPC购买已删除，转线上）
setInterval(() => { try { save(); } catch(e) {} }, 60000); // v1000 NPC 假消息已停（Ye 令），仅保留存档心跳

/* ---------- 联机对战 v92：WebSocket 1v1 ---------- */
const NET_URL = 'ws://localhost:8080'; // 上线时改成正式服务器地址
const Net = {
  ws: null, myId: null, inQueue: false, battle: null,
  connect() {
    if (this.ws && this.ws.readyState === 1) return Promise.resolve();
    return new Promise((res, rej) => {
      try {
        const ws = new WebSocket(NET_URL);
        ws.onopen = () => { this.ws = ws; this.bind(); res(); };
        ws.onerror = () => rej(new Error('连接失败'));
        setTimeout(() => { if (ws.readyState !== 1) rej(new Error('连接超时')); }, 5000);
      } catch (e) { rej(e); }
    });
  },
  bind() {
    this.ws.onmessage = (ev) => {
      let m; try { m = JSON.parse(ev.data); } catch { return; }
      this.onMsg(m.type, m.data || {});
    };
    this.ws.onclose = () => {
      this.ws = null; this.inQueue = false;
      if (this.battle) { log('bad', '⚠️ 与服务器断开连接，联机战斗结束'); this.battle = null; }
    };
  },
  send(type, data) { if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify({ type, data })); },
  onMsg(type, d) {
    if (type === 'hello') { this.myId = d.id; }
    else if (type === 'queue_ok') { log('sys', `🌐 正在寻找对手…（排队中 ${d.pos} 人）`); }
    else if (type === 'battle_start') { this.onBattleStart(d); }
    else if (type === 'battle_round') { this.onBattleRound(d); }
    else if (type === 'battle_log') { (d.log || []).forEach(l => log('pk', l)); }
    else if (type === 'battle_end') { this.onBattleEnd(d); }
    else if (type === 'action_ok') { /* 出招确认 */ }
    else if (type === 'err') { log('bad', '⚠️ ' + d.msg); }
  },
  async queue() {
    try {
      log('sys', '🌐 正在连接对战服务器…');
      await this.connect();
      // 上报档案
      this.send('profile', {
        name: S.name || '无名道友',
        realm: S.realm | 0, level: S.level | 0,
        attrs: S.attrs, power: C.total(S.attrs),
      });
      this.send('queue_join', {});
      this.inQueue = true;
      closeSheet();
      log('sys', '🌐 已加入匹配队列，等待对手… <button class="btn" onclick="Net.leaveQueue()">取消</button>');
    } catch (e) {
      log('bad', '⚠️ 连接服务器失败：' + e.message + '（服务器可能未启动）');
    }
  },
  leaveQueue() { this.send('queue_leave', {}); this.inQueue = false; log('sys', '已取消匹配'); },
  onBattleStart(d) {
    this.inQueue = false;
    this.battle = { id: d.battleId, you: d.you, foe: d.foe, state: d.state };
    log('pk', `🌐 <b class="y">匹配成功！</b>对手：<b class="x">${d.foe.name}</b>（${C.REALMS[d.foe.realm] || ''} Lv.${d.foe.level}）`);
    this.send('battle_ready', {});
  },
  onBattleRound(d) {
    if (!this.battle) return;
    this.battle.state = d.state;
    (d.log || []).forEach(l => log('pk', l));
    if (d.needAction) this.showActions();
  },
  showActions() {
    const st = this.battle.state[this.myId];
    openSheet(`<h2>🌐 联机对战 <small>第 ${this.battle.foe.name}</small></h2>
      <div class="hint">你的生命：<b class="y">${st.hp}/${st.maxHp}</b></div>
      <div class="row"><button class="btn gold" data-netact="attack">⚔️ 普通攻击</button></div>
      <div class="row"><button class="btn" data-netact="defend">🛡️ 防御</button></div>
      <div class="row"><button class="btn danger" data-netact="flee">🏳️ 认输</button></div>`);
  },
  act(a) { this.send('battle_action', { act: a }); closeSheet(); log('pk', `你选择了：${{ attack: '⚔️攻击', defend: '🛡️防御', flee: '🏳️认输' }[a] || a}，等待对手…`); },
  onBattleEnd(d) {
    const win = d.winner === this.myId;
    (d.log || []).forEach(l => log('pk', l));
    log(win ? 'good' : 'bad', win ? `🎉 <b class="y">胜利！</b>你在联机对战中击败了对手！` : `😞 战败…${d.reason === 'flee' ? '你认输了' : d.reason === 'disconnect' ? '对方掉线' : ''}`);
    this.battle = null;
    closeSheet();
    commit();
  },
};
})();
window.__ok_main=1;
