# The Späni–Spaeny Line

A family history website for the Spaeny family — eleven generations from Illgau, Canton Schwyz,
Switzerland, to Lyons and Hutchinson, Kansas.

- `public/index.html` — the site (single self-contained page)
- `server.js` — tiny static server for Railway (no dependencies)
- `research/` — the research file behind every fact on the page
- `CLAUDE.md` — instructions for Claude Code when editing this project

## Before you deploy: one placeholder to fill

Open `public/index.html`, find `CONTACT_EMAIL` (it appears twice in the "Add to this" section)
and replace it with the address family members should write to. Or ask Claude Code:
"set the contact email on the site to …".

## Run it locally

```
node server.js
```

Open http://localhost:3000. Requires Node 18 or newer.

## Deploy to Railway (about ten minutes)

Railway deploys from a GitHub repository and redeploys automatically on every push.

1. **Push to GitHub.** This folder is already a git repository with one commit and the remote
   set to `https://github.com/spaeny10/spaeny.git`. From here, all that's left is:
   ```
   git push -u origin main
   ```
   You'll be asked to authenticate the first time (a browser prompt, or a personal access token
   as the password). If the repo already has commits in it, pull first:
   `git pull --rebase origin main`, then push.

   If git isn't set up on this machine yet, Claude Code can do it: "push this repo to
   github.com/spaeny10/spaeny".

2. **Create the Railway project.** At railway.app: **New Project → Deploy from GitHub repo**,
   authorise GitHub if asked, and pick `spaeny10/spaeny`. Railway reads `railway.json`,
   detects Node from `package.json`, and starts `node server.js`. The first build takes a minute
   or two.

3. **Give it a public address.** In the service: **Settings → Networking → Generate Domain**.
   You get a `*.up.railway.app` URL that works immediately — send that to your dad.

4. **Optional — your own domain.** Same Networking panel → **Custom Domain**. Railway shows a
   CNAME record to add at your domain registrar; propagation usually takes minutes to an hour.
   Something like `family.yourdomain.com` reads well.

5. **Updating the site.** Edit `public/index.html` (or have Claude Code do it), then:
   ```
   git add . && git commit -m "Add Grandma's photo" && git push
   ```
   Railway redeploys within a minute or two. The URL never changes.

### Alternative: Railway CLI

```
npm i -g @railway/cli
railway login
railway init        # creates a project from this folder
railway up          # deploys the current directory
railway domain      # generates the public URL
```

## Cost

A static site this small sits comfortably inside Railway's Hobby plan. If you want zero
ongoing cost, the same `public/` folder deploys unchanged to GitHub Pages, Netlify or
Cloudflare Pages (upload the folder, no server needed).

## Working on it in Claude Code

Open this folder in Claude Code. `CLAUDE.md` gives it the editorial rules — chiefly, that
nothing gets added to the family record without a source, and that confidence labels stay
honest. Useful prompts:

- "Aunt Reja sent a photo of Grandpa Donald in uniform — add it to the war section with her as the source."
- "The discharge paper arrived. Box 32 says … and box 33 says … — update Donald's section and the research plan."
- "The Staatsarchiv Schwyz sent the Späni arms. Here's the blazon: … Replace the placeholder shield."
- "Add a new grave to the memorial register: …"

## Next steps for the site itself

- A contribution form (name, message, optional photo) that emails you or writes to a small
  database — Railway can host a Postgres database alongside this service when you want that.
- A photographs section, once the family sends some.
- A printable PDF edition for relatives without internet.
