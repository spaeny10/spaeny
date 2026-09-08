# Maternal Lineage — Research File

**Status: not started.** This file holds open questions only. Nothing below is a finding, and
nothing here should appear on the website until it is sourced. Started 7 September 2026 for
Shawn Spaeny (shawn@jetstreamsys.com).

Read `research/README.md` first — the evidence grades and the four rules apply to this line
exactly as they apply to the paternal one.

## What is needed to begin

Three things unlock everything else. None of them are on record yet.

1. **The maiden name.** Everything downstream is a search on it.
2. **A place** — where she was born, or failing that where she married or where her parents are
   buried. A surname without a county is not a search.
3. **One date** — birth, marriage, or death. Any one anchors the rest.

Any of these settles it in a single document: a marriage licence or certificate, a parent's
obituary, a funeral-home record, a family Bible births page, a driver's licence or passport, a
Social Security application (SS-5), or a cemetery marker.

## What is known so far

Almost nothing, and only by inference from the paternal line's evidence.

- **Michael Craig Spaeny** of Hutchinson, Reno County, Kansas — Gen 10 of the paternal line, the
  eldest of Donald Kenneth Spaeny's three sons — is Shawn's father.
- Donald's obituary (Elliott Mortuary & Crematory, Hutchinson, December 2011) names Michael's
  wife as **"Twila"**, of Hutchinson, as of that date. No maiden name, no dates, no birthplace.
- **Whether Twila is Shawn's mother has not been confirmed**, and must be, from the family
  rather than inferred. An obituary records a spouse at the time of death, which is not the same
  question. Do not put her on the site as Shawn's mother until Shawn says so.

That is the entire documentary basis. It is one forename in one obituary.

## First moves, in order

**Ask, before searching.** One conversation with Michael in Hutchinson would supply the maiden
name, the parents' names, the birthplace and probably two generations beyond — faster and more
accurately than any database. This is the same advice that tops the paternal line's WWII track,
and for the same reason: the living hold what the archives lost.

Once a maiden name and a Kansas connection exist, the paternal line's playbook transfers almost
unchanged, because the geography is likely shared:

1. **The marriage record of Michael and his wife.** Kansas marriage licences name both sets of
   parents. Reno County (Hutchinson) district court first, then Rice and Barton counties.
   A Kansas licence is the single highest-value document to find first.
2. **Obituaries of her parents and grandparents** — *Hutchinson News*, *Lyons Daily News*, and
   whatever paper serves her home town. Kansas Historical Society microfilm; Newspapers.com.
3. **Find a Grave**, by surname within Reno, Rice, Barton and Saline counties, Kansas. The
   paternal line's memorial register was built this way and yielded 24 graves and three branches.
4. **Federal census 1940 and 1950**, then back through 1900, once a household is located. The
   1950 census is open and indexed.
5. **Kansas state censuses 1905/1915/1925** — an extra grid between the federal years, and the
   record that caught "Chas Spaney" in Lincoln Township.
6. **Then the homeland**, whatever it turns out to be. If the line is also an immigrant one,
   date the crossing before chasing the village — the paternal file's Track 1 explains why.

## Structural notes for when this becomes a page

- The page goes at `public/lines/<surname>.html`, from `templates/line-page.html`. It inherits
  the design system; do not write new CSS unless the story needs a device the paternal page
  doesn't have.
- Register it in two places: the second `.door` on `public/index.html`, and the `.linebar`
  switcher at the top of **every** line page, paternal included.
- Reuse the palette roles rather than inventing colours: `--glacier` for the homeland side and
  documented evidence, `--schwyz` for the American side and turning points, gold for "needs
  proof".
- The paternal page's two strongest devices are worth reusing **only if this line earns them**:
  the two-column timeline pairing homeland history with family events, and the spine that
  changes colour at the migration. If the maternal line never crossed an ocean, don't force it.

## Open questions

- Is Twila Shawn's mother? What is her maiden name?
- Where was she born, and where were her parents from?
- Is this an immigrant line, and if so from where and when?
- Where are her people buried, and is that the same corner of Kansas as the Spaenys?
- How did she and Michael meet — which tells you whether the two families were already neighbours.

## Provenance

- Donald K. Spaeny obituary, Elliott Mortuary & Crematory, Hutchinson, Kansas, December 2011 —
  the sole source for the forename "Twila", and for the Hutchinson residence.
- Cross-reference: `spaeny-lineage-research.md`, generations 9–11.

**Caveat:** this file currently contains no findings. Everything above is either a question, a
plan, or a single unconfirmed forename from one obituary.
