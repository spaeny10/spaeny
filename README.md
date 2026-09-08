# The Spaeny Family Record

A family history website, built one ancestral line at a time and graded by evidence throughout.

- **Paternal — the Späni–Spaeny line.** Eleven generations from Illgau, Canton Schwyz to Lyons
  and Hutchinson, Kansas. Complete and live.
- **Maternal.** Not yet compiled. The site is already structured to take it.

## Layout

```
public/
  index.html            the hub — both lines, the evidence standard, how to contribute
  lines/
    spaeny.html         the paternal line (one long page)
  assets/
    site.css            the whole design system, shared by every page
    site.js             shared behaviour (the evidence filter)
  img/                  photographs, once the family sends some
templates/
  line-page.html        skeleton for the next line's page (never served)
research/
  README.md             the research index and the standard every line is held to
  spaeny-lineage-research.md    evidence base for the paternal line
  maternal-lineage-research.md  evidence base for the maternal line (open questions so far)
server.js               tiny zero-dependency static server
CLAUDE.md               instructions for Claude Code when editing this project
```

URLs are clean: `/` is the hub, `/spaeny` is the paternal line. Dropping a new file at
`public/lines/<name>.html` makes `/<name>` work immediately — no server change.

## Run it locally

```
node server.js
```

Open http://localhost:3000. Requires Node 18 or newer.

## Deploy to Railway

Railway deploys from a GitHub repository and redeploys automatically on every push.

1. **Push to GitHub.** This folder is a git repository with local commits, but **no remote is
   configured yet and nothing has been pushed.** Create an empty repository on GitHub, then:

   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git branch -M main
   git push -u origin main
   ```

   You'll be asked to authenticate the first time — a browser prompt, or a personal access
   token used as the password. If the GitHub repo already has commits in it, run
   `git pull --rebase origin main` first.

   Or ask Claude Code: "push this repo to github.com/&lt;you&gt;/&lt;repo&gt;".

2. **Create the Railway project.** At railway.app: **New Project → Deploy from GitHub repo**,
   authorise GitHub if asked, and pick the repository. Railway reads `railway.json`, detects
   Node from `package.json`, and runs `node server.js`. First build takes a minute or two.

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

## Adding the maternal line

The structure is already in place. In order:

1. **Gather the starting facts** — a maiden name, a rough place of origin, and any dates or
   documents in hand (a marriage licence, an obituary, a family Bible page).
2. **Fill in `research/maternal-lineage-research.md`.** Research goes here first, always.
   The page is written *from* the research file, never the other way round.
3. **Copy `templates/line-page.html` to `public/lines/<surname>.html`** and write it up. It
   inherits the whole design system from `assets/site.css`, so it will match the paternal page
   without any new CSS.
4. **Add the line to the hub** — the second `.door` in `public/index.html` — and to the
   `.linebar` switcher at the top of every line page.

Claude Code knows this sequence; `CLAUDE.md` spells out the editorial rules that go with it.
Useful prompts:

- "Start the maternal line. Mum's maiden name is …, she was born in … — here's what we know."
- "Aunt Reja sent a photo of Grandpa Donald in uniform — add it to the war section with her as the source."
- "The discharge paper arrived. Box 32 says … and box 33 says … — update Donald's section and the research plan."
- "The Staatsarchiv Schwyz sent the Späni arms. Here's the blazon: … Replace the placeholder shield."

## Cost

A static site this small sits comfortably inside Railway's Hobby plan. If you want zero ongoing
cost, `public/` also deploys unchanged to GitHub Pages, Netlify or Cloudflare Pages — though
those serve files literally, so links would need to be `/spaeny.html` rather than `/spaeny`,
or the host's own clean-URL setting turned on.
