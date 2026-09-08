# Spaeny family record — project notes for Claude Code

A family history website built **one ancestral line per page**, deployed on Railway behind a
tiny Node server. Shawn Spaeny (shawn@jetstreamsys.com) owns and maintains it. Compiled for
Michael Spaeny and the wider family.

Two lines are written: the paternal **Späni–Spaeny** line (11 generations, Illgau SZ → Kansas)
and the maternal **Kroeker** line (4 generations, Reno County, Kansas). They join at the 1975
marriage of Michael Craig Spaeny and Twila May Kroeker.

## Layout

- `public/index.html` — **the hub.** Introduces the record, offers a door to each line, states
  the evidence standard, and carries the contribute section. Add each new line here.
- `public/lines/spaeny.html` — the paternal Späni–Spaeny line. One long self-contained page.
- `public/lines/kroeker.html` — the maternal Kroeker line. Deliberately shorter: it is four
  generations deep and says so. **Do not pad it to match the paternal page.**
- `public/lines/<surname>.html` — where each further line goes. `/<surname>` routes to it
  automatically; no server change needed.
- `public/assets/site.css` — **the whole design system, shared by every page.** Palette tokens,
  type, section furniture, the generation spine, tables, badges. Extend it rather than adding
  page-level `<style>` blocks, so the lines keep matching.
- `public/assets/site.js` — shared behaviour. Currently just the evidence filter on the
  generation spine; it binds only if `.seg`/`#spine` are present, so it is safe on any page.
- `templates/line-page.html` — skeleton for a new line's page. Outside `public/`, never served.
- `research/` — **the evidence base, one file per line, plus a README that defines the standard.**
  Read the relevant file before changing any name, date, place or relationship.
- `server.js` — zero-dependency static server. Clean URLs, real 404s, `/health` for Railway.
  Paths are confined to `public/`. No changes needed to add a line.
- `railway.json`, `package.json` — deploy config. Node ≥ 18, `node server.js`.

## Editorial rules — these matter more than the code

1. **Never invent genealogy.** Do not add a name, date, unit, medal, ship, crest or relationship
   that is not backed by a record cited in `research/`. If the user asks for something that
   isn't documented, say so and add it to the research plan instead.
2. **Keep the confidence grading honest.** Each generation card carries `data-conf="doc|part|tree"`
   and a visible badge. "Tree only" means no document is attached on FamilySearch. Only upgrade
   a grade when a specific record is cited. Headline statistics must respect the same grading —
   don't call a tree-only date "firm".
3. **"Probably" means probably.** Several graves are labelled "probably his wife" etc. Do not
   remove the hedge without a source.
4. **Donald's WWII service:** the induction record (serial 37732174, 29 Jan 1944, Fort
   Leavenworth) is documented. Unit, theatre, campaigns and medals are NOT. Do not add any until
   the WD AGO 53-55 discharge form or an equivalent record is in hand.
5. **The Späni coat of arms:** exists in Styger's *Wappenbuch des Kantons Schwyz* (1936); the
   blazon has not been obtained. Do not draw or describe one until the Staatsarchiv Schwyz copy
   arrives (afk@sz.ch). When it does, replace the dashed placeholder shield in `#crest`.
6. **Living people stay thin.** Names and towns only for Gen 10–11 and living relatives.
7. **Both lines are held to the same standard.** A well-documented paternal line must not lend
   borrowed authority to a thin maternal one. Grade each independently.
8. **Search all spellings.** For Späni: Späni, Spaeni, Spane, Spaney, Spaeny, Spani, Spahni,
   Spöni. For Kroeker: Kroeker, Kroecker, Kröker, Kreker, Kröckert, Krueger, Kröger — and note
   that "Bueford" is also written **Buford**, which is how the family says it.
9. **The Kroeker surname is NOT established as Mennonite.** GAMEO documents the *name's*
   Prussian Mennonite origin (first recorded at Tiegenhagen, 1627), and Mennonites did settle
   Reno County from 1874 — but this family was **Baptist**, and its given names (Bueford Lewis,
   Charles Alford) and the Seaman surname do not fit the pattern. It is written up on the page as
   an **open question on purpose**. Do not resolve it without a record; see rule 1.
10. **Numbers on the page must match the page.** If you add or remove a grave, a generation or a
   cemetery, update the counts in the masthead stats, the section intros and the hub door.

## Common tasks

- **Add a further line.** Fill its research file first — the page is written *from* the research
  file, never the reverse. Then copy `templates/line-page.html` to `public/lines/<surname>.html`,
  write it up, and register the line in two places: a `.door` on `public/index.html`, and the
  `.linebar` switcher at the top of **every** line page.
- **Work the Kroeker line.** Its next step is documentary, not editorial: **Bueford Kroeker's
  May 1993 obituary in the *Hutchinson News*** would convert its whole oldest generation from a
  submitted tree into sourced fact. See track 1 of that page's research plan.
- **Fold in a family contribution** (a story, photo, correction): verify against the relevant
  `research/` file, update the line page, add the source to its `#sources`, and append a dated
  note to the research file.
- **Add a photograph:** put the file in `public/img/`, reference it as `/img/<name>`, add a
  caption with who/when/where and who supplied it. Keep files under ~500 KB (resize first).
- **Update the memorial register:** rows live in `#graves`, grouped by cemetery. Each row has a
  Find a Grave memorial id link. Plot fields show `—` when unknown. Then fix the counts (rule 9).
- **Change the contact address:** it appears in `#contribute` on the hub and on each line page.

## Design system (don't fight it)

- Palette tokens in `:root` in `assets/site.css`, light and dark variants. Schwyz red
  (`--schwyz`) is the accent for the American side and key moments; glacier teal (`--glacier`)
  marks the Swiss side and documented evidence; gold marks "needs proof". A second line should
  reuse these roles rather than introduce a new palette.
- Type: Spectral for names/headings, Archivo for body, Archivo Narrow for uppercase labels
  and data.
- Structure encodes meaning: the vertical spine changes colour at the Atlantic crossing; the
  two-column timeline pairs homeland events with family events by year. Reuse both devices on
  the maternal line if its story has an equivalent break.

## Running locally

```
node server.js          # http://localhost:3000
```

`/` is the hub, `/spaeny` the paternal line. `/spaeny/` and `/lines/spaeny.html` also work.

## Deploying

Push to the connected GitHub repo; Railway redeploys automatically. **No remote is configured
yet** — see README.md.

## Verification log

September 2026: the Swiss and archival background was checked against the open web — Illgau's
commune history, the Historical Dictionary of Switzerland, the Staatsarchiv Schwyz, the National
Archives, and the two Kansas record offices. Six statements were corrected. Details are in
`research/spaeny-lineage-research.md` under "Verification pass". The genealogy itself was not
re-derived and still rests on the sources graded on the page.
