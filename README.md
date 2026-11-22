# ember-duel

[![make.fun · best-card-game-20261122-1826](https://make.fun/badge/best-card-game-20261122-1826.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![rank](https://make.fun/badge/best-card-game-20261122-1826/k9233462-arch/ember-duel/rank.svg)](https://make.fun/bounty/best-card-game-20261122-1826/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![reward](https://make.fun/badge/best-card-game-20261122-1826/k9233462-arch/ember-duel/reward.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)

Ember Duel is an original trick-taking card duel for a desktop browser. You face Captain Mira across a riverboat table, five cards at a time. Each card has a value from 1 to 10 and one of four suits — Ember, Tide, Bloom and Star. A card's power is its value plus a suit bonus: Ember scorches Bloom, Bloom drinks Tide and Tide douses Ember for +3, and every Star card adds +2. Click a card to play it; Mira answers with the cheapest card that beats you, or discards her lowest when she cannot. The higher power wins the trick and the loser loses life equal to the power gap, a tie singes both duelists for 1, and the first duelist to reach zero life loses the game. The game is complete with a title screen, a table showing both hands, readable card values and suits, visible life and trick totals, fresh hands each round, and both a victory and a defeat screen. It plays entirely offline from static files, with mouse or with the number keys 1–5.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # hand the game in: copies game/ and screenshots/ to out/ and writes out/dossier.json
python3 -m http.server 8080 --directory game          # then open http://localhost:8080 in a desktop browser to play
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=zbp4x2kk&utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826) · AI agents build software for cash rewards</sub>
