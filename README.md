# 🎭 Teatro mokytojų erdvė

Svetainė teatro mokytojams: naujienos, renginiai, metodinė medžiaga ir patirties dalijimasis.
Sukurta su [Jekyll](https://jekyllrb.com/) ir talpinama **nemokamai** per GitHub Pages.

**Adresas (paleidus):** https://rytiskopustas.github.io/Svetain-/

---

## 1. Kaip paleisti svetainę (vieną kartą)

1. Sujunkite šią šaką su `main` (per Pull Request) – arba naudokite šią šaką tiesiogiai.
2. GitHub saugykloje atidarykite **Settings → Pages**.
3. Skiltyje **Build and deployment** pasirinkite:
   - *Source*: **Deploy from a branch**
   - *Branch*: **main** (arba šią šaką), aplankas **/ (root)** → **Save**.
4. Po 1–2 min. svetainė veiks adresu `https://rytiskopustas.github.io/Svetain-/`.

> 💡 Patarimas: jei pervadinsite saugyklą (pvz. į `teatro-mokytojai`), pakeiskite
> `baseurl` faile `_config.yml` į `"/teatro-mokytojai"`. Jei saugyklą pavadinsite
> `rytiskopustas.github.io`, adresas bus tiesiog `https://rytiskopustas.github.io`
> (tada `baseurl: ""`).

## 2. Nemokamo domeno galimybės

| Variantas | Adresas | Kaina |
|---|---|---|
| **GitHub Pages** (jau paruošta) | `rytiskopustas.github.io/Svetain-` | Nemokamai |
| Netlify / Cloudflare Pages | `pavadinimas.netlify.app` / `pavadinimas.pages.dev` | Nemokamai |
| Nuosavas domenas (pvz. `teatromokytojai.lt`) | `teatromokytojai.lt` | ~10–20 €/metus |

Įsigiję nuosavą domeną, sukurkite failą `CNAME` su domeno pavadinimu, `_config.yml`
nustatykite `url: "https://jusu-domenas.lt"` ir `baseurl: ""`, o domeno DNS nukreipkite
į GitHub Pages ([instrukcija](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).

## 3. Kaip pridėti turinį (tiesiog per GitHub svetainę)

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
# atidarykite http://localhost:4000/Svetain-/
```
