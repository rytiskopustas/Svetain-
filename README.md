# 🎭 Teatro mokytojų erdvė

Svetainė teatro mokytojams: naujienos, renginiai, metodinė medžiaga ir patirties dalijimasis.
Sukurta su [Jekyll](https://jekyllrb.com/) ir talpinama **nemokamai** per Cloudflare Pages.

**Adresas (paleidus):** https://teatromokytojai.pages.dev

---

## 1. Kaip paleisti svetainę per Cloudflare Pages (vieną kartą)

1. Užsiregistruokite nemokamai: https://dash.cloudflare.com/sign-up
2. Kairiajame meniu: **Workers & Pages** → **Create** → skirtukas **Pages** →
   **Connect to Git** (Import an existing Git repository).
3. Prijunkite GitHub paskyrą ir pasirinkite saugyklą **Svetain-**.
4. Nustatymai:
   - **Project name:** `teatromokytojai` (tai bus adresas `teatromokytojai.pages.dev`)
   - **Production branch:** `main` (arba ši šaka, jei dar nesujungta su `main`)
   - **Framework preset:** `Jekyll`
   - **Build command:** `bundle exec jekyll build`
   - **Build output directory:** `_site`
5. Spauskite **Save and Deploy**. Po 1–3 min. svetainė veiks.

Kaskart įkėlus pakeitimus į GitHub, Cloudflare svetainę atnaujina automatiškai.

> ⚠️ Jei vardas `teatromokytojai` užimtas, Cloudflare pridės priesagą
> (pvz. `teatromokytojai-abc.pages.dev`). Tada pakeiskite `url` faile `_config.yml`.

## 2. Nuosavas domenas vėliau (pvz. `www.teatromokytojai.lt`)

1. Įsigykite domeną pas `.lt` registratorių (sąrašas – [domreg.lt](https://www.domreg.lt)), ~10–20 €/metus.
2. Cloudflare: projektas → **Custom domains** → **Set up a custom domain** → įveskite
   `www.teatromokytojai.lt` ir sekite nurodymus (reikės registratoriaus DNS nustatymuose
   pridėti CNAME įrašą `www` → `teatromokytojai.pages.dev`).
3. Faile `_config.yml` pakeiskite `url: "https://www.teatromokytojai.lt"`.

## 3. Turinio redagavimas per Pages CMS (rekomenduojama)

1. Atidarykite https://app.pagescms.org ir prisijunkite su GitHub paskyra.
2. Leiskite Pages CMS pasiekti saugyklą **Svetain-** (Install / Authorize).
3. Pasirinkite saugyklą ir šaką `claude/teatro-mokytojai-website-84hmib`.
4. Kairėje matysite skiltis: **Naujienos**, **Renginiai**, **Ištekliai**, **Metodinė medžiaga**,
   **Apie**, **Svetainės nustatymai** ir **Media** (nuotraukoms).
5. Pakeitę spauskite **Save** – po ~5 min. pakeitimai atsiras svetainėje.

Kitus redaktorius galima pakviesti per Pages CMS **Settings → Collaborators** (el. paštu).
Redagavimo laukai aprašyti faile `.pages.yml`.

## 3b. Kaip pridėti turinį tiesiogiai per GitHub

### Nauja naujiena
Aplanke `_posts/` spauskite **Add file → Create new file**, pavadinkite
`2026-10-01-trumpas-pavadinimas.md` (data priekyje būtina) ir įrašykite:

```markdown
---
title: Naujienos pavadinimas
author: Vardas Pavardė
tags: [konkursai]
---

Naujienos tekstas. **Paryškintas**, *pasviręs*, [nuoroda](https://...).
```

Prisegti failai: įkelkite failą į `assets/failai/` ir naujienos antraštėje pridėkite:

```yaml
failai:
  - pavadinimas: Festivalio nuostatai
    failas: /assets/failai/nuostatai.pdf
  - pavadinimas: Registracijos forma
    failas: https://forms.gle/...
```

### Naujas renginys
Redaguokite `_data/renginiai.yml` – nukopijuokite esamą bloką ir pakeiskite reikšmes.
Praėję renginiai automatiškai persikelia į „Įvykę“.

### Naujas išteklius / nuoroda
Redaguokite `_data/istekliai.yml`. Ilgesnei medžiagai sukurkite `.md` failą aplanke
`istekliai/` (žr. `istekliai/apsilimo-zaidimai.md` pavyzdį).

### Kiti nustatymai
Pavadinimas, aprašymas ir el. paštas – faile `_config.yml`.
Spalvos – `assets/css/style.css` pradžioje.

⚠️ Pavyzdinės naujienos ir renginiai pažymėti „Pavyzdys“ – pakeiskite juos tikrais.

## 4. Naujienų sekimas
Svetainė automatiškai generuoja RSS srautą (`/feed.xml`), kurį lankytojai gali
prenumeruoti (pvz. Feedly, Inoreader).

## 5. Peržiūra savo kompiuteryje (nebūtina)
```bash
bundle install
bundle exec jekyll serve
# atidarykite http://localhost:4000/
```
