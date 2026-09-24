# Express Checkpoint — Portfolio 

Ce projet répond au checkpoint **Express.js** : une application web à
trois pages (Home, Our Services, Contact Us), avec navigation commune,
mise en forme CSS, et un middleware personnalisé qui rend le site
disponible uniquement pendant les heures de travail (lundi à vendredi,
9h–17h).

Le contenu du site est un portfolio personnel, présentant mon profil de
développeuse logicielle spécialisée en cybersécurité, avec des
compétences en design (Figma) et en outils assistés par IA.

---

## Consignes du checkpoint couvertes

| Consigne | Où c'est fait |
|---|---|
| Trois pages : Home, Our Services, Contact us | `public/index.html`, `services.html`, `contact.html` |
| Barre de navigation sur chaque page | Bloc `<nav class="site-nav">` répété dans chaque page |
| Disponible seulement Lun–Ven, 9h–17h | `middleware/workingHours.js` |
| Serveur et routes avec Express | `server.js` |
| Middleware personnalisé pour vérifier l'heure | `middleware/workingHours.js` |
| Pages stylées en CSS | `public/css/style.css` |

---

## Concept

La contrainte du checkpoint — "disponible seulement pendant les heures
de travail" — est présentée comme un choix personnel plutôt qu'une règle
technique arbitraire : je ne réponds pas aux messages en dehors des
horaires de travail, donc le site lui-même applique cette limite via un
middleware Express personnalisé.

---

## Direction visuelle

Look clair et classique, mais volontairement différent du combo
"fond crème + serif + orange terracotta" trop associé aux designs
générés par IA :

- **Papier** `#F8F7F3`, **encre** `#1B1B18`
- **Accent principal** — vert forêt profond `#24443A`
- **Accent secondaire** — doré argileux `#B08D4F`
- Titres en **Fraunces** (serif à caractère), texte en **Work Sans**
- Séparateurs en simples filets fins, listes de projets façon "index"
  plutôt que cartes avec ombres

---

## Structure du projet

```
portfolio-checkpoint/
├── server.js                  → serveur Express + routes
├── middleware/
│   └── workingHours.js        → middleware personnalisé (vérifie l'heure)
├── public/
│   ├── css/style.css
│   ├── index.html              → Home (intro + projets sélectionnés)
│   ├── services.html           → Our Services
│   ├── contact.html            → Contact (formulaire + disponibilités)
│   └── closed.html             → Page affichée hors horaires
├── package.json
└── README.md
```

---

## Comment ça marche

### Le middleware personnalisé (`middleware/workingHours.js`)
```js
function isWithinWorkingHours(date) {
  const day = date.getDay();
  const hour = date.getHours();
  const isWeekday = day >= 1 && day <= 5; // Lundi à Vendredi
  const isOpenHour = hour >= 9 && hour < 17;
  return isWeekday && isOpenHour;
}
```
Appliqué globalement avec `app.use(workingHoursGate)` : si on est hors de
cette plage, toutes les routes renvoient un statut **503** avec la page
`closed.html`. Le CSS reste servi en dehors du filtre pour que cette page
garde son style.

---

## Installation et lancement

```bash
npm install
node server.js
```

Ouvrir [http://localhost:3000](http://localhost:3000)

- **Pendant les heures d'ouverture** (lundi–vendredi, 9h–17h, heure du
  serveur) : les 3 pages s'affichent normalement.
- **En dehors de ces heures** : toute route affiche `closed.html`.

Pour tester rapidement en dehors des vraies heures, modifier
temporairement `OPEN_HOUR` / `CLOSE_HOUR` dans `middleware/workingHours.js`.

---

## Résumé des concepts utilisés

| Concept | Fichier |
|---|---|
| Serveur Express + routes | `server.js` |
| Middleware personnalisé (heures de travail) | `middleware/workingHours.js` |
| `express.static` pour le CSS | `server.js` |
| `express.urlencoded` pour le formulaire | `server.js` |
| HTML/CSS pur, sans moteur de template | `public/*.html`, `public/css/style.css` |
