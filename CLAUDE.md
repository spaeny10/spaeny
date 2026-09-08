# Spaeny family site — project notes for Claude Code

This repo is a single-page family history website: **The Späni–Spaeny Line**, compiled for
Michael Spaeny and the wider Spaeny family. It is deployed on Railway as a static site behind
a tiny Node server. Shawn Spaeny owns and maintains it.

## Layout

- `public/index.html` — the entire site. One self-contained HTML file: inline CSS, inline JS,
  Google Fonts (Spectral / Archivo / Archivo Narrow). Edit this file to change the page.
- `server.js` — zero-dependency static server. Serves `public/`, `/health` for Railway.
  Unknown paths fall back to `index.html`. No changes normally needed.
- `research/spaeny-lineage-research.md` — **the evidence base.** Every fact on the page traces
  to a line in this file. Read it before changing any name, date, place or relationship.
- `railway.json`, `package.json` — deploy config. Node ≥ 18, `node server.js`.

## Editorial rules — these matter more than the code

1. **Never invent genealogy.** Do not add a name, date, unit, medal, ship, crest or relationship
   that is not backed by a record cited in `research/`. If the user asks for something that
   isn't documented, say so and add it to the research plan instead.
2. **Keep the confidence grading honest.** Each generation card carries `data-conf="doc|part|tree"`
   and a visible badge. "Tree only" means no document is attached on FamilySearch. Only upgrade
   a grade when a specific record is cited.
3. **"Probably" means probably.** Several graves are labelled "probably his wife" etc. Do not
   remove the hedge without a source.
4. **Donald's WWII service:** the induction record (serial 37732174, 29 Jan 1944, Fort
   Leavenworth) is documented. Unit, theatre, campaigns and medals are NOT. Do not add any until
   the WD AGO 53-55 discharge form or an equivalent record is in hand.
5. **The Späni coat of arms:** exists in Styger's *Wappenbuch des Kantons Schwyz* (1936); the
   blazon has not been obtained. Do not draw or describe one until the Staatsarchiv Schwyz copy
   arrives. When it does, replace the dashed placeholder shield in `#crest`.
6. **Living people stay thin.** Names and towns only for Gen 10–11 and living relatives.
7. **Search all spellings** when researching: Späni, Spaeni, Spane, Spaney, Spaeny, Spani,
   Spahni, Spöni.

## Common tasks

- **Fold in a family contribution** (a story, photo, correction): verify against `research/`,
  update the relevant section of `index.html`, add the source to `#sources`, and append a dated
  note to `research/spaeny-lineage-research.md`.
- **Add a photograph:** put the file in `public/img/`, reference it with a relative path, add a
  caption with who/when/where and who supplied it. Keep files under ~500 KB (resize first).
- **Update the memorial register:** rows live in `#graves`, grouped by cemetery. Each row has a
  Find a Grave memorial id link. Plot fields show `—` when unknown.
- **Set the contact address:** `CONTACT_EMAIL` appears twice in `#contribute`. Replace with the
  address family should write to.

## Design system (don't fight it)

- Palette tokens in `:root`, light and dark variants. Schwyz red (`--schwyz`) is the accent for
  the American side and key moments; glacier teal (`--glacier`) marks the Swiss side and
  documented evidence; gold marks "needs proof".
- Type: Spectral for names/headings, Archivo for body, Archivo Narrow for uppercase labels
  and data.
- Structure encodes meaning: the vertical spine changes colour at the Atlantic crossing; the
  two-column timeline pairs canton events with family events by year.

## Running locally

```
node server.js          # http://localhost:3000
```

## Deploying

Push to the connected GitHub repo; Railway redeploys automatically. See README.md.
