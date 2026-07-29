# Tests Cases
# Cas de tests — CRUD Product Management System

> À exécuter manuellement dans le navigateur (ouvrir la console DevTools pour surveiller les erreurs JS).
> Avant chaque section "Nouvelle session", faire `localStorage.clear()` puis recharger la page.

---

## 1. Mode clair / sombre (Light/Dark Mode)

| # | Étape | Résultat attendu |
|---|-------|-------------------|
| 1.1 | Charger la page pour la première fois (localStorage vide) | Le mode par défaut est clair (`lightMode = true`), bouton affiche "switch to dark mode" |
| 1.2 | Cliquer sur le bouton switch | Le fond passe en sombre, tous les éléments `.elmMode`, `input`, `button` reçoivent la classe `.dark` |
| 1.3 | Vérifier la couleur du `<small id="total">` | Le fond change en sombre (`#a00d02` ou `rgb(29,83,29)` selon présence de prix) |
| 1.4 | Recliquer sur le bouton | Retour au mode clair, classe `.dark` retirée partout |
| 1.5 | Passer en mode sombre puis **recharger la page (F5)** | Le mode sombre doit être conservé après rechargement |
| 1.6 | Inspecter `localStorage.lightMode` dans la console | Doit contenir la string `"false"` (mode sombre) ou `"true"` (mode clair) |

---

## 2. Création de produit (Create)

| # | Étape | Résultat attendu |
|---|-------|-------------------|
| 2.1 | Remplir title="Souris", price=50, taxes=5, ads=2, discount=1, count=1, category="Informatique" puis cliquer Create | Le produit apparaît dans le tableau avec total = 56 |
| 2.2 | Laisser title vide et cliquer Create | Le produit n'est PAS ajouté (validation `cleanData`) |
| 2.3 | Laisser price vide et cliquer Create | Le produit n'est PAS ajouté |
| 2.4 | Laisser category vide et cliquer Create | Le produit n'est PAS ajouté |
| 2.5 | Mettre count=150 (>100) et cliquer Create | Le produit n'est PAS ajouté |
| 2.6 | Mettre count=3 et remplir les autres champs, cliquer Create | Le produit est dupliqué 3 fois dans le tableau |
| 2.7 | Créer un produit puis recharger la page | Le produit doit toujours être présent (persistance localStorage) |

---

## 3. Calcul du total (getTotal)

| # | Étape | Résultat attendu |
|---|-------|-------------------|
| 3.1 | Laisser price vide, taper dans taxes | `<small id="total">` reste vide, fond rouge/rose |
| 3.2 | price=100, taxes=10, ads=5, discount=15 | Total affiché = 100 |
| 3.3 | price=100, sans remplir taxes/ads/discount | Total = 100 (les champs vides comptent comme 0 grâce au `+`) |
| 3.4 | Effacer le champ price après l'avoir rempli | Le total redevient vide, fond repasse en rouge/rose |

---

## 4. Mise à jour de produit (Update)

| # | Étape | Résultat attendu |
|---|-------|-------------------|
| 4.1 | Cliquer sur "update" d'une ligne du tableau | Les champs se pré-remplissent avec les valeurs du produit, le bouton "Create" devient "update", le champ count est masqué |
| 4.2 | Modifier le title puis cliquer sur "update" (bouton submit) | Le produit est modifié à sa position d'origine dans le tableau, le bouton redevient "Create" |
| 4.3 | Cliquer sur "update" d'une ligne, puis vider le title et soumettre | La mise à jour est refusée (validation), mais le formulaire reste en mode "update" |
| 4.4 | Faire un update puis recharger la page | La modification est bien persistée |

---

## 5. Suppression (Delete)

| # | Étape | Résultat attendu |
|---|-------|-------------------|
| 5.1 | Cliquer sur "delete" d'une ligne | ⚠️ **Bug attendu** : `deleteProductByIndex(index)` utilise une variable `i` non définie → erreur en console (`i is not defined`), le produit n'est pas supprimé |
| 5.2 | Créer au moins 1 produit | Le bouton "delete all" devient visible |
| 5.3 | Cliquer sur "delete all" | Tous les produits disparaissent, `localStorage` est entièrement vidé (y compris `lightMode`), le tableau est vide |
| 5.4 | Après "delete all", recharger la page | Le mode repasse en clair par défaut (puisque `localStorage.clear()` supprime aussi la préférence de thème) |

---

## 6. Recherche (Search)

| # | Étape | Résultat attendu |
|---|-------|-------------------|
| 6.1 | Cliquer sur "search By Title" | Le champ recherche apparaît avec placeholder "search by title" |
| 6.2 | Taper une partie du titre d'un produit existant | Seuls les produits correspondants s'affichent |
| 6.3 | Cliquer sur "search By Category" puis taper une catégorie | Seuls les produits de cette catégorie s'affichent |
| 6.4 | Taper une valeur en majuscules alors que les produits sont stockés en minuscules | Le résultat doit quand même matcher (recherche insensible à la casse via `toLowerCase()`) |
| 6.5 | Taper une valeur qui ne correspond à aucun produit | Le tableau devient vide |

---

## 7. Persistance générale (localStorage)

| # | Étape | Résultat attendu |
|---|-------|-------------------|
| 7.1 | Créer plusieurs produits, fermer l'onglet, le rouvrir | Tous les produits doivent être toujours là |
| 7.2 | Inspecter `localStorage.products` en console | Doit être un JSON valide (tableau d'objets produit) |
| 7.3 | Corrompre manuellement `localStorage.products` (ex: `localStorage.products = "abc"`) puis recharger | ⚠️ **Bug attendu** : `JSON.parse("abc")` lève une exception, la page ne charge pas correctement |

---

## Bugs déjà identifiés à vérifier pendant les tests
- [ ] `deleteProductByIndex` utilise `i` au lieu de `index` (variable non définie).
- [ ] `deleteAll()` appelle `localStorage.clear()` au lieu de supprimer uniquement la clé `products`, ce qui efface aussi la préférence `lightMode`.
- [ ] Aucune vérification anti-XSS lors de l'injection des données produit dans `innerHTML` (`displayProducts`).