    // Configuration
    const API_URL = "https://www.freetogame.com/api/games?platform=browser";
    const MIN_GAMES = 100;
    const FALLBACK_THUMB =
      "data:image/svg+xml;base64," +
      "PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMjAnIGhlaWdodD0nMTgwJyB2aWV3Qm94PScwIDAgMzIwIDE4MCc+PGxpbmVhckdyYWRpZW50IGlkPSdiJyB4MT0nMCUnIHkxPScwJScgeDI9JzEwMCUnIHkyPScxMDAlJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMTAxODI0Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjM2I4MmY2Jy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMzIwJyBoZWlnaHQ9JzE4MCcgZmlsbD0ndXJsKCNiKScvPjxjaXJjbGUgY3g9JzEyOCcgY3k9JzcwJyByPSczMCcgZmlsbD0nI2ZlY2M2NScvPjxwYXRoIGQ9J00yMDQgMTA0YTMwIDMwIDAgMSAwLTMwIDMwIDMwIDMwIDAgMCAwIDMwLTMwem0wLTQ4YTE4IDE4IDAgMSAxLTE4IDE4IDE4IDE4IDAgMCAxIDE4LTE4eicgZmlsbD0nI2Y5NzMxNicvPjx0ZXh0IHg9JzE2MCcgeT0nMTM1JyBmb250LXNpemU9JzI0JyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmaWxsPScjZjhmYWZiJz5QbGF5PC90ZXh0Pjwvc3ZnPg==";

    const CATEGORY_ICONS = {
      All: "🌈",
      Arcade: "🕹️",
      Puzzle: "🧩",
      Action: "⚔️",
      Racing: "🏎️",
      Sports: "🏀",
      Strategy: "♟️",
      Card: "🃏",
      Shooter: "🎯",
      Adventure: "🧭",
      Fighting: "🥊"
    };

    // 自定义 iframe 游戏列表（全部统一新标签打开）
    const customIframeGames = [];

    (function buildCustomIframeGames() {
      // Magic Bottles（来自你之前提供的 iframe）
      const magicUrl = "https://html5.gamedistribution.com/d91602efd33a46d59afe4eea53f6eacf/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-magic-bottles",
        title: "Magic Bottles",
        description: "Magic Bottles via GameDistribution. Opens safely in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/magic-bottles.png",
        playUrl: magicUrl,
        popular: true,
        recent: true
      });

      // Collosotraun（你刚提供的游戏）
      const collosotraunUrl = "https://html5.gamedistribution.com/8abe45cf20dc4b1289e69801640ed0f0/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-collosotraun",
        title: "Collosotraun",
        description: "Collosotraun via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/collosotraun.png",
        playUrl: collosotraunUrl,
        popular: true,
        recent: true
      });

      // Stack Tower Pro（你新提供的游戏）
      const stackTowerUrl = "https://html5.gamedistribution.com/732542dbfb7f4804b95a8ece1e56545a/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-stack-tower-pro",
        title: "Stack Tower Pro",
        description: "Stack Tower Pro via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/stack-tower-pro.png",
        playUrl: stackTowerUrl,
        popular: true,
        recent: true
      });

      // Rich Choice Run（你新提供的游戏）
      const richChoiceRunUrl = "https://html5.gamedistribution.com/bef6a857d80a4337a57fab57c4b70c48/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-rich-choice-run",
        title: "Rich Choice Run",
        description: "Rich Choice Run via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/rich-choice-run.png",
        playUrl: richChoiceRunUrl,
        popular: true,
        recent: true
      });

      // 2048 Merge World（你新提供的游戏）
      const mergeWorldUrl = "https://html5.gamedistribution.com/a8ecea31288d4f6581ae36db798ce9ac/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-2048-merge-world",
        title: "2048 Merge World",
        description: "2048 Merge World via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/2048-merge-world.png",
        playUrl: mergeWorldUrl,
        popular: true,
        recent: true
      });

      // Cool SuperCars Stunts PvP（你新提供的游戏）
      const coolSuperCarsUrl = "https://html5.gamedistribution.com/c0ec7c50918143e8b7ba4b32282ed0e9/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-cool-supercars-stunts-pvp",
        title: "Cool SuperCars Stunts PvP",
        description: "Cool SuperCars Stunts PvP via GameDistribution. Opens in a new browser tab.",
        category: normalizeCategoryByTitle("Cool SuperCars Stunts PvP", "Racing"),
        thumbnail: "assets/cool-supercars-stunts-pvp.png",
        playUrl: coolSuperCarsUrl,
        popular: true,
        recent: true
      });

      // Energy Factory Idle（你新提供的游戏）
      const energyFactoryIdleUrl = "https://html5.gamedistribution.com/edd5ca4613f745e991fe13019f29ef93/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-energy-factory-idle",
        title: "Energy Factory Idle",
        description: "Energy Factory Idle via GameDistribution. Opens in a new browser tab.",
        category: normalizeCategoryByTitle("Energy Factory Idle", "Strategy"),
        thumbnail: "assets/energy-factory-idle.png",
        playUrl: energyFactoryIdleUrl,
        popular: true,
        recent: true
      });

      // Police Traffic Racer（你新提供的游戏）
      const policeTrafficRacerUrl = "https://html5.gamedistribution.com/8748f54767044b99bc5373fc61596123/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-police-traffic-racer",
        title: "Police Traffic Racer",
        description: "Police Traffic Racer via GameDistribution. Opens in a new browser tab.",
        category: normalizeCategoryByTitle("Police Traffic Racer", "Racing"),
        thumbnail: "assets/police-traffic-racer.png",
        playUrl: policeTrafficRacerUrl,
        popular: true,
        recent: true
      });

      // M5 City Driver（你新提供的游戏）
      const m5CityDriverUrl = "https://html5.gamedistribution.com/ce70177ea1894fcb9421898b1e56a290/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-m5-city-driver",
        title: "M5 City Driver",
        description: "M5 City Driver via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/m5-city-driver.png",
        playUrl: m5CityDriverUrl,
        popular: true,
        recent: true
      });

      // Xeno Defense Protocol（你新提供的游戏）
      const xenoDefenseUrl = "https://html5.gamedistribution.com/1ae04723ea2f42bab930af8997f01e72/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-xeno-defense-protocol",
        title: "Xeno Defense Protocol",
        description: "Xeno Defense Protocol via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/xeno-defense-protocol.png",
        playUrl: xenoDefenseUrl,
        popular: true,
        recent: true
      });

      // Avenger Guard（你新提供的游戏）
      const avengerGuardUrl = "https://html5.gamedistribution.com/c89b6590d54245c390eb27cc7d8048c9/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-avenger-guard",
        title: "Avenger Guard",
        description: "Avenger Guard via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/avenger-guard.png",
        playUrl: avengerGuardUrl,
        popular: true,
        recent: true
      });

      // Mahjong Solitaire Zodiac（你新提供的游戏）
      const mahjongZodiacUrl = "https://html5.gamedistribution.com/be82b0f4cedc4f8aa41e186e90449296/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-mahjong-solitaire-zodiac",
        title: "Mahjong Solitaire Zodiac",
        description: "Mahjong Solitaire Zodiac via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/mahjong-solitaire-zodiac.png",
        playUrl: mahjongZodiacUrl,
        popular: true,
        recent: true
      });

      // Sweet Triple Mahjong（你新提供的游戏）
      const sweetTripleMahjongUrl = "https://html5.gamedistribution.com/326788adf09e40638bd55139a126ee09/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-sweet-triple-mahjong",
        title: "Sweet Triple Mahjong",
        description: "Sweet Triple Mahjong via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/sweet-triple-mahjong.png",
        playUrl: sweetTripleMahjongUrl,
        popular: true,
        recent: true
      });

      // Fruit Mahjong 3D（你新提供的游戏）
      const fruitMahjong3dUrl = "https://html5.gamedistribution.com/7471d734006a42daad94b42a9af4d09d/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-fruit-mahjong-3d",
        title: "Fruit Mahjong 3D",
        description: "Fruit Mahjong 3D via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/fruit-mahjong-3d.png",
        playUrl: fruitMahjong3dUrl,
        popular: true,
        recent: true
      });

      // Plant Merge: Zombie War（你新提供的游戏）
      const plantMergeZombieWarUrl = "https://html5.gamedistribution.com/9190c99d4aae4e0085a6059478ee3520/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-plant-merge-zombie-war",
        title: "Plant Merge: Zombie War",
        description: "Plant Merge: Zombie War via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/plant-merge-zombie-war.png",
        playUrl: plantMergeZombieWarUrl,
        popular: true,
        recent: true
      });

      // Archery Legends（你新提供的游戏）
      const archeryLegendsUrl = "https://html5.gamedistribution.com/edbbaebf77684e2487c978537a37e5f4/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-archery-legends",
        title: "Archery Legends",
        description: "Archery Legends via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/archery-legends.png",
        playUrl: archeryLegendsUrl,
        popular: true,
        recent: true
      });

      // Bubble Shooter Crystal Hunt（你新提供的游戏）
      const bubbleShooterCrystalUrl =
        "https://html5.gamedistribution.com/11abb92c950f4b29a60b36037fde6951/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-bubble-shooter-crystal-hunt",
        title: "Bubble Shooter Crystal Hunt",
        description: "Bubble Shooter Crystal Hunt via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/bubble-shooter-crystal-hunt.png",
        playUrl: bubbleShooterCrystalUrl,
        popular: true,
        recent: true
      });

      // That's my seat!（你新提供的游戏）
      const thatsMySeatUrl =
        "https://html5.gamedistribution.com/e259562925ca4ca2b5392f4f0d7229ea/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-thats-my-seat",
        title: "That's my seat!",
        description: "That's my seat! via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/thats-my-seat.png",
        playUrl: thatsMySeatUrl,
        popular: true,
        recent: true
      });

      // Mahjong 3D Match（你新提供的游戏）
      const mahjong3dMatchUrl =
        "https://html5.gamedistribution.com/8c388ef95e04425fb807e5cf7829d08f/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-mahjong-3d-match",
        title: "Mahjong 3D Match",
        description: "Mahjong 3D Match via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/mahjong-3d-match.png",
        playUrl: mahjong3dMatchUrl,
        popular: true,
        recent: true
      });

      // K-Wedding Dream（你新提供的游戏）
      const kWeddingDreamUrl =
        "https://html5.gamedistribution.com/f83698cd4d6049509fd6ddfa0ef95780/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-k-wedding-dream",
        title: "K-Wedding Dream",
        description: "K-Wedding Dream via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/k-wedding-dream.png",
        playUrl: kWeddingDreamUrl,
        popular: true,
        recent: true
      });

      // Celebrity Thanksgiving Prep（你新提供的游戏）
      const celebThanksgivingUrl =
        "https://html5.gamedistribution.com/e5dcd09e91004a5c8d1b7d473a572bcf/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-celebrity-thanksgiving-prep",
        title: "Celebrity Thanksgiving Prep",
        description: "Celebrity Thanksgiving Prep via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/celebrity-thanksgiving-prep.png",
        playUrl: celebThanksgivingUrl,
        popular: true,
        recent: true
      });

      // The Roman Empire Colosseum（你新提供的游戏）
      const romanColosseumUrl =
        "https://html5.gamedistribution.com/7f6ff743b7ee420e90e5e18cc51668e0/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-roman-empire-colosseum",
        title: "The Roman Empire Colosseum",
        description: "The Roman Empire Colosseum via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/roman-empire-colosseum.png",
        playUrl: romanColosseumUrl,
        popular: true,
        recent: true
      });

      // Zindex（你新提供的游戏）
      const zindexUrl =
        "https://html5.gamedistribution.com/a084e6ab82f9420bbe89bbe5c1b150fc/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-zindex",
        title: "Zindex",
        description: "Zindex via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/zindex.png",
        playUrl: zindexUrl,
        popular: true,
        recent: true
      });

      // Dungeon Master – Cult & Craft（你新提供的游戏）
      const dungeonMasterUrl =
        "https://html5.gamedistribution.com/c112cbcec8bc49db9e5faf0f7a81b022/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-dungeon-master-cult-craft",
        title: "Dungeon Master – Cult & Craft",
        description: "Dungeon Master – Cult & Craft via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/dungeon-master-cult-craft.png",
        playUrl: dungeonMasterUrl,
        popular: true,
        recent: true
      });

      // Authentic Football（你新提供的游戏）
      const authenticFootballUrl =
        "https://html5.gamedistribution.com/3e23038b06ea4d39b882713fe059e595/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-authentic-football",
        title: "Authentic Football",
        description: "Authentic Football via GameDistribution. Opens in a new browser tab.",
        category: "Sports",
        thumbnail: "assets/authentic-football.png",
        playUrl: authenticFootballUrl,
        popular: true,
        recent: true
      });

      // Apex Football Battle（你新提供的游戏）
      const apexFootballBattleUrl =
        "https://html5.gamedistribution.com/154c5754a5264da2bcd50a72e95df2c0/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-apex-football-battle",
        title: "Apex Football Battle",
        description: "Apex Football Battle via GameDistribution. Opens in a new browser tab.",
        category: "Sports",
        thumbnail: "assets/apex-football-battle.png",
        playUrl: apexFootballBattleUrl,
        popular: true,
        recent: true
      });

      // Real Freekick 3D（你新提供的游戏）
      const realFreekick3dUrl =
        "https://html5.gamedistribution.com/527ae66f4e664fdc8847e7ce952165dc/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-real-freekick-3d",
        title: "Real Freekick 3D",
        description: "Real Freekick 3D via GameDistribution. Opens in a new browser tab.",
        category: "Sports",
        thumbnail: "assets/real-freekick-3d.png",
        playUrl: realFreekick3dUrl,
        popular: true,
        recent: true
      });

      // Soccer Tournament（你新提供的游戏）
      const soccerTournamentUrl =
        "https://html5.gamedistribution.com/66da87c150bf4e7c9f2abef8cdbd2f7a/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-soccer-tournament",
        title: "Soccer Tournament",
        description: "Soccer Tournament via GameDistribution. Opens in a new browser tab.",
        category: "Sports",
        thumbnail: "assets/soccer-tournament.png",
        playUrl: soccerTournamentUrl,
        popular: true,
        recent: true
      });

      // Stunt Multiplayer Arena（你新提供的游戏）
      const stuntMultiplayerUrl =
        "https://html5.gamedistribution.com/6552bf3254b441c1baf6b4727006bd28/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-stunt-multiplayer-arena",
        title: "Stunt Multiplayer Arena",
        description: "Stunt Multiplayer Arena via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/stunt-multiplayer-arena.png",
        playUrl: stuntMultiplayerUrl,
        popular: true,
        recent: true
      });

      // Obby & Dead River（你新提供的游戏）
      const obbyDeadRiverUrl =
        "https://html5.gamedistribution.com/e84bda3da9da4301b9949e164cde2d87/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-obby-dead-river",
        title: "Obby & Dead River",
        description: "Obby & Dead River via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/obby-dead-river.png",
        playUrl: obbyDeadRiverUrl,
        popular: true,
        recent: true
      });

      // Heroic Knight（你新提供的游戏）
      const heroicKnightUrl =
        "https://html5.gamedistribution.com/ea9a40f010ad4d9486290e8eb9c177a8/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-heroic-knight",
        title: "Heroic Knight",
        description: "Heroic Knight via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/heroic-knight.png",
        playUrl: heroicKnightUrl,
        popular: true,
        recent: true
      });

      // Battle Simulator - Sandbox（你新提供的游戏）
      const battleSimulatorUrl =
        "https://html5.gamedistribution.com/3e212271911e454c924dedbe7f8999d3/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-battle-simulator-sandbox",
        title: "Battle Simulator - Sandbox",
        description: "Battle Simulator - Sandbox via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/battle-simulator-sandbox.png",
        playUrl: battleSimulatorUrl,
        popular: true,
        recent: true
      });

      // Gas Station: Junkyard Tycoon（你新提供的游戏）
      const gasStationTycoonUrl =
        "https://html5.gamedistribution.com/53f75279264b4a6484601a99be7aef87/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-gas-station-junkyard-tycoon",
        title: "Gas Station: Junkyard Tycoon",
        description: "Gas Station: Junkyard Tycoon via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/gas-station-junkyard-tycoon.png",
        playUrl: gasStationTycoonUrl,
        popular: true,
        recent: true
      });

      // Saira's Boutique（你新提供的游戏）
      const sairaBoutiqueUrl =
        "https://html5.gamedistribution.com/96dc22ff390042caa1770294a5ee4fd4/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-sairas-boutique",
        title: "Saira's Boutique",
        description: "Saira's Boutique via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/sairas-boutique.png",
        playUrl: sairaBoutiqueUrl,
        popular: true,
        recent: true
      });

      // Car Eats Car: Underwater Adventure（你新提供的游戏）
      const carEatsCarUnderwaterUrl =
        "https://html5.gamedistribution.com/16de13074932401f9f65f4023e586ab4/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-car-eats-car-underwater",
        title: "Car Eats Car: Underwater Adventure",
        description: "Car Eats Car: Underwater Adventure via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/car-eats-car-underwater.png",
        playUrl: carEatsCarUnderwaterUrl,
        popular: true,
        recent: true
      });

      // Idle Airport CEO（你新提供的游戏）
      const idleAirportCeoUrl =
        "https://html5.gamedistribution.com/9790dd84717e4cbf92722eb21c4fd891/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-idle-airport-ceo",
        title: "Idle Airport CEO",
        description: "Idle Airport CEO via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/idle-airport-ceo.png",
        playUrl: idleAirportCeoUrl,
        popular: true,
        recent: true
      });

      // Obby Pinata Party（你新提供的游戏）
      const obbyPinataPartyUrl =
        "https://html5.gamedistribution.com/294f2eb8d15e4bfa81d876150ed75b8a/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-obby-pinata-party",
        title: "Obby Pinata Party",
        description: "Obby Pinata Party via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/obby-pinata-party.png",
        playUrl: obbyPinataPartyUrl,
        popular: true,
        recent: true
      });

      // Moto Traffic Rider（你新提供的游戏）
      const motoTrafficRiderUrl =
        "https://html5.gamedistribution.com/9bde41f232834eff9ea81554ecee8279/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-moto-traffic-rider",
        title: "Moto Traffic Rider",
        description: "Moto Traffic Rider via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/moto-traffic-rider.png",
        playUrl: motoTrafficRiderUrl,
        popular: true,
        recent: true
      });

      // Blue Hedgehog Hill Dash Ride（你新提供的游戏）
      const blueHedgehogHillDashRideUrl =
        "https://html5.gamedistribution.com/6134a1778c0f4929a68bf7dc9cd51398/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-blue-hedgehog-hill-dash-ride",
        title: "Blue Hedgehog Hill Dash Ride",
        description: "Blue Hedgehog Hill Dash Ride via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/blue-hedgehog-hill-dash-ride.png",
        playUrl: blueHedgehogHillDashRideUrl,
        popular: true,
        recent: true
      });

      // The Flowers: Merge and Sell Bouquets（你新提供的游戏）
      const flowersMergeSellUrl =
        "https://html5.gamedistribution.com/d2e7b617f09a449db7f7a89e0fdc0a28/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-the-flowers-merge-and-sell-bouquets",
        title: "The Flowers: Merge and Sell Bouquets",
        description: "The Flowers: Merge and Sell Bouquets via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/the-flowers-merge-and-sell-bouquets.png",
        playUrl: flowersMergeSellUrl,
        popular: true,
        recent: true
      });

      // NinjaRoof（你新提供的游戏）
      const ninjaRoofUrl =
        "https://html5.gamedistribution.com/6bfd6b77827c418eb5dc2d33be6bc911/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-ninjaroof",
        title: "NinjaRoof",
        description: "NinjaRoof via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/ninjaroof.png",
        playUrl: ninjaRoofUrl,
        popular: true,
        recent: true
      });

      // Xytrian Runner（你新提供的游戏）
      const xytrianRunnerUrl =
        "https://html5.gamedistribution.com/280e627746f74fc6aabc06fcf57aeb84/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-xytrian-runner",
        title: "Xytrian Runner",
        description: "Xytrian Runner via GameDistribution. Opens in a new browser tab.",
        category: "Arcade",
        thumbnail: "assets/xytrian-runner.png",
        playUrl: xytrianRunnerUrl,
        popular: true,
        recent: true
      });

      // Cunning Ginger（你新提供的游戏）
      const cunningGingerUrl =
        "https://html5.gamedistribution.com/1ad53433606841a3bdc9a294bad90f3e/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-cunning-ginger",
        title: "Cunning Ginger",
        description: "Cunning Ginger via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/cunning-ginger.png",
        playUrl: cunningGingerUrl,
        popular: true,
        recent: true
      });

      // Ultimate Tower Defense（你新提供的游戏）
      const ultimateTowerDefenseUrl =
        "https://html5.gamedistribution.com/508663e69fe74b97a9192c779c3ff71f/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-ultimate-tower-defense",
        title: "Ultimate Tower Defense",
        description: "Ultimate Tower Defense via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/ultimate-tower-defense.png",
        playUrl: ultimateTowerDefenseUrl,
        popular: true,
        recent: true
      });

      // Nautilus Spaceship Escape（你新提供的游戏）
      const nautilusSpaceshipEscapeUrl =
        "https://html5.gamedistribution.com/3c231026237f4b9db10cce6ef0914124/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-nautilus-spaceship-escape",
        title: "Nautilus Spaceship Escape",
        description: "Nautilus Spaceship Escape via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/nautilus-spaceship-escape.png",
        playUrl: nautilusSpaceshipEscapeUrl,
        popular: true,
        recent: true
      });

      // Bubble Shooter Pro 4（你新提供的游戏）
      const bubbleShooterPro4Url =
        "https://html5.gamedistribution.com/a2cd0ba0848b49b98ade7d2b8553f09d/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-bubble-shooter-pro-4",
        title: "Bubble Shooter Pro 4",
        description: "Bubble Shooter Pro 4 via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/bubble-shooter-pro-4.png",
        playUrl: bubbleShooterPro4Url,
        popular: true,
        recent: true
      });

      // Crazy Motorcycle（你新提供的游戏）
      const crazyMotorcycleUrl =
        "https://html5.gamedistribution.com/30637801603e46ec82b342b77f539cf3/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-crazy-motorcycle",
        title: "Crazy Motorcycle",
        description: "Crazy Motorcycle via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/crazy-motorcycle.png",
        playUrl: crazyMotorcycleUrl,
        popular: true,
        recent: true
      });

      // SWAT Cats Shooter（你新提供的游戏）
      const swatCatsShooterUrl =
        "https://html5.gamedistribution.com/bf6439db0088415593e786e19a04e5b3/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-swat-cats-shooter",
        title: "SWAT Cats Shooter",
        description: "SWAT Cats Shooter via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/swat-cats-shooter.png",
        playUrl: swatCatsShooterUrl,
        popular: true,
        recent: true
      });

      // The Zombie House（你新提供的游戏）
      const theZombieHouseUrl =
        "https://html5.gamedistribution.com/ddc202e7d252451f8d1344f9f0e455ef/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-the-zombie-house",
        title: "The Zombie House",
        description: "The Zombie House via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/the-zombie-house.png",
        playUrl: theZombieHouseUrl,
        popular: true,
        recent: true
      });

      // Frost Defense（你新提供的游戏）
      const frostDefenseUrl =
        "https://html5.gamedistribution.com/ac7c68ff82a9413197db6b99a8452c10/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-frost-defense",
        title: "Frost Defense",
        description: "Frost Defense via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/frost-defense.png",
        playUrl: frostDefenseUrl,
        popular: true,
        recent: true
      });

      // Lost Adventure（你新提供的游戏）
      const lostAdventureUrl =
        "https://html5.gamedistribution.com/90dab544fe47444eacfdfb97b704d5c1/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-lost-adventure",
        title: "Lost Adventure",
        description: "Lost Adventure via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/lost-adventure.png",
        playUrl: lostAdventureUrl,
        popular: true,
        recent: true
      });

      // Lost in the Forest（你新提供的游戏）
      const lostInTheForestUrl =
        "https://html5.gamedistribution.com/01c1407ac20942e688452cf1ab136b30/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-lost-in-the-forest",
        title: "Lost in the Forest",
        description: "Lost in the Forest via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/lost-in-the-forest.png",
        playUrl: lostInTheForestUrl,
        popular: true,
        recent: true
      });

      // Crazy Traffic Racer（你新提供的游戏）
      const crazyTrafficRacerUrl =
        "https://html5.gamedistribution.com/d0b8e5ba257d4f888738a7ec722443f1/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-crazy-traffic-racer",
        title: "Crazy Traffic Racer",
        description: "Crazy Traffic Racer via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/crazy-traffic-racer.png",
        playUrl: crazyTrafficRacerUrl,
        popular: true,
        recent: true
      });

      // Metal Bay Top Blade Power（你新提供的游戏）
      const metalBayTopBladePowerUrl =
        "https://html5.gamedistribution.com/564098c5f7f34dd989db1f4c650e7a66/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-metal-bay-top-blade-power",
        title: "Metal Bay Top Blade Power",
        description: "Metal Bay Top Blade Power via GameDistribution. Opens in a new browser tab.",
        category: "Arcade",
        thumbnail: "assets/metal-bay-top-blade-power.png",
        playUrl: metalBayTopBladePowerUrl,
        popular: true,
        recent: true
      });

      // Virtual Families Cook Off（你新提供的游戏）
      const virtualFamiliesCookOffUrl =
        "https://html5.gamedistribution.com/9bf2e82f7c684bdcb0a8f4fa3ec0ecd6/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-virtual-families-cook-off",
        title: "Virtual Families Cook Off",
        description: "Virtual Families Cook Off via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/virtual-families-cook-off.png",
        playUrl: virtualFamiliesCookOffUrl,
        popular: true,
        recent: true
      });

      // Eternal Fury（你新提供的游戏）
      const eternalFuryUrl =
        "https://html5.gamedistribution.com/6f6471ecbc2447d29aa1173e591448e3/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-eternal-fury",
        title: "Eternal Fury",
        description: "Eternal Fury via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/eternal-fury.png",
        playUrl: eternalFuryUrl,
        popular: true,
        recent: true
      });

      // Golden Frontier（你新提供的游戏）
      const goldenFrontierUrl =
        "https://html5.gamedistribution.com/5b3819b9b867407cbe6758b437de2902/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-golden-frontier",
        title: "Golden Frontier",
        description: "Golden Frontier via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/golden-frontier.png",
        playUrl: goldenFrontierUrl,
        popular: true,
        recent: true
      });

      // Crazy Bike Stunts PvP（你新提供的游戏）
      const crazyBikeStuntsPvpUrl =
        "https://html5.gamedistribution.com/0c89181b9cfe4897afa41b0f94385da9/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-crazy-bike-stunts-pvp",
        title: "Crazy Bike Stunts PvP",
        description: "Crazy Bike Stunts PvP via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/crazy-bike-stunts-pvp.png",
        playUrl: crazyBikeStuntsPvpUrl,
        popular: true,
        recent: true
      });

      // Counter Craft Sniper（你新提供的游戏）
      const counterCraftSniperUrl =
        "https://html5.gamedistribution.com/47fe523bf21d4eaa951e1e0998a1b96c/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-counter-craft-sniper",
        title: "Counter Craft Sniper",
        description: "Counter Craft Sniper via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/counter-craft-sniper.png",
        playUrl: counterCraftSniperUrl,
        popular: true,
        recent: true
      });

      // TapKO（你新提供的游戏）
      const tapkoUrl =
        "https://html5.gamedistribution.com/ac6a598abb184816af3be3acec546fb5/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-tapko",
        title: "TapKO",
        description: "TapKO via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/tapko.png",
        playUrl: tapkoUrl,
        popular: true,
        recent: true
      });

      // Billiards 3D: Russian Pyramid（你新提供的游戏）
      const billiards3dRussianPyramidUrl =
        "https://html5.gamedistribution.com/3362eeed0b0748a9804c893ef51adb7e/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-billiards-3d-russian-pyramid",
        title: "Billiards 3D: Russian Pyramid",
        description: "Billiards 3D: Russian Pyramid via GameDistribution. Opens in a new browser tab.",
        category: "Sports",
        thumbnail: "assets/billiards-3d-russian-pyramid.png",
        playUrl: billiards3dRussianPyramidUrl,
        popular: true,
        recent: true
      });

      // Uphill Rush 9（你新提供的游戏）
      const uphillRush9Url =
        "https://html5.gamedistribution.com/61381674e8404f3d97926c04d6bc2856/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-uphill-rush-9",
        title: "Uphill Rush 9",
        description: "Uphill Rush 9 via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/uphill-rush-9.png",
        playUrl: uphillRush9Url,
        popular: true,
        recent: true
      });

      // My horse is amazing（你新提供的游戏）
      const myHorseIsAmazingUrl =
        "https://html5.gamedistribution.com/29632c22779b4fa88731722d502b72a3/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-my-horse-is-amazing",
        title: "My horse is amazing",
        description: "My horse is amazing via GameDistribution. Opens in a new browser tab.",
        category: "Arcade",
        thumbnail: "assets/my-horse-is-amazing.png",
        playUrl: myHorseIsAmazingUrl,
        popular: true,
        recent: true
      });

      // Horseback Survival（你新提供的游戏）
      const horsebackSurvivalUrl =
        "https://html5.gamedistribution.com/245f70b2dd1e4994b0ef9e985378aba6/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-horseback-survival",
        title: "Horseback Survival",
        description: "Horseback Survival via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/horseback-survival.png",
        playUrl: horsebackSurvivalUrl,
        popular: true,
        recent: true
      });

      // Tricky Arrow 2（你新提供的游戏）
      const trickyArrow2Url =
        "https://html5.gamedistribution.com/c3e1c3de10fd49b8ab18c0cc6ff46811/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-tricky-arrow-2",
        title: "Tricky Arrow 2",
        description: "Tricky Arrow 2 via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/tricky-arrow-2.png",
        playUrl: trickyArrow2Url,
        popular: true,
        recent: true
      });

      // Climb Up!（你新提供的游戏）
      const climbUpUrl =
        "https://html5.gamedistribution.com/561d4a2d831d4630a9c29b2c51a3a5bf/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-climb-up",
        title: "Climb Up!",
        description: "Climb Up! via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/climb-up.png",
        playUrl: climbUpUrl,
        popular: true,
        recent: true
      });

      // Pyramidz（你新提供的游戏）
      const pyramidzUrl =
        "https://html5.gamedistribution.com/8350949cfc924ff0be5d0ea5cad716bf/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-pyramidz",
        title: "Pyramidz",
        description: "Pyramidz via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/pyramidz.png",
        playUrl: pyramidzUrl,
        popular: true,
        recent: true
      });

      // Slinky Color Sort（你新提供的游戏）
      const slinkyColorSortUrl =
        "https://html5.gamedistribution.com/19558675273b4c0c92bb03c9cfd2d4f4/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-slinky-color-sort",
        title: "Slinky Color Sort",
        description: "Slinky Color Sort via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/slinky-color-sort.png",
        playUrl: slinkyColorSortUrl,
        popular: true,
        recent: true
      });

      // 3D Chess Master（你新提供的游戏）
      const chessMaster3dUrl =
        "https://html5.gamedistribution.com/d8dea5d83d1c4132a119fabedbc60bd6/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-3d-chess-master",
        title: "3D Chess Master",
        description: "3D Chess Master via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/3d-chess-master.png",
        playUrl: chessMaster3dUrl,
        popular: true,
        recent: true
      });

      // Interior Designer - Decor Life（你新提供的游戏）
      const interiorDesignerDecorLifeUrl =
        "https://html5.gamedistribution.com/4e3ea564a0274dabad8bdc0ea8fd6270/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-interior-designer-decor-life",
        title: "Interior Designer - Decor Life",
        description: "Interior Designer - Decor Life via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/interior-designer-decor-life.png",
        playUrl: interiorDesignerDecorLifeUrl,
        popular: true,
        recent: true
      });

      // Tiny Farm（你新提供的游戏）
      const tinyFarmUrl =
        "https://html5.gamedistribution.com/cdadc98c441c4c5bbc017428d304d158/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-tiny-farm",
        title: "Tiny Farm",
        description: "Tiny Farm via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/tiny-farm.png",
        playUrl: tinyFarmUrl,
        popular: true,
        recent: true
      });

      // Maido（你新提供的游戏）
      const maidoUrl =
        "https://html5.gamedistribution.com/d644c8ad5da0410cab699b29b09b21ea/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-maido",
        title: "Maido",
        description: "Maido via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/maido.png",
        playUrl: maidoUrl,
        popular: true,
        recent: true
      });

      // Cooking Restaurant Kitchen（你新提供的游戏）
      const cookingRestaurantKitchenUrl =
        "https://html5.gamedistribution.com/755f3912501d454fb781db0a4c0c5764/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-cooking-restaurant-kitchen",
        title: "Cooking Restaurant Kitchen",
        description: "Cooking Restaurant Kitchen via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/cooking-restaurant-kitchen.png",
        playUrl: cookingRestaurantKitchenUrl,
        popular: true,
        recent: true
      });

      // My Cat Restaurant（你新提供的游戏）
      const myCatRestaurantUrl =
        "https://html5.gamedistribution.com/e842fa22ef0e4801840db85cbeba72d7/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-my-cat-restaurant",
        title: "My Cat Restaurant",
        description: "My Cat Restaurant via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/my-cat-restaurant.png",
        playUrl: myCatRestaurantUrl,
        popular: true,
        recent: true
      });

      // Food Truck Chef Cooking（你新提供的游戏）
      const foodTruckChefCookingUrl =
        "https://html5.gamedistribution.com/0df98c9ecda34b36a0a60a4f1776bc7c/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-food-truck-chef-cooking",
        title: "Food Truck Chef Cooking",
        description: "Food Truck Chef Cooking via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/food-truck-chef-cooking.png",
        playUrl: foodTruckChefCookingUrl,
        popular: true,
        recent: true
      });

      // Ellie's Recipe: Dubai Chocolate Bar（你新提供的游戏）
      const elliesRecipeDubaiChocolateBarUrl =
        "https://html5.gamedistribution.com/3039066375ec4c45a88af1ae344ce091/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-ellies-recipe-dubai-chocolate-bar",
        title: "Ellie's Recipe: Dubai Chocolate Bar",
        description: "Ellie's Recipe: Dubai Chocolate Bar via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/ellies-recipe-dubai-chocolate-bar.png",
        playUrl: elliesRecipeDubaiChocolateBarUrl,
        popular: true,
        recent: true
      });

      // Valentines Hidden Alphawords（你新提供的游戏）
      const valentinesHiddenAlphawordsUrl =
        "https://html5.gamedistribution.com/41fb9c32a74c4068acf0a04d08b36fd6/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-valentines-hidden-alphawords",
        title: "Valentines Hidden Alphawords",
        description: "Valentines Hidden Alphawords via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/valentines-hidden-alphawords.png",
        playUrl: valentinesHiddenAlphawordsUrl,
        popular: true,
        recent: true
      });

      // Hidden objects: Lost Island 2（你新提供的游戏）
      const hiddenObjectsLostIsland2Url =
        "https://html5.gamedistribution.com/194bceb65bc3475e8407d6f9354c8e3b/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-hidden-objects-lost-island-2",
        title: "Hidden objects: Lost Island 2",
        description: "Hidden objects: Lost Island 2 via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/hidden-objects-lost-island-2.png",
        playUrl: hiddenObjectsLostIsland2Url,
        popular: true,
        recent: true
      });

      // Hidden Object: Emily's Case（你新提供的游戏）
      const hiddenObjectEmilysCaseUrl =
        "https://html5.gamedistribution.com/ee57ac72ac07468cbefcfdde8ed90f12/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-hidden-object-emilys-case",
        title: "Hidden Object: Emily's Case",
        description: "Hidden Object: Emily's Case via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/hidden-object-emilys-case.png",
        playUrl: hiddenObjectEmilysCaseUrl,
        popular: true,
        recent: true
      });

      // Mahjong Crimes - Puzzle Story（你新提供的游戏）
      const mahjongCrimesPuzzleStoryUrl =
        "https://html5.gamedistribution.com/2854f3f9a9244d76a577fab1e2349219/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-mahjong-crimes-puzzle-story",
        title: "Mahjong Crimes - Puzzle Story",
        description: "Mahjong Crimes - Puzzle Story via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/mahjong-crimes-puzzle-story.png",
        playUrl: mahjongCrimesPuzzleStoryUrl,
        popular: true,
        recent: true
      });

      // Crazy Dunk（你新提供的游戏）
      const crazyDunkUrl =
        "https://html5.gamedistribution.com/3ddd77e15f134657b15b0a31d01574ca/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-crazy-dunk",
        title: "Crazy Dunk",
        description: "Crazy Dunk via GameDistribution. Opens in a new browser tab.",
        category: "Sports",
        thumbnail: "assets/crazy-dunk.png",
        playUrl: crazyDunkUrl,
        popular: true,
        recent: true
      });

      // Basketball Stars 2026（你新提供的游戏）
      const basketballStars2026Url =
        "https://html5.gamedistribution.com/516d6908fbc848bdb89e65a58a43a7dc/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-basketball-stars-2026",
        title: "Basketball Stars 2026",
        description: "Basketball Stars 2026 via GameDistribution. Opens in a new browser tab.",
        category: "Sports",
        thumbnail: "assets/basketball-stars-2026.png",
        playUrl: basketballStars2026Url,
        popular: true,
        recent: true
      });

      // Tank Stars（你新提供的游戏）
      const tankStarsUrl =
        "https://html5.gamedistribution.com/659090e00bfc4650899550d63f8a130d/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-tank-stars",
        title: "Tank Stars",
        description: "Tank Stars via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/tank-stars.png",
        playUrl: tankStarsUrl,
        popular: true,
        recent: true
      });

      // Lion Family Sim Online（你新提供的游戏）
      const lionFamilySimOnlineUrl =
        "https://html5.gamedistribution.com/e92f1628cb724c31bf4bdf99477485da/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-lion-family-sim-online",
        title: "Lion Family Sim Online",
        description: "Lion Family Sim Online via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/lion-family-sim-online.png",
        playUrl: lionFamilySimOnlineUrl,
        popular: true,
        recent: true
      });

      // Animal Racing Idle Park（你新提供的游戏）
      const animalRacingIdleParkUrl =
        "https://html5.gamedistribution.com/6949c2adc8c64879bf9676109eb9bfea/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-animal-racing-idle-park",
        title: "Animal Racing Idle Park",
        description: "Animal Racing Idle Park via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/animal-racing-idle-park.png",
        playUrl: animalRacingIdleParkUrl,
        popular: true,
        recent: true
      });

      // Super Tank Wrestle（你新提供的游戏）
      const superTankWrestleUrl =
        "https://html5.gamedistribution.com/f9efa6a562ca44dfb5cf4558309beba7/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-super-tank-wrestle",
        title: "Super Tank Wrestle",
        description: "Super Tank Wrestle via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/super-tank-wrestle.png",
        playUrl: superTankWrestleUrl,
        popular: true,
        recent: true
      });

      // Accurate 2D（你新提供的游戏）
      const accurate2dUrl =
        "https://html5.gamedistribution.com/28cddc44643242c49335fbe7dbd4354d/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-accurate-2d",
        title: "Accurate 2D",
        description: "Accurate 2D via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/accurate-2d.png",
        playUrl: accurate2dUrl,
        popular: true,
        recent: true
      });

      // Real Impossible Sky Tracks Car Driving（你新提供的游戏）
      const realImpossibleSkyTracksUrl =
        "https://html5.gamedistribution.com/1cfb442071ff48c590ef9c7fe5ff6790/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-real-impossible-sky-tracks",
        title: "Real Impossible Sky Tracks Car Driving",
        description: "Real Impossible Sky Tracks Car Driving via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/real-impossible-sky-tracks-car-driving.png",
        playUrl: realImpossibleSkyTracksUrl,
        popular: true,
        recent: true
      });

      // DayCare Tycoon（你新提供的游戏）
      const daycareTycoonUrl =
        "https://html5.gamedistribution.com/d9f930a985ba4d2fb94100f6daeee6b8/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-daycare-tycoon",
        title: "DayCare Tycoon",
        description: "DayCare Tycoon via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/daycare-tycoon.png",
        playUrl: daycareTycoonUrl,
        popular: true,
        recent: true
      });

      // Hawaii Match 5（你新提供的游戏）
      const hawaiiMatch5Url =
        "https://html5.gamedistribution.com/bfd9e939e8cd458fbb03df9b598959f4/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-hawaii-match-5",
        title: "Hawaii Match 5",
        description: "Hawaii Match 5 via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/hawaii-match-5.png",
        playUrl: hawaiiMatch5Url,
        popular: true,
        recent: true
      });

      // Tropical Match 2（你新提供的游戏）
      const tropicalMatch2Url =
        "https://html5.gamedistribution.com/59719ccbc7764864bae2c4c7aea820b6/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-tropical-match-2",
        title: "Tropical Match 2",
        description: "Tropical Match 2 via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/tropical-match-2.png",
        playUrl: tropicalMatch2Url,
        popular: true,
        recent: true
      });

      // Passenger Sort（你新提供的游戏）
      const passengerSortUrl =
        "https://html5.gamedistribution.com/c5ddcaf00062498cafd7d13bb325c62a/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-passenger-sort",
        title: "Passenger Sort",
        description: "Passenger Sort via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/passenger-sort.png",
        playUrl: passengerSortUrl,
        popular: true,
        recent: true
      });

      // Super Brain（你新提供的游戏）
      const superBrainUrl =
        "https://html5.gamedistribution.com/43a1c23743184ec8befbb7a221c87c93/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-super-brain",
        title: "Super Brain",
        description: "Super Brain via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/super-brain.png",
        playUrl: superBrainUrl,
        popular: true,
        recent: true
      });

      // Slingshot Chicken（你新提供的游戏）
      const slingshotChickenUrl =
        "https://html5.gamedistribution.com/29aa4ec2a3f44acd9935beb82393f5e0/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-slingshot-chicken",
        title: "Slingshot Chicken",
        description: "Slingshot Chicken via GameDistribution. Opens in a new browser tab.",
        category: "Arcade",
        thumbnail: "assets/slingshot-chicken.png",
        playUrl: slingshotChickenUrl,
        popular: true,
        recent: true
      });

      // Penguin Farm - Ice Merge（你新提供的游戏）
      const penguinFarmUrl =
        "https://html5.gamedistribution.com/59d85983ebf14a37944e13672cb28b76/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-penguin-farm-ice-merge",
        title: "Penguin Farm - Ice Merge",
        description: "Penguin Farm - Ice Merge via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/penguin-farm-ice-merge.png",
        playUrl: penguinFarmUrl,
        popular: true,
        recent: true
      });

      // Emerland Solitaire（你新提供的游戏）
      const emerlandSolitaireUrl =
        "https://html5.gamedistribution.com/a8d2dd3ae70d464d9e36029a038ffb09/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-emerland-solitaire",
        title: "Emerland Solitaire",
        description: "Emerland Solitaire via GameDistribution. Opens in a new browser tab.",
        category: "Card",
        thumbnail: "assets/emerland-solitaire.png",
        playUrl: emerlandSolitaireUrl,
        popular: true,
        recent: true
      });

      // Kaboom Miner（你新提供的游戏，Arcade 标签）
      const kaboomMinerUrl =
        "https://html5.gamedistribution.com/d43ed595d14e47a1ac6a4ff7456fd3b5/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-kaboom-miner",
        title: "Kaboom Miner",
        description: "Kaboom Miner via GameDistribution. Opens in a new browser tab.",
        category: "Arcade",
        thumbnail: "assets/kaboom-miner.png",
        playUrl: kaboomMinerUrl,
        popular: true,
        recent: true
      });

      // Flag Master: World Flags Quiz（你新提供的游戏）
      const flagMasterUrl =
        "https://html5.gamedistribution.com/3b80180a914c4db699ee0e0b8840d620/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-flag-master-world-flags-quiz",
        title: "Flag Master: World Flags Quiz",
        description: "Flag Master: World Flags Quiz via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/flag-master-world-flags-quiz.png",
        playUrl: flagMasterUrl,
        popular: true,
        recent: true
      });

      // Axe Throw（你新提供的游戏）
      const axeThrowUrl =
        "https://html5.gamedistribution.com/b4b0a3ebfb684bcda80a5cb8cc64278e/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-axe-throw",
        title: "Axe Throw",
        description: "Axe Throw via GameDistribution. Opens in a new browser tab.",
        category: "Arcade",
        thumbnail: "assets/axe-throw.png",
        playUrl: axeThrowUrl,
        popular: true,
        recent: true
      });

      // Desert Rover Survival（你新提供的游戏）
      const desertRoverUrl =
        "https://html5.gamedistribution.com/842f2d53cc30446288205b12715f7484/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-desert-rover-survival",
        title: "Desert Rover Survival",
        description: "Desert Rover Survival via GameDistribution. Opens in a new browser tab.",
        category: "Racing",
        thumbnail: "assets/desert-rover-survival.png",
        playUrl: desertRoverUrl,
        popular: true,
        recent: true
      });

      // Prison Master: Escape Journey（你新提供的游戏）
      const prisonMasterUrl =
        "https://html5.gamedistribution.com/8cdc5472b94c4fe9a8c092bec1d0c18e/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-prison-master-escape-journey",
        title: "Prison Master: Escape Journey",
        description: "Prison Master: Escape Journey via GameDistribution. Opens in a new browser tab.",
        category: "Action",
        thumbnail: "assets/prison-master-escape-journey.png",
        playUrl: prisonMasterUrl,
        popular: true,
        recent: true
      });

      // Tricky Castle（你新提供的游戏）
      const trickyCastleUrl =
        "https://html5.gamedistribution.com/41f72b2235934807bda0d1f334087f27/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-tricky-castle",
        title: "Tricky Castle",
        description: "Tricky Castle via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/tricky-castle.png",
        playUrl: trickyCastleUrl,
        popular: true,
        recent: true
      });

      // Noob Village Tower Defense（你新提供的游戏）
      const noobVillageUrl =
        "https://html5.gamedistribution.com/95cde1eb260141f8b960bb3d5dbeb34a/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-noob-village-tower-defense",
        title: "Noob Village Tower Defense",
        description: "Noob Village Tower Defense via GameDistribution. Opens in a new browser tab.",
        category: "Strategy",
        thumbnail: "assets/noob-village-tower-defense.png",
        playUrl: noobVillageUrl,
        popular: true,
        recent: true
      });

      // Monster Trucks Jigsaw（你新提供的游戏）
      const monsterTrucksJigsawUrl =
        "https://html5.gamedistribution.com/024cdc565a2a4a34ac21f091feaa8af5/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-monster-trucks-jigsaw",
        title: "Monster Trucks Jigsaw",
        description: "Monster Trucks Jigsaw via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/monster-trucks-jigsaw.png",
        playUrl: monsterTrucksJigsawUrl,
        popular: true,
        recent: true
      });

      // Arrows Puzzle Escape（你新提供的游戏）
      const arrowsPuzzleEscapeUrl =
        "https://html5.gamedistribution.com/d41e8014aea74629934290991b008c7a/?gd_sdk_referrer_url=https://www.pokopie.com/games/{game-path}";
      customIframeGames.push({
        id: "custom-arrows-puzzle-escape",
        title: "Arrows Puzzle Escape",
        description: "Arrows Puzzle Escape via GameDistribution. Opens in a new browser tab.",
        category: "Puzzle",
        thumbnail: "assets/arrows-puzzle-escape.png",
        playUrl: arrowsPuzzleEscapeUrl,
        popular: true,
        recent: true
      });
    })();

    let allGames = [];
    let filteredGames = [];
    let currentCategory = "All";
    let currentSort = "popular";
    let searchQuery = "";

    const homePage = document.getElementById("top");
    const gameDetailPage = document.getElementById("gameDetailPage");

    const featuredGrid = document.getElementById("featuredGrid");
    const popularRow = document.getElementById("popularRow");
    const newRow = document.getElementById("newRow");
    const mainGrid = document.getElementById("mainGrid");
    const emptyMessage = document.getElementById("emptyMessage");
    const statusTotal = document.getElementById("statusTotal");
    const statusFilter = document.getElementById("statusFilter");
    const statusSource = document.getElementById("statusSource");
    const searchInput = document.getElementById("searchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");
    const navCategories = document.getElementById("navCategories");
    const heroPlayBtn = document.getElementById("heroPlayBtn");
    const backToTop = document.getElementById("backToTop");
    const darkModeToggle = document.getElementById("darkModeToggle");

    const modalBackdrop = document.getElementById("gameModalBackdrop");
    const modalGameTitle = document.getElementById("modalGameTitle");
    const modalGameMeta = document.getElementById("modalGameMeta");
    const modalDescription = document.getElementById("modalDescription");
    const gameIframe = document.getElementById("gameIframe");
    const internalWrapper = document.getElementById("internalWrapper");
    const internalCanvas = document.getElementById("internalCanvas");
    const internalTitle = document.getElementById("internalTitle");
    const internalScore = document.getElementById("internalScore");
    const internalRestart = document.getElementById("internalRestart");
    const internalHelp = document.getElementById("internalHelp");
    const modalLoading = document.getElementById("modalLoading");
    const embedNotice = document.getElementById("embedNotice");
    const noticeOpenNew = document.getElementById("noticeOpenNew");
    const noticeTryAnother = document.getElementById("noticeTryAnother");
    const modalClose = document.getElementById("modalClose");
    const modalFullscreen = document.getElementById("modalFullscreen");
    const modalOpenNew = document.getElementById("modalOpenNew");

    // Game detail elements
    const detailTitle = document.getElementById("detailTitle");
    const detailMeta = document.getElementById("detailMeta");
    const detailDescription = document.getElementById("detailDescription");
    const detailExtra = document.getElementById("detailExtra");
    const detailIframe = document.getElementById("detailIframe");
    const detailIframeLoading = document.getElementById("detailIframeLoading");
    const detailSimilarList = document.getElementById("detailSimilarList");
    const detailBackHome = document.getElementById("detailBackHome");

    // Category landing elements
    const categoryLanding = document.getElementById("categoryLanding");
    const landingH1 = document.getElementById("landingH1");
    const landingIntro = document.getElementById("landingIntro");
    const landingTopTitle = document.getElementById("landingTopTitle");
    const landingTopList = document.getElementById("landingTopList");
    const landingWhyTitle = document.getElementById("landingWhyTitle");
    const landingWhyList = document.getElementById("landingWhyList");
    const landingNewTitle = document.getElementById("landingNewTitle");
    const landingNewList = document.getElementById("landingNewList");

    let currentModalGame = null;
    let isModalMaximized = false;
    let embedWatchdog = null;
    let internalLoopHandle = 0;
    let internalCleanup = null;

    function el(tag, className, attrs) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (attrs) {
        for (const [k, v] of Object.entries(attrs)) {
          if (k === "text") node.textContent = v;
          else if (k === "html") node.innerHTML = v;
          else node.setAttribute(k, v);
        }
      }
      return node;
    }

    function slugify(text) {
      return (text || "")
        .toLowerCase()
        .trim()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "game";
    }

    function resolveThumbSrc(src) {
      const s = (src || "").trim();
      if (!s) return "";
      if (/^(https?:|data:|blob:)/i.test(s)) return s;
      if (s.startsWith("/")) return s;
      // Make relative paths work on sub-routes like /puzzle-games/
      return "/" + s.replace(/^\/+/, "");
    }

    function resolveWebpSrc(resolvedSrc) {
      const s = (resolvedSrc || "").trim();
      if (!s) return "";
      // Only local PNG thumbs are converted; external URLs keep original format.
      if (!s.startsWith("/") || !/\.png(\?.*)?$/i.test(s)) return "";
      return s.replace(/\.png(\?.*)?$/i, ".webp$1");
    }

    function createThumbPicture(imgClass, thumbSrc, alt, attrs = {}) {
      const pngSrc = thumbSrc || FALLBACK_THUMB;
      const webpSrc = resolveWebpSrc(pngSrc);
      const picture = document.createElement("picture");
      if (webpSrc) {
        const source = document.createElement("source");
        source.type = "image/webp";
        source.srcset = webpSrc;
        picture.appendChild(source);
      }
      const img = el("img", imgClass, Object.assign({
        src: pngSrc,
        alt: alt || "game thumbnail",
        loading: "lazy",
        decoding: "async"
      }, attrs));
      img.onerror = () => {
        img.src = FALLBACK_THUMB;
        img.onerror = null;
      };
      picture.appendChild(img);
      return picture;
    }

    function setCategoryLandingVisible(visible) {
      if (!categoryLanding) return;
      categoryLanding.hidden = !visible;
    }

    function renderCategoryLanding(category) {
      if (!categoryLanding) return;
      if (!category || category === "All") {
        setCategoryLandingVisible(false);
        return;
      }

      const cat = category;
      const subtype1 = cat === "Puzzle" ? "logic puzzles" : cat === "Action" ? "shooting challenges" : cat === "Racing" ? "car stunts" : cat === "Sports" ? "skill matches" : "incremental upgrades";
      const subtype2 = cat === "Puzzle" ? "match & merge games" : cat === "Action" ? "sniper missions" : cat === "Racing" ? "traffic racing" : cat === "Sports" ? "quick arcade sports" : "tycoon-style progress";

      if (landingH1) landingH1.textContent = `Best ${cat} Games Online`;
      if (landingIntro) {
        landingIntro.textContent =
          `Discover the best free ${cat.toLowerCase()} games you can play online. These games are easy to start, require no download, and work on any device. Whether you enjoy ${subtype1} or ${subtype2}, there is something for everyone.`;
      }
      if (landingTopTitle) landingTopTitle.textContent = `Top ${cat} Games`;
      if (landingWhyTitle) landingWhyTitle.textContent = `Why Play ${cat} Games`;
      if (landingNewTitle) landingNewTitle.textContent = `New ${cat} Games`;

      const listAll = allGames.filter((g) => (g.category || "").toLowerCase() === cat.toLowerCase());
      const topList = listAll
        .slice()
        .sort((a, b) => {
          const ap = a.popular ? 1 : 0;
          const bp = b.popular ? 1 : 0;
          if (bp !== ap) return bp - ap;
          return (a.title || "").localeCompare(b.title || "");
        })
        .slice(0, 20);

      const newList = listAll
        .filter((g) => g.recent)
        .slice(0, 12);

      if (landingTopList) {
        landingTopList.innerHTML = "";
        topList.forEach((g) => {
          const item = el("article", "landing-item");
          const img = createThumbPicture("landing-thumb", resolveThumbSrc(g.thumbnail), g.title + " thumbnail", { loading: "lazy" });
          const right = el("div", "");
          right.appendChild(el("div", "landing-title", { text: g.title }));
          const oneLine = g.description || `Play ${g.title} free online. No download required.`;
          right.appendChild(el("div", "landing-desc", { text: oneLine }));
          item.appendChild(img);
          item.appendChild(right);
          item.addEventListener("click", () => navigateToGame(g));
          landingTopList.appendChild(item);
        });
      }

      if (landingWhyList) {
        landingWhyList.innerHTML = "";
        const benefits =
          cat === "Puzzle"
            ? ["Improve skills like logic and problem solving", "Relax and have fun", "Play anytime without installation"]
            : cat === "Action"
              ? ["Improve skills like reaction time and aiming", "Fast, exciting gameplay", "Play anytime without installation"]
              : cat === "Racing"
                ? ["Improve skills like timing and control", "Quick sessions with satisfying wins", "Play anytime without installation"]
                : cat === "Sports"
                  ? ["Improve skills like precision and timing", "Short matches, instant fun", "Play anytime without installation"]
                  : ["Improve skills like planning and optimization", "Relax and watch your progress grow", "Play anytime without installation"];
        benefits.forEach((b) => landingWhyList.appendChild(el("li", "", { text: b })));
      }

      if (landingNewList) {
        landingNewList.innerHTML = "";
        (newList.length ? newList : topList.slice(0, 6)).forEach((g) => {
          const item = el("article", "landing-item");
          const img = createThumbPicture("landing-thumb", resolveThumbSrc(g.thumbnail), g.title + " thumbnail", { loading: "lazy" });
          const right = el("div", "");
          right.appendChild(el("div", "landing-title", { text: g.title }));
          right.appendChild(el("div", "landing-desc", { text: g.description || `New ${cat.toLowerCase()} game on Pokopie. Play instantly in browser.` }));
          item.appendChild(img);
          item.appendChild(right);
          item.addEventListener("click", () => navigateToGame(g));
          landingNewList.appendChild(item);
        });
      }

      setCategoryLandingVisible(true);
    }

    function getCanonicalOrigin() {
      const host = (window.location.hostname || "").toLowerCase();
      if (host === "www.pokopie.com" || host === "pokopie.com") return "https://www.pokopie.com";
      return window.location.origin;
    }

    function setSeoForPage({ title, description, canonicalPath }) {
      try {
        const origin = getCanonicalOrigin();
        const canonicalUrl = origin + canonicalPath;

        document.title = title;

        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute("content", description);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute("href", canonicalUrl);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute("content", description);

        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute("content", title);

        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute("content", description);
      } catch (_) {}
    }

    function setSeoForGame(game) {
      const cat = (game.category || "Arcade");
      const canonicalPath = `/games/${game.slug || slugify(game.title)}`;
      const title = `Play ${game.title} Online Free No Download`;
      const description = `Play ${game.title} online for free. No download needed. Learn how to play, tips, and similar games. Works on PC, mobile, and tablet.`;

      setSeoForPage({ title, description, canonicalPath });

      // Optional: add/replace a Game JSON-LD block for richer snippets
      try {
        const origin = getCanonicalOrigin();
        const json = {
          "@context": "https://schema.org",
          "@type": "VideoGame",
          "name": game.title,
          "url": origin + canonicalPath,
          "genre": cat,
          "applicationCategory": "Game",
          "operatingSystem": "Web",
          "description": description,
          "image": game.thumbnail ? (origin + resolveThumbSrc(String(game.thumbnail))) : undefined,
          "publisher": { "@type": "Organization", "name": "Pokopie", "url": origin + "/" }
        };
        Object.keys(json).forEach((k) => json[k] === undefined && delete json[k]);
        let node = document.getElementById("pokopie-game-jsonld");
        if (!node) {
          node = document.createElement("script");
          node.type = "application/ld+json";
          node.id = "pokopie-game-jsonld";
          document.head.appendChild(node);
        }
        node.textContent = JSON.stringify(json);
      } catch (_) {}
    }

    function clearGameSeoJsonLd() {
      const node = document.getElementById("pokopie-game-jsonld");
      if (node) node.remove();
    }

    const CATEGORY_ROUTES = {
      "puzzle-games": "Puzzle",
      "shooting-games": "Action",
      "idle-games": "Strategy",
      "arcade-games": "Arcade",
      "racing-games": "Racing",
      "sports-games": "Sports",
      "strategy-games": "Strategy",
      "action-games": "Action"
    };

    function routeKeyForCategory(cat) {
      if (cat === "All") return "";
      // Prefer your chosen SEO slugs
      if (cat === "Action") return "shooting-games";
      if (cat === "Strategy") return "idle-games";
      const found = Object.entries(CATEGORY_ROUTES).find(([, v]) => v === cat);
      return found ? found[0] : "";
    }

    function pushRoute(path) {
      history.pushState({}, "", path);
      handleRoute();
    }

    function navigateToGame(game) {
      if (!game || !game.id) return;
      const slug = game.slug || slugify(game.title);
      // Use clean URLs on real hosts; fall back to ?game= for file:// local preview.
      if (window.location.protocol === "file:") {
        const url = new URL(window.location.href);
        url.pathname = url.pathname; // keep current file
        url.searchParams.set("game", game.id);
        window.location.href = url.toString();
        return;
      }

      // Use a real navigation for maximum compatibility and SEO.
      // SPA route handling still works on page load.
      window.location.href = `/games/${slug}`;
    }

    function showHomePage() {
      homePage.style.display = "";
      gameDetailPage.style.display = "none";
    }

    function renderSimilarGames(game) {
      if (!detailSimilarList) return;
      detailSimilarList.innerHTML = "";
      if (!allGames.length) return;

      const sameCategory = allGames.filter(
        (g) => g.id !== game.id && g.category === game.category
      );
      const pool = sameCategory.length ? sameCategory : allGames.filter((g) => g.id !== game.id);

      pool.slice(0, 6).forEach((sim) => {
        const card = el("article", "detail-similar-card");
        card.setAttribute("data-game-id", sim.id);

        const img = createThumbPicture("detail-similar-thumb", resolveThumbSrc(sim.thumbnail), sim.title + " thumbnail", {
          loading: "lazy"
        });
        card.appendChild(img);

        const caption = el("div", "detail-similar-caption", {
          text: truncate(sim.title, 24)
        });
        card.appendChild(caption);

        card.addEventListener("click", () => navigateToGame(sim));
        detailSimilarList.appendChild(card);
      });
    }

    function showGameDetail(game) {
      if (!gameDetailPage || !homePage) return;
      homePage.style.display = "none";
      gameDetailPage.style.display = "block";

      if (detailTitle) detailTitle.textContent = `Play ${game.title} Online Free`;
      if (detailMeta) {
        const cat = game.category || "Arcade";
        detailMeta.textContent = cat + " • HTML5 browser game on Pokopie";
      }
      if (detailDescription) {
        const genre = (game.category || "Arcade").toLowerCase();
        const core = game.coreGameplay || "play instantly and enjoy quick, satisfying levels";
        const similar = game.similarGameplay || "fast browser games and easy-to-learn challenges";
        // ~110-140 words
        detailDescription.textContent =
          game.introParagraph ||
          `${game.title} is a free online ${genre} game where you ${core}. This browser game requires no download and works on desktop and mobile. The controls are simple, the gameplay is smooth, and you can start playing in seconds. Whether you want a short break or a longer session, ${game.title} is easy to jump into on PC, mobile, and tablet. If you enjoy ${similar}, you will love this game.`;
      }

      if (detailExtra) {
        const cat = game.category || "Arcade";
        const name = game.title;
        const controls = game.controls || "keyboard, mouse, or touch";
        const mainAction = game.mainAction || "control your character and interact with the level";
        const objective = game.objective || "finish the objective of each stage";
        const obstacles = game.obstacles || "obstacles and tricky moments";
        const win = game.winCondition || "win by completing the goal and improving your score";

        const keys = game.keys || "Arrow Keys / WASD (varies by game)";
        const mouse = game.mouseActions || "Click / Drag as needed";

        const tip1 = game.tip1 || "Start slow and learn the mechanics";
        const tip2 = game.tip2 || "Focus on timing and consistent moves";
        const tip3 = game.tip3 || "Avoid rushing — most mistakes happen when you speed up";
        const tip4 = game.tip4 || "Practice to improve your score";

        const similarGames = (() => {
          const sameCategory = allGames.filter((g) => g.id !== game.id && g.category === game.category);
          const pool = sameCategory.length ? sameCategory : allGames.filter((g) => g.id !== game.id);
          return pool.slice(0, 3);
        })();

        detailExtra.innerHTML = "";

        // H2 How to play
        detailExtra.appendChild(el("h2", "", { text: `How to Play ${name}` }));
        detailExtra.appendChild(
          el("p", "", {
            text: `Use ${controls} to ${mainAction}. Your goal is to ${objective}. Avoid ${obstacles} and try to ${win}. The longer you play, the harder it becomes.`
          })
        );

        // H2 Controls
        detailExtra.appendChild(el("h2", "", { text: "Game Controls" }));
        const ulControls = el("ul", "detail-list");
        ulControls.appendChild(el("li", "", { text: `Keyboard: ${keys}` }));
        ulControls.appendChild(el("li", "", { text: `Mouse: ${mouse}` }));
        ulControls.appendChild(el("li", "", { text: "Mobile: Tap and swipe to control" }));
        detailExtra.appendChild(ulControls);

        // H2 Tips
        detailExtra.appendChild(el("h2", "", { text: "Tips and Tricks" }));
        const ulTips = el("ul", "detail-list");
        [tip1, tip2, tip3, tip4].forEach((t) => ulTips.appendChild(el("li", "", { text: t })));
        detailExtra.appendChild(ulTips);

        // H2 Features
        detailExtra.appendChild(el("h2", "", { text: "Features" }));
        const ulFeatures = el("ul", "detail-list");
        [
          "Free to play in browser",
          "No download required",
          "Supports mobile and desktop",
          "Fast loading and smooth gameplay"
        ].forEach((t) => ulFeatures.appendChild(el("li", "", { text: t })));
        detailExtra.appendChild(ulFeatures);

        // H2 Similar Games (internal links)
        detailExtra.appendChild(el("h2", "", { text: "Similar Games" }));
        const ulSimilar = el("ul", "detail-list");
        similarGames.forEach((g) => {
          const a = el("a", "detail-link", { href: `/games/${g.slug || slugify(g.title)}`, text: `Play ${g.title}` });
          const li = el("li", "");
          li.appendChild(a);
          ulSimilar.appendChild(li);
        });
        detailExtra.appendChild(ulSimilar);

        // H2 FAQ
        detailExtra.appendChild(el("h2", "", { text: "FAQ" }));
        detailExtra.appendChild(el("h3", "", { text: `Is ${name} free to play` }));
        detailExtra.appendChild(el("p", "", { text: "Yes, you can play it online for free without downloading." }));
        detailExtra.appendChild(el("h3", "", { text: `Can I play ${name} on mobile` }));
        detailExtra.appendChild(el("p", "", { text: "Yes, it works on most phones and tablets." }));
        detailExtra.appendChild(el("h3", "", { text: "Do I need to install anything" }));
        detailExtra.appendChild(el("p", "", { text: "No, it runs directly in your browser." }));
      }

      const rawUrl = game.playUrl || "https://www.freetogame.com/";
      if (detailIframe) {
        if (detailIframeLoading) detailIframeLoading.classList.remove("hidden");
        // 详情页里始终尝试加载 iframe，让你在本地和线上都能直接看到游戏或平台页面
        detailIframe.src = withGdReferrer(rawUrl);
      }

      if (detailBackHome) {
        detailBackHome.onclick = () => {
          pushRoute("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      }

      renderSimilarGames(game);
    }

    function truncate(text, max) {
      if (!text) return "";
      return text.length > max ? text.slice(0, max - 1) + "…" : text;
    }

    function getReferrerForEmbed() {
      // GameDistribution 官方要求：gd_sdk_referrer_url 必须是“实际游戏页面的完整 URL”。
      // 这里我们在正式环境下返回“当前页面的完整地址”：
      // - 如果 URL 里已经有 ?game=xxx，就直接使用当前地址；
      // - 否则在首页 / 上根据 currentModalGame.id 拼一个 ?game=xxx。
      // 在本地预览或出错时则回退到主站首页。
      try {
        const loc = window.location;
        const host = (loc.hostname || "").toLowerCase();
        if (host === "www.pokopie.com" || host === "pokopie.com") {
          const href = loc.protocol + "//" + loc.host + loc.pathname + loc.search;
          const params = new URLSearchParams(loc.search || "");
          const isGamePath = (loc.pathname || "").toLowerCase().startsWith("/games/");
          if (params.get("game") || isGamePath) {
            // 详情页场景：直接返回当前 URL（不带哈希）
            return href;
          }
          // 首页 + 弹窗场景：根据 currentModalGame 拼接一个 ?game=ID
          let base = loc.protocol + "//" + loc.host + "/";
          if (currentModalGame && currentModalGame.id) {
            // Prefer clean game URL for referrer
            const slug = currentModalGame.slug || slugify(currentModalGame.title);
            base += "games/" + encodeURIComponent(slug);
          }
          return base;
        }
      } catch {
        // ignore
      }
      return "https://www.pokopie.com/";
    }

    function withGdReferrer(url) {
      // Fix "Not found at origin!" for many GameDistribution embeds:
      // ensure gd_sdk_referrer_url matches current page URL.
      if (!url || typeof url !== "string") return url;
      if (!url.includes("html5.gamedistribution.com")) return url;

      const ref = encodeURIComponent(getReferrerForEmbed());
      if (url.includes("gd_sdk_referrer_url=")) {
        return url.replace(/gd_sdk_referrer_url=[^&]*/i, "gd_sdk_referrer_url=" + ref);
      }
      return url + (url.includes("?") ? "&" : "?") + "gd_sdk_referrer_url=" + ref;
    }

    function isLocalPreview() {
      try {
        return window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      } catch {
        return true;
      }
    }

    function isAllowedEmbedHost() {
      // GameDistribution often requires domain whitelisting.
      // Allow embeds only on the real production hosts.
      try {
        const host = (window.location.hostname || "").toLowerCase();
        return host === "www.pokopie.com" || host === "pokopie.com";
      } catch {
        return false;
      }
    }

    function isEmbeddableUrl(rawUrl) {
      // Many providers block iframe embedding via X-Frame-Options / CSP.
      // 仅在“非常确定可以 iframe”时返回 true，其余情况统一用新标签页。
      if (!rawUrl || typeof rawUrl !== "string") return false;
      try {
        const u = new URL(rawUrl, window.location.href);
        const host = (u.hostname || "").toLowerCase();

        // FreeToGame 官网页面禁止 iframe。
        if (host === "www.freetogame.com" || host === "freetogame.com") return false;

        // GameDistribution：只在正式域名（已加入白名单）上尝试 iframe，其余环境一律视为不可 iframe。
        if (host === "html5.gamedistribution.com") {
          return isAllowedEmbedHost();
        }

        // 其他站点默认允许（目前主要是本地自带游戏等）。
        return true;
      } catch {
        return false;
      }
    }

    function stopInternalGame() {
      if (internalLoopHandle) cancelAnimationFrame(internalLoopHandle);
      internalLoopHandle = 0;
      if (typeof internalCleanup === "function") internalCleanup();
      internalCleanup = null;
      internalWrapper.classList.remove("visible");
      internalScore.textContent = "Score: 0";
    }

    function startInternalGame(game) {
      stopInternalGame();

      internalWrapper.classList.add("visible");
      internalTitle.textContent = game.title;

      const ctx = internalCanvas.getContext("2d");
      const W = internalCanvas.width;
      const H = internalCanvas.height;

      const themeA = (game.theme && game.theme.a) || "#facc15";
      const themeB = (game.theme && game.theme.b) || "#fb923c";
      const type = game.internalType || "arena-dodge";
      const seed0 = (game.seed || 1) >>> 0;

      // Small deterministic RNG (LCG)
      let rng = seed0;
      function rand() {
        rng = (1664525 * rng + 1013904223) >>> 0;
        return rng / 4294967296;
      }

      const helpSpan = internalHelp.querySelector("span");
      const disposers = [];
      const on = (target, evt, fn, opts) => {
        target.addEventListener(evt, fn, opts);
        disposers.push(() => target.removeEventListener(evt, fn, opts));
      };
      const setCleanup = () => {
        internalCleanup = () => disposers.splice(0).forEach((d) => d());
      };
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
      const pointerToCanvas = (evt) => {
        const rect = internalCanvas.getBoundingClientRect();
        const x = ((evt.clientX - rect.left) / rect.width) * W;
        const y = ((evt.clientY - rect.top) / rect.height) * H;
        return { x: clamp(x, 0, W), y: clamp(y, 0, H) };
      };

      function drawBackground() {
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, "rgba(2,6,23,1)");
        g.addColorStop(0.35, themeB + "33");
        g.addColorStop(1, themeA + "22");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ----------------------------
      // Puzzle: 2048
      // ----------------------------
      if (type === "2048") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Arrow keys / WASD • Swipe on mobile";
        let score = 0;
        internalScore.textContent = "Score: 0";

        const N = 4;
        const grid = Array.from({ length: N }, () => Array(N).fill(0));
        const colors = {
          0: "rgba(15,23,42,0.55)",
          2: "#fef3c7", 4: "#fde68a", 8: "#fdba74", 16: "#fb923c",
          32: "#f97316", 64: "#ef4444", 128: "#a78bfa", 256: "#60a5fa",
          512: "#34d399", 1024: "#22c55e", 2048: "#facc15"
        };

        function empties() {
          const out = [];
          for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!grid[r][c]) out.push([r, c]);
          return out;
        }

        function spawn() {
          const e = empties();
          if (!e.length) return;
          const [r, c] = e[Math.floor(rand() * e.length)];
          grid[r][c] = rand() < 0.9 ? 2 : 4;
        }

        function compressLine(line) {
          const arr = line.filter((v) => v !== 0);
          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] && arr[i] === arr[i + 1]) {
              arr[i] *= 2;
              score += arr[i];
              arr[i + 1] = 0;
              i++;
            }
          }
          const out = arr.filter((v) => v !== 0);
          while (out.length < N) out.push(0);
          return out;
        }

        function move(dir) {
          const before = grid.map((r) => r.slice());
          if (dir === "left") {
            for (let r = 0; r < N; r++) grid[r] = compressLine(grid[r]);
          } else if (dir === "right") {
            for (let r = 0; r < N; r++) grid[r] = compressLine(grid[r].slice().reverse()).reverse();
          } else if (dir === "up") {
            for (let c = 0; c < N; c++) {
              const col = [];
              for (let r = 0; r < N; r++) col.push(grid[r][c]);
              const newCol = compressLine(col);
              for (let r = 0; r < N; r++) grid[r][c] = newCol[r];
            }
          } else if (dir === "down") {
            for (let c = 0; c < N; c++) {
              const col = [];
              for (let r = 0; r < N; r++) col.push(grid[r][c]);
              const newCol = compressLine(col.slice().reverse()).reverse();
              for (let r = 0; r < N; r++) grid[r][c] = newCol[r];
            }
          }

          const changed = before.some((r, i) => r.some((v, j) => v !== grid[i][j]));
          if (changed) spawn();
          internalScore.textContent = "Score: " + score;
          render();
        }

        function render() {
          drawBackground();
          const pad = 32;
          const size = Math.min(W, H) - pad * 2;
          const cell = size / N;
          const x0 = (W - size) / 2;
          const y0 = (H - size) / 2;

          ctx.fillStyle = "rgba(15,23,42,0.55)";
          ctx.fillRect(x0 - 10, y0 - 10, size + 20, size + 20);

          for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
              const v = grid[r][c];
              const x = x0 + c * cell + 8;
              const y = y0 + r * cell + 8;
              const w = cell - 16;
              const h = cell - 16;
              ctx.fillStyle = colors[v] || themeA;
              roundRect(ctx, x, y, w, h, 14);
              ctx.fill();
              if (v) {
                ctx.fillStyle = "rgba(15,23,42,0.9)";
                ctx.font = (v >= 1024 ? "800 28px" : "800 34px") + " Poppins, sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(String(v), x + w / 2, y + h / 2);
              }
            }
          }
        }

        function roundRect(c, x, y, w, h, r) {
          c.beginPath();
          c.moveTo(x + r, y);
          c.arcTo(x + w, y, x + w, y + h, r);
          c.arcTo(x + w, y + h, x, y + h, r);
          c.arcTo(x, y + h, x, y, r);
          c.arcTo(x, y, x + w, y, r);
          c.closePath();
        }

        function restart() {
          for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) grid[r][c] = 0;
          score = 0;
          spawn(); spawn();
          internalScore.textContent = "Score: 0";
          render();
        }

        const keyHandler = (e) => {
          const k = (e.key || "").toLowerCase();
          if (["arrowleft", "a"].includes(k)) move("left");
          if (["arrowright", "d"].includes(k)) move("right");
          if (["arrowup", "w"].includes(k)) move("up");
          if (["arrowdown", "s"].includes(k)) move("down");
        };

        let swipeStart = null;
        const pd = (e) => { swipeStart = pointerToCanvas(e); };
        const pu = (e) => {
          if (!swipeStart) return;
          const p = pointerToCanvas(e);
          const dx = p.x - swipeStart.x;
          const dy = p.y - swipeStart.y;
          swipeStart = null;
          if (Math.hypot(dx, dy) < 24) return;
          if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
          else move(dy > 0 ? "down" : "up");
        };

        internalRestart.onclick = restart;
        on(window, "keydown", keyHandler);
        on(internalCanvas, "pointerdown", pd);
        on(internalCanvas, "pointerup", pu);
        setCleanup();
        restart();
        return;
      }

      // ----------------------------
      // Puzzle: Memory Match
      // ----------------------------
      if (type === "memory") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Tap / click to flip cards";
        let moves = 0;
        internalScore.textContent = "Moves: 0";

        const rows = 4, cols = 4;
        const total = rows * cols;
        const icons = ["🥧","🍒","🍋","🍇","🍓","🍉","🍪","🍭"];
        const deck = [];
        for (let i = 0; i < total / 2; i++) deck.push(icons[i], icons[i]);
        // shuffle
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        const state = Array(total).fill(0); // 0 hidden, 1 shown, 2 matched
        let first = -1;
        let lock = false;

        function cellAt(x, y) {
          const pad = 42;
          const size = Math.min(W, H) - pad * 2;
          const cw = size / cols;
          const ch = size / rows;
          const x0 = (W - size) / 2;
          const y0 = (H - size) / 2;
          const c = Math.floor((x - x0) / cw);
          const r = Math.floor((y - y0) / ch);
          if (r < 0 || r >= rows || c < 0 || c >= cols) return -1;
          return r * cols + c;
        }

        function render() {
          drawBackground();
          const pad = 42;
          const size = Math.min(W, H) - pad * 2;
          const cw = size / cols;
          const ch = size / rows;
          const x0 = (W - size) / 2;
          const y0 = (H - size) / 2;

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          for (let i = 0; i < total; i++) {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const x = x0 + c * cw + 10;
            const y = y0 + r * ch + 10;
            const w = cw - 20;
            const h = ch - 20;
            ctx.fillStyle = state[i] === 2 ? "rgba(34,197,94,0.65)" : "rgba(15,23,42,0.7)";
            roundRect(ctx, x, y, w, h, 16);
            ctx.fill();
            ctx.strokeStyle = "rgba(148,163,184,0.45)";
            ctx.lineWidth = 2;
            ctx.stroke();

            if (state[i] !== 0) {
              ctx.font = "800 42px Poppins, sans-serif";
              ctx.fillStyle = "rgba(248,250,252,0.95)";
              ctx.fillText(deck[i], x + w / 2, y + h / 2);
            } else {
              ctx.font = "700 18px Poppins, sans-serif";
              ctx.fillStyle = "rgba(148,163,184,0.85)";
              ctx.fillText("POKOPIE", x + w / 2, y + h / 2);
            }
          }
        }

        function roundRect(c, x, y, w, h, r) {
          c.beginPath();
          c.moveTo(x + r, y);
          c.arcTo(x + w, y, x + w, y + h, r);
          c.arcTo(x + w, y + h, x, y + h, r);
          c.arcTo(x, y + h, x, y, r);
          c.arcTo(x, y, x + w, y, r);
          c.closePath();
        }

        function restart() {
          for (let i = 0; i < total; i++) state[i] = 0;
          moves = 0; first = -1; lock = false;
          internalScore.textContent = "Moves: 0";
          render();
        }

        function flip(i) {
          if (lock || i < 0 || state[i] !== 0) return;
          state[i] = 1;
          if (first === -1) {
            first = i;
            render();
            return;
          }
          moves++;
          internalScore.textContent = "Moves: " + moves;
          const a = first, b = i;
          first = -1;
          render();
          if (deck[a] === deck[b]) {
            state[a] = 2; state[b] = 2;
            render();
          } else {
            lock = true;
            setTimeout(() => {
              state[a] = 0; state[b] = 0;
              lock = false;
              render();
            }, 650);
          }
        }

        const click = (e) => {
          const p = pointerToCanvas(e);
          flip(cellAt(p.x, p.y));
        };

        internalRestart.onclick = restart;
        on(internalCanvas, "pointerup", click);
        setCleanup();
        restart();
        return;
      }

      // ----------------------------
      // Puzzle: Minesweeper Lite
      // ----------------------------
      if (type === "mines") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Click to reveal • Shift+Click to flag";
        const cols = 12, rows = 8;
        const minesCount = 14;
        let revealed = 0;
        internalScore.textContent = "Safe: 0";

        const cellSize = Math.floor(Math.min(W / cols, H / rows) * 0.86);
        const boardW = cellSize * cols;
        const boardH = cellSize * rows;
        const x0 = (W - boardW) / 2;
        const y0 = (H - boardH) / 2;

        let mines = new Set();
        let flags = new Set();
        let open = new Set();
        let dead = false;

        function idx(r, c) { return r * cols + c; }
        function rc(i) { return { r: Math.floor(i / cols), c: i % cols }; }

        function neighbors(r, c) {
          const out = [];
          for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
            if (!dr && !dc) continue;
            const rr = r + dr, cc = c + dc;
            if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) out.push(idx(rr, cc));
          }
          return out;
        }

        function countMines(r, c) {
          let n = 0;
          for (const ni of neighbors(r, c)) if (mines.has(ni)) n++;
          return n;
        }

        function cellFromPoint(x, y) {
          const c = Math.floor((x - x0) / cellSize);
          const r = Math.floor((y - y0) / cellSize);
          if (r < 0 || r >= rows || c < 0 || c >= cols) return -1;
          return idx(r, c);
        }

        function placeMines(avoidIndex) {
          mines = new Set();
          while (mines.size < minesCount) {
            const i = Math.floor(rand() * (rows * cols));
            if (i === avoidIndex) continue;
            mines.add(i);
          }
        }

        function flood(start) {
          const stack = [start];
          while (stack.length) {
            const cur = stack.pop();
            if (open.has(cur) || flags.has(cur)) continue;
            open.add(cur);
            revealed++;
            const { r, c } = rc(cur);
            if (countMines(r, c) === 0) {
              for (const ni of neighbors(r, c)) if (!open.has(ni)) stack.push(ni);
            }
          }
        }

        function render() {
          drawBackground();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "700 18px Poppins, sans-serif";

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const i = idx(r, c);
              const x = x0 + c * cellSize;
              const y = y0 + r * cellSize;
              const isOpen = open.has(i);
              ctx.fillStyle = isOpen ? "rgba(248,250,252,0.14)" : "rgba(15,23,42,0.78)";
              ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
              ctx.strokeStyle = "rgba(148,163,184,0.25)";
              ctx.strokeRect(x + 2, y + 2, cellSize - 4, cellSize - 4);

              if (flags.has(i) && !isOpen) {
                ctx.fillStyle = "#facc15";
                ctx.fillText("🚩", x + cellSize / 2, y + cellSize / 2);
              } else if (isOpen) {
                if (mines.has(i)) {
                  ctx.fillText("💣", x + cellSize / 2, y + cellSize / 2);
                } else {
                  const n = countMines(r, c);
                  if (n) {
                    ctx.fillStyle = "rgba(248,250,252,0.9)";
                    ctx.fillText(String(n), x + cellSize / 2, y + cellSize / 2);
                  }
                }
              }
            }
          }

          if (dead) {
            ctx.fillStyle = "rgba(2,6,23,0.68)";
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = "rgba(248,250,252,0.95)";
            ctx.font = "800 40px Fredoka One, sans-serif";
            ctx.fillText("Boom!", W * 0.5, H * 0.46);
            ctx.font = "600 16px Poppins, sans-serif";
            ctx.fillStyle = "rgba(226,232,240,0.92)";
            ctx.fillText("Press Restart to try again", W * 0.5, H * 0.54);
          }
        }

        let firstClick = true;
        function reveal(i) {
          if (dead || i < 0) return;
          if (flags.has(i)) return;
          if (firstClick) {
            placeMines(i);
            firstClick = false;
          }
          if (mines.has(i)) {
            dead = true;
            open.add(i);
            render();
            return;
          }
          const { r, c } = rc(i);
          flood(i);
          internalScore.textContent = "Safe: " + revealed;
          render();
        }

        function toggleFlag(i) {
          if (dead || i < 0) return;
          if (open.has(i)) return;
          if (flags.has(i)) flags.delete(i);
          else flags.add(i);
          render();
        }

        function restart() {
          firstClick = true;
          dead = false;
          revealed = 0;
          flags = new Set();
          open = new Set();
          mines = new Set();
          internalScore.textContent = "Safe: 0";
          render();
        }

        const click = (e) => {
          const p = pointerToCanvas(e);
          const i = cellFromPoint(p.x, p.y);
          if (e.shiftKey) toggleFlag(i);
          else reveal(i);
        };

        internalRestart.onclick = restart;
        on(internalCanvas, "pointerup", click);
        setCleanup();
        restart();
        return;
      }

      // ----------------------------
      // Arcade: Snake
      // ----------------------------
      if (type === "snake") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Arrow keys / WASD • Swipe on mobile";
        const cols = 30, rows = 18;
        const cell = Math.floor(Math.min(W / cols, H / rows));
        const x0 = Math.floor((W - cols * cell) / 2);
        const y0 = Math.floor((H - rows * cell) / 2);

        let dir = { x: 1, y: 0 };
        let nextDir = { x: 1, y: 0 };
        let snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
        let food = { x: 15, y: 9 };
        let dead = false;
        let score = 0;
        internalScore.textContent = "Score: 0";

        function placeFood() {
          while (true) {
            const fx = Math.floor(rand() * cols);
            const fy = Math.floor(rand() * rows);
            if (!snake.some((s) => s.x === fx && s.y === fy)) {
              food = { x: fx, y: fy };
              return;
            }
          }
        }

        function step() {
          if (dead) return;
          dir = nextDir;
          const head = snake[0];
          const nx = head.x + dir.x;
          const ny = head.y + dir.y;
          if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) { dead = true; return; }
          if (snake.some((s) => s.x === nx && s.y === ny)) { dead = true; return; }
          snake.unshift({ x: nx, y: ny });
          if (nx === food.x && ny === food.y) {
            score += 10;
            internalScore.textContent = "Score: " + score;
            placeFood();
          } else {
            snake.pop();
          }
        }

        function render() {
          drawBackground();
          ctx.globalAlpha = 0.12;
          ctx.fillStyle = "#e2e8f0";
          for (let x = 0; x <= cols; x++) ctx.fillRect(x0 + x * cell, y0, 1, rows * cell);
          for (let y = 0; y <= rows; y++) ctx.fillRect(x0, y0 + y * cell, cols * cell, 1);
          ctx.globalAlpha = 1;

          // food
          ctx.fillStyle = themeA;
          ctx.fillRect(x0 + food.x * cell + 2, y0 + food.y * cell + 2, cell - 4, cell - 4);
          // snake
          for (let i = 0; i < snake.length; i++) {
            const s = snake[i];
            ctx.fillStyle = i === 0 ? "rgba(34,197,94,0.95)" : "rgba(34,197,94,0.65)";
            ctx.fillRect(x0 + s.x * cell + 2, y0 + s.y * cell + 2, cell - 4, cell - 4);
          }

          if (dead) {
            ctx.fillStyle = "rgba(2,6,23,0.68)";
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = "rgba(248,250,252,0.95)";
            ctx.font = "800 40px Fredoka One, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Game Over", W * 0.5, H * 0.46);
            ctx.font = "600 16px Poppins, sans-serif";
            ctx.fillStyle = "rgba(226,232,240,0.92)";
            ctx.fillText("Press Restart to try again", W * 0.5, H * 0.54);
          }
        }

        function setDir(dx, dy) {
          if (dead) return;
          // prevent 180 turn
          if (dx === -dir.x && dy === -dir.y) return;
          nextDir = { x: dx, y: dy };
        }

        const key = (e) => {
          const k = (e.key || "").toLowerCase();
          if (k === "arrowleft" || k === "a") setDir(-1, 0);
          if (k === "arrowright" || k === "d") setDir(1, 0);
          if (k === "arrowup" || k === "w") setDir(0, -1);
          if (k === "arrowdown" || k === "s") setDir(0, 1);
        };

        let swipeStart = null;
        const pd = (e) => { swipeStart = pointerToCanvas(e); };
        const pu = (e) => {
          if (!swipeStart) return;
          const p = pointerToCanvas(e);
          const dx = p.x - swipeStart.x;
          const dy = p.y - swipeStart.y;
          swipeStart = null;
          if (Math.hypot(dx, dy) < 18) return;
          if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 1 : -1, 0);
          else setDir(0, dy > 0 ? 1 : -1);
        };

        function restart() {
          dir = { x: 1, y: 0 };
          nextDir = { x: 1, y: 0 };
          snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
          dead = false;
          score = 0;
          internalScore.textContent = "Score: 0";
          placeFood();
        }

        internalRestart.onclick = restart;
        on(window, "keydown", key);
        on(internalCanvas, "pointerdown", pd);
        on(internalCanvas, "pointerup", pu);
        setCleanup();

        restart();
        let acc = 0;
        let last = performance.now();
        const loop = (now) => {
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;
          acc += dt;
          const stepTime = 0.12;
          while (acc >= stepTime) { step(); acc -= stepTime; }
          render();
          internalLoopHandle = requestAnimationFrame(loop);
        };
        internalLoopHandle = requestAnimationFrame(loop);
        return;
      }

      // ----------------------------
      // Arcade: Brick Breaker
      // ----------------------------
      if (type === "brick-breaker") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Move pointer/finger to control paddle";
        let score = 0;
        internalScore.textContent = "Score: 0";

        const paddle = { w: 140, h: 14, x: W * 0.5, y: H - 60 };
        const ball = { x: W * 0.5, y: H - 90, r: 9, vx: 260, vy: -300 };
        const bricks = [];
        const cols = 10, rows = 5;
        const gap = 10;
        const bw = (W - 2 * 46 - (cols - 1) * gap) / cols;
        const bh = 24;
        const bx0 = 46;
        const by0 = 70;

        function resetBricks() {
          bricks.length = 0;
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              bricks.push({
                x: bx0 + c * (bw + gap),
                y: by0 + r * (bh + gap),
                w: bw, h: bh,
                alive: true,
                color: r % 2 ? themeA : themeB
              });
            }
          }
        }

        function restart() {
          score = 0;
          internalScore.textContent = "Score: 0";
          paddle.x = W * 0.5;
          ball.x = W * 0.5;
          ball.y = H - 90;
          ball.vx = 240 + rand() * 80;
          ball.vy = -320;
          resetBricks();
        }

        function draw() {
          drawBackground();

          // bricks
          for (const b of bricks) {
            if (!b.alive) continue;
            ctx.fillStyle = b.color + "cc";
            ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.strokeStyle = "rgba(248,250,252,0.25)";
            ctx.strokeRect(b.x, b.y, b.w, b.h);
          }

          // paddle
          ctx.fillStyle = "rgba(248,250,252,0.9)";
          ctx.fillRect(paddle.x - paddle.w / 2, paddle.y, paddle.w, paddle.h);
          ctx.fillStyle = "rgba(15,23,42,0.75)";
          ctx.fillRect(paddle.x - paddle.w / 2 + 6, paddle.y + 3, paddle.w - 12, paddle.h - 6);

          // ball
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
          ctx.fillStyle = themeA;
          ctx.fill();
          ctx.strokeStyle = "rgba(248,250,252,0.4)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        function update(dt) {
          ball.x += ball.vx * dt;
          ball.y += ball.vy * dt;

          // walls
          if (ball.x < ball.r) { ball.x = ball.r; ball.vx *= -1; }
          if (ball.x > W - ball.r) { ball.x = W - ball.r; ball.vx *= -1; }
          if (ball.y < ball.r) { ball.y = ball.r; ball.vy *= -1; }

          // paddle collision
          const px0 = paddle.x - paddle.w / 2;
          const px1 = paddle.x + paddle.w / 2;
          if (ball.y + ball.r >= paddle.y && ball.y + ball.r <= paddle.y + paddle.h + 8 && ball.x >= px0 && ball.x <= px1 && ball.vy > 0) {
            ball.vy *= -1;
            const t = (ball.x - paddle.x) / (paddle.w / 2);
            ball.vx = clamp(ball.vx + t * 220, -520, 520);
            ball.y = paddle.y - ball.r - 1;
          }

          // bricks collision (simple)
          for (const b of bricks) {
            if (!b.alive) continue;
            if (ball.x + ball.r < b.x || ball.x - ball.r > b.x + b.w || ball.y + ball.r < b.y || ball.y - ball.r > b.y + b.h) continue;
            b.alive = false;
            score += 5;
            internalScore.textContent = "Score: " + score;
            // reflect based on penetration
            const cx = clamp(ball.x, b.x, b.x + b.w);
            const cy = clamp(ball.y, b.y, b.y + b.h);
            const dx = ball.x - cx;
            const dy = ball.y - cy;
            if (Math.abs(dx) > Math.abs(dy)) ball.vx *= -1;
            else ball.vy *= -1;
            break;
          }

          // lose
          if (ball.y - ball.r > H + 40) {
            restart();
          }

          // win
          if (bricks.every((b) => !b.alive)) {
            restart();
          }
        }

        const movePaddle = (x) => {
          paddle.x = clamp(x, paddle.w / 2, W - paddle.w / 2);
        };

        const mouse = (e) => movePaddle(pointerToCanvas(e).x);
        const touch = (e) => movePaddle(pointerToCanvas(e).x);

        internalRestart.onclick = restart;
        on(window, "pointermove", touch, { passive: true });
        on(internalCanvas, "pointerdown", mouse);
        setCleanup();
        restart();

        let last = performance.now();
        const loop = (now) => {
          const dt = Math.min(0.033, (now - last) / 1000);
          last = now;
          update(dt);
          draw();
          internalLoopHandle = requestAnimationFrame(loop);
        };
        internalLoopHandle = requestAnimationFrame(loop);
        return;
      }

      // If not one of the distinct games above, fall through to arena engine below.
      // Map new ids to old arena variants.
      const arenaType =
        type === "arena-runner" ? "runner" :
        "dodge";

      const input = { left: false, right: false, up: false, down: false, dragging: false, dx: 0, dy: 0 };
      const player = { x: W * 0.5, y: H * 0.7, r: 14, vx: 0, vy: 0 };
      let score = 0;
      let alive = true;
      let t = 0;

      const difficulty = 1 + ((seed0 % 7) / 7);
      const enemies = [];
      const pickups = [];

      const enemyCount = Math.floor(5 + difficulty * 4);
      const pickupCount = 6;

      function resetEntities() {
        enemies.length = 0;
        pickups.length = 0;
        for (let i = 0; i < enemyCount; i++) {
          enemies.push({
            x: rand() * W,
            y: rand() * H * 0.5,
            r: 10 + rand() * 10,
            vx: (rand() * 2 - 1) * (1.2 + difficulty),
            vy: (rand() * 2 - 1) * (1.0 + difficulty * 0.6)
          });
        }
        for (let i = 0; i < pickupCount; i++) {
          pickups.push({
            x: 40 + rand() * (W - 80),
            y: 60 + rand() * (H - 140),
            r: 9 + rand() * 5
          });
        }
      }

      resetEntities();

      function dist2(ax, ay, bx, by) { const dx = ax - bx; const dy = ay - by; return dx * dx + dy * dy; }

      function drawCircle(x, y, r, fill, stroke) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
      }

      function update(dt) {
        t += dt;
        const speed = 380;

        let ax = 0, ay = 0;
        if (input.left) ax -= 1;
        if (input.right) ax += 1;
        if (input.up) ay -= 1;
        if (input.down) ay += 1;
        if (input.dragging) {
          ax += input.dx * 2.2;
          ay += input.dy * 2.2;
        }

        const mag = Math.hypot(ax, ay) || 1;
        ax /= mag; ay /= mag;

        player.vx = ax * speed;
        player.vy = ay * speed;
        player.x = clamp(player.x + player.vx * dt, player.r, W - player.r);
        player.y = clamp(player.y + player.vy * dt, player.r, H - player.r);

        // Move enemies
        for (const e of enemies) {
          // Type variations
          if (arenaType === "orbit") {
            const cx = W * 0.5, cy = H * 0.45;
            const ang = (seed0 % 100) * 0.01 + t * (0.7 + difficulty * 0.25);
            const rr = 80 + (seed0 % 5) * 22 + (enemies.indexOf(e) % 5) * 18;
            e.x = cx + Math.cos(ang + enemies.indexOf(e)) * rr;
            e.y = cy + Math.sin(ang + enemies.indexOf(e) * 0.8) * rr;
          } else if (arenaType === "runner") {
            e.x += (2.6 + difficulty) * 90 * dt;
            if (e.x - e.r > W + 10) { e.x = -10; e.y = 60 + rand() * (H - 120); }
          } else if (arenaType === "maze") {
            e.x += e.vx * 60 * dt;
            e.y += e.vy * 60 * dt;
            if (e.x < e.r || e.x > W - e.r) e.vx *= -1;
            if (e.y < e.r || e.y > H - e.r) e.vy *= -1;
          } else {
            e.x += e.vx * 60 * dt;
            e.y += e.vy * 60 * dt;
            if (e.x < e.r || e.x > W - e.r) e.vx *= -1;
            if (e.y < e.r || e.y > H - e.r) e.vy *= -1;
          }

          // Collision with player
          if (dist2(player.x, player.y, e.x, e.y) < (player.r + e.r) ** 2) {
            alive = false;
          }
        }

        // Pickups
        for (const p of pickups) {
          if (dist2(player.x, player.y, p.x, p.y) < (player.r + p.r) ** 2) {
            score += 10;
            p.x = 40 + rand() * (W - 80);
            p.y = 60 + rand() * (H - 140);
          }
        }

        // Survival score
        score += dt * (arenaType === "target" ? 8 : 4);
        internalScore.textContent = "Score: " + Math.floor(score);
      }

      function draw() {
        drawBackground();

        // Pickups
        for (const p of pickups) {
          drawCircle(p.x, p.y, p.r, themeA, "rgba(248,250,252,0.35)");
          ctx.globalAlpha = 0.8;
          drawCircle(p.x, p.y, Math.max(2, p.r * 0.4), themeB, null);
          ctx.globalAlpha = 1;
        }

        // Enemies
        for (const e of enemies) {
          drawCircle(e.x, e.y, e.r, "rgba(239,68,68,0.75)", "rgba(248,250,252,0.35)");
        }

        // Player
        drawCircle(player.x, player.y, player.r, "rgba(34,197,94,0.9)", "rgba(248,250,252,0.5)");
        ctx.fillStyle = "rgba(15,23,42,0.85)";
        ctx.font = "700 12px Poppins, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("YOU", player.x, player.y + 4);

        if (!alive) {
          ctx.fillStyle = "rgba(2,6,23,0.72)";
          ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = "rgba(248,250,252,0.95)";
          ctx.font = "700 40px Fredoka One, sans-serif";
          ctx.fillText("Game Over", W * 0.5, H * 0.46);
          ctx.font = "600 16px Poppins, sans-serif";
          ctx.fillStyle = "rgba(226,232,240,0.92)";
          ctx.fillText("Press Restart to try again", W * 0.5, H * 0.54);
        }
      }

      let last = performance.now();
      function loop(now) {
        const dt = Math.min(0.033, (now - last) / 1000);
        last = now;
        if (alive) update(dt);
        draw();
        internalLoopHandle = requestAnimationFrame(loop);
      }

      function onKey(e, down) {
        const k = (e.key || "").toLowerCase();
        if (k === "arrowleft" || k === "a") input.left = down;
        if (k === "arrowright" || k === "d") input.right = down;
        if (k === "arrowup" || k === "w") input.up = down;
        if (k === "arrowdown" || k === "s") input.down = down;
      }

      function pointerPos(evt) {
        const rect = internalCanvas.getBoundingClientRect();
        const x = (evt.clientX - rect.left) / rect.width;
        const y = (evt.clientY - rect.top) / rect.height;
        return { x, y };
      }

      let lastPtr = null;
      function onPointerDown(evt) {
        input.dragging = true;
        lastPtr = pointerPos(evt);
      }
      function onPointerMove(evt) {
        if (!input.dragging) return;
        const p = pointerPos(evt);
        if (!lastPtr) lastPtr = p;
        input.dx = clamp((p.x - lastPtr.x) * 3.2, -1, 1);
        input.dy = clamp((p.y - lastPtr.y) * 3.2, -1, 1);
        lastPtr = p;
      }
      function onPointerUp() {
        input.dragging = false;
        input.dx = 0; input.dy = 0;
        lastPtr = null;
      }

      function restart() {
        rng = seed0;
        score = 0;
        alive = true;
        player.x = W * 0.5;
        player.y = H * 0.7;
        resetEntities();
      }

      internalRestart.onclick = restart;

      const keydownHandler = (e) => onKey(e, true);
      const keyupHandler = (e) => onKey(e, false);
      const pointerDownHandler = (e) => onPointerDown(e);
      const pointerMoveHandler = (e) => onPointerMove(e);
      const pointerUpHandler = () => onPointerUp();

      window.addEventListener("keydown", keydownHandler);
      window.addEventListener("keyup", keyupHandler);
      internalCanvas.addEventListener("pointerdown", pointerDownHandler);
      window.addEventListener("pointermove", pointerMoveHandler, { passive: true });
      window.addEventListener("pointerup", pointerUpHandler, { passive: true });

      internalCleanup = () => {
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        internalCanvas.removeEventListener("pointerdown", pointerDownHandler);
        window.removeEventListener("pointermove", pointerMoveHandler);
        window.removeEventListener("pointerup", pointerUpHandler);
      };

      internalLoopHandle = requestAnimationFrame(loop);
    }

    function normalizeCategoryByTitle(title, fallbackCategory) {
      const t = (title || "").toLowerCase();
      const fallback = (fallbackCategory || "Arcade");

      if (/(2048|sudoku|mahjong|puzzle|logic|brain|merge|block|tile|match|connect)/.test(t)) {
        return "Puzzle";
      }
      if (/(race|racing|drift|highway|traffic|kart|rally|moto|bike|car)/.test(t)) {
        return "Racing";
      }
      if (/(soccer|football|basketball|tennis|golf|bowling|penalty|cricket|volley|ski|snowboard)/.test(t)) {
        return "Sports";
      }
      if (/(chess|kingdom|empire|tycoon|defense|tower|idle|strategy|tactics)/.test(t)) {
        return "Strategy";
      }
      if (/(zombie|war|battle|ninja|warrior|hero|fighter|shooter|gun|sniper|assault|arena|combat)/.test(t)) {
        return "Action";
      }
      if (/(runner|run|jump|flappy|bounce|clicker|tap|stack|ball|bubble|platform)/.test(t)) {
        return "Arcade";
      }
      return fallback;
    }

    async function loadGames() {
      // 不再调用 FreeToGame API，而是完全使用你提供的 iframe 游戏列表
      const usedSlugs = new Set();
      allGames = customIframeGames.map((g) => {
        const title = g.title || "Game";
        const cat = normalizeCategoryByTitle(title, g.category);
        let slug = g.slug || slugify(title);
        if (usedSlugs.has(slug)) {
          let i = 2;
          while (usedSlugs.has(`${slug}-${i}`)) i += 1;
          slug = `${slug}-${i}`;
        }
        usedSlugs.add(slug);
        return { ...g, title, category: cat, slug };
      });
      statusSource.textContent = "Custom iframe game list";
      statusTotal.textContent = allGames.length + " games available";
      renderAllSections();
    }

    function updateCategoryUI() {
      const navBtns = navCategories.querySelectorAll(".nav-pill");
      navBtns.forEach((b) => {
        const cat = b.getAttribute("data-category");
        if (cat === currentCategory || (currentCategory === "All" && cat === "All")) b.classList.add("active");
        else b.classList.remove("active");
      });

      statusFilter.textContent = currentCategory === "All" ? "All categories" : "Category: " + currentCategory;

      // 同步更新 All Games 区块标题，使其与当前菜单保持一致
      const allGamesHeading = document.getElementById("all-games-heading");
      if (allGamesHeading) {
        allGamesHeading.textContent = currentCategory === "All" ? "All Games" : currentCategory + " Games";
      }
    }

    function renderAllSections() {
      applyFilters();
      renderFeatured();
      renderPopular();
      renderNew();
    }

    function applyFilters() {
      const query = searchQuery.trim().toLowerCase();
      filteredGames = allGames.filter((g) => {
        const matchCategory =
          currentCategory === "All" ||
          (g.category && g.category.toLowerCase() === currentCategory.toLowerCase());
        const matchSearch =
          !query ||
          (g.title && g.title.toLowerCase().includes(query)) ||
          (g.description && g.description.toLowerCase().includes(query));
        return matchCategory && matchSearch;
      });

      if (currentSort === "az") filteredGames.sort((a, b) => a.title.localeCompare(b.title));
      else if (currentSort === "new") filteredGames.sort((a, b) => (b.recent === a.recent ? 0 : b.recent ? 1 : -1));
      else filteredGames.sort((a, b) => (b.popular === a.popular ? 0 : b.popular ? 1 : -1));

      statusTotal.textContent = filteredGames.length + " games found";
      renderMainGrid();
    }

    function createGameCard(game, compact) {
      const card = el("article", "game-card");
      card.setAttribute("data-game-id", game.id);

      const thumbWrap = el("div", "game-thumb-wrap");
      const img = createThumbPicture("game-thumb", resolveThumbSrc(game.thumbnail), game.title + " thumbnail", {
        loading: "lazy",
        decoding: "async",
        fetchpriority: "low"
      });
      thumbWrap.appendChild(img);

      const tag = el("div", "game-tag");
      const dot = el("span", "dot");
      const tagText = el("span", null, { text: game.category || "Arcade" });
      tag.appendChild(dot);
      tag.appendChild(tagText);
      thumbWrap.appendChild(tag);

      if (game.popular) thumbWrap.appendChild(el("div", "game-popularity", { text: "🔥 Popular" }));
      else if (game.recent) thumbWrap.appendChild(el("div", "game-popularity", { text: "⭐ New" }));

      const content = el("div", "game-content");
      const title = el("h3", "game-title", { text: game.title });
      title.title = game.title;

      const desc = el("p", "game-description", { text: truncate(game.description || "Instant browser mini game.", compact ? 70 : 90) });

      const metaRow = el("div", "game-meta-row");
      metaRow.appendChild(el("span", null, { text: (game.category || "Arcade") + " • HTML5" }));
      metaRow.appendChild(el("span", null, { text: "Play now" }));

      const btn = el("button", "play-button", { type: "button" });
      btn.appendChild(el("span", "icon", { text: "▶" }));
      btn.appendChild(el("span", null, { text: "Play Now" }));

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateToGame(game);
      });
      card.addEventListener("click", () => navigateToGame(game));

      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(metaRow);
      content.appendChild(btn);

      card.appendChild(thumbWrap);
      card.appendChild(content);
      return card;
    }

    function renderFeatured() {
      featuredGrid.innerHTML = "";
      const featured = allGames.slice(0, 8);
      featured.forEach((game, idx) => {
        const card = el("article", "featured-card", { "data-game-id": game.id });
        const img = createThumbPicture("featured-thumb", resolveThumbSrc(game.thumbnail), game.title + " thumbnail", {
          loading: idx === 0 ? "eager" : "lazy",
          decoding: "async",
          fetchpriority: idx === 0 ? "high" : "low"
        });
        card.appendChild(img);
        const overlay = el("div", "featured-overlay");
        overlay.appendChild(el("div", "featured-title", { text: truncate(game.title, 22) }));
        const meta = el("div", "featured-meta");
        meta.appendChild(el("span", "tag", { text: game.category || "Arcade" }));
        meta.appendChild(el("span", "play", { text: "▶ Play" }));
        overlay.appendChild(meta);
        card.appendChild(overlay);
        card.addEventListener("click", () => navigateToGame(game));
        featuredGrid.appendChild(card);
      });
    }

    function renderPopular() {
      popularRow.innerHTML = "";
      const list = [...allGames].sort((a, b) => (b.popular === a.popular ? 0 : b.popular ? 1 : -1));
      list.slice(0, 14).forEach((g) => popularRow.appendChild(createGameCard(g, true)));
    }

    function renderNew() {
      newRow.innerHTML = "";
      const list = [...allGames].sort((a, b) => (b.recent === a.recent ? 0 : b.recent ? 1 : -1));
      list.slice(0, 14).forEach((g) => newRow.appendChild(createGameCard(g, true)));
    }

    function renderMainGrid() {
      mainGrid.innerHTML = "";
      if (!filteredGames.length) { emptyMessage.hidden = false; return; }
      emptyMessage.hidden = true;
      filteredGames.forEach((g) => mainGrid.appendChild(createGameCard(g, false)));
    }

    function openGameModal(game) {
      currentModalGame = game;

      // 对 GameDistribution 恢复“直接新标签打开”的模式，不再展示 iframe 弹窗。
      try {
        const raw = game.playUrl || "";
        const host = raw ? new URL(raw, window.location.href).hostname.toLowerCase() : "";
        if (host.includes("html5.gamedistribution.com")) {
          openGameInNewTab();
          return;
        }
      } catch {
        // URL 解析失败时按正常流程走
      }

      modalGameTitle.textContent = game.title;
      modalGameMeta.textContent = (game.category || "Arcade") + " • HTML5 browser game • Tap to play";
      if (modalDescription) {
        const cat = game.category || "Arcade";
        const desc = game.description || "Instant browser mini game.";
        modalDescription.innerHTML =
          "<strong>" + cat + "</strong> · " + desc;
      }
      embedNotice.classList.remove("visible");
      stopInternalGame();
      gameIframe.src = "";
      // 默认不使用 sandbox，先清空，后续按域名按需设置
      gameIframe.removeAttribute("sandbox");
      modalLoading.style.display = "flex";
      modalBackdrop.classList.add("visible");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Built-in fallback games: always playable, no iframe needed.
      if (game.playMode === "internal") {
        modalLoading.style.display = "none";
        gameIframe.src = "about:blank";
        startInternalGame(game);
        return;
      }

      setTimeout(() => {
        const rawUrl = game.playUrl || "https://www.freetogame.com/";
        // 如果不可 iframe（例如 FreeToGame 等），直接外部说明 + 新标签打开。
        if (!isEmbeddableUrl(rawUrl)) {
          modalLoading.style.display = "none";
          embedNotice.classList.add("visible");
          gameIframe.src = "about:blank";
          openGameInNewTab();
          return;
        }
        gameIframe.src = withGdReferrer(rawUrl);
      }, 80);

      // If running locally, many providers (notably GameDistribution) can block embeds.
      // Show a helpful fallback message if the iframe doesn't become usable quickly.
      if (embedWatchdog) clearTimeout(embedWatchdog);
      embedWatchdog = setTimeout(() => {
        const rawUrl = game.playUrl || "";
        if (!isEmbeddableUrl(rawUrl)) {
          embedNotice.classList.add("visible");
        }
      }, 900);
    }

    function closeGameModal() {
      modalBackdrop.classList.remove("visible");
      modalBackdrop.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      embedNotice.classList.remove("visible");
      stopInternalGame();
      gameIframe.src = "";
      isModalMaximized = false;
      const modal = document.querySelector(".modal");
      modal.style.maxWidth = "960px";
      modal.style.maxHeight = "90vh";
      modal.style.borderRadius = "26px";
    }

    function toggleModalMaximize() {
      const modal = document.querySelector(".modal");
      isModalMaximized = !isModalMaximized;
      if (isModalMaximized) {
        modal.style.maxWidth = "100%";
        modal.style.maxHeight = "100vh";
        modal.style.borderRadius = "0";
      } else {
        modal.style.maxWidth = "960px";
        modal.style.maxHeight = "90vh";
        modal.style.borderRadius = "26px";
      }
    }

    function openGameInNewTab() {
      if (!currentModalGame) return;
      if (currentModalGame.playMode === "internal") return;
      const rawUrl = currentModalGame.playUrl || "https://www.freetogame.com/";
      window.open(withGdReferrer(rawUrl), "_blank", "noopener");
    }

    function setSeoForHome() {
      clearGameSeoJsonLd();
      setSeoForPage({
        title: "Pokopie - 100+ Free Online Browser Games | Play Instantly No Download",
        description:
          "Play 100+ free HTML5 browser games online at Pokopie.com — puzzle, arcade, racing, strategy and more. Instant play on mobile or desktop, no download.",
        canonicalPath: "/"
      });
    }

    function setSeoForCategory(cat) {
      clearGameSeoJsonLd();
      const slug = routeKeyForCategory(cat) || Object.entries(CATEGORY_ROUTES).find(([, v]) => v === cat)?.[0] || "";
      const canonicalPath = slug ? `/${slug}/` : "/";
      const keyword =
        (slug || cat || "")
          .replace(/-games$/i, " games")
          .replace(/-/g, " ")
          .trim() || "games";
      const titleCat = cat === "All" ? "All Games" : cat;
      setSeoForPage({
        title: `${titleCat} | Free Online ${keyword} - No Download - Pokopie`,
        description: `Play ${keyword} online for free on Pokopie. Explore top ${keyword} and play instantly in your browser — no download, no signup. Works on mobile and desktop.`,
        canonicalPath
      });
    }

    function handleRoute() {
      try {
        const path = (window.location.pathname || "/").replace(/\/+$/, "") || "/";

        // Backward compatible: ?game=custom-id
        const params = new URLSearchParams(window.location.search || "");
        const legacyGameId = params.get("game");
        const q = (params.get("q") || "").trim();
        if (legacyGameId) {
          const g = allGames.find((x) => x.id === legacyGameId);
          if (g) {
            history.replaceState({}, "", `/games/${g.slug || slugify(g.title)}`);
            showGameDetail(g);
            setSeoForGame(g);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
        }

        // Game detail route: /games/:slug
        if (path.startsWith("/games/")) {
          const slug = decodeURIComponent(path.slice("/games/".length)).toLowerCase();
          const game = allGames.find((g) => (g.slug || "").toLowerCase() === slug);
          if (game) {
            showGameDetail(game);
            setSeoForGame(game);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
          // Not found -> home
          showHomePage();
          setSeoForHome();
          return;
        }

        // Category routes: /puzzle-games/ etc
        const key = path.replace(/^\/+/, "");
        if (CATEGORY_ROUTES[key]) {
          const cat = CATEGORY_ROUTES[key];
          showHomePage();
          currentCategory = cat;
          updateCategoryUI();
          applyFilters();
          renderCategoryLanding(cat);
          setSeoForCategory(cat);
          const mainSection = document.querySelector(".section[aria-labelledby='all-games-heading']");
          if (mainSection) mainSection.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        // Home
        showHomePage();
        renderCategoryLanding("All");
        if (q) {
          searchQuery = q;
          if (searchInput) searchInput.value = q;
          if (clearSearchBtn) clearSearchBtn.classList.toggle("visible", true);
          applyFilters();
        }
        if (currentCategory !== "All") {
          currentCategory = "All";
          updateCategoryUI();
          applyFilters();
        }
        setSeoForHome();
      } catch (_) {
        showHomePage();
        renderCategoryLanding("All");
        setSeoForHome();
      }
    }

    function setupEvents() {
      const logoLink = document.querySelector(".logo");
      if (logoLink) {
        logoLink.addEventListener("click", (e) => {
          // SPA navigation
          e.preventDefault();
          pushRoute("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }

      navCategories.addEventListener("click", (e) => {
        const btn = e.target.closest(".nav-pill");
        if (!btn) return;
        const cat = btn.getAttribute("data-category");
        if (!cat) return;
        currentCategory = cat;
        updateCategoryUI();
        applyFilters();

        const key = routeKeyForCategory(cat);
        if (!key) pushRoute("/");
        else pushRoute(`/${key}/`);
      });

      let searchTimeout = null;
      searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value || "";
        clearSearchBtn.classList.toggle("visible", !!searchQuery);
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => applyFilters(), 150);
      });

      clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.classList.remove("visible");
        applyFilters();
      });

      heroPlayBtn.addEventListener("click", () => {
        const list = filteredGames.length ? filteredGames : allGames;
        if (!list.length) return;
        navigateToGame(list[Math.floor(Math.random() * list.length)]);
      });

      modalClose.addEventListener("click", closeGameModal);
      modalFullscreen.addEventListener("click", toggleModalMaximize);
      modalOpenNew.addEventListener("click", openGameInNewTab);
      noticeOpenNew.addEventListener("click", openGameInNewTab);
      noticeTryAnother.addEventListener("click", () => {
        const list = filteredGames.length ? filteredGames : allGames;
        if (!list.length) return;
        navigateToGame(list[Math.floor(Math.random() * list.length)]);
      });
      modalBackdrop.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeGameModal(); });
      gameIframe.addEventListener("load", () => { modalLoading.style.display = "none"; });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalBackdrop.classList.contains("visible")) closeGameModal();
      });

      window.addEventListener("popstate", () => handleRoute());

      window.addEventListener("scroll", () => {
        if (window.scrollY > 350) backToTop.classList.add("visible");
        else backToTop.classList.remove("visible");
      });

      if (detailIframe && detailIframeLoading) {
        detailIframe.addEventListener("load", () => {
          detailIframeLoading.classList.add("hidden");
        });
      }

      backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

      const storedTheme = localStorage.getItem("pokopie-theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldUseDark = storedTheme === "dark" || (!storedTheme && prefersDark) || (!storedTheme && !prefersDark);

      if (shouldUseDark) {
        document.body.classList.add("dark-theme");
        darkModeToggle.classList.add("active");
        darkModeToggle.querySelector(".icon").textContent = "🌞";
        darkModeToggle.querySelector("span:last-child").textContent = "Light";
        if (!storedTheme) localStorage.setItem("pokopie-theme", "dark");
      }

      darkModeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");
        darkModeToggle.classList.toggle("active", isDark);
        if (isDark) {
          darkModeToggle.querySelector(".icon").textContent = "🌞";
          darkModeToggle.querySelector("span:last-child").textContent = "Light";
          localStorage.setItem("pokopie-theme", "dark");
        } else {
          darkModeToggle.querySelector(".icon").textContent = "🌙";
          darkModeToggle.querySelector("span:last-child").textContent = "Dark";
          localStorage.setItem("pokopie-theme", "light");
        }
      });

      // Service Worker disabled to avoid unexpected caching/redirect behavior.
    }

    document.addEventListener("DOMContentLoaded", async () => {
      setupEvents();
      await loadGames();
      handleRoute();
    });
