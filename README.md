# Roster — Team Directory (High-End Edition)

A fully interactive, production-styled team directory modeled on the internal People-Ops tools used at real companies (Attio, Linear, Notion People, Rippling). Every visible element is functional — nothing is decorative.

## What's clickable

- **Every card** — click anywhere on a card (not the Follow button or a skill chip) to open the full profile drawer.
- **Follow / Following** — toggles per person, with a toast confirmation. Works from the card and from inside the profile drawer.
- **Skill chips** — on a card or inside the drawer, clicking a skill instantly filters the whole directory to that skill.
- **Profile drawer actions** — copy email, Edit (opens a pre-filled form), Delete (asks for confirmation first).
- **Stats bar** — "Members" resets all filters, "Admins" jumps to the admins filter, "Countries" and "Unique skills" surface the underlying breakdown as a toast.
- **Filter tabs** — All / Admins / Following.
- **Sort menu** — Recently added / Name A–Z / Role A–Z, a real dropdown with outside-click-to-close.
- **View toggle** — switch between grid and list layouts.
- **Export** — downloads the currently visible members as a real CSV file.
- **Add member** — opens a validated form; the new person appears in the directory immediately.
- **Search** — live filtering across name, role, skill, and location, with a one-click clear button.
- **Toast notifications** — click to dismiss immediately, or they auto-dismiss.

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Deploy the `dist/` folder to Vercel/Netlify like any Vite app (Build command: `npm run build`, Output directory: `dist`).

## Structure

```
src/
├── App.jsx / App.css
├── data/team.js                 # seed data
├── hooks/useTeamDirectory.js    # search, filter, sort, follow, full CRUD
├── utils/avatar.js              # deterministic initials + color
├── utils/exportCsv.js           # CSV download
└── components/
    ├── Topbar/                  # logo, search, Export, Add member
    ├── StatsRow/                # clickable summary metrics
    ├── FilterTabs/              # All / Admins / Following
    ├── SortMenu/                # dropdown sort control
    ├── ViewToggle/              # grid / list switch
    ├── MemberGrid/              # renders cards in either layout
    ├── MemberCard/              # clickable profile card
    ├── MemberDrawer/            # full profile panel (edit/delete/follow/email)
    ├── AddMemberModal/          # add AND edit form (reused via a `member` prop)
    ├── ConfirmDialog/           # delete confirmation
    └── Toast/                   # transient, click-to-dismiss feedback

```

All data logic (list, search, filter, sort, follow, add/update/remove) lives in one hook, `useTeamDirectory`, so every component stays a thin, testable layer — the same separation of concerns real production codebases use.
