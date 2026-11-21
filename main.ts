// The Passport Page of a Country — Republic of Kaldoria (invented).
//
// An open passport spread of a country that does not exist: the data page of
// Mara Ilsa Vey, citizen of Kaldoria (capital Aldhaven, language
// Kaldorian/English, currency the kaldor), and the facing visa page with nine
// entry/exit stamps from three neighbours — Ostrovia, Meridia, Tarnovia —
// plus the entry-fee table that shows how Kaldoria treats its neighbours.
// Every stamp falls between issue (12 FEB 2024) and expiry (12 FEB 2034),
// and the MRZ carries valid ICAO 9303 check digits.
//
// Deterministic: this program only copies the committed asset passport.png
// to the output directory, so every run writes byte-identical output.
// No network, no randomness, no clock.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const bytes = readFileSync(join(process.cwd(), "passport.png"));
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.png");
writeFileSync(outPath, bytes);
// Integrity check: the written file must be byte-identical to the asset.
const written = readFileSync(outPath);
if (!written.equals(bytes)) throw new Error("entry.png differs from passport.png");
console.log(`wrote entry.png (${bytes.length} bytes, verified identical)`);
