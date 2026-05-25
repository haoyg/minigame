const fs = require("fs");
const path = require("path");

const CATALOG_PATH = path.resolve(__dirname, "..", "games-catalog.json");

const updates = {
  "Magic Bottles": {
    introParagraph: "Magic Bottles is a color-sorting puzzle game built around planning several moves ahead. Move liquid between bottles, keep matching colors together, and clear each layout without trapping yourself.",
    controls: "Tap or click a bottle to select it, then choose another bottle to pour into.",
    keys: "Mouse click or tap; keyboard is not required.",
    mouseActions: "Click bottles in sequence to pour matching liquid.",
    mainAction: "sort colored liquid into matching bottles",
    objective: "complete each bottle with a single color",
    obstacles: "limited empty space and bottles that can only accept matching colors",
    winCondition: "separate every color cleanly before you run out of useful moves",
    tip1: "Keep at least one bottle empty for temporary moves.",
    tip2: "Do not bury a color under several unrelated layers unless you have a clear recovery move.",
    tip3: "Finish one color at a time instead of moving every bottle at once.",
    tip4: "If the board feels locked, undo mentally and look for the bottle with the fewest layers."
  },
  "Collosotraun": {
    introParagraph: "Collosotraun is a compact puzzle challenge focused on reading the board and choosing efficient moves. Each stage rewards patience, pattern recognition, and careful sequencing over fast clicking.",
    controls: "Use mouse clicks or touch input to select pieces and interact with the puzzle board.",
    keys: "Mouse or touch controls; no keyboard shortcuts required.",
    mouseActions: "Click to select, move, or confirm puzzle actions.",
    mainAction: "study each puzzle layout and choose the safest next move",
    objective: "solve the stage with clean, efficient decisions",
    obstacles: "misleading patterns, limited move options, and layouts that punish rushed choices",
    winCondition: "clear the puzzle objective without wasting critical moves",
    tip1: "Scan the full board before touching the first piece.",
    tip2: "Prioritize moves that open multiple future options.",
    tip3: "Avoid committing to a corner until you understand the center of the board.",
    tip4: "When stuck, compare similar shapes and look for the one detail that breaks the pattern."
  },
  "Stack Tower Pro": {
    introParagraph: "Stack Tower Pro is a timing puzzle where every placement affects the height and stability of your tower. Drop blocks carefully, keep the stack centered, and build as high as possible.",
    controls: "Click or tap to drop each block at the right moment.",
    keys: "Mouse click, tap, or Space if supported by the game.",
    mouseActions: "Click or tap when the moving block is aligned.",
    mainAction: "drop blocks onto the tower with precise timing",
    objective: "build the tallest stable tower you can",
    obstacles: "moving blocks, shrinking placement space, and timing pressure",
    winCondition: "keep stacking blocks without losing alignment",
    tip1: "Watch the rhythm for a few cycles before dropping.",
    tip2: "Aim for the center rather than chasing risky edge placements.",
    tip3: "Small errors compound quickly, so recover alignment early.",
    tip4: "Use short sessions to practice timing and improve consistency."
  },
  "Rich Choice Run": {
    introParagraph: "Rich Choice Run blends runner controls with quick decision-making. Guide your character through gates, collect the better options, and avoid choices that reduce your progress.",
    controls: "Swipe, drag, or use left and right controls to move between lanes.",
    keys: "Arrow Left / Arrow Right or A / D when keyboard controls are available.",
    mouseActions: "Drag left or right to steer through gates and pickups.",
    mainAction: "steer through the best gates and collect valuable items",
    objective: "finish the run with the strongest final score",
    obstacles: "bad gates, lane hazards, and choices that reduce your earnings",
    winCondition: "reach the finish with the best possible upgrades",
    tip1: "Look ahead at the next two gates before changing lanes.",
    tip2: "Avoid risky pickups if they force you into a worse gate.",
    tip3: "Smooth lane changes are safer than last-second swerves.",
    tip4: "Replay early sections to learn which routes give the best payoff."
  },
  "2048 Merge World": {
    introParagraph: "2048 Merge World is a number-merging puzzle inspired by classic 2048 gameplay. Combine matching tiles, protect your highest value tile, and keep the board open as values climb.",
    controls: "Swipe on mobile or use arrow keys to move all tiles in one direction.",
    keys: "Arrow Keys or WASD to slide tiles.",
    mouseActions: "Swipe or drag in the direction you want the board to move.",
    mainAction: "merge matching tiles into larger values",
    objective: "create the highest tile possible without filling the board",
    obstacles: "crowded spaces, misplaced high tiles, and merges that block future moves",
    winCondition: "keep merging tiles and avoid running out of legal moves",
    tip1: "Keep your highest tile in one corner.",
    tip2: "Build rows or columns toward that corner instead of moving randomly.",
    tip3: "Avoid moves that pull your largest tile into the middle.",
    tip4: "Create empty space before chasing a big merge."
  },
  "Cool SuperCars Stunts PvP": {
    introParagraph: "Cool SuperCars Stunts PvP is a stunt-driving game built around speed, control, and bold jumps. Handle powerful cars, launch from ramps, and keep control through sharp turns and arena challenges.",
    controls: "Use keyboard driving controls to steer, accelerate, brake, and reset when needed.",
    keys: "WASD or Arrow Keys to drive; Space for brake if supported.",
    mouseActions: "Use menu clicks to choose vehicles, modes, and restarts.",
    mainAction: "drive supercars through stunt tracks and PvP-style challenges",
    objective: "complete routes, land jumps, and outperform other drivers",
    obstacles: "tight turns, high-speed ramps, awkward landings, and rival cars",
    winCondition: "finish clean runs while keeping speed and control",
    tip1: "Brake before sharp ramps instead of correcting after launch.",
    tip2: "Land with the car as straight as possible to preserve speed.",
    tip3: "Use wide turns when the track gives you space.",
    tip4: "Practice each stunt slowly before attempting a full-speed run."
  },
  "Energy Factory Idle": {
    introParagraph: "Energy Factory Idle is an incremental strategy game about building production and reinvesting profits. Upgrade generators, improve output, and create a factory loop that keeps growing over time.",
    controls: "Click or tap buildings, upgrades, and production buttons.",
    keys: "Mouse or touch controls; keyboard input is not required.",
    mouseActions: "Click to buy upgrades, collect rewards, and manage production.",
    mainAction: "upgrade factory systems to increase energy output",
    objective: "grow production faster with each upgrade cycle",
    obstacles: "slow early income, upgrade costs, and inefficient production chains",
    winCondition: "build a strong factory that scales without constant input",
    tip1: "Buy low-cost upgrades early to speed up the first production loop.",
    tip2: "Compare upgrade cost against output gain before spending.",
    tip3: "Do not ignore automation upgrades when they appear.",
    tip4: "Return after short breaks to reinvest accumulated resources."
  },
  "Police Traffic Racer": {
    introParagraph: "Police Traffic Racer is a traffic-driving game where speed must be balanced with control. Weave through busy roads, avoid collisions, and push for cleaner runs at higher speeds.",
    controls: "Use driving controls to steer, accelerate, brake, and change lanes.",
    keys: "Arrow Keys or WASD to drive; brake key depends on the game mode.",
    mouseActions: "Use clicks for menus, mode selection, and vehicle options.",
    mainAction: "race through traffic while avoiding crashes",
    objective: "cover distance and score points without losing control",
    obstacles: "traffic cars, narrow gaps, sudden lane changes, and high speed",
    winCondition: "survive long runs and improve your traffic racing score",
    tip1: "Stay near the center lanes so you have escape options.",
    tip2: "Do not overtake unless you can see the next gap.",
    tip3: "Brake early when traffic compresses ahead.",
    tip4: "Use small steering corrections at high speed."
  },
  "M5 City Driver": {
    introParagraph: "M5 City Driver is an urban driving game focused on handling, drifting, and free-roam control. Explore city roads, test acceleration, and practice smooth cornering in a powerful car.",
    controls: "Use keyboard driving controls for steering, throttle, braking, and drifting.",
    keys: "WASD or Arrow Keys to drive; Space for handbrake if supported.",
    mouseActions: "Click menus, camera options, and restart controls.",
    mainAction: "drive and drift through city streets",
    objective: "master the car's handling while exploring the city",
    obstacles: "tight roads, traffic objects, sharp corners, and oversteer",
    winCondition: "complete clean drives, controlled drifts, and fast routes",
    tip1: "Feather the throttle through corners instead of holding full speed.",
    tip2: "Use the handbrake only when you have enough space to recover.",
    tip3: "Learn one city route before pushing for faster times.",
    tip4: "Straighten the car before accelerating out of a drift."
  },
  "Xeno Defense Protocol": {
    introParagraph: "Xeno Defense Protocol is a defensive strategy game about holding your ground against incoming threats. Place defenses carefully, manage upgrades, and adapt as enemy waves become harder.",
    controls: "Click or tap to place defenses, select upgrades, and manage the battlefield.",
    keys: "Mouse or touch controls; hotkeys may vary by mode.",
    mouseActions: "Click units, build spots, upgrade buttons, and wave controls.",
    mainAction: "build and upgrade defenses against enemy waves",
    objective: "protect your base for as many waves as possible",
    obstacles: "stronger enemy waves, limited resources, and poor tower placement",
    winCondition: "stop the invasion before enemies break through",
    tip1: "Cover chokepoints before spreading defenses across the map.",
    tip2: "Upgrade reliable defenses instead of buying too many weak ones.",
    tip3: "Watch enemy paths before committing resources.",
    tip4: "Balance damage, range, and slowing effects when available."
  },
  "Avenger Guard": {
    introParagraph: "Avenger Guard is an action defense game where quick reactions matter. Hold your position, defeat waves of enemies, and use upgrades or timing to survive increasingly dangerous attacks.",
    controls: "Use movement, aim, attack, and upgrade controls depending on the mode.",
    keys: "WASD or Arrow Keys to move; mouse or action keys to attack if supported.",
    mouseActions: "Click to aim, attack, select upgrades, or interact with menus.",
    mainAction: "fight off waves of enemies and protect your position",
    objective: "survive each attack wave and improve your combat power",
    obstacles: "enemy swarms, limited reaction time, and stronger wave patterns",
    winCondition: "clear waves without being overwhelmed",
    tip1: "Keep moving when enemies start surrounding you.",
    tip2: "Prioritize threats that move fastest or deal the most damage.",
    tip3: "Upgrade damage before waves become too dense.",
    tip4: "Use open space to control enemy movement."
  },
  "Mahjong Solitaire Zodiac": {
    introParagraph: "Mahjong Solitaire Zodiac is a tile-matching puzzle with a zodiac theme. Find open matching tiles, clear the board in pairs, and plan ahead so important tiles do not stay blocked.",
    controls: "Click or tap two matching open tiles to remove them.",
    keys: "Mouse or touch controls; keyboard is not required.",
    mouseActions: "Click matching tile pairs that are free on at least one side.",
    mainAction: "match open zodiac tiles in pairs",
    objective: "clear the full mahjong layout",
    obstacles: "blocked tiles, hidden matches, and layouts that require careful order",
    winCondition: "remove every tile without leaving unmatched blocked pairs",
    tip1: "Remove tiles that unlock the largest sections first.",
    tip2: "Do not match easy pairs if they do not open the board.",
    tip3: "Check both top layers and side edges before choosing.",
    tip4: "Save rare symbols until you know where their pair is located."
  },
  "Sweet Triple Mahjong": {
    introParagraph: "Sweet Triple Mahjong changes the classic mahjong formula by asking you to think in groups instead of simple pairs. Match sweet-themed tiles, open blocked areas, and manage the board carefully.",
    controls: "Click or tap valid matching tiles to select and clear them.",
    keys: "Mouse or touch controls; keyboard is not required.",
    mouseActions: "Click matching sweet tiles and confirm valid groups.",
    mainAction: "match sweet mahjong tiles while opening the layout",
    objective: "clear the board by finding the right tile groups",
    obstacles: "blocked pieces, similar-looking tiles, and limited matching order",
    winCondition: "clear every tile group from the board",
    tip1: "Focus on matches that expose hidden tiles.",
    tip2: "Compare similar candy tiles carefully before selecting.",
    tip3: "Avoid clearing isolated matches too early.",
    tip4: "Use the visible top layer to plan several moves ahead."
  },
  "Fruit Mahjong 3D": {
    introParagraph: "Fruit Mahjong 3D adds depth and rotation-style thinking to tile matching. Look around the structure, identify open fruit tiles, and clear matches without losing track of hidden layers.",
    controls: "Use mouse or touch to inspect the board and select matching fruit tiles.",
    keys: "Mouse or touch controls; keyboard is not required.",
    mouseActions: "Click tiles to select matches; drag or interact with the view if supported.",
    mainAction: "match fruit tiles across a 3D mahjong layout",
    objective: "clear the full structure by finding valid matches",
    obstacles: "layered tiles, blocked angles, and similar fruit symbols",
    winCondition: "remove all available fruit tile matches",
    tip1: "Check the outer edges before working inward.",
    tip2: "Rotate or inspect the board often if the game allows it.",
    tip3: "Prioritize matches that reveal covered layers.",
    tip4: "Slow down when fruit icons look similar."
  },
  "Plant Merge: Zombie War": {
    introParagraph: "Plant Merge: Zombie War combines merging, lane defense, and upgrade planning. Combine plants into stronger units, place them against zombie waves, and build a defense that scales over time.",
    controls: "Drag, merge, and place plants using mouse or touch.",
    keys: "Mouse or touch controls; keyboard is not required.",
    mouseActions: "Drag matching plants together and place units on defense lanes.",
    mainAction: "merge plants and defend lanes from zombie attacks",
    objective: "build stronger plant defenses before zombies advance",
    obstacles: "incoming zombie waves, limited slots, and upgrade timing",
    winCondition: "stop each wave with upgraded plants still standing",
    tip1: "Merge duplicate plants as soon as it improves your defense.",
    tip2: "Keep damage spread across lanes instead of stacking one side.",
    tip3: "Upgrade before a wave reaches your weak lane.",
    tip4: "Save space for new plants so merging does not stall."
  },
  "Archery Legends": {
    introParagraph: "Archery Legends is an aiming game that tests precision, timing, and distance control. Line up each shot, adjust for movement or angle, and hit targets before pressure builds.",
    controls: "Drag or aim with the mouse, then release to shoot.",
    keys: "Mouse or touch aiming; keyboard is usually not required.",
    mouseActions: "Click, hold, aim, and release to fire arrows.",
    mainAction: "aim and shoot arrows at targets or enemies",
    objective: "land accurate shots and clear each challenge",
    obstacles: "moving targets, distance changes, and limited timing windows",
    winCondition: "hit the required targets with consistent accuracy",
    tip1: "Take a moment to line up the shot before releasing.",
    tip2: "Lead moving targets instead of aiming at where they are now.",
    tip3: "Use early shots to judge distance and arrow speed.",
    tip4: "Focus on accuracy before trying faster shots."
  },
  "Bubble Shooter Crystal Hunt": {
    introParagraph: "Bubble Shooter Crystal Hunt is a match-and-clear puzzle where aim matters as much as color choice. Shoot bubbles into clusters, create chain clears, and recover crystals before the board closes in.",
    controls: "Aim with mouse or touch, then click or release to shoot.",
    keys: "Mouse or touch controls; keyboard is not required.",
    mouseActions: "Move the pointer to aim and click to fire a bubble.",
    mainAction: "shoot colored bubbles into matching clusters",
    objective: "clear bubbles and collect crystal targets",
    obstacles: "descending bubble groups, awkward angles, and blocked colors",
    winCondition: "clear the required bubbles before the board fills up",
    tip1: "Aim for high clusters to drop everything underneath.",
    tip2: "Use wall bounces to reach tight angles.",
    tip3: "Plan around the next bubble color when visible.",
    tip4: "Do not waste shots on isolated bubbles unless they block progress."
  },
  "That's my seat!": {
    introParagraph: "That's my seat! is a logic puzzle about arranging people, places, or objects correctly. Read the clues, test placements, and avoid contradictions as the puzzle becomes more crowded.",
    controls: "Click or tap seats, characters, and options to make placements.",
    keys: "Mouse or touch controls; keyboard is not required.",
    mouseActions: "Click to select, place, move, or swap puzzle elements.",
    mainAction: "place each character or item in the correct seat",
    objective: "solve the seating arrangement without contradictions",
    obstacles: "limited positions, clue dependencies, and tempting wrong placements",
    winCondition: "complete the correct arrangement for the level",
    tip1: "Start with clues that mention exact positions.",
    tip2: "Mark or remember impossible spots before guessing.",
    tip3: "Do not move a confirmed seat unless a clue forces it.",
    tip4: "Work from the most constrained character first."
  },
  "Mahjong 3D Match": {
    introParagraph: "Mahjong 3D Match turns tile matching into a spatial puzzle. Rotate your attention across layers, find exposed matching tiles, and clear the structure without overlooking hidden pairs.",
    controls: "Use mouse or touch to inspect and select matching tiles.",
    keys: "Mouse or touch controls; keyboard is not required.",
    mouseActions: "Click matching open tiles; drag the view if the game supports rotation.",
    mainAction: "match exposed tiles in a 3D mahjong structure",
    objective: "clear all tiles by finding valid pairs",
    obstacles: "blocked layers, hidden matches, and similar symbols",
    winCondition: "remove every tile from the 3D layout",
    tip1: "Work from the top and outside edges first.",
    tip2: "Rotate the view before assuming no matches remain.",
    tip3: "Free blocked tiles before clearing easy side pairs.",
    tip4: "Track rare symbols so you do not strand their matches."
  },
  "K-Wedding Dream": {
    introParagraph: "K-Wedding Dream is a styling and puzzle-focused game built around wedding choices and visual matching. Pick the right items, complete themed tasks, and create a polished wedding look.",
    controls: "Click or tap outfits, items, and puzzle options.",
    keys: "Mouse or touch controls; keyboard is not required.",
    mouseActions: "Click to choose, drag items when needed, and confirm selections.",
    mainAction: "select wedding-themed items and complete styling tasks",
    objective: "finish each wedding look or puzzle objective",
    obstacles: "limited options, matching requirements, and themed task goals",
    winCondition: "complete the requested wedding style or level challenge",
    tip1: "Check the goal before choosing decorative items.",
    tip2: "Match colors and themes rather than picking randomly.",
    tip3: "Try obvious outfit pieces first, then refine details.",
    tip4: "Use previews to compare choices before confirming."
  }
};

const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));
let changed = 0;

for (const game of catalog) {
  const update = updates[game.title];
  if (!update) continue;
  Object.assign(game, update);
  changed += 1;
}

fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2) + "\n", "utf8");
console.log(`Updated ${changed} priority games`);
