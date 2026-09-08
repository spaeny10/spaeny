# The Spaeny Family Record

A family history website, built one ancestral line at a time and graded by evidence throughout.

- **Paternal — the Späni–Spaeny line.** Eleven generations from Illgau, Canton Schwyz to Lyons
  and Hutchinson, Kansas.
- **Maternal — the Kroeker line.** Four generations, all of them in Reno County, Kansas. Newer
  and thinner than the paternal line, and the page says so plainly.

The two join at the 1975 marriage of Michael Craig Spaeny and Twila May Kroeker, in Hutchinson.

## Layout

```
public/
  index.html            the hub — both lines, the evidence standard, how to contribute
  lines/
    spaeny.html         the paternal line          ->  /spaeny
    kroeker.html        the maternal line          ->  /kroeker
  assets/
    site.css            the whole design system, shared by every page
    site.js             shared behaviour (evidence filter, section nav)
  img/                  photographs, once the family sends some
templates/
  line-page.html        skeleton for a further line's page (never served)
research/
  README.md             the research index and the standard every line is held to
  spaeny-lineage-research.md    evidence base for the paternal line
  maternal-lineage-research.md  evidence base for the maternal Kroeker line
server.js               tiny zero-dependency static server
CLAUDE.md               instructions for Claude Code when editing this project
```

URLs are clean: `/` is the hub, `/spaeny` and `/kroeker` are the two lines. Dropping a new file
at `public/lines/<name>.html` makes `/<name>` work immediately — no server change.

## Run it locally

```
node server.js
```

Open http://localhost:3000. Requires Node 18 or newer.

## Deploy to Railway

Railway deploys from a GitHub repository and redeploys automatically on every push.

1. **GitHub — already done.** The repository is live at
   **https://github.com/spaeny10/spaeny**, on branch `main`, and `origin` is configured. To
   push later work:

   ```bash
   git push
   ```

   > **Note: this repository is public.** The deployed site sets `robots: noindex` because it
   > names living relatives, but a public repo is crawled and indexed regardless, so those names
   > and the contact address are publicly searchable. If that is ever not what you want, change
   > it in **Settings → General → Danger Zone → Change repository visibility**. Railway deploys
   > from private repositories exactly the same way.

2. **Create the Railway project.** At railway.app: **New Project → Deploy from GitHub repo**,
   authorise GitHub if asked, and pick `spaeny10/spaeny`. Railway reads `railway.json`, detects
   Node from `package.json`, and runs `node server.js`. First build takes a minute or two.
   **This is the only step still outstanding.**

3. **Give it a public address.** In the service: **Settings → Networking → Generate Domain**.
   You get a `*.up.railway.app` URL that works immediately — send that to your dad.

4. **Optional — your own domain.** Same Networking panel → **Custom Domain**. Railway shows a
   CNAME record to add at your registrar; propagation takes minutes to an hour. Something like
   `family.yourdomain.com` reads well.

5. **Updating the site.** Edit the files (or have Claude Code do it), then:

   ```bash
   git add . && git commit -m "Add Grandma's photo" && git push
   ```

   Railway redeploys within a minute or two. The URL never changes.

### Alternative: Railway CLI

```
npm i -g @railway/cli
railway login
railway init
railway up
railway domain
```

## What to chase next

Each line's page carries its own research plan, ranked by effort against payoff. The two that
would move things furthest:

- **Bueford Kroeker's obituary, May 1993, in the *Hutchinson News*.** It would name his parents
  and turn the whole oldest Kroeker generation from a submitted tree into sourced fact. The
  single most valuable missing document on either line.
- **Donald Spaeny's WD AGO 53-55 discharge certificate.** Boxes 32 and 33 name his campaigns and
  medals — the question the paternal line still cannot answer, because the master copy almost
  certainly burned in St. Louis in 1973. Ask the family before any archive.

And on the Kroeker side there is a deadline of a kind: seven of Bueford and Opal's ten children
were living in Hutchinson in 2018. That line's memory is still in people who can be phoned.

## Adding a further line

1. **Gather the starting facts** — a surname, a rough place of origin, and any dates or
   documents in hand (a marriage licence, an obituary, a family Bible page).
2. **Write the research file first.** The page is written *from* the research, never the other
   way round. See `research/README.md` for the standard.
3. **Copy `templates/line-page.html` to `public/lines/<surname>.html`** and write it up. It
   inherits the whole design system from `assets/site.css`, so it matches without new CSS.
4. **Register it twice** — a `.door` in `public/index.html`, and the `.linebar` switcher at the
   top of *every* line page.

Claude Code knows this sequence; `CLAUDE.md` spells out the editorial rules that go with it.
Useful prompts:

- "Aunt Reja sent a photo of Grandpa Donald in uniform — add it to the war section with her as the source."
- "The discharge paper arrived. Box 32 says … and box 33 says … — update Donald's section and the research plan."
- "Bueford's 1993 obituary names his parents as … — update the Kroeker line and re-grade generation 1."
- "The Staatsarchiv Schwyz sent the Späni arms. Here's the blazon: … Replace the placeholder shield."

## Cost

A static site this small sits comfortably inside Railway's Hobby plan. If you want zero ongoing
cost, `public/` also deploys unchanged to GitHub Pages, Netlify or Cloudflare Pages — though
those serve files literally, so links would need to be `/spaeny.html` rather than `/spaeny`,
or the host's own clean-URL setting turned on.
