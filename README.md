<hr/>

# Tests Cases

<hr/>

## Informations Générales
- **Application**: Système de gestion de produits avec CRUD
- **Stockage**: LocalStorage
- **Fonctionnalités**: Création, Lecture, Mise à jour, Suppression, Recherche, Mode sombre/clair

---

## TC-01: Calcul du Total
**Priorité**: Haute  
**Précondition**: Tous les champs sont vides

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Saisir un prix | price = 100 | La valeur du champ total change (fond vert) |
| 2 | Ajouter les taxes | taxes = 20 | Total = 120 (fond vert) |
| 3 | Ajouter les frais | ads = 10 | Total = 130 (fond vert) |
| 4 | Ajouter une remise | discount = 30 | Total = 100 (fond vert) |
| 5 | Effacer le prix | price = "" | Total doit se vider (fond rouge) |

**Formule**: Total = (Prix + Taxes + Frais) - Remise

---

## TC-02: Création d'un Produit Unique
**Priorité**: Haute  
**Précondition**: Formulaire vierge, localStorage vide

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Remplir tous les champs obligatoires | title="iPhone", price="999", category="Électronique" | - |
| 2 | Ajouter des informations optionnelles | taxes="100", ads="50", discount="149" | Total calculé = 1000 |
| 3 | Laisser count vide ou à 1 | count="" ou count="1" | - |
| 4 | Cliquer sur "Create" | - | Produit ajouté au tableau et les champs se vident |
| 5 | Vérifier le tableau | - | 1 ligne avec les données saisies |
| 6 | Vérifier localStorage | - | Le produit est sauvegardé |
| 7 | Vérifier le compteur | - | "(1)" affiché |
| 8 | Vérifier les champs | - | Tous les champs sont vidés |

---

## TC-03: Création de Produits Multiples (Count > 1)
**Priorité**: Haute  
**Précondition**: Formulaire vierge

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Remplir les champs obligatoires | title="Câble USB", price="15", category="Accessoires" | - |
| 2 | Définir count > 1 | count = 5 | - |
| 3 | Cliquer sur "Create" | - | 5 produits identiques ajoutés |
| 4 | Vérifier le tableau | - | 5 lignes identiques |
| 5 | Vérifier le compteur | - | "(5)" affiché |

---

## TC-04: Validation des Données (cleanData)
**Priorité**: Haute  
**Précondition**: Formulaire vierge

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Cliquer sur "Create" sans rien remplir | Tous les champs vides | Aucun produit créé |
| 2 | Remplir uniquement le titre | title="Test" | Aucun produit créé |
| 3 | Remplir titre et prix mais pas catégorie | title="Test", price="10" | Aucun produit créé |
| 4 | Remplir tous les champs mais count ≥ 100 | title="Test", price="10", category="Cat", count=100 | Aucun produit créé |
| 5 | Remplir tous les champs avec count = 99 | title="Test", price="10", category="Cat", count=99 | 99 produits créés |

---

## TC-05: Mise à Jour d'un Produit
**Priorité**: Haute  
**Précondition**: Au moins un produit existant dans le tableau

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Cliquer sur "update" d'un produit existant | - | Les champs sont remplis avec les données du produit |
| 2 | Vérifier le bouton submit | - | Le texte passe à "update" |
| 3 | Vérifier le champ count | - | Le champ count est masqué |
| 4 | Vérifier le scroll | - | La page défile vers le haut |
| 5 | Modifier le titre | title="Produit Modifié" | - |
| 6 | Cliquer sur "update" | - | Le produit est mis à jour dans le tableau |
| 7 | Vérifier le bouton submit | - | Le texte revient à "create" |
| 8 | Vérifier le champ count | - | Le champ count est réaffiché |

---

## TC-06: Suppression d'un Produit
**Priorité**: Haute  
**Précondition**: Au moins 2 produits dans le tableau

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Noter le nombre total de produits | - | Ex: (5) |
| 2 | Cliquer sur "delete" du 2ème produit | - | Le produit est supprimé |
| 3 | Vérifier le tableau | - | Le produit n'apparaît plus |
| 4 | Vérifier le compteur | - | "(4)" affiché |
| 5 | Vérifier localStorage | - | Le produit n'est plus dans le stockage |

---

## TC-07: Suppression de Tous les Produits
**Priorité**: Moyenne  
**Précondition**: Plusieurs produits dans le tableau

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Vérifier la présence du bouton "Delete All" | - | Le bouton est visible |
| 2 | Cliquer sur "Delete All" | - | Tous les produits sont supprimés |
| 3 | Vérifier le tableau | - | Tableau vide |
| 4 | Vérifier le message | - | "No product Yet" affiché |
| 5 | Vérifier le bouton "Delete All" | - | Le bouton est masqué |
| 6 | Vérifier localStorage | - | LocalStorage est vidé |

---

## TC-08: Recherche par Titre
**Priorité**: Moyenne  
**Précondition**: Produits avec titres variés (ex: "iPhone 12", "iPhone 13", "Samsung Galaxy", "iPhone Case")

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Cliquer sur "Search by Title" | - | Champ de recherche affiché avec placeholder "search by title" |
| 2 | Saisir un terme de recherche | "iphone" | - |
| 3 | Vérifier le tableau | - | 3 produits affichés (iPhone 12, iPhone 13, iPhone Case) |
| 4 | Saisir un terme inexistant | "nokia" | Tableau vide |
| 5 | Effacer la recherche | "" | Tous les produits réapparaissent |

**Note**: La recherche est insensible à la casse (conversion en minuscules)

---

## TC-09: Recherche par Catégorie
**Priorité**: Moyenne  
**Précondition**: Produits avec catégories variées

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Cliquer sur "Search by Category" | - | Champ de recherche avec placeholder "search by category" |
| 2 | Saisir une catégorie | "électronique" | Produits de cette catégorie affichés |
| 3 | Changer le mode de recherche | Cliquer sur "Search by Title" | Le focus revient sur le champ de recherche |

---

## TC-10: Mode Sombre/Clair
**Priorité**: Basse  
**Précondition**: État initial (light mode par défaut)

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Vérifier le texte du bouton | - | "dark mode" affiché |
| 2 | Vérifier les classes CSS | - | Aucune classe "dark" sur les éléments |
| 3 | Cliquer sur le bouton de mode | - | - |
| 4 | Vérifier le texte du bouton | - | "light mode" affiché |
| 5 | Vérifier les classes CSS | - | Classes "dark" ajoutées aux éléments |
| 6 | Recharger la page | - | Le mode sombre est conservé |
| 7 | Cliquer à nouveau | - | Retour au mode clair |
| 8 | Vérifier localStorage | - | lightMode = false puis true |

---

## TC-11: Persistance des Données (LocalStorage)
**Priorité**: Haute  
**Précondition**: Application chargée

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Créer 2 produits | Produit A et Produit B | Produits visibles dans le tableau |
| 2 | Fermer et recharger la page | - | Les 2 produits sont toujours présents |
| 3 | Modifier le Produit A | - | Modification persistante après rechargement |
| 4 | Supprimer le Produit B | - | Suppression persistante après rechargement |

---

## TC-12: Cas Limites - Count
**Priorité**: Moyenne  
**Précondition**: Formulaire rempli avec données valides

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | count = 0 | count=0 | 1 produit créé (comportement par défaut) |
| 2 | count = 1 | count=1 | 1 produit créé |
| 3 | count = 99 | count=99 | 99 produits créés |
| 4 | count = 100 | count=100 | Aucun produit créé (validation) |
| 5 | count = -1 | count=-1 | 1 produit créé  |
| 6 | count = "abc" | count="abc" | Aucun produit crée |

---

## TC-13: Cas Limites - Valeurs Numériques
**Priorité**: Basse  
**Précondition**: Formulaire avec titre et catégorie remplis

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Prix négatif | price="-50" | Total calculé avec valeur négative mais aucun produit créé + font du total est rouge |
| 2 | Prix avec texte | price="abc" | NaN ou 0 dans le calcul du total et aucun produit créé |
| 3 | Remise supérieure au total | discount="1000" (prix=100) | Total négatif avec un font rouge et aucun produit créé |
| 4 | Valeurs décimales | price="99.99" | Total calculé correctement |

---

## TC-14: Comportement du Bouton Delete All
**Priorité**: Basse  
**Précondition**: Variable - avec et sans produits

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Sans produit dans le tableau | products = [] | Section "deleteAll" masquée |
| 2 | Ajouter un produit | - | Section "deleteAll" visible |
| 3 | Supprimer le dernier produit | - | Section "deleteAll" masquée |

---

## TC-15: Réinitialisation après Création
**Priorité**: Moyenne  
**Précondition**: Formulaire rempli, mode = "create"

| Étape | Action | Données de test | Résultat attendu |
|-------|--------|-----------------|------------------|
| 1 | Créer un produit | Données valides | - |
| 2 | Vérifier le titre | - | Champ vidé |
| 3 | Vérifier le prix | - | Champ vidé |
| 4 | Vérifier le total | - | Affichage vidé, fond rouge |
| 5 | Vérifier le count | - | Champ vidé |
| 6 | Vérifier la catégorie | - | Champ vidé |

---

### Environnements de Test Recommandés
- Chrome (dernière version)
- Firefox (dernière version)
- Edge (dernière version)
- Safari (si disponible)

### Types de Tests
- ✅ Tests fonctionnels
- ✅ Tests de validation
- ✅ Tests d'interface utilisateur
- ✅ Tests de persistance
- ⚠️ Tests de performance (count=99)
