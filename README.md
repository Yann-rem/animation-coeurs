# Animation Paramétrique avec Pixi.js

## Description

Ce projet est une animation interactive utilisant **Pixi.js** et des fonctions mathématiques pour générer des formes paramétriques animées. L'animation représente un effet visuel inspiré des cœurs, où des cercles (de tailles et couleurs dynamiques) sont disposés dans une structure semblable à un effet "half-tone". Ces cercles évoluent dans le temps grâce à une fonction sinusoïdale.

## Fonctionnalités

- Génération de courbes paramétriques pour dessiner des cœurs.
- Disposition de cercles dans une grille pour un rendu visuel fluide.
- Animation continue basée sur une fonction sinusoïdale.
- Personnalisation via des sliders HTML (amplitude, période, couleurs).

## Technologies Utilisées

- **[TypeScript](https://www.typescriptlang.org/)** : Langage principal pour une écriture robuste.
- **[Pixi.js](https://pixijs.com/)** : Framework de rendu 2D performant.
- **[Colord](https://github.com/omgovich/colord)** : Manipulation des couleurs HSL/Hex.
- **[Vite.js](https://vitejs.dev/)** : Outil de développement rapide.

## Installation

### Prérequis

- **[Node.js](https://nodejs.org/)** version 16 ou plus.

### Étapes

1. Clonez le dépôt :

   ```bash
   https://github.com/Yann-rem/animation-coeurs.git
   cd <ton-repo>
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Démarrez le projet :
   ```bash
   npm run dev
   ```

## Structure des Fichiers

- src/utils.ts : Fonctions utilitaires (interpolation, dégradés de couleurs, sinus, etc.).
- src/main.ts : Script principal pour initialiser et animer les graphiques.
- public/index.html : Structure HTML de base.
- public/style.css : Style pour les sliders et autres éléments.
