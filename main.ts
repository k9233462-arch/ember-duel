// Ember Duel — entry program for the "Make the best card game" bounty.
//
// What this program does, in plain terms:
//   1. It takes the finished, self-contained browser game that lives in the
//      game/ folder beside this file (static HTML, CSS and JavaScript that
//      a desktop browser can play completely offline).
//   2. It copies that game, plus the maker's screenshots in screenshots/,
//      into the output directory the grader gives it (/output in the
//      sandbox, or the folder named by MAKEFUN_OUTPUT_DIR when run locally).
//   3. It writes dossier.json into that same output directory using
//      buildDossier from the vendored make.fun library, so the judge reads
//      exactly the bytes the scorer will rebuild and compare against.
//
// The program uses only the Node.js standard library, touches no network,
// reads nothing outside its own repository folder, and always produces the
// same output bytes for the same input files, so two runs agree exactly.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Play it:    serve game/ with any static server and open index.html.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

// The folder this file sits in is the repository root: game/, screenshots/
// and vendor/ are all looked up relative to it, never relative to the
// caller's working directory, so the grader can run it from anywhere.
const repoRoot = fileURLToPath(new URL('.', import.meta.url));

// The grader mounts its output at /output; locally a caller can point the
// environment variable somewhere scratch instead of writing to the root.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Make sure the output root exists before copying anything into it.
mkdirSync(outputDir, { recursive: true });

// Hand in the playable game exactly as authored: every file under game/
// travels, so the hosted copy and the judged copy are the same game.
cpSync(join(repoRoot, 'game'), join(outputDir, 'game'), { recursive: true });

// Hand in the screenshots beside the game. They live in their own folder in
// the output because the dossier format expects screenshots/ at the top.
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
const shotsSource = join(repoRoot, 'screenshots');
if (existsSync(shotsSource)) {
  cpSync(shotsSource, join(outputDir, 'screenshots'), { recursive: true });
}

// Finally, describe the whole hand-in as a dossier. The caps below are the
// scorer's own limits for this bounty: they only refuse an entry the scorer
// would refuse anyway (too many screenshots, an oversized screenshot, too
// many or too large game files, or an over-long game path), while
// text_max_bytes is the one value that shapes the dossier's bytes.
const dossierBytes = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(outputDir, 'dossier.json'), dossierBytes);
